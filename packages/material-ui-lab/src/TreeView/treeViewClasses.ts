import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface TreeViewClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TreeViewClassKey = keyof TreeViewClasses;

export function getTreeViewUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTreeView', slot);
}

const treeViewClasses: TreeViewClasses = generateUtilityClasses('MuiTreeView', ['root']);

export default treeViewClasses;
