import fs from 'fs';
import path from 'path';

interface MarkdownPage {
  filename: string;
  pathname: string;
}

/**
 * Returns the markdowns of the documentation in a flat array.
 */
export default function findPagesMarkdown(
  directory: string = path.resolve(__dirname, '../../../docs/data'),
  pagesMarkdown: MarkdownPage[] = [],
) {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const filename = path.resolve(directory, item);

    if (fs.statSync(filename).isDirectory()) {
      findPagesMarkdown(filename, pagesMarkdown);
      return;
    }

    // Ignore non en-US source markdown.
    if (!/\.md$/.test(item) || /-(zh|pt)\.md/.test(item)) {
      return;
    }

    let pathname = filename
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/data/, '')
      .replace('.md', '');

    // Remove the last pathname segment.
    pathname = pathname.split('/').slice(0, 4).join('/');

    pagesMarkdown.push({
      // Relative location of the markdown file in the file system.
      filename,
      // Relative location of the page in the URL.
      pathname,
    });
  });

  return pagesMarkdown;
}
