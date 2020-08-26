"use strict";

exports.__esModule = true;
exports.useScroller = useScroller;

var React = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("react"));

var _windowScroll = /*#__PURE__*/_interopRequireDefault( /*#__PURE__*/require("@react-hook/window-scroll"));

var _requestTimeout = /*#__PURE__*/require("@essentials/request-timeout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
function useScroller(offset = 0, fps = 12) {
  const scrollTop = (0, _windowScroll.default)(fps);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const didMount = React.useRef(0);

  function _ref() {
    // This is here to prevent premature bail outs while maintaining high resolution
    // unsets. Without it there will always bee a lot of unnecessary DOM writes to style.
    setIsScrolling(false);
  }

  React.useEffect(() => {
    if (didMount.current === 1) setIsScrolling(true);
    const to = (0, _requestTimeout.requestTimeout)(_ref, 40 + 1000 / fps);
    didMount.current = 1;
    return () => (0, _requestTimeout.clearRequestTimeout)(to);
  }, [fps, scrollTop]);
  return {
    scrollTop: Math.max(0, scrollTop - offset),
    isScrolling
  };
}