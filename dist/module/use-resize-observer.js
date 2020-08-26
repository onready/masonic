import * as React from 'react';
import trieMemoize from 'trie-memoize';
import ResizeObserver from 'resize-observer-polyfill';
import { elementsCache } from './elements-cache';
import { useForceUpdate } from './use-force-update';

/**
 * Creates a resize observer that forces updates to the grid cell positions when mutations are
 * made to cells affecting their height.
 *
 * @param positioner The masonry cell positioner created by the `usePositioner()` hook.
 */
export function useResizeObserver(positioner) {
  const forceUpdate = useForceUpdate();
  const resizeObserver = createResizeObserver(positioner, forceUpdate); // Cleans up the resize observers when they change or the
  // component unmounts

  function _ref() {
    return resizeObserver.disconnect();
  }

  React.useEffect(() => _ref, [resizeObserver]);
  return resizeObserver;
}
/**
 * Creates a resize observer that fires an `updater` callback whenever the height of
 * one or many cells change. The `useResizeObserver()` hook is using this under the hood.
 *
 * @param positioner A cell positioner created by the `usePositioner()` hook or the `createPositioner()` utility
 * @param updater A callback that fires whenever one or many cell heights change.
 */

export const createResizeObserver = /*#__PURE__*/trieMemoize([WeakMap], // TODO: figure out a way to test this

/* istanbul ignore next */
(positioner, updater) => new ResizeObserver(entries => {
  const updates = [];
  let i = 0;

  for (; i < entries.length; i++) {
    const entry = entries[i];
    const height = entry.target.offsetHeight;

    if (height > 0) {
      const index = elementsCache.get(entry.target);

      if (index !== void 0) {
        const position = positioner.get(index);
        if (position !== void 0 && height !== position.height) updates.push(index, height);
      }
    }
  }

  if (updates.length > 0) {
    // Updates the size/positions of the cell with the resize
    // observer updates
    positioner.update(updates);
    updater(updates);
  }
}));