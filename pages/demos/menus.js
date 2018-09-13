import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/pages/demos/menus/menus.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/menus/SimpleMenu.js': {
          js: require('docs/pages/demos/menus/SimpleMenu').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/menus/SimpleMenu'), 'utf8')
`,
        },
        'pages/demos/menus/SimpleListMenu.js': {
          js: require('docs/pages/demos/menus/SimpleListMenu').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/menus/SimpleListMenu'), 'utf8')
`,
        },
        'pages/demos/menus/LongMenu.js': {
          js: require('docs/pages/demos/menus/LongMenu').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/menus/LongMenu'), 'utf8')
`,
        },
        'pages/demos/menus/MenuListComposition.js': {
          js: require('docs/pages/demos/menus/MenuListComposition').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/menus/MenuListComposition'), 'utf8')
`,
        },
        'pages/demos/menus/ListItemComposition.js': {
          js: require('docs/pages/demos/menus/ListItemComposition').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/menus/ListItemComposition'), 'utf8')
`,
        },
        'pages/demos/menus/FadeMenu.js': {
          js: require('docs/pages/demos/menus/FadeMenu').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/menus/FadeMenu'), 'utf8')
`,
        },
        'pages/demos/menus/RenderPropsMenu.js': {
          js: require('docs/pages/demos/menus/RenderPropsMenu').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/menus/RenderPropsMenu'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
