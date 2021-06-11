"undefined" !== typeof html4 && (html4.ATTRIBS["a::target"] = 0, html4.ATTRIBS["source::src"] = 0, html4.ATTRIBS["video::src"] = 0);
Date.prototype.toISOString || function() {
    function a(a) {
        a = String(a);
        1 === a.length && (a = "0" + a);
        return a
    }
    Date.prototype.toISOString = function() {
        return this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / 1E3).toFixed(3)).slice(2, 5) + "Z"
    }
}();
Date.now || (Date.now = function() {
    return (new Date).getTime()
});
Uint8Array.from || (Uint8Array.from = function() {
    var a = Object.prototype.toString,
        b = function(b) {
            return "function" === typeof b || "[object Function]" === a.call(b)
        },
        c = Math.pow(2, 53) - 1;
    return function(a) {
        var d = Object(a);
        if (null == a) throw new TypeError("Array.from requires an array-like object - not null or undefined");
        var f = 1 < arguments.length ? arguments[1] : void 0,
            h;
        if ("undefined" !== typeof f) {
            if (!b(f)) throw new TypeError("Array.from: when provided, the second argument must be a function");
            2 < arguments.length && (h =
                arguments[2])
        }
        var k = Number(d.length);
        k = isNaN(k) ? 0 : 0 !== k && isFinite(k) ? (0 < k ? 1 : -1) * Math.floor(Math.abs(k)) : k;
        k = Math.min(Math.max(k, 0), c);
        for (var n = b(this) ? Object(new this(k)) : Array(k), m = 0, p; m < k;) p = d[m], n[m] = f ? "undefined" === typeof h ? f(p, m) : f.call(h, p, m) : p, m += 1;
        n.length = k;
        return n
    }
}());
mxConstants.POINTS = 1;
mxConstants.MILLIMETERS = 2;
mxConstants.INCHES = 3;
mxConstants.PIXELS_PER_MM = 3.937;
mxConstants.PIXELS_PER_INCH = 100;
mxConstants.SHADOW_OPACITY = .25;
mxConstants.SHADOWCOLOR = "#000000";
mxConstants.VML_SHADOWCOLOR = "#d0d0d0";
mxGraph.prototype.pageBreakColor = "#c0c0c0";
mxGraph.prototype.pageScale = 1;
(function() {
    try {
        if (null != navigator && null != navigator.language) {
            var a = navigator.language.toLowerCase();
            mxGraph.prototype.pageFormat = "en-us" === a || "en-ca" === a || "es-mx" === a ? mxConstants.PAGE_FORMAT_LETTER_PORTRAIT : mxConstants.PAGE_FORMAT_A4_PORTRAIT
        }
    } catch (b) {}
})();
mxText.prototype.baseSpacingTop = 5;
mxText.prototype.baseSpacingBottom = 1;
mxGraphModel.prototype.ignoreRelativeEdgeParent = !1;
mxGraphView.prototype.gridImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=" : IMAGE_PATH + "/grid.gif";
mxGraphView.prototype.gridSteps = 4;
mxGraphView.prototype.minGridSize = 4;
mxGraphView.prototype.defaultGridColor = "#d0d0d0";
mxGraphView.prototype.defaultDarkGridColor = "#6e6e6e";
mxGraphView.prototype.gridColor = mxGraphView.prototype.defaultGridColor;
mxGraphView.prototype.unit = mxConstants.POINTS;
mxGraphView.prototype.setUnit = function(a) {
    this.unit != a && (this.unit = a, this.fireEvent(new mxEventObject("unitChanged", "unit", a)))
};
mxSvgCanvas2D.prototype.foAltText = "[Not supported by viewer]";
mxShape.prototype.getConstraints = function(a, b, c) {
    return null
};
mxImageShape.prototype.getImageDataUri = function() {
    var a = this.image;
    if ("data:image/svg+xml;base64," == a.substring(0, 26) && null != this.style && "1" == mxUtils.getValue(this.style, "clipSvg", "0")) {
        if (null == this.clippedSvg || this.clippedImage != a) this.clippedSvg = Graph.clipSvgDataUri(a), this.clippedImage = a;
        a = this.clippedSvg
    }
    return a
};
Graph = function(a, b, c, d, e, f) {
    mxGraph.call(this, a, b, c, d);
    this.themes = e || this.defaultThemes;
    this.currentEdgeStyle = mxUtils.clone(this.defaultEdgeStyle);
    this.currentVertexStyle = mxUtils.clone(this.defaultVertexStyle);
    this.standalone = null != f ? f : !1;
    a = this.baseUrl;
    b = a.indexOf("//");
    this.domainPathUrl = this.domainUrl = "";
    0 < b && (b = a.indexOf("/", b + 2), 0 < b && (this.domainUrl = a.substring(0, b)), b = a.lastIndexOf("/"), 0 < b && (this.domainPathUrl = a.substring(0, b + 1)));
    this.isHtmlLabel = function(a) {
        a = this.getCurrentCellStyle(a);
        return null != a ? "1" == a.html || "wrap" == a[mxConstants.STYLE_WHITE_SPACE] : !1
    };
    if (this.edgeMode) {
        var h = null,
            k = null,
            n = null,
            m = null,
            p = !1;
        this.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(a, b) {
            if ("mouseDown" == b.getProperty("eventName") && this.isEnabled()) {
                a = b.getProperty("event");
                var c = a.getState();
                if (!mxEvent.isAltDown(a.getEvent()) && null != c)
                    if (this.model.isEdge(c.cell))
                        if (h = new mxPoint(a.getGraphX(), a.getGraphY()), p = this.isCellSelected(c.cell), n = c, k = a, null != c.text && null != c.text.boundingBox &&
                            mxUtils.contains(c.text.boundingBox, a.getGraphX(), a.getGraphY())) m = mxEvent.LABEL_HANDLE;
                        else {
                            var f = this.selectionCellsHandler.getHandler(c.cell);
                            null != f && null != f.bends && 0 < f.bends.length && (m = f.getHandleForEvent(a))
                        }
                else if (!this.panningHandler.isActive() && !mxEvent.isControlDown(a.getEvent()) && (f = this.selectionCellsHandler.getHandler(c.cell), null == f || null == f.getHandleForEvent(a))) {
                    b = new mxRectangle(a.getGraphX() - 1, a.getGraphY() - 1);
                    b.grow(mxEvent.isTouchEvent(a.getEvent()) ? mxShape.prototype.svgStrokeTolerance -
                        1 : (mxShape.prototype.svgStrokeTolerance + 1) / 2);
                    if (this.isTableCell(c.cell) && !this.isCellSelected(c.cell)) {
                        var d = this.model.getParent(c.cell);
                        f = this.model.getParent(d);
                        if (!this.isCellSelected(f) && (mxUtils.intersects(b, new mxRectangle(c.x, c.y - 2, c.width, 3)) && this.model.getChildAt(f, 0) != d || mxUtils.intersects(b, new mxRectangle(c.x, c.y + c.height - 2, c.width, 3)) || mxUtils.intersects(b, new mxRectangle(c.x - 2, c.y, 2, c.height)) && this.model.getChildAt(d, 0) != c.cell || mxUtils.intersects(b, new mxRectangle(c.x + c.width -
                                2, c.y, 2, c.height))) && (d = this.selectionCellsHandler.isHandled(f), this.selectCellForEvent(f, a.getEvent()), f = this.selectionCellsHandler.getHandler(f), null != f)) {
                            var e = f.getHandleForEvent(a);
                            null != e && (f.start(a.getGraphX(), a.getGraphY(), e), f.blockDelayedSelection = !d, a.consume())
                        }
                    }
                    for (; !a.isConsumed() && null != c && (this.isTableCell(c.cell) || this.isTableRow(c.cell) || this.isTable(c.cell));) this.isSwimlane(c.cell) && (f = this.getActualStartSize(c.cell), d = this.view.scale, (0 < f.x || 0 < f.width) && mxUtils.intersects(b,
                        new mxRectangle(c.x + (f.x - f.width - 1) * d + (0 == f.x ? c.width : 0), c.y, 1, c.height)) || (0 < f.y || 0 < f.height) && mxUtils.intersects(b, new mxRectangle(c.x, c.y + (f.y - f.height - 1) * d + (0 == f.y ? c.height : 0), c.width, 1))) && (this.selectCellForEvent(c.cell, a.getEvent()), f = this.selectionCellsHandler.getHandler(c.cell), null != f && (e = mxEvent.CUSTOM_HANDLE - f.customHandles.length + 1, f.start(a.getGraphX(), a.getGraphY(), e), a.consume())), c = this.view.getState(this.model.getParent(c.cell))
                }
            }
        }));
        this.addMouseListener({
            mouseDown: function(a, b) {},
            mouseMove: mxUtils.bind(this, function(a, b) {
                a = this.selectionCellsHandler.handlers.map;
                for (var c in a)
                    if (null != a[c].index) return;
                if (this.isEnabled() && !this.panningHandler.isActive() && !mxEvent.isAltDown(b.getEvent()))
                    if (a = this.tolerance, null != h && null != n && null != k) {
                        if (c = n, Math.abs(h.x - b.getGraphX()) > a || Math.abs(h.y - b.getGraphY()) > a) {
                            var f = this.selectionCellsHandler.getHandler(c.cell);
                            null == f && this.model.isEdge(c.cell) && (f = this.createHandler(c));
                            if (null != f && null != f.bends && 0 < f.bends.length) {
                                a = f.getHandleForEvent(k);
                                var d = this.view.getEdgeStyle(c),
                                    e = d == mxEdgeStyle.EntityRelation;
                                p || m != mxEvent.LABEL_HANDLE || (a = m);
                                if (e && 0 != a && a != f.bends.length - 1 && a != mxEvent.LABEL_HANDLE) !e || null == c.visibleSourceState && null == c.visibleTargetState || (this.graphHandler.reset(), b.consume());
                                else if (a == mxEvent.LABEL_HANDLE || 0 == a || null != c.visibleSourceState || a == f.bends.length - 1 || null != c.visibleTargetState) e || a == mxEvent.LABEL_HANDLE || (e = c.absolutePoints, null != e && (null == d && null == a || d == mxEdgeStyle.OrthConnector) && (a = m, null == a && (a = new mxRectangle(h.x,
                                    h.y), a.grow(mxEdgeHandler.prototype.handleImage.width / 2), mxUtils.contains(a, e[0].x, e[0].y) ? a = 0 : mxUtils.contains(a, e[e.length - 1].x, e[e.length - 1].y) ? a = f.bends.length - 1 : null != d && (2 == e.length || 3 == e.length && (0 == Math.round(e[0].x - e[1].x) && 0 == Math.round(e[1].x - e[2].x) || 0 == Math.round(e[0].y - e[1].y) && 0 == Math.round(e[1].y - e[2].y))) ? a = 2 : (a = mxUtils.findNearestSegment(c, h.x, h.y), a = null == d ? mxEvent.VIRTUAL_HANDLE - a : a + 1))), null == a && (a = mxEvent.VIRTUAL_HANDLE)), f.start(b.getGraphX(), b.getGraphX(), a), b.consume(), this.graphHandler.reset()
                            }
                            null !=
                                f && (this.selectionCellsHandler.isHandlerActive(f) ? this.isCellSelected(c.cell) || (this.selectionCellsHandler.handlers.put(c.cell, f), this.selectCellForEvent(c.cell, b.getEvent())) : this.isCellSelected(c.cell) || f.destroy());
                            p = !1;
                            h = k = n = m = null
                        }
                    } else if (c = b.getState(), null != c) {
                    f = null;
                    if (this.model.isEdge(c.cell)) {
                        if (a = new mxRectangle(b.getGraphX(), b.getGraphY()), a.grow(mxEdgeHandler.prototype.handleImage.width / 2), e = c.absolutePoints, null != e)
                            if (null != c.text && null != c.text.boundingBox && mxUtils.contains(c.text.boundingBox,
                                    b.getGraphX(), b.getGraphY())) f = "move";
                            else if (mxUtils.contains(a, e[0].x, e[0].y) || mxUtils.contains(a, e[e.length - 1].x, e[e.length - 1].y)) f = "pointer";
                        else if (null != c.visibleSourceState || null != c.visibleTargetState) a = this.view.getEdgeStyle(c), f = "crosshair", a != mxEdgeStyle.EntityRelation && this.isOrthogonal(c) && (b = mxUtils.findNearestSegment(c, b.getGraphX(), b.getGraphY()), b < e.length - 1 && 0 <= b && (f = 0 == Math.round(e[b].x - e[b + 1].x) ? "col-resize" : "row-resize"))
                    } else if (!mxEvent.isControlDown(b.getEvent())) {
                        a = new mxRectangle(b.getGraphX() -
                            1, b.getGraphY() - 1);
                        a.grow(mxShape.prototype.svgStrokeTolerance / 2);
                        if (this.isTableCell(c.cell) && (b = this.model.getParent(c.cell), e = this.model.getParent(b), !this.isCellSelected(e)))
                            if (mxUtils.intersects(a, new mxRectangle(c.x - 2, c.y, 2, c.height)) && this.model.getChildAt(b, 0) != c.cell || mxUtils.intersects(a, new mxRectangle(c.x + c.width - 2, c.y, 2, c.height))) f = "col-resize";
                            else if (mxUtils.intersects(a, new mxRectangle(c.x, c.y - 2, c.width, 3)) && this.model.getChildAt(e, 0) != b || mxUtils.intersects(a, new mxRectangle(c.x,
                                c.y + c.height - 2, c.width, 3))) f = "row-resize";
                        for (b = c; null == f && null != b && (this.isTableCell(b.cell) || this.isTableRow(b.cell) || this.isTable(b.cell));) this.isSwimlane(b.cell) && (e = this.getActualStartSize(b.cell), d = this.view.scale, (0 < e.x || 0 < e.width) && mxUtils.intersects(a, new mxRectangle(b.x + (e.x - e.width - 1) * d + (0 == e.x ? b.width * d : 0), b.y, 1, b.height)) ? f = "col-resize" : (0 < e.y || 0 < e.height) && mxUtils.intersects(a, new mxRectangle(b.x, b.y + (e.y - e.height - 1) * d + (0 == e.y ? b.height : 0), b.width, 1)) && (f = "row-resize")), b = this.view.getState(this.model.getParent(b.cell))
                    }
                    null !=
                        f && c.setCursor(f)
                }
            }),
            mouseUp: mxUtils.bind(this, function(a, b) {
                m = h = k = n = null
            })
        })
    }
    this.cellRenderer.getLabelValue = function(a) {
        var b = mxCellRenderer.prototype.getLabelValue.apply(this, arguments);
        a.view.graph.isHtmlLabel(a.cell) && (b = 1 != a.style.html ? mxUtils.htmlEntities(b, !1) : a.view.graph.sanitizeHtml(b));
        return b
    };
    if ("undefined" !== typeof mxVertexHandler) {
        this.setConnectable(!0);
        this.setDropEnabled(!0);
        this.setPanning(!0);
        this.setTooltips(!0);
        this.setAllowLoops(!0);
        this.allowAutoPanning = !0;
        this.constrainChildren =
            this.resetEdgesOnConnect = !1;
        this.constrainRelativeChildren = !0;
        this.graphHandler.scrollOnMove = !1;
        this.graphHandler.scaleGrid = !0;
        this.connectionHandler.setCreateTarget(!1);
        this.connectionHandler.insertBeforeSource = !0;
        this.connectionHandler.isValidSource = function(a, b) {
            return !1
        };
        this.alternateEdgeStyle = "vertical";
        null == d && this.loadStylesheet();
        var q = this.graphHandler.getGuideStates;
        this.graphHandler.getGuideStates = function() {
            var a = q.apply(this, arguments);
            if (this.graph.pageVisible) {
                var b = [],
                    c = this.graph.pageFormat,
                    f = this.graph.pageScale,
                    d = c.width * f;
                c = c.height * f;
                f = this.graph.view.translate;
                for (var e = this.graph.view.scale, h = this.graph.getPageLayout(), k = 0; k < h.width; k++) b.push(new mxRectangle(((h.x + k) * d + f.x) * e, (h.y * c + f.y) * e, d * e, c * e));
                for (k = 1; k < h.height; k++) b.push(new mxRectangle((h.x * d + f.x) * e, ((h.y + k) * c + f.y) * e, d * e, c * e));
                a = b.concat(a)
            }
            return a
        };
        mxDragSource.prototype.dragElementZIndex = mxPopupMenu.prototype.zIndex;
        mxGuide.prototype.getGuideColor = function(a, b) {
            return null == a.cell ? "#ffa500" : mxConstants.GUIDE_COLOR
        };
        this.graphHandler.createPreviewShape = function(a) {
            this.previewColor = "#000000" == this.graph.background ? "#ffffff" : mxGraphHandler.prototype.previewColor;
            return mxGraphHandler.prototype.createPreviewShape.apply(this, arguments)
        };
        var r = this.graphHandler.getCells;
        this.graphHandler.getCells = function(a) {
            for (var b = r.apply(this, arguments), c = new mxDictionary, f = [], d = 0; d < b.length; d++) {
                var e = this.graph.isTableCell(a) && this.graph.isTableCell(b[d]) && this.graph.isCellSelected(b[d]) ? this.graph.model.getParent(b[d]) : this.graph.isTableRow(a) &&
                    this.graph.isTableRow(b[d]) && this.graph.isCellSelected(b[d]) ? b[d] : this.graph.getCompositeParent(b[d]);
                null == e || c.get(e) || (c.put(e, !0), f.push(e))
            }
            return f
        };
        var u = this.graphHandler.start;
        this.graphHandler.start = function(a, b, c, f) {
            var d = !1;
            this.graph.isTableCell(a) && (this.graph.isCellSelected(a) ? d = !0 : a = this.graph.model.getParent(a));
            d || this.graph.isTableRow(a) && this.graph.isCellSelected(a) || (a = this.graph.getCompositeParent(a));
            u.apply(this, arguments)
        };
        this.connectionHandler.createTargetVertex = function(a,
            b) {
            b = this.graph.getCompositeParent(b);
            return mxConnectionHandler.prototype.createTargetVertex.apply(this, arguments)
        };
        var y = new mxRubberband(this);
        this.getRubberband = function() {
            return y
        };
        var C = (new Date).getTime(),
            G = 0,
            J = this.connectionHandler.mouseMove;
        this.connectionHandler.mouseMove = function() {
            var a = this.currentState;
            J.apply(this, arguments);
            a != this.currentState ? (C = (new Date).getTime(), G = 0) : G = (new Date).getTime() - C
        };
        var E = this.connectionHandler.isOutlineConnectEvent;
        this.connectionHandler.isOutlineConnectEvent =
            function(a) {
                return null != this.currentState && a.getState() == this.currentState && 2E3 < G || (null == this.currentState || "0" != mxUtils.getValue(this.currentState.style, "outlineConnect", "1")) && E.apply(this, arguments)
            };
        var L = this.isToggleEvent;
        this.isToggleEvent = function(a) {
            return L.apply(this, arguments) || !mxClient.IS_CHROMEOS && mxEvent.isShiftDown(a)
        };
        var M = y.isForceRubberbandEvent;
        y.isForceRubberbandEvent = function(a) {
            return M.apply(this, arguments) && !mxEvent.isShiftDown(a.getEvent()) && !mxEvent.isControlDown(a.getEvent()) ||
                mxClient.IS_CHROMEOS && mxEvent.isShiftDown(a.getEvent()) || mxUtils.hasScrollbars(this.graph.container) && mxClient.IS_FF && mxClient.IS_WIN && null == a.getState() && mxEvent.isTouchEvent(a.getEvent())
        };
        var I = null;
        this.panningHandler.addListener(mxEvent.PAN_START, mxUtils.bind(this, function() {
            this.isEnabled() && (I = this.container.style.cursor, this.container.style.cursor = "move")
        }));
        this.panningHandler.addListener(mxEvent.PAN_END, mxUtils.bind(this, function() {
            this.isEnabled() && (this.container.style.cursor = I)
        }));
        this.popupMenuHandler.autoExpand = !0;
        this.popupMenuHandler.isSelectOnPopup = function(a) {
            return mxEvent.isMouseEvent(a.getEvent())
        };
        var t = this.click;
        this.click = function(a) {
            var b = null == a.state && null != a.sourceState && this.isCellLocked(a.sourceState.cell);
            if (this.isEnabled() && !b || a.isConsumed()) return t.apply(this, arguments);
            var c = b ? a.sourceState.cell : a.getCell();
            null != c && (c = this.getClickableLinkForCell(c), null != c && (this.isCustomLink(c) ? this.customLinkClicked(c) : this.openLink(c)));
            this.isEnabled() && b && this.clearSelection()
        };
        this.tooltipHandler.getStateForEvent =
            function(a) {
                return a.sourceState
            };
        var w = this.tooltipHandler.show;
        this.tooltipHandler.show = function() {
            w.apply(this, arguments);
            if (null != this.div)
                for (var a = this.div.getElementsByTagName("a"), b = 0; b < a.length; b++) null != a[b].getAttribute("href") && null == a[b].getAttribute("target") && a[b].setAttribute("target", "_blank")
        };
        this.tooltipHandler.getStateForEvent = function(a) {
            return a.sourceState
        };
        this.getCursorForMouseEvent = function(a) {
            var b = null == a.state && null != a.sourceState && this.isCellLocked(a.sourceState.cell);
            return this.getCursorForCell(b ? a.sourceState.cell : a.getCell())
        };
        var x = this.getCursorForCell;
        this.getCursorForCell = function(a) {
            if (!this.isEnabled() || this.isCellLocked(a)) {
                if (null != this.getClickableLinkForCell(a)) return "pointer";
                if (this.isCellLocked(a)) return "default"
            }
            return x.apply(this, arguments)
        };
        this.selectRegion = function(a, b) {
            a = this.getCells(a.x, a.y, a.width, a.height, null, null, null, function(a) {
                return "1" == mxUtils.getValue(a.style, "locked", "0")
            }, !0);
            this.selectCellsForEvent(a, b);
            return a
        };
        var z = this.graphHandler.shouldRemoveCellsFromParent;
        this.graphHandler.shouldRemoveCellsFromParent = function(a, b, c) {
            return this.graph.isCellSelected(a) ? !1 : z.apply(this, arguments)
        };
        this.isCellLocked = function(a) {
            for (; null != a;) {
                if ("1" == mxUtils.getValue(this.getCurrentCellStyle(a), "locked", "0")) return !0;
                a = this.model.getParent(a)
            }
            return !1
        };
        var K = null;
        this.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(a, b) {
            "mouseDown" == b.getProperty("eventName") && (a = b.getProperty("event").getState(), K = null == a || this.isSelectionEmpty() || this.isCellSelected(a.cell) ?
                null : this.getSelectionCells())
        }));
        this.addListener(mxEvent.TAP_AND_HOLD, mxUtils.bind(this, function(a, b) {
            if (!mxEvent.isMultiTouchEvent(b)) {
                a = b.getProperty("event");
                var c = b.getProperty("cell");
                null == c ? (a = mxUtils.convertPoint(this.container, mxEvent.getClientX(a), mxEvent.getClientY(a)), y.start(a.x, a.y)) : null != K ? this.addSelectionCells(K) : 1 < this.getSelectionCount() && this.isCellSelected(c) && this.removeSelectionCell(c);
                K = null;
                b.consume()
            }
        }));
        this.connectionHandler.selectCells = function(a, b) {
            this.graph.setSelectionCell(b ||
                a)
        };
        this.connectionHandler.constraintHandler.isStateIgnored = function(a, b) {
            var c = a.view.graph;
            return b && (c.isCellSelected(a.cell) || c.isTableRow(a.cell) && c.selectionCellsHandler.isHandled(c.model.getParent(a.cell)))
        };
        this.selectionModel.addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
            var a = this.connectionHandler.constraintHandler;
            null != a.currentFocus && a.isStateIgnored(a.currentFocus, !0) && (a.currentFocus = null, a.constraints = null, a.destroyIcons());
            a.destroyFocusHighlight()
        }));
        Graph.touchStyle &&
            this.initTouch();
        var N = this.updateMouseEvent;
        this.updateMouseEvent = function(a) {
            a = N.apply(this, arguments);
            null != a.state && this.isCellLocked(a.getCell()) && (a.state = null);
            return a
        }
    }
    this.currentTranslate = new mxPoint(0, 0)
};
Graph.touchStyle = mxClient.IS_TOUCH || mxClient.IS_FF && mxClient.IS_WIN || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints || null == window.urlParams || "1" == urlParams.touch;
Graph.fileSupport = null != window.File && null != window.FileReader && null != window.FileList && (null == window.urlParams || "0" != urlParams.filesupport);
Graph.translateDiagram = "1" == urlParams["translate-diagram"];
Graph.diagramLanguage = null != urlParams["diagram-language"] ? urlParams["diagram-language"] : mxClient.language;
Graph.lineJumpsEnabled = !0;
Graph.defaultJumpSize = 6;
Graph.minTableColumnWidth = 20;
Graph.minTableRowHeight = 20;
Graph.foreignObjectWarningText = "Viewer does not support full SVG 1.1";
Graph.foreignObjectWarningLink = "https://www.diagrams.net/doc/faq/svg-export-text-problems";
Graph.pasteStyles = "rounded shadow dashed dashPattern fontFamily fontSource fontSize fontColor fontStyle align verticalAlign strokeColor strokeWidth fillColor gradientColor swimlaneFillColor textOpacity gradientDirection glass labelBackgroundColor labelBorderColor opacity spacing spacingTop spacingLeft spacingBottom spacingRight endFill endArrow endSize targetPerimeterSpacing startFill startArrow startSize sourcePerimeterSpacing arcSize comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification comicStyle".split(" ");
Graph.createSvgImage = function(a, b, c, d, e) {
    c = unescape(encodeURIComponent('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + a + 'px" height="' + b + 'px" ' + (null != d && null != e ? 'viewBox="0 0 ' + d + " " + e + '" ' : "") + 'version="1.1">' + c + "</svg>"));
    return new mxImage("data:image/svg+xml;base64," + (window.btoa ? btoa(c) : Base64.encode(c, !0)), a, b)
};
Graph.zapGremlins = function(a) {
    for (var b = 0, c = [], d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        (32 <= e || 9 == e || 10 == e || 13 == e) && 65535 != e && 65534 != e || (c.push(a.substring(b, d)), b = d + 1)
    }
    0 < b && b < a.length && c.push(a.substring(b));
    return 0 == c.length ? a : c.join("")
};
Graph.stringToBytes = function(a) {
    for (var b = Array(a.length), c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
    return b
};
Graph.bytesToString = function(a) {
    for (var b = Array(a.length), c = 0; c < a.length; c++) b[c] = String.fromCharCode(a[c]);
    return b.join("")
};
Graph.base64EncodeUnicode = function(a) {
    return btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, function(a, c) {
        return String.fromCharCode(parseInt(c, 16))
    }))
};
Graph.base64DecodeUnicode = function(a) {
    return decodeURIComponent(Array.prototype.map.call(atob(a), function(a) {
        return "%" + ("00" + a.charCodeAt(0).toString(16)).slice(-2)
    }).join(""))
};
Graph.compressNode = function(a, b) {
    a = mxUtils.getXml(a);
    return Graph.compress(b ? a : Graph.zapGremlins(a))
};
Graph.arrayBufferToString = function(a) {
    var b = "";
    a = new Uint8Array(a);
    for (var c = a.byteLength, d = 0; d < c; d++) b += String.fromCharCode(a[d]);
    return b
};
Graph.stringToArrayBuffer = function(a) {
    return Uint8Array.from(a, function(a) {
        return a.charCodeAt(0)
    })
};
Graph.arrayBufferIndexOfString = function(a, b, c) {
    var d = b.charCodeAt(0),
        e = 1,
        f = -1;
    for (c = c || 0; c < a.byteLength; c++)
        if (a[c] == d) {
            f = c;
            break
        } for (c = f + 1; - 1 < f && c < a.byteLength && c < f + b.length - 1; c++) {
        if (a[c] != b.charCodeAt(e)) return Graph.arrayBufferIndexOfString(a, b, f + 1);
        e++
    }
    return e == b.length - 1 ? f : -1
};
Graph.compress = function(a, b) {
    if (null == a || 0 == a.length || "undefined" === typeof pako) return a;
    a = b ? pako.deflate(encodeURIComponent(a)) : pako.deflateRaw(encodeURIComponent(a));
    return btoa(Graph.arrayBufferToString(new Uint8Array(a)))
};
Graph.decompress = function(a, b, c) {
    if (null == a || 0 == a.length || "undefined" === typeof pako) return a;
    a = Graph.stringToArrayBuffer(atob(a));
    b = decodeURIComponent(b ? pako.inflate(a, {
        to: "string"
    }) : pako.inflateRaw(a, {
        to: "string"
    }));
    return c ? b : Graph.zapGremlins(b)
};
Graph.removePasteFormatting = function(a) {
    for (; null != a;) null != a.firstChild && Graph.removePasteFormatting(a.firstChild), a.nodeType == mxConstants.NODETYPE_ELEMENT && null != a.style && (a.style.whiteSpace = "", "#000000" == a.style.color && (a.style.color = "")), a = a.nextSibling
};
Graph.sanitizeHtml = function(a, b) {
    return html_sanitize(a, function(a) {
        return null != a && "javascript:" !== a.toString().toLowerCase().substring(0, 11) ? a : null
    }, function(a) {
        return a
    })
};
Graph.sanitizeSvg = function(a) {
    for (var b = a.getElementsByTagName("*"), c = 0; c < b.length; c++)
        for (var d = 0; d < b[c].attributes.length; d++) {
            var e = b[c].attributes[d];
            2 < e.name.length && "on" == e.name.toLowerCase().substring(0, 2) && b[c].removeAttribute(e.name)
        }
    for (a = a.getElementsByTagName("script"); 0 < a.length;) a[0].parentNode.removeChild(a[0])
};
Graph.clipSvgDataUri = function(a) {
    if (!mxClient.IS_IE && !mxClient.IS_IE11 && null != a && "data:image/svg+xml;base64," == a.substring(0, 26)) try {
        var b = document.createElement("div");
        b.style.position = "absolute";
        b.style.visibility = "hidden";
        var c = decodeURIComponent(escape(atob(a.substring(26)))),
            d = c.indexOf("<svg");
        if (0 <= d) {
            b.innerHTML = c.substring(d);
            Graph.sanitizeSvg(b);
            var e = b.getElementsByTagName("svg");
            if (0 < e.length) {
                document.body.appendChild(b);
                try {
                    var f = e[0].getBBox();
                    0 < f.width && 0 < f.height && (b.getElementsByTagName("svg")[0].setAttribute("viewBox",
                        f.x + " " + f.y + " " + f.width + " " + f.height), b.getElementsByTagName("svg")[0].setAttribute("width", f.width), b.getElementsByTagName("svg")[0].setAttribute("height", f.height))
                } catch (h) {} finally {
                    document.body.removeChild(b)
                }
                a = Editor.createSvgDataUri(mxUtils.getXml(e[0]))
            }
        }
    } catch (h) {}
    return a
};
Graph.stripQuotes = function(a) {
    null != a && ("'" == a.charAt(0) && (a = a.substring(1)), "'" == a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)), '"' == a.charAt(0) && (a = a.substring(1)), '"' == a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)));
    return a
};
Graph.isLink = function(a) {
    return null != a && Graph.linkPattern.test(a)
};
Graph.linkPattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
mxUtils.extend(Graph, mxGraph);
Graph.prototype.minFitScale = null;
Graph.prototype.maxFitScale = null;
Graph.prototype.linkPolicy = "frame" == urlParams.target ? "blank" : urlParams.target || "auto";
Graph.prototype.linkTarget = "frame" == urlParams.target ? "_self" : "_blank";
Graph.prototype.linkRelation = "nofollow noopener noreferrer";
Graph.prototype.defaultScrollbars = !mxClient.IS_IOS;
Graph.prototype.defaultPageVisible = !0;
Graph.prototype.defaultGridEnabled = !0;
Graph.prototype.lightbox = !1;
Graph.prototype.defaultPageBackgroundColor = "#ffffff";
Graph.prototype.defaultPageBorderColor = "#ffffff";
Graph.prototype.scrollTileSize = new mxRectangle(0, 0, 400, 400);
Graph.prototype.transparentBackground = !0;
Graph.prototype.selectParentAfterDelete = !1;
Graph.prototype.defaultEdgeLength = 80;
Graph.prototype.edgeMode = !1;
Graph.prototype.connectionArrowsEnabled = !0;
Graph.prototype.placeholderPattern = /%(date{.*}|[^%^{^}]+)%/g;
Graph.prototype.absoluteUrlPattern = /^(?:[a-z]+:)?\/\//i;
Graph.prototype.defaultThemeName = "default";
Graph.prototype.defaultThemes = {};
Graph.prototype.baseUrl = null != urlParams.base ? decodeURIComponent(urlParams.base) : (window != window.top ? document.referrer : document.location.toString()).split("#")[0];
Graph.prototype.editAfterInsert = !1;
Graph.prototype.builtInProperties = ["label", "tooltip", "placeholders", "placeholder"];
Graph.prototype.standalone = !1;
Graph.prototype.enableFlowAnimation = !1;
Graph.prototype.init = function(a) {
    mxGraph.prototype.init.apply(this, arguments);
    this.cellRenderer.initializeLabel = function(a, b) {
        mxCellRenderer.prototype.initializeLabel.apply(this, arguments);
        var c = a.view.graph.tolerance,
            f = !0,
            d = null,
            k = mxUtils.bind(this, function(a) {
                f = !0;
                d = new mxPoint(mxEvent.getClientX(a), mxEvent.getClientY(a))
            }),
            n = mxUtils.bind(this, function(a) {
                f = f && null != d && Math.abs(d.x - mxEvent.getClientX(a)) < c && Math.abs(d.y - mxEvent.getClientY(a)) < c
            }),
            m = mxUtils.bind(this, function(c) {
                if (f)
                    for (var d = mxEvent.getSource(c); null !=
                        d && d != b.node;) {
                        if ("a" == d.nodeName.toLowerCase()) {
                            a.view.graph.labelLinkClicked(a, d, c);
                            break
                        }
                        d = d.parentNode
                    }
            });
        mxEvent.addGestureListeners(b.node, k, n, m);
        mxEvent.addListener(b.node, "click", function(a) {
            mxEvent.consume(a)
        })
    };
    if (null != this.tooltipHandler) {
        var b = this.tooltipHandler.init;
        this.tooltipHandler.init = function() {
            b.apply(this, arguments);
            null != this.div && mxEvent.addListener(this.div, "click", mxUtils.bind(this, function(a) {
                var b = mxEvent.getSource(a);
                "A" == b.nodeName && (b = b.getAttribute("href"), null !=
                    b && this.graph.isCustomLink(b) && (mxEvent.isTouchEvent(a) || !mxEvent.isPopupTrigger(a)) && this.graph.customLinkClicked(b) && mxEvent.consume(a))
            }))
        }
    }
    this.addListener(mxEvent.SIZE, mxUtils.bind(this, function(a, b) {
        null != this.container && this.flowAnimationStyle && (a = this.flowAnimationStyle.getAttribute("id"), this.flowAnimationStyle.innerHTML = this.getFlowAnimationStyleCss(a))
    }));
    this.initLayoutManager()
};
(function() {
    Graph.prototype.useCssTransforms = !1;
    Graph.prototype.currentScale = 1;
    Graph.prototype.currentTranslate = new mxPoint(0, 0);
    Graph.prototype.getVerticesAndEdges = function(a, b) {
        a = null != a ? a : !0;
        b = null != b ? b : !0;
        var c = this.model;
        return c.filterDescendants(function(f) {
            return a && c.isVertex(f) || b && c.isEdge(f)
        }, c.getRoot())
    };
    Graph.prototype.getCommonStyle = function(a) {
        for (var b = {}, c = 0; c < a.length; c++) {
            var f = this.view.getState(a[c]);
            this.mergeStyle(f.style, b, 0 == c)
        }
        return b
    };
    Graph.prototype.mergeStyle = function(a,
        b, c) {
        if (null != a) {
            var f = {},
                d;
            for (d in a) {
                var e = a[d];
                null != e && (f[d] = !0, null == b[d] && c ? b[d] = e : b[d] != e && delete b[d])
            }
            for (d in b) f[d] || delete b[d]
        }
    };
    Graph.prototype.getStartEditingCell = function(a, b) {
        b = this.getCellStyle(a);
        b = parseInt(mxUtils.getValue(b, mxConstants.STYLE_STARTSIZE, 0));
        this.isTable(a) && (!this.isSwimlane(a) || 0 == b) && "" == this.getLabel(a) && 0 < this.model.getChildCount(a) && (a = this.model.getChildAt(a, 0), b = this.getCellStyle(a), b = parseInt(mxUtils.getValue(b, mxConstants.STYLE_STARTSIZE, 0)));
        if (this.isTableRow(a) &&
            (!this.isSwimlane(a) || 0 == b) && "" == this.getLabel(a) && 0 < this.model.getChildCount(a))
            for (b = 0; b < this.model.getChildCount(a); b++) {
                var c = this.model.getChildAt(a, b);
                if (this.isCellEditable(c)) {
                    a = c;
                    break
                }
            }
        return a
    };
    Graph.prototype.copyStyle = function(a) {
        var b = null;
        if (null != a) {
            b = mxUtils.clone(this.getCurrentCellStyle(a));
            a = this.model.getStyle(a);
            a = null != a ? a.split(";") : [];
            for (var c = 0; c < a.length; c++) {
                var f = a[c],
                    d = f.indexOf("=");
                if (0 <= d) {
                    var e = f.substring(0, d);
                    f = f.substring(d + 1);
                    null == b[e] && f == mxConstants.NONE &&
                        (b[e] = mxConstants.NONE)
                }
            }
        }
        return b
    };
    Graph.prototype.pasteStyle = function(a, b, c) {
        c = null != c ? c : Graph.pasteStyles;
        this.model.beginUpdate();
        try {
            for (var f = 0; f < b.length; f++)
                for (var d = this.getCurrentCellStyle(b[f]), e = 0; e < c.length; e++) {
                    var h = d[c[e]],
                        k = a[c[e]];
                    h == k || null == h && k == mxConstants.NONE || this.setCellStyles(c[e], k, [b[f]])
                }
        } finally {
            this.model.endUpdate()
        }
    };
    Graph.prototype.isFastZoomEnabled = function() {
        return "nocss" != urlParams.zoom && !mxClient.NO_FO && !mxClient.IS_EDGE && !this.useCssTransforms && this.isCssTransformsSupported()
    };
    Graph.prototype.isCssTransformsSupported = function() {
        return this.dialect == mxConstants.DIALECT_SVG && !mxClient.NO_FO && (!this.lightbox || !mxClient.IS_SF)
    };
    Graph.prototype.getCellAt = function(a, b, c, d, e, p) {
        this.useCssTransforms && (a = a / this.currentScale - this.currentTranslate.x, b = b / this.currentScale - this.currentTranslate.y);
        return this.getScaledCellAt.apply(this, arguments)
    };
    Graph.prototype.getScaledCellAt = function(a, b, c, d, e, p) {
        d = null != d ? d : !0;
        e = null != e ? e : !0;
        null == c && (c = this.getCurrentRoot(), null == c && (c = this.getModel().getRoot()));
        if (null != c)
            for (var f = this.model.getChildCount(c) - 1; 0 <= f; f--) {
                var h = this.model.getChildAt(c, f),
                    k = this.getScaledCellAt(a, b, h, d, e, p);
                if (null != k) return k;
                if (this.isCellVisible(h) && (e && this.model.isEdge(h) || d && this.model.isVertex(h)) && (k = this.view.getState(h), null != k && (null == p || !p(k, a, b)) && this.intersects(k, a, b))) return h
            }
        return null
    };
    Graph.prototype.isRecursiveVertexResize = function(a) {
        return !this.isSwimlane(a.cell) && 0 < this.model.getChildCount(a.cell) && !this.isCellCollapsed(a.cell) && "1" == mxUtils.getValue(a.style,
            "recursiveResize", "1") && null == mxUtils.getValue(a.style, "childLayout", null)
    };
    Graph.prototype.isPart = function(a) {
        return "1" == mxUtils.getValue(this.getCurrentCellStyle(a), "part", "0") || this.isTableCell(a) || this.isTableRow(a)
    };
    Graph.prototype.getCompositeParent = function(a) {
        for (; this.isPart(a);) {
            var b = this.model.getParent(a);
            if (!this.model.isVertex(b)) break;
            a = b
        }
        return a
    };
    Graph.prototype.filterSelectionCells = function(a) {
        var b = this.getSelectionCells();
        if (null != a) {
            for (var c = [], d = 0; d < b.length; d++) a(b[d]) || c.push(b[d]);
            b = c
        }
        return b
    };
    mxCellHighlight.prototype.getStrokeWidth = function(a) {
        a = this.strokeWidth;
        this.graph.useCssTransforms && (a /= this.graph.currentScale);
        return a
    };
    mxGraphView.prototype.getGraphBounds = function() {
        var a = this.graphBounds;
        if (this.graph.useCssTransforms) {
            var b = this.graph.currentTranslate,
                c = this.graph.currentScale;
            a = new mxRectangle((a.x + b.x) * c, (a.y + b.y) * c, a.width * c, a.height * c)
        }
        return a
    };
    mxGraphView.prototype.viewStateChanged = function() {
        this.graph.useCssTransforms ? this.validate() : this.revalidate();
        this.graph.sizeDidChange()
    };
    var a = mxGraphView.prototype.validate;
    mxGraphView.prototype.validate = function(b) {
        this.graph.useCssTransforms && (this.graph.currentScale = this.scale, this.graph.currentTranslate.x = this.translate.x, this.graph.currentTranslate.y = this.translate.y, this.scale = 1, this.translate.x = 0, this.translate.y = 0);
        a.apply(this, arguments);
        this.graph.useCssTransforms && (this.graph.updateCssTransform(), this.scale = this.graph.currentScale, this.translate.x = this.graph.currentTranslate.x, this.translate.y =
            this.graph.currentTranslate.y)
    };
    var b = mxGraph.prototype.getCellsForGroup;
    Graph.prototype.getCellsForGroup = function(a) {
        a = b.apply(this, arguments);
        for (var c = [], d = 0; d < a.length; d++) this.isTableRow(a[d]) || this.isTableCell(a[d]) || c.push(a[d]);
        return c
    };
    var c = mxGraph.prototype.getCellsForUngroup;
    Graph.prototype.getCellsForUngroup = function(a) {
        a = c.apply(this, arguments);
        for (var b = [], d = 0; d < a.length; d++) this.isTable(a[d]) || this.isTableRow(a[d]) || this.isTableCell(a[d]) || b.push(a[d]);
        return b
    };
    Graph.prototype.updateCssTransform =
        function() {
            var a = this.view.getDrawPane();
            if (null != a)
                if (a = a.parentNode, this.useCssTransforms) {
                    var b = a.getAttribute("transform");
                    a.setAttribute("transformOrigin", "0 0");
                    var c = Math.round(100 * this.currentScale) / 100;
                    a.setAttribute("transform", "scale(" + c + "," + c + ")translate(" + Math.round(100 * this.currentTranslate.x) / 100 + "," + Math.round(100 * this.currentTranslate.y) / 100 + ")");
                    if (b != a.getAttribute("transform")) try {
                        if (mxClient.IS_EDGE) {
                            var d = a.style.display;
                            a.style.display = "none";
                            a.getBBox();
                            a.style.display = d
                        }
                    } catch (m) {}
                } else a.removeAttribute("transformOrigin"),
                    a.removeAttribute("transform")
        };
    var d = mxGraphView.prototype.validateBackgroundPage;
    mxGraphView.prototype.validateBackgroundPage = function() {
        var a = this.graph.useCssTransforms,
            b = this.scale,
            c = this.translate;
        a && (this.scale = this.graph.currentScale, this.translate = this.graph.currentTranslate);
        d.apply(this, arguments);
        a && (this.scale = b, this.translate = c)
    };
    var e = mxGraph.prototype.updatePageBreaks;
    mxGraph.prototype.updatePageBreaks = function(a, b, c) {
        var d = this.useCssTransforms,
            f = this.view.scale,
            h = this.view.translate;
        d && (this.view.scale = 1, this.view.translate = new mxPoint(0, 0), this.useCssTransforms = !1);
        e.apply(this, arguments);
        d && (this.view.scale = f, this.view.translate = h, this.useCssTransforms = !0)
    }
})();
Graph.prototype.isLightboxView = function() {
    return this.lightbox
};
Graph.prototype.isViewer = function() {
    return !1
};
Graph.prototype.labelLinkClicked = function(a, b, c) {
    b = b.getAttribute("href");
    if (null != b && !this.isCustomLink(b) && (mxEvent.isLeftMouseButton(c) && !mxEvent.isPopupTrigger(c) || mxEvent.isTouchEvent(c))) {
        if (!this.isEnabled() || this.isCellLocked(a.cell)) a = this.isBlankLink(b) ? this.linkTarget : "_top", this.openLink(this.getAbsoluteUrl(b), a);
        mxEvent.consume(c)
    }
};
Graph.prototype.openLink = function(a, b, c) {
    var d = window;
    try {
        if ("_self" == b && window != window.top) window.location.href = a;
        else if (a.substring(0, this.baseUrl.length) == this.baseUrl && "#" == a.charAt(this.baseUrl.length) && "_top" == b && window == window.top) {
            var e = a.split("#")[1];
            window.location.hash == "#" + e && (window.location.hash = "");
            window.location.hash = e
        } else d = window.open(a, null != b ? b : "_blank"), null == d || c || (d.opener = null)
    } catch (f) {}
    return d
};
Graph.prototype.getLinkTitle = function(a) {
    return a.substring(a.lastIndexOf("/") + 1)
};
Graph.prototype.isCustomLink = function(a) {
    return "data:" == a.substring(0, 5)
};
Graph.prototype.customLinkClicked = function(a) {
    return !1
};
Graph.prototype.isExternalProtocol = function(a) {
    return "mailto:" === a.substring(0, 7)
};
Graph.prototype.isBlankLink = function(a) {
    return !this.isExternalProtocol(a) && ("blank" === this.linkPolicy || "self" !== this.linkPolicy && !this.isRelativeUrl(a) && a.substring(0, this.domainUrl.length) !== this.domainUrl)
};
Graph.prototype.isRelativeUrl = function(a) {
    return null != a && !this.absoluteUrlPattern.test(a) && "data:" !== a.substring(0, 5) && !this.isExternalProtocol(a)
};
Graph.prototype.getAbsoluteUrl = function(a) {
    null != a && this.isRelativeUrl(a) && (a = "#" == a.charAt(0) ? this.baseUrl + a : "/" == a.charAt(0) ? this.domainUrl + a : this.domainPathUrl + a);
    return a
};
Graph.prototype.initLayoutManager = function() {
    this.layoutManager = new mxLayoutManager(this);
    this.layoutManager.hasLayout = function(a, b) {
        return null != this.graph.getCellStyle(a).childLayout
    };
    this.layoutManager.getLayout = function(a, b) {
        var c = this.graph.model.getParent(a);
        if (b != mxEvent.BEGIN_UPDATE || this.hasLayout(c, b)) {
            a = this.graph.getCellStyle(a);
            if ("stackLayout" == a.childLayout) return b = new mxStackLayout(this.graph, !0), b.resizeParentMax = "1" == mxUtils.getValue(a, "resizeParentMax", "1"), b.horizontal = "1" == mxUtils.getValue(a,
                "horizontalStack", "1"), b.resizeParent = "1" == mxUtils.getValue(a, "resizeParent", "1"), b.resizeLast = "1" == mxUtils.getValue(a, "resizeLast", "0"), b.spacing = a.stackSpacing || b.spacing, b.border = a.stackBorder || b.border, b.marginLeft = a.marginLeft || 0, b.marginRight = a.marginRight || 0, b.marginTop = a.marginTop || 0, b.marginBottom = a.marginBottom || 0, b.allowGaps = a.allowGaps || 0, b.fill = !0, b.allowGaps && (b.gridSize = parseFloat(mxUtils.getValue(a, "stackUnitSize", 20))), b;
            if ("treeLayout" == a.childLayout) return b = new mxCompactTreeLayout(this.graph),
                b.horizontal = "1" == mxUtils.getValue(a, "horizontalTree", "1"), b.resizeParent = "1" == mxUtils.getValue(a, "resizeParent", "1"), b.groupPadding = mxUtils.getValue(a, "parentPadding", 20), b.levelDistance = mxUtils.getValue(a, "treeLevelDistance", 30), b.maintainParentLocation = !0, b.edgeRouting = !1, b.resetEdges = !1, b;
            if ("flowLayout" == a.childLayout) return b = new mxHierarchicalLayout(this.graph, mxUtils.getValue(a, "flowOrientation", mxConstants.DIRECTION_EAST)), b.resizeParent = "1" == mxUtils.getValue(a, "resizeParent", "1"), b.parentBorder =
                mxUtils.getValue(a, "parentPadding", 20), b.maintainParentLocation = !0, b.intraCellSpacing = mxUtils.getValue(a, "intraCellSpacing", mxHierarchicalLayout.prototype.intraCellSpacing), b.interRankCellSpacing = mxUtils.getValue(a, "interRankCellSpacing", mxHierarchicalLayout.prototype.interRankCellSpacing), b.interHierarchySpacing = mxUtils.getValue(a, "interHierarchySpacing", mxHierarchicalLayout.prototype.interHierarchySpacing), b.parallelEdgeSpacing = mxUtils.getValue(a, "parallelEdgeSpacing", mxHierarchicalLayout.prototype.parallelEdgeSpacing),
                b;
            if ("circleLayout" == a.childLayout) return new mxCircleLayout(this.graph);
            if ("organicLayout" == a.childLayout) return new mxFastOrganicLayout(this.graph);
            if ("tableLayout" == a.childLayout) return new TableLayout(this.graph)
        }
        return null
    }
};
Graph.prototype.getPageSize = function() {
    return this.pageVisible ? new mxRectangle(0, 0, this.pageFormat.width * this.pageScale, this.pageFormat.height * this.pageScale) : this.scrollTileSize
};
Graph.prototype.getPageLayout = function() {
    var a = this.getPageSize(),
        b = this.getGraphBounds();
    if (0 == b.width || 0 == b.height) return new mxRectangle(0, 0, 1, 1);
    var c = Math.floor(Math.ceil(b.x / this.view.scale - this.view.translate.x) / a.width),
        d = Math.floor(Math.ceil(b.y / this.view.scale - this.view.translate.y) / a.height);
    return new mxRectangle(c, d, Math.ceil((Math.floor((b.x + b.width) / this.view.scale) - this.view.translate.x) / a.width) - c, Math.ceil((Math.floor((b.y + b.height) / this.view.scale) - this.view.translate.y) / a.height) -
        d)
};
Graph.prototype.sanitizeHtml = function(a, b) {
    return Graph.sanitizeHtml(a, b)
};
Graph.prototype.updatePlaceholders = function() {
    var a = !1,
        b;
    for (b in this.model.cells) {
        var c = this.model.cells[b];
        this.isReplacePlaceholders(c) && (this.view.invalidate(c, !1, !1), a = !0)
    }
    a && this.view.validate()
};
Graph.prototype.isReplacePlaceholders = function(a) {
    return null != a.value && "object" == typeof a.value && "1" == a.value.getAttribute("placeholders")
};
Graph.prototype.isZoomWheelEvent = function(a) {
    return mxEvent.isAltDown(a) || mxEvent.isControlDown(a)
};
Graph.prototype.isScrollWheelEvent = function(a) {
    return !this.isZoomWheelEvent(a)
};
Graph.prototype.isTransparentClickEvent = function(a) {
    return mxEvent.isAltDown(a) || mxClient.IS_CHROMEOS && mxEvent.isShiftDown(a)
};
Graph.prototype.isIgnoreTerminalEvent = function(a) {
    return mxEvent.isShiftDown(a) && (mxEvent.isControlDown(a) || mxClient.IS_MAC && mxEvent.isMetaDown(a))
};
Graph.prototype.isEdgeIgnored = function(a) {
    var b = !1;
    null != a && (a = this.getCurrentCellStyle(a), b = "1" == mxUtils.getValue(a, "ignoreEdge", "0"));
    return b
};
Graph.prototype.isSplitTarget = function(a, b, c) {
    return !this.model.isEdge(b[0]) && !mxEvent.isAltDown(c) && !mxEvent.isShiftDown(c) && mxGraph.prototype.isSplitTarget.apply(this, arguments)
};
Graph.prototype.getLabel = function(a) {
    var b = mxGraph.prototype.getLabel.apply(this, arguments);
    null != b && this.isReplacePlaceholders(a) && null == a.getAttribute("placeholder") && (b = this.replacePlaceholders(a, b));
    return b
};
Graph.prototype.isLabelMovable = function(a) {
    var b = this.getCurrentCellStyle(a);
    return !this.isCellLocked(a) && (this.model.isEdge(a) && this.edgeLabelsMovable || this.model.isVertex(a) && (this.vertexLabelsMovable || "1" == mxUtils.getValue(b, "labelMovable", "0")))
};
Graph.prototype.setGridSize = function(a) {
    this.gridSize = a;
    this.fireEvent(new mxEventObject("gridSizeChanged"))
};
Graph.prototype.setDefaultParent = function(a) {
    this.defaultParent = a;
    this.fireEvent(new mxEventObject("defaultParentChanged"))
};
Graph.prototype.getClickableLinkForCell = function(a) {
    do {
        var b = this.getLinkForCell(a);
        if (null != b) return b;
        a = this.model.getParent(a)
    } while (null != a);
    return null
};
Graph.prototype.getGlobalVariable = function(a) {
    var b = null;
    "date" == a ? b = (new Date).toLocaleDateString() : "time" == a ? b = (new Date).toLocaleTimeString() : "timestamp" == a ? b = (new Date).toLocaleString() : "date{" == a.substring(0, 5) && (a = a.substring(5, a.length - 1), b = this.formatDate(new Date, a));
    return b
};
Graph.prototype.formatDate = function(a, b, c) {
    null == this.dateFormatCache && (this.dateFormatCache = {
        i18n: {
            dayNames: "Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            monthNames: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")
        },
        masks: {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        }
    });
    var d = this.dateFormatCache,
        e = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        f = /[^-+\dA-Z]/g,
        h = function(a, b) {
            a = String(a);
            for (b = b || 2; a.length < b;) a = "0" + a;
            return a
        };
    1 != arguments.length || "[object String]" != Object.prototype.toString.call(a) ||
        /\d/.test(a) || (b = a, a = void 0);
    a = a ? new Date(a) : new Date;
    if (isNaN(a)) throw SyntaxError("invalid date");
    b = String(d.masks[b] || b || d.masks["default"]);
    "UTC:" == b.slice(0, 4) && (b = b.slice(4), c = !0);
    var k = c ? "getUTC" : "get",
        n = a[k + "Date"](),
        m = a[k + "Day"](),
        p = a[k + "Month"](),
        q = a[k + "FullYear"](),
        r = a[k + "Hours"](),
        u = a[k + "Minutes"](),
        y = a[k + "Seconds"]();
    k = a[k + "Milliseconds"]();
    var C = c ? 0 : a.getTimezoneOffset(),
        G = {
            d: n,
            dd: h(n),
            ddd: d.i18n.dayNames[m],
            dddd: d.i18n.dayNames[m + 7],
            m: p + 1,
            mm: h(p + 1),
            mmm: d.i18n.monthNames[p],
            mmmm: d.i18n.monthNames[p +
                12],
            yy: String(q).slice(2),
            yyyy: q,
            h: r % 12 || 12,
            hh: h(r % 12 || 12),
            H: r,
            HH: h(r),
            M: u,
            MM: h(u),
            s: y,
            ss: h(y),
            l: h(k, 3),
            L: h(99 < k ? Math.round(k / 10) : k),
            t: 12 > r ? "a" : "p",
            tt: 12 > r ? "am" : "pm",
            T: 12 > r ? "A" : "P",
            TT: 12 > r ? "AM" : "PM",
            Z: c ? "UTC" : (String(a).match(e) || [""]).pop().replace(f, ""),
            o: (0 < C ? "-" : "+") + h(100 * Math.floor(Math.abs(C) / 60) + Math.abs(C) % 60, 4),
            S: ["th", "st", "nd", "rd"][3 < n % 10 ? 0 : (10 != n % 100 - n % 10) * n % 10]
        };
    return b.replace(/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, function(a) {
        return a in G ? G[a] : a.slice(1,
            a.length - 1)
    })
};
Graph.prototype.createLayersDialog = function(a) {
    var b = document.createElement("div");
    b.style.position = "absolute";
    for (var c = this.getModel(), d = c.getChildCount(c.root), e = 0; e < d; e++) mxUtils.bind(this, function(d) {
        var e = document.createElement("div");
        e.style.overflow = "hidden";
        e.style.textOverflow = "ellipsis";
        e.style.padding = "2px";
        e.style.whiteSpace = "nowrap";
        var f = document.createElement("input");
        f.style.display = "inline-block";
        f.setAttribute("type", "checkbox");
        c.isVisible(d) && (f.setAttribute("checked", "checked"),
            f.defaultChecked = !0);
        e.appendChild(f);
        var n = this.convertValueToString(d) || mxResources.get("background") || "Background";
        e.setAttribute("title", n);
        mxUtils.write(e, n);
        b.appendChild(e);
        mxEvent.addListener(f, "click", function() {
            null != f.getAttribute("checked") ? f.removeAttribute("checked") : f.setAttribute("checked", "checked");
            c.setVisible(d, f.checked);
            null != a && a(d)
        })
    })(c.getChildAt(c.root, e));
    return b
};
Graph.prototype.replacePlaceholders = function(a, b, c, d) {
    d = [];
    if (null != b) {
        for (var e = 0; match = this.placeholderPattern.exec(b);) {
            var f = match[0];
            if (2 < f.length && "%label%" != f && "%tooltip%" != f) {
                var h = null;
                if (match.index > e && "%" == b.charAt(match.index - 1)) h = f.substring(1);
                else {
                    var k = f.substring(1, f.length - 1);
                    if ("id" == k) h = a.id;
                    else if (0 > k.indexOf("{"))
                        for (var n = a; null == h && null != n;) null != n.value && "object" == typeof n.value && (Graph.translateDiagram && null != Graph.diagramLanguage && (h = n.getAttribute(k + "_" + Graph.diagramLanguage)),
                            null == h && (h = n.hasAttribute(k) ? null != n.getAttribute(k) ? n.getAttribute(k) : "" : null)), n = this.model.getParent(n);
                    null == h && (h = this.getGlobalVariable(k));
                    null == h && null != c && (h = c[k])
                }
                d.push(b.substring(e, match.index) + (null != h ? h : f));
                e = match.index + f.length
            }
        }
        d.push(b.substring(e))
    }
    return d.join("")
};
Graph.prototype.restoreSelection = function(a) {
    if (null != a && 0 < a.length) {
        for (var b = [], c = 0; c < a.length; c++) {
            var d = this.model.getCell(a[c].id);
            null != d && b.push(d)
        }
        this.setSelectionCells(b)
    } else this.clearSelection()
};
Graph.prototype.selectCellsForConnectVertex = function(a, b, c) {
    2 == a.length && this.model.isVertex(a[1]) ? (this.setSelectionCell(a[1]), this.scrollCellToVisible(a[1]), null != c && (mxEvent.isTouchEvent(b) ? c.update(c.getState(this.view.getState(a[1]))) : c.reset())) : this.setSelectionCells(a)
};
Graph.prototype.isCloneConnectSource = function(a) {
    var b = null;
    null != this.layoutManager && (b = this.layoutManager.getLayout(this.model.getParent(a)));
    return this.isTableRow(a) || this.isTableCell(a) || null != b && b.constructor == mxStackLayout
};
Graph.prototype.connectVertex = function(a, b, c, d, e, f, h, k) {
    f = f ? f : !1;
    if (a.geometry.relative && this.model.isEdge(a.parent)) return [];
    for (; a.geometry.relative && this.model.isVertex(a.parent);) a = a.parent;
    var n = this.isCloneConnectSource(a),
        m = n ? a : this.getCompositeParent(a),
        p = a.geometry.relative && null != a.parent.geometry ? new mxPoint(a.parent.geometry.width * a.geometry.x, a.parent.geometry.height * a.geometry.y) : new mxPoint(m.geometry.x, m.geometry.y);
    b == mxConstants.DIRECTION_NORTH ? (p.x += m.geometry.width / 2, p.y -= c) : b ==
        mxConstants.DIRECTION_SOUTH ? (p.x += m.geometry.width / 2, p.y += m.geometry.height + c) : (p.x = b == mxConstants.DIRECTION_WEST ? p.x - c : p.x + (m.geometry.width + c), p.y += m.geometry.height / 2);
    var q = this.view.getState(this.model.getParent(a));
    c = this.view.scale;
    var r = this.view.translate;
    m = r.x * c;
    r = r.y * c;
    null != q && this.model.isVertex(q.cell) && (m = q.x, r = q.y);
    this.model.isVertex(a.parent) && a.geometry.relative && (p.x += a.parent.geometry.x, p.y += a.parent.geometry.y);
    f = f ? null : (new mxRectangle(m + p.x * c, r + p.y * c)).grow(40);
    f = null != f ? this.getCells(0,
        0, 0, 0, null, null, f) : null;
    var u = null != f && 0 < f.length ? f.reverse()[0] : null,
        y = !1;
    null != u && this.model.isAncestor(u, a) && (y = !0, u = null);
    null == u && (f = this.getSwimlaneAt(m + p.x * c, r + p.y * c), null != f && (y = !1, u = f));
    for (f = u; null != f;) {
        if (this.isCellLocked(f)) {
            u = null;
            break
        }
        f = this.model.getParent(f)
    }
    null != u && (f = this.view.getState(a), q = this.view.getState(u), null != f && null != q && mxUtils.intersects(f, q) && (u = null));
    var C = !mxEvent.isShiftDown(d) || mxEvent.isControlDown(d) || e;
    C && ("1" != urlParams.sketch || e) && (b == mxConstants.DIRECTION_NORTH ?
        p.y -= a.geometry.height / 2 : b == mxConstants.DIRECTION_SOUTH ? p.y += a.geometry.height / 2 : p.x = b == mxConstants.DIRECTION_WEST ? p.x - a.geometry.width / 2 : p.x + a.geometry.width / 2);
    null == u || this.isCellConnectable(u) || this.isSwimlane(u) || (e = this.getModel().getParent(u), this.getModel().isVertex(e) && this.isCellConnectable(e) && (u = e));
    if (u == a || this.model.isEdge(u) || !this.isCellConnectable(u) && !this.isSwimlane(u)) u = null;
    var G = [],
        J = null != u && this.isSwimlane(u),
        E = J ? null : u;
    e = mxUtils.bind(this, function(c) {
        if (null == h || null != c ||
            null == u && n) {
            this.model.beginUpdate();
            try {
                if (null == E && C) {
                    for (var e = null != c ? c : a, f = this.getCellGeometry(e); null != f && f.relative;) e = this.getModel().getParent(e), f = this.getCellGeometry(e);
                    e = n ? a : this.getCompositeParent(e);
                    E = null != c ? c : this.duplicateCells([e], !1)[0];
                    null != c && this.addCells([E], this.model.getParent(a), null, null, null, !0);
                    f = this.getCellGeometry(E);
                    null != f && (null != c && "1" == urlParams.sketch && (b == mxConstants.DIRECTION_NORTH ? p.y -= f.height / 2 : b == mxConstants.DIRECTION_SOUTH ? p.y += f.height / 2 : p.x = b == mxConstants.DIRECTION_WEST ?
                        p.x - f.width / 2 : p.x + f.width / 2), f.x = p.x - f.width / 2, f.y = p.y - f.height / 2);
                    J ? (this.addCells([E], u, null, null, null, !0), u = null) : !C || null != u || y || n || this.addCells([E], this.getDefaultParent(), null, null, null, !0)
                }
                var q = mxEvent.isControlDown(d) && mxEvent.isShiftDown(d) && C || null == u && n ? null : this.insertEdge(this.model.getParent(a), null, "", a, E, this.createCurrentEdgeStyle());
                if (null != q && this.connectionHandler.insertBeforeSource) {
                    var r = null;
                    for (c = a; null != c.parent && null != c.geometry && c.geometry.relative && c.parent != q.parent;) c =
                        this.model.getParent(c);
                    null != c && null != c.parent && c.parent == q.parent && (r = c.parent.getIndex(c), this.model.add(c.parent, q, r))
                }
                null == u && null != E && null != a.parent && n && b == mxConstants.DIRECTION_WEST && (r = a.parent.getIndex(a), this.model.add(a.parent, E, r));
                null != q && G.push(q);
                null == u && null != E && G.push(E);
                null == E && null != q && q.geometry.setTerminalPoint(p, !1);
                null != q && this.fireEvent(new mxEventObject("cellsInserted", "cells", [q]))
            } finally {
                this.model.endUpdate()
            }
        }
        if (null != k) k(G);
        else return G
    });
    if (null == h || null != E ||
        !C || null == u && n) return e(E);
    h(m + p.x * c, r + p.y * c, e)
};
Graph.prototype.getIndexableText = function() {
    var a = document.createElement("div"),
        b = [],
        c;
    for (c in this.model.cells) {
        var d = this.model.cells[c];
        if (this.model.isVertex(d) || this.model.isEdge(d)) this.isHtmlLabel(d) ? (a.innerHTML = this.sanitizeHtml(this.getLabel(d)), d = mxUtils.extractTextWithWhitespace([a])) : d = this.getLabel(d), d = mxUtils.trim(d.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, " ")), 0 < d.length && b.push(d)
    }
    return b.join(" ")
};
Graph.prototype.convertValueToString = function(a) {
    var b = this.model.getValue(a);
    if (null != b && "object" == typeof b) {
        var c = null;
        if (this.isReplacePlaceholders(a) && null != a.getAttribute("placeholder")) {
            b = a.getAttribute("placeholder");
            for (var d = a; null == c && null != d;) null != d.value && "object" == typeof d.value && (c = d.hasAttribute(b) ? null != d.getAttribute(b) ? d.getAttribute(b) : "" : null), d = this.model.getParent(d)
        } else c = null, Graph.translateDiagram && null != Graph.diagramLanguage && (c = b.getAttribute("label_" + Graph.diagramLanguage)),
            null == c && (c = b.getAttribute("label") || "");
        return c || ""
    }
    return mxGraph.prototype.convertValueToString.apply(this, arguments)
};
Graph.prototype.getLinksForState = function(a) {
    return null != a && null != a.text && null != a.text.node ? a.text.node.getElementsByTagName("a") : null
};
Graph.prototype.getLinkForCell = function(a) {
    return null != a.value && "object" == typeof a.value ? (a = a.value.getAttribute("link"), null != a && "javascript:" === a.toLowerCase().substring(0, 11) && (a = a.substring(11)), a) : null
};
Graph.prototype.getLinkTargetForCell = function(a) {
    return null != a.value && "object" == typeof a.value ? a.value.getAttribute("linkTarget") : null
};
Graph.prototype.getCellStyle = function(a) {
    var b = mxGraph.prototype.getCellStyle.apply(this, arguments);
    if (null != a && null != this.layoutManager) {
        var c = this.model.getParent(a);
        this.model.isVertex(c) && this.isCellCollapsed(a) && (c = this.layoutManager.getLayout(c), null != c && c.constructor == mxStackLayout && (b[mxConstants.STYLE_HORIZONTAL] = !c.horizontal))
    }
    return b
};
Graph.prototype.updateAlternateBounds = function(a, b, c) {
    if (null != a && null != b && null != this.layoutManager && null != b.alternateBounds) {
        var d = this.layoutManager.getLayout(this.model.getParent(a));
        null != d && d.constructor == mxStackLayout && (d.horizontal ? b.alternateBounds.height = 0 : b.alternateBounds.width = 0)
    }
    mxGraph.prototype.updateAlternateBounds.apply(this, arguments)
};
Graph.prototype.isMoveCellsEvent = function(a, b) {
    return mxEvent.isShiftDown(a) || "1" == mxUtils.getValue(b.style, "moveCells", "0")
};
Graph.prototype.foldCells = function(a, b, c, d, e) {
    b = null != b ? b : !1;
    null == c && (c = this.getFoldableCells(this.getSelectionCells(), a));
    if (null != c) {
        this.model.beginUpdate();
        try {
            if (mxGraph.prototype.foldCells.apply(this, arguments), null != this.layoutManager)
                for (var f = 0; f < c.length; f++) {
                    var h = this.view.getState(c[f]),
                        k = this.getCellGeometry(c[f]);
                    if (null != h && null != k) {
                        var n = Math.round(k.width - h.width / this.view.scale),
                            m = Math.round(k.height - h.height / this.view.scale);
                        if (0 != m || 0 != n) {
                            var p = this.model.getParent(c[f]),
                                q = this.layoutManager.getLayout(p);
                            null == q ? null != e && this.isMoveCellsEvent(e, h) && this.moveSiblings(h, p, n, m) : null != e && mxEvent.isAltDown(e) || q.constructor != mxStackLayout || q.resizeLast || this.resizeParentStacks(p, q, n, m)
                        }
                    }
                }
        } finally {
            this.model.endUpdate()
        }
        this.isEnabled() && this.setSelectionCells(c)
    }
};
Graph.prototype.moveSiblings = function(a, b, c, d) {
    this.model.beginUpdate();
    try {
        var e = this.getCellsBeyond(a.x, a.y, b, !0, !0);
        for (b = 0; b < e.length; b++)
            if (e[b] != a.cell) {
                var f = this.view.getState(e[b]),
                    h = this.getCellGeometry(e[b]);
                null != f && null != h && (h = h.clone(), h.translate(Math.round(c * Math.max(0, Math.min(1, (f.x - a.x) / a.width))), Math.round(d * Math.max(0, Math.min(1, (f.y - a.y) / a.height)))), this.model.setGeometry(e[b], h))
            }
    } finally {
        this.model.endUpdate()
    }
};
Graph.prototype.resizeParentStacks = function(a, b, c, d) {
    if (null != this.layoutManager && null != b && b.constructor == mxStackLayout && !b.resizeLast) {
        this.model.beginUpdate();
        try {
            for (var e = b.horizontal; null != a && null != b && b.constructor == mxStackLayout && b.horizontal == e && !b.resizeLast;) {
                var f = this.getCellGeometry(a),
                    h = this.view.getState(a);
                null != h && null != f && (f = f.clone(), b.horizontal ? f.width += c + Math.min(0, h.width / this.view.scale - f.width) : f.height += d + Math.min(0, h.height / this.view.scale - f.height), this.model.setGeometry(a,
                    f));
                a = this.model.getParent(a);
                b = this.layoutManager.getLayout(a)
            }
        } finally {
            this.model.endUpdate()
        }
    }
};
Graph.prototype.isContainer = function(a) {
    var b = this.getCurrentCellStyle(a);
    return this.isSwimlane(a) ? "0" != b.container : "1" == b.container
};
Graph.prototype.isCellConnectable = function(a) {
    var b = this.getCurrentCellStyle(a);
    return null != b.connectable ? "0" != b.connectable : mxGraph.prototype.isCellConnectable.apply(this, arguments)
};
Graph.prototype.isLabelMovable = function(a) {
    var b = this.getCurrentCellStyle(a);
    return null != b.movableLabel ? "0" != b.movableLabel : mxGraph.prototype.isLabelMovable.apply(this, arguments)
};
Graph.prototype.selectAll = function(a) {
    a = a || this.getDefaultParent();
    this.isCellLocked(a) || mxGraph.prototype.selectAll.apply(this, arguments)
};
Graph.prototype.selectCells = function(a, b, c) {
    c = c || this.getDefaultParent();
    this.isCellLocked(c) || mxGraph.prototype.selectCells.apply(this, arguments)
};
Graph.prototype.getSwimlaneAt = function(a, b, c) {
    var d = mxGraph.prototype.getSwimlaneAt.apply(this, arguments);
    this.isCellLocked(d) && (d = null);
    return d
};
Graph.prototype.isCellFoldable = function(a) {
    var b = this.getCurrentCellStyle(a);
    return this.foldingEnabled && ("1" == b.treeFolding || !this.isCellLocked(a) && (this.isContainer(a) && "0" != b.collapsible || !this.isContainer(a) && "1" == b.collapsible))
};
Graph.prototype.reset = function() {
    this.isEditing() && this.stopEditing(!0);
    this.escape();
    this.isSelectionEmpty() || this.clearSelection()
};
Graph.prototype.zoom = function(a, b) {
    a = Math.max(.01, Math.min(this.view.scale * a, 160)) / this.view.scale;
    mxGraph.prototype.zoom.apply(this, arguments)
};
Graph.prototype.zoomIn = function() {
    .15 > this.view.scale ? this.zoom((this.view.scale + .01) / this.view.scale) : this.zoom(Math.round(this.view.scale * this.zoomFactor * 20) / 20 / this.view.scale)
};
Graph.prototype.zoomOut = function() {
    .15 >= this.view.scale ? this.zoom((this.view.scale - .01) / this.view.scale) : this.zoom(Math.round(1 / this.zoomFactor * this.view.scale * 20) / 20 / this.view.scale)
};
Graph.prototype.fitWindow = function(a, b) {
    b = null != b ? b : 10;
    var c = this.container.clientWidth - b,
        d = this.container.clientHeight - b,
        e = Math.floor(20 * Math.min(c / a.width, d / a.height)) / 20;
    this.zoomTo(e);
    if (mxUtils.hasScrollbars(this.container)) {
        var f = this.view.translate;
        this.container.scrollTop = (a.y + f.y) * e - Math.max((d - a.height * e) / 2 + b / 2, 0);
        this.container.scrollLeft = (a.x + f.x) * e - Math.max((c - a.width * e) / 2 + b / 2, 0)
    }
};
Graph.prototype.getTooltipForCell = function(a) {
    var b = "";
    if (mxUtils.isNode(a.value)) {
        var c = null;
        Graph.translateDiagram && null != Graph.diagramLanguage && (c = a.value.getAttribute("tooltip_" + Graph.diagramLanguage));
        null == c && (c = a.value.getAttribute("tooltip"));
        if (null != c) null != c && this.isReplacePlaceholders(a) && (c = this.replacePlaceholders(a, c)), b = this.sanitizeHtml(c);
        else {
            c = this.builtInProperties;
            a = a.value.attributes;
            var d = [];
            this.isEnabled() && (c.push("linkTarget"), c.push("link"));
            for (var e = 0; e < a.length; e++) 0 >
                mxUtils.indexOf(c, a[e].nodeName) && 0 < a[e].nodeValue.length && d.push({
                    name: a[e].nodeName,
                    value: a[e].nodeValue
                });
            d.sort(function(a, b) {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            });
            for (e = 0; e < d.length; e++) "link" == d[e].name && this.isCustomLink(d[e].value) || (b += ("link" != d[e].name ? "<b>" + d[e].name + ":</b> " : "") + mxUtils.htmlEntities(d[e].value) + "\n");
            0 < b.length && (b = b.substring(0, b.length - 1), mxClient.IS_SVG && (b = '<div style="max-width:360px;text-overflow:ellipsis;overflow:hidden;">' + b + "</div>"))
        }
    }
    return b
};
Graph.prototype.getFlowAnimationStyle = function() {
    var a = document.getElementsByTagName("head")[0];
    if (null != a && null == this.flowAnimationStyle) {
        this.flowAnimationStyle = document.createElement("style");
        this.flowAnimationStyle.setAttribute("id", "geEditorFlowAnimation-" + Editor.guid());
        this.flowAnimationStyle.type = "text/css";
        var b = this.flowAnimationStyle.getAttribute("id");
        this.flowAnimationStyle.innerHTML = this.getFlowAnimationStyleCss(b);
        a.appendChild(this.flowAnimationStyle)
    }
    return this.flowAnimationStyle
};
Graph.prototype.getFlowAnimationStyleCss = function(a) {
    return "." + a + " {\nanimation: " + a + " 0.5s linear;\nanimation-iteration-count: infinite;\n}\n@keyframes " + a + " {\nto {\nstroke-dashoffset: " + -16 * this.view.scale + ";\n}\n}"
};
Graph.prototype.stringToBytes = function(a) {
    return Graph.stringToBytes(a)
};
Graph.prototype.bytesToString = function(a) {
    return Graph.bytesToString(a)
};
Graph.prototype.compressNode = function(a) {
    return Graph.compressNode(a)
};
Graph.prototype.compress = function(a, b) {
    return Graph.compress(a, b)
};
Graph.prototype.decompress = function(a, b) {
    return Graph.decompress(a, b)
};
Graph.prototype.zapGremlins = function(a) {
    return Graph.zapGremlins(a)
};
HoverIcons = function(a) {
    this.graph = a;
    this.init()
};
HoverIcons.prototype.arrowSpacing = 2;
HoverIcons.prototype.updateDelay = 500;
HoverIcons.prototype.activationDelay = 140;
HoverIcons.prototype.currentState = null;
HoverIcons.prototype.activeArrow = null;
HoverIcons.prototype.inactiveOpacity = 15;
HoverIcons.prototype.cssCursor = "copy";
HoverIcons.prototype.checkCollisions = !0;
HoverIcons.prototype.arrowFill = "#29b6f2";
HoverIcons.prototype.triangleUp = mxClient.IS_SVG ? Graph.createSvgImage(18, 28, '<path d="m 6 26 L 12 26 L 12 12 L 18 12 L 9 1 L 1 12 L 6 12 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + "/triangle-up.png", 26, 14);
HoverIcons.prototype.triangleRight = mxClient.IS_SVG ? Graph.createSvgImage(26, 18, '<path d="m 1 6 L 14 6 L 14 1 L 26 9 L 14 18 L 14 12 L 1 12 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + "/triangle-right.png", 14, 26);
HoverIcons.prototype.triangleDown = mxClient.IS_SVG ? Graph.createSvgImage(18, 26, '<path d="m 6 1 L 6 14 L 1 14 L 9 26 L 18 14 L 12 14 L 12 1 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + "/triangle-down.png", 26, 14);
HoverIcons.prototype.triangleLeft = mxClient.IS_SVG ? Graph.createSvgImage(28, 18, '<path d="m 1 9 L 12 1 L 12 6 L 26 6 L 26 12 L 12 12 L 12 18 z" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + "/triangle-left.png", 14, 26);
HoverIcons.prototype.roundDrop = mxClient.IS_SVG ? Graph.createSvgImage(26, 26, '<circle cx="13" cy="13" r="12" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '"/>') : new mxImage(IMAGE_PATH + "/round-drop.png", 26, 26);
HoverIcons.prototype.refreshTarget = new mxImage(mxClient.IS_SVG ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2cHgiIGhlaWdodD0iMzZweCI+PGVsbGlwc2UgZmlsbD0iIzI5YjZmMiIgY3g9IjEyIiBjeT0iMTIiIHJ4PSIxMiIgcnk9IjEyIi8+PHBhdGggdHJhbnNmb3JtPSJzY2FsZSgwLjgpIHRyYW5zbGF0ZSgyLjQsIDIuNCkiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iI2ZmZiIgZD0iTTEyIDZ2M2w0LTQtNC00djNjLTQuNDIgMC04IDMuNTgtOCA4IDAgMS41Ny40NiAzLjAzIDEuMjQgNC4yNkw2LjcgMTQuOGMtLjQ1LS44My0uNy0xLjc5LS43LTIuOCAwLTMuMzEgMi42OS02IDYtNnptNi43NiAxLjc0TDE3LjMgOS4yYy40NC44NC43IDEuNzkuNyAyLjggMCAzLjMxLTIuNjkgNi02IDZ2LTNsLTQgNCA0IDR2LTNjNC40MiAwIDgtMy41OCA4LTggMC0xLjU3LS40Ni0zLjAzLTEuMjQtNC4yNnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+Cg==" :
    IMAGE_PATH + "/refresh.png", 38, 38);
HoverIcons.prototype.tolerance = mxClient.IS_TOUCH ? 6 : 0;
HoverIcons.prototype.init = function() {
    this.arrowUp = this.createArrow(this.triangleUp, mxResources.get("plusTooltip"));
    this.arrowRight = this.createArrow(this.triangleRight, mxResources.get("plusTooltip"));
    this.arrowDown = this.createArrow(this.triangleDown, mxResources.get("plusTooltip"));
    this.arrowLeft = this.createArrow(this.triangleLeft, mxResources.get("plusTooltip"));
    this.elts = [this.arrowUp, this.arrowRight, this.arrowDown, this.arrowLeft];
    this.resetHandler = mxUtils.bind(this, function() {
        this.reset()
    });
    this.repaintHandler =
        mxUtils.bind(this, function() {
            this.repaint()
        });
    this.graph.selectionModel.addListener(mxEvent.CHANGE, this.resetHandler);
    this.graph.model.addListener(mxEvent.CHANGE, this.repaintHandler);
    this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE, this.repaintHandler);
    this.graph.view.addListener(mxEvent.TRANSLATE, this.repaintHandler);
    this.graph.view.addListener(mxEvent.SCALE, this.repaintHandler);
    this.graph.view.addListener(mxEvent.DOWN, this.repaintHandler);
    this.graph.view.addListener(mxEvent.UP, this.repaintHandler);
    this.graph.addListener(mxEvent.ROOT, this.repaintHandler);
    this.graph.addListener(mxEvent.ESCAPE, this.resetHandler);
    mxEvent.addListener(this.graph.container, "scroll", this.resetHandler);
    this.graph.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function() {
        this.mouseDownPoint = null
    }));
    mxEvent.addListener(this.graph.container, "mouseleave", mxUtils.bind(this, function(a) {
        null != a.relatedTarget && mxEvent.getSource(a) == this.graph.container && this.setDisplay("none")
    }));
    this.graph.addListener(mxEvent.START_EDITING,
        mxUtils.bind(this, function(a) {
            this.reset()
        }));
    var a = this.graph.click;
    this.graph.click = mxUtils.bind(this, function(b) {
        a.apply(this.graph, arguments);
        null == this.currentState || this.graph.isCellSelected(this.currentState.cell) || !mxEvent.isTouchEvent(b.getEvent()) || this.graph.model.isVertex(b.getCell()) || this.reset()
    });
    var b = !1;
    this.graph.addMouseListener({
        mouseDown: mxUtils.bind(this, function(a, d) {
            b = !1;
            a = d.getEvent();
            this.isResetEvent(a) ? this.reset() : this.isActive() || (d = this.getState(d.getState()), null ==
                d && mxEvent.isTouchEvent(a) || this.update(d));
            this.setDisplay("none")
        }),
        mouseMove: mxUtils.bind(this, function(a, d) {
            a = d.getEvent();
            this.isResetEvent(a) ? this.reset() : this.graph.isMouseDown || mxEvent.isTouchEvent(a) || this.update(this.getState(d.getState()), d.getGraphX(), d.getGraphY());
            null != this.graph.connectionHandler && null != this.graph.connectionHandler.shape && (b = !0)
        }),
        mouseUp: mxUtils.bind(this, function(a, d) {
            a = d.getEvent();
            mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(a), mxEvent.getClientY(a));
            this.isResetEvent(a) ? this.reset() : this.isActive() && !b && null != this.mouseDownPoint ? this.click(this.currentState, this.getDirection(), d) : this.isActive() ? 1 == this.graph.getSelectionCount() && this.graph.model.isEdge(this.graph.getSelectionCell()) ? this.reset() : this.update(this.getState(this.graph.view.getState(this.graph.getCellAt(d.getGraphX(), d.getGraphY())))) : mxEvent.isTouchEvent(a) || null != this.bbox && mxUtils.contains(this.bbox, d.getGraphX(), d.getGraphY()) ? (this.setDisplay(""), this.repaint()) : mxEvent.isTouchEvent(a) ||
                this.reset();
            b = !1;
            this.resetActiveArrow()
        })
    })
};
HoverIcons.prototype.isResetEvent = function(a, b) {
    return mxEvent.isAltDown(a) || null == this.activeArrow && mxEvent.isShiftDown(a) || mxEvent.isPopupTrigger(a) && !this.graph.isCloneEvent(a)
};
HoverIcons.prototype.createArrow = function(a, b) {
    var c = null;
    c = mxUtils.createImage(a.src);
    c.style.width = a.width + "px";
    c.style.height = a.height + "px";
    c.style.padding = this.tolerance + "px";
    null != b && c.setAttribute("title", b);
    c.style.position = "absolute";
    c.style.cursor = this.cssCursor;
    mxEvent.addGestureListeners(c, mxUtils.bind(this, function(a) {
        null == this.currentState || this.isResetEvent(a) || (this.mouseDownPoint = mxUtils.convertPoint(this.graph.container, mxEvent.getClientX(a), mxEvent.getClientY(a)), this.drag(a, this.mouseDownPoint.x,
            this.mouseDownPoint.y), this.activeArrow = c, this.setDisplay("none"), mxEvent.consume(a))
    }));
    mxEvent.redirectMouseEvents(c, this.graph, this.currentState);
    mxEvent.addListener(c, "mouseenter", mxUtils.bind(this, function(a) {
        mxEvent.isMouseEvent(a) && (null != this.activeArrow && this.activeArrow != c && mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity), this.graph.connectionHandler.constraintHandler.reset(), mxUtils.setOpacity(c, 100), this.activeArrow = c)
    }));
    mxEvent.addListener(c, "mouseleave", mxUtils.bind(this, function(a) {
        this.graph.isMouseDown ||
            this.resetActiveArrow()
    }));
    return c
};
HoverIcons.prototype.resetActiveArrow = function() {
    null != this.activeArrow && (mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity), this.activeArrow = null)
};
HoverIcons.prototype.getDirection = function() {
    var a = mxConstants.DIRECTION_EAST;
    this.activeArrow == this.arrowUp ? a = mxConstants.DIRECTION_NORTH : this.activeArrow == this.arrowDown ? a = mxConstants.DIRECTION_SOUTH : this.activeArrow == this.arrowLeft && (a = mxConstants.DIRECTION_WEST);
    return a
};
HoverIcons.prototype.visitNodes = function(a) {
    for (var b = 0; b < this.elts.length; b++) null != this.elts[b] && a(this.elts[b])
};
HoverIcons.prototype.removeNodes = function() {
    this.visitNodes(function(a) {
        null != a.parentNode && a.parentNode.removeChild(a)
    })
};
HoverIcons.prototype.setDisplay = function(a) {
    this.visitNodes(function(b) {
        b.style.display = a
    })
};
HoverIcons.prototype.isActive = function() {
    return null != this.activeArrow && null != this.currentState
};
HoverIcons.prototype.drag = function(a, b, c) {
    this.graph.popupMenuHandler.hideMenu();
    this.graph.stopEditing(!1);
    null != this.currentState && (this.graph.connectionHandler.start(this.currentState, b, c), this.graph.isMouseTrigger = mxEvent.isMouseEvent(a), this.graph.isMouseDown = !0, b = this.graph.selectionCellsHandler.getHandler(this.currentState.cell), null != b && b.setHandlesVisible(!1), b = this.graph.connectionHandler.edgeState, null != a && mxEvent.isShiftDown(a) && mxEvent.isControlDown(a) && null != b && "orthogonalEdgeStyle" ===
        mxUtils.getValue(b.style, mxConstants.STYLE_EDGE, null) && (a = this.getDirection(), b.cell.style = mxUtils.setStyle(b.cell.style, "sourcePortConstraint", a), b.style.sourcePortConstraint = a))
};
HoverIcons.prototype.getStateAt = function(a, b, c) {
    return this.graph.view.getState(this.graph.getCellAt(b, c))
};
HoverIcons.prototype.click = function(a, b, c) {
    var d = c.getEvent(),
        e = c.getGraphX(),
        f = c.getGraphY();
    e = this.getStateAt(a, e, f);
    null == e || !this.graph.model.isEdge(e.cell) || this.graph.isCloneEvent(d) || e.getVisibleTerminalState(!0) != a && e.getVisibleTerminalState(!1) != a ? null != a && this.execute(a, b, c) : (this.graph.setSelectionCell(e.cell), this.reset());
    c.consume()
};
HoverIcons.prototype.execute = function(a, b, c) {
    c = c.getEvent();
    this.graph.selectCellsForConnectVertex(this.graph.connectVertex(a.cell, b, this.graph.defaultEdgeLength, c, this.graph.isCloneEvent(c), this.graph.isCloneEvent(c)), c, this)
};
HoverIcons.prototype.reset = function(a) {
    null != a && !a || null == this.updateThread || window.clearTimeout(this.updateThread);
    this.activeArrow = this.currentState = this.mouseDownPoint = null;
    this.removeNodes();
    this.bbox = null
};
HoverIcons.prototype.repaint = function() {
    this.bbox = null;
    if (null != this.currentState) {
        this.currentState = this.getState(this.currentState);
        if (null != this.currentState && this.graph.model.isVertex(this.currentState.cell) && this.graph.isCellConnectable(this.currentState.cell)) {
            var a = mxRectangle.fromRectangle(this.currentState);
            null != this.currentState.shape && null != this.currentState.shape.boundingBox && (a = mxRectangle.fromRectangle(this.currentState.shape.boundingBox));
            a.grow(this.graph.tolerance);
            a.grow(this.arrowSpacing);
            var b = this.graph.selectionCellsHandler.getHandler(this.currentState.cell);
            this.graph.isTableRow(this.currentState.cell) && (b = this.graph.selectionCellsHandler.getHandler(this.graph.model.getParent(this.currentState.cell)));
            var c = null;
            null != b && (a.x -= b.horizontalOffset / 2, a.y -= b.verticalOffset / 2, a.width += b.horizontalOffset, a.height += b.verticalOffset, null != b.rotationShape && null != b.rotationShape.node && "hidden" != b.rotationShape.node.style.visibility && "none" != b.rotationShape.node.style.display && null != b.rotationShape.boundingBox &&
                (c = b.rotationShape.boundingBox));
            b = mxUtils.bind(this, function(a, b, d) {
                if (null != c) {
                    var e = new mxRectangle(b, d, a.clientWidth, a.clientHeight);
                    mxUtils.intersects(e, c) && (a == this.arrowUp ? d -= e.y + e.height - c.y : a == this.arrowRight ? b += c.x + c.width - e.x : a == this.arrowDown ? d += c.y + c.height - e.y : a == this.arrowLeft && (b -= e.x + e.width - c.x))
                }
                a.style.left = b + "px";
                a.style.top = d + "px";
                mxUtils.setOpacity(a, this.inactiveOpacity)
            });
            b(this.arrowUp, Math.round(this.currentState.getCenterX() - this.triangleUp.width / 2 - this.tolerance), Math.round(a.y -
                this.triangleUp.height - this.tolerance));
            b(this.arrowRight, Math.round(a.x + a.width - this.tolerance), Math.round(this.currentState.getCenterY() - this.triangleRight.height / 2 - this.tolerance));
            b(this.arrowDown, parseInt(this.arrowUp.style.left), Math.round(a.y + a.height - this.tolerance));
            b(this.arrowLeft, Math.round(a.x - this.triangleLeft.width - this.tolerance), parseInt(this.arrowRight.style.top));
            if (this.checkCollisions) {
                b = this.graph.getCellAt(a.x + a.width + this.triangleRight.width / 2, this.currentState.getCenterY());
                var d = this.graph.getCellAt(a.x - this.triangleLeft.width / 2, this.currentState.getCenterY()),
                    e = this.graph.getCellAt(this.currentState.getCenterX(), a.y - this.triangleUp.height / 2);
                a = this.graph.getCellAt(this.currentState.getCenterX(), a.y + a.height + this.triangleDown.height / 2);
                null != b && b == d && d == e && e == a && (a = e = d = b = null);
                var f = this.graph.getCellGeometry(this.currentState.cell),
                    h = mxUtils.bind(this, function(a, b) {
                        var c = this.graph.model.isVertex(a) && this.graph.getCellGeometry(a);
                        null == a || this.graph.model.isAncestor(a,
                            this.currentState.cell) || this.graph.isSwimlane(a) || !(null == c || null == f || c.height < 3 * f.height && c.width < 3 * f.width) ? b.style.visibility = "visible" : b.style.visibility = "hidden"
                    });
                h(b, this.arrowRight);
                h(d, this.arrowLeft);
                h(e, this.arrowUp);
                h(a, this.arrowDown)
            } else this.arrowLeft.style.visibility = "visible", this.arrowRight.style.visibility = "visible", this.arrowUp.style.visibility = "visible", this.arrowDown.style.visibility = "visible";
            this.graph.tooltipHandler.isEnabled() ? (this.arrowLeft.setAttribute("title", mxResources.get("plusTooltip")),
                this.arrowRight.setAttribute("title", mxResources.get("plusTooltip")), this.arrowUp.setAttribute("title", mxResources.get("plusTooltip")), this.arrowDown.setAttribute("title", mxResources.get("plusTooltip"))) : (this.arrowLeft.removeAttribute("title"), this.arrowRight.removeAttribute("title"), this.arrowUp.removeAttribute("title"), this.arrowDown.removeAttribute("title"))
        } else this.reset();
        null != this.currentState && (this.bbox = this.computeBoundingBox(), null != this.bbox && this.bbox.grow(10))
    }
};
HoverIcons.prototype.computeBoundingBox = function() {
    var a = this.graph.model.isEdge(this.currentState.cell) ? null : mxRectangle.fromRectangle(this.currentState);
    this.visitNodes(function(b) {
        null != b.parentNode && (b = new mxRectangle(b.offsetLeft, b.offsetTop, b.offsetWidth, b.offsetHeight), null == a ? a = b : a.add(b))
    });
    return a
};
HoverIcons.prototype.getState = function(a) {
    if (null != a)
        if (a = a.cell, this.graph.getModel().contains(a)) {
            if (this.graph.getModel().isVertex(a) && !this.graph.isCellConnectable(a)) {
                var b = this.graph.getModel().getParent(a);
                this.graph.getModel().isVertex(b) && this.graph.isCellConnectable(b) && (a = b)
            }
            if (this.graph.isCellLocked(a) || this.graph.model.isEdge(a)) a = null;
            a = this.graph.view.getState(a);
            null != a && null == a.style && (a = null)
        } else a = null;
    return a
};
HoverIcons.prototype.update = function(a, b, c) {
    if (!this.graph.connectionArrowsEnabled || null != a && "0" == mxUtils.getValue(a.style, "allowArrows", "1")) this.reset();
    else {
        null != a && null != a.cell.geometry && a.cell.geometry.relative && this.graph.model.isEdge(a.cell.parent) && (a = null);
        var d = null;
        this.prev != a || this.isActive() ? (this.startTime = (new Date).getTime(), this.prev = a, d = 0, null != this.updateThread && window.clearTimeout(this.updateThread), null != a && (this.updateThread = window.setTimeout(mxUtils.bind(this, function() {
            this.isActive() ||
                this.graph.isMouseDown || this.graph.panningHandler.isActive() || (this.prev = a, this.update(a, b, c))
        }), this.updateDelay + 10))) : null != this.startTime && (d = (new Date).getTime() - this.startTime);
        this.setDisplay("");
        null != this.currentState && this.currentState != a && d < this.activationDelay && null != this.bbox && !mxUtils.contains(this.bbox, b, c) ? this.reset(!1) : (null != this.currentState || d > this.activationDelay) && this.currentState != a && (d > this.updateDelay && null != a || null == this.bbox || null == b || null == c || !mxUtils.contains(this.bbox,
            b, c)) && (null != a && this.graph.isEnabled() ? (this.removeNodes(), this.setCurrentState(a), this.repaint(), this.graph.connectionHandler.constraintHandler.currentFocus != a && this.graph.connectionHandler.constraintHandler.reset()) : this.reset())
    }
};
HoverIcons.prototype.setCurrentState = function(a) {
    "eastwest" != a.style.portConstraint && (this.graph.container.appendChild(this.arrowUp), this.graph.container.appendChild(this.arrowDown));
    this.graph.container.appendChild(this.arrowRight);
    this.graph.container.appendChild(this.arrowLeft);
    this.currentState = a
};
Graph.prototype.createParent = function(a, b, c, d, e) {
    a = this.cloneCell(a);
    for (var f = 0; f < c; f++) {
        var h = this.cloneCell(b),
            k = this.getCellGeometry(h);
        null != k && (k.x += f * d, k.y += f * e);
        a.insert(h)
    }
    return a
};
Graph.prototype.createTable = function(a, b, c, d, e, f, h, k, n) {
    c = null != c ? c : 60;
    d = null != d ? d : 40;
    f = null != f ? f : 30;
    k = null != k ? k : "shape=partialRectangle;html=1;whiteSpace=wrap;collapsible=0;dropTarget=0;pointerEvents=0;fillColor=none;top=0;left=0;bottom=0;right=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;";
    n = null != n ? n : "shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=none;top=0;left=0;bottom=0;right=0;";
    return this.createParent(this.createVertex(null, null, null != e ? e : "",
        0, 0, b * c, a * d + (null != e ? f : 0), null != h ? h : "shape=table;html=1;whiteSpace=wrap;startSize=" + (null != e ? f : "0") + ";container=1;collapsible=0;childLayout=tableLayout;"), this.createParent(this.createVertex(null, null, "", 0, 0, b * c, d, k), this.createVertex(null, null, "", 0, 0, c, d, n), b, c, 0), a, 0, d)
};
Graph.prototype.setTableValues = function(a, b, c) {
    for (var d = this.model.getChildCells(a, !0), e = 0; e < d.length; e++)
        if (null != c && (d[e].value = c[e]), null != b)
            for (var f = this.model.getChildCells(d[e], !0), h = 0; h < f.length; h++) null != b[e][h] && (f[h].value = b[e][h]);
    return a
};
Graph.prototype.createCrossFunctionalSwimlane = function(a, b, c, d, e, f, h, k, n) {
    c = null != c ? c : 120;
    d = null != d ? d : 120;
    e = null != e ? e : 40;
    h = null != h ? h : "swimlane;horizontal=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;startSize=" + e + ";html=1;whiteSpace=wrap;collapsible=0;recursiveResize=0;expand=0;pointerEvents=0;";
    k = null != k ? k : "swimlane;connectable=0;startSize=40;html=1;whiteSpace=wrap;collapsible=0;recursiveResize=0;expand=0;pointerEvents=0;";
    n = null != n ? n : "swimlane;connectable=0;startSize=0;html=1;whiteSpace=wrap;collapsible=0;recursiveResize=0;expand=0;pointerEvents=0;";
    e = this.createVertex(null, null, "", 0, 0, b * c, a * d, null != f ? f : "shape=table;childLayout=tableLayout;rowLines=0;columnLines=0;startSize=" + e + ";html=1;whiteSpace=wrap;collapsible=0;recursiveResize=0;expand=0;pointerEvents=0;");
    f = mxUtils.getValue(this.getCellStyle(e), mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE);
    e.geometry.width += f;
    e.geometry.height += f;
    h = this.createVertex(null, null, "", 0, f, b * c + f, d, h);
    e.insert(this.createParent(h, this.createVertex(null, null, "", f, 0, c, d, k), b, c, 0));
    return 1 < a ? (h.geometry.y =
        d + f, this.createParent(e, this.createParent(h, this.createVertex(null, null, "", f, 0, c, d, n), b, c, 0), a - 1, 0, d)) : e
};
Graph.prototype.isTableCell = function(a) {
    return this.model.isVertex(a) && this.isTableRow(this.model.getParent(a))
};
Graph.prototype.isTableRow = function(a) {
    return this.model.isVertex(a) && this.isTable(this.model.getParent(a))
};
Graph.prototype.isTable = function(a) {
    a = this.getCellStyle(a);
    return null != a && "tableLayout" == a.childLayout
};
Graph.prototype.setTableRowHeight = function(a, b, c) {
    c = null != c ? c : !0;
    var d = this.getModel();
    d.beginUpdate();
    try {
        var e = this.getCellGeometry(a);
        if (null != e) {
            e = e.clone();
            e.height += b;
            d.setGeometry(a, e);
            var f = d.getParent(a),
                h = d.getChildCells(f, !0);
            if (!c) {
                var k = mxUtils.indexOf(h, a);
                if (k < h.length - 1) {
                    var n = h[k + 1],
                        m = this.getCellGeometry(n);
                    null != m && (m = m.clone(), m.y += b, m.height -= b, d.setGeometry(n, m))
                }
            }
            var p = this.getCellGeometry(f);
            null != p && (c || (c = a == h[h.length - 1]), c && (p = p.clone(), p.height += b, d.setGeometry(f, p)));
            null != this.layoutManager && this.layoutManager.executeLayout(f, !0)
        }
    } finally {
        d.endUpdate()
    }
};
Graph.prototype.setTableColumnWidth = function(a, b, c) {
    c = null != c ? c : !1;
    var d = this.getModel(),
        e = d.getParent(a),
        f = d.getParent(e),
        h = d.getChildCells(e, !0);
    a = mxUtils.indexOf(h, a);
    var k = a == h.length - 1;
    d.beginUpdate();
    try {
        for (var n = d.getChildCells(f, !0), m = 0; m < n.length; m++) {
            e = n[m];
            h = d.getChildCells(e, !0);
            var p = h[a],
                q = this.getCellGeometry(p);
            null != q && (q = q.clone(), q.width += b, d.setGeometry(p, q));
            a < h.length - 1 && (p = h[a + 1], q = this.getCellGeometry(p), null != q && (q = q.clone(), q.x += b, c || (q.width -= b), d.setGeometry(p, q)))
        }
        if (k ||
            c) {
            var r = this.getCellGeometry(f);
            null != r && (r = r.clone(), r.width += b, d.setGeometry(f, r))
        }
        null != this.layoutManager && this.layoutManager.executeLayout(f, !0)
    } finally {
        d.endUpdate()
    }
};

function TableLayout(a) {
    mxGraphLayout.call(this, a)
}
TableLayout.prototype = new mxStackLayout;
TableLayout.prototype.constructor = TableLayout;
TableLayout.prototype.isHorizontal = function() {
    return !1
};
TableLayout.prototype.isVertexIgnored = function(a) {
    return !this.graph.getModel().isVertex(a) || !this.graph.isCellVisible(a)
};
TableLayout.prototype.getSize = function(a, b) {
    for (var c = 0, d = 0; d < a.length; d++)
        if (!this.isVertexIgnored(a[d])) {
            var e = this.graph.getCellGeometry(a[d]);
            null != e && (c += b ? e.width : e.height)
        } return c
};
TableLayout.prototype.getRowLayout = function(a, b) {
    var c = this.graph.model.getChildCells(a, !0),
        d = this.graph.getActualStartSize(a, !0);
    a = this.getSize(c, !0);
    b = b - d.x - d.width;
    var e = [];
    d = d.x;
    for (var f = 0; f < c.length; f++) {
        var h = this.graph.getCellGeometry(c[f]);
        null != h && (d += h.width * b / a, e.push(Math.round(d)))
    }
    return e
};
TableLayout.prototype.layoutRow = function(a, b, c, d) {
    var e = this.graph.getModel(),
        f = e.getChildCells(a, !0);
    a = this.graph.getActualStartSize(a, !0);
    var h = a.x,
        k = 0;
    null != b && (b = b.slice(), b.splice(0, 0, a.x));
    for (var n = 0; n < f.length; n++) {
        var m = this.graph.getCellGeometry(f[n]);
        null != m && (m = m.clone(), m.y = a.y, m.height = c - a.y - a.height, null != b ? (m.x = b[n], m.width = b[n + 1] - m.x, n == f.length - 1 && n < b.length - 2 && (m.width = d - m.x - a.x - a.width)) : (m.x = h, h += m.width, n == f.length - 1 ? m.width = d - a.x - a.width - k : k += m.width), e.setGeometry(f[n], m))
    }
    return k
};
TableLayout.prototype.execute = function(a) {
    if (null != a) {
        var b = this.graph.getActualStartSize(a, !0),
            c = this.graph.getCellGeometry(a),
            d = this.graph.getCellStyle(a),
            e = "1" == mxUtils.getValue(d, "resizeLastRow", "0"),
            f = "1" == mxUtils.getValue(d, "resizeLast", "0");
        d = "1" == mxUtils.getValue(d, "fixedRows", "0");
        var h = this.graph.getModel(),
            k = 0;
        h.beginUpdate();
        try {
            var n = c.height - b.y - b.height,
                m = c.width - b.x - b.width,
                p = h.getChildCells(a, !0),
                q = this.getSize(p, !1);
            if (0 < n && 0 < m && 0 < p.length && 0 < q) {
                if (e) {
                    var r = this.graph.getCellGeometry(p[p.length -
                        1]);
                    null != r && (r = r.clone(), r.height = n - q + r.height, h.setGeometry(p[p.length - 1], r))
                }
                for (var u = f ? null : this.getRowLayout(p[0], m), y = b.y, C = 0; C < p.length; C++) r = this.graph.getCellGeometry(p[C]), null != r && (r = r.clone(), r.x = b.x, r.width = m, r.y = Math.round(y), y = e || d ? y + r.height : y + r.height / q * n, r.height = Math.round(y) - r.y, h.setGeometry(p[C], r)), k = Math.max(k, this.layoutRow(p[C], u, r.height, m));
                d && n < q && (c = c.clone(), c.height = y + b.height, h.setGeometry(a, c));
                f && m < k + Graph.minTableColumnWidth && (c = c.clone(), c.width = k + b.width + b.x +
                    Graph.minTableColumnWidth, h.setGeometry(a, c))
            }
        } finally {
            h.endUpdate()
        }
    }
};
(function() {
    var a = mxGraphView.prototype.resetValidationState;
    mxGraphView.prototype.resetValidationState = function() {
        a.apply(this, arguments);
        this.validEdges = []
    };
    var b = mxGraphView.prototype.validateCellState;
    mxGraphView.prototype.validateCellState = function(a, c) {
        c = null != c ? c : !0;
        var d = this.getState(a);
        null != d && c && this.graph.model.isEdge(d.cell) && null != d.style && 1 != d.style[mxConstants.STYLE_CURVED] && !d.invalid && this.updateLineJumps(d) && this.graph.cellRenderer.redraw(d, !1, this.isRendering());
        d = b.apply(this,
            arguments);
        null != d && c && this.graph.model.isEdge(d.cell) && null != d.style && 1 != d.style[mxConstants.STYLE_CURVED] && this.validEdges.push(d);
        return d
    };
    var c = mxShape.prototype.paint;
    mxShape.prototype.paint = function() {
        c.apply(this, arguments);
        if (null != this.state && null != this.node && this.state.view.graph.enableFlowAnimation && this.state.view.graph.model.isEdge(this.state.cell) && "1" == mxUtils.getValue(this.state.style, "flowAnimation", "0")) {
            var a = this.node.getElementsByTagName("path");
            if (1 < a.length) {
                "1" != mxUtils.getValue(this.state.style,
                    mxConstants.STYLE_DASHED, "0") && a[1].setAttribute("stroke-dasharray", 8 * this.state.view.scale);
                var b = this.state.view.graph.getFlowAnimationStyle();
                null != b && a[1].setAttribute("class", b.getAttribute("id"))
            }
        }
    };
    var d = mxCellRenderer.prototype.isShapeInvalid;
    mxCellRenderer.prototype.isShapeInvalid = function(a, b) {
        return d.apply(this, arguments) || null != a.routedPoints && null != b.routedPoints && !mxUtils.equalPoints(b.routedPoints, a.routedPoints)
    };
    var e = mxGraphView.prototype.updateCellState;
    mxGraphView.prototype.updateCellState =
        function(a) {
            e.apply(this, arguments);
            this.graph.model.isEdge(a.cell) && 1 != a.style[mxConstants.STYLE_CURVED] && this.updateLineJumps(a)
        };
    mxGraphView.prototype.updateLineJumps = function(a) {
        var b = a.absolutePoints;
        if (Graph.lineJumpsEnabled) {
            var c = null != a.routedPoints,
                d = null;
            if (null != b && null != this.validEdges && "none" !== mxUtils.getValue(a.style, "jumpStyle", "none")) {
                var e = function(b, c, e) {
                        var f = new mxPoint(c, e);
                        f.type = b;
                        d.push(f);
                        f = null != a.routedPoints ? a.routedPoints[d.length - 1] : null;
                        return null == f || f.type != b ||
                            f.x != c || f.y != e
                    },
                    f = .5 * this.scale;
                c = !1;
                d = [];
                for (var h = 0; h < b.length - 1; h++) {
                    for (var p = b[h + 1], k = b[h], n = [], m = b[h + 2]; h < b.length - 2 && mxUtils.ptSegDistSq(k.x, k.y, m.x, m.y, p.x, p.y) < 1 * this.scale * this.scale;) p = m, h++, m = b[h + 2];
                    c = e(0, k.x, k.y) || c;
                    for (var I = 0; I < this.validEdges.length; I++) {
                        var t = this.validEdges[I],
                            w = t.absolutePoints;
                        if (null != w && mxUtils.intersects(a, t) && "1" != t.style.noJump)
                            for (t = 0; t < w.length - 1; t++) {
                                var x = w[t + 1],
                                    z = w[t];
                                for (m = w[t + 2]; t < w.length - 2 && mxUtils.ptSegDistSq(z.x, z.y, m.x, m.y, x.x, x.y) < 1 * this.scale *
                                    this.scale;) x = m, t++, m = w[t + 2];
                                m = mxUtils.intersection(k.x, k.y, p.x, p.y, z.x, z.y, x.x, x.y);
                                if (null != m && (Math.abs(m.x - k.x) > f || Math.abs(m.y - k.y) > f) && (Math.abs(m.x - p.x) > f || Math.abs(m.y - p.y) > f) && (Math.abs(m.x - z.x) > f || Math.abs(m.y - z.y) > f) && (Math.abs(m.x - x.x) > f || Math.abs(m.y - x.y) > f)) {
                                    x = m.x - k.x;
                                    z = m.y - k.y;
                                    m = {
                                        distSq: x * x + z * z,
                                        x: m.x,
                                        y: m.y
                                    };
                                    for (x = 0; x < n.length; x++)
                                        if (n[x].distSq > m.distSq) {
                                            n.splice(x, 0, m);
                                            m = null;
                                            break
                                        } null == m || 0 != n.length && n[n.length - 1].x === m.x && n[n.length - 1].y === m.y || n.push(m)
                                }
                            }
                    }
                    for (t = 0; t < n.length; t++) c =
                        e(1, n[t].x, n[t].y) || c
                }
                m = b[b.length - 1];
                c = e(0, m.x, m.y) || c
            }
            a.routedPoints = d;
            return c
        }
        return !1
    };
    var f = mxConnector.prototype.paintLine;
    mxConnector.prototype.paintLine = function(a, b, c) {
        this.routedPoints = null != this.state ? this.state.routedPoints : null;
        if (this.outline || null == this.state || null == this.style || null == this.state.routedPoints || 0 == this.state.routedPoints.length) f.apply(this, arguments);
        else {
            var d = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2,
                e = (parseInt(mxUtils.getValue(this.style,
                    "jumpSize", Graph.defaultJumpSize)) - 2) / 2 + this.strokewidth,
                h = mxUtils.getValue(this.style, "jumpStyle", "none"),
                k = !0,
                p = null,
                m = null,
                n = [],
                q = null;
            a.begin();
            for (var r = 0; r < this.state.routedPoints.length; r++) {
                var t = this.state.routedPoints[r],
                    w = new mxPoint(t.x / this.scale, t.y / this.scale);
                0 == r ? w = b[0] : r == this.state.routedPoints.length - 1 && (w = b[b.length - 1]);
                var x = !1;
                if (null != p && 1 == t.type) {
                    var z = this.state.routedPoints[r + 1];
                    t = z.x / this.scale - w.x;
                    z = z.y / this.scale - w.y;
                    t = t * t + z * z;
                    null == q && (q = new mxPoint(w.x - p.x, w.y - p.y),
                        m = Math.sqrt(q.x * q.x + q.y * q.y), 0 < m ? (q.x = q.x * e / m, q.y = q.y * e / m) : q = null);
                    t > e * e && 0 < m && (t = p.x - w.x, z = p.y - w.y, t = t * t + z * z, t > e * e && (x = new mxPoint(w.x - q.x, w.y - q.y), t = new mxPoint(w.x + q.x, w.y + q.y), n.push(x), this.addPoints(a, n, c, d, !1, null, k), n = 0 > Math.round(q.x) || 0 == Math.round(q.x) && 0 >= Math.round(q.y) ? 1 : -1, k = !1, "sharp" == h ? (a.lineTo(x.x - q.y * n, x.y + q.x * n), a.lineTo(t.x - q.y * n, t.y + q.x * n), a.lineTo(t.x, t.y)) : "arc" == h ? (n *= 1.3, a.curveTo(x.x - q.y * n, x.y + q.x * n, t.x - q.y * n, t.y + q.x * n, t.x, t.y)) : (a.moveTo(t.x, t.y), k = !0), n = [t], x = !0))
                } else q =
                    null;
                x || (n.push(w), p = w)
            }
            this.addPoints(a, n, c, d, !1, null, k);
            a.stroke()
        }
    };
    var h = mxGraphView.prototype.getFixedTerminalPoint;
    mxGraphView.prototype.getFixedTerminalPoint = function(a, b, c, d) {
        return null != b && "centerPerimeter" == b.style[mxConstants.STYLE_PERIMETER] ? new mxPoint(b.getCenterX(), b.getCenterY()) : h.apply(this, arguments)
    };
    var k = mxGraphView.prototype.updateFloatingTerminalPoint;
    mxGraphView.prototype.updateFloatingTerminalPoint = function(a, b, c, d) {
        if (null == b || null == a || "1" != b.style.snapToPoint && "1" != a.style.snapToPoint) k.apply(this,
            arguments);
        else {
            b = this.getTerminalPort(a, b, d);
            var e = this.getNextPoint(a, c, d),
                f = this.graph.isOrthogonal(a),
                h = mxUtils.toRadians(Number(b.style[mxConstants.STYLE_ROTATION] || "0")),
                m = new mxPoint(b.getCenterX(), b.getCenterY());
            if (0 != h) {
                var p = Math.cos(-h),
                    n = Math.sin(-h);
                e = mxUtils.getRotatedPoint(e, p, n, m)
            }
            p = parseFloat(a.style[mxConstants.STYLE_PERIMETER_SPACING] || 0);
            p += parseFloat(a.style[d ? mxConstants.STYLE_SOURCE_PERIMETER_SPACING : mxConstants.STYLE_TARGET_PERIMETER_SPACING] || 0);
            e = this.getPerimeterPoint(b,
                e, 0 == h && f, p);
            0 != h && (p = Math.cos(h), n = Math.sin(h), e = mxUtils.getRotatedPoint(e, p, n, m));
            a.setAbsoluteTerminalPoint(this.snapToAnchorPoint(a, b, c, d, e), d)
        }
    };
    mxGraphView.prototype.snapToAnchorPoint = function(a, b, c, d, e) {
        if (null != b && null != a) {
            a = this.graph.getAllConnectionConstraints(b);
            d = c = null;
            if (null != a)
                for (var f = 0; f < a.length; f++) {
                    var h = this.graph.getConnectionPoint(b, a[f]);
                    if (null != h) {
                        var k = (h.x - e.x) * (h.x - e.x) + (h.y - e.y) * (h.y - e.y);
                        if (null == d || k < d) c = h, d = k
                    }
                }
            null != c && (e = c)
        }
        return e
    };
    var n = mxStencil.prototype.evaluateTextAttribute;
    mxStencil.prototype.evaluateTextAttribute = function(a, b, c) {
        var d = n.apply(this, arguments);
        "1" == a.getAttribute("placeholders") && null != c.state && (d = c.state.view.graph.replacePlaceholders(c.state.cell, d));
        return d
    };
    var m = mxCellRenderer.prototype.createShape;
    mxCellRenderer.prototype.createShape = function(a) {
        if (null != a.style && "undefined" !== typeof pako) {
            var b = mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null);
            if (null != b && "string" === typeof b && "stencil(" == b.substring(0, 8)) try {
                var c = b.substring(8, b.length -
                        1),
                    d = mxUtils.parseXml(Graph.decompress(c));
                return new mxShape(new mxStencil(d.documentElement))
            } catch (y) {
                null != window.console && console.log("Error in shape: " + y)
            }
        }
        return m.apply(this, arguments)
    }
})();
mxStencilRegistry.libraries = {};
mxStencilRegistry.dynamicLoading = !0;
mxStencilRegistry.allowEval = !0;
mxStencilRegistry.packages = [];
mxStencilRegistry.filesLoaded = {};
mxStencilRegistry.getStencil = function(a) {
    var b = mxStencilRegistry.stencils[a];
    if (null == b && null == mxCellRenderer.defaultShapes[a] && mxStencilRegistry.dynamicLoading) {
        var c = mxStencilRegistry.getBasenameForStencil(a);
        if (null != c) {
            b = mxStencilRegistry.libraries[c];
            if (null != b) {
                if (null == mxStencilRegistry.packages[c]) {
                    for (var d = 0; d < b.length; d++) {
                        var e = b[d];
                        if (!mxStencilRegistry.filesLoaded[e])
                            if (mxStencilRegistry.filesLoaded[e] = !0, ".xml" == e.toLowerCase().substring(e.length - 4, e.length)) mxStencilRegistry.loadStencilSet(e,
                                null);
                            else if (".js" == e.toLowerCase().substring(e.length - 3, e.length)) try {
                            if (mxStencilRegistry.allowEval) {
                                var f = mxUtils.load(e);
                                null != f && 200 <= f.getStatus() && 299 >= f.getStatus() && eval.call(window, f.getText())
                            }
                        } catch (h) {
                            null != window.console && console.log("error in getStencil:", a, c, b, e, h)
                        }
                    }
                    mxStencilRegistry.packages[c] = 1
                }
            } else c = c.replace("_-_", "_"), mxStencilRegistry.loadStencilSet(STENCIL_PATH + "/" + c + ".xml", null);
            b = mxStencilRegistry.stencils[a]
        }
    }
    return b
};
mxStencilRegistry.getBasenameForStencil = function(a) {
    var b = null;
    if (null != a && "string" === typeof a && (a = a.split("."), 0 < a.length && "mxgraph" == a[0])) {
        b = a[1];
        for (var c = 2; c < a.length - 1; c++) b += "/" + a[c]
    }
    return b
};
mxStencilRegistry.loadStencilSet = function(a, b, c, d) {
    var e = mxStencilRegistry.packages[a];
    if (null != c && c || null == e) {
        var f = !1;
        if (null == e) try {
            if (d) {
                mxStencilRegistry.loadStencil(a, mxUtils.bind(this, function(c) {
                    null != c && null != c.documentElement && (mxStencilRegistry.packages[a] = c, f = !0, mxStencilRegistry.parseStencilSet(c.documentElement, b, f))
                }));
                return
            }
            e = mxStencilRegistry.loadStencil(a);
            mxStencilRegistry.packages[a] = e;
            f = !0
        } catch (h) {
            null != window.console && console.log("error in loadStencilSet:", a, h)
        }
        null != e && null !=
            e.documentElement && mxStencilRegistry.parseStencilSet(e.documentElement, b, f)
    }
};
mxStencilRegistry.loadStencil = function(a, b) {
    if (null != b) mxUtils.get(a, mxUtils.bind(this, function(a) {
        b(200 <= a.getStatus() && 299 >= a.getStatus() ? a.getXml() : null)
    }));
    else return mxUtils.load(a).getXml()
};
mxStencilRegistry.parseStencilSets = function(a) {
    for (var b = 0; b < a.length; b++) mxStencilRegistry.parseStencilSet(mxUtils.parseXml(a[b]).documentElement)
};
mxStencilRegistry.parseStencilSet = function(a, b, c) {
    if ("stencils" == a.nodeName)
        for (var d = a.firstChild; null != d;) "shapes" == d.nodeName && mxStencilRegistry.parseStencilSet(d, b, c), d = d.nextSibling;
    else {
        c = null != c ? c : !0;
        d = a.firstChild;
        var e = "";
        a = a.getAttribute("name");
        for (null != a && (e = a + "."); null != d;) {
            if (d.nodeType == mxConstants.NODETYPE_ELEMENT && (a = d.getAttribute("name"), null != a)) {
                e = e.toLowerCase();
                var f = a.replace(/ /g, "_");
                c && mxStencilRegistry.addStencil(e + f.toLowerCase(), new mxStencil(d));
                if (null != b) {
                    var h = d.getAttribute("w"),
                        k = d.getAttribute("h");
                    h = null == h ? 80 : parseInt(h, 10);
                    k = null == k ? 80 : parseInt(k, 10);
                    b(e, f, a, h, k)
                }
            }
            d = d.nextSibling
        }
    }
};
"undefined" != typeof mxVertexHandler && function() {
    function a() {
        var a = document.createElement("div");
        a.className = "geHint";
        a.style.whiteSpace = "nowrap";
        a.style.position = "absolute";
        return a
    }

    function b(a, b) {
        switch (b) {
            case mxConstants.POINTS:
                return a;
            case mxConstants.MILLIMETERS:
                return (a / mxConstants.PIXELS_PER_MM).toFixed(1);
            case mxConstants.INCHES:
                return (a / mxConstants.PIXELS_PER_INCH).toFixed(2)
        }
    }
    mxConstants.HANDLE_FILLCOLOR = "#29b6f2";
    mxConstants.HANDLE_STROKECOLOR = "#0088cf";
    mxConstants.VERTEX_SELECTION_COLOR =
        "#00a8ff";
    mxConstants.OUTLINE_COLOR = "#00a8ff";
    mxConstants.OUTLINE_HANDLE_FILLCOLOR = "#99ccff";
    mxConstants.OUTLINE_HANDLE_STROKECOLOR = "#00a8ff";
    mxConstants.CONNECT_HANDLE_FILLCOLOR = "#cee7ff";
    mxConstants.EDGE_SELECTION_COLOR = "#00a8ff";
    mxConstants.DEFAULT_VALID_COLOR = "#00a8ff";
    mxConstants.LABEL_HANDLE_FILLCOLOR = "#cee7ff";
    mxConstants.GUIDE_COLOR = "#0088cf";
    mxConstants.HIGHLIGHT_OPACITY = 30;
    mxConstants.HIGHLIGHT_SIZE = 5;
    mxEdgeHandler.prototype.snapToTerminals = !0;
    mxGraphHandler.prototype.guidesEnabled = !0;
    mxGraphHandler.prototype.removeEmptyParents = !0;
    mxRubberband.prototype.fadeOut = !0;
    mxGuide.prototype.isEnabledForEvent = function(a) {
        return !mxEvent.isAltDown(a)
    };
    var c = mxGraphLayout.prototype.isVertexIgnored;
    mxGraphLayout.prototype.isVertexIgnored = function(a) {
        return c.apply(this, arguments) || this.graph.isTableRow(a) || this.graph.isTableCell(a)
    };
    var d = mxGraphLayout.prototype.isEdgeIgnored;
    mxGraphLayout.prototype.isEdgeIgnored = function(a) {
        return d.apply(this, arguments) || this.graph.isEdgeIgnored(a)
    };
    var e = mxConnectionHandler.prototype.isCreateTarget;
    mxConnectionHandler.prototype.isCreateTarget = function(a) {
        return this.graph.isCloneEvent(a) || e.apply(this, arguments)
    };
    mxConstraintHandler.prototype.createHighlightShape = function() {
        var a = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
        a.opacity = mxConstants.HIGHLIGHT_OPACITY;
        return a
    };
    mxConnectionHandler.prototype.livePreview = !0;
    mxConnectionHandler.prototype.cursor = "crosshair";
    mxConnectionHandler.prototype.createEdgeState = function(a) {
        a = this.graph.createCurrentEdgeStyle();
        a = this.graph.createEdge(null,
            null, null, null, null, a);
        a = new mxCellState(this.graph.view, a, this.graph.getCellStyle(a));
        for (var g in this.graph.currentEdgeStyle) a.style[g] = this.graph.currentEdgeStyle[g];
        return a
    };
    var f = mxConnectionHandler.prototype.createShape;
    mxConnectionHandler.prototype.createShape = function() {
        var a = f.apply(this, arguments);
        a.isDashed = "1" == this.graph.currentEdgeStyle[mxConstants.STYLE_DASHED];
        return a
    };
    mxConnectionHandler.prototype.updatePreview = function(a) {};
    var h = mxConnectionHandler.prototype.createMarker;
    mxConnectionHandler.prototype.createMarker =
        function() {
            var a = h.apply(this, arguments),
                b = a.getCell;
            a.getCell = mxUtils.bind(this, function(a) {
                var g = b.apply(this, arguments);
                this.error = null;
                return g
            });
            return a
        };
    Graph.prototype.defaultVertexStyle = {};
    Graph.prototype.defaultEdgeStyle = {
        edgeStyle: "orthogonalEdgeStyle",
        rounded: "0",
        jettySize: "auto",
        orthogonalLoop: "1"
    };
    Graph.prototype.createCurrentEdgeStyle = function() {
        for (var a = "edgeStyle=" + (this.currentEdgeStyle.edgeStyle || "none") + ";", b = "shape curved rounded comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification comicStyle jumpStyle jumpSize".split(" "),
                c = 0; c < b.length; c++) null != this.currentEdgeStyle[b[c]] && (a += b[c] + "=" + this.currentEdgeStyle[b[c]] + ";");
        null != this.currentEdgeStyle.orthogonalLoop ? a += "orthogonalLoop=" + this.currentEdgeStyle.orthogonalLoop + ";" : null != Graph.prototype.defaultEdgeStyle.orthogonalLoop && (a += "orthogonalLoop=" + Graph.prototype.defaultEdgeStyle.orthogonalLoop + ";");
        null != this.currentEdgeStyle.jettySize ? a += "jettySize=" + this.currentEdgeStyle.jettySize + ";" : null != Graph.prototype.defaultEdgeStyle.jettySize && (a += "jettySize=" + Graph.prototype.defaultEdgeStyle.jettySize +
            ";");
        "elbowEdgeStyle" == this.currentEdgeStyle.edgeStyle && null != this.currentEdgeStyle.elbow && (a += "elbow=" + this.currentEdgeStyle.elbow + ";");
        return a = null != this.currentEdgeStyle.html ? a + ("html=" + this.currentEdgeStyle.html + ";") : a + "html=1;"
    };
    Graph.prototype.updateCellStyles = function(a, b, c) {
        this.model.beginUpdate();
        try {
            for (var g = 0; g < c.length; g++)
                if (this.model.isVertex(c[g]) || this.model.isEdge(c[g])) {
                    this.setCellStyles(a, null, [c[g]]);
                    var l = this.getCellStyle(c[g])[a];
                    b != (null == l ? mxConstants.NONE : l) && this.setCellStyles(a,
                        b, [c[g]])
                }
        } finally {
            this.model.endUpdate()
        }
    };
    Graph.prototype.getPagePadding = function() {
        return new mxPoint(0, 0)
    };
    Graph.prototype.loadStylesheet = function() {
        var a = null != this.themes ? this.themes[this.defaultThemeName] : mxStyleRegistry.dynamicLoading ? mxUtils.load(STYLE_PATH + "/default.xml").getDocumentElement() : null;
        null != a && (new mxCodec(a.ownerDocument)).decode(a, this.getStylesheet())
    };
    Graph.prototype.createCellLookup = function(a, b) {
        b = null != b ? b : {};
        for (var g = 0; g < a.length; g++) {
            var c = a[g];
            b[mxObjectIdentity.get(c)] =
                c.getId();
            for (var l = this.model.getChildCount(c), d = 0; d < l; d++) this.createCellLookup([this.model.getChildAt(c, d)], b)
        }
        return b
    };
    Graph.prototype.createCellMapping = function(a, b, c) {
        c = null != c ? c : {};
        for (var g in a) {
            var l = b[g];
            null == c[l] && (c[l] = a[g].getId() || "")
        }
        return c
    };
    Graph.prototype.importGraphModel = function(a, b, c, d) {
        b = null != b ? b : 0;
        c = null != c ? c : 0;
        var g = new mxCodec(a.ownerDocument),
            l = new mxGraphModel;
        g.decode(a, l);
        a = [];
        g = {};
        var v = {},
            e = l.getChildren(this.cloneCell(l.root, this.isCloneInvalidEdges(), g));
        if (null !=
            e) {
            var A = this.createCellLookup([l.root]);
            e = e.slice();
            this.model.beginUpdate();
            try {
                if (1 != e.length || this.isCellLocked(this.getDefaultParent()))
                    for (l = 0; l < e.length; l++) f = this.model.getChildren(this.moveCells([e[l]], b, c, !1, this.model.getRoot())[0]), null != f && (a = a.concat(f));
                else {
                    var f = l.getChildren(e[0]);
                    null != f && (a = this.moveCells(f, b, c, !1, this.getDefaultParent()), v[l.getChildAt(l.root, 0).getId()] = this.getDefaultParent().getId())
                }
                if (null != a && (this.createCellMapping(g, A, v), this.updateCustomLinks(v, a), d)) {
                    this.isGridEnabled() &&
                        (b = this.snap(b), c = this.snap(c));
                    var h = this.getBoundingBoxFromGeometry(a, !0);
                    null != h && this.moveCells(a, b - h.x, c - h.y)
                }
            } finally {
                this.model.endUpdate()
            }
        }
        return a
    };
    Graph.prototype.encodeCells = function(a) {
        for (var g = {}, b = this.cloneCells(a, null, g), c = new mxDictionary, d = 0; d < a.length; d++) c.put(a[d], !0);
        var e = new mxCodec,
            f = new mxGraphModel,
            h = f.getChildAt(f.getRoot(), 0);
        for (d = 0; d < b.length; d++) {
            f.add(h, b[d]);
            var D = this.view.getState(a[d]);
            if (null != D) {
                var k = this.getCellGeometry(b[d]);
                null != k && k.relative && !this.model.isEdge(a[d]) &&
                    null == c.get(this.model.getParent(a[d])) && (k.offset = null, k.relative = !1, k.x = D.x / D.view.scale - D.view.translate.x, k.y = D.y / D.view.scale - D.view.translate.y)
            }
        }
        this.updateCustomLinks(this.createCellMapping(g, this.createCellLookup(a)), b);
        return e.encode(f)
    };
    Graph.prototype.isSwimlane = function(a, b) {
        return null == a || this.model.getParent(a) == this.model.getRoot() || this.model.isEdge(a) ? !1 : (a = this.getCurrentCellStyle(a, b)[mxConstants.STYLE_SHAPE], a == mxConstants.SHAPE_SWIMLANE || "table" == a)
    };
    var k = Graph.prototype.isExtendParent;
    Graph.prototype.isExtendParent = function(a) {
        var g = this.model.getParent(a);
        if (null != g) {
            var b = this.getCurrentCellStyle(g);
            if (null != b.expand) return "0" != b.expand
        }
        return k.apply(this, arguments) && (null == g || !this.isTable(g))
    };
    var n = Graph.prototype.splitEdge;
    Graph.prototype.splitEdge = function(a, b, c, d, e, f, h, k) {
        null == k && (k = this.model.getParent(a), this.isTable(k) || this.isTableRow(k)) && (k = this.getCellAt(f, h, null, !0, !1));
        c = null;
        this.model.beginUpdate();
        try {
            c = n.apply(this, [a, b, c, d, e, f, h, k]);
            this.model.setValue(c,
                "");
            var g = this.getChildCells(c, !0);
            for (b = 0; b < g.length; b++) {
                var l = this.getCellGeometry(g[b]);
                null != l && l.relative && 0 < l.x && this.model.remove(g[b])
            }
            var v = this.getChildCells(a, !0);
            for (b = 0; b < v.length; b++) l = this.getCellGeometry(v[b]), null != l && l.relative && 0 >= l.x && this.model.remove(v[b]);
            this.setCellStyles(mxConstants.STYLE_TARGET_PERIMETER_SPACING, null, [c]);
            this.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.NONE, [c]);
            this.setCellStyles(mxConstants.STYLE_SOURCE_PERIMETER_SPACING, null, [a]);
            this.setCellStyles(mxConstants.STYLE_STARTARROW,
                mxConstants.NONE, [a]);
            var A = this.model.getTerminal(c, !1);
            if (null != A) {
                var B = this.getCurrentCellStyle(A);
                null != B && "1" == B.snapToPoint && (this.setCellStyles(mxConstants.STYLE_EXIT_X, null, [a]), this.setCellStyles(mxConstants.STYLE_EXIT_Y, null, [a]), this.setCellStyles(mxConstants.STYLE_ENTRY_X, null, [c]), this.setCellStyles(mxConstants.STYLE_ENTRY_Y, null, [c]))
            }
        } finally {
            this.model.endUpdate()
        }
        return c
    };
    var m = Graph.prototype.selectCell;
    Graph.prototype.selectCell = function(a, b, c) {
        if (b || c) m.apply(this, arguments);
        else {
            var g = this.getSelectionCell(),
                l = null,
                v = [],
                d = mxUtils.bind(this, function(b) {
                    if (null != this.view.getState(b) && (this.model.isVertex(b) || this.model.isEdge(b)))
                        if (v.push(b), b == g) l = v.length - 1;
                        else if (a && null == g && 0 < v.length || null != l && a && v.length > l || !a && 0 < l) return;
                    for (var c = 0; c < this.model.getChildCount(b); c++) d(this.model.getChildAt(b, c))
                });
            d(this.model.root);
            0 < v.length && (l = null != l ? mxUtils.mod(l + (a ? 1 : -1), v.length) : 0, this.setSelectionCell(v[l]))
        }
    };
    var p = Graph.prototype.moveCells;
    Graph.prototype.moveCells =
        function(a, b, c, d, e, f, h) {
            h = null != h ? h : {};
            if (this.isTable(e)) {
                for (var g = [], l = 0; l < a.length; l++) this.isTable(a[l]) ? g = g.concat(this.model.getChildCells(a[l], !0).reverse()) : g.push(a[l]);
                a = g
            }
            this.model.beginUpdate();
            try {
                g = [];
                for (l = 0; l < a.length; l++)
                    if (null != e && this.isTableRow(a[l])) {
                        var v = this.model.getParent(a[l]),
                            A = this.getCellGeometry(a[l]);
                        this.isTable(v) && g.push(v);
                        if (null != v && null != A && this.isTable(v) && this.isTable(e) && (d || v != e)) {
                            if (!d) {
                                var B = this.getCellGeometry(v);
                                null != B && (B = B.clone(), B.height -= A.height,
                                    this.model.setGeometry(v, B))
                            }
                            B = this.getCellGeometry(e);
                            null != B && (B = B.clone(), B.height += A.height, this.model.setGeometry(e, B));
                            var H = this.model.getChildCells(e, !0);
                            if (0 < H.length) {
                                a[l] = d ? this.cloneCell(a[l]) : a[l];
                                var F = this.model.getChildCells(a[l], !0),
                                    k = this.model.getChildCells(H[0], !0),
                                    m = k.length - F.length;
                                if (0 < m)
                                    for (var n = 0; n < m; n++) {
                                        var q = this.cloneCell(F[F.length - 1]);
                                        null != q && (q.value = "", this.model.add(a[l], q))
                                    } else if (0 > m)
                                        for (n = 0; n > m; n--) this.model.remove(F[F.length + n - 1]);
                                F = this.model.getChildCells(a[l],
                                    !0);
                                for (n = 0; n < k.length; n++) {
                                    var r = this.getCellGeometry(k[n]),
                                        t = this.getCellGeometry(F[n]);
                                    null != r && null != t && (t = t.clone(), t.width = r.width, this.model.setGeometry(F[n], t))
                                }
                            }
                        }
                    } var u = p.apply(this, arguments);
                for (l = 0; l < g.length; l++) !d && this.model.contains(g[l]) && 0 == this.model.getChildCount(g[l]) && this.model.remove(g[l]);
                d && this.updateCustomLinks(this.createCellMapping(h, this.createCellLookup(a)), u)
            } finally {
                this.model.endUpdate()
            }
            return u
        };
    var q = Graph.prototype.removeCells;
    Graph.prototype.removeCells = function(a,
        b) {
        var g = [];
        this.model.beginUpdate();
        try {
            for (var c = 0; c < a.length; c++)
                if (this.isTableCell(a[c])) {
                    var l = this.model.getParent(a[c]),
                        d = this.model.getParent(l);
                    1 == this.model.getChildCount(l) && 1 == this.model.getChildCount(d) ? 0 > mxUtils.indexOf(a, d) && 0 > mxUtils.indexOf(g, d) && g.push(d) : this.labelChanged(a[c], "")
                } else {
                    if (this.isTableRow(a[c]) && (d = this.model.getParent(a[c]), 0 > mxUtils.indexOf(a, d) && 0 > mxUtils.indexOf(g, d))) {
                        for (var e = this.model.getChildCells(d, !0), f = 0, h = 0; h < e.length; h++) 0 <= mxUtils.indexOf(a, e[h]) &&
                            f++;
                        f == e.length && g.push(d)
                    }
                    g.push(a[c])
                } g = q.apply(this, [g, b])
        } finally {
            this.model.endUpdate()
        }
        return g
    };
    Graph.prototype.updateCustomLinks = function(a, b) {
        for (var g = 0; g < b.length; g++) null != b[g] && this.updateCustomLinksForCell(a, b[g])
    };
    Graph.prototype.updateCustomLinksForCell = function(a, b) {};
    Graph.prototype.getAllConnectionConstraints = function(a, b) {
        if (null != a) {
            b = mxUtils.getValue(a.style, "points", null);
            if (null != b) {
                a = [];
                try {
                    var g = JSON.parse(b);
                    for (b = 0; b < g.length; b++) {
                        var c = g[b];
                        a.push(new mxConnectionConstraint(new mxPoint(c[0],
                            c[1]), 2 < c.length ? "0" != c[2] : !0, null, 3 < c.length ? c[3] : 0, 4 < c.length ? c[4] : 0))
                    }
                } catch (H) {}
                return a
            }
            if (null != a.shape && null != a.shape.bounds) {
                c = a.shape.direction;
                b = a.shape.bounds;
                var l = a.shape.scale;
                g = b.width / l;
                b = b.height / l;
                if (c == mxConstants.DIRECTION_NORTH || c == mxConstants.DIRECTION_SOUTH) c = g, g = b, b = c;
                b = a.shape.getConstraints(a.style, g, b);
                if (null != b) return b;
                if (null != a.shape.stencil && null != a.shape.stencil.constraints) return a.shape.stencil.constraints;
                if (null != a.shape.constraints) return a.shape.constraints
            }
        }
        return null
    };
    Graph.prototype.flipEdge = function(a) {
        if (null != a) {
            var b = this.getCurrentCellStyle(a);
            b = mxUtils.getValue(b, mxConstants.STYLE_ELBOW, mxConstants.ELBOW_HORIZONTAL) == mxConstants.ELBOW_HORIZONTAL ? mxConstants.ELBOW_VERTICAL : mxConstants.ELBOW_HORIZONTAL;
            this.setCellStyles(mxConstants.STYLE_ELBOW, b, [a])
        }
    };
    Graph.prototype.isValidRoot = function(a) {
        for (var b = this.model.getChildCount(a), g = 0, c = 0; c < b; c++) {
            var d = this.model.getChildAt(a, c);
            this.model.isVertex(d) && (d = this.getCellGeometry(d), null == d || d.relative || g++)
        }
        return 0 <
            g || this.isContainer(a)
    };
    Graph.prototype.isValidDropTarget = function(a, b, c) {
        for (var g = this.getCurrentCellStyle(a), l = !0, d = !0, v = 0; v < b.length && d; v++) l = l && this.isTable(b[v]), d = d && this.isTableRow(b[v]);
        return ("1" != mxUtils.getValue(g, "part", "0") || this.isContainer(a)) && "0" != mxUtils.getValue(g, "dropTarget", "1") && (mxGraph.prototype.isValidDropTarget.apply(this, arguments) || this.isContainer(a)) && !this.isTableRow(a) && (!this.isTable(a) || d || l)
    };
    Graph.prototype.createGroupCell = function() {
        var a = mxGraph.prototype.createGroupCell.apply(this,
            arguments);
        a.setStyle("group");
        return a
    };
    Graph.prototype.isExtendParentsOnAdd = function(a) {
        var b = mxGraph.prototype.isExtendParentsOnAdd.apply(this, arguments);
        if (b && null != a && null != this.layoutManager) {
            var g = this.model.getParent(a);
            null != g && (g = this.layoutManager.getLayout(g), null != g && g.constructor == mxStackLayout && (b = !1))
        }
        return b
    };
    Graph.prototype.getPreferredSizeForCell = function(a) {
        var b = mxGraph.prototype.getPreferredSizeForCell.apply(this, arguments);
        null != b && (b.width += 10, b.height += 4, this.gridEnabled &&
            (b.width = this.snap(b.width), b.height = this.snap(b.height)));
        return b
    };
    Graph.prototype.turnShapes = function(a, b) {
        var g = this.getModel(),
            c = [];
        g.beginUpdate();
        try {
            for (var l = 0; l < a.length; l++) {
                var d = a[l];
                if (g.isEdge(d)) {
                    var e = g.getTerminal(d, !0),
                        f = g.getTerminal(d, !1);
                    g.setTerminal(d, f, !0);
                    g.setTerminal(d, e, !1);
                    var h = g.getGeometry(d);
                    if (null != h) {
                        h = h.clone();
                        null != h.points && h.points.reverse();
                        var k = h.getTerminalPoint(!0),
                            m = h.getTerminalPoint(!1);
                        h.setTerminalPoint(k, !1);
                        h.setTerminalPoint(m, !0);
                        g.setGeometry(d,
                            h);
                        var n = this.view.getState(d),
                            p = this.view.getState(e),
                            q = this.view.getState(f);
                        if (null != n) {
                            var r = null != p ? this.getConnectionConstraint(n, p, !0) : null,
                                t = null != q ? this.getConnectionConstraint(n, q, !1) : null;
                            this.setConnectionConstraint(d, e, !0, t);
                            this.setConnectionConstraint(d, f, !1, r);
                            var u = mxUtils.getValue(n.style, mxConstants.STYLE_SOURCE_PERIMETER_SPACING);
                            this.setCellStyles(mxConstants.STYLE_SOURCE_PERIMETER_SPACING, mxUtils.getValue(n.style, mxConstants.STYLE_TARGET_PERIMETER_SPACING), [d]);
                            this.setCellStyles(mxConstants.STYLE_TARGET_PERIMETER_SPACING,
                                u, [d])
                        }
                        c.push(d)
                    }
                } else if (g.isVertex(d) && (h = this.getCellGeometry(d), null != h)) {
                    if (!(this.isTable(d) || this.isTableRow(d) || this.isTableCell(d) || this.isSwimlane(d))) {
                        h = h.clone();
                        h.x += h.width / 2 - h.height / 2;
                        h.y += h.height / 2 - h.width / 2;
                        var x = h.width;
                        h.width = h.height;
                        h.height = x;
                        g.setGeometry(d, h)
                    }
                    var w = this.view.getState(d);
                    if (null != w) {
                        var y = [mxConstants.DIRECTION_EAST, mxConstants.DIRECTION_SOUTH, mxConstants.DIRECTION_WEST, mxConstants.DIRECTION_NORTH],
                            z = mxUtils.getValue(w.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST);
                        this.setCellStyles(mxConstants.STYLE_DIRECTION, y[mxUtils.mod(mxUtils.indexOf(y, z) + (b ? -1 : 1), y.length)], [d])
                    }
                    c.push(d)
                }
            }
        } finally {
            g.endUpdate()
        }
        return c
    };
    Graph.prototype.stencilHasPlaceholders = function(a) {
        if (null != a && null != a.fgNode)
            for (a = a.fgNode.firstChild; null != a;) {
                if ("text" == a.nodeName && "1" == a.getAttribute("placeholders")) return !0;
                a = a.nextSibling
            }
        return !1
    };
    var r = Graph.prototype.processChange;
    Graph.prototype.processChange = function(a) {
        if (a instanceof mxGeometryChange && (this.isTableCell(a.cell) || this.isTableRow(a.cell)) &&
            (null == a.previous && null != a.geometry || null != a.previous && !a.previous.equals(a.geometry))) {
            var b = a.cell;
            this.isTableCell(b) && (b = this.model.getParent(b));
            this.isTableRow(b) && (b = this.model.getParent(b));
            var g = this.view.getState(b);
            null != g && null != g.shape && (this.view.invalidate(b), g.shape.bounds = null)
        }
        r.apply(this, arguments);
        a instanceof mxValueChange && null != a.cell && null != a.cell.value && "object" == typeof a.cell.value && this.invalidateDescendantsWithPlaceholders(a.cell)
    };
    Graph.prototype.invalidateDescendantsWithPlaceholders =
        function(a) {
            a = this.model.getDescendants(a);
            if (0 < a.length)
                for (var b = 0; b < a.length; b++) {
                    var g = this.view.getState(a[b]);
                    null != g && null != g.shape && null != g.shape.stencil && this.stencilHasPlaceholders(g.shape.stencil) ? this.removeStateForCell(a[b]) : this.isReplacePlaceholders(a[b]) && this.view.invalidate(a[b], !1, !1)
                }
        };
    Graph.prototype.replaceElement = function(a, b) {
        b = a.ownerDocument.createElement(null != b ? b : "span");
        for (var g = Array.prototype.slice.call(a.attributes); attr = g.pop();) b.setAttribute(attr.nodeName, attr.nodeValue);
        b.innerHTML = a.innerHTML;
        a.parentNode.replaceChild(b, a)
    };
    Graph.prototype.processElements = function(a, b) {
        if (null != a) {
            a = a.getElementsByTagName("*");
            for (var g = 0; g < a.length; g++) b(a[g])
        }
    };
    Graph.prototype.updateLabelElements = function(a, b, c) {
        a = null != a ? a : this.getSelectionCells();
        for (var g = document.createElement("div"), l = 0; l < a.length; l++)
            if (this.isHtmlLabel(a[l])) {
                var d = this.convertValueToString(a[l]);
                if (null != d && 0 < d.length) {
                    g.innerHTML = d;
                    for (var v = g.getElementsByTagName(null != c ? c : "*"), e = 0; e < v.length; e++) b(v[e]);
                    g.innerHTML != d && this.cellLabelChanged(a[l], g.innerHTML)
                }
            }
    };
    Graph.prototype.cellLabelChanged = function(a, b, c) {
        b = Graph.zapGremlins(b);
        this.model.beginUpdate();
        try {
            if (null != a.value && "object" == typeof a.value) {
                if (this.isReplacePlaceholders(a) && null != a.getAttribute("placeholder"))
                    for (var g = a.getAttribute("placeholder"), l = a; null != l;) {
                        if (l == this.model.getRoot() || null != l.value && "object" == typeof l.value && l.hasAttribute(g)) {
                            this.setAttributeForCell(l, g, b);
                            break
                        }
                        l = this.model.getParent(l)
                    }
                var d = a.value.cloneNode(!0);
                Graph.translateDiagram && null != Graph.diagramLanguage && d.hasAttribute("label_" + Graph.diagramLanguage) ? d.setAttribute("label_" + Graph.diagramLanguage, b) : d.setAttribute("label", b);
                b = d
            }
            mxGraph.prototype.cellLabelChanged.apply(this, arguments)
        } finally {
            this.model.endUpdate()
        }
    };
    Graph.prototype.cellsRemoved = function(a) {
        if (null != a) {
            for (var b = new mxDictionary, g = 0; g < a.length; g++) b.put(a[g], !0);
            var c = [];
            for (g = 0; g < a.length; g++) {
                var d = this.model.getParent(a[g]);
                null == d || b.get(d) || (b.put(d, !0), c.push(d))
            }
            for (g = 0; g <
                c.length; g++)
                if (d = this.view.getState(c[g]), null != d && (this.model.isEdge(d.cell) || this.model.isVertex(d.cell)) && this.isCellDeletable(d.cell) && this.isTransparentState(d)) {
                    for (var e = !0, f = 0; f < this.model.getChildCount(d.cell) && e; f++) b.get(this.model.getChildAt(d.cell, f)) || (e = !1);
                    e && a.push(d.cell)
                }
        }
        mxGraph.prototype.cellsRemoved.apply(this, arguments)
    };
    Graph.prototype.removeCellsAfterUngroup = function(a) {
        for (var b = [], g = 0; g < a.length; g++) this.isCellDeletable(a[g]) && this.isTransparentState(this.view.getState(a[g])) &&
            b.push(a[g]);
        a = b;
        mxGraph.prototype.removeCellsAfterUngroup.apply(this, arguments)
    };
    Graph.prototype.setLinkForCell = function(a, b) {
        this.setAttributeForCell(a, "link", b)
    };
    Graph.prototype.setTooltipForCell = function(a, b) {
        var g = "tooltip";
        Graph.translateDiagram && null != Graph.diagramLanguage && mxUtils.isNode(a.value) && a.value.hasAttribute("tooltip_" + Graph.diagramLanguage) && (g = "tooltip_" + Graph.diagramLanguage);
        this.setAttributeForCell(a, g, b)
    };
    Graph.prototype.getAttributeForCell = function(a, b, c) {
        a = null != a.value &&
            "object" === typeof a.value ? a.value.getAttribute(b) : null;
        return null != a ? a : c
    };
    Graph.prototype.setAttributeForCell = function(a, b, c) {
        if (null != a.value && "object" == typeof a.value) var g = a.value.cloneNode(!0);
        else g = mxUtils.createXmlDocument().createElement("UserObject"), g.setAttribute("label", a.value || "");
        null != c ? g.setAttribute(b, c) : g.removeAttribute(b);
        this.model.setValue(a, g)
    };
    var u = Graph.prototype.getDropTarget;
    Graph.prototype.getDropTarget = function(a, b, c, d) {
        this.getModel();
        if (mxEvent.isAltDown(b)) return null;
        for (var g = 0; g < a.length; g++)
            if (this.model.isEdge(this.model.getParent(a[g]))) return null;
        var l = u.apply(this, arguments),
            e = !0;
        for (g = 0; g < a.length && e; g++) e = e && this.isTableRow(a[g]);
        e && (this.isTableCell(l) && (l = this.model.getParent(l)), this.isTableRow(l) && (l = this.model.getParent(l)), this.isTable(l) || (l = null));
        return l
    };
    Graph.prototype.click = function(a) {
        mxGraph.prototype.click.call(this, a);
        this.firstClickState = a.getState();
        this.firstClickSource = a.getSource()
    };
    Graph.prototype.dblClick = function(a, b) {
        this.isEnabled() &&
            (b = this.insertTextForEvent(a, b), mxGraph.prototype.dblClick.call(this, a, b))
    };
    Graph.prototype.insertTextForEvent = function(a, b) {
        var g = mxUtils.convertPoint(this.container, mxEvent.getClientX(a), mxEvent.getClientY(a));
        if (null != a && !this.model.isVertex(b)) {
            var c = this.model.isEdge(b) ? this.view.getState(b) : null,
                d = mxEvent.getSource(a);
            this.firstClickState != c || this.firstClickSource != d || null != c && null != c.text && null != c.text.node && null != c.text.boundingBox && (mxUtils.contains(c.text.boundingBox, g.x, g.y) || mxUtils.isAncestorNode(c.text.node,
                mxEvent.getSource(a))) || (null != c || this.isCellLocked(this.getDefaultParent())) && (null == c || this.isCellLocked(c.cell)) || !(null != c || mxClient.IS_SVG && d == this.view.getCanvas().ownerSVGElement) || (null == c && (c = this.view.getState(this.getCellAt(g.x, g.y))), b = this.addText(g.x, g.y, c))
        }
        return b
    };
    Graph.prototype.getInsertPoint = function() {
        var a = this.getGridSize(),
            b = this.container.scrollLeft / this.view.scale - this.view.translate.x,
            c = this.container.scrollTop / this.view.scale - this.view.translate.y;
        if (this.pageVisible) {
            var d =
                this.getPageLayout(),
                e = this.getPageSize();
            b = Math.max(b, d.x * e.width);
            c = Math.max(c, d.y * e.height)
        }
        return new mxPoint(this.snap(b + a), this.snap(c + a))
    };
    Graph.prototype.getFreeInsertPoint = function() {
        var a = this.view,
            b = this.getGraphBounds(),
            c = this.getInsertPoint(),
            d = this.snap(Math.round(Math.max(c.x, b.x / a.scale - a.translate.x + (0 == b.width ? 2 * this.gridSize : 0))));
        a = this.snap(Math.round(Math.max(c.y, (b.y + b.height) / a.scale - a.translate.y + 2 * this.gridSize)));
        return new mxPoint(d, a)
    };
    Graph.prototype.getCenterInsertPoint =
        function(a) {
            a = null != a ? a : new mxRectangle;
            return mxUtils.hasScrollbars(this.container) ? new mxPoint(this.snap(Math.round((this.container.scrollLeft + this.container.clientWidth / 2) / this.view.scale - this.view.translate.x - a.width / 2)), this.snap(Math.round((this.container.scrollTop + this.container.clientHeight / 2) / this.view.scale - this.view.translate.y - a.height / 2))) : new mxPoint(this.snap(Math.round(this.container.clientWidth / 2 / this.view.scale - this.view.translate.x - a.width / 2)), this.snap(Math.round(this.container.clientHeight /
                2 / this.view.scale - this.view.translate.y - a.height / 2)))
        };
    Graph.prototype.isMouseInsertPoint = function() {
        return !1
    };
    Graph.prototype.addText = function(a, b, c) {
        var g = new mxCell;
        g.value = "Text";
        g.geometry = new mxGeometry(0, 0, 0, 0);
        g.vertex = !0;
        if (null != c && this.model.isEdge(c.cell)) {
            g.style = "edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];";
            g.geometry.relative = !0;
            g.connectable = !1;
            var d = this.view.getRelativePoint(c, a, b);
            g.geometry.x = Math.round(1E4 * d.x) / 1E4;
            g.geometry.y = Math.round(d.y);
            g.geometry.offset =
                new mxPoint(0, 0);
            d = this.view.getPoint(c, g.geometry);
            var l = this.view.scale;
            g.geometry.offset = new mxPoint(Math.round((a - d.x) / l), Math.round((b - d.y) / l))
        } else d = this.view.translate, g.style = "text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];", g.geometry.width = 40, g.geometry.height = 20, g.geometry.x = Math.round(a / this.view.scale) - d.x - (null != c ? c.origin.x : 0), g.geometry.y = Math.round(b / this.view.scale) - d.y - (null != c ? c.origin.y : 0), g.style += "autosize=1;";
        this.getModel().beginUpdate();
        try {
            this.addCells([g],
                null != c ? c.cell : null), this.fireEvent(new mxEventObject("textInserted", "cells", [g])), this.autoSizeCell(g)
        } finally {
            this.getModel().endUpdate()
        }
        return g
    };
    Graph.prototype.addClickHandler = function(a, b, c) {
        var g = mxUtils.bind(this, function() {
            var a = this.container.getElementsByTagName("a");
            if (null != a)
                for (var g = 0; g < a.length; g++) {
                    var c = this.getAbsoluteUrl(a[g].getAttribute("href"));
                    null != c && (a[g].setAttribute("rel", this.linkRelation), a[g].setAttribute("href", c), null != b && mxEvent.addGestureListeners(a[g], null, null,
                        b))
                }
        });
        this.model.addListener(mxEvent.CHANGE, g);
        g();
        var d = this.container.style.cursor,
            l = this.getTolerance(),
            e = this,
            f = {
                currentState: null,
                currentLink: null,
                currentTarget: null,
                highlight: null != a && "" != a && a != mxConstants.NONE ? new mxCellHighlight(e, a, 4) : null,
                startX: 0,
                startY: 0,
                scrollLeft: 0,
                scrollTop: 0,
                updateCurrentState: function(a) {
                    var b = a.sourceState;
                    if (null == b || null == e.getLinkForCell(b.cell)) a = e.getCellAt(a.getGraphX(), a.getGraphY(), null, null, null, function(a, b, g) {
                            return null == e.getLinkForCell(a.cell)
                        }), b =
                        e.view.getState(a);
                    b != this.currentState && (null != this.currentState && this.clear(), this.currentState = b, null != this.currentState && this.activate(this.currentState))
                },
                mouseDown: function(a, b) {
                    this.startX = b.getGraphX();
                    this.startY = b.getGraphY();
                    this.scrollLeft = e.container.scrollLeft;
                    this.scrollTop = e.container.scrollTop;
                    null == this.currentLink && "auto" == e.container.style.overflow && (e.container.style.cursor = "move");
                    this.updateCurrentState(b)
                },
                mouseMove: function(a, b) {
                    if (e.isMouseDown) null != this.currentLink && (a =
                        Math.abs(this.startX - b.getGraphX()), b = Math.abs(this.startY - b.getGraphY()), (a > l || b > l) && this.clear());
                    else {
                        for (a = b.getSource(); null != a && "a" != a.nodeName.toLowerCase();) a = a.parentNode;
                        null != a ? this.clear() : (null != e.tooltipHandler && null != this.currentLink && null != this.currentState && e.tooltipHandler.reset(b, !0, this.currentState), (null == this.currentState || b.getState() != this.currentState && null != b.sourceState || !e.intersects(this.currentState, b.getGraphX(), b.getGraphY())) && this.updateCurrentState(b))
                    }
                },
                mouseUp: function(a,
                    g) {
                    var d = g.getSource();
                    for (a = g.getEvent(); null != d && "a" != d.nodeName.toLowerCase();) d = d.parentNode;
                    null == d && Math.abs(this.scrollLeft - e.container.scrollLeft) < l && Math.abs(this.scrollTop - e.container.scrollTop) < l && (null == g.sourceState || !g.isSource(g.sourceState.control)) && ((mxEvent.isLeftMouseButton(a) || mxEvent.isMiddleMouseButton(a)) && !mxEvent.isPopupTrigger(a) || mxEvent.isTouchEvent(a)) && (null != this.currentLink ? (d = e.isBlankLink(this.currentLink), "data:" !== this.currentLink.substring(0, 5) && d || null == b || b(a,
                        this.currentLink), mxEvent.isConsumed(a) || (a = null != this.currentTarget ? this.currentTarget : mxEvent.isMiddleMouseButton(a) ? "_blank" : d ? e.linkTarget : "_top", e.openLink(this.currentLink, a), g.consume())) : null != c && !g.isConsumed() && Math.abs(this.scrollLeft - e.container.scrollLeft) < l && Math.abs(this.scrollTop - e.container.scrollTop) < l && Math.abs(this.startX - g.getGraphX()) < l && Math.abs(this.startY - g.getGraphY()) < l && c(g.getEvent()));
                    this.clear()
                },
                activate: function(a) {
                    this.currentLink = e.getAbsoluteUrl(e.getLinkForCell(a.cell));
                    null != this.currentLink && (this.currentTarget = e.getLinkTargetForCell(a.cell), e.container.style.cursor = "pointer", null != this.highlight && this.highlight.highlight(a))
                },
                clear: function() {
                    null != e.container && (e.container.style.cursor = d);
                    this.currentLink = this.currentState = this.currentTarget = null;
                    null != this.highlight && this.highlight.hide();
                    null != e.tooltipHandler && e.tooltipHandler.hide()
                }
            };
        e.click = function(a) {};
        e.addMouseListener(f);
        mxEvent.addListener(document, "mouseleave", function(a) {
            f.clear()
        })
    };
    Graph.prototype.duplicateCells =
        function(a, b) {
            a = null != a ? a : this.getSelectionCells();
            b = null != b ? b : !0;
            for (var g = 0; g < a.length; g++) this.isTableCell(a[g]) && (a[g] = this.model.getParent(a[g]));
            a = this.model.getTopmostCells(a);
            var c = this.getModel(),
                d = this.gridSize,
                l = [];
            c.beginUpdate();
            try {
                var e = this.cloneCells(a, !1, null, !0);
                for (g = 0; g < a.length; g++) {
                    var f = c.getParent(a[g]),
                        h = this.moveCells([e[g]], d, d, !1)[0];
                    l.push(h);
                    if (b) c.add(f, e[g]);
                    else {
                        var k = f.getIndex(a[g]);
                        c.add(f, e[g], k + 1)
                    }
                    if (this.isTable(f)) {
                        var n = this.getCellGeometry(e[g]),
                            m = this.getCellGeometry(f);
                        null != n && null != m && (m = m.clone(), m.height += n.height, c.setGeometry(f, m))
                    }
                }
            } finally {
                c.endUpdate()
            }
            return l
        };
    Graph.prototype.insertImage = function(a, b, c) {
        if (null != a && null != this.cellEditor.textarea) {
            for (var g = this.cellEditor.textarea.getElementsByTagName("img"), d = [], l = 0; l < g.length; l++) d.push(g[l]);
            document.execCommand("insertimage", !1, a);
            a = this.cellEditor.textarea.getElementsByTagName("img");
            if (a.length == d.length + 1)
                for (l = a.length - 1; 0 <= l; l--)
                    if (0 == l || a[l] != d[l - 1]) {
                        a[l].setAttribute("width", b);
                        a[l].setAttribute("height",
                            c);
                        break
                    }
        }
    };
    Graph.prototype.insertLink = function(a) {
        if (null != this.cellEditor.textarea)
            if (0 == a.length) document.execCommand("unlink", !1);
            else if (mxClient.IS_FF) {
            for (var b = this.cellEditor.textarea.getElementsByTagName("a"), g = [], c = 0; c < b.length; c++) g.push(b[c]);
            document.execCommand("createlink", !1, mxUtils.trim(a));
            b = this.cellEditor.textarea.getElementsByTagName("a");
            if (b.length == g.length + 1)
                for (c = b.length - 1; 0 <= c; c--)
                    if (b[c] != g[c - 1]) {
                        for (b = b[c].getElementsByTagName("a"); 0 < b.length;) {
                            for (g = b[0].parentNode; null !=
                                b[0].firstChild;) g.insertBefore(b[0].firstChild, b[0]);
                            g.removeChild(b[0])
                        }
                        break
                    }
        } else document.execCommand("createlink", !1, mxUtils.trim(a))
    };
    Graph.prototype.isCellResizable = function(a) {
        var b = mxGraph.prototype.isCellResizable.apply(this, arguments),
            c = this.getCurrentCellStyle(a);
        return !this.isTableCell(a) && !this.isTableRow(a) && (b || "0" != mxUtils.getValue(c, mxConstants.STYLE_RESIZABLE, "1") && "wrap" == c[mxConstants.STYLE_WHITE_SPACE])
    };
    Graph.prototype.distributeCells = function(a, b) {
        null == b && (b = this.getSelectionCells());
        if (null != b && 1 < b.length) {
            for (var c = [], g = null, d = null, l = 0; l < b.length; l++)
                if (this.getModel().isVertex(b[l])) {
                    var e = this.view.getState(b[l]);
                    if (null != e) {
                        var f = a ? e.getCenterX() : e.getCenterY();
                        g = null != g ? Math.max(g, f) : f;
                        d = null != d ? Math.min(d, f) : f;
                        c.push(e)
                    }
                } if (2 < c.length) {
                c.sort(function(b, c) {
                    return a ? b.x - c.x : b.y - c.y
                });
                e = this.view.translate;
                f = this.view.scale;
                d = d / f - (a ? e.x : e.y);
                g = g / f - (a ? e.x : e.y);
                this.getModel().beginUpdate();
                try {
                    var h = (g - d) / (c.length - 1);
                    g = d;
                    for (l = 1; l < c.length - 1; l++) {
                        var k = this.view.getState(this.model.getParent(c[l].cell)),
                            m = this.getCellGeometry(c[l].cell);
                        g += h;
                        null != m && null != k && (m = m.clone(), a ? m.x = Math.round(g - m.width / 2) - k.origin.x : m.y = Math.round(g - m.height / 2) - k.origin.y, this.getModel().setGeometry(c[l].cell, m))
                    }
                } finally {
                    this.getModel().endUpdate()
                }
            }
        }
        return b
    };
    Graph.prototype.isCloneEvent = function(a) {
        return mxClient.IS_MAC && mxEvent.isMetaDown(a) || mxEvent.isControlDown(a)
    };
    Graph.prototype.createSvgImageExport = function() {
        var a = new mxImageExport;
        a.getLinkForCellState = mxUtils.bind(this, function(a, b) {
            return this.getLinkForCell(a.cell)
        });
        return a
    };
    Graph.prototype.getSvg = function(a, b, c, d, e, f, h, k, m, n, p, q, r, t) {
        var g = null;
        if (null != t)
            for (g = new mxDictionary, p = 0; p < t.length; p++) g.put(t[p], !0);
        if (t = this.useCssTransforms) this.useCssTransforms = !1, this.view.revalidate(), this.sizeDidChange();
        try {
            b = null != b ? b : 1;
            c = null != c ? c : 0;
            e = null != e ? e : !0;
            f = null != f ? f : !0;
            h = null != h ? h : !0;
            var l = "page" == r ? this.view.getBackgroundPageBounds() : f && null == g || d || "diagram" == r ? this.getGraphBounds() : this.getBoundingBox(this.getSelectionCells());
            if (null == l) throw Error(mxResources.get("drawingEmpty"));
            var v = this.view.scale,
                B = mxUtils.createXmlDocument(),
                A = null != B.createElementNS ? B.createElementNS(mxConstants.NS_SVG, "svg") : B.createElement("svg");
            null != a && (null != A.style ? A.style.backgroundColor = a : A.setAttribute("style", "background-color:" + a));
            null == B.createElementNS ? (A.setAttribute("xmlns", mxConstants.NS_SVG), A.setAttribute("xmlns:xlink", mxConstants.NS_XLINK)) : A.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", mxConstants.NS_XLINK);
            a = b / v;
            var H = Math.max(1, Math.ceil(l.width * a) + 2 * c) + (n ? 5 :
                    0),
                F = Math.max(1, Math.ceil(l.height * a) + 2 * c) + (n ? 5 : 0);
            A.setAttribute("version", "1.1");
            A.setAttribute("width", H + "px");
            A.setAttribute("height", F + "px");
            A.setAttribute("viewBox", (e ? "-0.5 -0.5" : "0 0") + " " + H + " " + F);
            B.appendChild(A);
            var P = null != B.createElementNS ? B.createElementNS(mxConstants.NS_SVG, "g") : B.createElement("g");
            A.appendChild(P);
            var D = this.createSvgCanvas(P);
            D.foOffset = e ? -.5 : 0;
            D.textOffset = e ? -.5 : 0;
            D.imageOffset = e ? -.5 : 0;
            D.translate(Math.floor((c / b - l.x) / v), Math.floor((c / b - l.y) / v));
            var u = document.createElement("div"),
                x = D.getAlternateText;
            D.getAlternateText = function(a, b, c, g, d, l, e, f, v, h, A, B, k) {
                if (null != l && 0 < this.state.fontSize) try {
                    mxUtils.isNode(l) ? l = l.innerText : (u.innerHTML = l, l = mxUtils.extractTextWithWhitespace(u.childNodes));
                    for (var m = Math.ceil(2 * g / this.state.fontSize), n = [], p = 0, H = 0;
                        (0 == m || p < m) && H < l.length;) {
                        var F = l.charCodeAt(H);
                        if (10 == F || 13 == F) {
                            if (0 < p) break
                        } else n.push(l.charAt(H)), 255 > F && p++;
                        H++
                    }
                    n.length < l.length && 1 < l.length - n.length && (l = mxUtils.trim(n.join("")) + "...");
                    return l
                } catch (ta) {
                    return x.apply(this,
                        arguments)
                } else return x.apply(this, arguments)
            };
            var w = this.backgroundImage;
            if (null != w) {
                b = v / b;
                var y = this.view.translate,
                    aa = new mxRectangle(y.x * b, y.y * b, w.width * b, w.height * b);
                mxUtils.intersects(l, aa) && D.image(y.x, y.y, w.width, w.height, w.src, !0)
            }
            D.scale(a);
            D.textEnabled = h;
            k = null != k ? k : this.createSvgImageExport();
            var z = k.drawCellState,
                Z = k.getLinkForCellState;
            k.getLinkForCellState = function(a, b) {
                var c = Z.apply(this, arguments);
                return null == c || a.view.graph.isCustomLink(c) ? null : c
            };
            k.getLinkTargetForCellState =
                function(a, b) {
                    return a.view.graph.getLinkTargetForCell(a.cell)
                };
            k.drawCellState = function(a, b) {
                for (var c = a.view.graph, d = null != g ? g.get(a.cell) : c.isCellSelected(a.cell), l = c.model.getParent(a.cell); !(f && null == g || d) && null != l;) d = null != g ? g.get(l) : c.isCellSelected(l), l = c.model.getParent(l);
                (f && null == g || d) && z.apply(this, arguments)
            };
            k.drawState(this.getView().getState(this.model.root), D);
            this.updateSvgLinks(A, m, !0);
            this.addForeignObjectWarning(D, A);
            return A
        } finally {
            t && (this.useCssTransforms = !0, this.view.revalidate(),
                this.sizeDidChange())
        }
    };
    Graph.prototype.addForeignObjectWarning = function(a, b) {
        if ("0" != urlParams["svg-warning"] && 0 < b.getElementsByTagName("foreignObject").length) {
            var c = a.createElement("switch"),
                g = a.createElement("g");
            g.setAttribute("requiredFeatures", "http://www.w3.org/TR/SVG11/feature#Extensibility");
            var d = a.createElement("a");
            d.setAttribute("transform", "translate(0,-5)");
            null == d.setAttributeNS || b.ownerDocument != document && null == document.documentMode ? (d.setAttribute("xlink:href", Graph.foreignObjectWarningLink),
                d.setAttribute("target", "_blank")) : (d.setAttributeNS(mxConstants.NS_XLINK, "xlink:href", Graph.foreignObjectWarningLink), d.setAttributeNS(mxConstants.NS_XLINK, "target", "_blank"));
            a = a.createElement("text");
            a.setAttribute("text-anchor", "middle");
            a.setAttribute("font-size", "10px");
            a.setAttribute("x", "50%");
            a.setAttribute("y", "100%");
            mxUtils.write(a, Graph.foreignObjectWarningText);
            c.appendChild(g);
            d.appendChild(a);
            c.appendChild(d);
            b.appendChild(c)
        }
    };
    Graph.prototype.updateSvgLinks = function(a, b, c) {
        a = a.getElementsByTagName("a");
        for (var g = 0; g < a.length; g++)
            if (null == a[g].getAttribute("target")) {
                var d = a[g].getAttribute("href");
                null == d && (d = a[g].getAttribute("xlink:href"));
                null != d && (null != b && /^https?:\/\//.test(d) ? a[g].setAttribute("target", b) : c && this.isCustomLink(d) && a[g].setAttribute("href", "javascript:void(0);"))
            }
    };
    Graph.prototype.createSvgCanvas = function(a) {
        a = new mxSvgCanvas2D(a);
        a.pointerEvents = !0;
        return a
    };
    Graph.prototype.getSelectedElement = function() {
        var a = null;
        if (window.getSelection) {
            var b = window.getSelection();
            b.getRangeAt &&
                b.rangeCount && (a = b.getRangeAt(0).commonAncestorContainer)
        } else document.selection && (a = document.selection.createRange().parentElement());
        return a
    };
    Graph.prototype.getSelectedEditingElement = function() {
        for (var a = this.getSelectedElement(); null != a && a.nodeType != mxConstants.NODETYPE_ELEMENT;) a = a.parentNode;
        null != a && a == this.cellEditor.textarea && 1 == this.cellEditor.textarea.children.length && this.cellEditor.textarea.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT && (a = this.cellEditor.textarea.firstChild);
        return a
    };
    Graph.prototype.getParentByName = function(a, b, c) {
        for (; null != a && a.nodeName != b;) {
            if (a == c) return null;
            a = a.parentNode
        }
        return a
    };
    Graph.prototype.getParentByNames = function(a, b, c) {
        for (; null != a && !(0 <= mxUtils.indexOf(b, a.nodeName));) {
            if (a == c) return null;
            a = a.parentNode
        }
        return a
    };
    Graph.prototype.selectNode = function(a) {
        var b = null;
        if (window.getSelection) {
            if (b = window.getSelection(), b.getRangeAt && b.rangeCount) {
                var c = document.createRange();
                c.selectNode(a);
                b.removeAllRanges();
                b.addRange(c)
            }
        } else(b = document.selection) &&
            "Control" != b.type && (a = b.createRange(), a.collapse(!0), c = b.createRange(), c.setEndPoint("StartToStart", a), c.select())
    };
    Graph.prototype.deleteCells = function(a, b) {
        var c = null;
        if (null != a && 0 < a.length) {
            this.model.beginUpdate();
            try {
                for (var g = 0; g < a.length; g++) {
                    var d = this.model.getParent(a[g]);
                    if (this.isTable(d)) {
                        var l = this.getCellGeometry(a[g]),
                            e = this.getCellGeometry(d);
                        null != l && null != e && (e = e.clone(), e.height -= l.height, this.model.setGeometry(d, e))
                    }
                }
                var f = this.selectParentAfterDelete ? this.model.getParents(a) :
                    null;
                this.removeCells(a, b)
            } finally {
                this.model.endUpdate()
            }
            if (null != f)
                for (c = [], g = 0; g < f.length; g++) this.model.contains(f[g]) && (this.model.isVertex(f[g]) || this.model.isEdge(f[g])) && c.push(f[g])
        }
        return c
    };
    Graph.prototype.insertTableColumn = function(a, b) {
        var c = this.getModel();
        c.beginUpdate();
        try {
            var g = a,
                d = 0;
            if (this.isTableCell(a)) {
                var l = c.getParent(a);
                g = c.getParent(l);
                d = mxUtils.indexOf(c.getChildCells(l, !0), a)
            } else this.isTableRow(a) ? g = c.getParent(a) : a = c.getChildCells(g, !0)[0], b || (d = c.getChildCells(a, !0).length -
                1);
            var e = c.getChildCells(g, !0),
                f = Graph.minTableColumnWidth;
            for (a = 0; a < e.length; a++) {
                var h = c.getChildCells(e[a], !0)[d],
                    k = c.cloneCell(h, !1),
                    m = this.getCellGeometry(k);
                k.value = null;
                if (null != m) {
                    f = m.width;
                    var n = this.getCellGeometry(e[a]);
                    null != n && (m.height = n.height)
                }
                c.add(e[a], k, d + (b ? 0 : 1))
            }
            var p = this.getCellGeometry(g);
            null != p && (p = p.clone(), p.width += f, c.setGeometry(g, p))
        } finally {
            c.endUpdate()
        }
    };
    Graph.prototype.insertTableRow = function(a, b) {
        var c = this.getModel();
        c.beginUpdate();
        try {
            var g = a,
                d = a;
            if (this.isTableCell(a)) d =
                c.getParent(a), g = c.getParent(d);
            else if (this.isTableRow(a)) g = c.getParent(a);
            else {
                var l = c.getChildCells(g, !0);
                d = l[b ? 0 : l.length - 1]
            }
            var e = c.getChildCells(d, !0),
                f = g.getIndex(d);
            d = c.cloneCell(d, !1);
            d.value = null;
            var h = this.getCellGeometry(d);
            if (null != h) {
                for (l = 0; l < e.length; l++) {
                    a = c.cloneCell(e[l], !1);
                    d.insert(a);
                    a.value = null;
                    var k = this.getCellGeometry(a);
                    null != k && (k.height = h.height)
                }
                c.add(g, d, f + (b ? 0 : 1));
                var m = this.getCellGeometry(g);
                null != m && (m = m.clone(), m.height += h.height, c.setGeometry(g, m))
            }
        } finally {
            c.endUpdate()
        }
    };
    Graph.prototype.deleteTableColumn = function(a) {
        var b = this.getModel();
        b.beginUpdate();
        try {
            var c = a,
                g = a;
            this.isTableCell(a) && (g = b.getParent(a));
            this.isTableRow(g) && (c = b.getParent(g));
            var d = b.getChildCells(c, !0);
            if (0 == d.length) b.remove(c);
            else {
                this.isTableRow(g) || (g = d[0]);
                var e = b.getChildCells(g, !0);
                if (1 >= e.length) b.remove(c);
                else {
                    var f = e.length - 1;
                    this.isTableCell(a) && (f = mxUtils.indexOf(e, a));
                    for (g = a = 0; g < d.length; g++) {
                        var h = b.getChildCells(d[g], !0)[f];
                        b.remove(h);
                        var k = this.getCellGeometry(h);
                        null != k &&
                            (a = Math.max(a, k.width))
                    }
                    var m = this.getCellGeometry(c);
                    null != m && (m = m.clone(), m.width -= a, b.setGeometry(c, m))
                }
            }
        } finally {
            b.endUpdate()
        }
    };
    Graph.prototype.deleteTableRow = function(a) {
        var b = this.getModel();
        b.beginUpdate();
        try {
            var c = a,
                g = a;
            this.isTableCell(a) && (a = g = b.getParent(a));
            this.isTableRow(a) && (c = b.getParent(g));
            var d = b.getChildCells(c, !0);
            if (1 >= d.length) b.remove(c);
            else {
                this.isTableRow(g) || (g = d[d.length - 1]);
                b.remove(g);
                a = 0;
                var e = this.getCellGeometry(g);
                null != e && (a = e.height);
                var f = this.getCellGeometry(c);
                null != f && (f = f.clone(), f.height -= a, b.setGeometry(c, f))
            }
        } finally {
            b.endUpdate()
        }
    };
    Graph.prototype.insertRow = function(a, b) {
        for (var c = a.tBodies[0], g = c.rows[0].cells, d = a = 0; d < g.length; d++) {
            var e = g[d].getAttribute("colspan");
            a += null != e ? parseInt(e) : 1
        }
        b = c.insertRow(b);
        for (d = 0; d < a; d++) mxUtils.br(b.insertCell(-1));
        return b.cells[0]
    };
    Graph.prototype.deleteRow = function(a, b) {
        a.tBodies[0].deleteRow(b)
    };
    Graph.prototype.insertColumn = function(a, b) {
        var c = a.tHead;
        if (null != c)
            for (var g = 0; g < c.rows.length; g++) {
                var d = document.createElement("th");
                c.rows[g].appendChild(d);
                mxUtils.br(d)
            }
        a = a.tBodies[0];
        for (c = 0; c < a.rows.length; c++) g = a.rows[c].insertCell(b), mxUtils.br(g);
        return a.rows[0].cells[0 <= b ? b : a.rows[0].cells.length - 1]
    };
    Graph.prototype.deleteColumn = function(a, b) {
        if (0 <= b) {
            a = a.tBodies[0].rows;
            for (var c = 0; c < a.length; c++) a[c].cells.length > b && a[c].deleteCell(b)
        }
    };
    Graph.prototype.pasteHtmlAtCaret = function(a) {
        if (window.getSelection) {
            var b = window.getSelection();
            if (b.getRangeAt && b.rangeCount) {
                b = b.getRangeAt(0);
                b.deleteContents();
                var c = document.createElement("div");
                c.innerHTML = a;
                a = document.createDocumentFragment();
                for (var g; g = c.firstChild;) lastNode = a.appendChild(g);
                b.insertNode(a)
            }
        } else(b = document.selection) && "Control" != b.type && b.createRange().pasteHTML(a)
    };
    Graph.prototype.createLinkForHint = function(a, b) {
        function c(a, b) {
            a.length > b && (a = a.substring(0, Math.round(b / 2)) + "..." + a.substring(a.length - Math.round(b / 4)));
            return a
        }
        a = null != a ? a : "javascript:void(0);";
        if (null == b || 0 == b.length) b = this.isCustomLink(a) ? this.getLinkTitle(a) : a;
        var g = document.createElement("a");
        g.setAttribute("rel",
            this.linkRelation);
        g.setAttribute("href", this.getAbsoluteUrl(a));
        g.setAttribute("title", c(this.isCustomLink(a) ? this.getLinkTitle(a) : a, 80));
        null != this.linkTarget && g.setAttribute("target", this.linkTarget);
        mxUtils.write(g, c(b, 40));
        this.isCustomLink(a) && mxEvent.addListener(g, "click", mxUtils.bind(this, function(b) {
            this.customLinkClicked(a);
            mxEvent.consume(b)
        }));
        return g
    };
    Graph.prototype.initTouch = function() {
        this.connectionHandler.marker.isEnabled = function() {
            return null != this.graph.connectionHandler.first
        };
        this.addListener(mxEvent.START_EDITING, function(a, b) {
            this.popupMenuHandler.hideMenu()
        });
        var a = this.updateMouseEvent;
        this.updateMouseEvent = function(b) {
            b = a.apply(this, arguments);
            if (mxEvent.isTouchEvent(b.getEvent()) && null == b.getState()) {
                var c = this.getCellAt(b.graphX, b.graphY);
                null != c && this.isSwimlane(c) && this.hitsSwimlaneContent(c, b.graphX, b.graphY) || (b.state = this.view.getState(c), null != b.state && null != b.state.shape && (this.container.style.cursor = b.state.shape.node.style.cursor))
            }
            null == b.getState() &&
                this.isEnabled() && (this.container.style.cursor = "default");
            return b
        };
        var b = !1,
            c = !1,
            d = !1,
            e = this.fireMouseEvent;
        this.fireMouseEvent = function(a, g, l) {
            a == mxEvent.MOUSE_DOWN && (g = this.updateMouseEvent(g), b = this.isCellSelected(g.getCell()), c = this.isSelectionEmpty(), d = this.popupMenuHandler.isMenuShowing());
            e.apply(this, arguments)
        };
        this.popupMenuHandler.mouseUp = mxUtils.bind(this, function(a, g) {
            this.popupMenuHandler.popupTrigger = !this.isEditing() && this.isEnabled() && (null == g.getState() || !g.isSource(g.getState().control)) &&
                (this.popupMenuHandler.popupTrigger || !d && !mxEvent.isMouseEvent(g.getEvent()) && (c && null == g.getCell() && this.isSelectionEmpty() || b && this.isCellSelected(g.getCell())));
            mxPopupMenuHandler.prototype.mouseUp.apply(this.popupMenuHandler, arguments)
        })
    };
    mxCellEditor.prototype.isContentEditing = function() {
        var a = this.graph.view.getState(this.editingCell);
        return null != a && 1 == a.style.html
    };
    mxCellEditor.prototype.isTableSelected = function() {
        return null != this.graph.getParentByName(this.graph.getSelectedElement(), "TABLE",
            this.textarea)
    };
    mxCellEditor.prototype.alignText = function(a, b) {
        var c = null != b && mxEvent.isShiftDown(b);
        if (c || null != window.getSelection && null != window.getSelection().containsNode) {
            var g = !0;
            this.graph.processElements(this.textarea, function(a) {
                c || window.getSelection().containsNode(a, !0) ? (a.removeAttribute("align"), a.style.textAlign = null) : g = !1
            });
            g && this.graph.cellEditor.setAlign(a)
        }
        document.execCommand("justify" + a.toLowerCase(), !1, null)
    };
    mxCellEditor.prototype.saveSelection = function() {
        if (window.getSelection) {
            var a =
                window.getSelection();
            if (a.getRangeAt && a.rangeCount) {
                for (var b = [], c = 0, d = a.rangeCount; c < d; ++c) b.push(a.getRangeAt(c));
                return b
            }
        } else if (document.selection && document.selection.createRange) return document.selection.createRange();
        return null
    };
    mxCellEditor.prototype.restoreSelection = function(a) {
        try {
            if (a)
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    for (var b = 0, c = a.length; b < c; ++b) sel.addRange(a[b])
                } else document.selection && a.select && a.select()
        } catch (A) {}
    };
    var y = mxCellRenderer.prototype.initializeLabel;
    mxCellRenderer.prototype.initializeLabel = function(a) {
        null != a.text && (a.text.replaceLinefeeds = "0" != mxUtils.getValue(a.style, "nl2Br", "1"));
        y.apply(this, arguments)
    };
    var C = mxConstraintHandler.prototype.update;
    mxConstraintHandler.prototype.update = function(a, b) {
        this.isKeepFocusEvent(a) || !mxEvent.isAltDown(a.getEvent()) ? C.apply(this, arguments) : this.reset()
    };
    mxGuide.prototype.createGuideShape = function(a) {
        return new mxPolyline([], mxConstants.GUIDE_COLOR, mxConstants.GUIDE_STROKEWIDTH)
    };
    mxCellEditor.prototype.escapeCancelsEditing = !1;
    var G = mxCellEditor.prototype.startEditing;
    mxCellEditor.prototype.startEditing = function(a, b) {
        a = this.graph.getStartEditingCell(a, b);
        G.apply(this, arguments);
        var c = this.graph.view.getState(a);
        this.textarea.className = null != c && 1 == c.style.html ? "mxCellEditor geContentEditable" : "mxCellEditor mxPlainTextEditor";
        this.codeViewMode = !1;
        this.switchSelectionState = null;
        this.graph.setSelectionCell(a);
        c = this.graph.getModel().getParent(a);
        var g = this.graph.getCellGeometry(a);
        if (this.graph.getModel().isEdge(c) && null !=
            g && g.relative || this.graph.getModel().isEdge(a)) this.textarea.style.outline = mxClient.IS_IE || mxClient.IS_IE11 || mxClient.IS_FF && mxClient.IS_WIN ? "gray dotted 1px" : ""
    };
    var J = mxCellEditor.prototype.installListeners;
    mxCellEditor.prototype.installListeners = function(a) {
        function b(a, c) {
            c.originalNode = a;
            a = a.firstChild;
            for (var g = c.firstChild; null != a && null != g;) b(a, g), a = a.nextSibling, g = g.nextSibling;
            return c
        }

        function c(a, b) {
            if (null != a)
                if (b.originalNode != a) g(a);
                else
                    for (a = a.firstChild, b = b.firstChild; null != a;) {
                        var d =
                            a.nextSibling;
                        null == b ? g(a) : (c(a, b), b = b.nextSibling);
                        a = d
                    }
        }

        function g(a) {
            for (var b = a.firstChild; null != b;) {
                var c = b.nextSibling;
                g(b);
                b = c
            }
            1 == a.nodeType && ("BR" === a.nodeName || null != a.firstChild) || 3 == a.nodeType && 0 != mxUtils.trim(mxUtils.getTextContent(a)).length ? (3 == a.nodeType && mxUtils.setTextContent(a, mxUtils.getTextContent(a).replace(/\n|\r/g, "")), 1 == a.nodeType && (a.removeAttribute("style"), a.removeAttribute("class"), a.removeAttribute("width"), a.removeAttribute("cellpadding"), a.removeAttribute("cellspacing"),
                a.removeAttribute("border"))) : a.parentNode.removeChild(a)
        }
        J.apply(this, arguments);
        7 !== document.documentMode && 8 !== document.documentMode && mxEvent.addListener(this.textarea, "paste", mxUtils.bind(this, function(a) {
            var g = b(this.textarea, this.textarea.cloneNode(!0));
            window.setTimeout(mxUtils.bind(this, function() {
                    null != this.textarea && (0 <= this.textarea.innerHTML.indexOf("<o:OfficeDocumentSettings>") || 0 <= this.textarea.innerHTML.indexOf("\x3c!--[if !mso]>") ? c(this.textarea, g) : Graph.removePasteFormatting(this.textarea))
                }),
                0)
        }))
    };
    mxCellEditor.prototype.toggleViewMode = function() {
        var a = this.graph.view.getState(this.editingCell);
        if (null != a) {
            var b = null != a && "0" != mxUtils.getValue(a.style, "nl2Br", "1"),
                c = this.saveSelection();
            if (this.codeViewMode) {
                k = mxUtils.extractTextWithWhitespace(this.textarea.childNodes);
                0 < k.length && "\n" == k.charAt(k.length - 1) && (k = k.substring(0, k.length - 1));
                k = this.graph.sanitizeHtml(b ? k.replace(/\n/g, "<br/>") : k, !0);
                this.textarea.className = "mxCellEditor geContentEditable";
                m = mxUtils.getValue(a.style, mxConstants.STYLE_FONTSIZE,
                    mxConstants.DEFAULT_FONTSIZE);
                b = mxUtils.getValue(a.style, mxConstants.STYLE_FONTFAMILY, mxConstants.DEFAULT_FONTFAMILY);
                var d = mxUtils.getValue(a.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_LEFT),
                    e = (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD,
                    f = (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC,
                    h = [];
                (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_UNDERLINE) ==
                mxConstants.FONT_UNDERLINE && h.push("underline");
                (mxUtils.getValue(a.style, mxConstants.STYLE_FONTSTYLE, 0) & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH && h.push("line-through");
                this.textarea.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? Math.round(m * mxConstants.LINE_HEIGHT) + "px" : mxConstants.LINE_HEIGHT;
                this.textarea.style.fontSize = Math.round(m) + "px";
                this.textarea.style.textDecoration = h.join(" ");
                this.textarea.style.fontWeight = e ? "bold" : "normal";
                this.textarea.style.fontStyle = f ? "italic" :
                    "";
                this.textarea.style.fontFamily = b;
                this.textarea.style.textAlign = d;
                this.textarea.style.padding = "0px";
                this.textarea.innerHTML != k && (this.textarea.innerHTML = k, 0 == this.textarea.innerHTML.length && (this.textarea.innerHTML = this.getEmptyLabelText(), this.clearOnChange = 0 < this.textarea.innerHTML.length));
                this.codeViewMode = !1
            } else {
                this.clearOnChange && this.textarea.innerHTML == this.getEmptyLabelText() && (this.clearOnChange = !1, this.textarea.innerHTML = "");
                var k = mxUtils.htmlEntities(this.textarea.innerHTML);
                8 != document.documentMode &&
                    (k = mxUtils.replaceTrailingNewlines(k, "<div><br></div>"));
                k = this.graph.sanitizeHtml(b ? k.replace(/\n/g, "").replace(/&lt;br\s*.?&gt;/g, "<br>") : k, !0);
                this.textarea.className = "mxCellEditor mxPlainTextEditor";
                var m = mxConstants.DEFAULT_FONTSIZE;
                this.textarea.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT ? Math.round(m * mxConstants.LINE_HEIGHT) + "px" : mxConstants.LINE_HEIGHT;
                this.textarea.style.fontSize = Math.round(m) + "px";
                this.textarea.style.textDecoration = "";
                this.textarea.style.fontWeight = "normal";
                this.textarea.style.fontStyle =
                    "";
                this.textarea.style.fontFamily = mxConstants.DEFAULT_FONTFAMILY;
                this.textarea.style.textAlign = "left";
                this.textarea.style.padding = "2px";
                this.textarea.innerHTML != k && (this.textarea.innerHTML = k);
                this.codeViewMode = !0
            }
            this.textarea.focus();
            null != this.switchSelectionState && this.restoreSelection(this.switchSelectionState);
            this.switchSelectionState = c;
            this.resize()
        }
    };
    var E = mxCellEditor.prototype.resize;
    mxCellEditor.prototype.resize = function(a, b) {
        if (null != this.textarea)
            if (a = this.graph.getView().getState(this.editingCell),
                this.codeViewMode && null != a) {
                var c = a.view.scale;
                this.bounds = mxRectangle.fromRectangle(a);
                if (0 == this.bounds.width && 0 == this.bounds.height) {
                    this.bounds.width = 160 * c;
                    this.bounds.height = 60 * c;
                    var g = null != a.text ? a.text.margin : null;
                    null == g && (g = mxUtils.getAlignmentAsPoint(mxUtils.getValue(a.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER), mxUtils.getValue(a.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE)));
                    this.bounds.x += g.x * this.bounds.width;
                    this.bounds.y += g.y * this.bounds.height
                }
                this.textarea.style.width =
                    Math.round((this.bounds.width - 4) / c) + "px";
                this.textarea.style.height = Math.round((this.bounds.height - 4) / c) + "px";
                this.textarea.style.overflow = "auto";
                this.textarea.clientHeight < this.textarea.offsetHeight && (this.textarea.style.height = Math.round(this.bounds.height / c) + (this.textarea.offsetHeight - this.textarea.clientHeight) + "px", this.bounds.height = parseInt(this.textarea.style.height) * c);
                this.textarea.clientWidth < this.textarea.offsetWidth && (this.textarea.style.width = Math.round(this.bounds.width / c) + (this.textarea.offsetWidth -
                    this.textarea.clientWidth) + "px", this.bounds.width = parseInt(this.textarea.style.width) * c);
                this.textarea.style.left = Math.round(this.bounds.x) + "px";
                this.textarea.style.top = Math.round(this.bounds.y) + "px";
                mxUtils.setPrefixedStyle(this.textarea.style, "transform", "scale(" + c + "," + c + ")")
            } else this.textarea.style.height = "", this.textarea.style.overflow = "", E.apply(this, arguments)
    };
    mxCellEditorGetInitialValue = mxCellEditor.prototype.getInitialValue;
    mxCellEditor.prototype.getInitialValue = function(a, b) {
        if ("0" == mxUtils.getValue(a.style,
                "html", "0")) return mxCellEditorGetInitialValue.apply(this, arguments);
        var c = this.graph.getEditingValue(a.cell, b);
        "1" == mxUtils.getValue(a.style, "nl2Br", "1") && (c = c.replace(/\n/g, "<br/>"));
        return c = this.graph.sanitizeHtml(c, !0)
    };
    mxCellEditorGetCurrentValue = mxCellEditor.prototype.getCurrentValue;
    mxCellEditor.prototype.getCurrentValue = function(a) {
        if ("0" == mxUtils.getValue(a.style, "html", "0")) return mxCellEditorGetCurrentValue.apply(this, arguments);
        var b = this.graph.sanitizeHtml(this.textarea.innerHTML, !0);
        return b = "1" == mxUtils.getValue(a.style, "nl2Br", "1") ? b.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>") : b.replace(/\r\n/g, "").replace(/\n/g, "")
    };
    var L = mxCellEditor.prototype.stopEditing;
    mxCellEditor.prototype.stopEditing = function(a) {
        this.codeViewMode && this.toggleViewMode();
        L.apply(this, arguments);
        this.focusContainer()
    };
    mxCellEditor.prototype.focusContainer = function() {
        try {
            this.graph.container.focus()
        } catch (g) {}
    };
    var M = mxCellEditor.prototype.applyValue;
    mxCellEditor.prototype.applyValue = function(a, b) {
        this.graph.getModel().beginUpdate();
        try {
            M.apply(this, arguments), "" == b && this.graph.isCellDeletable(a.cell) && 0 == this.graph.model.getChildCount(a.cell) && this.graph.isTransparentState(a) && this.graph.removeCells([a.cell], !1)
        } finally {
            this.graph.getModel().endUpdate()
        }
    };
    mxCellEditor.prototype.getBackgroundColor = function(a) {
        var b = mxUtils.getValue(a.style, mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, null);
        null != b && b != mxConstants.NONE || !(null != a.cell.geometry && 0 < a.cell.geometry.width) || 0 == mxUtils.getValue(a.style, mxConstants.STYLE_ROTATION, 0) && 0 !=
            mxUtils.getValue(a.style, mxConstants.STYLE_HORIZONTAL, 1) || (b = mxUtils.getValue(a.style, mxConstants.STYLE_FILLCOLOR, null));
        b == mxConstants.NONE && (b = null);
        return b
    };
    mxCellEditor.prototype.getMinimumSize = function(a) {
        var b = this.graph.getView().scale;
        return new mxRectangle(0, 0, null == a.text ? 30 : a.text.size * b + 20, 30)
    };
    mxGraphHandlerIsValidDropTarget = mxGraphHandler.prototype.isValidDropTarget;
    mxGraphHandler.prototype.isValidDropTarget = function(a, b) {
        return mxGraphHandlerIsValidDropTarget.apply(this, arguments) &&
            !mxEvent.isAltDown(b.getEvent)
    };
    mxGraphView.prototype.formatUnitText = function(a) {
        return a ? b(a, this.unit) : a
    };
    mxGraphHandler.prototype.updateHint = function(c) {
        if (null != this.pBounds && (null != this.shape || this.livePreviewActive)) {
            null == this.hint && (this.hint = a(), this.graph.container.appendChild(this.hint));
            var d = this.graph.view.translate,
                g = this.graph.view.scale;
            c = this.roundLength((this.bounds.x + this.currentDx) / g - d.x);
            d = this.roundLength((this.bounds.y + this.currentDy) / g - d.y);
            g = this.graph.view.unit;
            this.hint.innerHTML =
                b(c, g) + ", " + b(d, g);
            this.hint.style.left = this.pBounds.x + this.currentDx + Math.round((this.pBounds.width - this.hint.clientWidth) / 2) + "px";
            this.hint.style.top = this.pBounds.y + this.currentDy + this.pBounds.height + Editor.hintOffset + "px"
        }
    };
    mxGraphHandler.prototype.removeHint = function() {
        null != this.hint && (this.hint.parentNode.removeChild(this.hint), this.hint = null)
    };
    var I = mxStackLayout.prototype.resizeCell;
    mxStackLayout.prototype.resizeCell = function(a, b) {
        I.apply(this, arguments);
        var c = this.graph.getCellStyle(a);
        if (null ==
            c.childLayout) {
            var d = this.graph.model.getParent(a),
                g = null != d ? this.graph.getCellGeometry(d) : null;
            if (null != g && (c = this.graph.getCellStyle(d), "stackLayout" == c.childLayout)) {
                var e = parseFloat(mxUtils.getValue(c, "stackBorder", mxStackLayout.prototype.border));
                c = "1" == mxUtils.getValue(c, "horizontalStack", "1");
                var f = this.graph.getActualStartSize(d);
                g = g.clone();
                c ? g.height = b.height + f.y + f.height + 2 * e : g.width = b.width + f.x + f.width + 2 * e;
                this.graph.model.setGeometry(d, g)
            }
        }
    };
    var t = mxSelectionCellsHandler.prototype.getHandledSelectionCells;
    mxSelectionCellsHandler.prototype.getHandledSelectionCells = function() {
        function a(a) {
            c.get(a) || (c.put(a, !0), e.push(a))
        }
        for (var b = t.apply(this, arguments), c = new mxDictionary, d = this.graph.model, e = [], f = 0; f < b.length; f++) {
            var h = b[f];
            this.graph.isTableCell(h) ? a(d.getParent(d.getParent(h))) : this.graph.isTableRow(h) && a(d.getParent(h));
            a(h)
        }
        return e
    };
    var w = mxVertexHandler.prototype.createParentHighlightShape;
    mxVertexHandler.prototype.createParentHighlightShape = function(a) {
        var b = w.apply(this, arguments);
        b.stroke =
            "#C0C0C0";
        b.strokewidth = 1;
        return b
    };
    var x = mxEdgeHandler.prototype.createParentHighlightShape;
    mxEdgeHandler.prototype.createParentHighlightShape = function(a) {
        var b = x.apply(this, arguments);
        b.stroke = "#C0C0C0";
        b.strokewidth = 1;
        return b
    };
    mxVertexHandler.prototype.rotationHandleVSpacing = -12;
    mxVertexHandler.prototype.getRotationHandlePosition = function() {
        var a = this.getHandlePadding();
        return new mxPoint(this.bounds.x + this.bounds.width - this.rotationHandleVSpacing + a.x / 2, this.bounds.y + this.rotationHandleVSpacing -
            a.y / 2)
    };
    mxVertexHandler.prototype.isRecursiveResize = function(a, b) {
        return this.graph.isRecursiveVertexResize(a) && !mxEvent.isControlDown(b.getEvent())
    };
    mxVertexHandler.prototype.isCenteredEvent = function(a, b) {
        return !(!this.graph.isSwimlane(a.cell) && 0 < this.graph.model.getChildCount(a.cell) && !this.graph.isCellCollapsed(a.cell) && "1" == mxUtils.getValue(a.style, "recursiveResize", "1") && null == mxUtils.getValue(a.style, "childLayout", null)) && mxEvent.isControlDown(b.getEvent()) || mxEvent.isMetaDown(b.getEvent())
    };
    var z = mxVertexHandler.prototype.isRotationHandleVisible;
    mxVertexHandler.prototype.isRotationHandleVisible = function() {
        return z.apply(this, arguments) && !this.graph.isTableCell(this.state.cell) && !this.graph.isTableRow(this.state.cell) && !this.graph.isTable(this.state.cell)
    };
    mxVertexHandler.prototype.getSizerBounds = function() {
        return this.graph.isTableCell(this.state.cell) ? this.graph.view.getState(this.graph.model.getParent(this.graph.model.getParent(this.state.cell))) : this.bounds
    };
    var K = mxVertexHandler.prototype.isParentHighlightVisible;
    mxVertexHandler.prototype.isParentHighlightVisible = function() {
        return K.apply(this, arguments) && !this.graph.isTableCell(this.state.cell) && !this.graph.isTableRow(this.state.cell)
    };
    var N = mxVertexHandler.prototype.isCustomHandleVisible;
    mxVertexHandler.prototype.isCustomHandleVisible = function(a) {
        return a.tableHandle || N.apply(this, arguments) && (!this.graph.isTable(this.state.cell) || this.graph.isCellSelected(this.state.cell))
    };
    mxVertexHandler.prototype.getSelectionBorderInset = function() {
        var a = 0;
        this.graph.isTableRow(this.state.cell) ?
            a = 1 : this.graph.isTableCell(this.state.cell) && (a = 2);
        return a
    };
    var R = mxVertexHandler.prototype.getSelectionBorderBounds;
    mxVertexHandler.prototype.getSelectionBorderBounds = function() {
        return R.apply(this, arguments).grow(-this.getSelectionBorderInset())
    };
    var S = mxVertexHandler.prototype.createCustomHandles;
    mxVertexHandler.prototype.createCustomHandles = function() {
        var a = S.apply(this, arguments);
        if (this.graph.isTable(this.state.cell)) {
            var b = this.graph,
                c = b.model,
                d = this.state,
                e = this.selectionBorder,
                f = this;
            null ==
                a && (a = []);
            var h = b.view.getCellStates(c.getChildCells(this.state.cell, !0));
            if (0 < h.length) {
                var k = b.view.getCellStates(c.getChildCells(h[0].cell, !0));
                for (c = 0; c < k.length; c++) mxUtils.bind(this, function(c) {
                    var g = k[c],
                        l = c < k.length - 1 ? k[c + 1] : null,
                        h = new mxLine(new mxRectangle, mxConstants.NONE, 1, !0);
                    h.isDashed = e.isDashed;
                    h.svgStrokeTolerance++;
                    h = new mxHandle(g, "col-resize", null, h);
                    h.tableHandle = !0;
                    var m = 0;
                    h.shape.node.parentNode.insertBefore(h.shape.node, h.shape.node.parentNode.firstChild);
                    h.redraw = function() {
                        if (null !=
                            this.shape && null != this.state.shape) {
                            var a = b.getActualStartSize(d.cell);
                            this.shape.stroke = 0 == m ? mxConstants.NONE : e.stroke;
                            this.shape.bounds.x = this.state.x + this.state.width + m * this.graph.view.scale;
                            this.shape.bounds.width = 1;
                            this.shape.bounds.y = d.y + (c == k.length - 1 ? 0 : a.y * this.graph.view.scale);
                            this.shape.bounds.height = d.height - (c == k.length - 1 ? 0 : (a.height + a.y) * this.graph.view.scale);
                            this.shape.redraw()
                        }
                    };
                    var n = !1;
                    h.setPosition = function(a, c, d) {
                        m = Math.max(Graph.minTableColumnWidth - a.width, c.x - a.x - a.width);
                        n =
                            mxEvent.isShiftDown(d.getEvent());
                        null == l || n || (m = Math.min((l.x + l.width - g.x - g.width) / b.view.scale - Graph.minTableColumnWidth, m))
                    };
                    h.execute = function(a) {
                        if (0 != m) b.setTableColumnWidth(this.state.cell, m, n);
                        else if (!f.blockDelayedSelection) {
                            var c = b.getCellAt(a.getGraphX(), a.getGraphY()) || d.cell;
                            b.graphHandler.selectCellForEvent(c, a)
                        }
                        m = 0
                    };
                    h.reset = function() {
                        m = 0
                    };
                    a.push(h)
                })(c);
                for (c = 0; c < h.length; c++) mxUtils.bind(this, function(c) {
                    c = h[c];
                    var g = new mxLine(new mxRectangle, mxConstants.NONE, 1);
                    g.isDashed = e.isDashed;
                    g.svgStrokeTolerance++;
                    c = new mxHandle(c, "row-resize", null, g);
                    c.tableHandle = !0;
                    var l = 0;
                    c.shape.node.parentNode.insertBefore(c.shape.node, c.shape.node.parentNode.firstChild);
                    c.redraw = function() {
                        null != this.shape && null != this.state.shape && (this.shape.stroke = 0 == l ? mxConstants.NONE : e.stroke, this.shape.bounds.x = this.state.x, this.shape.bounds.width = this.state.width, this.shape.bounds.y = this.state.y + this.state.height + l * this.graph.view.scale, this.shape.bounds.height = 1, this.shape.redraw())
                    };
                    c.setPosition = function(a,
                        b, c) {
                        l = Math.max(Graph.minTableRowHeight - a.height, b.y - a.y - a.height)
                    };
                    c.execute = function(a) {
                        if (0 != l) b.setTableRowHeight(this.state.cell, l, !mxEvent.isShiftDown(a.getEvent()));
                        else if (!f.blockDelayedSelection) {
                            var c = b.getCellAt(a.getGraphX(), a.getGraphY()) || d.cell;
                            b.graphHandler.selectCellForEvent(c, a)
                        }
                        l = 0
                    };
                    c.reset = function() {
                        l = 0
                    };
                    a.push(c)
                })(c)
            }
        }
        return null != a ? a.reverse() : null
    };
    var T = mxVertexHandler.prototype.setHandlesVisible;
    mxVertexHandler.prototype.setHandlesVisible = function(a) {
        T.apply(this, arguments);
        if (null != this.moveHandles)
            for (var b = 0; b < this.moveHandles.length; b++) this.moveHandles[b].style.visibility = a ? "" : "hidden";
        if (null != this.cornerHandles)
            for (b = 0; b < this.cornerHandles.length; b++) this.cornerHandles[b].node.style.visibility = a ? "" : "hidden"
    };
    mxVertexHandler.prototype.refreshMoveHandles = function() {
        var a = this.graph.model;
        if (null != this.moveHandles) {
            for (var b = 0; b < this.moveHandles.length; b++) this.moveHandles[b].parentNode.removeChild(this.moveHandles[b]);
            this.moveHandles = null
        }
        this.moveHandles = [];
        for (b =
            0; b < a.getChildCount(this.state.cell); b++) mxUtils.bind(this, function(b) {
            if (null != b && a.isVertex(b.cell)) {
                var c = mxUtils.createImage(Editor.rowMoveImage);
                c.style.position = "absolute";
                c.style.cursor = "pointer";
                c.style.width = "7px";
                c.style.height = "4px";
                c.style.padding = "4px 2px 4px 2px";
                c.rowState = b;
                mxEvent.addGestureListeners(c, mxUtils.bind(this, function(a) {
                    this.graph.popupMenuHandler.hideMenu();
                    this.graph.stopEditing(!1);
                    !this.graph.isToggleEvent(a) && this.graph.isCellSelected(b.cell) || this.graph.selectCellForEvent(b.cell,
                        a);
                    mxEvent.isPopupTrigger(a) || (this.graph.graphHandler.start(this.state.cell, mxEvent.getClientX(a), mxEvent.getClientY(a), this.graph.getSelectionCells()), this.graph.graphHandler.cellWasClicked = !0, this.graph.isMouseTrigger = mxEvent.isMouseEvent(a), this.graph.isMouseDown = !0);
                    mxEvent.consume(a)
                }), null, mxUtils.bind(this, function(a) {
                    mxEvent.isPopupTrigger(a) && (this.graph.popupMenuHandler.popup(mxEvent.getClientX(a), mxEvent.getClientY(a), b.cell, a), mxEvent.consume(a))
                }));
                this.moveHandles.push(c);
                this.graph.container.appendChild(c)
            }
        })(this.graph.view.getState(a.getChildAt(this.state.cell,
            b)))
    };
    mxVertexHandler.prototype.refresh = function() {
        if (null != this.customHandles) {
            for (var a = 0; a < this.customHandles.length; a++) this.customHandles[a].destroy();
            this.customHandles = this.createCustomHandles()
        }
        this.graph.isTable(this.state.cell) && this.refreshMoveHandles()
    };
    var U = mxVertexHandler.prototype.getHandlePadding;
    mxVertexHandler.prototype.getHandlePadding = function() {
        var a = new mxPoint(0, 0),
            b = this.tolerance,
            c = this.state.style.shape;
        null == mxCellRenderer.defaultShapes[c] && mxStencilRegistry.getStencil(c);
        c = this.graph.isTable(this.state.cell) || this.graph.cellEditor.getEditingCell() == this.state.cell;
        if (!c && null != this.customHandles)
            for (var d = 0; d < this.customHandles.length; d++)
                if (null != this.customHandles[d].shape && null != this.customHandles[d].shape.bounds) {
                    var e = this.customHandles[d].shape.bounds,
                        f = e.getCenterX(),
                        h = e.getCenterY();
                    if (Math.abs(this.state.x - f) < e.width / 2 || Math.abs(this.state.y - h) < e.height / 2 || Math.abs(this.state.x + this.state.width - f) < e.width / 2 || Math.abs(this.state.y + this.state.height - h) < e.height /
                        2) {
                        c = !0;
                        break
                    }
                } c && null != this.sizers && 0 < this.sizers.length && null != this.sizers[0] ? (b /= 2, this.graph.isTable(this.state.cell) && (b += 7), a.x = this.sizers[0].bounds.width + b, a.y = this.sizers[0].bounds.height + b) : a = U.apply(this, arguments);
        return a
    };
    mxVertexHandler.prototype.updateHint = function(c) {
        if (this.index != mxEvent.LABEL_HANDLE) {
            null == this.hint && (this.hint = a(), this.state.view.graph.container.appendChild(this.hint));
            if (this.index == mxEvent.ROTATION_HANDLE) this.hint.innerHTML = this.currentAlpha + "&deg;";
            else {
                c =
                    this.state.view.scale;
                var d = this.state.view.unit;
                this.hint.innerHTML = b(this.roundLength(this.bounds.width / c), d) + " x " + b(this.roundLength(this.bounds.height / c), d)
            }
            c = mxUtils.getBoundingBox(this.bounds, null != this.currentAlpha ? this.currentAlpha : this.state.style[mxConstants.STYLE_ROTATION] || "0");
            null == c && (c = this.bounds);
            this.hint.style.left = c.x + Math.round((c.width - this.hint.clientWidth) / 2) + "px";
            this.hint.style.top = c.y + c.height + Editor.hintOffset + "px";
            null != this.linkHint && (this.linkHint.style.display = "none")
        }
    };
    mxVertexHandler.prototype.removeHint = function() {
        mxGraphHandler.prototype.removeHint.apply(this, arguments);
        null != this.linkHint && (this.linkHint.style.display = "")
    };
    var V = mxEdgeHandler.prototype.mouseMove;
    mxEdgeHandler.prototype.mouseMove = function(a, b) {
        V.apply(this, arguments);
        null != this.linkHint && "none" != this.linkHint.style.display && null != this.graph.graphHandler && null != this.graph.graphHandler.first && (this.linkHint.style.display = "none")
    };
    var W = mxEdgeHandler.prototype.mouseUp;
    mxEdgeHandler.prototype.mouseUp =
        function(a, b) {
            W.apply(this, arguments);
            null != this.linkHint && "none" == this.linkHint.style.display && (this.linkHint.style.display = "")
        };
    mxEdgeHandler.prototype.updateHint = function(c, d) {
        null == this.hint && (this.hint = a(), this.state.view.graph.container.appendChild(this.hint));
        var g = this.graph.view.translate,
            e = this.graph.view.scale,
            f = this.roundLength(d.x / e - g.x);
        g = this.roundLength(d.y / e - g.y);
        e = this.graph.view.unit;
        this.hint.innerHTML = b(f, e) + ", " + b(g, e);
        this.hint.style.visibility = "visible";
        if (this.isSource || this.isTarget) null !=
            this.constraintHandler.currentConstraint && null != this.constraintHandler.currentFocus ? (f = this.constraintHandler.currentConstraint.point, this.hint.innerHTML = "[" + Math.round(100 * f.x) + "%, " + Math.round(100 * f.y) + "%]") : this.marker.hasValidState() && (this.hint.style.visibility = "hidden");
        this.hint.style.left = Math.round(c.getGraphX() - this.hint.clientWidth / 2) + "px";
        this.hint.style.top = Math.max(c.getGraphY(), d.y) + Editor.hintOffset + "px";
        null != this.linkHint && (this.linkHint.style.display = "none")
    };
    mxEdgeHandler.prototype.removeHint =
        mxVertexHandler.prototype.removeHint;
    HoverIcons.prototype.mainHandle = mxClient.IS_SVG ? Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '" stroke-width="1"/>') : new mxImage(IMAGE_PATH + "/handle-main.png", 17, 17);
    HoverIcons.prototype.secondaryHandle = mxClient.IS_SVG ? Graph.createSvgImage(16, 16, '<path d="m 8 3 L 13 8 L 8 13 L 3 8 z" stroke="#fff" fill="#fca000"/>') : new mxImage(IMAGE_PATH + "/handle-secondary.png", 17, 17);
    HoverIcons.prototype.fixedHandle =
        mxClient.IS_SVG ? Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '" stroke-width="1"/><path d="m 7 7 L 11 11 M 7 11 L 11 7" stroke="#fff"/>') : new mxImage(IMAGE_PATH + "/handle-fixed.png", 17, 17);
    HoverIcons.prototype.terminalHandle = mxClient.IS_SVG ? Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' + HoverIcons.prototype.arrowFill + '" stroke-width="1"/><circle cx="9" cy="9" r="2" stroke="#fff" fill="transparent"/>') : new mxImage(IMAGE_PATH +
        "/handle-terminal.png", 17, 17);
    HoverIcons.prototype.rotationHandle = mxClient.IS_SVG ? Graph.createSvgImage(16, 16, '<path stroke="' + HoverIcons.prototype.arrowFill + '" fill="' + HoverIcons.prototype.arrowFill + '" d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/>',
        24, 24) : new mxImage(IMAGE_PATH + "/handle-rotate.png", 16, 16);
    mxClient.IS_SVG && (mxConstraintHandler.prototype.pointImage = Graph.createSvgImage(5, 5, '<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="' + HoverIcons.prototype.arrowFill + '"/>'));
    mxVertexHandler.TABLE_HANDLE_COLOR = "#fca000";
    mxVertexHandler.prototype.handleImage = HoverIcons.prototype.mainHandle;
    mxVertexHandler.prototype.secondaryHandleImage = HoverIcons.prototype.secondaryHandle;
    mxEdgeHandler.prototype.handleImage = HoverIcons.prototype.mainHandle;
    mxEdgeHandler.prototype.terminalHandleImage =
        HoverIcons.prototype.terminalHandle;
    mxEdgeHandler.prototype.fixedHandleImage = HoverIcons.prototype.fixedHandle;
    mxEdgeHandler.prototype.labelHandleImage = HoverIcons.prototype.secondaryHandle;
    mxOutline.prototype.sizerImage = HoverIcons.prototype.mainHandle;
    Sidebar.prototype.triangleUp = HoverIcons.prototype.triangleUp;
    Sidebar.prototype.triangleRight = HoverIcons.prototype.triangleRight;
    Sidebar.prototype.triangleDown = HoverIcons.prototype.triangleDown;
    Sidebar.prototype.triangleLeft = HoverIcons.prototype.triangleLeft;
    Sidebar.prototype.refreshTarget = HoverIcons.prototype.refreshTarget;
    Sidebar.prototype.roundDrop = HoverIcons.prototype.roundDrop;
    mxClient.IS_SVG || ((new Image).src = HoverIcons.prototype.mainHandle.src, (new Image).src = HoverIcons.prototype.fixedHandle.src, (new Image).src = HoverIcons.prototype.terminalHandle.src, (new Image).src = HoverIcons.prototype.secondaryHandle.src, (new Image).src = HoverIcons.prototype.rotationHandle.src, (new Image).src = HoverIcons.prototype.triangleUp.src, (new Image).src = HoverIcons.prototype.triangleRight.src,
        (new Image).src = HoverIcons.prototype.triangleDown.src, (new Image).src = HoverIcons.prototype.triangleLeft.src, (new Image).src = HoverIcons.prototype.refreshTarget.src, (new Image).src = HoverIcons.prototype.roundDrop.src);
    mxVertexHandler.prototype.rotationEnabled = !0;
    mxVertexHandler.prototype.manageSizers = !0;
    mxVertexHandler.prototype.livePreview = !0;
    mxGraphHandler.prototype.maxLivePreview = 16;
    mxRubberband.prototype.defaultOpacity = 30;
    mxConnectionHandler.prototype.outlineConnect = !0;
    mxCellHighlight.prototype.keepOnTop = !0;
    mxVertexHandler.prototype.parentHighlightEnabled = !0;
    mxEdgeHandler.prototype.parentHighlightEnabled = !0;
    mxEdgeHandler.prototype.dblClickRemoveEnabled = !0;
    mxEdgeHandler.prototype.straightRemoveEnabled = !0;
    mxEdgeHandler.prototype.virtualBendsEnabled = !0;
    mxEdgeHandler.prototype.mergeRemoveEnabled = !0;
    mxEdgeHandler.prototype.manageLabelHandle = !0;
    mxEdgeHandler.prototype.outlineConnect = !0;
    mxEdgeHandler.prototype.isAddVirtualBendEvent = function(a) {
        return !mxEvent.isShiftDown(a.getEvent())
    };
    mxEdgeHandler.prototype.isCustomHandleEvent =
        function(a) {
            return !mxEvent.isShiftDown(a.getEvent())
        };
    if (Graph.touchStyle) {
        if (mxClient.IS_TOUCH || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) mxShape.prototype.svgStrokeTolerance = 18, mxVertexHandler.prototype.tolerance = 12, mxEdgeHandler.prototype.tolerance = 12, Graph.prototype.tolerance = 12, mxVertexHandler.prototype.rotationHandleVSpacing = -16, mxConstraintHandler.prototype.getTolerance = function(a) {
            return mxEvent.isMouseEvent(a.getEvent()) ? 4 : this.graph.getTolerance()
        };
        mxPanningHandler.prototype.isPanningTrigger =
            function(a) {
                var b = a.getEvent();
                return null == a.getState() && !mxEvent.isMouseEvent(b) || mxEvent.isPopupTrigger(b) && (null == a.getState() || mxEvent.isControlDown(b) || mxEvent.isShiftDown(b))
            };
        var X = mxGraphHandler.prototype.mouseDown;
        mxGraphHandler.prototype.mouseDown = function(a, b) {
            X.apply(this, arguments);
            mxEvent.isTouchEvent(b.getEvent()) && this.graph.isCellSelected(b.getCell()) && 1 < this.graph.getSelectionCount() && (this.delayedSelection = !1)
        }
    } else mxPanningHandler.prototype.isPanningTrigger = function(a) {
        var b =
            a.getEvent();
        return mxEvent.isLeftMouseButton(b) && (this.useLeftButtonForPanning && null == a.getState() || mxEvent.isControlDown(b) && !mxEvent.isShiftDown(b)) || this.usePopupTrigger && mxEvent.isPopupTrigger(b)
    };
    mxRubberband.prototype.isSpaceEvent = function(a) {
        return this.graph.isEnabled() && !this.graph.isCellLocked(this.graph.getDefaultParent()) && mxEvent.isControlDown(a.getEvent()) && mxEvent.isShiftDown(a.getEvent())
    };
    mxRubberband.prototype.cancelled = !1;
    mxRubberband.prototype.cancel = function() {
        this.isActive() &&
            (this.cancelled = !0, this.reset())
    };
    mxRubberband.prototype.mouseUp = function(a, b) {
        if (this.cancelled) this.cancelled = !1, b.consume();
        else {
            var c = null != this.div && "none" != this.div.style.display,
                d = null,
                g = null,
                e = a = null;
            null != this.first && null != this.currentX && null != this.currentY && (d = this.first.x, g = this.first.y, a = (this.currentX - d) / this.graph.view.scale, e = (this.currentY - g) / this.graph.view.scale, mxEvent.isAltDown(b.getEvent()) || (a = this.graph.snap(a), e = this.graph.snap(e), this.graph.isGridEnabled() || (Math.abs(a) < this.graph.tolerance &&
                (a = 0), Math.abs(e) < this.graph.tolerance && (e = 0))));
            this.reset();
            if (c) {
                if (mxEvent.isAltDown(b.getEvent()) && this.graph.isToggleEvent(b.getEvent())) {
                    var f = new mxRectangle(this.x, this.y, this.width, this.height);
                    f = this.graph.getCells(f.x, f.y, f.width, f.height);
                    this.graph.removeSelectionCells(f)
                } else if (this.isSpaceEvent(b)) {
                    this.graph.model.beginUpdate();
                    try {
                        for (f = this.graph.getCellsBeyond(d, g, this.graph.getDefaultParent(), !0, !0), c = 0; c < f.length; c++)
                            if (this.graph.isCellMovable(f[c])) {
                                var l = this.graph.view.getState(f[c]),
                                    h = this.graph.getCellGeometry(f[c]);
                                null != l && null != h && (h = h.clone(), h.translate(a, e), this.graph.model.setGeometry(f[c], h))
                            }
                    } finally {
                        this.graph.model.endUpdate()
                    }
                } else f = new mxRectangle(this.x, this.y, this.width, this.height), this.graph.selectRegion(f, b.getEvent());
                b.consume()
            }
        }
    };
    mxRubberband.prototype.mouseMove = function(a, b) {
        if (!b.isConsumed() && null != this.first) {
            var c = mxUtils.getScrollOrigin(this.graph.container);
            a = mxUtils.getOffset(this.graph.container);
            c.x -= a.x;
            c.y -= a.y;
            a = b.getX() + c.x;
            c = b.getY() + c.y;
            var d = this.first.x - a,
                g = this.first.y - c,
                e = this.graph.tolerance;
            if (null != this.div || Math.abs(d) > e || Math.abs(g) > e) null == this.div && (this.div = this.createShape()), mxUtils.clearSelection(), this.update(a, c), this.isSpaceEvent(b) ? (a = this.x + this.width, c = this.y + this.height, d = this.graph.view.scale, mxEvent.isAltDown(b.getEvent()) || (this.width = this.graph.snap(this.width / d) * d, this.height = this.graph.snap(this.height / d) * d, this.graph.isGridEnabled() || (this.width < this.graph.tolerance && (this.width = 0), this.height < this.graph.tolerance &&
                    (this.height = 0)), this.x < this.first.x && (this.x = a - this.width), this.y < this.first.y && (this.y = c - this.height)), this.div.style.borderStyle = "dashed", this.div.style.backgroundColor = "white", this.div.style.left = this.x + "px", this.div.style.top = this.y + "px", this.div.style.width = Math.max(0, this.width) + "px", this.div.style.height = this.graph.container.clientHeight + "px", this.div.style.borderWidth = 0 >= this.width ? "0px 1px 0px 0px" : "0px 1px 0px 1px", null == this.secondDiv && (this.secondDiv = this.div.cloneNode(!0), this.div.parentNode.appendChild(this.secondDiv)),
                this.secondDiv.style.left = this.x + "px", this.secondDiv.style.top = this.y + "px", this.secondDiv.style.width = this.graph.container.clientWidth + "px", this.secondDiv.style.height = Math.max(0, this.height) + "px", this.secondDiv.style.borderWidth = 0 >= this.height ? "1px 0px 0px 0px" : "1px 0px 1px 0px") : (this.div.style.backgroundColor = "", this.div.style.borderWidth = "", this.div.style.borderStyle = "", null != this.secondDiv && (this.secondDiv.parentNode.removeChild(this.secondDiv), this.secondDiv = null)), b.consume()
        }
    };
    var Y = mxRubberband.prototype.reset;
    mxRubberband.prototype.reset = function() {
        null != this.secondDiv && (this.secondDiv.parentNode.removeChild(this.secondDiv), this.secondDiv = null);
        Y.apply(this, arguments)
    };
    var Q = (new Date).getTime(),
        O = 0,
        ba = mxEdgeHandler.prototype.updatePreviewState;
    mxEdgeHandler.prototype.updatePreviewState = function(a, b, c, d) {
        ba.apply(this, arguments);
        c != this.currentTerminalState ? (Q = (new Date).getTime(), O = 0) : O = (new Date).getTime() - Q;
        this.currentTerminalState = c
    };
    var ca = mxEdgeHandler.prototype.isOutlineConnectEvent;
    mxEdgeHandler.prototype.isOutlineConnectEvent =
        function(a) {
            return null != this.currentTerminalState && a.getState() == this.currentTerminalState && 2E3 < O || (null == this.currentTerminalState || "0" != mxUtils.getValue(this.currentTerminalState.style, "outlineConnect", "1")) && ca.apply(this, arguments)
        };
    mxEdgeHandler.prototype.createHandleShape = function(a, b) {
        b = null != a && 0 == a;
        var c = this.state.getVisibleTerminalState(b);
        a = null != a && (0 == a || a >= this.state.absolutePoints.length - 1 || this.constructor == mxElbowEdgeHandler && 2 == a) ? this.graph.getConnectionConstraint(this.state,
            c, b) : null;
        a = null != (null != a ? this.graph.getConnectionPoint(this.state.getVisibleTerminalState(b), a) : null) ? this.fixedHandleImage : null != a && null != c ? this.terminalHandleImage : this.handleImage;
        if (null != a) return a = new mxImageShape(new mxRectangle(0, 0, a.width, a.height), a.src), a.preserveImageAspect = !1, a;
        a = mxConstants.HANDLE_SIZE;
        this.preferHtml && --a;
        return new mxRectangleShape(new mxRectangle(0, 0, a, a), mxConstants.HANDLE_FILLCOLOR, mxConstants.HANDLE_STROKECOLOR)
    };
    var da = mxVertexHandler.prototype.createSizerShape;
    mxVertexHandler.prototype.createSizerShape = function(a, b, c) {
        this.handleImage = b == mxEvent.ROTATION_HANDLE ? HoverIcons.prototype.rotationHandle : b == mxEvent.LABEL_HANDLE ? this.secondaryHandleImage : this.handleImage;
        return da.apply(this, arguments)
    };
    var ea = mxGraphHandler.prototype.getBoundingBox;
    mxGraphHandler.prototype.getBoundingBox = function(a) {
        if (null != a && 1 == a.length) {
            var b = this.graph.getModel(),
                c = b.getParent(a[0]),
                d = this.graph.getCellGeometry(a[0]);
            if (b.isEdge(c) && null != d && d.relative && (b = this.graph.view.getState(a[0]),
                    null != b && 2 > b.width && 2 > b.height && null != b.text && null != b.text.boundingBox)) return mxRectangle.fromRectangle(b.text.boundingBox)
        }
        return ea.apply(this, arguments)
    };
    var fa = mxGraphHandler.prototype.getGuideStates;
    mxGraphHandler.prototype.getGuideStates = function() {
        for (var a = fa.apply(this, arguments), b = [], c = 0; c < a.length; c++) "1" != mxUtils.getValue(a[c].style, "part", "0") && b.push(a[c]);
        return b
    };
    var ha = mxVertexHandler.prototype.getSelectionBounds;
    mxVertexHandler.prototype.getSelectionBounds = function(a) {
        var b = this.graph.getModel(),
            c = b.getParent(a.cell),
            d = this.graph.getCellGeometry(a.cell);
        return b.isEdge(c) && null != d && d.relative && 2 > a.width && 2 > a.height && null != a.text && null != a.text.boundingBox ? (b = a.text.unrotatedBoundingBox || a.text.boundingBox, new mxRectangle(Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height))) : ha.apply(this, arguments)
    };
    var ia = mxVertexHandler.prototype.mouseDown;
    mxVertexHandler.prototype.mouseDown = function(a, b) {
        var c = this.graph.getModel(),
            d = c.getParent(this.state.cell),
            e = this.graph.getCellGeometry(this.state.cell);
        (this.getHandleForEvent(b) == mxEvent.ROTATION_HANDLE || !c.isEdge(d) || null == e || !e.relative || null == this.state || 2 <= this.state.width || 2 <= this.state.height) && ia.apply(this, arguments)
    };
    mxVertexHandler.prototype.rotateClick = function() {
        var a = mxUtils.getValue(this.state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE),
            b = mxUtils.getValue(this.state.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE);
        this.state.view.graph.model.isVertex(this.state.cell) && a == mxConstants.NONE && b == mxConstants.NONE ? (a = mxUtils.mod(mxUtils.getValue(this.state.style,
            mxConstants.STYLE_ROTATION, 0) + 90, 360), this.state.view.graph.setCellStyles(mxConstants.STYLE_ROTATION, a, [this.state.cell])) : this.state.view.graph.turnShapes([this.state.cell])
    };
    var ja = mxVertexHandler.prototype.mouseMove;
    mxVertexHandler.prototype.mouseMove = function(a, b) {
        ja.apply(this, arguments);
        null != this.graph.graphHandler.first && (null != this.rotationShape && null != this.rotationShape.node && (this.rotationShape.node.style.display = "none"), null != this.linkHint && "none" != this.linkHint.style.display && (this.linkHint.style.display =
            "none"))
    };
    var ka = mxVertexHandler.prototype.mouseUp;
    mxVertexHandler.prototype.mouseUp = function(a, b) {
        ka.apply(this, arguments);
        null != this.rotationShape && null != this.rotationShape.node && (this.rotationShape.node.style.display = 1 == this.graph.getSelectionCount() ? "" : "none");
        null != this.linkHint && "none" == this.linkHint.style.display && (this.linkHint.style.display = "");
        this.blockDelayedSelection = null
    };
    var la = mxVertexHandler.prototype.init;
    mxVertexHandler.prototype.init = function() {
        la.apply(this, arguments);
        var a = !1;
        null != this.rotationShape && this.rotationShape.node.setAttribute("title", mxResources.get("rotateTooltip"));
        if (this.graph.isTable(this.state.cell)) this.refreshMoveHandles();
        else if (1 == this.graph.getSelectionCount() && (this.graph.isTableCell(this.state.cell) || this.graph.isTableRow(this.state.cell))) {
            this.cornerHandles = [];
            for (var b = 0; 4 > b; b++) {
                var c = new mxRectangleShape(new mxRectangle(0, 0, 6, 6), "#ffffff", mxConstants.HANDLE_STROKECOLOR);
                c.dialect = mxConstants.DIALECT_SVG;
                c.init(this.graph.view.getOverlayPane());
                this.cornerHandles.push(c)
            }
        }
        var d = mxUtils.bind(this, function() {
            null != this.specialHandle && (this.specialHandle.node.style.display = this.graph.isEnabled() && this.graph.getSelectionCount() < this.graph.graphHandler.maxCells ? "" : "none");
            this.redrawHandles()
        });
        this.changeHandler = mxUtils.bind(this, function(a, b) {
            this.updateLinkHint(this.graph.getLinkForCell(this.state.cell), this.graph.getLinksForState(this.state));
            d()
        });
        this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.changeHandler);
        this.graph.getModel().addListener(mxEvent.CHANGE,
            this.changeHandler);
        this.editingHandler = mxUtils.bind(this, function(a, b) {
            this.redrawHandles()
        });
        this.graph.addListener(mxEvent.EDITING_STOPPED, this.editingHandler);
        b = this.graph.getLinkForCell(this.state.cell);
        c = this.graph.getLinksForState(this.state);
        this.updateLinkHint(b, c);
        if (null != b || null != c && 0 < c.length) a = !0;
        a && this.redrawHandles()
    };
    mxVertexHandler.prototype.updateLinkHint = function(b, c) {
        try {
            if (null == b && (null == c || 0 == c.length) || 1 < this.graph.getSelectionCount()) null != this.linkHint && (this.linkHint.parentNode.removeChild(this.linkHint),
                this.linkHint = null);
            else if (null != b || null != c && 0 < c.length) {
                null == this.linkHint && (this.linkHint = a(), this.linkHint.style.padding = "6px 8px 6px 8px", this.linkHint.style.opacity = "1", this.linkHint.style.filter = "", this.graph.container.appendChild(this.linkHint));
                this.linkHint.innerHTML = "";
                if (null != b && (this.linkHint.appendChild(this.graph.createLinkForHint(b)), this.graph.isEnabled() && "function" === typeof this.graph.editLink)) {
                    var d = document.createElement("img");
                    d.setAttribute("src", Editor.editImage);
                    d.setAttribute("title",
                        mxResources.get("editLink"));
                    d.setAttribute("width", "11");
                    d.setAttribute("height", "11");
                    d.style.marginLeft = "10px";
                    d.style.marginBottom = "-1px";
                    d.style.cursor = "pointer";
                    this.linkHint.appendChild(d);
                    mxEvent.addListener(d, "click", mxUtils.bind(this, function(a) {
                        this.graph.setSelectionCell(this.state.cell);
                        this.graph.editLink();
                        mxEvent.consume(a)
                    }));
                    var e = document.createElement("img");
                    e.setAttribute("src", Dialog.prototype.clearImage);
                    e.setAttribute("title", mxResources.get("removeIt", [mxResources.get("link")]));
                    e.setAttribute("width", "13");
                    e.setAttribute("height", "10");
                    e.style.marginLeft = "4px";
                    e.style.marginBottom = "-1px";
                    e.style.cursor = "pointer";
                    this.linkHint.appendChild(e);
                    mxEvent.addListener(e, "click", mxUtils.bind(this, function(a) {
                        this.graph.setLinkForCell(this.state.cell, null);
                        mxEvent.consume(a)
                    }))
                }
                if (null != c)
                    for (d = 0; d < c.length; d++) {
                        var g = document.createElement("div");
                        g.style.marginTop = null != b || 0 < d ? "6px" : "0px";
                        g.appendChild(this.graph.createLinkForHint(c[d].getAttribute("href"), mxUtils.getTextContent(c[d])));
                        this.linkHint.appendChild(g)
                    }
            }
        } catch (H) {}
    };
    mxEdgeHandler.prototype.updateLinkHint = mxVertexHandler.prototype.updateLinkHint;
    var ma = mxEdgeHandler.prototype.init;
    mxEdgeHandler.prototype.init = function() {
        ma.apply(this, arguments);
        this.constraintHandler.isEnabled = mxUtils.bind(this, function() {
            return this.state.view.graph.connectionHandler.isEnabled()
        });
        var a = mxUtils.bind(this, function() {
            null != this.linkHint && (this.linkHint.style.display = 1 == this.graph.getSelectionCount() ? "" : "none");
            null != this.labelShape && (this.labelShape.node.style.display =
                this.graph.isEnabled() && this.graph.getSelectionCount() < this.graph.graphHandler.maxCells ? "" : "none")
        });
        this.changeHandler = mxUtils.bind(this, function(b, c) {
            this.updateLinkHint(this.graph.getLinkForCell(this.state.cell), this.graph.getLinksForState(this.state));
            a();
            this.redrawHandles()
        });
        this.graph.getSelectionModel().addListener(mxEvent.CHANGE, this.changeHandler);
        this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);
        var b = this.graph.getLinkForCell(this.state.cell),
            c = this.graph.getLinksForState(this.state);
        if (null != b || null != c && 0 < c.length) this.updateLinkHint(b, c), this.redrawHandles()
    };
    var na = mxConnectionHandler.prototype.init;
    mxConnectionHandler.prototype.init = function() {
        na.apply(this, arguments);
        this.constraintHandler.isEnabled = mxUtils.bind(this, function() {
            return this.graph.connectionHandler.isEnabled()
        })
    };
    var oa = mxVertexHandler.prototype.redrawHandles;
    mxVertexHandler.prototype.redrawHandles = function() {
        if (null != this.moveHandles)
            for (var a = 0; a < this.moveHandles.length; a++) this.moveHandles[a].style.left =
                this.moveHandles[a].rowState.x + this.moveHandles[a].rowState.width - 5 + "px", this.moveHandles[a].style.top = this.moveHandles[a].rowState.y + this.moveHandles[a].rowState.height / 2 - 6 + "px";
        if (null != this.cornerHandles) {
            a = this.getSelectionBorderInset();
            var b = this.cornerHandles,
                c = b[0].bounds.height / 2;
            b[0].bounds.x = this.state.x - b[0].bounds.width / 2 + a;
            b[0].bounds.y = this.state.y - c + a;
            b[0].redraw();
            b[1].bounds.x = b[0].bounds.x + this.state.width - 2 * a;
            b[1].bounds.y = b[0].bounds.y;
            b[1].redraw();
            b[2].bounds.x = b[0].bounds.x;
            b[2].bounds.y = this.state.y + this.state.height - 2 * a;
            b[2].redraw();
            b[3].bounds.x = b[1].bounds.x;
            b[3].bounds.y = b[2].bounds.y;
            b[3].redraw();
            for (a = 0; a < this.cornerHandles.length; a++) this.cornerHandles[a].node.style.display = 1 == this.graph.getSelectionCount() ? "" : "none"
        }
        null != this.rotationShape && null != this.rotationShape.node && (this.rotationShape.node.style.display = null != this.moveHandles || 1 != this.graph.getSelectionCount() || null != this.index && this.index != mxEvent.ROTATION_HANDLE ? "none" : "");
        oa.apply(this);
        null != this.state &&
            null != this.linkHint && (a = new mxPoint(this.state.getCenterX(), this.state.getCenterY()), b = new mxRectangle(this.state.x, this.state.y - 22, this.state.width + 24, this.state.height + 22), c = mxUtils.getBoundingBox(b, this.state.style[mxConstants.STYLE_ROTATION] || "0", a), a = null != c ? mxUtils.getBoundingBox(this.state, this.state.style[mxConstants.STYLE_ROTATION] || "0") : this.state, b = null != this.state.text ? this.state.text.boundingBox : null, null == c && (c = this.state), c = c.y + c.height, null != b && (c = Math.max(c, b.y + b.height)), this.linkHint.style.left =
                Math.max(0, Math.round(a.x + (a.width - this.linkHint.clientWidth) / 2)) + "px", this.linkHint.style.top = Math.round(c + this.verticalOffset / 2 + Editor.hintOffset) + "px")
    };
    var pa = mxVertexHandler.prototype.destroy;
    mxVertexHandler.prototype.destroy = function() {
        pa.apply(this, arguments);
        if (null != this.moveHandles) {
            for (var a = 0; a < this.moveHandles.length; a++) null != this.moveHandles[a] && null != this.moveHandles[a].parentNode && this.moveHandles[a].parentNode.removeChild(this.moveHandles[a]);
            this.moveHandles = null
        }
        if (null != this.cornerHandles) {
            for (a =
                0; a < this.cornerHandles.length; a++) null != this.cornerHandles[a] && null != this.cornerHandles[a].node && null != this.cornerHandles[a].node.parentNode && this.cornerHandles[a].node.parentNode.removeChild(this.cornerHandles[a].node);
            this.cornerHandles = null
        }
        null != this.linkHint && (null != this.linkHint.parentNode && this.linkHint.parentNode.removeChild(this.linkHint), this.linkHint = null);
        null != this.changeHandler && (this.graph.getSelectionModel().removeListener(this.changeHandler), this.graph.getModel().removeListener(this.changeHandler),
            this.changeHandler = null);
        null != this.editingHandler && (this.graph.removeListener(this.editingHandler), this.editingHandler = null)
    };
    var qa = mxEdgeHandler.prototype.redrawHandles;
    mxEdgeHandler.prototype.redrawHandles = function() {
        if (null != this.marker && (qa.apply(this), null != this.state && null != this.linkHint)) {
            var a = this.state;
            null != this.state.text && null != this.state.text.bounds && (a = new mxRectangle(a.x, a.y, a.width, a.height), a.add(this.state.text.bounds));
            this.linkHint.style.left = Math.max(0, Math.round(a.x + (a.width -
                this.linkHint.clientWidth) / 2)) + "px";
            this.linkHint.style.top = Math.round(a.y + a.height + Editor.hintOffset) + "px"
        }
    };
    var ra = mxEdgeHandler.prototype.reset;
    mxEdgeHandler.prototype.reset = function() {
        ra.apply(this, arguments);
        null != this.linkHint && (this.linkHint.style.visibility = "")
    };
    var sa = mxEdgeHandler.prototype.destroy;
    mxEdgeHandler.prototype.destroy = function() {
        sa.apply(this, arguments);
        null != this.linkHint && (this.linkHint.parentNode.removeChild(this.linkHint), this.linkHint = null);
        null != this.changeHandler && (this.graph.getModel().removeListener(this.changeHandler),
            this.graph.getSelectionModel().removeListener(this.changeHandler), this.changeHandler = null)
    }
}();