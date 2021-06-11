EditorUi = function(a, b, d) {
    mxEventSource.call(this);
    this.destroyFunctions = [];
    this.editor = a || new Editor;
    this.container = b || document.body;
    var c = this.editor.graph;
    c.lightbox = d;
    this.initialDefaultVertexStyle = mxUtils.clone(c.defaultVertexStyle);
    this.initialDefaultEdgeStyle = mxUtils.clone(c.defaultEdgeStyle);
    c.useCssTransforms && (this.lazyZoomDelay = 0);
    mxClient.IS_SVG ? mxPopupMenu.prototype.submenuImage = "data:image/gif;base64,R0lGODlhCQAJAIAAAP///zMzMyH5BAEAAAAALAAAAAAJAAkAAAIPhI8WebHsHopSOVgb26AAADs=" : (new Image).src =
        mxPopupMenu.prototype.submenuImage;
    mxClient.IS_SVG || null == mxConnectionHandler.prototype.connectImage || ((new Image).src = mxConnectionHandler.prototype.connectImage.src);
    this.editor.chromeless && !this.editor.editable && (this.footerHeight = 0, c.isEnabled = function() {
        return !1
    }, c.panningHandler.isForcePanningEvent = function(a) {
        return !mxEvent.isPopupTrigger(a.getEvent())
    });
    this.actions = new Actions(this);
    this.menus = this.createMenus();
    if (!c.standalone) {
        var e = "rounded shadow glass dashed dashPattern labelBackgroundColor comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification sketchStyle pointerEvents".split(" "),
            g = "shape edgeStyle curved rounded elbow jumpStyle jumpSize comic sketch fillWeight hachureGap hachureAngle jiggle disableMultiStroke disableMultiStrokeFill fillStyle curveFitting simplification sketchStyle".split(" ");
        this.setDefaultStyle = function(a) {
            try {
                var b = c.view.getState(a);
                if (null != b) {
                    var d = a.clone();
                    d.style = "";
                    var e = c.getCellStyle(d);
                    a = [];
                    d = [];
                    for (var g in b.style) e[g] != b.style[g] && (a.push(b.style[g]), d.push(g));
                    var r = c.getModel().getStyle(b.cell),
                        h = null != r ? r.split(";") : [];
                    for (r = 0; r < h.length; r++) {
                        var v =
                            h[r],
                            k = v.indexOf("=");
                        if (0 <= k) {
                            g = v.substring(0, k);
                            var f = v.substring(k + 1);
                            null != e[g] && "none" == f && (a.push(f), d.push(g))
                        }
                    }
                    c.getModel().isEdge(b.cell) ? c.currentEdgeStyle = {} : c.currentVertexStyle = {};
                    this.fireEvent(new mxEventObject("styleChanged", "keys", d, "values", a, "cells", [b.cell]))
                }
            } catch (L) {
                this.handleError(L)
            }
        };
        this.clearDefaultStyle = function() {
            c.currentEdgeStyle = mxUtils.clone(c.defaultEdgeStyle);
            c.currentVertexStyle = mxUtils.clone(c.defaultVertexStyle);
            this.fireEvent(new mxEventObject("styleChanged",
                "keys", [], "values", [], "cells", []))
        };
        var k = ["fontFamily", "fontSource", "fontSize", "fontColor"];
        for (b = 0; b < k.length; b++) 0 > mxUtils.indexOf(e, k[b]) && e.push(k[b]);
        var l = "edgeStyle startArrow startFill startSize endArrow endFill endSize".split(" "),
            m = [
                ["startArrow", "startFill", "endArrow", "endFill"],
                ["startSize", "endSize"],
                ["sourcePerimeterSpacing", "targetPerimeterSpacing"],
                ["strokeColor", "strokeWidth"],
                ["fillColor", "gradientColor"],
                ["opacity"],
                ["align"],
                ["html"]
            ];
        for (b = 0; b < m.length; b++)
            for (d = 0; d < m[b].length; d++) e.push(m[b][d]);
        for (b = 0; b < g.length; b++) 0 > mxUtils.indexOf(e, g[b]) && e.push(g[b]);
        var f = function(a, b, d, h, k) {
            h = null != h ? h : c.currentVertexStyle;
            k = null != k ? k : c.currentEdgeStyle;
            d = null != d ? d : c.getModel();
            d.beginUpdate();
            try {
                for (var r = 0; r < a.length; r++) {
                    var v = a[r];
                    if (b) var z = ["fontSize", "fontFamily", "fontColor"];
                    else {
                        var f = d.getStyle(v),
                            l = null != f ? f.split(";") : [];
                        z = e.slice();
                        for (var p = 0; p < l.length; p++) {
                            var A = l[p],
                                n = A.indexOf("=");
                            if (0 <= n) {
                                var q = A.substring(0, n),
                                    w = mxUtils.indexOf(z, q);
                                0 <= w && z.splice(w, 1);
                                for (var F = 0; F < m.length; F++) {
                                    var B =
                                        m[F];
                                    if (0 <= mxUtils.indexOf(B, q))
                                        for (var t = 0; t < B.length; t++) {
                                            var G = mxUtils.indexOf(z, B[t]);
                                            0 <= G && z.splice(G, 1)
                                        }
                                }
                            }
                        }
                    }
                    var C = d.isEdge(v);
                    F = C ? k : h;
                    var D = d.getStyle(v);
                    for (p = 0; p < z.length; p++) {
                        q = z[p];
                        var u = F[q];
                        null == u || "shape" == q && !C || C && !(0 > mxUtils.indexOf(g, q)) || (D = mxUtils.setStyle(D, q, u))
                    }
                    Editor.simpleLabels && (D = mxUtils.setStyle(mxUtils.setStyle(D, "html", null), "whiteSpace", null));
                    d.setStyle(v, D)
                }
            } finally {
                d.endUpdate()
            }
        };
        c.addListener("cellsInserted", function(a, b) {
            f(b.getProperty("cells"))
        });
        c.addListener("textInserted",
            function(a, b) {
                f(b.getProperty("cells"), !0)
            });
        this.insertHandler = f;
        this.createDivs();
        this.createUi();
        this.refresh();
        var n = mxUtils.bind(this, function(a) {
            null == a && (a = window.event);
            return c.isEditing() || null != a && this.isSelectionAllowed(a)
        });
        this.container == document.body && (this.menubarContainer.onselectstart = n, this.menubarContainer.onmousedown = n, this.toolbarContainer.onselectstart = n, this.toolbarContainer.onmousedown = n, this.diagramContainer.onselectstart = n, this.diagramContainer.onmousedown = n, this.sidebarContainer.onselectstart =
            n, this.sidebarContainer.onmousedown = n, this.formatContainer.onselectstart = n, this.formatContainer.onmousedown = n, this.footerContainer.onselectstart = n, this.footerContainer.onmousedown = n, null != this.tabContainer && (this.tabContainer.onselectstart = n));
        !this.editor.chromeless || this.editor.editable ? (b = function(a) {
            if (null != a) {
                var b = mxEvent.getSource(a);
                if ("A" == b.nodeName)
                    for (; null != b;) {
                        if ("geHint" == b.className) return !0;
                        b = b.parentNode
                    }
            }
            return n(a)
        }, mxClient.IS_IE && ("undefined" === typeof document.documentMode ||
            9 > document.documentMode) ? mxEvent.addListener(this.diagramContainer, "contextmenu", b) : this.diagramContainer.oncontextmenu = b) : c.panningHandler.usePopupTrigger = !1;
        c.init(this.diagramContainer);
        mxClient.IS_SVG && null != c.view.getDrawPane() && (b = c.view.getDrawPane().ownerSVGElement, null != b && (b.style.position = "absolute"));
        this.hoverIcons = this.createHoverIcons();
        if (null != c.graphHandler) {
            var q = c.graphHandler.start;
            c.graphHandler.start = function() {
                null != u.hoverIcons && u.hoverIcons.reset();
                q.apply(this, arguments)
            }
        }
        mxEvent.addListener(this.diagramContainer,
            "mousemove", mxUtils.bind(this, function(a) {
                var b = mxUtils.getOffset(this.diagramContainer);
                0 < mxEvent.getClientX(a) - b.x - this.diagramContainer.clientWidth || 0 < mxEvent.getClientY(a) - b.y - this.diagramContainer.clientHeight ? this.diagramContainer.setAttribute("title", mxResources.get("panTooltip")) : this.diagramContainer.removeAttribute("title")
            }));
        var h = !1,
            p = this.hoverIcons.isResetEvent;
        this.hoverIcons.isResetEvent = function(a, b) {
            return h || p.apply(this, arguments)
        };
        this.keydownHandler = mxUtils.bind(this, function(a) {
            32 !=
                a.which || c.isEditing() ? mxEvent.isConsumed(a) || 27 != a.keyCode || this.hideDialog(null, !0) : (h = !0, this.hoverIcons.reset(), c.container.style.cursor = "move", c.isEditing() || mxEvent.getSource(a) != c.container || mxEvent.consume(a))
        });
        mxEvent.addListener(document, "keydown", this.keydownHandler);
        this.keyupHandler = mxUtils.bind(this, function(a) {
            c.container.style.cursor = "";
            h = !1
        });
        mxEvent.addListener(document, "keyup", this.keyupHandler);
        var t = c.panningHandler.isForcePanningEvent;
        c.panningHandler.isForcePanningEvent = function(a) {
            return t.apply(this,
                arguments) || h || mxEvent.isMouseEvent(a.getEvent()) && (this.usePopupTrigger || !mxEvent.isPopupTrigger(a.getEvent())) && (!mxEvent.isControlDown(a.getEvent()) && mxEvent.isRightMouseButton(a.getEvent()) || mxEvent.isMiddleMouseButton(a.getEvent()))
        };
        var w = c.cellEditor.isStopEditingEvent;
        c.cellEditor.isStopEditingEvent = function(a) {
            return w.apply(this, arguments) || 13 == a.keyCode && (!mxClient.IS_SF && mxEvent.isControlDown(a) || mxClient.IS_MAC && mxEvent.isMetaDown(a) || mxClient.IS_SF && mxEvent.isShiftDown(a))
        };
        var G = c.isZoomWheelEvent;
        c.isZoomWheelEvent = function() {
            return h || G.apply(this, arguments)
        };
        var B = !1,
            C = null,
            H = null,
            I = null,
            J = mxUtils.bind(this, function() {
                if (null != this.toolbar && B != c.cellEditor.isContentEditing()) {
                    for (var a = this.toolbar.container.firstChild, b = []; null != a;) {
                        var d = a.nextSibling;
                        0 > mxUtils.indexOf(this.toolbar.staticElements, a) && (a.parentNode.removeChild(a), b.push(a));
                        a = d
                    }
                    a = this.toolbar.fontMenu;
                    d = this.toolbar.sizeMenu;
                    if (null == I) this.toolbar.createTextToolbar();
                    else {
                        for (var e = 0; e < I.length; e++) this.toolbar.container.appendChild(I[e]);
                        this.toolbar.fontMenu = C;
                        this.toolbar.sizeMenu = H
                    }
                    B = c.cellEditor.isContentEditing();
                    C = a;
                    H = d;
                    I = b
                }
            }),
            u = this,
            x = c.cellEditor.startEditing;
        c.cellEditor.startEditing = function() {
            x.apply(this, arguments);
            J();
            if (c.cellEditor.isContentEditing()) {
                var a = !1,
                    b = function() {
                        a || (a = !0, window.setTimeout(function() {
                                var b = c.getSelectedEditingElement();
                                null != b && (b = mxUtils.getCurrentStyle(b), null != b && null != u.toolbar && (u.toolbar.setFontName(Graph.stripQuotes(b.fontFamily)), u.toolbar.setFontSize(parseInt(b.fontSize))));
                                a = !1
                            },
                            0))
                    };
                mxEvent.addListener(c.cellEditor.textarea, "input", b);
                mxEvent.addListener(c.cellEditor.textarea, "touchend", b);
                mxEvent.addListener(c.cellEditor.textarea, "mouseup", b);
                mxEvent.addListener(c.cellEditor.textarea, "keyup", b);
                b()
            }
        };
        var E = c.cellEditor.stopEditing;
        c.cellEditor.stopEditing = function(a, b) {
            try {
                E.apply(this, arguments), J()
            } catch (A) {
                u.handleError(A)
            }
        };
        c.container.setAttribute("tabindex", "0");
        c.container.style.cursor = "default";
        if (window.self === window.top && null != c.container.parentNode) try {
            c.container.focus()
        } catch (v) {}
        var y =
            c.fireMouseEvent;
        c.fireMouseEvent = function(a, b, c) {
            a == mxEvent.MOUSE_DOWN && this.container.focus();
            y.apply(this, arguments)
        };
        c.popupMenuHandler.autoExpand = !0;
        null != this.menus && (c.popupMenuHandler.factoryMethod = mxUtils.bind(this, function(a, b, c) {
            this.menus.createPopupMenu(a, b, c)
        }));
        mxEvent.addGestureListeners(document, mxUtils.bind(this, function(a) {
            c.popupMenuHandler.hideMenu()
        }));
        this.keyHandler = this.createKeyHandler(a);
        this.getKeyHandler = function() {
            return keyHandler
        };
        c.connectionHandler.addListener(mxEvent.CONNECT,
            function(a, b) {
                a = [b.getProperty("cell")];
                b.getProperty("terminalInserted") && a.push(b.getProperty("terminal"));
                f(a)
            });
        this.addListener("styleChanged", mxUtils.bind(this, function(a, b) {
            var d = b.getProperty("cells"),
                h = a = !1;
            if (0 < d.length)
                for (var f = 0; f < d.length && (a = c.getModel().isVertex(d[f]) || a, !(h = c.getModel().isEdge(d[f]) || h) || !a); f++);
            else h = a = !0;
            d = b.getProperty("keys");
            b = b.getProperty("values");
            for (f = 0; f < d.length; f++) {
                var r = 0 <= mxUtils.indexOf(k, d[f]);
                if ("strokeColor" != d[f] || null != b[f] && "none" != b[f])
                    if (0 <=
                        mxUtils.indexOf(g, d[f])) h || 0 <= mxUtils.indexOf(l, d[f]) ? null == b[f] ? delete c.currentEdgeStyle[d[f]] : c.currentEdgeStyle[d[f]] = b[f] : a && 0 <= mxUtils.indexOf(e, d[f]) && (null == b[f] ? delete c.currentVertexStyle[d[f]] : c.currentVertexStyle[d[f]] = b[f]);
                    else if (0 <= mxUtils.indexOf(e, d[f])) {
                    if (a || r) null == b[f] ? delete c.currentVertexStyle[d[f]] : c.currentVertexStyle[d[f]] = b[f];
                    if (h || r || 0 <= mxUtils.indexOf(l, d[f])) null == b[f] ? delete c.currentEdgeStyle[d[f]] : c.currentEdgeStyle[d[f]] = b[f]
                }
            }
            null != this.toolbar && (this.toolbar.setFontName(c.currentVertexStyle.fontFamily ||
                Menus.prototype.defaultFont), this.toolbar.setFontSize(c.currentVertexStyle.fontSize || Menus.prototype.defaultFontSize), null != this.toolbar.edgeStyleMenu && (this.toolbar.edgeStyleMenu.getElementsByTagName("div")[0].className = "orthogonalEdgeStyle" == c.currentEdgeStyle.edgeStyle && "1" == c.currentEdgeStyle.curved ? "geSprite geSprite-curved" : "straight" == c.currentEdgeStyle.edgeStyle || "none" == c.currentEdgeStyle.edgeStyle || null == c.currentEdgeStyle.edgeStyle ? "geSprite geSprite-straight" : "entityRelationEdgeStyle" ==
                c.currentEdgeStyle.edgeStyle ? "geSprite geSprite-entity" : "elbowEdgeStyle" == c.currentEdgeStyle.edgeStyle ? "geSprite geSprite-" + ("vertical" == c.currentEdgeStyle.elbow ? "verticalelbow" : "horizontalelbow") : "isometricEdgeStyle" == c.currentEdgeStyle.edgeStyle ? "geSprite geSprite-" + ("vertical" == c.currentEdgeStyle.elbow ? "verticalisometric" : "horizontalisometric") : "geSprite geSprite-orthogonal"), null != this.toolbar.edgeShapeMenu && (this.toolbar.edgeShapeMenu.getElementsByTagName("div")[0].className = "link" == c.currentEdgeStyle.shape ?
                "geSprite geSprite-linkedge" : "flexArrow" == c.currentEdgeStyle.shape ? "geSprite geSprite-arrow" : "arrow" == c.currentEdgeStyle.shape ? "geSprite geSprite-simplearrow" : "geSprite geSprite-connection"), null != this.toolbar.lineStartMenu && (this.toolbar.lineStartMenu.getElementsByTagName("div")[0].className = this.getCssClassForMarker("start", c.currentEdgeStyle.shape, c.currentEdgeStyle[mxConstants.STYLE_STARTARROW], mxUtils.getValue(c.currentEdgeStyle, "startFill", "1"))), null != this.toolbar.lineEndMenu && (this.toolbar.lineEndMenu.getElementsByTagName("div")[0].className =
                this.getCssClassForMarker("end", c.currentEdgeStyle.shape, c.currentEdgeStyle[mxConstants.STYLE_ENDARROW], mxUtils.getValue(c.currentEdgeStyle, "endFill", "1"))))
        }));
        null != this.toolbar && (a = mxUtils.bind(this, function() {
            var a = c.currentVertexStyle.fontFamily || "Helvetica",
                b = String(c.currentVertexStyle.fontSize || "12"),
                d = c.getView().getState(c.getSelectionCell());
            null != d && (a = d.style[mxConstants.STYLE_FONTFAMILY] || a, b = d.style[mxConstants.STYLE_FONTSIZE] || b, 10 < a.length && (a = a.substring(0, 8) + "..."));
            this.toolbar.setFontName(a);
            this.toolbar.setFontSize(b)
        }), c.getSelectionModel().addListener(mxEvent.CHANGE, a), c.getModel().addListener(mxEvent.CHANGE, a));
        c.addListener(mxEvent.CELLS_ADDED, function(a, b) {
            a = b.getProperty("cells");
            b = b.getProperty("parent");
            c.getModel().isLayer(b) && !c.isCellVisible(b) && null != a && 0 < a.length && c.getModel().setVisible(b, !0)
        });
        this.gestureHandler = mxUtils.bind(this, function(a) {
            null != this.currentMenu && mxEvent.getSource(a) != this.currentMenu.div && this.hideCurrentMenu()
        });
        mxEvent.addGestureListeners(document,
            this.gestureHandler);
        this.resizeHandler = mxUtils.bind(this, function() {
            window.setTimeout(mxUtils.bind(this, function() {
                null != this.editor.graph && this.refresh()
            }), 0)
        });
        mxEvent.addListener(window, "resize", this.resizeHandler);
        this.orientationChangeHandler = mxUtils.bind(this, function() {
            this.refresh()
        });
        mxEvent.addListener(window, "orientationchange", this.orientationChangeHandler);
        mxClient.IS_IOS && !window.navigator.standalone && (this.scrollHandler = mxUtils.bind(this, function() {
            window.scrollTo(0, 0)
        }), mxEvent.addListener(window,
            "scroll", this.scrollHandler));
        this.editor.addListener("resetGraphView", mxUtils.bind(this, function() {
            this.resetScrollbars()
        }));
        this.addListener("gridEnabledChanged", mxUtils.bind(this, function() {
            c.view.validateBackground()
        }));
        this.addListener("backgroundColorChanged", mxUtils.bind(this, function() {
            c.view.validateBackground()
        }));
        c.addListener("gridSizeChanged", mxUtils.bind(this, function() {
            c.isGridEnabled() && c.view.validateBackground()
        }));
        this.editor.resetGraph()
    }
    this.init();
    c.standalone || this.open()
};
mxUtils.extend(EditorUi, mxEventSource);
EditorUi.compactUi = !0;
EditorUi.prototype.splitSize = mxClient.IS_TOUCH || mxClient.IS_POINTER ? 12 : 8;
EditorUi.prototype.menubarHeight = 30;
EditorUi.prototype.formatEnabled = !0;
EditorUi.prototype.formatWidth = 240;
EditorUi.prototype.toolbarHeight = 38;
EditorUi.prototype.footerHeight = 28;
EditorUi.prototype.sidebarFooterHeight = 34;
EditorUi.prototype.hsplitPosition = 640 >= screen.width ? 118 : "large" != urlParams["sidebar-entries"] ? 212 : 240;
EditorUi.prototype.allowAnimation = !0;
EditorUi.prototype.lightboxMaxFitScale = 2;
EditorUi.prototype.lightboxVerticalDivider = 4;
EditorUi.prototype.hsplitClickEnabled = !1;
EditorUi.prototype.init = function() {
    var a = this.editor.graph;
    if (!a.standalone) {
        "0" != urlParams["shape-picker"] && this.installShapePicker();
        mxEvent.addListener(a.container, "scroll", mxUtils.bind(this, function() {
            a.tooltipHandler.hide();
            null != a.connectionHandler && null != a.connectionHandler.constraintHandler && a.connectionHandler.constraintHandler.reset()
        }));
        a.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function() {
            a.tooltipHandler.hide();
            var b = a.getRubberband();
            null != b && b.cancel()
        }));
        mxEvent.addListener(a.container,
            "keydown", mxUtils.bind(this, function(a) {
                this.onKeyDown(a)
            }));
        mxEvent.addListener(a.container, "keypress", mxUtils.bind(this, function(a) {
            this.onKeyPress(a)
        }));
        this.addUndoListener();
        this.addBeforeUnloadListener();
        a.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
            this.updateActionStates()
        }));
        a.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
            this.updateActionStates()
        }));
        var b = a.setDefaultParent,
            d = this;
        this.editor.graph.setDefaultParent = function() {
            b.apply(this,
                arguments);
            d.updateActionStates()
        };
        a.editLink = d.actions.get("editLink").funct;
        this.updateActionStates();
        this.initClipboard();
        this.initCanvas();
        null != this.format && this.format.init()
    }
};
EditorUi.prototype.installShapePicker = function() {
    var a = this.editor.graph,
        b = this;
    a.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(a, c) {
        "mouseDown" == c.getProperty("eventName") && b.hideShapePicker()
    }));
    a.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function() {
        b.hideShapePicker(!0)
    }));
    a.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
        b.hideShapePicker(!0)
    }));
    a.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function() {
        b.hideShapePicker(!0)
    }));
    var d =
        a.popupMenuHandler.isMenuShowing;
    a.popupMenuHandler.isMenuShowing = function() {
        return d.apply(this, arguments) || null != b.shapePicker
    };
    var c = a.dblClick;
    a.dblClick = function(a, d) {
        if (this.isEnabled())
            if (null != d || null == b.sidebar || mxEvent.isShiftDown(a)) c.apply(this, arguments);
            else {
                mxEvent.consume(a);
                var e = mxUtils.convertPoint(this.container, mxEvent.getClientX(a), mxEvent.getClientY(a));
                window.setTimeout(mxUtils.bind(this, function() {
                    b.showShapePicker(e.x, e.y)
                }), 30)
            }
    };
    if (null != this.hoverIcons) {
        var e = this.hoverIcons.drag;
        this.hoverIcons.drag = function() {
            b.hideShapePicker();
            e.apply(this, arguments)
        };
        var g = this.hoverIcons.execute;
        this.hoverIcons.execute = function(c, d, e) {
            var f = e.getEvent();
            this.graph.isCloneEvent(f) || mxEvent.isShiftDown(f) ? g.apply(this, arguments) : this.graph.connectVertex(c.cell, d, this.graph.defaultEdgeLength, f, null, null, mxUtils.bind(this, function(g, f, h) {
                var k = a.getCompositeParent(c.cell);
                g = a.getCellGeometry(k);
                for (e.consume(); null != k && a.model.isVertex(k) && null != g && g.relative;) cell = k, k = a.model.getParent(cell),
                    g = a.getCellGeometry(k);
                window.setTimeout(mxUtils.bind(this, function() {
                    b.showShapePicker(e.getGraphX(), e.getGraphY(), k, mxUtils.bind(this, function(a) {
                        h(a)
                    }), d)
                }), 30)
            }), mxUtils.bind(this, function(a) {
                this.graph.selectCellsForConnectVertex(a, f, this)
            }))
        }
    }
};
EditorUi.prototype.showShapePicker = function(a, b, d, c, e) {
    a = this.createShapePicker(a, b, d, c, e, mxUtils.bind(this, function() {
        this.hideShapePicker()
    }), this.getCellsForShapePicker(d));
    null != a && (null != this.hoverIcons && this.hoverIcons.reset(), b = this.editor.graph, b.popupMenuHandler.hideMenu(), b.tooltipHandler.hideTooltip(), this.hideCurrentMenu(), this.hideShapePicker(), this.shapePickerCallback = c, this.shapePicker = a)
};
EditorUi.prototype.createShapePicker = function(a, b, d, c, e, g, k) {
    var l = null;
    if (null != k && 0 < k.length) {
        var m = this,
            f = this.editor.graph;
        l = document.createElement("div");
        e = f.view.getState(d);
        var n = null == d || null != e && f.isTransparentState(e) ? null : f.copyStyle(d);
        d = 6 > k.length ? 35 * k.length : 140;
        l.className = "geToolbarContainer geSidebarContainer geSidebar";
        l.style.cssText = "position:absolute;left:" + a + "px;top:" + b + "px;width:" + d + "px;border-radius:10px;padding:4px;text-align:center;box-shadow:0px 0px 3px 1px #d1d1d1;padding: 6px 0 8px 0;";
        mxUtils.setPrefixedStyle(l.style, "transform", "translate(-22px,-22px)");
        null != f.background && f.background != mxConstants.NONE && (l.style.backgroundColor = f.background);
        f.container.appendChild(l);
        d = mxUtils.bind(this, function(d) {
            var e = document.createElement("a");
            e.className = "geItem";
            e.style.cssText = "position:relative;display:inline-block;position:relative;width:30px;height:30px;cursor:pointer;overflow:hidden;padding:3px 0 0 3px;";
            l.appendChild(e);
            null != n && "1" != urlParams.sketch ? this.sidebar.graph.pasteStyle(n,
                [d]) : m.insertHandler([d], "" != d.value && "1" != urlParams.sketch, this.sidebar.graph.model);
            this.sidebar.createThumb([d], 25, 25, e, null, !0, !1, d.geometry.width, d.geometry.height);
            mxEvent.addListener(e, "click", function() {
                var e = f.cloneCell(d);
                if (null != c) c(e);
                else {
                    e.geometry.x = f.snap(Math.round(a / f.view.scale) - f.view.translate.x - d.geometry.width / 2);
                    e.geometry.y = f.snap(Math.round(b / f.view.scale) - f.view.translate.y - d.geometry.height / 2);
                    f.model.beginUpdate();
                    try {
                        f.addCell(e)
                    } finally {
                        f.model.endUpdate()
                    }
                    f.setSelectionCell(e);
                    f.scrollCellToVisible(e);
                    f.startEditingAtCell(e);
                    null != m.hoverIcons && m.hoverIcons.update(f.view.getState(e))
                }
                null != g && g()
            })
        });
        for (e = 0; e < k.length; e++) d(k[e])
    }
    return l
};
EditorUi.prototype.getCellsForShapePicker = function(a) {
    var b = mxUtils.bind(this, function(a, b, e, g) {
        return this.editor.graph.createVertex(null, null, g || "", 0, 0, b || 120, e || 60, a, !1)
    });
    return [null != a ? this.editor.graph.cloneCell(a) : b("text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;", 40, 20, "Text"), b("whiteSpace=wrap;html=1;"), b("rounded=1;whiteSpace=wrap;html=1;"), b("ellipse;whiteSpace=wrap;html=1;"), b("rhombus;whiteSpace=wrap;html=1;", 80, 80), b("shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fixedSize=1;"),
        b("shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;", 120, 60), b("shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;", 120, 80), b("shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;", 120, 80), b("shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;"), b("triangle;whiteSpace=wrap;html=1;", 60, 80), b("shape=document;whiteSpace=wrap;html=1;boundedLbl=1;", 120, 80), b("shape=tape;whiteSpace=wrap;html=1;", 120, 100), b("ellipse;shape=cloud;whiteSpace=wrap;html=1;",
            120, 80), b("shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;", 60, 80), b("shape=callout;rounded=1;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;", 120, 80), b("shape=doubleArrow;whiteSpace=wrap;html=1;arrowWidth=0.4;arrowSize=0.3;"), b("shape=singleArrow;whiteSpace=wrap;html=1;arrowWidth=0.4;arrowSize=0.4;", 80, 60), b("shape=singleArrow;whiteSpace=wrap;html=1;arrowWidth=0.4;arrowSize=0.4;flipH=1;", 80, 60), b("shape=waypoint;sketch=0;size=6;pointerEvents=1;points=[];fillColor=none;resizable=0;rotatable=0;perimeter=centerPerimeter;snapToPoint=1;",
            40, 40)
    ]
};
EditorUi.prototype.hideShapePicker = function(a) {
    null != this.shapePicker && (this.shapePicker.parentNode.removeChild(this.shapePicker), this.shapePicker = null, a || null == this.shapePickerCallback || this.shapePickerCallback(), this.shapePickerCallback = null)
};
EditorUi.prototype.onKeyDown = function(a) {
    var b = this.editor.graph;
    9 != a.which || !b.isEnabled() || mxEvent.isAltDown(a) || b.isEditing() && mxEvent.isShiftDown(a) || (b.isEditing() ? b.stopEditing(!1) : b.selectCell(!mxEvent.isShiftDown(a)), mxEvent.consume(a))
};
EditorUi.prototype.onKeyPress = function(a) {
    var b = this.editor.graph;
    !this.isImmediateEditingEvent(a) || b.isEditing() || b.isSelectionEmpty() || 0 === a.which || 27 === a.which || mxEvent.isAltDown(a) || mxEvent.isControlDown(a) || mxEvent.isMetaDown(a) || (b.escape(), b.startEditing(), mxClient.IS_FF && (b = b.cellEditor, null != b.textarea && (b.textarea.innerHTML = String.fromCharCode(a.which), a = document.createRange(), a.selectNodeContents(b.textarea), a.collapse(!1), b = window.getSelection(), b.removeAllRanges(), b.addRange(a))))
};
EditorUi.prototype.isImmediateEditingEvent = function(a) {
    return !0
};
EditorUi.prototype.getCssClassForMarker = function(a, b, d, c) {
    return "flexArrow" == b ? null != d && d != mxConstants.NONE ? "geSprite geSprite-" + a + "blocktrans" : "geSprite geSprite-noarrow" : "box" == d || "halfCircle" == d ? "geSprite geSvgSprite geSprite-" + d + ("end" == a ? " geFlipSprite" : "") : d == mxConstants.ARROW_CLASSIC ? "1" == c ? "geSprite geSprite-" + a + "classic" : "geSprite geSprite-" + a + "classictrans" : d == mxConstants.ARROW_CLASSIC_THIN ? "1" == c ? "geSprite geSprite-" + a + "classicthin" : "geSprite geSprite-" + a + "classicthintrans" : d == mxConstants.ARROW_OPEN ?
        "geSprite geSprite-" + a + "open" : d == mxConstants.ARROW_OPEN_THIN ? "geSprite geSprite-" + a + "openthin" : d == mxConstants.ARROW_BLOCK ? "1" == c ? "geSprite geSprite-" + a + "block" : "geSprite geSprite-" + a + "blocktrans" : d == mxConstants.ARROW_BLOCK_THIN ? "1" == c ? "geSprite geSprite-" + a + "blockthin" : "geSprite geSprite-" + a + "blockthintrans" : d == mxConstants.ARROW_OVAL ? "1" == c ? "geSprite geSprite-" + a + "oval" : "geSprite geSprite-" + a + "ovaltrans" : d == mxConstants.ARROW_DIAMOND ? "1" == c ? "geSprite geSprite-" + a + "diamond" : "geSprite geSprite-" + a + "diamondtrans" :
        d == mxConstants.ARROW_DIAMOND_THIN ? "1" == c ? "geSprite geSprite-" + a + "thindiamond" : "geSprite geSprite-" + a + "thindiamondtrans" : "openAsync" == d ? "geSprite geSprite-" + a + "openasync" : "dash" == d ? "geSprite geSprite-" + a + "dash" : "cross" == d ? "geSprite geSprite-" + a + "cross" : "async" == d ? "1" == c ? "geSprite geSprite-" + a + "async" : "geSprite geSprite-" + a + "asynctrans" : "circle" == d || "circlePlus" == d ? "1" == c || "circle" == d ? "geSprite geSprite-" + a + "circle" : "geSprite geSprite-" + a + "circleplus" : "ERone" == d ? "geSprite geSprite-" + a + "erone" : "ERmandOne" ==
        d ? "geSprite geSprite-" + a + "eronetoone" : "ERmany" == d ? "geSprite geSprite-" + a + "ermany" : "ERoneToMany" == d ? "geSprite geSprite-" + a + "eronetomany" : "ERzeroToOne" == d ? "geSprite geSprite-" + a + "eroneopt" : "ERzeroToMany" == d ? "geSprite geSprite-" + a + "ermanyopt" : "geSprite geSprite-noarrow"
};
EditorUi.prototype.createMenus = function() {
    return null
};
EditorUi.prototype.updatePasteActionStates = function() {
    var a = this.editor.graph,
        b = this.actions.get("paste"),
        d = this.actions.get("pasteHere");
    b.setEnabled(this.editor.graph.cellEditor.isContentEditing() || (!mxClient.IS_FF && null != navigator.clipboard || !mxClipboard.isEmpty()) && a.isEnabled() && !a.isCellLocked(a.getDefaultParent()));
    d.setEnabled(b.isEnabled())
};
EditorUi.prototype.initClipboard = function() {
    var a = this,
        b = mxClipboard.cut;
    mxClipboard.cut = function(c) {
        c.cellEditor.isContentEditing() ? document.execCommand("cut", !1, null) : b.apply(this, arguments);
        a.updatePasteActionStates()
    };
    mxClipboard.copy = function(b) {
        var c = null;
        if (b.cellEditor.isContentEditing()) document.execCommand("copy", !1, null);
        else {
            c = c || b.getSelectionCells();
            c = b.getExportableCells(b.model.getTopmostCells(c));
            for (var d = {}, e = b.createCellLookup(c), f = b.cloneCells(c, null, d), g = new mxGraphModel, q = g.getChildAt(g.getRoot(),
                    0), h = 0; h < f.length; h++) {
                g.add(q, f[h]);
                var p = b.view.getState(c[h]);
                if (null != p) {
                    var t = b.getCellGeometry(f[h]);
                    null != t && t.relative && !g.isEdge(c[h]) && null == e[mxObjectIdentity.get(g.getParent(c[h]))] && (t.offset = null, t.relative = !1, t.x = p.x / p.view.scale - p.view.translate.x, t.y = p.y / p.view.scale - p.view.translate.y)
                }
            }
            b.updateCustomLinks(b.createCellMapping(d, e), f);
            mxClipboard.insertCount = 1;
            mxClipboard.setCells(f)
        }
        a.updatePasteActionStates();
        return c
    };
    var d = mxClipboard.paste;
    mxClipboard.paste = function(b) {
        var c =
            null;
        b.cellEditor.isContentEditing() ? document.execCommand("paste", !1, null) : c = d.apply(this, arguments);
        a.updatePasteActionStates();
        return c
    };
    var c = this.editor.graph.cellEditor.startEditing;
    this.editor.graph.cellEditor.startEditing = function() {
        c.apply(this, arguments);
        a.updatePasteActionStates()
    };
    var e = this.editor.graph.cellEditor.stopEditing;
    this.editor.graph.cellEditor.stopEditing = function(b, c) {
        e.apply(this, arguments);
        a.updatePasteActionStates()
    };
    this.updatePasteActionStates()
};
EditorUi.prototype.lazyZoomDelay = 20;
EditorUi.prototype.wheelZoomDelay = 400;
EditorUi.prototype.buttonZoomDelay = 600;
EditorUi.prototype.initCanvas = function() {
    var a = this.editor.graph;
    a.timerAutoScroll = !0;
    a.getPagePadding = function() {
        return new mxPoint(Math.max(0, Math.round((a.container.offsetWidth - 34) / a.view.scale)), Math.max(0, Math.round((a.container.offsetHeight - 34) / a.view.scale)))
    };
    a.view.getBackgroundPageBounds = function() {
        var a = this.graph.getPageLayout(),
            b = this.graph.getPageSize();
        return new mxRectangle(this.scale * (this.translate.x + a.x * b.width), this.scale * (this.translate.y + a.y * b.height), this.scale * a.width * b.width,
            this.scale * a.height * b.height)
    };
    a.getPreferredPageSize = function(a, b, c) {
        a = this.getPageLayout();
        b = this.getPageSize();
        return new mxRectangle(0, 0, a.width * b.width, a.height * b.height)
    };
    var b = null,
        d = this;
    if (this.editor.isChromelessView()) {
        this.chromelessResize = b = mxUtils.bind(this, function(b, c, d, e) {
            if (null != a.container && !a.isViewer()) {
                d = null != d ? d : 0;
                e = null != e ? e : 0;
                var r = a.pageVisible ? a.view.getBackgroundPageBounds() : a.getGraphBounds(),
                    h = mxUtils.hasScrollbars(a.container),
                    g = a.view.translate,
                    f = a.view.scale,
                    k = mxRectangle.fromRectangle(r);
                k.x = k.x / f - g.x;
                k.y = k.y / f - g.y;
                k.width /= f;
                k.height /= f;
                g = a.container.scrollTop;
                var l = a.container.scrollLeft,
                    p = 8 <= document.documentMode ? 20 : 14;
                if (8 == document.documentMode || 9 == document.documentMode) p += 3;
                var w = a.container.offsetWidth - p;
                p = a.container.offsetHeight - p;
                b = b ? Math.max(.3, Math.min(c || 1, w / k.width)) : f;
                c = (w - b * k.width) / 2 / b;
                var K = 0 == this.lightboxVerticalDivider ? 0 : (p - b * k.height) / this.lightboxVerticalDivider / b;
                h && (c = Math.max(c, 0), K = Math.max(K, 0));
                if (h || r.width < w || r.height < p) a.view.scaleAndTranslate(b, Math.floor(c -
                    k.x), Math.floor(K - k.y)), a.container.scrollTop = g * b / f, a.container.scrollLeft = l * b / f;
                else if (0 != d || 0 != e) r = a.view.translate, a.view.setTranslate(Math.floor(r.x + d / f), Math.floor(r.y + e / f))
            }
        });
        this.chromelessWindowResize = mxUtils.bind(this, function() {
            this.chromelessResize(!1)
        });
        var c = mxUtils.bind(this, function() {
            this.chromelessWindowResize(!1)
        });
        mxEvent.addListener(window, "resize", c);
        this.destroyFunctions.push(function() {
            mxEvent.removeListener(window, "resize", c)
        });
        this.editor.addListener("resetGraphView", mxUtils.bind(this,
            function() {
                this.chromelessResize(!0)
            }));
        this.actions.get("zoomIn").funct = mxUtils.bind(this, function(b) {
            a.zoomIn();
            this.chromelessResize(!1)
        });
        this.actions.get("zoomOut").funct = mxUtils.bind(this, function(b) {
            a.zoomOut();
            this.chromelessResize(!1)
        });
        if ("0" != urlParams.toolbar) {
            var e = JSON.parse(decodeURIComponent(urlParams["toolbar-config"] || "{}"));
            this.chromelessToolbar = document.createElement("div");
            this.chromelessToolbar.style.position = "fixed";
            this.chromelessToolbar.style.overflow = "hidden";
            this.chromelessToolbar.style.boxSizing =
                "border-box";
            this.chromelessToolbar.style.whiteSpace = "nowrap";
            this.chromelessToolbar.style.backgroundColor = "#000000";
            this.chromelessToolbar.style.padding = "10px 10px 8px 10px";
            this.chromelessToolbar.style.left = a.isViewer() ? "0" : "50%";
            mxUtils.setPrefixedStyle(this.chromelessToolbar.style, "borderRadius", "20px");
            mxUtils.setPrefixedStyle(this.chromelessToolbar.style, "transition", "opacity 600ms ease-in-out");
            var g = mxUtils.bind(this, function() {
                var b = mxUtils.getCurrentStyle(a.container);
                a.isViewer() ? this.chromelessToolbar.style.top =
                    "0" : this.chromelessToolbar.style.bottom = (null != b ? parseInt(b["margin-bottom"] || 0) : 0) + (null != this.tabContainer ? 20 + parseInt(this.tabContainer.style.height) : 20) + "px"
            });
            this.editor.addListener("resetGraphView", g);
            g();
            var k = 0;
            g = mxUtils.bind(this, function(a, b, c) {
                k++;
                var d = document.createElement("span");
                d.style.paddingLeft = "8px";
                d.style.paddingRight = "8px";
                d.style.cursor = "pointer";
                mxEvent.addListener(d, "click", a);
                null != c && d.setAttribute("title", c);
                a = document.createElement("img");
                a.setAttribute("border", "0");
                a.setAttribute("src", b);
                d.appendChild(a);
                this.chromelessToolbar.appendChild(d);
                return d
            });
            null != e.backBtn && g(mxUtils.bind(this, function(a) {
                window.location.href = e.backBtn.url;
                mxEvent.consume(a)
            }), Editor.backLargeImage, mxResources.get("back", null, "Back"));
            if (this.isPagesEnabled()) {
                var l = g(mxUtils.bind(this, function(a) {
                        this.actions.get("previousPage").funct();
                        mxEvent.consume(a)
                    }), Editor.previousLargeImage, mxResources.get("previousPage")),
                    m = document.createElement("div");
                m.style.display = "inline-block";
                m.style.verticalAlign = "top";
                m.style.fontFamily = "Helvetica,Arial";
                m.style.marginTop = "8px";
                m.style.fontSize = "14px";
                m.style.color = "#ffffff";
                this.chromelessToolbar.appendChild(m);
                var f = g(mxUtils.bind(this, function(a) {
                        this.actions.get("nextPage").funct();
                        mxEvent.consume(a)
                    }), Editor.nextLargeImage, mxResources.get("nextPage")),
                    n = mxUtils.bind(this, function() {
                        null != this.pages && 1 < this.pages.length && null != this.currentPage && (m.innerHTML = "", mxUtils.write(m, mxUtils.indexOf(this.pages, this.currentPage) + 1 + " / " +
                            this.pages.length))
                    });
                l.style.paddingLeft = "0px";
                l.style.paddingRight = "4px";
                f.style.paddingLeft = "4px";
                f.style.paddingRight = "0px";
                var q = mxUtils.bind(this, function() {
                    null != this.pages && 1 < this.pages.length && null != this.currentPage ? (f.style.display = "", l.style.display = "", m.style.display = "inline-block") : (f.style.display = "none", l.style.display = "none", m.style.display = "none");
                    n()
                });
                this.editor.addListener("resetGraphView", q);
                this.editor.addListener("pageSelected", n)
            }
            g(mxUtils.bind(this, function(a) {
                this.actions.get("zoomOut").funct();
                mxEvent.consume(a)
            }), Editor.zoomOutLargeImage, mxResources.get("zoomOut") + " (Alt+Mousewheel)");
            g(mxUtils.bind(this, function(a) {
                this.actions.get("zoomIn").funct();
                mxEvent.consume(a)
            }), Editor.zoomInLargeImage, mxResources.get("zoomIn") + " (Alt+Mousewheel)");
            g(mxUtils.bind(this, function(b) {
                a.isLightboxView() ? (1 == a.view.scale ? this.lightboxFit() : a.zoomTo(1), this.chromelessResize(!1)) : this.chromelessResize(!0);
                mxEvent.consume(b)
            }), Editor.actualSizeLargeImage, mxResources.get("fit"));
            var h = null,
                p = null,
                t = mxUtils.bind(this,
                    function(a) {
                        null != h && (window.clearTimeout(h), h = null);
                        null != p && (window.clearTimeout(p), p = null);
                        h = window.setTimeout(mxUtils.bind(this, function() {
                            mxUtils.setOpacity(this.chromelessToolbar, 0);
                            h = null;
                            p = window.setTimeout(mxUtils.bind(this, function() {
                                this.chromelessToolbar.style.display = "none";
                                p = null
                            }), 600)
                        }), a || 200)
                    }),
                w = mxUtils.bind(this, function(a) {
                    null != h && (window.clearTimeout(h), h = null);
                    null != p && (window.clearTimeout(p), p = null);
                    this.chromelessToolbar.style.display = "";
                    mxUtils.setOpacity(this.chromelessToolbar,
                        a || 30)
                });
            if ("1" == urlParams.layers) {
                this.layersDialog = null;
                var G = g(mxUtils.bind(this, function(b) {
                        if (null != this.layersDialog) this.layersDialog.parentNode.removeChild(this.layersDialog), this.layersDialog = null;
                        else {
                            this.layersDialog = a.createLayersDialog();
                            mxEvent.addListener(this.layersDialog, "mouseleave", mxUtils.bind(this, function() {
                                this.layersDialog.parentNode.removeChild(this.layersDialog);
                                this.layersDialog = null
                            }));
                            var c = G.getBoundingClientRect();
                            mxUtils.setPrefixedStyle(this.layersDialog.style, "borderRadius",
                                "5px");
                            this.layersDialog.style.position = "fixed";
                            this.layersDialog.style.fontFamily = "Helvetica,Arial";
                            this.layersDialog.style.backgroundColor = "#000000";
                            this.layersDialog.style.width = "160px";
                            this.layersDialog.style.padding = "4px 2px 4px 2px";
                            this.layersDialog.style.color = "#ffffff";
                            mxUtils.setOpacity(this.layersDialog, 70);
                            this.layersDialog.style.left = c.left + "px";
                            this.layersDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) + this.chromelessToolbar.offsetHeight + 4 + "px";
                            c = mxUtils.getCurrentStyle(this.editor.graph.container);
                            this.layersDialog.style.zIndex = c.zIndex;
                            document.body.appendChild(this.layersDialog)
                        }
                        mxEvent.consume(b)
                    }), Editor.layersLargeImage, mxResources.get("layers")),
                    B = a.getModel();
                B.addListener(mxEvent.CHANGE, function() {
                    G.style.display = 1 < B.getChildCount(B.root) ? "" : "none"
                })
            }
            "1" != urlParams.openInSameWin && this.addChromelessToolbarItems(g);
            null == this.editor.editButtonLink && null == this.editor.editButtonFunc || g(mxUtils.bind(this, function(b) {
                null != this.editor.editButtonFunc ? this.editor.editButtonFunc() : "_blank" ==
                    this.editor.editButtonLink ? this.editor.editAsNew(this.getEditBlankXml()) : a.openLink(this.editor.editButtonLink, "editWindow");
                mxEvent.consume(b)
            }), Editor.editLargeImage, mxResources.get("edit"));
            if (null != this.lightboxToolbarActions)
                for (q = 0; q < this.lightboxToolbarActions.length; q++) {
                    var C = this.lightboxToolbarActions[q];
                    g(C.fn, C.icon, C.tooltip)
                }
            null != e.refreshBtn && g(mxUtils.bind(this, function(a) {
                    e.refreshBtn.url ? window.location.href = e.refreshBtn.url : window.location.reload();
                    mxEvent.consume(a)
                }), Editor.refreshLargeImage,
                mxResources.get("refresh", null, "Refresh"));
            null != e.fullscreenBtn && window.self !== window.top && g(mxUtils.bind(this, function(b) {
                e.fullscreenBtn.url ? a.openLink(e.fullscreenBtn.url) : a.openLink(window.location.href);
                mxEvent.consume(b)
            }), Editor.fullscreenLargeImage, mxResources.get("openInNewWindow", null, "Open in New Window"));
            (e.closeBtn && window.self === window.top || a.lightbox && ("1" == urlParams.close || this.container != document.body)) && g(mxUtils.bind(this, function(a) {
                "1" == urlParams.close || e.closeBtn ? window.close() :
                    (this.destroy(), mxEvent.consume(a))
            }), Editor.closeLargeImage, mxResources.get("close") + " (Escape)");
            this.chromelessToolbar.style.display = "none";
            a.isViewer() || mxUtils.setPrefixedStyle(this.chromelessToolbar.style, "transform", "translate(-50%,0)");
            a.container.appendChild(this.chromelessToolbar);
            mxEvent.addListener(a.container, mxClient.IS_POINTER ? "pointermove" : "mousemove", mxUtils.bind(this, function(a) {
                mxEvent.isTouchEvent(a) || (mxEvent.isShiftDown(a) || w(30), t())
            }));
            mxEvent.addListener(this.chromelessToolbar,
                mxClient.IS_POINTER ? "pointermove" : "mousemove",
                function(a) {
                    mxEvent.consume(a)
                });
            mxEvent.addListener(this.chromelessToolbar, "mouseenter", mxUtils.bind(this, function(a) {
                mxEvent.isShiftDown(a) ? t() : w(100)
            }));
            mxEvent.addListener(this.chromelessToolbar, "mousemove", mxUtils.bind(this, function(a) {
                mxEvent.isShiftDown(a) ? t() : w(100);
                mxEvent.consume(a)
            }));
            mxEvent.addListener(this.chromelessToolbar, "mouseleave", mxUtils.bind(this, function(a) {
                mxEvent.isTouchEvent(a) || w(30)
            }));
            var H = a.getTolerance();
            a.addMouseListener({
                startX: 0,
                startY: 0,
                scrollLeft: 0,
                scrollTop: 0,
                mouseDown: function(b, c) {
                    this.startX = c.getGraphX();
                    this.startY = c.getGraphY();
                    this.scrollLeft = a.container.scrollLeft;
                    this.scrollTop = a.container.scrollTop
                },
                mouseMove: function(a, b) {},
                mouseUp: function(b, c) {
                    mxEvent.isTouchEvent(c.getEvent()) && Math.abs(this.scrollLeft - a.container.scrollLeft) < H && Math.abs(this.scrollTop - a.container.scrollTop) < H && Math.abs(this.startX - c.getGraphX()) < H && Math.abs(this.startY - c.getGraphY()) < H && (0 < parseFloat(d.chromelessToolbar.style.opacity || 0) ?
                        t() : w(30))
                }
            })
        }
        this.editor.editable || this.addChromelessClickHandler()
    } else if (this.editor.extendCanvas) {
        var I = a.view.validate;
        a.view.validate = function() {
            if (null != this.graph.container && mxUtils.hasScrollbars(this.graph.container)) {
                var a = this.graph.getPagePadding(),
                    b = this.graph.getPageSize();
                this.translate.x = a.x - (this.x0 || 0) * b.width;
                this.translate.y = a.y - (this.y0 || 0) * b.height
            }
            I.apply(this, arguments)
        };
        if (!a.isViewer()) {
            var J = a.sizeDidChange;
            a.sizeDidChange = function() {
                if (null != this.container && mxUtils.hasScrollbars(this.container)) {
                    var b =
                        this.getPageLayout(),
                        c = this.getPagePadding(),
                        d = this.getPageSize(),
                        e = Math.ceil(2 * c.x + b.width * d.width),
                        f = Math.ceil(2 * c.y + b.height * d.height),
                        h = a.minimumGraphSize;
                    if (null == h || h.width != e || h.height != f) a.minimumGraphSize = new mxRectangle(0, 0, e, f);
                    e = c.x - b.x * d.width;
                    c = c.y - b.y * d.height;
                    this.autoTranslate || this.view.translate.x == e && this.view.translate.y == c ? J.apply(this, arguments) : (this.autoTranslate = !0, this.view.x0 = b.x, this.view.y0 = b.y, b = a.view.translate.x, d = a.view.translate.y, a.view.setTranslate(e, c), a.container.scrollLeft +=
                        Math.round((e - b) * a.view.scale), a.container.scrollTop += Math.round((c - d) * a.view.scale), this.autoTranslate = !1)
                } else this.fireEvent(new mxEventObject(mxEvent.SIZE, "bounds", this.getGraphBounds()))
            }
        }
    }
    var u = a.view.getBackgroundPane(),
        x = a.view.getDrawPane();
    a.cumulativeZoomFactor = 1;
    var E = null,
        y = null,
        v = null,
        z = null,
        A = null,
        D = function(c) {
            null != E && window.clearTimeout(E);
            window.setTimeout(function() {
                if (!a.isMouseDown || z) E = window.setTimeout(mxUtils.bind(this, function() {
                    a.isFastZoomEnabled() && (null != a.view.backgroundPageShape &&
                        null != a.view.backgroundPageShape.node && (mxUtils.setPrefixedStyle(a.view.backgroundPageShape.node.style, "transform-origin", null), mxUtils.setPrefixedStyle(a.view.backgroundPageShape.node.style, "transform", null)), x.style.transformOrigin = "", u.style.transformOrigin = "", mxClient.IS_SF ? (x.style.transform = "scale(1)", u.style.transform = "scale(1)", window.setTimeout(function() {
                            x.style.transform = "";
                            u.style.transform = ""
                        }, 0)) : (x.style.transform = "", u.style.transform = ""), a.view.getDecoratorPane().style.opacity = "",
                        a.view.getOverlayPane().style.opacity = "");
                    var c = new mxPoint(a.container.scrollLeft, a.container.scrollTop),
                        e = mxUtils.getOffset(a.container),
                        f = a.view.scale,
                        h = 0,
                        g = 0;
                    null != y && (h = a.container.offsetWidth / 2 - y.x + e.x, g = a.container.offsetHeight / 2 - y.y + e.y);
                    a.zoom(a.cumulativeZoomFactor);
                    a.view.scale != f && (null != v && (h += c.x - v.x, g += c.y - v.y), null != b && d.chromelessResize(!1, null, h * (a.cumulativeZoomFactor - 1), g * (a.cumulativeZoomFactor - 1)), !mxUtils.hasScrollbars(a.container) || 0 == h && 0 == g || (a.container.scrollLeft -= h * (a.cumulativeZoomFactor -
                        1), a.container.scrollTop -= g * (a.cumulativeZoomFactor - 1)));
                    null != A && x.setAttribute("filter", A);
                    a.cumulativeZoomFactor = 1;
                    A = z = y = v = E = null
                }), null != c ? c : a.isFastZoomEnabled() ? d.wheelZoomDelay : d.lazyZoomDelay)
            }, 0)
        },
        F = Date.now();
    a.lazyZoom = function(b, c, e) {
        (c = c || !a.scrollbars) && (y = new mxPoint(a.container.offsetLeft + a.container.clientWidth / 2, a.container.offsetTop + a.container.clientHeight / 2));
        if (!(15 > Date.now() - F)) {
            F = Date.now();
            b ? .15 >= this.view.scale * this.cumulativeZoomFactor ? this.cumulativeZoomFactor *= (this.view.scale +
                .05) / this.view.scale : (this.cumulativeZoomFactor *= this.zoomFactor, this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 20) / 20 / this.view.scale) : .15 >= this.view.scale * this.cumulativeZoomFactor ? this.cumulativeZoomFactor *= (this.view.scale - .05) / this.view.scale : (this.cumulativeZoomFactor /= this.zoomFactor, this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 20) / 20 / this.view.scale);
            this.cumulativeZoomFactor = Math.max(.05, Math.min(this.view.scale * this.cumulativeZoomFactor,
                160)) / this.view.scale;
            if (a.isFastZoomEnabled()) {
                null == A && "" != x.getAttribute("filter") && (A = x.getAttribute("filter"), x.removeAttribute("filter"));
                v = new mxPoint(a.container.scrollLeft, a.container.scrollTop);
                b = c ? a.container.scrollLeft + a.container.clientWidth / 2 : y.x + a.container.scrollLeft - a.container.offsetLeft;
                var h = c ? a.container.scrollTop + a.container.clientHeight / 2 : y.y + a.container.scrollTop - a.container.offsetTop;
                x.style.transformOrigin = b + "px " + h + "px";
                x.style.transform = "scale(" + this.cumulativeZoomFactor +
                    ")";
                u.style.transformOrigin = b + "px " + h + "px";
                u.style.transform = "scale(" + this.cumulativeZoomFactor + ")";
                null != a.view.backgroundPageShape && null != a.view.backgroundPageShape.node && (b = a.view.backgroundPageShape.node, mxUtils.setPrefixedStyle(b.style, "transform-origin", (c ? a.container.clientWidth / 2 + a.container.scrollLeft - b.offsetLeft + "px" : y.x + a.container.scrollLeft - b.offsetLeft - a.container.offsetLeft + "px") + " " + (c ? a.container.clientHeight / 2 + a.container.scrollTop - b.offsetTop + "px" : y.y + a.container.scrollTop - b.offsetTop -
                    a.container.offsetTop + "px")), mxUtils.setPrefixedStyle(b.style, "transform", "scale(" + this.cumulativeZoomFactor + ")"));
                a.view.getDecoratorPane().style.opacity = "0";
                a.view.getOverlayPane().style.opacity = "0";
                null != d.hoverIcons && d.hoverIcons.reset()
            }
            D(e)
        }
    };
    mxEvent.addGestureListeners(a.container, function(a) {
        null != E && window.clearTimeout(E)
    }, null, function(b) {
        1 != a.cumulativeZoomFactor && D(0)
    });
    mxEvent.addListener(a.container, "scroll", function(b) {
        null == E || a.isMouseDown || 1 == a.cumulativeZoomFactor || D(0)
    });
    mxEvent.addMouseWheelListener(mxUtils.bind(this,
        function(b, c, d, e, h) {
            if (null == this.dialogs || 0 == this.dialogs.length)
                if (!a.scrollbars && !d && a.isScrollWheelEvent(b)) d = a.view.getTranslate(), e = 40 / a.view.scale, mxEvent.isShiftDown(b) ? a.view.setTranslate(d.x + (c ? -e : e), d.y) : a.view.setTranslate(d.x, d.y + (c ? e : -e));
                else if (d || a.isZoomWheelEvent(b))
                for (var f = mxEvent.getSource(b); null != f;) {
                    if (f == a.container) return a.tooltipHandler.hideTooltip(), y = null != e && null != h ? new mxPoint(e, h) : new mxPoint(mxEvent.getClientX(b), mxEvent.getClientY(b)), z = d, a.lazyZoom(c), mxEvent.consume(b),
                        !1;
                    f = f.parentNode
                }
        }), a.container);
    a.panningHandler.zoomGraph = function(b) {
        a.cumulativeZoomFactor = b.scale;
        a.lazyZoom(0 < b.scale, !0);
        mxEvent.consume(b)
    }
};
EditorUi.prototype.addChromelessToolbarItems = function(a) {
    a(mxUtils.bind(this, function(a) {
        this.actions.get("print").funct();
        mxEvent.consume(a)
    }), Editor.printLargeImage, mxResources.get("print"))
};
EditorUi.prototype.isPagesEnabled = function() {
    return this.editor.editable || "1" != urlParams["hide-pages"]
};
EditorUi.prototype.createTemporaryGraph = function(a) {
    var b = new Graph(document.createElement("div"));
    b.stylesheet.styles = mxUtils.clone(a.styles);
    b.resetViewOnRootChange = !1;
    b.setConnectable(!1);
    b.gridEnabled = !1;
    b.autoScroll = !1;
    b.setTooltips(!1);
    b.setEnabled(!1);
    b.container.style.visibility = "hidden";
    b.container.style.position = "absolute";
    b.container.style.overflow = "hidden";
    b.container.style.height = "1px";
    b.container.style.width = "1px";
    return b
};
EditorUi.prototype.addChromelessClickHandler = function() {
    var a = urlParams.highlight;
    null != a && 0 < a.length && (a = "#" + a);
    this.editor.graph.addClickHandler(a)
};
EditorUi.prototype.toggleFormatPanel = function(a) {
    a = null != a ? a : 0 == this.formatWidth;
    null != this.format && (this.formatWidth = a ? 240 : 0, this.formatContainer.style.display = a ? "" : "none", this.refresh(), this.format.refresh(), this.fireEvent(new mxEventObject("formatWidthChanged")))
};
EditorUi.prototype.lightboxFit = function(a) {
    if (this.isDiagramEmpty()) this.editor.graph.view.setScale(1);
    else {
        var b = urlParams.border,
            d = 60;
        null != b && (d = parseInt(b));
        this.editor.graph.maxFitScale = this.lightboxMaxFitScale;
        this.editor.graph.fit(d, null, null, null, null, null, a);
        this.editor.graph.maxFitScale = null
    }
};
EditorUi.prototype.isDiagramEmpty = function() {
    var a = this.editor.graph.getModel();
    return 1 == a.getChildCount(a.root) && 0 == a.getChildCount(a.getChildAt(a.root, 0))
};
EditorUi.prototype.isSelectionAllowed = function(a) {
    return "SELECT" == mxEvent.getSource(a).nodeName || "INPUT" == mxEvent.getSource(a).nodeName && mxUtils.isAncestorNode(this.formatContainer, mxEvent.getSource(a))
};
EditorUi.prototype.addBeforeUnloadListener = function() {
    window.onbeforeunload = mxUtils.bind(this, function() {
        return this.onBeforeUnload()
    })
};
EditorUi.prototype.onBeforeUnload = function() {
    if (this.editor.modified) return mxResources.get("allChangesLost")
};
EditorUi.prototype.open = function() {
    try {
        null != window.opener && null != window.opener.openFile && window.opener.openFile.setConsumer(mxUtils.bind(this, function(a, b) {
            try {
                var d = mxUtils.parseXml(a);
                this.editor.setGraphXml(d.documentElement);
                this.editor.setModified(!1);
                this.editor.undoManager.clear();
                null != b && (this.editor.setFilename(b), this.updateDocumentTitle())
            } catch (c) {
                mxUtils.alert(mxResources.get("invalidOrMissingFile") + ": " + c.message)
            }
        }))
    } catch (a) {}
    this.editor.graph.view.validate();
    this.editor.graph.sizeDidChange();
    this.editor.fireEvent(new mxEventObject("resetGraphView"))
};
EditorUi.prototype.showPopupMenu = function(a, b, d, c) {
    this.editor.graph.popupMenuHandler.hideMenu();
    var e = new mxPopupMenu(a);
    e.div.className += " geMenubarMenu";
    e.smartSeparators = !0;
    e.showDisabled = !0;
    e.autoExpand = !0;
    e.hideMenu = mxUtils.bind(this, function() {
        mxPopupMenu.prototype.hideMenu.apply(e, arguments);
        e.destroy()
    });
    e.popup(b, d, null, c);
    this.setCurrentMenu(e)
};
EditorUi.prototype.setCurrentMenu = function(a, b) {
    this.currentMenuElt = b;
    this.currentMenu = a
};
EditorUi.prototype.resetCurrentMenu = function() {
    this.currentMenu = this.currentMenuElt = null
};
EditorUi.prototype.hideCurrentMenu = function() {
    null != this.currentMenu && (this.currentMenu.hideMenu(), this.resetCurrentMenu())
};
EditorUi.prototype.updateDocumentTitle = function() {
    var a = this.editor.getOrCreateFilename();
    null != this.editor.appName && (a += " - " + this.editor.appName);
    document.title = a
};
EditorUi.prototype.createHoverIcons = function() {
    return new HoverIcons(this.editor.graph)
};
EditorUi.prototype.redo = function() {
    try {
        this.editor.graph.isEditing() ? document.execCommand("redo", !1, null) : this.editor.undoManager.redo()
    } catch (a) {}
};
EditorUi.prototype.undo = function() {
    try {
        var a = this.editor.graph;
        if (a.isEditing()) {
            var b = a.cellEditor.textarea.innerHTML;
            document.execCommand("undo", !1, null);
            b == a.cellEditor.textarea.innerHTML && (a.stopEditing(!0), this.editor.undoManager.undo())
        } else this.editor.undoManager.undo()
    } catch (d) {}
};
EditorUi.prototype.canRedo = function() {
    return this.editor.graph.isEditing() || this.editor.undoManager.canRedo()
};
EditorUi.prototype.canUndo = function() {
    return this.editor.graph.isEditing() || this.editor.undoManager.canUndo()
};
EditorUi.prototype.getEditBlankXml = function() {
    return mxUtils.getXml(this.editor.getGraphXml())
};
EditorUi.prototype.getUrl = function(a) {
    a = null != a ? a : window.location.pathname;
    var b = 0 < a.indexOf("?") ? 1 : 0,
        d;
    for (d in urlParams) a = 0 == b ? a + "?" : a + "&", a += d + "=" + urlParams[d], b++;
    return a
};
EditorUi.prototype.setScrollbars = function(a) {
    var b = this.editor.graph,
        d = b.container.style.overflow;
    b.scrollbars = a;
    this.editor.updateGraphComponents();
    d != b.container.style.overflow && (b.container.scrollTop = 0, b.container.scrollLeft = 0, b.view.scaleAndTranslate(1, 0, 0), this.resetScrollbars());
    this.fireEvent(new mxEventObject("scrollbarsChanged"))
};
EditorUi.prototype.hasScrollbars = function() {
    return this.editor.graph.scrollbars
};
EditorUi.prototype.resetScrollbars = function() {
    var a = this.editor.graph;
    if (!this.editor.extendCanvas) a.container.scrollTop = 0, a.container.scrollLeft = 0, mxUtils.hasScrollbars(a.container) || a.view.setTranslate(0, 0);
    else if (!this.editor.isChromelessView())
        if (mxUtils.hasScrollbars(a.container))
            if (a.pageVisible) {
                var b = a.getPagePadding();
                a.container.scrollTop = Math.floor(b.y - this.editor.initialTopSpacing) - 1;
                a.container.scrollLeft = Math.floor(Math.min(b.x, (a.container.scrollWidth - a.container.clientWidth) / 2)) -
                    1;
                b = a.getGraphBounds();
                0 < b.width && 0 < b.height && (b.x > a.container.scrollLeft + .9 * a.container.clientWidth && (a.container.scrollLeft = Math.min(b.x + b.width - a.container.clientWidth, b.x - 10)), b.y > a.container.scrollTop + .9 * a.container.clientHeight && (a.container.scrollTop = Math.min(b.y + b.height - a.container.clientHeight, b.y - 10)))
            } else {
                b = a.getGraphBounds();
                var d = Math.max(b.width, a.scrollTileSize.width * a.view.scale);
                a.container.scrollTop = Math.floor(Math.max(0, b.y - Math.max(20, (a.container.clientHeight - Math.max(b.height,
                    a.scrollTileSize.height * a.view.scale)) / 4)));
                a.container.scrollLeft = Math.floor(Math.max(0, b.x - Math.max(0, (a.container.clientWidth - d) / 2)))
            }
    else {
        b = mxRectangle.fromRectangle(a.pageVisible ? a.view.getBackgroundPageBounds() : a.getGraphBounds());
        d = a.view.translate;
        var c = a.view.scale;
        b.x = b.x / c - d.x;
        b.y = b.y / c - d.y;
        b.width /= c;
        b.height /= c;
        a.view.setTranslate(Math.floor(Math.max(0, (a.container.clientWidth - b.width) / 2) - b.x + 2), Math.floor((a.pageVisible ? 0 : Math.max(0, (a.container.clientHeight - b.height) / 4)) - b.y + 1))
    }
};
EditorUi.prototype.setPageVisible = function(a) {
    var b = this.editor.graph,
        d = mxUtils.hasScrollbars(b.container),
        c = 0,
        e = 0;
    d && (c = b.view.translate.x * b.view.scale - b.container.scrollLeft, e = b.view.translate.y * b.view.scale - b.container.scrollTop);
    b.pageVisible = a;
    b.pageBreaksVisible = a;
    b.preferPageSize = a;
    b.view.validateBackground();
    d && (a = b.getSelectionCells(), b.clearSelection(), b.setSelectionCells(a));
    b.sizeDidChange();
    d && (b.container.scrollLeft = b.view.translate.x * b.view.scale - c, b.container.scrollTop = b.view.translate.y *
        b.view.scale - e);
    this.fireEvent(new mxEventObject("pageViewChanged"))
};

function ChangeGridColor(a, b) {
    this.ui = a;
    this.color = b
}
ChangeGridColor.prototype.execute = function() {
    var a = this.ui.editor.graph.view.gridColor;
    this.ui.setGridColor(this.color);
    this.color = a
};
(function() {
    var a = new mxObjectCodec(new ChangeGridColor, ["ui"]);
    mxCodecRegistry.register(a)
})();

function ChangePageSetup(a, b, d, c, e) {
    this.ui = a;
    this.previousColor = this.color = b;
    this.previousImage = this.image = d;
    this.previousFormat = this.format = c;
    this.previousPageScale = this.pageScale = e;
    this.ignoreImage = this.ignoreColor = !1
}
ChangePageSetup.prototype.execute = function() {
    var a = this.ui.editor.graph;
    if (!this.ignoreColor) {
        this.color = this.previousColor;
        var b = a.background;
        this.ui.setBackgroundColor(this.previousColor);
        this.previousColor = b
    }
    this.ignoreImage || (this.image = this.previousImage, b = a.backgroundImage, this.ui.setBackgroundImage(this.previousImage), this.previousImage = b);
    null != this.previousFormat && (this.format = this.previousFormat, b = a.pageFormat, this.previousFormat.width != b.width || this.previousFormat.height != b.height) && (this.ui.setPageFormat(this.previousFormat),
        this.previousFormat = b);
    null != this.foldingEnabled && this.foldingEnabled != this.ui.editor.graph.foldingEnabled && (this.ui.setFoldingEnabled(this.foldingEnabled), this.foldingEnabled = !this.foldingEnabled);
    null != this.previousPageScale && (a = this.ui.editor.graph.pageScale, this.previousPageScale != a && (this.ui.setPageScale(this.previousPageScale), this.previousPageScale = a))
};
(function() {
    var a = new mxObjectCodec(new ChangePageSetup, ["ui", "previousColor", "previousImage", "previousFormat", "previousPageScale"]);
    a.afterDecode = function(a, d, c) {
        c.previousColor = c.color;
        c.previousImage = c.image;
        c.previousFormat = c.format;
        c.previousPageScale = c.pageScale;
        null != c.foldingEnabled && (c.foldingEnabled = !c.foldingEnabled);
        return c
    };
    mxCodecRegistry.register(a)
})();
EditorUi.prototype.setBackgroundColor = function(a) {
    this.editor.graph.background = a;
    this.editor.graph.view.validateBackground();
    this.fireEvent(new mxEventObject("backgroundColorChanged"))
};
EditorUi.prototype.setFoldingEnabled = function(a) {
    this.editor.graph.foldingEnabled = a;
    this.editor.graph.view.revalidate();
    this.fireEvent(new mxEventObject("foldingEnabledChanged"))
};
EditorUi.prototype.setPageFormat = function(a) {
    this.editor.graph.pageFormat = a;
    this.editor.graph.pageVisible ? (this.editor.graph.view.validateBackground(), this.editor.graph.sizeDidChange()) : this.actions.get("pageView").funct();
    this.fireEvent(new mxEventObject("pageFormatChanged"))
};
EditorUi.prototype.setPageScale = function(a) {
    this.editor.graph.pageScale = a;
    this.editor.graph.pageVisible ? (this.editor.graph.view.validateBackground(), this.editor.graph.sizeDidChange()) : this.actions.get("pageView").funct();
    this.fireEvent(new mxEventObject("pageScaleChanged"))
};
EditorUi.prototype.setGridColor = function(a) {
    this.editor.graph.view.gridColor = a;
    this.editor.graph.view.validateBackground();
    this.fireEvent(new mxEventObject("gridColorChanged"))
};
EditorUi.prototype.addUndoListener = function() {
    var a = this.actions.get("undo"),
        b = this.actions.get("redo"),
        d = this.editor.undoManager,
        c = mxUtils.bind(this, function() {
            a.setEnabled(this.canUndo());
            b.setEnabled(this.canRedo())
        });
    d.addListener(mxEvent.ADD, c);
    d.addListener(mxEvent.UNDO, c);
    d.addListener(mxEvent.REDO, c);
    d.addListener(mxEvent.CLEAR, c);
    var e = this.editor.graph.cellEditor.startEditing;
    this.editor.graph.cellEditor.startEditing = function() {
        e.apply(this, arguments);
        c()
    };
    var g = this.editor.graph.cellEditor.stopEditing;
    this.editor.graph.cellEditor.stopEditing = function(a, b) {
        g.apply(this, arguments);
        c()
    };
    c()
};
EditorUi.prototype.updateActionStates = function() {
    var a = this.editor.graph,
        b = !a.isSelectionEmpty(),
        d = !1,
        c = !1,
        e = !1,
        g = a.getSelectionCells();
    if (null != g)
        for (var k = 0; k < g.length; k++) {
            var l = g[k];
            a.getModel().isEdge(l) && (e = !0);
            a.getModel().isVertex(l) && (d = !0, 0 < a.getModel().getChildCount(l) || a.isContainer(l)) && (c = !0);
            if (e && d) break
        }
    g = "cut copy bold italic underline delete duplicate editStyle editTooltip editLink backgroundColor borderColor edit toFront toBack lockUnlock solid dashed pasteSize dotted fillColor gradientColor shadow fontColor formattedText rounded toggleRounded sharp strokeColor".split(" ");
    for (k =
        0; k < g.length; k++) this.actions.get(g[k]).setEnabled(b);
    this.actions.get("setAsDefaultStyle").setEnabled(1 == a.getSelectionCount());
    this.actions.get("clearWaypoints").setEnabled(!a.isSelectionEmpty());
    this.actions.get("copySize").setEnabled(1 == a.getSelectionCount());
    this.actions.get("turn").setEnabled(!a.isSelectionEmpty());
    this.actions.get("curved").setEnabled(e);
    this.actions.get("rotation").setEnabled(d);
    this.actions.get("wordWrap").setEnabled(d);
    this.actions.get("autosize").setEnabled(d);
    e = d && 1 ==
        a.getSelectionCount();
    this.actions.get("group").setEnabled(1 < a.getSelectionCount() || e && !a.isContainer(a.getSelectionCell()));
    this.actions.get("ungroup").setEnabled(c);
    this.actions.get("removeFromGroup").setEnabled(e && a.getModel().isVertex(a.getModel().getParent(a.getSelectionCell())));
    a.view.getState(a.getSelectionCell());
    this.menus.get("navigation").setEnabled(b || null != a.view.currentRoot);
    this.actions.get("collapsible").setEnabled(d && (a.isContainer(a.getSelectionCell()) || 0 < a.model.getChildCount(a.getSelectionCell())));
    this.actions.get("home").setEnabled(null != a.view.currentRoot);
    this.actions.get("exitGroup").setEnabled(null != a.view.currentRoot);
    this.actions.get("enterGroup").setEnabled(1 == a.getSelectionCount() && a.isValidRoot(a.getSelectionCell()));
    b = 1 == a.getSelectionCount() && a.isCellFoldable(a.getSelectionCell());
    this.actions.get("expand").setEnabled(b);
    this.actions.get("collapse").setEnabled(b);
    this.actions.get("editLink").setEnabled(1 == a.getSelectionCount());
    this.actions.get("openLink").setEnabled(1 == a.getSelectionCount() &&
        null != a.getLinkForCell(a.getSelectionCell()));
    this.actions.get("guides").setEnabled(a.isEnabled());
    this.actions.get("grid").setEnabled(!this.editor.chromeless || this.editor.editable);
    b = a.isEnabled() && !a.isCellLocked(a.getDefaultParent());
    this.menus.get("layout").setEnabled(b);
    this.menus.get("insert").setEnabled(b);
    this.menus.get("direction").setEnabled(b && d);
    this.menus.get("align").setEnabled(b && d && 1 < a.getSelectionCount());
    this.menus.get("distribute").setEnabled(b && d && 1 < a.getSelectionCount());
    this.actions.get("selectVertices").setEnabled(b);
    this.actions.get("selectEdges").setEnabled(b);
    this.actions.get("selectAll").setEnabled(b);
    this.actions.get("selectNone").setEnabled(b);
    this.updatePasteActionStates()
};
EditorUi.prototype.zeroOffset = new mxPoint(0, 0);
EditorUi.prototype.getDiagramContainerOffset = function() {
    return this.zeroOffset
};
EditorUi.prototype.refresh = function(a) {
    a = null != a ? a : !0;
    var b = this.container.clientWidth,
        d = this.container.clientHeight;
    this.container == document.body && (b = document.body.clientWidth || document.documentElement.clientWidth, d = document.documentElement.clientHeight);
    var c = 0;
    mxClient.IS_IOS && !window.navigator.standalone && window.innerHeight != document.documentElement.clientHeight && (c = document.documentElement.clientHeight - window.innerHeight, window.scrollTo(0, 0));
    var e = Math.max(0, Math.min(this.hsplitPosition, b - this.splitSize -
            20)),
        g = 0;
    null != this.menubar && (this.menubarContainer.style.height = this.menubarHeight + "px", g += this.menubarHeight);
    null != this.toolbar && (this.toolbarContainer.style.top = this.menubarHeight + "px", this.toolbarContainer.style.height = this.toolbarHeight + "px", g += this.toolbarHeight);
    0 < g && (g += 1);
    b = 0;
    if (null != this.sidebarFooterContainer) {
        var k = this.footerHeight + c;
        b = Math.max(0, Math.min(d - g - k, this.sidebarFooterHeight));
        this.sidebarFooterContainer.style.width = e + "px";
        this.sidebarFooterContainer.style.height = b + "px";
        this.sidebarFooterContainer.style.bottom = k + "px"
    }
    d = null != this.format ? this.formatWidth : 0;
    this.sidebarContainer.style.top = g + "px";
    this.sidebarContainer.style.width = e + "px";
    this.formatContainer.style.top = g + "px";
    this.formatContainer.style.width = d + "px";
    this.formatContainer.style.display = null != this.format ? "" : "none";
    k = this.getDiagramContainerOffset();
    var l = null != this.hsplit.parentNode ? e + this.splitSize : 0;
    this.diagramContainer.style.left = l + k.x + "px";
    this.diagramContainer.style.top = g + k.y + "px";
    this.footerContainer.style.height =
        this.footerHeight + "px";
    this.hsplit.style.top = this.sidebarContainer.style.top;
    this.hsplit.style.bottom = this.footerHeight + c + "px";
    this.hsplit.style.left = e + "px";
    this.footerContainer.style.display = 0 == this.footerHeight ? "none" : "";
    null != this.tabContainer && (this.tabContainer.style.left = l + "px");
    0 < this.footerHeight && (this.footerContainer.style.bottom = c + "px");
    this.diagramContainer.style.right = d + "px";
    e = 0;
    null != this.tabContainer && (this.tabContainer.style.bottom = this.footerHeight + c + "px", this.tabContainer.style.right =
        this.diagramContainer.style.right, e = this.tabContainer.clientHeight);
    this.sidebarContainer.style.bottom = this.footerHeight + b + c + "px";
    this.formatContainer.style.bottom = this.footerHeight + c + "px";
    this.diagramContainer.style.bottom = this.footerHeight + c + e + "px";
    a && this.editor.graph.sizeDidChange()
};
EditorUi.prototype.createTabContainer = function() {
    return null
};
EditorUi.prototype.createDivs = function() {
    this.menubarContainer = this.createDiv("geMenubarContainer");
    this.toolbarContainer = this.createDiv("geToolbarContainer");
    this.sidebarContainer = this.createDiv("geSidebarContainer");
    this.formatContainer = this.createDiv("geSidebarContainer geFormatContainer");
    this.diagramContainer = this.createDiv("geDiagramContainer");
    this.footerContainer = this.createDiv("geFooterContainer");
    this.hsplit = this.createDiv("geHsplit");
    this.hsplit.setAttribute("title", mxResources.get("collapseExpand"));
    this.menubarContainer.style.top = "0px";
    this.menubarContainer.style.left = "0px";
    this.menubarContainer.style.right = "0px";
    this.toolbarContainer.style.left = "0px";
    this.toolbarContainer.style.right = "0px";
    this.sidebarContainer.style.left = "0px";
    this.formatContainer.style.right = "0px";
    this.formatContainer.style.zIndex = "1";
    this.diagramContainer.style.right = (null != this.format ? this.formatWidth : 0) + "px";
    this.footerContainer.style.left = "0px";
    this.footerContainer.style.right = "0px";
    this.footerContainer.style.bottom =
        "0px";
    this.footerContainer.style.zIndex = mxPopupMenu.prototype.zIndex - 2;
    this.hsplit.style.width = this.splitSize + "px";
    if (this.sidebarFooterContainer = this.createSidebarFooterContainer()) this.sidebarFooterContainer.style.left = "0px";
    this.editor.chromeless ? this.diagramContainer.style.border = "none" : this.tabContainer = this.createTabContainer()
};
EditorUi.prototype.createSidebarFooterContainer = function() {
    return null
};
EditorUi.prototype.createUi = function() {
    this.menubar = this.editor.chromeless ? null : this.menus.createMenubar(this.createDiv("geMenubar"));
    null != this.menubar && this.menubarContainer.appendChild(this.menubar.container);
    null != this.menubar && (this.statusContainer = this.createStatusContainer(), this.editor.addListener("statusChanged", mxUtils.bind(this, function() {
        this.setStatusText(this.editor.getStatus())
    })), this.setStatusText(this.editor.getStatus()), this.menubar.container.appendChild(this.statusContainer), this.container.appendChild(this.menubarContainer));
    this.sidebar = this.editor.chromeless ? null : this.createSidebar(this.sidebarContainer);
    null != this.sidebar && this.container.appendChild(this.sidebarContainer);
    this.format = this.editor.chromeless || !this.formatEnabled ? null : this.createFormat(this.formatContainer);
    null != this.format && this.container.appendChild(this.formatContainer);
    var a = this.editor.chromeless ? null : this.createFooter();
    null != a && (this.footerContainer.appendChild(a), this.container.appendChild(this.footerContainer));
    null != this.sidebar && this.sidebarFooterContainer &&
        this.container.appendChild(this.sidebarFooterContainer);
    this.container.appendChild(this.diagramContainer);
    null != this.container && null != this.tabContainer && this.container.appendChild(this.tabContainer);
    this.toolbar = this.editor.chromeless ? null : this.createToolbar(this.createDiv("geToolbar"));
    null != this.toolbar && (this.toolbarContainer.appendChild(this.toolbar.container), this.container.appendChild(this.toolbarContainer));
    null != this.sidebar && (this.container.appendChild(this.hsplit), this.addSplitHandler(this.hsplit,
        !0, 0, mxUtils.bind(this, function(a) {
            this.hsplitPosition = a;
            this.refresh()
        })))
};
EditorUi.prototype.createStatusContainer = function() {
    var a = document.createElement("a");
    a.className = "geItem geStatus";
    return a
};
EditorUi.prototype.setStatusText = function(a) {
    this.statusContainer.innerHTML = a
};
EditorUi.prototype.createToolbar = function(a) {
    return new Toolbar(this, a)
};
EditorUi.prototype.createSidebar = function(a) {
    return new Sidebar(this, a)
};
EditorUi.prototype.createFormat = function(a) {
    return new Format(this, a)
};
EditorUi.prototype.createFooter = function() {
    return this.createDiv("geFooter")
};
EditorUi.prototype.createDiv = function(a) {
    var b = document.createElement("div");
    b.className = a;
    return b
};
EditorUi.prototype.addSplitHandler = function(a, b, d, c) {
    function e(a) {
        if (null != k) {
            var e = new mxPoint(mxEvent.getClientX(a), mxEvent.getClientY(a));
            c(Math.max(0, l + (b ? e.x - k.x : k.y - e.y) - d));
            mxEvent.consume(a);
            l != n() && (m = !0, f = null)
        }
    }

    function g(a) {
        e(a);
        k = l = null
    }
    var k = null,
        l = null,
        m = !0,
        f = null;
    mxClient.IS_POINTER && (a.style.touchAction = "none");
    var n = mxUtils.bind(this, function() {
        var c = parseInt(b ? a.style.left : a.style.bottom);
        b || (c = c + d - this.footerHeight);
        return c
    });
    mxEvent.addGestureListeners(a, function(a) {
        k = new mxPoint(mxEvent.getClientX(a),
            mxEvent.getClientY(a));
        l = n();
        m = !1;
        mxEvent.consume(a)
    });
    mxEvent.addListener(a, "click", mxUtils.bind(this, function(a) {
        if (!m && this.hsplitClickEnabled) {
            var b = null != f ? f - d : 0;
            f = n();
            c(b);
            mxEvent.consume(a)
        }
    }));
    mxEvent.addGestureListeners(document, null, e, g);
    this.destroyFunctions.push(function() {
        mxEvent.removeGestureListeners(document, null, e, g)
    })
};
EditorUi.prototype.handleError = function(a, b, d, c, e) {
    a = null != a && null != a.error ? a.error : a;
    if (null != a || null != b) {
        e = mxUtils.htmlEntities(mxResources.get("unknownError"));
        var g = mxResources.get("ok");
        b = null != b ? b : mxResources.get("error");
        null != a && null != a.message && (e = mxUtils.htmlEntities(a.message));
        this.showError(b, e, g, d, null, null, null, null, null, null, null, null, c ? d : null)
    } else null != d && d()
};
EditorUi.prototype.showError = function(a, b, d, c, e, g, k, l, m, f, n, q, h) {
    a = new ErrorDialog(this, a, b, d || mxResources.get("ok"), c, e, g, k, q, l, m);
    b = Math.ceil(null != b ? b.length / 50 : 1);
    this.showDialog(a.container, f || 340, n || 100 + 20 * b, !0, !1, h);
    a.init()
};
EditorUi.prototype.showDialog = function(a, b, d, c, e, g, k, l, m, f) {
    this.editor.graph.tooltipHandler.resetTimer();
    this.editor.graph.tooltipHandler.hideTooltip();
    null == this.dialogs && (this.dialogs = []);
    this.dialog = new Dialog(this, a, b, d, c, e, g, k, l, m, f);
    this.dialogs.push(this.dialog)
};
EditorUi.prototype.hideDialog = function(a, b, d) {
    null != this.dialogs && 0 < this.dialogs.length && (null == d || d == this.dialog.container.firstChild) && (d = this.dialogs.pop(), 0 == d.close(a, b) ? this.dialogs.push(d) : (this.dialog = 0 < this.dialogs.length ? this.dialogs[this.dialogs.length - 1] : null, this.editor.fireEvent(new mxEventObject("hideDialog")), null == this.dialog && "hidden" != this.editor.graph.container.style.visibility && window.setTimeout(mxUtils.bind(this, function() {
        this.editor.graph.isEditing() && null != this.editor.graph.cellEditor.textarea ?
            this.editor.graph.cellEditor.textarea.focus() : (mxUtils.clearSelection(), this.editor.graph.container.focus())
    }), 0)))
};
EditorUi.prototype.ctrlEnter = function() {
    var a = this.editor.graph;
    if (a.isEnabled()) try {
        for (var b = a.getSelectionCells(), d = new mxDictionary, c = [], e = 0; e < b.length; e++) {
            var g = a.isTableCell(b[e]) ? a.model.getParent(b[e]) : b[e];
            null == g || d.get(g) || (d.put(g, !0), c.push(g))
        }
        a.setSelectionCells(a.duplicateCells(c, !1))
    } catch (k) {
        this.handleError(k)
    }
};
EditorUi.prototype.pickColor = function(a, b) {
    var d = this.editor.graph,
        c = d.cellEditor.saveSelection(),
        e = 230 + 17 * (Math.ceil(ColorDialog.prototype.presetColors.length / 12) + Math.ceil(ColorDialog.prototype.defaultColors.length / 12));
    a = new ColorDialog(this, a || "none", function(a) {
        d.cellEditor.restoreSelection(c);
        b(a)
    }, function() {
        d.cellEditor.restoreSelection(c)
    });
    this.showDialog(a.container, 230, e, !0, !1);
    a.init()
};
EditorUi.prototype.openFile = function() {
    window.openFile = new OpenFile(mxUtils.bind(this, function(a) {
        this.hideDialog(a)
    }));
    this.showDialog((new OpenDialog(this)).container, Editor.useLocalStorage ? 640 : 320, Editor.useLocalStorage ? 480 : 220, !0, !0, function() {
        window.openFile = null
    })
};
EditorUi.prototype.extractGraphModelFromHtml = function(a) {
    var b = null;
    try {
        var d = a.indexOf("&lt;mxGraphModel ");
        if (0 <= d) {
            var c = a.lastIndexOf("&lt;/mxGraphModel&gt;");
            c > d && (b = a.substring(d, c + 21).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\\&quot;/g, '"').replace(/\n/g, ""))
        }
    } catch (e) {}
    return b
};
EditorUi.prototype.readGraphModelFromClipboard = function(a) {
    this.readGraphModelFromClipboardWithType(mxUtils.bind(this, function(b) {
        null != b ? a(b) : this.readGraphModelFromClipboardWithType(mxUtils.bind(this, function(b) {
            if (null != b) {
                var c = decodeURIComponent(b);
                this.isCompatibleString(c) && (b = c)
            }
            a(b)
        }), "text")
    }), "html")
};
EditorUi.prototype.readGraphModelFromClipboardWithType = function(a, b) {
    navigator.clipboard.read().then(mxUtils.bind(this, function(d) {
        if (null != d && 0 < d.length && "html" == b && 0 <= mxUtils.indexOf(d[0].types, "text/html")) d[0].getType("text/html").then(mxUtils.bind(this, function(b) {
            b.text().then(mxUtils.bind(this, function(b) {
                try {
                    var c = this.parseHtmlData(b),
                        d = "text/plain" != c.getAttribute("data-type") ? c.innerHTML : mxUtils.trim(null == c.innerText ? mxUtils.getTextContent(c) : c.innerText);
                    try {
                        var e = d.lastIndexOf("%3E");
                        0 <= e && e < d.length - 3 && (d = d.substring(0, e + 3))
                    } catch (n) {}
                    try {
                        var m = c.getElementsByTagName("span"),
                            f = null != m && 0 < m.length ? mxUtils.trim(decodeURIComponent(m[0].textContent)) : decodeURIComponent(d);
                        this.isCompatibleString(f) && (d = f)
                    } catch (n) {}
                } catch (n) {}
                a(this.isCompatibleString(d) ? d : null)
            }))["catch"](function(b) {
                a(null)
            })
        }))["catch"](function(b) {
            a(null)
        });
        else if (null != d && 0 < d.length && "text" == b && 0 <= mxUtils.indexOf(d[0].types, "text/plain")) d[0].getType("text/plain").then(function(b) {
            b.text().then(function(b) {
                a(b)
            })["catch"](function() {
                a(null)
            })
        })["catch"](function() {
            a(null)
        });
        else a(null)
    }))["catch"](function(b) {
        a(null)
    })
};
EditorUi.prototype.parseHtmlData = function(a) {
    var b = null;
    if (null != a && 0 < a.length) {
        var d = "<meta " == a.substring(0, 6);
        b = document.createElement("div");
        b.innerHTML = (d ? '<meta charset="utf-8">' : "") + this.editor.graph.sanitizeHtml(a);
        asHtml = !0;
        a = b.getElementsByTagName("style");
        if (null != a)
            for (; 0 < a.length;) a[0].parentNode.removeChild(a[0]);
        null != b.firstChild && b.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT && null != b.firstChild.nextSibling && b.firstChild.nextSibling.nodeType == mxConstants.NODETYPE_ELEMENT && "META" ==
            b.firstChild.nodeName && "A" == b.firstChild.nextSibling.nodeName && null == b.firstChild.nextSibling.nextSibling && (a = null == b.firstChild.nextSibling.innerText ? mxUtils.getTextContent(b.firstChild.nextSibling) : b.firstChild.nextSibling.innerText, a == b.firstChild.nextSibling.getAttribute("href") && (mxUtils.setTextContent(b, a), asHtml = !1));
        d = d && null != b.firstChild ? b.firstChild.nextSibling : b.firstChild;
        null != d && null == d.nextSibling && d.nodeType == mxConstants.NODETYPE_ELEMENT && "IMG" == d.nodeName ? (a = d.getAttribute("src"),
            null != a && ("data:image/png;base64," == a.substring(0, 22) && (d = this.extractGraphModelFromPng(a), null != d && 0 < d.length && (a = d)), mxUtils.setTextContent(b, a), asHtml = !1)) : (d = b.getElementsByTagName("img"), 1 == d.length && (d = d[0], a = d.getAttribute("src"), null != a && d.parentNode == b && 1 == b.children.length && ("data:image/png;base64," == a.substring(0, 22) && (d = this.extractGraphModelFromPng(a), null != d && 0 < d.length && (a = d)), mxUtils.setTextContent(b, a), asHtml = !1)));
        asHtml && Graph.removePasteFormatting(b)
    }
    asHtml || b.setAttribute("data-type",
        "text/plain");
    return b
};
EditorUi.prototype.extractGraphModelFromEvent = function(a) {
    var b = null,
        d = null;
    null != a && (a = null != a.dataTransfer ? a.dataTransfer : a.clipboardData, null != a && (10 == document.documentMode || 11 == document.documentMode ? d = a.getData("Text") : (d = 0 <= mxUtils.indexOf(a.types, "text/html") ? a.getData("text/html") : null, mxUtils.indexOf(a.types, null == d || 0 == d.length) && (d = a.getData("text/plain"))), null != d && (d = Graph.zapGremlins(mxUtils.trim(d)), a = this.extractGraphModelFromHtml(d), null != a && (d = a))));
    null != d && this.isCompatibleString(d) &&
        (b = d);
    return b
};
EditorUi.prototype.isCompatibleString = function(a) {
    return !1
};
EditorUi.prototype.saveFile = function(a) {
    a || null == this.editor.filename ? (a = new FilenameDialog(this, this.editor.getOrCreateFilename(), mxResources.get("save"), mxUtils.bind(this, function(a) {
        this.save(a)
    }), null, mxUtils.bind(this, function(a) {
        if (null != a && 0 < a.length) return !0;
        mxUtils.confirm(mxResources.get("invalidName"));
        return !1
    })), this.showDialog(a.container, 300, 100, !0, !0), a.init()) : this.save(this.editor.getOrCreateFilename())
};
EditorUi.prototype.save = function(a) {
    if (null != a) {
        this.editor.graph.isEditing() && this.editor.graph.stopEditing();
        var b = mxUtils.getXml(this.editor.getGraphXml());
        try {
            if (Editor.useLocalStorage) {
                if (null != localStorage.getItem(a) && !mxUtils.confirm(mxResources.get("replaceIt", [a]))) return;
                localStorage.setItem(a, b);
                this.editor.setStatus(mxUtils.htmlEntities(mxResources.get("saved")) + " " + new Date)
            } else if (b.length < MAX_REQUEST_SIZE)(new mxXmlRequest(SAVE_URL, "filename=" + encodeURIComponent(a) + "&xml=" + encodeURIComponent(b))).simulate(document,
                "_blank");
            else {
                mxUtils.alert(mxResources.get("drawingTooLarge"));
                mxUtils.popup(b);
                return
            }
            this.editor.setModified(!1);
            this.editor.setFilename(a);
            this.updateDocumentTitle()
        } catch (d) {
            this.editor.setStatus(mxUtils.htmlEntities(mxResources.get("errorSavingFile")))
        }
    }
};
EditorUi.prototype.executeLayout = function(a, b, d) {
    var c = this.editor.graph;
    if (c.isEnabled()) {
        c.getModel().beginUpdate();
        try {
            a()
        } catch (e) {
            throw e;
        } finally {
            this.allowAnimation && b && (null == navigator.userAgent || 0 > navigator.userAgent.indexOf("Camino")) ? (a = new mxMorphing(c), a.addListener(mxEvent.DONE, mxUtils.bind(this, function() {
                c.getModel().endUpdate();
                null != d && d()
            })), a.startAnimation()) : (c.getModel().endUpdate(), null != d && d())
        }
    }
};
EditorUi.prototype.showImageDialog = function(a, b, d, c) {
    c = this.editor.graph.cellEditor;
    var e = c.saveSelection(),
        g = mxUtils.prompt(a, b);
    c.restoreSelection(e);
    if (null != g && 0 < g.length) {
        var k = new Image;
        k.onload = function() {
            d(g, k.width, k.height)
        };
        k.onerror = function() {
            d(null);
            mxUtils.alert(mxResources.get("fileNotFound"))
        };
        k.src = g
    } else d(null)
};
EditorUi.prototype.showLinkDialog = function(a, b, d) {
    a = new LinkDialog(this, a, b, d);
    this.showDialog(a.container, 420, 90, !0, !0);
    a.init()
};
EditorUi.prototype.showDataDialog = function(a) {
    null != a && (a = new EditDataDialog(this, a), this.showDialog(a.container, 480, 420, !0, !1, null, !1), a.init())
};
EditorUi.prototype.showBackgroundImageDialog = function(a, b) {
    a = null != a ? a : mxUtils.bind(this, function(a) {
        a = new ChangePageSetup(this, null, a);
        a.ignoreColor = !0;
        this.editor.graph.model.execute(a)
    });
    var d = mxUtils.prompt(mxResources.get("backgroundImage"), null != b ? b.src : "");
    null != d && 0 < d.length ? (b = new Image, b.onload = function() {
        a(new mxImage(d, b.width, b.height), !1)
    }, b.onerror = function() {
        a(null, !0);
        mxUtils.alert(mxResources.get("fileNotFound"))
    }, b.src = d) : a(null)
};
EditorUi.prototype.setBackgroundImage = function(a) {
    this.editor.graph.setBackgroundImage(a);
    this.editor.graph.view.validateBackgroundImage();
    this.fireEvent(new mxEventObject("backgroundImageChanged"))
};
EditorUi.prototype.confirm = function(a, b, d) {
    mxUtils.confirm(a) ? null != b && b() : null != d && d()
};
EditorUi.prototype.createOutline = function(a) {
    var b = new mxOutline(this.editor.graph);
    b.border = 20;
    mxEvent.addListener(window, "resize", function() {
        b.update()
    });
    this.addListener("pageFormatChanged", function() {
        b.update()
    });
    return b
};
EditorUi.prototype.altShiftActions = {
    67: "clearWaypoints",
    65: "connectionArrows",
    76: "editLink",
    80: "connectionPoints",
    84: "editTooltip",
    86: "pasteSize",
    88: "copySize",
    66: "copyData",
    69: "pasteData"
};
EditorUi.prototype.createKeyHandler = function(a) {
    function b(a, b, d) {
        k.push(function() {
            if (!c.isSelectionEmpty() && c.isEnabled())
                if (b = null != b ? b : 1, d) {
                    c.getModel().beginUpdate();
                    try {
                        for (var e = c.getSelectionCells(), f = 0; f < e.length; f++)
                            if (c.getModel().isVertex(e[f]) && c.isCellResizable(e[f])) {
                                var h = c.getCellGeometry(e[f]);
                                null != h && (h = h.clone(), 37 == a ? h.width = Math.max(0, h.width - b) : 38 == a ? h.height = Math.max(0, h.height - b) : 39 == a ? h.width += b : 40 == a && (h.height += b), c.getModel().setGeometry(e[f], h))
                            }
                    } finally {
                        c.getModel().endUpdate()
                    }
                } else {
                    var g =
                        c.getSelectionCell();
                    h = c.model.getParent(g);
                    e = null;
                    1 == c.getSelectionCount() && c.model.isVertex(g) && null != c.layoutManager && !c.isCellLocked(g) && (e = c.layoutManager.getLayout(h));
                    if (null != e && e.constructor == mxStackLayout) e = h.getIndex(g), 37 == a || 38 == a ? c.model.add(h, g, Math.max(0, e - 1)) : (39 == a || 40 == a) && c.model.add(h, g, Math.min(c.model.getChildCount(h), e + 1));
                    else {
                        e = c.getMovableCells(c.getSelectionCells());
                        g = [];
                        for (f = 0; f < e.length; f++) h = c.getCurrentCellStyle(e[f]), "1" == mxUtils.getValue(h, "part", "0") ? (h = c.model.getParent(e[f]),
                            c.model.isVertex(h) && 0 > mxUtils.indexOf(e, h) && g.push(h)) : g.push(e[f]);
                        0 < g.length && (e = h = 0, 37 == a ? h = -b : 38 == a ? e = -b : 39 == a ? h = b : 40 == a && (e = b), c.moveCells(g, h, e))
                    }
                }
        });
        null != l && window.clearTimeout(l);
        l = window.setTimeout(function() {
            if (0 < k.length) {
                c.getModel().beginUpdate();
                try {
                    for (var a = 0; a < k.length; a++) k[a]();
                    k = []
                } finally {
                    c.getModel().endUpdate()
                }
            }
        }, 200)
    }
    var d = this,
        c = this.editor.graph,
        e = new mxKeyHandler(c),
        g = e.isEventIgnored;
    e.isEventIgnored = function(a) {
        return !(mxEvent.isShiftDown(a) && 9 == a.keyCode) && (!this.isControlDown(a) ||
            mxEvent.isShiftDown(a) || 90 != a.keyCode && 89 != a.keyCode && 188 != a.keyCode && 190 != a.keyCode && 85 != a.keyCode) && (66 != a.keyCode && 73 != a.keyCode || !this.isControlDown(a) || this.graph.cellEditor.isContentEditing() && !mxClient.IS_FF && !mxClient.IS_SF) && g.apply(this, arguments)
    };
    e.isEnabledForEvent = function(a) {
        return !mxEvent.isConsumed(a) && this.isGraphEvent(a) && this.isEnabled() && (null == d.dialogs || 0 == d.dialogs.length)
    };
    e.isControlDown = function(a) {
        return mxEvent.isControlDown(a) || mxClient.IS_MAC && a.metaKey
    };
    var k = [],
        l =
        null,
        m = {
            37: mxConstants.DIRECTION_WEST,
            38: mxConstants.DIRECTION_NORTH,
            39: mxConstants.DIRECTION_EAST,
            40: mxConstants.DIRECTION_SOUTH
        },
        f = e.getFunction;
    mxKeyHandler.prototype.getFunction = function(a) {
        if (c.isEnabled()) {
            if (mxEvent.isShiftDown(a) && mxEvent.isAltDown(a)) {
                var e = d.actions.get(d.altShiftActions[a.keyCode]);
                if (null != e) return e.funct
            }
            if (9 == a.keyCode && mxEvent.isAltDown(a)) return c.cellEditor.isContentEditing() ? function() {
                    document.execCommand("outdent", !1, null)
                } : mxEvent.isShiftDown(a) ? function() {
                    c.selectParentCell()
                } :
                function() {
                    c.selectChildCell()
                };
            if (null != m[a.keyCode] && !c.isSelectionEmpty())
                if (!this.isControlDown(a) && mxEvent.isShiftDown(a) && mxEvent.isAltDown(a)) {
                    if (c.model.isVertex(c.getSelectionCell())) return function() {
                        var b = c.connectVertex(c.getSelectionCell(), m[a.keyCode], c.defaultEdgeLength, a, !0);
                        null != b && 0 < b.length && (1 == b.length && c.model.isEdge(b[0]) ? c.setSelectionCell(c.model.getTerminal(b[0], !1)) : c.setSelectionCell(b[b.length - 1]), c.scrollCellToVisible(c.getSelectionCell()), null != d.hoverIcons && d.hoverIcons.update(c.view.getState(c.getSelectionCell())))
                    }
                } else return this.isControlDown(a) ?
                    function() {
                        b(a.keyCode, mxEvent.isShiftDown(a) ? c.gridSize : null, !0)
                    } : function() {
                        b(a.keyCode, mxEvent.isShiftDown(a) ? c.gridSize : null)
                    }
        }
        return f.apply(this, arguments)
    };
    e.bindAction = mxUtils.bind(this, function(a, b, c, d) {
        var f = this.actions.get(c);
        null != f && (c = function() {
            f.isEnabled() && f.funct()
        }, b ? d ? e.bindControlShiftKey(a, c) : e.bindControlKey(a, c) : d ? e.bindShiftKey(a, c) : e.bindKey(a, c))
    });
    var n = this,
        q = e.escape;
    e.escape = function(a) {
        q.apply(this, arguments)
    };
    e.enter = function() {};
    e.bindControlShiftKey(36, function() {
        c.exitGroup()
    });
    e.bindControlShiftKey(35, function() {
        c.enterGroup()
    });
    e.bindShiftKey(36, function() {
        c.home()
    });
    e.bindKey(35, function() {
        c.refresh()
    });
    e.bindAction(107, !0, "zoomIn");
    e.bindAction(109, !0, "zoomOut");
    e.bindAction(80, !0, "print");
    e.bindAction(79, !0, "outline", !0);
    if (!this.editor.chromeless || this.editor.editable) e.bindControlKey(36, function() {
            c.isEnabled() && c.foldCells(!0)
        }), e.bindControlKey(35, function() {
            c.isEnabled() && c.foldCells(!1)
        }), e.bindControlKey(13, function() {
            n.ctrlEnter()
        }), e.bindAction(8, !1, "delete"),
        e.bindAction(8, !0, "deleteAll"), e.bindAction(8, !1, "deleteLabels", !0), e.bindAction(46, !1, "delete"), e.bindAction(46, !0, "deleteAll"), e.bindAction(46, !1, "deleteLabels", !0), e.bindAction(36, !1, "resetView"), e.bindAction(72, !0, "fitWindow", !0), e.bindAction(74, !0, "fitPage"), e.bindAction(74, !0, "fitTwoPages", !0), e.bindAction(48, !0, "customZoom"), e.bindAction(82, !0, "turn"), e.bindAction(82, !0, "clearDefaultStyle", !0), e.bindAction(83, !0, "save"), e.bindAction(83, !0, "saveAs", !0), e.bindAction(65, !0, "selectAll"), e.bindAction(65,
            !0, "selectNone", !0), e.bindAction(73, !0, "selectVertices", !0), e.bindAction(69, !0, "selectEdges", !0), e.bindAction(69, !0, "editStyle"), e.bindAction(66, !0, "bold"), e.bindAction(66, !0, "toBack", !0), e.bindAction(70, !0, "toFront", !0), e.bindAction(68, !0, "duplicate"), e.bindAction(68, !0, "setAsDefaultStyle", !0), e.bindAction(90, !0, "undo"), e.bindAction(89, !0, "autosize", !0), e.bindAction(88, !0, "cut"), e.bindAction(67, !0, "copy"), e.bindAction(86, !0, "paste"), e.bindAction(71, !0, "group"), e.bindAction(77, !0, "editData"), e.bindAction(71,
            !0, "grid", !0), e.bindAction(73, !0, "italic"), e.bindAction(76, !0, "lockUnlock"), e.bindAction(76, !0, "layers", !0), e.bindAction(80, !0, "formatPanel", !0), e.bindAction(85, !0, "underline"), e.bindAction(85, !0, "ungroup", !0), e.bindAction(190, !0, "superscript"), e.bindAction(188, !0, "subscript"), e.bindAction(9, !1, "indent", !0), e.bindKey(13, function() {
            c.isEnabled() && c.startEditingAtCell()
        }), e.bindKey(113, function() {
            c.isEnabled() && c.startEditingAtCell()
        });
    mxClient.IS_WIN ? e.bindAction(89, !0, "redo") : e.bindAction(90, !0, "redo",
        !0);
    return e
};
EditorUi.prototype.destroy = function() {
    null != this.editor && (this.editor.destroy(), this.editor = null);
    null != this.menubar && (this.menubar.destroy(), this.menubar = null);
    null != this.toolbar && (this.toolbar.destroy(), this.toolbar = null);
    null != this.sidebar && (this.sidebar.destroy(), this.sidebar = null);
    null != this.keyHandler && (this.keyHandler.destroy(), this.keyHandler = null);
    null != this.keydownHandler && (mxEvent.removeListener(document, "keydown", this.keydownHandler), this.keydownHandler = null);
    null != this.keyupHandler && (mxEvent.removeListener(document,
        "keyup", this.keyupHandler), this.keyupHandler = null);
    null != this.resizeHandler && (mxEvent.removeListener(window, "resize", this.resizeHandler), this.resizeHandler = null);
    null != this.gestureHandler && (mxEvent.removeGestureListeners(document, this.gestureHandler), this.gestureHandler = null);
    null != this.orientationChangeHandler && (mxEvent.removeListener(window, "orientationchange", this.orientationChangeHandler), this.orientationChangeHandler = null);
    null != this.scrollHandler && (mxEvent.removeListener(window, "scroll", this.scrollHandler),
        this.scrollHandler = null);
    if (null != this.destroyFunctions) {
        for (var a = 0; a < this.destroyFunctions.length; a++) this.destroyFunctions[a]();
        this.destroyFunctions = null
    }
    var b = [this.menubarContainer, this.toolbarContainer, this.sidebarContainer, this.formatContainer, this.diagramContainer, this.footerContainer, this.chromelessToolbar, this.hsplit, this.sidebarFooterContainer, this.layersDialog];
    for (a = 0; a < b.length; a++) null != b[a] && null != b[a].parentNode && b[a].parentNode.removeChild(b[a])
};