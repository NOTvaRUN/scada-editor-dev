Format = function(a, c) {
    this.editorUi = a;
    this.container = c
};
Format.inactiveTabBackgroundColor = "#f1f3f4";
Format.prototype.labelIndex = 0;
Format.prototype.diagramIndex = 0;
Format.prototype.currentIndex = 0;
Format.prototype.showCloseButton = !0;
Format.prototype.roundableShapes = "label rectangle internalStorage corner parallelogram swimlane triangle trapezoid ext step tee process link rhombus offPageConnector loopLimit hexagon manualInput card curlyBracket singleArrow callout doubleArrow flexArrow umlLifeline".split(" ");
Format.prototype.init = function() {
    var a = this.editorUi,
        c = a.editor,
        b = c.graph;
    this.update = mxUtils.bind(this, function(a, b) {
        this.clearSelectionState();
        this.refresh()
    });
    b.getSelectionModel().addListener(mxEvent.CHANGE, this.update);
    b.addListener(mxEvent.EDITING_STARTED, this.update);
    b.addListener(mxEvent.EDITING_STOPPED, this.update);
    b.getModel().addListener(mxEvent.CHANGE, this.update);
    b.getView().addListener("unitChanged", this.update);
    b.addListener(mxEvent.ROOT, mxUtils.bind(this, function() {
        this.refresh()
    }));
    a.addListener("styleChanged", mxUtils.bind(this, function(a, b) {
        this.refresh()
    }));
    c.addListener("autosaveChanged", mxUtils.bind(this, function() {
        this.refresh()
    }));
    this.refresh()
};
Format.prototype.clearSelectionState = function() {
    this.selectionState = null
};
Format.prototype.getSelectionState = function() {
    null == this.selectionState && (this.selectionState = this.createSelectionState());
    return this.selectionState
};
Format.prototype.createSelectionState = function() {
    for (var a = this.editorUi.editor.graph.getSelectionCells(), c = this.initSelectionState(), b = 0; b < a.length; b++) this.updateSelectionStateForCell(c, a[b], a, 0 == b);
    return c
};
Format.prototype.initSelectionState = function() {
    return {
        vertices: [],
        edges: [],
        x: null,
        y: null,
        width: null,
        height: null,
        style: {},
        containsImage: !1,
        containsLabel: !1,
        fill: !0,
        glass: !0,
        rounded: !0,
        comic: !0,
        autoSize: !1,
        image: !0,
        shadow: !0,
        lineJumps: !0,
        resizable: !0,
        table: !1,
        cell: !1,
        row: !1,
        movable: !0,
        rotatable: !0,
        stroke: !0
    }
};
Format.prototype.updateSelectionStateForCell = function(a, c, b, e) {
    b = this.editorUi.editor.graph;
    if (b.getModel().isVertex(c)) {
        a.resizable = a.resizable && b.isCellResizable(c);
        a.rotatable = a.rotatable && b.isCellRotatable(c);
        a.movable = a.movable && b.isCellMovable(c) && !b.isTableRow(c) && !b.isTableCell(c);
        a.table = a.table || b.isTable(c);
        a.cell = a.cell || b.isTableCell(c);
        a.row = a.row || b.isTableRow(c);
        a.vertices.push(c);
        var h = b.getCellGeometry(c);
        if (null != h && (0 < h.width ? null == a.width ? a.width = h.width : a.width != h.width && (a.width =
                "") : a.containsLabel = !0, 0 < h.height ? null == a.height ? a.height = h.height : a.height != h.height && (a.height = "") : a.containsLabel = !0, !h.relative || null != h.offset)) {
            var d = h.relative ? h.offset.x : h.x;
            h = h.relative ? h.offset.y : h.y;
            null == a.x ? a.x = d : a.x != d && (a.x = "");
            null == a.y ? a.y = h : a.y != h && (a.y = "")
        }
    } else b.getModel().isEdge(c) && (a.edges.push(c), a.resizable = !1, a.rotatable = !1, a.movable = !1);
    c = b.view.getState(c);
    null != c && (a.autoSize = a.autoSize || this.isAutoSizeState(c), a.glass = a.glass && this.isGlassState(c), a.rounded = a.rounded &&
        this.isRoundedState(c), a.lineJumps = a.lineJumps && this.isLineJumpState(c), a.image = a.image && this.isImageState(c), a.shadow = a.shadow && this.isShadowState(c), a.comic = a.comic && this.isComicState(c), a.fill = a.fill && this.isFillState(c), a.stroke = a.stroke && this.isStrokeState(c), d = mxUtils.getValue(c.style, mxConstants.STYLE_SHAPE, null), a.containsImage = a.containsImage || "image" == d, b.mergeStyle(c.style, a.style, e))
};
Format.prototype.isComicState = function(a) {
    a = mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null);
    return 0 <= mxUtils.indexOf("label rectangle internalStorage corner parallelogram note collate swimlane triangle trapezoid ext step tee process link rhombus offPageConnector loopLimit hexagon manualInput singleArrow doubleArrow flexArrow filledEdge card umlLifeline connector folder component sortShape cross umlFrame cube isoCube isoRectangle partialRectangle".split(" "), a)
};
Format.prototype.isFillState = function(a) {
    return !this.isSpecialColor(a.style[mxConstants.STYLE_FILLCOLOR]) && (a.view.graph.model.isVertex(a.cell) || "arrow" == mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null) || "filledEdge" == mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null) || "flexArrow" == mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null))
};
Format.prototype.isStrokeState = function(a) {
    return !this.isSpecialColor(a.style[mxConstants.STYLE_STROKECOLOR])
};
Format.prototype.isSpecialColor = function(a) {
    return 0 <= mxUtils.indexOf([mxConstants.STYLE_STROKECOLOR, mxConstants.STYLE_FILLCOLOR, "inherit", "swimlane", "indicated"], a)
};
Format.prototype.isGlassState = function(a) {
    a = mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null);
    return "label" == a || "rectangle" == a || "internalStorage" == a || "ext" == a || "umlLifeline" == a || "swimlane" == a || "process" == a
};
Format.prototype.isRoundedState = function(a) {
    return null != a.shape ? a.shape.isRoundable() : 0 <= mxUtils.indexOf(this.roundableShapes, mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null))
};
Format.prototype.isLineJumpState = function(a) {
    var c = mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null);
    return !mxUtils.getValue(a.style, mxConstants.STYLE_CURVED, !1) && ("connector" == c || "filledEdge" == c)
};
Format.prototype.isAutoSizeState = function(a) {
    return "1" == mxUtils.getValue(a.style, mxConstants.STYLE_AUTOSIZE, null)
};
Format.prototype.isImageState = function(a) {
    a = mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null);
    return "label" == a || "image" == a
};
Format.prototype.isShadowState = function(a) {
    return "image" != mxUtils.getValue(a.style, mxConstants.STYLE_SHAPE, null)
};
Format.prototype.clear = function() {
    this.container.innerHTML = "";
    if (null != this.panels)
        for (var a = 0; a < this.panels.length; a++) this.panels[a].destroy();
    this.panels = []
};
Format.prototype.refresh = function() {
    null != this.pendingRefresh && (window.clearTimeout(this.pendingRefresh), this.pendingRefresh = null);
    this.pendingRefresh = window.setTimeout(mxUtils.bind(this, function() {
        this.immediateRefresh()
    }))
};
Format.prototype.immediateRefresh = function() {
    if ("0px" != this.container.style.width) {
        this.clear();
        var a = this.editorUi,
            c = a.editor.graph,
            b = document.createElement("div");
        b.style.whiteSpace = "nowrap";
        b.style.color = "rgb(112, 112, 112)";
        b.style.textAlign = "left";
        b.style.cursor = "default";
        var e = document.createElement("div");
        e.className = "geFormatSection";
        e.style.textAlign = "center";
        e.style.fontWeight = "bold";
        e.style.paddingTop = "8px";
        e.style.fontSize = "13px";
        e.style.borderWidth = "0px 0px 1px 1px";
        e.style.borderStyle =
            "solid";
        e.style.display = "inline-block";
        e.style.height = "25px";
        e.style.overflow = "hidden";
        e.style.width = "100%";
        this.container.appendChild(b);
        mxEvent.addListener(e, mxClient.IS_POINTER ? "pointerdown" : "mousedown", mxUtils.bind(this, function(a) {
            a.preventDefault()
        }));
        var h = this.getSelectionState().containsLabel,
            d = null,
            g = null,
            f = mxUtils.bind(this, function(a, b, e) {
                var f = mxUtils.bind(this, function(f) {
                    d != a && (h ? this.labelIndex = e : c.isSelectionEmpty() ? this.diagramIndex = e : this.currentIndex = e, null != d && (d.style.backgroundColor =
                        Format.inactiveTabBackgroundColor, d.style.borderBottomWidth = "1px"), d = a, d.style.backgroundColor = "", d.style.borderBottomWidth = "0px", g != b && (null != g && (g.style.display = "none"), g = b, g.style.display = ""))
                });
                mxEvent.addListener(a, "click", f);
                mxEvent.addListener(a, mxClient.IS_POINTER ? "pointerdown" : "mousedown", mxUtils.bind(this, function(a) {
                    a.preventDefault()
                }));
                e == (h ? this.labelIndex : c.isSelectionEmpty() ? this.diagramIndex : this.currentIndex) && f()
            }),
            l = 0;
        if (c.isSelectionEmpty()) {
            mxUtils.write(e, mxResources.get("diagram"));
            e.style.borderLeftWidth = "0px";
            b.appendChild(e);
            var n = b.cloneNode(!1);
            this.panels.push(new DiagramFormatPanel(this, a, n));
            this.container.appendChild(n);
            if (null != Editor.styles) {
                n.style.display = "none";
                e.style.width = this.showCloseButton ? "106px" : "50%";
                e.style.cursor = "pointer";
                e.style.backgroundColor = Format.inactiveTabBackgroundColor;
                var k = e.cloneNode(!1);
                k.style.borderLeftWidth = "1px";
                k.style.borderRightWidth = "1px";
                k.style.backgroundColor = Format.inactiveTabBackgroundColor;
                f(e, n, l++);
                var m = b.cloneNode(!1);
                m.style.display = "none";
                mxUtils.write(k, mxResources.get("style"));
                b.appendChild(k);
                this.panels.push(new DiagramStylePanel(this, a, m));
                this.container.appendChild(m);
                f(k, m, l++)
            }
            this.showCloseButton && (k = e.cloneNode(!1), k.style.borderLeftWidth = "1px", k.style.borderRightWidth = "1px", k.style.borderBottomWidth = "1px", k.style.backgroundColor = Format.inactiveTabBackgroundColor, k.style.position = "absolute", k.style.right = "0px", k.style.top = "0px", k.style.width = "25px", f = document.createElement("img"), f.setAttribute("border",
                "0"), f.setAttribute("src", Dialog.prototype.closeImage), f.setAttribute("title", mxResources.get("hide")), f.style.position = "absolute", f.style.display = "block", f.style.right = "0px", f.style.top = "8px", f.style.cursor = "pointer", f.style.marginTop = "1px", f.style.marginRight = "6px", f.style.border = "1px solid transparent", f.style.padding = "1px", f.style.opacity = .5, k.appendChild(f), mxEvent.addListener(f, "click", function() {
                a.actions.get("formatPanel").funct()
            }), b.appendChild(k))
        } else c.isEditing() ? (mxUtils.write(e, mxResources.get("text")),
            b.appendChild(e), this.panels.push(new TextFormatPanel(this, a, b))) : (e.style.backgroundColor = Format.inactiveTabBackgroundColor, e.style.borderLeftWidth = "1px", e.style.cursor = "pointer", e.style.width = h ? "50%" : "33.3%", k = e.cloneNode(!1), n = k.cloneNode(!1), k.style.backgroundColor = Format.inactiveTabBackgroundColor, n.style.backgroundColor = Format.inactiveTabBackgroundColor, h ? k.style.borderLeftWidth = "0px" : (e.style.borderLeftWidth = "0px", mxUtils.write(e, mxResources.get("style")), b.appendChild(e), m = b.cloneNode(!1),
            m.style.display = "none", this.panels.push(new StyleFormatPanel(this, a, m)), this.container.appendChild(m), f(e, m, l++)), mxUtils.write(k, mxResources.get("text")), b.appendChild(k), e = b.cloneNode(!1), e.style.display = "none", this.panels.push(new TextFormatPanel(this, a, e)), this.container.appendChild(e), mxUtils.write(n, mxResources.get("arrange")), b.appendChild(n), b = b.cloneNode(!1), b.style.display = "none", this.panels.push(new ArrangePanel(this, a, b)), this.container.appendChild(b), f(k, e, l++), f(n, b, l++))
    }
};
BaseFormatPanel = function(a, c, b) {
    this.format = a;
    this.editorUi = c;
    this.container = b;
    this.listeners = []
};
BaseFormatPanel.prototype.buttonBackgroundColor = "white";
BaseFormatPanel.prototype.getSelectionState = function() {
    for (var a = this.editorUi.editor.graph, c = a.getSelectionCells(), b = null, e = 0; e < c.length; e++) {
        var h = a.view.getState(c[e]);
        if (null != h && (h = mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null), null != h))
            if (null == b) b = h;
            else if (b != h) return null
    }
    return b
};
BaseFormatPanel.prototype.installInputHandler = function(a, c, b, e, h, d, g, f) {
    d = null != d ? d : "";
    f = null != f ? f : !1;
    var l = this.editorUi,
        n = l.editor.graph;
    e = null != e ? e : 1;
    h = null != h ? h : 999;
    var k = null,
        m = !1,
        p = mxUtils.bind(this, function(p) {
            var t = f ? parseFloat(a.value) : parseInt(a.value);
            isNaN(t) || c != mxConstants.STYLE_ROTATION || (t = mxUtils.mod(Math.round(100 * t), 36E3) / 100);
            t = Math.min(h, Math.max(e, isNaN(t) ? b : t));
            if (n.cellEditor.isContentEditing() && g) m || (m = !0, null != k && (n.cellEditor.restoreSelection(k), k = null), g(t), a.value = t + d,
                m = !1);
            else if (t != mxUtils.getValue(this.format.getSelectionState().style, c, b)) {
                n.isEditing() && n.stopEditing(!0);
                n.getModel().beginUpdate();
                try {
                    var u = n.getSelectionCells();
                    n.setCellStyles(c, t, u);
                    c == mxConstants.STYLE_FONTSIZE && n.updateLabelElements(n.getSelectionCells(), function(a) {
                        a.style.fontSize = t + "px";
                        a.removeAttribute("size")
                    });
                    for (var q = 0; q < u.length; q++) 0 == n.model.getChildCount(u[q]) && n.autoSizeCell(u[q], !1);
                    l.fireEvent(new mxEventObject("styleChanged", "keys", [c], "values", [t], "cells", u))
                } finally {
                    n.getModel().endUpdate()
                }
            }
            a.value =
                t + d;
            mxEvent.consume(p)
        });
    g && n.cellEditor.isContentEditing() && (mxEvent.addListener(a, "mousedown", function() {
        document.activeElement == n.cellEditor.textarea && (k = n.cellEditor.saveSelection())
    }), mxEvent.addListener(a, "touchstart", function() {
        document.activeElement == n.cellEditor.textarea && (k = n.cellEditor.saveSelection())
    }));
    mxEvent.addListener(a, "change", p);
    mxEvent.addListener(a, "blur", p);
    return p
};
BaseFormatPanel.prototype.createPanel = function() {
    var a = document.createElement("div");
    a.className = "geFormatSection";
    a.style.padding = "12px 0px 12px 18px";
    return a
};
BaseFormatPanel.prototype.createTitle = function(a) {
    var c = document.createElement("div");
    c.style.padding = "0px 0px 6px 0px";
    c.style.whiteSpace = "nowrap";
    c.style.overflow = "hidden";
    c.style.width = "200px";
    c.style.fontWeight = "bold";
    mxUtils.write(c, a);
    return c
};
BaseFormatPanel.prototype.createStepper = function(a, c, b, e, h, d, g) {
    b = null != b ? b : 1;
    e = null != e ? e : 8;
    if (mxClient.IS_MT || 8 <= document.documentMode) e += 1;
    var f = document.createElement("div");
    mxUtils.setPrefixedStyle(f.style, "borderRadius", "3px");
    f.style.border = "1px solid rgb(192, 192, 192)";
    f.style.position = "absolute";
    var l = document.createElement("div");
    l.style.borderBottom = "1px solid rgb(192, 192, 192)";
    l.style.position = "relative";
    l.style.height = e + "px";
    l.style.width = "10px";
    l.className = "geBtnUp";
    f.appendChild(l);
    var n = l.cloneNode(!1);
    n.style.border = "none";
    n.style.height = e + "px";
    n.className = "geBtnDown";
    f.appendChild(n);
    mxEvent.addListener(n, "click", function(e) {
        "" == a.value && (a.value = d || "2");
        var f = g ? parseFloat(a.value) : parseInt(a.value);
        isNaN(f) || (a.value = f - b, null != c && c(e));
        mxEvent.consume(e)
    });
    mxEvent.addListener(l, "click", function(e) {
        "" == a.value && (a.value = d || "0");
        var f = g ? parseFloat(a.value) : parseInt(a.value);
        isNaN(f) || (a.value = f + b, null != c && c(e));
        mxEvent.consume(e)
    });
    if (h) {
        var k = null;
        mxEvent.addGestureListeners(f,
            function(a) {
                mxEvent.consume(a)
            }, null,
            function(a) {
                if (null != k) {
                    try {
                        k.select()
                    } catch (p) {}
                    k = null;
                    mxEvent.consume(a)
                }
            })
    }
    return f
};
BaseFormatPanel.prototype.createOption = function(a, c, b, e, h) {
    var d = document.createElement("div");
    d.style.padding = "6px 0px 1px 0px";
    d.style.whiteSpace = "nowrap";
    d.style.overflow = "hidden";
    d.style.width = "200px";
    d.style.height = "18px";
    var g = document.createElement("input");
    g.setAttribute("type", "checkbox");
    g.style.margin = "0px 6px 0px 0px";
    d.appendChild(g);
    var f = document.createElement("span");
    mxUtils.write(f, a);
    d.appendChild(f);
    var l = !1,
        n = c(),
        k = function(a) {
            l || (l = !0, a ? (g.setAttribute("checked", "checked"), g.defaultChecked = !0, g.checked = !0) : (g.removeAttribute("checked"), g.defaultChecked = !1, g.checked = !1), n != a && (n = a, c() != n && b(n)), l = !1)
        };
    mxEvent.addListener(d, "click", function(a) {
        if ("disabled" != g.getAttribute("disabled")) {
            a = mxEvent.getSource(a);
            if (a == d || a == f) g.checked = !g.checked;
            k(g.checked)
        }
    });
    k(n);
    null != e && (e.install(k), this.listeners.push(e));
    null != h && h(d);
    return d
};
BaseFormatPanel.prototype.createCellOption = function(a, c, b, e, h, d, g, f, l) {
    var n = this.editorUi,
        k = n.editor.graph;
    e = null != e ? "null" == e ? null : e : 1;
    h = null != h ? "null" == h ? null : h : 0;
    var m = null != l ? k.getCommonStyle(l) : this.format.selectionState.style;
    return this.createOption(a, function() {
        return mxUtils.getValue(m, c, b) != h
    }, function(a) {
        f && k.stopEditing();
        if (null != g) g.funct();
        else {
            k.getModel().beginUpdate();
            try {
                var b = null != l ? l : k.getSelectionCells();
                a = a ? e : h;
                k.setCellStyles(c, a, b);
                null != d && d(b, a);
                n.fireEvent(new mxEventObject("styleChanged",
                    "keys", [c], "values", [a], "cells", b))
            } finally {
                k.getModel().endUpdate()
            }
        }
    }, {
        install: function(a) {
            this.listener = function() {
                a(mxUtils.getValue(m, c, b) != h)
            };
            k.getModel().addListener(mxEvent.CHANGE, this.listener)
        },
        destroy: function() {
            k.getModel().removeListener(this.listener)
        }
    })
};
BaseFormatPanel.prototype.createColorOption = function(a, c, b, e, h, d, g) {
    var f = document.createElement("div");
    f.style.padding = "6px 0px 1px 0px";
    f.style.whiteSpace = "nowrap";
    f.style.overflow = "hidden";
    f.style.width = "200px";
    f.style.height = "18px";
    var l = document.createElement("input");
    l.setAttribute("type", "checkbox");
    l.style.margin = "0px 6px 0px 0px";
    g || f.appendChild(l);
    var n = document.createElement("span");
    mxUtils.write(n, a);
    f.appendChild(n);
    var k = c(),
        m = !1,
        p = null,
        u = function(a, f, h) {
            m || (m = !0, a = /(^#?[a-zA-Z0-9]*$)/.test(a) ?
                a : e, p.innerHTML = '<div style="width:36px;height:12px;margin:3px;border:1px solid black;background-color:' + mxUtils.htmlEntities(null != a && a != mxConstants.NONE ? a : e) + ';"></div>', null != a && a != mxConstants.NONE ? (l.setAttribute("checked", "checked"), l.defaultChecked = !0, l.checked = !0) : (l.removeAttribute("checked"), l.defaultChecked = !1, l.checked = !1), p.style.display = l.checked || g ? "" : "none", null != d && d(a), f || (k = a, (h || g || c() != k) && b(k)), m = !1)
        };
    p = mxUtils.button("", mxUtils.bind(this, function(a) {
        this.editorUi.pickColor(k,
            function(a) {
                u(a, null, !0)
            });
        mxEvent.consume(a)
    }));
    p.style.position = "absolute";
    p.style.marginTop = "-4px";
    p.style.right = "20px";
    p.style.height = "22px";
    p.className = "geColorBtn";
    p.style.display = l.checked || g ? "" : "none";
    f.appendChild(p);
    mxEvent.addListener(f, "click", function(a) {
        a = mxEvent.getSource(a);
        if (a == l || "INPUT" != a.nodeName) a != l && (l.checked = !l.checked), l.checked || null == k || k == mxConstants.NONE || e == mxConstants.NONE || (e = k), u(l.checked ? e : mxConstants.NONE)
    });
    u(k, !0);
    null != h && (h.install(u), this.listeners.push(h));
    return f
};
BaseFormatPanel.prototype.createCellColorOption = function(a, c, b, e, h) {
    var d = this.editorUi,
        g = d.editor.graph;
    return this.createColorOption(a, function() {
        var a = g.view.getState(g.getSelectionCell());
        return null != a ? mxUtils.getValue(a.style, c, null) : null
    }, function(a) {
        g.getModel().beginUpdate();
        try {
            g.setCellStyles(c, a, g.getSelectionCells()), null != h && h(a), d.fireEvent(new mxEventObject("styleChanged", "keys", [c], "values", [a], "cells", g.getSelectionCells()))
        } finally {
            g.getModel().endUpdate()
        }
    }, b || mxConstants.NONE, {
        install: function(a) {
            this.listener =
                function() {
                    var b = g.view.getState(g.getSelectionCell());
                    null != b && a(mxUtils.getValue(b.style, c, null))
                };
            g.getModel().addListener(mxEvent.CHANGE, this.listener)
        },
        destroy: function() {
            g.getModel().removeListener(this.listener)
        }
    }, e)
};
BaseFormatPanel.prototype.addArrow = function(a, c) {
    c = null != c ? c : 10;
    var b = document.createElement("div");
    b.style.display = "inline-block";
    b.style.padding = "6px";
    b.style.paddingRight = "4px";
    var e = 10 - c;
    2 == e ? b.style.paddingTop = "6px" : 0 < e ? b.style.paddingTop = 6 - e + "px" : b.style.marginTop = "-2px";
    b.style.height = c + "px";
    b.style.borderLeft = "1px solid #a0a0a0";
    b.innerHTML = '<img border="0" src="' + (mxClient.IS_SVG ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUeNpidHB2ZyAGsACxDRBPIKCuA6TwCBB/h2rABu4A8SYmKCcXiP/iUFgAxL9gCi8A8SwsirZCMQMTkmANEH9E4v+CmsaArvAdyNFI/FlQ92EoBIE+qCRIUz168DBgsU4OqhinQpgHMABAgAEALY4XLIsJ20oAAAAASUVORK5CYII=" :
        IMAGE_PATH + "/dropdown.png") + '" style="margin-bottom:4px;">';
    mxUtils.setOpacity(b, 70);
    c = a.getElementsByTagName("div")[0];
    null != c && (c.style.paddingRight = "6px", c.style.marginLeft = "4px", c.style.marginTop = "-1px", c.style.display = "inline-block", mxUtils.setOpacity(c, 60));
    mxUtils.setOpacity(a, 100);
    a.style.border = "1px solid #a0a0a0";
    a.style.backgroundColor = this.buttonBackgroundColor;
    a.style.backgroundImage = "none";
    a.style.width = "auto";
    a.className += " geColorBtn";
    mxUtils.setPrefixedStyle(a.style, "borderRadius",
        "3px");
    a.appendChild(b);
    return c
};
BaseFormatPanel.prototype.addUnitInput = function(a, c, b, e, h, d, g, f, l) {
    g = null != g ? g : 0;
    c = document.createElement("input");
    c.style.position = "absolute";
    c.style.textAlign = "right";
    c.style.marginTop = "-2px";
    c.style.right = b + 12 + "px";
    c.style.width = e + "px";
    a.appendChild(c);
    e = this.createStepper(c, h, d, null, f, null, l);
    e.style.marginTop = g - 2 + "px";
    e.style.right = b + "px";
    a.appendChild(e);
    return c
};
BaseFormatPanel.prototype.createRelativeOption = function(a, c, b, e, h) {
    b = null != b ? b : 44;
    var d = this.editorUi.editor.graph,
        g = this.createPanel();
    g.style.paddingTop = "10px";
    g.style.paddingBottom = "10px";
    mxUtils.write(g, a);
    g.style.fontWeight = "bold";
    a = mxUtils.bind(this, function(a) {
        if (null != e) e(f);
        else {
            var b = parseInt(f.value);
            b = Math.min(100, Math.max(0, isNaN(b) ? 100 : b));
            var g = d.view.getState(d.getSelectionCell());
            null != g && b != mxUtils.getValue(g.style, c, 100) && (100 == b && (b = null), d.setCellStyles(c, b, d.getSelectionCells()),
                this.editorUi.fireEvent(new mxEventObject("styleChanged", "keys", [c], "values", [b], "cells", d.getSelectionCells())));
            f.value = (null != b ? b : "100") + " %"
        }
        mxEvent.consume(a)
    });
    var f = this.addUnitInput(g, "%", 20, b, a, 10, -14, null != e);
    if (null != c) {
        var l = mxUtils.bind(this, function(a, b, e) {
            if (e || f != document.activeElement) a = this.format.getSelectionState(), a = parseInt(mxUtils.getValue(a.style, c, 100)), f.value = isNaN(a) ? "" : a + " %"
        });
        mxEvent.addListener(f, "keydown", function(a) {
            13 == a.keyCode ? (d.container.focus(), mxEvent.consume(a)) :
                27 == a.keyCode && (l(null, null, !0), d.container.focus(), mxEvent.consume(a))
        });
        d.getModel().addListener(mxEvent.CHANGE, l);
        this.listeners.push({
            destroy: function() {
                d.getModel().removeListener(l)
            }
        });
        l()
    }
    mxEvent.addListener(f, "blur", a);
    mxEvent.addListener(f, "change", a);
    null != h && h(f);
    return g
};
BaseFormatPanel.prototype.addLabel = function(a, c, b, e) {
    e = null != e ? e : 61;
    var h = document.createElement("div");
    mxUtils.write(h, c);
    h.style.position = "absolute";
    h.style.right = b + "px";
    h.style.width = e + "px";
    h.style.marginTop = "6px";
    h.style.textAlign = "center";
    a.appendChild(h)
};
BaseFormatPanel.prototype.addKeyHandler = function(a, c) {
    mxEvent.addListener(a, "keydown", mxUtils.bind(this, function(a) {
        13 == a.keyCode ? (this.editorUi.editor.graph.container.focus(), mxEvent.consume(a)) : 27 == a.keyCode && (null != c && c(null, null, !0), this.editorUi.editor.graph.container.focus(), mxEvent.consume(a))
    }))
};
BaseFormatPanel.prototype.styleButtons = function(a) {
    for (var c = 0; c < a.length; c++) mxUtils.setPrefixedStyle(a[c].style, "borderRadius", "3px"), mxUtils.setOpacity(a[c], 100), a[c].style.border = "1px solid #a0a0a0", a[c].style.padding = "4px", a[c].style.paddingTop = "3px", a[c].style.paddingRight = "1px", a[c].style.margin = "1px", a[c].style.width = "24px", a[c].style.height = "20px", a[c].className += " geColorBtn"
};
BaseFormatPanel.prototype.destroy = function() {
    if (null != this.listeners) {
        for (var a = 0; a < this.listeners.length; a++) this.listeners[a].destroy();
        this.listeners = null
    }
};
ArrangePanel = function(a, c, b) {
    BaseFormatPanel.call(this, a, c, b);
    this.init()
};
mxUtils.extend(ArrangePanel, BaseFormatPanel);
ArrangePanel.prototype.init = function() {
    var a = this.editorUi.editor.graph,
        c = this.format.getSelectionState();
    this.container.appendChild(this.addLayerOps(this.createPanel()));
    this.addGeometry(this.container);
    this.addEdgeGeometry(this.container);
    c.containsLabel && 0 != c.edges.length || this.container.appendChild(this.addAngle(this.createPanel()));
    c.containsLabel || 0 != c.edges.length || "rectangle" == c.style.shape || "label" == c.style.shape || this.container.appendChild(this.addFlip(this.createPanel()));
    1 < c.vertices.length &&
        (this.container.appendChild(this.addAlign(this.createPanel())), this.container.appendChild(this.addDistribute(this.createPanel())));
    (a.isTable(c.vertices[0]) || a.isTableRow(c.vertices[0]) || a.isTableCell(c.vertices[0])) && this.container.appendChild(this.addTable(this.createPanel()));
    this.container.appendChild(this.addGroupOps(this.createPanel()));
    c.containsLabel && (a = document.createElement("div"), a.style.width = "100%", a.style.marginTop = "0px", a.style.fontWeight = "bold", a.style.padding = "10px 0 0 18px", mxUtils.write(a,
        mxResources.get("style")), this.container.appendChild(a), new StyleFormatPanel(this.format, this.editorUi, this.container))
};
ArrangePanel.prototype.addTable = function(a) {
    var c = this.editorUi,
        b = c.editor.graph,
        e = this.format.getSelectionState();
    a.style.paddingTop = "6px";
    a.style.paddingBottom = "10px";
    var h = document.createElement("div");
    h.style.marginTop = "2px";
    h.style.marginBottom = "8px";
    h.style.fontWeight = "bold";
    mxUtils.write(h, mxResources.get("table"));
    a.appendChild(h);
    h = document.createElement("div");
    h.style.position = "relative";
    h.style.paddingLeft = "0px";
    h.style.borderWidth = "0px";
    h.className = "geToolbarContainer";
    var d = [c.toolbar.addButton("geSprite-insertcolumnbefore",
        mxResources.get("insertColumnBefore"), mxUtils.bind(this, function() {
            try {
                b.insertTableColumn(e.vertices[0], !0)
            } catch (g) {
                c.handleError(g)
            }
        }), h), c.toolbar.addButton("geSprite-insertcolumnafter", mxResources.get("insertColumnAfter"), mxUtils.bind(this, function() {
        try {
            b.insertTableColumn(e.vertices[0], !1)
        } catch (g) {
            c.handleError(g)
        }
    }), h), c.toolbar.addButton("geSprite-deletecolumn", mxResources.get("deleteColumn"), mxUtils.bind(this, function() {
            try {
                b.deleteTableColumn(e.vertices[0])
            } catch (g) {
                c.handleError(g)
            }
        }),
        h), c.toolbar.addButton("geSprite-insertrowbefore", mxResources.get("insertRowBefore"), mxUtils.bind(this, function() {
        try {
            b.insertTableRow(e.vertices[0], !0)
        } catch (g) {
            c.handleError(g)
        }
    }), h), c.toolbar.addButton("geSprite-insertrowafter", mxResources.get("insertRowAfter"), mxUtils.bind(this, function() {
        try {
            b.insertTableRow(e.vertices[0], !1)
        } catch (g) {
            c.handleError(g)
        }
    }), h), c.toolbar.addButton("geSprite-deleterow", mxResources.get("deleteRow"), mxUtils.bind(this, function() {
            try {
                b.deleteTableRow(e.vertices[0])
            } catch (g) {
                c.handleError(g)
            }
        }),
        h)];
    this.styleButtons(d);
    a.appendChild(h);
    d[2].style.marginRight = "9px";
    return a
};
ArrangePanel.prototype.addLayerOps = function(a) {
    var c = this.editorUi,
        b = mxUtils.button(mxResources.get("toFront"), function(a) {
            c.actions.get("toFront").funct()
        });
    b.setAttribute("title", mxResources.get("toFront") + " (" + this.editorUi.actions.get("toFront").shortcut + ")");
    b.style.width = "75px";
    b.className = "btn btn-secondary";
    b.style.marginRight = "2px";
    a.appendChild(b);
    b = mxUtils.button(mxResources.get("toBack"), function(a) {
        c.actions.get("toBack").funct()
    });
    b.setAttribute("title", mxResources.get("toBack") + " (" +
        this.editorUi.actions.get("toBack").shortcut + ")");
    b.style.width = "75px";
    b.className = "btn btn-secondary";
    a.appendChild(b);
    return a
};
ArrangePanel.prototype.addGroupOps = function(a) {
    var c = this.editorUi,
        b = c.editor.graph,
        e = b.getSelectionCell(),
        h = this.format.getSelectionState(),
        d = 0,
        g = null;
    a.style.paddingTop = "8px";
    a.style.paddingBottom = "6px";
    1 < b.getSelectionCount() ? (g = mxUtils.button(mxResources.get("group"), function(a) {
            c.actions.get("group").funct()
        }), g.setAttribute("title", mxResources.get("group") + " (" + this.editorUi.actions.get("group").shortcut + ")"), g.style.width = "178px", g.className = "btn btn-secondary", g.style.marginBottom = "2px", a.appendChild(g),
        d++) : !(1 != b.getSelectionCount() || b.getModel().isEdge(e) || b.isSwimlane(e) || b.isTable(e) || h.row || h.cell) && 0 < b.getModel().getChildCount(e) && (g = mxUtils.button(mxResources.get("ungroup"), function(a) {
        c.actions.get("ungroup").funct()
    }), g.setAttribute("title", mxResources.get("ungroup") + " (" + this.editorUi.actions.get("ungroup").shortcut + ")"), g.style.width = "178px", g.className = "btn btn-secondary", g.style.marginBottom = "2px", a.appendChild(g), d++);
    if (0 < h.vertices.length && (0 < d && (mxUtils.br(a), d = 0), g = mxUtils.button(mxResources.get("copySize"),
            function(a) {
                c.actions.get("copySize").funct(a)
            }), g.setAttribute("title", mxResources.get("copySize") + " (" + this.editorUi.actions.get("copySize").shortcut + ")"), g.style.width = "178px", g.className = "btn btn-secondary", g.style.marginBottom = "2px", a.appendChild(g), d++, null != c.copiedSize)) {
        var f = mxUtils.button(mxResources.get("pasteSize"), function(a) {
            c.actions.get("pasteSize").funct(a)
        });
        f.setAttribute("title", mxResources.get("pasteSize") + " (" + this.editorUi.actions.get("pasteSize").shortcut + ")");
        a.appendChild(f);
        d++;
        g.style.width = "75px";
        g.className = "btn btn-secondary";
        g.style.marginBottom = "2px";
        f.style.width = "75px";
        f.className = "btn btn-secondary";
        f.style.marginBottom = "2px"
    }
    0 < b.getSelectionCount() && 0 < d && (mxUtils.br(a), d = 0);
    1 == b.getSelectionCount() && b.getModel().isVertex(e) && !h.row && !h.cell && b.getModel().isVertex(b.getModel().getParent(e)) ? (0 < d && mxUtils.br(a), g = mxUtils.button(mxResources.get("removeFromGroup"), function(a) {
            c.actions.get("removeFromGroup").funct()
        }), g.setAttribute("title", mxResources.get("removeFromGroup")),
        g.style.width = "178px", g.className = "btn btn-secondary", g.style.marginBottom = "2px", a.appendChild(g), d++) : 0 < b.getSelectionCount() && (0 < d && mxUtils.br(a), g = mxUtils.button(mxResources.get("clearWaypoints"), mxUtils.bind(this, function(a) {
            this.editorUi.actions.get("clearWaypoints").funct()
        })), g.setAttribute("title", mxResources.get("clearWaypoints") + " (" + this.editorUi.actions.get("clearWaypoints").shortcut + ")"), g.style.width = "178px", g.className = "btn btn-secondary", g.style.marginBottom = "2px", a.appendChild(g),
        d++);
    1 == b.getSelectionCount() && (0 < d && mxUtils.br(a), g = mxUtils.button(mxResources.get("editLink"), mxUtils.bind(this, function(a) {
        this.editorUi.actions.get("editLink").funct()
    })), g.setAttribute("title", mxResources.get("editLink") + " (" + this.editorUi.actions.get("editLink").shortcut + ")"), g.className = "btn btn-secondary", g.style.width = "178px", g.style.marginBottom = "2px", a.appendChild(g), d++);
    0 == d && (a.style.display = "none");
    return a
};
ArrangePanel.prototype.addAlign = function(a) {
    var c = this.editorUi.editor.graph;
    a.style.paddingTop = "6px";
    a.style.paddingBottom = "12px";
    a.appendChild(this.createTitle(mxResources.get("align")));
    var b = document.createElement("div");
    b.style.position = "relative";
    b.style.paddingLeft = "0px";
    b.style.borderWidth = "0px";
    b.className = "geToolbarContainer";
    var e = this.editorUi.toolbar.addButton("geSprite-alignleft", mxResources.get("left"), function() {
            c.alignCells(mxConstants.ALIGN_LEFT)
        }, b),
        h = this.editorUi.toolbar.addButton("geSprite-aligncenter",
            mxResources.get("center"),
            function() {
                c.alignCells(mxConstants.ALIGN_CENTER)
            }, b),
        d = this.editorUi.toolbar.addButton("geSprite-alignright", mxResources.get("right"), function() {
            c.alignCells(mxConstants.ALIGN_RIGHT)
        }, b),
        g = this.editorUi.toolbar.addButton("geSprite-aligntop", mxResources.get("top"), function() {
            c.alignCells(mxConstants.ALIGN_TOP)
        }, b),
        f = this.editorUi.toolbar.addButton("geSprite-alignmiddle", mxResources.get("middle"), function() {
            c.alignCells(mxConstants.ALIGN_MIDDLE)
        }, b),
        l = this.editorUi.toolbar.addButton("geSprite-alignbottom",
            mxResources.get("bottom"),
            function() {
                c.alignCells(mxConstants.ALIGN_BOTTOM)
            }, b);
    this.styleButtons([e, h, d, g, f, l]);
    d.style.marginRight = "6px";
    a.appendChild(b);
    return a
};
ArrangePanel.prototype.addFlip = function(a) {
    var c = this.editorUi.editor.graph;
    a.style.paddingTop = "6px";
    a.style.paddingBottom = "10px";
    var b = document.createElement("div");
    b.style.marginTop = "2px";
    b.style.marginBottom = "8px";
    b.style.fontWeight = "bold";
    mxUtils.write(b, mxResources.get("flip"));
    a.appendChild(b);
    b = mxUtils.button(mxResources.get("horizontal"), function(a) {
        c.toggleCellStyles(mxConstants.STYLE_FLIPH, !1)
    });
    b.setAttribute("title", mxResources.get("horizontal"));
    b.style.width = "75px";
    b.className = "btn btn-secondary";
    b.style.marginRight = "2px";
    a.appendChild(b);
    b = mxUtils.button(mxResources.get("vertical"), function(a) {
        c.toggleCellStyles(mxConstants.STYLE_FLIPV, !1)
    });
    b.setAttribute("title", mxResources.get("vertical"));
    b.style.width = "75px";
    b.className = "btn btn-secondary";
    a.appendChild(b);
    return a
};
ArrangePanel.prototype.addDistribute = function(a) {
    var c = this.editorUi.editor.graph;
    a.style.paddingTop = "6px";
    a.style.paddingBottom = "12px";
    a.appendChild(this.createTitle(mxResources.get("distribute")));
    var b = mxUtils.button(mxResources.get("horizontal"), function(a) {
        c.distributeCells(!0)
    });
    b.setAttribute("title", mxResources.get("horizontal"));
    b.style.width = "75px";
    b.className = "btn btn-secondary";
    b.style.marginRight = "2px";
    a.appendChild(b);
    b = mxUtils.button(mxResources.get("vertical"), function(a) {
        c.distributeCells(!1)
    });
    b.setAttribute("title", mxResources.get("vertical"));
    b.style.width = "75px";
    b.className = "btn btn-secondary";
    a.appendChild(b);
    return a
};
ArrangePanel.prototype.addAngle = function(a) {
    var c = this.editorUi,
        b = c.editor.graph,
        e = this.format.getSelectionState();
    a.style.paddingBottom = "8px";
    var h = document.createElement("div");
    h.style.position = "absolute";
    h.style.width = "70px";
    h.style.marginTop = "0px";
    h.style.fontWeight = "bold";
    var d = null,
        g = null,
        f = null;
    !e.rotatable || e.table || e.row || e.cell ? a.style.paddingTop = "8px" : (mxUtils.write(h, mxResources.get("angle")), a.appendChild(h), d = this.addUnitInput(a, "\u00b0", 20, 44, function() {
            g.apply(this, arguments)
        }), mxUtils.br(a),
        a.style.paddingTop = "10px");
    e.containsLabel || (h = mxResources.get("reverse"), 0 < e.vertices.length && 0 < e.edges.length ? h = mxResources.get("turn") + " / " + h : 0 < e.vertices.length && (h = mxResources.get("turn")), f = mxUtils.button(h, function(a) {
        c.actions.get("turn").funct(a)
    }), f.setAttribute("title", h + " (" + this.editorUi.actions.get("turn").shortcut + ")"), f.style.width = "178px", f.className = "btn btn-secondary", a.appendChild(f), null != d && (f.style.marginTop = "8px"));
    if (null != d) {
        var l = mxUtils.bind(this, function(a, b, c) {
            if (c ||
                document.activeElement != d) e = this.format.getSelectionState(), a = parseFloat(mxUtils.getValue(e.style, mxConstants.STYLE_ROTATION, 0)), d.value = isNaN(a) ? "" : a + "\u00b0"
        });
        g = this.installInputHandler(d, mxConstants.STYLE_ROTATION, 0, 0, 360, "\u00b0", null, !0);
        this.addKeyHandler(d, l);
        b.getModel().addListener(mxEvent.CHANGE, l);
        this.listeners.push({
            destroy: function() {
                b.getModel().removeListener(l)
            }
        });
        l()
    }
    return a
};
BaseFormatPanel.prototype.getUnit = function() {
    switch (this.editorUi.editor.graph.view.unit) {
        case mxConstants.POINTS:
            return "pt";
        case mxConstants.INCHES:
            return '"';
        case mxConstants.MILLIMETERS:
            return "mm"
    }
};
BaseFormatPanel.prototype.inUnit = function(a) {
    return this.editorUi.editor.graph.view.formatUnitText(a)
};
BaseFormatPanel.prototype.fromUnit = function(a) {
    switch (this.editorUi.editor.graph.view.unit) {
        case mxConstants.POINTS:
            return a;
        case mxConstants.INCHES:
            return a * mxConstants.PIXELS_PER_INCH;
        case mxConstants.MILLIMETERS:
            return a * mxConstants.PIXELS_PER_MM
    }
};
BaseFormatPanel.prototype.isFloatUnit = function() {
    return this.editorUi.editor.graph.view.unit != mxConstants.POINTS
};
BaseFormatPanel.prototype.getUnitStep = function() {
    switch (this.editorUi.editor.graph.view.unit) {
        case mxConstants.POINTS:
            return 1;
        case mxConstants.INCHES:
            return .1;
        case mxConstants.MILLIMETERS:
            return .5
    }
};
ArrangePanel.prototype.addGeometry = function(a) {
    var c = this,
        b = this.editorUi,
        e = b.editor.graph,
        h = e.getModel(),
        d = this.format.getSelectionState(),
        g = this.createPanel();
    g.style.paddingBottom = "8px";
    var f = document.createElement("div");
    f.style.position = "absolute";
    f.style.width = "50px";
    f.style.marginTop = "0px";
    f.style.fontWeight = "bold";
    mxUtils.write(f, mxResources.get("size"));
    g.appendChild(f);
    var l = this.addUnitInput(g, this.getUnit(), 84, 44, function() {
            u.apply(this, arguments)
        }, this.getUnitStep(), null, null, this.isFloatUnit()),
        n = this.addUnitInput(g, this.getUnit(), 20, 44, function() {
            t.apply(this, arguments)
        }, this.getUnitStep(), null, null, this.isFloatUnit()),
        k = document.createElement("div");
    k.className = "geSprite geSprite-fit";
    k.setAttribute("title", mxResources.get("autosize") + " (" + this.editorUi.actions.get("autosize").shortcut + ")");
    k.style.position = "relative";
    k.style.cursor = "pointer";
    k.style.marginTop = "-3px";
    k.style.border = "0px";
    k.style.left = "42px";
    mxUtils.setOpacity(k, 50);
    mxEvent.addListener(k, "mouseenter", function() {
        mxUtils.setOpacity(k,
            100)
    });
    mxEvent.addListener(k, "mouseleave", function() {
        mxUtils.setOpacity(k, 50)
    });
    mxEvent.addListener(k, "click", function() {
        b.actions.get("autosize").funct()
    });
    g.appendChild(k);
    d.row ? (l.style.visibility = "hidden", l.nextSibling.style.visibility = "hidden") : this.addLabel(g, mxResources.get("width"), 84);
    this.addLabel(g, mxResources.get("height"), 20);
    mxUtils.br(g);
    f = document.createElement("div");
    f.style.paddingTop = "8px";
    f.style.paddingRight = "20px";
    f.style.whiteSpace = "nowrap";
    f.style.textAlign = "right";
    var m = this.createCellOption(mxResources.get("constrainProportions"),
        mxConstants.STYLE_ASPECT, null, "fixed", "null");
    m.style.width = "100%";
    f.appendChild(m);
    d.cell || d.row ? k.style.visibility = "hidden" : g.appendChild(f);
    var p = m.getElementsByTagName("input")[0];
    this.addKeyHandler(l, v);
    this.addKeyHandler(n, v);
    var u = this.addGeometryHandler(l, function(a, b, d) {
        if (e.isTableCell(d)) return e.setTableColumnWidth(d, b - a.width, !0), !0;
        0 < a.width && (b = Math.max(1, c.fromUnit(b)), p.checked && (a.height = Math.round(a.height * b * 100 / a.width) / 100), a.width = b)
    });
    var t = this.addGeometryHandler(n, function(a,
        b, d) {
        e.isTableCell(d) && (d = e.model.getParent(d));
        if (e.isTableRow(d)) return e.setTableRowHeight(d, b - a.height), !0;
        0 < a.height && (b = Math.max(1, c.fromUnit(b)), p.checked && (a.width = Math.round(a.width * b * 100 / a.height) / 100), a.height = b)
    });
    (d.resizable || d.row || d.cell) && a.appendChild(g);
    var w = this.createPanel();
    w.style.paddingBottom = "30px";
    f = document.createElement("div");
    f.style.position = "absolute";
    f.style.width = "70px";
    f.style.marginTop = "0px";
    f.style.fontWeight = "bold";
    mxUtils.write(f, mxResources.get("position"));
    w.appendChild(f);
    var q = this.addUnitInput(w, this.getUnit(), 84, 44, function() {
            G.apply(this, arguments)
        }, this.getUnitStep(), null, null, this.isFloatUnit()),
        y = this.addUnitInput(w, this.getUnit(), 20, 44, function() {
            E.apply(this, arguments)
        }, this.getUnitStep(), null, null, this.isFloatUnit());
    mxUtils.br(w);
    this.addLabel(w, mxResources.get("left"), 84);
    this.addLabel(w, mxResources.get("top"), 20);
    var v = mxUtils.bind(this, function(a, b, c) {
        d = this.format.getSelectionState();
        if (d.containsLabel || d.vertices.length != e.getSelectionCount() ||
            null == d.width || null == d.height) g.style.display = "none";
        else {
            g.style.display = "";
            if (c || document.activeElement != l) l.value = this.inUnit(d.width) + ("" == d.width ? "" : " " + this.getUnit());
            if (c || document.activeElement != n) n.value = this.inUnit(d.height) + ("" == d.height ? "" : " " + this.getUnit())
        }
        if (d.vertices.length == e.getSelectionCount() && null != d.x && null != d.y) {
            w.style.display = "";
            if (c || document.activeElement != q) q.value = this.inUnit(d.x) + ("" == d.x ? "" : " " + this.getUnit());
            if (c || document.activeElement != y) y.value = this.inUnit(d.y) +
                ("" == d.y ? "" : " " + this.getUnit())
        } else w.style.display = "none"
    });
    this.addKeyHandler(q, v);
    this.addKeyHandler(y, v);
    h.addListener(mxEvent.CHANGE, v);
    this.listeners.push({
        destroy: function() {
            h.removeListener(v)
        }
    });
    v();
    var G = this.addGeometryHandler(q, function(a, b) {
        b = c.fromUnit(b);
        a.relative ? a.offset.x = b : a.x = b
    });
    var E = this.addGeometryHandler(y, function(a, b) {
        b = c.fromUnit(b);
        a.relative ? a.offset.y = b : a.y = b
    });
    if (d.movable) {
        if (0 == d.edges.length && 1 == d.vertices.length && h.isEdge(h.getParent(d.vertices[0]))) {
            var A = e.getCellGeometry(d.vertices[0]);
            null != A && A.relative && (f = mxUtils.button(mxResources.get("center"), mxUtils.bind(this, function(a) {
                h.beginUpdate();
                try {
                    A = A.clone(), A.x = 0, A.y = 0, A.offset = new mxPoint, h.setGeometry(d.vertices[0], A)
                } finally {
                    h.endUpdate()
                }
            })), f.setAttribute("title", mxResources.get("center")), f.style.width = "202px", f.style.position = "absolute", mxUtils.br(w), mxUtils.br(w), w.appendChild(f))
        }
        a.appendChild(w)
    }
};
ArrangePanel.prototype.addGeometryHandler = function(a, c) {
    function b(b) {
        if ("" != a.value) {
            var f = parseFloat(a.value);
            if (isNaN(f)) a.value = h + " " + d.getUnit();
            else if (f != h) {
                e.getModel().beginUpdate();
                try {
                    for (var g = e.getSelectionCells(), n = 0; n < g.length; n++)
                        if (e.getModel().isVertex(g[n])) {
                            var k = e.getCellGeometry(g[n]);
                            if (null != k && (k = k.clone(), !c(k, f, g[n]))) {
                                var m = e.view.getState(g[n]);
                                null != m && e.isRecursiveVertexResize(m) && e.resizeChildCells(g[n], k);
                                e.getModel().setGeometry(g[n], k);
                                e.constrainChildCells(g[n])
                            }
                        }
                } finally {
                    e.getModel().endUpdate()
                }
                h =
                    f;
                a.value = f + " " + d.getUnit()
            }
        }
        mxEvent.consume(b)
    }
    var e = this.editorUi.editor.graph,
        h = null,
        d = this;
    mxEvent.addListener(a, "blur", b);
    mxEvent.addListener(a, "change", b);
    mxEvent.addListener(a, "focus", function() {
        h = a.value
    });
    return b
};
ArrangePanel.prototype.addEdgeGeometryHandler = function(a, c) {
    function b(b) {
        if ("" != a.value) {
            var d = parseFloat(a.value);
            if (isNaN(d)) a.value = h + " pt";
            else if (d != h) {
                e.getModel().beginUpdate();
                try {
                    for (var f = e.getSelectionCells(), l = 0; l < f.length; l++)
                        if (e.getModel().isEdge(f[l])) {
                            var n = e.getCellGeometry(f[l]);
                            null != n && (n = n.clone(), c(n, d), e.getModel().setGeometry(f[l], n))
                        }
                } finally {
                    e.getModel().endUpdate()
                }
                h = d;
                a.value = d + " pt"
            }
        }
        mxEvent.consume(b)
    }
    var e = this.editorUi.editor.graph,
        h = null;
    mxEvent.addListener(a, "blur",
        b);
    mxEvent.addListener(a, "change", b);
    mxEvent.addListener(a, "focus", function() {
        h = a.value
    });
    return b
};
ArrangePanel.prototype.addEdgeGeometry = function(a) {
    function c(a) {
        var c = parseInt(f.value);
        c = Math.min(999, Math.max(1, isNaN(c) ? 1 : c));
        c != mxUtils.getValue(h.style, "width", mxCellRenderer.defaultShapes.flexArrow.prototype.defaultWidth) && (e.setCellStyles("width", c, e.getSelectionCells()), b.fireEvent(new mxEventObject("styleChanged", "keys", ["width"], "values", [c], "cells", e.getSelectionCells())));
        f.value = c + " pt";
        mxEvent.consume(a)
    }
    var b = this.editorUi,
        e = b.editor.graph,
        h = this.format.getSelectionState(),
        d = this.createPanel(),
        g = document.createElement("div");
    g.style.position = "absolute";
    g.style.width = "70px";
    g.style.marginTop = "0px";
    g.style.fontWeight = "bold";
    mxUtils.write(g, mxResources.get("width"));
    d.appendChild(g);
    var f = this.addUnitInput(d, "pt", 20, 44, function() {
        c.apply(this, arguments)
    });
    mxUtils.br(d);
    this.addKeyHandler(f, t);
    mxEvent.addListener(f, "blur", c);
    mxEvent.addListener(f, "change", c);
    a.appendChild(d);
    var l = this.createPanel();
    l.style.paddingBottom = "30px";
    g = document.createElement("div");
    g.style.position = "absolute";
    g.style.width =
        "70px";
    g.style.marginTop = "0px";
    g.style.fontWeight = "bold";
    mxUtils.write(g, "Start");
    l.appendChild(g);
    var n = this.addUnitInput(l, "pt", 84, 44, function() {
            w.apply(this, arguments)
        }),
        k = this.addUnitInput(l, "pt", 20, 44, function() {
            q.apply(this, arguments)
        });
    mxUtils.br(l);
    this.addLabel(l, mxResources.get("left"), 84);
    this.addLabel(l, mxResources.get("top"), 20);
    a.appendChild(l);
    this.addKeyHandler(n, t);
    this.addKeyHandler(k, t);
    var m = this.createPanel();
    m.style.paddingBottom = "30px";
    g = document.createElement("div");
    g.style.position =
        "absolute";
    g.style.width = "70px";
    g.style.marginTop = "0px";
    g.style.fontWeight = "bold";
    mxUtils.write(g, "End");
    m.appendChild(g);
    var p = this.addUnitInput(m, "pt", 84, 44, function() {
            y.apply(this, arguments)
        }),
        u = this.addUnitInput(m, "pt", 20, 44, function() {
            v.apply(this, arguments)
        });
    mxUtils.br(m);
    this.addLabel(m, mxResources.get("left"), 84);
    this.addLabel(m, mxResources.get("top"), 20);
    a.appendChild(m);
    this.addKeyHandler(p, t);
    this.addKeyHandler(u, t);
    var t = mxUtils.bind(this, function(a, b, c) {
        h = this.format.getSelectionState();
        a = e.getSelectionCell();
        if ("link" == h.style.shape || "flexArrow" == h.style.shape) {
            if (d.style.display = "", c || document.activeElement != f) c = mxUtils.getValue(h.style, "width", mxCellRenderer.defaultShapes.flexArrow.prototype.defaultWidth), f.value = c + " pt"
        } else d.style.display = "none";
        1 == e.getSelectionCount() && e.model.isEdge(a) ? (c = e.model.getGeometry(a), null != c.sourcePoint && null == e.model.getTerminal(a, !0) ? (n.value = c.sourcePoint.x, k.value = c.sourcePoint.y) : l.style.display = "none", null != c.targetPoint && null == e.model.getTerminal(a,
            !1) ? (p.value = c.targetPoint.x, u.value = c.targetPoint.y) : m.style.display = "none") : (l.style.display = "none", m.style.display = "none")
    });
    var w = this.addEdgeGeometryHandler(n, function(a, b) {
        a.sourcePoint.x = b
    });
    var q = this.addEdgeGeometryHandler(k, function(a, b) {
        a.sourcePoint.y = b
    });
    var y = this.addEdgeGeometryHandler(p, function(a, b) {
        a.targetPoint.x = b
    });
    var v = this.addEdgeGeometryHandler(u, function(a, b) {
        a.targetPoint.y = b
    });
    e.getModel().addListener(mxEvent.CHANGE, t);
    this.listeners.push({
        destroy: function() {
            e.getModel().removeListener(t)
        }
    });
    t()
};
TextFormatPanel = function(a, c, b) {
    BaseFormatPanel.call(this, a, c, b);
    this.init()
};
mxUtils.extend(TextFormatPanel, BaseFormatPanel);
TextFormatPanel.prototype.init = function() {
    this.container.style.borderBottom = "none";
    this.addFont(this.container)
};
TextFormatPanel.prototype.addFont = function(a) {
    function c(a, b) {
        a.style.backgroundImage = b ? "linear-gradient(#c5ecff 0px,#87d4fb 100%)" : ""
    }
    var b = this.editorUi,
        e = b.editor.graph,
        h = this.format.getSelectionState(),
        d = this.createTitle(mxResources.get("font"));
    d.style.paddingLeft = "18px";
    d.style.paddingTop = "10px";
    d.style.paddingBottom = "6px";
    a.appendChild(d);
    d = this.createPanel();
    d.style.paddingTop = "2px";
    d.style.paddingBottom = "2px";
    d.style.position = "relative";
    d.style.marginLeft = "-2px";
    d.style.borderWidth = "0px";
    d.className = "geToolbarContainer";
    if (e.cellEditor.isContentEditing()) {
        var g = d.cloneNode(),
            f = this.editorUi.toolbar.addMenu(mxResources.get("style"), mxResources.get("style"), !0, "formatBlock", g, null, !0);
        f.style.color = "rgb(112, 112, 112)";
        f.style.whiteSpace = "nowrap";
        f.style.overflow = "hidden";
        f.style.margin = "0px";
        this.addArrow(f);
        f.style.width = "192px";
        f.style.height = "15px";
        f = f.getElementsByTagName("div")[0];
        f.style.cssFloat = "right";
        a.appendChild(g)
    }
    a.appendChild(d);
    g = this.createPanel();
    g.style.marginTop =
        "8px";
    g.style.borderTop = "1px solid #c0c0c0";
    g.style.paddingTop = "6px";
    g.style.paddingBottom = "6px";
    var l = this.editorUi.toolbar.addMenu("Helvetica", mxResources.get("fontFamily"), !0, "fontFamily", d, null, !0);
    l.style.color = "rgb(112, 112, 112)";
    l.style.whiteSpace = "nowrap";
    l.style.overflow = "hidden";
    l.style.margin = "0px";
    this.addArrow(l);
    l.style.width = "192px";
    l.style.height = "15px";
    f = d.cloneNode(!1);
    f.style.marginLeft = "-3px";
    var n = this.editorUi.toolbar.addItems(["bold", "italic", "underline"], f, !0);
    n[0].setAttribute("title",
        mxResources.get("bold") + " (" + this.editorUi.actions.get("bold").shortcut + ")");
    n[1].setAttribute("title", mxResources.get("italic") + " (" + this.editorUi.actions.get("italic").shortcut + ")");
    n[2].setAttribute("title", mxResources.get("underline") + " (" + this.editorUi.actions.get("underline").shortcut + ")");
    var k = this.editorUi.toolbar.addItems(["vertical"], f, !0)[0];
    a.appendChild(f);
    this.styleButtons(n);
    this.styleButtons([k]);
    var m = d.cloneNode(!1);
    m.style.marginLeft = "-3px";
    m.style.paddingBottom = "0px";
    var p = function(a) {
            return function() {
                return a()
            }
        },
        u = this.editorUi.toolbar.addButton("geSprite-left", mxResources.get("left"), e.cellEditor.isContentEditing() ? function(a) {
            e.cellEditor.alignText(mxConstants.ALIGN_LEFT, a)
        } : p(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_LEFT])), m),
        t = this.editorUi.toolbar.addButton("geSprite-center", mxResources.get("center"), e.cellEditor.isContentEditing() ? function(a) {
            e.cellEditor.alignText(mxConstants.ALIGN_CENTER, a)
        } : p(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN],
            [mxConstants.ALIGN_CENTER])), m),
        w = this.editorUi.toolbar.addButton("geSprite-right", mxResources.get("right"), e.cellEditor.isContentEditing() ? function(a) {
            e.cellEditor.alignText(mxConstants.ALIGN_RIGHT, a)
        } : p(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_RIGHT])), m);
    this.styleButtons([u, t, w]);
    if (e.cellEditor.isContentEditing()) {
        var q = this.editorUi.toolbar.addButton("geSprite-removeformat", mxResources.get("strikethrough"), function() {
            document.execCommand("strikeThrough",
                !1, null)
        }, f);
        this.styleButtons([q]);
        q.firstChild.style.background = "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0wIDBoMjR2MjRIMFYweiIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjx1c2UgeGxpbms6aHJlZj0iI2EiIG92ZXJmbG93PSJ2aXNpYmxlIi8+PC9jbGlwUGF0aD48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGZpbGw9IiMwMTAxMDEiIGQ9Ik03LjI0IDguNzVjLS4yNi0uNDgtLjM5LTEuMDMtLjM5LTEuNjcgMC0uNjEuMTMtMS4xNi40LTEuNjcuMjYtLjUuNjMtLjkzIDEuMTEtMS4yOS40OC0uMzUgMS4wNS0uNjMgMS43LS44My42Ni0uMTkgMS4zOS0uMjkgMi4xOC0uMjkuODEgMCAxLjU0LjExIDIuMjEuMzQuNjYuMjIgMS4yMy41NCAxLjY5Ljk0LjQ3LjQuODMuODggMS4wOCAxLjQzLjI1LjU1LjM4IDEuMTUuMzggMS44MWgtMy4wMWMwLS4zMS0uMDUtLjU5LS4xNS0uODUtLjA5LS4yNy0uMjQtLjQ5LS40NC0uNjgtLjItLjE5LS40NS0uMzMtLjc1LS40NC0uMy0uMS0uNjYtLjE2LTEuMDYtLjE2LS4zOSAwLS43NC4wNC0xLjAzLjEzLS4yOS4wOS0uNTMuMjEtLjcyLjM2LS4xOS4xNi0uMzQuMzQtLjQ0LjU1LS4xLjIxLS4xNS40My0uMTUuNjYgMCAuNDguMjUuODguNzQgMS4yMS4zOC4yNS43Ny40OCAxLjQxLjdINy4zOWMtLjA1LS4wOC0uMTEtLjE3LS4xNS0uMjV6TTIxIDEydi0ySDN2Mmg5LjYyYy4xOC4wNy40LjE0LjU1LjIuMzcuMTcuNjYuMzQuODcuNTEuMjEuMTcuMzUuMzYuNDMuNTcuMDcuMi4xMS40My4xMS42OSAwIC4yMy0uMDUuNDUtLjE0LjY2LS4wOS4yLS4yMy4zOC0uNDIuNTMtLjE5LjE1LS40Mi4yNi0uNzEuMzUtLjI5LjA4LS42My4xMy0xLjAxLjEzLS40MyAwLS44My0uMDQtMS4xOC0uMTNzLS42Ni0uMjMtLjkxLS40MmMtLjI1LS4xOS0uNDUtLjQ0LS41OS0uNzUtLjE0LS4zMS0uMjUtLjc2LS4yNS0xLjIxSDYuNGMwIC41NS4wOCAxLjEzLjI0IDEuNTguMTYuNDUuMzcuODUuNjUgMS4yMS4yOC4zNS42LjY2Ljk4LjkyLjM3LjI2Ljc4LjQ4IDEuMjIuNjUuNDQuMTcuOS4zIDEuMzguMzkuNDguMDguOTYuMTMgMS40NC4xMy44IDAgMS41My0uMDkgMi4xOC0uMjhzMS4yMS0uNDUgMS42Ny0uNzljLjQ2LS4zNC44Mi0uNzcgMS4wNy0xLjI3cy4zOC0xLjA3LjM4LTEuNzFjMC0uNi0uMS0xLjE0LS4zMS0xLjYxLS4wNS0uMTEtLjExLS4yMy0uMTctLjMzSDIxeiIvPjwvc3ZnPg==)";
        q.firstChild.style.backgroundPosition = "2px 2px";
        q.firstChild.style.backgroundSize = "18px 18px";
        this.styleButtons([q])
    }
    var y = this.editorUi.toolbar.addButton("geSprite-top", mxResources.get("top"), p(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_TOP])), m),
        v = this.editorUi.toolbar.addButton("geSprite-middle", mxResources.get("middle"), p(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_MIDDLE])), m),
        G = this.editorUi.toolbar.addButton("geSprite-bottom",
            mxResources.get("bottom"), p(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_BOTTOM])), m);
    this.styleButtons([y, v, G]);
    a.appendChild(m);
    var E, A, r, z, x;
    if (e.cellEditor.isContentEditing()) {
        y.style.display = "none";
        v.style.display = "none";
        G.style.display = "none";
        k.style.display = "none";
        var J = this.editorUi.toolbar.addButton("geSprite-justifyfull", mxResources.get("block"), function() {
            1 == J.style.opacity && document.execCommand("justifyfull", !1, null)
        }, m);
        J.style.marginRight =
            "9px";
        J.style.opacity = 1;
        this.styleButtons([J, E = this.editorUi.toolbar.addButton("geSprite-subscript", mxResources.get("subscript") + " (" + Editor.ctrlKey + "+,)", function() {
            document.execCommand("subscript", !1, null)
        }, m), A = this.editorUi.toolbar.addButton("geSprite-superscript", mxResources.get("superscript") + " (" + Editor.ctrlKey + "+.)", function() {
            document.execCommand("superscript", !1, null)
        }, m)]);
        E.style.marginLeft = "9px";
        p = m.cloneNode(!1);
        p.style.paddingTop = "4px";
        m = [this.editorUi.toolbar.addButton("geSprite-orderedlist",
            mxResources.get("numberedList"),
            function() {
                document.execCommand("insertorderedlist", !1, null)
            }, p), this.editorUi.toolbar.addButton("geSprite-unorderedlist", mxResources.get("bulletedList"), function() {
            document.execCommand("insertunorderedlist", !1, null)
        }, p), this.editorUi.toolbar.addButton("geSprite-outdent", mxResources.get("decreaseIndent"), function() {
            document.execCommand("outdent", !1, null)
        }, p), this.editorUi.toolbar.addButton("geSprite-indent", mxResources.get("increaseIndent"), function() {
            document.execCommand("indent",
                !1, null)
        }, p), this.editorUi.toolbar.addButton("geSprite-removeformat", mxResources.get("removeFormat"), function() {
            document.execCommand("removeformat", !1, null)
        }, p), this.editorUi.toolbar.addButton("geSprite-code", mxResources.get("html"), function() {
            e.cellEditor.toggleViewMode()
        }, p)];
        this.styleButtons(m);
        m[m.length - 2].style.marginLeft = "9px";
        a.appendChild(p)
    } else n[2].style.marginRight = "9px", w.style.marginRight = "9px";
    m = d.cloneNode(!1);
    m.style.marginLeft = "0px";
    m.style.paddingTop = "8px";
    m.style.paddingBottom =
        "4px";
    m.style.fontWeight = "normal";
    mxUtils.write(m, mxResources.get("position"));
    var B = document.createElement("select");
    B.style.position = "absolute";
    B.style.right = "20px";
    B.style.width = "97px";
    B.style.marginTop = "-2px";
    q = "topLeft top topRight left center right bottomLeft bottom bottomRight".split(" ");
    var M = {
        topLeft: [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM],
        top: [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM],
        topRight: [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM],
        left: [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE],
        center: [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE],
        right: [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE],
        bottomLeft: [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_RIGHT,
            mxConstants.ALIGN_TOP
        ],
        bottom: [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP],
        bottomRight: [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP]
    };
    for (p = 0; p < q.length; p++) {
        var D = document.createElement("option");
        D.setAttribute("value", q[p]);
        mxUtils.write(D, mxResources.get(q[p]));
        B.appendChild(D)
    }
    m.appendChild(B);
    q = d.cloneNode(!1);
    q.style.marginLeft = "0px";
    q.style.paddingTop = "4px";
    q.style.paddingBottom = "4px";
    q.style.fontWeight =
        "normal";
    mxUtils.write(q, mxResources.get("writingDirection"));
    var H = document.createElement("select");
    H.style.position = "absolute";
    H.style.right = "20px";
    H.style.width = "97px";
    H.style.marginTop = "-2px";
    D = ["automatic", "leftToRight", "rightToLeft"];
    var F = {
        automatic: null,
        leftToRight: mxConstants.TEXT_DIRECTION_LTR,
        rightToLeft: mxConstants.TEXT_DIRECTION_RTL
    };
    for (p = 0; p < D.length; p++) {
        var O = document.createElement("option");
        O.setAttribute("value", D[p]);
        mxUtils.write(O, mxResources.get(D[p]));
        H.appendChild(O)
    }
    q.appendChild(H);
    e.isEditing() || (a.appendChild(m), mxEvent.addListener(B, "change", function(a) {
            e.getModel().beginUpdate();
            try {
                var b = M[B.value];
                null != b && (e.setCellStyles(mxConstants.STYLE_LABEL_POSITION, b[0], e.getSelectionCells()), e.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, b[1], e.getSelectionCells()), e.setCellStyles(mxConstants.STYLE_ALIGN, b[2], e.getSelectionCells()), e.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, b[3], e.getSelectionCells()))
            } finally {
                e.getModel().endUpdate()
            }
            mxEvent.consume(a)
        }), a.appendChild(q),
        mxEvent.addListener(H, "change", function(a) {
            e.setCellStyles(mxConstants.STYLE_TEXT_DIRECTION, F[H.value], e.getSelectionCells());
            mxEvent.consume(a)
        }));
    var C = document.createElement("input");
    C.style.textAlign = "right";
    C.style.marginTop = "4px";
    C.style.position = "absolute";
    C.style.right = "32px";
    C.style.width = "40px";
    C.style.height = "17px";
    f.appendChild(C);
    var K = null;
    m = this.installInputHandler(C, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize, 1, 999, " pt", function(a) {
        if (window.getSelection && !mxClient.IS_IE &&
            !mxClient.IS_IE11) {
            var b = function(b, d) {
                    null != e.cellEditor.textarea && b != e.cellEditor.textarea && e.cellEditor.textarea.contains(b) && (d || c.containsNode(b, !0)) && ("FONT" == b.nodeName ? (b.removeAttribute("size"), b.style.fontSize = a + "px") : mxUtils.getCurrentStyle(b).fontSize != a + "px" && (mxUtils.getCurrentStyle(b.parentNode).fontSize != a + "px" ? b.style.fontSize = a + "px" : b.style.fontSize = ""))
                },
                c = window.getSelection(),
                d = 0 < c.rangeCount ? c.getRangeAt(0).commonAncestorContainer : e.cellEditor.textarea;
            d != e.cellEditor.textarea &&
                d.nodeType == mxConstants.NODETYPE_ELEMENT || document.execCommand("fontSize", !1, "1");
            d != e.cellEditor.textarea && (d = d.parentNode);
            if (null != d && d.nodeType == mxConstants.NODETYPE_ELEMENT) {
                var f = d.getElementsByTagName("*");
                b(d);
                for (d = 0; d < f.length; d++) b(f[d])
            }
            C.value = a + " pt"
        } else if (window.getSelection || document.selection)
            if (b = function(a, b) {
                    for (; null != b;) {
                        if (b === a) return !0;
                        b = b.parentNode
                    }
                    return !1
                }, f = null, document.selection ? f = document.selection.createRange().parentElement() : (c = window.getSelection(), 0 < c.rangeCount &&
                    (f = c.getRangeAt(0).commonAncestorContainer)), null != f && b(e.cellEditor.textarea, f))
                for (K = a, document.execCommand("fontSize", !1, "4"), f = e.cellEditor.textarea.getElementsByTagName("font"), d = 0; d < f.length; d++)
                    if ("4" == f[d].getAttribute("size")) {
                        f[d].removeAttribute("size");
                        f[d].style.fontSize = K + "px";
                        window.setTimeout(function() {
                            C.value = K + " pt";
                            K = null
                        }, 0);
                        break
                    }
    }, !0);
    m = this.createStepper(C, m, 1, 10, !0, Menus.prototype.defaultFontSize);
    m.style.display = C.style.display;
    m.style.marginTop = "4px";
    m.style.right = "20px";
    f.appendChild(m);
    f = l.getElementsByTagName("div")[0];
    f.style.cssFloat = "right";
    var N = null,
        P = "#ffffff",
        R = null,
        Y = "#000000",
        S = e.cellEditor.isContentEditing() ? this.createColorOption(mxResources.get("backgroundColor"), function() {
            return P
        }, function(a) {
            document.execCommand("backcolor", !1, a != mxConstants.NONE ? a : "transparent")
        }, "#ffffff", {
            install: function(a) {
                N = a
            },
            destroy: function() {
                N = null
            }
        }, null, !0) : this.createCellColorOption(mxResources.get("backgroundColor"), mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, "#ffffff",
            null,
            function(a) {
                e.updateLabelElements(e.getSelectionCells(), function(a) {
                    a.style.backgroundColor = null
                })
            });
    S.style.fontWeight = "bold";
    var Z = this.createCellColorOption(mxResources.get("borderColor"), mxConstants.STYLE_LABEL_BORDERCOLOR, "#000000");
    Z.style.fontWeight = "bold";
    f = 1 <= h.vertices.length ? e.stylesheet.getDefaultVertexStyle() : e.stylesheet.getDefaultEdgeStyle();
    f = e.cellEditor.isContentEditing() ? this.createColorOption(mxResources.get("fontColor"), function() {
        return Y
    }, function(a) {
        if (mxClient.IS_FF) {
            for (var b =
                    e.cellEditor.textarea.getElementsByTagName("font"), c = [], d = 0; d < b.length; d++) c.push({
                node: b[d],
                color: b[d].getAttribute("color")
            });
            document.execCommand("forecolor", !1, a != mxConstants.NONE ? a : "transparent");
            a = e.cellEditor.textarea.getElementsByTagName("font");
            for (d = 0; d < a.length; d++)
                if (d >= c.length || a[d] != c[d].node || a[d] == c[d].node && a[d].getAttribute("color") != c[d].color) {
                    c = a[d].firstChild;
                    if (null != c && "A" == c.nodeName && null == c.nextSibling && null != c.firstChild) {
                        a[d].parentNode.insertBefore(c, a[d]);
                        for (b = c.firstChild; null !=
                            b;) {
                            var f = b.nextSibling;
                            a[d].appendChild(b);
                            b = f
                        }
                        c.appendChild(a[d])
                    }
                    break
                }
        } else document.execCommand("forecolor", !1, a != mxConstants.NONE ? a : "transparent")
    }, null != f[mxConstants.STYLE_FONTCOLOR] ? f[mxConstants.STYLE_FONTCOLOR] : "#000000", {
        install: function(a) {
            R = a
        },
        destroy: function() {
            R = null
        }
    }, null, !0) : this.createCellColorOption(mxResources.get("fontColor"), mxConstants.STYLE_FONTCOLOR, null != f[mxConstants.STYLE_FONTCOLOR] ? f[mxConstants.STYLE_FONTCOLOR] : "#000000", function(a) {
        S.style.display = a == mxConstants.NONE ?
            "none" : "";
        Z.style.display = S.style.display
    }, function(a) {
        a == mxConstants.NONE ? e.setCellStyles(mxConstants.STYLE_NOLABEL, "1", e.getSelectionCells()) : e.setCellStyles(mxConstants.STYLE_NOLABEL, null, e.getSelectionCells());
        e.updateCellStyles(mxConstants.STYLE_FONTCOLOR, a, e.getSelectionCells());
        e.updateLabelElements(e.getSelectionCells(), function(a) {
            a.removeAttribute("color");
            a.style.color = null
        })
    });
    f.style.fontWeight = "bold";
    g.appendChild(f);
    g.appendChild(S);
    e.cellEditor.isContentEditing() || g.appendChild(Z);
    a.appendChild(g);
    g = this.createPanel();
    g.style.paddingTop = "2px";
    g.style.paddingBottom = "4px";
    f = e.filterSelectionCells(mxUtils.bind(this, function(a) {
        var b = e.view.getState(a);
        return null == b || this.format.isAutoSizeState(b) || e.getModel().isEdge(a) || !e.isTableRow(a) && !e.isTableCell(a) && !e.isCellResizable(a)
    }));
    m = this.createCellOption(mxResources.get("wordWrap"), mxConstants.STYLE_WHITE_SPACE, null, "wrap", "null", null, null, !0, f);
    m.style.fontWeight = "bold";
    0 < f.length && g.appendChild(m);
    f = this.createCellOption(mxResources.get("formattedText"),
        "html", 0, null, null, null, b.actions.get("formattedText"));
    f.style.fontWeight = "bold";
    g.appendChild(f);
    f = this.createPanel();
    f.style.paddingTop = "10px";
    f.style.paddingBottom = "28px";
    f.style.fontWeight = "normal";
    m = document.createElement("div");
    m.style.position = "absolute";
    m.style.width = "70px";
    m.style.marginTop = "0px";
    m.style.fontWeight = "bold";
    mxUtils.write(m, mxResources.get("spacing"));
    f.appendChild(m);
    var T = this.addUnitInput(f, "pt", 91, 44, function() {
            ca.apply(this, arguments)
        }),
        U = this.addUnitInput(f, "pt", 20, 44,
            function() {
                da.apply(this, arguments)
            });
    mxUtils.br(f);
    this.addLabel(f, mxResources.get("top"), 91);
    this.addLabel(f, mxResources.get("global"), 20);
    mxUtils.br(f);
    mxUtils.br(f);
    var V = this.addUnitInput(f, "pt", 162, 44, function() {
            ea.apply(this, arguments)
        }),
        W = this.addUnitInput(f, "pt", 91, 44, function() {
            fa.apply(this, arguments)
        }),
        X = this.addUnitInput(f, "pt", 20, 44, function() {
            ha.apply(this, arguments)
        });
    mxUtils.br(f);
    this.addLabel(f, mxResources.get("left"), 162);
    this.addLabel(f, mxResources.get("bottom"), 91);
    this.addLabel(f,
        mxResources.get("right"), 20);
    if (e.cellEditor.isContentEditing()) {
        var Q = null,
            aa = null;
        a.appendChild(this.createRelativeOption(mxResources.get("lineheight"), null, null, function(a) {
            var b = "" == a.value ? 120 : parseInt(a.value);
            b = Math.max(0, isNaN(b) ? 120 : b);
            null != Q && (e.cellEditor.restoreSelection(Q), Q = null);
            for (var c = e.getSelectedElement(); null != c && c.nodeType != mxConstants.NODETYPE_ELEMENT;) c = c.parentNode;
            null != c && c == e.cellEditor.textarea && null != e.cellEditor.textarea.firstChild && ("P" != e.cellEditor.textarea.firstChild.nodeName &&
                (e.cellEditor.textarea.innerHTML = "<p>" + e.cellEditor.textarea.innerHTML + "</p>"), c = e.cellEditor.textarea.firstChild);
            null != c && null != e.cellEditor.textarea && c != e.cellEditor.textarea && e.cellEditor.textarea.contains(c) && (c.style.lineHeight = b + "%");
            a.value = b + " %"
        }, function(a) {
            aa = a;
            mxEvent.addListener(a, "mousedown", function() {
                document.activeElement == e.cellEditor.textarea && (Q = e.cellEditor.saveSelection())
            });
            mxEvent.addListener(a, "touchstart", function() {
                document.activeElement == e.cellEditor.textarea && (Q = e.cellEditor.saveSelection())
            });
            a.value = "120 %"
        }));
        g = d.cloneNode(!1);
        g.style.paddingLeft = "0px";
        f = this.editorUi.toolbar.addItems(["link", "image"], g, !0);
        m = [this.editorUi.toolbar.addButton("geSprite-horizontalrule", mxResources.get("insertHorizontalRule"), function() {
            document.execCommand("inserthorizontalrule", !1)
        }, g), this.editorUi.toolbar.addMenuFunctionInContainer(g, "geSprite-table", mxResources.get("table"), !1, mxUtils.bind(this, function(a) {
            this.editorUi.menus.addInsertTableItem(a)
        }))];
        this.styleButtons(f);
        this.styleButtons(m);
        f = this.createPanel();
        f.style.paddingTop = "10px";
        f.style.paddingBottom = "10px";
        f.appendChild(this.createTitle(mxResources.get("insert")));
        f.appendChild(g);
        a.appendChild(f);
        f = d.cloneNode(!1);
        f.style.paddingLeft = "0px";
        m = [this.editorUi.toolbar.addButton("geSprite-insertcolumnbefore", mxResources.get("insertColumnBefore"), mxUtils.bind(this, function() {
            try {
                null != r && e.insertColumn(r, null != z ? z.cellIndex : 0)
            } catch (I) {
                this.editorUi.handleError(I)
            }
        }), f), this.editorUi.toolbar.addButton("geSprite-insertcolumnafter", mxResources.get("insertColumnAfter"),
            mxUtils.bind(this, function() {
                try {
                    null != r && e.insertColumn(r, null != z ? z.cellIndex + 1 : -1)
                } catch (I) {
                    this.editorUi.handleError(I)
                }
            }), f), this.editorUi.toolbar.addButton("geSprite-deletecolumn", mxResources.get("deleteColumn"), mxUtils.bind(this, function() {
            try {
                null != r && null != z && e.deleteColumn(r, z.cellIndex)
            } catch (I) {
                this.editorUi.handleError(I)
            }
        }), f), this.editorUi.toolbar.addButton("geSprite-insertrowbefore", mxResources.get("insertRowBefore"), mxUtils.bind(this, function() {
            try {
                null != r && null != x && e.insertRow(r,
                    x.sectionRowIndex)
            } catch (I) {
                this.editorUi.handleError(I)
            }
        }), f), this.editorUi.toolbar.addButton("geSprite-insertrowafter", mxResources.get("insertRowAfter"), mxUtils.bind(this, function() {
            try {
                null != r && null != x && e.insertRow(r, x.sectionRowIndex + 1)
            } catch (I) {
                this.editorUi.handleError(I)
            }
        }), f), this.editorUi.toolbar.addButton("geSprite-deleterow", mxResources.get("deleteRow"), mxUtils.bind(this, function() {
            try {
                null != r && null != x && e.deleteRow(r, x.sectionRowIndex)
            } catch (I) {
                this.editorUi.handleError(I)
            }
        }), f)];
        this.styleButtons(m);
        m[2].style.marginRight = "9px";
        g = this.createPanel();
        g.style.paddingTop = "10px";
        g.style.paddingBottom = "10px";
        g.appendChild(this.createTitle(mxResources.get("table")));
        g.appendChild(f);
        d = d.cloneNode(!1);
        d.style.paddingLeft = "0px";
        m = [this.editorUi.toolbar.addButton("geSprite-strokecolor", mxResources.get("borderColor"), mxUtils.bind(this, function(a) {
            if (null != r) {
                var b = r.style.borderColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(a, b, c, d) {
                    return "#" + ("0" + Number(b).toString(16)).substr(-2) +
                        ("0" + Number(c).toString(16)).substr(-2) + ("0" + Number(d).toString(16)).substr(-2)
                });
                this.editorUi.pickColor(b, function(b) {
                    var c = null == z || null != a && mxEvent.isShiftDown(a) ? r : z;
                    e.processElements(c, function(a) {
                        a.style.border = null
                    });
                    null == b || b == mxConstants.NONE ? (c.removeAttribute("border"), c.style.border = "", c.style.borderCollapse = "") : (c.setAttribute("border", "1"), c.style.border = "1px solid " + b, c.style.borderCollapse = "collapse")
                })
            }
        }), d), this.editorUi.toolbar.addButton("geSprite-fillcolor", mxResources.get("backgroundColor"),
            mxUtils.bind(this, function(a) {
                if (null != r) {
                    var b = r.style.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(a, b, c, d) {
                        return "#" + ("0" + Number(b).toString(16)).substr(-2) + ("0" + Number(c).toString(16)).substr(-2) + ("0" + Number(d).toString(16)).substr(-2)
                    });
                    this.editorUi.pickColor(b, function(b) {
                        var c = null == z || null != a && mxEvent.isShiftDown(a) ? r : z;
                        e.processElements(c, function(a) {
                            a.style.backgroundColor = null
                        });
                        c.style.backgroundColor = null == b || b == mxConstants.NONE ? "" : b
                    })
                }
            }), d), this.editorUi.toolbar.addButton("geSprite-fit",
            mxResources.get("spacing"),
            function() {
                if (null != r) {
                    var a = r.getAttribute("cellPadding") || 0;
                    a = new FilenameDialog(b, a, mxResources.get("apply"), mxUtils.bind(this, function(a) {
                        null != a && 0 < a.length ? r.setAttribute("cellPadding", a) : r.removeAttribute("cellPadding")
                    }), mxResources.get("spacing"));
                    b.showDialog(a.container, 300, 80, !0, !0);
                    a.init()
                }
            }, d), this.editorUi.toolbar.addButton("geSprite-left", mxResources.get("left"), function() {
            null != r && r.setAttribute("align", "left")
        }, d), this.editorUi.toolbar.addButton("geSprite-center",
            mxResources.get("center"),
            function() {
                null != r && r.setAttribute("align", "center")
            }, d), this.editorUi.toolbar.addButton("geSprite-right", mxResources.get("right"), function() {
            null != r && r.setAttribute("align", "right")
        }, d)];
        this.styleButtons(m);
        m[2].style.marginRight = "9px";
        g.appendChild(d);
        a.appendChild(g);
        var ia = g
    } else a.appendChild(g), a.appendChild(this.createRelativeOption(mxResources.get("opacity"), mxConstants.STYLE_TEXT_OPACITY)), a.appendChild(f);
    var L = mxUtils.bind(this, function(a, b, d) {
        h = this.format.getSelectionState();
        a = mxUtils.getValue(h.style, mxConstants.STYLE_FONTSTYLE, 0);
        c(n[0], (a & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD);
        c(n[1], (a & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC);
        c(n[2], (a & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE);
        l.firstChild.nodeValue = mxUtils.getValue(h.style, mxConstants.STYLE_FONTFAMILY, Menus.prototype.defaultFont);
        c(k, "0" == mxUtils.getValue(h.style, mxConstants.STYLE_HORIZONTAL, "1"));
        if (d || document.activeElement != C) a = parseFloat(mxUtils.getValue(h.style, mxConstants.STYLE_FONTSIZE,
            Menus.prototype.defaultFontSize)), C.value = isNaN(a) ? "" : a + " pt";
        a = mxUtils.getValue(h.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);
        c(u, a == mxConstants.ALIGN_LEFT);
        c(t, a == mxConstants.ALIGN_CENTER);
        c(w, a == mxConstants.ALIGN_RIGHT);
        a = mxUtils.getValue(h.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
        c(y, a == mxConstants.ALIGN_TOP);
        c(v, a == mxConstants.ALIGN_MIDDLE);
        c(G, a == mxConstants.ALIGN_BOTTOM);
        a = mxUtils.getValue(h.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
        b = mxUtils.getValue(h.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
        B.value = a == mxConstants.ALIGN_LEFT && b == mxConstants.ALIGN_TOP ? "topLeft" : a == mxConstants.ALIGN_CENTER && b == mxConstants.ALIGN_TOP ? "top" : a == mxConstants.ALIGN_RIGHT && b == mxConstants.ALIGN_TOP ? "topRight" : a == mxConstants.ALIGN_LEFT && b == mxConstants.ALIGN_BOTTOM ? "bottomLeft" : a == mxConstants.ALIGN_CENTER && b == mxConstants.ALIGN_BOTTOM ? "bottom" : a == mxConstants.ALIGN_RIGHT && b == mxConstants.ALIGN_BOTTOM ? "bottomRight" : a == mxConstants.ALIGN_LEFT ?
            "left" : a == mxConstants.ALIGN_RIGHT ? "right" : "center";
        a = mxUtils.getValue(h.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);
        a == mxConstants.TEXT_DIRECTION_RTL ? H.value = "rightToLeft" : a == mxConstants.TEXT_DIRECTION_LTR ? H.value = "leftToRight" : a == mxConstants.TEXT_DIRECTION_AUTO && (H.value = "automatic");
        if (d || document.activeElement != U) a = parseFloat(mxUtils.getValue(h.style, mxConstants.STYLE_SPACING, 2)), U.value = isNaN(a) ? "" : a + " pt";
        if (d || document.activeElement != T) a = parseFloat(mxUtils.getValue(h.style,
            mxConstants.STYLE_SPACING_TOP, 0)), T.value = isNaN(a) ? "" : a + " pt";
        if (d || document.activeElement != X) a = parseFloat(mxUtils.getValue(h.style, mxConstants.STYLE_SPACING_RIGHT, 0)), X.value = isNaN(a) ? "" : a + " pt";
        if (d || document.activeElement != W) a = parseFloat(mxUtils.getValue(h.style, mxConstants.STYLE_SPACING_BOTTOM, 0)), W.value = isNaN(a) ? "" : a + " pt";
        if (d || document.activeElement != V) a = parseFloat(mxUtils.getValue(h.style, mxConstants.STYLE_SPACING_LEFT, 0)), V.value = isNaN(a) ? "" : a + " pt"
    });
    var da = this.installInputHandler(U, mxConstants.STYLE_SPACING,
        2, -999, 999, " pt");
    var ca = this.installInputHandler(T, mxConstants.STYLE_SPACING_TOP, 0, -999, 999, " pt");
    var ha = this.installInputHandler(X, mxConstants.STYLE_SPACING_RIGHT, 0, -999, 999, " pt");
    var fa = this.installInputHandler(W, mxConstants.STYLE_SPACING_BOTTOM, 0, -999, 999, " pt");
    var ea = this.installInputHandler(V, mxConstants.STYLE_SPACING_LEFT, 0, -999, 999, " pt");
    this.addKeyHandler(C, L);
    this.addKeyHandler(U, L);
    this.addKeyHandler(T, L);
    this.addKeyHandler(X, L);
    this.addKeyHandler(W, L);
    this.addKeyHandler(V, L);
    e.getModel().addListener(mxEvent.CHANGE,
        L);
    this.listeners.push({
        destroy: function() {
            e.getModel().removeListener(L)
        }
    });
    L();
    if (e.cellEditor.isContentEditing()) {
        var ba = !1;
        d = function() {
            ba || (ba = !0, window.setTimeout(function() {
                var a = e.getSelectedEditingElement();
                if (null != a) {
                    var b = function(a, b) {
                            if (null != a && null != b) {
                                if (a == b) return !0;
                                if (a.length > b.length + 1) return a.substring(a.length - b.length - 1, a.length) == "-" + b
                            }
                            return !1
                        },
                        d = function(b) {
                            if (null != e.getParentByName(a, b, e.cellEditor.textarea)) return !0;
                            for (var c = a; null != c && 1 == c.childNodes.length;)
                                if (c =
                                    c.childNodes[0], c.nodeName == b) return !0;
                            return !1
                        },
                        f = function(a) {
                            a = null != a ? a.fontSize : null;
                            return null != a && "px" == a.substring(a.length - 2) ? parseFloat(a) : mxConstants.DEFAULT_FONTSIZE
                        },
                        g = function(a, b, c) {
                            return null != c.style && null != b ? (b = b.lineHeight, null != c.style.lineHeight && "%" == c.style.lineHeight.substring(c.style.lineHeight.length - 1) ? parseInt(c.style.lineHeight) / 100 : "px" == b.substring(b.length - 2) ? parseFloat(b) / a : parseInt(b)) : ""
                        },
                        k = mxUtils.getCurrentStyle(a),
                        m = f(k),
                        p = g(m, k, a),
                        D = a.getElementsByTagName("*");
                    if (0 < D.length && window.getSelection && !mxClient.IS_IE && !mxClient.IS_IE11)
                        for (var q = window.getSelection(), B = 0; B < D.length; B++)
                            if (q.containsNode(D[B], !0)) {
                                temp = mxUtils.getCurrentStyle(D[B]);
                                m = Math.max(f(temp), m);
                                var F = g(m, temp, D[B]);
                                if (F != p || isNaN(F)) p = ""
                            } null != k && (c(n[0], "bold" == k.fontWeight || 400 < k.fontWeight || d("B") || d("STRONG")), c(n[1], "italic" == k.fontStyle || d("I") || d("EM")), c(n[2], d("U")), c(A, d("SUP")), c(E, d("SUB")), e.cellEditor.isTableSelected() ? (c(J, b(k.textAlign, "justify")), c(u, b(k.textAlign, "left")),
                            c(t, b(k.textAlign, "center")), c(w, b(k.textAlign, "right"))) : (d = e.cellEditor.align || mxUtils.getValue(h.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER), b(k.textAlign, "justify") ? (c(J, b(k.textAlign, "justify")), c(u, !1), c(t, !1), c(w, !1)) : (c(J, !1), c(u, d == mxConstants.ALIGN_LEFT), c(t, d == mxConstants.ALIGN_CENTER), c(w, d == mxConstants.ALIGN_RIGHT))), r = e.getParentByName(a, "TABLE", e.cellEditor.textarea), x = null == r ? null : e.getParentByName(a, "TR", r), z = null == r ? null : e.getParentByNames(a, ["TD", "TH"], r), ia.style.display =
                        null != r ? "" : "none", document.activeElement != C && ("FONT" == a.nodeName && "4" == a.getAttribute("size") && null != K ? (a.removeAttribute("size"), a.style.fontSize = K + " pt", K = null) : C.value = isNaN(m) ? "" : m + " pt", F = parseFloat(p), isNaN(F) ? aa.value = "100 %" : aa.value = Math.round(100 * F) + " %"), b = k.color.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(a, b, c, d) {
                            return "#" + ("0" + Number(b).toString(16)).substr(-2) + ("0" + Number(c).toString(16)).substr(-2) + ("0" + Number(d).toString(16)).substr(-2)
                        }), m = k.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
                            function(a, b, c, d) {
                                return "#" + ("0" + Number(b).toString(16)).substr(-2) + ("0" + Number(c).toString(16)).substr(-2) + ("0" + Number(d).toString(16)).substr(-2)
                            }), null != R && (Y = "#" == b.charAt(0) ? b : "#000000", R(Y, !0)), null != N && (P = "#" == m.charAt(0) ? m : null, N(P, !0)), null != l.firstChild && (l.firstChild.nodeValue = Graph.stripQuotes(k.fontFamily)))
                }
                ba = !1
            }, 0))
        };
        (mxClient.IS_FF || mxClient.IS_EDGE || mxClient.IS_IE || mxClient.IS_IE11) && mxEvent.addListener(e.cellEditor.textarea, "DOMSubtreeModified", d);
        mxEvent.addListener(e.cellEditor.textarea,
            "input", d);
        mxEvent.addListener(e.cellEditor.textarea, "touchend", d);
        mxEvent.addListener(e.cellEditor.textarea, "mouseup", d);
        mxEvent.addListener(e.cellEditor.textarea, "keyup", d);
        this.listeners.push({
            destroy: function() {}
        });
        d()
    }
    return a
};
StyleFormatPanel = function(a, c, b) {
    BaseFormatPanel.call(this, a, c, b);
    this.init()
};
mxUtils.extend(StyleFormatPanel, BaseFormatPanel);
StyleFormatPanel.prototype.defaultStrokeColor = "black";
StyleFormatPanel.prototype.init = function() {
    var a = this.format.getSelectionState();
    a.containsLabel || (a.containsImage && 1 == a.vertices.length && "image" == a.style.shape && null != a.style.image && "data:image/svg+xml;" == a.style.image.substring(0, 19) && this.container.appendChild(this.addSvgStyles(this.createPanel())), a.containsImage && "image" != a.style.shape || this.container.appendChild(this.addFill(this.createPanel())), this.container.appendChild(this.addStroke(this.createPanel())), this.container.appendChild(this.addLineJumps(this.createPanel())),
        a = this.createRelativeOption(mxResources.get("opacity"), mxConstants.STYLE_OPACITY, 41), a.style.paddingTop = "8px", a.style.paddingBottom = "8px", this.container.appendChild(a), this.container.appendChild(this.addEffects(this.createPanel())));
    a = this.addEditOps(this.createPanel());
    null != a.firstChild && mxUtils.br(a);
    this.container.appendChild(this.addStyleOps(a))
};
StyleFormatPanel.prototype.getCssRules = function(a) {
    var c = document.implementation.createHTMLDocument(""),
        b = document.createElement("style");
    mxUtils.setTextContent(b, a);
    c.body.appendChild(b);
    return b.sheet.cssRules
};
StyleFormatPanel.prototype.addSvgStyles = function(a) {
    var c = this.format.getSelectionState();
    a.style.paddingTop = "6px";
    a.style.paddingBottom = "6px";
    a.style.fontWeight = "bold";
    a.style.display = "none";
    try {
        var b = c.style.editableCssRules;
        if (null != b) {
            var e = new RegExp(b),
                h = c.style.image.substring(c.style.image.indexOf(",") + 1),
                d = window.atob ? atob(h) : Base64.decode(h, !0),
                g = mxUtils.parseXml(d);
            if (null != g) {
                var f = g.getElementsByTagName("style");
                for (c = 0; c < f.length; c++) {
                    var l = this.getCssRules(mxUtils.getTextContent(f[c]));
                    for (b = 0; b < l.length; b++) this.addSvgRule(a, l[b], g, f[c], l, b, e)
                }
            }
        }
    } catch (n) {}
    return a
};
StyleFormatPanel.prototype.addSvgRule = function(a, c, b, e, h, d, g) {
    var f = this.editorUi.editor.graph;
    g.test(c.selectorText) && (g = mxUtils.bind(this, function(c, g, k) {
        var l = mxUtils.trim(c.style[g]);
        "" != l && "url(" != l.substring(0, 4) && (c = this.createColorOption(k + " " + c.selectorText, function() {
            var a = l;
            return (a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === a.length ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice(-2) + ("0" + parseInt(a[2], 10).toString(16)).slice(-2) + ("0" + parseInt(a[3],
                10).toString(16)).slice(-2) : ""
        }, function(a) {
            h[d].style[g] = a;
            a = "";
            for (var c = 0; c < h.length; c++) a += h[c].cssText + " ";
            e.textContent = a;
            a = mxUtils.getXml(b.documentElement);
            f.setCellStyles(mxConstants.STYLE_IMAGE, "data:image/svg+xml," + (window.btoa ? btoa(a) : Base64.encode(a, !0)), f.getSelectionCells())
        }, "#ffffff", {
            install: function(a) {},
            destroy: function() {}
        }), a.appendChild(c), a.style.display = "")
    }), g(c, "fill", mxResources.get("fill")), g(c, "stroke", mxResources.get("line")), g(c, "stop-color", mxResources.get("gradient")))
};
StyleFormatPanel.prototype.addEditOps = function(a) {
    this.format.getSelectionState();
    var c = null;
    1 == this.editorUi.editor.graph.getSelectionCount() && (c = mxUtils.button(mxResources.get("editStyle"), mxUtils.bind(this, function(a) {
        this.editorUi.actions.get("editStyle").funct()
    })), c.setAttribute("title", mxResources.get("editStyle") + " (" + this.editorUi.actions.get("editStyle").shortcut + ")"), c.style.width = "188px", c.style.marginBottom = "2px", c.className = "btn btn-secondary", a.appendChild(c));
    return a
};
StyleFormatPanel.prototype.addFill = function(a) {
    var c = this.editorUi.editor.graph,
        d = this.format.getSelectionState();
    a.style.paddingTop = "6px";
    a.style.paddingBottom = "6px";
    var b = document.createElement("select");
    b.style.position = "absolute";
    b.style.marginTop = "-2px";
    b.style.right = "72px";
    b.style.width = "70px";
    var f = b.cloneNode(!1);
    mxEvent.addListener(b, "click", function(a) {
        mxEvent.consume(a)
    });
    mxEvent.addListener(f, "click", function(a) {
        mxEvent.consume(a)
    });
    var e = 1 <= d.vertices.length ? c.stylesheet.getDefaultVertexStyle() :
        c.stylesheet.getDefaultEdgeStyle(),
        h = this.createCellColorOption(mxResources.get("gradient"), mxConstants.STYLE_GRADIENTCOLOR, null != e[mxConstants.STYLE_GRADIENTCOLOR] ? e[mxConstants.STYLE_GRADIENTCOLOR] : "#ffffff", function(a) {
            b.style.display = null == a || a == mxConstants.NONE ? "none" : ""
        }, function(a) {
            c.updateCellStyles(mxConstants.STYLE_GRADIENTCOLOR, a, c.getSelectionCells())
        }),
        g = "image" == d.style.shape ? mxConstants.STYLE_IMAGE_BACKGROUND : mxConstants.STYLE_FILLCOLOR,
        k = "image" == d.style.shape ? mxResources.get("background") :
        mxResources.get("fill"),
        e = 1 <= d.vertices.length ? c.stylesheet.getDefaultVertexStyle() : c.stylesheet.getDefaultEdgeStyle(),
        e = this.createCellColorOption(k, g, null != e[g] ? e[g] : "#ffffff", null, mxUtils.bind(this, function(a) {
            c.updateCellStyles(g, a, d.vertices)
        }));
    e.style.fontWeight = "bold";
    k = mxUtils.getValue(d.style, g, null);
    h.style.display = null != k && k != mxConstants.NONE && d.fill && "image" != d.style.shape ? "" : "none";
    for (var l = [mxConstants.DIRECTION_NORTH, mxConstants.DIRECTION_EAST, mxConstants.DIRECTION_SOUTH, mxConstants.DIRECTION_WEST],
            k = 0; k < l.length; k++) {
        var m = document.createElement("option");
        m.setAttribute("value", l[k]);
        mxUtils.write(m, mxResources.get(l[k]));
        b.appendChild(m)
    }
    h.appendChild(b);
    for (k = 0; k < Editor.roughFillStyles.length; k++) l = document.createElement("option"), l.setAttribute("value", Editor.roughFillStyles[k].val), mxUtils.write(l, Editor.roughFillStyles[k].dispName), f.appendChild(l);
    e.appendChild(f);
    var n = mxUtils.bind(this, function() {
        d = this.format.getSelectionState();
        var c = mxUtils.getValue(d.style, mxConstants.STYLE_GRADIENT_DIRECTION,
                mxConstants.DIRECTION_SOUTH),
            e = mxUtils.getValue(d.style, "fillStyle", "auto");
        "" == c && (c = mxConstants.DIRECTION_SOUTH);
        b.value = c;
        f.value = e;
        a.style.display = d.fill ? "" : "none";
        c = mxUtils.getValue(d.style, mxConstants.STYLE_FILLCOLOR, null);
        !d.fill || d.containsImage || null == c || c == mxConstants.NONE || "filledEdge" == d.style.shape ? (f.style.display = "none", h.style.display = "none") : (f.style.display = "1" == d.style.sketch ? "" : "none", h.style.display = "1" != d.style.sketch || "solid" == e || "auto" == e ? "" : "none")
    });
    c.getModel().addListener(mxEvent.CHANGE,
        n);
    this.listeners.push({
        destroy: function() {
            c.getModel().removeListener(n)
        }
    });
    n();
    mxEvent.addListener(b, "change", function(a) {
        c.setCellStyles(mxConstants.STYLE_GRADIENT_DIRECTION, b.value, d.cells);
        mxEvent.consume(a)
    });
    mxEvent.addListener(f, "change", function(a) {
        c.setCellStyles("fillStyle", f.value, d.cells);
        mxEvent.consume(a)
    });
    a.appendChild(e);
    a.appendChild(h);
    e = this.getCustomColors();
    for (k = 0; k < e.length; k++) a.appendChild(this.createCellColorOption(e[k].title, e[k].key, e[k].defaultValue));
    return a
};
StyleFormatPanel.prototype.getCustomColors = function() {
    var a = this.format.getSelectionState(),
        c = [];
    "swimlane" != a.style.shape && "table" != a.style.shape || c.push({
        title: mxResources.get("laneColor"),
        key: "swimlaneFillColor",
        defaultValue: "#ffffff"
    });
    return c
};
StyleFormatPanel.prototype.addStroke = function(a) {
    function c(a) {
        var b = parseInt(q.value);
        b = Math.min(999, Math.max(1, isNaN(b) ? 1 : b));
        b != mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1) && (h.setCellStyles(mxConstants.STYLE_STROKEWIDTH, b, h.getSelectionCells()), e.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_STROKEWIDTH], "values", [b], "cells", h.getSelectionCells())));
        q.value = b + " pt";
        mxEvent.consume(a)
    }

    function b(a) {
        var b = parseInt(y.value);
        b = Math.min(999, Math.max(1, isNaN(b) ? 1 :
            b));
        b != mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1) && (h.setCellStyles(mxConstants.STYLE_STROKEWIDTH, b, h.getSelectionCells()), e.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_STROKEWIDTH], "values", [b], "cells", h.getSelectionCells())));
        y.value = b + " pt";
        mxEvent.consume(a)
    }
    var e = this.editorUi,
        h = e.editor.graph,
        d = this.format.getSelectionState();
    a.style.paddingTop = "4px";
    a.style.paddingBottom = "4px";
    a.style.whiteSpace = "normal";
    var g = document.createElement("div");
    g.style.fontWeight =
        "bold";
    d.stroke || (g.style.display = "none");
    var f = document.createElement("select");
    f.style.position = "absolute";
    f.style.marginTop = "-2px";
    f.style.right = "72px";
    f.style.width = "80px";
    for (var l = ["sharp", "rounded", "curved"], n = 0; n < l.length; n++) {
        var k = document.createElement("option");
        k.setAttribute("value", l[n]);
        mxUtils.write(k, mxResources.get(l[n]));
        f.appendChild(k)
    }
    mxEvent.addListener(f, "change", function(a) {
        h.getModel().beginUpdate();
        try {
            var b = [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
                c = ["0", null];
            "rounded" == f.value ? c = ["1", null] : "curved" == f.value && (c = [null, "1"]);
            for (var d = 0; d < b.length; d++) h.setCellStyles(b[d], c[d], h.getSelectionCells());
            e.fireEvent(new mxEventObject("styleChanged", "keys", b, "values", c, "cells", h.getSelectionCells()))
        } finally {
            h.getModel().endUpdate()
        }
        mxEvent.consume(a)
    });
    mxEvent.addListener(f, "click", function(a) {
        mxEvent.consume(a)
    });
    var m = "image" == d.style.shape ? mxConstants.STYLE_IMAGE_BORDER : mxConstants.STYLE_STROKECOLOR;
    l = "image" == d.style.shape ? mxResources.get("border") : mxResources.get("line");
    n = 1 <= d.vertices.length ? h.stylesheet.getDefaultVertexStyle() : h.stylesheet.getDefaultEdgeStyle();
    l = this.createCellColorOption(l, m, null != n[m] ? n[m] : "#000000", null, mxUtils.bind(this, function(a) {
        h.updateCellStyles(m, a, h.getSelectionCells())
    }));
    l.appendChild(f);
    g.appendChild(l);
    var p = g.cloneNode(!1);
    p.style.fontWeight = "normal";
    p.style.whiteSpace = "nowrap";
    p.style.position = "relative";
    p.style.paddingLeft = "16px";
    p.style.marginBottom = "2px";
    p.style.marginTop = "2px";
    p.className = "geToolbarContainer";
    var u = mxUtils.bind(this,
        function(a, b, c, d, e) {
            a = this.editorUi.menus.styleChange(a, "", d, e, "geIcon", null);
            d = document.createElement("div");
            d.style.width = b + "px";
            d.style.height = "1px";
            d.style.borderBottom = "1px " + c + " " + this.defaultStrokeColor;
            d.style.paddingTop = "6px";
            a.firstChild.firstChild.style.padding = "0px 4px 0px 4px";
            a.firstChild.firstChild.style.width = b + "px";
            a.firstChild.firstChild.appendChild(d);
            return a
        });
    n = this.editorUi.toolbar.addMenuFunctionInContainer(p, "geSprite-orthogonal", mxResources.get("pattern"), !1, mxUtils.bind(this,
        function(a) {
            u(a, 75, "solid", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute("title", mxResources.get("solid"));
            u(a, 75, "dashed", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", null]).setAttribute("title", mxResources.get("dashed"));
            u(a, 75, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 1"]).setAttribute("title", mxResources.get("dotted") + " (1)");
            u(a, 75, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 2"]).setAttribute("title",
                mxResources.get("dotted") + " (2)");
            u(a, 75, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 4"]).setAttribute("title", mxResources.get("dotted") + " (3)")
        }));
    var t = p.cloneNode(!1),
        w = this.editorUi.toolbar.addMenuFunctionInContainer(t, "geSprite-connection", mxResources.get("connection"), !1, mxUtils.bind(this, function(a) {
            this.editorUi.menus.styleChange(a, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], [null, null, null, null], "geIcon geSprite geSprite-connection",
                null, !0).setAttribute("title", mxResources.get("line"));
            this.editorUi.menus.styleChange(a, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["link", null, null, null], "geIcon geSprite geSprite-linkedge", null, !0).setAttribute("title", mxResources.get("link"));
            this.editorUi.menus.styleChange(a, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["flexArrow", null, null, null], "geIcon geSprite geSprite-arrow", null, !0).setAttribute("title",
                mxResources.get("arrow"));
            this.editorUi.menus.styleChange(a, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["arrow", null, null, null], "geIcon geSprite geSprite-simplearrow", null, !0).setAttribute("title", mxResources.get("simpleArrow"))
        }));
    k = this.editorUi.toolbar.addMenuFunctionInContainer(t, "geSprite-orthogonal", mxResources.get("pattern"), !1, mxUtils.bind(this, function(a) {
        u(a, 33, "solid", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute("title",
            mxResources.get("solid"));
        u(a, 33, "dashed", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", null]).setAttribute("title", mxResources.get("dashed"));
        u(a, 33, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 1"]).setAttribute("title", mxResources.get("dotted") + " (1)");
        u(a, 33, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 2"]).setAttribute("title", mxResources.get("dotted") + " (2)");
        u(a, 33, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
            ["1", "1 4"]).setAttribute("title", mxResources.get("dotted") + " (3)")
    }));
    l = p.cloneNode(!1);
    var q = document.createElement("input");
    q.style.textAlign = "right";
    q.style.marginTop = "2px";
    q.style.width = "41px";
    q.setAttribute("title", mxResources.get("linewidth"));
    p.appendChild(q);
    var y = q.cloneNode(!0);
    t.appendChild(y);
    var v = this.createStepper(q, c, 1, 9);
    v.style.display = q.style.display;
    v.style.marginTop = "2px";
    p.appendChild(v);
    var G = this.createStepper(y, b, 1, 9);
    G.style.display = y.style.display;
    G.style.marginTop = "2px";
    t.appendChild(G);
    q.style.position = "absolute";
    q.style.height = "15px";
    q.style.left = "141px";
    v.style.left = "190px";
    y.style.position = "absolute";
    y.style.left = "141px";
    y.style.height = "15px";
    G.style.left = "190px";
    mxEvent.addListener(q, "blur", c);
    mxEvent.addListener(q, "change", c);
    mxEvent.addListener(y, "blur", b);
    mxEvent.addListener(y, "change", b);
    var E = this.editorUi.toolbar.addMenuFunctionInContainer(l, "geSprite-orthogonal", mxResources.get("waypoints"), !1, mxUtils.bind(this, function(a) {
            "arrow" != d.style.shape && (this.editorUi.menus.edgeStyleChange(a,
                "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null], "geIcon geSprite geSprite-straight", null, !0).setAttribute("title", mxResources.get("straight")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["orthogonalEdgeStyle", null, null], "geIcon geSprite geSprite-orthogonal", null, !0).setAttribute("title", mxResources.get("orthogonal")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE,
                mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE
            ], ["elbowEdgeStyle", null, null, null], "geIcon geSprite geSprite-horizontalelbow", null, !0).setAttribute("title", mxResources.get("simple")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["elbowEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalelbow", null, !0).setAttribute("title", mxResources.get("simple")), this.editorUi.menus.edgeStyleChange(a,
                "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle", null, null, null], "geIcon geSprite geSprite-horizontalisometric", null, !0).setAttribute("title", mxResources.get("isometric")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalisometric", null, !0).setAttribute("title",
                mxResources.get("isometric")), "connector" == d.style.shape && this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["orthogonalEdgeStyle", "1", null], "geIcon geSprite geSprite-curved", null, !0).setAttribute("title", mxResources.get("curved")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["entityRelationEdgeStyle", null, null], "geIcon geSprite geSprite-entity", null,
                !0).setAttribute("title", mxResources.get("entityRelation")))
        })),
        A = this.editorUi.toolbar.addMenuFunctionInContainer(l, "geSprite-startclassic", mxResources.get("linestart"), !1, mxUtils.bind(this, function(a) {
            if ("connector" == d.style.shape || "flexArrow" == d.style.shape || "filledEdge" == d.style.shape) {
                var b = this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.NONE, 0], "geIcon", null, !1);
                b.setAttribute("title", mxResources.get("none"));
                b.firstChild.firstChild.innerHTML =
                    '<font style="font-size:10px;">' + mxUtils.htmlEntities(mxResources.get("none")) + "</font>";
                "connector" == d.style.shape || "filledEdge" == d.style.shape ? (this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC, 1], "geIcon geSprite geSprite-startclassic", null, !1).setAttribute("title", mxResources.get("classic")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC_THIN, 1], "geIcon geSprite geSprite-startclassicthin",
                    null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OPEN, 0], "geIcon geSprite geSprite-startopen", null, !1).setAttribute("title", mxResources.get("openArrow")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OPEN_THIN, 0], "geIcon geSprite geSprite-startopenthin", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["openAsync", 0], "geIcon geSprite geSprite-startopenasync",
                    null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK, 1], "geIcon geSprite geSprite-startblock", null, !1).setAttribute("title", mxResources.get("block")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK_THIN, 1], "geIcon geSprite geSprite-startblockthin", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["async", 1], "geIcon geSprite geSprite-startasync",
                    null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OVAL, 1], "geIcon geSprite geSprite-startoval", null, !1).setAttribute("title", mxResources.get("oval")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_DIAMOND, 1], "geIcon geSprite geSprite-startdiamond", null, !1).setAttribute("title", mxResources.get("diamond")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"],
                    [mxConstants.ARROW_DIAMOND_THIN, 1], "geIcon geSprite geSprite-startthindiamond", null, !1).setAttribute("title", mxResources.get("diamondThin")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC, 0], "geIcon geSprite geSprite-startclassictrans", null, !1).setAttribute("title", mxResources.get("classic")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC_THIN, 0], "geIcon geSprite geSprite-startclassicthintrans",
                    null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK, 0], "geIcon geSprite geSprite-startblocktrans", null, !1).setAttribute("title", mxResources.get("block")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK_THIN, 0], "geIcon geSprite geSprite-startblockthintrans", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["async", 0], "geIcon geSprite geSprite-startasynctrans",
                    null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OVAL, 0], "geIcon geSprite geSprite-startovaltrans", null, !1).setAttribute("title", mxResources.get("oval")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_DIAMOND, 0], "geIcon geSprite geSprite-startdiamondtrans", null, !1).setAttribute("title", mxResources.get("diamond")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW,
                    "startFill"
                ], [mxConstants.ARROW_DIAMOND_THIN, 0], "geIcon geSprite geSprite-startthindiamondtrans", null, !1).setAttribute("title", mxResources.get("diamondThin")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["box", 0], "geIcon geSprite geSvgSprite geSprite-box", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["halfCircle", 0], "geIcon geSprite geSvgSprite geSprite-halfCircle", null, !1), this.editorUi.menus.edgeStyleChange(a,
                    "", [mxConstants.STYLE_STARTARROW, "startFill"], ["dash", 0], "geIcon geSprite geSprite-startdash", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["cross", 0], "geIcon geSprite geSprite-startcross", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["circlePlus", 0], "geIcon geSprite geSprite-startcircleplus", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["circle", 1], "geIcon geSprite geSprite-startcircle",
                    null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERone", 0], "geIcon geSprite geSprite-starterone", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERmandOne", 0], "geIcon geSprite geSprite-starteronetoone", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERmany", 0], "geIcon geSprite geSprite-startermany", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW,
                    "startFill"
                ], ["ERoneToMany", 0], "geIcon geSprite geSprite-starteronetomany", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERzeroToOne", 1], "geIcon geSprite geSprite-starteroneopt", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERzeroToMany", 1], "geIcon geSprite geSprite-startermanyopt", null, !1)) : this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_STARTARROW], [mxConstants.ARROW_BLOCK], "geIcon geSprite geSprite-startblocktrans",
                    null, !1).setAttribute("title", mxResources.get("block"))
            }
        })),
        r = this.editorUi.toolbar.addMenuFunctionInContainer(l, "geSprite-endclassic", mxResources.get("lineend"), !1, mxUtils.bind(this, function(a) {
            if ("connector" == d.style.shape || "flexArrow" == d.style.shape || "filledEdge" == d.style.shape) {
                var b = this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.NONE, 0], "geIcon", null, !1);
                b.setAttribute("title", mxResources.get("none"));
                b.firstChild.firstChild.innerHTML = '<font style="font-size:10px;">' +
                    mxUtils.htmlEntities(mxResources.get("none")) + "</font>";
                "connector" == d.style.shape || "filledEdge" == d.style.shape ? (this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC, 1], "geIcon geSprite geSprite-endclassic", null, !1).setAttribute("title", mxResources.get("classic")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC_THIN, 1], "geIcon geSprite geSprite-endclassicthin", null, !1), this.editorUi.menus.edgeStyleChange(a,
                        "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_OPEN, 0], "geIcon geSprite geSprite-endopen", null, !1).setAttribute("title", mxResources.get("openArrow")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_OPEN_THIN, 0], "geIcon geSprite geSprite-endopenthin", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["openAsync", 0], "geIcon geSprite geSprite-endopenasync", null, !1), this.editorUi.menus.edgeStyleChange(a,
                        "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_BLOCK, 1], "geIcon geSprite geSprite-endblock", null, !1).setAttribute("title", mxResources.get("block")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_BLOCK_THIN, 1], "geIcon geSprite geSprite-endblockthin", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["async", 1], "geIcon geSprite geSprite-endasync", null, !1), this.editorUi.menus.edgeStyleChange(a, "",
                        [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_OVAL, 1], "geIcon geSprite geSprite-endoval", null, !1).setAttribute("title", mxResources.get("oval")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND, 1], "geIcon geSprite geSprite-enddiamond", null, !1).setAttribute("title", mxResources.get("diamond")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND_THIN, 1], "geIcon geSprite geSprite-endthindiamond",
                        null, !1).setAttribute("title", mxResources.get("diamondThin")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC, 0], "geIcon geSprite geSprite-endclassictrans", null, !1).setAttribute("title", mxResources.get("classic")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC_THIN, 0], "geIcon geSprite geSprite-endclassicthintrans", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW,
                        "endFill"
                    ], [mxConstants.ARROW_BLOCK, 0], "geIcon geSprite geSprite-endblocktrans", null, !1).setAttribute("title", mxResources.get("block")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_BLOCK_THIN, 0], "geIcon geSprite geSprite-endblockthintrans", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["async", 0], "geIcon geSprite geSprite-endasynctrans", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW,
                        "endFill"
                    ], [mxConstants.ARROW_OVAL, 0], "geIcon geSprite geSprite-endovaltrans", null, !1).setAttribute("title", mxResources.get("oval")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND, 0], "geIcon geSprite geSprite-enddiamondtrans", null, !1).setAttribute("title", mxResources.get("diamond")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND_THIN, 0], "geIcon geSprite geSprite-endthindiamondtrans",
                        null, !1).setAttribute("title", mxResources.get("diamondThin")), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["box", 0], "geIcon geSprite geSvgSprite geFlipSprite geSprite-box", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["halfCircle", 0], "geIcon geSprite geSvgSprite geFlipSprite geSprite-halfCircle", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["dash", 0], "geIcon geSprite geSprite-enddash",
                        null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["cross", 0], "geIcon geSprite geSprite-endcross", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["circlePlus", 0], "geIcon geSprite geSprite-endcircleplus", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["circle", 1], "geIcon geSprite geSprite-endcircle", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW,
                        "endFill"
                    ], ["ERone", 0], "geIcon geSprite geSprite-enderone", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERmandOne", 0], "geIcon geSprite geSprite-enderonetoone", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERmany", 0], "geIcon geSprite geSprite-endermany", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERoneToMany", 0], "geIcon geSprite geSprite-enderonetomany", null, !1),
                    this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERzeroToOne", 1], "geIcon geSprite geSprite-enderoneopt", null, !1), this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERzeroToMany", 1], "geIcon geSprite geSprite-endermanyopt", null, !1)) : this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_ENDARROW], [mxConstants.ARROW_BLOCK], "geIcon geSprite geSprite-endblocktrans", null, !1).setAttribute("title", mxResources.get("block"))
            }
        }));
    this.addArrow(w,
        8);
    this.addArrow(E);
    this.addArrow(A);
    this.addArrow(r);
    v = this.addArrow(n, 9);
    v.className = "geIcon";
    v.style.width = "auto";
    G = this.addArrow(k, 9);
    G.className = "geIcon";
    G.style.width = "22px";
    var z = document.createElement("div");
    z.style.width = "85px";
    z.style.height = "1px";
    z.style.borderBottom = "1px solid " + this.defaultStrokeColor;
    z.style.marginBottom = "9px";
    v.appendChild(z);
    var x = document.createElement("div");
    x.style.width = "23px";
    x.style.height = "1px";
    x.style.borderBottom = "1px solid " + this.defaultStrokeColor;
    x.style.marginBottom =
        "9px";
    G.appendChild(x);
    n.style.height = "15px";
    k.style.height = "15px";
    w.style.height = "15px";
    E.style.height = "17px";
    A.style.marginLeft = "3px";
    A.style.height = "17px";
    r.style.marginLeft = "3px";
    r.style.height = "17px";
    a.appendChild(g);
    a.appendChild(t);
    a.appendChild(p);
    n = p.cloneNode(!1);
    n.style.paddingBottom = "6px";
    n.style.paddingTop = "4px";
    n.style.fontWeight = "normal";
    k = document.createElement("div");
    k.style.position = "absolute";
    k.style.marginLeft = "3px";
    k.style.marginBottom = "12px";
    k.style.marginTop = "2px";
    k.style.fontWeight =
        "normal";
    k.style.width = "76px";
    mxUtils.write(k, mxResources.get("lineend"));
    n.appendChild(k);
    var J = this.addUnitInput(n, "pt", 74, 33, function() {
            N.apply(this, arguments)
        }),
        B = this.addUnitInput(n, "pt", 20, 33, function() {
            K.apply(this, arguments)
        });
    mxUtils.br(n);
    v = document.createElement("div");
    v.style.height = "8px";
    n.appendChild(v);
    k = k.cloneNode(!1);
    mxUtils.write(k, mxResources.get("linestart"));
    n.appendChild(k);
    var M = this.addUnitInput(n, "pt", 74, 33, function() {
            C.apply(this, arguments)
        }),
        D = this.addUnitInput(n, "pt",
            20, 33,
            function() {
                O.apply(this, arguments)
            });
    mxUtils.br(n);
    this.addLabel(n, mxResources.get("spacing"), 74, 50);
    this.addLabel(n, mxResources.get("size"), 20, 50);
    mxUtils.br(n);
    g = g.cloneNode(!1);
    g.style.fontWeight = "normal";
    g.style.position = "relative";
    g.style.paddingLeft = "16px";
    g.style.marginBottom = "2px";
    g.style.marginTop = "6px";
    g.style.borderWidth = "0px";
    g.style.paddingBottom = "18px";
    k = document.createElement("div");
    k.style.position = "absolute";
    k.style.marginLeft = "3px";
    k.style.marginBottom = "12px";
    k.style.marginTop =
        "1px";
    k.style.fontWeight = "normal";
    k.style.width = "120px";
    mxUtils.write(k, mxResources.get("perimeter"));
    g.appendChild(k);
    var H = this.addUnitInput(g, "pt", 20, 41, function() {
        P.apply(this, arguments)
    });
    d.edges.length == h.getSelectionCount() ? (a.appendChild(l), a.appendChild(n)) : d.vertices.length == h.getSelectionCount() && a.appendChild(g);
    var F = mxUtils.bind(this, function(a, b, c) {
        function g(a, b, c, f) {
            c = c.getElementsByTagName("div")[0];
            null != c && (c.className = e.getCssClassForMarker(f, d.style.shape, a, b), "geSprite geSprite-noarrow" ==
                c.className && (c.innerHTML = mxUtils.htmlEntities(mxResources.get("none")), c.style.backgroundImage = "none", c.style.verticalAlign = "top", c.style.marginTop = "5px", c.style.fontSize = "10px", c.style.filter = "none", c.style.color = this.defaultStrokeColor, c.nextSibling.style.marginTop = "0px"));
            return c
        }
        d = this.format.getSelectionState();
        mxUtils.getValue(d.style, m, null);
        if (c || document.activeElement != q) a = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1)), q.value = isNaN(a) ? "" : a + " pt";
        if (c || document.activeElement !=
            y) a = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_STROKEWIDTH, 1)), y.value = isNaN(a) ? "" : a + " pt";
        f.style.visibility = "connector" == d.style.shape || "filledEdge" == d.style.shape ? "" : "hidden";
        "1" == mxUtils.getValue(d.style, mxConstants.STYLE_CURVED, null) ? f.value = "curved" : "1" == mxUtils.getValue(d.style, mxConstants.STYLE_ROUNDED, null) && (f.value = "rounded");
        "1" == mxUtils.getValue(d.style, mxConstants.STYLE_DASHED, null) ? null == mxUtils.getValue(d.style, mxConstants.STYLE_DASH_PATTERN, null) ? z.style.borderBottom = "1px dashed " +
            this.defaultStrokeColor : z.style.borderBottom = "1px dotted " + this.defaultStrokeColor : z.style.borderBottom = "1px solid " + this.defaultStrokeColor;
        x.style.borderBottom = z.style.borderBottom;
        a = E.getElementsByTagName("div")[0];
        null != a && (b = mxUtils.getValue(d.style, mxConstants.STYLE_EDGE, null), "1" == mxUtils.getValue(d.style, mxConstants.STYLE_NOEDGESTYLE, null) && (b = null), "orthogonalEdgeStyle" == b && "1" == mxUtils.getValue(d.style, mxConstants.STYLE_CURVED, null) ? a.className = "geSprite geSprite-curved" : a.className = "straight" ==
            b || "none" == b || null == b ? "geSprite geSprite-straight" : "entityRelationEdgeStyle" == b ? "geSprite geSprite-entity" : "elbowEdgeStyle" == b ? "geSprite " + ("vertical" == mxUtils.getValue(d.style, mxConstants.STYLE_ELBOW, null) ? "geSprite-verticalelbow" : "geSprite-horizontalelbow") : "isometricEdgeStyle" == b ? "geSprite " + ("vertical" == mxUtils.getValue(d.style, mxConstants.STYLE_ELBOW, null) ? "geSprite-verticalisometric" : "geSprite-horizontalisometric") : "geSprite geSprite-orthogonal");
        a = w.getElementsByTagName("div")[0];
        null != a &&
            (a.className = "link" == d.style.shape ? "geSprite geSprite-linkedge" : "flexArrow" == d.style.shape ? "geSprite geSprite-arrow" : "arrow" == d.style.shape ? "geSprite geSprite-simplearrow" : "geSprite geSprite-connection");
        d.edges.length == h.getSelectionCount() ? (t.style.display = "", p.style.display = "none") : (t.style.display = "none", p.style.display = "");
        a = g(mxUtils.getValue(d.style, mxConstants.STYLE_STARTARROW, null), mxUtils.getValue(d.style, "startFill", "1"), A, "start");
        b = g(mxUtils.getValue(d.style, mxConstants.STYLE_ENDARROW,
            null), mxUtils.getValue(d.style, "endFill", "1"), r, "end");
        null != a && null != b && ("arrow" == d.style.shape ? (a.className = "geSprite geSprite-noarrow", b.className = "geSprite geSprite-endblocktrans") : "link" == d.style.shape && (a.className = "geSprite geSprite-noarrow", b.className = "geSprite geSprite-noarrow"));
        mxUtils.setOpacity(E, "arrow" == d.style.shape ? 30 : 100);
        "connector" != d.style.shape && "flexArrow" != d.style.shape && "filledEdge" != d.style.shape ? (mxUtils.setOpacity(A, 30), mxUtils.setOpacity(r, 30)) : (mxUtils.setOpacity(A,
            100), mxUtils.setOpacity(r, 100));
        if (c || document.activeElement != D) a = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE)), D.value = isNaN(a) ? "" : a + " pt";
        if (c || document.activeElement != M) a = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0)), M.value = isNaN(a) ? "" : a + " pt";
        if (c || document.activeElement != B) a = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE)), B.value = isNaN(a) ? "" : a + " pt";
        if (c || document.activeElement !=
            M) a = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0)), J.value = isNaN(a) ? "" : a + " pt";
        if (c || document.activeElement != H) a = parseInt(mxUtils.getValue(d.style, mxConstants.STYLE_PERIMETER_SPACING, 0)), H.value = isNaN(a) ? "" : a + " pt"
    });
    var O = this.installInputHandler(D, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, " pt");
    var C = this.installInputHandler(M, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0, -999, 999, " pt");
    var K = this.installInputHandler(B, mxConstants.STYLE_ENDSIZE,
        mxConstants.DEFAULT_MARKERSIZE, 0, 999, " pt");
    var N = this.installInputHandler(J, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0, -999, 999, " pt");
    var P = this.installInputHandler(H, mxConstants.STYLE_PERIMETER_SPACING, 0, 0, 999, " pt");
    this.addKeyHandler(q, F);
    this.addKeyHandler(D, F);
    this.addKeyHandler(M, F);
    this.addKeyHandler(B, F);
    this.addKeyHandler(J, F);
    this.addKeyHandler(H, F);
    h.getModel().addListener(mxEvent.CHANGE, F);
    this.listeners.push({
        destroy: function() {
            h.getModel().removeListener(F)
        }
    });
    F();
    return a
};
StyleFormatPanel.prototype.addLineJumps = function(a) {
    var c = this.format.getSelectionState();
    if (Graph.lineJumpsEnabled && 0 < c.edges.length && 0 == c.vertices.length && c.lineJumps) {
        a.style.padding = "8px 0px 24px 18px";
        var b = this.editorUi,
            e = b.editor.graph,
            h = document.createElement("div");
        h.style.position = "absolute";
        h.style.fontWeight = "bold";
        h.style.width = "80px";
        mxUtils.write(h, mxResources.get("lineJumps"));
        a.appendChild(h);
        var d = document.createElement("select");
        d.style.position = "absolute";
        d.style.marginTop = "-2px";
        d.style.right = "76px";
        d.style.width = "62px";
        h = ["none", "arc", "gap", "sharp"];
        for (var g = 0; g < h.length; g++) {
            var f = document.createElement("option");
            f.setAttribute("value", h[g]);
            mxUtils.write(f, mxResources.get(h[g]));
            d.appendChild(f)
        }
        mxEvent.addListener(d, "change", function(a) {
            e.getModel().beginUpdate();
            try {
                e.setCellStyles("jumpStyle", d.value, e.getSelectionCells()), b.fireEvent(new mxEventObject("styleChanged", "keys", ["jumpStyle"], "values", [d.value], "cells", e.getSelectionCells()))
            } finally {
                e.getModel().endUpdate()
            }
            mxEvent.consume(a)
        });
        mxEvent.addListener(d, "click", function(a) {
            mxEvent.consume(a)
        });
        a.appendChild(d);
        var l = this.addUnitInput(a, "pt", 22, 33, function() {
            n.apply(this, arguments)
        });
        var n = this.installInputHandler(l, "jumpSize", Graph.defaultJumpSize, 0, 999, " pt");
        var k = mxUtils.bind(this, function(a, b, e) {
            c = this.format.getSelectionState();
            d.value = mxUtils.getValue(c.style, "jumpStyle", "none");
            if (e || document.activeElement != l) a = parseInt(mxUtils.getValue(c.style, "jumpSize", Graph.defaultJumpSize)), l.value = isNaN(a) ? "" : a + " pt"
        });
        this.addKeyHandler(l,
            k);
        e.getModel().addListener(mxEvent.CHANGE, k);
        this.listeners.push({
            destroy: function() {
                e.getModel().removeListener(k)
            }
        });
        k()
    } else a.style.display = "none";
    return a
};
StyleFormatPanel.prototype.addEffects = function(a) {
    var c = this.editorUi.editor.graph,
        b = this.format.getSelectionState();
    a.style.paddingTop = "0px";
    a.style.paddingBottom = "2px";
    var e = document.createElement("table");
    e.style.width = "100%";
    e.style.fontWeight = "bold";
    e.style.paddingRight = "20px";
    var h = document.createElement("tbody"),
        d = document.createElement("tr");
    d.style.padding = "0px";
    var g = document.createElement("td");
    g.style.padding = "0px";
    g.style.width = "50%";
    g.setAttribute("valign", "top");
    var f = g.cloneNode(!0);
    f.style.paddingLeft = "8px";
    d.appendChild(g);
    d.appendChild(f);
    h.appendChild(d);
    e.appendChild(h);
    a.appendChild(e);
    var l = g,
        n = 0,
        k = mxUtils.bind(this, function(a, b, c) {
            a = this.createCellOption(a, b, c);
            a.style.width = "100%";
            l.appendChild(a);
            l = l == g ? f : g;
            n++
        }),
        m = mxUtils.bind(this, function(a, c, d) {
            b = this.format.getSelectionState();
            g.innerHTML = "";
            f.innerHTML = "";
            l = g;
            b.rounded && k(mxResources.get("rounded"), mxConstants.STYLE_ROUNDED, 0);
            "swimlane" == b.style.shape && k(mxResources.get("divider"), "swimlaneLine", 1);
            b.containsImage ||
                k(mxResources.get("shadow"), mxConstants.STYLE_SHADOW, 0);
            b.glass && k(mxResources.get("glass"), mxConstants.STYLE_GLASS, 0);
            b.comic && k(mxResources.get("comic"), "comic", 0);
            k(mxResources.get("sketch"), "sketch", 0)
        });
    c.getModel().addListener(mxEvent.CHANGE, m);
    this.listeners.push({
        destroy: function() {
            c.getModel().removeListener(m)
        }
    });
    m();
    return a
};
StyleFormatPanel.prototype.addStyleOps = function(a) {
    a.style.paddingTop = "10px";
    a.style.paddingBottom = "10px";
    var c = mxUtils.button(mxResources.get("setAsDefaultStyle"), mxUtils.bind(this, function(a) {
        this.editorUi.actions.get("setAsDefaultStyle").funct()
    }));
    c.setAttribute("title", mxResources.get("setAsDefaultStyle") + " (" + this.editorUi.actions.get("setAsDefaultStyle").shortcut + ")");
    c.style.width = "188px";
    c.className = "btn btn-secondary";
    a.appendChild(c);
    return a
};
DiagramStylePanel = function(a, c, b) {
    BaseFormatPanel.call(this, a, c, b);
    this.init()
};
mxUtils.extend(DiagramStylePanel, BaseFormatPanel);
DiagramStylePanel.prototype.init = function() {
    this.container.appendChild(this.addView(this.createPanel()))
};
DiagramStylePanel.prototype.addView = function(a) {
    var c = this.editorUi,
        b = c.editor.graph,
        e = b.getModel();
    a.style.whiteSpace = "normal";
    var h = "1" == b.currentVertexStyle.sketch && "1" == b.currentEdgeStyle.sketch,
        d = "1" == b.currentVertexStyle.rounded,
        g = "1" == b.currentEdgeStyle.curved,
        f = document.createElement("div");
    f.style.paddingBottom = "12px";
    f.style.marginRight = "16px";
    a.style.paddingTop = "8px";
    var l = document.createElement("table");
    l.style.width = "100%";
    l.style.fontWeight = "bold";
    var n = document.createElement("tbody"),
        k = document.createElement("tr");
    k.style.padding = "0px";
    var m = document.createElement("td");
    m.style.padding = "0px";
    m.style.width = "50%";
    m.setAttribute("valign", "middle");
    var p = m.cloneNode(!0);
    p.style.paddingLeft = "8px";
    k.appendChild(m);
    k.appendChild(p);
    n.appendChild(k);
    l.appendChild(n);
    m.appendChild(this.createOption(mxResources.get("sketch"), function() {
        return h
    }, function(a) {
        (h = a) ? (b.currentEdgeStyle.sketch = "1", b.currentVertexStyle.sketch = "1") : (delete b.currentEdgeStyle.sketch, delete b.currentVertexStyle.sketch);
        b.updateCellStyles("sketch", a ? "1" : null, b.getVerticesAndEdges())
    }, null, function(a) {
        a.style.width = "auto"
    }));
    p.appendChild(this.createOption(mxResources.get("rounded"), function() {
        return d
    }, function(a) {
        (d = a) ? b.currentVertexStyle.rounded = "1": delete b.currentVertexStyle.rounded;
        b.updateCellStyles("rounded", a ? "1" : null, b.getVerticesAndEdges(!0, !0))
    }, null, function(a) {
        a.style.width = "auto"
    }));
    m = m.cloneNode(!1);
    p = p.cloneNode(!1);
    k = k.cloneNode(!1);
    k.appendChild(m);
    k.appendChild(p);
    n.appendChild(k);
    m.appendChild(this.createOption(mxResources.get("curved"),
        function() {
            return g
        },
        function(a) {
            (g = a) ? b.currentEdgeStyle.curved = "1": delete b.currentEdgeStyle.curved;
            b.updateCellStyles("curved", a ? "1" : null, b.getVerticesAndEdges(!1, !0))
        }, null,
        function(a) {
            a.style.width = "auto"
        }));
    f.appendChild(l);
    a.appendChild(f);
    var u = ["fillColor", "strokeColor", "fontColor", "gradientColor"],
        t = mxUtils.bind(this, function(a, c) {
            var d = b.getVerticesAndEdges();
            e.beginUpdate();
            try {
                for (var f = 0; f < d.length; f++) {
                    var g = b.getCellStyle(d[f]);
                    null != g.labelBackgroundColor && b.updateCellStyles("labelBackgroundColor",
                        null != c ? c.background : null, [d[f]]);
                    for (var h = e.isEdge(d[f]), l = e.getStyle(d[f]), k = h ? b.currentEdgeStyle : b.currentVertexStyle, m = 0; m < a.length; m++)
                        if (null != g[a[m]] && g[a[m]] != mxConstants.NONE || a[m] != mxConstants.STYLE_FILLCOLOR && a[m] != mxConstants.STYLE_STROKECOLOR) l = mxUtils.setStyle(l, a[m], k[a[m]]);
                    e.setStyle(d[f], l)
                }
            } finally {
                e.endUpdate()
            }
        }),
        w = mxUtils.bind(this, function(a, b, c) {
            if (null != a)
                for (var d = 0; d < b.length; d++)
                    if (null != a[b[d]] && a[b[d]] != mxConstants.NONE || b[d] != mxConstants.STYLE_FILLCOLOR && b[d] != mxConstants.STYLE_STROKECOLOR) a[b[d]] =
                        c[b[d]]
        }),
        q = mxUtils.bind(this, function(a, c, d, e, f) {
            if (null != a) {
                null != d && null != c.labelBackgroundColor && (e = null != e ? e.background : null, f = null != f ? f : b, null == e && (e = f.background), null == e && (e = f.defaultPageBackgroundColor), c.labelBackgroundColor = e);
                for (var g in a)
                    if (null == d || null != c[g] && c[g] != mxConstants.NONE || g != mxConstants.STYLE_FILLCOLOR && g != mxConstants.STYLE_STROKECOLOR) c[g] = a[g]
            }
        });
    m = mxUtils.button(mxResources.get("reset"), mxUtils.bind(this, function(a) {
        a = b.getVerticesAndEdges(!0, !0);
        if (0 < a.length) {
            e.beginUpdate();
            try {
                b.updateCellStyles("sketch", null, a), b.updateCellStyles("rounded", null, a), b.updateCellStyles("curved", null, b.getVerticesAndEdges(!1, !0))
            } finally {
                e.endUpdate()
            }
        }
        b.defaultVertexStyle = mxUtils.clone(c.initialDefaultVertexStyle);
        b.defaultEdgeStyle = mxUtils.clone(c.initialDefaultEdgeStyle);
        c.clearDefaultStyle()
    }));
    m.setAttribute("title", mxResources.get("reset"));
    m.style.textOverflow = "ellipsis";
    m.style.maxWidth = "90px";
    p.appendChild(m);
    var y = mxUtils.bind(this, function(a, c, d, f, g) {
            var h = document.createElement("div");
            h.style.cssText = "position:absolute;display:inline-block;width:100%;height:100%;overflow:hidden;pointer-events:none;";
            g.appendChild(h);
            var l = new Graph(h, null, null, b.getStylesheet());
            l.resetViewOnRootChange = !1;
            l.foldingEnabled = !1;
            l.gridEnabled = !1;
            l.autoScroll = !1;
            l.setTooltips(!1);
            l.setConnectable(!1);
            l.setPanning(!1);
            l.setEnabled(!1);
            l.getCellStyle = function(g) {
                var h = mxUtils.clone(Graph.prototype.getCellStyle.apply(this, arguments)),
                    k = b.stylesheet.getDefaultVertexStyle(),
                    m = c;
                e.isEdge(g) && (k = b.stylesheet.getDefaultEdgeStyle(),
                    m = d);
                w(h, u, k);
                q(a, h, g, f, l);
                q(m, h, g, f, l);
                return h
            };
            l.model.beginUpdate();
            try {
                var k = l.insertVertex(l.getDefaultParent(), null, "Shape", 14, 8, 70, 40, "strokeWidth=2;"),
                    m = l.insertEdge(l.getDefaultParent(), null, "Connector", k, k, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;endSize=5;strokeWidth=2;");
                m.geometry.points = [new mxPoint(32, 70)];
                m.geometry.offset = new mxPoint(0, 8)
            } finally {
                l.model.endUpdate()
            }
        }),
        v = document.createElement("div");
    v.style.position = "relative";
    a.appendChild(v);
    null ==
        this.format.cachedStyleEntries && (this.format.cachedStyleEntries = []);
    var G = mxUtils.bind(this, function(a, f, l, k, m) {
            var n = this.format.cachedStyleEntries[m];
            null == n && (n = document.createElement("div"), n.style.cssText = "display:inline-block;position:relative;width:96px;height:90px;cursor:pointer;border:1px solid gray;margin:2px;overflow:hidden;", null != k && null != k.background && (n.style.backgroundColor = k.background), y(a, f, l, k, n), mxEvent.addGestureListeners(n, mxUtils.bind(this, function(a) {
                    n.style.opacity = .5
                }),
                null, mxUtils.bind(this, function(m) {
                    n.style.opacity = 1;
                    b.defaultVertexStyle = mxUtils.clone(c.initialDefaultVertexStyle);
                    b.defaultEdgeStyle = mxUtils.clone(c.initialDefaultEdgeStyle);
                    q(a, b.defaultVertexStyle);
                    q(a, b.defaultEdgeStyle);
                    q(f, b.defaultVertexStyle);
                    q(l, b.defaultEdgeStyle);
                    c.clearDefaultStyle();
                    h ? (b.currentEdgeStyle.sketch = "1", b.currentVertexStyle.sketch = "1") : (b.currentEdgeStyle.sketch = "0", b.currentVertexStyle.sketch = "0");
                    b.currentVertexStyle.rounded = d ? "1" : "0";
                    b.currentEdgeStyle.rounded = "1";
                    b.currentEdgeStyle.curved =
                        g ? "1" : "0";
                    e.beginUpdate();
                    try {
                        t(u, k);
                        var p = new ChangePageSetup(c, null != k ? k.background : null);
                        p.ignoreImage = !0;
                        e.execute(p);
                        e.execute(new ChangeGridColor(c, null != k && null != k.gridColor ? k.gridColor : b.view.defaultGridColor))
                    } finally {
                        e.endUpdate()
                    }
                })), mxEvent.addListener(n, "mouseenter", mxUtils.bind(this, function(c) {
                var d = b.getCellStyle;
                c = b.background;
                var g = b.view.gridColor;
                b.background = null != k ? k.background : null;
                b.view.gridColor = null != k && null != k.gridColor ? k.gridColor : b.view.defaultGridColor;
                b.getCellStyle =
                    function(c) {
                        var g = mxUtils.clone(d.apply(this, arguments)),
                            h = b.stylesheet.getDefaultVertexStyle(),
                            m = f;
                        e.isEdge(c) && (h = b.stylesheet.getDefaultEdgeStyle(), m = l);
                        w(g, u, h);
                        q(a, g, c, k);
                        q(m, g, c, k);
                        return g
                    };
                b.refresh();
                b.getCellStyle = d;
                b.background = c;
                b.view.gridColor = g
            })), mxEvent.addListener(n, "mouseleave", mxUtils.bind(this, function(a) {
                b.refresh()
            })), mxClient.IS_IE || mxClient.IS_IE11 || (this.format.cachedStyleEntries[m] = n));
            v.appendChild(n)
        }),
        E = Math.ceil(Editor.styles.length / 10);
    this.format.currentStylePage =
        null != this.format.currentStylePage ? this.format.currentStylePage : 0;
    var A = [],
        r = mxUtils.bind(this, function() {
            0 < A.length && (A[this.format.currentStylePage].style.background = "#84d7ff");
            for (var a = 10 * this.format.currentStylePage; a < Math.min(10 * (this.format.currentStylePage + 1), Editor.styles.length); a++) {
                var b = Editor.styles[a];
                G(b.commonStyle, b.vertexStyle, b.edgeStyle, b.graph, a)
            }
        }),
        z = mxUtils.bind(this, function(a) {
            0 <= a && a < E && (A[this.format.currentStylePage].style.background = "transparent", v.innerHTML = "", this.format.currentStylePage =
                a, r())
        });
    if (1 < E) {
        f = document.createElement("div");
        f.style.whiteSpace = "nowrap";
        f.style.position = "relative";
        f.style.textAlign = "center";
        f.style.paddingTop = "4px";
        f.style.width = "210px";
        a.style.paddingBottom = "8px";
        for (p = 0; p < E; p++) {
            var x = document.createElement("div");
            x.style.display = "inline-block";
            x.style.width = "6px";
            x.style.height = "6px";
            x.style.marginLeft = "4px";
            x.style.marginRight = "3px";
            x.style.borderRadius = "3px";
            x.style.cursor = "pointer";
            x.style.background = "transparent";
            x.style.border = "1px solid #b5b6b7";
            mxUtils.bind(this, function(a, b) {
                mxEvent.addListener(x, "click", mxUtils.bind(this, function() {
                    z(a)
                }))
            })(p, x);
            f.appendChild(x);
            A.push(x)
        }
        a.appendChild(f);
        r();
        15 > E && (l = function(a) {
                mxEvent.addListener(a, "mouseenter", function() {
                    a.style.opacity = "1"
                });
                mxEvent.addListener(a, "mouseleave", function() {
                    a.style.opacity = "0.5"
                })
            }, m = document.createElement("div"), m.style.cssText = "position:absolute;left:0px;top:4px;bottom:0px;width:20px;margin:0px;opacity:0.5;background-repeat:no-repeat;background-position:center center;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQBAMAAADQT4M0AAAAIVBMVEUAAAB2dnZ4eHh3d3d1dXVxcXF2dnZ2dnZ2dnZxcXF2dnYmb3w1AAAACnRSTlMAfCTkhhvb7cQSPH2JPgAAADRJREFUCNdjwACMAmBKaiGYs2oJmLPKAZ3DabU8AMRTXpUKopislqFyVzCAuUZgikkBZjoAcMYLnp53P/UAAAAASUVORK5CYII=);",
            mxEvent.addListener(m, "click", mxUtils.bind(this, function() {
                z(mxUtils.mod(this.format.currentStylePage - 1, E))
            })), p = document.createElement("div"), p.style.cssText = "position:absolute;right:2px;top:4px;bottom:0px;width:20px;margin:0px;opacity:0.5;background-repeat:no-repeat;background-position:center center;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQBAMAAADQT4M0AAAAIVBMVEUAAAB2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnYBuwCcAAAACnRSTlMAfCTkhhvb7cQSPH2JPgAAADZJREFUCNdjQAOMAmBKaiGY8loF5rKswsZlrVo8AUiFrTICcbIWK8A5DF1gDoMymMPApIAwHwCS0Qx/U7qCBQAAAABJRU5ErkJggg==);",
            f.appendChild(m), f.appendChild(p), mxEvent.addListener(p, "click", mxUtils.bind(this, function() {
                z(mxUtils.mod(this.format.currentStylePage + 1, E))
            })), l(m), l(p))
    } else r();
    return a
};
DiagramFormatPanel = function(a, c, b) {
    BaseFormatPanel.call(this, a, c, b);
    this.init()
};
mxUtils.extend(DiagramFormatPanel, BaseFormatPanel);
DiagramFormatPanel.showPageView = !0;
DiagramFormatPanel.prototype.showBackgroundImageOption = !0;
DiagramFormatPanel.prototype.init = function() {
    var a = this.editorUi.editor.graph;
    this.container.appendChild(this.addView(this.createPanel()));
    a.isEnabled() && (this.container.appendChild(this.addOptions(this.createPanel())), this.container.appendChild(this.addPaperSize(this.createPanel())), this.container.appendChild(this.addStyleOps(this.createPanel())))
};
DiagramFormatPanel.prototype.addView = function(a) {
    var c = this.editorUi,
        b = c.editor.graph;
    a.appendChild(this.createTitle(mxResources.get("view")));
    this.addGridOption(a);
    DiagramFormatPanel.showPageView && a.appendChild(this.createOption(mxResources.get("pageView"), function() {
        return b.pageVisible
    }, function(a) {
        c.actions.get("pageView").funct()
    }, {
        install: function(a) {
            this.listener = function() {
                a(b.pageVisible)
            };
            c.addListener("pageViewChanged", this.listener)
        },
        destroy: function() {
            c.removeListener(this.listener)
        }
    }));
    if (b.isEnabled()) {
        var e = this.createColorOption(mxResources.get("background"), function() {
            return b.background
        }, function(a) {
            a = new ChangePageSetup(c, a);
            a.ignoreImage = !0;
            b.model.execute(a)
        }, "#ffffff", {
            install: function(a) {
                this.listener = function() {
                    a(b.background)
                };
                c.addListener("backgroundColorChanged", this.listener)
            },
            destroy: function() {
                c.removeListener(this.listener)
            }
        });
        if (this.showBackgroundImageOption) {
            var h = mxUtils.button(mxResources.get("image"), function(a) {
                c.showBackgroundImageDialog(null, c.editor.graph.backgroundImage);
                mxEvent.consume(a)
            });
            h.style.position = "absolute";
            h.className = "geColorBtn";
            h.style.marginTop = "-4px";
            h.style.paddingBottom = 11 == document.documentMode || mxClient.IS_MT ? "0px" : "2px";
            h.style.height = "22px";
            h.style.right = "72px";
            h.style.width = "56px";
            e.appendChild(h)
        }
        a.appendChild(e)
    }
    return a
};
DiagramFormatPanel.prototype.addOptions = function(a) {
    var c = this.editorUi,
        b = c.editor.graph;
    a.appendChild(this.createTitle(mxResources.get("options")));
    b.isEnabled() && (a.appendChild(this.createOption(mxResources.get("connectionArrows"), function() {
            return b.connectionArrowsEnabled
        }, function(a) {
            c.actions.get("connectionArrows").funct()
        }, {
            install: function(a) {
                this.listener = function() {
                    a(b.connectionArrowsEnabled)
                };
                c.addListener("connectionArrowsChanged", this.listener)
            },
            destroy: function() {
                c.removeListener(this.listener)
            }
        })),
        a.appendChild(this.createOption(mxResources.get("connectionPoints"), function() {
            return b.connectionHandler.isEnabled()
        }, function(a) {
            c.actions.get("connectionPoints").funct()
        }, {
            install: function(a) {
                this.listener = function() {
                    a(b.connectionHandler.isEnabled())
                };
                c.addListener("connectionPointsChanged", this.listener)
            },
            destroy: function() {
                c.removeListener(this.listener)
            }
        })), a.appendChild(this.createOption(mxResources.get("guides"), function() {
            return b.graphHandler.guidesEnabled
        }, function(a) {
            c.actions.get("guides").funct()
        }, {
            install: function(a) {
                this.listener = function() {
                    a(b.graphHandler.guidesEnabled)
                };
                c.addListener("guidesEnabledChanged", this.listener)
            },
            destroy: function() {
                c.removeListener(this.listener)
            }
        })));
    return a
};
DiagramFormatPanel.prototype.addGridOption = function(a) {
    function c(a) {
        var c = b.isFloatUnit() ? parseFloat(d.value) : parseInt(d.value);
        c = b.fromUnit(Math.max(b.inUnit(1), isNaN(c) ? b.inUnit(10) : c));
        c != h.getGridSize() && h.setGridSize(c);
        d.value = b.inUnit(c) + " " + b.getUnit();
        mxEvent.consume(a)
    }
    var b = this,
        e = this.editorUi,
        h = e.editor.graph,
        d = document.createElement("input");
    d.style.position = "absolute";
    d.style.textAlign = "right";
    d.style.width = "38px";
    d.value = this.inUnit(h.getGridSize()) + " " + this.getUnit();
    var g = this.createStepper(d,
        c, this.getUnitStep(), null, null, null, this.isFloatUnit());
    d.style.display = h.isGridEnabled() ? "" : "none";
    g.style.display = d.style.display;
    mxEvent.addListener(d, "keydown", function(a) {
        13 == a.keyCode ? (h.container.focus(), mxEvent.consume(a)) : 27 == a.keyCode && (d.value = h.getGridSize(), h.container.focus(), mxEvent.consume(a))
    });
    mxEvent.addListener(d, "blur", c);
    mxEvent.addListener(d, "change", c);
    if (mxClient.IS_SVG) {
        d.style.marginTop = "-2px";
        d.style.right = "84px";
        g.style.marginTop = mxClient.IS_FF ? "-16px" : "-18px";
        g.style.right =
            "72px";
        var f = this.createColorOption(mxResources.get("grid"), function() {
            var a = h.view.gridColor;
            return h.isGridEnabled() ? a : null
        }, function(a) {
            var b = h.isGridEnabled();
            a == mxConstants.NONE ? h.setGridEnabled(!1) : (h.setGridEnabled(!0), e.setGridColor(a));
            d.style.display = h.isGridEnabled() ? "" : "none";
            g.style.display = d.style.display;
            b != h.isGridEnabled() && e.fireEvent(new mxEventObject("gridEnabledChanged"))
        }, Editor.isDarkMode() ? h.view.defaultDarkGridColor : h.view.defaultGridColor, {
            install: function(a) {
                this.listener =
                    function() {
                        a(h.isGridEnabled() ? h.view.gridColor : null)
                    };
                e.addListener("gridColorChanged", this.listener);
                e.addListener("gridEnabledChanged", this.listener)
            },
            destroy: function() {
                e.removeListener(this.listener)
            }
        });
        f.appendChild(d);
        f.appendChild(g);
        a.appendChild(f)
    } else d.style.marginTop = "2px", d.style.right = "32px", g.style.marginTop = "2px", g.style.right = "20px", a.appendChild(d), a.appendChild(g), a.appendChild(this.createOption(mxResources.get("grid"), function() {
        return h.isGridEnabled()
    }, function(a) {
        h.setGridEnabled(a);
        h.isGridEnabled() && (h.view.gridColor = "#e0e0e0");
        e.fireEvent(new mxEventObject("gridEnabledChanged"))
    }, {
        install: function(a) {
            this.listener = function() {
                d.style.display = h.isGridEnabled() ? "" : "none";
                g.style.display = d.style.display;
                a(h.isGridEnabled())
            };
            e.addListener("gridEnabledChanged", this.listener)
        },
        destroy: function() {
            e.removeListener(this.listener)
        }
    }))
};
DiagramFormatPanel.prototype.addDocumentProperties = function(a) {
    a.appendChild(this.createTitle(mxResources.get("options")));
    return a
};
DiagramFormatPanel.prototype.addPaperSize = function(a) {
    var c = this.editorUi,
        b = c.editor.graph;
    a.appendChild(this.createTitle(mxResources.get("paperSize")));
    var e = PageSetupDialog.addPageFormatPanel(a, "formatpanel", b.pageFormat, function(a) {
        if (null == b.pageFormat || b.pageFormat.width != a.width || b.pageFormat.height != a.height) a = new ChangePageSetup(c, null, null, a), a.ignoreColor = !0, a.ignoreImage = !0, b.model.execute(a)
    });
    this.addKeyHandler(e.widthInput, function() {
        e.set(b.pageFormat)
    });
    this.addKeyHandler(e.heightInput,
        function() {
            e.set(b.pageFormat)
        });
    var h = function() {
        e.set(b.pageFormat)
    };
    c.addListener("pageFormatChanged", h);
    this.listeners.push({
        destroy: function() {
            c.removeListener(h)
        }
    });
    b.getModel().addListener(mxEvent.CHANGE, h);
    this.listeners.push({
        destroy: function() {
            b.getModel().removeListener(h)
        }
    });
    return a
};
DiagramFormatPanel.prototype.addStyleOps = function(a) {
    var c = mxUtils.button(mxResources.get("editData"), mxUtils.bind(this, function(a) {
        this.editorUi.actions.get("editData").funct()
    }));
    c.setAttribute("title", mxResources.get("editData") + " (" + this.editorUi.actions.get("editData").shortcut + ")");
    c.style.width = "188px";
    c.style.marginBottom = "2px";
    c.className = "btn btn-secondary";
    a.appendChild(c);
    mxUtils.br(a);
    c = mxUtils.button(mxResources.get("clearDefaultStyle"), mxUtils.bind(this, function(a) {
        this.editorUi.actions.get("clearDefaultStyle").funct()
    }));
    c.setAttribute("title", mxResources.get("clearDefaultStyle") + " (" + this.editorUi.actions.get("clearDefaultStyle").shortcut + ")");
    c.style.width = "188px";
    c.className = "btn btn-secondary";
    a.appendChild(c);
    return a
};
DiagramFormatPanel.prototype.destroy = function() {
    BaseFormatPanel.prototype.destroy.apply(this, arguments);
    this.gridEnabledListener && (this.editorUi.removeListener(this.gridEnabledListener), this.gridEnabledListener = null)
};