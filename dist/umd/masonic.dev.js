(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Masonic = {}, global.React));
}(this, (function (exports, React) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
      var n = Object.create(null);
      if (e) {
        Object.keys(e).forEach(function (k) {
          if (k !== 'default') {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function () {
                return e[k];
              }
            });
          }
        });
      }
      n['default'] = e;
      return Object.freeze(n);
    }
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var useLatest = function useLatest(current) {
    var storedValue = React.useRef(current);
    storedValue.current = current;
    return storedValue;
  };

  var useDebounceCallback = function useDebounceCallback(callback, wait, leading) {
    if (wait === void 0) {
      wait = 100;
    }

    if (leading === void 0) {
      leading = false;
    }

    var storedCallback = useLatest(callback);
    var timeout = React.useRef();
    var deps = [wait, leading, storedCallback]; // Cleans up pending timeouts when the deps change

    function _ref() {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = void 0;
    }

    React.useEffect(function () {
      return _ref;
    }, deps);

    function _ref2() {
      timeout.current = void 0;
    }

    return React.useCallback(function () {
      // eslint-disable-next-line prefer-rest-params
      var args = arguments;
      var current = timeout.current; // Calls on leading edge

      if (current === void 0 && leading) {
        timeout.current = setTimeout(_ref2, wait); // eslint-disable-next-line prefer-spread

        return storedCallback.current.apply(null, args);
      } // Clear the timeout every call and start waiting again


      current && clearTimeout(current); // Waits for `wait` before invoking the callback

      timeout.current = setTimeout(function () {
        timeout.current = void 0;
        storedCallback.current.apply(null, args);
      }, wait);
    }, deps);
  };
  var useDebounce = function useDebounce(initialState, wait, leading) {
    var state = React.useState(initialState);
    return [state[0], useDebounceCallback(state[1], wait, leading)];
  };

  var usePassiveLayoutEffect = React__namespace[typeof document !== 'undefined' && document.createElement !== void 0 ? 'useLayoutEffect' : 'useEffect'];

  function useEvent(target, type, listener, cleanup) {
    var storedListener = useLatest(listener);
    var storedCleanup = useLatest(cleanup);
    usePassiveLayoutEffect(function () {
      var targetEl = target && 'current' in target ? target.current : target;
      if (!targetEl) return;
      var didUnsubscribe = 0;

      function listener() {
        if (didUnsubscribe) return;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        storedListener.current.apply(this, args);
      }

      targetEl.addEventListener(type, listener);
      var cleanup = storedCleanup.current;
      return function () {
        didUnsubscribe = 1;
        targetEl.removeEventListener(type, listener);
        cleanup && cleanup();
      }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, type]);
  }

  var emptyObj = {};
  var win = typeof window === 'undefined' ? null : window;

  var getSize = function getSize() {
    return [document.documentElement.clientWidth, document.documentElement.clientHeight];
  };

  var useWindowSize = function useWindowSize(options) {
    if (options === void 0) {
      options = emptyObj;
    }

    var _options = options,
        wait = _options.wait,
        leading = _options.leading,
        _options$initialWidth = _options.initialWidth,
        initialWidth = _options$initialWidth === void 0 ? 0 : _options$initialWidth,
        _options$initialHeigh = _options.initialHeight,
        initialHeight = _options$initialHeigh === void 0 ? 0 : _options$initialHeigh;

    var _useDebounce = useDebounce(
    /* istanbul ignore next */
    typeof document === 'undefined' ? [initialWidth, initialHeight] : getSize, wait, leading),
        size = _useDebounce[0],
        setDebouncedSize = _useDebounce[1];

    var setSize = function setSize() {
      return setDebouncedSize(getSize);
    };

    useEvent(win, 'resize', setSize);
    useEvent(win, 'orientationchange', setSize);
    return size;
  };

  var perf = typeof performance !== 'undefined' ? performance : Date;

  var now = function now() {
    return perf.now();
  };

  function useThrottleCallback(callback, fps, leading) {
    if (fps === void 0) {
      fps = 30;
    }

    if (leading === void 0) {
      leading = false;
    }

    var storedCallback = useLatest(callback);
    var ms = 1000 / fps;
    var prev = React.useRef(0);
    var trailingTimeout = React.useRef();

    var clearTrailing = function clearTrailing() {
      return trailingTimeout.current && clearTimeout(trailingTimeout.current);
    };

    var deps = [fps, leading, storedCallback]; // Reset any time the deps change

    function _ref() {
      prev.current = 0;
      clearTrailing();
    }

    React.useEffect(function () {
      return _ref;
    }, deps);
    return React.useCallback(function () {
      // eslint-disable-next-line prefer-rest-params
      var args = arguments;
      var rightNow = now();

      var call = function call() {
        prev.current = rightNow;
        clearTrailing();
        storedCallback.current.apply(null, args);
      };

      var current = prev.current; // leading

      if (leading && current === 0) return call(); // body

      if (rightNow - current > ms) {
        if (current > 0) return call();
        prev.current = rightNow;
      } // trailing


      clearTrailing();
      trailingTimeout.current = setTimeout(function () {
        call();
        prev.current = 0;
      }, ms);
    }, deps);
  }
  function useThrottle(initialState, fps, leading) {
    var state = React.useState(initialState);
    return [state[0], useThrottleCallback(state[1], fps, leading)];
  }

  var win$1 = typeof window === 'undefined' ? null : window;

  var getScrollY = function getScrollY() {
    return win$1.scrollY !== void 0 ? win$1.scrollY : win$1.pageYOffset === void 0 ? 0 : win$1.pageYOffset;
  };

  var useWindowScroll = function useWindowScroll(fps) {
    if (fps === void 0) {
      fps = 30;
    }

    var state = useThrottle(typeof window === 'undefined' ? 0 : getScrollY, fps, true);
    useEvent(win$1, 'scroll', function () {
      return state[1](getScrollY());
    });
    return state[0];
  };

  var u = 'undefined',
      win$2 = typeof window !== u ? window : {},
      p = typeof performance !== u ? performance : Date,
      now$1 = function now() {
    return p.now();
  },
      af = 'AnimationFrame',
      Caf = 'cancel' + af,
      Raf = 'request' + af,
      raf = win$2[Raf] && /*#__PURE__*/win$2[Raf].bind(win$2),
      caf = win$2[Caf] && /*#__PURE__*/win$2[Caf].bind(win$2);

  function _caf(h) {
    return clearTimeout(h);
  }

  if (!raf || !caf) {
    var lastTime = 0;

    raf = function raf(callback) {
      var curr = now$1(),
          next = Math.max(lastTime + 1000 / 60, curr);
      return setTimeout(function () {
        callback(lastTime = next);
      }, next - curr);
    };

    caf = _caf;
  }

  /**
   * Copyright 2011, Joe Lambert.
   * Free to use under the MIT license.
   * http://www.opensource.org/licenses/mit-license.php
   **/
  var clearRequestTimeout = function clearRequestTimeout(handle) {
    caf(handle.v || -1);
  };
  var requestTimeout = function requestTimeout(fn, ms) {
    var start = now$1(),
        handle = {};

    var loop = function loop() {
      now$1() - start >= ms ? fn.call(null) : handle.v = raf(loop);
    };

    handle.v = raf(loop);
    return handle;
  };

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

  function useScroller(offset, fps) {
    if (offset === void 0) {
      offset = 0;
    }

    if (fps === void 0) {
      fps = 12;
    }

    var scrollTop = useWindowScroll(fps);

    var _React$useState = React.useState(false),
        isScrolling = _React$useState[0],
        setIsScrolling = _React$useState[1];

    var didMount = React.useRef(0);

    function _ref() {
      // This is here to prevent premature bail outs while maintaining high resolution
      // unsets. Without it there will always bee a lot of unnecessary DOM writes to style.
      setIsScrolling(false);
    }

    React.useEffect(function () {
      if (didMount.current === 1) setIsScrolling(true);
      var to = requestTimeout(_ref, 40 + 1000 / fps);
      didMount.current = 1;
      return function () {
        return clearRequestTimeout(to);
      };
    }, [fps, scrollTop]);
    return {
      scrollTop: Math.max(0, scrollTop - offset),
      isScrolling: isScrolling
    };
  }

  var createCache = function createCache(obj) {
    try {
      // @ts-ignore
      return new obj();
    } catch (e) {
      var cache = {};
      return {
        set: function set(k, v) {
          cache[k] = v;
        },
        get: function get(k) {
          return cache[k];
        }
      };
    }
  };

  var memo = function memo(constructors) {
    var depth = constructors.length,
        baseCache = createCache(constructors[0]);
    var base;
    var map;
    var i;
    var node;
    var one = depth === 1; // quicker access for one and two-argument functions

    var g1 = function g1(args) {
      return (base = baseCache.get(args[0])) === void 0 || one ? base : base.get(args[1]);
    };

    var s1 = function s1(args, value) {
      if (one) baseCache.set(args[0], value);else {
        if ((base = baseCache.get(args[0])) === void 0) {
          map = createCache(constructors[1]);
          map.set(args[1], value);
          baseCache.set(args[0], map);
        } else {
          base.set(args[1], value);
        }
      }
      return value;
    };

    var g2 = function g2(args) {
      node = baseCache;

      for (i = 0; i < depth; i++) {
        if ((node = node.get(args[i])) === void 0) return;
      }

      return node;
    };

    var s2 = function s2(args, value) {
      node = baseCache;

      for (i = 0; i < depth - 1; i++) {
        if ((map = node.get(args[i])) === void 0) {
          map = createCache(constructors[i + 1]);
          node.set(args[i], map);
          node = map;
        } else {
          node = map;
        }
      }

      node.set(args[depth - 1], value);
      return value;
    };

    return depth < 3 ? {
      g: g1,
      s: s1
    } : {
      g: g2,
      s: s2
    };
  };

  var memoize = function memoize(mapConstructors, fn) {
    var item;

    var _memo = memo(mapConstructors),
        g = _memo.g,
        s = _memo.s;

    return function () {
      return (item = g(arguments)) === void 0 ? s(arguments, fn.apply(null, arguments)) : item;
    };
  };

  var OneKeyMap = function OneKeyMap() {
    this.set = void 0;
    this.get = void 0;
    var key, val;

    this.get = function (k) {
      return k === key ? val : void 0;
    };

    this.set = function (k, v) {
      key = k;
      val = v;
    };
  };

  var memoOne = function memoOne(fn, areEqual) {
    var equal = areEqual || defaultAreEqual;
    var args, value;
    return function () {
      return !!args && equal(arguments, args) ? value : value = fn.apply(null, args = arguments);
    };
  };

  var defaultAreEqual = function defaultAreEqual(current, prev) {
    return current[0] === prev[0] && current[1] === prev[1] && current[2] === prev[2] && current[3] === prev[3];
  };

  var elementsCache = /*#__PURE__*/new Map();

  function useForceUpdate() {
    var setState = React.useState(emptyObj$1)[1];
    return React.useRef(function () {
      return setState({});
    }).current;
  }
  var emptyObj$1 = {};

  var __reactCreateElement__ = React.createElement;

  /**
   * This hook handles the render phases of the masonry layout and returns the grid as a React element.
   *
   * @param options Options for configuring the masonry layout renderer. See `UseMasonryOptions`.
   */
  function useMasonry(_ref) {
    var positioner = _ref.positioner,
        resizeObserver = _ref.resizeObserver,
        items = _ref.items,
        _ref$as = _ref.as,
        ContainerComponent = _ref$as === void 0 ? 'div' : _ref$as,
        id = _ref.id,
        className = _ref.className,
        style = _ref.style,
        _ref$role = _ref.role,
        role = _ref$role === void 0 ? 'grid' : _ref$role,
        _ref$tabIndex = _ref.tabIndex,
        tabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
        containerRef = _ref.containerRef,
        _ref$itemAs = _ref.itemAs,
        ItemComponent = _ref$itemAs === void 0 ? 'div' : _ref$itemAs,
        itemStyle = _ref.itemStyle,
        _ref$itemHeightEstima = _ref.itemHeightEstimate,
        itemHeightEstimate = _ref$itemHeightEstima === void 0 ? 300 : _ref$itemHeightEstima,
        _ref$itemKey = _ref.itemKey,
        itemKey = _ref$itemKey === void 0 ? defaultGetItemKey : _ref$itemKey,
        _ref$overscanBy = _ref.overscanBy,
        overscanBy = _ref$overscanBy === void 0 ? 2 : _ref$overscanBy,
        scrollTop = _ref.scrollTop,
        isScrolling = _ref.isScrolling,
        height = _ref.height,
        RenderComponent = _ref.render,
        onRender = _ref.onRender;
    var startIndex = 0;
    var stopIndex = void 0;
    var forceUpdate = useForceUpdate();
    var setItemRef = getRefSetter(positioner, resizeObserver);
    var itemCount = items.length;
    var columnWidth = positioner.columnWidth,
        columnCount = positioner.columnCount,
        range = positioner.range,
        estimateHeight = positioner.estimateHeight,
        size = positioner.size,
        shortestColumn = positioner.shortestColumn;
    var measuredCount = size();
    var shortestColumnSize = shortestColumn();
    var children = [];
    var itemRole = role + 'item';
    var storedOnRender = useLatest(onRender);
    overscanBy = height * overscanBy;
    var rangeEnd = scrollTop + overscanBy;
    var needsFreshBatch = shortestColumnSize < rangeEnd && measuredCount < itemCount;
    range( // We overscan in both directions because users scroll both ways,
    // though one must admit scrolling down is more common and thus
    // we only overscan by half the downward overscan amount
    Math.max(0, scrollTop - overscanBy / 2), rangeEnd, function (index, left, top) {
      var data = items[index];
      var key = itemKey(data, index);
      var phaseTwoStyle = {
        top: top,
        left: left,
        width: columnWidth,
        writingMode: 'horizontal-tb',
        position: 'absolute'
      };
      /* istanbul ignore next */

      if (typeof process !== 'undefined' && "production" !== 'production') {
        throwWithoutData(data, index);
      }

      children.push( /*#__PURE__*/__reactCreateElement__(ItemComponent, {
        key: key,
        ref: setItemRef(index),
        role: itemRole,
        style: typeof itemStyle === 'object' && itemStyle !== null ? _extends({}, phaseTwoStyle, itemStyle) : phaseTwoStyle
      }, createRenderElement(RenderComponent, index, data, columnWidth)));

      if (stopIndex === void 0) {
        startIndex = index;
        stopIndex = index;
      } else {
        startIndex = Math.min(startIndex, index);
        stopIndex = Math.max(stopIndex, index);
      }
    });

    if (needsFreshBatch) {
      var batchSize = Math.min(itemCount - measuredCount, Math.ceil((scrollTop + overscanBy - shortestColumnSize) / itemHeightEstimate * columnCount));
      var _index = measuredCount;
      var phaseOneStyle = getCachedSize(columnWidth);

      for (; _index < measuredCount + batchSize; _index++) {
        var _data = items[_index];
        var key = itemKey(_data, _index);
        /* istanbul ignore next */

        if (typeof process !== 'undefined' && "production" !== 'production') {
          throwWithoutData(_data, _index);
        }

        children.push( /*#__PURE__*/__reactCreateElement__(ItemComponent, {
          key: key,
          ref: setItemRef(_index),
          role: itemRole,
          style: typeof itemStyle === 'object' ? _extends({}, phaseOneStyle, itemStyle) : phaseOneStyle
        }, createRenderElement(RenderComponent, _index, _data, columnWidth)));
      }
    } // Calls the onRender callback if the rendered indices changed


    React.useEffect(function () {
      if (typeof storedOnRender.current === 'function' && stopIndex !== void 0) storedOnRender.current(startIndex, stopIndex, items);
      didEverMount = '1';
    }, [startIndex, stopIndex, items, storedOnRender]); // If we needed a fresh batch we should reload our components with the measured
    // sizes

    React.useEffect(function () {
      if (needsFreshBatch) forceUpdate(); // eslint-disable-next-line
    }, [needsFreshBatch]); // gets the container style object based upon the estimated height and whether or not
    // the page is being scrolled

    var containerStyle = getContainerStyle(isScrolling, estimateHeight(itemCount, itemHeightEstimate));
    return /*#__PURE__*/__reactCreateElement__(ContainerComponent, {
      ref: containerRef,
      key: didEverMount,
      id: id,
      role: role,
      className: className,
      tabIndex: tabIndex,
      style: typeof style === 'object' ? assignUserStyle(containerStyle, style) : containerStyle,
      children: children
    });
  }
  /* istanbul ignore next */

  function throwWithoutData(data, index) {
    if (!data) {
      throw new Error("No data was found at index: " + index + "\n\n" + "This usually happens when you've mutated or changed the \"items\" array in a " + "way that makes it shorter than the previous \"items\" array. Masonic knows nothing " + "about your underlying data and when it caches cell positions, it assumes you aren't " + "mutating the underlying \"items\".\n\n" + "See https://codesandbox.io/s/masonic-w-react-router-example-2b5f9?file=/src/index.js for " + "an example that gets around this limitations. For advanced implementations, see " + "https://codesandbox.io/s/masonic-w-react-router-and-advanced-config-example-8em42?file=/src/index.js\n\n" + "If this was the result of your removing an item from your \"items\", see this issue: " + "https://github.com/jaredLunde/masonic/issues/12");
    }
  } // This is for triggering a remount after SSR has loaded in the client w/ hydrate()


  var didEverMount = '0';
  //
  // Render-phase utilities
  // ~5.5x faster than createElement without the memo
  var createRenderElement = /*#__PURE__*/memoize([OneKeyMap, {}, WeakMap, OneKeyMap], function (RenderComponent, index, data, columnWidth) {
    return /*#__PURE__*/__reactCreateElement__(RenderComponent, {
      index: index,
      data: data,
      width: columnWidth
    });
  });
  var getContainerStyle = /*#__PURE__*/memoOne(function (isScrolling, estimateHeight) {
    return {
      position: 'relative',
      width: '100%',
      maxWidth: '100%',
      height: Math.ceil(estimateHeight),
      maxHeight: Math.ceil(estimateHeight),
      willChange: isScrolling ? 'contents' : void 0,
      pointerEvents: isScrolling ? 'none' : void 0
    };
  });

  var cmp2 = function cmp2(args, pargs) {
    return args[0] === pargs[0] && args[1] === pargs[1];
  };

  var assignUserStyle = /*#__PURE__*/memoOne(function (containerStyle, userStyle) {
    return _extends({}, containerStyle, userStyle);
  }, // @ts-ignore
  cmp2);

  function defaultGetItemKey(_, i) {
    return i;
  } // the below memoizations for for ensuring shallow equal is reliable for pure
  // component children


  var getCachedSize = /*#__PURE__*/memoOne(function (width) {
    return {
      width: width,
      zIndex: -1000,
      visibility: 'hidden',
      position: 'absolute',
      writingMode: 'horizontal-tb'
    };
  }, function (args, pargs) {
    return args[0] === pargs[0];
  });
  var getRefSetter = /*#__PURE__*/memoOne(function (positioner, resizeObserver) {
    return function (index) {
      return function (el) {
        if (el === null) return;

        if (resizeObserver) {
          resizeObserver.observe(el);
          elementsCache.set(el, index);
        }

        if (positioner.get(index) === void 0) positioner.set(index, el.offsetHeight);
      };
    };
  }, // @ts-ignore
  cmp2);

  /**
   * A heavily-optimized component that updates `useMasonry()` when the scroll position of the browser `window`
   * changes. This bare-metal component is used by `<Masonry>` under the hood.
   */
  function MasonryScroller(props) {
    // We put this in its own layer because it's the thing that will trigger the most updates
    // and we don't want to slower ourselves by cycling through all the functions, objects, and effects
    // of other hooks
    var _useScroller = useScroller(props.offset, props.scrollFps),
        scrollTop = _useScroller.scrollTop,
        isScrolling = _useScroller.isScrolling; // This is an update-heavy phase and while we could just Object.assign here,
    // it is way faster to inline and there's a relatively low hit to he bundle
    // size.


    return useMasonry({
      scrollTop: scrollTop,
      isScrolling: isScrolling,
      positioner: props.positioner,
      resizeObserver: props.resizeObserver,
      items: props.items,
      onRender: props.onRender,
      as: props.as,
      id: props.id,
      className: props.className,
      style: props.style,
      role: props.role,
      tabIndex: props.tabIndex,
      containerRef: props.containerRef,
      itemAs: props.itemAs,
      itemStyle: props.itemStyle,
      itemHeightEstimate: props.itemHeightEstimate,
      itemKey: props.itemKey,
      overscanBy: props.overscanBy,
      height: props.height,
      render: props.render
    });
  }

  if (typeof process !== 'undefined' && "production" !== 'production') {
    MasonryScroller.displayName = 'MasonryScroller';
  }

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

  function useContainerPosition(elementRef, deps) {
    if (deps === void 0) {
      deps = emptyArr;
    }

    var _React$useState = React.useState({
      offset: 0,
      width: 0
    }),
        containerPosition = _React$useState[0],
        setContainerPosition = _React$useState[1];

    usePassiveLayoutEffect(function () {
      var current = elementRef.current;

      if (current !== null) {
        var offset = 0;
        var el = current;

        do {
          offset += el.offsetTop || 0;
          el = el.offsetParent;
        } while (el);

        if (offset !== containerPosition.offset || current.offsetWidth !== containerPosition.width) {
          setContainerPosition({
            offset: offset,
            width: current.offsetWidth
          });
        }
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, deps);
    return containerPosition;
  }
  var emptyArr = [];

  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index) {
      if (entry[0] === key) {
        result = index;
        return true;
      }

      return false;
    });
    return result;
  }

  function class_1() {
    this.__entries__ = [];
  }

  function _get() {
    return this.__entries__.length;
  }

  function _ref(key) {
    var index = getIndex(this.__entries__, key);
    var entry = this.__entries__[index];
    return entry && entry[1];
  }

  function _ref2(key, value) {
    var index = getIndex(this.__entries__, key);

    if (~index) {
      this.__entries__[index][1] = value;
    } else {
      this.__entries__.push([key, value]);
    }
  }

  function _ref3(key) {
    var entries = this.__entries__;
    var index = getIndex(entries, key);

    if (~index) {
      entries.splice(index, 1);
    }
  }

  function _ref4(key) {
    return !!~getIndex(this.__entries__, key);
  }

  function _ref5() {
    this.__entries__.splice(0);
  }

  function _ref6(callback, ctx) {
    if (ctx === void 0) {
      ctx = null;
    }

    for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
      var entry = _a[_i];
      callback.call(ctx, entry[1], entry[0]);
    }
  }

  function _ref7() {
    Object.defineProperty(class_1.prototype, "size", {
      /**
       * @returns {boolean}
       */
      get: _get,
      enumerable: true,
      configurable: true
    });
    /**
     * @param {*} key
     * @returns {*}
     */

    class_1.prototype.get = _ref;
    /**
     * @param {*} key
     * @param {*} value
     * @returns {void}
     */

    class_1.prototype.set = _ref2;
    /**
     * @param {*} key
     * @returns {void}
     */

    class_1.prototype.delete = _ref3;
    /**
     * @param {*} key
     * @returns {void}
     */

    class_1.prototype.has = _ref4;
    /**
     * @returns {void}
     */

    class_1.prototype.clear = _ref5;
    /**
     * @param {Function} callback
     * @param {*} [ctx=null]
     * @returns {void}
     */

    class_1.prototype.forEach = _ref6;
    return class_1;
  }

  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */

  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = /*#__PURE__*/function () {
    if (typeof Map !== 'undefined') {
      return Map;
    }

    return (
      /** @class */
      _ref7()
    );
  }();
  /**
   * Detects whether window and document objects are available in current environment.
   */


  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document; // Returns global object of a current environment.

  var global$1 = /*#__PURE__*/function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
      return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
      return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
      return window;
    } // eslint-disable-next-line no-new-func


    return Function('return this')();
  }();
  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */


  function _ref8(callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1000 / 60);
  }

  var requestAnimationFrame$1 = /*#__PURE__*/function () {
    if (typeof requestAnimationFrame === 'function') {
      // It's required to use a bounded function because IE sometimes throws
      // an "Invalid calling object" error if rAF is invoked without the global
      // object on the left hand side.
      return requestAnimationFrame.bind(global$1);
    }

    return _ref8;
  }(); // Defines minimum timeout before adding a trailing call.


  var trailingTimeout = 2;
  /**
   * Creates a wrapper function which ensures that provided callback will be
   * invoked only once during the specified delay period.
   *
   * @param {Function} callback - Function to be invoked after the delay period.
   * @param {number} delay - Delay after which to invoke callback.
   * @returns {Function}
   */

  function throttle(callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */

    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }

      if (trailingCall) {
        proxy();
      }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */


    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */


    function proxy() {
      var timeStamp = Date.now();

      if (leadingCall) {
        // Reject immediately following calls.
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        } // Schedule new call to be in invoked when the pending one is resolved.
        // This is important for "transitions" which never actually start
        // immediately so there is a chance that we might miss one if change
        // happens amids the pending invocation.


        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }

      lastCallTime = timeStamp;
    }

    return proxy;
  } // Minimum delay before invoking the update of observers.


  var REFRESH_DELAY = 20; // A list of substrings of CSS properties used to find transition events that
  // might affect dimensions of observed elements.

  var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight']; // Check if MutationObserver is available.

  var mutationObserverSupported = typeof MutationObserver !== 'undefined';
  /**
   * Singleton controller class which handles updates of ResizeObserver instances.
   */

  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function _ResizeObserverContro() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false;
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */

    this.mutationEventsAdded_ = false;
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */

    this.mutationsObserver_ = null;
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */

    this.observers_ = [];
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */


  function _ref9(observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    } // Add listeners if they haven't been added yet.


    if (!this.connected_) {
      this.connect_();
    }
  }

  function _ref10(observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer); // Remove observer if it's present in registry.

    if (~index) {
      observers.splice(index, 1);
    } // Remove listeners if controller has no connected observers.


    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  }

  function _ref11() {
    var changesDetected = this.updateObservers_(); // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.

    if (changesDetected) {
      this.refresh();
    }
  }

  function _ref12(observer) {
    return observer.gatherActive(), observer.hasActive();
  }

  function _ref13(observer) {
    return observer.broadcastActive();
  }

  function _ref14() {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(_ref12); // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.

    activeObservers.forEach(_ref13);
    return activeObservers.length > 0;
  }

  function _ref15() {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return;
    } // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.


    document.addEventListener('transitionend', this.onTransitionEnd_);
    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      document.addEventListener('DOMSubtreeModified', this.refresh);
      this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
  }

  function _ref16() {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  }

  function _ref17(_a) {
    var _b = _a.propertyName,
        propertyName = _b === void 0 ? '' : _b; // Detect whether transition may affect dimensions of an element.

    var isReflowProperty = transitionKeys.some(function (key) {
      return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
      this.refresh();
    }
  }

  function _ref18() {
    if (!this.instance_) {
      this.instance_ = new _ResizeObserverContro();
    }

    return this.instance_;
  }

  var ResizeObserverController =
  /*#__PURE__*/

  /** @class */
  function () {
    _ResizeObserverContro.prototype.addObserver = _ref9;
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */

    _ResizeObserverContro.prototype.removeObserver = _ref10;
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */

    _ResizeObserverContro.prototype.refresh = _ref11;
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */

    _ResizeObserverContro.prototype.updateObservers_ = _ref14;
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */

    _ResizeObserverContro.prototype.connect_ = _ref15;
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */

    _ResizeObserverContro.prototype.disconnect_ = _ref16;
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */

    _ResizeObserverContro.prototype.onTransitionEnd_ = _ref17;
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */

    _ResizeObserverContro.getInstance = _ref18;
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */

    _ResizeObserverContro.instance_ = null;
    return _ResizeObserverContro;
  }();
  /**
   * Defines non-writable/enumerable properties of the provided target object.
   *
   * @param {Object} target - Object for which to define properties.
   * @param {Object} props - Properties to be defined.
   * @returns {Object} Target object.
   */


  var defineConfigurable = function defineConfigurable(target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
      var key = _a[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }

    return target;
  };
  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */


  var getWindowOf = function getWindowOf(target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView; // Return the local global object if it's not possible extract one from
    // provided element.

    return ownerGlobal || global$1;
  }; // Placeholder of an empty content rectangle.


  var emptyRect = /*#__PURE__*/createRectInit(0, 0, 0, 0);
  /**
   * Converts provided string to a number.
   *
   * @param {number|string} value
   * @returns {number}
   */

  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  /**
   * Extracts borders size from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @param {...string} positions - Borders positions (top, right, ...)
   * @returns {number}
   */


  function getBordersSize(styles) {
    var positions = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }

    return positions.reduce(function (size, position) {
      var value = styles['border-' + position + '-width'];
      return size + toFloat(value);
    }, 0);
  }
  /**
   * Extracts paddings sizes from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {Object} Paddings box.
   */


  function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles['padding-' + position];
      paddings[position] = toFloat(value);
    }

    return paddings;
  }
  /**
   * Calculates content rectangle of provided SVG element.
   *
   * @param {SVGGraphicsElement} target - Element content rectangle of which needs
   *      to be calculated.
   * @returns {DOMRectInit}
   */


  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  /**
   * Calculates content rectangle of provided HTMLElement.
   *
   * @param {HTMLElement} target - Element for which to calculate the content rectangle.
   * @returns {DOMRectInit}
   */


  function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth,
        clientHeight = target.clientHeight; // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.

    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom; // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.

    var width = toFloat(styles.width),
        height = toFloat(styles.height); // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).

    if (styles.boxSizing === 'border-box') {
      // Following conditions are required to handle Internet Explorer which
      // doesn't include paddings and borders to computed CSS dimensions.
      //
      // We can say that if CSS dimensions + paddings are equal to the "client"
      // properties then it's either IE, and thus we don't need to subtract
      // anything, or an element merely doesn't have paddings/borders styles.
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, 'left', 'right') + horizPad;
      }

      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
      }
    } // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.


    if (!isDocumentElement(target)) {
      // In some browsers (only in Firefox, actually) CSS width & height
      // include scroll bars size which can be removed at this step as scroll
      // bars are the only difference between rounded dimensions + paddings
      // and "client" properties, though that is not always true in Chrome.
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight; // Chrome has a rather weird rounding of "client" properties.
      // E.g. for an element with content width of 314.2px it sometimes gives
      // the client width of 315px and for the width of 314.7px it may give
      // 314px. And it doesn't happen all the time. So just ignore this delta
      // as a non-relevant.

      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }

      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
  }
  /**
   * Checks whether provided element is an instance of the SVGGraphicsElement.
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */


  function _ref19(target) {
    return target instanceof getWindowOf(target).SVGGraphicsElement;
  }

  function _ref20(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
  }

  var isSVGGraphicsElement = /*#__PURE__*/function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
      return _ref19;
    } // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens


    return _ref20;
  }();
  /**
   * Checks whether provided element is a document element (<html>).
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */


  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  /**
   * Calculates an appropriate content rectangle for provided html or svg element.
   *
   * @param {Element} target - Element content rectangle of which needs to be calculated.
   * @returns {DOMRectInit}
   */


  function getContentRect(target) {
    if (!isBrowser) {
      return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
  }
  /**
   * Creates rectangle with an interface of the DOMRectReadOnly.
   * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
   *
   * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
   * @returns {DOMRectReadOnly}
   */


  function createReadOnlyRect(_a) {
    var x = _a.x,
        y = _a.y,
        width = _a.width,
        height = _a.height; // If DOMRectReadOnly is available use it as a prototype for the rectangle.

    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype); // Rectangle's properties are not writable and non-enumerable.

    defineConfigurable(rect, {
      x: x,
      y: y,
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  /**
   * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
   * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} width - Rectangle's width.
   * @param {number} height - Rectangle's height.
   * @returns {DOMRectInit}
   */


  function createRectInit(x, y, width, height) {
    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  }
  /**
   * Class that is responsible for computations of the content rectangle of
   * provided DOM element and for keeping track of it's changes.
   */


  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function _ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0;
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */

    this.broadcastHeight = 0;
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */

    this.contentRect_ = createRectInit(0, 0, 0, 0);
    this.target = target;
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */


  function _ref21() {
    var rect = getContentRect(this.target);
    this.contentRect_ = rect;
    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
  }

  function _ref22() {
    var rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  }

  var ResizeObservation =
  /*#__PURE__*/

  /** @class */
  function () {
    _ResizeObservation.prototype.isActive = _ref21;
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */

    _ResizeObservation.prototype.broadcastRect = _ref22;
    return _ResizeObservation;
  }();

  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function _ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit); // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.

    defineConfigurable(this, {
      target: target,
      contentRect: contentRect
    });
  }

  var ResizeObserverEntry =
  /*#__PURE__*/

  /** @class */
  function () {
    return _ResizeObserverEntry;
  }();

  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function _ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = [];
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */

    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
      throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */


  function _ref23(target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is already being observed.

    if (observations.has(target)) {
      return;
    }

    observations.set(target, new ResizeObservation(target));
    this.controller_.addObserver(this); // Force the update of observations.

    this.controller_.refresh();
  }

  function _ref24(target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is not being observed.

    if (!observations.has(target)) {
      return;
    }

    observations.delete(target);

    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  }

  function _ref25() {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  }

  function _ref26() {
    var _this = this;

    this.clearActive();
    this.observations_.forEach(function (observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation);
      }
    });
  }

  function _ref27(observation) {
    return new ResizeObserverEntry(observation.target, observation.broadcastRect());
  }

  function _ref28() {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return;
    }

    var ctx = this.callbackCtx_; // Create ResizeObserverEntry instance for every active observation.

    var entries = this.activeObservations_.map(_ref27);
    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
  }

  function _ref29() {
    this.activeObservations_.splice(0);
  }

  function _ref30() {
    return this.activeObservations_.length > 0;
  }

  var ResizeObserverSPI =
  /*#__PURE__*/

  /** @class */
  function () {
    _ResizeObserverSPI.prototype.observe = _ref23;
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */

    _ResizeObserverSPI.prototype.unobserve = _ref24;
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */

    _ResizeObserverSPI.prototype.disconnect = _ref25;
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */

    _ResizeObserverSPI.prototype.gatherActive = _ref26;
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */

    _ResizeObserverSPI.prototype.broadcastActive = _ref28;
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */

    _ResizeObserverSPI.prototype.clearActive = _ref29;
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */

    _ResizeObserverSPI.prototype.hasActive = _ref30;
    return _ResizeObserverSPI;
  }(); // Registry of internal observers. If WeakMap is not available use current shim
  // for the Map collection as it has all required methods and because WeakMap
  // can't be fully polyfilled anyway.


  var observers = typeof WeakMap !== 'undefined' ? /*#__PURE__*/new WeakMap() : /*#__PURE__*/new MapShim();
  /**
   * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
   * exposing only those methods and properties that are defined in the spec.
   */

  var ResizeObserver =
  /*#__PURE__*/

  /** @class */
  function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
      if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
      }

      if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
      }

      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }

    return ResizeObserver;
  }(); // Expose public methods of ResizeObserver.


  ['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
      var _a;

      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });

  var index = /*#__PURE__*/function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
      return global$1.ResizeObserver;
    }

    return ResizeObserver;
  }();

  /**
   * Creates a resize observer that forces updates to the grid cell positions when mutations are
   * made to cells affecting their height.
   *
   * @param positioner The masonry cell positioner created by the `usePositioner()` hook.
   */
  function useResizeObserver(positioner) {
    var forceUpdate = useForceUpdate();
    var resizeObserver = createResizeObserver(positioner, forceUpdate); // Cleans up the resize observers when they change or the
    // component unmounts

    function _ref() {
      return resizeObserver.disconnect();
    }

    React.useEffect(function () {
      return _ref;
    }, [resizeObserver]);
    return resizeObserver;
  }
  /**
   * Creates a resize observer that fires an `updater` callback whenever the height of
   * one or many cells change. The `useResizeObserver()` hook is using this under the hood.
   *
   * @param positioner A cell positioner created by the `usePositioner()` hook or the `createPositioner()` utility
   * @param updater A callback that fires whenever one or many cell heights change.
   */

  var createResizeObserver = /*#__PURE__*/memoize([WeakMap], // TODO: figure out a way to test this

  /* istanbul ignore next */
  function (positioner, updater) {
    return new index(function (entries) {
      var updates = [];
      var i = 0;

      for (; i < entries.length; i++) {
        var entry = entries[i];
        var height = entry.target.offsetHeight;

        if (height > 0) {
          var index = elementsCache.get(entry.target);

          if (index !== void 0) {
            var position = positioner.get(index);
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
    });
  });

  var RED = 0;
  var BLACK = 1;
  var NIL = 2;
  var DELETE = 0;
  var KEEP = 1;

  function addInterval(treeNode, high, index) {
    var node = treeNode.list;
    var prevNode;

    while (node) {
      if (node.index === index) return false;
      if (high > node.high) break;
      prevNode = node;
      node = node.next;
    }

    if (!prevNode) treeNode.list = {
      index: index,
      high: high,
      next: node
    };
    if (prevNode) prevNode.next = {
      index: index,
      high: high,
      next: prevNode.next
    };
    return true;
  }

  function removeInterval(treeNode, index) {
    var node = treeNode.list;

    if (node.index === index) {
      if (node.next === null) return DELETE;
      treeNode.list = node.next;
      return KEEP;
    }

    var prevNode = node;
    node = node.next;

    while (node !== null) {
      if (node.index === index) {
        prevNode.next = node.next;
        return KEEP;
      }

      prevNode = node;
      node = node.next;
    }
  }

  var NULL_NODE = {
    low: 0,
    max: 0,
    high: 0,
    C: NIL,
    // @ts-ignore
    P: undefined,
    // @ts-ignore
    R: undefined,
    // @ts-ignore
    L: undefined,
    // @ts-ignore
    list: undefined
  };
  NULL_NODE.P = NULL_NODE;
  NULL_NODE.L = NULL_NODE;
  NULL_NODE.R = NULL_NODE;

  function updateMax(node) {
    var max = node.high;
    if (node.L === NULL_NODE && node.R === NULL_NODE) node.max = max;else if (node.L === NULL_NODE) node.max = Math.max(node.R.max, max);else if (node.R === NULL_NODE) node.max = Math.max(node.L.max, max);else node.max = Math.max(Math.max(node.L.max, node.R.max), max);
  }

  function updateMaxUp(node) {
    var x = node;

    while (x.P !== NULL_NODE) {
      updateMax(x.P);
      x = x.P;
    }
  }

  function rotateLeft(tree, x) {
    if (x.R === NULL_NODE) return;
    var y = x.R;
    x.R = y.L;
    if (y.L !== NULL_NODE) y.L.P = x;
    y.P = x.P;
    if (x.P === NULL_NODE) tree.root = y;else {
      if (x === x.P.L) x.P.L = y;else x.P.R = y;
    }
    y.L = x;
    x.P = y;
    updateMax(x);
    updateMax(y);
  }

  function rotateRight(tree, x) {
    if (x.L === NULL_NODE) return;
    var y = x.L;
    x.L = y.R;
    if (y.R !== NULL_NODE) y.R.P = x;
    y.P = x.P;
    if (x.P === NULL_NODE) tree.root = y;else {
      if (x === x.P.R) x.P.R = y;else x.P.L = y;
    }
    y.R = x;
    x.P = y;
    updateMax(x);
    updateMax(y);
  }

  function replaceNode(tree, x, y) {
    if (x.P === NULL_NODE) tree.root = y;else if (x === x.P.L) x.P.L = y;else x.P.R = y;
    y.P = x.P;
  }

  function fixRemove(tree, x) {
    var w;

    while (x !== NULL_NODE && x.C === BLACK) {
      if (x === x.P.L) {
        w = x.P.R;

        if (w.C === RED) {
          w.C = BLACK;
          x.P.C = RED;
          rotateLeft(tree, x.P);
          w = x.P.R;
        }

        if (w.L.C === BLACK && w.R.C === BLACK) {
          w.C = RED;
          x = x.P;
        } else {
          if (w.R.C === BLACK) {
            w.L.C = BLACK;
            w.C = RED;
            rotateRight(tree, w);
            w = x.P.R;
          }

          w.C = x.P.C;
          x.P.C = BLACK;
          w.R.C = BLACK;
          rotateLeft(tree, x.P);
          x = tree.root;
        }
      } else {
        w = x.P.L;

        if (w.C === RED) {
          w.C = BLACK;
          x.P.C = RED;
          rotateRight(tree, x.P);
          w = x.P.L;
        }

        if (w.R.C === BLACK && w.L.C === BLACK) {
          w.C = RED;
          x = x.P;
        } else {
          if (w.L.C === BLACK) {
            w.R.C = BLACK;
            w.C = RED;
            rotateLeft(tree, w);
            w = x.P.L;
          }

          w.C = x.P.C;
          x.P.C = BLACK;
          w.L.C = BLACK;
          rotateRight(tree, x.P);
          x = tree.root;
        }
      }
    }

    x.C = BLACK;
  }

  function minimumTree(x) {
    while (x.L !== NULL_NODE) {
      x = x.L;
    }

    return x;
  }

  function fixInsert(tree, z) {
    var y;

    while (z.P.C === RED) {
      if (z.P === z.P.P.L) {
        y = z.P.P.R;

        if (y.C === RED) {
          z.P.C = BLACK;
          y.C = BLACK;
          z.P.P.C = RED;
          z = z.P.P;
        } else {
          if (z === z.P.R) {
            z = z.P;
            rotateLeft(tree, z);
          }

          z.P.C = BLACK;
          z.P.P.C = RED;
          rotateRight(tree, z.P.P);
        }
      } else {
        y = z.P.P.L;

        if (y.C === RED) {
          z.P.C = BLACK;
          y.C = BLACK;
          z.P.P.C = RED;
          z = z.P.P;
        } else {
          if (z === z.P.L) {
            z = z.P;
            rotateRight(tree, z);
          }

          z.P.C = BLACK;
          z.P.P.C = RED;
          rotateLeft(tree, z.P.P);
        }
      }
    }

    tree.root.C = BLACK;
  }

  function createIntervalTree() {
    var tree = {
      root: NULL_NODE,
      size: 0
    }; // we know these indexes are a consistent, safe way to make look ups
    // for our case so it's a solid O(1) alternative to
    // the O(log n) searchNode() in typical interval trees

    var indexMap = {};
    return {
      insert: function insert(low, high, index) {
        var x = tree.root;
        var y = NULL_NODE;

        while (x !== NULL_NODE) {
          y = x;
          if (low === y.low) break;
          if (low < x.low) x = x.L;else x = x.R;
        }

        if (low === y.low && y !== NULL_NODE) {
          if (!addInterval(y, high, index)) return;
          y.high = Math.max(y.high, high);
          updateMax(y);
          updateMaxUp(y);
          indexMap[index] = y;
          tree.size++;
          return;
        }

        var z = {
          low: low,
          high: high,
          max: high,
          C: RED,
          P: y,
          L: NULL_NODE,
          R: NULL_NODE,
          list: {
            index: index,
            high: high,
            next: null
          }
        };

        if (y === NULL_NODE) {
          tree.root = z;
        } else {
          if (z.low < y.low) y.L = z;else y.R = z;
          updateMaxUp(z);
        }

        fixInsert(tree, z);
        indexMap[index] = z;
        tree.size++;
      },
      remove: function remove(index) {
        var z = indexMap[index];
        if (z === void 0) return;
        delete indexMap[index];
        var intervalResult = removeInterval(z, index);
        if (intervalResult === void 0) return;

        if (intervalResult === KEEP) {
          z.high = z.list.high;
          updateMax(z);
          updateMaxUp(z);
          tree.size--;
          return;
        }

        var y = z;
        var originalYColor = y.C;
        var x;

        if (z.L === NULL_NODE) {
          x = z.R;
          replaceNode(tree, z, z.R);
        } else if (z.R === NULL_NODE) {
          x = z.L;
          replaceNode(tree, z, z.L);
        } else {
          y = minimumTree(z.R);
          originalYColor = y.C;
          x = y.R;

          if (y.P === z) {
            x.P = y;
          } else {
            replaceNode(tree, y, y.R);
            y.R = z.R;
            y.R.P = y;
          }

          replaceNode(tree, z, y);
          y.L = z.L;
          y.L.P = y;
          y.C = z.C;
        }

        updateMax(x);
        updateMaxUp(x);
        if (originalYColor === BLACK) fixRemove(tree, x);
        tree.size--;
      },
      search: function search(low, high, callback) {
        var stack = [tree.root];

        while (stack.length !== 0) {
          var node = stack.pop();
          if (node === NULL_NODE || low > node.max) continue;
          if (node.L !== NULL_NODE) stack.push(node.L);
          if (node.R !== NULL_NODE) stack.push(node.R);

          if (node.low <= high && node.high >= low) {
            var curr = node.list;

            while (curr !== null) {
              if (curr.high >= low) callback(curr.index, node.low);
              curr = curr.next;
            }
          }
        }
      },

      get size() {
        return tree.size;
      }

    };
  }

  /**
   * This hook creates the grid cell positioner and cache required by `useMasonry()`. This is
   * the meat of the grid's layout algorithm, determining which cells to render at a given scroll
   * position, as well as where to place new items in the grid.
   *
   * @param options Properties that determine the number of columns in the grid, as well
   *  as their widths.
   * @param deps This hook will create a new positioner, clearing all existing cached positions,
   *  whenever the dependencies in this list change.
   */

  function usePositioner(_ref, deps) {
    var width = _ref.width,
        _ref$columnWidth = _ref.columnWidth,
        columnWidth = _ref$columnWidth === void 0 ? 200 : _ref$columnWidth,
        _ref$columnGutter = _ref.columnGutter,
        columnGutter = _ref$columnGutter === void 0 ? 0 : _ref$columnGutter,
        columnCount = _ref.columnCount;

    if (deps === void 0) {
      deps = emptyArr$1;
    }

    var initPositioner = function initPositioner() {
      var _getColumns = getColumns(width, columnWidth, columnGutter, columnCount),
          computedColumnWidth = _getColumns[0],
          computedColumnCount = _getColumns[1];

      return createPositioner(computedColumnCount, computedColumnWidth, columnGutter);
    };

    var _React$useState = React.useState(initPositioner),
        positioner = _React$useState[0],
        setPositioner = _React$useState[1];

    var didMount = React.useRef(0); // Create a new positioner when the dependencies change

    usePassiveLayoutEffect(function () {
      if (didMount.current) setPositioner(initPositioner());
      didMount.current = 1; // eslint-disable-next-line
    }, deps); // Updates the item positions any time a prop potentially affecting their
    // size changes

    usePassiveLayoutEffect(function () {
      if (didMount.current) {
        var cacheSize = positioner.size();
        var nextPositioner = initPositioner();
        var _index = 0;

        for (; _index < cacheSize; _index++) {
          var pos = positioner.get(_index);
          nextPositioner.set(_index, pos !== void 0 ? pos.height : 0);
        }

        setPositioner(nextPositioner);
      } // eslint-disable-next-line

    }, [width, columnWidth, columnGutter, columnCount]);
    return positioner;
  }

  /**
   * Creates a cell positioner for the `useMasonry()` hook. The `usePositioner()` hook uses
   * this utility under the hood.
   *
   * @param columnCount The number of columns in the grid
   * @param columnWidth The width of each column in the grid
   * @param columnGutter The amount of horizontal and vertical space in pixels to render
   *  between each grid item.
   */
  var createPositioner = function createPositioner(columnCount, columnWidth, columnGutter) {
    if (columnGutter === void 0) {
      columnGutter = 0;
    }

    // O(log(n)) lookup of cells to render for a given viewport size
    // Store tops and bottoms of each cell for fast intersection lookup.
    var intervalTree = createIntervalTree(); // Track the height of each column.
    // Layout algorithm below always inserts into the shortest column.

    var columnHeights = new Array(columnCount); // Used for O(1) item access

    var items = []; // Tracks the item indexes within an individual column

    var columnItems = new Array(columnCount);

    for (var i = 0; i < columnCount; i++) {
      columnHeights[i] = 0;
      columnItems[i] = [];
    }

    return {
      columnCount: columnCount,
      columnWidth: columnWidth,
      set: function set(index, height) {
        if (height === void 0) {
          height = 0;
        }

        var column = 0; // finds the shortest column and uses it

        for (var _i = 1; _i < columnHeights.length; _i++) {
          if (columnHeights[_i] < columnHeights[column]) column = _i;
        }

        var top = columnHeights[column] || 0;
        columnHeights[column] = top + height + columnGutter;
        columnItems[column].push(index);
        items[index] = {
          left: column * (columnWidth + columnGutter),
          top: top,
          height: height,
          column: column
        };
        intervalTree.insert(top, top + height, index);
      },
      get: function get(index) {
        return items[index];
      },
      // This only updates items in the specific columns that have changed, on and after the
      // specific items that have changed
      update: function update(updates) {
        var columns = new Array(columnCount);
        var i = 0,
            j = 0; // determines which columns have items that changed, as well as the minimum index
        // changed in that column, as all items after that index will have their positions
        // affected by the change

        for (; i < updates.length - 1; i++) {
          var _index2 = updates[i];
          var item = items[_index2];
          item.height = updates[++i];
          intervalTree.remove(_index2);
          intervalTree.insert(item.top, item.top + item.height, _index2);
          columns[item.column] = columns[item.column] === void 0 ? _index2 : Math.min(_index2, columns[item.column]);
        }

        for (i = 0; i < columns.length; i++) {
          // bails out if the column didn't change
          if (columns[i] === void 0) continue;
          var itemsInColumn = columnItems[i]; // the index order is sorted with certainty so binary search is a great solution
          // here as opposed to Array.indexOf()

          var startIndex = binarySearch(itemsInColumn, columns[i]);
          var _index3 = columnItems[i][startIndex];
          var startItem = items[_index3];
          columnHeights[i] = startItem.top + startItem.height + columnGutter;

          for (j = startIndex + 1; j < itemsInColumn.length; j++) {
            var _index4 = itemsInColumn[j];
            var _item = items[_index4];
            _item.top = columnHeights[i];
            columnHeights[i] = _item.top + _item.height + columnGutter;
            intervalTree.remove(_index4);
            intervalTree.insert(_item.top, _item.top + _item.height, _index4);
          }
        }
      },
      // Render all cells visible within the viewport range defined.
      range: function range(lo, hi, renderCallback) {
        return intervalTree.search(lo, hi, function (index, top) {
          return renderCallback(index, items[index].left, top);
        });
      },
      estimateHeight: function estimateHeight(itemCount, defaultItemHeight) {
        var tallestColumn = Math.max(0, Math.max.apply(null, columnHeights));
        return itemCount === intervalTree.size ? tallestColumn : tallestColumn + Math.ceil((itemCount - intervalTree.size) / columnCount) * defaultItemHeight;
      },
      shortestColumn: function shortestColumn() {
        if (columnHeights.length > 1) return Math.min.apply(null, columnHeights);
        return columnHeights[0] || 0;
      },
      size: function size() {
        return intervalTree.size;
      }
    };
  };

  /* istanbul ignore next */
  var binarySearch = function binarySearch(a, y) {
    var l = 0;
    var h = a.length - 1;

    while (l <= h) {
      var m = l + h >>> 1;
      var x = a[m];
      if (x === y) return m;else if (x <= y) l = m + 1;else h = m - 1;
    }

    return -1;
  };

  var getColumns = function getColumns(width, minimumWidth, gutter, columnCount) {
    if (width === void 0) {
      width = 0;
    }

    if (minimumWidth === void 0) {
      minimumWidth = 0;
    }

    if (gutter === void 0) {
      gutter = 8;
    }

    columnCount = columnCount || Math.floor(width / (minimumWidth + gutter)) || 1;
    var columnWidth = Math.floor((width - gutter * (columnCount - 1)) / columnCount);
    return [columnWidth, columnCount];
  };

  var emptyArr$1 = [];

  /**
   * A hook that creates a callback for scrolling to a specific index in
   * the "items" array.
   *
   * @param positioner A positioner created by the `usePositioner()` hook
   * @param options Configuration options
   */
  function useScrollToIndex(positioner, options) {
    var _latestOptions$curren;

    var _options$align = options.align,
        align = _options$align === void 0 ? 'top' : _options$align,
        _options$element = options.element,
        element = _options$element === void 0 ? typeof window !== 'undefined' && window : _options$element,
        _options$offset = options.offset,
        offset = _options$offset === void 0 ? 0 : _options$offset,
        _options$height = options.height,
        height = _options$height === void 0 ? typeof window !== 'undefined' ? window.innerHeight : 0 : _options$height;
    var latestOptions = useLatest({
      positioner: positioner,
      element: element,
      align: align,
      offset: offset,
      height: height
    });
    var getTarget = React.useRef(function () {
      var latestElement = latestOptions.current.element;
      return latestElement && 'current' in latestElement ? latestElement.current : latestElement;
    }).current;

    var _React$useReducer = React.useReducer(function (state, action) {
      var nextState = {
        position: state.position,
        index: state.index,
        prevTop: state.prevTop
      };
      /* istanbul ignore next */

      if (action.type === 'scrollToIndex') {
        var _action$value;

        return {
          position: latestOptions.current.positioner.get((_action$value = action.value) !== null && _action$value !== void 0 ? _action$value : -1),
          index: action.value,
          prevTop: void 0
        };
      } else if (action.type === 'setPosition') {
        nextState.position = action.value;
      } else if (action.type === 'setPrevTop') {
        nextState.prevTop = action.value;
      } else if (action.type === 'reset') {
        return defaultState;
      }

      return nextState;
    }, defaultState),
        state = _React$useReducer[0],
        dispatch = _React$useReducer[1];

    var throttledDispatch = useThrottleCallback(dispatch, 15); // If we find the position along the way we can immediately take off
    // to the correct spot.

    useEvent(getTarget(), 'scroll', function () {
      if (!state.position && state.index) {
        var position = latestOptions.current.positioner.get(state.index);

        if (position) {
          dispatch({
            type: 'setPosition',
            value: position
          });
        }
      }
    }); // If the top changes out from under us in the case of dynamic cells, we
    // want to keep following it.

    var currentTop = state.index !== void 0 && ((_latestOptions$curren = latestOptions.current.positioner.get(state.index)) === null || _latestOptions$curren === void 0 ? void 0 : _latestOptions$curren.top);
    React.useEffect(function () {
      var target = getTarget();
      if (!target) return;
      var _latestOptions$curren2 = latestOptions.current,
          height = _latestOptions$curren2.height,
          align = _latestOptions$curren2.align,
          offset = _latestOptions$curren2.offset,
          positioner = _latestOptions$curren2.positioner;

      if (state.position) {
        var scrollTop = state.position.top;

        if (align === 'bottom') {
          scrollTop = scrollTop - height + state.position.height;
        } else if (align === 'center') {
          scrollTop -= (height - state.position.height) / 2;
        }

        target.scrollTo(0, Math.max(0, scrollTop += offset)); // Resets state after 400ms, an arbitrary time I determined to be
        // still visually pleasing if there is a slow network reply in dynamic
        // cells

        var didUnsubscribe = false;
        var timeout = setTimeout(function () {
          return !didUnsubscribe && dispatch({
            type: 'reset'
          });
        }, 400);
        return function () {
          didUnsubscribe = true;
          clearTimeout(timeout);
        };
      } else if (state.index !== void 0) {
        // Estimates the top based upon the average height of current cells
        var estimatedTop = positioner.shortestColumn() / positioner.size() * state.index;
        if (state.prevTop) estimatedTop = Math.max(estimatedTop, state.prevTop + height);
        target.scrollTo(0, estimatedTop);
        throttledDispatch({
          type: 'setPrevTop',
          value: estimatedTop
        });
      }
    }, [currentTop, state, latestOptions, getTarget, throttledDispatch]);
    return React.useRef(function (index) {
      dispatch({
        type: 'scrollToIndex',
        value: index
      });
    }).current;
  }
  var defaultState = {
    index: void 0,
    position: void 0,
    prevTop: void 0
  };

  var __reactCreateElement__$1 = React.createElement;

  /**
   * A "batteries included" masonry grid which includes all of the implementation details below. This component is the
   * easiest way to get off and running in your app, before switching to more advanced implementations, if necessary.
   * It will change its column count to fit its container's width and will decide how many rows to render based upon
   * the height of the browser `window`.
   */
  function Masonry(props) {
    var containerRef = React.useRef(null);
    var windowSize = useWindowSize({
      initialWidth: props.ssrWidth,
      initialHeight: props.ssrHeight
    });
    var containerPos = useContainerPosition(containerRef, windowSize);

    var nextProps = _extends({
      offset: containerPos.offset,
      width: containerPos.width || windowSize[0],
      height: windowSize[1],
      containerRef: containerRef
    }, props);

    nextProps.positioner = usePositioner(nextProps);
    nextProps.resizeObserver = useResizeObserver(nextProps.positioner);
    var scrollToIndex = useScrollToIndex(nextProps.positioner, {
      height: nextProps.height,
      offset: containerPos.offset,
      align: typeof props.scrollToIndex === 'object' ? props.scrollToIndex.align : void 0
    });
    var index = props.scrollToIndex && (typeof props.scrollToIndex === 'number' ? props.scrollToIndex : props.scrollToIndex.index);
    React.useEffect(function () {
      if (index !== void 0) scrollToIndex(index);
    }, [index, scrollToIndex]);
    return __reactCreateElement__$1(MasonryScroller, nextProps);
  }

  if (typeof process !== 'undefined' && "production" !== 'production') {
    Masonry.displayName = 'Masonry';
  }

  var __reactCreateElement__$2 = React.createElement;

  /**
   * This is just a single-column `<Masonry>` component with `rowGutter` prop instead of
   * a `columnGutter` prop.
   */
  function List(props) {
    return /*#__PURE__*/__reactCreateElement__$2(Masonry, _extends({
      role: "list",
      columnGutter: props.rowGutter,
      columnCount: 1,
      columnWidth: 1
    }, props));
  }

  if (typeof process !== 'undefined' && "production" !== 'production') {
    List.displayName = 'List';
  }

  /**
   * A utility hook for seamlessly adding infinite scroll behavior to the `useMasonry()` hook. This
   * hook invokes a callback each time the last rendered index surpasses the total number of items
   * in your items array or the number defined in the `totalItems` option.
   *
   * @param loadMoreItems This callback is invoked when more rows must be loaded. It will be used to
   *  determine when to refresh the list with the newly-loaded data. This callback may be called multiple
   *  times in reaction to a single scroll event, so it's important to memoize its arguments. If you're
   *  creating this callback inside of a functional component, make sure you wrap it in `React.useCallback()`,
   *  as well.
   * @param options
   */

  function useInfiniteLoader(loadMoreItems, options) {
    if (options === void 0) {
      options = emptyObj$2;
    }

    var _options = options,
        isItemLoaded = _options.isItemLoaded,
        _options$minimumBatch = _options.minimumBatchSize,
        minimumBatchSize = _options$minimumBatch === void 0 ? 16 : _options$minimumBatch,
        _options$threshold = _options.threshold,
        threshold = _options$threshold === void 0 ? 16 : _options$threshold,
        _options$totalItems = _options.totalItems,
        totalItems = _options$totalItems === void 0 ? 9e9 : _options$totalItems;
    var storedLoadMoreItems = useLatest(loadMoreItems);
    var storedIsItemLoaded = useLatest(isItemLoaded);
    return React.useCallback(function (startIndex, stopIndex, items) {
      var unloadedRanges = scanForUnloadedRanges(storedIsItemLoaded.current, minimumBatchSize, items, totalItems, Math.max(0, startIndex - threshold), Math.min(totalItems - 1, (stopIndex || 0) + threshold)); // The user is responsible for memoizing their loadMoreItems() function
      // because we don't want to make assumptions about how they want to deal
      // with `items`

      for (var i = 0; i < unloadedRanges.length - 1; ++i) {
        storedLoadMoreItems.current(unloadedRanges[i], unloadedRanges[++i], items);
      }
    }, [totalItems, minimumBatchSize, threshold, storedLoadMoreItems, storedIsItemLoaded]);
  }
  /**
   * Returns all of the ranges within a larger range that contain unloaded rows.
   */

  function scanForUnloadedRanges(isItemLoaded, minimumBatchSize, items, totalItems, startIndex, stopIndex) {
    if (isItemLoaded === void 0) {
      isItemLoaded = defaultIsItemLoaded;
    }

    if (minimumBatchSize === void 0) {
      minimumBatchSize = 16;
    }

    if (totalItems === void 0) {
      totalItems = 9e9;
    }

    var unloadedRanges = [];
    var rangeStartIndex,
        rangeStopIndex,
        index = startIndex;
    /* istanbul ignore next */

    for (; index <= stopIndex; index++) {
      if (!isItemLoaded(index, items)) {
        rangeStopIndex = index;
        if (rangeStartIndex === void 0) rangeStartIndex = index;
      } else if (rangeStartIndex !== void 0 && rangeStopIndex !== void 0) {
        unloadedRanges.push(rangeStartIndex, rangeStopIndex);
        rangeStartIndex = rangeStopIndex = void 0;
      }
    } // If :rangeStopIndex is not null it means we haven't run out of unloaded rows.
    // Scan forward to try filling our :minimumBatchSize.


    if (rangeStartIndex !== void 0 && rangeStopIndex !== void 0) {
      var potentialStopIndex = Math.min(Math.max(rangeStopIndex, rangeStartIndex + minimumBatchSize - 1), totalItems - 1);
      /* istanbul ignore next */

      for (index = rangeStopIndex + 1; index <= potentialStopIndex; index++) {
        if (!isItemLoaded(index, items)) {
          rangeStopIndex = index;
        } else {
          break;
        }
      }

      unloadedRanges.push(rangeStartIndex, rangeStopIndex);
    } // Check to see if our first range ended prematurely.
    // In this case we should scan backwards to try filling our :minimumBatchSize.

    /* istanbul ignore next */


    if (unloadedRanges.length) {
      var firstUnloadedStart = unloadedRanges[0];
      var firstUnloadedStop = unloadedRanges[1];

      while (firstUnloadedStop - firstUnloadedStart + 1 < minimumBatchSize && firstUnloadedStart > 0) {
        var _index = firstUnloadedStart - 1;

        if (!isItemLoaded(_index, items)) {
          unloadedRanges[0] = firstUnloadedStart = _index;
        } else {
          break;
        }
      }
    }

    return unloadedRanges;
  }

  var defaultIsItemLoaded = function defaultIsItemLoaded(index, items) {
    return items[index] !== void 0;
  };

  var emptyObj$2 = {};

  exports.List = List;
  exports.Masonry = Masonry;
  exports.MasonryScroller = MasonryScroller;
  exports.createPositioner = createPositioner;
  exports.createResizeObserver = createResizeObserver;
  exports.useContainerPosition = useContainerPosition;
  exports.useInfiniteLoader = useInfiniteLoader;
  exports.useMasonry = useMasonry;
  exports.usePositioner = usePositioner;
  exports.useResizeObserver = useResizeObserver;
  exports.useScrollToIndex = useScrollToIndex;
  exports.useScroller = useScroller;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=masonic.dev.js.map
