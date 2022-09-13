import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  demoComponents,
} from 'docs/data/material/discover-more/showcase/showcase.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs demos={demos} docs={docs} demoComponents={demoComponents} disableToc />;
}
