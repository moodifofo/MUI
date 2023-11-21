import * as ts from 'typescript';
import { ComponentClassDefinition } from '@mui-internal/docs-utilities';
import { getSymbolDescription, getSymbolJSDocTags } from '../buildApiUtils';
import { TypeScriptProject } from './createTypeScriptProject';
import { getPropsFromComponentNode } from './getPropsFromComponentNode';
import resolveExportSpecifier from './resolveExportSpecifier';
import { ProjectSettings } from '../ProjectSettings';

export interface Slot {
  class: string | null;
  name: string;
  description: string;
  default?: string;
}

interface ParseSlotsAndClassesParameters {
  typescriptProject: TypeScriptProject;
  projectSettings: ProjectSettings;
  componentName: string;
  muiName: string;
}

export default function parseSlotsAndClasses({
  typescriptProject,
  projectSettings,
  componentName,
  muiName,
}: ParseSlotsAndClassesParameters): { slots: Slot[]; classes: ComponentClassDefinition[] } {
  // Obtain an array of classes for the given component
  const classDefinitions = extractClasses(
    typescriptProject,
    projectSettings,
    componentName,
    muiName,
  );
  const slots = extractSlots(typescriptProject, componentName, classDefinitions);

  const nonSlotClassDefinitions = classDefinitions
    .filter((classDefinition) => !Object.keys(slots).includes(classDefinition.key))
    .sort((a, b) => a.key.localeCompare(b.key));

  return {
    slots: Object.values(slots),
    classes: nonSlotClassDefinitions,
  };
}

function extractClasses(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  return (
    extractClassesFromProps(typescriptProject, projectSettings, componentName, muiName) ??
    extractClassesFromInterface(typescriptProject, projectSettings, componentName, muiName)
  );
}

/**
 * Gets class names and descriptions from the {ComponentName}Classes interface.
 */
function extractClassesFromInterface(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] {
  const result: ComponentClassDefinition[] = [];

  const classesInterfaceName = `${componentName}Classes`;
  if (!typescriptProject.exports[classesInterfaceName]) {
    return result;
  }

  const classesType = typescriptProject.checker.getDeclaredTypeOfSymbol(
    typescriptProject.exports[classesInterfaceName],
  );

  const classesTypeDeclaration = classesType?.symbol?.declarations?.[0];
  if (classesTypeDeclaration && ts.isInterfaceDeclaration(classesTypeDeclaration)) {
    const classesProperties = classesType.getProperties();
    classesProperties.forEach((symbol) => {
      result.push({
        key: symbol.name,
        className: projectSettings.generateClassName(muiName, symbol.name),
        description: getSymbolDescription(symbol, typescriptProject),
        isGlobal: projectSettings.isGlobalClassName(symbol.name),
      });
    });
  }

  return result;
}

function extractClassesFromProps(
  typescriptProject: TypeScriptProject,
  projectSettings: ProjectSettings,
  componentName: string,
  muiName: string,
): ComponentClassDefinition[] | null {
  const exportedSymbol =
    typescriptProject.exports[componentName] ??
    typescriptProject.exports[`Unstable_${componentName}`];
  if (!exportedSymbol) {
    throw new Error(`No exported component for the componentName "${componentName}"`);
  }

  const localeSymbol = resolveExportSpecifier(exportedSymbol, typescriptProject);
  const declaration = localeSymbol.valueDeclaration!;

  const classesProp = getPropsFromComponentNode({
    node: declaration,
    project: typescriptProject,
    shouldInclude: ({ name }) => name === 'classes',
    checkDeclarations: true,
  })?.props.classes;

  if (classesProp == null) {
    return null;
  }

  const classes: Record<string, string> = {};
  classesProp.signatures.forEach((propType) => {
    const type = typescriptProject.checker.getTypeAtLocation(propType.symbol.declarations?.[0]!);
    removeUndefinedFromType(type)
      ?.getProperties()
      .forEach((property) => {
        classes[property.escapedName.toString()] = getSymbolDescription(
          property,
          typescriptProject,
        );
      });
  });

  return Object.keys(classes).map((name) => ({
    key: name,
    className: projectSettings.generateClassName(muiName, name),
    description: name !== classes[name] ? classes[name] : '',
    isGlobal: projectSettings.isGlobalClassName(name),
  }));
}

function extractSlots(
  project: TypeScriptProject,
  componentName: string,
  classDefinitions: ComponentClassDefinition[],
): Record<string, Slot> {
  const slotsInterfaceName = `${componentName}Slots`;
  const exportedSymbol = project.exports[slotsInterfaceName];
  if (!exportedSymbol) {
    console.warn(`No declaration for ${slotsInterfaceName}`);
    return {};
  }
  const type = project.checker.getDeclaredTypeOfSymbol(exportedSymbol);
  const typeDeclaration = type?.symbol?.declarations?.[0];

  if (!typeDeclaration || !ts.isInterfaceDeclaration(typeDeclaration)) {
    return {};
  }

  const slots: Record<string, Slot> = {};
  const propertiesOnProject = type.getProperties();

  propertiesOnProject.forEach((propertySymbol) => {
    const tags = getSymbolJSDocTags(propertySymbol);
    if (tags.ignore) {
      return;
    }
    const slotName = propertySymbol.name;

    const slotClassDefinition = classDefinitions.find(
      (classDefinition) => classDefinition.key === slotName,
    );

    slots[slotName] = {
      name: slotName,
      description: getSymbolDescription(propertySymbol, project),
      default: tags.default?.text?.[0].text,
      class: slotClassDefinition?.className ?? null,
    };
  });

  return slots;
}

function removeUndefinedFromType(type: ts.Type) {
  // eslint-disable-next-line no-bitwise
  if (type.flags & ts.TypeFlags.Union) {
    return (type as ts.UnionType).types.find((subType) => {
      return subType.flags !== ts.TypeFlags.Undefined;
    });
  }

  return type;
}
