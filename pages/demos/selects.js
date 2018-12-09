import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./selects${props.lang}.md`)}
      demos={{
        'pages/demos/selects/SimpleSelect.js': {
          js: require('docs/src/pages/demos/selects/SimpleSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/SimpleSelect'), 'utf8')
`,
        },
        'pages/demos/selects/NativeSelects.js': {
          js: require('docs/src/pages/demos/selects/NativeSelects').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/NativeSelects'), 'utf8')
`,
        },
        'pages/demos/selects/MultipleSelect.js': {
          js: require('docs/src/pages/demos/selects/MultipleSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/MultipleSelect'), 'utf8')
`,
        },
        'pages/demos/selects/DialogSelect.js': {
          js: require('docs/src/pages/demos/selects/DialogSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/DialogSelect'), 'utf8')
`,
        },
        'pages/demos/selects/ControlledOpenSelect.js': {
          js: require('docs/src/pages/demos/selects/ControlledOpenSelect').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/selects/ControlledOpenSelect'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
