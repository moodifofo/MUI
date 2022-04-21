import * as React from 'react';
import copy from 'clipboard-copy';

const CodeBlockContext = React.createContext<React.MutableRefObject<HTMLDivElement | null>>({
  current: null,
});

/**
 * How to use: spread the handlers to the .MuiCode-root
 *
 * The html structure should be:
 * <div className="MuiCode-root">
 *  <pre>...</pre>
 *  <button className="MuiCode-copy">...</button>
 * </div>
 */
export const useCodeCopy = () => {
  const rootNode = React.useContext(CodeBlockContext);
  return {
    onMouseEnter: (event: React.MouseEvent) => {
      rootNode.current = event.currentTarget as HTMLDivElement;
    },
    onMouseLeave: (event: React.MouseEvent) => {
      if (rootNode.current === event.currentTarget) {
        rootNode.current = null;
      }
    },
  };
};

const InitCodeCopy = () => {
  const rootNode = React.useContext(CodeBlockContext);
  React.useEffect(() => {
    const codeRoots = document.getElementsByClassName(
      'MuiCode-root',
    ) as HTMLCollectionOf<HTMLDivElement>;

    if (codeRoots !== null) {
      Array.from(codeRoots).forEach((elm) => {
        elm.addEventListener('mouseenter', () => {
          rootNode.current = elm;
        });
        elm.addEventListener('mouseleave', () => {
          if (rootNode.current === elm) {
            rootNode.current = null;
          }
        });
        const btn = elm.querySelector('.MuiCode-copy') as HTMLButtonElement | null;
        if (btn) {
          btn.addEventListener('click', async function handleClick(event) {
            const trigger = event.currentTarget as HTMLButtonElement;
            const pre = (event.currentTarget as Element)?.previousElementSibling as Element;
            trigger.textContent = 'Copied!';
            trigger.dataset.copied = 'true';
            setTimeout(() => {
              if (trigger) {
                trigger.textContent = 'Copy';
                delete trigger.dataset.copied;
              }
            }, 2000);
            try {
              if (pre.textContent) {
                await copy(pre.textContent);
              }
              // eslint-disable-next-line no-empty
            } catch (error) {}
          });
        }
      });
    }
  }, [rootNode]);
  return null;
};

/**
 * Place <CodeCopyProvider> at the page level. It will check the keydown event and try to initiate copy click if rootNode exist.
 * Any code block inside the tree can set the rootNode when mouse enter to leverage keyboard copy.
 */
export const CodeCopyProvider = ({ children }: { children: React.ReactNode }) => {
  const rootNode = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyC' && (!!event.metaKey || !!event.ctrlKey) && !event.shiftKey) {
        if (rootNode.current) {
          const copyBtn = rootNode.current.querySelector(
            '.MuiCode-copy',
          ) as HTMLButtonElement | null;
          if (copyBtn) {
            copyBtn.click();
            if (typeof window !== 'undefined' && 'ga' in window) {
              // @ts-ignore
              window.ga('send', {
                hitType: 'event',
                eventCategory: copyBtn.getAttribute('data-ga-event-category') || 'code',
                eventAction:
                  // the button's `data-ga-event-action` usually is `copy-click`
                  copyBtn.getAttribute('data-ga-event-action')?.replace('click', 'keyboard') ||
                  'copy-keyboard',
                eventLabel: copyBtn.getAttribute('data-ga-event-label'),
              });
            }
          }
        }
      }
    });
  }, []);
  return (
    <CodeBlockContext.Provider value={rootNode}>
      <InitCodeCopy />
      {children}
    </CodeBlockContext.Provider>
  );
};
