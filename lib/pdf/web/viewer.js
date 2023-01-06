/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2022 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */

/******/ (() =&gt; { // webpackBootstrap
/******/ 	&quot;use strict&quot;;
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.animationStarted = exports.VERTICAL_PADDING = exports.UNKNOWN_SCALE = exports.TextLayerMode = exports.SpreadMode = exports.SidebarView = exports.ScrollMode = exports.SCROLLBAR_PADDING = exports.RenderingStates = exports.RendererType = exports.ProgressBar = exports.PresentationModeState = exports.OutputScale = exports.MIN_SCALE = exports.MAX_SCALE = exports.MAX_AUTO_SCALE = exports.DEFAULT_SCALE_VALUE = exports.DEFAULT_SCALE_DELTA = exports.DEFAULT_SCALE = exports.AutoPrintRegExp = void 0;
exports.apiPageLayoutToViewerModes = apiPageLayoutToViewerModes;
exports.apiPageModeToSidebarView = apiPageModeToSidebarView;
exports.approximateFraction = approximateFraction;
exports.backtrackBeforeAllVisibleElements = backtrackBeforeAllVisibleElements;
exports.binarySearchFirstItem = binarySearchFirstItem;
exports.docStyle = void 0;
exports.getActiveOrFocusedElement = getActiveOrFocusedElement;
exports.getPageSizeInches = getPageSizeInches;
exports.getVisibleElements = getVisibleElements;
exports.isPortraitOrientation = isPortraitOrientation;
exports.isValidRotation = isValidRotation;
exports.isValidScrollMode = isValidScrollMode;
exports.isValidSpreadMode = isValidSpreadMode;
exports.noContextMenuHandler = noContextMenuHandler;
exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
exports.normalizeWheelEventDirection = normalizeWheelEventDirection;
exports.parseQueryString = parseQueryString;
exports.removeNullCharacters = removeNullCharacters;
exports.roundToDivide = roundToDivide;
exports.scrollIntoView = scrollIntoView;
exports.watchScroll = watchScroll;
const DEFAULT_SCALE_VALUE = &quot;auto&quot;;
exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
const DEFAULT_SCALE = 1.0;
exports.DEFAULT_SCALE = DEFAULT_SCALE;
const DEFAULT_SCALE_DELTA = 1.1;
exports.DEFAULT_SCALE_DELTA = DEFAULT_SCALE_DELTA;
const MIN_SCALE = 0.1;
exports.MIN_SCALE = MIN_SCALE;
const MAX_SCALE = 10.0;
exports.MAX_SCALE = MAX_SCALE;
const UNKNOWN_SCALE = 0;
exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
const MAX_AUTO_SCALE = 1.25;
exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
const SCROLLBAR_PADDING = 40;
exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
const VERTICAL_PADDING = 5;
exports.VERTICAL_PADDING = VERTICAL_PADDING;
const RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
};
exports.RenderingStates = RenderingStates;
const PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
};
exports.PresentationModeState = PresentationModeState;
const SidebarView = {
  UNKNOWN: -1,
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3,
  LAYERS: 4
};
exports.SidebarView = SidebarView;
const RendererType = {
  CANVAS: &quot;canvas&quot;,
  SVG: &quot;svg&quot;
};
exports.RendererType = RendererType;
const TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1
};
exports.TextLayerMode = TextLayerMode;
const ScrollMode = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2,
  PAGE: 3
};
exports.ScrollMode = ScrollMode;
const SpreadMode = {
  UNKNOWN: -1,
  NONE: 0,
  ODD: 1,
  EVEN: 2
};
exports.SpreadMode = SpreadMode;
const AutoPrintRegExp = /\bprint\s*\(/;
exports.AutoPrintRegExp = AutoPrintRegExp;

class OutputScale {
  constructor() {
    const pixelRatio = window.devicePixelRatio || 1;
    this.sx = pixelRatio;
    this.sy = pixelRatio;
  }

  get scaled() {
    return this.sx !== 1 || this.sy !== 1;
  }

}

exports.OutputScale = OutputScale;

function scrollIntoView(element, spot, scrollMatches = false) {
  let parent = element.offsetParent;

  if (!parent) {
    console.error(&quot;offsetParent is not set -- cannot scroll&quot;);
    return;
  }

  let offsetY = element.offsetTop + element.clientTop;
  let offsetX = element.offsetLeft + element.clientLeft;

  while (parent.clientHeight === parent.scrollHeight &amp;&amp; parent.clientWidth === parent.scrollWidth || scrollMatches &amp;&amp; (parent.classList.contains(&quot;markedContent&quot;) || getComputedStyle(parent).overflow === &quot;hidden&quot;)) {
    offsetY += parent.offsetTop;
    offsetX += parent.offsetLeft;
    parent = parent.offsetParent;

    if (!parent) {
      return;
    }
  }

  if (spot) {
    if (spot.top !== undefined) {
      offsetY += spot.top;
    }

    if (spot.left !== undefined) {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
    }
  }

  parent.scrollTop = offsetY;
}

function watchScroll(viewAreaElement, callback) {
  const debounceScroll = function (evt) {
    if (rAF) {
      return;
    }

    rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      const currentX = viewAreaElement.scrollLeft;
      const lastX = state.lastX;

      if (currentX !== lastX) {
        state.right = currentX &gt; lastX;
      }

      state.lastX = currentX;
      const currentY = viewAreaElement.scrollTop;
      const lastY = state.lastY;

      if (currentY !== lastY) {
        state.down = currentY &gt; lastY;
      }

      state.lastY = currentY;
      callback(state);
    });
  };

  const state = {
    right: true,
    down: true,
    lastX: viewAreaElement.scrollLeft,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
  };
  let rAF = null;
  viewAreaElement.addEventListener(&quot;scroll&quot;, debounceScroll, true);
  return state;
}

function parseQueryString(query) {
  const params = new Map();

  for (const [key, value] of new URLSearchParams(query)) {
    params.set(key.toLowerCase(), value);
  }

  return params;
}

const NullCharactersRegExp = /\x00/g;
const InvisibleCharactersRegExp = /[\x01-\x1F]/g;

function removeNullCharacters(str, replaceInvisible = false) {
  if (typeof str !== &quot;string&quot;) {
    console.error(`The argument must be a string.`);
    return str;
  }

  if (replaceInvisible) {
    str = str.replace(InvisibleCharactersRegExp, &quot; &quot;);
  }

  return str.replace(NullCharactersRegExp, &quot;&quot;);
}

function binarySearchFirstItem(items, condition, start = 0) {
  let minIndex = start;
  let maxIndex = items.length - 1;

  if (maxIndex &lt; 0 || !condition(items[maxIndex])) {
    return items.length;
  }

  if (condition(items[minIndex])) {
    return minIndex;
  }

  while (minIndex &lt; maxIndex) {
    const currentIndex = minIndex + maxIndex &gt;&gt; 1;
    const currentItem = items[currentIndex];

    if (condition(currentItem)) {
      maxIndex = currentIndex;
    } else {
      minIndex = currentIndex + 1;
    }
  }

  return minIndex;
}

function approximateFraction(x) {
  if (Math.floor(x) === x) {
    return [x, 1];
  }

  const xinv = 1 / x;
  const limit = 8;

  if (xinv &gt; limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }

  const x_ = x &gt; 1 ? xinv : x;
  let a = 0,
      b = 1,
      c = 1,
      d = 1;

  while (true) {
    const p = a + c,
          q = b + d;

    if (q &gt; limit) {
      break;
    }

    if (x_ &lt;= p / q) {
      c = p;
      d = q;
    } else {
      a = p;
      b = q;
    }
  }

  let result;

  if (x_ - a / b &lt; c / d - x_) {
    result = x_ === x ? [a, b] : [b, a];
  } else {
    result = x_ === x ? [c, d] : [d, c];
  }

  return result;
}

function roundToDivide(x, div) {
  const r = x % div;
  return r === 0 ? x : Math.round(x - r + div);
}

function getPageSizeInches({
  view,
  userUnit,
  rotate
}) {
  const [x1, y1, x2, y2] = view;
  const changeOrientation = rotate % 180 !== 0;
  const width = (x2 - x1) / 72 * userUnit;
  const height = (y2 - y1) / 72 * userUnit;
  return {
    width: changeOrientation ? height : width,
    height: changeOrientation ? width : height
  };
}

function backtrackBeforeAllVisibleElements(index, views, top) {
  if (index &lt; 2) {
    return index;
  }

  let elt = views[index].div;
  let pageTop = elt.offsetTop + elt.clientTop;

  if (pageTop &gt;= top) {
    elt = views[index - 1].div;
    pageTop = elt.offsetTop + elt.clientTop;
  }

  for (let i = index - 2; i &gt;= 0; --i) {
    elt = views[i].div;

    if (elt.offsetTop + elt.clientTop + elt.clientHeight &lt;= pageTop) {
      break;
    }

    index = i;
  }

  return index;
}

function getVisibleElements({
  scrollEl,
  views,
  sortByVisibility = false,
  horizontal = false,
  rtl = false
}) {
  const top = scrollEl.scrollTop,
        bottom = top + scrollEl.clientHeight;
  const left = scrollEl.scrollLeft,
        right = left + scrollEl.clientWidth;

  function isElementBottomAfterViewTop(view) {
    const element = view.div;
    const elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom &gt; top;
  }

  function isElementNextAfterViewHorizontally(view) {
    const element = view.div;
    const elementLeft = element.offsetLeft + element.clientLeft;
    const elementRight = elementLeft + element.clientWidth;
    return rtl ? elementLeft &lt; right : elementRight &gt; left;
  }

  const visible = [],
        ids = new Set(),
        numViews = views.length;
  let firstVisibleElementInd = binarySearchFirstItem(views, horizontal ? isElementNextAfterViewHorizontally : isElementBottomAfterViewTop);

  if (firstVisibleElementInd &gt; 0 &amp;&amp; firstVisibleElementInd &lt; numViews &amp;&amp; !horizontal) {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top);
  }

  let lastEdge = horizontal ? right : -1;

  for (let i = firstVisibleElementInd; i &lt; numViews; i++) {
    const view = views[i],
          element = view.div;
    const currentWidth = element.offsetLeft + element.clientLeft;
    const currentHeight = element.offsetTop + element.clientTop;
    const viewWidth = element.clientWidth,
          viewHeight = element.clientHeight;
    const viewRight = currentWidth + viewWidth;
    const viewBottom = currentHeight + viewHeight;

    if (lastEdge === -1) {
      if (viewBottom &gt;= bottom) {
        lastEdge = viewBottom;
      }
    } else if ((horizontal ? currentWidth : currentHeight) &gt; lastEdge) {
      break;
    }

    if (viewBottom &lt;= top || currentHeight &gt;= bottom || viewRight &lt;= left || currentWidth &gt;= right) {
      continue;
    }

    const hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
    const hiddenWidth = Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
    const fractionHeight = (viewHeight - hiddenHeight) / viewHeight,
          fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
    const percent = fractionHeight * fractionWidth * 100 | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view,
      percent,
      widthPercent: fractionWidth * 100 | 0
    });
    ids.add(view.id);
  }

  const first = visible[0],
        last = visible.at(-1);

  if (sortByVisibility) {
    visible.sort(function (a, b) {
      const pc = a.percent - b.percent;

      if (Math.abs(pc) &gt; 0.001) {
        return -pc;
      }

      return a.id - b.id;
    });
  }

  return {
    first,
    last,
    views: visible,
    ids
  };
}

function noContextMenuHandler(evt) {
  evt.preventDefault();
}

function normalizeWheelEventDirection(evt) {
  let delta = Math.hypot(evt.deltaX, evt.deltaY);
  const angle = Math.atan2(evt.deltaY, evt.deltaX);

  if (-0.25 * Math.PI &lt; angle &amp;&amp; angle &lt; 0.75 * Math.PI) {
    delta = -delta;
  }

  return delta;
}

function normalizeWheelEventDelta(evt) {
  let delta = normalizeWheelEventDirection(evt);
  const MOUSE_DOM_DELTA_PIXEL_MODE = 0;
  const MOUSE_DOM_DELTA_LINE_MODE = 1;
  const MOUSE_PIXELS_PER_LINE = 30;
  const MOUSE_LINES_PER_PAGE = 30;

  if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
  } else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
    delta /= MOUSE_LINES_PER_PAGE;
  }

  return delta;
}

function isValidRotation(angle) {
  return Number.isInteger(angle) &amp;&amp; angle % 90 === 0;
}

function isValidScrollMode(mode) {
  return Number.isInteger(mode) &amp;&amp; Object.values(ScrollMode).includes(mode) &amp;&amp; mode !== ScrollMode.UNKNOWN;
}

function isValidSpreadMode(mode) {
  return Number.isInteger(mode) &amp;&amp; Object.values(SpreadMode).includes(mode) &amp;&amp; mode !== SpreadMode.UNKNOWN;
}

function isPortraitOrientation(size) {
  return size.width &lt;= size.height;
}

const animationStarted = new Promise(function (resolve) {
  window.requestAnimationFrame(resolve);
});
exports.animationStarted = animationStarted;
const docStyle = document.documentElement.style;
exports.docStyle = docStyle;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

class ProgressBar {
  #classList = null;
  #percent = 0;
  #visible = true;

  constructor(id) {
    const bar = document.getElementById(id);
    this.#classList = bar.classList;
  }

  get percent() {
    return this.#percent;
  }

  set percent(val) {
    this.#percent = clamp(val, 0, 100);

    if (isNaN(val)) {
      this.#classList.add(&quot;indeterminate&quot;);
      return;
    }

    this.#classList.remove(&quot;indeterminate&quot;);
    docStyle.setProperty(&quot;--progressBar-percent&quot;, `${this.#percent}%`);
  }

  setWidth(viewer) {
    if (!viewer) {
      return;
    }

    const container = viewer.parentNode;
    const scrollbarWidth = container.offsetWidth - viewer.offsetWidth;

    if (scrollbarWidth &gt; 0) {
      docStyle.setProperty(&quot;--progressBar-end-offset&quot;, `${scrollbarWidth}px`);
    }
  }

  hide() {
    if (!this.#visible) {
      return;
    }

    this.#visible = false;
    this.#classList.add(&quot;hidden&quot;);
  }

  show() {
    if (this.#visible) {
      return;
    }

    this.#visible = true;
    this.#classList.remove(&quot;hidden&quot;);
  }

}

exports.ProgressBar = ProgressBar;

function getActiveOrFocusedElement() {
  let curRoot = document;
  let curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(&quot;:focus&quot;);

  while (curActiveOrFocused?.shadowRoot) {
    curRoot = curActiveOrFocused.shadowRoot;
    curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(&quot;:focus&quot;);
  }

  return curActiveOrFocused;
}

function apiPageLayoutToViewerModes(layout) {
  let scrollMode = ScrollMode.VERTICAL,
      spreadMode = SpreadMode.NONE;

  switch (layout) {
    case &quot;SinglePage&quot;:
      scrollMode = ScrollMode.PAGE;
      break;

    case &quot;OneColumn&quot;:
      break;

    case &quot;TwoPageLeft&quot;:
      scrollMode = ScrollMode.PAGE;

    case &quot;TwoColumnLeft&quot;:
      spreadMode = SpreadMode.ODD;
      break;

    case &quot;TwoPageRight&quot;:
      scrollMode = ScrollMode.PAGE;

    case &quot;TwoColumnRight&quot;:
      spreadMode = SpreadMode.EVEN;
      break;
  }

  return {
    scrollMode,
    spreadMode
  };
}

function apiPageModeToSidebarView(mode) {
  switch (mode) {
    case &quot;UseNone&quot;:
      return SidebarView.NONE;

    case &quot;UseThumbs&quot;:
      return SidebarView.THUMBS;

    case &quot;UseOutlines&quot;:
      return SidebarView.OUTLINE;

    case &quot;UseAttachments&quot;:
      return SidebarView.ATTACHMENTS;

    case &quot;UseOC&quot;:
      return SidebarView.LAYERS;
  }

  return SidebarView.NONE;
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.compatibilityParams = exports.OptionKind = exports.AppOptions = void 0;
const compatibilityParams = Object.create(null);
exports.compatibilityParams = compatibilityParams;
{
  const userAgent = navigator.userAgent || &quot;&quot;;
  const platform = navigator.platform || &quot;&quot;;
  const maxTouchPoints = navigator.maxTouchPoints || 1;
  const isAndroid = /Android/.test(userAgent);
  const isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) || platform === &quot;MacIntel&quot; &amp;&amp; maxTouchPoints &gt; 1;

  (function checkCanvasSizeLimitation() {
    if (isIOS || isAndroid) {
      compatibilityParams.maxCanvasPixels = 5242880;
    }
  })();
}
const OptionKind = {
  VIEWER: 0x02,
  API: 0x04,
  WORKER: 0x08,
  PREFERENCE: 0x80
};
exports.OptionKind = OptionKind;
const defaultOptions = {
  annotationEditorMode: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  annotationMode: {
    value: 2,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cursorToolOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  defaultZoomValue: {
    value: &quot;&quot;,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  disableHistory: {
    value: false,
    kind: OptionKind.VIEWER
  },
  disablePageLabels: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePermissions: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePrintAutoRotate: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableScripting: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  externalLinkRel: {
    value: &quot;noopener noreferrer nofollow&quot;,
    kind: OptionKind.VIEWER
  },
  externalLinkTarget: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  historyUpdateUrl: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  ignoreDestinationZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  imageResourcesPath: {
    value: &quot;./images/&quot;,
    kind: OptionKind.VIEWER
  },
  maxCanvasPixels: {
    value: 16777216,
    kind: OptionKind.VIEWER
  },
  forcePageColors: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pageColorsBackground: {
    value: &quot;Canvas&quot;,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pageColorsForeground: {
    value: &quot;CanvasText&quot;,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  pdfBugEnabled: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  printResolution: {
    value: 150,
    kind: OptionKind.VIEWER
  },
  sidebarViewOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  scrollModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  spreadModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  textLayerMode: {
    value: 1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  useOnlyCssZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewerCssTheme: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cMapPacked: {
    value: true,
    kind: OptionKind.API
  },
  cMapUrl: {
    value: &quot;../web/cmaps/&quot;,
    kind: OptionKind.API
  },
  disableAutoFetch: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableFontFace: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableRange: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableStream: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  docBaseUrl: {
    value: &quot;&quot;,
    kind: OptionKind.API
  },
  enableXfa: {
    value: true,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  fontExtraProperties: {
    value: false,
    kind: OptionKind.API
  },
  isEvalSupported: {
    value: true,
    kind: OptionKind.API
  },
  isOffscreenCanvasSupported: {
    value: true,
    kind: OptionKind.API
  },
  maxImageSize: {
    value: -1,
    kind: OptionKind.API
  },
  pdfBug: {
    value: false,
    kind: OptionKind.API
  },
  standardFontDataUrl: {
    value: &quot;../web/standard_fonts/&quot;,
    kind: OptionKind.API
  },
  verbosity: {
    value: 1,
    kind: OptionKind.API
  },
  workerPort: {
    value: null,
    kind: OptionKind.WORKER
  },
  workerSrc: {
    value: &quot;../build/pdf.worker.js&quot;,
    kind: OptionKind.WORKER
  }
};
{
  defaultOptions.defaultUrl = {
    value: &quot;compressed.tracemonkey-pldi-09.pdf&quot;,
    kind: OptionKind.VIEWER
  };
  defaultOptions.disablePreferences = {
    value: false,
    kind: OptionKind.VIEWER
  };
  defaultOptions.locale = {
    value: navigator.language || &quot;en-US&quot;,
    kind: OptionKind.VIEWER
  };
  defaultOptions.renderer = {
    value: &quot;canvas&quot;,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  };
  defaultOptions.sandboxBundleSrc = {
    value: &quot;../build/pdf.sandbox.js&quot;,
    kind: OptionKind.VIEWER
  };
}
const userOptions = Object.create(null);

class AppOptions {
  constructor() {
    throw new Error(&quot;Cannot initialize AppOptions.&quot;);
  }

  static get(name) {
    const userOption = userOptions[name];

    if (userOption !== undefined) {
      return userOption;
    }

    const defaultOption = defaultOptions[name];

    if (defaultOption !== undefined) {
      return compatibilityParams[name] ?? defaultOption.value;
    }

    return undefined;
  }

  static getAll(kind = null) {
    const options = Object.create(null);

    for (const name in defaultOptions) {
      const defaultOption = defaultOptions[name];

      if (kind) {
        if ((kind &amp; defaultOption.kind) === 0) {
          continue;
        }

        if (kind === OptionKind.PREFERENCE) {
          const value = defaultOption.value,
                valueType = typeof value;

          if (valueType === &quot;boolean&quot; || valueType === &quot;string&quot; || valueType === &quot;number&quot; &amp;&amp; Number.isInteger(value)) {
            options[name] = value;
            continue;
          }

          throw new Error(`Invalid type for preference: ${name}`);
        }
      }

      const userOption = userOptions[name];
      options[name] = userOption !== undefined ? userOption : compatibilityParams[name] ?? defaultOption.value;
    }

    return options;
  }

  static set(name, value) {
    userOptions[name] = value;
  }

  static setAll(options) {
    for (const name in options) {
      userOptions[name] = options[name];
    }
  }

  static remove(name) {
    delete userOptions[name];
  }

  static _hasUserOptions() {
    return Object.keys(userOptions).length &gt; 0;
  }

}

exports.AppOptions = AppOptions;

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.SimpleLinkService = exports.PDFLinkService = exports.LinkTarget = void 0;

var _ui_utils = __webpack_require__(1);

const DEFAULT_LINK_REL = &quot;noopener noreferrer nofollow&quot;;
const LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
exports.LinkTarget = LinkTarget;

function addLinkAttributes(link, {
  url,
  target,
  rel,
  enabled = true
} = {}) {
  if (!url || typeof url !== &quot;string&quot;) {
    throw new Error(&apos;A valid &quot;url&quot; parameter must provided.&apos;);
  }

  const urlNullRemoved = (0, _ui_utils.removeNullCharacters)(url);

  if (enabled) {
    link.href = link.title = urlNullRemoved;
  } else {
    link.href = &quot;&quot;;
    link.title = `Disabled: ${urlNullRemoved}`;

    link.onclick = () =&gt; {
      return false;
    };
  }

  let targetStr = &quot;&quot;;

  switch (target) {
    case LinkTarget.NONE:
      break;

    case LinkTarget.SELF:
      targetStr = &quot;_self&quot;;
      break;

    case LinkTarget.BLANK:
      targetStr = &quot;_blank&quot;;
      break;

    case LinkTarget.PARENT:
      targetStr = &quot;_parent&quot;;
      break;

    case LinkTarget.TOP:
      targetStr = &quot;_top&quot;;
      break;
  }

  link.target = targetStr;
  link.rel = typeof rel === &quot;string&quot; ? rel : DEFAULT_LINK_REL;
}

class PDFLinkService {
  #pagesRefCache = new Map();

  constructor({
    eventBus,
    externalLinkTarget = null,
    externalLinkRel = null,
    ignoreDestinationZoom = false
  } = {}) {
    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this.externalLinkEnabled = true;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
  }

  setDocument(pdfDocument, baseUrl = null) {
    this.baseUrl = baseUrl;
    this.pdfDocument = pdfDocument;
    this.#pagesRefCache.clear();
  }

  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }

  setHistory(pdfHistory) {
    this.pdfHistory = pdfHistory;
  }

  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  }

  get page() {
    return this.pdfViewer.currentPageNumber;
  }

  set page(value) {
    this.pdfViewer.currentPageNumber = value;
  }

  get rotation() {
    return this.pdfViewer.pagesRotation;
  }

  set rotation(value) {
    this.pdfViewer.pagesRotation = value;
  }

  #goToDestinationHelper(rawDest, namedDest = null, explicitDest) {
    const destRef = explicitDest[0];
    let pageNumber;

    if (typeof destRef === &quot;object&quot; &amp;&amp; destRef !== null) {
      pageNumber = this._cachedPageNumber(destRef);

      if (!pageNumber) {
        this.pdfDocument.getPageIndex(destRef).then(pageIndex =&gt; {
          this.cachePageRef(pageIndex + 1, destRef);
          this.#goToDestinationHelper(rawDest, namedDest, explicitDest);
        }).catch(() =&gt; {
          console.error(`PDFLinkService.#goToDestinationHelper: &quot;${destRef}&quot; is not ` + `a valid page reference, for dest=&quot;${rawDest}&quot;.`);
        });
        return;
      }
    } else if (Number.isInteger(destRef)) {
      pageNumber = destRef + 1;
    } else {
      console.error(`PDFLinkService.#goToDestinationHelper: &quot;${destRef}&quot; is not ` + `a valid destination reference, for dest=&quot;${rawDest}&quot;.`);
      return;
    }

    if (!pageNumber || pageNumber &lt; 1 || pageNumber &gt; this.pagesCount) {
      console.error(`PDFLinkService.#goToDestinationHelper: &quot;${pageNumber}&quot; is not ` + `a valid page number, for dest=&quot;${rawDest}&quot;.`);
      return;
    }

    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.push({
        namedDest,
        explicitDest,
        pageNumber
      });
    }

    this.pdfViewer.scrollPageIntoView({
      pageNumber,
      destArray: explicitDest,
      ignoreDestinationZoom: this._ignoreDestinationZoom
    });
  }

  async goToDestination(dest) {
    if (!this.pdfDocument) {
      return;
    }

    let namedDest, explicitDest;

    if (typeof dest === &quot;string&quot;) {
      namedDest = dest;
      explicitDest = await this.pdfDocument.getDestination(dest);
    } else {
      namedDest = null;
      explicitDest = await dest;
    }

    if (!Array.isArray(explicitDest)) {
      console.error(`PDFLinkService.goToDestination: &quot;${explicitDest}&quot; is not ` + `a valid destination array, for dest=&quot;${dest}&quot;.`);
      return;
    }

    this.#goToDestinationHelper(dest, namedDest, explicitDest);
  }

  goToPage(val) {
    if (!this.pdfDocument) {
      return;
    }

    const pageNumber = typeof val === &quot;string&quot; &amp;&amp; this.pdfViewer.pageLabelToPageNumber(val) || val | 0;

    if (!(Number.isInteger(pageNumber) &amp;&amp; pageNumber &gt; 0 &amp;&amp; pageNumber &lt;= this.pagesCount)) {
      console.error(`PDFLinkService.goToPage: &quot;${val}&quot; is not a valid page.`);
      return;
    }

    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.pushPage(pageNumber);
    }

    this.pdfViewer.scrollPageIntoView({
      pageNumber
    });
  }

  addLinkAttributes(link, url, newWindow = false) {
    addLinkAttributes(link, {
      url,
      target: newWindow ? LinkTarget.BLANK : this.externalLinkTarget,
      rel: this.externalLinkRel,
      enabled: this.externalLinkEnabled
    });
  }

  getDestinationHash(dest) {
    if (typeof dest === &quot;string&quot;) {
      if (dest.length &gt; 0) {
        return this.getAnchorUrl(&quot;#&quot; + escape(dest));
      }
    } else if (Array.isArray(dest)) {
      const str = JSON.stringify(dest);

      if (str.length &gt; 0) {
        return this.getAnchorUrl(&quot;#&quot; + escape(str));
      }
    }

    return this.getAnchorUrl(&quot;&quot;);
  }

  getAnchorUrl(anchor) {
    return (this.baseUrl || &quot;&quot;) + anchor;
  }

  setHash(hash) {
    if (!this.pdfDocument) {
      return;
    }

    let pageNumber, dest;

    if (hash.includes(&quot;=&quot;)) {
      const params = (0, _ui_utils.parseQueryString)(hash);

      if (params.has(&quot;search&quot;)) {
        this.eventBus.dispatch(&quot;findfromurlhash&quot;, {
          source: this,
          query: params.get(&quot;search&quot;).replace(/&quot;/g, &quot;&quot;),
          phraseSearch: params.get(&quot;phrase&quot;) === &quot;true&quot;
        });
      }

      if (params.has(&quot;page&quot;)) {
        pageNumber = params.get(&quot;page&quot;) | 0 || 1;
      }

      if (params.has(&quot;zoom&quot;)) {
        const zoomArgs = params.get(&quot;zoom&quot;).split(&quot;,&quot;);
        const zoomArg = zoomArgs[0];
        const zoomArgNumber = parseFloat(zoomArg);

        if (!zoomArg.includes(&quot;Fit&quot;)) {
          dest = [null, {
            name: &quot;XYZ&quot;
          }, zoomArgs.length &gt; 1 ? zoomArgs[1] | 0 : null, zoomArgs.length &gt; 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
        } else {
          if (zoomArg === &quot;Fit&quot; || zoomArg === &quot;FitB&quot;) {
            dest = [null, {
              name: zoomArg
            }];
          } else if (zoomArg === &quot;FitH&quot; || zoomArg === &quot;FitBH&quot; || zoomArg === &quot;FitV&quot; || zoomArg === &quot;FitBV&quot;) {
            dest = [null, {
              name: zoomArg
            }, zoomArgs.length &gt; 1 ? zoomArgs[1] | 0 : null];
          } else if (zoomArg === &quot;FitR&quot;) {
            if (zoomArgs.length !== 5) {
              console.error(&apos;PDFLinkService.setHash: Not enough parameters for &quot;FitR&quot;.&apos;);
            } else {
              dest = [null, {
                name: zoomArg
              }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
            }
          } else {
            console.error(`PDFLinkService.setHash: &quot;${zoomArg}&quot; is not a valid zoom value.`);
          }
        }
      }

      if (dest) {
        this.pdfViewer.scrollPageIntoView({
          pageNumber: pageNumber || this.page,
          destArray: dest,
          allowNegativeOffset: true
        });
      } else if (pageNumber) {
        this.page = pageNumber;
      }

      if (params.has(&quot;pagemode&quot;)) {
        this.eventBus.dispatch(&quot;pagemode&quot;, {
          source: this,
          mode: params.get(&quot;pagemode&quot;)
        });
      }

      if (params.has(&quot;nameddest&quot;)) {
        this.goToDestination(params.get(&quot;nameddest&quot;));
      }
    } else {
      dest = unescape(hash);

      try {
        dest = JSON.parse(dest);

        if (!Array.isArray(dest)) {
          dest = dest.toString();
        }
      } catch (ex) {}

      if (typeof dest === &quot;string&quot; || PDFLinkService.#isValidExplicitDestination(dest)) {
        this.goToDestination(dest);
        return;
      }

      console.error(`PDFLinkService.setHash: &quot;${unescape(hash)}&quot; is not a valid destination.`);
    }
  }

  executeNamedAction(action) {
    switch (action) {
      case &quot;GoBack&quot;:
        this.pdfHistory?.back();
        break;

      case &quot;GoForward&quot;:
        this.pdfHistory?.forward();
        break;

      case &quot;NextPage&quot;:
        this.pdfViewer.nextPage();
        break;

      case &quot;PrevPage&quot;:
        this.pdfViewer.previousPage();
        break;

      case &quot;LastPage&quot;:
        this.page = this.pagesCount;
        break;

      case &quot;FirstPage&quot;:
        this.page = 1;
        break;

      default:
        break;
    }

    this.eventBus.dispatch(&quot;namedaction&quot;, {
      source: this,
      action
    });
  }

  async executeSetOCGState(action) {
    const pdfDocument = this.pdfDocument;
    const optionalContentConfig = await this.pdfViewer.optionalContentConfigPromise;

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    let operator;

    for (const elem of action.state) {
      switch (elem) {
        case &quot;ON&quot;:
        case &quot;OFF&quot;:
        case &quot;Toggle&quot;:
          operator = elem;
          continue;
      }

      switch (operator) {
        case &quot;ON&quot;:
          optionalContentConfig.setVisibility(elem, true);
          break;

        case &quot;OFF&quot;:
          optionalContentConfig.setVisibility(elem, false);
          break;

        case &quot;Toggle&quot;:
          const group = optionalContentConfig.getGroup(elem);

          if (group) {
            optionalContentConfig.setVisibility(elem, !group.visible);
          }

          break;
      }
    }

    this.pdfViewer.optionalContentConfigPromise = Promise.resolve(optionalContentConfig);
  }

  cachePageRef(pageNum, pageRef) {
    if (!pageRef) {
      return;
    }

    const refStr = pageRef.gen === 0 ? `${pageRef.num}R` : `${pageRef.num}R${pageRef.gen}`;
    this.#pagesRefCache.set(refStr, pageNum);
  }

  _cachedPageNumber(pageRef) {
    if (!pageRef) {
      return null;
    }

    const refStr = pageRef.gen === 0 ? `${pageRef.num}R` : `${pageRef.num}R${pageRef.gen}`;
    return this.#pagesRefCache.get(refStr) || null;
  }

  isPageVisible(pageNumber) {
    return this.pdfViewer.isPageVisible(pageNumber);
  }

  isPageCached(pageNumber) {
    return this.pdfViewer.isPageCached(pageNumber);
  }

  static #isValidExplicitDestination(dest) {
    if (!Array.isArray(dest)) {
      return false;
    }

    const destLength = dest.length;

    if (destLength &lt; 2) {
      return false;
    }

    const page = dest[0];

    if (!(typeof page === &quot;object&quot; &amp;&amp; Number.isInteger(page.num) &amp;&amp; Number.isInteger(page.gen)) &amp;&amp; !(Number.isInteger(page) &amp;&amp; page &gt;= 0)) {
      return false;
    }

    const zoom = dest[1];

    if (!(typeof zoom === &quot;object&quot; &amp;&amp; typeof zoom.name === &quot;string&quot;)) {
      return false;
    }

    let allowNull = true;

    switch (zoom.name) {
      case &quot;XYZ&quot;:
        if (destLength !== 5) {
          return false;
        }

        break;

      case &quot;Fit&quot;:
      case &quot;FitB&quot;:
        return destLength === 2;

      case &quot;FitH&quot;:
      case &quot;FitBH&quot;:
      case &quot;FitV&quot;:
      case &quot;FitBV&quot;:
        if (destLength !== 3) {
          return false;
        }

        break;

      case &quot;FitR&quot;:
        if (destLength !== 6) {
          return false;
        }

        allowNull = false;
        break;

      default:
        return false;
    }

    for (let i = 2; i &lt; destLength; i++) {
      const param = dest[i];

      if (!(typeof param === &quot;number&quot; || allowNull &amp;&amp; param === null)) {
        return false;
      }
    }

    return true;
  }

}

exports.PDFLinkService = PDFLinkService;

class SimpleLinkService {
  constructor() {
    this.externalLinkEnabled = true;
  }

  get pagesCount() {
    return 0;
  }

  get page() {
    return 0;
  }

  set page(value) {}

  get rotation() {
    return 0;
  }

  set rotation(value) {}

  async goToDestination(dest) {}

  goToPage(val) {}

  addLinkAttributes(link, url, newWindow = false) {
    addLinkAttributes(link, {
      url,
      enabled: this.externalLinkEnabled
    });
  }

  getDestinationHash(dest) {
    return &quot;#&quot;;
  }

  getAnchorUrl(hash) {
    return &quot;#&quot;;
  }

  setHash(hash) {}

  executeNamedAction(action) {}

  executeSetOCGState(action) {}

  cachePageRef(pageNum, pageRef) {}

  isPageVisible(pageNumber) {
    return true;
  }

  isPageCached(pageNumber) {
    return true;
  }

}

exports.SimpleLinkService = SimpleLinkService;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFViewerApplication = exports.PDFPrintServiceFactory = exports.DefaultExternalServices = void 0;

var _ui_utils = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(5);

var _app_options = __webpack_require__(2);

var _event_utils = __webpack_require__(6);

var _pdf_cursor_tools = __webpack_require__(7);

var _pdf_link_service = __webpack_require__(3);

var _annotation_editor_params = __webpack_require__(9);

var _overlay_manager = __webpack_require__(10);

var _password_prompt = __webpack_require__(11);

var _pdf_attachment_viewer = __webpack_require__(12);

var _pdf_document_properties = __webpack_require__(14);

var _pdf_find_bar = __webpack_require__(15);

var _pdf_find_controller = __webpack_require__(16);

var _pdf_history = __webpack_require__(18);

var _pdf_layer_viewer = __webpack_require__(19);

var _pdf_outline_viewer = __webpack_require__(20);

var _pdf_presentation_mode = __webpack_require__(21);

var _pdf_rendering_queue = __webpack_require__(22);

var _pdf_scripting_manager = __webpack_require__(23);

var _pdf_sidebar = __webpack_require__(24);

var _pdf_sidebar_resizer = __webpack_require__(25);

var _pdf_thumbnail_viewer = __webpack_require__(26);

var _pdf_viewer = __webpack_require__(28);

var _secondary_toolbar = __webpack_require__(38);

var _toolbar = __webpack_require__(39);

var _view_history = __webpack_require__(40);

const DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
const FORCE_PAGES_LOADED_TIMEOUT = 10000;
const WHEEL_ZOOM_DISABLED_TIMEOUT = 1000;
const ViewOnLoad = {
  UNKNOWN: -1,
  PREVIOUS: 0,
  INITIAL: 1
};
const ViewerCssTheme = {
  AUTOMATIC: 0,
  LIGHT: 1,
  DARK: 2
};
const KNOWN_VERSIONS = [&quot;1.0&quot;, &quot;1.1&quot;, &quot;1.2&quot;, &quot;1.3&quot;, &quot;1.4&quot;, &quot;1.5&quot;, &quot;1.6&quot;, &quot;1.7&quot;, &quot;1.8&quot;, &quot;1.9&quot;, &quot;2.0&quot;, &quot;2.1&quot;, &quot;2.2&quot;, &quot;2.3&quot;];
const KNOWN_GENERATORS = [&quot;acrobat distiller&quot;, &quot;acrobat pdfwriter&quot;, &quot;adobe livecycle&quot;, &quot;adobe pdf library&quot;, &quot;adobe photoshop&quot;, &quot;ghostscript&quot;, &quot;tcpdf&quot;, &quot;cairo&quot;, &quot;dvipdfm&quot;, &quot;dvips&quot;, &quot;pdftex&quot;, &quot;pdfkit&quot;, &quot;itext&quot;, &quot;prince&quot;, &quot;quarkxpress&quot;, &quot;mac os x&quot;, &quot;microsoft&quot;, &quot;openoffice&quot;, &quot;oracle&quot;, &quot;luradocument&quot;, &quot;pdf-xchange&quot;, &quot;antenna house&quot;, &quot;aspose.cells&quot;, &quot;fpdf&quot;];

class DefaultExternalServices {
  constructor() {
    throw new Error(&quot;Cannot initialize DefaultExternalServices.&quot;);
  }

  static updateFindControlState(data) {}

  static updateFindMatchesCount(data) {}

  static initPassiveLoading(callbacks) {}

  static reportTelemetry(data) {}

  static createDownloadManager(options) {
    throw new Error(&quot;Not implemented: createDownloadManager&quot;);
  }

  static createPreferences() {
    throw new Error(&quot;Not implemented: createPreferences&quot;);
  }

  static createL10n(options) {
    throw new Error(&quot;Not implemented: createL10n&quot;);
  }

  static createScripting(options) {
    throw new Error(&quot;Not implemented: createScripting&quot;);
  }

  static get supportsIntegratedFind() {
    return (0, _pdfjsLib.shadow)(this, &quot;supportsIntegratedFind&quot;, false);
  }

  static get supportsDocumentFonts() {
    return (0, _pdfjsLib.shadow)(this, &quot;supportsDocumentFonts&quot;, true);
  }

  static get supportedMouseWheelZoomModifierKeys() {
    return (0, _pdfjsLib.shadow)(this, &quot;supportedMouseWheelZoomModifierKeys&quot;, {
      ctrlKey: true,
      metaKey: true
    });
  }

  static get isInAutomation() {
    return (0, _pdfjsLib.shadow)(this, &quot;isInAutomation&quot;, false);
  }

  static updateEditorStates(data) {
    throw new Error(&quot;Not implemented: updateEditorStates&quot;);
  }

}

exports.DefaultExternalServices = DefaultExternalServices;
const PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  _initializedCapability: (0, _pdfjsLib.createPromiseCapability)(),
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfSidebarResizer: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  pdfLayerViewer: null,
  pdfCursorTools: null,
  pdfScriptingManager: null,
  store: null,
  downloadManager: null,
  overlayManager: null,
  preferences: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  l10n: null,
  annotationEditorParams: null,
  isInitialViewSet: false,
  downloadComplete: false,
  isViewerEmbedded: window.parent !== window,
  url: &quot;&quot;,
  baseUrl: &quot;&quot;,
  _downloadUrl: &quot;&quot;,
  externalServices: DefaultExternalServices,
  _boundEvents: Object.create(null),
  documentInfo: null,
  metadata: null,
  _contentDispositionFilename: null,
  _contentLength: null,
  _saveInProgress: false,
  _docStats: null,
  _wheelUnusedTicks: 0,
  _PDFBug: null,
  _hasAnnotationEditors: false,
  _title: document.title,
  _printAnnotationStoragePromise: null,

  async initialize(appConfig) {
    this.preferences = this.externalServices.createPreferences();
    this.appConfig = appConfig;
    await this._readPreferences();
    await this._parseHashParameters();

    this._forceCssTheme();

    await this._initializeL10n();

    if (this.isViewerEmbedded &amp;&amp; _app_options.AppOptions.get(&quot;externalLinkTarget&quot;) === _pdf_link_service.LinkTarget.NONE) {
      _app_options.AppOptions.set(&quot;externalLinkTarget&quot;, _pdf_link_service.LinkTarget.TOP);
    }

    await this._initializeViewerComponents();
    this.bindEvents();
    this.bindWindowEvents();
    const appContainer = appConfig.appContainer || document.documentElement;
    this.l10n.translate(appContainer).then(() =&gt; {
      this.eventBus.dispatch(&quot;localized&quot;, {
        source: this
      });
    });

    this._initializedCapability.resolve();
  },

  async _readPreferences() {
    if (_app_options.AppOptions.get(&quot;disablePreferences&quot;)) {
      return;
    }

    if (_app_options.AppOptions._hasUserOptions()) {
      console.warn(&quot;_readPreferences: The Preferences may override manually set AppOptions; &quot; + &apos;please use the &quot;disablePreferences&quot;-option in order to prevent that.&apos;);
    }

    try {
      _app_options.AppOptions.setAll(await this.preferences.getAll());
    } catch (reason) {
      console.error(`_readPreferences: &quot;${reason?.message}&quot;.`);
    }
  },

  async _parseHashParameters() {
    if (!_app_options.AppOptions.get(&quot;pdfBugEnabled&quot;)) {
      return;
    }

    const hash = document.location.hash.substring(1);

    if (!hash) {
      return;
    }

    const {
      mainContainer,
      viewerContainer
    } = this.appConfig,
          params = (0, _ui_utils.parseQueryString)(hash);

    if (params.get(&quot;disableworker&quot;) === &quot;true&quot;) {
      try {
        await loadFakeWorker();
      } catch (ex) {
        console.error(`_parseHashParameters: &quot;${ex.message}&quot;.`);
      }
    }

    if (params.has(&quot;disablerange&quot;)) {
      _app_options.AppOptions.set(&quot;disableRange&quot;, params.get(&quot;disablerange&quot;) === &quot;true&quot;);
    }

    if (params.has(&quot;disablestream&quot;)) {
      _app_options.AppOptions.set(&quot;disableStream&quot;, params.get(&quot;disablestream&quot;) === &quot;true&quot;);
    }

    if (params.has(&quot;disableautofetch&quot;)) {
      _app_options.AppOptions.set(&quot;disableAutoFetch&quot;, params.get(&quot;disableautofetch&quot;) === &quot;true&quot;);
    }

    if (params.has(&quot;disablefontface&quot;)) {
      _app_options.AppOptions.set(&quot;disableFontFace&quot;, params.get(&quot;disablefontface&quot;) === &quot;true&quot;);
    }

    if (params.has(&quot;disablehistory&quot;)) {
      _app_options.AppOptions.set(&quot;disableHistory&quot;, params.get(&quot;disablehistory&quot;) === &quot;true&quot;);
    }

    if (params.has(&quot;verbosity&quot;)) {
      _app_options.AppOptions.set(&quot;verbosity&quot;, params.get(&quot;verbosity&quot;) | 0);
    }

    if (params.has(&quot;textlayer&quot;)) {
      switch (params.get(&quot;textlayer&quot;)) {
        case &quot;off&quot;:
          _app_options.AppOptions.set(&quot;textLayerMode&quot;, _ui_utils.TextLayerMode.DISABLE);

          break;

        case &quot;visible&quot;:
        case &quot;shadow&quot;:
        case &quot;hover&quot;:
          viewerContainer.classList.add(`textLayer-${params.get(&quot;textlayer&quot;)}`);

          try {
            await loadPDFBug(this);

            this._PDFBug.loadCSS();
          } catch (ex) {
            console.error(`_parseHashParameters: &quot;${ex.message}&quot;.`);
          }

          break;
      }
    }

    if (params.has(&quot;pdfbug&quot;)) {
      _app_options.AppOptions.set(&quot;pdfBug&quot;, true);

      _app_options.AppOptions.set(&quot;fontExtraProperties&quot;, true);

      const enabled = params.get(&quot;pdfbug&quot;).split(&quot;,&quot;);

      try {
        await loadPDFBug(this);

        this._PDFBug.init({
          OPS: _pdfjsLib.OPS
        }, mainContainer, enabled);
      } catch (ex) {
        console.error(`_parseHashParameters: &quot;${ex.message}&quot;.`);
      }
    }

    if (params.has(&quot;locale&quot;)) {
      _app_options.AppOptions.set(&quot;locale&quot;, params.get(&quot;locale&quot;));
    }
  },

  async _initializeL10n() {
    this.l10n = this.externalServices.createL10n({
      locale: _app_options.AppOptions.get(&quot;locale&quot;)
    });
    const dir = await this.l10n.getDirection();
    document.getElementsByTagName(&quot;html&quot;)[0].dir = dir;
  },

  _forceCssTheme() {
    const cssTheme = _app_options.AppOptions.get(&quot;viewerCssTheme&quot;);

    if (cssTheme === ViewerCssTheme.AUTOMATIC || !Object.values(ViewerCssTheme).includes(cssTheme)) {
      return;
    }

    try {
      const styleSheet = document.styleSheets[0];
      const cssRules = styleSheet?.cssRules || [];

      for (let i = 0, ii = cssRules.length; i &lt; ii; i++) {
        const rule = cssRules[i];

        if (rule instanceof CSSMediaRule &amp;&amp; rule.media?.[0] === &quot;(prefers-color-scheme: dark)&quot;) {
          if (cssTheme === ViewerCssTheme.LIGHT) {
            styleSheet.deleteRule(i);
            return;
          }

          const darkRules = /^@media \(prefers-color-scheme: dark\) {\n\s*([\w\s-.,:;/\\{}()]+)\n}$/.exec(rule.cssText);

          if (darkRules?.[1]) {
            styleSheet.deleteRule(i);
            styleSheet.insertRule(darkRules[1], i);
          }

          return;
        }
      }
    } catch (reason) {
      console.error(`_forceCssTheme: &quot;${reason?.message}&quot;.`);
    }
  },

  async _initializeViewerComponents() {
    const {
      appConfig,
      externalServices
    } = this;
    const eventBus = externalServices.isInAutomation ? new _event_utils.AutomationEventBus() : new _event_utils.EventBus();
    this.eventBus = eventBus;
    this.overlayManager = new _overlay_manager.OverlayManager();
    const pdfRenderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
    pdfRenderingQueue.onIdle = this._cleanup.bind(this);
    this.pdfRenderingQueue = pdfRenderingQueue;
    const pdfLinkService = new _pdf_link_service.PDFLinkService({
      eventBus,
      externalLinkTarget: _app_options.AppOptions.get(&quot;externalLinkTarget&quot;),
      externalLinkRel: _app_options.AppOptions.get(&quot;externalLinkRel&quot;),
      ignoreDestinationZoom: _app_options.AppOptions.get(&quot;ignoreDestinationZoom&quot;)
    });
    this.pdfLinkService = pdfLinkService;
    const downloadManager = externalServices.createDownloadManager();
    this.downloadManager = downloadManager;
    const findController = new _pdf_find_controller.PDFFindController({
      linkService: pdfLinkService,
      eventBus
    });
    this.findController = findController;
    const pdfScriptingManager = new _pdf_scripting_manager.PDFScriptingManager({
      eventBus,
      sandboxBundleSrc: _app_options.AppOptions.get(&quot;sandboxBundleSrc&quot;),
      scriptingFactory: externalServices,
      docPropertiesLookup: this._scriptingDocProperties.bind(this)
    });
    this.pdfScriptingManager = pdfScriptingManager;
    const container = appConfig.mainContainer,
          viewer = appConfig.viewerContainer;

    const annotationEditorMode = _app_options.AppOptions.get(&quot;annotationEditorMode&quot;);

    const pageColors = _app_options.AppOptions.get(&quot;forcePageColors&quot;) || window.matchMedia(&quot;(forced-colors: active)&quot;).matches ? {
      background: _app_options.AppOptions.get(&quot;pageColorsBackground&quot;),
      foreground: _app_options.AppOptions.get(&quot;pageColorsForeground&quot;)
    } : null;
    this.pdfViewer = new _pdf_viewer.PDFViewer({
      container,
      viewer,
      eventBus,
      renderingQueue: pdfRenderingQueue,
      linkService: pdfLinkService,
      downloadManager,
      findController,
      scriptingManager: _app_options.AppOptions.get(&quot;enableScripting&quot;) &amp;&amp; pdfScriptingManager,
      renderer: _app_options.AppOptions.get(&quot;renderer&quot;),
      l10n: this.l10n,
      textLayerMode: _app_options.AppOptions.get(&quot;textLayerMode&quot;),
      annotationMode: _app_options.AppOptions.get(&quot;annotationMode&quot;),
      annotationEditorMode,
      imageResourcesPath: _app_options.AppOptions.get(&quot;imageResourcesPath&quot;),
      enablePrintAutoRotate: _app_options.AppOptions.get(&quot;enablePrintAutoRotate&quot;),
      useOnlyCssZoom: _app_options.AppOptions.get(&quot;useOnlyCssZoom&quot;),
      maxCanvasPixels: _app_options.AppOptions.get(&quot;maxCanvasPixels&quot;),
      enablePermissions: _app_options.AppOptions.get(&quot;enablePermissions&quot;),
      pageColors
    });
    pdfRenderingQueue.setViewer(this.pdfViewer);
    pdfLinkService.setViewer(this.pdfViewer);
    pdfScriptingManager.setViewer(this.pdfViewer);
    this.pdfThumbnailViewer = new _pdf_thumbnail_viewer.PDFThumbnailViewer({
      container: appConfig.sidebar.thumbnailView,
      eventBus,
      renderingQueue: pdfRenderingQueue,
      linkService: pdfLinkService,
      l10n: this.l10n,
      pageColors
    });
    pdfRenderingQueue.setThumbnailViewer(this.pdfThumbnailViewer);

    if (!this.isViewerEmbedded &amp;&amp; !_app_options.AppOptions.get(&quot;disableHistory&quot;)) {
      this.pdfHistory = new _pdf_history.PDFHistory({
        linkService: pdfLinkService,
        eventBus
      });
      pdfLinkService.setHistory(this.pdfHistory);
    }

    if (!this.supportsIntegratedFind) {
      this.findBar = new _pdf_find_bar.PDFFindBar(appConfig.findBar, eventBus, this.l10n);
    }

    if (annotationEditorMode !== _pdfjsLib.AnnotationEditorType.DISABLE) {
      this.annotationEditorParams = new _annotation_editor_params.AnnotationEditorParams(appConfig.annotationEditorParams, eventBus);
    } else {
      for (const element of [document.getElementById(&quot;editorModeButtons&quot;), document.getElementById(&quot;editorModeSeparator&quot;)]) {
        element.hidden = true;
      }
    }

    this.pdfDocumentProperties = new _pdf_document_properties.PDFDocumentProperties(appConfig.documentProperties, this.overlayManager, eventBus, this.l10n, () =&gt; {
      return this._docFilename;
    });
    this.pdfCursorTools = new _pdf_cursor_tools.PDFCursorTools({
      container,
      eventBus,
      cursorToolOnLoad: _app_options.AppOptions.get(&quot;cursorToolOnLoad&quot;)
    });
    this.toolbar = new _toolbar.Toolbar(appConfig.toolbar, eventBus, this.l10n);
    this.secondaryToolbar = new _secondary_toolbar.SecondaryToolbar(appConfig.secondaryToolbar, eventBus, this.externalServices);

    if (this.supportsFullscreen) {
      this.pdfPresentationMode = new _pdf_presentation_mode.PDFPresentationMode({
        container,
        pdfViewer: this.pdfViewer,
        eventBus
      });
    }

    this.passwordPrompt = new _password_prompt.PasswordPrompt(appConfig.passwordOverlay, this.overlayManager, this.l10n, this.isViewerEmbedded);
    this.pdfOutlineViewer = new _pdf_outline_viewer.PDFOutlineViewer({
      container: appConfig.sidebar.outlineView,
      eventBus,
      linkService: pdfLinkService,
      downloadManager
    });
    this.pdfAttachmentViewer = new _pdf_attachment_viewer.PDFAttachmentViewer({
      container: appConfig.sidebar.attachmentsView,
      eventBus,
      downloadManager
    });
    this.pdfLayerViewer = new _pdf_layer_viewer.PDFLayerViewer({
      container: appConfig.sidebar.layersView,
      eventBus,
      l10n: this.l10n
    });
    this.pdfSidebar = new _pdf_sidebar.PDFSidebar({
      elements: appConfig.sidebar,
      pdfViewer: this.pdfViewer,
      pdfThumbnailViewer: this.pdfThumbnailViewer,
      eventBus,
      l10n: this.l10n
    });
    this.pdfSidebar.onToggled = this.forceRendering.bind(this);
    this.pdfSidebarResizer = new _pdf_sidebar_resizer.PDFSidebarResizer(appConfig.sidebarResizer, eventBus, this.l10n);
  },

  run(config) {
    this.initialize(config).then(webViewerInitialized);
  },

  get initialized() {
    return this._initializedCapability.settled;
  },

  get initializedPromise() {
    return this._initializedCapability.promise;
  },

  zoomIn(steps) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.increaseScale(steps);
  },

  zoomOut(steps) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.decreaseScale(steps);
  },

  zoomReset() {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
  },

  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },

  get page() {
    return this.pdfViewer.currentPageNumber;
  },

  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },

  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
  },

  get supportsFullscreen() {
    return (0, _pdfjsLib.shadow)(this, &quot;supportsFullscreen&quot;, document.fullscreenEnabled);
  },

  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
  },

  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
  },

  get loadingBar() {
    const bar = new _ui_utils.ProgressBar(&quot;loadingBar&quot;);
    return (0, _pdfjsLib.shadow)(this, &quot;loadingBar&quot;, bar);
  },

  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
  },

  initPassiveLoading() {
    throw new Error(&quot;Not implemented: initPassiveLoading&quot;);
  },

  setTitleUsingUrl(url = &quot;&quot;, downloadUrl = null) {
    this.url = url;
    this.baseUrl = url.split(&quot;#&quot;)[0];

    if (downloadUrl) {
      this._downloadUrl = downloadUrl === url ? this.baseUrl : downloadUrl.split(&quot;#&quot;)[0];
    }

    let title = (0, _pdfjsLib.getPdfFilenameFromUrl)(url, &quot;&quot;);

    if (!title) {
      try {
        title = decodeURIComponent((0, _pdfjsLib.getFilenameFromUrl)(url)) || url;
      } catch (ex) {
        title = url;
      }
    }

    this.setTitle(title);
  },

  setTitle(title = this._title) {
    this._title = title;

    if (this.isViewerEmbedded) {
      return;
    }

    const editorIndicator = this._hasAnnotationEditors &amp;&amp; !this.pdfRenderingQueue.printing;
    document.title = `${editorIndicator ? &quot;* &quot; : &quot;&quot;}${title}`;
  },

  get _docFilename() {
    return this._contentDispositionFilename || (0, _pdfjsLib.getPdfFilenameFromUrl)(this.url);
  },

  _hideViewBookmark() {
    this.appConfig.secondaryToolbar.viewBookmarkButton.hidden = true;
  },

  async close() {
    this._unblockDocumentLoadEvent();

    this._hideViewBookmark();

    if (!this.pdfLoadingTask) {
      return;
    }

    if (this.pdfDocument?.annotationStorage.size &gt; 0 &amp;&amp; this._annotationStorageModified) {
      try {
        await this.save();
      } catch (reason) {}
    }

    const promises = [];
    promises.push(this.pdfLoadingTask.destroy());
    this.pdfLoadingTask = null;

    if (this.pdfDocument) {
      this.pdfDocument = null;
      this.pdfThumbnailViewer.setDocument(null);
      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null);
      this.pdfDocumentProperties.setDocument(null);
    }

    this.pdfLinkService.externalLinkEnabled = true;
    this.store = null;
    this.isInitialViewSet = false;
    this.downloadComplete = false;
    this.url = &quot;&quot;;
    this.baseUrl = &quot;&quot;;
    this._downloadUrl = &quot;&quot;;
    this.documentInfo = null;
    this.metadata = null;
    this._contentDispositionFilename = null;
    this._contentLength = null;
    this._saveInProgress = false;
    this._docStats = null;
    this._hasAnnotationEditors = false;
    promises.push(this.pdfScriptingManager.destroyPromise);
    this.setTitle();
    this.pdfSidebar.reset();
    this.pdfOutlineViewer.reset();
    this.pdfAttachmentViewer.reset();
    this.pdfLayerViewer.reset();
    this.pdfHistory?.reset();
    this.findBar?.reset();
    this.toolbar.reset();
    this.secondaryToolbar.reset();
    this._PDFBug?.cleanup();
    await Promise.all(promises);
  },

  async open(file, args) {
    if (this.pdfLoadingTask) {
      await this.close();
    }

    const workerParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.WORKER);

    for (const key in workerParameters) {
      _pdfjsLib.GlobalWorkerOptions[key] = workerParameters[key];
    }

    const parameters = Object.create(null);

    if (typeof file === &quot;string&quot;) {
      this.setTitleUsingUrl(file, file);
      parameters.url = file;
    } else if (file &amp;&amp; &quot;byteLength&quot; in file) {
      parameters.data = file;
    } else if (file.url &amp;&amp; file.originalUrl) {
      this.setTitleUsingUrl(file.originalUrl, file.url);
      parameters.url = file.url;
    }

    const apiParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.API);

    for (const key in apiParameters) {
      let value = apiParameters[key];

      if (key === &quot;docBaseUrl&quot; &amp;&amp; !value) {}

      parameters[key] = value;
    }

    if (args) {
      for (const key in args) {
        parameters[key] = args[key];
      }
    }

    const loadingTask = (0, _pdfjsLib.getDocument)(parameters);
    this.pdfLoadingTask = loadingTask;

    loadingTask.onPassword = (updateCallback, reason) =&gt; {
      this.pdfLinkService.externalLinkEnabled = false;
      this.passwordPrompt.setUpdateCallback(updateCallback, reason);
      this.passwordPrompt.open();
    };

    loadingTask.onProgress = ({
      loaded,
      total
    }) =&gt; {
      this.progress(loaded / total);
    };

    loadingTask.onUnsupportedFeature = this.fallback.bind(this);
    return loadingTask.promise.then(pdfDocument =&gt; {
      this.load(pdfDocument);
    }, reason =&gt; {
      if (loadingTask !== this.pdfLoadingTask) {
        return undefined;
      }

      let key = &quot;loading_error&quot;;

      if (reason instanceof _pdfjsLib.InvalidPDFException) {
        key = &quot;invalid_file_error&quot;;
      } else if (reason instanceof _pdfjsLib.MissingPDFException) {
        key = &quot;missing_file_error&quot;;
      } else if (reason instanceof _pdfjsLib.UnexpectedResponseException) {
        key = &quot;unexpected_response_error&quot;;
      }

      return this.l10n.get(key).then(msg =&gt; {
        this._documentError(msg, {
          message: reason?.message
        });

        throw reason;
      });
    });
  },

  _ensureDownloadComplete() {
    if (this.pdfDocument &amp;&amp; this.downloadComplete) {
      return;
    }

    throw new Error(&quot;PDF document not downloaded.&quot;);
  },

  async download() {
    const url = this._downloadUrl,
          filename = this._docFilename;

    try {
      this._ensureDownloadComplete();

      const data = await this.pdfDocument.getData();
      const blob = new Blob([data], {
        type: &quot;application/pdf&quot;
      });
      await this.downloadManager.download(blob, url, filename);
    } catch (reason) {
      await this.downloadManager.downloadUrl(url, filename);
    }
  },

  async save() {
    if (this._saveInProgress) {
      return;
    }

    this._saveInProgress = true;
    await this.pdfScriptingManager.dispatchWillSave();
    const url = this._downloadUrl,
          filename = this._docFilename;

    try {
      this._ensureDownloadComplete();

      const data = await this.pdfDocument.saveDocument();
      const blob = new Blob([data], {
        type: &quot;application/pdf&quot;
      });
      await this.downloadManager.download(blob, url, filename);
    } catch (reason) {
      console.error(`Error when saving the document: ${reason.message}`);
      await this.download();
    } finally {
      await this.pdfScriptingManager.dispatchDidSave();
      this._saveInProgress = false;
    }

    if (this._hasAnnotationEditors) {
      this.externalServices.reportTelemetry({
        type: &quot;editing&quot;,
        data: {
          type: &quot;save&quot;
        }
      });
    }
  },

  downloadOrSave() {
    if (this.pdfDocument?.annotationStorage.size &gt; 0) {
      this.save();
    } else {
      this.download();
    }
  },

  fallback(featureId) {
    this.externalServices.reportTelemetry({
      type: &quot;unsupportedFeature&quot;,
      featureId
    });
  },

  _documentError(message, moreInfo = null) {
    this._unblockDocumentLoadEvent();

    this._otherError(message, moreInfo);

    this.eventBus.dispatch(&quot;documenterror&quot;, {
      source: this,
      message,
      reason: moreInfo?.message ?? null
    });
  },

  _otherError(message, moreInfo = null) {
    const moreInfoText = [`PDF.js v${_pdfjsLib.version || &quot;?&quot;} (build: ${_pdfjsLib.build || &quot;?&quot;})`];

    if (moreInfo) {
      moreInfoText.push(`Message: ${moreInfo.message}`);

      if (moreInfo.stack) {
        moreInfoText.push(`Stack: ${moreInfo.stack}`);
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(`File: ${moreInfo.filename}`);
        }

        if (moreInfo.lineNumber) {
          moreInfoText.push(`Line: ${moreInfo.lineNumber}`);
        }
      }
    }

    console.error(`${message}\n\n${moreInfoText.join(&quot;\n&quot;)}`);
    this.fallback();
  },

  progress(level) {
    if (this.downloadComplete) {
      return;
    }

    const percent = Math.round(level * 100);

    if (percent &lt;= this.loadingBar.percent) {
      return;
    }

    this.loadingBar.percent = percent;

    const disableAutoFetch = this.pdfDocument?.loadingParams.disableAutoFetch ?? _app_options.AppOptions.get(&quot;disableAutoFetch&quot;);

    if (!disableAutoFetch || isNaN(percent)) {
      return;
    }

    if (this.disableAutoFetchLoadingBarTimeout) {
      clearTimeout(this.disableAutoFetchLoadingBarTimeout);
      this.disableAutoFetchLoadingBarTimeout = null;
    }

    this.loadingBar.show();
    this.disableAutoFetchLoadingBarTimeout = setTimeout(() =&gt; {
      this.loadingBar.hide();
      this.disableAutoFetchLoadingBarTimeout = null;
    }, DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
  },

  load(pdfDocument) {
    this.pdfDocument = pdfDocument;
    pdfDocument.getDownloadInfo().then(({
      length
    }) =&gt; {
      this._contentLength = length;
      this.downloadComplete = true;
      this.loadingBar.hide();
      firstPagePromise.then(() =&gt; {
        this.eventBus.dispatch(&quot;documentloaded&quot;, {
          source: this
        });
      });
    });
    const pageLayoutPromise = pdfDocument.getPageLayout().catch(function () {});
    const pageModePromise = pdfDocument.getPageMode().catch(function () {});
    const openActionPromise = pdfDocument.getOpenAction().catch(function () {});
    this.toolbar.setPagesCount(pdfDocument.numPages, false);
    this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
    let baseDocumentUrl;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    this.pdfDocumentProperties.setDocument(pdfDocument);
    const pdfViewer = this.pdfViewer;
    pdfViewer.setDocument(pdfDocument);
    const {
      firstPagePromise,
      onePageRendered,
      pagesPromise
    } = pdfViewer;
    const pdfThumbnailViewer = this.pdfThumbnailViewer;
    pdfThumbnailViewer.setDocument(pdfDocument);
    const storedPromise = (this.store = new _view_history.ViewHistory(pdfDocument.fingerprints[0])).getMultiple({
      page: null,
      zoom: _ui_utils.DEFAULT_SCALE_VALUE,
      scrollLeft: &quot;0&quot;,
      scrollTop: &quot;0&quot;,
      rotation: null,
      sidebarView: _ui_utils.SidebarView.UNKNOWN,
      scrollMode: _ui_utils.ScrollMode.UNKNOWN,
      spreadMode: _ui_utils.SpreadMode.UNKNOWN
    }).catch(() =&gt; {
      return Object.create(null);
    });
    firstPagePromise.then(pdfPage =&gt; {
      this.loadingBar.setWidth(this.appConfig.viewerContainer);

      this._initializeAnnotationStorageCallbacks(pdfDocument);

      Promise.all([_ui_utils.animationStarted, storedPromise, pageLayoutPromise, pageModePromise, openActionPromise]).then(async ([timeStamp, stored, pageLayout, pageMode, openAction]) =&gt; {
        const viewOnLoad = _app_options.AppOptions.get(&quot;viewOnLoad&quot;);

        this._initializePdfHistory({
          fingerprint: pdfDocument.fingerprints[0],
          viewOnLoad,
          initialDest: openAction?.dest
        });

        const initialBookmark = this.initialBookmark;

        const zoom = _app_options.AppOptions.get(&quot;defaultZoomValue&quot;);

        let hash = zoom ? `zoom=${zoom}` : null;
        let rotation = null;

        let sidebarView = _app_options.AppOptions.get(&quot;sidebarViewOnLoad&quot;);

        let scrollMode = _app_options.AppOptions.get(&quot;scrollModeOnLoad&quot;);

        let spreadMode = _app_options.AppOptions.get(&quot;spreadModeOnLoad&quot;);

        if (stored.page &amp;&amp; viewOnLoad !== ViewOnLoad.INITIAL) {
          hash = `page=${stored.page}&amp;zoom=${zoom || stored.zoom},` + `${stored.scrollLeft},${stored.scrollTop}`;
          rotation = parseInt(stored.rotation, 10);

          if (sidebarView === _ui_utils.SidebarView.UNKNOWN) {
            sidebarView = stored.sidebarView | 0;
          }

          if (scrollMode === _ui_utils.ScrollMode.UNKNOWN) {
            scrollMode = stored.scrollMode | 0;
          }

          if (spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
            spreadMode = stored.spreadMode | 0;
          }
        }

        if (pageMode &amp;&amp; sidebarView === _ui_utils.SidebarView.UNKNOWN) {
          sidebarView = (0, _ui_utils.apiPageModeToSidebarView)(pageMode);
        }

        if (pageLayout &amp;&amp; scrollMode === _ui_utils.ScrollMode.UNKNOWN &amp;&amp; spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
          const modes = (0, _ui_utils.apiPageLayoutToViewerModes)(pageLayout);
          spreadMode = modes.spreadMode;
        }

        this.setInitialView(hash, {
          rotation,
          sidebarView,
          scrollMode,
          spreadMode
        });
        this.eventBus.dispatch(&quot;documentinit&quot;, {
          source: this
        });

        if (!this.isViewerEmbedded) {
          pdfViewer.focus();
        }

        await Promise.race([pagesPromise, new Promise(resolve =&gt; {
          setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
        })]);

        if (!initialBookmark &amp;&amp; !hash) {
          return;
        }

        if (pdfViewer.hasEqualPageSizes) {
          return;
        }

        this.initialBookmark = initialBookmark;
        pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;
        this.setInitialView(hash);
      }).catch(() =&gt; {
        this.setInitialView();
      }).then(function () {
        pdfViewer.update();
      });
    });
    pagesPromise.then(() =&gt; {
      this._unblockDocumentLoadEvent();

      this._initializeAutoPrint(pdfDocument, openActionPromise);
    }, reason =&gt; {
      this.l10n.get(&quot;loading_error&quot;).then(msg =&gt; {
        this._documentError(msg, {
          message: reason?.message
        });
      });
    });
    onePageRendered.then(data =&gt; {
      this.externalServices.reportTelemetry({
        type: &quot;pageInfo&quot;,
        timestamp: data.timestamp
      });
      pdfDocument.getOutline().then(outline =&gt; {
        if (pdfDocument !== this.pdfDocument) {
          return;
        }

        this.pdfOutlineViewer.render({
          outline,
          pdfDocument
        });
      });
      pdfDocument.getAttachments().then(attachments =&gt; {
        if (pdfDocument !== this.pdfDocument) {
          return;
        }

        this.pdfAttachmentViewer.render({
          attachments
        });
      });
      pdfViewer.optionalContentConfigPromise.then(optionalContentConfig =&gt; {
        if (pdfDocument !== this.pdfDocument) {
          return;
        }

        this.pdfLayerViewer.render({
          optionalContentConfig,
          pdfDocument
        });
      });
    });

    this._initializePageLabels(pdfDocument);

    this._initializeMetadata(pdfDocument);
  },

  async _scriptingDocProperties(pdfDocument) {
    if (!this.documentInfo) {
      await new Promise(resolve =&gt; {
        this.eventBus._on(&quot;metadataloaded&quot;, resolve, {
          once: true
        });
      });

      if (pdfDocument !== this.pdfDocument) {
        return null;
      }
    }

    if (!this._contentLength) {
      await new Promise(resolve =&gt; {
        this.eventBus._on(&quot;documentloaded&quot;, resolve, {
          once: true
        });
      });

      if (pdfDocument !== this.pdfDocument) {
        return null;
      }
    }

    return { ...this.documentInfo,
      baseURL: this.baseUrl,
      filesize: this._contentLength,
      filename: this._docFilename,
      metadata: this.metadata?.getRaw(),
      authors: this.metadata?.get(&quot;dc:creator&quot;),
      numPages: this.pagesCount,
      URL: this.url
    };
  },

  async _initializeAutoPrint(pdfDocument, openActionPromise) {
    const [openAction, javaScript] = await Promise.all([openActionPromise, !this.pdfViewer.enableScripting ? pdfDocument.getJavaScript() : null]);

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    let triggerAutoPrint = false;

    if (openAction?.action === &quot;Print&quot;) {
      triggerAutoPrint = true;
    }

    if (javaScript) {
      javaScript.some(js =&gt; {
        if (!js) {
          return false;
        }

        console.warn(&quot;Warning: JavaScript support is not enabled&quot;);
        this.fallback(_pdfjsLib.UNSUPPORTED_FEATURES.javaScript);
        return true;
      });

      if (!triggerAutoPrint) {
        for (const js of javaScript) {
          if (js &amp;&amp; _ui_utils.AutoPrintRegExp.test(js)) {
            triggerAutoPrint = true;
            break;
          }
        }
      }
    }

    if (triggerAutoPrint) {
      this.triggerPrinting();
    }
  },

  async _initializeMetadata(pdfDocument) {
    const {
      info,
      metadata,
      contentDispositionFilename,
      contentLength
    } = await pdfDocument.getMetadata();

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    this.documentInfo = info;
    this.metadata = metadata;
    this._contentDispositionFilename ??= contentDispositionFilename;
    this._contentLength ??= contentLength;
    console.log(`PDF ${pdfDocument.fingerprints[0]} [${info.PDFFormatVersion} ` + `${(info.Producer || &quot;-&quot;).trim()} / ${(info.Creator || &quot;-&quot;).trim()}] ` + `(PDF.js: ${_pdfjsLib.version || &quot;?&quot;} [${_pdfjsLib.build || &quot;?&quot;}])`);
    let pdfTitle = info.Title;
    const metadataTitle = metadata?.get(&quot;dc:title&quot;);

    if (metadataTitle) {
      if (metadataTitle !== &quot;Untitled&quot; &amp;&amp; !/[\uFFF0-\uFFFF]/g.test(metadataTitle)) {
        pdfTitle = metadataTitle;
      }
    }

    if (pdfTitle) {
      this.setTitle(`${pdfTitle} - ${this._contentDispositionFilename || this._title}`);
    } else if (this._contentDispositionFilename) {
      this.setTitle(this._contentDispositionFilename);
    }

    if (info.IsXFAPresent &amp;&amp; !info.IsAcroFormPresent &amp;&amp; !pdfDocument.isPureXfa) {
      if (pdfDocument.loadingParams.enableXfa) {
        console.warn(&quot;Warning: XFA Foreground documents are not supported&quot;);
      } else {
        console.warn(&quot;Warning: XFA support is not enabled&quot;);
      }

      this.fallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
    } else if ((info.IsAcroFormPresent || info.IsXFAPresent) &amp;&amp; !this.pdfViewer.renderForms) {
      console.warn(&quot;Warning: Interactive form support is not enabled&quot;);
      this.fallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
    }

    if (info.IsSignaturesPresent) {
      console.warn(&quot;Warning: Digital signatures validation is not supported&quot;);
      this.fallback(_pdfjsLib.UNSUPPORTED_FEATURES.signatures);
    }

    let versionId = &quot;other&quot;;

    if (KNOWN_VERSIONS.includes(info.PDFFormatVersion)) {
      versionId = `v${info.PDFFormatVersion.replace(&quot;.&quot;, &quot;_&quot;)}`;
    }

    let generatorId = &quot;other&quot;;

    if (info.Producer) {
      const producer = info.Producer.toLowerCase();
      KNOWN_GENERATORS.some(function (generator) {
        if (!producer.includes(generator)) {
          return false;
        }

        generatorId = generator.replace(/[ .-]/g, &quot;_&quot;);
        return true;
      });
    }

    let formType = null;

    if (info.IsXFAPresent) {
      formType = &quot;xfa&quot;;
    } else if (info.IsAcroFormPresent) {
      formType = &quot;acroform&quot;;
    }

    this.externalServices.reportTelemetry({
      type: &quot;documentInfo&quot;,
      version: versionId,
      generator: generatorId,
      formType
    });
    this.eventBus.dispatch(&quot;metadataloaded&quot;, {
      source: this
    });
  },

  async _initializePageLabels(pdfDocument) {
    const labels = await pdfDocument.getPageLabels();

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    if (!labels || _app_options.AppOptions.get(&quot;disablePageLabels&quot;)) {
      return;
    }

    const numLabels = labels.length;
    let standardLabels = 0,
        emptyLabels = 0;

    for (let i = 0; i &lt; numLabels; i++) {
      const label = labels[i];

      if (label === (i + 1).toString()) {
        standardLabels++;
      } else if (label === &quot;&quot;) {
        emptyLabels++;
      } else {
        break;
      }
    }

    if (standardLabels &gt;= numLabels || emptyLabels &gt;= numLabels) {
      return;
    }

    const {
      pdfViewer,
      pdfThumbnailViewer,
      toolbar
    } = this;
    pdfViewer.setPageLabels(labels);
    pdfThumbnailViewer.setPageLabels(labels);
    toolbar.setPagesCount(numLabels, true);
    toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  },

  _initializePdfHistory({
    fingerprint,
    viewOnLoad,
    initialDest = null
  }) {
    if (!this.pdfHistory) {
      return;
    }

    this.pdfHistory.initialize({
      fingerprint,
      resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
      updateUrl: _app_options.AppOptions.get(&quot;historyUpdateUrl&quot;)
    });

    if (this.pdfHistory.initialBookmark) {
      this.initialBookmark = this.pdfHistory.initialBookmark;
      this.initialRotation = this.pdfHistory.initialRotation;
    }

    if (initialDest &amp;&amp; !this.initialBookmark &amp;&amp; viewOnLoad === ViewOnLoad.UNKNOWN) {
      this.initialBookmark = JSON.stringify(initialDest);
      this.pdfHistory.push({
        explicitDest: initialDest,
        pageNumber: null
      });
    }
  },

  _initializeAnnotationStorageCallbacks(pdfDocument) {
    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    const {
      annotationStorage
    } = pdfDocument;

    annotationStorage.onSetModified = () =&gt; {
      window.addEventListener(&quot;beforeunload&quot;, beforeUnload);
      this._annotationStorageModified = true;
    };

    annotationStorage.onResetModified = () =&gt; {
      window.removeEventListener(&quot;beforeunload&quot;, beforeUnload);
      delete this._annotationStorageModified;
    };

    annotationStorage.onAnnotationEditor = typeStr =&gt; {
      this._hasAnnotationEditors = !!typeStr;
      this.setTitle();

      if (typeStr) {
        this.externalServices.reportTelemetry({
          type: &quot;editing&quot;,
          data: {
            type: typeStr
          }
        });
      }
    };
  },

  setInitialView(storedHash, {
    rotation,
    sidebarView,
    scrollMode,
    spreadMode
  } = {}) {
    const setRotation = angle =&gt; {
      if ((0, _ui_utils.isValidRotation)(angle)) {
        this.pdfViewer.pagesRotation = angle;
      }
    };

    const setViewerModes = (scroll, spread) =&gt; {
      if ((0, _ui_utils.isValidScrollMode)(scroll)) {
        this.pdfViewer.scrollMode = scroll;
      }

      if ((0, _ui_utils.isValidSpreadMode)(spread)) {
        this.pdfViewer.spreadMode = spread;
      }
    };

    this.isInitialViewSet = true;
    this.pdfSidebar.setInitialView(sidebarView);
    setViewerModes(scrollMode, spreadMode);

    if (this.initialBookmark) {
      setRotation(this.initialRotation);
      delete this.initialRotation;
      this.pdfLinkService.setHash(this.initialBookmark);
      this.initialBookmark = null;
    } else if (storedHash) {
      setRotation(rotation);
      this.pdfLinkService.setHash(storedHash);
    }

    this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);

    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
    }
  },

  _cleanup() {
    if (!this.pdfDocument) {
      return;
    }

    this.pdfViewer.cleanup();
    this.pdfThumbnailViewer.cleanup();
    this.pdfDocument.cleanup(this.pdfViewer.renderer === _ui_utils.RendererType.SVG);
  },

  forceRendering() {
    this.pdfRenderingQueue.printing = !!this.printService;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.visibleView === _ui_utils.SidebarView.THUMBS;
    this.pdfRenderingQueue.renderHighestPriority();
  },

  beforePrint() {
    this._printAnnotationStoragePromise = this.pdfScriptingManager.dispatchWillPrint().catch(() =&gt; {}).then(() =&gt; {
      return this.pdfDocument?.annotationStorage.print;
    });

    if (this.printService) {
      return;
    }

    if (!this.supportsPrinting) {
      this.l10n.get(&quot;printing_not_supported&quot;).then(msg =&gt; {
        this._otherError(msg);
      });
      return;
    }

    if (!this.pdfViewer.pageViewsReady) {
      this.l10n.get(&quot;printing_not_ready&quot;).then(msg =&gt; {
        window.alert(msg);
      });
      return;
    }

    const pagesOverview = this.pdfViewer.getPagesOverview();
    const printContainer = this.appConfig.printContainer;

    const printResolution = _app_options.AppOptions.get(&quot;printResolution&quot;);

    const optionalContentConfigPromise = this.pdfViewer.optionalContentConfigPromise;
    const printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, this._printAnnotationStoragePromise, this.l10n);
    this.printService = printService;
    this.forceRendering();
    this.setTitle();
    printService.layout();
    this.externalServices.reportTelemetry({
      type: &quot;print&quot;
    });

    if (this._hasAnnotationEditors) {
      this.externalServices.reportTelemetry({
        type: &quot;editing&quot;,
        data: {
          type: &quot;print&quot;
        }
      });
    }
  },

  afterPrint() {
    if (this._printAnnotationStoragePromise) {
      this._printAnnotationStoragePromise.then(() =&gt; {
        this.pdfScriptingManager.dispatchDidPrint();
      });

      this._printAnnotationStoragePromise = null;
    }

    if (this.printService) {
      this.printService.destroy();
      this.printService = null;
      this.pdfDocument?.annotationStorage.resetModified();
    }

    this.forceRendering();
    this.setTitle();
  },

  rotatePages(delta) {
    this.pdfViewer.pagesRotation += delta;
  },

  requestPresentationMode() {
    this.pdfPresentationMode?.request();
  },

  triggerPrinting() {
    if (!this.supportsPrinting) {
      return;
    }

    window.print();
  },

  bindEvents() {
    const {
      eventBus,
      _boundEvents
    } = this;
    _boundEvents.beforePrint = this.beforePrint.bind(this);
    _boundEvents.afterPrint = this.afterPrint.bind(this);

    eventBus._on(&quot;resize&quot;, webViewerResize);

    eventBus._on(&quot;hashchange&quot;, webViewerHashchange);

    eventBus._on(&quot;beforeprint&quot;, _boundEvents.beforePrint);

    eventBus._on(&quot;afterprint&quot;, _boundEvents.afterPrint);

    eventBus._on(&quot;pagerendered&quot;, webViewerPageRendered);

    eventBus._on(&quot;updateviewarea&quot;, webViewerUpdateViewarea);

    eventBus._on(&quot;pagechanging&quot;, webViewerPageChanging);

    eventBus._on(&quot;scalechanging&quot;, webViewerScaleChanging);

    eventBus._on(&quot;rotationchanging&quot;, webViewerRotationChanging);

    eventBus._on(&quot;sidebarviewchanged&quot;, webViewerSidebarViewChanged);

    eventBus._on(&quot;pagemode&quot;, webViewerPageMode);

    eventBus._on(&quot;namedaction&quot;, webViewerNamedAction);

    eventBus._on(&quot;presentationmodechanged&quot;, webViewerPresentationModeChanged);

    eventBus._on(&quot;presentationmode&quot;, webViewerPresentationMode);

    eventBus._on(&quot;switchannotationeditormode&quot;, webViewerSwitchAnnotationEditorMode);

    eventBus._on(&quot;switchannotationeditorparams&quot;, webViewerSwitchAnnotationEditorParams);

    eventBus._on(&quot;print&quot;, webViewerPrint);

    eventBus._on(&quot;download&quot;, webViewerDownload);

    eventBus._on(&quot;firstpage&quot;, webViewerFirstPage);

    eventBus._on(&quot;lastpage&quot;, webViewerLastPage);

    eventBus._on(&quot;nextpage&quot;, webViewerNextPage);

    eventBus._on(&quot;previouspage&quot;, webViewerPreviousPage);

    eventBus._on(&quot;zoomin&quot;, webViewerZoomIn);

    eventBus._on(&quot;zoomout&quot;, webViewerZoomOut);

    eventBus._on(&quot;zoomreset&quot;, webViewerZoomReset);

    eventBus._on(&quot;pagenumberchanged&quot;, webViewerPageNumberChanged);

    eventBus._on(&quot;scalechanged&quot;, webViewerScaleChanged);

    eventBus._on(&quot;rotatecw&quot;, webViewerRotateCw);

    eventBus._on(&quot;rotateccw&quot;, webViewerRotateCcw);

    eventBus._on(&quot;optionalcontentconfig&quot;, webViewerOptionalContentConfig);

    eventBus._on(&quot;switchscrollmode&quot;, webViewerSwitchScrollMode);

    eventBus._on(&quot;scrollmodechanged&quot;, webViewerScrollModeChanged);

    eventBus._on(&quot;switchspreadmode&quot;, webViewerSwitchSpreadMode);

    eventBus._on(&quot;spreadmodechanged&quot;, webViewerSpreadModeChanged);

    eventBus._on(&quot;documentproperties&quot;, webViewerDocumentProperties);

    eventBus._on(&quot;findfromurlhash&quot;, webViewerFindFromUrlHash);

    eventBus._on(&quot;updatefindmatchescount&quot;, webViewerUpdateFindMatchesCount);

    eventBus._on(&quot;updatefindcontrolstate&quot;, webViewerUpdateFindControlState);

    if (_app_options.AppOptions.get(&quot;pdfBug&quot;)) {
      _boundEvents.reportPageStatsPDFBug = reportPageStatsPDFBug;

      eventBus._on(&quot;pagerendered&quot;, _boundEvents.reportPageStatsPDFBug);

      eventBus._on(&quot;pagechanging&quot;, _boundEvents.reportPageStatsPDFBug);
    }

    eventBus._on(&quot;fileinputchange&quot;, webViewerFileInputChange);

    eventBus._on(&quot;openfile&quot;, webViewerOpenFile);
  },

  bindWindowEvents() {
    const {
      eventBus,
      _boundEvents
    } = this;

    function addWindowResolutionChange(evt = null) {
      if (evt) {
        webViewerResolutionChange(evt);
      }

      const mediaQueryList = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      mediaQueryList.addEventListener(&quot;change&quot;, addWindowResolutionChange, {
        once: true
      });

      _boundEvents.removeWindowResolutionChange ||= function () {
        mediaQueryList.removeEventListener(&quot;change&quot;, addWindowResolutionChange);
        _boundEvents.removeWindowResolutionChange = null;
      };
    }

    addWindowResolutionChange();

    _boundEvents.windowResize = () =&gt; {
      eventBus.dispatch(&quot;resize&quot;, {
        source: window
      });
    };

    _boundEvents.windowHashChange = () =&gt; {
      eventBus.dispatch(&quot;hashchange&quot;, {
        source: window,
        hash: document.location.hash.substring(1)
      });
    };

    _boundEvents.windowBeforePrint = () =&gt; {
      eventBus.dispatch(&quot;beforeprint&quot;, {
        source: window
      });
    };

    _boundEvents.windowAfterPrint = () =&gt; {
      eventBus.dispatch(&quot;afterprint&quot;, {
        source: window
      });
    };

    _boundEvents.windowUpdateFromSandbox = event =&gt; {
      eventBus.dispatch(&quot;updatefromsandbox&quot;, {
        source: window,
        detail: event.detail
      });
    };

    window.addEventListener(&quot;visibilitychange&quot;, webViewerVisibilityChange);
    window.addEventListener(&quot;wheel&quot;, webViewerWheel, {
      passive: false
    });
    window.addEventListener(&quot;touchstart&quot;, webViewerTouchStart, {
      passive: false
    });
    window.addEventListener(&quot;click&quot;, webViewerClick);
    window.addEventListener(&quot;keydown&quot;, webViewerKeyDown);
    window.addEventListener(&quot;resize&quot;, _boundEvents.windowResize);
    window.addEventListener(&quot;hashchange&quot;, _boundEvents.windowHashChange);
    window.addEventListener(&quot;beforeprint&quot;, _boundEvents.windowBeforePrint);
    window.addEventListener(&quot;afterprint&quot;, _boundEvents.windowAfterPrint);
    window.addEventListener(&quot;updatefromsandbox&quot;, _boundEvents.windowUpdateFromSandbox);
  },

  unbindEvents() {
    const {
      eventBus,
      _boundEvents
    } = this;

    eventBus._off(&quot;resize&quot;, webViewerResize);

    eventBus._off(&quot;hashchange&quot;, webViewerHashchange);

    eventBus._off(&quot;beforeprint&quot;, _boundEvents.beforePrint);

    eventBus._off(&quot;afterprint&quot;, _boundEvents.afterPrint);

    eventBus._off(&quot;pagerendered&quot;, webViewerPageRendered);

    eventBus._off(&quot;updateviewarea&quot;, webViewerUpdateViewarea);

    eventBus._off(&quot;pagechanging&quot;, webViewerPageChanging);

    eventBus._off(&quot;scalechanging&quot;, webViewerScaleChanging);

    eventBus._off(&quot;rotationchanging&quot;, webViewerRotationChanging);

    eventBus._off(&quot;sidebarviewchanged&quot;, webViewerSidebarViewChanged);

    eventBus._off(&quot;pagemode&quot;, webViewerPageMode);

    eventBus._off(&quot;namedaction&quot;, webViewerNamedAction);

    eventBus._off(&quot;presentationmodechanged&quot;, webViewerPresentationModeChanged);

    eventBus._off(&quot;presentationmode&quot;, webViewerPresentationMode);

    eventBus._off(&quot;print&quot;, webViewerPrint);

    eventBus._off(&quot;download&quot;, webViewerDownload);

    eventBus._off(&quot;firstpage&quot;, webViewerFirstPage);

    eventBus._off(&quot;lastpage&quot;, webViewerLastPage);

    eventBus._off(&quot;nextpage&quot;, webViewerNextPage);

    eventBus._off(&quot;previouspage&quot;, webViewerPreviousPage);

    eventBus._off(&quot;zoomin&quot;, webViewerZoomIn);

    eventBus._off(&quot;zoomout&quot;, webViewerZoomOut);

    eventBus._off(&quot;zoomreset&quot;, webViewerZoomReset);

    eventBus._off(&quot;pagenumberchanged&quot;, webViewerPageNumberChanged);

    eventBus._off(&quot;scalechanged&quot;, webViewerScaleChanged);

    eventBus._off(&quot;rotatecw&quot;, webViewerRotateCw);

    eventBus._off(&quot;rotateccw&quot;, webViewerRotateCcw);

    eventBus._off(&quot;optionalcontentconfig&quot;, webViewerOptionalContentConfig);

    eventBus._off(&quot;switchscrollmode&quot;, webViewerSwitchScrollMode);

    eventBus._off(&quot;scrollmodechanged&quot;, webViewerScrollModeChanged);

    eventBus._off(&quot;switchspreadmode&quot;, webViewerSwitchSpreadMode);

    eventBus._off(&quot;spreadmodechanged&quot;, webViewerSpreadModeChanged);

    eventBus._off(&quot;documentproperties&quot;, webViewerDocumentProperties);

    eventBus._off(&quot;findfromurlhash&quot;, webViewerFindFromUrlHash);

    eventBus._off(&quot;updatefindmatchescount&quot;, webViewerUpdateFindMatchesCount);

    eventBus._off(&quot;updatefindcontrolstate&quot;, webViewerUpdateFindControlState);

    if (_boundEvents.reportPageStatsPDFBug) {
      eventBus._off(&quot;pagerendered&quot;, _boundEvents.reportPageStatsPDFBug);

      eventBus._off(&quot;pagechanging&quot;, _boundEvents.reportPageStatsPDFBug);

      _boundEvents.reportPageStatsPDFBug = null;
    }

    eventBus._off(&quot;fileinputchange&quot;, webViewerFileInputChange);

    eventBus._off(&quot;openfile&quot;, webViewerOpenFile);

    _boundEvents.beforePrint = null;
    _boundEvents.afterPrint = null;
  },

  unbindWindowEvents() {
    const {
      _boundEvents
    } = this;
    window.removeEventListener(&quot;visibilitychange&quot;, webViewerVisibilityChange);
    window.removeEventListener(&quot;wheel&quot;, webViewerWheel, {
      passive: false
    });
    window.removeEventListener(&quot;touchstart&quot;, webViewerTouchStart, {
      passive: false
    });
    window.removeEventListener(&quot;click&quot;, webViewerClick);
    window.removeEventListener(&quot;keydown&quot;, webViewerKeyDown);
    window.removeEventListener(&quot;resize&quot;, _boundEvents.windowResize);
    window.removeEventListener(&quot;hashchange&quot;, _boundEvents.windowHashChange);
    window.removeEventListener(&quot;beforeprint&quot;, _boundEvents.windowBeforePrint);
    window.removeEventListener(&quot;afterprint&quot;, _boundEvents.windowAfterPrint);
    window.removeEventListener(&quot;updatefromsandbox&quot;, _boundEvents.windowUpdateFromSandbox);
    _boundEvents.removeWindowResolutionChange?.();
    _boundEvents.windowResize = null;
    _boundEvents.windowHashChange = null;
    _boundEvents.windowBeforePrint = null;
    _boundEvents.windowAfterPrint = null;
    _boundEvents.windowUpdateFromSandbox = null;
  },

  accumulateWheelTicks(ticks) {
    if (this._wheelUnusedTicks &gt; 0 &amp;&amp; ticks &lt; 0 || this._wheelUnusedTicks &lt; 0 &amp;&amp; ticks &gt; 0) {
      this._wheelUnusedTicks = 0;
    }

    this._wheelUnusedTicks += ticks;
    const wholeTicks = Math.sign(this._wheelUnusedTicks) * Math.floor(Math.abs(this._wheelUnusedTicks));
    this._wheelUnusedTicks -= wholeTicks;
    return wholeTicks;
  },

  _unblockDocumentLoadEvent() {
    document.blockUnblockOnload?.(false);

    this._unblockDocumentLoadEvent = () =&gt; {};
  },

  _reportDocumentStatsTelemetry() {
    const {
      stats
    } = this.pdfDocument;

    if (stats !== this._docStats) {
      this._docStats = stats;
      this.externalServices.reportTelemetry({
        type: &quot;documentStats&quot;,
        stats
      });
    }
  },

  get scriptingReady() {
    return this.pdfScriptingManager.ready;
  }

};
exports.PDFViewerApplication = PDFViewerApplication;
{
  const HOSTED_VIEWER_ORIGINS = [&quot;null&quot;, &quot;http://mozilla.github.io&quot;, &quot;https://mozilla.github.io&quot;];

  var validateFileURL = function (file) {
    if (!file) {
      return;
    }

    try {
      const viewerOrigin = new URL(window.location.href).origin || &quot;null&quot;;

      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
        return;
      }

      const fileOrigin = new URL(file, window.location.href).origin;

      if (fileOrigin !== viewerOrigin) {
        throw new Error(&quot;file origin does not match viewer&apos;s&quot;);
      }
    } catch (ex) {
      PDFViewerApplication.l10n.get(&quot;loading_error&quot;).then(msg =&gt; {
        PDFViewerApplication._documentError(msg, {
          message: ex?.message
        });
      });
      throw ex;
    }
  };
}

async function loadFakeWorker() {
  _pdfjsLib.GlobalWorkerOptions.workerSrc ||= _app_options.AppOptions.get(&quot;workerSrc&quot;);
  await (0, _pdfjsLib.loadScript)(_pdfjsLib.PDFWorker.workerSrc);
}

async function loadPDFBug(self) {
  const {
    debuggerScriptPath
  } = self.appConfig;
  const {
    PDFBug
  } = await import(debuggerScriptPath);
  self._PDFBug = PDFBug;
}

function reportPageStatsPDFBug({
  pageNumber
}) {
  if (!globalThis.Stats?.enabled) {
    return;
  }

  const pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
  globalThis.Stats.add(pageNumber, pageView?.pdfPage?.stats);
}

function webViewerInitialized() {
  const {
    appConfig,
    eventBus
  } = PDFViewerApplication;
  let file;
  const queryString = document.location.search.substring(1);
  const params = (0, _ui_utils.parseQueryString)(queryString);
  file = params.get(&quot;file&quot;) ?? _app_options.AppOptions.get(&quot;defaultUrl&quot;);
  validateFileURL(file);
  const fileInput = appConfig.openFileInput;
  fileInput.value = null;
  fileInput.addEventListener(&quot;change&quot;, function (evt) {
    const {
      files
    } = evt.target;

    if (!files || files.length === 0) {
      return;
    }

    eventBus.dispatch(&quot;fileinputchange&quot;, {
      source: this,
      fileInput: evt.target
    });
  });
  appConfig.mainContainer.addEventListener(&quot;dragover&quot;, function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = evt.dataTransfer.effectAllowed === &quot;copy&quot; ? &quot;copy&quot; : &quot;move&quot;;
  });
  appConfig.mainContainer.addEventListener(&quot;drop&quot;, function (evt) {
    evt.preventDefault();
    const {
      files
    } = evt.dataTransfer;

    if (!files || files.length === 0) {
      return;
    }

    eventBus.dispatch(&quot;fileinputchange&quot;, {
      source: this,
      fileInput: evt.dataTransfer
    });
  });

  if (!PDFViewerApplication.supportsDocumentFonts) {
    _app_options.AppOptions.set(&quot;disableFontFace&quot;, true);

    PDFViewerApplication.l10n.get(&quot;web_fonts_disabled&quot;).then(msg =&gt; {
      console.warn(msg);
    });
  }

  if (!PDFViewerApplication.supportsPrinting) {
    appConfig.toolbar.print.classList.add(&quot;hidden&quot;);
    appConfig.secondaryToolbar.printButton.classList.add(&quot;hidden&quot;);
  }

  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.secondaryToolbar.presentationModeButton.classList.add(&quot;hidden&quot;);
  }

  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add(&quot;hidden&quot;);
  }

  appConfig.mainContainer.addEventListener(&quot;transitionend&quot;, function (evt) {
    if (evt.target === this) {
      eventBus.dispatch(&quot;resize&quot;, {
        source: this
      });
    }
  }, true);

  try {
    if (file) {
      PDFViewerApplication.open(file);
    } else {
      PDFViewerApplication._hideViewBookmark();
    }
  } catch (reason) {
    PDFViewerApplication.l10n.get(&quot;loading_error&quot;).then(msg =&gt; {
      PDFViewerApplication._documentError(msg, reason);
    });
  }
}

function webViewerPageRendered({
  pageNumber,
  error
}) {
  if (pageNumber === PDFViewerApplication.page) {
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
  }

  if (PDFViewerApplication.pdfSidebar.visibleView === _ui_utils.SidebarView.THUMBS) {
    const pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
    const thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageNumber - 1);

    if (pageView &amp;&amp; thumbnailView) {
      thumbnailView.setImage(pageView);
    }
  }

  if (error) {
    PDFViewerApplication.l10n.get(&quot;rendering_error&quot;).then(msg =&gt; {
      PDFViewerApplication._otherError(msg, error);
    });
  }

  PDFViewerApplication._reportDocumentStatsTelemetry();
}

function webViewerPageMode({
  mode
}) {
  let view;

  switch (mode) {
    case &quot;thumbs&quot;:
      view = _ui_utils.SidebarView.THUMBS;
      break;

    case &quot;bookmarks&quot;:
    case &quot;outline&quot;:
      view = _ui_utils.SidebarView.OUTLINE;
      break;

    case &quot;attachments&quot;:
      view = _ui_utils.SidebarView.ATTACHMENTS;
      break;

    case &quot;layers&quot;:
      view = _ui_utils.SidebarView.LAYERS;
      break;

    case &quot;none&quot;:
      view = _ui_utils.SidebarView.NONE;
      break;

    default:
      console.error(&apos;Invalid &quot;pagemode&quot; hash parameter: &apos; + mode);
      return;
  }

  PDFViewerApplication.pdfSidebar.switchView(view, true);
}

function webViewerNamedAction(evt) {
  switch (evt.action) {
    case &quot;GoToPage&quot;:
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;

    case &quot;Find&quot;:
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
      }

      break;

    case &quot;Print&quot;:
      PDFViewerApplication.triggerPrinting();
      break;

    case &quot;SaveAs&quot;:
      PDFViewerApplication.downloadOrSave();
      break;
  }
}

function webViewerPresentationModeChanged(evt) {
  PDFViewerApplication.pdfViewer.presentationModeState = evt.state;
}

function webViewerSidebarViewChanged({
  view
}) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = view === _ui_utils.SidebarView.THUMBS;

  if (PDFViewerApplication.isInitialViewSet) {
    PDFViewerApplication.store?.set(&quot;sidebarView&quot;, view).catch(() =&gt; {});
  }
}

function webViewerUpdateViewarea({
  location
}) {
  if (PDFViewerApplication.isInitialViewSet) {
    PDFViewerApplication.store?.setMultiple({
      page: location.pageNumber,
      zoom: location.scale,
      scrollLeft: location.left,
      scrollTop: location.top,
      rotation: location.rotation
    }).catch(() =&gt; {});
  }

  const href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
  const currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
  const loading = currentPage?.renderingState !== _ui_utils.RenderingStates.FINISHED;
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}

function webViewerScrollModeChanged(evt) {
  if (PDFViewerApplication.isInitialViewSet &amp;&amp; !PDFViewerApplication.pdfViewer.isInPresentationMode) {
    PDFViewerApplication.store?.set(&quot;scrollMode&quot;, evt.mode).catch(() =&gt; {});
  }
}

function webViewerSpreadModeChanged(evt) {
  if (PDFViewerApplication.isInitialViewSet &amp;&amp; !PDFViewerApplication.pdfViewer.isInPresentationMode) {
    PDFViewerApplication.store?.set(&quot;spreadMode&quot;, evt.mode).catch(() =&gt; {});
  }
}

function webViewerResize() {
  const {
    pdfDocument,
    pdfViewer,
    pdfRenderingQueue
  } = PDFViewerApplication;

  if (pdfRenderingQueue.printing &amp;&amp; window.matchMedia(&quot;print&quot;).matches) {
    return;
  }

  pdfViewer.updateContainerHeightCss();

  if (!pdfDocument) {
    return;
  }

  const currentScaleValue = pdfViewer.currentScaleValue;

  if (currentScaleValue === &quot;auto&quot; || currentScaleValue === &quot;page-fit&quot; || currentScaleValue === &quot;page-width&quot;) {
    pdfViewer.currentScaleValue = currentScaleValue;
  }

  pdfViewer.update();
}

function webViewerHashchange(evt) {
  const hash = evt.hash;

  if (!hash) {
    return;
  }

  if (!PDFViewerApplication.isInitialViewSet) {
    PDFViewerApplication.initialBookmark = hash;
  } else if (!PDFViewerApplication.pdfHistory?.popStateInProgress) {
    PDFViewerApplication.pdfLinkService.setHash(hash);
  }
}

{
  var webViewerFileInputChange = function (evt) {
    if (PDFViewerApplication.pdfViewer?.isInPresentationMode) {
      return;
    }

    const file = evt.fileInput.files[0];
    let url = URL.createObjectURL(file);

    if (file.name) {
      url = {
        url,
        originalUrl: file.name
      };
    }

    PDFViewerApplication.open(url);
  };

  var webViewerOpenFile = function (evt) {
    const fileInput = PDFViewerApplication.appConfig.openFileInput;
    fileInput.click();
  };
}

function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}

function webViewerSwitchAnnotationEditorMode(evt) {
  PDFViewerApplication.pdfViewer.annotationEditorMode = evt.mode;
}

function webViewerSwitchAnnotationEditorParams(evt) {
  PDFViewerApplication.pdfViewer.annotationEditorParams = evt;
}

function webViewerPrint() {
  PDFViewerApplication.triggerPrinting();
}

function webViewerDownload() {
  PDFViewerApplication.downloadOrSave();
}

function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
  }
}

function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
  }
}

function webViewerNextPage() {
  PDFViewerApplication.pdfViewer.nextPage();
}

function webViewerPreviousPage() {
  PDFViewerApplication.pdfViewer.previousPage();
}

function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}

function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}

function webViewerZoomReset() {
  PDFViewerApplication.zoomReset();
}

function webViewerPageNumberChanged(evt) {
  const pdfViewer = PDFViewerApplication.pdfViewer;

  if (evt.value !== &quot;&quot;) {
    PDFViewerApplication.pdfLinkService.goToPage(evt.value);
  }

  if (evt.value !== pdfViewer.currentPageNumber.toString() &amp;&amp; evt.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}

function webViewerScaleChanged(evt) {
  PDFViewerApplication.pdfViewer.currentScaleValue = evt.value;
}

function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}

function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}

function webViewerOptionalContentConfig(evt) {
  PDFViewerApplication.pdfViewer.optionalContentConfigPromise = evt.promise;
}

function webViewerSwitchScrollMode(evt) {
  PDFViewerApplication.pdfViewer.scrollMode = evt.mode;
}

function webViewerSwitchSpreadMode(evt) {
  PDFViewerApplication.pdfViewer.spreadMode = evt.mode;
}

function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}

function webViewerFindFromUrlHash(evt) {
  PDFViewerApplication.eventBus.dispatch(&quot;find&quot;, {
    source: evt.source,
    type: &quot;&quot;,
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false,
    matchDiacritics: true
  });
}

function webViewerUpdateFindMatchesCount({
  matchesCount
}) {
  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindMatchesCount(matchesCount);
  } else {
    PDFViewerApplication.findBar.updateResultsCount(matchesCount);
  }
}

function webViewerUpdateFindControlState({
  state,
  previous,
  matchesCount,
  rawQuery
}) {
  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous,
      matchesCount,
      rawQuery
    });
  } else {
    PDFViewerApplication.findBar.updateUIState(state, previous, matchesCount);
  }
}

function webViewerScaleChanging(evt) {
  PDFViewerApplication.toolbar.setPageScale(evt.presetValue, evt.scale);
  PDFViewerApplication.pdfViewer.update();
}

function webViewerRotationChanging(evt) {
  PDFViewerApplication.pdfThumbnailViewer.pagesRotation = evt.pagesRotation;
  PDFViewerApplication.forceRendering();
  PDFViewerApplication.pdfViewer.currentPageNumber = evt.pageNumber;
}

function webViewerPageChanging({
  pageNumber,
  pageLabel
}) {
  PDFViewerApplication.toolbar.setPageNumber(pageNumber, pageLabel);
  PDFViewerApplication.secondaryToolbar.setPageNumber(pageNumber);

  if (PDFViewerApplication.pdfSidebar.visibleView === _ui_utils.SidebarView.THUMBS) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(pageNumber);
  }
}

function webViewerResolutionChange(evt) {
  PDFViewerApplication.pdfViewer.refresh();
}

function webViewerVisibilityChange(evt) {
  if (document.visibilityState === &quot;visible&quot;) {
    setZoomDisabledTimeout();
  }
}

let zoomDisabledTimeout = null;

function setZoomDisabledTimeout() {
  if (zoomDisabledTimeout) {
    clearTimeout(zoomDisabledTimeout);
  }

  zoomDisabledTimeout = setTimeout(function () {
    zoomDisabledTimeout = null;
  }, WHEEL_ZOOM_DISABLED_TIMEOUT);
}

function webViewerWheel(evt) {
  const {
    pdfViewer,
    supportedMouseWheelZoomModifierKeys
  } = PDFViewerApplication;

  if (pdfViewer.isInPresentationMode) {
    return;
  }

  if (evt.ctrlKey &amp;&amp; supportedMouseWheelZoomModifierKeys.ctrlKey || evt.metaKey &amp;&amp; supportedMouseWheelZoomModifierKeys.metaKey) {
    evt.preventDefault();

    if (zoomDisabledTimeout || document.visibilityState === &quot;hidden&quot;) {
      return;
    }

    const deltaMode = evt.deltaMode;
    const delta = (0, _ui_utils.normalizeWheelEventDirection)(evt);
    const previousScale = pdfViewer.currentScale;
    let ticks = 0;

    if (deltaMode === WheelEvent.DOM_DELTA_LINE || deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      if (Math.abs(delta) &gt;= 1) {
        ticks = Math.sign(delta);
      } else {
        ticks = PDFViewerApplication.accumulateWheelTicks(delta);
      }
    } else {
      const PIXELS_PER_LINE_SCALE = 30;
      ticks = PDFViewerApplication.accumulateWheelTicks(delta / PIXELS_PER_LINE_SCALE);
    }

    if (ticks &lt; 0) {
      PDFViewerApplication.zoomOut(-ticks);
    } else if (ticks &gt; 0) {
      PDFViewerApplication.zoomIn(ticks);
    }

    const currentScale = pdfViewer.currentScale;

    if (previousScale !== currentScale) {
      const scaleCorrectionFactor = currentScale / previousScale - 1;
      const rect = pdfViewer.container.getBoundingClientRect();
      const dx = evt.clientX - rect.left;
      const dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
    }
  } else {
    setZoomDisabledTimeout();
  }
}

function webViewerTouchStart(evt) {
  if (evt.touches.length &gt; 1) {
    evt.preventDefault();
  }
}

function webViewerClick(evt) {
  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
  }

  const appConfig = PDFViewerApplication.appConfig;

  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) &amp;&amp; evt.target !== appConfig.secondaryToolbar.toggleButton) {
    PDFViewerApplication.secondaryToolbar.close();
  }
}

function webViewerKeyDown(evt) {
  if (PDFViewerApplication.overlayManager.active) {
    return;
  }

  const {
    eventBus,
    pdfViewer
  } = PDFViewerApplication;
  const isViewerInPresentationMode = pdfViewer.isInPresentationMode;
  let handled = false,
      ensureViewerFocused = false;
  const cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);

  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind &amp;&amp; !evt.shiftKey) {
          PDFViewerApplication.findBar.open();
          handled = true;
        }

        break;

      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          const {
            state
          } = PDFViewerApplication.findController;

          if (state) {
            const eventState = Object.assign(Object.create(null), state, {
              source: window,
              type: &quot;again&quot;,
              findPrevious: cmd === 5 || cmd === 12
            });
            eventBus.dispatch(&quot;find&quot;, eventState);
          }

          handled = true;
        }

        break;

      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
        }

        handled = true;
        break;

      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
        }

        handled = true;
        break;

      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            PDFViewerApplication.zoomReset();
          });
          handled = false;
        }

        break;

      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page &gt; 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page &lt; PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;
    }
  }

  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        eventBus.dispatch(&quot;download&quot;, {
          source: window
        });
        handled = true;
        break;

      case 79:
        {
          eventBus.dispatch(&quot;openfile&quot;, {
            source: window
          });
          handled = true;
        }
        break;
    }
  }

  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        PDFViewerApplication.externalServices.reportTelemetry({
          type: &quot;buttons&quot;,
          data: {
            id: &quot;presentationModeKeyboard&quot;
          }
        });
        break;

      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
    }
  }

  if (handled) {
    if (ensureViewerFocused &amp;&amp; !isViewerInPresentationMode) {
      pdfViewer.focus();
    }

    evt.preventDefault();
    return;
  }

  const curElement = (0, _ui_utils.getActiveOrFocusedElement)();
  const curElementTagName = curElement?.tagName.toUpperCase();

  if (curElementTagName === &quot;INPUT&quot; || curElementTagName === &quot;TEXTAREA&quot; || curElementTagName === &quot;SELECT&quot; || curElement?.isContentEditable) {
    if (evt.keyCode !== 27) {
      return;
    }
  }

  if (cmd === 0) {
    let turnPage = 0,
        turnOnlyIfPageFit = false;

    switch (evt.keyCode) {
      case 38:
      case 33:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 8:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 75:
      case 80:
        turnPage = -1;
        break;

      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
        }

        if (!PDFViewerApplication.supportsIntegratedFind &amp;&amp; PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
        }

        break;

      case 40:
      case 34:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 13:
      case 32:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 74:
      case 78:
        turnPage = 1;
        break;

      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page &gt; 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page &lt; PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 83:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.SELECT);
        break;

      case 72:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.HAND);
        break;

      case 82:
        PDFViewerApplication.rotatePages(90);
        break;

      case 115:
        PDFViewerApplication.pdfSidebar.toggle();
        break;
    }

    if (turnPage !== 0 &amp;&amp; (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === &quot;page-fit&quot;)) {
      if (turnPage &gt; 0) {
        pdfViewer.nextPage();
      } else {
        pdfViewer.previousPage();
      }

      handled = true;
    }
  }

  if (cmd === 4) {
    switch (evt.keyCode) {
      case 13:
      case 32:
        if (!isViewerInPresentationMode &amp;&amp; pdfViewer.currentScaleValue !== &quot;page-fit&quot;) {
          break;
        }

        pdfViewer.previousPage();
        handled = true;
        break;

      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
    }
  }

  if (!handled &amp;&amp; !isViewerInPresentationMode) {
    if (evt.keyCode &gt;= 33 &amp;&amp; evt.keyCode &lt;= 40 || evt.keyCode === 32 &amp;&amp; curElementTagName !== &quot;BUTTON&quot;) {
      ensureViewerFocused = true;
    }
  }

  if (ensureViewerFocused &amp;&amp; !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }

  if (handled) {
    evt.preventDefault();
  }
}

function beforeUnload(evt) {
  evt.preventDefault();
  evt.returnValue = &quot;&quot;;
  return false;
}

function webViewerAnnotationEditorStatesChanged(data) {
  PDFViewerApplication.externalServices.updateEditorStates(data);
}

const PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,

    createPrintService() {
      throw new Error(&quot;Not implemented: createPrintService&quot;);
    }

  }
};
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;

/***/ }),
/* 5 */
/***/ ((module) =&gt; {



let pdfjsLib;

if (typeof window !== &quot;undefined&quot; &amp;&amp; window[&quot;pdfjs-dist/build/pdf&quot;]) {
  pdfjsLib = window[&quot;pdfjs-dist/build/pdf&quot;];
} else {
  pdfjsLib = require(&quot;../build/pdf.js&quot;);
}

module.exports = pdfjsLib;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.WaitOnType = exports.EventBus = exports.AutomationEventBus = void 0;
exports.waitOnEventOrTimeout = waitOnEventOrTimeout;
const WaitOnType = {
  EVENT: &quot;event&quot;,
  TIMEOUT: &quot;timeout&quot;
};
exports.WaitOnType = WaitOnType;

function waitOnEventOrTimeout({
  target,
  name,
  delay = 0
}) {
  return new Promise(function (resolve, reject) {
    if (typeof target !== &quot;object&quot; || !(name &amp;&amp; typeof name === &quot;string&quot;) || !(Number.isInteger(delay) &amp;&amp; delay &gt;= 0)) {
      throw new Error(&quot;waitOnEventOrTimeout - invalid parameters.&quot;);
    }

    function handler(type) {
      if (target instanceof EventBus) {
        target._off(name, eventHandler);
      } else {
        target.removeEventListener(name, eventHandler);
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      resolve(type);
    }

    const eventHandler = handler.bind(null, WaitOnType.EVENT);

    if (target instanceof EventBus) {
      target._on(name, eventHandler);
    } else {
      target.addEventListener(name, eventHandler);
    }

    const timeoutHandler = handler.bind(null, WaitOnType.TIMEOUT);
    const timeout = setTimeout(timeoutHandler, delay);
  });
}

class EventBus {
  constructor() {
    this._listeners = Object.create(null);
  }

  on(eventName, listener, options = null) {
    this._on(eventName, listener, {
      external: true,
      once: options?.once
    });
  }

  off(eventName, listener, options = null) {
    this._off(eventName, listener, {
      external: true,
      once: options?.once
    });
  }

  dispatch(eventName, data) {
    const eventListeners = this._listeners[eventName];

    if (!eventListeners || eventListeners.length === 0) {
      return;
    }

    let externalListeners;

    for (const {
      listener,
      external,
      once
    } of eventListeners.slice(0)) {
      if (once) {
        this._off(eventName, listener);
      }

      if (external) {
        (externalListeners ||= []).push(listener);
        continue;
      }

      listener(data);
    }

    if (externalListeners) {
      for (const listener of externalListeners) {
        listener(data);
      }

      externalListeners = null;
    }
  }

  _on(eventName, listener, options = null) {
    const eventListeners = this._listeners[eventName] ||= [];
    eventListeners.push({
      listener,
      external: options?.external === true,
      once: options?.once === true
    });
  }

  _off(eventName, listener, options = null) {
    const eventListeners = this._listeners[eventName];

    if (!eventListeners) {
      return;
    }

    for (let i = 0, ii = eventListeners.length; i &lt; ii; i++) {
      if (eventListeners[i].listener === listener) {
        eventListeners.splice(i, 1);
        return;
      }
    }
  }

}

exports.EventBus = EventBus;

class AutomationEventBus extends EventBus {
  dispatch(eventName, data) {
    throw new Error(&quot;Not implemented: AutomationEventBus.dispatch&quot;);
  }

}

exports.AutomationEventBus = AutomationEventBus;

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFCursorTools = exports.CursorTool = void 0;

var _pdfjsLib = __webpack_require__(5);

var _grab_to_pan = __webpack_require__(8);

var _ui_utils = __webpack_require__(1);

const CursorTool = {
  SELECT: 0,
  HAND: 1,
  ZOOM: 2
};
exports.CursorTool = CursorTool;

class PDFCursorTools {
  constructor({
    container,
    eventBus,
    cursorToolOnLoad = CursorTool.SELECT
  }) {
    this.container = container;
    this.eventBus = eventBus;
    this.active = CursorTool.SELECT;
    this.previouslyActive = null;
    this.handTool = new _grab_to_pan.GrabToPan({
      element: this.container
    });
    this.#addEventListeners();
    Promise.resolve().then(() =&gt; {
      this.switchTool(cursorToolOnLoad);
    });
  }

  get activeTool() {
    return this.active;
  }

  switchTool(tool) {
    if (this.previouslyActive !== null) {
      return;
    }

    if (tool === this.active) {
      return;
    }

    const disableActiveTool = () =&gt; {
      switch (this.active) {
        case CursorTool.SELECT:
          break;

        case CursorTool.HAND:
          this.handTool.deactivate();
          break;

        case CursorTool.ZOOM:
      }
    };

    switch (tool) {
      case CursorTool.SELECT:
        disableActiveTool();
        break;

      case CursorTool.HAND:
        disableActiveTool();
        this.handTool.activate();
        break;

      case CursorTool.ZOOM:
      default:
        console.error(`switchTool: &quot;${tool}&quot; is an unsupported value.`);
        return;
    }

    this.active = tool;
    this.#dispatchEvent();
  }

  #dispatchEvent() {
    this.eventBus.dispatch(&quot;cursortoolchanged&quot;, {
      source: this,
      tool: this.active
    });
  }

  #addEventListeners() {
    this.eventBus._on(&quot;switchcursortool&quot;, evt =&gt; {
      this.switchTool(evt.tool);
    });

    let annotationEditorMode = _pdfjsLib.AnnotationEditorType.NONE,
        presentationModeState = _ui_utils.PresentationModeState.NORMAL;

    const disableActive = () =&gt; {
      const previouslyActive = this.active;
      this.switchTool(CursorTool.SELECT);
      this.previouslyActive ??= previouslyActive;
    };

    const enableActive = () =&gt; {
      const previouslyActive = this.previouslyActive;

      if (previouslyActive !== null &amp;&amp; annotationEditorMode === _pdfjsLib.AnnotationEditorType.NONE &amp;&amp; presentationModeState === _ui_utils.PresentationModeState.NORMAL) {
        this.previouslyActive = null;
        this.switchTool(previouslyActive);
      }
    };

    this.eventBus._on(&quot;secondarytoolbarreset&quot;, evt =&gt; {
      if (this.previouslyActive !== null) {
        annotationEditorMode = _pdfjsLib.AnnotationEditorType.NONE;
        presentationModeState = _ui_utils.PresentationModeState.NORMAL;
        enableActive();
      }
    });

    this.eventBus._on(&quot;annotationeditormodechanged&quot;, ({
      mode
    }) =&gt; {
      annotationEditorMode = mode;

      if (mode === _pdfjsLib.AnnotationEditorType.NONE) {
        enableActive();
      } else {
        disableActive();
      }
    });

    this.eventBus._on(&quot;presentationmodechanged&quot;, ({
      state
    }) =&gt; {
      presentationModeState = state;

      if (state === _ui_utils.PresentationModeState.NORMAL) {
        enableActive();
      } else if (state === _ui_utils.PresentationModeState.FULLSCREEN) {
        disableActive();
      }
    });
  }

}

exports.PDFCursorTools = PDFCursorTools;

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.GrabToPan = void 0;
const CSS_CLASS_GRAB = &quot;grab-to-pan-grab&quot;;

class GrabToPan {
  constructor(options) {
    this.element = options.element;
    this.document = options.element.ownerDocument;

    if (typeof options.ignoreTarget === &quot;function&quot;) {
      this.ignoreTarget = options.ignoreTarget;
    }

    this.onActiveChanged = options.onActiveChanged;
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.toggle = this.toggle.bind(this);
    this._onMouseDown = this.#onMouseDown.bind(this);
    this._onMouseMove = this.#onMouseMove.bind(this);
    this._endPan = this.#endPan.bind(this);
    const overlay = this.overlay = document.createElement(&quot;div&quot;);
    overlay.className = &quot;grab-to-pan-grabbing&quot;;
  }

  activate() {
    if (!this.active) {
      this.active = true;
      this.element.addEventListener(&quot;mousedown&quot;, this._onMouseDown, true);
      this.element.classList.add(CSS_CLASS_GRAB);
      this.onActiveChanged?.(true);
    }
  }

  deactivate() {
    if (this.active) {
      this.active = false;
      this.element.removeEventListener(&quot;mousedown&quot;, this._onMouseDown, true);

      this._endPan();

      this.element.classList.remove(CSS_CLASS_GRAB);
      this.onActiveChanged?.(false);
    }
  }

  toggle() {
    if (this.active) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  ignoreTarget(node) {
    return node.matches(&quot;a[href], a[href] *, input, textarea, button, button *, select, option&quot;);
  }

  #onMouseDown(event) {
    if (event.button !== 0 || this.ignoreTarget(event.target)) {
      return;
    }

    if (event.originalTarget) {
      try {
        event.originalTarget.tagName;
      } catch (e) {
        return;
      }
    }

    this.scrollLeftStart = this.element.scrollLeft;
    this.scrollTopStart = this.element.scrollTop;
    this.clientXStart = event.clientX;
    this.clientYStart = event.clientY;
    this.document.addEventListener(&quot;mousemove&quot;, this._onMouseMove, true);
    this.document.addEventListener(&quot;mouseup&quot;, this._endPan, true);
    this.element.addEventListener(&quot;scroll&quot;, this._endPan, true);
    event.preventDefault();
    event.stopPropagation();
    const focusedElement = document.activeElement;

    if (focusedElement &amp;&amp; !focusedElement.contains(event.target)) {
      focusedElement.blur();
    }
  }

  #onMouseMove(event) {
    this.element.removeEventListener(&quot;scroll&quot;, this._endPan, true);

    if (!(event.buttons &amp; 1)) {
      this._endPan();

      return;
    }

    const xDiff = event.clientX - this.clientXStart;
    const yDiff = event.clientY - this.clientYStart;
    const scrollTop = this.scrollTopStart - yDiff;
    const scrollLeft = this.scrollLeftStart - xDiff;

    if (this.element.scrollTo) {
      this.element.scrollTo({
        top: scrollTop,
        left: scrollLeft,
        behavior: &quot;instant&quot;
      });
    } else {
      this.element.scrollTop = scrollTop;
      this.element.scrollLeft = scrollLeft;
    }

    if (!this.overlay.parentNode) {
      document.body.append(this.overlay);
    }
  }

  #endPan() {
    this.element.removeEventListener(&quot;scroll&quot;, this._endPan, true);
    this.document.removeEventListener(&quot;mousemove&quot;, this._onMouseMove, true);
    this.document.removeEventListener(&quot;mouseup&quot;, this._endPan, true);
    this.overlay.remove();
  }

}

exports.GrabToPan = GrabToPan;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.AnnotationEditorParams = void 0;

var _pdfjsLib = __webpack_require__(5);

class AnnotationEditorParams {
  constructor(options, eventBus) {
    this.eventBus = eventBus;
    this.#bindListeners(options);
  }

  #bindListeners({
    editorFreeTextFontSize,
    editorFreeTextColor,
    editorInkColor,
    editorInkThickness,
    editorInkOpacity
  }) {
    editorFreeTextFontSize.addEventListener(&quot;input&quot;, evt =&gt; {
      this.eventBus.dispatch(&quot;switchannotationeditorparams&quot;, {
        source: this,
        type: _pdfjsLib.AnnotationEditorParamsType.FREETEXT_SIZE,
        value: editorFreeTextFontSize.valueAsNumber
      });
    });
    editorFreeTextColor.addEventListener(&quot;input&quot;, evt =&gt; {
      this.eventBus.dispatch(&quot;switchannotationeditorparams&quot;, {
        source: this,
        type: _pdfjsLib.AnnotationEditorParamsType.FREETEXT_COLOR,
        value: editorFreeTextColor.value
      });
    });
    editorInkColor.addEventListener(&quot;input&quot;, evt =&gt; {
      this.eventBus.dispatch(&quot;switchannotationeditorparams&quot;, {
        source: this,
        type: _pdfjsLib.AnnotationEditorParamsType.INK_COLOR,
        value: editorInkColor.value
      });
    });
    editorInkThickness.addEventListener(&quot;input&quot;, evt =&gt; {
      this.eventBus.dispatch(&quot;switchannotationeditorparams&quot;, {
        source: this,
        type: _pdfjsLib.AnnotationEditorParamsType.INK_THICKNESS,
        value: editorInkThickness.valueAsNumber
      });
    });
    editorInkOpacity.addEventListener(&quot;input&quot;, evt =&gt; {
      this.eventBus.dispatch(&quot;switchannotationeditorparams&quot;, {
        source: this,
        type: _pdfjsLib.AnnotationEditorParamsType.INK_OPACITY,
        value: editorInkOpacity.valueAsNumber
      });
    });

    this.eventBus._on(&quot;annotationeditorparamschanged&quot;, evt =&gt; {
      for (const [type, value] of evt.details) {
        switch (type) {
          case _pdfjsLib.AnnotationEditorParamsType.FREETEXT_SIZE:
            editorFreeTextFontSize.value = value;
            break;

          case _pdfjsLib.AnnotationEditorParamsType.FREETEXT_COLOR:
            editorFreeTextColor.value = value;
            break;

          case _pdfjsLib.AnnotationEditorParamsType.INK_COLOR:
            editorInkColor.value = value;
            break;

          case _pdfjsLib.AnnotationEditorParamsType.INK_THICKNESS:
            editorInkThickness.value = value;
            break;

          case _pdfjsLib.AnnotationEditorParamsType.INK_OPACITY:
            editorInkOpacity.value = value;
            break;
        }
      }
    });
  }

}

exports.AnnotationEditorParams = AnnotationEditorParams;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.OverlayManager = void 0;

class OverlayManager {
  #overlays = new WeakMap();
  #active = null;

  get active() {
    return this.#active;
  }

  async register(dialog, canForceClose = false) {
    if (typeof dialog !== &quot;object&quot;) {
      throw new Error(&quot;Not enough parameters.&quot;);
    } else if (this.#overlays.has(dialog)) {
      throw new Error(&quot;The overlay is already registered.&quot;);
    }

    this.#overlays.set(dialog, {
      canForceClose
    });
    dialog.addEventListener(&quot;cancel&quot;, evt =&gt; {
      this.#active = null;
    });
  }

  async unregister(dialog) {
    if (!this.#overlays.has(dialog)) {
      throw new Error(&quot;The overlay does not exist.&quot;);
    } else if (this.#active === dialog) {
      throw new Error(&quot;The overlay cannot be removed while it is active.&quot;);
    }

    this.#overlays.delete(dialog);
  }

  async open(dialog) {
    if (!this.#overlays.has(dialog)) {
      throw new Error(&quot;The overlay does not exist.&quot;);
    } else if (this.#active) {
      if (this.#active === dialog) {
        throw new Error(&quot;The overlay is already active.&quot;);
      } else if (this.#overlays.get(dialog).canForceClose) {
        await this.close();
      } else {
        throw new Error(&quot;Another overlay is currently active.&quot;);
      }
    }

    this.#active = dialog;
    dialog.showModal();
  }

  async close(dialog = this.#active) {
    if (!this.#overlays.has(dialog)) {
      throw new Error(&quot;The overlay does not exist.&quot;);
    } else if (!this.#active) {
      throw new Error(&quot;The overlay is currently not active.&quot;);
    } else if (this.#active !== dialog) {
      throw new Error(&quot;Another overlay is currently active.&quot;);
    }

    dialog.close();
    this.#active = null;
  }

}

exports.OverlayManager = OverlayManager;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PasswordPrompt = void 0;

var _pdfjsLib = __webpack_require__(5);

class PasswordPrompt {
  #activeCapability = null;
  #updateCallback = null;
  #reason = null;

  constructor(options, overlayManager, l10n, isViewerEmbedded = false) {
    this.dialog = options.dialog;
    this.label = options.label;
    this.input = options.input;
    this.submitButton = options.submitButton;
    this.cancelButton = options.cancelButton;
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this._isViewerEmbedded = isViewerEmbedded;
    this.submitButton.addEventListener(&quot;click&quot;, this.#verify.bind(this));
    this.cancelButton.addEventListener(&quot;click&quot;, this.close.bind(this));
    this.input.addEventListener(&quot;keydown&quot;, e =&gt; {
      if (e.keyCode === 13) {
        this.#verify();
      }
    });
    this.overlayManager.register(this.dialog, true);
    this.dialog.addEventListener(&quot;close&quot;, this.#cancel.bind(this));
  }

  async open() {
    if (this.#activeCapability) {
      await this.#activeCapability.promise;
    }

    this.#activeCapability = (0, _pdfjsLib.createPromiseCapability)();

    try {
      await this.overlayManager.open(this.dialog);
    } catch (ex) {
      this.#activeCapability = null;
      throw ex;
    }

    const passwordIncorrect = this.#reason === _pdfjsLib.PasswordResponses.INCORRECT_PASSWORD;

    if (!this._isViewerEmbedded || passwordIncorrect) {
      this.input.focus();
    }

    this.label.textContent = await this.l10n.get(`password_${passwordIncorrect ? &quot;invalid&quot; : &quot;label&quot;}`);
  }

  async close() {
    if (this.overlayManager.active === this.dialog) {
      this.overlayManager.close(this.dialog);
    }
  }

  #verify() {
    const password = this.input.value;

    if (password?.length &gt; 0) {
      this.#invokeCallback(password);
    }
  }

  #cancel() {
    this.#invokeCallback(new Error(&quot;PasswordPrompt cancelled.&quot;));
    this.#activeCapability.resolve();
  }

  #invokeCallback(password) {
    if (!this.#updateCallback) {
      return;
    }

    this.close();
    this.input.value = &quot;&quot;;
    this.#updateCallback(password);
    this.#updateCallback = null;
  }

  async setUpdateCallback(updateCallback, reason) {
    if (this.#activeCapability) {
      await this.#activeCapability.promise;
    }

    this.#updateCallback = updateCallback;
    this.#reason = reason;
  }

}

exports.PasswordPrompt = PasswordPrompt;

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFAttachmentViewer = void 0;

var _pdfjsLib = __webpack_require__(5);

var _base_tree_viewer = __webpack_require__(13);

var _event_utils = __webpack_require__(6);

class PDFAttachmentViewer extends _base_tree_viewer.BaseTreeViewer {
  constructor(options) {
    super(options);
    this.downloadManager = options.downloadManager;

    this.eventBus._on(&quot;fileattachmentannotation&quot;, this.#appendAttachment.bind(this));
  }

  reset(keepRenderedCapability = false) {
    super.reset();
    this._attachments = null;

    if (!keepRenderedCapability) {
      this._renderedCapability = (0, _pdfjsLib.createPromiseCapability)();
    }

    this._pendingDispatchEvent = false;
  }

  async _dispatchEvent(attachmentsCount) {
    this._renderedCapability.resolve();

    if (attachmentsCount === 0 &amp;&amp; !this._pendingDispatchEvent) {
      this._pendingDispatchEvent = true;
      await (0, _event_utils.waitOnEventOrTimeout)({
        target: this.eventBus,
        name: &quot;annotationlayerrendered&quot;,
        delay: 1000
      });

      if (!this._pendingDispatchEvent) {
        return;
      }
    }

    this._pendingDispatchEvent = false;
    this.eventBus.dispatch(&quot;attachmentsloaded&quot;, {
      source: this,
      attachmentsCount
    });
  }

  _bindLink(element, {
    content,
    filename
  }) {
    element.onclick = () =&gt; {
      this.downloadManager.openOrDownloadData(element, content, filename);
      return false;
    };
  }

  render({
    attachments,
    keepRenderedCapability = false
  }) {
    if (this._attachments) {
      this.reset(keepRenderedCapability);
    }

    this._attachments = attachments || null;

    if (!attachments) {
      this._dispatchEvent(0);

      return;
    }

    const names = Object.keys(attachments).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    const fragment = document.createDocumentFragment();
    let attachmentsCount = 0;

    for (const name of names) {
      const item = attachments[name];
      const content = item.content,
            filename = (0, _pdfjsLib.getFilenameFromUrl)(item.filename);
      const div = document.createElement(&quot;div&quot;);
      div.className = &quot;treeItem&quot;;
      const element = document.createElement(&quot;a&quot;);

      this._bindLink(element, {
        content,
        filename
      });

      element.textContent = this._normalizeTextContent(filename);
      div.append(element);
      fragment.append(div);
      attachmentsCount++;
    }

    this._finishRendering(fragment, attachmentsCount);
  }

  #appendAttachment({
    filename,
    content
  }) {
    const renderedPromise = this._renderedCapability.promise;
    renderedPromise.then(() =&gt; {
      if (renderedPromise !== this._renderedCapability.promise) {
        return;
      }

      const attachments = this._attachments || Object.create(null);

      for (const name in attachments) {
        if (filename === name) {
          return;
        }
      }

      attachments[filename] = {
        filename,
        content
      };
      this.render({
        attachments,
        keepRenderedCapability: true
      });
    });
  }

}

exports.PDFAttachmentViewer = PDFAttachmentViewer;

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.BaseTreeViewer = void 0;

var _ui_utils = __webpack_require__(1);

const TREEITEM_OFFSET_TOP = -100;
const TREEITEM_SELECTED_CLASS = &quot;selected&quot;;

class BaseTreeViewer {
  constructor(options) {
    if (this.constructor === BaseTreeViewer) {
      throw new Error(&quot;Cannot initialize BaseTreeViewer.&quot;);
    }

    this.container = options.container;
    this.eventBus = options.eventBus;
    this.reset();
  }

  reset() {
    this._pdfDocument = null;
    this._lastToggleIsShow = true;
    this._currentTreeItem = null;
    this.container.textContent = &quot;&quot;;
    this.container.classList.remove(&quot;treeWithDeepNesting&quot;);
  }

  _dispatchEvent(count) {
    throw new Error(&quot;Not implemented: _dispatchEvent&quot;);
  }

  _bindLink(element, params) {
    throw new Error(&quot;Not implemented: _bindLink&quot;);
  }

  _normalizeTextContent(str) {
    return (0, _ui_utils.removeNullCharacters)(str, true) || &quot;\u2013&quot;;
  }

  _addToggleButton(div, hidden = false) {
    const toggler = document.createElement(&quot;div&quot;);
    toggler.className = &quot;treeItemToggler&quot;;

    if (hidden) {
      toggler.classList.add(&quot;treeItemsHidden&quot;);
    }

    toggler.onclick = evt =&gt; {
      evt.stopPropagation();
      toggler.classList.toggle(&quot;treeItemsHidden&quot;);

      if (evt.shiftKey) {
        const shouldShowAll = !toggler.classList.contains(&quot;treeItemsHidden&quot;);

        this._toggleTreeItem(div, shouldShowAll);
      }
    };

    div.prepend(toggler);
  }

  _toggleTreeItem(root, show = false) {
    this._lastToggleIsShow = show;

    for (const toggler of root.querySelectorAll(&quot;.treeItemToggler&quot;)) {
      toggler.classList.toggle(&quot;treeItemsHidden&quot;, !show);
    }
  }

  _toggleAllTreeItems() {
    this._toggleTreeItem(this.container, !this._lastToggleIsShow);
  }

  _finishRendering(fragment, count, hasAnyNesting = false) {
    if (hasAnyNesting) {
      this.container.classList.add(&quot;treeWithDeepNesting&quot;);
      this._lastToggleIsShow = !fragment.querySelector(&quot;.treeItemsHidden&quot;);
    }

    this.container.append(fragment);

    this._dispatchEvent(count);
  }

  render(params) {
    throw new Error(&quot;Not implemented: render&quot;);
  }

  _updateCurrentTreeItem(treeItem = null) {
    if (this._currentTreeItem) {
      this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS);

      this._currentTreeItem = null;
    }

    if (treeItem) {
      treeItem.classList.add(TREEITEM_SELECTED_CLASS);
      this._currentTreeItem = treeItem;
    }
  }

  _scrollToCurrentTreeItem(treeItem) {
    if (!treeItem) {
      return;
    }

    let currentNode = treeItem.parentNode;

    while (currentNode &amp;&amp; currentNode !== this.container) {
      if (currentNode.classList.contains(&quot;treeItem&quot;)) {
        const toggler = currentNode.firstElementChild;
        toggler?.classList.remove(&quot;treeItemsHidden&quot;);
      }

      currentNode = currentNode.parentNode;
    }

    this._updateCurrentTreeItem(treeItem);

    this.container.scrollTo(treeItem.offsetLeft, treeItem.offsetTop + TREEITEM_OFFSET_TOP);
  }

}

exports.BaseTreeViewer = BaseTreeViewer;

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFDocumentProperties = void 0;

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(1);

const DEFAULT_FIELD_CONTENT = &quot;-&quot;;
const NON_METRIC_LOCALES = [&quot;en-us&quot;, &quot;en-lr&quot;, &quot;my&quot;];
const US_PAGE_NAMES = {
  &quot;8.5x11&quot;: &quot;Letter&quot;,
  &quot;8.5x14&quot;: &quot;Legal&quot;
};
const METRIC_PAGE_NAMES = {
  &quot;297x420&quot;: &quot;A3&quot;,
  &quot;210x297&quot;: &quot;A4&quot;
};

function getPageName(size, isPortrait, pageNames) {
  const width = isPortrait ? size.width : size.height;
  const height = isPortrait ? size.height : size.width;
  return pageNames[`${width}x${height}`];
}

class PDFDocumentProperties {
  #fieldData = null;

  constructor({
    dialog,
    fields,
    closeButton
  }, overlayManager, eventBus, l10n, fileNameLookup) {
    this.dialog = dialog;
    this.fields = fields;
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this._fileNameLookup = fileNameLookup;
    this.#reset();
    closeButton.addEventListener(&quot;click&quot;, this.close.bind(this));
    this.overlayManager.register(this.dialog);

    eventBus._on(&quot;pagechanging&quot;, evt =&gt; {
      this._currentPageNumber = evt.pageNumber;
    });

    eventBus._on(&quot;rotationchanging&quot;, evt =&gt; {
      this._pagesRotation = evt.pagesRotation;
    });

    this._isNonMetricLocale = true;
    l10n.getLanguage().then(locale =&gt; {
      this._isNonMetricLocale = NON_METRIC_LOCALES.includes(locale);
    });
  }

  async open() {
    await Promise.all([this.overlayManager.open(this.dialog), this._dataAvailableCapability.promise]);
    const currentPageNumber = this._currentPageNumber;
    const pagesRotation = this._pagesRotation;

    if (this.#fieldData &amp;&amp; currentPageNumber === this.#fieldData._currentPageNumber &amp;&amp; pagesRotation === this.#fieldData._pagesRotation) {
      this.#updateUI();
      return;
    }

    const {
      info,
      contentLength
    } = await this.pdfDocument.getMetadata();
    const [fileName, fileSize, creationDate, modificationDate, pageSize, isLinearized] = await Promise.all([this._fileNameLookup(), this.#parseFileSize(contentLength), this.#parseDate(info.CreationDate), this.#parseDate(info.ModDate), this.pdfDocument.getPage(currentPageNumber).then(pdfPage =&gt; {
      return this.#parsePageSize((0, _ui_utils.getPageSizeInches)(pdfPage), pagesRotation);
    }), this.#parseLinearization(info.IsLinearized)]);
    this.#fieldData = Object.freeze({
      fileName,
      fileSize,
      title: info.Title,
      author: info.Author,
      subject: info.Subject,
      keywords: info.Keywords,
      creationDate,
      modificationDate,
      creator: info.Creator,
      producer: info.Producer,
      version: info.PDFFormatVersion,
      pageCount: this.pdfDocument.numPages,
      pageSize,
      linearized: isLinearized,
      _currentPageNumber: currentPageNumber,
      _pagesRotation: pagesRotation
    });
    this.#updateUI();
    const {
      length
    } = await this.pdfDocument.getDownloadInfo();

    if (contentLength === length) {
      return;
    }

    const data = Object.assign(Object.create(null), this.#fieldData);
    data.fileSize = await this.#parseFileSize(length);
    this.#fieldData = Object.freeze(data);
    this.#updateUI();
  }

  async close() {
    this.overlayManager.close(this.dialog);
  }

  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      this.#reset();
      this.#updateUI(true);
    }

    if (!pdfDocument) {
      return;
    }

    this.pdfDocument = pdfDocument;

    this._dataAvailableCapability.resolve();
  }

  #reset() {
    this.pdfDocument = null;
    this.#fieldData = null;
    this._dataAvailableCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._currentPageNumber = 1;
    this._pagesRotation = 0;
  }

  #updateUI(reset = false) {
    if (reset || !this.#fieldData) {
      for (const id in this.fields) {
        this.fields[id].textContent = DEFAULT_FIELD_CONTENT;
      }

      return;
    }

    if (this.overlayManager.active !== this.dialog) {
      return;
    }

    for (const id in this.fields) {
      const content = this.#fieldData[id];
      this.fields[id].textContent = content || content === 0 ? content : DEFAULT_FIELD_CONTENT;
    }
  }

  async #parseFileSize(fileSize = 0) {
    const kb = fileSize / 1024,
          mb = kb / 1024;

    if (!kb) {
      return undefined;
    }

    return this.l10n.get(`document_properties_${mb &gt;= 1 ? &quot;mb&quot; : &quot;kb&quot;}`, {
      size_mb: mb &gt;= 1 &amp;&amp; (+mb.toPrecision(3)).toLocaleString(),
      size_kb: mb &lt; 1 &amp;&amp; (+kb.toPrecision(3)).toLocaleString(),
      size_b: fileSize.toLocaleString()
    });
  }

  async #parsePageSize(pageSizeInches, pagesRotation) {
    if (!pageSizeInches) {
      return undefined;
    }

    if (pagesRotation % 180 !== 0) {
      pageSizeInches = {
        width: pageSizeInches.height,
        height: pageSizeInches.width
      };
    }

    const isPortrait = (0, _ui_utils.isPortraitOrientation)(pageSizeInches);
    let sizeInches = {
      width: Math.round(pageSizeInches.width * 100) / 100,
      height: Math.round(pageSizeInches.height * 100) / 100
    };
    let sizeMillimeters = {
      width: Math.round(pageSizeInches.width * 25.4 * 10) / 10,
      height: Math.round(pageSizeInches.height * 25.4 * 10) / 10
    };
    let rawName = getPageName(sizeInches, isPortrait, US_PAGE_NAMES) || getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES);

    if (!rawName &amp;&amp; !(Number.isInteger(sizeMillimeters.width) &amp;&amp; Number.isInteger(sizeMillimeters.height))) {
      const exactMillimeters = {
        width: pageSizeInches.width * 25.4,
        height: pageSizeInches.height * 25.4
      };
      const intMillimeters = {
        width: Math.round(sizeMillimeters.width),
        height: Math.round(sizeMillimeters.height)
      };

      if (Math.abs(exactMillimeters.width - intMillimeters.width) &lt; 0.1 &amp;&amp; Math.abs(exactMillimeters.height - intMillimeters.height) &lt; 0.1) {
        rawName = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES);

        if (rawName) {
          sizeInches = {
            width: Math.round(intMillimeters.width / 25.4 * 100) / 100,
            height: Math.round(intMillimeters.height / 25.4 * 100) / 100
          };
          sizeMillimeters = intMillimeters;
        }
      }
    }

    const [{
      width,
      height
    }, unit, name, orientation] = await Promise.all([this._isNonMetricLocale ? sizeInches : sizeMillimeters, this.l10n.get(`document_properties_page_size_unit_${this._isNonMetricLocale ? &quot;inches&quot; : &quot;millimeters&quot;}`), rawName &amp;&amp; this.l10n.get(`document_properties_page_size_name_${rawName.toLowerCase()}`), this.l10n.get(`document_properties_page_size_orientation_${isPortrait ? &quot;portrait&quot; : &quot;landscape&quot;}`)]);
    return this.l10n.get(`document_properties_page_size_dimension_${name ? &quot;name_&quot; : &quot;&quot;}string`, {
      width: width.toLocaleString(),
      height: height.toLocaleString(),
      unit,
      name,
      orientation
    });
  }

  async #parseDate(inputDate) {
    const dateObject = _pdfjsLib.PDFDateString.toDateObject(inputDate);

    if (!dateObject) {
      return undefined;
    }

    return this.l10n.get(&quot;document_properties_date_string&quot;, {
      date: dateObject.toLocaleDateString(),
      time: dateObject.toLocaleTimeString()
    });
  }

  #parseLinearization(isLinearized) {
    return this.l10n.get(`document_properties_linearized_${isLinearized ? &quot;yes&quot; : &quot;no&quot;}`);
  }

}

exports.PDFDocumentProperties = PDFDocumentProperties;

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFFindBar = void 0;

var _pdf_find_controller = __webpack_require__(16);

const MATCHES_COUNT_LIMIT = 1000;

class PDFFindBar {
  constructor(options, eventBus, l10n) {
    this.opened = false;
    this.bar = options.bar;
    this.toggleButton = options.toggleButton;
    this.findField = options.findField;
    this.highlightAll = options.highlightAllCheckbox;
    this.caseSensitive = options.caseSensitiveCheckbox;
    this.matchDiacritics = options.matchDiacriticsCheckbox;
    this.entireWord = options.entireWordCheckbox;
    this.findMsg = options.findMsg;
    this.findResultsCount = options.findResultsCount;
    this.findPreviousButton = options.findPreviousButton;
    this.findNextButton = options.findNextButton;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.toggleButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.toggle();
    });
    this.findField.addEventListener(&quot;input&quot;, () =&gt; {
      this.dispatchEvent(&quot;&quot;);
    });
    this.bar.addEventListener(&quot;keydown&quot;, e =&gt; {
      switch (e.keyCode) {
        case 13:
          if (e.target === this.findField) {
            this.dispatchEvent(&quot;again&quot;, e.shiftKey);
          }

          break;

        case 27:
          this.close();
          break;
      }
    });
    this.findPreviousButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.dispatchEvent(&quot;again&quot;, true);
    });
    this.findNextButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.dispatchEvent(&quot;again&quot;, false);
    });
    this.highlightAll.addEventListener(&quot;click&quot;, () =&gt; {
      this.dispatchEvent(&quot;highlightallchange&quot;);
    });
    this.caseSensitive.addEventListener(&quot;click&quot;, () =&gt; {
      this.dispatchEvent(&quot;casesensitivitychange&quot;);
    });
    this.entireWord.addEventListener(&quot;click&quot;, () =&gt; {
      this.dispatchEvent(&quot;entirewordchange&quot;);
    });
    this.matchDiacritics.addEventListener(&quot;click&quot;, () =&gt; {
      this.dispatchEvent(&quot;diacriticmatchingchange&quot;);
    });

    this.eventBus._on(&quot;resize&quot;, this.#adjustWidth.bind(this));
  }

  reset() {
    this.updateUIState();
  }

  dispatchEvent(type, findPrev = false) {
    this.eventBus.dispatch(&quot;find&quot;, {
      source: this,
      type,
      query: this.findField.value,
      phraseSearch: true,
      caseSensitive: this.caseSensitive.checked,
      entireWord: this.entireWord.checked,
      highlightAll: this.highlightAll.checked,
      findPrevious: findPrev,
      matchDiacritics: this.matchDiacritics.checked
    });
  }

  updateUIState(state, previous, matchesCount) {
    let findMsg = Promise.resolve(&quot;&quot;);
    let status = &quot;&quot;;

    switch (state) {
      case _pdf_find_controller.FindState.FOUND:
        break;

      case _pdf_find_controller.FindState.PENDING:
        status = &quot;pending&quot;;
        break;

      case _pdf_find_controller.FindState.NOT_FOUND:
        findMsg = this.l10n.get(&quot;find_not_found&quot;);
        status = &quot;notFound&quot;;
        break;

      case _pdf_find_controller.FindState.WRAPPED:
        findMsg = this.l10n.get(`find_reached_${previous ? &quot;top&quot; : &quot;bottom&quot;}`);
        break;
    }

    this.findField.setAttribute(&quot;data-status&quot;, status);
    this.findField.setAttribute(&quot;aria-invalid&quot;, state === _pdf_find_controller.FindState.NOT_FOUND);
    findMsg.then(msg =&gt; {
      this.findMsg.textContent = msg;
      this.#adjustWidth();
    });
    this.updateResultsCount(matchesCount);
  }

  updateResultsCount({
    current = 0,
    total = 0
  } = {}) {
    const limit = MATCHES_COUNT_LIMIT;
    let matchCountMsg = Promise.resolve(&quot;&quot;);

    if (total &gt; 0) {
      if (total &gt; limit) {
        let key = &quot;find_match_count_limit&quot;;
        matchCountMsg = this.l10n.get(key, {
          limit
        });
      } else {
        let key = &quot;find_match_count&quot;;
        matchCountMsg = this.l10n.get(key, {
          current,
          total
        });
      }
    }

    matchCountMsg.then(msg =&gt; {
      this.findResultsCount.textContent = msg;
      this.#adjustWidth();
    });
  }

  open() {
    if (!this.opened) {
      this.opened = true;
      this.toggleButton.classList.add(&quot;toggled&quot;);
      this.toggleButton.setAttribute(&quot;aria-expanded&quot;, &quot;true&quot;);
      this.bar.classList.remove(&quot;hidden&quot;);
    }

    this.findField.select();
    this.findField.focus();
    this.#adjustWidth();
  }

  close() {
    if (!this.opened) {
      return;
    }

    this.opened = false;
    this.toggleButton.classList.remove(&quot;toggled&quot;);
    this.toggleButton.setAttribute(&quot;aria-expanded&quot;, &quot;false&quot;);
    this.bar.classList.add(&quot;hidden&quot;);
    this.eventBus.dispatch(&quot;findbarclose&quot;, {
      source: this
    });
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  #adjustWidth() {
    if (!this.opened) {
      return;
    }

    this.bar.classList.remove(&quot;wrapContainers&quot;);
    const findbarHeight = this.bar.clientHeight;
    const inputContainerHeight = this.bar.firstElementChild.clientHeight;

    if (findbarHeight &gt; inputContainerHeight) {
      this.bar.classList.add(&quot;wrapContainers&quot;);
    }
  }

}

exports.PDFFindBar = PDFFindBar;

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFFindController = exports.FindState = void 0;

var _ui_utils = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(5);

var _pdf_find_utils = __webpack_require__(17);

const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
exports.FindState = FindState;
const FIND_TIMEOUT = 250;
const MATCH_SCROLL_OFFSET_TOP = -50;
const MATCH_SCROLL_OFFSET_LEFT = -400;
const CHARACTERS_TO_NORMALIZE = {
  &quot;\u2010&quot;: &quot;-&quot;,
  &quot;\u2018&quot;: &quot;&apos;&quot;,
  &quot;\u2019&quot;: &quot;&apos;&quot;,
  &quot;\u201A&quot;: &quot;&apos;&quot;,
  &quot;\u201B&quot;: &quot;&apos;&quot;,
  &quot;\u201C&quot;: &apos;&quot;&apos;,
  &quot;\u201D&quot;: &apos;&quot;&apos;,
  &quot;\u201E&quot;: &apos;&quot;&apos;,
  &quot;\u201F&quot;: &apos;&quot;&apos;,
  &quot;\u00BC&quot;: &quot;1/4&quot;,
  &quot;\u00BD&quot;: &quot;1/2&quot;,
  &quot;\u00BE&quot;: &quot;3/4&quot;
};
const DIACRITICS_EXCEPTION = new Set([0x3099, 0x309a, 0x094d, 0x09cd, 0x0a4d, 0x0acd, 0x0b4d, 0x0bcd, 0x0c4d, 0x0ccd, 0x0d3b, 0x0d3c, 0x0d4d, 0x0dca, 0x0e3a, 0x0eba, 0x0f84, 0x1039, 0x103a, 0x1714, 0x1734, 0x17d2, 0x1a60, 0x1b44, 0x1baa, 0x1bab, 0x1bf2, 0x1bf3, 0x2d7f, 0xa806, 0xa82c, 0xa8c4, 0xa953, 0xa9c0, 0xaaf6, 0xabed, 0x0c56, 0x0f71, 0x0f72, 0x0f7a, 0x0f7b, 0x0f7c, 0x0f7d, 0x0f80, 0x0f74]);
const DIACRITICS_EXCEPTION_STR = [...DIACRITICS_EXCEPTION.values()].map(x =&gt; String.fromCharCode(x)).join(&quot;&quot;);
const DIACRITICS_REG_EXP = /\p{M}+/gu;
const SPECIAL_CHARS_REG_EXP = /([.*+?^${}()|[\]\\])|(\p{P})|(\s+)|(\p{M})|(\p{L})/gu;
const NOT_DIACRITIC_FROM_END_REG_EXP = /([^\p{M}])\p{M}*$/u;
const NOT_DIACRITIC_FROM_START_REG_EXP = /^\p{M}*([^\p{M}])/u;
const SYLLABLES_REG_EXP = /[\uAC00-\uD7AF\uFA6C\uFACF-\uFAD1\uFAD5-\uFAD7]+/g;
const SYLLABLES_LENGTHS = new Map();
const FIRST_CHAR_SYLLABLES_REG_EXP = &quot;[\\u1100-\\u1112\\ud7a4-\\ud7af\\ud84a\\ud84c\\ud850\\ud854\\ud857\\ud85f]&quot;;
let noSyllablesRegExp = null;
let withSyllablesRegExp = null;

function normalize(text) {
  const syllablePositions = [];
  let m;

  while ((m = SYLLABLES_REG_EXP.exec(text)) !== null) {
    let {
      index
    } = m;

    for (const char of m[0]) {
      let len = SYLLABLES_LENGTHS.get(char);

      if (!len) {
        len = char.normalize(&quot;NFD&quot;).length;
        SYLLABLES_LENGTHS.set(char, len);
      }

      syllablePositions.push([len, index++]);
    }
  }

  let normalizationRegex;

  if (syllablePositions.length === 0 &amp;&amp; noSyllablesRegExp) {
    normalizationRegex = noSyllablesRegExp;
  } else if (syllablePositions.length &gt; 0 &amp;&amp; withSyllablesRegExp) {
    normalizationRegex = withSyllablesRegExp;
  } else {
    const replace = Object.keys(CHARACTERS_TO_NORMALIZE).join(&quot;&quot;);
    const regexp = `([${replace}])|(\\p{M}+(?:-\\n)?)|(\\S-\\n)|(\\p{Ideographic}\\n)|(\\n)`;

    if (syllablePositions.length === 0) {
      normalizationRegex = noSyllablesRegExp = new RegExp(regexp + &quot;|(\\u0000)&quot;, &quot;gum&quot;);
    } else {
      normalizationRegex = withSyllablesRegExp = new RegExp(regexp + `|(${FIRST_CHAR_SYLLABLES_REG_EXP})`, &quot;gum&quot;);
    }
  }

  const rawDiacriticsPositions = [];

  while ((m = DIACRITICS_REG_EXP.exec(text)) !== null) {
    rawDiacriticsPositions.push([m[0].length, m.index]);
  }

  let normalized = text.normalize(&quot;NFD&quot;);
  const positions = [[0, 0]];
  let rawDiacriticsIndex = 0;
  let syllableIndex = 0;
  let shift = 0;
  let shiftOrigin = 0;
  let eol = 0;
  let hasDiacritics = false;
  normalized = normalized.replace(normalizationRegex, (match, p1, p2, p3, p4, p5, p6, i) =&gt; {
    i -= shiftOrigin;

    if (p1) {
      const replacement = CHARACTERS_TO_NORMALIZE[match];
      const jj = replacement.length;

      for (let j = 1; j &lt; jj; j++) {
        positions.push([i - shift + j, shift - j]);
      }

      shift -= jj - 1;
      return replacement;
    }

    if (p2) {
      const hasTrailingDashEOL = p2.endsWith(&quot;\n&quot;);
      const len = hasTrailingDashEOL ? p2.length - 2 : p2.length;
      hasDiacritics = true;
      let jj = len;

      if (i + eol === rawDiacriticsPositions[rawDiacriticsIndex]?.[1]) {
        jj -= rawDiacriticsPositions[rawDiacriticsIndex][0];
        ++rawDiacriticsIndex;
      }

      for (let j = 1; j &lt;= jj; j++) {
        positions.push([i - 1 - shift + j, shift - j]);
      }

      shift -= jj;
      shiftOrigin += jj;

      if (hasTrailingDashEOL) {
        i += len - 1;
        positions.push([i - shift + 1, 1 + shift]);
        shift += 1;
        shiftOrigin += 1;
        eol += 1;
        return p2.slice(0, len);
      }

      return p2;
    }

    if (p3) {
      positions.push([i - shift + 1, 1 + shift]);
      shift += 1;
      shiftOrigin += 1;
      eol += 1;
      return p3.charAt(0);
    }

    if (p4) {
      positions.push([i - shift + 1, shift]);
      shiftOrigin += 1;
      eol += 1;
      return p4.charAt(0);
    }

    if (p5) {
      positions.push([i - shift + 1, shift - 1]);
      shift -= 1;
      shiftOrigin += 1;
      eol += 1;
      return &quot; &quot;;
    }

    if (i + eol === syllablePositions[syllableIndex]?.[1]) {
      const newCharLen = syllablePositions[syllableIndex][0] - 1;
      ++syllableIndex;

      for (let j = 1; j &lt;= newCharLen; j++) {
        positions.push([i - (shift - j), shift - j]);
      }

      shift -= newCharLen;
      shiftOrigin += newCharLen;
    }

    return p6;
  });
  positions.push([normalized.length, shift]);
  return [normalized, positions, hasDiacritics];
}

function getOriginalIndex(diffs, pos, len) {
  if (!diffs) {
    return [pos, len];
  }

  const start = pos;
  const end = pos + len;
  let i = (0, _ui_utils.binarySearchFirstItem)(diffs, x =&gt; x[0] &gt;= start);

  if (diffs[i][0] &gt; start) {
    --i;
  }

  let j = (0, _ui_utils.binarySearchFirstItem)(diffs, x =&gt; x[0] &gt;= end, i);

  if (diffs[j][0] &gt; end) {
    --j;
  }

  return [start + diffs[i][1], len + diffs[j][1] - diffs[i][1]];
}

class PDFFindController {
  constructor({
    linkService,
    eventBus
  }) {
    this._linkService = linkService;
    this._eventBus = eventBus;
    this.#reset();

    eventBus._on(&quot;find&quot;, this.#onFind.bind(this));

    eventBus._on(&quot;findbarclose&quot;, this.#onFindBarClose.bind(this));
  }

  get highlightMatches() {
    return this._highlightMatches;
  }

  get pageMatches() {
    return this._pageMatches;
  }

  get pageMatchesLength() {
    return this._pageMatchesLength;
  }

  get selected() {
    return this._selected;
  }

  get state() {
    return this._state;
  }

  setDocument(pdfDocument) {
    if (this._pdfDocument) {
      this.#reset();
    }

    if (!pdfDocument) {
      return;
    }

    this._pdfDocument = pdfDocument;

    this._firstPageCapability.resolve();
  }

  #onFind(state) {
    if (!state) {
      return;
    }

    const pdfDocument = this._pdfDocument;
    const {
      type
    } = state;

    if (this._state === null || this.#shouldDirtyMatch(state)) {
      this._dirtyMatch = true;
    }

    this._state = state;

    if (type !== &quot;highlightallchange&quot;) {
      this.#updateUIState(FindState.PENDING);
    }

    this._firstPageCapability.promise.then(() =&gt; {
      if (!this._pdfDocument || pdfDocument &amp;&amp; this._pdfDocument !== pdfDocument) {
        return;
      }

      this.#extractText();
      const findbarClosed = !this._highlightMatches;
      const pendingTimeout = !!this._findTimeout;

      if (this._findTimeout) {
        clearTimeout(this._findTimeout);
        this._findTimeout = null;
      }

      if (!type) {
        this._findTimeout = setTimeout(() =&gt; {
          this.#nextMatch();
          this._findTimeout = null;
        }, FIND_TIMEOUT);
      } else if (this._dirtyMatch) {
        this.#nextMatch();
      } else if (type === &quot;again&quot;) {
        this.#nextMatch();

        if (findbarClosed &amp;&amp; this._state.highlightAll) {
          this.#updateAllPages();
        }
      } else if (type === &quot;highlightallchange&quot;) {
        if (pendingTimeout) {
          this.#nextMatch();
        } else {
          this._highlightMatches = true;
        }

        this.#updateAllPages();
      } else {
        this.#nextMatch();
      }
    });
  }

  scrollMatchIntoView({
    element = null,
    selectedLeft = 0,
    pageIndex = -1,
    matchIndex = -1
  }) {
    if (!this._scrollMatches || !element) {
      return;
    } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
      return;
    } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
      return;
    }

    this._scrollMatches = false;
    const spot = {
      top: MATCH_SCROLL_OFFSET_TOP,
      left: selectedLeft + MATCH_SCROLL_OFFSET_LEFT
    };
    (0, _ui_utils.scrollIntoView)(element, spot, true);
  }

  #reset() {
    this._highlightMatches = false;
    this._scrollMatches = false;
    this._pdfDocument = null;
    this._pageMatches = [];
    this._pageMatchesLength = [];
    this._state = null;
    this._selected = {
      pageIdx: -1,
      matchIdx: -1
    };
    this._offset = {
      pageIdx: null,
      matchIdx: null,
      wrapped: false
    };
    this._extractTextPromises = [];
    this._pageContents = [];
    this._pageDiffs = [];
    this._hasDiacritics = [];
    this._matchesCountTotal = 0;
    this._pagesToSearch = null;
    this._pendingFindMatches = new Set();
    this._resumePageIdx = null;
    this._dirtyMatch = false;
    clearTimeout(this._findTimeout);
    this._findTimeout = null;
    this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
  }

  get #query() {
    if (this._state.query !== this._rawQuery) {
      this._rawQuery = this._state.query;
      [this._normalizedQuery] = normalize(this._state.query);
    }

    return this._normalizedQuery;
  }

  #shouldDirtyMatch(state) {
    if (state.query !== this._state.query) {
      return true;
    }

    switch (state.type) {
      case &quot;again&quot;:
        const pageNumber = this._selected.pageIdx + 1;
        const linkService = this._linkService;

        if (pageNumber &gt;= 1 &amp;&amp; pageNumber &lt;= linkService.pagesCount &amp;&amp; pageNumber !== linkService.page &amp;&amp; !linkService.isPageVisible(pageNumber)) {
          return true;
        }

        return false;

      case &quot;highlightallchange&quot;:
        return false;
    }

    return true;
  }

  #isEntireWord(content, startIdx, length) {
    let match = content.slice(0, startIdx).match(NOT_DIACRITIC_FROM_END_REG_EXP);

    if (match) {
      const first = content.charCodeAt(startIdx);
      const limit = match[1].charCodeAt(0);

      if ((0, _pdf_find_utils.getCharacterType)(first) === (0, _pdf_find_utils.getCharacterType)(limit)) {
        return false;
      }
    }

    match = content.slice(startIdx + length).match(NOT_DIACRITIC_FROM_START_REG_EXP);

    if (match) {
      const last = content.charCodeAt(startIdx + length - 1);
      const limit = match[1].charCodeAt(0);

      if ((0, _pdf_find_utils.getCharacterType)(last) === (0, _pdf_find_utils.getCharacterType)(limit)) {
        return false;
      }
    }

    return true;
  }

  #calculateRegExpMatch(query, entireWord, pageIndex, pageContent) {
    const matches = [],
          matchesLength = [];
    const diffs = this._pageDiffs[pageIndex];
    let match;

    while ((match = query.exec(pageContent)) !== null) {
      if (entireWord &amp;&amp; !this.#isEntireWord(pageContent, match.index, match[0].length)) {
        continue;
      }

      const [matchPos, matchLen] = getOriginalIndex(diffs, match.index, match[0].length);

      if (matchLen) {
        matches.push(matchPos);
        matchesLength.push(matchLen);
      }
    }

    this._pageMatches[pageIndex] = matches;
    this._pageMatchesLength[pageIndex] = matchesLength;
  }

  #convertToRegExpString(query, hasDiacritics) {
    const {
      matchDiacritics
    } = this._state;
    let isUnicode = false;
    query = query.replace(SPECIAL_CHARS_REG_EXP, (match, p1, p2, p3, p4, p5) =&gt; {
      if (p1) {
        return `[ ]*\\${p1}[ ]*`;
      }

      if (p2) {
        return `[ ]*${p2}[ ]*`;
      }

      if (p3) {
        return &quot;[ ]+&quot;;
      }

      if (matchDiacritics) {
        return p4 || p5;
      }

      if (p4) {
        return DIACRITICS_EXCEPTION.has(p4.charCodeAt(0)) ? p4 : &quot;&quot;;
      }

      if (hasDiacritics) {
        isUnicode = true;
        return `${p5}\\p{M}*`;
      }

      return p5;
    });
    const trailingSpaces = &quot;[ ]*&quot;;

    if (query.endsWith(trailingSpaces)) {
      query = query.slice(0, query.length - trailingSpaces.length);
    }

    if (matchDiacritics) {
      if (hasDiacritics) {
        isUnicode = true;
        query = `${query}(?=[${DIACRITICS_EXCEPTION_STR}]|[^\\p{M}]|$)`;
      }
    }

    return [isUnicode, query];
  }

  #calculateMatch(pageIndex) {
    let query = this.#query;

    if (query.length === 0) {
      return;
    }

    const {
      caseSensitive,
      entireWord,
      phraseSearch
    } = this._state;
    const pageContent = this._pageContents[pageIndex];
    const hasDiacritics = this._hasDiacritics[pageIndex];
    let isUnicode = false;

    if (phraseSearch) {
      [isUnicode, query] = this.#convertToRegExpString(query, hasDiacritics);
    } else {
      const match = query.match(/\S+/g);

      if (match) {
        query = match.sort().reverse().map(q =&gt; {
          const [isUnicodePart, queryPart] = this.#convertToRegExpString(q, hasDiacritics);
          isUnicode ||= isUnicodePart;
          return `(${queryPart})`;
        }).join(&quot;|&quot;);
      }
    }

    const flags = `g${isUnicode ? &quot;u&quot; : &quot;&quot;}${caseSensitive ? &quot;&quot; : &quot;i&quot;}`;
    query = new RegExp(query, flags);
    this.#calculateRegExpMatch(query, entireWord, pageIndex, pageContent);

    if (this._state.highlightAll) {
      this.#updatePage(pageIndex);
    }

    if (this._resumePageIdx === pageIndex) {
      this._resumePageIdx = null;
      this.#nextPageMatch();
    }

    const pageMatchesCount = this._pageMatches[pageIndex].length;

    if (pageMatchesCount &gt; 0) {
      this._matchesCountTotal += pageMatchesCount;
      this.#updateUIResultsCount();
    }
  }

  #extractText() {
    if (this._extractTextPromises.length &gt; 0) {
      return;
    }

    let promise = Promise.resolve();

    for (let i = 0, ii = this._linkService.pagesCount; i &lt; ii; i++) {
      const extractTextCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._extractTextPromises[i] = extractTextCapability.promise;
      promise = promise.then(() =&gt; {
        return this._pdfDocument.getPage(i + 1).then(pdfPage =&gt; {
          return pdfPage.getTextContent();
        }).then(textContent =&gt; {
          const strBuf = [];

          for (const textItem of textContent.items) {
            strBuf.push(textItem.str);

            if (textItem.hasEOL) {
              strBuf.push(&quot;\n&quot;);
            }
          }

          [this._pageContents[i], this._pageDiffs[i], this._hasDiacritics[i]] = normalize(strBuf.join(&quot;&quot;));
          extractTextCapability.resolve();
        }, reason =&gt; {
          console.error(`Unable to get text content for page ${i + 1}`, reason);
          this._pageContents[i] = &quot;&quot;;
          this._pageDiffs[i] = null;
          this._hasDiacritics[i] = false;
          extractTextCapability.resolve();
        });
      });
    }
  }

  #updatePage(index) {
    if (this._scrollMatches &amp;&amp; this._selected.pageIdx === index) {
      this._linkService.page = index + 1;
    }

    this._eventBus.dispatch(&quot;updatetextlayermatches&quot;, {
      source: this,
      pageIndex: index
    });
  }

  #updateAllPages() {
    this._eventBus.dispatch(&quot;updatetextlayermatches&quot;, {
      source: this,
      pageIndex: -1
    });
  }

  #nextMatch() {
    const previous = this._state.findPrevious;
    const currentPageIndex = this._linkService.page - 1;
    const numPages = this._linkService.pagesCount;
    this._highlightMatches = true;

    if (this._dirtyMatch) {
      this._dirtyMatch = false;
      this._selected.pageIdx = this._selected.matchIdx = -1;
      this._offset.pageIdx = currentPageIndex;
      this._offset.matchIdx = null;
      this._offset.wrapped = false;
      this._resumePageIdx = null;
      this._pageMatches.length = 0;
      this._pageMatchesLength.length = 0;
      this._matchesCountTotal = 0;
      this.#updateAllPages();

      for (let i = 0; i &lt; numPages; i++) {
        if (this._pendingFindMatches.has(i)) {
          continue;
        }

        this._pendingFindMatches.add(i);

        this._extractTextPromises[i].then(() =&gt; {
          this._pendingFindMatches.delete(i);

          this.#calculateMatch(i);
        });
      }
    }

    if (this.#query === &quot;&quot;) {
      this.#updateUIState(FindState.FOUND);
      return;
    }

    if (this._resumePageIdx) {
      return;
    }

    const offset = this._offset;
    this._pagesToSearch = numPages;

    if (offset.matchIdx !== null) {
      const numPageMatches = this._pageMatches[offset.pageIdx].length;

      if (!previous &amp;&amp; offset.matchIdx + 1 &lt; numPageMatches || previous &amp;&amp; offset.matchIdx &gt; 0) {
        offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
        this.#updateMatch(true);
        return;
      }

      this.#advanceOffsetPage(previous);
    }

    this.#nextPageMatch();
  }

  #matchesReady(matches) {
    const offset = this._offset;
    const numMatches = matches.length;
    const previous = this._state.findPrevious;

    if (numMatches) {
      offset.matchIdx = previous ? numMatches - 1 : 0;
      this.#updateMatch(true);
      return true;
    }

    this.#advanceOffsetPage(previous);

    if (offset.wrapped) {
      offset.matchIdx = null;

      if (this._pagesToSearch &lt; 0) {
        this.#updateMatch(false);
        return true;
      }
    }

    return false;
  }

  #nextPageMatch() {
    if (this._resumePageIdx !== null) {
      console.error(&quot;There can only be one pending page.&quot;);
    }

    let matches = null;

    do {
      const pageIdx = this._offset.pageIdx;
      matches = this._pageMatches[pageIdx];

      if (!matches) {
        this._resumePageIdx = pageIdx;
        break;
      }
    } while (!this.#matchesReady(matches));
  }

  #advanceOffsetPage(previous) {
    const offset = this._offset;
    const numPages = this._linkService.pagesCount;
    offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
    offset.matchIdx = null;
    this._pagesToSearch--;

    if (offset.pageIdx &gt;= numPages || offset.pageIdx &lt; 0) {
      offset.pageIdx = previous ? numPages - 1 : 0;
      offset.wrapped = true;
    }
  }

  #updateMatch(found = false) {
    let state = FindState.NOT_FOUND;
    const wrapped = this._offset.wrapped;
    this._offset.wrapped = false;

    if (found) {
      const previousPage = this._selected.pageIdx;
      this._selected.pageIdx = this._offset.pageIdx;
      this._selected.matchIdx = this._offset.matchIdx;
      state = wrapped ? FindState.WRAPPED : FindState.FOUND;

      if (previousPage !== -1 &amp;&amp; previousPage !== this._selected.pageIdx) {
        this.#updatePage(previousPage);
      }
    }

    this.#updateUIState(state, this._state.findPrevious);

    if (this._selected.pageIdx !== -1) {
      this._scrollMatches = true;
      this.#updatePage(this._selected.pageIdx);
    }
  }

  #onFindBarClose(evt) {
    const pdfDocument = this._pdfDocument;

    this._firstPageCapability.promise.then(() =&gt; {
      if (!this._pdfDocument || pdfDocument &amp;&amp; this._pdfDocument !== pdfDocument) {
        return;
      }

      if (this._findTimeout) {
        clearTimeout(this._findTimeout);
        this._findTimeout = null;
      }

      if (this._resumePageIdx) {
        this._resumePageIdx = null;
        this._dirtyMatch = true;
      }

      this.#updateUIState(FindState.FOUND);
      this._highlightMatches = false;
      this.#updateAllPages();
    });
  }

  #requestMatchesCount() {
    const {
      pageIdx,
      matchIdx
    } = this._selected;
    let current = 0,
        total = this._matchesCountTotal;

    if (matchIdx !== -1) {
      for (let i = 0; i &lt; pageIdx; i++) {
        current += this._pageMatches[i]?.length || 0;
      }

      current += matchIdx + 1;
    }

    if (current &lt; 1 || current &gt; total) {
      current = total = 0;
    }

    return {
      current,
      total
    };
  }

  #updateUIResultsCount() {
    this._eventBus.dispatch(&quot;updatefindmatchescount&quot;, {
      source: this,
      matchesCount: this.#requestMatchesCount()
    });
  }

  #updateUIState(state, previous = false) {
    this._eventBus.dispatch(&quot;updatefindcontrolstate&quot;, {
      source: this,
      state,
      previous,
      matchesCount: this.#requestMatchesCount(),
      rawQuery: this._state?.query ?? null
    });
  }

}

exports.PDFFindController = PDFFindController;

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.CharacterType = void 0;
exports.getCharacterType = getCharacterType;
const CharacterType = {
  SPACE: 0,
  ALPHA_LETTER: 1,
  PUNCT: 2,
  HAN_LETTER: 3,
  KATAKANA_LETTER: 4,
  HIRAGANA_LETTER: 5,
  HALFWIDTH_KATAKANA_LETTER: 6,
  THAI_LETTER: 7
};
exports.CharacterType = CharacterType;

function isAlphabeticalScript(charCode) {
  return charCode &lt; 0x2e80;
}

function isAscii(charCode) {
  return (charCode &amp; 0xff80) === 0;
}

function isAsciiAlpha(charCode) {
  return charCode &gt;= 0x61 &amp;&amp; charCode &lt;= 0x7a || charCode &gt;= 0x41 &amp;&amp; charCode &lt;= 0x5a;
}

function isAsciiDigit(charCode) {
  return charCode &gt;= 0x30 &amp;&amp; charCode &lt;= 0x39;
}

function isAsciiSpace(charCode) {
  return charCode === 0x20 || charCode === 0x09 || charCode === 0x0d || charCode === 0x0a;
}

function isHan(charCode) {
  return charCode &gt;= 0x3400 &amp;&amp; charCode &lt;= 0x9fff || charCode &gt;= 0xf900 &amp;&amp; charCode &lt;= 0xfaff;
}

function isKatakana(charCode) {
  return charCode &gt;= 0x30a0 &amp;&amp; charCode &lt;= 0x30ff;
}

function isHiragana(charCode) {
  return charCode &gt;= 0x3040 &amp;&amp; charCode &lt;= 0x309f;
}

function isHalfwidthKatakana(charCode) {
  return charCode &gt;= 0xff60 &amp;&amp; charCode &lt;= 0xff9f;
}

function isThai(charCode) {
  return (charCode &amp; 0xff80) === 0x0e00;
}

function getCharacterType(charCode) {
  if (isAlphabeticalScript(charCode)) {
    if (isAscii(charCode)) {
      if (isAsciiSpace(charCode)) {
        return CharacterType.SPACE;
      } else if (isAsciiAlpha(charCode) || isAsciiDigit(charCode) || charCode === 0x5f) {
        return CharacterType.ALPHA_LETTER;
      }

      return CharacterType.PUNCT;
    } else if (isThai(charCode)) {
      return CharacterType.THAI_LETTER;
    } else if (charCode === 0xa0) {
      return CharacterType.SPACE;
    }

    return CharacterType.ALPHA_LETTER;
  }

  if (isHan(charCode)) {
    return CharacterType.HAN_LETTER;
  } else if (isKatakana(charCode)) {
    return CharacterType.KATAKANA_LETTER;
  } else if (isHiragana(charCode)) {
    return CharacterType.HIRAGANA_LETTER;
  } else if (isHalfwidthKatakana(charCode)) {
    return CharacterType.HALFWIDTH_KATAKANA_LETTER;
  }

  return CharacterType.ALPHA_LETTER;
}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFHistory = void 0;
exports.isDestArraysEqual = isDestArraysEqual;
exports.isDestHashesEqual = isDestHashesEqual;

var _ui_utils = __webpack_require__(1);

var _event_utils = __webpack_require__(6);

const HASH_CHANGE_TIMEOUT = 1000;
const POSITION_UPDATED_THRESHOLD = 50;
const UPDATE_VIEWAREA_TIMEOUT = 1000;

function getCurrentHash() {
  return document.location.hash;
}

class PDFHistory {
  constructor({
    linkService,
    eventBus
  }) {
    this.linkService = linkService;
    this.eventBus = eventBus;
    this._initialized = false;
    this._fingerprint = &quot;&quot;;
    this.reset();
    this._boundEvents = null;

    this.eventBus._on(&quot;pagesinit&quot;, () =&gt; {
      this._isPagesLoaded = false;

      this.eventBus._on(&quot;pagesloaded&quot;, evt =&gt; {
        this._isPagesLoaded = !!evt.pagesCount;
      }, {
        once: true
      });
    });
  }

  initialize({
    fingerprint,
    resetHistory = false,
    updateUrl = false
  }) {
    if (!fingerprint || typeof fingerprint !== &quot;string&quot;) {
      console.error(&apos;PDFHistory.initialize: The &quot;fingerprint&quot; must be a non-empty string.&apos;);
      return;
    }

    if (this._initialized) {
      this.reset();
    }

    const reInitialized = this._fingerprint !== &quot;&quot; &amp;&amp; this._fingerprint !== fingerprint;
    this._fingerprint = fingerprint;
    this._updateUrl = updateUrl === true;
    this._initialized = true;

    this._bindEvents();

    const state = window.history.state;
    this._popStateInProgress = false;
    this._blockHashChange = 0;
    this._currentHash = getCurrentHash();
    this._numPositionUpdates = 0;
    this._uid = this._maxUid = 0;
    this._destination = null;
    this._position = null;

    if (!this._isValidState(state, true) || resetHistory) {
      const {
        hash,
        page,
        rotation
      } = this._parseCurrentHash(true);

      if (!hash || reInitialized || resetHistory) {
        this._pushOrReplaceState(null, true);

        return;
      }

      this._pushOrReplaceState({
        hash,
        page,
        rotation
      }, true);

      return;
    }

    const destination = state.destination;

    this._updateInternalState(destination, state.uid, true);

    if (destination.rotation !== undefined) {
      this._initialRotation = destination.rotation;
    }

    if (destination.dest) {
      this._initialBookmark = JSON.stringify(destination.dest);
      this._destination.page = null;
    } else if (destination.hash) {
      this._initialBookmark = destination.hash;
    } else if (destination.page) {
      this._initialBookmark = `page=${destination.page}`;
    }
  }

  reset() {
    if (this._initialized) {
      this._pageHide();

      this._initialized = false;

      this._unbindEvents();
    }

    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }

    this._initialBookmark = null;
    this._initialRotation = null;
  }

  push({
    namedDest = null,
    explicitDest,
    pageNumber
  }) {
    if (!this._initialized) {
      return;
    }

    if (namedDest &amp;&amp; typeof namedDest !== &quot;string&quot;) {
      console.error(&quot;PDFHistory.push: &quot; + `&quot;${namedDest}&quot; is not a valid namedDest parameter.`);
      return;
    } else if (!Array.isArray(explicitDest)) {
      console.error(&quot;PDFHistory.push: &quot; + `&quot;${explicitDest}&quot; is not a valid explicitDest parameter.`);
      return;
    } else if (!this._isValidPage(pageNumber)) {
      if (pageNumber !== null || this._destination) {
        console.error(&quot;PDFHistory.push: &quot; + `&quot;${pageNumber}&quot; is not a valid pageNumber parameter.`);
        return;
      }
    }

    const hash = namedDest || JSON.stringify(explicitDest);

    if (!hash) {
      return;
    }

    let forceReplace = false;

    if (this._destination &amp;&amp; (isDestHashesEqual(this._destination.hash, hash) || isDestArraysEqual(this._destination.dest, explicitDest))) {
      if (this._destination.page) {
        return;
      }

      forceReplace = true;
    }

    if (this._popStateInProgress &amp;&amp; !forceReplace) {
      return;
    }

    this._pushOrReplaceState({
      dest: explicitDest,
      hash,
      page: pageNumber,
      rotation: this.linkService.rotation
    }, forceReplace);

    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() =&gt; {
        this._popStateInProgress = false;
      });
    }
  }

  pushPage(pageNumber) {
    if (!this._initialized) {
      return;
    }

    if (!this._isValidPage(pageNumber)) {
      console.error(`PDFHistory.pushPage: &quot;${pageNumber}&quot; is not a valid page number.`);
      return;
    }

    if (this._destination?.page === pageNumber) {
      return;
    }

    if (this._popStateInProgress) {
      return;
    }

    this._pushOrReplaceState({
      dest: null,
      hash: `page=${pageNumber}`,
      page: pageNumber,
      rotation: this.linkService.rotation
    });

    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() =&gt; {
        this._popStateInProgress = false;
      });
    }
  }

  pushCurrentPosition() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }

    this._tryPushCurrentPosition();
  }

  back() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }

    const state = window.history.state;

    if (this._isValidState(state) &amp;&amp; state.uid &gt; 0) {
      window.history.back();
    }
  }

  forward() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }

    const state = window.history.state;

    if (this._isValidState(state) &amp;&amp; state.uid &lt; this._maxUid) {
      window.history.forward();
    }
  }

  get popStateInProgress() {
    return this._initialized &amp;&amp; (this._popStateInProgress || this._blockHashChange &gt; 0);
  }

  get initialBookmark() {
    return this._initialized ? this._initialBookmark : null;
  }

  get initialRotation() {
    return this._initialized ? this._initialRotation : null;
  }

  _pushOrReplaceState(destination, forceReplace = false) {
    const shouldReplace = forceReplace || !this._destination;
    const newState = {
      fingerprint: this._fingerprint,
      uid: shouldReplace ? this._uid : this._uid + 1,
      destination
    };

    this._updateInternalState(destination, newState.uid);

    let newUrl;

    if (this._updateUrl &amp;&amp; destination?.hash) {
      const baseUrl = document.location.href.split(&quot;#&quot;)[0];

      if (!baseUrl.startsWith(&quot;file://&quot;)) {
        newUrl = `${baseUrl}#${destination.hash}`;
      }
    }

    if (shouldReplace) {
      window.history.replaceState(newState, &quot;&quot;, newUrl);
    } else {
      window.history.pushState(newState, &quot;&quot;, newUrl);
    }
  }

  _tryPushCurrentPosition(temporary = false) {
    if (!this._position) {
      return;
    }

    let position = this._position;

    if (temporary) {
      position = Object.assign(Object.create(null), this._position);
      position.temporary = true;
    }

    if (!this._destination) {
      this._pushOrReplaceState(position);

      return;
    }

    if (this._destination.temporary) {
      this._pushOrReplaceState(position, true);

      return;
    }

    if (this._destination.hash === position.hash) {
      return;
    }

    if (!this._destination.page &amp;&amp; (POSITION_UPDATED_THRESHOLD &lt;= 0 || this._numPositionUpdates &lt;= POSITION_UPDATED_THRESHOLD)) {
      return;
    }

    let forceReplace = false;

    if (this._destination.page &gt;= position.first &amp;&amp; this._destination.page &lt;= position.page) {
      if (this._destination.dest !== undefined || !this._destination.first) {
        return;
      }

      forceReplace = true;
    }

    this._pushOrReplaceState(position, forceReplace);
  }

  _isValidPage(val) {
    return Number.isInteger(val) &amp;&amp; val &gt; 0 &amp;&amp; val &lt;= this.linkService.pagesCount;
  }

  _isValidState(state, checkReload = false) {
    if (!state) {
      return false;
    }

    if (state.fingerprint !== this._fingerprint) {
      if (checkReload) {
        if (typeof state.fingerprint !== &quot;string&quot; || state.fingerprint.length !== this._fingerprint.length) {
          return false;
        }

        const [perfEntry] = performance.getEntriesByType(&quot;navigation&quot;);

        if (perfEntry?.type !== &quot;reload&quot;) {
          return false;
        }
      } else {
        return false;
      }
    }

    if (!Number.isInteger(state.uid) || state.uid &lt; 0) {
      return false;
    }

    if (state.destination === null || typeof state.destination !== &quot;object&quot;) {
      return false;
    }

    return true;
  }

  _updateInternalState(destination, uid, removeTemporary = false) {
    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }

    if (removeTemporary &amp;&amp; destination?.temporary) {
      delete destination.temporary;
    }

    this._destination = destination;
    this._uid = uid;
    this._maxUid = Math.max(this._maxUid, uid);
    this._numPositionUpdates = 0;
  }

  _parseCurrentHash(checkNameddest = false) {
    const hash = unescape(getCurrentHash()).substring(1);
    const params = (0, _ui_utils.parseQueryString)(hash);
    const nameddest = params.get(&quot;nameddest&quot;) || &quot;&quot;;
    let page = params.get(&quot;page&quot;) | 0;

    if (!this._isValidPage(page) || checkNameddest &amp;&amp; nameddest.length &gt; 0) {
      page = null;
    }

    return {
      hash,
      page,
      rotation: this.linkService.rotation
    };
  }

  _updateViewarea({
    location
  }) {
    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }

    this._position = {
      hash: location.pdfOpenParams.substring(1),
      page: this.linkService.page,
      first: location.pageNumber,
      rotation: location.rotation
    };

    if (this._popStateInProgress) {
      return;
    }

    if (POSITION_UPDATED_THRESHOLD &gt; 0 &amp;&amp; this._isPagesLoaded &amp;&amp; this._destination &amp;&amp; !this._destination.page) {
      this._numPositionUpdates++;
    }

    if (UPDATE_VIEWAREA_TIMEOUT &gt; 0) {
      this._updateViewareaTimeout = setTimeout(() =&gt; {
        if (!this._popStateInProgress) {
          this._tryPushCurrentPosition(true);
        }

        this._updateViewareaTimeout = null;
      }, UPDATE_VIEWAREA_TIMEOUT);
    }
  }

  _popState({
    state
  }) {
    const newHash = getCurrentHash(),
          hashChanged = this._currentHash !== newHash;
    this._currentHash = newHash;

    if (!state) {
      this._uid++;

      const {
        hash,
        page,
        rotation
      } = this._parseCurrentHash();

      this._pushOrReplaceState({
        hash,
        page,
        rotation
      }, true);

      return;
    }

    if (!this._isValidState(state)) {
      return;
    }

    this._popStateInProgress = true;

    if (hashChanged) {
      this._blockHashChange++;
      (0, _event_utils.waitOnEventOrTimeout)({
        target: window,
        name: &quot;hashchange&quot;,
        delay: HASH_CHANGE_TIMEOUT
      }).then(() =&gt; {
        this._blockHashChange--;
      });
    }

    const destination = state.destination;

    this._updateInternalState(destination, state.uid, true);

    if ((0, _ui_utils.isValidRotation)(destination.rotation)) {
      this.linkService.rotation = destination.rotation;
    }

    if (destination.dest) {
      this.linkService.goToDestination(destination.dest);
    } else if (destination.hash) {
      this.linkService.setHash(destination.hash);
    } else if (destination.page) {
      this.linkService.page = destination.page;
    }

    Promise.resolve().then(() =&gt; {
      this._popStateInProgress = false;
    });
  }

  _pageHide() {
    if (!this._destination || this._destination.temporary) {
      this._tryPushCurrentPosition();
    }
  }

  _bindEvents() {
    if (this._boundEvents) {
      return;
    }

    this._boundEvents = {
      updateViewarea: this._updateViewarea.bind(this),
      popState: this._popState.bind(this),
      pageHide: this._pageHide.bind(this)
    };

    this.eventBus._on(&quot;updateviewarea&quot;, this._boundEvents.updateViewarea);

    window.addEventListener(&quot;popstate&quot;, this._boundEvents.popState);
    window.addEventListener(&quot;pagehide&quot;, this._boundEvents.pageHide);
  }

  _unbindEvents() {
    if (!this._boundEvents) {
      return;
    }

    this.eventBus._off(&quot;updateviewarea&quot;, this._boundEvents.updateViewarea);

    window.removeEventListener(&quot;popstate&quot;, this._boundEvents.popState);
    window.removeEventListener(&quot;pagehide&quot;, this._boundEvents.pageHide);
    this._boundEvents = null;
  }

}

exports.PDFHistory = PDFHistory;

function isDestHashesEqual(destHash, pushHash) {
  if (typeof destHash !== &quot;string&quot; || typeof pushHash !== &quot;string&quot;) {
    return false;
  }

  if (destHash === pushHash) {
    return true;
  }

  const nameddest = (0, _ui_utils.parseQueryString)(destHash).get(&quot;nameddest&quot;);

  if (nameddest === pushHash) {
    return true;
  }

  return false;
}

function isDestArraysEqual(firstDest, secondDest) {
  function isEntryEqual(first, second) {
    if (typeof first !== typeof second) {
      return false;
    }

    if (Array.isArray(first) || Array.isArray(second)) {
      return false;
    }

    if (first !== null &amp;&amp; typeof first === &quot;object&quot; &amp;&amp; second !== null) {
      if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
      }

      for (const key in first) {
        if (!isEntryEqual(first[key], second[key])) {
          return false;
        }
      }

      return true;
    }

    return first === second || Number.isNaN(first) &amp;&amp; Number.isNaN(second);
  }

  if (!(Array.isArray(firstDest) &amp;&amp; Array.isArray(secondDest))) {
    return false;
  }

  if (firstDest.length !== secondDest.length) {
    return false;
  }

  for (let i = 0, ii = firstDest.length; i &lt; ii; i++) {
    if (!isEntryEqual(firstDest[i], secondDest[i])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFLayerViewer = void 0;

var _base_tree_viewer = __webpack_require__(13);

class PDFLayerViewer extends _base_tree_viewer.BaseTreeViewer {
  constructor(options) {
    super(options);
    this.l10n = options.l10n;

    this.eventBus._on(&quot;optionalcontentconfigchanged&quot;, evt =&gt; {
      this.#updateLayers(evt.promise);
    });

    this.eventBus._on(&quot;resetlayers&quot;, () =&gt; {
      this.#updateLayers();
    });

    this.eventBus._on(&quot;togglelayerstree&quot;, this._toggleAllTreeItems.bind(this));
  }

  reset() {
    super.reset();
    this._optionalContentConfig = null;
    this._optionalContentHash = null;
  }

  _dispatchEvent(layersCount) {
    this.eventBus.dispatch(&quot;layersloaded&quot;, {
      source: this,
      layersCount
    });
  }

  _bindLink(element, {
    groupId,
    input
  }) {
    const setVisibility = () =&gt; {
      this._optionalContentConfig.setVisibility(groupId, input.checked);

      this._optionalContentHash = this._optionalContentConfig.getHash();
      this.eventBus.dispatch(&quot;optionalcontentconfig&quot;, {
        source: this,
        promise: Promise.resolve(this._optionalContentConfig)
      });
    };

    element.onclick = evt =&gt; {
      if (evt.target === input) {
        setVisibility();
        return true;
      } else if (evt.target !== element) {
        return true;
      }

      input.checked = !input.checked;
      setVisibility();
      return false;
    };
  }

  async _setNestedName(element, {
    name = null
  }) {
    if (typeof name === &quot;string&quot;) {
      element.textContent = this._normalizeTextContent(name);
      return;
    }

    element.textContent = await this.l10n.get(&quot;additional_layers&quot;);
    element.style.fontStyle = &quot;italic&quot;;
  }

  _addToggleButton(div, {
    name = null
  }) {
    super._addToggleButton(div, name === null);
  }

  _toggleAllTreeItems() {
    if (!this._optionalContentConfig) {
      return;
    }

    super._toggleAllTreeItems();
  }

  render({
    optionalContentConfig,
    pdfDocument
  }) {
    if (this._optionalContentConfig) {
      this.reset();
    }

    this._optionalContentConfig = optionalContentConfig || null;
    this._pdfDocument = pdfDocument || null;
    const groups = optionalContentConfig?.getOrder();

    if (!groups) {
      this._dispatchEvent(0);

      return;
    }

    this._optionalContentHash = optionalContentConfig.getHash();
    const fragment = document.createDocumentFragment(),
          queue = [{
      parent: fragment,
      groups
    }];
    let layersCount = 0,
        hasAnyNesting = false;

    while (queue.length &gt; 0) {
      const levelData = queue.shift();

      for (const groupId of levelData.groups) {
        const div = document.createElement(&quot;div&quot;);
        div.className = &quot;treeItem&quot;;
        const element = document.createElement(&quot;a&quot;);
        div.append(element);

        if (typeof groupId === &quot;object&quot;) {
          hasAnyNesting = true;

          this._addToggleButton(div, groupId);

          this._setNestedName(element, groupId);

          const itemsDiv = document.createElement(&quot;div&quot;);
          itemsDiv.className = &quot;treeItems&quot;;
          div.append(itemsDiv);
          queue.push({
            parent: itemsDiv,
            groups: groupId.order
          });
        } else {
          const group = optionalContentConfig.getGroup(groupId);
          const input = document.createElement(&quot;input&quot;);

          this._bindLink(element, {
            groupId,
            input
          });

          input.type = &quot;checkbox&quot;;
          input.checked = group.visible;
          const label = document.createElement(&quot;label&quot;);
          label.textContent = this._normalizeTextContent(group.name);
          label.append(input);
          element.append(label);
          layersCount++;
        }

        levelData.parent.append(div);
      }
    }

    this._finishRendering(fragment, layersCount, hasAnyNesting);
  }

  async #updateLayers(promise = null) {
    if (!this._optionalContentConfig) {
      return;
    }

    const pdfDocument = this._pdfDocument;
    const optionalContentConfig = await (promise || pdfDocument.getOptionalContentConfig());

    if (pdfDocument !== this._pdfDocument) {
      return;
    }

    if (promise) {
      if (optionalContentConfig.getHash() === this._optionalContentHash) {
        return;
      }
    } else {
      this.eventBus.dispatch(&quot;optionalcontentconfig&quot;, {
        source: this,
        promise: Promise.resolve(optionalContentConfig)
      });
    }

    this.render({
      optionalContentConfig,
      pdfDocument: this._pdfDocument
    });
  }

}

exports.PDFLayerViewer = PDFLayerViewer;

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFOutlineViewer = void 0;

var _base_tree_viewer = __webpack_require__(13);

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(1);

class PDFOutlineViewer extends _base_tree_viewer.BaseTreeViewer {
  constructor(options) {
    super(options);
    this.linkService = options.linkService;
    this.downloadManager = options.downloadManager;

    this.eventBus._on(&quot;toggleoutlinetree&quot;, this._toggleAllTreeItems.bind(this));

    this.eventBus._on(&quot;currentoutlineitem&quot;, this._currentOutlineItem.bind(this));

    this.eventBus._on(&quot;pagechanging&quot;, evt =&gt; {
      this._currentPageNumber = evt.pageNumber;
    });

    this.eventBus._on(&quot;pagesloaded&quot;, evt =&gt; {
      this._isPagesLoaded = !!evt.pagesCount;

      if (this._currentOutlineItemCapability &amp;&amp; !this._currentOutlineItemCapability.settled) {
        this._currentOutlineItemCapability.resolve(this._isPagesLoaded);
      }
    });

    this.eventBus._on(&quot;sidebarviewchanged&quot;, evt =&gt; {
      this._sidebarView = evt.view;
    });
  }

  reset() {
    super.reset();
    this._outline = null;
    this._pageNumberToDestHashCapability = null;
    this._currentPageNumber = 1;
    this._isPagesLoaded = null;

    if (this._currentOutlineItemCapability &amp;&amp; !this._currentOutlineItemCapability.settled) {
      this._currentOutlineItemCapability.resolve(false);
    }

    this._currentOutlineItemCapability = null;
  }

  _dispatchEvent(outlineCount) {
    this._currentOutlineItemCapability = (0, _pdfjsLib.createPromiseCapability)();

    if (outlineCount === 0 || this._pdfDocument?.loadingParams.disableAutoFetch) {
      this._currentOutlineItemCapability.resolve(false);
    } else if (this._isPagesLoaded !== null) {
      this._currentOutlineItemCapability.resolve(this._isPagesLoaded);
    }

    this.eventBus.dispatch(&quot;outlineloaded&quot;, {
      source: this,
      outlineCount,
      currentOutlineItemPromise: this._currentOutlineItemCapability.promise
    });
  }

  _bindLink(element, {
    url,
    newWindow,
    action,
    attachment,
    dest,
    setOCGState
  }) {
    const {
      linkService
    } = this;

    if (url) {
      linkService.addLinkAttributes(element, url, newWindow);
      return;
    }

    if (action) {
      element.href = linkService.getAnchorUrl(&quot;&quot;);

      element.onclick = () =&gt; {
        linkService.executeNamedAction(action);
        return false;
      };

      return;
    }

    if (attachment) {
      element.href = linkService.getAnchorUrl(&quot;&quot;);

      element.onclick = () =&gt; {
        this.downloadManager.openOrDownloadData(element, attachment.content, attachment.filename);
        return false;
      };

      return;
    }

    if (setOCGState) {
      element.href = linkService.getAnchorUrl(&quot;&quot;);

      element.onclick = () =&gt; {
        linkService.executeSetOCGState(setOCGState);
        return false;
      };

      return;
    }

    element.href = linkService.getDestinationHash(dest);

    element.onclick = evt =&gt; {
      this._updateCurrentTreeItem(evt.target.parentNode);

      if (dest) {
        linkService.goToDestination(dest);
      }

      return false;
    };
  }

  _setStyles(element, {
    bold,
    italic
  }) {
    if (bold) {
      element.style.fontWeight = &quot;bold&quot;;
    }

    if (italic) {
      element.style.fontStyle = &quot;italic&quot;;
    }
  }

  _addToggleButton(div, {
    count,
    items
  }) {
    let hidden = false;

    if (count &lt; 0) {
      let totalCount = items.length;

      if (totalCount &gt; 0) {
        const queue = [...items];

        while (queue.length &gt; 0) {
          const {
            count: nestedCount,
            items: nestedItems
          } = queue.shift();

          if (nestedCount &gt; 0 &amp;&amp; nestedItems.length &gt; 0) {
            totalCount += nestedItems.length;
            queue.push(...nestedItems);
          }
        }
      }

      if (Math.abs(count) === totalCount) {
        hidden = true;
      }
    }

    super._addToggleButton(div, hidden);
  }

  _toggleAllTreeItems() {
    if (!this._outline) {
      return;
    }

    super._toggleAllTreeItems();
  }

  render({
    outline,
    pdfDocument
  }) {
    if (this._outline) {
      this.reset();
    }

    this._outline = outline || null;
    this._pdfDocument = pdfDocument || null;

    if (!outline) {
      this._dispatchEvent(0);

      return;
    }

    const fragment = document.createDocumentFragment();
    const queue = [{
      parent: fragment,
      items: outline
    }];
    let outlineCount = 0,
        hasAnyNesting = false;

    while (queue.length &gt; 0) {
      const levelData = queue.shift();

      for (const item of levelData.items) {
        const div = document.createElement(&quot;div&quot;);
        div.className = &quot;treeItem&quot;;
        const element = document.createElement(&quot;a&quot;);

        this._bindLink(element, item);

        this._setStyles(element, item);

        element.textContent = this._normalizeTextContent(item.title);
        div.append(element);

        if (item.items.length &gt; 0) {
          hasAnyNesting = true;

          this._addToggleButton(div, item);

          const itemsDiv = document.createElement(&quot;div&quot;);
          itemsDiv.className = &quot;treeItems&quot;;
          div.append(itemsDiv);
          queue.push({
            parent: itemsDiv,
            items: item.items
          });
        }

        levelData.parent.append(div);
        outlineCount++;
      }
    }

    this._finishRendering(fragment, outlineCount, hasAnyNesting);
  }

  async _currentOutlineItem() {
    if (!this._isPagesLoaded) {
      throw new Error(&quot;_currentOutlineItem: All pages have not been loaded.&quot;);
    }

    if (!this._outline || !this._pdfDocument) {
      return;
    }

    const pageNumberToDestHash = await this._getPageNumberToDestHash(this._pdfDocument);

    if (!pageNumberToDestHash) {
      return;
    }

    this._updateCurrentTreeItem(null);

    if (this._sidebarView !== _ui_utils.SidebarView.OUTLINE) {
      return;
    }

    for (let i = this._currentPageNumber; i &gt; 0; i--) {
      const destHash = pageNumberToDestHash.get(i);

      if (!destHash) {
        continue;
      }

      const linkElement = this.container.querySelector(`a[href=&quot;${destHash}&quot;]`);

      if (!linkElement) {
        continue;
      }

      this._scrollToCurrentTreeItem(linkElement.parentNode);

      break;
    }
  }

  async _getPageNumberToDestHash(pdfDocument) {
    if (this._pageNumberToDestHashCapability) {
      return this._pageNumberToDestHashCapability.promise;
    }

    this._pageNumberToDestHashCapability = (0, _pdfjsLib.createPromiseCapability)();
    const pageNumberToDestHash = new Map(),
          pageNumberNesting = new Map();
    const queue = [{
      nesting: 0,
      items: this._outline
    }];

    while (queue.length &gt; 0) {
      const levelData = queue.shift(),
            currentNesting = levelData.nesting;

      for (const {
        dest,
        items
      } of levelData.items) {
        let explicitDest, pageNumber;

        if (typeof dest === &quot;string&quot;) {
          explicitDest = await pdfDocument.getDestination(dest);

          if (pdfDocument !== this._pdfDocument) {
            return null;
          }
        } else {
          explicitDest = dest;
        }

        if (Array.isArray(explicitDest)) {
          const [destRef] = explicitDest;

          if (typeof destRef === &quot;object&quot; &amp;&amp; destRef !== null) {
            pageNumber = this.linkService._cachedPageNumber(destRef);

            if (!pageNumber) {
              try {
                pageNumber = (await pdfDocument.getPageIndex(destRef)) + 1;

                if (pdfDocument !== this._pdfDocument) {
                  return null;
                }

                this.linkService.cachePageRef(pageNumber, destRef);
              } catch (ex) {}
            }
          } else if (Number.isInteger(destRef)) {
            pageNumber = destRef + 1;
          }

          if (Number.isInteger(pageNumber) &amp;&amp; (!pageNumberToDestHash.has(pageNumber) || currentNesting &gt; pageNumberNesting.get(pageNumber))) {
            const destHash = this.linkService.getDestinationHash(dest);
            pageNumberToDestHash.set(pageNumber, destHash);
            pageNumberNesting.set(pageNumber, currentNesting);
          }
        }

        if (items.length &gt; 0) {
          queue.push({
            nesting: currentNesting + 1,
            items
          });
        }
      }
    }

    this._pageNumberToDestHashCapability.resolve(pageNumberToDestHash.size &gt; 0 ? pageNumberToDestHash : null);

    return this._pageNumberToDestHashCapability.promise;
  }

}

exports.PDFOutlineViewer = PDFOutlineViewer;

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFPresentationMode = void 0;

var _ui_utils = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(5);

const DELAY_BEFORE_HIDING_CONTROLS = 3000;
const ACTIVE_SELECTOR = &quot;pdfPresentationMode&quot;;
const CONTROLS_SELECTOR = &quot;pdfPresentationModeControls&quot;;
const MOUSE_SCROLL_COOLDOWN_TIME = 50;
const PAGE_SWITCH_THRESHOLD = 0.1;
const SWIPE_MIN_DISTANCE_THRESHOLD = 50;
const SWIPE_ANGLE_THRESHOLD = Math.PI / 6;

class PDFPresentationMode {
  #state = _ui_utils.PresentationModeState.UNKNOWN;
  #args = null;

  constructor({
    container,
    pdfViewer,
    eventBus
  }) {
    this.container = container;
    this.pdfViewer = pdfViewer;
    this.eventBus = eventBus;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;
  }

  async request() {
    const {
      container,
      pdfViewer
    } = this;

    if (this.active || !pdfViewer.pagesCount || !container.requestFullscreen) {
      return false;
    }

    this.#addFullscreenChangeListeners();
    this.#notifyStateChange(_ui_utils.PresentationModeState.CHANGING);
    const promise = container.requestFullscreen();
    this.#args = {
      pageNumber: pdfViewer.currentPageNumber,
      scaleValue: pdfViewer.currentScaleValue,
      scrollMode: pdfViewer.scrollMode,
      spreadMode: null,
      annotationEditorMode: null
    };

    if (pdfViewer.spreadMode !== _ui_utils.SpreadMode.NONE &amp;&amp; !(pdfViewer.pageViewsReady &amp;&amp; pdfViewer.hasEqualPageSizes)) {
      console.warn(&quot;Ignoring Spread modes when entering PresentationMode, &quot; + &quot;since the document may contain varying page sizes.&quot;);
      this.#args.spreadMode = pdfViewer.spreadMode;
    }

    if (pdfViewer.annotationEditorMode !== _pdfjsLib.AnnotationEditorType.DISABLE) {
      this.#args.annotationEditorMode = pdfViewer.annotationEditorMode;
    }

    try {
      await promise;
      pdfViewer.focus();
      return true;
    } catch (reason) {
      this.#removeFullscreenChangeListeners();
      this.#notifyStateChange(_ui_utils.PresentationModeState.NORMAL);
    }

    return false;
  }

  get active() {
    return this.#state === _ui_utils.PresentationModeState.CHANGING || this.#state === _ui_utils.PresentationModeState.FULLSCREEN;
  }

  #mouseWheel(evt) {
    if (!this.active) {
      return;
    }

    evt.preventDefault();
    const delta = (0, _ui_utils.normalizeWheelEventDelta)(evt);
    const currentTime = Date.now();
    const storedTime = this.mouseScrollTimeStamp;

    if (currentTime &gt; storedTime &amp;&amp; currentTime - storedTime &lt; MOUSE_SCROLL_COOLDOWN_TIME) {
      return;
    }

    if (this.mouseScrollDelta &gt; 0 &amp;&amp; delta &lt; 0 || this.mouseScrollDelta &lt; 0 &amp;&amp; delta &gt; 0) {
      this.#resetMouseScrollState();
    }

    this.mouseScrollDelta += delta;

    if (Math.abs(this.mouseScrollDelta) &gt;= PAGE_SWITCH_THRESHOLD) {
      const totalDelta = this.mouseScrollDelta;
      this.#resetMouseScrollState();
      const success = totalDelta &gt; 0 ? this.pdfViewer.previousPage() : this.pdfViewer.nextPage();

      if (success) {
        this.mouseScrollTimeStamp = currentTime;
      }
    }
  }

  #notifyStateChange(state) {
    this.#state = state;
    this.eventBus.dispatch(&quot;presentationmodechanged&quot;, {
      source: this,
      state
    });
  }

  #enter() {
    this.#notifyStateChange(_ui_utils.PresentationModeState.FULLSCREEN);
    this.container.classList.add(ACTIVE_SELECTOR);
    setTimeout(() =&gt; {
      this.pdfViewer.scrollMode = _ui_utils.ScrollMode.PAGE;

      if (this.#args.spreadMode !== null) {
        this.pdfViewer.spreadMode = _ui_utils.SpreadMode.NONE;
      }

      this.pdfViewer.currentPageNumber = this.#args.pageNumber;
      this.pdfViewer.currentScaleValue = &quot;page-fit&quot;;

      if (this.#args.annotationEditorMode !== null) {
        this.pdfViewer.annotationEditorMode = _pdfjsLib.AnnotationEditorType.NONE;
      }
    }, 0);
    this.#addWindowListeners();
    this.#showControls();
    this.contextMenuOpen = false;
    window.getSelection().removeAllRanges();
  }

  #exit() {
    const pageNumber = this.pdfViewer.currentPageNumber;
    this.container.classList.remove(ACTIVE_SELECTOR);
    setTimeout(() =&gt; {
      this.#removeFullscreenChangeListeners();
      this.#notifyStateChange(_ui_utils.PresentationModeState.NORMAL);
      this.pdfViewer.scrollMode = this.#args.scrollMode;

      if (this.#args.spreadMode !== null) {
        this.pdfViewer.spreadMode = this.#args.spreadMode;
      }

      this.pdfViewer.currentScaleValue = this.#args.scaleValue;
      this.pdfViewer.currentPageNumber = pageNumber;

      if (this.#args.annotationEditorMode !== null) {
        this.pdfViewer.annotationEditorMode = this.#args.annotationEditorMode;
      }

      this.#args = null;
    }, 0);
    this.#removeWindowListeners();
    this.#hideControls();
    this.#resetMouseScrollState();
    this.contextMenuOpen = false;
  }

  #mouseDown(evt) {
    if (this.contextMenuOpen) {
      this.contextMenuOpen = false;
      evt.preventDefault();
      return;
    }

    if (evt.button === 0) {
      const isInternalLink = evt.target.href &amp;&amp; evt.target.classList.contains(&quot;internalLink&quot;);

      if (!isInternalLink) {
        evt.preventDefault();

        if (evt.shiftKey) {
          this.pdfViewer.previousPage();
        } else {
          this.pdfViewer.nextPage();
        }
      }
    }
  }

  #contextMenu() {
    this.contextMenuOpen = true;
  }

  #showControls() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    } else {
      this.container.classList.add(CONTROLS_SELECTOR);
    }

    this.controlsTimeout = setTimeout(() =&gt; {
      this.container.classList.remove(CONTROLS_SELECTOR);
      delete this.controlsTimeout;
    }, DELAY_BEFORE_HIDING_CONTROLS);
  }

  #hideControls() {
    if (!this.controlsTimeout) {
      return;
    }

    clearTimeout(this.controlsTimeout);
    this.container.classList.remove(CONTROLS_SELECTOR);
    delete this.controlsTimeout;
  }

  #resetMouseScrollState() {
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
  }

  #touchSwipe(evt) {
    if (!this.active) {
      return;
    }

    if (evt.touches.length &gt; 1) {
      this.touchSwipeState = null;
      return;
    }

    switch (evt.type) {
      case &quot;touchstart&quot;:
        this.touchSwipeState = {
          startX: evt.touches[0].pageX,
          startY: evt.touches[0].pageY,
          endX: evt.touches[0].pageX,
          endY: evt.touches[0].pageY
        };
        break;

      case &quot;touchmove&quot;:
        if (this.touchSwipeState === null) {
          return;
        }

        this.touchSwipeState.endX = evt.touches[0].pageX;
        this.touchSwipeState.endY = evt.touches[0].pageY;
        evt.preventDefault();
        break;

      case &quot;touchend&quot;:
        if (this.touchSwipeState === null) {
          return;
        }

        let delta = 0;
        const dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
        const dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
        const absAngle = Math.abs(Math.atan2(dy, dx));

        if (Math.abs(dx) &gt; SWIPE_MIN_DISTANCE_THRESHOLD &amp;&amp; (absAngle &lt;= SWIPE_ANGLE_THRESHOLD || absAngle &gt;= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
          delta = dx;
        } else if (Math.abs(dy) &gt; SWIPE_MIN_DISTANCE_THRESHOLD &amp;&amp; Math.abs(absAngle - Math.PI / 2) &lt;= SWIPE_ANGLE_THRESHOLD) {
          delta = dy;
        }

        if (delta &gt; 0) {
          this.pdfViewer.previousPage();
        } else if (delta &lt; 0) {
          this.pdfViewer.nextPage();
        }

        break;
    }
  }

  #addWindowListeners() {
    this.showControlsBind = this.#showControls.bind(this);
    this.mouseDownBind = this.#mouseDown.bind(this);
    this.mouseWheelBind = this.#mouseWheel.bind(this);
    this.resetMouseScrollStateBind = this.#resetMouseScrollState.bind(this);
    this.contextMenuBind = this.#contextMenu.bind(this);
    this.touchSwipeBind = this.#touchSwipe.bind(this);
    window.addEventListener(&quot;mousemove&quot;, this.showControlsBind);
    window.addEventListener(&quot;mousedown&quot;, this.mouseDownBind);
    window.addEventListener(&quot;wheel&quot;, this.mouseWheelBind, {
      passive: false
    });
    window.addEventListener(&quot;keydown&quot;, this.resetMouseScrollStateBind);
    window.addEventListener(&quot;contextmenu&quot;, this.contextMenuBind);
    window.addEventListener(&quot;touchstart&quot;, this.touchSwipeBind);
    window.addEventListener(&quot;touchmove&quot;, this.touchSwipeBind);
    window.addEventListener(&quot;touchend&quot;, this.touchSwipeBind);
  }

  #removeWindowListeners() {
    window.removeEventListener(&quot;mousemove&quot;, this.showControlsBind);
    window.removeEventListener(&quot;mousedown&quot;, this.mouseDownBind);
    window.removeEventListener(&quot;wheel&quot;, this.mouseWheelBind, {
      passive: false
    });
    window.removeEventListener(&quot;keydown&quot;, this.resetMouseScrollStateBind);
    window.removeEventListener(&quot;contextmenu&quot;, this.contextMenuBind);
    window.removeEventListener(&quot;touchstart&quot;, this.touchSwipeBind);
    window.removeEventListener(&quot;touchmove&quot;, this.touchSwipeBind);
    window.removeEventListener(&quot;touchend&quot;, this.touchSwipeBind);
    delete this.showControlsBind;
    delete this.mouseDownBind;
    delete this.mouseWheelBind;
    delete this.resetMouseScrollStateBind;
    delete this.contextMenuBind;
    delete this.touchSwipeBind;
  }

  #fullscreenChange() {
    if (document.fullscreenElement) {
      this.#enter();
    } else {
      this.#exit();
    }
  }

  #addFullscreenChangeListeners() {
    this.fullscreenChangeBind = this.#fullscreenChange.bind(this);
    window.addEventListener(&quot;fullscreenchange&quot;, this.fullscreenChangeBind);
  }

  #removeFullscreenChangeListeners() {
    window.removeEventListener(&quot;fullscreenchange&quot;, this.fullscreenChangeBind);
    delete this.fullscreenChangeBind;
  }

}

exports.PDFPresentationMode = PDFPresentationMode;

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFRenderingQueue = void 0;

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(1);

const CLEANUP_TIMEOUT = 30000;

class PDFRenderingQueue {
  constructor() {
    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
  }

  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }

  setThumbnailViewer(pdfThumbnailViewer) {
    this.pdfThumbnailViewer = pdfThumbnailViewer;
  }

  isHighestPriority(view) {
    return this.highestPriorityPage === view.renderingId;
  }

  hasViewer() {
    return !!this.pdfViewer;
  }

  renderHighestPriority(currentlyVisiblePages) {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }

    if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
      return;
    }

    if (this.isThumbnailViewEnabled &amp;&amp; this.pdfThumbnailViewer?.forceRendering()) {
      return;
    }

    if (this.printing) {
      return;
    }

    if (this.onIdle) {
      this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
    }
  }

  getHighestPriority(visible, views, scrolledDown, preRenderExtra = false) {
    const visibleViews = visible.views,
          numVisible = visibleViews.length;

    if (numVisible === 0) {
      return null;
    }

    for (let i = 0; i &lt; numVisible; i++) {
      const view = visibleViews[i].view;

      if (!this.isViewFinished(view)) {
        return view;
      }
    }

    const firstId = visible.first.id,
          lastId = visible.last.id;

    if (lastId - firstId + 1 &gt; numVisible) {
      const visibleIds = visible.ids;

      for (let i = 1, ii = lastId - firstId; i &lt; ii; i++) {
        const holeId = scrolledDown ? firstId + i : lastId - i;

        if (visibleIds.has(holeId)) {
          continue;
        }

        const holeView = views[holeId - 1];

        if (!this.isViewFinished(holeView)) {
          return holeView;
        }
      }
    }

    let preRenderIndex = scrolledDown ? lastId : firstId - 2;
    let preRenderView = views[preRenderIndex];

    if (preRenderView &amp;&amp; !this.isViewFinished(preRenderView)) {
      return preRenderView;
    }

    if (preRenderExtra) {
      preRenderIndex += scrolledDown ? 1 : -1;
      preRenderView = views[preRenderIndex];

      if (preRenderView &amp;&amp; !this.isViewFinished(preRenderView)) {
        return preRenderView;
      }
    }

    return null;
  }

  isViewFinished(view) {
    return view.renderingState === _ui_utils.RenderingStates.FINISHED;
  }

  renderView(view) {
    switch (view.renderingState) {
      case _ui_utils.RenderingStates.FINISHED:
        return false;

      case _ui_utils.RenderingStates.PAUSED:
        this.highestPriorityPage = view.renderingId;
        view.resume();
        break;

      case _ui_utils.RenderingStates.RUNNING:
        this.highestPriorityPage = view.renderingId;
        break;

      case _ui_utils.RenderingStates.INITIAL:
        this.highestPriorityPage = view.renderingId;
        view.draw().finally(() =&gt; {
          this.renderHighestPriority();
        }).catch(reason =&gt; {
          if (reason instanceof _pdfjsLib.RenderingCancelledException) {
            return;
          }

          console.error(`renderView: &quot;${reason}&quot;`);
        });
        break;
    }

    return true;
  }

}

exports.PDFRenderingQueue = PDFRenderingQueue;

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFScriptingManager = void 0;

var _ui_utils = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(5);

class PDFScriptingManager {
  constructor({
    eventBus,
    sandboxBundleSrc = null,
    scriptingFactory = null,
    docPropertiesLookup = null
  }) {
    this._pdfDocument = null;
    this._pdfViewer = null;
    this._closeCapability = null;
    this._destroyCapability = null;
    this._scripting = null;
    this._mouseState = Object.create(null);
    this._ready = false;
    this._eventBus = eventBus;
    this._sandboxBundleSrc = sandboxBundleSrc;
    this._scriptingFactory = scriptingFactory;
    this._docPropertiesLookup = docPropertiesLookup;
  }

  setViewer(pdfViewer) {
    this._pdfViewer = pdfViewer;
  }

  async setDocument(pdfDocument) {
    if (this._pdfDocument) {
      await this._destroyScripting();
    }

    this._pdfDocument = pdfDocument;

    if (!pdfDocument) {
      return;
    }

    const [objects, calculationOrder, docActions] = await Promise.all([pdfDocument.getFieldObjects(), pdfDocument.getCalculationOrderIds(), pdfDocument.getJSActions()]);

    if (!objects &amp;&amp; !docActions) {
      await this._destroyScripting();
      return;
    }

    if (pdfDocument !== this._pdfDocument) {
      return;
    }

    try {
      this._scripting = this._createScripting();
    } catch (error) {
      console.error(`PDFScriptingManager.setDocument: &quot;${error?.message}&quot;.`);
      await this._destroyScripting();
      return;
    }

    this._internalEvents.set(&quot;updatefromsandbox&quot;, event =&gt; {
      if (event?.source !== window) {
        return;
      }

      this._updateFromSandbox(event.detail);
    });

    this._internalEvents.set(&quot;dispatcheventinsandbox&quot;, event =&gt; {
      this._scripting?.dispatchEventInSandbox(event.detail);
    });

    this._internalEvents.set(&quot;pagechanging&quot;, ({
      pageNumber,
      previous
    }) =&gt; {
      if (pageNumber === previous) {
        return;
      }

      this._dispatchPageClose(previous);

      this._dispatchPageOpen(pageNumber);
    });

    this._internalEvents.set(&quot;pagerendered&quot;, ({
      pageNumber
    }) =&gt; {
      if (!this._pageOpenPending.has(pageNumber)) {
        return;
      }

      if (pageNumber !== this._pdfViewer.currentPageNumber) {
        return;
      }

      this._dispatchPageOpen(pageNumber);
    });

    this._internalEvents.set(&quot;pagesdestroy&quot;, async event =&gt; {
      await this._dispatchPageClose(this._pdfViewer.currentPageNumber);
      await this._scripting?.dispatchEventInSandbox({
        id: &quot;doc&quot;,
        name: &quot;WillClose&quot;
      });
      this._closeCapability?.resolve();
    });

    this._domEvents.set(&quot;mousedown&quot;, event =&gt; {
      this._mouseState.isDown = true;
    });

    this._domEvents.set(&quot;mouseup&quot;, event =&gt; {
      this._mouseState.isDown = false;
    });

    for (const [name, listener] of this._internalEvents) {
      this._eventBus._on(name, listener);
    }

    for (const [name, listener] of this._domEvents) {
      window.addEventListener(name, listener, true);
    }

    try {
      const docProperties = await this._getDocProperties();

      if (pdfDocument !== this._pdfDocument) {
        return;
      }

      await this._scripting.createSandbox({
        objects,
        calculationOrder,
        appInfo: {
          platform: navigator.platform,
          language: navigator.language
        },
        docInfo: { ...docProperties,
          actions: docActions
        }
      });

      this._eventBus.dispatch(&quot;sandboxcreated&quot;, {
        source: this
      });
    } catch (error) {
      console.error(`PDFScriptingManager.setDocument: &quot;${error?.message}&quot;.`);
      await this._destroyScripting();
      return;
    }

    await this._scripting?.dispatchEventInSandbox({
      id: &quot;doc&quot;,
      name: &quot;Open&quot;
    });
    await this._dispatchPageOpen(this._pdfViewer.currentPageNumber, true);
    Promise.resolve().then(() =&gt; {
      if (pdfDocument === this._pdfDocument) {
        this._ready = true;
      }
    });
  }

  async dispatchWillSave(detail) {
    return this._scripting?.dispatchEventInSandbox({
      id: &quot;doc&quot;,
      name: &quot;WillSave&quot;
    });
  }

  async dispatchDidSave(detail) {
    return this._scripting?.dispatchEventInSandbox({
      id: &quot;doc&quot;,
      name: &quot;DidSave&quot;
    });
  }

  async dispatchWillPrint(detail) {
    return this._scripting?.dispatchEventInSandbox({
      id: &quot;doc&quot;,
      name: &quot;WillPrint&quot;
    });
  }

  async dispatchDidPrint(detail) {
    return this._scripting?.dispatchEventInSandbox({
      id: &quot;doc&quot;,
      name: &quot;DidPrint&quot;
    });
  }

  get mouseState() {
    return this._mouseState;
  }

  get destroyPromise() {
    return this._destroyCapability?.promise || null;
  }

  get ready() {
    return this._ready;
  }

  get _internalEvents() {
    return (0, _pdfjsLib.shadow)(this, &quot;_internalEvents&quot;, new Map());
  }

  get _domEvents() {
    return (0, _pdfjsLib.shadow)(this, &quot;_domEvents&quot;, new Map());
  }

  get _pageOpenPending() {
    return (0, _pdfjsLib.shadow)(this, &quot;_pageOpenPending&quot;, new Set());
  }

  get _visitedPages() {
    return (0, _pdfjsLib.shadow)(this, &quot;_visitedPages&quot;, new Map());
  }

  async _updateFromSandbox(detail) {
    const isInPresentationMode = this._pdfViewer.isInPresentationMode || this._pdfViewer.isChangingPresentationMode;
    const {
      id,
      siblings,
      command,
      value
    } = detail;

    if (!id) {
      switch (command) {
        case &quot;clear&quot;:
          console.clear();
          break;

        case &quot;error&quot;:
          console.error(value);
          break;

        case &quot;layout&quot;:
          if (isInPresentationMode) {
            return;
          }

          const modes = (0, _ui_utils.apiPageLayoutToViewerModes)(value);
          this._pdfViewer.spreadMode = modes.spreadMode;
          break;

        case &quot;page-num&quot;:
          this._pdfViewer.currentPageNumber = value + 1;
          break;

        case &quot;print&quot;:
          await this._pdfViewer.pagesPromise;

          this._eventBus.dispatch(&quot;print&quot;, {
            source: this
          });

          break;

        case &quot;println&quot;:
          console.log(value);
          break;

        case &quot;zoom&quot;:
          if (isInPresentationMode) {
            return;
          }

          this._pdfViewer.currentScaleValue = value;
          break;

        case &quot;SaveAs&quot;:
          this._eventBus.dispatch(&quot;download&quot;, {
            source: this
          });

          break;

        case &quot;FirstPage&quot;:
          this._pdfViewer.currentPageNumber = 1;
          break;

        case &quot;LastPage&quot;:
          this._pdfViewer.currentPageNumber = this._pdfViewer.pagesCount;
          break;

        case &quot;NextPage&quot;:
          this._pdfViewer.nextPage();

          break;

        case &quot;PrevPage&quot;:
          this._pdfViewer.previousPage();

          break;

        case &quot;ZoomViewIn&quot;:
          if (isInPresentationMode) {
            return;
          }

          this._pdfViewer.increaseScale();

          break;

        case &quot;ZoomViewOut&quot;:
          if (isInPresentationMode) {
            return;
          }

          this._pdfViewer.decreaseScale();

          break;
      }

      return;
    }

    if (isInPresentationMode) {
      if (detail.focus) {
        return;
      }
    }

    delete detail.id;
    delete detail.siblings;
    const ids = siblings ? [id, ...siblings] : [id];

    for (const elementId of ids) {
      const element = document.querySelector(`[data-element-id=&quot;${elementId}&quot;]`);

      if (element) {
        element.dispatchEvent(new CustomEvent(&quot;updatefromsandbox&quot;, {
          detail
        }));
      } else {
        this._pdfDocument?.annotationStorage.setValue(elementId, detail);
      }
    }
  }

  async _dispatchPageOpen(pageNumber, initialize = false) {
    const pdfDocument = this._pdfDocument,
          visitedPages = this._visitedPages;

    if (initialize) {
      this._closeCapability = (0, _pdfjsLib.createPromiseCapability)();
    }

    if (!this._closeCapability) {
      return;
    }

    const pageView = this._pdfViewer.getPageView(pageNumber - 1);

    if (pageView?.renderingState !== _ui_utils.RenderingStates.FINISHED) {
      this._pageOpenPending.add(pageNumber);

      return;
    }

    this._pageOpenPending.delete(pageNumber);

    const actionsPromise = (async () =&gt; {
      const actions = await (!visitedPages.has(pageNumber) ? pageView.pdfPage?.getJSActions() : null);

      if (pdfDocument !== this._pdfDocument) {
        return;
      }

      await this._scripting?.dispatchEventInSandbox({
        id: &quot;page&quot;,
        name: &quot;PageOpen&quot;,
        pageNumber,
        actions
      });
    })();

    visitedPages.set(pageNumber, actionsPromise);
  }

  async _dispatchPageClose(pageNumber) {
    const pdfDocument = this._pdfDocument,
          visitedPages = this._visitedPages;

    if (!this._closeCapability) {
      return;
    }

    if (this._pageOpenPending.has(pageNumber)) {
      return;
    }

    const actionsPromise = visitedPages.get(pageNumber);

    if (!actionsPromise) {
      return;
    }

    visitedPages.set(pageNumber, null);
    await actionsPromise;

    if (pdfDocument !== this._pdfDocument) {
      return;
    }

    await this._scripting?.dispatchEventInSandbox({
      id: &quot;page&quot;,
      name: &quot;PageClose&quot;,
      pageNumber
    });
  }

  async _getDocProperties() {
    if (this._docPropertiesLookup) {
      return this._docPropertiesLookup(this._pdfDocument);
    }

    throw new Error(&quot;_getDocProperties: Unable to lookup properties.&quot;);
  }

  _createScripting() {
    this._destroyCapability = (0, _pdfjsLib.createPromiseCapability)();

    if (this._scripting) {
      throw new Error(&quot;_createScripting: Scripting already exists.&quot;);
    }

    if (this._scriptingFactory) {
      return this._scriptingFactory.createScripting({
        sandboxBundleSrc: this._sandboxBundleSrc
      });
    }

    throw new Error(&quot;_createScripting: Cannot create scripting.&quot;);
  }

  async _destroyScripting() {
    if (!this._scripting) {
      this._pdfDocument = null;
      this._destroyCapability?.resolve();
      return;
    }

    if (this._closeCapability) {
      await Promise.race([this._closeCapability.promise, new Promise(resolve =&gt; {
        setTimeout(resolve, 1000);
      })]).catch(reason =&gt; {});
      this._closeCapability = null;
    }

    this._pdfDocument = null;

    try {
      await this._scripting.destroySandbox();
    } catch (ex) {}

    for (const [name, listener] of this._internalEvents) {
      this._eventBus._off(name, listener);
    }

    this._internalEvents.clear();

    for (const [name, listener] of this._domEvents) {
      window.removeEventListener(name, listener, true);
    }

    this._domEvents.clear();

    this._pageOpenPending.clear();

    this._visitedPages.clear();

    this._scripting = null;
    delete this._mouseState.isDown;
    this._ready = false;
    this._destroyCapability?.resolve();
  }

}

exports.PDFScriptingManager = PDFScriptingManager;

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFSidebar = void 0;

var _ui_utils = __webpack_require__(1);

const UI_NOTIFICATION_CLASS = &quot;pdfSidebarNotification&quot;;

class PDFSidebar {
  constructor({
    elements,
    pdfViewer,
    pdfThumbnailViewer,
    eventBus,
    l10n
  }) {
    this.isOpen = false;
    this.active = _ui_utils.SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.isInitialEventDispatched = false;
    this.onToggled = null;
    this.pdfViewer = pdfViewer;
    this.pdfThumbnailViewer = pdfThumbnailViewer;
    this.outerContainer = elements.outerContainer;
    this.sidebarContainer = elements.sidebarContainer;
    this.toggleButton = elements.toggleButton;
    this.thumbnailButton = elements.thumbnailButton;
    this.outlineButton = elements.outlineButton;
    this.attachmentsButton = elements.attachmentsButton;
    this.layersButton = elements.layersButton;
    this.thumbnailView = elements.thumbnailView;
    this.outlineView = elements.outlineView;
    this.attachmentsView = elements.attachmentsView;
    this.layersView = elements.layersView;
    this._outlineOptionsContainer = elements.outlineOptionsContainer;
    this._currentOutlineItemButton = elements.currentOutlineItemButton;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.#addEventListeners();
  }

  reset() {
    this.isInitialViewSet = false;
    this.isInitialEventDispatched = false;
    this.#hideUINotification(true);
    this.switchView(_ui_utils.SidebarView.THUMBS);
    this.outlineButton.disabled = false;
    this.attachmentsButton.disabled = false;
    this.layersButton.disabled = false;
    this._currentOutlineItemButton.disabled = true;
  }

  get visibleView() {
    return this.isOpen ? this.active : _ui_utils.SidebarView.NONE;
  }

  setInitialView(view = _ui_utils.SidebarView.NONE) {
    if (this.isInitialViewSet) {
      return;
    }

    this.isInitialViewSet = true;

    if (view === _ui_utils.SidebarView.NONE || view === _ui_utils.SidebarView.UNKNOWN) {
      this.#dispatchEvent();
      return;
    }

    this.switchView(view, true);

    if (!this.isInitialEventDispatched) {
      this.#dispatchEvent();
    }
  }

  switchView(view, forceOpen = false) {
    const isViewChanged = view !== this.active;
    let shouldForceRendering = false;

    switch (view) {
      case _ui_utils.SidebarView.NONE:
        if (this.isOpen) {
          this.close();
        }

        return;

      case _ui_utils.SidebarView.THUMBS:
        if (this.isOpen &amp;&amp; isViewChanged) {
          shouldForceRendering = true;
        }

        break;

      case _ui_utils.SidebarView.OUTLINE:
        if (this.outlineButton.disabled) {
          return;
        }

        break;

      case _ui_utils.SidebarView.ATTACHMENTS:
        if (this.attachmentsButton.disabled) {
          return;
        }

        break;

      case _ui_utils.SidebarView.LAYERS:
        if (this.layersButton.disabled) {
          return;
        }

        break;

      default:
        console.error(`PDFSidebar.switchView: &quot;${view}&quot; is not a valid view.`);
        return;
    }

    this.active = view;
    const isThumbs = view === _ui_utils.SidebarView.THUMBS,
          isOutline = view === _ui_utils.SidebarView.OUTLINE,
          isAttachments = view === _ui_utils.SidebarView.ATTACHMENTS,
          isLayers = view === _ui_utils.SidebarView.LAYERS;
    this.thumbnailButton.classList.toggle(&quot;toggled&quot;, isThumbs);
    this.outlineButton.classList.toggle(&quot;toggled&quot;, isOutline);
    this.attachmentsButton.classList.toggle(&quot;toggled&quot;, isAttachments);
    this.layersButton.classList.toggle(&quot;toggled&quot;, isLayers);
    this.thumbnailButton.setAttribute(&quot;aria-checked&quot;, isThumbs);
    this.outlineButton.setAttribute(&quot;aria-checked&quot;, isOutline);
    this.attachmentsButton.setAttribute(&quot;aria-checked&quot;, isAttachments);
    this.layersButton.setAttribute(&quot;aria-checked&quot;, isLayers);
    this.thumbnailView.classList.toggle(&quot;hidden&quot;, !isThumbs);
    this.outlineView.classList.toggle(&quot;hidden&quot;, !isOutline);
    this.attachmentsView.classList.toggle(&quot;hidden&quot;, !isAttachments);
    this.layersView.classList.toggle(&quot;hidden&quot;, !isLayers);

    this._outlineOptionsContainer.classList.toggle(&quot;hidden&quot;, !isOutline);

    if (forceOpen &amp;&amp; !this.isOpen) {
      this.open();
      return;
    }

    if (shouldForceRendering) {
      this.#updateThumbnailViewer();
      this.#forceRendering();
    }

    if (isViewChanged) {
      this.#dispatchEvent();
    }
  }

  open() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.toggleButton.classList.add(&quot;toggled&quot;);
    this.toggleButton.setAttribute(&quot;aria-expanded&quot;, &quot;true&quot;);
    this.outerContainer.classList.add(&quot;sidebarMoving&quot;, &quot;sidebarOpen&quot;);

    if (this.active === _ui_utils.SidebarView.THUMBS) {
      this.#updateThumbnailViewer();
    }

    this.#forceRendering();
    this.#dispatchEvent();
    this.#hideUINotification();
  }

  close() {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.toggleButton.classList.remove(&quot;toggled&quot;);
    this.toggleButton.setAttribute(&quot;aria-expanded&quot;, &quot;false&quot;);
    this.outerContainer.classList.add(&quot;sidebarMoving&quot;);
    this.outerContainer.classList.remove(&quot;sidebarOpen&quot;);
    this.#forceRendering();
    this.#dispatchEvent();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  #dispatchEvent() {
    if (this.isInitialViewSet &amp;&amp; !this.isInitialEventDispatched) {
      this.isInitialEventDispatched = true;
    }

    this.eventBus.dispatch(&quot;sidebarviewchanged&quot;, {
      source: this,
      view: this.visibleView
    });
  }

  #forceRendering() {
    if (this.onToggled) {
      this.onToggled();
    } else {
      this.pdfViewer.forceRendering();
      this.pdfThumbnailViewer.forceRendering();
    }
  }

  #updateThumbnailViewer() {
    const {
      pdfViewer,
      pdfThumbnailViewer
    } = this;
    const pagesCount = pdfViewer.pagesCount;

    for (let pageIndex = 0; pageIndex &lt; pagesCount; pageIndex++) {
      const pageView = pdfViewer.getPageView(pageIndex);

      if (pageView?.renderingState === _ui_utils.RenderingStates.FINISHED) {
        const thumbnailView = pdfThumbnailViewer.getThumbnail(pageIndex);
        thumbnailView.setImage(pageView);
      }
    }

    pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
  }

  #showUINotification() {
    this.toggleButton.setAttribute(&quot;data-l10n-id&quot;, &quot;toggle_sidebar_notification2&quot;);
    this.l10n.translate(this.toggleButton);

    if (!this.isOpen) {
      this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
    }
  }

  #hideUINotification(reset = false) {
    if (this.isOpen || reset) {
      this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
    }

    if (reset) {
      this.toggleButton.setAttribute(&quot;data-l10n-id&quot;, &quot;toggle_sidebar&quot;);
      this.l10n.translate(this.toggleButton);
    }
  }

  #addEventListeners() {
    this.sidebarContainer.addEventListener(&quot;transitionend&quot;, evt =&gt; {
      if (evt.target === this.sidebarContainer) {
        this.outerContainer.classList.remove(&quot;sidebarMoving&quot;);
      }
    });
    this.toggleButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.toggle();
    });
    this.thumbnailButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.switchView(_ui_utils.SidebarView.THUMBS);
    });
    this.outlineButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.switchView(_ui_utils.SidebarView.OUTLINE);
    });
    this.outlineButton.addEventListener(&quot;dblclick&quot;, () =&gt; {
      this.eventBus.dispatch(&quot;toggleoutlinetree&quot;, {
        source: this
      });
    });
    this.attachmentsButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.switchView(_ui_utils.SidebarView.ATTACHMENTS);
    });
    this.layersButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.switchView(_ui_utils.SidebarView.LAYERS);
    });
    this.layersButton.addEventListener(&quot;dblclick&quot;, () =&gt; {
      this.eventBus.dispatch(&quot;resetlayers&quot;, {
        source: this
      });
    });

    this._currentOutlineItemButton.addEventListener(&quot;click&quot;, () =&gt; {
      this.eventBus.dispatch(&quot;currentoutlineitem&quot;, {
        source: this
      });
    });

    const onTreeLoaded = (count, button, view) =&gt; {
      button.disabled = !count;

      if (count) {
        this.#showUINotification();
      } else if (this.active === view) {
        this.switchView(_ui_utils.SidebarView.THUMBS);
      }
    };

    this.eventBus._on(&quot;outlineloaded&quot;, evt =&gt; {
      onTreeLoaded(evt.outlineCount, this.outlineButton, _ui_utils.SidebarView.OUTLINE);
      evt.currentOutlineItemPromise.then(enabled =&gt; {
        if (!this.isInitialViewSet) {
          return;
        }

        this._currentOutlineItemButton.disabled = !enabled;
      });
    });

    this.eventBus._on(&quot;attachmentsloaded&quot;, evt =&gt; {
      onTreeLoaded(evt.attachmentsCount, this.attachmentsButton, _ui_utils.SidebarView.ATTACHMENTS);
    });

    this.eventBus._on(&quot;layersloaded&quot;, evt =&gt; {
      onTreeLoaded(evt.layersCount, this.layersButton, _ui_utils.SidebarView.LAYERS);
    });

    this.eventBus._on(&quot;presentationmodechanged&quot;, evt =&gt; {
      if (evt.state === _ui_utils.PresentationModeState.NORMAL &amp;&amp; this.visibleView === _ui_utils.SidebarView.THUMBS) {
        this.#updateThumbnailViewer();
      }
    });
  }

}

exports.PDFSidebar = PDFSidebar;

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFSidebarResizer = void 0;

var _ui_utils = __webpack_require__(1);

const SIDEBAR_WIDTH_VAR = &quot;--sidebar-width&quot;;
const SIDEBAR_MIN_WIDTH = 200;
const SIDEBAR_RESIZING_CLASS = &quot;sidebarResizing&quot;;

class PDFSidebarResizer {
  constructor(options, eventBus, l10n) {
    this.isRTL = false;
    this.sidebarOpen = false;
    this._width = null;
    this._outerContainerWidth = null;
    this._boundEvents = Object.create(null);
    this.outerContainer = options.outerContainer;
    this.resizer = options.resizer;
    this.eventBus = eventBus;
    l10n.getDirection().then(dir =&gt; {
      this.isRTL = dir === &quot;rtl&quot;;
    });

    this._addEventListeners();
  }

  get outerContainerWidth() {
    return this._outerContainerWidth ||= this.outerContainer.clientWidth;
  }

  _updateWidth(width = 0) {
    const maxWidth = Math.floor(this.outerContainerWidth / 2);

    if (width &gt; maxWidth) {
      width = maxWidth;
    }

    if (width &lt; SIDEBAR_MIN_WIDTH) {
      width = SIDEBAR_MIN_WIDTH;
    }

    if (width === this._width) {
      return false;
    }

    this._width = width;

    _ui_utils.docStyle.setProperty(SIDEBAR_WIDTH_VAR, `${width}px`);

    return true;
  }

  _mouseMove(evt) {
    let width = evt.clientX;

    if (this.isRTL) {
      width = this.outerContainerWidth - width;
    }

    this._updateWidth(width);
  }

  _mouseUp(evt) {
    this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
    this.eventBus.dispatch(&quot;resize&quot;, {
      source: this
    });
    const _boundEvents = this._boundEvents;
    window.removeEventListener(&quot;mousemove&quot;, _boundEvents.mouseMove);
    window.removeEventListener(&quot;mouseup&quot;, _boundEvents.mouseUp);
  }

  _addEventListeners() {
    const _boundEvents = this._boundEvents;
    _boundEvents.mouseMove = this._mouseMove.bind(this);
    _boundEvents.mouseUp = this._mouseUp.bind(this);
    this.resizer.addEventListener(&quot;mousedown&quot;, evt =&gt; {
      if (evt.button !== 0) {
        return;
      }

      this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);
      window.addEventListener(&quot;mousemove&quot;, _boundEvents.mouseMove);
      window.addEventListener(&quot;mouseup&quot;, _boundEvents.mouseUp);
    });

    this.eventBus._on(&quot;sidebarviewchanged&quot;, evt =&gt; {
      this.sidebarOpen = !!evt?.view;
    });

    this.eventBus._on(&quot;resize&quot;, evt =&gt; {
      if (evt?.source !== window) {
        return;
      }

      this._outerContainerWidth = null;

      if (!this._width) {
        return;
      }

      if (!this.sidebarOpen) {
        this._updateWidth(this._width);

        return;
      }

      this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);

      const updated = this._updateWidth(this._width);

      Promise.resolve().then(() =&gt; {
        this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);

        if (updated) {
          this.eventBus.dispatch(&quot;resize&quot;, {
            source: this
          });
        }
      });
    });
  }

}

exports.PDFSidebarResizer = PDFSidebarResizer;

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFThumbnailViewer = void 0;

var _ui_utils = __webpack_require__(1);

var _pdf_thumbnail_view = __webpack_require__(27);

const THUMBNAIL_SCROLL_MARGIN = -19;
const THUMBNAIL_SELECTED_CLASS = &quot;selected&quot;;

class PDFThumbnailViewer {
  constructor({
    container,
    eventBus,
    linkService,
    renderingQueue,
    l10n,
    pageColors
  }) {
    this.container = container;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.l10n = l10n;
    this.pageColors = pageColors || null;

    if (this.pageColors &amp;&amp; !(CSS.supports(&quot;color&quot;, this.pageColors.background) &amp;&amp; CSS.supports(&quot;color&quot;, this.pageColors.foreground))) {
      if (this.pageColors.background || this.pageColors.foreground) {
        console.warn(&quot;PDFThumbnailViewer: Ignoring `pageColors`-option, since the browser doesn&apos;t support the values used.&quot;);
      }

      this.pageColors = null;
    }

    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdated.bind(this));

    this._resetView();
  }

  _scrollUpdated() {
    this.renderingQueue.renderHighestPriority();
  }

  getThumbnail(index) {
    return this._thumbnails[index];
  }

  _getVisibleThumbs() {
    return (0, _ui_utils.getVisibleElements)({
      scrollEl: this.container,
      views: this._thumbnails
    });
  }

  scrollThumbnailIntoView(pageNumber) {
    if (!this.pdfDocument) {
      return;
    }

    const thumbnailView = this._thumbnails[pageNumber - 1];

    if (!thumbnailView) {
      console.error(&apos;scrollThumbnailIntoView: Invalid &quot;pageNumber&quot; parameter.&apos;);
      return;
    }

    if (pageNumber !== this._currentPageNumber) {
      const prevThumbnailView = this._thumbnails[this._currentPageNumber - 1];
      prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }

    const {
      first,
      last,
      views
    } = this._getVisibleThumbs();

    if (views.length &gt; 0) {
      let shouldScroll = false;

      if (pageNumber &lt;= first.id || pageNumber &gt;= last.id) {
        shouldScroll = true;
      } else {
        for (const {
          id,
          percent
        } of views) {
          if (id !== pageNumber) {
            continue;
          }

          shouldScroll = percent &lt; 100;
          break;
        }
      }

      if (shouldScroll) {
        (0, _ui_utils.scrollIntoView)(thumbnailView.div, {
          top: THUMBNAIL_SCROLL_MARGIN
        });
      }
    }

    this._currentPageNumber = pageNumber;
  }

  get pagesRotation() {
    return this._pagesRotation;
  }

  set pagesRotation(rotation) {
    if (!(0, _ui_utils.isValidRotation)(rotation)) {
      throw new Error(&quot;Invalid thumbnails rotation angle.&quot;);
    }

    if (!this.pdfDocument) {
      return;
    }

    if (this._pagesRotation === rotation) {
      return;
    }

    this._pagesRotation = rotation;
    const updateArgs = {
      rotation
    };

    for (const thumbnail of this._thumbnails) {
      thumbnail.update(updateArgs);
    }
  }

  cleanup() {
    for (const thumbnail of this._thumbnails) {
      if (thumbnail.renderingState !== _ui_utils.RenderingStates.FINISHED) {
        thumbnail.reset();
      }
    }

    _pdf_thumbnail_view.TempImageFactory.destroyCanvas();
  }

  _resetView() {
    this._thumbnails = [];
    this._currentPageNumber = 1;
    this._pageLabels = null;
    this._pagesRotation = 0;
    this.container.textContent = &quot;&quot;;
  }

  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      this._cancelRendering();

      this._resetView();
    }

    this.pdfDocument = pdfDocument;

    if (!pdfDocument) {
      return;
    }

    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
    firstPagePromise.then(firstPdfPage =&gt; {
      const pagesCount = pdfDocument.numPages;
      const viewport = firstPdfPage.getViewport({
        scale: 1
      });

      for (let pageNum = 1; pageNum &lt;= pagesCount; ++pageNum) {
        const thumbnail = new _pdf_thumbnail_view.PDFThumbnailView({
          container: this.container,
          id: pageNum,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          linkService: this.linkService,
          renderingQueue: this.renderingQueue,
          l10n: this.l10n,
          pageColors: this.pageColors
        });

        this._thumbnails.push(thumbnail);
      }

      this._thumbnails[0]?.setPdfPage(firstPdfPage);
      const thumbnailView = this._thumbnails[this._currentPageNumber - 1];
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }).catch(reason =&gt; {
      console.error(&quot;Unable to initialize thumbnail viewer&quot;, reason);
    });
  }

  _cancelRendering() {
    for (const thumbnail of this._thumbnails) {
      thumbnail.cancelRendering();
    }
  }

  setPageLabels(labels) {
    if (!this.pdfDocument) {
      return;
    }

    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) &amp;&amp; this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error(&quot;PDFThumbnailViewer_setPageLabels: Invalid page labels.&quot;);
    } else {
      this._pageLabels = labels;
    }

    for (let i = 0, ii = this._thumbnails.length; i &lt; ii; i++) {
      this._thumbnails[i].setPageLabel(this._pageLabels?.[i] ?? null);
    }
  }

  async #ensurePdfPageLoaded(thumbView) {
    if (thumbView.pdfPage) {
      return thumbView.pdfPage;
    }

    try {
      const pdfPage = await this.pdfDocument.getPage(thumbView.id);

      if (!thumbView.pdfPage) {
        thumbView.setPdfPage(pdfPage);
      }

      return pdfPage;
    } catch (reason) {
      console.error(&quot;Unable to get page for thumb view&quot;, reason);
      return null;
    }
  }

  #getScrollAhead(visible) {
    if (visible.first?.id === 1) {
      return true;
    } else if (visible.last?.id === this._thumbnails.length) {
      return false;
    }

    return this.scroll.down;
  }

  forceRendering() {
    const visibleThumbs = this._getVisibleThumbs();

    const scrollAhead = this.#getScrollAhead(visibleThumbs);
    const thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this._thumbnails, scrollAhead);

    if (thumbView) {
      this.#ensurePdfPageLoaded(thumbView).then(() =&gt; {
        this.renderingQueue.renderView(thumbView);
      });
      return true;
    }

    return false;
  }

}

exports.PDFThumbnailViewer = PDFThumbnailViewer;

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.TempImageFactory = exports.PDFThumbnailView = void 0;

var _ui_utils = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(5);

const DRAW_UPSCALE_FACTOR = 2;
const MAX_NUM_SCALING_STEPS = 3;
const THUMBNAIL_CANVAS_BORDER_WIDTH = 1;
const THUMBNAIL_WIDTH = 98;

class TempImageFactory {
  static #tempCanvas = null;

  static getCanvas(width, height) {
    const tempCanvas = this.#tempCanvas ||= document.createElement(&quot;canvas&quot;);
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext(&quot;2d&quot;, {
      alpha: false
    });
    ctx.save();
    ctx.fillStyle = &quot;rgb(255, 255, 255)&quot;;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    return [tempCanvas, tempCanvas.getContext(&quot;2d&quot;)];
  }

  static destroyCanvas() {
    const tempCanvas = this.#tempCanvas;

    if (tempCanvas) {
      tempCanvas.width = 0;
      tempCanvas.height = 0;
    }

    this.#tempCanvas = null;
  }

}

exports.TempImageFactory = TempImageFactory;

class PDFThumbnailView {
  constructor({
    container,
    id,
    defaultViewport,
    optionalContentConfigPromise,
    linkService,
    renderingQueue,
    l10n,
    pageColors
  }) {
    this.id = id;
    this.renderingId = &quot;thumbnail&quot; + id;
    this.pageLabel = null;
    this.pdfPage = null;
    this.rotation = 0;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = optionalContentConfigPromise || null;
    this.pageColors = pageColors || null;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.renderTask = null;
    this.renderingState = _ui_utils.RenderingStates.INITIAL;
    this.resume = null;
    const pageWidth = this.viewport.width,
          pageHeight = this.viewport.height,
          pageRatio = pageWidth / pageHeight;
    this.canvasWidth = THUMBNAIL_WIDTH;
    this.canvasHeight = this.canvasWidth / pageRatio | 0;
    this.scale = this.canvasWidth / pageWidth;
    this.l10n = l10n;
    const anchor = document.createElement(&quot;a&quot;);
    anchor.href = linkService.getAnchorUrl(&quot;#page=&quot; + id);

    this._thumbPageTitle.then(msg =&gt; {
      anchor.title = msg;
    });

    anchor.onclick = function () {
      linkService.goToPage(id);
      return false;
    };

    this.anchor = anchor;
    const div = document.createElement(&quot;div&quot;);
    div.className = &quot;thumbnail&quot;;
    div.setAttribute(&quot;data-page-number&quot;, this.id);
    this.div = div;
    const ring = document.createElement(&quot;div&quot;);
    ring.className = &quot;thumbnailSelectionRing&quot;;
    const borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
    ring.style.width = this.canvasWidth + borderAdjustment + &quot;px&quot;;
    ring.style.height = this.canvasHeight + borderAdjustment + &quot;px&quot;;
    this.ring = ring;
    div.append(ring);
    anchor.append(div);
    container.append(anchor);
  }

  setPdfPage(pdfPage) {
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }

  reset() {
    this.cancelRendering();
    this.renderingState = _ui_utils.RenderingStates.INITIAL;
    const pageWidth = this.viewport.width,
          pageHeight = this.viewport.height,
          pageRatio = pageWidth / pageHeight;
    this.canvasHeight = this.canvasWidth / pageRatio | 0;
    this.scale = this.canvasWidth / pageWidth;
    this.div.removeAttribute(&quot;data-loaded&quot;);
    const ring = this.ring;
    ring.textContent = &quot;&quot;;
    const borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
    ring.style.width = this.canvasWidth + borderAdjustment + &quot;px&quot;;
    ring.style.height = this.canvasHeight + borderAdjustment + &quot;px&quot;;

    if (this.canvas) {
      this.canvas.width = 0;
      this.canvas.height = 0;
      delete this.canvas;
    }

    if (this.image) {
      this.image.removeAttribute(&quot;src&quot;);
      delete this.image;
    }
  }

  update({
    rotation = null
  }) {
    if (typeof rotation === &quot;number&quot;) {
      this.rotation = rotation;
    }

    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }

  cancelRendering() {
    if (this.renderTask) {
      this.renderTask.cancel();
      this.renderTask = null;
    }

    this.resume = null;
  }

  _getPageDrawContext(upscaleFactor = 1) {
    const canvas = document.createElement(&quot;canvas&quot;);
    const ctx = canvas.getContext(&quot;2d&quot;, {
      alpha: false
    });
    const outputScale = new _ui_utils.OutputScale();
    canvas.width = upscaleFactor * this.canvasWidth * outputScale.sx | 0;
    canvas.height = upscaleFactor * this.canvasHeight * outputScale.sy | 0;
    const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
    return {
      ctx,
      canvas,
      transform
    };
  }

  _convertCanvasToImage(canvas) {
    if (this.renderingState !== _ui_utils.RenderingStates.FINISHED) {
      throw new Error(&quot;_convertCanvasToImage: Rendering has not finished.&quot;);
    }

    const reducedCanvas = this._reduceImage(canvas);

    const image = document.createElement(&quot;img&quot;);
    image.className = &quot;thumbnailImage&quot;;

    this._thumbPageCanvas.then(msg =&gt; {
      image.setAttribute(&quot;aria-label&quot;, msg);
    });

    image.style.width = this.canvasWidth + &quot;px&quot;;
    image.style.height = this.canvasHeight + &quot;px&quot;;
    image.src = reducedCanvas.toDataURL();
    this.image = image;
    this.div.setAttribute(&quot;data-loaded&quot;, true);
    this.ring.append(image);
    reducedCanvas.width = 0;
    reducedCanvas.height = 0;
  }

  draw() {
    if (this.renderingState !== _ui_utils.RenderingStates.INITIAL) {
      console.error(&quot;Must be in new state before drawing&quot;);
      return Promise.resolve();
    }

    const {
      pdfPage
    } = this;

    if (!pdfPage) {
      this.renderingState = _ui_utils.RenderingStates.FINISHED;
      return Promise.reject(new Error(&quot;pdfPage is not loaded&quot;));
    }

    this.renderingState = _ui_utils.RenderingStates.RUNNING;

    const finishRenderTask = async (error = null) =&gt; {
      if (renderTask === this.renderTask) {
        this.renderTask = null;
      }

      if (error instanceof _pdfjsLib.RenderingCancelledException) {
        return;
      }

      this.renderingState = _ui_utils.RenderingStates.FINISHED;

      this._convertCanvasToImage(canvas);

      if (error) {
        throw error;
      }
    };

    const {
      ctx,
      canvas,
      transform
    } = this._getPageDrawContext(DRAW_UPSCALE_FACTOR);

    const drawViewport = this.viewport.clone({
      scale: DRAW_UPSCALE_FACTOR * this.scale
    });

    const renderContinueCallback = cont =&gt; {
      if (!this.renderingQueue.isHighestPriority(this)) {
        this.renderingState = _ui_utils.RenderingStates.PAUSED;

        this.resume = () =&gt; {
          this.renderingState = _ui_utils.RenderingStates.RUNNING;
          cont();
        };

        return;
      }

      cont();
    };

    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport: drawViewport,
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      pageColors: this.pageColors
    };
    const renderTask = this.renderTask = pdfPage.render(renderContext);
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then(function () {
      return finishRenderTask(null);
    }, function (error) {
      return finishRenderTask(error);
    });
    resultPromise.finally(() =&gt; {
      canvas.width = 0;
      canvas.height = 0;
      const pageCached = this.linkService.isPageCached(this.id);

      if (!pageCached) {
        this.pdfPage?.cleanup();
      }
    });
    return resultPromise;
  }

  setImage(pageView) {
    if (this.renderingState !== _ui_utils.RenderingStates.INITIAL) {
      return;
    }

    const {
      thumbnailCanvas: canvas,
      pdfPage,
      scale
    } = pageView;

    if (!canvas) {
      return;
    }

    if (!this.pdfPage) {
      this.setPdfPage(pdfPage);
    }

    if (scale &lt; this.scale) {
      return;
    }

    this.renderingState = _ui_utils.RenderingStates.FINISHED;

    this._convertCanvasToImage(canvas);
  }

  _reduceImage(img) {
    const {
      ctx,
      canvas
    } = this._getPageDrawContext();

    if (img.width &lt;= 2 * canvas.width) {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      return canvas;
    }

    let reducedWidth = canvas.width &lt;&lt; MAX_NUM_SCALING_STEPS;
    let reducedHeight = canvas.height &lt;&lt; MAX_NUM_SCALING_STEPS;
    const [reducedImage, reducedImageCtx] = TempImageFactory.getCanvas(reducedWidth, reducedHeight);

    while (reducedWidth &gt; img.width || reducedHeight &gt; img.height) {
      reducedWidth &gt;&gt;= 1;
      reducedHeight &gt;&gt;= 1;
    }

    reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);

    while (reducedWidth &gt; 2 * canvas.width) {
      reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth &gt;&gt; 1, reducedHeight &gt;&gt; 1);
      reducedWidth &gt;&gt;= 1;
      reducedHeight &gt;&gt;= 1;
    }

    ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  get _thumbPageTitle() {
    return this.l10n.get(&quot;thumb_page_title&quot;, {
      page: this.pageLabel ?? this.id
    });
  }

  get _thumbPageCanvas() {
    return this.l10n.get(&quot;thumb_page_canvas&quot;, {
      page: this.pageLabel ?? this.id
    });
  }

  setPageLabel(label) {
    this.pageLabel = typeof label === &quot;string&quot; ? label : null;

    this._thumbPageTitle.then(msg =&gt; {
      this.anchor.title = msg;
    });

    if (this.renderingState !== _ui_utils.RenderingStates.FINISHED) {
      return;
    }

    this._thumbPageCanvas.then(msg =&gt; {
      this.image?.setAttribute(&quot;aria-label&quot;, msg);
    });
  }

}

exports.PDFThumbnailView = PDFThumbnailView;

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PagesCountLimit = exports.PDFViewer = exports.PDFPageViewBuffer = void 0;

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(1);

var _annotation_editor_layer_builder = __webpack_require__(29);

var _annotation_layer_builder = __webpack_require__(31);

var _l10n_utils = __webpack_require__(30);

var _pdf_page_view = __webpack_require__(32);

var _pdf_rendering_queue = __webpack_require__(22);

var _pdf_link_service = __webpack_require__(3);

var _struct_tree_layer_builder = __webpack_require__(34);

var _text_highlighter = __webpack_require__(35);

var _text_layer_builder = __webpack_require__(36);

var _xfa_layer_builder = __webpack_require__(37);

const DEFAULT_CACHE_SIZE = 10;
const ENABLE_PERMISSIONS_CLASS = &quot;enablePermissions&quot;;
const PagesCountLimit = {
  FORCE_SCROLL_MODE_PAGE: 15000,
  FORCE_LAZY_PAGE_INIT: 7500,
  PAUSE_EAGER_PAGE_INIT: 250
};
exports.PagesCountLimit = PagesCountLimit;

function isValidAnnotationEditorMode(mode) {
  return Object.values(_pdfjsLib.AnnotationEditorType).includes(mode) &amp;&amp; mode !== _pdfjsLib.AnnotationEditorType.DISABLE;
}

class PDFPageViewBuffer {
  #buf = new Set();
  #size = 0;

  constructor(size) {
    this.#size = size;
  }

  push(view) {
    const buf = this.#buf;

    if (buf.has(view)) {
      buf.delete(view);
    }

    buf.add(view);

    if (buf.size &gt; this.#size) {
      this.#destroyFirstView();
    }
  }

  resize(newSize, idsToKeep = null) {
    this.#size = newSize;
    const buf = this.#buf;

    if (idsToKeep) {
      const ii = buf.size;
      let i = 1;

      for (const view of buf) {
        if (idsToKeep.has(view.id)) {
          buf.delete(view);
          buf.add(view);
        }

        if (++i &gt; ii) {
          break;
        }
      }
    }

    while (buf.size &gt; this.#size) {
      this.#destroyFirstView();
    }
  }

  has(view) {
    return this.#buf.has(view);
  }

  [Symbol.iterator]() {
    return this.#buf.keys();
  }

  #destroyFirstView() {
    const firstView = this.#buf.keys().next().value;
    firstView?.destroy();
    this.#buf.delete(firstView);
  }

}

exports.PDFPageViewBuffer = PDFPageViewBuffer;

class PDFViewer {
  #buffer = null;
  #annotationEditorMode = _pdfjsLib.AnnotationEditorType.NONE;
  #annotationEditorUIManager = null;
  #annotationMode = _pdfjsLib.AnnotationMode.ENABLE_FORMS;
  #enablePermissions = false;
  #previousContainerHeight = 0;
  #scrollModePageState = null;
  #onVisibilityChange = null;

  constructor(options) {
    const viewerVersion = &apos;3.0.0&apos;;

    if (_pdfjsLib.version !== viewerVersion) {
      throw new Error(`The API version &quot;${_pdfjsLib.version}&quot; does not match the Viewer version &quot;${viewerVersion}&quot;.`);
    }

    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;

    if (!(this.container?.tagName.toUpperCase() === &quot;DIV&quot; &amp;&amp; this.viewer?.tagName.toUpperCase() === &quot;DIV&quot;)) {
      throw new Error(&quot;Invalid `container` and/or `viewer` option.&quot;);
    }

    if (this.container.offsetParent &amp;&amp; getComputedStyle(this.container).position !== &quot;absolute&quot;) {
      throw new Error(&quot;The `container` must be absolutely positioned.&quot;);
    }

    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new _pdf_link_service.SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    this._scriptingManager = options.scriptingManager || null;
    this.removePageBorders = options.removePageBorders || false;
    this.textLayerMode = options.textLayerMode ?? _ui_utils.TextLayerMode.ENABLE;
    this.#annotationMode = options.annotationMode ?? _pdfjsLib.AnnotationMode.ENABLE_FORMS;
    this.#annotationEditorMode = options.annotationEditorMode ?? _pdfjsLib.AnnotationEditorType.NONE;
    this.imageResourcesPath = options.imageResourcesPath || &quot;&quot;;
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n || _l10n_utils.NullL10n;
    this.#enablePermissions = options.enablePermissions || false;
    this.pageColors = options.pageColors || null;

    if (this.pageColors &amp;&amp; !(CSS.supports(&quot;color&quot;, this.pageColors.background) &amp;&amp; CSS.supports(&quot;color&quot;, this.pageColors.foreground))) {
      if (this.pageColors.background || this.pageColors.foreground) {
        console.warn(&quot;PDFViewer: Ignoring `pageColors`-option, since the browser doesn&apos;t support the values used.&quot;);
      }

      this.pageColors = null;
    }

    this.defaultRenderingQueue = !options.renderingQueue;

    if (this.defaultRenderingQueue) {
      this.renderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = options.renderingQueue;
    }

    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdate.bind(this));
    this.presentationModeState = _ui_utils.PresentationModeState.UNKNOWN;
    this._onBeforeDraw = this._onAfterDraw = null;

    this._resetView();

    if (this.removePageBorders) {
      this.viewer.classList.add(&quot;removePageBorders&quot;);
    }

    this.updateContainerHeightCss();
  }

  get pagesCount() {
    return this._pages.length;
  }

  getPageView(index) {
    return this._pages[index];
  }

  get pageViewsReady() {
    if (!this._pagesCapability.settled) {
      return false;
    }

    return this._pages.every(function (pageView) {
      return pageView?.pdfPage;
    });
  }

  get renderForms() {
    return this.#annotationMode === _pdfjsLib.AnnotationMode.ENABLE_FORMS;
  }

  get enableScripting() {
    return !!this._scriptingManager;
  }

  get currentPageNumber() {
    return this._currentPageNumber;
  }

  set currentPageNumber(val) {
    if (!Number.isInteger(val)) {
      throw new Error(&quot;Invalid page number.&quot;);
    }

    if (!this.pdfDocument) {
      return;
    }

    if (!this._setCurrentPageNumber(val, true)) {
      console.error(`currentPageNumber: &quot;${val}&quot; is not a valid page.`);
    }
  }

  _setCurrentPageNumber(val, resetCurrentPageView = false) {
    if (this._currentPageNumber === val) {
      if (resetCurrentPageView) {
        this.#resetCurrentPageView();
      }

      return true;
    }

    if (!(0 &lt; val &amp;&amp; val &lt;= this.pagesCount)) {
      return false;
    }

    const previous = this._currentPageNumber;
    this._currentPageNumber = val;
    this.eventBus.dispatch(&quot;pagechanging&quot;, {
      source: this,
      pageNumber: val,
      pageLabel: this._pageLabels?.[val - 1] ?? null,
      previous
    });

    if (resetCurrentPageView) {
      this.#resetCurrentPageView();
    }

    return true;
  }

  get currentPageLabel() {
    return this._pageLabels?.[this._currentPageNumber - 1] ?? null;
  }

  set currentPageLabel(val) {
    if (!this.pdfDocument) {
      return;
    }

    let page = val | 0;

    if (this._pageLabels) {
      const i = this._pageLabels.indexOf(val);

      if (i &gt;= 0) {
        page = i + 1;
      }
    }

    if (!this._setCurrentPageNumber(page, true)) {
      console.error(`currentPageLabel: &quot;${val}&quot; is not a valid page.`);
    }
  }

  get currentScale() {
    return this._currentScale !== _ui_utils.UNKNOWN_SCALE ? this._currentScale : _ui_utils.DEFAULT_SCALE;
  }

  set currentScale(val) {
    if (isNaN(val)) {
      throw new Error(&quot;Invalid numeric scale.&quot;);
    }

    if (!this.pdfDocument) {
      return;
    }

    this._setScale(val, false);
  }

  get currentScaleValue() {
    return this._currentScaleValue;
  }

  set currentScaleValue(val) {
    if (!this.pdfDocument) {
      return;
    }

    this._setScale(val, false);
  }

  get pagesRotation() {
    return this._pagesRotation;
  }

  set pagesRotation(rotation) {
    if (!(0, _ui_utils.isValidRotation)(rotation)) {
      throw new Error(&quot;Invalid pages rotation angle.&quot;);
    }

    if (!this.pdfDocument) {
      return;
    }

    rotation %= 360;

    if (rotation &lt; 0) {
      rotation += 360;
    }

    if (this._pagesRotation === rotation) {
      return;
    }

    this._pagesRotation = rotation;
    const pageNumber = this._currentPageNumber;
    const updateArgs = {
      rotation
    };

    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }

    if (this._currentScaleValue) {
      this._setScale(this._currentScaleValue, true);
    }

    this.eventBus.dispatch(&quot;rotationchanging&quot;, {
      source: this,
      pagesRotation: rotation,
      pageNumber
    });

    if (this.defaultRenderingQueue) {
      this.update();
    }
  }

  get firstPagePromise() {
    return this.pdfDocument ? this._firstPageCapability.promise : null;
  }

  get onePageRendered() {
    return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
  }

  get pagesPromise() {
    return this.pdfDocument ? this._pagesCapability.promise : null;
  }

  #initializePermissions(permissions) {
    const params = {
      annotationEditorMode: this.#annotationEditorMode,
      annotationMode: this.#annotationMode,
      textLayerMode: this.textLayerMode
    };

    if (!permissions) {
      return params;
    }

    if (!permissions.includes(_pdfjsLib.PermissionFlag.COPY)) {
      this.viewer.classList.add(ENABLE_PERMISSIONS_CLASS);
    }

    if (!permissions.includes(_pdfjsLib.PermissionFlag.MODIFY_CONTENTS)) {
      params.annotationEditorMode = _pdfjsLib.AnnotationEditorType.DISABLE;
    }

    if (!permissions.includes(_pdfjsLib.PermissionFlag.MODIFY_ANNOTATIONS) &amp;&amp; !permissions.includes(_pdfjsLib.PermissionFlag.FILL_INTERACTIVE_FORMS) &amp;&amp; this.#annotationMode === _pdfjsLib.AnnotationMode.ENABLE_FORMS) {
      params.annotationMode = _pdfjsLib.AnnotationMode.ENABLE;
    }

    return params;
  }

  #onePageRenderedOrForceFetch() {
    if (document.visibilityState === &quot;hidden&quot; || !this.container.offsetParent || this._getVisiblePages().views.length === 0) {
      return Promise.resolve();
    }

    const visibilityChangePromise = new Promise(resolve =&gt; {
      this.#onVisibilityChange = () =&gt; {
        if (document.visibilityState !== &quot;hidden&quot;) {
          return;
        }

        resolve();
        document.removeEventListener(&quot;visibilitychange&quot;, this.#onVisibilityChange);
        this.#onVisibilityChange = null;
      };

      document.addEventListener(&quot;visibilitychange&quot;, this.#onVisibilityChange);
    });
    return Promise.race([this._onePageRenderedCapability.promise, visibilityChangePromise]);
  }

  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      this.eventBus.dispatch(&quot;pagesdestroy&quot;, {
        source: this
      });

      this._cancelRendering();

      this._resetView();

      this.findController?.setDocument(null);
      this._scriptingManager?.setDocument(null);

      if (this.#annotationEditorUIManager) {
        this.#annotationEditorUIManager.destroy();
        this.#annotationEditorUIManager = null;
      }
    }

    this.pdfDocument = pdfDocument;

    if (!pdfDocument) {
      return;
    }

    const isPureXfa = pdfDocument.isPureXfa;
    const pagesCount = pdfDocument.numPages;
    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
    const permissionsPromise = this.#enablePermissions ? pdfDocument.getPermissions() : Promise.resolve();

    if (pagesCount &gt; PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      console.warn(&quot;Forcing PAGE-scrolling for performance reasons, given the length of the document.&quot;);
      const mode = this._scrollMode = _ui_utils.ScrollMode.PAGE;
      this.eventBus.dispatch(&quot;scrollmodechanged&quot;, {
        source: this,
        mode
      });
    }

    this._pagesCapability.promise.then(() =&gt; {
      this.eventBus.dispatch(&quot;pagesloaded&quot;, {
        source: this,
        pagesCount
      });
    }, () =&gt; {});

    this._onBeforeDraw = evt =&gt; {
      const pageView = this._pages[evt.pageNumber - 1];

      if (!pageView) {
        return;
      }

      this.#buffer.push(pageView);
    };

    this.eventBus._on(&quot;pagerender&quot;, this._onBeforeDraw);

    this._onAfterDraw = evt =&gt; {
      if (evt.cssTransform || this._onePageRenderedCapability.settled) {
        return;
      }

      this._onePageRenderedCapability.resolve({
        timestamp: evt.timestamp
      });

      this.eventBus._off(&quot;pagerendered&quot;, this._onAfterDraw);

      this._onAfterDraw = null;

      if (this.#onVisibilityChange) {
        document.removeEventListener(&quot;visibilitychange&quot;, this.#onVisibilityChange);
        this.#onVisibilityChange = null;
      }
    };

    this.eventBus._on(&quot;pagerendered&quot;, this._onAfterDraw);

    Promise.all([firstPagePromise, permissionsPromise]).then(([firstPdfPage, permissions]) =&gt; {
      if (pdfDocument !== this.pdfDocument) {
        return;
      }

      this._firstPageCapability.resolve(firstPdfPage);

      this._optionalContentConfigPromise = optionalContentConfigPromise;
      const {
        annotationEditorMode,
        annotationMode,
        textLayerMode
      } = this.#initializePermissions(permissions);

      if (annotationEditorMode !== _pdfjsLib.AnnotationEditorType.DISABLE) {
        const mode = annotationEditorMode;

        if (isPureXfa) {
          console.warn(&quot;Warning: XFA-editing is not implemented.&quot;);
        } else if (isValidAnnotationEditorMode(mode)) {
          this.#annotationEditorUIManager = new _pdfjsLib.AnnotationEditorUIManager(this.container, this.eventBus);

          if (mode !== _pdfjsLib.AnnotationEditorType.NONE) {
            this.#annotationEditorUIManager.updateMode(mode);
          }
        } else {
          console.error(`Invalid AnnotationEditor mode: ${mode}`);
        }
      }

      const viewerElement = this._scrollMode === _ui_utils.ScrollMode.PAGE ? null : this.viewer;
      const scale = this.currentScale;
      const viewport = firstPdfPage.getViewport({
        scale: scale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS
      });
      const textLayerFactory = textLayerMode !== _ui_utils.TextLayerMode.DISABLE &amp;&amp; !isPureXfa ? this : null;
      const annotationLayerFactory = annotationMode !== _pdfjsLib.AnnotationMode.DISABLE ? this : null;
      const xfaLayerFactory = isPureXfa ? this : null;
      const annotationEditorLayerFactory = this.#annotationEditorUIManager ? this : null;

      for (let pageNum = 1; pageNum &lt;= pagesCount; ++pageNum) {
        const pageView = new _pdf_page_view.PDFPageView({
          container: viewerElement,
          eventBus: this.eventBus,
          id: pageNum,
          scale,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          renderingQueue: this.renderingQueue,
          textLayerFactory,
          textLayerMode,
          annotationLayerFactory,
          annotationMode,
          xfaLayerFactory,
          annotationEditorLayerFactory,
          textHighlighterFactory: this,
          structTreeLayerFactory: this,
          imageResourcesPath: this.imageResourcesPath,
          renderer: this.renderer,
          useOnlyCssZoom: this.useOnlyCssZoom,
          maxCanvasPixels: this.maxCanvasPixels,
          pageColors: this.pageColors,
          l10n: this.l10n
        });

        this._pages.push(pageView);
      }

      const firstPageView = this._pages[0];

      if (firstPageView) {
        firstPageView.setPdfPage(firstPdfPage);
        this.linkService.cachePageRef(1, firstPdfPage.ref);
      }

      if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
        this.#ensurePageViewVisible();
      } else if (this._spreadMode !== _ui_utils.SpreadMode.NONE) {
        this._updateSpreadMode();
      }

      this.#onePageRenderedOrForceFetch().then(async () =&gt; {
        this.findController?.setDocument(pdfDocument);
        this._scriptingManager?.setDocument(pdfDocument);

        if (this.#annotationEditorUIManager) {
          this.eventBus.dispatch(&quot;annotationeditormodechanged&quot;, {
            source: this,
            mode: this.#annotationEditorMode
          });
        }

        if (pdfDocument.loadingParams.disableAutoFetch || pagesCount &gt; PagesCountLimit.FORCE_LAZY_PAGE_INIT) {
          this._pagesCapability.resolve();

          return;
        }

        let getPagesLeft = pagesCount - 1;

        if (getPagesLeft &lt;= 0) {
          this._pagesCapability.resolve();

          return;
        }

        for (let pageNum = 2; pageNum &lt;= pagesCount; ++pageNum) {
          const promise = pdfDocument.getPage(pageNum).then(pdfPage =&gt; {
            const pageView = this._pages[pageNum - 1];

            if (!pageView.pdfPage) {
              pageView.setPdfPage(pdfPage);
            }

            this.linkService.cachePageRef(pageNum, pdfPage.ref);

            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          }, reason =&gt; {
            console.error(`Unable to get page ${pageNum} to initialize viewer`, reason);

            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          });

          if (pageNum % PagesCountLimit.PAUSE_EAGER_PAGE_INIT === 0) {
            await promise;
          }
        }
      });
      this.eventBus.dispatch(&quot;pagesinit&quot;, {
        source: this
      });
      pdfDocument.getMetadata().then(({
        info
      }) =&gt; {
        if (pdfDocument !== this.pdfDocument) {
          return;
        }

        if (info.Language) {
          this.viewer.lang = info.Language;
        }
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }).catch(reason =&gt; {
      console.error(&quot;Unable to initialize viewer&quot;, reason);

      this._pagesCapability.reject(reason);
    });
  }

  setPageLabels(labels) {
    if (!this.pdfDocument) {
      return;
    }

    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) &amp;&amp; this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error(`setPageLabels: Invalid page labels.`);
    } else {
      this._pageLabels = labels;
    }

    for (let i = 0, ii = this._pages.length; i &lt; ii; i++) {
      this._pages[i].setPageLabel(this._pageLabels?.[i] ?? null);
    }
  }

  _resetView() {
    this._pages = [];
    this._currentPageNumber = 1;
    this._currentScale = _ui_utils.UNKNOWN_SCALE;
    this._currentScaleValue = null;
    this._pageLabels = null;
    this.#buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
    this._location = null;
    this._pagesRotation = 0;
    this._optionalContentConfigPromise = null;
    this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._onePageRenderedCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._pagesCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._scrollMode = _ui_utils.ScrollMode.VERTICAL;
    this._previousScrollMode = _ui_utils.ScrollMode.UNKNOWN;
    this._spreadMode = _ui_utils.SpreadMode.NONE;
    this.#scrollModePageState = {
      previousPageNumber: 1,
      scrollDown: true,
      pages: []
    };

    if (this._onBeforeDraw) {
      this.eventBus._off(&quot;pagerender&quot;, this._onBeforeDraw);

      this._onBeforeDraw = null;
    }

    if (this._onAfterDraw) {
      this.eventBus._off(&quot;pagerendered&quot;, this._onAfterDraw);

      this._onAfterDraw = null;
    }

    if (this.#onVisibilityChange) {
      document.removeEventListener(&quot;visibilitychange&quot;, this.#onVisibilityChange);
      this.#onVisibilityChange = null;
    }

    this.viewer.textContent = &quot;&quot;;

    this._updateScrollMode();

    this.viewer.removeAttribute(&quot;lang&quot;);
    this.viewer.classList.remove(ENABLE_PERMISSIONS_CLASS);
  }

  #ensurePageViewVisible() {
    if (this._scrollMode !== _ui_utils.ScrollMode.PAGE) {
      throw new Error(&quot;#ensurePageViewVisible: Invalid scrollMode value.&quot;);
    }

    const pageNumber = this._currentPageNumber,
          state = this.#scrollModePageState,
          viewer = this.viewer;
    viewer.textContent = &quot;&quot;;
    state.pages.length = 0;

    if (this._spreadMode === _ui_utils.SpreadMode.NONE &amp;&amp; !this.isInPresentationMode) {
      const pageView = this._pages[pageNumber - 1];
      viewer.append(pageView.div);
      state.pages.push(pageView);
    } else {
      const pageIndexSet = new Set(),
            parity = this._spreadMode - 1;

      if (parity === -1) {
        pageIndexSet.add(pageNumber - 1);
      } else if (pageNumber % 2 !== parity) {
        pageIndexSet.add(pageNumber - 1);
        pageIndexSet.add(pageNumber);
      } else {
        pageIndexSet.add(pageNumber - 2);
        pageIndexSet.add(pageNumber - 1);
      }

      const spread = document.createElement(&quot;div&quot;);
      spread.className = &quot;spread&quot;;

      if (this.isInPresentationMode) {
        const dummyPage = document.createElement(&quot;div&quot;);
        dummyPage.className = &quot;dummyPage&quot;;
        spread.append(dummyPage);
      }

      for (const i of pageIndexSet) {
        const pageView = this._pages[i];

        if (!pageView) {
          continue;
        }

        spread.append(pageView.div);
        state.pages.push(pageView);
      }

      viewer.append(spread);
    }

    state.scrollDown = pageNumber &gt;= state.previousPageNumber;
    state.previousPageNumber = pageNumber;
  }

  _scrollUpdate() {
    if (this.pagesCount === 0) {
      return;
    }

    this.update();
  }

  #scrollIntoView(pageView, pageSpot = null) {
    const {
      div,
      id
    } = pageView;

    if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
      this._setCurrentPageNumber(id);

      this.#ensurePageViewVisible();
      this.update();
    }

    if (!pageSpot &amp;&amp; !this.isInPresentationMode) {
      const left = div.offsetLeft + div.clientLeft,
            right = left + div.clientWidth;
      const {
        scrollLeft,
        clientWidth
      } = this.container;

      if (this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL || left &lt; scrollLeft || right &gt; scrollLeft + clientWidth) {
        pageSpot = {
          left: 0,
          top: 0
        };
      }
    }

    (0, _ui_utils.scrollIntoView)(div, pageSpot);
  }

  #isSameScale(newScale) {
    return newScale === this._currentScale || Math.abs(newScale - this._currentScale) &lt; 1e-15;
  }

  _setScaleUpdatePages(newScale, newValue, noScroll = false, preset = false) {
    this._currentScaleValue = newValue.toString();

    if (this.#isSameScale(newScale)) {
      if (preset) {
        this.eventBus.dispatch(&quot;scalechanging&quot;, {
          source: this,
          scale: newScale,
          presetValue: newValue
        });
      }

      return;
    }

    _ui_utils.docStyle.setProperty(&quot;--scale-factor&quot;, newScale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS);

    const updateArgs = {
      scale: newScale
    };

    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }

    this._currentScale = newScale;

    if (!noScroll) {
      let page = this._currentPageNumber,
          dest;

      if (this._location &amp;&amp; !(this.isInPresentationMode || this.isChangingPresentationMode)) {
        page = this._location.pageNumber;
        dest = [null, {
          name: &quot;XYZ&quot;
        }, this._location.left, this._location.top, null];
      }

      this.scrollPageIntoView({
        pageNumber: page,
        destArray: dest,
        allowNegativeOffset: true
      });
    }

    this.eventBus.dispatch(&quot;scalechanging&quot;, {
      source: this,
      scale: newScale,
      presetValue: preset ? newValue : undefined
    });

    if (this.defaultRenderingQueue) {
      this.update();
    }

    this.updateContainerHeightCss();
  }

  get _pageWidthScaleFactor() {
    if (this._spreadMode !== _ui_utils.SpreadMode.NONE &amp;&amp; this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL) {
      return 2;
    }

    return 1;
  }

  _setScale(value, noScroll = false) {
    let scale = parseFloat(value);

    if (scale &gt; 0) {
      this._setScaleUpdatePages(scale, value, noScroll, false);
    } else {
      const currentPage = this._pages[this._currentPageNumber - 1];

      if (!currentPage) {
        return;
      }

      let hPadding = _ui_utils.SCROLLBAR_PADDING,
          vPadding = _ui_utils.VERTICAL_PADDING;

      if (this.isInPresentationMode) {
        hPadding = vPadding = 4;
      } else if (this.removePageBorders) {
        hPadding = vPadding = 0;
      } else if (this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL) {
        [hPadding, vPadding] = [vPadding, hPadding];
      }

      const pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / this._pageWidthScaleFactor;
      const pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;

      switch (value) {
        case &quot;page-actual&quot;:
          scale = 1;
          break;

        case &quot;page-width&quot;:
          scale = pageWidthScale;
          break;

        case &quot;page-height&quot;:
          scale = pageHeightScale;
          break;

        case &quot;page-fit&quot;:
          scale = Math.min(pageWidthScale, pageHeightScale);
          break;

        case &quot;auto&quot;:
          const horizontalScale = (0, _ui_utils.isPortraitOrientation)(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
          scale = Math.min(_ui_utils.MAX_AUTO_SCALE, horizontalScale);
          break;

        default:
          console.error(`_setScale: &quot;${value}&quot; is an unknown zoom value.`);
          return;
      }

      this._setScaleUpdatePages(scale, value, noScroll, true);
    }
  }

  #resetCurrentPageView() {
    const pageView = this._pages[this._currentPageNumber - 1];

    if (this.isInPresentationMode) {
      this._setScale(this._currentScaleValue, true);
    }

    this.#scrollIntoView(pageView);
  }

  pageLabelToPageNumber(label) {
    if (!this._pageLabels) {
      return null;
    }

    const i = this._pageLabels.indexOf(label);

    if (i &lt; 0) {
      return null;
    }

    return i + 1;
  }

  scrollPageIntoView({
    pageNumber,
    destArray = null,
    allowNegativeOffset = false,
    ignoreDestinationZoom = false
  }) {
    if (!this.pdfDocument) {
      return;
    }

    const pageView = Number.isInteger(pageNumber) &amp;&amp; this._pages[pageNumber - 1];

    if (!pageView) {
      console.error(`scrollPageIntoView: &quot;${pageNumber}&quot; is not a valid pageNumber parameter.`);
      return;
    }

    if (this.isInPresentationMode || !destArray) {
      this._setCurrentPageNumber(pageNumber, true);

      return;
    }

    let x = 0,
        y = 0;
    let width = 0,
        height = 0,
        widthScale,
        heightScale;
    const changeOrientation = pageView.rotation % 180 !== 0;
    const pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
    const pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
    let scale = 0;

    switch (destArray[1].name) {
      case &quot;XYZ&quot;:
        x = destArray[2];
        y = destArray[3];
        scale = destArray[4];
        x = x !== null ? x : 0;
        y = y !== null ? y : pageHeight;
        break;

      case &quot;Fit&quot;:
      case &quot;FitB&quot;:
        scale = &quot;page-fit&quot;;
        break;

      case &quot;FitH&quot;:
      case &quot;FitBH&quot;:
        y = destArray[2];
        scale = &quot;page-width&quot;;

        if (y === null &amp;&amp; this._location) {
          x = this._location.left;
          y = this._location.top;
        } else if (typeof y !== &quot;number&quot; || y &lt; 0) {
          y = pageHeight;
        }

        break;

      case &quot;FitV&quot;:
      case &quot;FitBV&quot;:
        x = destArray[2];
        width = pageWidth;
        height = pageHeight;
        scale = &quot;page-height&quot;;
        break;

      case &quot;FitR&quot;:
        x = destArray[2];
        y = destArray[3];
        width = destArray[4] - x;
        height = destArray[5] - y;
        const hPadding = this.removePageBorders ? 0 : _ui_utils.SCROLLBAR_PADDING;
        const vPadding = this.removePageBorders ? 0 : _ui_utils.VERTICAL_PADDING;
        widthScale = (this.container.clientWidth - hPadding) / width / _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
        heightScale = (this.container.clientHeight - vPadding) / height / _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
        scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
        break;

      default:
        console.error(`scrollPageIntoView: &quot;${destArray[1].name}&quot; is not a valid destination type.`);
        return;
    }

    if (!ignoreDestinationZoom) {
      if (scale &amp;&amp; scale !== this._currentScale) {
        this.currentScaleValue = scale;
      } else if (this._currentScale === _ui_utils.UNKNOWN_SCALE) {
        this.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
      }
    }

    if (scale === &quot;page-fit&quot; &amp;&amp; !destArray[4]) {
      this.#scrollIntoView(pageView);
      return;
    }

    const boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
    let left = Math.min(boundingRect[0][0], boundingRect[1][0]);
    let top = Math.min(boundingRect[0][1], boundingRect[1][1]);

    if (!allowNegativeOffset) {
      left = Math.max(left, 0);
      top = Math.max(top, 0);
    }

    this.#scrollIntoView(pageView, {
      left,
      top
    });
  }

  _updateLocation(firstPage) {
    const currentScale = this._currentScale;
    const currentScaleValue = this._currentScaleValue;
    const normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
    const pageNumber = firstPage.id;
    const currentPageView = this._pages[pageNumber - 1];
    const container = this.container;
    const topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
    const intLeft = Math.round(topLeft[0]);
    const intTop = Math.round(topLeft[1]);
    let pdfOpenParams = `#page=${pageNumber}`;

    if (!this.isInPresentationMode) {
      pdfOpenParams += `&amp;zoom=${normalizedScaleValue},${intLeft},${intTop}`;
    }

    this._location = {
      pageNumber,
      scale: normalizedScaleValue,
      top: intTop,
      left: intLeft,
      rotation: this._pagesRotation,
      pdfOpenParams
    };
  }

  update() {
    const visible = this._getVisiblePages();

    const visiblePages = visible.views,
          numVisiblePages = visiblePages.length;

    if (numVisiblePages === 0) {
      return;
    }

    const newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);
    this.#buffer.resize(newCacheSize, visible.ids);
    this.renderingQueue.renderHighestPriority(visible);
    const isSimpleLayout = this._spreadMode === _ui_utils.SpreadMode.NONE &amp;&amp; (this._scrollMode === _ui_utils.ScrollMode.PAGE || this._scrollMode === _ui_utils.ScrollMode.VERTICAL);
    const currentId = this._currentPageNumber;
    let stillFullyVisible = false;

    for (const page of visiblePages) {
      if (page.percent &lt; 100) {
        break;
      }

      if (page.id === currentId &amp;&amp; isSimpleLayout) {
        stillFullyVisible = true;
        break;
      }
    }

    this._setCurrentPageNumber(stillFullyVisible ? currentId : visiblePages[0].id);

    this._updateLocation(visible.first);

    this.eventBus.dispatch(&quot;updateviewarea&quot;, {
      source: this,
      location: this._location
    });
  }

  containsElement(element) {
    return this.container.contains(element);
  }

  focus() {
    this.container.focus();
  }

  get _isContainerRtl() {
    return getComputedStyle(this.container).direction === &quot;rtl&quot;;
  }

  get isInPresentationMode() {
    return this.presentationModeState === _ui_utils.PresentationModeState.FULLSCREEN;
  }

  get isChangingPresentationMode() {
    return this.presentationModeState === _ui_utils.PresentationModeState.CHANGING;
  }

  get isHorizontalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollWidth &gt; this.container.clientWidth;
  }

  get isVerticalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollHeight &gt; this.container.clientHeight;
  }

  _getVisiblePages() {
    const views = this._scrollMode === _ui_utils.ScrollMode.PAGE ? this.#scrollModePageState.pages : this._pages,
          horizontal = this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL,
          rtl = horizontal &amp;&amp; this._isContainerRtl;
    return (0, _ui_utils.getVisibleElements)({
      scrollEl: this.container,
      views,
      sortByVisibility: true,
      horizontal,
      rtl
    });
  }

  isPageVisible(pageNumber) {
    if (!this.pdfDocument) {
      return false;
    }

    if (!(Number.isInteger(pageNumber) &amp;&amp; pageNumber &gt; 0 &amp;&amp; pageNumber &lt;= this.pagesCount)) {
      console.error(`isPageVisible: &quot;${pageNumber}&quot; is not a valid page.`);
      return false;
    }

    return this._getVisiblePages().ids.has(pageNumber);
  }

  isPageCached(pageNumber) {
    if (!this.pdfDocument) {
      return false;
    }

    if (!(Number.isInteger(pageNumber) &amp;&amp; pageNumber &gt; 0 &amp;&amp; pageNumber &lt;= this.pagesCount)) {
      console.error(`isPageCached: &quot;${pageNumber}&quot; is not a valid page.`);
      return false;
    }

    const pageView = this._pages[pageNumber - 1];
    return this.#buffer.has(pageView);
  }

  cleanup() {
    for (const pageView of this._pages) {
      if (pageView.renderingState !== _ui_utils.RenderingStates.FINISHED) {
        pageView.reset();
      }
    }
  }

  _cancelRendering() {
    for (const pageView of this._pages) {
      pageView.cancelRendering();
    }
  }

  async #ensurePdfPageLoaded(pageView) {
    if (pageView.pdfPage) {
      return pageView.pdfPage;
    }

    try {
      const pdfPage = await this.pdfDocument.getPage(pageView.id);

      if (!pageView.pdfPage) {
        pageView.setPdfPage(pdfPage);
      }

      if (!this.linkService._cachedPageNumber?.(pdfPage.ref)) {
        this.linkService.cachePageRef(pageView.id, pdfPage.ref);
      }

      return pdfPage;
    } catch (reason) {
      console.error(&quot;Unable to get page for page view&quot;, reason);
      return null;
    }
  }

  #getScrollAhead(visible) {
    if (visible.first?.id === 1) {
      return true;
    } else if (visible.last?.id === this.pagesCount) {
      return false;
    }

    switch (this._scrollMode) {
      case _ui_utils.ScrollMode.PAGE:
        return this.#scrollModePageState.scrollDown;

      case _ui_utils.ScrollMode.HORIZONTAL:
        return this.scroll.right;
    }

    return this.scroll.down;
  }

  #toggleLoadingIconSpinner(visibleIds) {
    for (const id of visibleIds) {
      const pageView = this._pages[id - 1];
      pageView?.toggleLoadingIconSpinner(true);
    }

    for (const pageView of this.#buffer) {
      if (visibleIds.has(pageView.id)) {
        continue;
      }

      pageView.toggleLoadingIconSpinner(false);
    }
  }

  forceRendering(currentlyVisiblePages) {
    const visiblePages = currentlyVisiblePages || this._getVisiblePages();

    const scrollAhead = this.#getScrollAhead(visiblePages);
    const preRenderExtra = this._spreadMode !== _ui_utils.SpreadMode.NONE &amp;&amp; this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL;
    const pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead, preRenderExtra);
    this.#toggleLoadingIconSpinner(visiblePages.ids);

    if (pageView) {
      this.#ensurePdfPageLoaded(pageView).then(() =&gt; {
        this.renderingQueue.renderView(pageView);
      });
      return true;
    }

    return false;
  }

  createTextLayerBuilder({
    textLayerDiv,
    pageIndex,
    viewport,
    eventBus,
    highlighter,
    accessibilityManager = null
  }) {
    return new _text_layer_builder.TextLayerBuilder({
      textLayerDiv,
      eventBus,
      pageIndex,
      viewport,
      highlighter,
      accessibilityManager
    });
  }

  createTextHighlighter({
    pageIndex,
    eventBus
  }) {
    return new _text_highlighter.TextHighlighter({
      eventBus,
      pageIndex,
      findController: this.isInPresentationMode ? null : this.findController
    });
  }

  createAnnotationLayerBuilder({
    pageDiv,
    pdfPage,
    annotationStorage = this.pdfDocument?.annotationStorage,
    imageResourcesPath = &quot;&quot;,
    renderForms = true,
    l10n = _l10n_utils.NullL10n,
    enableScripting = this.enableScripting,
    hasJSActionsPromise = this.pdfDocument?.hasJSActions(),
    mouseState = this._scriptingManager?.mouseState,
    fieldObjectsPromise = this.pdfDocument?.getFieldObjects(),
    annotationCanvasMap = null,
    accessibilityManager = null
  }) {
    return new _annotation_layer_builder.AnnotationLayerBuilder({
      pageDiv,
      pdfPage,
      annotationStorage,
      imageResourcesPath,
      renderForms,
      linkService: this.linkService,
      downloadManager: this.downloadManager,
      l10n,
      enableScripting,
      hasJSActionsPromise,
      mouseState,
      fieldObjectsPromise,
      annotationCanvasMap,
      accessibilityManager
    });
  }

  createAnnotationEditorLayerBuilder({
    uiManager = this.#annotationEditorUIManager,
    pageDiv,
    pdfPage,
    accessibilityManager = null,
    l10n,
    annotationStorage = this.pdfDocument?.annotationStorage
  }) {
    return new _annotation_editor_layer_builder.AnnotationEditorLayerBuilder({
      uiManager,
      pageDiv,
      pdfPage,
      annotationStorage,
      accessibilityManager,
      l10n
    });
  }

  createXfaLayerBuilder({
    pageDiv,
    pdfPage,
    annotationStorage = this.pdfDocument?.annotationStorage
  }) {
    return new _xfa_layer_builder.XfaLayerBuilder({
      pageDiv,
      pdfPage,
      annotationStorage,
      linkService: this.linkService
    });
  }

  createStructTreeLayerBuilder({
    pdfPage
  }) {
    return new _struct_tree_layer_builder.StructTreeLayerBuilder({
      pdfPage
    });
  }

  get hasEqualPageSizes() {
    const firstPageView = this._pages[0];

    for (let i = 1, ii = this._pages.length; i &lt; ii; ++i) {
      const pageView = this._pages[i];

      if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
        return false;
      }
    }

    return true;
  }

  getPagesOverview() {
    return this._pages.map(pageView =&gt; {
      const viewport = pageView.pdfPage.getViewport({
        scale: 1
      });

      if (!this.enablePrintAutoRotate || (0, _ui_utils.isPortraitOrientation)(viewport)) {
        return {
          width: viewport.width,
          height: viewport.height,
          rotation: viewport.rotation
        };
      }

      return {
        width: viewport.height,
        height: viewport.width,
        rotation: (viewport.rotation - 90) % 360
      };
    });
  }

  get optionalContentConfigPromise() {
    if (!this.pdfDocument) {
      return Promise.resolve(null);
    }

    if (!this._optionalContentConfigPromise) {
      console.error(&quot;optionalContentConfigPromise: Not initialized yet.&quot;);
      return this.pdfDocument.getOptionalContentConfig();
    }

    return this._optionalContentConfigPromise;
  }

  set optionalContentConfigPromise(promise) {
    if (!(promise instanceof Promise)) {
      throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);
    }

    if (!this.pdfDocument) {
      return;
    }

    if (!this._optionalContentConfigPromise) {
      return;
    }

    this._optionalContentConfigPromise = promise;
    const updateArgs = {
      optionalContentConfigPromise: promise
    };

    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }

    this.update();
    this.eventBus.dispatch(&quot;optionalcontentconfigchanged&quot;, {
      source: this,
      promise
    });
  }

  get scrollMode() {
    return this._scrollMode;
  }

  set scrollMode(mode) {
    if (this._scrollMode === mode) {
      return;
    }

    if (!(0, _ui_utils.isValidScrollMode)(mode)) {
      throw new Error(`Invalid scroll mode: ${mode}`);
    }

    if (this.pagesCount &gt; PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
      return;
    }

    this._previousScrollMode = this._scrollMode;
    this._scrollMode = mode;
    this.eventBus.dispatch(&quot;scrollmodechanged&quot;, {
      source: this,
      mode
    });

    this._updateScrollMode(this._currentPageNumber);
  }

  _updateScrollMode(pageNumber = null) {
    const scrollMode = this._scrollMode,
          viewer = this.viewer;
    viewer.classList.toggle(&quot;scrollHorizontal&quot;, scrollMode === _ui_utils.ScrollMode.HORIZONTAL);
    viewer.classList.toggle(&quot;scrollWrapped&quot;, scrollMode === _ui_utils.ScrollMode.WRAPPED);

    if (!this.pdfDocument || !pageNumber) {
      return;
    }

    if (scrollMode === _ui_utils.ScrollMode.PAGE) {
      this.#ensurePageViewVisible();
    } else if (this._previousScrollMode === _ui_utils.ScrollMode.PAGE) {
      this._updateSpreadMode();
    }

    if (this._currentScaleValue &amp;&amp; isNaN(this._currentScaleValue)) {
      this._setScale(this._currentScaleValue, true);
    }

    this._setCurrentPageNumber(pageNumber, true);

    this.update();
  }

  get spreadMode() {
    return this._spreadMode;
  }

  set spreadMode(mode) {
    if (this._spreadMode === mode) {
      return;
    }

    if (!(0, _ui_utils.isValidSpreadMode)(mode)) {
      throw new Error(`Invalid spread mode: ${mode}`);
    }

    this._spreadMode = mode;
    this.eventBus.dispatch(&quot;spreadmodechanged&quot;, {
      source: this,
      mode
    });

    this._updateSpreadMode(this._currentPageNumber);
  }

  _updateSpreadMode(pageNumber = null) {
    if (!this.pdfDocument) {
      return;
    }

    const viewer = this.viewer,
          pages = this._pages;

    if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
      this.#ensurePageViewVisible();
    } else {
      viewer.textContent = &quot;&quot;;

      if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
        for (const pageView of this._pages) {
          viewer.append(pageView.div);
        }
      } else {
        const parity = this._spreadMode - 1;
        let spread = null;

        for (let i = 0, ii = pages.length; i &lt; ii; ++i) {
          if (spread === null) {
            spread = document.createElement(&quot;div&quot;);
            spread.className = &quot;spread&quot;;
            viewer.append(spread);
          } else if (i % 2 === parity) {
            spread = spread.cloneNode(false);
            viewer.append(spread);
          }

          spread.append(pages[i].div);
        }
      }
    }

    if (!pageNumber) {
      return;
    }

    if (this._currentScaleValue &amp;&amp; isNaN(this._currentScaleValue)) {
      this._setScale(this._currentScaleValue, true);
    }

    this._setCurrentPageNumber(pageNumber, true);

    this.update();
  }

  _getPageAdvance(currentPageNumber, previous = false) {
    switch (this._scrollMode) {
      case _ui_utils.ScrollMode.WRAPPED:
        {
          const {
            views
          } = this._getVisiblePages(),
                pageLayout = new Map();

          for (const {
            id,
            y,
            percent,
            widthPercent
          } of views) {
            if (percent === 0 || widthPercent &lt; 100) {
              continue;
            }

            let yArray = pageLayout.get(y);

            if (!yArray) {
              pageLayout.set(y, yArray ||= []);
            }

            yArray.push(id);
          }

          for (const yArray of pageLayout.values()) {
            const currentIndex = yArray.indexOf(currentPageNumber);

            if (currentIndex === -1) {
              continue;
            }

            const numPages = yArray.length;

            if (numPages === 1) {
              break;
            }

            if (previous) {
              for (let i = currentIndex - 1, ii = 0; i &gt;= ii; i--) {
                const currentId = yArray[i],
                      expectedId = yArray[i + 1] - 1;

                if (currentId &lt; expectedId) {
                  return currentPageNumber - expectedId;
                }
              }
            } else {
              for (let i = currentIndex + 1, ii = numPages; i &lt; ii; i++) {
                const currentId = yArray[i],
                      expectedId = yArray[i - 1] + 1;

                if (currentId &gt; expectedId) {
                  return expectedId - currentPageNumber;
                }
              }
            }

            if (previous) {
              const firstId = yArray[0];

              if (firstId &lt; currentPageNumber) {
                return currentPageNumber - firstId + 1;
              }
            } else {
              const lastId = yArray[numPages - 1];

              if (lastId &gt; currentPageNumber) {
                return lastId - currentPageNumber + 1;
              }
            }

            break;
          }

          break;
        }

      case _ui_utils.ScrollMode.HORIZONTAL:
        {
          break;
        }

      case _ui_utils.ScrollMode.PAGE:
      case _ui_utils.ScrollMode.VERTICAL:
        {
          if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
            break;
          }

          const parity = this._spreadMode - 1;

          if (previous &amp;&amp; currentPageNumber % 2 !== parity) {
            break;
          } else if (!previous &amp;&amp; currentPageNumber % 2 === parity) {
            break;
          }

          const {
            views
          } = this._getVisiblePages(),
                expectedId = previous ? currentPageNumber - 1 : currentPageNumber + 1;

          for (const {
            id,
            percent,
            widthPercent
          } of views) {
            if (id !== expectedId) {
              continue;
            }

            if (percent &gt; 0 &amp;&amp; widthPercent === 100) {
              return 2;
            }

            break;
          }

          break;
        }
    }

    return 1;
  }

  nextPage() {
    const currentPageNumber = this._currentPageNumber,
          pagesCount = this.pagesCount;

    if (currentPageNumber &gt;= pagesCount) {
      return false;
    }

    const advance = this._getPageAdvance(currentPageNumber, false) || 1;
    this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
    return true;
  }

  previousPage() {
    const currentPageNumber = this._currentPageNumber;

    if (currentPageNumber &lt;= 1) {
      return false;
    }

    const advance = this._getPageAdvance(currentPageNumber, true) || 1;
    this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
    return true;
  }

  increaseScale(steps = 1) {
    let newScale = this._currentScale;

    do {
      newScale = (newScale * _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(_ui_utils.MAX_SCALE, newScale);
    } while (--steps &gt; 0 &amp;&amp; newScale &lt; _ui_utils.MAX_SCALE);

    this.currentScaleValue = newScale;
  }

  decreaseScale(steps = 1) {
    let newScale = this._currentScale;

    do {
      newScale = (newScale / _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(_ui_utils.MIN_SCALE, newScale);
    } while (--steps &gt; 0 &amp;&amp; newScale &gt; _ui_utils.MIN_SCALE);

    this.currentScaleValue = newScale;
  }

  updateContainerHeightCss() {
    const height = this.container.clientHeight;

    if (height !== this.#previousContainerHeight) {
      this.#previousContainerHeight = height;

      _ui_utils.docStyle.setProperty(&quot;--viewer-container-height&quot;, `${height}px`);
    }
  }

  get annotationEditorMode() {
    return this.#annotationEditorUIManager ? this.#annotationEditorMode : _pdfjsLib.AnnotationEditorType.DISABLE;
  }

  set annotationEditorMode(mode) {
    if (!this.#annotationEditorUIManager) {
      throw new Error(`The AnnotationEditor is not enabled.`);
    }

    if (this.#annotationEditorMode === mode) {
      return;
    }

    if (!isValidAnnotationEditorMode(mode)) {
      throw new Error(`Invalid AnnotationEditor mode: ${mode}`);
    }

    if (!this.pdfDocument) {
      return;
    }

    this.#annotationEditorMode = mode;
    this.eventBus.dispatch(&quot;annotationeditormodechanged&quot;, {
      source: this,
      mode
    });
    this.#annotationEditorUIManager.updateMode(mode);
  }

  set annotationEditorParams({
    type,
    value
  }) {
    if (!this.#annotationEditorUIManager) {
      throw new Error(`The AnnotationEditor is not enabled.`);
    }

    this.#annotationEditorUIManager.updateParams(type, value);
  }

  refresh() {
    if (!this.pdfDocument) {
      return;
    }

    const updateArgs = {};

    for (const pageView of this._pages) {
      pageView.update(updateArgs);
    }

    this.update();
  }

}

exports.PDFViewer = PDFViewer;

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.AnnotationEditorLayerBuilder = void 0;

var _pdfjsLib = __webpack_require__(5);

var _l10n_utils = __webpack_require__(30);

class AnnotationEditorLayerBuilder {
  #uiManager;

  constructor(options) {
    this.pageDiv = options.pageDiv;
    this.pdfPage = options.pdfPage;
    this.annotationStorage = options.annotationStorage || null;
    this.accessibilityManager = options.accessibilityManager;
    this.l10n = options.l10n || _l10n_utils.NullL10n;
    this.annotationEditorLayer = null;
    this.div = null;
    this._cancelled = false;
    this.#uiManager = options.uiManager;
  }

  async render(viewport, intent = &quot;display&quot;) {
    if (intent !== &quot;display&quot;) {
      return;
    }

    if (this._cancelled) {
      return;
    }

    const clonedViewport = viewport.clone({
      dontFlip: true
    });

    if (this.div) {
      this.annotationEditorLayer.update({
        viewport: clonedViewport
      });
      this.show();
      return;
    }

    this.div = document.createElement(&quot;div&quot;);
    this.div.className = &quot;annotationEditorLayer&quot;;
    this.div.tabIndex = 0;
    this.pageDiv.append(this.div);
    this.annotationEditorLayer = new _pdfjsLib.AnnotationEditorLayer({
      uiManager: this.#uiManager,
      div: this.div,
      annotationStorage: this.annotationStorage,
      accessibilityManager: this.accessibilityManager,
      pageIndex: this.pdfPage._pageIndex,
      l10n: this.l10n,
      viewport: clonedViewport
    });
    const parameters = {
      viewport: clonedViewport,
      div: this.div,
      annotations: null,
      intent
    };
    this.annotationEditorLayer.render(parameters);
  }

  cancel() {
    this._cancelled = true;
    this.destroy();
  }

  hide() {
    if (!this.div) {
      return;
    }

    this.div.hidden = true;
  }

  show() {
    if (!this.div) {
      return;
    }

    this.div.hidden = false;
  }

  destroy() {
    if (!this.div) {
      return;
    }

    this.pageDiv = null;
    this.annotationEditorLayer.destroy();
    this.div.remove();
  }

}

exports.AnnotationEditorLayerBuilder = AnnotationEditorLayerBuilder;

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.NullL10n = void 0;
exports.fixupLangCode = fixupLangCode;
exports.getL10nFallback = getL10nFallback;
const DEFAULT_L10N_STRINGS = {
  of_pages: &quot;of &quot;,
  page_of_pages: &quot;( of )&quot;,
  document_properties_kb: &quot; KB ( bytes)&quot;,
  document_properties_mb: &quot; MB ( bytes)&quot;,
  document_properties_date_string: &quot;1667031860459, &quot;,
  document_properties_page_size_unit_inches: &quot;in&quot;,
  document_properties_page_size_unit_millimeters: &quot;mm&quot;,
  document_properties_page_size_orientation_portrait: &quot;portrait&quot;,
  document_properties_page_size_orientation_landscape: &quot;landscape&quot;,
  document_properties_page_size_name_a3: &quot;A3&quot;,
  document_properties_page_size_name_a4: &quot;A4&quot;,
  document_properties_page_size_name_letter: &quot;Letter&quot;,
  document_properties_page_size_name_legal: &quot;Legal&quot;,
  document_properties_page_size_dimension_string: &quot; &#xD7;   ()&quot;,
  document_properties_page_size_dimension_name_string: &quot; &#xD7;   (, )&quot;,
  document_properties_linearized_yes: &quot;Yes&quot;,
  document_properties_linearized_no: &quot;No&quot;,
  additional_layers: &quot;Additional Layers&quot;,
  page_landmark: &quot;Page &quot;,
  thumb_page_title: &quot;Page &quot;,
  thumb_page_canvas: &quot;Thumbnail of Page &quot;,
  find_reached_top: &quot;Reached top of document, continued from bottom&quot;,
  find_reached_bottom: &quot;Reached end of document, continued from top&quot;,
  &quot;find_match_count[one]&quot;: &quot; of  match&quot;,
  &quot;find_match_count[other]&quot;: &quot; of  matches&quot;,
  &quot;find_match_count_limit[one]&quot;: &quot;More than  match&quot;,
  &quot;find_match_count_limit[other]&quot;: &quot;More than  matches&quot;,
  find_not_found: &quot;Phrase not found&quot;,
  page_scale_width: &quot;Page Width&quot;,
  page_scale_fit: &quot;Page Fit&quot;,
  page_scale_auto: &quot;Automatic Zoom&quot;,
  page_scale_actual: &quot;Actual Size&quot;,
  page_scale_percent: &quot;%&quot;,
  loading: &quot;Loading&#x2026;&quot;,
  loading_error: &quot;An error occurred while loading the PDF.&quot;,
  invalid_file_error: &quot;Invalid or corrupted PDF file.&quot;,
  missing_file_error: &quot;Missing PDF file.&quot;,
  unexpected_response_error: &quot;Unexpected server response.&quot;,
  rendering_error: &quot;An error occurred while rendering the page.&quot;,
  printing_not_supported: &quot;Warning: Printing is not fully supported by this browser.&quot;,
  printing_not_ready: &quot;Warning: The PDF is not fully loaded for printing.&quot;,
  web_fonts_disabled: &quot;Web fonts are disabled: unable to use embedded PDF fonts.&quot;,
  free_text2_default_content: &quot;Start typing&#x2026;&quot;,
  editor_free_text2_aria_label: &quot;Text Editor&quot;,
  editor_ink2_aria_label: &quot;Draw Editor&quot;,
  editor_ink_canvas_aria_label: &quot;User-created image&quot;
};
{
  DEFAULT_L10N_STRINGS.print_progress_percent = &quot;%&quot;;
}

function getL10nFallback(key, args) {
  switch (key) {
    case &quot;find_match_count&quot;:
      key = `find_match_count[${args.total === 1 ? &quot;one&quot; : &quot;other&quot;}]`;
      break;

    case &quot;find_match_count_limit&quot;:
      key = `find_match_count_limit[${args.limit === 1 ? &quot;one&quot; : &quot;other&quot;}]`;
      break;
  }

  return DEFAULT_L10N_STRINGS[key] || &quot;&quot;;
}

const PARTIAL_LANG_CODES = {
  en: &quot;en-US&quot;,
  es: &quot;es-ES&quot;,
  fy: &quot;fy-NL&quot;,
  ga: &quot;ga-IE&quot;,
  gu: &quot;gu-IN&quot;,
  hi: &quot;hi-IN&quot;,
  hy: &quot;hy-AM&quot;,
  nb: &quot;nb-NO&quot;,
  ne: &quot;ne-NP&quot;,
  nn: &quot;nn-NO&quot;,
  pa: &quot;pa-IN&quot;,
  pt: &quot;pt-PT&quot;,
  sv: &quot;sv-SE&quot;,
  zh: &quot;zh-CN&quot;
};

function fixupLangCode(langCode) {
  return PARTIAL_LANG_CODES[langCode?.toLowerCase()] || langCode;
}

function formatL10nValue(text, args) {
  if (!args) {
    return text;
  }

  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (all, name) =&gt; {
    return name in args ? args[name] : &quot; + name + &quot;;
  });
}

const NullL10n = {
  async getLanguage() {
    return &quot;en-us&quot;;
  },

  async getDirection() {
    return &quot;ltr&quot;;
  },

  async get(key, args = null, fallback = getL10nFallback(key, args)) {
    return formatL10nValue(fallback, args);
  },

  async translate(element) {}

};
exports.NullL10n = NullL10n;

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.AnnotationLayerBuilder = void 0;

var _pdfjsLib = __webpack_require__(5);

var _l10n_utils = __webpack_require__(30);

class AnnotationLayerBuilder {
  constructor({
    pageDiv,
    pdfPage,
    linkService,
    downloadManager,
    annotationStorage = null,
    imageResourcesPath = &quot;&quot;,
    renderForms = true,
    l10n = _l10n_utils.NullL10n,
    enableScripting = false,
    hasJSActionsPromise = null,
    fieldObjectsPromise = null,
    mouseState = null,
    annotationCanvasMap = null,
    accessibilityManager = null
  }) {
    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderForms = renderForms;
    this.l10n = l10n;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise;
    this._fieldObjectsPromise = fieldObjectsPromise;
    this._mouseState = mouseState;
    this._annotationCanvasMap = annotationCanvasMap;
    this._accessibilityManager = accessibilityManager;
    this.div = null;
    this._cancelled = false;
  }

  async render(viewport, intent = &quot;display&quot;) {
    const [annotations, hasJSActions = false, fieldObjects = null] = await Promise.all([this.pdfPage.getAnnotations({
      intent
    }), this._hasJSActionsPromise, this._fieldObjectsPromise]);

    if (this._cancelled || annotations.length === 0) {
      return;
    }

    const parameters = {
      viewport: viewport.clone({
        dontFlip: true
      }),
      div: this.div,
      annotations,
      page: this.pdfPage,
      imageResourcesPath: this.imageResourcesPath,
      renderForms: this.renderForms,
      linkService: this.linkService,
      downloadManager: this.downloadManager,
      annotationStorage: this.annotationStorage,
      enableScripting: this.enableScripting,
      hasJSActions,
      fieldObjects,
      mouseState: this._mouseState,
      annotationCanvasMap: this._annotationCanvasMap,
      accessibilityManager: this._accessibilityManager
    };

    if (this.div) {
      _pdfjsLib.AnnotationLayer.update(parameters);
    } else {
      this.div = document.createElement(&quot;div&quot;);
      this.div.className = &quot;annotationLayer&quot;;
      this.pageDiv.append(this.div);
      parameters.div = this.div;

      _pdfjsLib.AnnotationLayer.render(parameters);

      this.l10n.translate(this.div);
    }
  }

  cancel() {
    this._cancelled = true;
  }

  hide() {
    if (!this.div) {
      return;
    }

    this.div.hidden = true;
  }

}

exports.AnnotationLayerBuilder = AnnotationLayerBuilder;

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFPageView = void 0;

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(1);

var _app_options = __webpack_require__(2);

var _l10n_utils = __webpack_require__(30);

var _text_accessibility = __webpack_require__(33);

const MAX_CANVAS_PIXELS = _app_options.compatibilityParams.maxCanvasPixels || 16777216;

class PDFPageView {
  #annotationMode = _pdfjsLib.AnnotationMode.ENABLE_FORMS;
  #useThumbnailCanvas = {
    initialOptionalContent: true,
    regularAnnotations: true
  };

  constructor(options) {
    const container = options.container;
    const defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = &quot;page&quot; + this.id;
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || _ui_utils.DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    this.hasRestrictedScaling = false;
    this.textLayerMode = options.textLayerMode ?? _ui_utils.TextLayerMode.ENABLE;
    this.#annotationMode = options.annotationMode ?? _pdfjsLib.AnnotationMode.ENABLE_FORMS;
    this.imageResourcesPath = options.imageResourcesPath || &quot;&quot;;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels || MAX_CANVAS_PIXELS;
    this.pageColors = options.pageColors || null;
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.textLayerFactory = options.textLayerFactory;
    this.annotationLayerFactory = options.annotationLayerFactory;
    this.annotationEditorLayerFactory = options.annotationEditorLayerFactory;
    this.xfaLayerFactory = options.xfaLayerFactory;
    this.textHighlighter = options.textHighlighterFactory?.createTextHighlighter({
      pageIndex: this.id - 1,
      eventBus: this.eventBus
    });
    this.structTreeLayerFactory = options.structTreeLayerFactory;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.l10n = options.l10n || _l10n_utils.NullL10n;
    this.paintTask = null;
    this.paintedViewportMap = new WeakMap();
    this.renderingState = _ui_utils.RenderingStates.INITIAL;
    this.resume = null;
    this._renderError = null;
    this._isStandalone = !this.renderingQueue?.hasViewer();
    this._annotationCanvasMap = null;
    this.annotationLayer = null;
    this.annotationEditorLayer = null;
    this.textLayer = null;
    this.zoomLayer = null;
    this.xfaLayer = null;
    this.structTreeLayer = null;
    const div = document.createElement(&quot;div&quot;);
    div.className = &quot;page&quot;;
    div.style.width = Math.floor(this.viewport.width) + &quot;px&quot;;
    div.style.height = Math.floor(this.viewport.height) + &quot;px&quot;;
    div.setAttribute(&quot;data-page-number&quot;, this.id);
    div.setAttribute(&quot;role&quot;, &quot;region&quot;);
    this.l10n.get(&quot;page_landmark&quot;, {
      page: this.id
    }).then(msg =&gt; {
      div.setAttribute(&quot;aria-label&quot;, msg);
    });
    this.div = div;
    container?.append(div);

    if (this._isStandalone) {
      const {
        optionalContentConfigPromise
      } = options;

      if (optionalContentConfigPromise) {
        optionalContentConfigPromise.then(optionalContentConfig =&gt; {
          if (optionalContentConfigPromise !== this._optionalContentConfigPromise) {
            return;
          }

          this.#useThumbnailCanvas.initialOptionalContent = optionalContentConfig.hasInitialVisibility;
        });
      }
    }
  }

  setPdfPage(pdfPage) {
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: this.scale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    });
    this.reset();
  }

  destroy() {
    this.reset();
    this.pdfPage?.cleanup();
  }

  async _renderAnnotationLayer() {
    let error = null;

    try {
      await this.annotationLayer.render(this.viewport, &quot;display&quot;);
    } catch (ex) {
      console.error(`_renderAnnotationLayer: &quot;${ex}&quot;.`);
      error = ex;
    } finally {
      this.eventBus.dispatch(&quot;annotationlayerrendered&quot;, {
        source: this,
        pageNumber: this.id,
        error
      });
    }
  }

  async _renderAnnotationEditorLayer() {
    let error = null;

    try {
      await this.annotationEditorLayer.render(this.viewport, &quot;display&quot;);
    } catch (ex) {
      console.error(`_renderAnnotationEditorLayer: &quot;${ex}&quot;.`);
      error = ex;
    } finally {
      this.eventBus.dispatch(&quot;annotationeditorlayerrendered&quot;, {
        source: this,
        pageNumber: this.id,
        error
      });
    }
  }

  async _renderXfaLayer() {
    let error = null;

    try {
      const result = await this.xfaLayer.render(this.viewport, &quot;display&quot;);

      if (result?.textDivs &amp;&amp; this.textHighlighter) {
        this._buildXfaTextContentItems(result.textDivs);
      }
    } catch (ex) {
      console.error(`_renderXfaLayer: &quot;${ex}&quot;.`);
      error = ex;
    } finally {
      this.eventBus.dispatch(&quot;xfalayerrendered&quot;, {
        source: this,
        pageNumber: this.id,
        error
      });
    }
  }

  async _buildXfaTextContentItems(textDivs) {
    const text = await this.pdfPage.getTextContent();
    const items = [];

    for (const item of text.items) {
      items.push(item.str);
    }

    this.textHighlighter.setTextMapping(textDivs, items);
    this.textHighlighter.enable();
  }

  _resetZoomLayer(removeFromDOM = false) {
    if (!this.zoomLayer) {
      return;
    }

    const zoomLayerCanvas = this.zoomLayer.firstChild;
    this.paintedViewportMap.delete(zoomLayerCanvas);
    zoomLayerCanvas.width = 0;
    zoomLayerCanvas.height = 0;

    if (removeFromDOM) {
      this.zoomLayer.remove();
    }

    this.zoomLayer = null;
  }

  reset({
    keepZoomLayer = false,
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false
  } = {}) {
    this.cancelRendering({
      keepAnnotationLayer,
      keepAnnotationEditorLayer,
      keepXfaLayer
    });
    this.renderingState = _ui_utils.RenderingStates.INITIAL;
    const div = this.div;
    div.style.width = Math.floor(this.viewport.width) + &quot;px&quot;;
    div.style.height = Math.floor(this.viewport.height) + &quot;px&quot;;
    const childNodes = div.childNodes,
          zoomLayerNode = keepZoomLayer &amp;&amp; this.zoomLayer || null,
          annotationLayerNode = keepAnnotationLayer &amp;&amp; this.annotationLayer?.div || null,
          annotationEditorLayerNode = keepAnnotationEditorLayer &amp;&amp; this.annotationEditorLayer?.div || null,
          xfaLayerNode = keepXfaLayer &amp;&amp; this.xfaLayer?.div || null;

    for (let i = childNodes.length - 1; i &gt;= 0; i--) {
      const node = childNodes[i];

      switch (node) {
        case zoomLayerNode:
        case annotationLayerNode:
        case annotationEditorLayerNode:
        case xfaLayerNode:
          continue;
      }

      node.remove();
    }

    div.removeAttribute(&quot;data-loaded&quot;);

    if (annotationLayerNode) {
      this.annotationLayer.hide();
    }

    if (annotationEditorLayerNode) {
      this.annotationEditorLayer.hide();
    } else {
      this.annotationEditorLayer?.destroy();
    }

    if (xfaLayerNode) {
      this.xfaLayer.hide();
    }

    if (!zoomLayerNode) {
      if (this.canvas) {
        this.paintedViewportMap.delete(this.canvas);
        this.canvas.width = 0;
        this.canvas.height = 0;
        delete this.canvas;
      }

      this._resetZoomLayer();
    }

    if (this.svg) {
      this.paintedViewportMap.delete(this.svg);
      delete this.svg;
    }

    this.loadingIconDiv = document.createElement(&quot;div&quot;);
    this.loadingIconDiv.className = &quot;loadingIcon notVisible&quot;;

    if (this._isStandalone) {
      this.toggleLoadingIconSpinner(true);
    }

    this.loadingIconDiv.setAttribute(&quot;role&quot;, &quot;img&quot;);
    this.l10n.get(&quot;loading&quot;).then(msg =&gt; {
      this.loadingIconDiv?.setAttribute(&quot;aria-label&quot;, msg);
    });
    div.append(this.loadingIconDiv);
  }

  update({
    scale = 0,
    rotation = null,
    optionalContentConfigPromise = null
  }) {
    this.scale = scale || this.scale;

    if (typeof rotation === &quot;number&quot;) {
      this.rotation = rotation;
    }

    if (optionalContentConfigPromise instanceof Promise) {
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      optionalContentConfigPromise.then(optionalContentConfig =&gt; {
        if (optionalContentConfigPromise !== this._optionalContentConfigPromise) {
          return;
        }

        this.#useThumbnailCanvas.initialOptionalContent = optionalContentConfig.hasInitialVisibility;
      });
    }

    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: this.scale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,
      rotation: totalRotation
    });

    if (this._isStandalone) {
      _ui_utils.docStyle.setProperty(&quot;--scale-factor&quot;, this.viewport.scale);
    }

    if (this.svg) {
      this.cssTransform({
        target: this.svg,
        redrawAnnotationLayer: true,
        redrawAnnotationEditorLayer: true,
        redrawXfaLayer: true
      });
      this.eventBus.dispatch(&quot;pagerendered&quot;, {
        source: this,
        pageNumber: this.id,
        cssTransform: true,
        timestamp: performance.now(),
        error: this._renderError
      });
      return;
    }

    let isScalingRestricted = false;

    if (this.canvas &amp;&amp; this.maxCanvasPixels &gt; 0) {
      const outputScale = this.outputScale;

      if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) &gt; this.maxCanvasPixels) {
        isScalingRestricted = true;
      }
    }

    if (this.canvas) {
      if (this.useOnlyCssZoom || this.hasRestrictedScaling &amp;&amp; isScalingRestricted) {
        this.cssTransform({
          target: this.canvas,
          redrawAnnotationLayer: true,
          redrawAnnotationEditorLayer: true,
          redrawXfaLayer: true
        });
        this.eventBus.dispatch(&quot;pagerendered&quot;, {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: this._renderError
        });
        return;
      }

      if (!this.zoomLayer &amp;&amp; !this.canvas.hidden) {
        this.zoomLayer = this.canvas.parentNode;
        this.zoomLayer.style.position = &quot;absolute&quot;;
      }
    }

    if (this.zoomLayer) {
      this.cssTransform({
        target: this.zoomLayer.firstChild
      });
    }

    this.reset({
      keepZoomLayer: true,
      keepAnnotationLayer: true,
      keepAnnotationEditorLayer: true,
      keepXfaLayer: true
    });
  }

  cancelRendering({
    keepAnnotationLayer = false,
    keepAnnotationEditorLayer = false,
    keepXfaLayer = false
  } = {}) {
    if (this.paintTask) {
      this.paintTask.cancel();
      this.paintTask = null;
    }

    this.resume = null;

    if (this.textLayer) {
      this.textLayer.cancel();
      this.textLayer = null;
    }

    if (this.annotationLayer &amp;&amp; (!keepAnnotationLayer || !this.annotationLayer.div)) {
      this.annotationLayer.cancel();
      this.annotationLayer = null;
      this._annotationCanvasMap = null;
    }

    if (this.annotationEditorLayer &amp;&amp; (!keepAnnotationEditorLayer || !this.annotationEditorLayer.div)) {
      this.annotationEditorLayer.cancel();
      this.annotationEditorLayer = null;
    }

    if (this.xfaLayer &amp;&amp; (!keepXfaLayer || !this.xfaLayer.div)) {
      this.xfaLayer.cancel();
      this.xfaLayer = null;
      this.textHighlighter?.disable();
    }

    if (this._onTextLayerRendered) {
      this.eventBus._off(&quot;textlayerrendered&quot;, this._onTextLayerRendered);

      this._onTextLayerRendered = null;
    }
  }

  cssTransform({
    target,
    redrawAnnotationLayer = false,
    redrawAnnotationEditorLayer = false,
    redrawXfaLayer = false
  }) {
    const width = this.viewport.width;
    const height = this.viewport.height;
    const div = this.div;
    target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + &quot;px&quot;;
    target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + &quot;px&quot;;
    const relativeRotation = this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
    const absRotation = Math.abs(relativeRotation);
    let scaleX = 1,
        scaleY = 1;

    if (absRotation === 90 || absRotation === 270) {
      scaleX = height / width;
      scaleY = width / height;
    }

    target.style.transform = `rotate(${relativeRotation}deg) scale(${scaleX}, ${scaleY})`;

    if (this.textLayer) {
      const textLayerViewport = this.textLayer.viewport;
      const textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
      const textAbsRotation = Math.abs(textRelativeRotation);
      let scale = width / textLayerViewport.width;

      if (textAbsRotation === 90 || textAbsRotation === 270) {
        scale = width / textLayerViewport.height;
      }

      const textLayerDiv = this.textLayer.textLayerDiv;
      let transX, transY;

      switch (textAbsRotation) {
        case 0:
          transX = transY = 0;
          break;

        case 90:
          transX = 0;
          transY = &quot;-&quot; + textLayerDiv.style.height;
          break;

        case 180:
          transX = &quot;-&quot; + textLayerDiv.style.width;
          transY = &quot;-&quot; + textLayerDiv.style.height;
          break;

        case 270:
          transX = &quot;-&quot; + textLayerDiv.style.width;
          transY = 0;
          break;

        default:
          console.error(&quot;Bad rotation value.&quot;);
          break;
      }

      textLayerDiv.style.transform = `rotate(${textAbsRotation}deg) ` + `scale(${scale}) ` + `translate(${transX}, ${transY})`;
      textLayerDiv.style.transformOrigin = &quot;0% 0%&quot;;
    }

    if (redrawAnnotationLayer &amp;&amp; this.annotationLayer) {
      this._renderAnnotationLayer();
    }

    if (redrawAnnotationEditorLayer &amp;&amp; this.annotationEditorLayer) {
      this._renderAnnotationEditorLayer();
    }

    if (redrawXfaLayer &amp;&amp; this.xfaLayer) {
      this._renderXfaLayer();
    }
  }

  get width() {
    return this.viewport.width;
  }

  get height() {
    return this.viewport.height;
  }

  getPagePoint(x, y) {
    return this.viewport.convertToPdfPoint(x, y);
  }

  toggleLoadingIconSpinner(viewVisible = false) {
    this.loadingIconDiv?.classList.toggle(&quot;notVisible&quot;, !viewVisible);
  }

  draw() {
    if (this.renderingState !== _ui_utils.RenderingStates.INITIAL) {
      console.error(&quot;Must be in new state before drawing&quot;);
      this.reset();
    }

    const {
      div,
      pdfPage
    } = this;

    if (!pdfPage) {
      this.renderingState = _ui_utils.RenderingStates.FINISHED;

      if (this.loadingIconDiv) {
        this.loadingIconDiv.remove();
        delete this.loadingIconDiv;
      }

      return Promise.reject(new Error(&quot;pdfPage is not loaded&quot;));
    }

    this.renderingState = _ui_utils.RenderingStates.RUNNING;
    const canvasWrapper = document.createElement(&quot;div&quot;);
    canvasWrapper.style.width = div.style.width;
    canvasWrapper.style.height = div.style.height;
    canvasWrapper.classList.add(&quot;canvasWrapper&quot;);
    const lastDivBeforeTextDiv = this.annotationLayer?.div || this.annotationEditorLayer?.div;

    if (lastDivBeforeTextDiv) {
      lastDivBeforeTextDiv.before(canvasWrapper);
    } else {
      div.append(canvasWrapper);
    }

    let textLayer = null;

    if (this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE &amp;&amp; this.textLayerFactory) {
      this._accessibilityManager ||= new _text_accessibility.TextAccessibilityManager();
      const textLayerDiv = document.createElement(&quot;div&quot;);
      textLayerDiv.className = &quot;textLayer&quot;;
      textLayerDiv.style.width = canvasWrapper.style.width;
      textLayerDiv.style.height = canvasWrapper.style.height;

      if (lastDivBeforeTextDiv) {
        lastDivBeforeTextDiv.before(textLayerDiv);
      } else {
        div.append(textLayerDiv);
      }

      textLayer = this.textLayerFactory.createTextLayerBuilder({
        textLayerDiv,
        pageIndex: this.id - 1,
        viewport: this.viewport,
        eventBus: this.eventBus,
        highlighter: this.textHighlighter,
        accessibilityManager: this._accessibilityManager
      });
    }

    this.textLayer = textLayer;

    if (this.#annotationMode !== _pdfjsLib.AnnotationMode.DISABLE &amp;&amp; this.annotationLayerFactory) {
      this._annotationCanvasMap ||= new Map();
      this.annotationLayer ||= this.annotationLayerFactory.createAnnotationLayerBuilder({
        pageDiv: div,
        pdfPage,
        imageResourcesPath: this.imageResourcesPath,
        renderForms: this.#annotationMode === _pdfjsLib.AnnotationMode.ENABLE_FORMS,
        l10n: this.l10n,
        annotationCanvasMap: this._annotationCanvasMap,
        accessibilityManager: this._accessibilityManager
      });
    }

    if (this.xfaLayer?.div) {
      div.append(this.xfaLayer.div);
    }

    let renderContinueCallback = null;

    if (this.renderingQueue) {
      renderContinueCallback = cont =&gt; {
        if (!this.renderingQueue.isHighestPriority(this)) {
          this.renderingState = _ui_utils.RenderingStates.PAUSED;

          this.resume = () =&gt; {
            this.renderingState = _ui_utils.RenderingStates.RUNNING;
            cont();
          };

          return;
        }

        cont();
      };
    }

    const finishPaintTask = async (error = null) =&gt; {
      if (paintTask === this.paintTask) {
        this.paintTask = null;
      }

      if (error instanceof _pdfjsLib.RenderingCancelledException) {
        this._renderError = null;
        return;
      }

      this._renderError = error;
      this.renderingState = _ui_utils.RenderingStates.FINISHED;

      if (this.loadingIconDiv) {
        this.loadingIconDiv.remove();
        delete this.loadingIconDiv;
      }

      this._resetZoomLayer(true);

      this.#useThumbnailCanvas.regularAnnotations = !paintTask.separateAnnots;
      this.eventBus.dispatch(&quot;pagerendered&quot;, {
        source: this,
        pageNumber: this.id,
        cssTransform: false,
        timestamp: performance.now(),
        error: this._renderError
      });

      if (error) {
        throw error;
      }
    };

    const paintTask = this.renderer === _ui_utils.RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
    paintTask.onRenderContinue = renderContinueCallback;
    this.paintTask = paintTask;
    const resultPromise = paintTask.promise.then(() =&gt; {
      return finishPaintTask(null).then(() =&gt; {
        if (textLayer) {
          const readableStream = pdfPage.streamTextContent({
            includeMarkedContent: true
          });
          textLayer.setTextContentStream(readableStream);
          textLayer.render();
        }

        if (this.annotationLayer) {
          this._renderAnnotationLayer().then(() =&gt; {
            if (this.annotationEditorLayerFactory) {
              this.annotationEditorLayer ||= this.annotationEditorLayerFactory.createAnnotationEditorLayerBuilder({
                pageDiv: div,
                pdfPage,
                l10n: this.l10n,
                accessibilityManager: this._accessibilityManager
              });

              this._renderAnnotationEditorLayer();
            }
          });
        }
      });
    }, function (reason) {
      return finishPaintTask(reason);
    });

    if (this.xfaLayerFactory) {
      this.xfaLayer ||= this.xfaLayerFactory.createXfaLayerBuilder({
        pageDiv: div,
        pdfPage
      });

      this._renderXfaLayer();
    }

    if (this.structTreeLayerFactory &amp;&amp; this.textLayer &amp;&amp; this.canvas) {
      this._onTextLayerRendered = event =&gt; {
        if (event.pageNumber !== this.id) {
          return;
        }

        this.eventBus._off(&quot;textlayerrendered&quot;, this._onTextLayerRendered);

        this._onTextLayerRendered = null;

        if (!this.canvas) {
          return;
        }

        this.pdfPage.getStructTree().then(tree =&gt; {
          if (!tree) {
            return;
          }

          if (!this.canvas) {
            return;
          }

          const treeDom = this.structTreeLayer.render(tree);
          treeDom.classList.add(&quot;structTree&quot;);
          this.canvas.append(treeDom);
        });
      };

      this.eventBus._on(&quot;textlayerrendered&quot;, this._onTextLayerRendered);

      this.structTreeLayer = this.structTreeLayerFactory.createStructTreeLayerBuilder({
        pdfPage
      });
    }

    div.setAttribute(&quot;data-loaded&quot;, true);
    this.eventBus.dispatch(&quot;pagerender&quot;, {
      source: this,
      pageNumber: this.id
    });
    return resultPromise;
  }

  paintOnCanvas(canvasWrapper) {
    const renderCapability = (0, _pdfjsLib.createPromiseCapability)();
    const result = {
      promise: renderCapability.promise,

      onRenderContinue(cont) {
        cont();
      },

      cancel() {
        renderTask.cancel();
      },

      get separateAnnots() {
        return renderTask.separateAnnots;
      }

    };
    const viewport = this.viewport;
    const canvas = document.createElement(&quot;canvas&quot;);
    canvas.setAttribute(&quot;role&quot;, &quot;presentation&quot;);
    canvas.hidden = true;
    let isCanvasHidden = true;

    const showCanvas = function () {
      if (isCanvasHidden) {
        canvas.hidden = false;
        isCanvasHidden = false;
      }
    };

    canvasWrapper.append(canvas);
    this.canvas = canvas;
    const ctx = canvas.getContext(&quot;2d&quot;, {
      alpha: false
    });
    const outputScale = this.outputScale = new _ui_utils.OutputScale();

    if (this.useOnlyCssZoom) {
      const actualSizeViewport = viewport.clone({
        scale: _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS
      });
      outputScale.sx *= actualSizeViewport.width / viewport.width;
      outputScale.sy *= actualSizeViewport.height / viewport.height;
    }

    if (this.maxCanvasPixels &gt; 0) {
      const pixelsInViewport = viewport.width * viewport.height;
      const maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);

      if (outputScale.sx &gt; maxScale || outputScale.sy &gt; maxScale) {
        outputScale.sx = maxScale;
        outputScale.sy = maxScale;
        this.hasRestrictedScaling = true;
      } else {
        this.hasRestrictedScaling = false;
      }
    }

    const sfx = (0, _ui_utils.approximateFraction)(outputScale.sx);
    const sfy = (0, _ui_utils.approximateFraction)(outputScale.sy);
    canvas.width = (0, _ui_utils.roundToDivide)(viewport.width * outputScale.sx, sfx[0]);
    canvas.height = (0, _ui_utils.roundToDivide)(viewport.height * outputScale.sy, sfy[0]);
    canvas.style.width = (0, _ui_utils.roundToDivide)(viewport.width, sfx[1]) + &quot;px&quot;;
    canvas.style.height = (0, _ui_utils.roundToDivide)(viewport.height, sfy[1]) + &quot;px&quot;;
    this.paintedViewportMap.set(canvas, viewport);
    const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport: this.viewport,
      annotationMode: this.#annotationMode,
      optionalContentConfigPromise: this._optionalContentConfigPromise,
      annotationCanvasMap: this._annotationCanvasMap,
      pageColors: this.pageColors
    };
    const renderTask = this.pdfPage.render(renderContext);

    renderTask.onContinue = function (cont) {
      showCanvas();

      if (result.onRenderContinue) {
        result.onRenderContinue(cont);
      } else {
        cont();
      }
    };

    renderTask.promise.then(function () {
      showCanvas();
      renderCapability.resolve();
    }, function (error) {
      showCanvas();
      renderCapability.reject(error);
    });
    return result;
  }

  paintOnSvg(wrapper) {
    let cancelled = false;

    const ensureNotCancelled = () =&gt; {
      if (cancelled) {
        throw new _pdfjsLib.RenderingCancelledException(`Rendering cancelled, page ${this.id}`, &quot;svg&quot;);
      }
    };

    const pdfPage = this.pdfPage;
    const actualSizeViewport = this.viewport.clone({
      scale: _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS
    });
    const promise = pdfPage.getOperatorList({
      annotationMode: this.#annotationMode
    }).then(opList =&gt; {
      ensureNotCancelled();
      const svgGfx = new _pdfjsLib.SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
      return svgGfx.getSVG(opList, actualSizeViewport).then(svg =&gt; {
        ensureNotCancelled();
        this.svg = svg;
        this.paintedViewportMap.set(svg, actualSizeViewport);
        svg.style.width = wrapper.style.width;
        svg.style.height = wrapper.style.height;
        this.renderingState = _ui_utils.RenderingStates.FINISHED;
        wrapper.append(svg);
      });
    });
    return {
      promise,

      onRenderContinue(cont) {
        cont();
      },

      cancel() {
        cancelled = true;
      },

      get separateAnnots() {
        return false;
      }

    };
  }

  setPageLabel(label) {
    this.pageLabel = typeof label === &quot;string&quot; ? label : null;

    if (this.pageLabel !== null) {
      this.div.setAttribute(&quot;data-page-label&quot;, this.pageLabel);
    } else {
      this.div.removeAttribute(&quot;data-page-label&quot;);
    }
  }

  get thumbnailCanvas() {
    const {
      initialOptionalContent,
      regularAnnotations
    } = this.#useThumbnailCanvas;
    return initialOptionalContent &amp;&amp; regularAnnotations ? this.canvas : null;
  }

}

exports.PDFPageView = PDFPageView;

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.TextAccessibilityManager = void 0;

var _ui_utils = __webpack_require__(1);

class TextAccessibilityManager {
  #enabled = false;
  #textChildren = null;
  #textNodes = new Map();
  #waitingElements = new Map();

  setTextMapping(textDivs) {
    this.#textChildren = textDivs;
  }

  static #compareElementPositions(e1, e2) {
    const rect1 = e1.getBoundingClientRect();
    const rect2 = e2.getBoundingClientRect();

    if (rect1.width === 0 &amp;&amp; rect1.height === 0) {
      return +1;
    }

    if (rect2.width === 0 &amp;&amp; rect2.height === 0) {
      return -1;
    }

    const top1 = rect1.y;
    const bot1 = rect1.y + rect1.height;
    const mid1 = rect1.y + rect1.height / 2;
    const top2 = rect2.y;
    const bot2 = rect2.y + rect2.height;
    const mid2 = rect2.y + rect2.height / 2;

    if (mid1 &lt;= top2 &amp;&amp; mid2 &gt;= bot1) {
      return -1;
    }

    if (mid2 &lt;= top1 &amp;&amp; mid1 &gt;= bot2) {
      return +1;
    }

    const centerX1 = rect1.x + rect1.width / 2;
    const centerX2 = rect2.x + rect2.width / 2;
    return centerX1 - centerX2;
  }

  enable() {
    if (this.#enabled) {
      throw new Error(&quot;TextAccessibilityManager is already enabled.&quot;);
    }

    if (!this.#textChildren) {
      throw new Error(&quot;Text divs and strings have not been set.&quot;);
    }

    this.#enabled = true;
    this.#textChildren = this.#textChildren.slice();
    this.#textChildren.sort(TextAccessibilityManager.#compareElementPositions);

    if (this.#textNodes.size &gt; 0) {
      const textChildren = this.#textChildren;

      for (const [id, nodeIndex] of this.#textNodes) {
        const element = document.getElementById(id);

        if (!element) {
          this.#textNodes.delete(id);
          continue;
        }

        this.#addIdToAriaOwns(id, textChildren[nodeIndex]);
      }
    }

    for (const [element, isRemovable] of this.#waitingElements) {
      this.addPointerInTextLayer(element, isRemovable);
    }

    this.#waitingElements.clear();
  }

  disable() {
    if (!this.#enabled) {
      return;
    }

    this.#waitingElements.clear();
    this.#textChildren = null;
    this.#enabled = false;
  }

  removePointerInTextLayer(element) {
    if (!this.#enabled) {
      this.#waitingElements.delete(element);
      return;
    }

    const children = this.#textChildren;

    if (!children || children.length === 0) {
      return;
    }

    const {
      id
    } = element;
    const nodeIndex = this.#textNodes.get(id);

    if (nodeIndex === undefined) {
      return;
    }

    const node = children[nodeIndex];
    this.#textNodes.delete(id);
    let owns = node.getAttribute(&quot;aria-owns&quot;);

    if (owns?.includes(id)) {
      owns = owns.split(&quot; &quot;).filter(x =&gt; x !== id).join(&quot; &quot;);

      if (owns) {
        node.setAttribute(&quot;aria-owns&quot;, owns);
      } else {
        node.removeAttribute(&quot;aria-owns&quot;);
        node.setAttribute(&quot;role&quot;, &quot;presentation&quot;);
      }
    }
  }

  #addIdToAriaOwns(id, node) {
    const owns = node.getAttribute(&quot;aria-owns&quot;);

    if (!owns?.includes(id)) {
      node.setAttribute(&quot;aria-owns&quot;, owns ? `${owns} ${id}` : id);
    }

    node.removeAttribute(&quot;role&quot;);
  }

  addPointerInTextLayer(element, isRemovable) {
    const {
      id
    } = element;

    if (!id) {
      return;
    }

    if (!this.#enabled) {
      this.#waitingElements.set(element, isRemovable);
      return;
    }

    if (isRemovable) {
      this.removePointerInTextLayer(element);
    }

    const children = this.#textChildren;

    if (!children || children.length === 0) {
      return;
    }

    const index = (0, _ui_utils.binarySearchFirstItem)(children, node =&gt; TextAccessibilityManager.#compareElementPositions(element, node) &lt; 0);
    const nodeIndex = Math.max(0, index - 1);
    this.#addIdToAriaOwns(id, children[nodeIndex]);
    this.#textNodes.set(id, nodeIndex);
  }

  moveElementInDOM(container, element, contentElement, isRemovable) {
    this.addPointerInTextLayer(contentElement, isRemovable);

    if (!container.hasChildNodes()) {
      container.append(element);
      return;
    }

    const children = Array.from(container.childNodes).filter(node =&gt; node !== element);

    if (children.length === 0) {
      return;
    }

    const elementToCompare = contentElement || element;
    const index = (0, _ui_utils.binarySearchFirstItem)(children, node =&gt; TextAccessibilityManager.#compareElementPositions(elementToCompare, node) &lt; 0);

    if (index === 0) {
      children[0].before(element);
    } else {
      children[index - 1].after(element);
    }
  }

}

exports.TextAccessibilityManager = TextAccessibilityManager;

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.StructTreeLayerBuilder = void 0;
const PDF_ROLE_TO_HTML_ROLE = {
  Document: null,
  DocumentFragment: null,
  Part: &quot;group&quot;,
  Sect: &quot;group&quot;,
  Div: &quot;group&quot;,
  Aside: &quot;note&quot;,
  NonStruct: &quot;none&quot;,
  P: null,
  H: &quot;heading&quot;,
  Title: null,
  FENote: &quot;note&quot;,
  Sub: &quot;group&quot;,
  Lbl: null,
  Span: null,
  Em: null,
  Strong: null,
  Link: &quot;link&quot;,
  Annot: &quot;note&quot;,
  Form: &quot;form&quot;,
  Ruby: null,
  RB: null,
  RT: null,
  RP: null,
  Warichu: null,
  WT: null,
  WP: null,
  L: &quot;list&quot;,
  LI: &quot;listitem&quot;,
  LBody: null,
  Table: &quot;table&quot;,
  TR: &quot;row&quot;,
  TH: &quot;columnheader&quot;,
  TD: &quot;cell&quot;,
  THead: &quot;columnheader&quot;,
  TBody: null,
  TFoot: null,
  Caption: null,
  Figure: &quot;figure&quot;,
  Formula: null,
  Artifact: null
};
const HEADING_PATTERN = /^H(\d+)$/;

class StructTreeLayerBuilder {
  constructor({
    pdfPage
  }) {
    this.pdfPage = pdfPage;
  }

  render(structTree) {
    return this._walk(structTree);
  }

  _setAttributes(structElement, htmlElement) {
    if (structElement.alt !== undefined) {
      htmlElement.setAttribute(&quot;aria-label&quot;, structElement.alt);
    }

    if (structElement.id !== undefined) {
      htmlElement.setAttribute(&quot;aria-owns&quot;, structElement.id);
    }

    if (structElement.lang !== undefined) {
      htmlElement.setAttribute(&quot;lang&quot;, structElement.lang);
    }
  }

  _walk(node) {
    if (!node) {
      return null;
    }

    const element = document.createElement(&quot;span&quot;);

    if (&quot;role&quot; in node) {
      const {
        role
      } = node;
      const match = role.match(HEADING_PATTERN);

      if (match) {
        element.setAttribute(&quot;role&quot;, &quot;heading&quot;);
        element.setAttribute(&quot;aria-level&quot;, match[1]);
      } else if (PDF_ROLE_TO_HTML_ROLE[role]) {
        element.setAttribute(&quot;role&quot;, PDF_ROLE_TO_HTML_ROLE[role]);
      }
    }

    this._setAttributes(node, element);

    if (node.children) {
      if (node.children.length === 1 &amp;&amp; &quot;id&quot; in node.children[0]) {
        this._setAttributes(node.children[0], element);
      } else {
        for (const kid of node.children) {
          element.append(this._walk(kid));
        }
      }
    }

    return element;
  }

}

exports.StructTreeLayerBuilder = StructTreeLayerBuilder;

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.TextHighlighter = void 0;

class TextHighlighter {
  constructor({
    findController,
    eventBus,
    pageIndex
  }) {
    this.findController = findController;
    this.matches = [];
    this.eventBus = eventBus;
    this.pageIdx = pageIndex;
    this._onUpdateTextLayerMatches = null;
    this.textDivs = null;
    this.textContentItemsStr = null;
    this.enabled = false;
  }

  setTextMapping(divs, texts) {
    this.textDivs = divs;
    this.textContentItemsStr = texts;
  }

  enable() {
    if (!this.textDivs || !this.textContentItemsStr) {
      throw new Error(&quot;Text divs and strings have not been set.&quot;);
    }

    if (this.enabled) {
      throw new Error(&quot;TextHighlighter is already enabled.&quot;);
    }

    this.enabled = true;

    if (!this._onUpdateTextLayerMatches) {
      this._onUpdateTextLayerMatches = evt =&gt; {
        if (evt.pageIndex === this.pageIdx || evt.pageIndex === -1) {
          this._updateMatches();
        }
      };

      this.eventBus._on(&quot;updatetextlayermatches&quot;, this._onUpdateTextLayerMatches);
    }

    this._updateMatches();
  }

  disable() {
    if (!this.enabled) {
      return;
    }

    this.enabled = false;

    if (this._onUpdateTextLayerMatches) {
      this.eventBus._off(&quot;updatetextlayermatches&quot;, this._onUpdateTextLayerMatches);

      this._onUpdateTextLayerMatches = null;
    }
  }

  _convertMatches(matches, matchesLength) {
    if (!matches) {
      return [];
    }

    const {
      textContentItemsStr
    } = this;
    let i = 0,
        iIndex = 0;
    const end = textContentItemsStr.length - 1;
    const result = [];

    for (let m = 0, mm = matches.length; m &lt; mm; m++) {
      let matchIdx = matches[m];

      while (i !== end &amp;&amp; matchIdx &gt;= iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }

      if (i === textContentItemsStr.length) {
        console.error(&quot;Could not find a matching mapping&quot;);
      }

      const match = {
        begin: {
          divIdx: i,
          offset: matchIdx - iIndex
        }
      };
      matchIdx += matchesLength[m];

      while (i !== end &amp;&amp; matchIdx &gt; iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }

      match.end = {
        divIdx: i,
        offset: matchIdx - iIndex
      };
      result.push(match);
    }

    return result;
  }

  _renderMatches(matches) {
    if (matches.length === 0) {
      return;
    }

    const {
      findController,
      pageIdx
    } = this;
    const {
      textContentItemsStr,
      textDivs
    } = this;
    const isSelectedPage = pageIdx === findController.selected.pageIdx;
    const selectedMatchIdx = findController.selected.matchIdx;
    const highlightAll = findController.state.highlightAll;
    let prevEnd = null;
    const infinity = {
      divIdx: -1,
      offset: undefined
    };

    function beginText(begin, className) {
      const divIdx = begin.divIdx;
      textDivs[divIdx].textContent = &quot;&quot;;
      return appendTextToDiv(divIdx, 0, begin.offset, className);
    }

    function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
      let div = textDivs[divIdx];

      if (div.nodeType === Node.TEXT_NODE) {
        const span = document.createElement(&quot;span&quot;);
        div.before(span);
        span.append(div);
        textDivs[divIdx] = span;
        div = span;
      }

      const content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);
      const node = document.createTextNode(content);

      if (className) {
        const span = document.createElement(&quot;span&quot;);
        span.className = `${className} appended`;
        span.append(node);
        div.append(span);
        return className.includes(&quot;selected&quot;) ? span.offsetLeft : 0;
      }

      div.append(node);
      return 0;
    }

    let i0 = selectedMatchIdx,
        i1 = i0 + 1;

    if (highlightAll) {
      i0 = 0;
      i1 = matches.length;
    } else if (!isSelectedPage) {
      return;
    }

    for (let i = i0; i &lt; i1; i++) {
      const match = matches[i];
      const begin = match.begin;
      const end = match.end;
      const isSelected = isSelectedPage &amp;&amp; i === selectedMatchIdx;
      const highlightSuffix = isSelected ? &quot; selected&quot; : &quot;&quot;;
      let selectedLeft = 0;

      if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
        if (prevEnd !== null) {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
        }

        beginText(begin);
      } else {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
      }

      if (begin.divIdx === end.divIdx) {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, end.offset, &quot;highlight&quot; + highlightSuffix);
      } else {
        selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, &quot;highlight begin&quot; + highlightSuffix);

        for (let n0 = begin.divIdx + 1, n1 = end.divIdx; n0 &lt; n1; n0++) {
          textDivs[n0].className = &quot;highlight middle&quot; + highlightSuffix;
        }

        beginText(end, &quot;highlight end&quot; + highlightSuffix);
      }

      prevEnd = end;

      if (isSelected) {
        findController.scrollMatchIntoView({
          element: textDivs[begin.divIdx],
          selectedLeft,
          pageIndex: pageIdx,
          matchIndex: selectedMatchIdx
        });
      }
    }

    if (prevEnd) {
      appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
    }
  }

  _updateMatches() {
    if (!this.enabled) {
      return;
    }

    const {
      findController,
      matches,
      pageIdx
    } = this;
    const {
      textContentItemsStr,
      textDivs
    } = this;
    let clearedUntilDivIdx = -1;

    for (const match of matches) {
      const begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);

      for (let n = begin, end = match.end.divIdx; n &lt;= end; n++) {
        const div = textDivs[n];
        div.textContent = textContentItemsStr[n];
        div.className = &quot;&quot;;
      }

      clearedUntilDivIdx = match.end.divIdx + 1;
    }

    if (!findController?.highlightMatches) {
      return;
    }

    const pageMatches = findController.pageMatches[pageIdx] || null;
    const pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
    this.matches = this._convertMatches(pageMatches, pageMatchesLength);

    this._renderMatches(this.matches);
  }

}

exports.TextHighlighter = TextHighlighter;

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.TextLayerBuilder = void 0;

var _pdfjsLib = __webpack_require__(5);

class TextLayerBuilder {
  constructor({
    textLayerDiv,
    eventBus,
    pageIndex,
    viewport,
    highlighter = null,
    accessibilityManager = null
  }) {
    this.textLayerDiv = textLayerDiv;
    this.eventBus = eventBus;
    this.textContent = null;
    this.textContentItemsStr = [];
    this.textContentStream = null;
    this.renderingDone = false;
    this.pageNumber = pageIndex + 1;
    this.viewport = viewport;
    this.textDivs = [];
    this.textLayerRenderTask = null;
    this.highlighter = highlighter;
    this.accessibilityManager = accessibilityManager;
    this.#bindMouse();
  }

  #finishRendering() {
    this.renderingDone = true;
    const endOfContent = document.createElement(&quot;div&quot;);
    endOfContent.className = &quot;endOfContent&quot;;
    this.textLayerDiv.append(endOfContent);
    this.eventBus.dispatch(&quot;textlayerrendered&quot;, {
      source: this,
      pageNumber: this.pageNumber,
      numTextDivs: this.textDivs.length
    });
  }

  render(timeout = 0) {
    if (!(this.textContent || this.textContentStream) || this.renderingDone) {
      return;
    }

    this.cancel();
    this.textDivs.length = 0;
    this.highlighter?.setTextMapping(this.textDivs, this.textContentItemsStr);
    this.accessibilityManager?.setTextMapping(this.textDivs);
    const textLayerFrag = document.createDocumentFragment();
    this.textLayerRenderTask = (0, _pdfjsLib.renderTextLayer)({
      textContent: this.textContent,
      textContentStream: this.textContentStream,
      container: textLayerFrag,
      viewport: this.viewport,
      textDivs: this.textDivs,
      textContentItemsStr: this.textContentItemsStr,
      timeout
    });
    this.textLayerRenderTask.promise.then(() =&gt; {
      this.textLayerDiv.append(textLayerFrag);
      this.#finishRendering();
      this.highlighter?.enable();
      this.accessibilityManager?.enable();
    }, function (reason) {});
  }

  cancel() {
    if (this.textLayerRenderTask) {
      this.textLayerRenderTask.cancel();
      this.textLayerRenderTask = null;
    }

    this.highlighter?.disable();
    this.accessibilityManager?.disable();
  }

  setTextContentStream(readableStream) {
    this.cancel();
    this.textContentStream = readableStream;
  }

  setTextContent(textContent) {
    this.cancel();
    this.textContent = textContent;
  }

  #bindMouse() {
    const div = this.textLayerDiv;
    div.addEventListener(&quot;mousedown&quot;, evt =&gt; {
      const end = div.querySelector(&quot;.endOfContent&quot;);

      if (!end) {
        return;
      }

      let adjustTop = evt.target !== div;
      adjustTop &amp;&amp;= getComputedStyle(end).getPropertyValue(&quot;-moz-user-select&quot;) !== &quot;none&quot;;

      if (adjustTop) {
        const divBounds = div.getBoundingClientRect();
        const r = Math.max(0, (evt.pageY - divBounds.top) / divBounds.height);
        end.style.top = (r * 100).toFixed(2) + &quot;%&quot;;
      }

      end.classList.add(&quot;active&quot;);
    });
    div.addEventListener(&quot;mouseup&quot;, () =&gt; {
      const end = div.querySelector(&quot;.endOfContent&quot;);

      if (!end) {
        return;
      }

      end.style.top = &quot;&quot;;
      end.classList.remove(&quot;active&quot;);
    });
  }

}

exports.TextLayerBuilder = TextLayerBuilder;

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.XfaLayerBuilder = void 0;

var _pdfjsLib = __webpack_require__(5);

class XfaLayerBuilder {
  constructor({
    pageDiv,
    pdfPage,
    annotationStorage = null,
    linkService,
    xfaHtml = null
  }) {
    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.annotationStorage = annotationStorage;
    this.linkService = linkService;
    this.xfaHtml = xfaHtml;
    this.div = null;
    this._cancelled = false;
  }

  render(viewport, intent = &quot;display&quot;) {
    if (intent === &quot;print&quot;) {
      const parameters = {
        viewport: viewport.clone({
          dontFlip: true
        }),
        div: this.div,
        xfaHtml: this.xfaHtml,
        annotationStorage: this.annotationStorage,
        linkService: this.linkService,
        intent
      };
      const div = document.createElement(&quot;div&quot;);
      this.pageDiv.append(div);
      parameters.div = div;

      const result = _pdfjsLib.XfaLayer.render(parameters);

      return Promise.resolve(result);
    }

    return this.pdfPage.getXfa().then(xfaHtml =&gt; {
      if (this._cancelled || !xfaHtml) {
        return {
          textDivs: []
        };
      }

      const parameters = {
        viewport: viewport.clone({
          dontFlip: true
        }),
        div: this.div,
        xfaHtml,
        annotationStorage: this.annotationStorage,
        linkService: this.linkService,
        intent
      };

      if (this.div) {
        return _pdfjsLib.XfaLayer.update(parameters);
      }

      this.div = document.createElement(&quot;div&quot;);
      this.pageDiv.append(this.div);
      parameters.div = this.div;
      return _pdfjsLib.XfaLayer.render(parameters);
    }).catch(error =&gt; {
      console.error(error);
    });
  }

  cancel() {
    this._cancelled = true;
  }

  hide() {
    if (!this.div) {
      return;
    }

    this.div.hidden = true;
  }

}

exports.XfaLayerBuilder = XfaLayerBuilder;

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.SecondaryToolbar = void 0;

var _ui_utils = __webpack_require__(1);

var _pdf_cursor_tools = __webpack_require__(7);

var _pdf_viewer = __webpack_require__(28);

class SecondaryToolbar {
  constructor(options, eventBus, externalServices) {
    this.toolbar = options.toolbar;
    this.toggleButton = options.toggleButton;
    this.buttons = [{
      element: options.presentationModeButton,
      eventName: &quot;presentationmode&quot;,
      close: true
    }, {
      element: options.printButton,
      eventName: &quot;print&quot;,
      close: true
    }, {
      element: options.downloadButton,
      eventName: &quot;download&quot;,
      close: true
    }, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
    }, {
      element: options.firstPageButton,
      eventName: &quot;firstpage&quot;,
      close: true
    }, {
      element: options.lastPageButton,
      eventName: &quot;lastpage&quot;,
      close: true
    }, {
      element: options.pageRotateCwButton,
      eventName: &quot;rotatecw&quot;,
      close: false
    }, {
      element: options.pageRotateCcwButton,
      eventName: &quot;rotateccw&quot;,
      close: false
    }, {
      element: options.cursorSelectToolButton,
      eventName: &quot;switchcursortool&quot;,
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.SELECT
      },
      close: true
    }, {
      element: options.cursorHandToolButton,
      eventName: &quot;switchcursortool&quot;,
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.HAND
      },
      close: true
    }, {
      element: options.scrollPageButton,
      eventName: &quot;switchscrollmode&quot;,
      eventDetails: {
        mode: _ui_utils.ScrollMode.PAGE
      },
      close: true
    }, {
      element: options.scrollVerticalButton,
      eventName: &quot;switchscrollmode&quot;,
      eventDetails: {
        mode: _ui_utils.ScrollMode.VERTICAL
      },
      close: true
    }, {
      element: options.scrollHorizontalButton,
      eventName: &quot;switchscrollmode&quot;,
      eventDetails: {
        mode: _ui_utils.ScrollMode.HORIZONTAL
      },
      close: true
    }, {
      element: options.scrollWrappedButton,
      eventName: &quot;switchscrollmode&quot;,
      eventDetails: {
        mode: _ui_utils.ScrollMode.WRAPPED
      },
      close: true
    }, {
      element: options.spreadNoneButton,
      eventName: &quot;switchspreadmode&quot;,
      eventDetails: {
        mode: _ui_utils.SpreadMode.NONE
      },
      close: true
    }, {
      element: options.spreadOddButton,
      eventName: &quot;switchspreadmode&quot;,
      eventDetails: {
        mode: _ui_utils.SpreadMode.ODD
      },
      close: true
    }, {
      element: options.spreadEvenButton,
      eventName: &quot;switchspreadmode&quot;,
      eventDetails: {
        mode: _ui_utils.SpreadMode.EVEN
      },
      close: true
    }, {
      element: options.documentPropertiesButton,
      eventName: &quot;documentproperties&quot;,
      close: true
    }];
    this.buttons.push({
      element: options.openFileButton,
      eventName: &quot;openfile&quot;,
      close: true
    });
    this.items = {
      firstPage: options.firstPageButton,
      lastPage: options.lastPageButton,
      pageRotateCw: options.pageRotateCwButton,
      pageRotateCcw: options.pageRotateCcwButton
    };
    this.eventBus = eventBus;
    this.externalServices = externalServices;
    this.opened = false;
    this.#bindClickListeners();
    this.#bindCursorToolsListener(options);
    this.#bindScrollModeListener(options);
    this.#bindSpreadModeListener(options);
    this.reset();
  }

  get isOpen() {
    return this.opened;
  }

  setPageNumber(pageNumber) {
    this.pageNumber = pageNumber;
    this.#updateUIState();
  }

  setPagesCount(pagesCount) {
    this.pagesCount = pagesCount;
    this.#updateUIState();
  }

  reset() {
    this.pageNumber = 0;
    this.pagesCount = 0;
    this.#updateUIState();
    this.eventBus.dispatch(&quot;secondarytoolbarreset&quot;, {
      source: this
    });
  }

  #updateUIState() {
    this.items.firstPage.disabled = this.pageNumber &lt;= 1;
    this.items.lastPage.disabled = this.pageNumber &gt;= this.pagesCount;
    this.items.pageRotateCw.disabled = this.pagesCount === 0;
    this.items.pageRotateCcw.disabled = this.pagesCount === 0;
  }

  #bindClickListeners() {
    this.toggleButton.addEventListener(&quot;click&quot;, this.toggle.bind(this));

    for (const {
      element,
      eventName,
      close,
      eventDetails
    } of this.buttons) {
      element.addEventListener(&quot;click&quot;, evt =&gt; {
        if (eventName !== null) {
          const details = {
            source: this
          };

          for (const property in eventDetails) {
            details[property] = eventDetails[property];
          }

          this.eventBus.dispatch(eventName, details);
        }

        if (close) {
          this.close();
        }

        this.externalServices.reportTelemetry({
          type: &quot;buttons&quot;,
          data: {
            id: element.id
          }
        });
      });
    }
  }

  #bindCursorToolsListener({
    cursorSelectToolButton,
    cursorHandToolButton
  }) {
    this.eventBus._on(&quot;cursortoolchanged&quot;, function ({
      tool
    }) {
      const isSelect = tool === _pdf_cursor_tools.CursorTool.SELECT,
            isHand = tool === _pdf_cursor_tools.CursorTool.HAND;
      cursorSelectToolButton.classList.toggle(&quot;toggled&quot;, isSelect);
      cursorHandToolButton.classList.toggle(&quot;toggled&quot;, isHand);
      cursorSelectToolButton.setAttribute(&quot;aria-checked&quot;, isSelect);
      cursorHandToolButton.setAttribute(&quot;aria-checked&quot;, isHand);
    });
  }

  #bindScrollModeListener({
    scrollPageButton,
    scrollVerticalButton,
    scrollHorizontalButton,
    scrollWrappedButton,
    spreadNoneButton,
    spreadOddButton,
    spreadEvenButton
  }) {
    const scrollModeChanged = ({
      mode
    }) =&gt; {
      const isPage = mode === _ui_utils.ScrollMode.PAGE,
            isVertical = mode === _ui_utils.ScrollMode.VERTICAL,
            isHorizontal = mode === _ui_utils.ScrollMode.HORIZONTAL,
            isWrapped = mode === _ui_utils.ScrollMode.WRAPPED;
      scrollPageButton.classList.toggle(&quot;toggled&quot;, isPage);
      scrollVerticalButton.classList.toggle(&quot;toggled&quot;, isVertical);
      scrollHorizontalButton.classList.toggle(&quot;toggled&quot;, isHorizontal);
      scrollWrappedButton.classList.toggle(&quot;toggled&quot;, isWrapped);
      scrollPageButton.setAttribute(&quot;aria-checked&quot;, isPage);
      scrollVerticalButton.setAttribute(&quot;aria-checked&quot;, isVertical);
      scrollHorizontalButton.setAttribute(&quot;aria-checked&quot;, isHorizontal);
      scrollWrappedButton.setAttribute(&quot;aria-checked&quot;, isWrapped);
      const forceScrollModePage = this.pagesCount &gt; _pdf_viewer.PagesCountLimit.FORCE_SCROLL_MODE_PAGE;
      scrollPageButton.disabled = forceScrollModePage;
      scrollVerticalButton.disabled = forceScrollModePage;
      scrollHorizontalButton.disabled = forceScrollModePage;
      scrollWrappedButton.disabled = forceScrollModePage;
      spreadNoneButton.disabled = isHorizontal;
      spreadOddButton.disabled = isHorizontal;
      spreadEvenButton.disabled = isHorizontal;
    };

    this.eventBus._on(&quot;scrollmodechanged&quot;, scrollModeChanged);

    this.eventBus._on(&quot;secondarytoolbarreset&quot;, evt =&gt; {
      if (evt.source === this) {
        scrollModeChanged({
          mode: _ui_utils.ScrollMode.VERTICAL
        });
      }
    });
  }

  #bindSpreadModeListener({
    spreadNoneButton,
    spreadOddButton,
    spreadEvenButton
  }) {
    function spreadModeChanged({
      mode
    }) {
      const isNone = mode === _ui_utils.SpreadMode.NONE,
            isOdd = mode === _ui_utils.SpreadMode.ODD,
            isEven = mode === _ui_utils.SpreadMode.EVEN;
      spreadNoneButton.classList.toggle(&quot;toggled&quot;, isNone);
      spreadOddButton.classList.toggle(&quot;toggled&quot;, isOdd);
      spreadEvenButton.classList.toggle(&quot;toggled&quot;, isEven);
      spreadNoneButton.setAttribute(&quot;aria-checked&quot;, isNone);
      spreadOddButton.setAttribute(&quot;aria-checked&quot;, isOdd);
      spreadEvenButton.setAttribute(&quot;aria-checked&quot;, isEven);
    }

    this.eventBus._on(&quot;spreadmodechanged&quot;, spreadModeChanged);

    this.eventBus._on(&quot;secondarytoolbarreset&quot;, evt =&gt; {
      if (evt.source === this) {
        spreadModeChanged({
          mode: _ui_utils.SpreadMode.NONE
        });
      }
    });
  }

  open() {
    if (this.opened) {
      return;
    }

    this.opened = true;
    this.toggleButton.classList.add(&quot;toggled&quot;);
    this.toggleButton.setAttribute(&quot;aria-expanded&quot;, &quot;true&quot;);
    this.toolbar.classList.remove(&quot;hidden&quot;);
  }

  close() {
    if (!this.opened) {
      return;
    }

    this.opened = false;
    this.toolbar.classList.add(&quot;hidden&quot;);
    this.toggleButton.classList.remove(&quot;toggled&quot;);
    this.toggleButton.setAttribute(&quot;aria-expanded&quot;, &quot;false&quot;);
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

}

exports.SecondaryToolbar = SecondaryToolbar;

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.Toolbar = void 0;

var _ui_utils = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(5);

const PAGE_NUMBER_LOADING_INDICATOR = &quot;visiblePageIsLoading&quot;;

class Toolbar {
  #wasLocalized = false;

  constructor(options, eventBus, l10n) {
    this.toolbar = options.container;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.buttons = [{
      element: options.previous,
      eventName: &quot;previouspage&quot;
    }, {
      element: options.next,
      eventName: &quot;nextpage&quot;
    }, {
      element: options.zoomIn,
      eventName: &quot;zoomin&quot;
    }, {
      element: options.zoomOut,
      eventName: &quot;zoomout&quot;
    }, {
      element: options.print,
      eventName: &quot;print&quot;
    }, {
      element: options.download,
      eventName: &quot;download&quot;
    }, {
      element: options.editorFreeTextButton,
      eventName: &quot;switchannotationeditormode&quot;,
      eventDetails: {
        get mode() {
          const {
            classList
          } = options.editorFreeTextButton;
          return classList.contains(&quot;toggled&quot;) ? _pdfjsLib.AnnotationEditorType.NONE : _pdfjsLib.AnnotationEditorType.FREETEXT;
        }

      }
    }, {
      element: options.editorInkButton,
      eventName: &quot;switchannotationeditormode&quot;,
      eventDetails: {
        get mode() {
          const {
            classList
          } = options.editorInkButton;
          return classList.contains(&quot;toggled&quot;) ? _pdfjsLib.AnnotationEditorType.NONE : _pdfjsLib.AnnotationEditorType.INK;
        }

      }
    }];
    this.buttons.push({
      element: options.openFile,
      eventName: &quot;openfile&quot;
    });
    this.items = {
      numPages: options.numPages,
      pageNumber: options.pageNumber,
      scaleSelect: options.scaleSelect,
      customScaleOption: options.customScaleOption,
      previous: options.previous,
      next: options.next,
      zoomIn: options.zoomIn,
      zoomOut: options.zoomOut
    };
    this.#bindListeners(options);
    this.reset();
  }

  setPageNumber(pageNumber, pageLabel) {
    this.pageNumber = pageNumber;
    this.pageLabel = pageLabel;
    this.#updateUIState(false);
  }

  setPagesCount(pagesCount, hasPageLabels) {
    this.pagesCount = pagesCount;
    this.hasPageLabels = hasPageLabels;
    this.#updateUIState(true);
  }

  setPageScale(pageScaleValue, pageScale) {
    this.pageScaleValue = (pageScaleValue || pageScale).toString();
    this.pageScale = pageScale;
    this.#updateUIState(false);
  }

  reset() {
    this.pageNumber = 0;
    this.pageLabel = null;
    this.hasPageLabels = false;
    this.pagesCount = 0;
    this.pageScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
    this.pageScale = _ui_utils.DEFAULT_SCALE;
    this.#updateUIState(true);
    this.updateLoadingIndicatorState();
    this.eventBus.dispatch(&quot;toolbarreset&quot;, {
      source: this
    });
  }

  #bindListeners(options) {
    const {
      pageNumber,
      scaleSelect
    } = this.items;
    const self = this;

    for (const {
      element,
      eventName,
      eventDetails
    } of this.buttons) {
      element.addEventListener(&quot;click&quot;, evt =&gt; {
        if (eventName !== null) {
          const details = {
            source: this
          };

          if (eventDetails) {
            for (const property in eventDetails) {
              details[property] = eventDetails[property];
            }
          }

          this.eventBus.dispatch(eventName, details);
        }
      });
    }

    pageNumber.addEventListener(&quot;click&quot;, function () {
      this.select();
    });
    pageNumber.addEventListener(&quot;change&quot;, function () {
      self.eventBus.dispatch(&quot;pagenumberchanged&quot;, {
        source: self,
        value: this.value
      });
    });
    scaleSelect.addEventListener(&quot;change&quot;, function () {
      if (this.value === &quot;custom&quot;) {
        return;
      }

      self.eventBus.dispatch(&quot;scalechanged&quot;, {
        source: self,
        value: this.value
      });
    });
    scaleSelect.addEventListener(&quot;click&quot;, function (evt) {
      const target = evt.target;

      if (this.value === self.pageScaleValue &amp;&amp; target.tagName.toUpperCase() === &quot;OPTION&quot;) {
        this.blur();
      }
    });
    scaleSelect.oncontextmenu = _ui_utils.noContextMenuHandler;

    this.eventBus._on(&quot;localized&quot;, () =&gt; {
      this.#wasLocalized = true;
      this.#adjustScaleWidth();
      this.#updateUIState(true);
    });

    this.#bindEditorToolsListener(options);
  }

  #bindEditorToolsListener({
    editorFreeTextButton,
    editorFreeTextParamsToolbar,
    editorInkButton,
    editorInkParamsToolbar
  }) {
    const editorModeChanged = (evt, disableButtons = false) =&gt; {
      const editorButtons = [{
        mode: _pdfjsLib.AnnotationEditorType.FREETEXT,
        button: editorFreeTextButton,
        toolbar: editorFreeTextParamsToolbar
      }, {
        mode: _pdfjsLib.AnnotationEditorType.INK,
        button: editorInkButton,
        toolbar: editorInkParamsToolbar
      }];

      for (const {
        mode,
        button,
        toolbar
      } of editorButtons) {
        const checked = mode === evt.mode;
        button.classList.toggle(&quot;toggled&quot;, checked);
        button.setAttribute(&quot;aria-checked&quot;, checked);
        button.disabled = disableButtons;
        toolbar?.classList.toggle(&quot;hidden&quot;, !checked);
      }
    };

    this.eventBus._on(&quot;annotationeditormodechanged&quot;, editorModeChanged);

    this.eventBus._on(&quot;toolbarreset&quot;, evt =&gt; {
      if (evt.source === this) {
        editorModeChanged({
          mode: _pdfjsLib.AnnotationEditorType.NONE
        }, true);
      }
    });
  }

  #updateUIState(resetNumPages = false) {
    if (!this.#wasLocalized) {
      return;
    }

    const {
      pageNumber,
      pagesCount,
      pageScaleValue,
      pageScale,
      items
    } = this;

    if (resetNumPages) {
      if (this.hasPageLabels) {
        items.pageNumber.type = &quot;text&quot;;
      } else {
        items.pageNumber.type = &quot;number&quot;;
        this.l10n.get(&quot;of_pages&quot;, {
          pagesCount
        }).then(msg =&gt; {
          items.numPages.textContent = msg;
        });
      }

      items.pageNumber.max = pagesCount;
    }

    if (this.hasPageLabels) {
      items.pageNumber.value = this.pageLabel;
      this.l10n.get(&quot;page_of_pages&quot;, {
        pageNumber,
        pagesCount
      }).then(msg =&gt; {
        items.numPages.textContent = msg;
      });
    } else {
      items.pageNumber.value = pageNumber;
    }

    items.previous.disabled = pageNumber &lt;= 1;
    items.next.disabled = pageNumber &gt;= pagesCount;
    items.zoomOut.disabled = pageScale &lt;= _ui_utils.MIN_SCALE;
    items.zoomIn.disabled = pageScale &gt;= _ui_utils.MAX_SCALE;
    this.l10n.get(&quot;page_scale_percent&quot;, {
      scale: Math.round(pageScale * 10000) / 100
    }).then(msg =&gt; {
      let predefinedValueFound = false;

      for (const option of items.scaleSelect.options) {
        if (option.value !== pageScaleValue) {
          option.selected = false;
          continue;
        }

        option.selected = true;
        predefinedValueFound = true;
      }

      if (!predefinedValueFound) {
        items.customScaleOption.textContent = msg;
        items.customScaleOption.selected = true;
      }
    });
  }

  updateLoadingIndicatorState(loading = false) {
    const {
      pageNumber
    } = this.items;
    pageNumber.classList.toggle(PAGE_NUMBER_LOADING_INDICATOR, loading);
  }

  async #adjustScaleWidth() {
    const {
      items,
      l10n
    } = this;
    const predefinedValuesPromise = Promise.all([l10n.get(&quot;page_scale_auto&quot;), l10n.get(&quot;page_scale_actual&quot;), l10n.get(&quot;page_scale_fit&quot;), l10n.get(&quot;page_scale_width&quot;)]);
    await _ui_utils.animationStarted;
    const style = getComputedStyle(items.scaleSelect);
    const scaleSelectWidth = parseFloat(style.getPropertyValue(&quot;--scale-select-width&quot;));
    const canvas = document.createElement(&quot;canvas&quot;);
    const ctx = canvas.getContext(&quot;2d&quot;, {
      alpha: false
    });
    ctx.font = `${style.fontSize} ${style.fontFamily}`;
    let maxWidth = 0;

    for (const predefinedValue of await predefinedValuesPromise) {
      const {
        width
      } = ctx.measureText(predefinedValue);

      if (width &gt; maxWidth) {
        maxWidth = width;
      }
    }

    maxWidth += 0.3 * scaleSelectWidth;

    if (maxWidth &gt; scaleSelectWidth) {
      _ui_utils.docStyle.setProperty(&quot;--scale-select-width&quot;, `${maxWidth}px`);
    }

    canvas.width = 0;
    canvas.height = 0;
  }

}

exports.Toolbar = Toolbar;

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.ViewHistory = void 0;
const DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;

class ViewHistory {
  constructor(fingerprint, cacheSize = DEFAULT_VIEW_HISTORY_CACHE_SIZE) {
    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize;
    this._initializedPromise = this._readFromStorage().then(databaseStr =&gt; {
      const database = JSON.parse(databaseStr || &quot;{}&quot;);
      let index = -1;

      if (!Array.isArray(database.files)) {
        database.files = [];
      } else {
        while (database.files.length &gt;= this.cacheSize) {
          database.files.shift();
        }

        for (let i = 0, ii = database.files.length; i &lt; ii; i++) {
          const branch = database.files[i];

          if (branch.fingerprint === this.fingerprint) {
            index = i;
            break;
          }
        }
      }

      if (index === -1) {
        index = database.files.push({
          fingerprint: this.fingerprint
        }) - 1;
      }

      this.file = database.files[index];
      this.database = database;
    });
  }

  async _writeToStorage() {
    const databaseStr = JSON.stringify(this.database);
    localStorage.setItem(&quot;pdfjs.history&quot;, databaseStr);
  }

  async _readFromStorage() {
    return localStorage.getItem(&quot;pdfjs.history&quot;);
  }

  async set(name, val) {
    await this._initializedPromise;
    this.file[name] = val;
    return this._writeToStorage();
  }

  async setMultiple(properties) {
    await this._initializedPromise;

    for (const name in properties) {
      this.file[name] = properties[name];
    }

    return this._writeToStorage();
  }

  async get(name, defaultValue) {
    await this._initializedPromise;
    const val = this.file[name];
    return val !== undefined ? val : defaultValue;
  }

  async getMultiple(properties) {
    await this._initializedPromise;
    const values = Object.create(null);

    for (const name in properties) {
      const val = this.file[name];
      values[name] = val !== undefined ? val : properties[name];
    }

    return values;
  }

}

exports.ViewHistory = ViewHistory;

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.GenericCom = void 0;

var _app = __webpack_require__(4);

var _preferences = __webpack_require__(42);

var _download_manager = __webpack_require__(43);

var _genericl10n = __webpack_require__(44);

var _generic_scripting = __webpack_require__(46);

;
const GenericCom = {};
exports.GenericCom = GenericCom;

class GenericPreferences extends _preferences.BasePreferences {
  async _writeToStorage(prefObj) {
    localStorage.setItem(&quot;pdfjs.preferences&quot;, JSON.stringify(prefObj));
  }

  async _readFromStorage(prefObj) {
    return JSON.parse(localStorage.getItem(&quot;pdfjs.preferences&quot;));
  }

}

class GenericExternalServices extends _app.DefaultExternalServices {
  static createDownloadManager(options) {
    return new _download_manager.DownloadManager();
  }

  static createPreferences() {
    return new GenericPreferences();
  }

  static createL10n({
    locale = &quot;en-US&quot;
  }) {
    return new _genericl10n.GenericL10n(locale);
  }

  static createScripting({
    sandboxBundleSrc
  }) {
    return new _generic_scripting.GenericScripting(sandboxBundleSrc);
  }

}

_app.PDFViewerApplication.externalServices = GenericExternalServices;

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.BasePreferences = void 0;

var _app_options = __webpack_require__(2);

class BasePreferences {
  #defaults = Object.freeze({
    &quot;annotationEditorMode&quot;: 0,
    &quot;annotationMode&quot;: 2,
    &quot;cursorToolOnLoad&quot;: 0,
    &quot;defaultZoomValue&quot;: &quot;&quot;,
    &quot;disablePageLabels&quot;: false,
    &quot;enablePermissions&quot;: false,
    &quot;enablePrintAutoRotate&quot;: true,
    &quot;enableScripting&quot;: true,
    &quot;externalLinkTarget&quot;: 0,
    &quot;historyUpdateUrl&quot;: false,
    &quot;ignoreDestinationZoom&quot;: false,
    &quot;forcePageColors&quot;: false,
    &quot;pageColorsBackground&quot;: &quot;Canvas&quot;,
    &quot;pageColorsForeground&quot;: &quot;CanvasText&quot;,
    &quot;pdfBugEnabled&quot;: false,
    &quot;sidebarViewOnLoad&quot;: -1,
    &quot;scrollModeOnLoad&quot;: -1,
    &quot;spreadModeOnLoad&quot;: -1,
    &quot;textLayerMode&quot;: 1,
    &quot;useOnlyCssZoom&quot;: false,
    &quot;viewerCssTheme&quot;: 0,
    &quot;viewOnLoad&quot;: 0,
    &quot;disableAutoFetch&quot;: false,
    &quot;disableFontFace&quot;: false,
    &quot;disableRange&quot;: false,
    &quot;disableStream&quot;: false,
    &quot;enableXfa&quot;: true,
    &quot;renderer&quot;: &quot;canvas&quot;
  });
  #prefs = Object.create(null);
  #initializedPromise = null;

  constructor() {
    if (this.constructor === BasePreferences) {
      throw new Error(&quot;Cannot initialize BasePreferences.&quot;);
    }

    this.#initializedPromise = this._readFromStorage(this.#defaults).then(prefs =&gt; {
      for (const name in this.#defaults) {
        const prefValue = prefs?.[name];

        if (typeof prefValue === typeof this.#defaults[name]) {
          this.#prefs[name] = prefValue;
        }
      }
    });
  }

  async _writeToStorage(prefObj) {
    throw new Error(&quot;Not implemented: _writeToStorage&quot;);
  }

  async _readFromStorage(prefObj) {
    throw new Error(&quot;Not implemented: _readFromStorage&quot;);
  }

  async reset() {
    await this.#initializedPromise;
    const prefs = this.#prefs;
    this.#prefs = Object.create(null);
    return this._writeToStorage(this.#defaults).catch(reason =&gt; {
      this.#prefs = prefs;
      throw reason;
    });
  }

  async set(name, value) {
    await this.#initializedPromise;
    const defaultValue = this.#defaults[name],
          prefs = this.#prefs;

    if (defaultValue === undefined) {
      throw new Error(`Set preference: &quot;${name}&quot; is undefined.`);
    } else if (value === undefined) {
      throw new Error(&quot;Set preference: no value is specified.&quot;);
    }

    const valueType = typeof value,
          defaultType = typeof defaultValue;

    if (valueType !== defaultType) {
      if (valueType === &quot;number&quot; &amp;&amp; defaultType === &quot;string&quot;) {
        value = value.toString();
      } else {
        throw new Error(`Set preference: &quot;${value}&quot; is a ${valueType}, expected a ${defaultType}.`);
      }
    } else {
      if (valueType === &quot;number&quot; &amp;&amp; !Number.isInteger(value)) {
        throw new Error(`Set preference: &quot;${value}&quot; must be an integer.`);
      }
    }

    this.#prefs[name] = value;
    return this._writeToStorage(this.#prefs).catch(reason =&gt; {
      this.#prefs = prefs;
      throw reason;
    });
  }

  async get(name) {
    await this.#initializedPromise;
    const defaultValue = this.#defaults[name];

    if (defaultValue === undefined) {
      throw new Error(`Get preference: &quot;${name}&quot; is undefined.`);
    }

    return this.#prefs[name] ?? defaultValue;
  }

  async getAll() {
    await this.#initializedPromise;
    const obj = Object.create(null);

    for (const name in this.#defaults) {
      obj[name] = this.#prefs[name] ?? this.#defaults[name];
    }

    return obj;
  }

}

exports.BasePreferences = BasePreferences;

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.DownloadManager = void 0;

var _pdfjsLib = __webpack_require__(5);

;

function download(blobUrl, filename) {
  const a = document.createElement(&quot;a&quot;);

  if (!a.click) {
    throw new Error(&apos;DownloadManager: &quot;a.click()&quot; is not supported.&apos;);
  }

  a.href = blobUrl;
  a.target = &quot;_parent&quot;;

  if (&quot;download&quot; in a) {
    a.download = filename;
  }

  (document.body || document.documentElement).append(a);
  a.click();
  a.remove();
}

class DownloadManager {
  constructor() {
    this._openBlobUrls = new WeakMap();
  }

  downloadUrl(url, filename) {
    if (!(0, _pdfjsLib.createValidAbsoluteUrl)(url, &quot;http://example.com&quot;)) {
      console.error(`downloadUrl - not a valid URL: ${url}`);
      return;
    }

    download(url + &quot;#pdfjs.action=download&quot;, filename);
  }

  downloadData(data, filename, contentType) {
    const blobUrl = URL.createObjectURL(new Blob([data], {
      type: contentType
    }));
    download(blobUrl, filename);
  }

  openOrDownloadData(element, data, filename) {
    const isPdfData = (0, _pdfjsLib.isPdfFile)(filename);
    const contentType = isPdfData ? &quot;application/pdf&quot; : &quot;&quot;;

    if (isPdfData) {
      let blobUrl = this._openBlobUrls.get(element);

      if (!blobUrl) {
        blobUrl = URL.createObjectURL(new Blob([data], {
          type: contentType
        }));

        this._openBlobUrls.set(element, blobUrl);
      }

      let viewerUrl;
      viewerUrl = &quot;?file=&quot; + encodeURIComponent(blobUrl + &quot;#&quot; + filename);

      try {
        window.open(viewerUrl);
        return true;
      } catch (ex) {
        console.error(`openOrDownloadData: ${ex}`);
        URL.revokeObjectURL(blobUrl);

        this._openBlobUrls.delete(element);
      }
    }

    this.downloadData(data, filename, contentType);
    return false;
  }

  download(blob, url, filename) {
    const blobUrl = URL.createObjectURL(blob);
    download(blobUrl, filename);
  }

}

exports.DownloadManager = DownloadManager;

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.GenericL10n = void 0;

__webpack_require__(45);

var _l10n_utils = __webpack_require__(30);

const webL10n = document.webL10n;

class GenericL10n {
  constructor(lang) {
    this._lang = lang;
    this._ready = new Promise((resolve, reject) =&gt; {
      webL10n.setLanguage((0, _l10n_utils.fixupLangCode)(lang), () =&gt; {
        resolve(webL10n);
      });
    });
  }

  async getLanguage() {
    const l10n = await this._ready;
    return l10n.getLanguage();
  }

  async getDirection() {
    const l10n = await this._ready;
    return l10n.getDirection();
  }

  async get(key, args = null, fallback = (0, _l10n_utils.getL10nFallback)(key, args)) {
    const l10n = await this._ready;
    return l10n.get(key, args, fallback);
  }

  async translate(element) {
    const l10n = await this._ready;
    return l10n.translate(element);
  }

}

exports.GenericL10n = GenericL10n;

/***/ }),
/* 45 */
/***/ (() =&gt; {



document.webL10n = function (window, document, undefined) {
  var gL10nData = {};
  var gTextData = &apos;&apos;;
  var gTextProp = &apos;textContent&apos;;
  var gLanguage = &apos;&apos;;
  var gMacros = {};
  var gReadyState = &apos;loading&apos;;
  var gAsyncResourceLoading = true;

  function getL10nResourceLinks() {
    return document.querySelectorAll(&apos;link[type=&quot;application/l10n&quot;]&apos;);
  }

  function getL10nDictionary() {
    var script = document.querySelector(&apos;script[type=&quot;application/l10n&quot;]&apos;);
    return script ? JSON.parse(script.innerHTML) : null;
  }

  function getTranslatableChildren(element) {
    return element ? element.querySelectorAll(&apos;*[data-l10n-id]&apos;) : [];
  }

  function getL10nAttributes(element) {
    if (!element) return {};
    var l10nId = element.getAttribute(&apos;data-l10n-id&apos;);
    var l10nArgs = element.getAttribute(&apos;data-l10n-args&apos;);
    var args = {};

    if (l10nArgs) {
      try {
        args = JSON.parse(l10nArgs);
      } catch (e) {
        console.warn(&apos;could not parse arguments for #&apos; + l10nId);
      }
    }

    return {
      id: l10nId,
      args: args
    };
  }

  function xhrLoadText(url, onSuccess, onFailure) {
    onSuccess = onSuccess || function _onSuccess(data) {};

    onFailure = onFailure || function _onFailure() {};

    var xhr = new XMLHttpRequest();
    xhr.open(&apos;GET&apos;, url, gAsyncResourceLoading);

    if (xhr.overrideMimeType) {
      xhr.overrideMimeType(&apos;text/plain; charset=utf-8&apos;);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status === 0) {
          onSuccess(xhr.responseText);
        } else {
          onFailure();
        }
      }
    };

    xhr.onerror = onFailure;
    xhr.ontimeout = onFailure;

    try {
      xhr.send(null);
    } catch (e) {
      onFailure();
    }
  }

  function parseResource(href, lang, successCallback, failureCallback) {
    var baseURL = href.replace(/[^\/]*$/, &apos;&apos;) || &apos;./&apos;;

    function evalString(text) {
      if (text.lastIndexOf(&apos;\\&apos;) &lt; 0) return text;
      return text.replace(/\\\\/g, &apos;\\&apos;).replace(/\\n/g, &apos;\n&apos;).replace(/\\r/g, &apos;\r&apos;).replace(/\\t/g, &apos;\t&apos;).replace(/\\b/g, &apos;\b&apos;).replace(/\\f/g, &apos;\f&apos;).replace(/\\{/g, &apos;{&apos;).replace(/\\}/g, &apos;}&apos;).replace(/\\&quot;/g, &apos;&quot;&apos;).replace(/\\&apos;/g, &quot;&apos;&quot;);
    }

    function parseProperties(text, parsedPropertiesCallback) {
      var dictionary = {};
      var reBlank = /^\s*|\s*$/;
      var reComment = /^\s*#|^\s*$/;
      var reSection = /^\s*\[(.*)\]\s*$/;
      var reImport = /^\s*@import\s+url\((.*)\)\s*$/i;
      var reSplit = /^([^=\s]*)\s*=\s*(.+)$/;

      function parseRawLines(rawText, extendedSyntax, parsedRawLinesCallback) {
        var entries = rawText.replace(reBlank, &apos;&apos;).split(/[\r\n]+/);
        var currentLang = &apos;*&apos;;
        var genericLang = lang.split(&apos;-&apos;, 1)[0];
        var skipLang = false;
        var match = &apos;&apos;;

        function nextEntry() {
          while (true) {
            if (!entries.length) {
              parsedRawLinesCallback();
              return;
            }

            var line = entries.shift();
            if (reComment.test(line)) continue;

            if (extendedSyntax) {
              match = reSection.exec(line);

              if (match) {
                currentLang = match[1].toLowerCase();
                skipLang = currentLang !== &apos;*&apos; &amp;&amp; currentLang !== lang &amp;&amp; currentLang !== genericLang;
                continue;
              } else if (skipLang) {
                continue;
              }

              match = reImport.exec(line);

              if (match) {
                loadImport(baseURL + match[1], nextEntry);
                return;
              }
            }

            var tmp = line.match(reSplit);

            if (tmp &amp;&amp; tmp.length == 3) {
              dictionary[tmp[1]] = evalString(tmp[2]);
            }
          }
        }

        nextEntry();
      }

      function loadImport(url, callback) {
        xhrLoadText(url, function (content) {
          parseRawLines(content, false, callback);
        }, function () {
          console.warn(url + &apos; not found.&apos;);
          callback();
        });
      }

      parseRawLines(text, true, function () {
        parsedPropertiesCallback(dictionary);
      });
    }

    xhrLoadText(href, function (response) {
      gTextData += response;
      parseProperties(response, function (data) {
        for (var key in data) {
          var id,
              prop,
              index = key.lastIndexOf(&apos;.&apos;);

          if (index &gt; 0) {
            id = key.substring(0, index);
            prop = key.substring(index + 1);
          } else {
            id = key;
            prop = gTextProp;
          }

          if (!gL10nData[id]) {
            gL10nData[id] = {};
          }

          gL10nData[id][prop] = data[key];
        }

        if (successCallback) {
          successCallback();
        }
      });
    }, failureCallback);
  }

  function loadLocale(lang, callback) {
    if (lang) {
      lang = lang.toLowerCase();
    }

    callback = callback || function _callback() {};

    clear();
    gLanguage = lang;
    var langLinks = getL10nResourceLinks();
    var langCount = langLinks.length;

    if (langCount === 0) {
      var dict = getL10nDictionary();

      if (dict &amp;&amp; dict.locales &amp;&amp; dict.default_locale) {
        console.log(&apos;using the embedded JSON directory, early way out&apos;);
        gL10nData = dict.locales[lang];

        if (!gL10nData) {
          var defaultLocale = dict.default_locale.toLowerCase();

          for (var anyCaseLang in dict.locales) {
            anyCaseLang = anyCaseLang.toLowerCase();

            if (anyCaseLang === lang) {
              gL10nData = dict.locales[lang];
              break;
            } else if (anyCaseLang === defaultLocale) {
              gL10nData = dict.locales[defaultLocale];
            }
          }
        }

        callback();
      } else {
        console.log(&apos;no resource to load, early way out&apos;);
      }

      gReadyState = &apos;complete&apos;;
      return;
    }

    var onResourceLoaded = null;
    var gResourceCount = 0;

    onResourceLoaded = function () {
      gResourceCount++;

      if (gResourceCount &gt;= langCount) {
        callback();
        gReadyState = &apos;complete&apos;;
      }
    };

    function L10nResourceLink(link) {
      var href = link.href;

      this.load = function (lang, callback) {
        parseResource(href, lang, callback, function () {
          console.warn(href + &apos; not found.&apos;);
          console.warn(&apos;&quot;&apos; + lang + &apos;&quot; resource not found&apos;);
          gLanguage = &apos;&apos;;
          callback();
        });
      };
    }

    for (var i = 0; i &lt; langCount; i++) {
      var resource = new L10nResourceLink(langLinks[i]);
      resource.load(lang, onResourceLoaded);
    }
  }

  function clear() {
    gL10nData = {};
    gTextData = &apos;&apos;;
    gLanguage = &apos;&apos;;
  }

  function getPluralRules(lang) {
    var locales2rules = {
      &apos;af&apos;: 3,
      &apos;ak&apos;: 4,
      &apos;am&apos;: 4,
      &apos;ar&apos;: 1,
      &apos;asa&apos;: 3,
      &apos;az&apos;: 0,
      &apos;be&apos;: 11,
      &apos;bem&apos;: 3,
      &apos;bez&apos;: 3,
      &apos;bg&apos;: 3,
      &apos;bh&apos;: 4,
      &apos;bm&apos;: 0,
      &apos;bn&apos;: 3,
      &apos;bo&apos;: 0,
      &apos;br&apos;: 20,
      &apos;brx&apos;: 3,
      &apos;bs&apos;: 11,
      &apos;ca&apos;: 3,
      &apos;cgg&apos;: 3,
      &apos;chr&apos;: 3,
      &apos;cs&apos;: 12,
      &apos;cy&apos;: 17,
      &apos;da&apos;: 3,
      &apos;de&apos;: 3,
      &apos;dv&apos;: 3,
      &apos;dz&apos;: 0,
      &apos;ee&apos;: 3,
      &apos;el&apos;: 3,
      &apos;en&apos;: 3,
      &apos;eo&apos;: 3,
      &apos;es&apos;: 3,
      &apos;et&apos;: 3,
      &apos;eu&apos;: 3,
      &apos;fa&apos;: 0,
      &apos;ff&apos;: 5,
      &apos;fi&apos;: 3,
      &apos;fil&apos;: 4,
      &apos;fo&apos;: 3,
      &apos;fr&apos;: 5,
      &apos;fur&apos;: 3,
      &apos;fy&apos;: 3,
      &apos;ga&apos;: 8,
      &apos;gd&apos;: 24,
      &apos;gl&apos;: 3,
      &apos;gsw&apos;: 3,
      &apos;gu&apos;: 3,
      &apos;guw&apos;: 4,
      &apos;gv&apos;: 23,
      &apos;ha&apos;: 3,
      &apos;haw&apos;: 3,
      &apos;he&apos;: 2,
      &apos;hi&apos;: 4,
      &apos;hr&apos;: 11,
      &apos;hu&apos;: 0,
      &apos;id&apos;: 0,
      &apos;ig&apos;: 0,
      &apos;ii&apos;: 0,
      &apos;is&apos;: 3,
      &apos;it&apos;: 3,
      &apos;iu&apos;: 7,
      &apos;ja&apos;: 0,
      &apos;jmc&apos;: 3,
      &apos;jv&apos;: 0,
      &apos;ka&apos;: 0,
      &apos;kab&apos;: 5,
      &apos;kaj&apos;: 3,
      &apos;kcg&apos;: 3,
      &apos;kde&apos;: 0,
      &apos;kea&apos;: 0,
      &apos;kk&apos;: 3,
      &apos;kl&apos;: 3,
      &apos;km&apos;: 0,
      &apos;kn&apos;: 0,
      &apos;ko&apos;: 0,
      &apos;ksb&apos;: 3,
      &apos;ksh&apos;: 21,
      &apos;ku&apos;: 3,
      &apos;kw&apos;: 7,
      &apos;lag&apos;: 18,
      &apos;lb&apos;: 3,
      &apos;lg&apos;: 3,
      &apos;ln&apos;: 4,
      &apos;lo&apos;: 0,
      &apos;lt&apos;: 10,
      &apos;lv&apos;: 6,
      &apos;mas&apos;: 3,
      &apos;mg&apos;: 4,
      &apos;mk&apos;: 16,
      &apos;ml&apos;: 3,
      &apos;mn&apos;: 3,
      &apos;mo&apos;: 9,
      &apos;mr&apos;: 3,
      &apos;ms&apos;: 0,
      &apos;mt&apos;: 15,
      &apos;my&apos;: 0,
      &apos;nah&apos;: 3,
      &apos;naq&apos;: 7,
      &apos;nb&apos;: 3,
      &apos;nd&apos;: 3,
      &apos;ne&apos;: 3,
      &apos;nl&apos;: 3,
      &apos;nn&apos;: 3,
      &apos;no&apos;: 3,
      &apos;nr&apos;: 3,
      &apos;nso&apos;: 4,
      &apos;ny&apos;: 3,
      &apos;nyn&apos;: 3,
      &apos;om&apos;: 3,
      &apos;or&apos;: 3,
      &apos;pa&apos;: 3,
      &apos;pap&apos;: 3,
      &apos;pl&apos;: 13,
      &apos;ps&apos;: 3,
      &apos;pt&apos;: 3,
      &apos;rm&apos;: 3,
      &apos;ro&apos;: 9,
      &apos;rof&apos;: 3,
      &apos;ru&apos;: 11,
      &apos;rwk&apos;: 3,
      &apos;sah&apos;: 0,
      &apos;saq&apos;: 3,
      &apos;se&apos;: 7,
      &apos;seh&apos;: 3,
      &apos;ses&apos;: 0,
      &apos;sg&apos;: 0,
      &apos;sh&apos;: 11,
      &apos;shi&apos;: 19,
      &apos;sk&apos;: 12,
      &apos;sl&apos;: 14,
      &apos;sma&apos;: 7,
      &apos;smi&apos;: 7,
      &apos;smj&apos;: 7,
      &apos;smn&apos;: 7,
      &apos;sms&apos;: 7,
      &apos;sn&apos;: 3,
      &apos;so&apos;: 3,
      &apos;sq&apos;: 3,
      &apos;sr&apos;: 11,
      &apos;ss&apos;: 3,
      &apos;ssy&apos;: 3,
      &apos;st&apos;: 3,
      &apos;sv&apos;: 3,
      &apos;sw&apos;: 3,
      &apos;syr&apos;: 3,
      &apos;ta&apos;: 3,
      &apos;te&apos;: 3,
      &apos;teo&apos;: 3,
      &apos;th&apos;: 0,
      &apos;ti&apos;: 4,
      &apos;tig&apos;: 3,
      &apos;tk&apos;: 3,
      &apos;tl&apos;: 4,
      &apos;tn&apos;: 3,
      &apos;to&apos;: 0,
      &apos;tr&apos;: 0,
      &apos;ts&apos;: 3,
      &apos;tzm&apos;: 22,
      &apos;uk&apos;: 11,
      &apos;ur&apos;: 3,
      &apos;ve&apos;: 3,
      &apos;vi&apos;: 0,
      &apos;vun&apos;: 3,
      &apos;wa&apos;: 4,
      &apos;wae&apos;: 3,
      &apos;wo&apos;: 0,
      &apos;xh&apos;: 3,
      &apos;xog&apos;: 3,
      &apos;yo&apos;: 0,
      &apos;zh&apos;: 0,
      &apos;zu&apos;: 3
    };

    function isIn(n, list) {
      return list.indexOf(n) !== -1;
    }

    function isBetween(n, start, end) {
      return start &lt;= n &amp;&amp; n &lt;= end;
    }

    var pluralRules = {
      &apos;0&apos;: function (n) {
        return &apos;other&apos;;
      },
      &apos;1&apos;: function (n) {
        if (isBetween(n % 100, 3, 10)) return &apos;few&apos;;
        if (n === 0) return &apos;zero&apos;;
        if (isBetween(n % 100, 11, 99)) return &apos;many&apos;;
        if (n == 2) return &apos;two&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;2&apos;: function (n) {
        if (n !== 0 &amp;&amp; n % 10 === 0) return &apos;many&apos;;
        if (n == 2) return &apos;two&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;3&apos;: function (n) {
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;4&apos;: function (n) {
        if (isBetween(n, 0, 1)) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;5&apos;: function (n) {
        if (isBetween(n, 0, 2) &amp;&amp; n != 2) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;6&apos;: function (n) {
        if (n === 0) return &apos;zero&apos;;
        if (n % 10 == 1 &amp;&amp; n % 100 != 11) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;7&apos;: function (n) {
        if (n == 2) return &apos;two&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;8&apos;: function (n) {
        if (isBetween(n, 3, 6)) return &apos;few&apos;;
        if (isBetween(n, 7, 10)) return &apos;many&apos;;
        if (n == 2) return &apos;two&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;9&apos;: function (n) {
        if (n === 0 || n != 1 &amp;&amp; isBetween(n % 100, 1, 19)) return &apos;few&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;10&apos;: function (n) {
        if (isBetween(n % 10, 2, 9) &amp;&amp; !isBetween(n % 100, 11, 19)) return &apos;few&apos;;
        if (n % 10 == 1 &amp;&amp; !isBetween(n % 100, 11, 19)) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;11&apos;: function (n) {
        if (isBetween(n % 10, 2, 4) &amp;&amp; !isBetween(n % 100, 12, 14)) return &apos;few&apos;;
        if (n % 10 === 0 || isBetween(n % 10, 5, 9) || isBetween(n % 100, 11, 14)) return &apos;many&apos;;
        if (n % 10 == 1 &amp;&amp; n % 100 != 11) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;12&apos;: function (n) {
        if (isBetween(n, 2, 4)) return &apos;few&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;13&apos;: function (n) {
        if (isBetween(n % 10, 2, 4) &amp;&amp; !isBetween(n % 100, 12, 14)) return &apos;few&apos;;
        if (n != 1 &amp;&amp; isBetween(n % 10, 0, 1) || isBetween(n % 10, 5, 9) || isBetween(n % 100, 12, 14)) return &apos;many&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;14&apos;: function (n) {
        if (isBetween(n % 100, 3, 4)) return &apos;few&apos;;
        if (n % 100 == 2) return &apos;two&apos;;
        if (n % 100 == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;15&apos;: function (n) {
        if (n === 0 || isBetween(n % 100, 2, 10)) return &apos;few&apos;;
        if (isBetween(n % 100, 11, 19)) return &apos;many&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;16&apos;: function (n) {
        if (n % 10 == 1 &amp;&amp; n != 11) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;17&apos;: function (n) {
        if (n == 3) return &apos;few&apos;;
        if (n === 0) return &apos;zero&apos;;
        if (n == 6) return &apos;many&apos;;
        if (n == 2) return &apos;two&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;18&apos;: function (n) {
        if (n === 0) return &apos;zero&apos;;
        if (isBetween(n, 0, 2) &amp;&amp; n !== 0 &amp;&amp; n != 2) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;19&apos;: function (n) {
        if (isBetween(n, 2, 10)) return &apos;few&apos;;
        if (isBetween(n, 0, 1)) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;20&apos;: function (n) {
        if ((isBetween(n % 10, 3, 4) || n % 10 == 9) &amp;&amp; !(isBetween(n % 100, 10, 19) || isBetween(n % 100, 70, 79) || isBetween(n % 100, 90, 99))) return &apos;few&apos;;
        if (n % 1000000 === 0 &amp;&amp; n !== 0) return &apos;many&apos;;
        if (n % 10 == 2 &amp;&amp; !isIn(n % 100, [12, 72, 92])) return &apos;two&apos;;
        if (n % 10 == 1 &amp;&amp; !isIn(n % 100, [11, 71, 91])) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;21&apos;: function (n) {
        if (n === 0) return &apos;zero&apos;;
        if (n == 1) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;22&apos;: function (n) {
        if (isBetween(n, 0, 1) || isBetween(n, 11, 99)) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;23&apos;: function (n) {
        if (isBetween(n % 10, 1, 2) || n % 20 === 0) return &apos;one&apos;;
        return &apos;other&apos;;
      },
      &apos;24&apos;: function (n) {
        if (isBetween(n, 3, 10) || isBetween(n, 13, 19)) return &apos;few&apos;;
        if (isIn(n, [2, 12])) return &apos;two&apos;;
        if (isIn(n, [1, 11])) return &apos;one&apos;;
        return &apos;other&apos;;
      }
    };
    var index = locales2rules[lang.replace(/-.*$/, &apos;&apos;)];

    if (!(index in pluralRules)) {
      console.warn(&apos;plural form unknown for [&apos; + lang + &apos;]&apos;);
      return function () {
        return &apos;other&apos;;
      };
    }

    return pluralRules[index];
  }

  gMacros.plural = function (str, param, key, prop) {
    var n = parseFloat(param);
    if (isNaN(n)) return str;
    if (prop != gTextProp) return str;

    if (!gMacros._pluralRules) {
      gMacros._pluralRules = getPluralRules(gLanguage);
    }

    var index = &apos;[&apos; + gMacros._pluralRules(n) + &apos;]&apos;;

    if (n === 0 &amp;&amp; key + &apos;[zero]&apos; in gL10nData) {
      str = gL10nData[key + &apos;[zero]&apos;][prop];
    } else if (n == 1 &amp;&amp; key + &apos;[one]&apos; in gL10nData) {
      str = gL10nData[key + &apos;[one]&apos;][prop];
    } else if (n == 2 &amp;&amp; key + &apos;[two]&apos; in gL10nData) {
      str = gL10nData[key + &apos;[two]&apos;][prop];
    } else if (key + index in gL10nData) {
      str = gL10nData[key + index][prop];
    } else if (key + &apos;[other]&apos; in gL10nData) {
      str = gL10nData[key + &apos;[other]&apos;][prop];
    }

    return str;
  };

  function getL10nData(key, args, fallback) {
    var data = gL10nData[key];

    if (!data) {
      console.warn(&apos;#&apos; + key + &apos; is undefined.&apos;);

      if (!fallback) {
        return null;
      }

      data = fallback;
    }

    var rv = {};

    for (var prop in data) {
      var str = data[prop];
      str = substIndexes(str, args, key, prop);
      str = substArguments(str, args, key);
      rv[prop] = str;
    }

    return rv;
  }

  function substIndexes(str, args, key, prop) {
    var reIndex = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;
    var reMatch = reIndex.exec(str);
    if (!reMatch || !reMatch.length) return str;
    var macroName = reMatch[1];
    var paramName = reMatch[2];
    var param;

    if (args &amp;&amp; paramName in args) {
      param = args[paramName];
    } else if (paramName in gL10nData) {
      param = gL10nData[paramName];
    }

    if (macroName in gMacros) {
      var macro = gMacros[macroName];
      str = macro(str, param, key, prop);
    }

    return str;
  }

  function substArguments(str, args, key) {
    var reArgs = /\{\{\s*(.+?)\s*\}\}/g;
    return str.replace(reArgs, function (matched_text, arg) {
      if (args &amp;&amp; arg in args) {
        return args[arg];
      }

      if (arg in gL10nData) {
        return gL10nData[arg];
      }

      console.log(&apos;argument  + arg +  for #&apos; + key + &apos; is undefined.&apos;);
      return matched_text;
    });
  }

  function translateElement(element) {
    var l10n = getL10nAttributes(element);
    if (!l10n.id) return;
    var data = getL10nData(l10n.id, l10n.args);

    if (!data) {
      console.warn(&apos;#&apos; + l10n.id + &apos; is undefined.&apos;);
      return;
    }

    if (data[gTextProp]) {
      if (getChildElementCount(element) === 0) {
        element[gTextProp] = data[gTextProp];
      } else {
        var children = element.childNodes;
        var found = false;

        for (var i = 0, l = children.length; i &lt; l; i++) {
          if (children[i].nodeType === 3 &amp;&amp; /\S/.test(children[i].nodeValue)) {
            if (found) {
              children[i].nodeValue = &apos;&apos;;
            } else {
              children[i].nodeValue = data[gTextProp];
              found = true;
            }
          }
        }

        if (!found) {
          var textNode = document.createTextNode(data[gTextProp]);
          element.prepend(textNode);
        }
      }

      delete data[gTextProp];
    }

    for (var k in data) {
      element[k] = data[k];
    }
  }

  function getChildElementCount(element) {
    if (element.children) {
      return element.children.length;
    }

    if (typeof element.childElementCount !== &apos;undefined&apos;) {
      return element.childElementCount;
    }

    var count = 0;

    for (var i = 0; i &lt; element.childNodes.length; i++) {
      count += element.nodeType === 1 ? 1 : 0;
    }

    return count;
  }

  function translateFragment(element) {
    element = element || document.documentElement;
    var children = getTranslatableChildren(element);
    var elementCount = children.length;

    for (var i = 0; i &lt; elementCount; i++) {
      translateElement(children[i]);
    }

    translateElement(element);
  }

  return {
    get: function (key, args, fallbackString) {
      var index = key.lastIndexOf(&apos;.&apos;);
      var prop = gTextProp;

      if (index &gt; 0) {
        prop = key.substring(index + 1);
        key = key.substring(0, index);
      }

      var fallback;

      if (fallbackString) {
        fallback = {};
        fallback[prop] = fallbackString;
      }

      var data = getL10nData(key, args, fallback);

      if (data &amp;&amp; prop in data) {
        return data[prop];
      }

      return &apos; + key + &apos;;
    },
    getData: function () {
      return gL10nData;
    },
    getText: function () {
      return gTextData;
    },
    getLanguage: function () {
      return gLanguage;
    },
    setLanguage: function (lang, callback) {
      loadLocale(lang, function () {
        if (callback) callback();
      });
    },
    getDirection: function () {
      var rtlList = [&apos;ar&apos;, &apos;he&apos;, &apos;fa&apos;, &apos;ps&apos;, &apos;ur&apos;];
      var shortCode = gLanguage.split(&apos;-&apos;, 1)[0];
      return rtlList.indexOf(shortCode) &gt;= 0 ? &apos;rtl&apos; : &apos;ltr&apos;;
    },
    translate: translateFragment,
    getReadyState: function () {
      return gReadyState;
    },
    ready: function (callback) {
      if (!callback) {
        return;
      } else if (gReadyState == &apos;complete&apos; || gReadyState == &apos;interactive&apos;) {
        window.setTimeout(function () {
          callback();
        });
      } else if (document.addEventListener) {
        document.addEventListener(&apos;localized&apos;, function once() {
          document.removeEventListener(&apos;localized&apos;, once);
          callback();
        });
      }
    }
  };
}(window, document);

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.GenericScripting = void 0;
exports.docPropertiesLookup = docPropertiesLookup;

var _pdfjsLib = __webpack_require__(5);

async function docPropertiesLookup(pdfDocument) {
  const url = &quot;&quot;,
        baseUrl = url.split(&quot;#&quot;)[0];
  let {
    info,
    metadata,
    contentDispositionFilename,
    contentLength
  } = await pdfDocument.getMetadata();

  if (!contentLength) {
    const {
      length
    } = await pdfDocument.getDownloadInfo();
    contentLength = length;
  }

  return { ...info,
    baseURL: baseUrl,
    filesize: contentLength,
    filename: contentDispositionFilename || (0, _pdfjsLib.getPdfFilenameFromUrl)(url),
    metadata: metadata?.getRaw(),
    authors: metadata?.get(&quot;dc:creator&quot;),
    numPages: pdfDocument.numPages,
    URL: url
  };
}

class GenericScripting {
  constructor(sandboxBundleSrc) {
    this._ready = (0, _pdfjsLib.loadScript)(sandboxBundleSrc, true).then(() =&gt; {
      return window.pdfjsSandbox.QuickJSSandbox();
    });
  }

  async createSandbox(data) {
    const sandbox = await this._ready;
    sandbox.create(data);
  }

  async dispatchEventInSandbox(event) {
    const sandbox = await this._ready;
    setTimeout(() =&gt; sandbox.dispatchEvent(event), 0);
  }

  async destroySandbox() {
    const sandbox = await this._ready;
    sandbox.nukeSandbox();
  }

}

exports.GenericScripting = GenericScripting;

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.PDFPrintService = PDFPrintService;

var _pdfjsLib = __webpack_require__(5);

var _app = __webpack_require__(4);

var _print_utils = __webpack_require__(48);

let activeService = null;
let dialog = null;
let overlayManager = null;

function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size, printResolution, optionalContentConfigPromise, printAnnotationStoragePromise) {
  const scratchCanvas = activeService.scratchCanvas;
  const PRINT_UNITS = printResolution / _pdfjsLib.PixelsPerInch.PDF;
  scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
  scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);
  const ctx = scratchCanvas.getContext(&quot;2d&quot;);
  ctx.save();
  ctx.fillStyle = &quot;rgb(255, 255, 255)&quot;;
  ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.restore();
  return Promise.all([pdfDocument.getPage(pageNumber), printAnnotationStoragePromise]).then(function ([pdfPage, printAnnotationStorage]) {
    const renderContext = {
      canvasContext: ctx,
      transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
      viewport: pdfPage.getViewport({
        scale: 1,
        rotation: size.rotation
      }),
      intent: &quot;print&quot;,
      annotationMode: _pdfjsLib.AnnotationMode.ENABLE_STORAGE,
      optionalContentConfigPromise,
      printAnnotationStorage
    };
    return pdfPage.render(renderContext).promise;
  });
}

function PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise = null, printAnnotationStoragePromise = null, l10n) {
  this.pdfDocument = pdfDocument;
  this.pagesOverview = pagesOverview;
  this.printContainer = printContainer;
  this._printResolution = printResolution || 150;
  this._optionalContentConfigPromise = optionalContentConfigPromise || pdfDocument.getOptionalContentConfig();
  this._printAnnotationStoragePromise = printAnnotationStoragePromise || Promise.resolve();
  this.l10n = l10n;
  this.currentPage = -1;
  this.scratchCanvas = document.createElement(&quot;canvas&quot;);
}

PDFPrintService.prototype = {
  layout() {
    this.throwIfInactive();
    const body = document.querySelector(&quot;body&quot;);
    body.setAttribute(&quot;data-pdfjsprinting&quot;, true);
    const hasEqualPageSizes = this.pagesOverview.every(function (size) {
      return size.width === this.pagesOverview[0].width &amp;&amp; size.height === this.pagesOverview[0].height;
    }, this);

    if (!hasEqualPageSizes) {
      console.warn(&quot;Not all pages have the same size. The printed &quot; + &quot;result may be incorrect!&quot;);
    }

    this.pageStyleSheet = document.createElement(&quot;style&quot;);
    const pageSize = this.pagesOverview[0];
    this.pageStyleSheet.textContent = &quot;@page { size: &quot; + pageSize.width + &quot;pt &quot; + pageSize.height + &quot;pt;}&quot;;
    body.append(this.pageStyleSheet);
  },

  destroy() {
    if (activeService !== this) {
      return;
    }

    this.printContainer.textContent = &quot;&quot;;
    const body = document.querySelector(&quot;body&quot;);
    body.removeAttribute(&quot;data-pdfjsprinting&quot;);

    if (this.pageStyleSheet) {
      this.pageStyleSheet.remove();
      this.pageStyleSheet = null;
    }

    this.scratchCanvas.width = this.scratchCanvas.height = 0;
    this.scratchCanvas = null;
    activeService = null;
    ensureOverlay().then(function () {
      if (overlayManager.active === dialog) {
        overlayManager.close(dialog);
      }
    });
  },

  renderPages() {
    if (this.pdfDocument.isPureXfa) {
      (0, _print_utils.getXfaHtmlForPrinting)(this.printContainer, this.pdfDocument);
      return Promise.resolve();
    }

    const pageCount = this.pagesOverview.length;

    const renderNextPage = (resolve, reject) =&gt; {
      this.throwIfInactive();

      if (++this.currentPage &gt;= pageCount) {
        renderProgress(pageCount, pageCount, this.l10n);
        resolve();
        return;
      }

      const index = this.currentPage;
      renderProgress(index, pageCount, this.l10n);
      renderPage(this, this.pdfDocument, index + 1, this.pagesOverview[index], this._printResolution, this._optionalContentConfigPromise, this._printAnnotationStoragePromise).then(this.useRenderedPage.bind(this)).then(function () {
        renderNextPage(resolve, reject);
      }, reject);
    };

    return new Promise(renderNextPage);
  },

  useRenderedPage() {
    this.throwIfInactive();
    const img = document.createElement(&quot;img&quot;);
    const scratchCanvas = this.scratchCanvas;

    if (&quot;toBlob&quot; in scratchCanvas) {
      scratchCanvas.toBlob(function (blob) {
        img.src = URL.createObjectURL(blob);
      });
    } else {
      img.src = scratchCanvas.toDataURL();
    }

    const wrapper = document.createElement(&quot;div&quot;);
    wrapper.className = &quot;printedPage&quot;;
    wrapper.append(img);
    this.printContainer.append(wrapper);
    return new Promise(function (resolve, reject) {
      img.onload = resolve;
      img.onerror = reject;
    });
  },

  performPrint() {
    this.throwIfInactive();
    return new Promise(resolve =&gt; {
      setTimeout(() =&gt; {
        if (!this.active) {
          resolve();
          return;
        }

        print.call(window);
        setTimeout(resolve, 20);
      }, 0);
    });
  },

  get active() {
    return this === activeService;
  },

  throwIfInactive() {
    if (!this.active) {
      throw new Error(&quot;This print request was cancelled or completed.&quot;);
    }
  }

};
const print = window.print;

window.print = function () {
  if (activeService) {
    console.warn(&quot;Ignored window.print() because of a pending print job.&quot;);
    return;
  }

  ensureOverlay().then(function () {
    if (activeService) {
      overlayManager.open(dialog);
    }
  });

  try {
    dispatchEvent(&quot;beforeprint&quot;);
  } finally {
    if (!activeService) {
      console.error(&quot;Expected print service to be initialized.&quot;);
      ensureOverlay().then(function () {
        if (overlayManager.active === dialog) {
          overlayManager.close(dialog);
        }
      });
      return;
    }

    const activeServiceOnEntry = activeService;
    activeService.renderPages().then(function () {
      return activeServiceOnEntry.performPrint();
    }).catch(function () {}).then(function () {
      if (activeServiceOnEntry.active) {
        abort();
      }
    });
  }
};

function dispatchEvent(eventType) {
  const event = document.createEvent(&quot;CustomEvent&quot;);
  event.initCustomEvent(eventType, false, false, &quot;custom&quot;);
  window.dispatchEvent(event);
}

function abort() {
  if (activeService) {
    activeService.destroy();
    dispatchEvent(&quot;afterprint&quot;);
  }
}

function renderProgress(index, total, l10n) {
  dialog ||= document.getElementById(&quot;printServiceDialog&quot;);
  const progress = Math.round(100 * index / total);
  const progressBar = dialog.querySelector(&quot;progress&quot;);
  const progressPerc = dialog.querySelector(&quot;.relative-progress&quot;);
  progressBar.value = progress;
  l10n.get(&quot;print_progress_percent&quot;, {
    progress
  }).then(msg =&gt; {
    progressPerc.textContent = msg;
  });
}

window.addEventListener(&quot;keydown&quot;, function (event) {
  if (event.keyCode === 80 &amp;&amp; (event.ctrlKey || event.metaKey) &amp;&amp; !event.altKey &amp;&amp; (!event.shiftKey || window.chrome || window.opera)) {
    window.print();
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

if (&quot;onbeforeprint&quot; in window) {
  const stopPropagationIfNeeded = function (event) {
    if (event.detail !== &quot;custom&quot;) {
      event.stopImmediatePropagation();
    }
  };

  window.addEventListener(&quot;beforeprint&quot;, stopPropagationIfNeeded);
  window.addEventListener(&quot;afterprint&quot;, stopPropagationIfNeeded);
}

let overlayPromise;

function ensureOverlay() {
  if (!overlayPromise) {
    overlayManager = _app.PDFViewerApplication.overlayManager;

    if (!overlayManager) {
      throw new Error(&quot;The overlay manager has not yet been initialized.&quot;);
    }

    dialog ||= document.getElementById(&quot;printServiceDialog&quot;);
    overlayPromise = overlayManager.register(dialog, true);
    document.getElementById(&quot;printCancel&quot;).onclick = abort;
    dialog.addEventListener(&quot;close&quot;, abort);
  }

  return overlayPromise;
}

_app.PDFPrintServiceFactory.instance = {
  supportsPrinting: true,

  createPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, printAnnotationStoragePromise, l10n) {
    if (activeService) {
      throw new Error(&quot;The print service is created and active.&quot;);
    }

    activeService = new PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, printAnnotationStoragePromise, l10n);
    return activeService;
  }

};

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) =&gt; {



Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
exports.getXfaHtmlForPrinting = getXfaHtmlForPrinting;

var _pdfjsLib = __webpack_require__(5);

var _pdf_link_service = __webpack_require__(3);

var _xfa_layer_builder = __webpack_require__(37);

function getXfaHtmlForPrinting(printContainer, pdfDocument) {
  const xfaHtml = pdfDocument.allXfaHtml;
  const linkService = new _pdf_link_service.SimpleLinkService();
  const scale = Math.round(_pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS * 100) / 100;

  for (const xfaPage of xfaHtml.children) {
    const page = document.createElement(&quot;div&quot;);
    page.className = &quot;xfaPrintedPage&quot;;
    printContainer.append(page);
    const builder = new _xfa_layer_builder.XfaLayerBuilder({
      pageDiv: page,
      pdfPage: null,
      annotationStorage: pdfDocument.annotationStorage,
      linkService,
      xfaHtml: xfaPage
    });
    const viewport = (0, _pdfjsLib.getXfaPageViewport)(xfaPage, {
      scale
    });
    builder.render(viewport, &quot;print&quot;);
  }
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() =&gt; {
var exports = __webpack_exports__;


Object.defineProperty(exports, &quot;__esModule&quot;, ({
  value: true
}));
Object.defineProperty(exports, &quot;PDFViewerApplication&quot;, ({
  enumerable: true,
  get: function () {
    return _app.PDFViewerApplication;
  }
}));
exports.PDFViewerApplicationConstants = void 0;
Object.defineProperty(exports, &quot;PDFViewerApplicationOptions&quot;, ({
  enumerable: true,
  get: function () {
    return _app_options.AppOptions;
  }
}));

var _ui_utils = __webpack_require__(1);

var _app_options = __webpack_require__(2);

var _pdf_link_service = __webpack_require__(3);

var _app = __webpack_require__(4);

const pdfjsVersion = &apos;3.0.0&apos;;
const pdfjsBuild = &apos;987062c&apos;;
const AppConstants = {
  LinkTarget: _pdf_link_service.LinkTarget,
  RenderingStates: _ui_utils.RenderingStates,
  ScrollMode: _ui_utils.ScrollMode,
  SpreadMode: _ui_utils.SpreadMode
};
exports.PDFViewerApplicationConstants = AppConstants;
window.PDFViewerApplication = _app.PDFViewerApplication;
window.PDFViewerApplicationConstants = AppConstants;
window.PDFViewerApplicationOptions = _app_options.AppOptions;
;
;
{
  __webpack_require__(41);
}
;
{
  __webpack_require__(47);
}

function getViewerConfiguration() {
  return {
    appContainer: document.body,
    mainContainer: document.getElementById(&quot;viewerContainer&quot;),
    viewerContainer: document.getElementById(&quot;viewer&quot;),
    toolbar: {
      container: document.getElementById(&quot;toolbarViewer&quot;),
      numPages: document.getElementById(&quot;numPages&quot;),
      pageNumber: document.getElementById(&quot;pageNumber&quot;),
      scaleSelect: document.getElementById(&quot;scaleSelect&quot;),
      customScaleOption: document.getElementById(&quot;customScaleOption&quot;),
      previous: document.getElementById(&quot;previous&quot;),
      next: document.getElementById(&quot;next&quot;),
      zoomIn: document.getElementById(&quot;zoomIn&quot;),
      zoomOut: document.getElementById(&quot;zoomOut&quot;),
      viewFind: document.getElementById(&quot;viewFind&quot;),
      openFile: document.getElementById(&quot;openFile&quot;),
      print: document.getElementById(&quot;print&quot;),
      editorFreeTextButton: document.getElementById(&quot;editorFreeText&quot;),
      editorFreeTextParamsToolbar: document.getElementById(&quot;editorFreeTextParamsToolbar&quot;),
      editorInkButton: document.getElementById(&quot;editorInk&quot;),
      editorInkParamsToolbar: document.getElementById(&quot;editorInkParamsToolbar&quot;),
      download: document.getElementById(&quot;download&quot;)
    },
    secondaryToolbar: {
      toolbar: document.getElementById(&quot;secondaryToolbar&quot;),
      toggleButton: document.getElementById(&quot;secondaryToolbarToggle&quot;),
      presentationModeButton: document.getElementById(&quot;presentationMode&quot;),
      openFileButton: document.getElementById(&quot;secondaryOpenFile&quot;),
      printButton: document.getElementById(&quot;secondaryPrint&quot;),
      downloadButton: document.getElementById(&quot;secondaryDownload&quot;),
      viewBookmarkButton: document.getElementById(&quot;viewBookmark&quot;),
      firstPageButton: document.getElementById(&quot;firstPage&quot;),
      lastPageButton: document.getElementById(&quot;lastPage&quot;),
      pageRotateCwButton: document.getElementById(&quot;pageRotateCw&quot;),
      pageRotateCcwButton: document.getElementById(&quot;pageRotateCcw&quot;),
      cursorSelectToolButton: document.getElementById(&quot;cursorSelectTool&quot;),
      cursorHandToolButton: document.getElementById(&quot;cursorHandTool&quot;),
      scrollPageButton: document.getElementById(&quot;scrollPage&quot;),
      scrollVerticalButton: document.getElementById(&quot;scrollVertical&quot;),
      scrollHorizontalButton: document.getElementById(&quot;scrollHorizontal&quot;),
      scrollWrappedButton: document.getElementById(&quot;scrollWrapped&quot;),
      spreadNoneButton: document.getElementById(&quot;spreadNone&quot;),
      spreadOddButton: document.getElementById(&quot;spreadOdd&quot;),
      spreadEvenButton: document.getElementById(&quot;spreadEven&quot;),
      documentPropertiesButton: document.getElementById(&quot;documentProperties&quot;)
    },
    sidebar: {
      outerContainer: document.getElementById(&quot;outerContainer&quot;),
      sidebarContainer: document.getElementById(&quot;sidebarContainer&quot;),
      toggleButton: document.getElementById(&quot;sidebarToggle&quot;),
      thumbnailButton: document.getElementById(&quot;viewThumbnail&quot;),
      outlineButton: document.getElementById(&quot;viewOutline&quot;),
      attachmentsButton: document.getElementById(&quot;viewAttachments&quot;),
      layersButton: document.getElementById(&quot;viewLayers&quot;),
      thumbnailView: document.getElementById(&quot;thumbnailView&quot;),
      outlineView: document.getElementById(&quot;outlineView&quot;),
      attachmentsView: document.getElementById(&quot;attachmentsView&quot;),
      layersView: document.getElementById(&quot;layersView&quot;),
      outlineOptionsContainer: document.getElementById(&quot;outlineOptionsContainer&quot;),
      currentOutlineItemButton: document.getElementById(&quot;currentOutlineItem&quot;)
    },
    sidebarResizer: {
      outerContainer: document.getElementById(&quot;outerContainer&quot;),
      resizer: document.getElementById(&quot;sidebarResizer&quot;)
    },
    findBar: {
      bar: document.getElementById(&quot;findbar&quot;),
      toggleButton: document.getElementById(&quot;viewFind&quot;),
      findField: document.getElementById(&quot;findInput&quot;),
      highlightAllCheckbox: document.getElementById(&quot;findHighlightAll&quot;),
      caseSensitiveCheckbox: document.getElementById(&quot;findMatchCase&quot;),
      matchDiacriticsCheckbox: document.getElementById(&quot;findMatchDiacritics&quot;),
      entireWordCheckbox: document.getElementById(&quot;findEntireWord&quot;),
      findMsg: document.getElementById(&quot;findMsg&quot;),
      findResultsCount: document.getElementById(&quot;findResultsCount&quot;),
      findPreviousButton: document.getElementById(&quot;findPrevious&quot;),
      findNextButton: document.getElementById(&quot;findNext&quot;)
    },
    passwordOverlay: {
      dialog: document.getElementById(&quot;passwordDialog&quot;),
      label: document.getElementById(&quot;passwordText&quot;),
      input: document.getElementById(&quot;password&quot;),
      submitButton: document.getElementById(&quot;passwordSubmit&quot;),
      cancelButton: document.getElementById(&quot;passwordCancel&quot;)
    },
    documentProperties: {
      dialog: document.getElementById(&quot;documentPropertiesDialog&quot;),
      closeButton: document.getElementById(&quot;documentPropertiesClose&quot;),
      fields: {
        fileName: document.getElementById(&quot;fileNameField&quot;),
        fileSize: document.getElementById(&quot;fileSizeField&quot;),
        title: document.getElementById(&quot;titleField&quot;),
        author: document.getElementById(&quot;authorField&quot;),
        subject: document.getElementById(&quot;subjectField&quot;),
        keywords: document.getElementById(&quot;keywordsField&quot;),
        creationDate: document.getElementById(&quot;creationDateField&quot;),
        modificationDate: document.getElementById(&quot;modificationDateField&quot;),
        creator: document.getElementById(&quot;creatorField&quot;),
        producer: document.getElementById(&quot;producerField&quot;),
        version: document.getElementById(&quot;versionField&quot;),
        pageCount: document.getElementById(&quot;pageCountField&quot;),
        pageSize: document.getElementById(&quot;pageSizeField&quot;),
        linearized: document.getElementById(&quot;linearizedField&quot;)
      }
    },
    annotationEditorParams: {
      editorFreeTextFontSize: document.getElementById(&quot;editorFreeTextFontSize&quot;),
      editorFreeTextColor: document.getElementById(&quot;editorFreeTextColor&quot;),
      editorInkColor: document.getElementById(&quot;editorInkColor&quot;),
      editorInkThickness: document.getElementById(&quot;editorInkThickness&quot;),
      editorInkOpacity: document.getElementById(&quot;editorInkOpacity&quot;)
    },
    printContainer: document.getElementById(&quot;printContainer&quot;),
    openFileInput: document.getElementById(&quot;fileInput&quot;),
    debuggerScriptPath: &quot;./debugger.js&quot;
  };
}

function webViewerLoad() {
  const config = getViewerConfiguration();
  const event = document.createEvent(&quot;CustomEvent&quot;);
  event.initCustomEvent(&quot;webviewerloaded&quot;, true, true, {
    source: window
  });

  try {
    parent.document.dispatchEvent(event);
  } catch (ex) {
    console.error(`webviewerloaded: ${ex}`);
    document.dispatchEvent(event);
  }

  _app.PDFViewerApplication.run(config);
}

document.blockUnblockOnload?.(true);

if (document.readyState === &quot;interactive&quot; || document.readyState === &quot;complete&quot;) {
  webViewerLoad();
} else {
  document.addEventListener(&quot;DOMContentLoaded&quot;, webViewerLoad, true);
}
})();

/******/ })()
;
//# sourceMappingURL=viewer.js.map