/**
 * Finds the last segment of the path starting with @mui/base.
 *
 * @example @mui/base/Menu ➔ Menu
 * @example @mui/base/utils/Foo ➔ Foo
 */
function getBaseImportIdentifier(path) {
  const source = path?.node?.source?.value;
  if (!source) {
    return null;
  }

  const baseImportPathMatch = source.match(/@mui\/base\/(?:(?:.*)\/)*([^/]+)/);

  if (baseImportPathMatch == null) {
    return null;
  }

  return baseImportPathMatch[1];
}

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const withTransformedImports = j(file.source)
    .find(j.ImportDeclaration)
    .forEach((path) => {
      const baseImportPath = getBaseImportIdentifier(path);
      if (baseImportPath === null) {
        return;
      }

      path.node.specifiers = path.node.specifiers.map((specifier) => {
        if (specifier.type !== 'ImportDefaultSpecifier') {
          return specifier;
        }

        // import Y from @mui/base/X ➔ import { X as Y } from @mui/base/X
        return j.importSpecifier(j.identifier(baseImportPath), specifier.local);
      });
    })
    .toSource(printOptions);

  return j(withTransformedImports)
    .find(j.ExportNamedDeclaration)
    .forEach((path) => {
      const baseImportPath = getBaseImportIdentifier(path);
      if (baseImportPath === null) {
        return;
      }

      path.node.specifiers = path.node.specifiers.map((specifier) => {
        if (specifier.local.name !== 'default') {
          return specifier;
        }

        if (specifier.exported.name === 'default') {
          // export { default } from @mui/base/X ➔ export { X as default } from @mui/base/X
          return j.exportSpecifier.from({
            exported: j.identifier('default'),
            local: j.identifier(baseImportPath),
          });
        }

        // export { default as Y } from @mui/base/X ➔ export { X as Y } from @mui/base/X
        return j.exportSpecifier.from({
          exported: j.identifier(specifier.exported.name),
          local: j.identifier(baseImportPath),
        });
      });
    })
    .toSource(printOptions);
}
