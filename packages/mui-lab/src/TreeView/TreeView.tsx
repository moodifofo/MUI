/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The TreeView component was moved from `@mui/lab` to `@mui/x-tree-view`.',
        '',
        "You should use `import { TreeView } from '@mui/x-tree-view'`",
        "or `import { TreeView } from '@mui/x-tree-view/TreeView'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-tree-view-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type TreeViewComponent = ((
  props: TreeViewProps & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @deprecated The TreeView component was moved from `@mui/lab` to `@mui/x-tree-view`. More information about this migration on our blog: https://mui.com/blog/lab-tree-view-to-mui-x/.
 * @ignore - do not document.
 */
const TreeView = React.forwardRef(function DeprecatedTreeView() {
  warn();

  return null;
}) as TreeViewComponent;

export default TreeView;

export type TreeViewProps = Record<any, any>;
