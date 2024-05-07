import getReturnExpression from '../../util/getReturnExpression';
import {
  getCreateBuildStyle,
  getAppendPaletteModeStyles,
  getObjectKey,
  getBuildArrowFunctionAST,
  isThemePaletteMode,
  removeProperty,
} from '../../util/migrateToVariants';

/**
 *
 * @param {import('jscodeshift').MemberExpression | import('jscodeshift').Identifier} node
 */
function getCssVarName(node) {
  if (node.type === 'MemberExpression') {
    return `--${getObjectKey(node)?.name}-${node.property.name}`;
  }
  if (node.type === 'Identifier') {
    return `--${node.name}`;
  }
  return '';
}

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function sxV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const createBuildStyle = getCreateBuildStyle(j);
  const appendPaletteModeStyles = getAppendPaletteModeStyles(j);
  const buildArrowFunctionAST = getBuildArrowFunctionAST(j);

  let shouldTransform = false;

  root
    .find(j.JSXAttribute, { name: { name: 'sx' }, value: { type: 'JSXExpressionContainer' } })
    .forEach((path) => {
      /**
       * @type {[import('jscodeshift').StringLiteral, import('jscodeshift').Expression][]}
       */
      const cssVars = [];
      const sxContainer = path.node.value;

      if (['ArrowFunctionExpression', 'ObjectExpression'].includes(sxContainer.expression.type)) {
        shouldTransform = true;
        recurseObjectExpression({
          root: path.node.value.expression,
          replaceRoot: (newRoot) => {
            sxContainer.expression = newRoot;
          },
          node: path.node.value.expression,
          buildStyle: createBuildStyle(),
        });

        if (cssVars.length) {
          const cssVarsObject = j.objectExpression(
            cssVars.map(([varName, value]) => j.objectProperty(varName, value)),
          );
          if (path.parent.node.type === 'JSXOpeningElement') {
            const styleAttribute = path.parent.node.attributes.find(
              (attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'style',
            );
            const spreadAttribute = path.parent.node.attributes.find(
              (attribute) => attribute.type === 'JSXSpreadAttribute',
            );
            if (styleAttribute) {
              if (styleAttribute.value.expression.type === 'ObjectExpression') {
                styleAttribute.value.expression.properties = [
                  ...styleAttribute.value.expression.properties,
                  ...cssVarsObject.properties,
                ];
              } else if (
                styleAttribute.value.expression.type === 'Identifier' ||
                styleAttribute.value.expression.type === 'MemberExpression'
              ) {
                styleAttribute.value.expression = j.objectExpression([
                  j.spreadElement(styleAttribute.value.expression),
                  ...cssVarsObject.properties,
                ]);
              }
            } else if (spreadAttribute) {
              path.parent.node.attributes.push(
                j.jsxAttribute(
                  j.jsxIdentifier('style'),
                  j.jsxExpressionContainer(
                    j.objectExpression([
                      j.spreadElement(
                        j.memberExpression(spreadAttribute.argument, j.identifier('style')),
                      ),
                      ...cssVarsObject.properties,
                    ]),
                  ),
                ),
              );
            } else {
              path.parent.node.attributes.push(
                j.jsxAttribute(j.jsxIdentifier('style'), j.jsxExpressionContainer(cssVarsObject)),
              );
            }
          }
        }
      }

      function wrapSxInArray(newElement) {
        if (
          sxContainer.expression.type === 'ObjectExpression' ||
          sxContainer.expression.type === 'ArrowFunctionExpression'
        ) {
          sxContainer.expression = j.arrayExpression([sxContainer.expression]);
        }
        if (sxContainer.expression.type === 'ArrayExpression') {
          sxContainer.expression.elements.push(newElement);
        }
      }

      /**
       *
       * @param {{ node: import('jscodeshift').Expression }} data
       */
      function recurseObjectExpression(data) {
        if (data.node.type === 'ArrowFunctionExpression') {
          const returnExpression = getReturnExpression(data.node);
          if (returnExpression) {
            recurseObjectExpression({
              ...data,
              node: returnExpression,
            });
          }
        }
        if (data.node.type === 'ObjectExpression') {
          const modeStyles = {}; // to collect styles from `theme.palette.mode === '...'`
          data.node.properties.forEach((prop) => {
            if (prop.type === 'ObjectProperty') {
              recurseObjectExpression({
                ...data,
                node: prop.value,
                parentNode: data.node,
                key: prop.key,
                buildStyle: createBuildStyle(prop.key, data.buildStyle),
                replaceValue: (newValue) => {
                  prop.value = newValue;
                },
                modeStyles,
              });
            } else {
              recurseObjectExpression({
                ...data,
                node: prop,
                parentNode: data.node,
                buildStyle: createBuildStyle(prop.key, data.buildStyle),
              });
            }
          });
          appendPaletteModeStyles(data.node, modeStyles);
        }
        if (data.node.type === 'SpreadElement') {
          if (data.node.argument.type === 'LogicalExpression') {
            const paramName =
              data.node.argument.left.type === 'BinaryExpression'
                ? getObjectKey(data.node.argument.left.left)?.name
                : getObjectKey(data.node.argument.left)?.name;
            if (paramName === 'theme' && data.node.argument.left.right.type === 'StringLiteral') {
              if (data.node.argument.right.type === 'ObjectExpression') {
                const mode = data.node.argument.left.right.value;
                data.node.argument.right.properties.forEach((prop) => {
                  if (prop.type === 'ObjectProperty') {
                    recurseObjectExpression({
                      ...data,
                      node: prop.value,
                      parentNode: data.node.argument.right,
                      key: prop.key,
                      buildStyle: createBuildStyle(prop.key, data.buildStyle, mode),
                      replaceValue: (newValue) => {
                        prop.value = newValue;
                      },
                    });
                  } else {
                    recurseObjectExpression({
                      ...data,
                      node: prop,
                      parentNode: data.node.argument.right,
                      buildStyle: createBuildStyle(prop.key, data.buildStyle, mode),
                    });
                  }
                });
                appendPaletteModeStyles(data.parentNode, {
                  [mode]: data.node.argument.right,
                });
              }
              removeProperty(data.parentNode, data.node);
              return;
            }

            if (data.node.argument.right.type === 'ObjectExpression') {
              recurseObjectExpression({
                ...data,
                node: data.node.argument.right,
                root: data.node.argument.right,
                replaceRoot: (newRoot) => {
                  data.node.argument.right = newRoot;
                },
              });
            }
            wrapSxInArray(
              j.logicalExpression(
                data.node.argument.operator,
                data.node.argument.left,
                data.node.argument.right,
              ),
            );
            removeProperty(data.parentNode, data.node);
          }
          if (data.node.argument.type === 'ConditionalExpression') {
            recurseObjectExpression({
              ...data,
              node: data.node.argument,
              parentNode: data.node,
            });
            removeProperty(data.parentNode, data.node);
          }
        }
        if (data.node.type === 'ConditionalExpression') {
          if (
            data.node.test.type === 'BinaryExpression' ||
            data.node.test.type === 'UnaryExpression' ||
            data.node.test.type === 'Identifier' ||
            data.node.test.type === 'MemberExpression'
          ) {
            if (
              data.parentNode?.type === 'ObjectExpression' &&
              data.node.test?.type === 'BinaryExpression'
            ) {
              if (
                data.node.consequent.type !== 'ObjectExpression' &&
                data.node.alternate.type !== 'ObjectExpression'
              ) {
                if (isThemePaletteMode(data.node.test.left)) {
                  const consequentKey = getObjectKey(data.node.consequent);
                  if (consequentKey.type === 'Identifier' && consequentKey.name !== 'theme') {
                    const varName = getCssVarName(data.node.consequent);
                    cssVars.push([j.stringLiteral(varName), data.node.consequent]);
                    data.node.consequent = j.stringLiteral(`var(${varName})`);
                  }
                  const alternateKey = getObjectKey(data.node.alternate);
                  if (alternateKey.type === 'Identifier' && alternateKey.name !== 'theme') {
                    const varName = getCssVarName(data.node.alternate);
                    cssVars.push([j.stringLiteral(varName), data.node.alternate]);
                    data.node.alternate = j.stringLiteral(`var(${varName})`);
                  }

                  if (data.modeStyles) {
                    if (!data.modeStyles[data.node.test.right.value]) {
                      data.modeStyles[data.node.test.right.value] = [];
                    }
                    data.modeStyles[data.node.test.right.value].push(
                      j.objectProperty(data.key, data.node.consequent),
                    );
                  }
                  data.replaceValue?.(data.node.alternate);

                  if (data.root.type === 'ObjectExpression') {
                    data.replaceRoot?.(buildArrowFunctionAST([j.identifier('theme')], data.root));
                  } else if (data.root.type === 'ArrayExpression') {
                    data.root.elements.forEach((item, index) => {
                      if (item === data.node) {
                        data.root.elements[index] = buildArrowFunctionAST(
                          [j.identifier('theme')],
                          data.root,
                        );
                      }
                    });
                  }
                } else {
                  wrapSxInArray(
                    j.conditionalExpression(
                      data.node.test,
                      j.objectExpression([j.objectProperty(data.key, data.node.consequent)]),
                      j.objectExpression([j.objectProperty(data.key, data.node.alternate)]),
                    ),
                  );
                  removeProperty(data.parentNode, data.node);
                }
              }
            }
          }
        }
        if (data.node.type === 'TemplateLiteral') {
          if (data.parentNode?.type === 'ObjectExpression') {
            const modeStyles = {};
            data.node.expressions.forEach((expression, index) => {
              if (expression.type === 'MemberExpression') {
                const memberKey = getObjectKey(expression);
                if (memberKey.type === 'Identifier' && memberKey.name !== 'theme') {
                  const varName = getCssVarName(expression);
                  cssVars.push([j.stringLiteral(varName), expression]);
                  data.node.expressions[index] = j.stringLiteral(`var(${varName})`);
                }
              } else {
                recurseObjectExpression({
                  ...data,
                  node: expression,
                  parentNode: data.parentNode,
                  buildStyle: createBuildStyle(data.key, data.buildStyle),
                  replaceValue: (newValue) => {
                    data.node.expressions[index] = newValue;
                  },
                  modeStyles,
                });
              }
            });
            if (data.modeStyles) {
              Object.entries(modeStyles).forEach(([mode, objectStyles]) => {
                const clonedNode = {
                  ...data.node,
                  expressions: data.node.expressions.map((expression) => ({ ...expression })),
                };
                clonedNode.expressions = objectStyles.map((item) => item.value);

                if (!data.modeStyles[mode]) {
                  data.modeStyles[mode] = [];
                }
                data.modeStyles[mode].push(j.objectProperty(data.key, clonedNode));
              });
              if (data.key) {
                data.replaceValue?.(data.node);
              }
            }
          }
        }
      }
    });

  const transformed = root.toSource(printOptions);

  if (shouldTransform) {
    // recast adds extra newlines that we don't want, https://github.com/facebook/jscodeshift/issues/249
    // need to remove them manually
    const lines = [];
    let isInStyled = false;
    let spaceMatch;
    transformed.split('\n').forEach((line) => {
      if (!isInStyled) {
        lines.push(line);
      } else if (line !== '') {
        if (spaceMatch && line.match(/^\s+/)?.[0] === spaceMatch?.[0] && line.endsWith('}')) {
          isInStyled = false;
          spaceMatch = null;
        }
        lines.push(line);
      }
      if (line.includes('sx=')) {
        isInStyled = true;
        spaceMatch = line.match(/^\s+/);
      }
    });
    return lines.join('\n');
  }

  return transformed;
}
