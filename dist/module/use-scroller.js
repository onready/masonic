import * as React from 'react';
import useScrollPosition from '@react-hook/window-scroll';
import { requestTimeout, clearRequestTimeout } from '@essentials/request-timeout';
/**
 * A hook for tracking whether the `window` is currently being scrolled and it's scroll position on
 * the y-axis. These values are used for determining which grid cells to render and when
 * to add styles to the masonry container that maximize scroll performance.
 *
 * @param offset The vertical space in pixels between the top of the grid container and the top
 *  of the browser `document.documentElement`.
 * @param fps This determines how often (in frames per second) to update the scroll position of the
 *  browser `window` in state, and as a result the rate the masonry grid recalculates its visible cells.
 *  The default value of `12` has been very reasonable in my own testing, but if you have particularly
 *  heavy `render` components it may be prudent to reduce this number.
 */

export function useScroller(offset = 0, fps = 12) {
  const scrollTop = useScrollPosition(fps);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const didMount = React.useRef(0);

  function _ref() {
    // This is here to prevent premature bail outs while maintaining high resolution
    // unsets. Without it there will always bee a lot of unnecessary DOM writes to style.
    setIsScrolling(false);
  }

  React.useEffect(() => {
    if (didMount.current === 1) setIsScrolling(true);
    const to = requestTimeout(_ref, 40 + 1000 / fps);
    didMount.current = 1;
    return () => clearRequestTimeout(to);
  }, [fps, scrollTop]);
  return {
    scrollTop: Math.max(0, scrollTop - offset),
    isScrolling
  };
}