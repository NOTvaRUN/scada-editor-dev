Menus = function(b) {
    this.editorUi = b;
    this.menus = {};
    this.init();
    mxClient.IS_SVG || ((new Image).src = this.checkmarkImage)
};
Menus.prototype.defaultFont = "Helvetica";
Menus.prototype.defaultFontSize = "12";
Menus.prototype.defaultMenuItems = "file edit view arrange extras help".split(" ");
Menus.prototype.defaultFonts = "Helvetica;Verdana;Times New Roman;Garamond;Comic Sans MS;Courier New;Georgia;Lucida Console;Tahoma".split(";");
Menus.prototype.init = function() {
    var b = this.editorUi.editor.graph,
        d = mxUtils.bind(b, b.isEnabled);
    this.customFonts = [];
    this.customFontSizes = [];
    this.put("fontFamily", new Menu(mxUtils.bind(this, function(a, c) {
        for (var d = mxUtils.bind(this, function(e) {
                this.styleChange(a, e, [mxConstants.STYLE_FONTFAMILY], [e], null, c, function() {
                    document.execCommand("fontname", !1, e)
                }, function() {
                    b.updateLabelElements(b.getSelectionCells(), function(a) {
                        a.removeAttribute("face");
                        a.style.fontFamily = null;
                        "PRE" == a.nodeName && b.replaceElement(a,
                            "div")
                    })
                }).firstChild.nextSibling.style.fontFamily = e
            }), e = 0; e < this.defaultFonts.length; e++) d(this.defaultFonts[e]);
        a.addSeparator(c);
        if (0 < this.customFonts.length) {
            for (e = 0; e < this.customFonts.length; e++) d(this.customFonts[e]);
            a.addSeparator(c);
            a.addItem(mxResources.get("reset"), null, mxUtils.bind(this, function() {
                this.customFonts = [];
                this.editorUi.fireEvent(new mxEventObject("customFontsChanged"))
            }), c);
            a.addSeparator(c)
        }
        this.promptChange(a, mxResources.get("custom") + "...", "", mxConstants.DEFAULT_FONTFAMILY,
            mxConstants.STYLE_FONTFAMILY, c, !0, mxUtils.bind(this, function(b) {
                0 > mxUtils.indexOf(this.customFonts, b) && (this.customFonts.push(b), this.editorUi.fireEvent(new mxEventObject("customFontsChanged")))
            }))
    })));
    this.put("formatBlock", new Menu(mxUtils.bind(this, function(a, c) {
        function d(e, d) {
            return a.addItem(e, null, mxUtils.bind(this, function() {
                null != b.cellEditor.textarea && (b.cellEditor.textarea.focus(), document.execCommand("formatBlock", !1, "<" + d + ">"))
            }), c)
        }
        d(mxResources.get("normal"), "p");
        d("", "h1").firstChild.nextSibling.innerHTML =
            '<h1 style="margin:0px;">' + mxResources.get("heading") + " 1</h1>";
        d("", "h2").firstChild.nextSibling.innerHTML = '<h2 style="margin:0px;">' + mxResources.get("heading") + " 2</h2>";
        d("", "h3").firstChild.nextSibling.innerHTML = '<h3 style="margin:0px;">' + mxResources.get("heading") + " 3</h3>";
        d("", "h4").firstChild.nextSibling.innerHTML = '<h4 style="margin:0px;">' + mxResources.get("heading") + " 4</h4>";
        d("", "h5").firstChild.nextSibling.innerHTML = '<h5 style="margin:0px;">' + mxResources.get("heading") + " 5</h5>";
        d("",
            "h6").firstChild.nextSibling.innerHTML = '<h6 style="margin:0px;">' + mxResources.get("heading") + " 6</h6>";
        d("", "pre").firstChild.nextSibling.innerHTML = '<pre style="margin:0px;">' + mxResources.get("formatted") + "</pre>";
        d("", "blockquote").firstChild.nextSibling.innerHTML = '<blockquote style="margin-top:0px;margin-bottom:0px;">' + mxResources.get("blockquote") + "</blockquote>"
    })));
    this.put("fontSize", new Menu(mxUtils.bind(this, function(a, c) {
        for (var d = [6, 8, 9, 10, 11, 12, 14, 18, 24, 36, 48, 72], e = mxUtils.bind(this, function(e) {
                this.styleChange(a,
                    e, [mxConstants.STYLE_FONTSIZE], [e], null, c,
                    function() {
                        if (null != b.cellEditor.textarea) {
                            document.execCommand("fontSize", !1, "3");
                            for (var a = b.cellEditor.textarea.getElementsByTagName("font"), c = 0; c < a.length; c++)
                                if ("3" == a[c].getAttribute("size")) {
                                    a[c].removeAttribute("size");
                                    a[c].style.fontSize = e + "px";
                                    break
                                }
                        }
                    })
            }), f = 0; f < d.length; f++) e(d[f]);
        a.addSeparator(c);
        if (0 < this.customFontSizes.length) {
            for (f = 0; f < this.customFontSizes.length; f++) e(this.customFontSizes[f]);
            a.addSeparator(c);
            a.addItem(mxResources.get("reset"),
                null, mxUtils.bind(this, function() {
                    this.customFontSizes = []
                }), c);
            a.addSeparator(c)
        }
        this.promptChange(a, mxResources.get("custom") + "...", "(pt)", "12", mxConstants.STYLE_FONTSIZE, c, !0, mxUtils.bind(this, function(b) {
            this.customFontSizes.push(b)
        }))
    })));
    this.put("direction", new Menu(mxUtils.bind(this, function(a, c) {
        a.addItem(mxResources.get("flipH"), null, function() {
            b.toggleCellStyles(mxConstants.STYLE_FLIPH, !1)
        }, c);
        a.addItem(mxResources.get("flipV"), null, function() {
            b.toggleCellStyles(mxConstants.STYLE_FLIPV,
                !1)
        }, c);
        this.addMenuItems(a, ["-", "rotation"], c)
    })));
    this.put("align", new Menu(mxUtils.bind(this, function(a, c) {
        a.addItem(mxResources.get("leftAlign"), null, function() {
            b.alignCells(mxConstants.ALIGN_LEFT)
        }, c);
        a.addItem(mxResources.get("center"), null, function() {
            b.alignCells(mxConstants.ALIGN_CENTER)
        }, c);
        a.addItem(mxResources.get("rightAlign"), null, function() {
            b.alignCells(mxConstants.ALIGN_RIGHT)
        }, c);
        a.addSeparator(c);
        a.addItem(mxResources.get("topAlign"), null, function() {
                b.alignCells(mxConstants.ALIGN_TOP)
            },
            c);
        a.addItem(mxResources.get("middle"), null, function() {
            b.alignCells(mxConstants.ALIGN_MIDDLE)
        }, c);
        a.addItem(mxResources.get("bottomAlign"), null, function() {
            b.alignCells(mxConstants.ALIGN_BOTTOM)
        }, c)
    })));
    this.put("distribute", new Menu(mxUtils.bind(this, function(a, c) {
        a.addItem(mxResources.get("horizontal"), null, function() {
            b.distributeCells(!0)
        }, c);
        a.addItem(mxResources.get("vertical"), null, function() {
            b.distributeCells(!1)
        }, c)
    })));
    this.put("line", new Menu(mxUtils.bind(this, function(a, c) {
        var d = b.view.getState(b.getSelectionCell());
        null != d && (d = mxUtils.getValue(d.style, mxConstants.STYLE_SHAPE), "arrow" != d && (this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null], "geIcon geSprite geSprite-straight", c, !0).setAttribute("title", mxResources.get("straight")), this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["orthogonalEdgeStyle", null, null], "geIcon geSprite geSprite-orthogonal", c, !0).setAttribute("title", mxResources.get("orthogonal")),
                this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["elbowEdgeStyle", null, null, null], "geIcon geSprite geSprite-horizontalelbow", c, !0).setAttribute("title", mxResources.get("simple")), this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["elbowEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalelbow", c, !0).setAttribute("title", mxResources.get("simple")),
                this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle", null, null, null], "geIcon geSprite geSprite-horizontalisometric", c, !0).setAttribute("title", mxResources.get("isometric")), this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalisometric", c, !0).setAttribute("title",
                    mxResources.get("isometric")), "connector" == d && this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["orthogonalEdgeStyle", "1", null], "geIcon geSprite geSprite-curved", c, !0).setAttribute("title", mxResources.get("curved")), this.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["entityRelationEdgeStyle", null, null], "geIcon geSprite geSprite-entity", c, !0).setAttribute("title", mxResources.get("entityRelation"))),
            a.addSeparator(c), this.styleChange(a, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], [null, null, null, null], "geIcon geSprite geSprite-connection", c, !0, null, !0).setAttribute("title", mxResources.get("line")), this.styleChange(a, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["link", null, null, null], "geIcon geSprite geSprite-linkedge", c, !0, null, !0).setAttribute("title", mxResources.get("link")), this.styleChange(a, "", [mxConstants.STYLE_SHAPE,
                mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"
            ], ["flexArrow", null, null, null], "geIcon geSprite geSprite-arrow", c, !0, null, !0).setAttribute("title", mxResources.get("arrow")), this.styleChange(a, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["arrow", null, null, null], "geIcon geSprite geSprite-simplearrow", c, !0, null, !0).setAttribute("title", mxResources.get("simpleArrow")))
    })));
    this.put("layout", new Menu(mxUtils.bind(this, function(a, c) {
        var d = mxUtils.bind(this,
            function(b, a) {
                b = new FilenameDialog(this.editorUi, b, mxResources.get("apply"), function(b) {
                    a(parseFloat(b))
                }, mxResources.get("spacing"));
                this.editorUi.showDialog(b.container, 300, 80, !0, !0);
                b.init()
            });
        a.addItem(mxResources.get("horizontalFlow"), null, mxUtils.bind(this, function() {
            var a = new mxHierarchicalLayout(b, mxConstants.DIRECTION_WEST);
            this.editorUi.executeLayout(function() {
                var c = b.getSelectionCells();
                a.execute(b.getDefaultParent(), 0 == c.length ? null : c)
            }, !0)
        }), c);
        a.addItem(mxResources.get("verticalFlow"),
            null, mxUtils.bind(this, function() {
                var a = new mxHierarchicalLayout(b, mxConstants.DIRECTION_NORTH);
                this.editorUi.executeLayout(function() {
                    var c = b.getSelectionCells();
                    a.execute(b.getDefaultParent(), 0 == c.length ? null : c)
                }, !0)
            }), c);
        a.addSeparator(c);
        a.addItem(mxResources.get("horizontalTree"), null, mxUtils.bind(this, function() {
            var a = b.getSelectionCell(),
                c = null;
            null == a || 0 == b.getModel().getChildCount(a) ? 0 == b.getModel().getEdgeCount(a) && (c = b.findTreeRoots(b.getDefaultParent())) : c = b.findTreeRoots(a);
            null != c &&
                0 < c.length && (a = c[0]);
            if (null != a) {
                var g = new mxCompactTreeLayout(b, !0);
                g.edgeRouting = !1;
                g.levelDistance = 30;
                d(g.levelDistance, mxUtils.bind(this, function(c) {
                    g.levelDistance = c;
                    this.editorUi.executeLayout(function() {
                        g.execute(b.getDefaultParent(), a)
                    }, !0)
                }))
            }
        }), c);
        a.addItem(mxResources.get("verticalTree"), null, mxUtils.bind(this, function() {
            var a = b.getSelectionCell(),
                c = null;
            null == a || 0 == b.getModel().getChildCount(a) ? 0 == b.getModel().getEdgeCount(a) && (c = b.findTreeRoots(b.getDefaultParent())) : c = b.findTreeRoots(a);
            null != c && 0 < c.length && (a = c[0]);
            if (null != a) {
                var g = new mxCompactTreeLayout(b, !1);
                g.edgeRouting = !1;
                g.levelDistance = 30;
                d(g.levelDistance, mxUtils.bind(this, function(c) {
                    g.levelDistance = c;
                    this.editorUi.executeLayout(function() {
                        g.execute(b.getDefaultParent(), a)
                    }, !0)
                }))
            }
        }), c);
        a.addItem(mxResources.get("radialTree"), null, mxUtils.bind(this, function() {
            var a = b.getSelectionCell(),
                c = null;
            null == a || 0 == b.getModel().getChildCount(a) ? 0 == b.getModel().getEdgeCount(a) && (c = b.findTreeRoots(b.getDefaultParent())) : c = b.findTreeRoots(a);
            null != c && 0 < c.length && (a = c[0]);
            if (null != a) {
                var g = new mxRadialTreeLayout(b, !1);
                g.levelDistance = 80;
                g.autoRadius = !0;
                d(g.levelDistance, mxUtils.bind(this, function(c) {
                    g.levelDistance = c;
                    this.editorUi.executeLayout(function() {
                        g.execute(b.getDefaultParent(), a);
                        b.isSelectionEmpty() || (a = b.getModel().getParent(a), b.getModel().isVertex(a) && b.updateGroupBounds([a], 2 * b.gridSize, !0))
                    }, !0)
                }))
            }
        }), c);
        a.addSeparator(c);
        a.addItem(mxResources.get("organic"), null, mxUtils.bind(this, function() {
            var a = new mxFastOrganicLayout(b);
            d(a.forceConstant, mxUtils.bind(this, function(c) {
                a.forceConstant = c;
                this.editorUi.executeLayout(function() {
                    var c = b.getSelectionCell();
                    if (null == c || 0 == b.getModel().getChildCount(c)) c = b.getDefaultParent();
                    a.execute(c);
                    b.getModel().isVertex(c) && b.updateGroupBounds([c], 2 * b.gridSize, !0)
                }, !0)
            }))
        }), c);
        a.addItem(mxResources.get("circle"), null, mxUtils.bind(this, function() {
            var a = new mxCircleLayout(b);
            this.editorUi.executeLayout(function() {
                var c = b.getSelectionCell();
                if (null == c || 0 == b.getModel().getChildCount(c)) c =
                    b.getDefaultParent();
                a.execute(c);
                b.getModel().isVertex(c) && b.updateGroupBounds([c], 2 * b.gridSize, !0)
            }, !0)
        }), c)
    })));
    this.put("navigation", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, "home - exitGroup enterGroup - expand collapse - collapsible".split(" "), c)
    })));
    this.put("arrange", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, ["toFront", "toBack", "-"], c);
        this.addSubmenu("direction", a, c);
        this.addMenuItems(a, ["turn", "-"], c);
        this.addSubmenu("align", a, c);
        this.addSubmenu("distribute",
            a, c);
        a.addSeparator(c);
        this.addSubmenu("navigation", a, c);
        this.addSubmenu("insert", a, c);
        this.addSubmenu("layout", a, c);
        this.addMenuItems(a, "- group ungroup removeFromGroup - clearWaypoints autosize".split(" "), c)
    }))).isEnabled = d;
    this.put("insert", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, ["insertLink", "insertImage"], c)
    })));
    this.put("view", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, (null != this.editorUi.format ? ["formatPanel"] : []).concat("outline layers - pageView pageScale - scrollbars tooltips - grid guides - connectionArrows connectionPoints - resetView zoomIn zoomOut".split(" "),
            c))
    })));
    this.put("viewPanels", new Menu(mxUtils.bind(this, function(a, c) {
        null != this.editorUi.format && this.addMenuItems(a, ["formatPanel"], c);
        this.addMenuItems(a, ["outline", "layers"], c)
    })));
    this.put("viewZoom", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, ["resetView", "-"], c);
        for (var d = [.25, .5, .75, 1, 1.25, 1.5, 2, 3, 4], e = 0; e < d.length; e++)(function(d) {
            a.addItem(100 * d + "%", null, function() {
                b.zoomTo(d)
            }, c)
        })(d[e]);
        this.addMenuItems(a, "- fitWindow fitPageWidth fitPage fitTwoPages - customZoom".split(" "),
            c)
    })));
    this.put("file", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, "new open - save saveAs - import export - pageSetup print".split(" "), c)
    })));
    this.put("edit", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, "undo redo - cut copy paste delete - duplicate - editData editTooltip - editStyle - edit - editLink openLink - selectVertices selectEdges selectAll selectNone - lockUnlock".split(" "))
    })));
    this.put("extras", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a,
            ["copyConnect", "collapseExpand", "-", "editDiagram"])
    })));
    this.put("help", new Menu(mxUtils.bind(this, function(a, c) {
        this.addMenuItems(a, ["help", "-", "about"])
    })))
};
Menus.prototype.put = function(b, d) {
    return this.menus[b] = d
};
Menus.prototype.get = function(b) {
    return this.menus[b]
};
Menus.prototype.addSubmenu = function(b, d, a, c) {
    var h = this.get(b);
    null != h && (h = h.isEnabled(), d.showDisabled || h) && (a = d.addItem(c || mxResources.get(b), null, null, a, null, h), this.addMenu(b, d, a))
};
Menus.prototype.addMenu = function(b, d, a) {
    var c = this.get(b);
    null != c && (d.showDisabled || c.isEnabled()) && this.get(b).execute(d, a)
};
Menus.prototype.addInsertTableCellItem = function(b, d) {
    var a = this.editorUi.editor.graph;
    this.addInsertTableItem(b, mxUtils.bind(this, function(c, b, d) {
            b = mxEvent.isControlDown(c) || mxEvent.isMetaDown(c) ? a.createCrossFunctionalSwimlane(b, d) : a.createTable(b, d, null, null, mxEvent.isShiftDown(c) ? "Table" : null);
            c = mxEvent.isAltDown(c) ? a.getFreeInsertPoint() : a.getCenterInsertPoint(a.getBoundingBoxFromGeometry([b], !0));
            c = a.importCells([b], c.x, c.y);
            null != c && 0 < c.length && (a.scrollCellToVisible(c[0]), a.setSelectionCells(c))
        }),
        d)
};
Menus.prototype.addInsertTableItem = function(b, d, a) {
    function c(a, c) {
        for (var b = ["<table>"], d = 0; d < a; d++) {
            b.push("<tr>");
            for (var e = 0; e < c; e++) b.push("<td><br></td>");
            b.push("</tr>")
        }
        b.push("</table>");
        return b.join("")
    }

    function h(a) {
        g = e.getParentByName(mxEvent.getSource(a), "TD");
        var c = !1;
        if (null != g) {
            f = e.getParentByName(g, "TR");
            var b = mxEvent.isMouseEvent(a) ? 2 : 4,
                d = k,
                h = Math.min(20, f.sectionRowIndex + b);
            b = Math.min(20, g.cellIndex + b);
            for (var l = d.rows.length; l < h; l++)
                for (var t = d.insertRow(l), q = 0; q < d.rows[0].cells.length; q++) t.insertCell(-1);
            for (l =
                0; l < d.rows.length; l++)
                for (t = d.rows[l], q = t.cells.length; q < b; q++) t.insertCell(-1);
            m.innerHTML = g.cellIndex + 1 + "x" + (f.sectionRowIndex + 1);
            for (d = 0; d < k.rows.length; d++)
                for (h = k.rows[d], b = 0; b < h.cells.length; b++) l = h.cells[b], d == f.sectionRowIndex && b == g.cellIndex && (c = "blue" == l.style.backgroundColor), l.style.backgroundColor = d <= f.sectionRowIndex && b <= g.cellIndex ? "blue" : "transparent"
        }
        mxEvent.consume(a);
        return c
    }
    d = null != d ? d : mxUtils.bind(this, function(a, b, d) {
        var e = this.editorUi.editor.graph;
        a = e.getParentByName(mxEvent.getSource(a),
            "TD");
        if (null != a && null != e.cellEditor.textarea) {
            e.getParentByName(a, "TR");
            var f = e.cellEditor.textarea.getElementsByTagName("table");
            a = [];
            for (var g = 0; g < f.length; g++) a.push(f[g]);
            e.container.focus();
            e.pasteHtmlAtCaret(c(b, d));
            b = e.cellEditor.textarea.getElementsByTagName("table");
            if (b.length == a.length + 1)
                for (g = b.length - 1; 0 <= g; g--)
                    if (0 == g || b[g] != a[g - 1]) {
                        e.selectNode(b[g].rows[0].cells[0]);
                        break
                    }
        }
    });
    var e = this.editorUi.editor.graph,
        f = null,
        g = null;
    b = b.addItem("", null, null, a, null, null, null, !0);
    b.firstChild.innerHTML =
        "";
    var k = function(a, b) {
        var c = document.createElement("table");
        c.setAttribute("border", "1");
        c.style.borderCollapse = "collapse";
        c.style.borderStyle = "solid";
        c.setAttribute("cellPadding", "8");
        for (var d = 0; d < a; d++)
            for (var e = c.insertRow(d), g = 0; g < b; g++) e.insertCell(-1);
        return c
    }(5, 5);
    b.firstChild.appendChild(k);
    var m = document.createElement("div");
    m.style.padding = "4px";
    m.style.fontSize = Menus.prototype.defaultFontSize + "px";
    m.innerHTML = "1x1";
    b.firstChild.appendChild(m);
    mxEvent.addGestureListeners(k, null, null,
        mxUtils.bind(this, function(a) {
            var b = h(a);
            null != g && null != f && b && (d(a, f.sectionRowIndex + 1, g.cellIndex + 1), window.setTimeout(mxUtils.bind(this, function() {
                this.editorUi.hideCurrentMenu()
            }), 0))
        }));
    mxEvent.addListener(k, "mouseover", h)
};
Menus.prototype.edgeStyleChange = function(b, d, a, c, h, e, f) {
    return this.showIconOnly(b.addItem(d, null, mxUtils.bind(this, function() {
        var b = this.editorUi.editor.graph;
        b.stopEditing(!1);
        b.getModel().beginUpdate();
        try {
            for (var d = b.getSelectionCells(), e = [], h = 0; h < d.length; h++) {
                var n = d[h];
                if (b.getModel().isEdge(n)) {
                    if (f) {
                        var p = b.getCellGeometry(n);
                        null != p && (p = p.clone(), p.points = null, b.getModel().setGeometry(n, p))
                    }
                    for (var r = 0; r < a.length; r++) b.setCellStyles(a[r], c[r], [n]);
                    e.push(n)
                }
            }
            this.editorUi.fireEvent(new mxEventObject("styleChanged",
                "keys", a, "values", c, "cells", e))
        } finally {
            b.getModel().endUpdate()
        }
    }), e, h))
};
Menus.prototype.showIconOnly = function(b) {
    var d = b.getElementsByTagName("td");
    for (i = 0; i < d.length; i++) "mxPopupMenuItem" == d[i].getAttribute("class") && (d[i].style.display = "none");
    return b
};
Menus.prototype.styleChange = function(b, d, a, c, h, e, f, g, k) {
    var m = this.createStyleChangeFunction(a, c);
    b = b.addItem(d, null, mxUtils.bind(this, function() {
        var a = this.editorUi.editor.graph;
        null != f && a.cellEditor.isContentEditing() ? f() : m(g)
    }), e, h);
    k && this.showIconOnly(b);
    return b
};
Menus.prototype.createStyleChangeFunction = function(b, d) {
    return mxUtils.bind(this, function(a) {
        var c = this.editorUi.editor.graph;
        c.stopEditing(!1);
        c.getModel().beginUpdate();
        try {
            for (var h = c.getSelectionCells(), e = !1, f = 0; f < b.length; f++)
                if (c.setCellStyles(b[f], d[f], h), b[f] == mxConstants.STYLE_ALIGN && c.updateLabelElements(h, function(a) {
                        a.removeAttribute("align");
                        a.style.textAlign = null
                    }), b[f] == mxConstants.STYLE_FONTFAMILY || "fontSource" == b[f]) e = !0;
            if (e)
                for (e = 0; e < h.length; e++) 0 == c.model.getChildCount(h[e]) &&
                    c.autoSizeCell(h[e], !1);
            null != a && a();
            this.editorUi.fireEvent(new mxEventObject("styleChanged", "keys", b, "values", d, "cells", h))
        } finally {
            c.getModel().endUpdate()
        }
    })
};
Menus.prototype.promptChange = function(b, d, a, c, h, e, f, g, k) {
    return b.addItem(d, null, mxUtils.bind(this, function() {
        var b = this.editorUi.editor.graph,
            d = c,
            e = b.getView().getState(b.getSelectionCell());
        null != e && (d = e.style[h] || d);
        d = new FilenameDialog(this.editorUi, d, mxResources.get("apply"), mxUtils.bind(this, function(a) {
            if (null != a && 0 < a.length) {
                b.getModel().beginUpdate();
                try {
                    b.stopEditing(!1), b.setCellStyles(h, a)
                } finally {
                    b.getModel().endUpdate()
                }
                null != g && g(a)
            }
        }), mxResources.get("enterValue") + (0 < a.length ? " " +
            a : ""));
        this.editorUi.showDialog(d.container, 300, 80, !0, !0);
        d.init()
    }), e, k, f)
};
Menus.prototype.pickColor = function(b, d, a) {
    var c = this.editorUi.editor.graph,
        h = 226 + 17 * (Math.ceil(ColorDialog.prototype.presetColors.length / 12) + Math.ceil(ColorDialog.prototype.defaultColors.length / 12));
    if (null != d && c.cellEditor.isContentEditing()) {
        var e = c.cellEditor.saveSelection();
        b = new ColorDialog(this.editorUi, a || "000000", mxUtils.bind(this, function(a) {
            c.cellEditor.restoreSelection(e);
            document.execCommand(d, !1, a != mxConstants.NONE ? a : "transparent")
        }), function() {
            c.cellEditor.restoreSelection(e)
        });
        this.editorUi.showDialog(b.container,
            230, h, !0, !0);
        b.init()
    } else {
        null == this.colorDialog && (this.colorDialog = new ColorDialog(this.editorUi));
        this.colorDialog.currentColorKey = b;
        a = c.getView().getState(c.getSelectionCell());
        var f = "none";
        null != a && (f = a.style[b] || f);
        "none" == f ? (f = "ffffff", this.colorDialog.picker.fromString("ffffff"), this.colorDialog.colorInput.value = "none") : this.colorDialog.picker.fromString(f);
        this.editorUi.showDialog(this.colorDialog.container, 230, h, !0, !0);
        this.colorDialog.init()
    }
};
Menus.prototype.toggleStyle = function(b, d) {
    var a = this.editorUi.editor.graph;
    d = a.toggleCellStyles(b, d);
    this.editorUi.fireEvent(new mxEventObject("styleChanged", "keys", [b], "values", [d], "cells", a.getSelectionCells()))
};
Menus.prototype.addMenuItem = function(b, d, a, c, h, e) {
    var f = this.editorUi.actions.get(d);
    return null != f && (b.showDisabled || f.isEnabled()) && f.visible ? (d = b.addItem(e || f.label, null, function(a) {
        f.funct(c, a)
    }, a, h, f.isEnabled()), f.toggleAction && f.isSelected() && b.addCheckmark(d, Editor.checkmarkImage), this.addShortcut(d, f), d) : null
};
Menus.prototype.addShortcut = function(b, d) {
    if (null != d.shortcut) {
        b = b.firstChild.nextSibling.nextSibling;
        var a = document.createElement("span");
        a.style.color = "gray";
        mxUtils.write(a, d.shortcut);
        b.appendChild(a)
    }
};
Menus.prototype.addMenuItems = function(b, d, a, c, h) {
    for (var e = 0; e < d.length; e++) "-" == d[e] ? b.addSeparator(a) : this.addMenuItem(b, d[e], a, c, null != h ? h[e] : null)
};
Menus.prototype.createPopupMenu = function(b, d, a) {
    b.smartSeparators = !0;
    this.addPopupMenuHistoryItems(b, d, a);
    this.addPopupMenuEditItems(b, d, a);
    this.addPopupMenuStyleItems(b, d, a);
    this.addPopupMenuArrangeItems(b, d, a);
    this.addPopupMenuCellItems(b, d, a);
    this.addPopupMenuSelectionItems(b, d, a)
};
Menus.prototype.addPopupMenuHistoryItems = function(b, d, a) {
    this.editorUi.editor.graph.isSelectionEmpty() && this.addMenuItems(b, ["undo", "redo"], null, a)
};
Menus.prototype.addPopupMenuEditItems = function(b, d, a) {
    this.editorUi.editor.graph.isSelectionEmpty() ? this.addMenuItems(b, ["pasteHere"], null, a) : this.addMenuItems(b, "delete - cut copy - duplicate".split(" "), null, a)
};
Menus.prototype.addPopupMenuStyleItems = function(b, d, a) {
    1 == this.editorUi.editor.graph.getSelectionCount() ? this.addMenuItems(b, ["-", "setAsDefaultStyle"], null, a) : this.editorUi.editor.graph.isSelectionEmpty() && this.addMenuItems(b, ["-", "clearDefaultStyle"], null, a)
};
Menus.prototype.addPopupMenuArrangeItems = function(b, d, a) {
    var c = this.editorUi.editor.graph;
    c.isSelectionEmpty() || this.addMenuItems(b, ["-", "toFront", "toBack"], null, a);
    1 < c.getSelectionCount() ? this.addMenuItems(b, ["-", "group"], null, a) : 1 == c.getSelectionCount() && !c.getModel().isEdge(d) && !c.isSwimlane(d) && 0 < c.getModel().getChildCount(d) && this.addMenuItems(b, ["-", "ungroup"], null, a)
};
Menus.prototype.addPopupMenuCellItems = function(b, d, a) {
    var c = this.editorUi.editor.graph;
    d = c.getSelectionCell();
    var h = c.view.getState(d);
    b.addSeparator();
    if (null != h) {
        var e = !1;
        1 == c.getSelectionCount() && c.getModel().isEdge(d) && (b.addSeparator(), this.addSubmenu("line", b));
        if (c.getModel().isEdge(d) && "entityRelationEdgeStyle" != mxUtils.getValue(h.style, mxConstants.STYLE_EDGE, null) && "arrow" != mxUtils.getValue(h.style, mxConstants.STYLE_SHAPE, null)) {
            e = c.selectionCellsHandler.getHandler(d);
            var f = !1;
            if (e instanceof mxEdgeHandler && null != e.bends && 2 < e.bends.length) {
                f = e.getHandleForEvent(c.updateMouseEvent(new mxMouseEvent(a)));
                var g = this.editorUi.actions.get("removeWaypoint");
                g.handler = e;
                g.index = f;
                f = 0 < f && f < e.bends.length - 1
            }
            b.addSeparator();
            this.addMenuItem(b, "turn", null, a, null, mxResources.get("reverse"));
            this.addMenuItems(b, [f ? "removeWaypoint" : "addWaypoint"], null, a);
            e = c.getModel().getGeometry(d);
            e = null != e && null != e.points && 0 < e.points.length
        }
        1 == c.getSelectionCount() && (e || c.getModel().isVertex(d) && 0 < c.getModel().getEdgeCount(d)) &&
            this.addMenuItems(b, ["-", "clearWaypoints"], null, a);
        1 == c.getSelectionCount() && (this.addMenuItems(b, ["-", "editStyle", "editData", "editLink"], null, a), c.getModel().isVertex(d) && null != mxUtils.getValue(h.style, mxConstants.STYLE_IMAGE, null) && (b.addSeparator(), this.addMenuItem(b, "image", null, a).firstChild.nextSibling.innerHTML = mxResources.get("editImage") + "..."))
    }
};
Menus.prototype.addPopupMenuSelectionItems = function(b, d, a) {
    this.editorUi.editor.graph.isSelectionEmpty() && this.addMenuItems(b, ["-", "selectVertices", "selectEdges", "selectAll"], null, a)
};
Menus.prototype.createMenubar = function(b) {
    for (var d = new Menubar(this.editorUi, b), a = this.defaultMenuItems, c = 0; c < a.length; c++) mxUtils.bind(this, function(b) {
        var e = d.addMenu(mxResources.get(a[c]), mxUtils.bind(this, function() {
            b.funct.apply(this, arguments)
        }));
        this.menuCreated(b, e)
    })(this.get(a[c]));
    return d
};
Menus.prototype.menuCreated = function(b, d, a) {
    null != d && (a = null != a ? a : "geItem", b.addListener("stateChanged", function() {
        (d.enabled = b.enabled) ? (d.className = a, 8 == document.documentMode && (d.style.color = "")) : (d.className = a + " mxDisabled", 8 == document.documentMode && (d.style.color = "#c3c3c3"))
    }))
};

function Menubar(b, d) {
    this.editorUi = b;
    this.container = d
}
Menubar.prototype.hideMenu = function() {
    this.editorUi.hideCurrentMenu()
};
Menubar.prototype.addMenu = function(b, d, a) {
    var c = document.createElement("a");
    c.className = "geItem";
    mxUtils.write(c, b);
    this.addMenuHandler(c, d);
    null != a ? this.container.insertBefore(c, a) : this.container.appendChild(c);
    return c
};
Menubar.prototype.addMenuHandler = function(b, d) {
    if (null != d) {
        var a = !0,
            c = mxUtils.bind(this, function(c) {
                if (a && null == b.enabled || b.enabled) {
                    this.editorUi.editor.graph.popupMenuHandler.hideMenu();
                    var e = new mxPopupMenu(d);
                    e.div.className += " geMenubarMenu";
                    e.smartSeparators = !0;
                    e.showDisabled = !0;
                    e.autoExpand = !0;
                    e.hideMenu = mxUtils.bind(this, function() {
                        mxPopupMenu.prototype.hideMenu.apply(e, arguments);
                        this.editorUi.resetCurrentMenu();
                        e.destroy()
                    });
                    var f = mxUtils.getOffset(b);
                    e.popup(f.x, f.y + b.offsetHeight, null,
                        c);
                    this.editorUi.setCurrentMenu(e, b)
                }
                mxEvent.consume(c)
            });
        mxEvent.addListener(b, "mousemove", mxUtils.bind(this, function(a) {
            null != this.editorUi.currentMenu && this.editorUi.currentMenuElt != b && (this.editorUi.hideCurrentMenu(), c(a))
        }));
        mxEvent.addListener(b, mxClient.IS_POINTER ? "pointerdown" : "mousedown", mxUtils.bind(this, function(c) {
            a = this.currentElt != b;
            c.preventDefault()
        }));
        mxEvent.addListener(b, "click", mxUtils.bind(this, function(b) {
            c(b);
            a = !0
        }))
    }
};
Menubar.prototype.destroy = function() {};

function Menu(b, d) {
    mxEventSource.call(this);
    this.funct = b;
    this.enabled = null != d ? d : !0
}
mxUtils.extend(Menu, mxEventSource);
Menu.prototype.isEnabled = function() {
    return this.enabled
};
Menu.prototype.setEnabled = function(b) {
    this.enabled != b && (this.enabled = b, this.fireEvent(new mxEventObject("stateChanged")))
};
Menu.prototype.execute = function(b, d) {
    this.funct(b, d)
};
EditorUi.prototype.createMenus = function() {
    return new Menus(this)
};