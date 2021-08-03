var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, d) {
    a != Array.prototype && a != Object.prototype && (a[c] = d.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, c, d, b) {
    if (c) {
        d = $jscomp.global;
        a = a.split(".");
        for (b = 0; b < a.length - 1; b++) {
            var g = a[b];
            g in d || (d[g] = {});
            d = d[g]
        }
        a = a[a.length - 1];
        b = d[a];
        c = c(b);
        c != b && null != c && $jscomp.defineProperty(d, a, {
            configurable: !0,
            writable: !0,
            value: c
        })
    }
};
$jscomp.arrayIteratorImpl = function(a) {
    var c = 0;
    return function() {
        return c < a.length ? {
            done: !1,
            value: a[c++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function() {
    var a = 0;
    return function(c) {
        return $jscomp.SYMBOL_PREFIX + (c || "") + a++
    }
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
};
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function(a, c) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var d = 0,
        b = {
            next: function() {
                if (d < a.length) {
                    var g = d++;
                    return {
                        value: c(g, a[g]),
                        done: !1
                    }
                }
                b.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return b.next()
            }
        };
    b[Symbol.iterator] = function() {
        return b
    };
    return b
};
$jscomp.polyfill("Array.prototype.entries", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a, d) {
            return [a, d]
        })
    }
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(a) {
    return a ? a : function(a, d) {
        return a === d ? 0 !== a || 1 / a === 1 / d : a !== a && d !== d
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(a) {
    return a ? a : function(a, d) {
        var b = this;
        b instanceof String && (b = String(b));
        var c = b.length;
        d = d || 0;
        for (0 > d && (d = Math.max(d + c, 0)); d < c; d++) {
            var f = b[d];
            if (f === a || Object.is(f, a)) return !0
        }
        return !1
    }
}, "es7", "es3");
$jscomp.checkStringArgs = function(a, c, d) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");
    if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.includes", function(a) {
    return a ? a : function(a, d) {
        return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, d || 0)
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a) {
            return a
        })
    }
}, "es6", "es3");

function Sidebar(a, c) {
    this.editorUi = a;
    this.container = c;
    this.palettes = {};
    this.taglist = {};
    this.imageSearch = {};
    this.showTooltips = !0;
    this.graph = a.createTemporaryGraph(this.editorUi.editor.graph.getStylesheet());
    this.graph.cellRenderer.minSvgStrokeWidth = this.minThumbStrokeWidth;
    this.graph.cellRenderer.antiAlias = this.thumbAntiAlias;
    this.graph.container.style.visibility = "hidden";
    this.graph.foldingEnabled = !1;
    document.body.appendChild(this.graph.container);
    this.pointerUpHandler = mxUtils.bind(this, function() {
        this.showTooltips = !0
    });
    mxEvent.addListener(document, mxClient.IS_POINTER ? "pointerup" : "mouseup", this.pointerUpHandler);
    this.pointerDownHandler = mxUtils.bind(this, function() {
        this.showTooltips = !1;
        this.hideTooltip()
    });
    mxEvent.addListener(document, mxClient.IS_POINTER ? "pointerdown" : "mousedown", this.pointerDownHandler);
    this.pointerMoveHandler = mxUtils.bind(this, function(a) {
        for (a = mxEvent.getSource(a); null != a;) {
            if (a == this.currentElt) return;
            a = a.parentNode
        }
        this.hideTooltip()
    });
    mxEvent.addListener(document, mxClient.IS_POINTER ? "pointermove" :
        "mousemove", this.pointerMoveHandler);
    this.pointerOutHandler = mxUtils.bind(this, function(a) {
        null == a.toElement && null == a.relatedTarget && this.hideTooltip()
    });
    mxEvent.addListener(document, mxClient.IS_POINTER ? "pointerout" : "mouseout", this.pointerOutHandler);
    mxEvent.addListener(c, "scroll", mxUtils.bind(this, function() {
        this.showTooltips = !0;
        this.hideTooltip()
    }));
    this.init()
}
Sidebar.prototype.init = function() {
    var a = STENCIL_PATH;
    this.addSearchPalette(!0);
    this.addGeneralPalette(!0);
    this.addMiscPalette(!1);
    this.addAdvancedPalette(!1);
    this.addBasicPalette(a);
    this.setCurrentSearchEntryLibrary("arrows");
    this.addStencilPalette("arrows", mxResources.get("arrows"), a + "/arrows.xml", ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2");
    this.setCurrentSearchEntryLibrary();
    this.addUmlPalette(!1);
    this.setCurrentSearchEntryLibrary("flowchart");
    this.addStencilPalette("flowchart",
        "Flowchart", a + "/flowchart.xml", ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2");
    this.setCurrentSearchEntryLibrary();
    this.setCurrentSearchEntryLibrary("clipart");
    this.addImagePalette("clipart", mxResources.get("clipart"), a + "/clipart/", "_128x128.png", "Earth_globe Empty_Folder Full_Folder Gear Lock Software Virus Email Database Router_Icon iPad iMac Laptop MacBook Monitor_Tower Printer Server_Tower Workstation Firewall_02 Wireless_Router_N Credit_Card Piggy_Bank Graph Safe Shopping_Cart Suit1 Suit2 Suit3 Pilot1 Worker1 Soldier1 Doctor1 Tech1 Security1 Telesales1".split(" "),
        null, {
            Wireless_Router_N: "wireless router switch wap wifi access point wlan",
            Router_Icon: "router switch"
        });
    this.setCurrentSearchEntryLibrary()
};
Sidebar.prototype.collapsedImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUQyRTJFNjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUQyRTJFNzZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MEUxNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MEUyNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhSMj6lrwAjcC1GyahV+dcZJgeIIFgA7" : IMAGE_PATH +
    "/collapsed.gif";
Sidebar.prototype.expandedImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY3NzBERjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY3NzBFMDZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MERENkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MERFNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7" : IMAGE_PATH +
    "/expanded.gif";
Sidebar.prototype.searchImage = mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEaSURBVHjabNGxS5VxFIfxz71XaWuQUJCG/gCHhgTD9VpEETg4aMOlQRp0EoezObgcd220KQiXmpretTAHQRBdojlQEJyukPdt+b1ywfvAGc7wnHP4nlZd1yKijQW8xzNc4Su+ZOYfQ3T6/f4YNvEJYzjELXp4VVXVz263+7cR2niBxAFeZ2YPi3iHR/gYERPDwhpOsd6sz8x/mfkNG3iOlWFhFj8y89J9KvzGXER0GuEaD42mgwHqUtoljbcRsTBCeINpfM/MgZLKPpaxFxGbOCqDXmILN7hoJrTKH+axhxmcYRxP0MIDnOBDZv5q1XUNIuJxifJp+UNV7t7BFM6xeic0RMQ4Bpl5W/ol7GISx/eEUUTECrbx+f8A8xhiZht9zsgAAAAASUVORK5CYII=" : IMAGE_PATH +
    "/search.png";
Sidebar.prototype.enableTooltips = !0;
Sidebar.prototype.tooltipBorder = 16;
Sidebar.prototype.tooltipDelay = 300;
Sidebar.prototype.dropTargetDelay = 200;
Sidebar.prototype.gearImage = STENCIL_PATH + "/clipart/Gear_128x128.png";
Sidebar.prototype.thumbWidth = 42;
Sidebar.prototype.thumbHeight = 42;
Sidebar.prototype.minThumbStrokeWidth = 1;
Sidebar.prototype.thumbAntiAlias = !1;
Sidebar.prototype.thumbPadding = 5 <= document.documentMode ? 2 : 3;
Sidebar.prototype.thumbBorder = 2;
"large" != urlParams["sidebar-entries"] && (Sidebar.prototype.thumbPadding = 5 <= document.documentMode ? 0 : 1, Sidebar.prototype.thumbBorder = 1, Sidebar.prototype.thumbWidth = 32, Sidebar.prototype.thumbHeight = 30, Sidebar.prototype.minThumbStrokeWidth = 1.3, Sidebar.prototype.thumbAntiAlias = !0);
Sidebar.prototype.sidebarTitleSize = 9;
Sidebar.prototype.sidebarTitles = !1;
Sidebar.prototype.tooltipTitles = !0;
Sidebar.prototype.maxTooltipWidth = 400;
Sidebar.prototype.maxTooltipHeight = 400;
Sidebar.prototype.addStencilsToIndex = !0;
Sidebar.prototype.defaultImageWidth = 80;
Sidebar.prototype.defaultImageHeight = 80;
Sidebar.prototype.getTooltipOffset = function(a, c) {
    document.getElementsByClassName("geHsplit");
    c = c.height + 2 * this.tooltipBorder;
    return new mxPoint(this.container.offsetWidth + this.editorUi.splitSize + 10 + this.editorUi.container.offsetLeft, Math.min(Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight) - c - 20, Math.max(0, this.editorUi.container.offsetTop + this.container.offsetTop + a.offsetTop - this.container.scrollTop - c / 2 + 16)))
};
Sidebar.prototype.showTooltip = function(a, c, d, b, g, f) {
    if (this.enableTooltips && this.showTooltips && this.currentElt != a) {
        null != this.thread && (window.clearTimeout(this.thread), this.thread = null);
        var h = mxUtils.bind(this, function() {
            null == this.tooltip && (this.tooltip = document.createElement("div"), this.tooltip.className = "geSidebarTooltip", this.tooltip.style.zIndex = mxPopupMenu.prototype.zIndex - 1, document.body.appendChild(this.tooltip), this.graph2 = new Graph(this.tooltip, null, null, this.editorUi.editor.graph.getStylesheet()),
                this.graph2.resetViewOnRootChange = !1, this.graph2.foldingEnabled = !1, this.graph2.gridEnabled = !1, this.graph2.autoScroll = !1, this.graph2.setTooltips(!1), this.graph2.setConnectable(!1), this.graph2.setEnabled(!1), mxClient.IS_SVG || (this.graph2.view.canvas.style.position = "relative"));
            this.graph2.model.clear();
            this.graph2.view.setTranslate(this.tooltipBorder, this.tooltipBorder);
            this.graph2.view.scale = d > this.maxTooltipWidth || b > this.maxTooltipHeight ? Math.round(100 * Math.min(this.maxTooltipWidth / d, this.maxTooltipHeight /
                b)) / 100 : 1;
            this.tooltip.style.display = "block";
            this.graph2.labelsVisible = null == f || f;
            var e = mxClient.NO_FO;
            mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
            var h = this.graph2.cloneCells(c);
            this.editorUi.insertHandler(h, null, this.graph2.model);
            this.graph2.addCells(h);
            mxClient.NO_FO = e;
            e = this.graph2.getGraphBounds();
            h = e.width + 2 * this.tooltipBorder + 4;
            var l = e.height + 2 * this.tooltipBorder;
            this.tooltip.style.overflow = "visible";
            this.tooltip.style.width = h + "px";
            var m = h;
            if (this.tooltipTitles && null != g && 0 < g.length) {
                null ==
                    this.tooltipTitle ? (this.tooltipTitle = document.createElement("div"), this.tooltipTitle.style.borderTop = "1px solid gray", this.tooltipTitle.style.textAlign = "center", this.tooltipTitle.style.width = "100%", this.tooltipTitle.style.overflow = "hidden", this.tooltipTitle.style.position = "absolute", this.tooltipTitle.style.paddingTop = "6px", this.tooltipTitle.style.bottom = "6px", this.tooltip.appendChild(this.tooltipTitle)) : this.tooltipTitle.innerHTML = "";
                this.tooltipTitle.style.display = "";
                mxUtils.write(this.tooltipTitle,
                    g);
                m = Math.min(this.maxTooltipWidth, Math.max(h, this.tooltipTitle.scrollWidth + 4));
                var u = this.tooltipTitle.offsetHeight + 10;
                l += u;
                mxClient.IS_SVG ? this.tooltipTitle.style.marginTop = 2 - u + "px" : (l -= 6, this.tooltipTitle.style.top = l - u + "px")
            } else null != this.tooltipTitle && null != this.tooltipTitle.parentNode && (this.tooltipTitle.style.display = "none");
            m > h && (this.tooltip.style.width = m + "px");
            this.tooltip.style.height = l + "px";
            h = -Math.round(e.x - this.tooltipBorder) + (m > h ? (m - h) / 2 : 0);
            l = -Math.round(e.y - this.tooltipBorder);
            m =
                this.getTooltipOffset(a, e);
            e = m.x;
            m = m.y;
            mxClient.IS_SVG ? 0 != h || 0 != l ? this.graph2.view.canvas.setAttribute("transform", "translate(" + h + "," + l + ")") : this.graph2.view.canvas.removeAttribute("transform") : (this.graph2.view.drawPane.style.left = h + "px", this.graph2.view.drawPane.style.top = l + "px");
            this.tooltip.style.position = "absolute";
            this.tooltip.style.left = e + "px";
            this.tooltip.style.top = m + "px";
            mxUtils.fit(this.tooltip)
        });
        null != this.tooltip && "none" != this.tooltip.style.display ? h() : this.thread = window.setTimeout(h,
            this.tooltipDelay);
        this.currentElt = a
    }
};
Sidebar.prototype.hideTooltip = function() {
    null != this.thread && (window.clearTimeout(this.thread), this.thread = null);
    null != this.tooltip && (this.tooltip.style.display = "none", this.currentElt = null)
};
Sidebar.prototype.addDataEntry = function(a, c, d, b, g) {
    return this.addEntry(a, mxUtils.bind(this, function() {
        return this.createVertexTemplateFromData(g, c, d, b)
    }))
};
Sidebar.prototype.addEntries = function(a) {
    for (var c = 0; c < a.length; c++) mxUtils.bind(this, function(a) {
        var b = a.data,
            c = null != a.title ? a.title : "";
        null != a.tags && (c += " " + a.tags);
        null != b && 0 < c.length ? this.addEntry(c, mxUtils.bind(this, function() {
            b = this.editorUi.convertDataUri(b);
            var f = "shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;";
            "fixed" == a.aspect && (f += "aspect=fixed;");
            return this.createVertexTemplate(f + "image=" + b, a.w, a.h, "", a.title || "", !1, !1, !0)
        })) : null != a.xml && 0 < c.length && this.addEntry(c,
            mxUtils.bind(this, function() {
                var b = this.editorUi.stringToCells(Graph.decompress(a.xml));
                return this.createVertexTemplateFromCells(b, a.w, a.h, a.title || "", !0, !1, !0)
            }))
    })(a[c])
};
Sidebar.prototype.setCurrentSearchEntryLibrary = function(a, c) {
    this.currentSearchEntryLibrary = null != a ? {
        id: a,
        lib: c
    } : null
};

// Sidebar.prototype.addEntry = function (tags, fn) {
// 	if (this.taglist != null && tags != null && tags.length > 0) {
// 		// Replaces special characters
// 		var tmp = tags.toLowerCase().replace(/[\/\,\(\)]/g, ' ').split(' ');

// 		var doAddEntry = mxUtils.bind(this, function (tag) {
// 			if (tag != null && tag.length > 1) {
// 				var entry = this.taglist[tag];

// 				if (typeof entry !== 'object') {
// 					entry = { entries: [], dict: new mxDictionary() };
// 					this.taglist[tag] = entry;
// 				}
                
// 				// Ignores duplicates
// 				if (entry.dict.get(fn) == null) {
// 					entry.dict.put(fn, fn);
// 					entry.entries.push(fn);
// 				}
// 			}
// 		});
// 		for (var i = 0; i < tmp.length; i++) {
// 			doAddEntry(tmp[i]);

// 			// Adds additional entry with removed trailing numbers
// 			var normalized = tmp[i].replace(/\.*\d*$/, '');

// 			if (normalized != tmp[i]) {
// 				doAddEntry(normalized);
// 			}
// 		}
// 	}
// 	return fn;
// };

/**
 * Hides the current tooltip.
 */
 Sidebar.prototype.setCurrentSearchEntryLibrary = function(id, lib)
 {
     this.currentSearchEntryLibrary = (id != null) ? {id: id, lib: lib} : null;
 };
 
 /**
  * Hides the current tooltip.
  */
 Sidebar.prototype.addEntry = function(tags, fn)
 {
     if (this.taglist != null && tags != null && tags.length > 0)
     {
         if (this.currentSearchEntryLibrary != null)
         {
             fn.parentLibraries = [this.currentSearchEntryLibrary];
         }
         
         // Replaces special characters
         var tmp = tags.toLowerCase().replace(/[\/\,\(\)]/g, ' ').split(' ');
         var tagList = [];
         var hash = {};
 
         // Finds unique tags
         for (var i = 0; i < tmp.length; i++)
         {
             if (hash[tmp[i]] == null)
             {
                 hash[tmp[i]] = true;
                 tagList.push(tmp[i]);
             }
             
             // Adds additional entry with removed trailing numbers
             var normalized = tmp[i].replace(/\.*\d*$/, '');
             
             if (normalized != tmp[i])
             {
                 if (hash[normalized] == null)
                 {
                     hash[normalized] = true;
                     tagList.push(normalized);
                 }
             }
         }
         
         for (var i = 0; i < tagList.length; i++)
         {
             this.addEntryForTag(tagList[i], fn);
         }
     }
 
     return fn;
 };

 Sidebar.prototype.addEntryForTag = function(tag, fn)
{
	if (tag != null && tag.length > 1)
	{
		var entry = this.taglist[tag];
		mxDictionary.prototype.clear();
		if (typeof entry !== 'object')
		{
			entry = {entries: [], dict:new mxDictionary()};
			this.taglist[tag] = entry;
		}
		// mxDictionary.prototype.clear();
        if (entry.dict.get(fn) == null) {
            entry.dict.put(fn, fn);
            entry.entries.push(fn);
        }

	}
};

Sidebar.prototype.searchEntries = function (searchTerms, count, page, success, error) {
	if (this.taglist != null && searchTerms != null) {
		var tmp = searchTerms.toLowerCase().split(' ');
		var dict = new mxDictionary();
		var max = (page + 1) * count;
		var results = [];
		var index = 0;
		var map = {}
		var arr = []
		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i].length > 0) {
				var requiredObj = [];
				for (const property in this.taglist) {
					if(property.includes(tmp[i])){
						requiredObj.push(this.taglist[property]);
					}
				  }
				  for(var k=0;k<requiredObj.length;k++){
					  var mappings = Object.keys(requiredObj[k].dict.map);
					  for(var m = 0;m<mappings.length;m++){
						  map[mappings[m]] = requiredObj[k].dict.map[mappings[m]]
					  }
					  for(var e =0;e<requiredObj[k].entries.length;e++){
						if(arr.indexOf(requiredObj[k].entries[e]) === -1) {
							arr.push(requiredObj[k].entries[e]);
						}
					  }
				  }
                var combinedObject = {
					dict: map,
					entries: arr
				}
				var entry = combinedObject;
				var tmpDict = new mxDictionary();
				if (entry != null) {
					var arr = entry.entries;

					results = [];
					for (var j = 0; j < arr.length; j++) {
						var entry = arr[j];

						// NOTE Array does not contain duplicates
						if ((index == 0) == (dict.get(entry) == null)) {
							tmpDict.put(entry, entry);
							results.push(entry);
							if (i == tmp.length - 1 && results.length == max) {
								success(results.slice(page * count, max), max, true, tmp);
								return;
							}
						}
					}
				}
				else {
					results = [];
				}

				dict = tmpDict;
				index++;
			}
		}

		var len = results.length;
		success(results.slice(page * count, (page + 1) * count), len, false, tmp);
	}
	else {
		success([], null, null, tmp);
	}
};

Sidebar.prototype.filterTags = function(a) {
    if (null != a) {
        a = a.split(" ");
        for (var c = [], d = {}, b = 0; b < a.length; b++) null == d[a[b]] && (d[a[b]] = "1", c.push(a[b]));
        return c.join(" ")
    }
    return null
};
Sidebar.prototype.cloneCell = function(a, c) {
    a = a.clone();
    null != c && (a.value = c);
    return a
};
Sidebar.prototype.showPopupMenuForEntry = function(a, c, d) {};
Sidebar.prototype.addSearchPalette = function(a) {
    var c = document.createElement("div");
    c.style.visibility = "hidden";
    this.container.appendChild(c);
    var d = document.createElement("div");
    d.className = "geSidebar";
    d.style.boxSizing = "border-box";
    d.style.overflow = "hidden";
    d.style.width = "100%";
    d.style.padding = "8px";
    d.style.paddingTop = "14px";
    d.style.paddingBottom = "0px";
    a || (d.style.display = "none");
    var b = document.createElement("div");
    b.style.whiteSpace = "nowrap";
    b.style.textOverflow = "clip";
    b.style.paddingBottom = "8px";
    b.style.cursor = "default";
    var g = document.createElement("input");
    g.setAttribute("placeholder", mxResources.get("searchShapes"));
    g.setAttribute("type", "text");
    g.style.fontSize = "12px";
    g.style.overflow = "hidden";
    g.style.boxSizing = "border-box";
    g.style.border = "solid 1px #d5d5d5";
    g.style.borderRadius = "4px";
    g.style.width = "100%";
    g.style.outline = "none";
    g.style.padding = "6px";
    g.style.paddingRight = "20px";
    b.appendChild(g);
    var f = document.createElement("img");
    f.setAttribute("src", Sidebar.prototype.searchImage);
    f.setAttribute("title",
        mxResources.get("search"));
    f.style.position = "relative";
    f.style.left = "-18px";
    f.style.top = "1px";
    f.style.background = "url('" + this.editorUi.editor.transparentImage + "')";
    b.appendChild(f);
    d.appendChild(b);
    var h = document.createElement("center"),
        e = mxUtils.button(mxResources.get("moreResults"), function() {
            w()
        });
    e.style.display = "none";
    e.style.lineHeight = "normal";
    e.style.fontSize = "12px";
    e.style.padding = "6px 12px 6px 12px";
    e.style.marginTop = "4px";
    e.style.marginBottom = "8px";
    h.style.paddingTop = "4px";
    h.style.paddingBottom =
        "4px";
    h.appendChild(e);
    d.appendChild(h);
    var k = "",
        l = !1,
        m = !1,
        u = 0,
        q = {},
        t = 12,
        p = mxUtils.bind(this, function() {
            l = !1;
            this.currentSearch = null;
            for (var a = d.firstChild; null != a;) {
                var f = a.nextSibling;
                a != b && a != h && a.parentNode.removeChild(a);
                a = f
            }
        });
    mxEvent.addListener(f, "click", function() {
        f.getAttribute("src") == Dialog.prototype.closeImage && (f.setAttribute("src", Sidebar.prototype.searchImage), f.setAttribute("title", mxResources.get("search")), e.style.display = "none", k = g.value = "", p());
        g.focus()
    });
    var w = mxUtils.bind(this,
        function() {
            t = 4 * Math.max(1, Math.floor(this.container.clientWidth / (this.thumbWidth + 10)));
            this.hideTooltip();
            if ("" != g.value) {
                if (null != h.parentNode && (k != g.value && (p(), k = g.value, q = {}, m = !1, u = 0), !l && !m)) {
                    e.setAttribute("disabled", "true");
                    e.style.display = "";
                    e.style.cursor = "wait";
                    e.innerHTML = mxResources.get("loading") + "...";
                    l = !0;
                    var a = {};
                    this.currentSearch = a;
                    this.searchEntries(k, t, u, mxUtils.bind(this, function(b, f, c, g) {
                        if (this.currentSearch == a) {
                            b = null != b ? b : [];
                            l = !1;
                            u++;
                            this.insertSearchHint(d, k, t, u, b, f, c, g);
                            0 == b.length && 1 == u && (k = "");
                            null != h.parentNode && h.parentNode.removeChild(h);
                            for (f = 0; f < b.length; f++) try {
                                var r = b[f]();
                                null == q[r.innerHTML] && (q[r.innerHTML] = "1", d.appendChild(r))
                            } catch (D) {}
                            c ? (e.removeAttribute("disabled"), e.innerHTML = mxResources.get("moreResults")) : (e.innerHTML = mxResources.get("reset"), e.style.display = "none", m = !0);
                            e.style.cursor = "";
                            d.appendChild(h)
                        }
                    }), mxUtils.bind(this, function() {
                        e.style.cursor = ""
                    }))
                }
            } else p(), k = g.value = "", q = {}, e.style.display = "none", m = !1, g.focus()
        });
    mxEvent.addListener(g,
        "keydown", mxUtils.bind(this, function(a) {
            a && setTimeout(function() {
                2 <= g.value.length ? w() : (p(), k = "", e.style.display = "none", m = !1, g.focus())
            }, 100);
            13 == a.keyCode && (w(), mxEvent.consume(a))
        }));
    mxEvent.addListener(g, "keyup", mxUtils.bind(this, function(a) {
        "" == g.value ? (f.setAttribute("src", Sidebar.prototype.searchImage), f.setAttribute("title", mxResources.get("search"))) : (f.setAttribute("src", Dialog.prototype.closeImage), f.setAttribute("title", mxResources.get("reset")));
        "" == g.value ? (m = !0, e.style.display = "none") :
            g.value != k ? (e.style.display = "none", m = !1) : l || (e.style.display = m ? "none" : "")
    }));
    mxEvent.addListener(g, "mousedown", function(a) {
        a.stopPropagation && a.stopPropagation();
        a.cancelBubble = !0
    });
    mxEvent.addListener(g, "selectstart", function(a) {
        a.stopPropagation && a.stopPropagation();
        a.cancelBubble = !0
    });
    a = document.createElement("div");
    a.appendChild(d);
    this.container.appendChild(a);
    this.palettes.search = [c, a]
};
Sidebar.prototype.insertSearchHint = function(a, c, d, b, g, f, h, e) {
    0 == g.length && 1 == b && (d = document.createElement("div"), d.className = "geTitle", d.style.cssText = "background-color:transparent;border-color:transparent;color:gray;padding:6px 0px 0px 0px !important;margin:4px 8px 4px 8px;text-align:center;cursor:default !important", mxUtils.write(d, mxResources.get("noResultsFor", [c])), a.appendChild(d))
};
Sidebar.prototype.addGeneralPalette = function(a) {
    this.setCurrentSearchEntryLibrary("general", "general");
    var c = [this.createVertexTemplateEntry("rounded=0;whiteSpace=wrap;html=1;", 120, 60, "", "Rectangle", null, null, "rect rectangle box test"), 
            this.createVertexTemplateEntry("rounded=1;whiteSpace=wrap;html=1;", 120, 60, "", "Rounded Rectangle", null, null, "rounded rect rectangle box test"),
            this.createVertexTemplateEntry("text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;", 40, 20, "Text", "Text", null, null, "text textbox textarea label test"), 
            this.createVertexTemplateEntry("text;html=1;strokeColor=none;fillColor=none;spacing=5;spacingTop=-20;whiteSpace=wrap;overflow=hidden;rounded=0;", 190, 120, "<h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>", "Textbox", null, null, "text textbox textarea test"), 
            this.createVertexTemplateEntry("ellipse;whiteSpace=wrap;html=1;", 120, 80, "", "Ellipse", null, null, "oval ellipse state test"), 
            this.createVertexTemplateEntry("whiteSpace=wrap;html=1;aspect=fixed;", 80, 80, "", "Square", null, null, "square test"), 
            this.createVertexTemplateEntry("ellipse;whiteSpace=wrap;html=1;aspect=fixed;", 80, 80, "", "Circle", null, null, "circle test"), 
            this.createVertexTemplateEntry("shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;", 120, 60, "", "Process", null, null, "process task test"), 
            this.createVertexTemplateEntry("rhombus;whiteSpace=wrap;html=1;", 80, 80, "", "Diamond", null, null, "diamond rhombus if condition decision conditional question test"),
            this.createVertexTemplateEntry("shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fixedSize=1;", 120, 60, "", "Parallelogram test"), 
            this.createVertexTemplateEntry("shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;", 120, 80, "", "Hexagon", null, null, "hexagon preparation test"), 
            this.createVertexTemplateEntry("triangle;whiteSpace=wrap;html=1;", 60, 80, "", "Triangle", null, null, "triangle logic inverter buffer test"), 
            this.createVertexTemplateEntry("shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;", 60, 80, "", "Cylinder", null, null, "cylinder data database test"), 
            this.createVertexTemplateEntry("ellipse;shape=cloud;whiteSpace=wrap;html=1;", 120, 80, "", "Cloud", null, null, "cloud network test"), 
            this.createVertexTemplateEntry("shape=document;whiteSpace=wrap;html=1;boundedLbl=1;", 120, 80, "", "Document test"), 
            this.createVertexTemplateEntry("shape=internalStorage;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Internal Storage test"), 
            this.createVertexTemplateEntry("shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;", 120, 80, "", "Cube test"), 
            this.createVertexTemplateEntry("shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;", 120, 80, "", "Step test"), 
            this.createVertexTemplateEntry("shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;", 120, 60, "", "Trapezoid test"), 
            this.createVertexTemplateEntry("shape=tape;whiteSpace=wrap;html=1;", 120, 100, "", "Tape test"), 
            this.createVertexTemplateEntry("shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;", 80, 100, "", "Note test"), 
            this.createVertexTemplateEntry("shape=card;whiteSpace=wrap;html=1;", 80, 100, "", "Card test"), 
            this.createVertexTemplateEntry("shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;", 120, 80, "", "Callout", null, null, "bubble chat thought speech message test"), 
            this.createVertexTemplateEntry("shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;", 30, 60, "Actor", "Actor", !1, null, "user person human stickman test"), 
            this.createVertexTemplateEntry("shape=xor;whiteSpace=wrap;html=1;", 60, 80, "", "Or", null, null, "logic or test"), 
            this.createVertexTemplateEntry("shape=or;whiteSpace=wrap;html=1;", 60, 80, "", "And", null, null, "logic and test"), 
            this.createVertexTemplateEntry("shape=dataStorage;whiteSpace=wrap;html=1;fixedSize=1;", 100, 80, "", "Data Storage test"), this.addEntry("curve", mxUtils.bind(this, function() {
            var a = new mxCell("", new mxGeometry(0, 0, 50, 50), "curved=1;endArrow=classic;html=1;");
            a.geometry.setTerminalPoint(new mxPoint(0, 50), !0);
            a.geometry.setTerminalPoint(new mxPoint(50, 0), !1);
            a.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)];
            a.geometry.relative = !0;
            a.edge = !0;
            return this.createEdgeTemplateFromCells([a],
                a.geometry.width, a.geometry.height, "Curve")
        })), this.createEdgeTemplateEntry("shape=flexArrow;endArrow=classic;startArrow=classic;html=1;", 100, 100, "", "Bidirectional Arrow", null, "line lines connector connectors connection connections arrow arrows bidirectional"), this.createEdgeTemplateEntry("shape=flexArrow;endArrow=classic;html=1;", 50, 50, "", "Arrow", null, "line lines connector connectors connection connections arrow arrows directional directed"), this.createEdgeTemplateEntry("endArrow=none;dashed=1;html=1;",
            50, 50, "", "Dashed Line", null, "line lines connector connectors connection connections arrow arrows dashed undirected no"), this.createEdgeTemplateEntry("endArrow=none;dashed=1;html=1;dashPattern=1 3;strokeWidth=2;", 50, 50, "", "Dotted Line", null, "line lines connector connectors connection connections arrow arrows dotted undirected no"), this.createEdgeTemplateEntry("endArrow=none;html=1;", 50, 50, "", "Line", null, "line lines connector connectors connection connections arrow arrows simple undirected plain blank no"),
        this.createEdgeTemplateEntry("endArrow=classic;startArrow=classic;html=1;", 50, 50, "", "Bidirectional Connector", null, "line lines connector connectors connection connections arrow arrows bidirectional"), this.createEdgeTemplateEntry("endArrow=classic;html=1;", 50, 50, "", "Directional Connector", null, "line lines connector connectors connection connections arrow arrows directional directed"), this.createEdgeTemplateEntry("shape=link;html=1;", 100, 0, "", "Link", null, "line lines connector connectors connection connections arrow arrows link"),
        this.addEntry("line lines connector connectors connection connections arrow arrows edge title", mxUtils.bind(this, function() {
            var a = new mxCell("", new mxGeometry(0, 0, 0, 0), "endArrow=classic;html=1;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(100, 0), !1);
            a.geometry.relative = !0;
            a.edge = !0;
            var b = new mxCell("Label", new mxGeometry(0, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            return this.createEdgeTemplateFromCells([a], 100, 0, "Connector with Label")
        })), this.addEntry("line lines connector connectors connection connections arrow arrows edge title multiplicity", mxUtils.bind(this, function() {
            var a = new mxCell("", new mxGeometry(0, 0, 0, 0), "endArrow=classic;html=1;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
            a.geometry.relative = !0;
            a.edge = !0;
            var b = new mxCell("Label", new mxGeometry(0, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            b = new mxCell("Source", new mxGeometry(-1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            return this.createEdgeTemplateFromCells([a], 160, 0, "Connector with 2 Labels")
        })), this.addEntry("line lines connector connectors connection connections arrow arrows edge title multiplicity", mxUtils.bind(this, function() {
            var a = new mxCell("Label", new mxGeometry(0,
                0, 0, 0), "endArrow=classic;html=1;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
            a.geometry.relative = !0;
            a.edge = !0;
            var b = new mxCell("Label", new mxGeometry(0, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            b = new mxCell("Source", new mxGeometry(-1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            b = new mxCell("Target", new mxGeometry(1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=right;verticalAlign=bottom;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            return this.createEdgeTemplateFromCells([a], 160, 0, "Connector with 3 Labels")
        })), this.addEntry("line lines connector connectors connection connections arrow arrows edge shape symbol message mail email", mxUtils.bind(this, function() {
            var a = new mxCell("", new mxGeometry(0, 0, 0, 0), "endArrow=classic;html=1;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(100, 0), !1);
            a.geometry.relative = !0;
            a.edge = !0;
            var b = new mxCell("", new mxGeometry(0, 0, 20, 14), "shape=message;html=1;outlineConnect=0;");
            b.geometry.relative = !0;
            b.vertex = !0;
            b.geometry.offset = new mxPoint(-10, -7);
            a.insert(b);
            return this.createEdgeTemplateFromCells([a], 100, 0, "Connector with Symbol")
        }))
    ];
    this.addPaletteFunctions("general", mxResources.get("general"), null != a ? a : !0, c);
    this.setCurrentSearchEntryLibrary()
};
Sidebar.prototype.addMiscPalette = function(a) {
    var c = this;
    this.setCurrentSearchEntryLibrary("general", "misc");
    var d = [this.createVertexTemplateEntry("text;strokeColor=none;fillColor=none;html=1;fontSize=24;fontStyle=1;verticalAlign=middle;align=center;", 100, 40, "Title", "Title", null, null, "text heading title"), this.createVertexTemplateEntry("text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;", 100, 80, "<ul><li>Value 1</li><li>Value 2</li><li>Value 3</li></ul>",
            "Unordered List"), this.createVertexTemplateEntry("text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;", 100, 80, "<ol><li>Value 1</li><li>Value 2</li><li>Value 3</li></ol>", "Ordered List"), this.addDataEntry("table", 180, 120, "Table 1", "7ZjJTsMwEIafJleUhZZybVgucAFewDTT2pLjiewpaXl6xolLVQFqWBJArZRKns2xv5H7y4myvFxdW1HJWyxAR9lllOUWkdpRucpB6yiNVRFlF1GaxvyL0qsPokkTjSthwVCXgrQteBJ6Ca2ndTha6+BwUlR+SOLRu6aSSl7mRcLDWiqC+0rMfLzmTbDPkbB0r569K2Z7hoaEMmBDzQy1FpVTzWRthlS6uBFrXNLmNRtrGpYHlmD14RYbV9jfNWAJZNecUquCZMiYtBhiCWohN2WBTSxc61i81m6J8SBAex9g1h0gL5mU0HcwI2EWXVi+ZVVYrB6EXQAFR4XKENjLJ6bhgm+utM5Ro0du0PgXEVYhqGG+qX1EIiyDYQOY10kbKKMpP4wpj09G0Yh3k7OdbG1+fLqlHI0jy432c4BwVIPr3MD0aw08/YH+nfbbP2N89rZ/324NMsq5xppNqYoCTFfG2V7G454Qjw4c8WoX7wDEx0fiO3/wAyA/O+pAbzqw3m3TELIwOZQTdPZrsnB+4IiHl4UkPiIfWheS5CgMfQvDZEBhSD5xY/7fZyjZf63u7dD0fKv++5B/QRwO5ia8h3mP6sDm9tNeE9v58vcC"),
        this.addDataEntry("table", 180, 120, "Table 2", "7ZjBbqMwEIafhmuFISTptbTbS/eyrfbuBie2ZDzITEqyT79jMMlGWVTUBlqVSkTyjGeM+SbDLxPEab67t7yQPyETOojvgji1ANiM8l0qtA6iUGVBfBtEUUi/IPrRMcvq2bDgVhjskxA1CS9cb0XjaRwl7rV3lJIXboj82bluJOa0zVtGw0oqFI8FX7n5ih6CfCVyi4/qj3OFZK/AIFdGWJ+zAq15Uap6sSZCKp098D1ssb1Na7nobW4eKL/00Raqf02/f2FR7DoZ1C4P4F5ALtDuKaRSGUofsWw4hVKojWzTPLyQl41jc8g9IqWBp/p/wnF/wrRlVFz/EivkZtMH9jnMzELxxO1GoHcUoAwKe/dCNFpoa6V1ChpcTQwYdyOEwk9qsW5znwER8ha8B3NYtIaS3NBFmNLwKgkSepqUbHa06XLhFlMwJVr6J7g1BC+xEiX2LWD0tgLOLlC/2Vn9ftfDKGQXLaQxLvpYyHfXCIjpWkNFplRZJkxf2PGrsOcDsU46WV+2aT49690p5xHQzzvRx5NEf3j3j8B+8S0Rg0nE/rRMYyjGsrOVZl+0lRYfphjXnayTabEeXzFY2Ml+Pkn2Y0oGY9+aMbRmLEfUDHZ+EG+bafFFm4m9fiofrHvOD+Ut7eXEaH+AbnSfqK+nCX9A4SDz+DGxnjv51vgX"),
        this.addDataEntry("table title", 180, 120, "Table with Title 1", "7ZhRb6MwDMc/Da8nAmPdvZbu9nJ7WfcFMnAhUohR4o12n34OpKumrmqlDXa6VqJS/Lcdkp8bWSFK82Z9Z2Vb32MJOkpvozS3iDSMmnUOWkdJrMooXURJEvMvSv4c8IreG7fSgqFTEpIh4UXqZxiUR/mkYVAdbXRQXS1bP6Tem85ranitC8HDrlYEy1YW3t/xTlhzJC0t1auX0piFAg1JZcCGpAK1lq1T/WyLPqJWuvwrN/hM2/dsrfmKs5dhMT5balUZHhe8Sz/lPOwCLMH6IIleChjuABsgu+GQTpVUh4ibgVZcg6rqbVoWROkGoXrP3YHlQWD7Oed0j/NBxLxkUlI/QEHSVKfQ3odZWmwfpa2AgtCi8qhuX5iGC9pKaZ2jRl8Tg8a/iLANTg2rbe4TEmETDBvAvE/aQ8nm/DCmPP6VRRnvJmdb7Gx+fLilHI0jy/8EPwdIRx04OrWAyecF3ATEoUzH6nn1DeW8GrecxvjoXTm/XClksiuNHZu1KkswpyJPj56Z65EQZ2eOeP0R7wTEry/E+4RkOuSzS1sYuy3MJmwLN+dygmY/1hZ+nzni6duCiC/Ip+4LQlwaw9iNQYgJO4PYv2j/p4dIHL9mj3ZqRr5l//uQf6A7nM1V+AjzEdsDm7svgr3vwwfDNw=="),
        this.addDataEntry("table title", 180, 150, "Table with Title 2", "7Zhdb5swFIZ/DbcTHyVrbiFdb7Kbptq9Cw5YMj7IPi1kv37HYJK1FDWbQoOmSUSyz4dt3id+L/CitGrvNavL75Bz6UV3XpRqAOxHVZtyKb3QF7kXbbww9Onnhd8mskGX9WumucJzGsK+4YXJZ95HHtmT5H3U4EG6qClZbYfYZaOkxIrOuglo2JQC+a5mmc039CYUM8g07sRPG4p8CmSgkAnFtWvKQEpWG9GttukqSiHzLTvAMw77DLNkL1qeP0BjXLeGZkuLGde6p8V37qw2zaQoFI0zEsHumLiX5Bp5OylUF3Iq3XOoOOoDlTQix9JV3PZi+iUXRTm0xS7ITB8ojr0n3WngpH8fQzTCMEmAjoyCyQeeIVPFOTDGWuca6kemC44uUIOwUt29kBpHVYWUKUiwyBQouxFC7ZKS74feJ0CEaiDjhDku2okSJ/SQTKn/JfZiepuU5sFpTo8t15iCMqjpj2LX4Mxgww2eCzB8H+DBSewwfcQzugDOmxHO4KI8lbLVJ55/jMp/gwpI2r2EhqalyHOuztU8+vDS3MykcTzS+Ec3DP2Faz24U1+bGNpQqGLbd65mgNG+BvH7BZgLzupf8LO34JblZ6tP9LOvI5yX5bkcP1tdzc9uJ/1s4VrP52cTMK7gZ+v/fja3n60/0c8Cf8QzWvYl++s7tL6aoQXBpKMtXOz5HG2CxvyORtPTR4Uu9+qbwy8="),
        this.addDataEntry("crossfunctional cross-functional cross functional flowchart swimlane table", 400, 400, "Cross-Functional Flowchart", "7ZhRb5swEMc/DY+bMCRt97jQpi+tVC2fwINbbMnYyD4C6aefjaHpBrTRlNCoTALJPp9t+P25O5kgTvL6XtOCPaoMRBDfBXGilULfyusEhAiikGdBfBtEUWjvIFqPjJJmNCyoBonHTIj8hB0VJXiL3dyYL+tSpsiVpM55LVSVMqrROxvci9bZMFq4JtKfzrRKGRfZA92rEjtr11tpVT1wCcYOhM5ViTKXry0G7RYb/uwWXDgDw9wCuSW2WTGOsClo6gYri8uvIGhheLN1s4KGtNSG7+AHGL+Os0JdUJm1nUJxiaDvdhZQt/EvJXHTvpTbjAq+lbadgnO1hhYSaIR6FHRjainfg8oB9d66VDxD5j0WoRcjZMC3DP8yUuMN25e5B91so5VuWMa4J+P3FJW2JtLXrOK5oNLJxZTmz/blqXhNp3mO5cpe9smS8OsyWNp5ie2TQ99ezl1joqRBTXmDAajBCgxejprHKBcNK7fvBPIz3hOSRCcQctET8olRA+8JmSopIW2j8GOD6Sji8TDxepT4C9yTE1+OEo/mQ5xcTYn8ahR5PB/k0c2UyK9HC8SbX/mnLBAnqAlD8XK+onDTE+/fw+TiQF9fTin4Nl/O0xYAEs6X9LR5n5Ae6S7xv1lr/yf+4cQ/pN75Ej/pH88/UZyQkRPzR6R+0j9Bz4f0xMm/f8adD+qzZn/bPfw5bMb++LH4Gw=="),
        this.createVertexTemplateEntry("text;html=1;strokeColor=#c0c0c0;fillColor=#ffffff;overflow=fill;rounded=0;", 280, 160, '<table border="1" width="100%" height="100%" cellpadding="4" style="width:100%;height:100%;border-collapse:collapse;"><tr style="background-color:#A7C942;color:#ffffff;border:1px solid #98bf21;"><th align="left">Title 1</th><th align="left">Title 2</th><th align="left">Title 3</th></tr><tr style="border:1px solid #98bf21;"><td>Value 1</td><td>Value 2</td><td>Value 3</td></tr><tr style="background-color:#EAF2D3;border:1px solid #98bf21;"><td>Value 4</td><td>Value 5</td><td>Value 6</td></tr><tr style="border:1px solid #98bf21;"><td>Value 7</td><td>Value 8</td><td>Value 9</td></tr><tr style="background-color:#EAF2D3;border:1px solid #98bf21;"><td>Value 10</td><td>Value 11</td><td>Value 12</td></tr></table>',
            "HTML Table 1"), this.createVertexTemplateEntry("text;html=1;strokeColor=#c0c0c0;fillColor=none;overflow=fill;", 180, 140, '<table border="0" width="100%" height="100%" style="width:100%;height:100%;border-collapse:collapse;"><tr><td align="center">Value 1</td><td align="center">Value 2</td><td align="center">Value 3</td></tr><tr><td align="center">Value 4</td><td align="center">Value 5</td><td align="center">Value 6</td></tr><tr><td align="center">Value 7</td><td align="center">Value 8</td><td align="center">Value 9</td></tr></table>',
            "HTML Table 2"), this.createVertexTemplateEntry("text;html=1;strokeColor=none;fillColor=none;overflow=fill;", 180, 140, '<table border="1" width="100%" height="100%" style="width:100%;height:100%;border-collapse:collapse;"><tr><td align="center">Value 1</td><td align="center">Value 2</td><td align="center">Value 3</td></tr><tr><td align="center">Value 4</td><td align="center">Value 5</td><td align="center">Value 6</td></tr><tr><td align="center">Value 7</td><td align="center">Value 8</td><td align="center">Value 9</td></tr></table>',
            "HTML Table 3"), this.createVertexTemplateEntry("text;html=1;strokeColor=none;fillColor=none;overflow=fill;", 160, 140, '<table border="1" width="100%" height="100%" cellpadding="4" style="width:100%;height:100%;border-collapse:collapse;"><tr><th align="center"><b>Title</b></th></tr><tr><td align="center">Section 1.1\nSection 1.2\nSection 1.3</td></tr><tr><td align="center">Section 2.1\nSection 2.2\nSection 2.3</td></tr></table>', "HTML Table 4"), this.addEntry("link hyperlink", mxUtils.bind(this, function() {
            var a =
                new mxCell("Link", new mxGeometry(0, 0, 60, 40), "text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0000EE;fontStyle=4;");
            a.vertex = !0;
            this.graph.setLinkForCell(a, "https://www.draw.io");
            return this.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Link")
        })), this.addEntry("timestamp date time text label", mxUtils.bind(this, function() {
            var a = new mxCell("%date{ddd mmm dd yyyy HH:MM:ss}%", new mxGeometry(0, 0, 160, 20), "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;");
            a.vertex = !0;
            this.graph.setAttributeForCell(a, "placeholders", "1");
            return this.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Timestamp")
        })), this.addEntry("variable placeholder metadata hello world text label", mxUtils.bind(this, function() {
            var a = new mxCell("%name% Text", new mxGeometry(0, 0, 80, 20), "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;");
            a.vertex = !0;
            this.graph.setAttributeForCell(a, "placeholders", "1");
            this.graph.setAttributeForCell(a,
                "name", "Variable");
            return this.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Variable")
        })), this.createVertexTemplateEntry("shape=ext;double=1;rounded=0;whiteSpace=wrap;html=1;", 120, 80, "", "Double Rectangle", null, null, "rect rectangle box double"), this.createVertexTemplateEntry("shape=ext;double=1;rounded=1;whiteSpace=wrap;html=1;", 120, 80, "", "Double Rounded Rectangle", null, null, "rounded rect rectangle box double"), this.createVertexTemplateEntry("ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;",
            100, 60, "", "Double Ellipse", null, null, "oval ellipse start end state double"), this.createVertexTemplateEntry("shape=ext;double=1;whiteSpace=wrap;html=1;aspect=fixed;", 80, 80, "", "Double Square", null, null, "double square"), this.createVertexTemplateEntry("ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;aspect=fixed;", 80, 80, "", "Double Circle", null, null, "double circle"), this.createVertexTemplateEntry("rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=4;hachureGap=8;hachureAngle=45;fillColor=#1ba1e2;sketch=1;",
            120, 60, "", "Rectangle Sketch", !0, null, "rectangle rect box text sketch comic retro"), this.createVertexTemplateEntry("ellipse;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=2;hachureGap=8;fillColor=#990000;fillStyle=dots;sketch=1;", 120, 60, "", "Ellipse Sketch", !0, null, "ellipse oval sketch comic retro"), this.createVertexTemplateEntry("rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=-1;hachureGap=8;fillStyle=cross-hatch;fillColor=#006600;sketch=1;", 120, 60, "", "Diamond Sketch", !0, null, "diamond sketch comic retro"),
        this.createVertexTemplateEntry("html=1;whiteSpace=wrap;shape=isoCube2;backgroundOutline=1;isoAngle=15;", 90, 100, "", "Isometric Cube", !0, null, "cube box iso isometric"), this.createVertexTemplateEntry("html=1;whiteSpace=wrap;aspect=fixed;shape=isoRectangle;", 150, 90, "", "Isometric Square", !0, null, "rectangle rect box iso isometric"), this.createEdgeTemplateEntry("edgeStyle=isometricEdgeStyle;endArrow=none;html=1;", 50, 100, "", "Isometric Edge 1"), this.createEdgeTemplateEntry("edgeStyle=isometricEdgeStyle;endArrow=none;html=1;elbow=vertical;",
            50, 100, "", "Isometric Edge 2"), this.createVertexTemplateEntry("shape=curlyBracket;whiteSpace=wrap;html=1;rounded=1;", 20, 120, "", "Left Curly Bracket"), this.createVertexTemplateEntry("shape=curlyBracket;whiteSpace=wrap;html=1;rounded=1;flipH=1;", 20, 120, "", "Right Curly Bracket"), this.createVertexTemplateEntry("line;strokeWidth=2;html=1;", 160, 10, "", "Horizontal Line"), this.createVertexTemplateEntry("line;strokeWidth=2;direction=south;html=1;", 10, 160, "", "Vertical Line"), this.createVertexTemplateEntry("line;strokeWidth=4;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;",
            160, 10, "", "Horizontal Backbone", !1, null, "backbone bus network"), this.createVertexTemplateEntry("line;strokeWidth=4;direction=south;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;", 10, 160, "", "Vertical Backbone", !1, null, "backbone bus network"), this.createVertexTemplateEntry("shape=crossbar;whiteSpace=wrap;html=1;rounded=1;", 120, 20, "", "Horizontal Crossbar", !1, null, "crossbar distance measure dimension unit"), this.createVertexTemplateEntry("shape=crossbar;whiteSpace=wrap;html=1;rounded=1;direction=south;",
            20, 120, "", "Vertical Crossbar", !1, null, "crossbar distance measure dimension unit"), this.createVertexTemplateEntry("shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=1;aspect=fixed;image=" + this.gearImage, 52, 61, "", "Image (Fixed Aspect)", !1, null, "fixed image icon symbol"), this.createVertexTemplateEntry("shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=" + this.gearImage, 50, 60, "", "Image (Variable Aspect)", !1, null, "strechted image icon symbol"),
        this.createVertexTemplateEntry("icon;html=1;image=" + this.gearImage, 60, 60, "Icon", "Icon", !1, null, "icon image symbol"), this.createVertexTemplateEntry("label;whiteSpace=wrap;html=1;image=" + this.gearImage, 140, 60, "Label", "Label 1", null, null, "label image icon symbol"), this.createVertexTemplateEntry("label;whiteSpace=wrap;html=1;align=center;verticalAlign=bottom;spacingLeft=0;spacingBottom=4;imageAlign=center;imageVerticalAlign=top;image=" + this.gearImage, 120, 80, "Label", "Label 2", null, null, "label image icon symbol"),
        this.addEntry("shape group container", function() {
            var a = new mxCell("Label", new mxGeometry(0, 0, 160, 70), "html=1;whiteSpace=wrap;container=1;recursiveResize=0;collapsible=0;");
            a.vertex = !0;
            var d = new mxCell("", new mxGeometry(20, 20, 20, 30), "triangle;html=1;whiteSpace=wrap;");
            d.vertex = !0;
            a.insert(d);
            return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Shape Group")
        }), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=none;", 120,
            60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;top=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;bottom=1;right=1;left=1;top=0;fillColor=none;routingCenterX=-0.5;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=waypoint;sketch=0;size=6;pointerEvents=1;points=[];fillColor=none;resizable=0;rotatable=0;perimeter=centerPerimeter;snapToPoint=1;",
            40, 40, "", "Waypoint"), this.createEdgeTemplateEntry("edgeStyle=segmentEdgeStyle;endArrow=classic;html=1;", 50, 50, "", "Manual Line", null, "line lines connector connectors connection connections arrow arrows manual"), this.createEdgeTemplateEntry("shape=filledEdge;rounded=0;fixDash=1;endArrow=none;strokeWidth=10;fillColor=#ffffff;edgeStyle=orthogonalEdgeStyle;", 60, 40, "", "Filled Edge"), this.createEdgeTemplateEntry("edgeStyle=elbowEdgeStyle;elbow=horizontal;endArrow=classic;html=1;", 50, 50, "", "Horizontal Elbow",
            null, "line lines connector connectors connection connections arrow arrows elbow horizontal"), this.createEdgeTemplateEntry("edgeStyle=elbowEdgeStyle;elbow=vertical;endArrow=classic;html=1;", 50, 50, "", "Vertical Elbow", null, "line lines connector connectors connection connections arrow arrows elbow vertical")
    ];
    this.addPaletteFunctions("misc", mxResources.get("misc"), null != a ? a : !0, d);
    this.setCurrentSearchEntryLibrary()
};
Sidebar.prototype.addAdvancedPalette = function(a) {
    this.setCurrentSearchEntryLibrary("general", "advanced");
    this.addPaletteFunctions("advanced", mxResources.get("advanced"), null != a ? a : !1, this.createAdvancedShapes());
    this.setCurrentSearchEntryLibrary()
};
Sidebar.prototype.addBasicPalette = function(a) {
    this.setCurrentSearchEntryLibrary("basic");
    this.addStencilPalette("basic", mxResources.get("basic"), a + "/basic.xml", ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2", null, null, null, null, [this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;",
        120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;", 120, 60, "", "Partial Rectangle")]);
    this.setCurrentSearchEntryLibrary()
};
Sidebar.prototype.createAdvancedShapes = function() {
    var a = this,
        c = new mxCell("List Item", new mxGeometry(0, 0, 60, 26), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;");
    c.vertex = !0;
    return [this.createVertexTemplateEntry("shape=tapeData;whiteSpace=wrap;html=1;perimeter=ellipsePerimeter;", 80, 80, "", "Tape Data"), this.createVertexTemplateEntry("shape=manualInput;whiteSpace=wrap;html=1;",
        80, 80, "", "Manual Input"), this.createVertexTemplateEntry("shape=loopLimit;whiteSpace=wrap;html=1;", 100, 80, "", "Loop Limit"), this.createVertexTemplateEntry("shape=offPageConnector;whiteSpace=wrap;html=1;", 80, 80, "", "Off Page Connector"), this.createVertexTemplateEntry("shape=delay;whiteSpace=wrap;html=1;", 80, 40, "", "Delay"), this.createVertexTemplateEntry("shape=display;whiteSpace=wrap;html=1;", 80, 40, "", "Display"), this.createVertexTemplateEntry("shape=singleArrow;direction=west;whiteSpace=wrap;html=1;",
        100, 60, "", "Arrow Left"), this.createVertexTemplateEntry("shape=singleArrow;whiteSpace=wrap;html=1;", 100, 60, "", "Arrow Right"), this.createVertexTemplateEntry("shape=singleArrow;direction=north;whiteSpace=wrap;html=1;", 60, 100, "", "Arrow Up"), this.createVertexTemplateEntry("shape=singleArrow;direction=south;whiteSpace=wrap;html=1;", 60, 100, "", "Arrow Down"), this.createVertexTemplateEntry("shape=doubleArrow;whiteSpace=wrap;html=1;", 100, 60, "", "Double Arrow"), this.createVertexTemplateEntry("shape=doubleArrow;direction=south;whiteSpace=wrap;html=1;",
        60, 100, "", "Double Arrow Vertical", null, null, "double arrow"), this.createVertexTemplateEntry("shape=actor;whiteSpace=wrap;html=1;", 40, 60, "", "User", null, null, "user person human"), this.createVertexTemplateEntry("shape=cross;whiteSpace=wrap;html=1;", 80, 80, "", "Cross"), this.createVertexTemplateEntry("shape=corner;whiteSpace=wrap;html=1;", 80, 80, "", "Corner"), this.createVertexTemplateEntry("shape=tee;whiteSpace=wrap;html=1;", 80, 80, "", "Tee"), this.createVertexTemplateEntry("shape=datastore;whiteSpace=wrap;html=1;",
        60, 60, "", "Data Store", null, null, "data store cylinder database"), this.createVertexTemplateEntry("shape=orEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Or", null, null, "or circle oval ellipse"), this.createVertexTemplateEntry("shape=sumEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Sum", null, null, "sum circle oval ellipse"), this.createVertexTemplateEntry("shape=lineEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;",
        80, 80, "", "Ellipse with horizontal divider", null, null, "circle oval ellipse"), this.createVertexTemplateEntry("shape=lineEllipse;line=vertical;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Ellipse with vertical divider", null, null, "circle oval ellipse"), this.createVertexTemplateEntry("shape=sortShape;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;", 80, 80, "", "Sort", null, null, "sort"), this.createVertexTemplateEntry("shape=collate;whiteSpace=wrap;html=1;", 80, 80, "", "Collate",
        null, null, "collate"), this.createVertexTemplateEntry("shape=switch;whiteSpace=wrap;html=1;", 60, 60, "", "Switch", null, null, "switch router"), this.addEntry("process bar", function() {
        return a.createVertexTemplateFromData("zZXRaoMwFIafJpcDjbNrb2233rRQ8AkyPdPQaCRJV+3T7yTG2rUVBoOtgpDzn/xJzncCIdGyateKNeVW5iBI9EqipZLS9KOqXYIQhAY8J9GKUBrgT+jbRDZ02aBhCmrzEwPtDZ9MHKBXdkpmoDWKCVN9VptO+Kw+8kqwGqMkK7nIN6yTB7uTNizbD1FSSsVPsjYMC1qFKHxwIZZSSIVxLZ1/nJNar5+oQPMT7IYCrqUta1ENzuqGaeOFTArBGs3f3Vmtoo2Se7ja1h00kSoHK4bBIKUNy3hdoPYU0mF91i9mT8EEL2ocZ3gKa00ayWujLZY4IfHKFonVDLsRGgXuQ90zBmWgneyTk3yT1iArMKrDKUeem9L3ajHrbSXwohxsQd/ggOleKM7ese048J2/fwuim1uQGmhQCW8vQMkacP3GCQgBFMftHEsr7cYYe95CnmKTPMFbYD8CQ++DGQy+/M5X4ku5wHYmdIktfvk9tecpavThqS3m/0YtnqIWPTy1cD77K2wYjo+Ay317I74A",
            296, 100, "Process Bar")
    }), this.createVertexTemplateEntry("swimlane;", 200, 200, "Container", "Container", null, null, "container swimlane lane pool group"), this.addEntry("list group erd table", function() {
        var d = new mxCell("List", new mxGeometry(0, 0, 140, 110), "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;");
        d.vertex = !0;
        d.insert(a.cloneCell(c, "Item 1"));
        d.insert(a.cloneCell(c, "Item 2"));
        d.insert(a.cloneCell(c, "Item 3"));
        return a.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, "List")
    }), this.addEntry("list item entry value group erd table", function() {
        return a.createVertexTemplateFromCells([a.cloneCell(c, "List Item")], c.geometry.width, c.geometry.height, "List Item")
    })]
};
Sidebar.prototype.createAdvancedShapes = function() {
    var a = this,
        c = new mxCell("List Item", new mxGeometry(0, 0, 60, 26), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;");
    c.vertex = !0;
    return [this.createVertexTemplateEntry("shape=tapeData;whiteSpace=wrap;html=1;perimeter=ellipsePerimeter;", 80, 80, "", "Tape Data"), this.createVertexTemplateEntry("shape=manualInput;whiteSpace=wrap;html=1;",
        80, 80, "", "Manual Input"), this.createVertexTemplateEntry("shape=loopLimit;whiteSpace=wrap;html=1;", 100, 80, "", "Loop Limit"), this.createVertexTemplateEntry("shape=offPageConnector;whiteSpace=wrap;html=1;", 80, 80, "", "Off Page Connector"), this.createVertexTemplateEntry("shape=delay;whiteSpace=wrap;html=1;", 80, 40, "", "Delay"), this.createVertexTemplateEntry("shape=display;whiteSpace=wrap;html=1;", 80, 40, "", "Display"), this.createVertexTemplateEntry("shape=singleArrow;direction=west;whiteSpace=wrap;html=1;",
        100, 60, "", "Arrow Left"), this.createVertexTemplateEntry("shape=singleArrow;whiteSpace=wrap;html=1;", 100, 60, "", "Arrow Right"), this.createVertexTemplateEntry("shape=singleArrow;direction=north;whiteSpace=wrap;html=1;", 60, 100, "", "Arrow Up"), this.createVertexTemplateEntry("shape=singleArrow;direction=south;whiteSpace=wrap;html=1;", 60, 100, "", "Arrow Down"), this.createVertexTemplateEntry("shape=doubleArrow;whiteSpace=wrap;html=1;", 100, 60, "", "Double Arrow"), this.createVertexTemplateEntry("shape=doubleArrow;direction=south;whiteSpace=wrap;html=1;",
        60, 100, "", "Double Arrow Vertical", null, null, "double arrow"), this.createVertexTemplateEntry("shape=actor;whiteSpace=wrap;html=1;", 40, 60, "", "User", null, null, "user person human"), this.createVertexTemplateEntry("shape=cross;whiteSpace=wrap;html=1;", 80, 80, "", "Cross"), this.createVertexTemplateEntry("shape=corner;whiteSpace=wrap;html=1;", 80, 80, "", "Corner"), this.createVertexTemplateEntry("shape=tee;whiteSpace=wrap;html=1;", 80, 80, "", "Tee"), this.createVertexTemplateEntry("shape=datastore;whiteSpace=wrap;html=1;",
        60, 60, "", "Data Store", null, null, "data store cylinder database"), this.createVertexTemplateEntry("shape=orEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Or", null, null, "or circle oval ellipse"), this.createVertexTemplateEntry("shape=sumEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Sum", null, null, "sum circle oval ellipse"), this.createVertexTemplateEntry("shape=lineEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;",
        80, 80, "", "Ellipse with horizontal divider", null, null, "circle oval ellipse"), this.createVertexTemplateEntry("shape=lineEllipse;line=vertical;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;", 80, 80, "", "Ellipse with vertical divider", null, null, "circle oval ellipse"), this.createVertexTemplateEntry("shape=sortShape;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;", 80, 80, "", "Sort", null, null, "sort"), this.createVertexTemplateEntry("shape=collate;whiteSpace=wrap;html=1;", 80, 80, "", "Collate",
        null, null, "collate"), this.createVertexTemplateEntry("shape=switch;whiteSpace=wrap;html=1;", 60, 60, "", "Switch", null, null, "switch router"), this.addEntry("process bar", function() {
        return a.createVertexTemplateFromData("zZXRaoMwFIafJpcDjbNrb2233rRQ8AkyPdPQaCRJV+3T7yTG2rUVBoOtgpDzn/xJzncCIdGyateKNeVW5iBI9EqipZLS9KOqXYIQhAY8J9GKUBrgT+jbRDZ02aBhCmrzEwPtDZ9MHKBXdkpmoDWKCVN9VptO+Kw+8kqwGqMkK7nIN6yTB7uTNizbD1FSSsVPsjYMC1qFKHxwIZZSSIVxLZ1/nJNar5+oQPMT7IYCrqUta1ENzuqGaeOFTArBGs3f3Vmtoo2Se7ja1h00kSoHK4bBIKUNy3hdoPYU0mF91i9mT8EEL2ocZ3gKa00ayWujLZY4IfHKFonVDLsRGgXuQ90zBmWgneyTk3yT1iArMKrDKUeem9L3ajHrbSXwohxsQd/ggOleKM7ese048J2/fwuim1uQGmhQCW8vQMkacP3GCQgBFMftHEsr7cYYe95CnmKTPMFbYD8CQ++DGQy+/M5X4ku5wHYmdIktfvk9tecpavThqS3m/0YtnqIWPTy1cD77K2wYjo+Ay317I74A",
            296, 100, "Process Bar")
    }), this.createVertexTemplateEntry("swimlane;", 200, 200, "Container", "Container", null, null, "container swimlane lane pool group"), this.addEntry("list group erd table", function() {
        var d = new mxCell("List", new mxGeometry(0, 0, 140, 110), "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;");
        d.vertex = !0;
        d.insert(a.cloneCell(c, "Item 1"));
        d.insert(a.cloneCell(c, "Item 2"));
        d.insert(a.cloneCell(c, "Item 3"));
        return a.createVertexTemplateFromCells([d], d.geometry.width, d.geometry.height, "List")
    }), this.addEntry("list item entry value group erd table", function() {
        return a.createVertexTemplateFromCells([a.cloneCell(c, "List Item")], c.geometry.width, c.geometry.height, "List Item")
    })]
};
Sidebar.prototype.addBasicPalette = function(a) {
    this.setCurrentSearchEntryLibrary("basic");
    this.addStencilPalette("basic", mxResources.get("basic"), a + "/basic.xml", ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2", null, null, null, null, [this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;",
        120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;", 120, 60, "", "Partial Rectangle"), this.createVertexTemplateEntry("shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;", 120, 60, "", "Partial Rectangle")]);
    this.setCurrentSearchEntryLibrary()
};
Sidebar.prototype.addUmlPalette = function(a) {
    var c = this,
        d = new mxCell("+ field: type", new mxGeometry(0, 0, 100, 26), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;");
    d.vertex = !0;
    var b = new mxCell("", new mxGeometry(0, 0, 40, 8), "line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;");
    b.vertex = !0;
    this.setCurrentSearchEntryLibrary("uml");
    var g = [this.createVertexTemplateEntry("html=1;", 110, 50, "Object", "Object", null, null, "uml static class object instance"), this.createVertexTemplateEntry("html=1;", 110, 50, "&laquo;interface&raquo;<br><b>Name</b>", "Interface", null, null, "uml static class interface object instance annotated annotation"), this.addEntry("uml static class object instance", function() {
            var a = new mxCell("Classname", new mxGeometry(0, 0, 160, 90), "swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;");
            a.vertex = !0;
            a.insert(d.clone());
            a.insert(b.clone());
            a.insert(c.cloneCell(d, "+ method(type): type"));
            return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Class")
        }), this.addEntry("uml static class section subsection", function() {
            var a = new mxCell("Classname", new mxGeometry(0, 0, 140, 110), "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;");
            a.vertex = !0;
            a.insert(d.clone());
            a.insert(d.clone());
            a.insert(d.clone());
            return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Class 2")
        }), this.addEntry("uml static class item member method function variable field attribute label", function() {
            return c.createVertexTemplateFromCells([c.cloneCell(d, "+ item: attribute")], d.geometry.width, d.geometry.height, "Item 1")
        }), this.addEntry("uml static class item member method function variable field attribute label", function() {
            var a = new mxCell("item: attribute",
                new mxGeometry(0, 0, 120, d.geometry.height), "label;fontStyle=0;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=hidden;spacingLeft=28;spacingRight=4;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;imageWidth=16;imageHeight=16;image=" + c.gearImage);
            a.vertex = !0;
            return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Item 2")
        }), this.addEntry("uml static class divider hline line separator", function() {
            return c.createVertexTemplateFromCells([b.clone()],
                b.geometry.width, b.geometry.height, "Divider")
        }), this.addEntry("uml static class spacer space gap separator", function() {
            var a = new mxCell("", new mxGeometry(0, 0, 20, 14), "text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=4;spacingRight=4;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;");
            a.vertex = !0;
            return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Spacer")
        }), this.createVertexTemplateEntry("text;align=center;fontStyle=1;verticalAlign=middle;spacingLeft=3;spacingRight=3;strokeColor=none;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;",
            80, 26, "Title", "Title", null, null, "uml static class title label"), this.addEntry("uml static class component", function() {
            var a = new mxCell("&laquo;Annotation&raquo;<br/><b>Component</b>", new mxGeometry(0, 0, 180, 90), "html=1;dropTarget=0;");
            a.vertex = !0;
            var b = new mxCell("", new mxGeometry(1, 0, 20, 20), "shape=module;jettyWidth=8;jettyHeight=4;");
            b.vertex = !0;
            b.geometry.relative = !0;
            b.geometry.offset = new mxPoint(-27, 7);
            a.insert(b);
            return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Component")
        }),
        this.addEntry("uml static class component", function() {
            var a = new mxCell('<p style="margin:0px;margin-top:6px;text-align:center;"><b>Component</b></p><hr/><p style="margin:0px;margin-left:8px;">+ Attribute1: Type<br/>+ Attribute2: Type</p>', new mxGeometry(0, 0, 180, 90), "align=left;overflow=fill;html=1;dropTarget=0;");
            a.vertex = !0;
            var b = new mxCell("", new mxGeometry(1, 0, 20, 20), "shape=component;jettyWidth=8;jettyHeight=4;");
            b.vertex = !0;
            b.geometry.relative = !0;
            b.geometry.offset = new mxPoint(-24, 4);
            a.insert(b);
            return c.createVertexTemplateFromCells([a], a.geometry.width, a.geometry.height, "Component with Attributes")
        }), this.createVertexTemplateEntry("verticalAlign=top;align=left;spacingTop=8;spacingLeft=2;spacingRight=12;shape=cube;size=10;direction=south;fontStyle=4;html=1;", 180, 120, "Block", "Block", null, null, "uml static class block"), this.createVertexTemplateEntry("shape=module;align=left;spacingLeft=20;align=center;verticalAlign=top;", 100, 50, "Module", "Module", null, null, "uml static class module component"),
        this.createVertexTemplateEntry("shape=folder;fontStyle=1;spacingTop=10;tabWidth=40;tabHeight=14;tabPosition=left;html=1;", 70, 50, "package", "Package", null, null, "uml static class package"), this.createVertexTemplateEntry("verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;", 160, 90, '<p style="margin:0px;margin-top:4px;text-align:center;text-decoration:underline;"><b>Object:Type</b></p><hr/><p style="margin:0px;margin-left:8px;">field1 = value1<br/>field2 = value2<br>field3 = value3</p>',
            "Object", null, null, "uml static class object instance"), this.createVertexTemplateEntry("verticalAlign=top;align=left;overflow=fill;html=1;", 180, 90, '<div style="box-sizing:border-box;width:100%;background:#e4e4e4;padding:2px;">Tablename</div><table style="width:100%;font-size:1em;" cellpadding="2" cellspacing="0"><tr><td>PK</td><td>uniqueId</td></tr><tr><td>FK1</td><td>foreignKey</td></tr><tr><td></td><td>fieldname</td></tr></table>', "Entity", null, null, "er entity table"), this.addEntry("uml static class object instance",
            function() {
                var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><div style="height:2px;"></div>', new mxGeometry(0, 0, 140, 60), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
                a.vertex = !0;
                return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Class 3")
            }), this.addEntry("uml static class object instance", function() {
            var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><div style="height:2px;"></div><hr size="1"/><div style="height:2px;"></div>',
                new mxGeometry(0, 0, 140, 60), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
            a.vertex = !0;
            return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Class 4")
        }), this.addEntry("uml static class object instance", function() {
            var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><b>Class</b></p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ field: Type</p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ method(): Type</p>',
                new mxGeometry(0, 0, 160, 90), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
            a.vertex = !0;
            return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Class 5")
        }), this.addEntry("uml static class object instance", function() {
            var a = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;"><i>&lt;&lt;Interface&gt;&gt;</i><br/><b>Interface</b></p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ field1: Type<br/>+ field2: Type</p><hr size="1"/><p style="margin:0px;margin-left:4px;">+ method1(Type): Type<br/>+ method2(Type, Type): Type</p>',
                new mxGeometry(0, 0, 190, 140), "verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;");
            a.vertex = !0;
            return c.createVertexTemplateFromCells([a.clone()], a.geometry.width, a.geometry.height, "Interface 2")
        }), this.createVertexTemplateEntry("shape=providedRequiredInterface;html=1;verticalLabelPosition=bottom;", 20, 20, "", "Provided/Required Interface", null, null, "uml provided required interface lollipop notation"), this.createVertexTemplateEntry("shape=requiredInterface;html=1;verticalLabelPosition=bottom;",
            10, 20, "", "Required Interface", null, null, "uml required interface lollipop notation"), this.addEntry("uml lollipop notation provided required interface", function() {
            return c.createVertexTemplateFromData("zVTBrptADPyavVYEkt4b0uQd3pMq5dD2uAUD27dgZJwE8vX1spsQlETtpVWRIjFjex3PmFVJWvc70m31hjlYlXxWSUqI7N/qPgVrVRyZXCUbFceR/FS8fRJdjNGo1QQN/0lB7AuO2h7AM57oeLCBIDw0Obj8SCVrJK6wxEbbV8RWyIWQP4F52Juzq9AHRqEqrm2IQpN/IsKTwAYb8MzWWBuO9B0hL2E2BGsqIQyxvJ9rzApD7QBrYBokhcBqNsf5UbrzsLzmXUu/oJET42jwGat5QYcHyiDkTDLKy03TiRrFfSx08m+FrrQtUkOZvZdbFKThmwMfVhf4fQ43/W3uZriiPPT+KKhjwnf4anKuQv//wsg+NPJ7/9d9Xf7eVykwbeeMOFWGYd/qzEVO8tHP/Suw4a2ujXV/+gXsEdhkOgSC8os44BQt0tggicZHeG1N2QiXibhAV48epRayEDd8MT7Ct06TUaXVWq027tCuhcx5VZjebeeaoDNn/WMcb/p+j0AM/dNr6InLl4Lgzylsk6OCgRWYsuI592gNZh5OhgmcblPv7+1l+ws=",
                40, 10, "Lollipop Notation")
        }), this.createVertexTemplateEntry("shape=umlBoundary;whiteSpace=wrap;html=1;", 100, 80, "Boundary Object", "Boundary Object", null, null, "uml boundary object"), this.createVertexTemplateEntry("ellipse;shape=umlEntity;whiteSpace=wrap;html=1;", 80, 80, "Entity Object", "Entity Object", null, null, "uml entity object"), this.createVertexTemplateEntry("ellipse;shape=umlControl;whiteSpace=wrap;html=1;", 70, 80, "Control Object", "Control Object", null, null, "uml control object"), this.createVertexTemplateEntry("shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;",
            30, 60, "Actor", "Actor", !1, null, "uml actor"), this.createVertexTemplateEntry("ellipse;whiteSpace=wrap;html=1;", 140, 70, "Use Case", "Use Case", null, null, "uml use case usecase"), this.addEntry("uml activity state start", function() {
            var a = new mxCell("", new mxGeometry(0, 0, 30, 30), "ellipse;html=1;shape=startState;fillColor=#000000;strokeColor=#ff0000;");
            a.vertex = !0;
            var b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
            b.geometry.setTerminalPoint(new mxPoint(15, 90), !1);
            b.geometry.relative = !0;
            b.edge = !0;
            a.insertEdge(b, !0);
            return c.createVertexTemplateFromCells([a, b], 30, 90, "Start")
        }), this.addEntry("uml activity state", function() {
            var a = new mxCell("Activity", new mxGeometry(0, 0, 120, 40), "rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;");
            a.vertex = !0;
            var b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
            b.geometry.setTerminalPoint(new mxPoint(60, 100), !1);
            b.geometry.relative = !0;
            b.edge = !0;
            a.insertEdge(b, !0);
            return c.createVertexTemplateFromCells([a, b], 120, 100, "Activity")
        }), this.addEntry("uml activity composite state", function() {
            var a = new mxCell("Composite State", new mxGeometry(0, 0, 160, 60), "swimlane;html=1;fontStyle=1;align=center;verticalAlign=middle;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=0;resizeLast=1;container=0;fontColor=#000000;collapsible=0;rounded=1;arcSize=30;strokeColor=#ff0000;fillColor=#ffffc0;swimlaneFillColor=#ffffc0;dropTarget=0;");
            a.vertex = !0;
            var b = new mxCell("Subtitle", new mxGeometry(0, 0, 200, 26), "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;fontColor=#000000;");
            b.vertex = !0;
            a.insert(b);
            b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
            b.geometry.setTerminalPoint(new mxPoint(80, 120), !1);
            b.geometry.relative = !0;
            b.edge = !0;
            a.insertEdge(b,
                !0);
            return c.createVertexTemplateFromCells([a, b], 160, 120, "Composite State")
        }), this.addEntry("uml activity condition", function() {
            var a = new mxCell("Condition", new mxGeometry(0, 0, 80, 40), "rhombus;whiteSpace=wrap;html=1;fillColor=#ffffc0;strokeColor=#ff0000;");
            a.vertex = !0;
            var b = new mxCell("no", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
            b.geometry.setTerminalPoint(new mxPoint(180, 20), !1);
            b.geometry.relative = !0;
            b.geometry.x = -1;
            b.edge = !0;
            a.insertEdge(b, !0);
            var d = new mxCell("yes", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=top;endArrow=open;endSize=8;strokeColor=#ff0000;");
            d.geometry.setTerminalPoint(new mxPoint(40, 100), !1);
            d.geometry.relative = !0;
            d.geometry.x = -1;
            d.edge = !0;
            a.insertEdge(d, !0);
            return c.createVertexTemplateFromCells([a, b, d], 180, 100, "Condition")
        }), this.addEntry("uml activity fork join", function() {
            var a = new mxCell("", new mxGeometry(0, 0, 200, 10), "shape=line;html=1;strokeWidth=6;strokeColor=#ff0000;");
            a.vertex = !0;
            var b = new mxCell("", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;");
            b.geometry.setTerminalPoint(new mxPoint(100, 80), !1);
            b.geometry.relative = !0;
            b.edge = !0;
            a.insertEdge(b, !0);
            return c.createVertexTemplateFromCells([a, b], 200, 80, "Fork/Join")
        }), this.createVertexTemplateEntry("ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#ff0000;", 30, 30, "", "End", null, null, "uml activity state end"), this.createVertexTemplateEntry("shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;",
            100, 300, ":Object", "Lifeline", null, null, "uml sequence participant lifeline"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlActor;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;", 20, 300, "", "Actor Lifeline", null, null, "uml sequence participant lifeline actor"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlBoundary;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;",
            50, 300, "", "Boundary Lifeline", null, null, "uml sequence participant lifeline boundary"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlEntity;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;", 40, 300, "", "Entity Lifeline", null, null, "uml sequence participant lifeline entity"), this.createVertexTemplateEntry("shape=umlLifeline;participant=umlControl;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;",
            40, 300, "", "Control Lifeline", null, null, "uml sequence participant lifeline control"), this.createVertexTemplateEntry("shape=umlFrame;whiteSpace=wrap;html=1;", 300, 200, "frame", "Frame", null, null, "uml sequence frame"), this.createVertexTemplateEntry("shape=umlDestroy;whiteSpace=wrap;html=1;strokeWidth=3;", 30, 30, "", "Destruction", null, null, "uml sequence destruction destroy"), this.addEntry("uml sequence invoke invocation call activation", function() {
            var a = new mxCell("", new mxGeometry(0, 0, 10, 80), "html=1;points=[];perimeter=orthogonalPerimeter;");
            a.vertex = !0;
            var b = new mxCell("dispatch", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;");
            b.geometry.setTerminalPoint(new mxPoint(-60, 0), !0);
            b.geometry.relative = !0;
            b.edge = !0;
            a.insertEdge(b, !1);
            return c.createVertexTemplateFromCells([a, b], 10, 80, "Found Message")
        }), this.addEntry("uml sequence invoke call delegation synchronous invocation activation", function() {
            var a = new mxCell("", new mxGeometry(0, 0, 10, 80), "html=1;points=[];perimeter=orthogonalPerimeter;");
            a.vertex = !0;
            var b = new mxCell("dispatch", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;endArrow=block;entryX=0;entryY=0;");
            b.geometry.setTerminalPoint(new mxPoint(-70, 0), !0);
            b.geometry.relative = !0;
            b.edge = !0;
            a.insertEdge(b, !1);
            var d = new mxCell("return", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;exitX=0;exitY=0.95;");
            d.geometry.setTerminalPoint(new mxPoint(-70, 76), !1);
            d.geometry.relative = !0;
            d.edge = !0;
            a.insertEdge(d, !0);
            return c.createVertexTemplateFromCells([a,
                b, d
            ], 10, 80, "Synchronous Invocation")
        }), this.addEntry("uml sequence self call recursion delegation activation", function() {
            var a = new mxCell("", new mxGeometry(-5, 20, 10, 40), "html=1;points=[];perimeter=orthogonalPerimeter;");
            a.vertex = !0;
            var b = new mxCell("self call", new mxGeometry(0, 0, 0, 0), "edgeStyle=orthogonalEdgeStyle;html=1;align=left;spacingLeft=2;endArrow=block;rounded=0;entryX=1;entryY=0;");
            b.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            b.geometry.points = [new mxPoint(30, 0)];
            b.geometry.relative = !0;
            b.edge = !0;
            a.insertEdge(b, !1);
            return c.createVertexTemplateFromCells([a, b], 10, 60, "Self Call")
        }), this.addEntry("uml sequence invoke call delegation callback activation", function() {
            return c.createVertexTemplateFromData("xZRNT8MwDIZ/Ta6oaymD47rBTkiTuMAxW6wmIm0q19s6fj1OE3V0Y2iCA4dK8euP2I+riGxedUuUjX52CqzIHkU2R+conKpuDtaKNDFKZAuRpgl/In264J303qSRCDVdk5CGhJ20WwhKEFo62ChoqritxURkReNMTa2X80LkC68AmgoIkEWHpF3pamlXR7WIFwASdBeb7KXY4RIc5+KBQ/ZGkY4RYY5Egyl1zLqLmmyDXQ6Zx4n5EIf+HkB2BmAjrV3LzftPIPw4hgNn1pQ1a2tH5Cp2QK1miG7vNeu4iJe4pdeY2BtvbCQDGlAljMCQxBJotJ8rWCFYSWY3LvUdmZi68rvkkLiU6QnL1m1xAzHoBOdw61WEb88II9AW67/ydQ2wq1Cy1aAGvOrFfPh6997qDA3g+dxzv3nIL6MPU/8T+kMw8+m4QPgdfrEJNo8PSQj/+s58Ag==",
                10, 60, "Callback")
        }), this.createVertexTemplateEntry("html=1;points=[];perimeter=orthogonalPerimeter;", 10, 80, "", "Activation", null, null, "uml sequence activation"), this.createEdgeTemplateEntry("html=1;verticalAlign=bottom;startArrow=oval;startFill=1;endArrow=block;startSize=8;", 60, 0, "dispatch", "Found Message 1", null, "uml sequence message call invoke dispatch"), this.createEdgeTemplateEntry("html=1;verticalAlign=bottom;startArrow=circle;startFill=1;endArrow=open;startSize=6;endSize=8;", 80, 0, "dispatch",
            "Found Message 2", null, "uml sequence message call invoke dispatch"), this.createEdgeTemplateEntry("html=1;verticalAlign=bottom;endArrow=block;", 80, 0, "dispatch", "Message", null, "uml sequence message call invoke dispatch"), this.addEntry("uml sequence return message", function() {
            var a = new mxCell("return", new mxGeometry(0, 0, 0, 0), "html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;");
            a.geometry.setTerminalPoint(new mxPoint(80, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !1);
            a.geometry.relative = !0;
            a.edge = !0;
            return c.createEdgeTemplateFromCells([a], 80, 0, "Return")
        }), this.addEntry("uml relation", function() {
            var a = new mxCell("name", new mxGeometry(0, 0, 0, 0), "endArrow=block;endFill=1;html=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=top;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
            a.geometry.relative = !0;
            a.geometry.x = -1;
            a.edge = !0;
            var b = new mxCell("1", new mxGeometry(-1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            return c.createEdgeTemplateFromCells([a], 160, 0, "Relation 1")
        }), this.addEntry("uml association", function() {
            var a = new mxCell("", new mxGeometry(0, 0, 0, 0), "endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
            a.geometry.relative = !0;
            a.edge = !0;
            var b = new mxCell("parent", new mxGeometry(-1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            b = new mxCell("child", new mxGeometry(1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=right;verticalAlign=bottom;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            return c.createEdgeTemplateFromCells([a], 160, 0, "Association 1")
        }), this.addEntry("uml aggregation", function() {
            var a = new mxCell("1", new mxGeometry(0, 0, 0, 0), "endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
            a.geometry.relative = !0;
            a.geometry.x = -1;
            a.geometry.y = 3;
            a.edge = !0;
            return c.createEdgeTemplateFromCells([a], 160, 0, "Aggregation 1")
        }), this.addEntry("uml composition", function() {
            var a = new mxCell("1", new mxGeometry(0, 0, 0, 0), "endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;");
            a.geometry.setTerminalPoint(new mxPoint(0,
                0), !0);
            a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
            a.geometry.relative = !0;
            a.geometry.x = -1;
            a.geometry.y = 3;
            a.edge = !0;
            return c.createEdgeTemplateFromCells([a], 160, 0, "Composition 1")
        }), this.addEntry("uml relation", function() {
            var a = new mxCell("Relation", new mxGeometry(0, 0, 0, 0), "endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;");
            a.geometry.setTerminalPoint(new mxPoint(0, 0), !0);
            a.geometry.setTerminalPoint(new mxPoint(160, 0), !1);
            a.geometry.relative = !0;
            a.edge = !0;
            var b = new mxCell("0..n", new mxGeometry(-1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=left;verticalAlign=top;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            b = new mxCell("1", new mxGeometry(1, 0, 0, 0), "edgeLabel;resizable=0;html=1;align=right;verticalAlign=top;");
            b.geometry.relative = !0;
            b.setConnectable(!1);
            b.vertex = !0;
            a.insert(b);
            return c.createEdgeTemplateFromCells([a], 160, 0, "Relation 2")
        }), this.createEdgeTemplateEntry("endArrow=open;endSize=12;dashed=1;html=1;", 160,
            0, "Use", "Dependency", null, "uml dependency use"), this.createEdgeTemplateEntry("endArrow=block;endSize=16;endFill=0;html=1;", 160, 0, "Extends", "Generalization", null, "uml generalization extend"), this.createEdgeTemplateEntry("endArrow=block;startArrow=block;endFill=1;startFill=1;html=1;", 160, 0, "", "Association 2", null, "uml association"), this.createEdgeTemplateEntry("endArrow=open;startArrow=circlePlus;endFill=0;startFill=0;endSize=8;html=1;", 160, 0, "", "Inner Class", null, "uml inner class"), this.createEdgeTemplateEntry("endArrow=open;startArrow=cross;endFill=0;startFill=0;endSize=8;startSize=10;html=1;",
            160, 0, "", "Terminate", null, "uml terminate"), this.createEdgeTemplateEntry("endArrow=block;dashed=1;endFill=0;endSize=12;html=1;", 160, 0, "", "Implementation", null, "uml realization implementation"), this.createEdgeTemplateEntry("endArrow=diamondThin;endFill=0;endSize=24;html=1;", 160, 0, "", "Aggregation 2", null, "uml aggregation"), this.createEdgeTemplateEntry("endArrow=diamondThin;endFill=1;endSize=24;html=1;", 160, 0, "", "Composition 2", null, "uml composition"), this.createEdgeTemplateEntry("endArrow=open;endFill=1;endSize=12;html=1;",
            160, 0, "", "Association 3", null, "uml association")
    ];
    this.addPaletteFunctions("uml", mxResources.get("uml"), a || !1, g);
    this.setCurrentSearchEntryLibrary()
};
Sidebar.prototype.createTitle = function(a) {
    var c = document.createElement("a");
    c.setAttribute("title", mxResources.get("sidebarTooltip"));
    c.className = "geTitle";
    mxUtils.write(c, a);
    return c
};
Sidebar.prototype.createThumb = function(a, c, d, b, g, f, h, e, k) {
    this.graph.labelsVisible = null == f || f;
    f = mxClient.NO_FO;
    mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
    this.graph.view.scaleAndTranslate(1, 0, 0);
    a = this.graph.cloneCells(a);
    this.editorUi.insertHandler(a, null, this.graph.model, Graph.prototype.defaultVertexStyle, Graph.prototype.defaultEdgeStyle);
    this.graph.addCells(a);
    a = this.graph.getGraphBounds();
    e = Math.floor(100 * Math.min((c - 2 * this.thumbBorder) / a.width, (d - 2 * this.thumbBorder) / a.height)) / 100;
    this.graph.view.scaleAndTranslate(e, Math.floor((c - a.width * e) / 2 / e - a.x), Math.floor((d - a.height * e) / 2 / e - a.y));
    this.graph.dialect != mxConstants.DIALECT_SVG || mxClient.NO_FO || null == this.graph.view.getCanvas().ownerSVGElement ? (e = this.graph.container.cloneNode(!1), e.innerHTML = this.graph.container.innerHTML) : e = this.graph.view.getCanvas().ownerSVGElement.cloneNode(!0);
    this.graph.getModel().clear();
    mxClient.NO_FO = f;
    e.style.position = "relative";
    e.style.overflow = "hidden";
    e.style.left = this.thumbBorder + "px";
    e.style.top =
        this.thumbBorder + "px";
    e.style.width = c + "px";
    e.style.height = d + "px";
    e.style.visibility = "";
    e.style.minWidth = "";
    e.style.minHeight = "";
    b.appendChild(e);
    this.sidebarTitles && null != g && 0 != h && (b.style.height = this.thumbHeight + 0 + this.sidebarTitleSize + 8 + "px", c = document.createElement("div"), c.style.fontSize = this.sidebarTitleSize + "px", c.style.color = "#303030", c.style.textAlign = "center", c.style.whiteSpace = "nowrap", mxClient.IS_IE && (c.style.height = this.sidebarTitleSize + 12 + "px"), c.style.paddingTop = "4px", mxUtils.write(c,
        g), b.appendChild(c));
    return a
};
Sidebar.prototype.createSection = function(a) {
    return mxUtils.bind(this, function() {
        var c = document.createElement("div");
        c.setAttribute("title", a);
        c.style.textOverflow = "ellipsis";
        c.style.whiteSpace = "nowrap";
        c.style.textAlign = "center";
        c.style.overflow = "hidden";
        c.style.width = "100%";
        c.style.padding = "14px 0";
        mxUtils.write(c, a);
        return c
    })
};
Sidebar.prototype.createItem = function(a, c, d, b, g, f, h, e) {
    e = null != e ? e : !0;
    var k = document.createElement("a");
    k.className = "geItem";
    k.style.overflow = "hidden";
    var l = 2 * this.thumbBorder;
    k.style.width = this.thumbWidth + l + "px";
    k.style.height = this.thumbHeight + l + "px";
    k.style.padding = this.thumbPadding + "px";
    mxEvent.addListener(k, "click", function(a) {
        mxEvent.consume(a)
    });
    this.createThumb(a, this.thumbWidth, this.thumbHeight, k, c, d, b, g, f);
    var m = new mxRectangle(0, 0, g, f);
    1 < a.length || a[0].vertex ? (b = this.createDragSource(k,
        this.createDropHandler(a, !0, h, m), this.createDragPreview(g, f), a, m), this.addClickHandler(k, b, a), b.isGuidesEnabled = mxUtils.bind(this, function() {
        return this.editorUi.editor.graph.graphHandler.guidesEnabled
    })) : null != a[0] && a[0].edge && (b = this.createDragSource(k, this.createDropHandler(a, !1, h, m), this.createDragPreview(g, f), a, m), this.addClickHandler(k, b, a));
    !mxClient.IS_IOS && e && mxEvent.addGestureListeners(k, null, mxUtils.bind(this, function(b) {
        mxEvent.isMouseEvent(b) && this.showTooltip(k, a, m.width, m.height, c,
            d)
    }));
    return k
};
Sidebar.prototype.updateShapes = function(a, c) {
    var d = this.editorUi.editor.graph,
        b = d.getCellStyle(a),
        g = [];
    d.model.beginUpdate();
    try {
        for (var f = d.getModel().getStyle(a), h = "shadow dashed dashPattern fontFamily fontSize fontColor align startFill startSize endFill endSize strokeColor strokeWidth fillColor gradientColor html part noEdgeStyle edgeStyle elbow childLayout recursiveResize container collapsible connectable comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification sketchStyle".split(" "), e =
                0; e < c.length; e++) {
            var k = c[e];
            if (d.getModel().isVertex(k) == d.getModel().isVertex(a) || d.getModel().isEdge(k) == d.getModel().isEdge(a)) {
                var l = d.getCurrentCellStyle(c[e]);
                d.getModel().setStyle(k, f);
                if ("1" == mxUtils.getValue(l, "composite", "0"))
                    for (var m = d.model.getChildCount(k); 0 <= m; m--) d.model.remove(d.model.getChildAt(k, m));
                "umlLifeline" == l[mxConstants.STYLE_SHAPE] && "umlLifeline" != b[mxConstants.STYLE_SHAPE] && (d.setCellStyles(mxConstants.STYLE_SHAPE, "umlLifeline", [k]), d.setCellStyles("participant", b[mxConstants.STYLE_SHAPE],
                    [k]));
                for (m = 0; m < h.length; m++) {
                    var u = l[h[m]];
                    null != u && d.setCellStyles(h[m], u, [k])
                }
                g.push(k)
            }
        }
    } finally {
        d.model.endUpdate()
    }
    return g
};
Sidebar.prototype.createDropHandler = function(a, c, d, b) {
    d = null != d ? d : !0;
    return mxUtils.bind(this, function(g, f, h, e, k, l) {
        for (l = l ? null : mxEvent.isTouchEvent(f) || mxEvent.isPenEvent(f) ? document.elementFromPoint(mxEvent.getClientX(f), mxEvent.getClientY(f)) : mxEvent.getSource(f); null != l && l != this.container;) l = l.parentNode;
        if (null == l && g.isEnabled()) {
            a = g.getImportableCells(a);
            if (0 < a.length) {
                g.stopEditing();
                l = null == h || mxEvent.isAltDown(f) ? !1 : g.isValidDropTarget(h, a, f);
                var m = null;
                null == h || l || (h = null);
                if (!g.isCellLocked(h ||
                        g.getDefaultParent())) {
                    g.model.beginUpdate();
                    try {
                        e = Math.round(e);
                        k = Math.round(k);
                        if (c && g.isSplitTarget(h, a, f)) {
                            var u = g.view.scale,
                                q = g.view.translate,
                                t = (e + q.x) * u,
                                p = (k + q.y) * u,
                                w = g.cloneCells(a);
                            g.splitEdge(h, w, null, e - b.width / 2, k - b.height / 2, t, p);
                            m = w
                        } else 0 < a.length && (m = g.importCells(a, e, k, h));
                        if (null != g.layoutManager) {
                            var r = g.layoutManager.getLayout(h);
                            if (null != r)
                                for (u = g.view.scale, q = g.view.translate, t = (e + q.x) * u, p = (k + q.y) * u, h = 0; h < m.length; h++) r.moveCell(m[h], t, p)
                        }!d || null != f && mxEvent.isShiftDown(f) ||
                            g.fireEvent(new mxEventObject("cellsInserted", "cells", m))
                    } catch (y) {
                        this.editorUi.handleError(y)
                    } finally {
                        g.model.endUpdate()
                    }
                    null != m && 0 < m.length && (g.scrollCellToVisible(m[0]), g.setSelectionCells(m));
                    g.editAfterInsert && null != f && mxEvent.isMouseEvent(f) && null != m && 1 == m.length && window.setTimeout(function() {
                        g.startEditing(m[0])
                    }, 0)
                }
            }
            mxEvent.consume(f)
        }
    })
};
Sidebar.prototype.createDragPreview = function(a, c) {
    var d = document.createElement("div");
    d.className = "geDragPreview";
    d.style.width = a + "px";
    d.style.height = c + "px";
    return d
};
Sidebar.prototype.dropAndConnect = function(a, c, d, b, g) {
    var f = this.getDropAndConnectGeometry(a, c[b], d, c),
        h = [];
    if (null != f) {
        var e = this.editorUi.editor.graph,
            k = null;
        e.model.beginUpdate();
        try {
            var l = e.getCellGeometry(a),
                m = e.getCellGeometry(c[b]),
                u = e.model.getParent(a),
                q = !0;
            if (null != e.layoutManager) {
                var t = e.layoutManager.getLayout(u);
                null != t && t.constructor == mxStackLayout && (q = !1)
            }
            h = e.model.isEdge(a) ? null : e.view.getState(u);
            var p = t = 0;
            if (null != h) {
                var w = h.origin;
                t = w.x;
                p = w.y;
                var r = f.getTerminalPoint(!1);
                null !=
                    r && (r.x += w.x, r.y += w.y)
            }
            var y = !e.isTableRow(a) && !e.isTableCell(a) && (e.model.isEdge(a) || null != l && !l.relative && q),
                v = e.getCellAt((f.x + t + e.view.translate.x) * e.view.scale, (f.y + p + e.view.translate.y) * e.view.scale, null, null, null, function(a, b, c) {
                    return !e.isContainer(a.cell)
                });
            if (null != v && v != u) h = e.view.getState(v), null != h && (w = h.origin, u = v, y = !0, e.model.isEdge(a) || (f.x -= w.x - t, f.y -= w.y - p));
            else if (!q || e.isTableRow(a) || e.isTableCell(a)) f.x += t, f.y += p;
            t = m.x;
            p = m.y;
            e.model.isEdge(c[b]) && (p = t = 0);
            h = c = e.importCells(c,
                f.x - (y ? t : 0), f.y - (y ? p : 0), y ? u : null);
            if (e.model.isEdge(a)) e.model.setTerminal(a, c[b], d == mxConstants.DIRECTION_NORTH);
            else if (e.model.isEdge(c[b])) {
                e.model.setTerminal(c[b], a, !0);
                var F = e.getCellGeometry(c[b]);
                F.points = null;
                if (null != F.getTerminalPoint(!1)) F.setTerminalPoint(f.getTerminalPoint(!1), !1);
                else if (y && e.model.isVertex(u)) {
                    var A = e.view.getState(u);
                    w = A.cell != e.view.currentRoot ? A.origin : new mxPoint(0, 0);
                    e.cellsMoved(c, w.x, w.y, null, null, !0)
                }
            } else m = e.getCellGeometry(c[b]), t = f.x - Math.round(m.x), p =
                f.y - Math.round(m.y), f.x = Math.round(m.x), f.y = Math.round(m.y), e.model.setGeometry(c[b], f), e.cellsMoved(c, t, p, null, null, !0), h = c.slice(), k = 1 == h.length ? h[0] : null, c.push(e.insertEdge(null, null, "", a, c[b], e.createCurrentEdgeStyle()));
            null != g && mxEvent.isShiftDown(g) || e.fireEvent(new mxEventObject("cellsInserted", "cells", c))
        } catch (B) {
            this.editorUi.handleError(B)
        } finally {
            e.model.endUpdate()
        }
        e.editAfterInsert && null != g && mxEvent.isMouseEvent(g) && null != k && window.setTimeout(function() {
            e.startEditing(k)
        }, 0)
    }
    return h
};
Sidebar.prototype.getDropAndConnectGeometry = function(a, c, d, b) {
    var g = this.editorUi.editor.graph,
        f = g.view,
        h = 1 < b.length,
        e = g.getCellGeometry(a);
    b = g.getCellGeometry(c);
    null != e && null != b && (b = b.clone(), g.model.isEdge(a) ? (a = g.view.getState(a), e = a.absolutePoints, c = e[0], g = e[e.length - 1], d == mxConstants.DIRECTION_NORTH ? (b.x = c.x / f.scale - f.translate.x - b.width / 2, b.y = c.y / f.scale - f.translate.y - b.height / 2) : (b.x = g.x / f.scale - f.translate.x - b.width / 2, b.y = g.y / f.scale - f.translate.y - b.height / 2)) : (e.relative && (a = g.view.getState(a),
        e = e.clone(), e.x = (a.x - f.translate.x) / f.scale, e.y = (a.y - f.translate.y) / f.scale), f = g.defaultEdgeLength, g.model.isEdge(c) && null != b.getTerminalPoint(!0) && null != b.getTerminalPoint(!1) ? (c = b.getTerminalPoint(!0), g = b.getTerminalPoint(!1), f = g.x - c.x, c = g.y - c.y, f = Math.sqrt(f * f + c * c), b.x = e.getCenterX(), b.y = e.getCenterY(), b.width = 1, b.height = 1, d == mxConstants.DIRECTION_NORTH ? (b.height = f, b.y = e.y - f, b.setTerminalPoint(new mxPoint(b.x, b.y), !1)) : d == mxConstants.DIRECTION_EAST ? (b.width = f, b.x = e.x + e.width, b.setTerminalPoint(new mxPoint(b.x +
        b.width, b.y), !1)) : d == mxConstants.DIRECTION_SOUTH ? (b.height = f, b.y = e.y + e.height, b.setTerminalPoint(new mxPoint(b.x, b.y + b.height), !1)) : d == mxConstants.DIRECTION_WEST && (b.width = f, b.x = e.x - f, b.setTerminalPoint(new mxPoint(b.x, b.y), !1))) : (!h && 45 < b.width && 45 < b.height && 45 < e.width && 45 < e.height && (b.width *= e.height / b.height, b.height = e.height), b.x = e.x + e.width / 2 - b.width / 2, b.y = e.y + e.height / 2 - b.height / 2, d == mxConstants.DIRECTION_NORTH ? b.y = b.y - e.height / 2 - b.height / 2 - f : d == mxConstants.DIRECTION_EAST ? b.x = b.x + e.width / 2 +
        b.width / 2 + f : d == mxConstants.DIRECTION_SOUTH ? b.y = b.y + e.height / 2 + b.height / 2 + f : d == mxConstants.DIRECTION_WEST && (b.x = b.x - e.width / 2 - b.width / 2 - f), g.model.isEdge(c) && null != b.getTerminalPoint(!0) && null != c.getTerminal(!1) && (e = g.getCellGeometry(c.getTerminal(!1)), null != e && (d == mxConstants.DIRECTION_NORTH ? (b.x -= e.getCenterX(), b.y -= e.getCenterY() + e.height / 2) : d == mxConstants.DIRECTION_EAST ? (b.x -= e.getCenterX() - e.width / 2, b.y -= e.getCenterY()) : d == mxConstants.DIRECTION_SOUTH ? (b.x -= e.getCenterX(), b.y -= e.getCenterY() - e.height /
            2) : d == mxConstants.DIRECTION_WEST && (b.x -= e.getCenterX() + e.width / 2, b.y -= e.getCenterY()))))));
    return b
};
Sidebar.prototype.isDropStyleEnabled = function(a, c) {
    var d = !0;
    null != c && 1 == a.length && (a = this.graph.getCellStyle(a[c]), null != a && (d = mxUtils.getValue(a, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(a, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE));
    return d
};
Sidebar.prototype.isDropStyleTargetIgnored = function(a) {
    return this.graph.isSwimlane(a.cell) || this.graph.isTableCell(a.cell) || this.graph.isTableRow(a.cell) || this.graph.isTable(a.cell)
};
Sidebar.prototype.createDragSource = function(a, c, d, b, g) {
    function f(a, b) {
        var c = mxUtils.createImage(a.src);
        c.style.width = a.width + "px";
        c.style.height = a.height + "px";
        null != b && c.setAttribute("title", b);
        mxUtils.setOpacity(c, a == this.refreshTarget ? 30 : 20);
        c.style.position = "absolute";
        c.style.cursor = "crosshair";
        return c
    }

    function h(a, b, c, d) {
        null != d.parentNode && (mxUtils.contains(c, a, b) ? (mxUtils.setOpacity(d, 100), x = d) : mxUtils.setOpacity(d, d == z ? 30 : 20));
        return c
    }
    for (var e = this.editorUi, k = e.editor.graph, l = null, m = null,
            u = this, q = 0; q < b.length && (null == m && k.model.isVertex(b[q]) ? m = q : null == l && k.model.isEdge(b[q]) && null == k.model.getTerminal(b[q], !0) && (l = q), null == m || null == l); q++);
    var t = this.isDropStyleEnabled(b, m),
        p = mxUtils.makeDraggable(a, k, mxUtils.bind(this, function(a, d, e, f, g) {
            null != this.updateThread && window.clearTimeout(this.updateThread);
            if (null != b && null != v && x == z) {
                var h = a.isCellSelected(v.cell) ? a.getSelectionCells() : [v.cell];
                h = this.updateShapes(a.model.isEdge(v.cell) ? b[0] : b[m], h);
                a.setSelectionCells(h)
            } else null != b &&
                null != x && null != r && x != z ? (h = a.model.isEdge(r.cell) || null == l ? m : l, a.setSelectionCells(this.dropAndConnect(r.cell, b, I, h, d))) : c.apply(this, arguments);
            null != this.editorUi.hoverIcons && this.editorUi.hoverIcons.update(a.view.getState(a.getSelectionCell()))
        }), d, 0, 0, k.autoscroll, !0, !0);
    k.addListener(mxEvent.ESCAPE, function(a, b) {
        p.isActive() && p.reset()
    });
    var w = p.mouseDown;
    p.mouseDown = function(a) {
        mxEvent.isPopupTrigger(a) || mxEvent.isMultiTouchEvent(a) || (k.stopEditing(), w.apply(this, arguments))
    };
    var r = null,
        y = null,
        v = null,
        F = !1,
        A = f(this.triangleUp, mxResources.get("connect")),
        B = f(this.triangleRight, mxResources.get("connect")),
        D = f(this.triangleDown, mxResources.get("connect")),
        G = f(this.triangleLeft, mxResources.get("connect")),
        z = f(this.refreshTarget, mxResources.get("replace")),
        J = null,
        H = f(this.roundDrop),
        E = f(this.roundDrop),
        I = mxConstants.DIRECTION_NORTH,
        x = null,
        O = p.createPreviewElement;
    p.createPreviewElement = function(a) {
        var b = O.apply(this, arguments);
        mxClient.IS_SVG && (b.style.pointerEvents = "none");
        this.previewElementWidth =
            b.style.width;
        this.previewElementHeight = b.style.height;
        return b
    };
    var P = p.dragEnter;
    p.dragEnter = function(a, b) {
        null != e.hoverIcons && e.hoverIcons.setDisplay("none");
        P.apply(this, arguments)
    };
    var Q = p.dragExit;
    p.dragExit = function(a, b) {
        null != e.hoverIcons && e.hoverIcons.setDisplay("");
        Q.apply(this, arguments)
    };
    p.dragOver = function(a, c) {
        mxDragSource.prototype.dragOver.apply(this, arguments);
        null != this.currentGuide && null != x && this.currentGuide.hide();
        if (null != this.previewElement) {
            var d = a.view;
            if (null != v && x == z) this.previewElement.style.display =
                a.model.isEdge(v.cell) ? "none" : "", this.previewElement.style.left = v.x + "px", this.previewElement.style.top = v.y + "px", this.previewElement.style.width = v.width + "px", this.previewElement.style.height = v.height + "px";
            else if (null != r && null != x) {
                null != p.currentHighlight && null != p.currentHighlight.state && p.currentHighlight.hide();
                var e = a.model.isEdge(r.cell) || null == l ? m : l,
                    f = u.getDropAndConnectGeometry(r.cell, b[e], I, b),
                    h = a.model.isEdge(r.cell) ? null : a.getCellGeometry(r.cell),
                    k = a.getCellGeometry(b[e]),
                    n = a.model.getParent(r.cell),
                    q = d.translate.x * d.scale,
                    K = d.translate.y * d.scale;
                null != h && !h.relative && a.model.isVertex(n) && n != d.currentRoot && (K = d.getState(n), q = K.x, K = K.y);
                h = k.x;
                k = k.y;
                a.model.isEdge(b[e]) && (k = h = 0);
                this.previewElement.style.left = (f.x - h) * d.scale + q + "px";
                this.previewElement.style.top = (f.y - k) * d.scale + K + "px";
                1 == b.length && (this.previewElement.style.width = f.width * d.scale + "px", this.previewElement.style.height = f.height * d.scale + "px");
                this.previewElement.style.display = ""
            } else null != p.currentHighlight.state && a.model.isEdge(p.currentHighlight.state.cell) ?
                (this.previewElement.style.left = Math.round(parseInt(this.previewElement.style.left) - g.width * d.scale / 2) + "px", this.previewElement.style.top = Math.round(parseInt(this.previewElement.style.top) - g.height * d.scale / 2) + "px") : (this.previewElement.style.width = this.previewElementWidth, this.previewElement.style.height = this.previewElementHeight, this.previewElement.style.display = "")
        }
    };
    var M = (new Date).getTime(),
        C = 0,
        L = null,
        N = this.editorUi.editor.graph.getCellStyle(b[0]);
    p.getDropTarget = mxUtils.bind(this, function(a,
        c, d, e) {
        var f = mxEvent.isAltDown(e) || null == b ? null : a.getCellAt(c, d, null, null, null, function(b, c, d) {
            return a.isContainer(b.cell)
        });
        if (null != f && !this.graph.isCellConnectable(f) && !this.graph.model.isEdge(f)) {
            var g = this.graph.getModel().getParent(f);
            this.graph.getModel().isVertex(g) && this.graph.isCellConnectable(g) && (f = g)
        }
        a.isCellLocked(f) && (f = null);
        var k = a.view.getState(f);
        g = x = null;
        L != k ? (M = (new Date).getTime(), C = 0, L = k, null != this.updateThread && window.clearTimeout(this.updateThread), null != k && (this.updateThread =
            window.setTimeout(function() {
                null == x && (L = k, p.getDropTarget(a, c, d, e))
            }, this.dropTargetDelay + 10))) : C = (new Date).getTime() - M;
        if (t && 2500 > C && null != k && !mxEvent.isShiftDown(e) && (mxUtils.getValue(k.style, mxConstants.STYLE_SHAPE) != mxUtils.getValue(N, mxConstants.STYLE_SHAPE) && (mxUtils.getValue(k.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(k.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE || mxUtils.getValue(k.style, mxConstants.STYLE_GRADIENTCOLOR,
                mxConstants.NONE) != mxConstants.NONE) || "image" == mxUtils.getValue(N, mxConstants.STYLE_SHAPE) || 1500 < C || a.model.isEdge(k.cell)) && C > this.dropTargetDelay && !this.isDropStyleTargetIgnored(k) && (a.model.isVertex(k.cell) && null != m || a.model.isEdge(k.cell) && a.model.isEdge(b[0]))) {
            v = k;
            var n = a.model.isEdge(k.cell) ? a.view.getPoint(k) : new mxPoint(k.getCenterX(), k.getCenterY());
            n = new mxRectangle(n.x - this.refreshTarget.width / 2, n.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height);
            z.style.left =
                Math.floor(n.x) + "px";
            z.style.top = Math.floor(n.y) + "px";
            null == J && (a.container.appendChild(z), J = z.parentNode);
            h(c, d, n, z)
        } else null == v || !mxUtils.contains(v, c, d) || 1500 < C && !mxEvent.isShiftDown(e) ? (v = null, null != J && (z.parentNode.removeChild(z), J = null)) : null != v && null != J && (n = a.model.isEdge(v.cell) ? a.view.getPoint(v) : new mxPoint(v.getCenterX(), v.getCenterY()), n = new mxRectangle(n.x - this.refreshTarget.width / 2, n.y - this.refreshTarget.height / 2, this.refreshTarget.width, this.refreshTarget.height), h(c, d, n, z));
        if (F &&
            null != r && !mxEvent.isAltDown(e) && null == x) {
            g = mxRectangle.fromRectangle(r);
            if (a.model.isEdge(r.cell)) {
                var l = r.absolutePoints;
                null != H.parentNode && (n = l[0], g.add(h(c, d, new mxRectangle(n.x - this.roundDrop.width / 2, n.y - this.roundDrop.height / 2, this.roundDrop.width, this.roundDrop.height), H)));
                null != E.parentNode && (l = l[l.length - 1], g.add(h(c, d, new mxRectangle(l.x - this.roundDrop.width / 2, l.y - this.roundDrop.height / 2, this.roundDrop.width, this.roundDrop.height), E)))
            } else n = mxRectangle.fromRectangle(r), null != r.shape &&
                null != r.shape.boundingBox && (n = mxRectangle.fromRectangle(r.shape.boundingBox)), n.grow(this.graph.tolerance), n.grow(HoverIcons.prototype.arrowSpacing), l = this.graph.selectionCellsHandler.getHandler(r.cell), null != l && (n.x -= l.horizontalOffset / 2, n.y -= l.verticalOffset / 2, n.width += l.horizontalOffset, n.height += l.verticalOffset, null != l.rotationShape && null != l.rotationShape.node && "hidden" != l.rotationShape.node.style.visibility && "none" != l.rotationShape.node.style.display && null != l.rotationShape.boundingBox && n.add(l.rotationShape.boundingBox)),
                g.add(h(c, d, new mxRectangle(r.getCenterX() - this.triangleUp.width / 2, n.y - this.triangleUp.height, this.triangleUp.width, this.triangleUp.height), A)), g.add(h(c, d, new mxRectangle(n.x + n.width, r.getCenterY() - this.triangleRight.height / 2, this.triangleRight.width, this.triangleRight.height), B)), g.add(h(c, d, new mxRectangle(r.getCenterX() - this.triangleDown.width / 2, n.y + n.height, this.triangleDown.width, this.triangleDown.height), D)), g.add(h(c, d, new mxRectangle(n.x - this.triangleLeft.width, r.getCenterY() - this.triangleLeft.height /
                    2, this.triangleLeft.width, this.triangleLeft.height), G));
            null != g && g.grow(10)
        }
        I = mxConstants.DIRECTION_NORTH;
        x == B ? I = mxConstants.DIRECTION_EAST : x == D || x == E ? I = mxConstants.DIRECTION_SOUTH : x == G && (I = mxConstants.DIRECTION_WEST);
        null != v && x == z && (k = v);
        n = (null == m || a.isCellConnectable(b[m])) && (a.model.isEdge(f) && null != m || a.model.isVertex(f) && a.isCellConnectable(f));
        if (null != r && 5E3 <= C || r != k && (null == g || !mxUtils.contains(g, c, d) || 500 < C && null == x && n))
            if (F = !1, r = 5E3 > C && C > this.dropTargetDelay || a.model.isEdge(f) ? k : null, null !=
                r && n) {
                g = [H, E, A, B, D, G];
                for (n = 0; n < g.length; n++) null != g[n].parentNode && g[n].parentNode.removeChild(g[n]);
                a.model.isEdge(f) ? (l = k.absolutePoints, null != l && (n = l[0], l = l[l.length - 1], g = a.tolerance, new mxRectangle(c - g, d - g, 2 * g, 2 * g), H.style.left = Math.floor(n.x - this.roundDrop.width / 2) + "px", H.style.top = Math.floor(n.y - this.roundDrop.height / 2) + "px", E.style.left = Math.floor(l.x - this.roundDrop.width / 2) + "px", E.style.top = Math.floor(l.y - this.roundDrop.height / 2) + "px", null == a.model.getTerminal(f, !0) && a.container.appendChild(H),
                    null == a.model.getTerminal(f, !1) && a.container.appendChild(E))) : (n = mxRectangle.fromRectangle(k), null != k.shape && null != k.shape.boundingBox && (n = mxRectangle.fromRectangle(k.shape.boundingBox)), n.grow(this.graph.tolerance), n.grow(HoverIcons.prototype.arrowSpacing), l = this.graph.selectionCellsHandler.getHandler(k.cell), null != l && (n.x -= l.horizontalOffset / 2, n.y -= l.verticalOffset / 2, n.width += l.horizontalOffset, n.height += l.verticalOffset, null != l.rotationShape && null != l.rotationShape.node && "hidden" != l.rotationShape.node.style.visibility &&
                        "none" != l.rotationShape.node.style.display && null != l.rotationShape.boundingBox && n.add(l.rotationShape.boundingBox)), A.style.left = Math.floor(k.getCenterX() - this.triangleUp.width / 2) + "px", A.style.top = Math.floor(n.y - this.triangleUp.height) + "px", B.style.left = Math.floor(n.x + n.width) + "px", B.style.top = Math.floor(k.getCenterY() - this.triangleRight.height / 2) + "px", D.style.left = A.style.left, D.style.top = Math.floor(n.y + n.height) + "px", G.style.left = Math.floor(n.x - this.triangleLeft.width) + "px", G.style.top = B.style.top,
                    "eastwest" != k.style.portConstraint && (a.container.appendChild(A), a.container.appendChild(D)), a.container.appendChild(B), a.container.appendChild(G));
                null != k && (y = a.selectionCellsHandler.getHandler(k.cell), null != y && null != y.setHandlesVisible && y.setHandlesVisible(!1));
                F = !0
            } else
                for (g = [H, E, A, B, D, G], n = 0; n < g.length; n++) null != g[n].parentNode && g[n].parentNode.removeChild(g[n]);
        F || null == y || y.setHandlesVisible(!0);
        f = mxEvent.isAltDown(e) && !mxEvent.isShiftDown(e) || null != v && x == z ? null : mxDragSource.prototype.getDropTarget.apply(this,
            arguments);
        g = a.getModel();
        if (null != f && (null != x || !a.isSplitTarget(f, b, e))) {
            for (; null != f && !a.isValidDropTarget(f, b, e) && g.isVertex(g.getParent(f));) f = g.getParent(f);
            null != f && (a.view.currentRoot == f || !a.isValidRoot(f) && 0 == a.getModel().getChildCount(f) || a.isCellLocked(f) || g.isEdge(f) || !a.isValidDropTarget(f, b, e)) && (f = null)
        }
        return f
    });
    p.stopDrag = function() {
        mxDragSource.prototype.stopDrag.apply(this, arguments);
        for (var a = [H, E, z, A, B, D, G], b = 0; b < a.length; b++) null != a[b].parentNode && a[b].parentNode.removeChild(a[b]);
        null != r && null != y && y.reset();
        x = J = v = r = y = null
    };
    return p
};
Sidebar.prototype.itemClicked = function(a, c, d, b) {
    b = this.editorUi.editor.graph;
    b.container.focus();
    if (mxEvent.isAltDown(d) && 1 == b.getSelectionCount() && b.model.isVertex(b.getSelectionCell())) {
        c = null;
        for (var g = 0; g < a.length && null == c; g++) b.model.isVertex(a[g]) && (c = g);
        null != c && (b.setSelectionCells(this.dropAndConnect(b.getSelectionCell(), a, mxEvent.isMetaDown(d) || mxEvent.isControlDown(d) ? mxEvent.isShiftDown(d) ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH : mxEvent.isShiftDown(d) ? mxConstants.DIRECTION_EAST :
            mxConstants.DIRECTION_SOUTH, c, d)), b.scrollCellToVisible(b.getSelectionCell()))
    } else mxEvent.isShiftDown(d) && !b.isSelectionEmpty() ? (this.updateShapes(a[0], b.getSelectionCells()), b.scrollCellToVisible(b.getSelectionCell())) : (a = mxEvent.isAltDown(d) ? b.getFreeInsertPoint() : b.getCenterInsertPoint(b.getBoundingBoxFromGeometry(a, !0)), c.drop(b, d, null, a.x, a.y, !0))
};
Sidebar.prototype.addClickHandler = function(a, c, d) {
    var b = c.mouseDown,
        g = c.mouseMove,
        f = c.mouseUp,
        h = this.editorUi.editor.graph.tolerance,
        e = null,
        k = this;
    c.mouseDown = function(c) {
        b.apply(this, arguments);
        e = new mxPoint(mxEvent.getClientX(c), mxEvent.getClientY(c));
        null != this.dragElement && (this.dragElement.style.display = "none", mxUtils.setOpacity(a, 50))
    };
    c.mouseMove = function(b) {
        null != this.dragElement && "none" == this.dragElement.style.display && null != e && (Math.abs(e.x - mxEvent.getClientX(b)) > h || Math.abs(e.y - mxEvent.getClientY(b)) >
            h) && (this.dragElement.style.display = "", mxUtils.setOpacity(a, 100));
        g.apply(this, arguments)
    };
    c.mouseUp = function(b) {
        try {
            mxEvent.isPopupTrigger(b) || null != this.currentGraph || null == this.dragElement || "none" != this.dragElement.style.display || k.itemClicked(d, c, b, a), f.apply(c, arguments), mxUtils.setOpacity(a, 100), e = null, k.currentElt = a
        } catch (m) {
            c.reset(), k.editorUi.handleError(m)
        }
    }
};
Sidebar.prototype.createVertexTemplateEntry = function(a, c, d, b, g, f, h, e) {
    e = null != e && 0 < e.length ? e : null != g ? g.toLowerCase() : "";
    return this.addEntry(e, mxUtils.bind(this, function() {
        return this.createVertexTemplate(a, c, d, b, g, f, h)
    }))
};
Sidebar.prototype.createVertexTemplate = function(a, c, d, b, g, f, h, e, k) {
    a = [new mxCell(null != b ? b : "", new mxGeometry(0, 0, c, d), a)];
    a[0].vertex = !0;
    return this.createVertexTemplateFromCells(a, c, d, g, f, h, e, k)
};
Sidebar.prototype.createVertexTemplateFromData = function(a, c, d, b, g, f, h, e) {
    a = mxUtils.parseXml(Graph.decompress(a));
    var k = new mxCodec(a),
        l = new mxGraphModel;
    k.decode(a.documentElement, l);
    a = this.graph.cloneCells(l.root.getChildAt(0).children);
    return this.createVertexTemplateFromCells(a, c, d, b, g, f, h, e)
};
Sidebar.prototype.createVertexTemplateFromCells = function(a, c, d, b, g, f, h, e) {
    return this.createItem(a, b, g, f, c, d, h, e)
};
Sidebar.prototype.createEdgeTemplateEntry = function(a, c, d, b, g, f, h, e, k) {
    h = null != h && 0 < h.length ? h : g.toLowerCase();
    return this.addEntry(h, mxUtils.bind(this, function() {
        return this.createEdgeTemplate(a, c, d, b, g, f, e, k)
    }))
};
Sidebar.prototype.createEdgeTemplate = function(a, c, d, b, g, f, h, e) {
    a = new mxCell(null != b ? b : "", new mxGeometry(0, 0, c, d), a);
    a.geometry.setTerminalPoint(new mxPoint(0, d), !0);
    a.geometry.setTerminalPoint(new mxPoint(c, 0), !1);
    a.geometry.relative = !0;
    a.edge = !0;
    return this.createEdgeTemplateFromCells([a], c, d, g, f, h, e)
};
Sidebar.prototype.createEdgeTemplateFromCells = function(a, c, d, b, g, f, h) {
    return this.createItem(a, b, g, !0, c, d, f, h)
};
Sidebar.prototype.addPaletteFunctions = function(a, c, d, b) {
    this.addPalette(a, c, d, mxUtils.bind(this, function(a) {
        for (var c = 0; c < b.length; c++) a.appendChild(b[c](a))
    }))
};
Sidebar.prototype.addPalette = function(a, c, d, b) {
    c = this.createTitle(c);
    this.container.appendChild(c);
    var g = document.createElement("div");
    g.className = "geSidebar";
    mxClient.IS_POINTER && (g.style.touchAction = "none");
    d ? (b(g), b = null) : g.style.display = "none";
    this.addFoldingHandler(c, g, b);
    d = document.createElement("div");
    d.appendChild(g);
    this.container.appendChild(d);
    null != a && (this.palettes[a] = [c, d]);
    return g
};
Sidebar.prototype.addFoldingHandler = function(a, c, d) {
    var b = !1;
    if (!mxClient.IS_IE || 8 <= document.documentMode) a.style.backgroundImage = "none" == c.style.display ? "url('" + this.collapsedImage + "')" : "url('" + this.expandedImage + "')";
    a.style.backgroundRepeat = "no-repeat";
    a.style.backgroundPosition = "0% 50%";
    mxEvent.addListener(a, "click", mxUtils.bind(this, function(g) {
        if ("none" == c.style.display) {
            if (b) c.style.display = "block";
            else if (b = !0, null != d) {
                a.style.cursor = "wait";
                var f = a.innerHTML;
                a.innerHTML = mxResources.get("loading") +
                    "...";
                window.setTimeout(function() {
                    c.style.display = "block";
                    a.style.cursor = "";
                    a.innerHTML = f;
                    var b = mxClient.NO_FO;
                    mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
                    d(c, a);
                    mxClient.NO_FO = b
                }, mxClient.IS_FF ? 20 : 0)
            } else c.style.display = "block";
            a.style.backgroundImage = "url('" + this.expandedImage + "')"
        } else a.style.backgroundImage = "url('" + this.collapsedImage + "')", c.style.display = "none";
        mxEvent.consume(g)
    }));
    mxEvent.addListener(a, mxClient.IS_POINTER ? "pointerdown" : "mousedown", mxUtils.bind(this, function(a) {
        a.preventDefault()
    }))
};
Sidebar.prototype.removePalette = function(a) {
    var c = this.palettes[a];
    if (null != c) {
        this.palettes[a] = null;
        for (a = 0; a < c.length; a++) this.container.removeChild(c[a]);
        return !0
    }
    return !1
};
Sidebar.prototype.addImagePalette = function(a, c, d, b, g, f, h) {
    for (var e = [], k = 0; k < g.length; k++) mxUtils.bind(this, function(a, c, f) {
        if (null == f) {
            f = a.lastIndexOf("/");
            var g = a.lastIndexOf(".");
            f = a.substring(0 <= f ? f + 1 : 0, 0 <= g ? g : a.length).replace(/[-_]/g, " ")
        }
        e.push(this.createVertexTemplateEntry("image;html=1;image=" + d + a + b, this.defaultImageWidth, this.defaultImageHeight, "", c, null != c, null, this.filterTags(f)))
    })(g[k], null != f ? f[k] : null, null != h ? h[g[k]] : null);
    this.addPaletteFunctions(a, c, !1, e)
};
Sidebar.prototype.getTagsForStencil = function(a, c, d) {
    a = a.split(".");
    for (var b = 1; b < a.length; b++) a[b] = a[b].replace(/_/g, " ");
    a.push(c.replace(/_/g, " "));
    null != d && a.push(d);
    return a.slice(1, a.length)
};
Sidebar.prototype.addStencilPalette = function(a, c, d, b, g, f, h, e, k, l) {
    h = null != h ? h : 1;
    if (this.addStencilsToIndex) {
        var m = [];
        if (null != k)
            for (l = 0; l < k.length; l++) m.push(k[l]);
        mxStencilRegistry.loadStencilSet(d, mxUtils.bind(this, function(a, c, d, f, k) {
                if (null == g || 0 > mxUtils.indexOf(g, c)) {
                    d = this.getTagsForStencil(a, c);
                    var l = null != e ? e[c] : null;
                    null != l && d.push(l);
                    m.push(this.createVertexTemplateEntry("shape=" + a + c.toLowerCase() + b, Math.round(f * h), Math.round(k * h), "", c.replace(/_/g, " "), null, null, this.filterTags(d.join(" "))))
                }
            }),
            !0, !0);
        this.addPaletteFunctions(a, c, !1, m)
    } else this.addPalette(a, c, !1, mxUtils.bind(this, function(a) {
        null == b && (b = "");
        null != f && f.call(this, a);
        if (null != k)
            for (var c = 0; c < k.length; c++) k[c](a);
        mxStencilRegistry.loadStencilSet(d, mxUtils.bind(this, function(c, d, e, f, k) {
            (null == g || 0 > mxUtils.indexOf(g, d)) && a.appendChild(this.createVertexTemplate("shape=" + c + d.toLowerCase() + b, Math.round(f * h), Math.round(k * h), "", d.replace(/_/g, " "), !0))
        }), !0)
    }))
};
Sidebar.prototype.destroy = function() {
    null != this.graph && (null != this.graph.container && null != this.graph.container.parentNode && this.graph.container.parentNode.removeChild(this.graph.container), this.graph.destroy(), this.graph = null);
    null != this.pointerUpHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointerup" : "mouseup", this.pointerUpHandler), this.pointerUpHandler = null);
    null != this.pointerDownHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointerdown" : "mousedown", this.pointerDownHandler),
        this.pointerDownHandler = null);
    null != this.pointerMoveHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointermove" : "mousemove", this.pointerMoveHandler), this.pointerMoveHandler = null);
    null != this.pointerOutHandler && (mxEvent.removeListener(document, mxClient.IS_POINTER ? "pointerout" : "mouseout", this.pointerOutHandler), this.pointerOutHandler = null)
};