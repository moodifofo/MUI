import * as React from 'react';
import { styled, css, keyframes } from '@mui/zero-runtime';

const scale = keyframes({
  to: { scale: 'var(--s2)' },
});

const Link = styled('a', { shouldForwardProp: (prop) => prop !== 'outlined' })<{
  outlined?: boolean;
}>(({ theme }) => ({
  fontSize: '1rem',
  background: 'rgba(0 0 0 / 0.04)',
  padding: '0.5rem 1rem',
  letterSpacing: '1px',
  borderRadius: '4px',
  textAlign: 'center',
  ...theme.applyStyles('dark', {
    background: 'rgba(255 255 255 / 0.1)',
  }),
  variants: [
    {
      props: { outlined: true },
      style: {
        background: 'transparent',
        color: `hsl(${theme.vars.palette.primary})`,
        border: `1px solid hsl(${theme.vars.palette.border})`,
      },
    },
  ],
}));

const Bubble = styled('span')({
  height: 'var(--size, 100%)',
  aspectRatio: '1',
  background: 'radial-gradient(hsl(var(--h) 100% 70%) 25%, transparent 50%)',
  position: 'absolute',
  display: 'inline-block',
  left: 'var(--x, 0)',
  top: 'var(--y, 0)',
  scale: '0',
  translate: '-50% -50%',
  mixBlendMode: 'multiply',
  filter: 'blur(2px)',
  animation: `${scale} var(--s, 2s) var(--d, 0s) infinite alternate`,
});

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateBubbleVars() {
  return `
    --x: ${randomBetween(10, 90)}%;
    --y: ${randomBetween(15, 85)}%;
    --h: ${randomBetween(0, 360)};
    --s2: ${randomBetween(2, 6)};
    --d: -${randomBetween(250, 400) / 1000}s;
    --s: ${randomBetween(3, 6)}s;
  `;
}

export default function Home() {
  return (
    <main
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100lvh',
        padding: '20px',
      })}
    >
      <h1
        className={`
        ${css(({ theme }) => ({
          fontFamily: 'Kalnia, sans-serif',
          fontSize: 'clamp(3rem, 1.385rem + 6.8906vw, 8rem)',
          fontWeight: 500,
          lineHeight: 1,
          textAlign: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          color: '#888',
          marginBottom: '1rem',
          ...theme.applyStyles('dark', { color: '#fff' }),
        }))}`}
      >
        Zero Runtime
        <span
          className={css(({ theme }) => ({
            position: 'absolute',
            inset: '0',
            background: 'white',
            mixBlendMode: 'color-burn',
            overflow: 'hidden',
            pointerEvents: 'none',
            ...theme.applyStyles('dark', {
              mixBlendMode: 'darken',
              filter: 'brightness(2)',
            }),
          }))}
        >
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
          <Bubble
            className={css`
              ${generateBubbleVars()}
            `}
          />
        </span>
      </h1>
      <div
        className={css({
          fontFamily: 'Josefin Sans, sans-serif',
          letterSpacing: '2px',
          fontSize: 'clamp(0.75rem, 0.5885rem + 0.6891vw, 1.25rem)',
          textTransform: 'uppercase',
          fontWeight: 500,
          opacity: 0.5,
          lineHeight: 2,
          textAlign: 'center',
          textWrap: 'balance',
        })}
      >
        CSS-JS library with static extraction
      </div>

      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '3rem',
          '& > *': { flex: 'auto' },
        })}
      >
        <Link
          href="https://github.com/mui/material-ui/blob/master/packages/zero-runtime/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </Link>
        <Link
          outlined
          href="https://github.com/orgs/mui/projects/27/views/1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Roadmap
        </Link>
      </div>
    </main>
  );
}
