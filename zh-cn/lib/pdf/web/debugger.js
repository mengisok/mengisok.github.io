/* Copyright 2012 Mozilla Foundation
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
 */

let opMap;

const FontInspector = (function FontInspectorClosure() {
  let fonts;
  let active = false;
  const fontAttribute = &quot;data-font-name&quot;;
  function removeSelection() {
    const divs = document.querySelectorAll(`span[${fontAttribute}]`);
    for (const div of divs) {
      div.className = &quot;&quot;;
    }
  }
  function resetSelection() {
    const divs = document.querySelectorAll(`span[${fontAttribute}]`);
    for (const div of divs) {
      div.className = &quot;debuggerHideText&quot;;
    }
  }
  function selectFont(fontName, show) {
    const divs = document.querySelectorAll(
      `span[${fontAttribute}=${fontName}]`
    );
    for (const div of divs) {
      div.className = show ? &quot;debuggerShowText&quot; : &quot;debuggerHideText&quot;;
    }
  }
  function textLayerClick(e) {
    if (
      !e.target.dataset.fontName ||
      e.target.tagName.toUpperCase() !== &quot;SPAN&quot;
    ) {
      return;
    }
    const fontName = e.target.dataset.fontName;
    const selects = document.getElementsByTagName(&quot;input&quot;);
    for (const select of selects) {
      if (select.dataset.fontName !== fontName) {
        continue;
      }
      select.checked = !select.checked;
      selectFont(fontName, select.checked);
      select.scrollIntoView();
    }
  }
  return {
    // Properties/functions needed by PDFBug.
    id: &quot;FontInspector&quot;,
    name: &quot;Font Inspector&quot;,
    panel: null,
    manager: null,
    init(pdfjsLib) {
      const panel = this.panel;
      const tmp = document.createElement(&quot;button&quot;);
      tmp.addEventListener(&quot;click&quot;, resetSelection);
      tmp.textContent = &quot;Refresh&quot;;
      panel.append(tmp);

      fonts = document.createElement(&quot;div&quot;);
      panel.append(fonts);
    },
    cleanup() {
      fonts.textContent = &quot;&quot;;
    },
    enabled: false,
    get active() {
      return active;
    },
    set active(value) {
      active = value;
      if (active) {
        document.body.addEventListener(&quot;click&quot;, textLayerClick, true);
        resetSelection();
      } else {
        document.body.removeEventListener(&quot;click&quot;, textLayerClick, true);
        removeSelection();
      }
    },
    // FontInspector specific functions.
    fontAdded(fontObj, url) {
      function properties(obj, list) {
        const moreInfo = document.createElement(&quot;table&quot;);
        for (const entry of list) {
          const tr = document.createElement(&quot;tr&quot;);
          const td1 = document.createElement(&quot;td&quot;);
          td1.textContent = entry;
          tr.append(td1);
          const td2 = document.createElement(&quot;td&quot;);
          td2.textContent = obj[entry].toString();
          tr.append(td2);
          moreInfo.append(tr);
        }
        return moreInfo;
      }
      const moreInfo = properties(fontObj, [&quot;name&quot;, &quot;type&quot;]);
      const fontName = fontObj.loadedName;
      const font = document.createElement(&quot;div&quot;);
      const name = document.createElement(&quot;span&quot;);
      name.textContent = fontName;
      const download = document.createElement(&quot;a&quot;);
      if (url) {
        url = /url\([&apos;&quot;]?([^)&quot;&apos;]+)/.exec(url);
        download.href = url[1];
      } else if (fontObj.data) {
        download.href = URL.createObjectURL(
          new Blob([fontObj.data], { type: fontObj.mimetype })
        );
      }
      download.textContent = &quot;Download&quot;;
      const logIt = document.createElement(&quot;a&quot;);
      logIt.href = &quot;&quot;;
      logIt.textContent = &quot;Log&quot;;
      logIt.addEventListener(&quot;click&quot;, function (event) {
        event.preventDefault();
        console.log(fontObj);
      });
      const select = document.createElement(&quot;input&quot;);
      select.setAttribute(&quot;type&quot;, &quot;checkbox&quot;);
      select.dataset.fontName = fontName;
      select.addEventListener(&quot;click&quot;, function () {
        selectFont(fontName, select.checked);
      });
      font.append(select, name, &quot; &quot;, download, &quot; &quot;, logIt, moreInfo);
      fonts.append(font);
      // Somewhat of a hack, should probably add a hook for when the text layer
      // is done rendering.
      setTimeout(() =&gt; {
        if (this.active) {
          resetSelection();
        }
      }, 2000);
    },
  };
})();

// Manages all the page steppers.
const StepperManager = (function StepperManagerClosure() {
  let steppers = [];
  let stepperDiv = null;
  let stepperControls = null;
  let stepperChooser = null;
  let breakPoints = Object.create(null);
  return {
    // Properties/functions needed by PDFBug.
    id: &quot;Stepper&quot;,
    name: &quot;Stepper&quot;,
    panel: null,
    manager: null,
    init(pdfjsLib) {
      const self = this;
      stepperControls = document.createElement(&quot;div&quot;);
      stepperChooser = document.createElement(&quot;select&quot;);
      stepperChooser.addEventListener(&quot;change&quot;, function (event) {
        self.selectStepper(this.value);
      });
      stepperControls.append(stepperChooser);
      stepperDiv = document.createElement(&quot;div&quot;);
      this.panel.append(stepperControls, stepperDiv);
      if (sessionStorage.getItem(&quot;pdfjsBreakPoints&quot;)) {
        breakPoints = JSON.parse(sessionStorage.getItem(&quot;pdfjsBreakPoints&quot;));
      }

      opMap = Object.create(null);
      for (const key in pdfjsLib.OPS) {
        opMap[pdfjsLib.OPS[key]] = key;
      }
    },
    cleanup() {
      stepperChooser.textContent = &quot;&quot;;
      stepperDiv.textContent = &quot;&quot;;
      steppers = [];
    },
    enabled: false,
    active: false,
    // Stepper specific functions.
    create(pageIndex) {
      const debug = document.createElement(&quot;div&quot;);
      debug.id = &quot;stepper&quot; + pageIndex;
      debug.hidden = true;
      debug.className = &quot;stepper&quot;;
      stepperDiv.append(debug);
      const b = document.createElement(&quot;option&quot;);
      b.textContent = &quot;Page &quot; + (pageIndex + 1);
      b.value = pageIndex;
      stepperChooser.append(b);
      const initBreakPoints = breakPoints[pageIndex] || [];
      const stepper = new Stepper(debug, pageIndex, initBreakPoints);
      steppers.push(stepper);
      if (steppers.length === 1) {
        this.selectStepper(pageIndex, false);
      }
      return stepper;
    },
    selectStepper(pageIndex, selectPanel) {
      pageIndex |= 0;
      if (selectPanel) {
        this.manager.selectPanel(this);
      }
      for (const stepper of steppers) {
        stepper.panel.hidden = stepper.pageIndex !== pageIndex;
      }
      for (const option of stepperChooser.options) {
        option.selected = (option.value | 0) === pageIndex;
      }
    },
    saveBreakPoints(pageIndex, bps) {
      breakPoints[pageIndex] = bps;
      sessionStorage.setItem(&quot;pdfjsBreakPoints&quot;, JSON.stringify(breakPoints));
    },
  };
})();

// The stepper for each page&apos;s operatorList.
const Stepper = (function StepperClosure() {
  // Shorter way to create element and optionally set textContent.
  function c(tag, textContent) {
    const d = document.createElement(tag);
    if (textContent) {
      d.textContent = textContent;
    }
    return d;
  }

  function simplifyArgs(args) {
    if (typeof args === &quot;string&quot;) {
      const MAX_STRING_LENGTH = 75;
      return args.length &lt;= MAX_STRING_LENGTH
        ? args
        : args.substring(0, MAX_STRING_LENGTH) + &quot;...&quot;;
    }
    if (typeof args !== &quot;object&quot; || args === null) {
      return args;
    }
    if (&quot;length&quot; in args) {
      // array
      const MAX_ITEMS = 10,
        simpleArgs = [];
      let i, ii;
      for (i = 0, ii = Math.min(MAX_ITEMS, args.length); i &lt; ii; i++) {
        simpleArgs.push(simplifyArgs(args[i]));
      }
      if (i &lt; args.length) {
        simpleArgs.push(&quot;...&quot;);
      }
      return simpleArgs;
    }
    const simpleObj = {};
    for (const key in args) {
      simpleObj[key] = simplifyArgs(args[key]);
    }
    return simpleObj;
  }

  // eslint-disable-next-line no-shadow
  class Stepper {
    constructor(panel, pageIndex, initialBreakPoints) {
      this.panel = panel;
      this.breakPoint = 0;
      this.nextBreakPoint = null;
      this.pageIndex = pageIndex;
      this.breakPoints = initialBreakPoints;
      this.currentIdx = -1;
      this.operatorListIdx = 0;
      this.indentLevel = 0;
    }

    init(operatorList) {
      const panel = this.panel;
      const content = c(&quot;div&quot;, &quot;c=continue, s=step&quot;);
      const table = c(&quot;table&quot;);
      content.append(table);
      table.cellSpacing = 0;
      const headerRow = c(&quot;tr&quot;);
      table.append(headerRow);
      headerRow.append(
        c(&quot;th&quot;, &quot;Break&quot;),
        c(&quot;th&quot;, &quot;Idx&quot;),
        c(&quot;th&quot;, &quot;fn&quot;),
        c(&quot;th&quot;, &quot;args&quot;)
      );
      panel.append(content);
      this.table = table;
      this.updateOperatorList(operatorList);
    }

    updateOperatorList(operatorList) {
      const self = this;

      function cboxOnClick() {
        const x = +this.dataset.idx;
        if (this.checked) {
          self.breakPoints.push(x);
        } else {
          self.breakPoints.splice(self.breakPoints.indexOf(x), 1);
        }
        StepperManager.saveBreakPoints(self.pageIndex, self.breakPoints);
      }

      const MAX_OPERATORS_COUNT = 15000;
      if (this.operatorListIdx &gt; MAX_OPERATORS_COUNT) {
        return;
      }

      const chunk = document.createDocumentFragment();
      const operatorsToDisplay = Math.min(
        MAX_OPERATORS_COUNT,
        operatorList.fnArray.length
      );
      for (let i = this.operatorListIdx; i &lt; operatorsToDisplay; i++) {
        const line = c(&quot;tr&quot;);
        line.className = &quot;line&quot;;
        line.dataset.idx = i;
        chunk.append(line);
        const checked = this.breakPoints.includes(i);
        const args = operatorList.argsArray[i] || [];

        const breakCell = c(&quot;td&quot;);
        const cbox = c(&quot;input&quot;);
        cbox.type = &quot;checkbox&quot;;
        cbox.className = &quot;points&quot;;
        cbox.checked = checked;
        cbox.dataset.idx = i;
        cbox.onclick = cboxOnClick;

        breakCell.append(cbox);
        line.append(breakCell, c(&quot;td&quot;, i.toString()));
        const fn = opMap[operatorList.fnArray[i]];
        let decArgs = args;
        if (fn === &quot;showText&quot;) {
          const glyphs = args[0];
          const charCodeRow = c(&quot;tr&quot;);
          const fontCharRow = c(&quot;tr&quot;);
          const unicodeRow = c(&quot;tr&quot;);
          for (const glyph of glyphs) {
            if (typeof glyph === &quot;object&quot; &amp;&amp; glyph !== null) {
              charCodeRow.append(c(&quot;td&quot;, glyph.originalCharCode));
              fontCharRow.append(c(&quot;td&quot;, glyph.fontChar));
              unicodeRow.append(c(&quot;td&quot;, glyph.unicode));
            } else {
              // null or number
              const advanceEl = c(&quot;td&quot;, glyph);
              advanceEl.classList.add(&quot;advance&quot;);
              charCodeRow.append(advanceEl);
              fontCharRow.append(c(&quot;td&quot;));
              unicodeRow.append(c(&quot;td&quot;));
            }
          }
          decArgs = c(&quot;td&quot;);
          const table = c(&quot;table&quot;);
          table.classList.add(&quot;showText&quot;);
          decArgs.append(table);
          table.append(charCodeRow, fontCharRow, unicodeRow);
        } else if (fn === &quot;restore&quot;) {
          this.indentLevel--;
        }
        line.append(c(&quot;td&quot;, &quot; &quot;.repeat(this.indentLevel * 2) + fn));
        if (fn === &quot;save&quot;) {
          this.indentLevel++;
        }

        if (decArgs instanceof HTMLElement) {
          line.append(decArgs);
        } else {
          line.append(c(&quot;td&quot;, JSON.stringify(simplifyArgs(decArgs))));
        }
      }
      if (operatorsToDisplay &lt; operatorList.fnArray.length) {
        const lastCell = c(&quot;td&quot;, &quot;...&quot;);
        lastCell.colspan = 4;
        chunk.append(lastCell);
      }
      this.operatorListIdx = operatorList.fnArray.length;
      this.table.append(chunk);
    }

    getNextBreakPoint() {
      this.breakPoints.sort(function (a, b) {
        return a - b;
      });
      for (const breakPoint of this.breakPoints) {
        if (breakPoint &gt; this.currentIdx) {
          return breakPoint;
        }
      }
      return null;
    }

    breakIt(idx, callback) {
      StepperManager.selectStepper(this.pageIndex, true);
      this.currentIdx = idx;

      const listener = evt =&gt; {
        switch (evt.keyCode) {
          case 83: // step
            document.removeEventListener(&quot;keydown&quot;, listener);
            this.nextBreakPoint = this.currentIdx + 1;
            this.goTo(-1);
            callback();
            break;
          case 67: // continue
            document.removeEventListener(&quot;keydown&quot;, listener);
            this.nextBreakPoint = this.getNextBreakPoint();
            this.goTo(-1);
            callback();
            break;
        }
      };
      document.addEventListener(&quot;keydown&quot;, listener);
      this.goTo(idx);
    }

    goTo(idx) {
      const allRows = this.panel.getElementsByClassName(&quot;line&quot;);
      for (const row of allRows) {
        if ((row.dataset.idx | 0) === idx) {
          row.style.backgroundColor = &quot;rgb(251,250,207)&quot;;
          row.scrollIntoView();
        } else {
          row.style.backgroundColor = null;
        }
      }
    }
  }
  return Stepper;
})();

const Stats = (function Stats() {
  let stats = [];
  function clear(node) {
    node.textContent = &quot;&quot;; // Remove any `node` contents from the DOM.
  }
  function getStatIndex(pageNumber) {
    for (const [i, stat] of stats.entries()) {
      if (stat.pageNumber === pageNumber) {
        return i;
      }
    }
    return false;
  }
  return {
    // Properties/functions needed by PDFBug.
    id: &quot;Stats&quot;,
    name: &quot;Stats&quot;,
    panel: null,
    manager: null,
    init(pdfjsLib) {},
    enabled: false,
    active: false,
    // Stats specific functions.
    add(pageNumber, stat) {
      if (!stat) {
        return;
      }
      const statsIndex = getStatIndex(pageNumber);
      if (statsIndex !== false) {
        stats[statsIndex].div.remove();
        stats.splice(statsIndex, 1);
      }
      const wrapper = document.createElement(&quot;div&quot;);
      wrapper.className = &quot;stats&quot;;
      const title = document.createElement(&quot;div&quot;);
      title.className = &quot;title&quot;;
      title.textContent = &quot;Page: &quot; + pageNumber;
      const statsDiv = document.createElement(&quot;div&quot;);
      statsDiv.textContent = stat.toString();
      wrapper.append(title, statsDiv);
      stats.push({ pageNumber, div: wrapper });
      stats.sort(function (a, b) {
        return a.pageNumber - b.pageNumber;
      });
      clear(this.panel);
      for (const entry of stats) {
        this.panel.append(entry.div);
      }
    },
    cleanup() {
      stats = [];
      clear(this.panel);
    },
  };
})();

// Manages all the debugging tools.
const PDFBug = (function PDFBugClosure() {
  const panelWidth = 300;
  const buttons = [];
  let activePanel = null;

  return {
    tools: [FontInspector, StepperManager, Stats],
    enable(ids) {
      const all = ids.length === 1 &amp;&amp; ids[0] === &quot;all&quot;;
      const tools = this.tools;
      for (const tool of tools) {
        if (all || ids.includes(tool.id)) {
          tool.enabled = true;
        }
      }
      if (!all) {
        // Sort the tools by the order they are enabled.
        tools.sort(function (a, b) {
          let indexA = ids.indexOf(a.id);
          indexA = indexA &lt; 0 ? tools.length : indexA;
          let indexB = ids.indexOf(b.id);
          indexB = indexB &lt; 0 ? tools.length : indexB;
          return indexA - indexB;
        });
      }
    },
    init(pdfjsLib, container, ids) {
      this.loadCSS();
      this.enable(ids);
      /*
       * Basic Layout:
       * PDFBug
       *  Controls
       *  Panels
       *    Panel
       *    Panel
       *    ...
       */
      const ui = document.createElement(&quot;div&quot;);
      ui.id = &quot;PDFBug&quot;;

      const controls = document.createElement(&quot;div&quot;);
      controls.setAttribute(&quot;class&quot;, &quot;controls&quot;);
      ui.append(controls);

      const panels = document.createElement(&quot;div&quot;);
      panels.setAttribute(&quot;class&quot;, &quot;panels&quot;);
      ui.append(panels);

      container.append(ui);
      container.style.right = panelWidth + &quot;px&quot;;

      // Initialize all the debugging tools.
      for (const tool of this.tools) {
        const panel = document.createElement(&quot;div&quot;);
        const panelButton = document.createElement(&quot;button&quot;);
        panelButton.textContent = tool.name;
        panelButton.addEventListener(&quot;click&quot;, event =&gt; {
          event.preventDefault();
          this.selectPanel(tool);
        });
        controls.append(panelButton);
        panels.append(panel);
        tool.panel = panel;
        tool.manager = this;
        if (tool.enabled) {
          tool.init(pdfjsLib);
        } else {
          panel.textContent =
            `${tool.name} is disabled. To enable add &quot;${tool.id}&quot; to ` +
            &quot;the pdfBug parameter and refresh (separate multiple by commas).&quot;;
        }
        buttons.push(panelButton);
      }
      this.selectPanel(0);
    },
    loadCSS() {
      const { url } = import.meta;

      const link = document.createElement(&quot;link&quot;);
      link.rel = &quot;stylesheet&quot;;
      link.href = url.replace(/.js$/, &quot;.css&quot;);

      document.head.append(link);
    },
    cleanup() {
      for (const tool of this.tools) {
        if (tool.enabled) {
          tool.cleanup();
        }
      }
    },
    selectPanel(index) {
      if (typeof index !== &quot;number&quot;) {
        index = this.tools.indexOf(index);
      }
      if (index === activePanel) {
        return;
      }
      activePanel = index;
      for (const [j, tool] of this.tools.entries()) {
        const isActive = j === index;
        buttons[j].classList.toggle(&quot;active&quot;, isActive);
        tool.active = isActive;
        tool.panel.hidden = !isActive;
      }
    },
  };
})();

globalThis.FontInspector = FontInspector;
globalThis.StepperManager = StepperManager;
globalThis.Stats = Stats;

export { PDFBug };
