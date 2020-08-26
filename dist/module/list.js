import * as React from 'react';
const __reactCreateElement__ = React.createElement;
import { Masonry } from './masonry';

/**
 * This is just a single-column `<Masonry>` component with `rowGutter` prop instead of
 * a `columnGutter` prop.
 */
export function List(props) {
  return /*#__PURE__*/__reactCreateElement__(Masonry, {
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