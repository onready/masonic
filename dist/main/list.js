"use strict";

exports.__esModule = true;
exports.List = List;

var React = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("react"));

var _masonry = /*#__PURE__*/require("./masonry");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const __reactCreateElement__ = React.createElement;

/**
 * This is just a single-column `<Masonry>` component with `rowGutter` prop instead of
 * a `columnGutter` prop.
 */
function List(props) {
  return /*#__PURE__*/__reactCreateElement__(_masonry.Masonry, {
    role: "list",
    columnGutter: props.rowGutter,
    columnCount: 1,
    columnWidth: 1,
    ...props
  });
}

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  List.displayName = 'List';
}