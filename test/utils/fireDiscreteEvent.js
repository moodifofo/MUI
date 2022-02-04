import * as React from 'react';
import { configure, fireEvent, getConfig } from '@testing-library/react';

const noWrapper = (callback) => callback();

/**
 * @param {() => void} callback
 * @returns {void}
 */
function withMissingActWarningsIgnored(callback) {
  if (React.version.startsWith('18')) {
    callback();
    return;
  }

  const originalConsoleError = console.error;
  console.error = function silenceMissingActWarnings(message, ...args) {
    const isMissingActWarning = /not wrapped in act\(...\)/.test(message);
    if (!isMissingActWarning) {
      originalConsoleError.call(console, message, ...args);
    }
  };

  const originalConfig = getConfig();
  configure({
    eventWrapper: noWrapper,
  });

  try {
    callback();
  } finally {
    configure(originalConfig);
    console.error = originalConsoleError;
  }
}

// -----------------------------------------
// WARNING ⚠️ WARNING ⚠️ WARNING ⚠️ WARNING
//
// Do not add events here because you want to ignore "missing act()" warnings.
// Only add events if you made sure that React actually considers these as "discrete".
// Be aware that "discrete events" are an implementation detail of React.
// To test discrete events we cannot use `fireEvent` from `@testing-library/react` because they are all wrapped in `act`.
// `act` overrides the "discrete event" semantics with "batching" semantics: https://github.com/facebook/react/blob/3fbd47b86285b6b7bdeab66d29c85951a84d4525/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L1061-L1064
// Note that using `fireEvent` from `@testing-library/dom` would not work since /react configures both `fireEvent` to use `act` as a wrapper.
// -----------------------------------------

export function click(element) {
  return withMissingActWarningsIgnored(() => {
    fireEvent.click(element);
  });
}

/**
 * @param {Element} element
 * @param {{}} [options]
 * @returns {void}
 */
export function keyDown(element, options) {
  return withMissingActWarningsIgnored(() => {
    fireEvent.keyDown(element, options);
  });
}

/**
 * @param {Element} element
 * @param {{}} [options]
 * @returns {void}
 */
export function keyUp(element, options) {
  return withMissingActWarningsIgnored(() => {
    fireEvent.keyUp(element, options);
  });
}

/**
 * @param {Element} element
 * @param {{}} [options]
 * @returns {void}
 */
export function mouseDown(element, options) {
  return withMissingActWarningsIgnored(() => {
    fireEvent.mouseDown(element, options);
  });
}

/**
 * @param {Element} element
 * @param {{}} [options]
 * @returns {void}
 */
export function mouseUp(element, options) {
  return withMissingActWarningsIgnored(() => {
    fireEvent.mouseDown(element, options);
  });
}
