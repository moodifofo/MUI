import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './july-2019-update.md?@mui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
