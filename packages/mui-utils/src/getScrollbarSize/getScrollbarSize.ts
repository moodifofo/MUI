// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
export default function getScrollbarSize(win?: Window | null): number {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  if (!win) {
    win = window;
  }
  const documentWidth = win.document.documentElement.clientWidth;
  return Math.abs(win.innerWidth - documentWidth);
}
