"use strict";

exports.__esModule = true;
exports.useContainerPosition = useContainerPosition;

var React = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("react"));

var _passiveLayoutEffect = /*#__PURE__*/_interopRequireDefault( /*#__PURE__*/require("@react-hook/passive-layout-effect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * A hook for measuring the width of the grid container, as well as its distance
 * from the top of the document. These values are necessary to correctly calculate the number/width
 * of columns to render, as well as the number of rows to render.
 *
 * @param elementRef A `ref` object created by `React.useRef()`. That ref should be provided to the
 *   `containerRef` property in `useMasonry()`.
 * @param deps You can force this hook to recalculate the `offset` and `width` whenever this
 *   dependencies list changes. A common dependencies list might look like `[windowWidth, windowHeight]`,
 *   which would force the hook to recalculate any time the size of the browser `window` changed.
 */
function useContainerPosition(elementRef, deps = emptyArr) {
  const [containerPosition, setContainerPosition] = React.useState({
    offset: 0,
    width: 0
  });
  (0, _passiveLayoutEffect.default)(() => {
    const {
      current
    } = elementRef;

    if (current !== null) {
      let offset = 0;
      let el = current;

      do {
        offset += el.offsetTop || 0;
        el = el.offsetParent;
      } while (el);

      if (offset !== containerPosition.offset || current.offsetWidth !== containerPosition.width) {
        setContainerPosition({
          offset,
          width: current.offsetWidth
        });
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, deps);
  return containerPosition;
}

const emptyArr = [];