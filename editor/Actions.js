function Actions(f) {
    this.editorUi = f;
    this.actions = {};
    this.init()
}
Actions.prototype.init = function() {
    function f(b) {
        a.escape();
        b = a.deleteCells(a.getDeletableCells(a.getSelectionCells()), b);
        null != b && a.setSelectionCells(b)
    }
    var c = this.editorUi,
        l = c.editor,
        a = l.graph,
        k = function() {
            return Action.prototype.isEnabled.apply(this, arguments) && a.isEnabled()
        };
    this.addAction("new...", function() {
        a.openLink(c.getUrl())
    });
    this.addAction("open...", function() {
        window.openNew = !0;
        window.openKey = "open";
        c.openFile()
    });
    this.addAction("import...", function() {
        window.openNew = !1;
        window.openKey =
            "import";
        window.openFile = new OpenFile(mxUtils.bind(this, function() {
            c.hideDialog()
        }));
        window.openFile.setConsumer(mxUtils.bind(this, function(a, d) {
            try {
                var b = mxUtils.parseXml(a);
                l.graph.setSelectionCells(l.graph.importGraphModel(b.documentElement))
            } catch (n) {
                mxUtils.alert(mxResources.get("invalidOrMissingFile") + ": " + n.message)
            }
        }));
        c.showDialog((new OpenDialog(this)).container, 320, 220, !0, !0, function() {
            window.openFile = null
        })
    }).isEnabled = k;
    this.addAction("save", function() {
            c.saveFile(!1)
        }, null, null, Editor.ctrlKey +
        "+S").isEnabled = k;
    this.addAction("saveAs...", function() {
        c.saveFile(!0)
    }, null, null, Editor.ctrlKey + "+Shift+S").isEnabled = k;
    this.addAction("export...", function() {
        c.showDialog((new ExportDialog(c)).container, 300, 304, !0, !0)
    });
    this.addAction("editDiagram...", function() {
        var a = new EditDiagramDialog(c);
        c.showDialog(a.container, 620, 420, !0, !1);
        a.init()
    });
    this.addAction("pageSetup...", function() {
        c.showDialog((new PageSetupDialog(c)).container, 320, 220, !0, !0)
    }).isEnabled = k;
    this.addAction("print...", function() {
        c.showDialog((new PrintDialog(c)).container,
            300, 180, !0, !0)
    }, null, "sprite-print", Editor.ctrlKey + "+P");
    this.addAction("preview", function() {
        mxUtils.show(a, null, 10, 10)
    });
    this.addAction("undo", function() {
        c.undo()
    }, null, "sprite-undo", Editor.ctrlKey + "+Z");
    this.addAction("redo", function() {
        c.redo()
    }, null, "sprite-redo", mxClient.IS_WIN ? Editor.ctrlKey + "+Y" : Editor.ctrlKey + "+Shift+Z");
    this.addAction("cut", function() {
        var b = null;
        try {
            b = c.copyXml(), null != b && a.removeCells(b)
        } catch (d) {}
        null == b && mxClipboard.cut(a)
    }, null, "sprite-cut", Editor.ctrlKey + "+X");
    this.addAction("copy",
        function() {
            try {
                c.copyXml()
            } catch (b) {}
            try {
                mxClipboard.copy(a)
            } catch (b) {
                c.handleError(b)
            }
        }, null, "sprite-copy", Editor.ctrlKey + "+C");
    this.addAction("paste", function() {
            if (a.isEnabled() && !a.isCellLocked(a.getDefaultParent())) {
                var b = !1;
                try {
                    Editor.enableNativeCipboard && (c.readGraphModelFromClipboard(function(b) {
                        if (null != b) {
                            a.getModel().beginUpdate();
                            try {
                                c.pasteXml(b, !0)
                            } finally {
                                a.getModel().endUpdate()
                            }
                        } else mxClipboard.paste(a)
                    }), b = !0)
                } catch (d) {}
                b || mxClipboard.paste(a)
            }
        }, !1, "sprite-paste", Editor.ctrlKey +
        "+V");
    this.addAction("pasteHere", function(b) {
        function d(b) {
            if (null != b) {
                for (var d = !0, c = 0; c < b.length && d; c++) d = d && a.model.isEdge(b[c]);
                var g = a.view.translate;
                c = a.view.scale;
                var e = g.x,
                    n = g.y;
                g = null;
                if (1 == b.length && d) {
                    var f = a.getCellGeometry(b[0]);
                    null != f && (g = f.getTerminalPoint(!0))
                }
                g = null != g ? g : a.getBoundingBoxFromGeometry(b, d);
                null != g && (d = Math.round(a.snap(a.popupMenuHandler.triggerX / c - e)), c = Math.round(a.snap(a.popupMenuHandler.triggerY / c - n)), a.cellsMoved(b, d - g.x, c - g.y))
            }
        }

        function g() {
            a.getModel().beginUpdate();
            try {
                d(mxClipboard.paste(a))
            } finally {
                a.getModel().endUpdate()
            }
        }
        if (a.isEnabled() && !a.isCellLocked(a.getDefaultParent())) {
            b = !1;
            try {
                Editor.enableNativeCipboard && (c.readGraphModelFromClipboard(function(b) {
                    if (null != b) {
                        a.getModel().beginUpdate();
                        try {
                            d(c.pasteXml(b, !0))
                        } finally {
                            a.getModel().endUpdate()
                        }
                    } else g()
                }), b = !0)
            } catch (n) {}
            b || g()
        }
    });
    this.addAction("copySize", function() {
        var b = a.getSelectionCell();
        a.isEnabled() && null != b && a.getModel().isVertex(b) && (b = a.getCellGeometry(b), null != b && (c.copiedSize = new mxRectangle(b.x,
            b.y, b.width, b.height)))
    }, null, null, "Alt+Shift+X");
    this.addAction("pasteSize", function() {
        if (a.isEnabled() && !a.isSelectionEmpty() && null != c.copiedSize) {
            a.getModel().beginUpdate();
            try {
                for (var b = a.getSelectionCells(), d = 0; d < b.length; d++)
                    if (a.getModel().isVertex(b[d])) {
                        var g = a.getCellGeometry(b[d]);
                        null != g && (g = g.clone(), g.width = c.copiedSize.width, g.height = c.copiedSize.height, a.getModel().setGeometry(b[d], g))
                    }
            } finally {
                a.getModel().endUpdate()
            }
        }
    }, null, null, "Alt+Shift+V");
    this.addAction("copyData", function() {
        var b =
            a.getSelectionCell() || a.getModel().getRoot();
        a.isEnabled() && null != b && (b = b.cloneValue(), null == b || isNaN(b.nodeType) || (c.copiedValue = b))
    }, null, null, "Alt+Shift+B");
    this.addAction("pasteData", function(b) {
        function d(d, c) {
            var e = g.getValue(d);
            c = d.cloneValue(c);
            c.removeAttribute("placeholders");
            null == e || isNaN(e.nodeType) || c.setAttribute("placeholders", e.getAttribute("placeholders"));
            null != b && (mxEvent.isMetaDown(b) || mxEvent.isControlDown(b)) || c.setAttribute("label", a.convertValueToString(d));
            g.setValue(d, c)
        }
        var g = a.getModel();
        if (a.isEnabled() && !a.isSelectionEmpty() && null != c.copiedValue) {
            g.beginUpdate();
            try {
                var e = a.getSelectionCells();
                if (0 == e.length) d(g.getRoot(), c.copiedValue);
                else
                    for (var h = 0; h < e.length; h++) d(e[h], c.copiedValue)
            } finally {
                g.endUpdate()
            }
        }
    }, null, null, "Alt+Shift+E");
    this.addAction("delete", function(a) {
        f(null != a && mxEvent.isControlDown(a))
    }, null, null, "Delete");
    this.addAction("deleteAll", function() {
        f(!0)
    });
    this.addAction("deleteLabels", function() {
        if (!a.isSelectionEmpty()) {
            a.getModel().beginUpdate();
            try {
                for (var b = a.getSelectionCells(), d = 0; d < b.length; d++) a.cellLabelChanged(b[d], "")
            } finally {
                a.getModel().endUpdate()
            }
        }
    }, null, null, Editor.ctrlKey + "+Delete");
    this.addAction("duplicate", function() {
        try {
            a.setSelectionCells(a.duplicateCells()), a.scrollCellToVisible(a.getSelectionCell())
        } catch (b) {
            c.handleError(b)
        }
    }, null, null, Editor.ctrlKey + "+D");
    this.put("turn", new Action(mxResources.get("turn") + " / " + mxResources.get("reverse"), function(b) {
        a.turnShapes(a.getSelectionCells(), null != b ? mxEvent.isShiftDown(b) :
            !1)
    }, null, null, Editor.ctrlKey + "+R"));
    this.addAction("selectVertices", function() {
        a.selectVertices(null, !0)
    }, null, null, Editor.ctrlKey + "+Shift+I");
    this.addAction("selectEdges", function() {
        a.selectEdges()
    }, null, null, Editor.ctrlKey + "+Shift+E");
    this.addAction("selectAll", function() {
        a.selectAll(null, !0)
    }, null, null, Editor.ctrlKey + "+A");
    this.addAction("selectNone", function() {
        a.clearSelection()
    }, null, null, Editor.ctrlKey + "+Shift+A");
    this.addAction("lockUnlock", function() {
        if (!a.isSelectionEmpty()) {
            a.getModel().beginUpdate();
            try {
                var b = a.isCellMovable(a.getSelectionCell()) ? 1 : 0;
                a.toggleCellStyles(mxConstants.STYLE_MOVABLE, b);
                a.toggleCellStyles(mxConstants.STYLE_RESIZABLE, b);
                a.toggleCellStyles(mxConstants.STYLE_ROTATABLE, b);
                a.toggleCellStyles(mxConstants.STYLE_DELETABLE, b);
                a.toggleCellStyles(mxConstants.STYLE_EDITABLE, b);
                a.toggleCellStyles("connectable", b)
            } finally {
                a.getModel().endUpdate()
            }
        }
    }, null, null, Editor.ctrlKey + "+L");
    this.addAction("home", function() {
        a.home()
    }, null, null, "Shift+Home");
    this.addAction("exitGroup", function() {
            a.exitGroup()
        },
        null, null, Editor.ctrlKey + "+Shift+Home");
    this.addAction("enterGroup", function() {
        a.enterGroup()
    }, null, null, Editor.ctrlKey + "+Shift+End");
    this.addAction("collapse", function() {
        a.foldCells(!0)
    }, null, null, Editor.ctrlKey + "+Home");
    this.addAction("expand", function() {
        a.foldCells(!1)
    }, null, null, Editor.ctrlKey + "+End");
    this.addAction("toFront", function() {
        a.orderCells(!1)
    }, null, null, Editor.ctrlKey + "+Shift+F");
    this.addAction("toBack", function() {
        a.orderCells(!0)
    }, null, null, Editor.ctrlKey + "+Shift+B");
    this.addAction("group",
        function() {
            if (a.isEnabled()) {
                var b = mxUtils.sortCells(a.getSelectionCells(), !0);
                1 != b.length || a.isTable(b[0]) || a.isTableRow(b[0]) ? (b = a.getCellsForGroup(b), 1 < b.length && a.setSelectionCell(a.groupCells(null, 0, b))) : a.setCellStyles("container", "1")
            }
        }, null, null, Editor.ctrlKey + "+G");
    this.addAction("ungroup", function() {
        if (a.isEnabled()) {
            var b = a.getSelectionCells();
            a.model.beginUpdate();
            try {
                var d = a.ungroupCells();
                if (null != b)
                    for (var c = 0; c < b.length; c++) a.model.contains(b[c]) && (0 == a.model.getChildCount(b[c]) &&
                        a.model.isVertex(b[c]) && a.setCellStyles("container", "0", [b[c]]), d.push(b[c]))
            } finally {
                a.model.endUpdate()
            }
            a.setSelectionCells(d)
        }
    }, null, null, Editor.ctrlKey + "+Shift+U");
    this.addAction("removeFromGroup", function() {
        if (a.isEnabled()) {
            var b = a.getSelectionCells();
            if (null != b) {
                for (var d = [], c = 0; c < b.length; c++) a.isTableRow(b[c]) || a.isTableCell(b[c]) || d.push(b[c]);
                a.removeCellsFromParent(d)
            }
        }
    });
    this.addAction("edit", function() {
        a.isEnabled() && a.startEditingAtCell()
    }, null, null, "F2/Enter");
    this.addAction("editData...",
        function() {
            var b = a.getSelectionCell() || a.getModel().getRoot();
            c.showDataDialog(b)
        }, null, null, Editor.ctrlKey + "+M");
    this.addAction("editTooltip...", function() {
        if (a.isEnabled() && !a.isSelectionEmpty()) {
            var b = a.getSelectionCell(),
                d = "";
            if (mxUtils.isNode(b.value)) {
                var g = null;
                Graph.translateDiagram && null != Graph.diagramLanguage && b.value.hasAttribute("tooltip_" + Graph.diagramLanguage) && (g = b.value.getAttribute("tooltip_" + Graph.diagramLanguage));
                null == g && (g = b.value.getAttribute("tooltip"));
                null != g && (d = g)
            }
            d = new TextareaDialog(c,
                mxResources.get("editTooltip") + ":", d,
                function(d) {
                    a.setTooltipForCell(b, d)
                });
            c.showDialog(d.container, 320, 200, !0, !0);
            d.init()
        }
    }, null, null, "Alt+Shift+T");
    this.addAction("openLink", function() {
        var b = a.getLinkForCell(a.getSelectionCell());
        null != b && a.openLink(b)
    });
    this.addAction("editLink...", function() {
        if (a.isEnabled() && !a.isSelectionEmpty()) {
            var b = a.getSelectionCell(),
                d = a.getLinkForCell(b) || "";
            c.showLinkDialog(d, mxResources.get("apply"), function(d, c, e) {
                d = mxUtils.trim(d);
                a.setLinkForCell(b, 0 < d.length ?
                    d : null);
                a.setAttributeForCell(b, "linkTarget", e)
            }, !0, a.getLinkTargetForCell(b))
        }
    }, null, null, "Alt+Shift+L");
    this.put("insertImage", new Action(mxResources.get("image") + "...", function() {
        a.isEnabled() && !a.isCellLocked(a.getDefaultParent()) && (a.clearSelection(), c.actions.get("image").funct())
    })).isEnabled = k;
    this.put("insertLink", new Action(mxResources.get("link") + "...", function() {
        a.isEnabled() && !a.isCellLocked(a.getDefaultParent()) && c.showLinkDialog("", mxResources.get("insert"), function(b, d, c) {
            b = mxUtils.trim(b);
            if (0 < b.length) {
                var g = null,
                    e = a.getLinkTitle(b);
                null != d && 0 < d.length && (g = d[0].iconUrl, e = d[0].name || d[0].type, e = e.charAt(0).toUpperCase() + e.substring(1), 30 < e.length && (e = e.substring(0, 30) + "..."));
                d = new mxCell(e, new mxGeometry(0, 0, 100, 40), "fontColor=#0000EE;fontStyle=4;rounded=1;overflow=hidden;" + (null != g ? "shape=label;imageWidth=16;imageHeight=16;spacingLeft=26;align=left;image=" + g : "spacing=10;"));
                d.vertex = !0;
                g = a.getCenterInsertPoint(a.getBoundingBoxFromGeometry([d], !0));
                d.geometry.x = g.x;
                d.geometry.y = g.y;
                a.setAttributeForCell(d, "linkTarget", c);
                a.setLinkForCell(d, b);
                a.cellSizeUpdated(d, !0);
                a.getModel().beginUpdate();
                try {
                    d = a.addCell(d), a.fireEvent(new mxEventObject("cellsInserted", "cells", [d]))
                } finally {
                    a.getModel().endUpdate()
                }
                a.setSelectionCell(d);
                a.scrollCellToVisible(a.getSelectionCell())
            }
        }, !0)
    })).isEnabled = k;
    this.addAction("link...", mxUtils.bind(this, function() {
        if (a.isEnabled())
            if (a.cellEditor.isContentEditing()) {
                var b = a.getSelectedElement(),
                    d = a.getParentByName(b, "A", a.cellEditor.textarea),
                    g = "";
                if (null == d && null != b && null != b.getElementsByTagName)
                    for (var e = b.getElementsByTagName("a"), h = 0; h < e.length && null == d; h++) e[h].textContent == b.textContent && (d = e[h]);
                null != d && "A" == d.nodeName && (g = d.getAttribute("href") || "", a.selectNode(d));
                var f = a.cellEditor.saveSelection();
                c.showLinkDialog(g, mxResources.get("apply"), mxUtils.bind(this, function(b) {
                    a.cellEditor.restoreSelection(f);
                    null != b && a.insertLink(b)
                }))
            } else a.isSelectionEmpty() ? this.get("insertLink").funct() : this.get("editLink").funct()
    })).isEnabled = k;
    this.addAction("autosize", function() {
            var b = a.getSelectionCells();
            if (null != b) {
                a.getModel().beginUpdate();
                try {
                    for (var d = 0; d < b.length; d++) {
                        var c = b[d];
                        if (a.getModel().getChildCount(c)) a.updateGroupBounds([c], 20);
                        else {
                            var e = a.view.getState(c),
                                h = a.getCellGeometry(c);
                            a.getModel().isVertex(c) && null != e && null != e.text && null != h && a.isWrapping(c) ? (h = h.clone(), h.height = e.text.boundingBox.height / a.view.scale, a.getModel().setGeometry(c, h)) : a.updateCellSize(c)
                        }
                    }
                } finally {
                    a.getModel().endUpdate()
                }
            }
        }, null, null, Editor.ctrlKey +
        "+Shift+Y");
    this.addAction("formattedText", function() {
        a.stopEditing();
        var b = a.getCommonStyle(a.getSelectionCells());
        b = "1" == mxUtils.getValue(b, "html", "0") ? null : "1";
        a.getModel().beginUpdate();
        try {
            for (var d = a.getSelectionCells(), e = 0; e < d.length; e++)
                if (state = a.getView().getState(d[e]), null != state) {
                    var f = mxUtils.getValue(state.style, "html", "0");
                    if ("1" == f && null == b) {
                        var h = a.convertValueToString(state.cell);
                        "0" != mxUtils.getValue(state.style, "nl2Br", "1") && (h = h.replace(/\n/g, "").replace(/<br\s*.?>/g, "\n"));
                        var q = document.createElement("div");
                        q.innerHTML = a.sanitizeHtml(h);
                        h = mxUtils.extractTextWithWhitespace(q.childNodes);
                        a.cellLabelChanged(state.cell, h);
                        a.setCellStyles("html", b, [d[e]])
                    } else "0" == f && "1" == b && (h = mxUtils.htmlEntities(a.convertValueToString(state.cell), !1), "0" != mxUtils.getValue(state.style, "nl2Br", "1") && (h = h.replace(/\n/g, "<br/>")), a.cellLabelChanged(state.cell, a.sanitizeHtml(h)), a.setCellStyles("html", b, [d[e]]))
                } c.fireEvent(new mxEventObject("styleChanged", "keys", ["html"], "values", [null !=
                b ? b : "0"
            ], "cells", d))
        } finally {
            a.getModel().endUpdate()
        }
    });
    this.addAction("wordWrap", function() {
        var b = a.getView().getState(a.getSelectionCell()),
            d = "wrap";
        a.stopEditing();
        null != b && "wrap" == b.style[mxConstants.STYLE_WHITE_SPACE] && (d = null);
        a.setCellStyles(mxConstants.STYLE_WHITE_SPACE, d)
    });
    this.addAction("rotation", function() {
        var b = "0",
            d = a.getView().getState(a.getSelectionCell());
        null != d && (b = d.style[mxConstants.STYLE_ROTATION] || b);
        b = new FilenameDialog(c, b, mxResources.get("apply"), function(b) {
            null != b && 0 <
                b.length && a.setCellStyles(mxConstants.STYLE_ROTATION, b)
        }, mxResources.get("enterValue") + " (" + mxResources.get("rotation") + " 0-360)");
        c.showDialog(b.container, 375, 80, !0, !0);
        b.init()
    });
    this.addAction("resetView", function() {
        a.zoomTo(1);
        c.resetScrollbars()
    }, null, null, "Home");
    this.addAction("zoomIn", function(b) {
        a.isFastZoomEnabled() ? a.lazyZoom(!0, !0, c.buttonZoomDelay) : a.zoomIn()
    }, null, null, Editor.ctrlKey + " + (Numpad) / Alt+Mousewheel");
    this.addAction("zoomOut", function(b) {
        a.isFastZoomEnabled() ? a.lazyZoom(!1,
            !0, c.buttonZoomDelay) : a.zoomOut()
    }, null, null, Editor.ctrlKey + " - (Numpad) / Alt+Mousewheel");
    this.addAction("fitWindow", function() {
        var b = a.isSelectionEmpty() ? a.getGraphBounds() : a.getBoundingBox(a.getSelectionCells()),
            d = a.view.translate,
            e = a.view.scale;
        b.x = b.x / e - d.x;
        b.y = b.y / e - d.y;
        b.width /= e;
        b.height /= e;
        null != a.backgroundImage && b.add(new mxRectangle(0, 0, a.backgroundImage.width, a.backgroundImage.height));
        0 == b.width || 0 == b.height ? (a.zoomTo(1), c.resetScrollbars()) : (d = Editor.fitWindowBorders, null != d && (b.x -=
            d.x, b.y -= d.y, b.width += d.width + d.x, b.height += d.height + d.y), a.fitWindow(b))
    }, null, null, Editor.ctrlKey + "+Shift+H");
    this.addAction("fitPage", mxUtils.bind(this, function() {
        a.pageVisible || this.get("pageView").funct();
        var b = a.pageFormat,
            d = a.pageScale;
        a.zoomTo(Math.floor(20 * Math.min((a.container.clientWidth - 10) / b.width / d, (a.container.clientHeight - 10) / b.height / d)) / 20);
        mxUtils.hasScrollbars(a.container) && (b = a.getPagePadding(), a.container.scrollTop = b.y * a.view.scale - 1, a.container.scrollLeft = Math.min(b.x * a.view.scale,
            (a.container.scrollWidth - a.container.clientWidth) / 2) - 1)
    }), null, null, Editor.ctrlKey + "+J");
    this.addAction("fitTwoPages", mxUtils.bind(this, function() {
        a.pageVisible || this.get("pageView").funct();
        var b = a.pageFormat,
            d = a.pageScale;
        a.zoomTo(Math.floor(20 * Math.min((a.container.clientWidth - 10) / (2 * b.width) / d, (a.container.clientHeight - 10) / b.height / d)) / 20);
        mxUtils.hasScrollbars(a.container) && (b = a.getPagePadding(), a.container.scrollTop = Math.min(b.y, (a.container.scrollHeight - a.container.clientHeight) / 2), a.container.scrollLeft =
            Math.min(b.x, (a.container.scrollWidth - a.container.clientWidth) / 2))
    }), null, null, Editor.ctrlKey + "+Shift+J");
    this.addAction("fitPageWidth", mxUtils.bind(this, function() {
        a.pageVisible || this.get("pageView").funct();
        a.zoomTo(Math.floor(20 * (a.container.clientWidth - 10) / a.pageFormat.width / a.pageScale) / 20);
        if (mxUtils.hasScrollbars(a.container)) {
            var b = a.getPagePadding();
            a.container.scrollLeft = Math.min(b.x * a.view.scale, (a.container.scrollWidth - a.container.clientWidth) / 2)
        }
    }));
    this.put("customZoom", new Action(mxResources.get("custom") +
        "...", mxUtils.bind(this, function() {
            var b = new FilenameDialog(this.editorUi, parseInt(100 * a.getView().getScale()), mxResources.get("apply"), mxUtils.bind(this, function(b) {
                b = parseInt(b);
                !isNaN(b) && 0 < b && a.zoomTo(b / 100)
            }), mxResources.get("zoom") + " (%)");
            this.editorUi.showDialog(b.container, 300, 80, !0, !0);
            b.init()
        }), null, null, Editor.ctrlKey + "+0"));
    this.addAction("pageScale...", mxUtils.bind(this, function() {
        var b = new FilenameDialog(this.editorUi, parseInt(100 * a.pageScale), mxResources.get("apply"), mxUtils.bind(this,
            function(b) {
                b = parseInt(b);
                !isNaN(b) && 0 < b && (b = new ChangePageSetup(c, null, null, null, b / 100), b.ignoreColor = !0, b.ignoreImage = !0, a.model.execute(b))
            }), mxResources.get("pageScale") + " (%)");
        this.editorUi.showDialog(b.container, 300, 80, !0, !0);
        b.init()
    }));
    var e = null;
    e = this.addAction("grid", function() {
        a.setGridEnabled(!a.isGridEnabled());
        c.fireEvent(new mxEventObject("gridEnabledChanged"))
    }, null, null, Editor.ctrlKey + "+Shift+G");
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.isGridEnabled()
    });
    e.setEnabled(!1);
    e = this.addAction("guides", function() {
        a.graphHandler.guidesEnabled = !a.graphHandler.guidesEnabled;
        c.fireEvent(new mxEventObject("guidesEnabledChanged"))
    });
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.graphHandler.guidesEnabled
    });
    e.setEnabled(!1);
    e = this.addAction("tooltips", function() {
        a.tooltipHandler.setEnabled(!a.tooltipHandler.isEnabled());
        c.fireEvent(new mxEventObject("tooltipsEnabledChanged"))
    });
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.tooltipHandler.isEnabled()
    });
    e = this.addAction("collapseExpand", function() {
        var b = new ChangePageSetup(c);
        b.ignoreColor = !0;
        b.ignoreImage = !0;
        b.foldingEnabled = !a.foldingEnabled;
        a.model.execute(b)
    });
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.foldingEnabled
    });
    e.isEnabled = k;
    e = this.addAction("scrollbars", function() {
        c.setScrollbars(!c.hasScrollbars())
    });
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.scrollbars
    });
    e = this.addAction("pageView", mxUtils.bind(this, function() {
        c.setPageVisible(!a.pageVisible)
    }));
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.pageVisible
    });
    e = this.addAction("connectionArrows", function() {
        a.connectionArrowsEnabled = !a.connectionArrowsEnabled;
        c.fireEvent(new mxEventObject("connectionArrowsChanged"))
    }, null, null, "Alt+Shift+A");
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.connectionArrowsEnabled
    });
    e = this.addAction("connectionPoints", function() {
            a.setConnectable(!a.connectionHandler.isEnabled());
            c.fireEvent(new mxEventObject("connectionPointsChanged"))
        },
        null, null, "Alt+Shift+P");
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.connectionHandler.isEnabled()
    });
    e = this.addAction("copyConnect", function() {
        a.connectionHandler.setCreateTarget(!a.connectionHandler.isCreateTarget());
        c.fireEvent(new mxEventObject("copyConnectChanged"))
    });
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return a.connectionHandler.isCreateTarget()
    });
    e.isEnabled = k;
    e = this.addAction("autosave", function() {
        c.editor.setAutosave(!c.editor.autosave)
    });
    e.setToggleAction(!0);
    e.setSelectedCallback(function() {
        return c.editor.autosave
    });
    e.isEnabled = k;
    e.visible = !1;
    this.addAction("help", function() {
        var b = "";
        mxResources.isLanguageSupported(mxClient.language) && (b = "_" + mxClient.language);
        a.openLink(RESOURCES_PATH + "/help" + b + ".html")
    });
    var p = !1;
    this.put("about", new Action(mxResources.get("about") + " Graph Editor...", function() {
        p || (c.showDialog((new AboutDialog(c)).container, 320, 280, !0, !0, function() {
            p = !1
        }), p = !0)
    }));
    e = mxUtils.bind(this, function(b, c, e, f) {
        return this.addAction(b, function() {
            if (null !=
                e && a.cellEditor.isContentEditing()) e();
            else {
                a.stopEditing(!1);
                a.getModel().beginUpdate();
                try {
                    var b = a.getSelectionCells();
                    a.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, c, b);
                    (c & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD ? a.updateLabelElements(a.getSelectionCells(), function(b) {
                            b.style.fontWeight = null;
                            "B" == b.nodeName && a.replaceElement(b)
                        }) : (c & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC ? a.updateLabelElements(a.getSelectionCells(), function(b) {
                            b.style.fontStyle = null;
                            "I" == b.nodeName && a.replaceElement(b)
                        }) :
                        (c & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE && a.updateLabelElements(a.getSelectionCells(), function(b) {
                            b.style.textDecoration = null;
                            "U" == b.nodeName && a.replaceElement(b)
                        });
                    for (var d = 0; d < b.length; d++) 0 == a.model.getChildCount(b[d]) && a.autoSizeCell(b[d], !1)
                } finally {
                    a.getModel().endUpdate()
                }
            }
        }, null, null, f)
    });
    e("bold", mxConstants.FONT_BOLD, function() {
        document.execCommand("bold", !1, null)
    }, Editor.ctrlKey + "+B");
    e("italic", mxConstants.FONT_ITALIC, function() {
            document.execCommand("italic", !1, null)
        },
        Editor.ctrlKey + "+I");
    e("underline", mxConstants.FONT_UNDERLINE, function() {
        document.execCommand("underline", !1, null)
    }, Editor.ctrlKey + "+U");
    this.addAction("fontColor...", function() {
        c.menus.pickColor(mxConstants.STYLE_FONTCOLOR, "forecolor", "000000")
    });
    this.addAction("strokeColor...", function() {
        c.menus.pickColor(mxConstants.STYLE_STROKECOLOR)
    });
    this.addAction("fillColor...", function() {
        c.menus.pickColor(mxConstants.STYLE_FILLCOLOR)
    });
    this.addAction("gradientColor...", function() {
        c.menus.pickColor(mxConstants.STYLE_GRADIENTCOLOR)
    });
    this.addAction("backgroundColor...", function() {
        c.menus.pickColor(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, "backcolor")
    });
    this.addAction("borderColor...", function() {
        c.menus.pickColor(mxConstants.STYLE_LABEL_BORDERCOLOR)
    });
    this.addAction("vertical", function() {
        c.menus.toggleStyle(mxConstants.STYLE_HORIZONTAL, !0)
    });
    this.addAction("shadow", function() {
        c.menus.toggleStyle(mxConstants.STYLE_SHADOW)
    });
    this.addAction("solid", function() {
        a.getModel().beginUpdate();
        try {
            a.setCellStyles(mxConstants.STYLE_DASHED,
                null), a.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null), c.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], "values", [null, null], "cells", a.getSelectionCells()))
        } finally {
            a.getModel().endUpdate()
        }
    });
    this.addAction("dashed", function() {
        a.getModel().beginUpdate();
        try {
            a.setCellStyles(mxConstants.STYLE_DASHED, "1"), a.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null), c.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_DASHED,
                mxConstants.STYLE_DASH_PATTERN
            ], "values", ["1", null], "cells", a.getSelectionCells()))
        } finally {
            a.getModel().endUpdate()
        }
    });
    this.addAction("dotted", function() {
        a.getModel().beginUpdate();
        try {
            a.setCellStyles(mxConstants.STYLE_DASHED, "1"), a.setCellStyles(mxConstants.STYLE_DASH_PATTERN, "1 4"), c.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], "values", ["1", "1 4"], "cells", a.getSelectionCells()))
        } finally {
            a.getModel().endUpdate()
        }
    });
    this.addAction("sharp",
        function() {
            a.getModel().beginUpdate();
            try {
                a.setCellStyles(mxConstants.STYLE_ROUNDED, "0"), a.setCellStyles(mxConstants.STYLE_CURVED, "0"), c.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], "values", ["0", "0"], "cells", a.getSelectionCells()))
            } finally {
                a.getModel().endUpdate()
            }
        });
    this.addAction("rounded", function() {
        a.getModel().beginUpdate();
        try {
            a.setCellStyles(mxConstants.STYLE_ROUNDED, "1"), a.setCellStyles(mxConstants.STYLE_CURVED, "0"), c.fireEvent(new mxEventObject("styleChanged",
                "keys", [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], "values", ["1", "0"], "cells", a.getSelectionCells()))
        } finally {
            a.getModel().endUpdate()
        }
    });
    this.addAction("toggleRounded", function() {
        if (!a.isSelectionEmpty() && a.isEnabled()) {
            a.getModel().beginUpdate();
            try {
                var b = a.getSelectionCells(),
                    d = a.getCurrentCellStyle(b[0]),
                    e = "1" == mxUtils.getValue(d, mxConstants.STYLE_ROUNDED, "0") ? "0" : "1";
                a.setCellStyles(mxConstants.STYLE_ROUNDED, e);
                a.setCellStyles(mxConstants.STYLE_CURVED, null);
                c.fireEvent(new mxEventObject("styleChanged",
                    "keys", [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], "values", [e, "0"], "cells", a.getSelectionCells()))
            } finally {
                a.getModel().endUpdate()
            }
        }
    });
    this.addAction("curved", function() {
        a.getModel().beginUpdate();
        try {
            a.setCellStyles(mxConstants.STYLE_ROUNDED, "0"), a.setCellStyles(mxConstants.STYLE_CURVED, "1"), c.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], "values", ["0", "1"], "cells", a.getSelectionCells()))
        } finally {
            a.getModel().endUpdate()
        }
    });
    this.addAction("collapsible",
        function() {
            var b = a.view.getState(a.getSelectionCell()),
                d = "1";
            null != b && null != a.getFoldingImage(b) && (d = "0");
            a.setCellStyles("collapsible", d);
            c.fireEvent(new mxEventObject("styleChanged", "keys", ["collapsible"], "values", [d], "cells", a.getSelectionCells()))
        });
    this.addAction("editStyle...", mxUtils.bind(this, function() {
        var b = a.getSelectionCells();
        if (null != b && 0 < b.length) {
            var c = a.getModel();
            c = new TextareaDialog(this.editorUi, mxResources.get("editStyle") + ":", c.getStyle(b[0]) || "", function(c) {
                null != c && a.setCellStyle(mxUtils.trim(c),
                    b)
            }, null, null, 400, 220);
            this.editorUi.showDialog(c.container, 420, 300, !0, !0);
            c.init()
        }
    }), null, null, Editor.ctrlKey + "+E");
    this.addAction("setAsDefaultStyle", function() {
        a.isEnabled() && !a.isSelectionEmpty() && c.setDefaultStyle(a.getSelectionCell())
    }, null, null, Editor.ctrlKey + "+Shift+D");
    this.addAction("clearDefaultStyle", function() {
        a.isEnabled() && c.clearDefaultStyle()
    }, null, null, Editor.ctrlKey + "+Shift+R");
    this.addAction("addWaypoint", function() {
        var b = a.getSelectionCell();
        if (null != b && a.getModel().isEdge(b)) {
            var c =
                l.graph.selectionCellsHandler.getHandler(b);
            if (c instanceof mxEdgeHandler) {
                var e = a.view.translate,
                    f = a.view.scale,
                    h = e.x;
                e = e.y;
                b = a.getModel().getParent(b);
                for (var k = a.getCellGeometry(b); a.getModel().isVertex(b) && null != k;) h += k.x, e += k.y, b = a.getModel().getParent(b), k = a.getCellGeometry(b);
                h = Math.round(a.snap(a.popupMenuHandler.triggerX / f - h));
                f = Math.round(a.snap(a.popupMenuHandler.triggerY / f - e));
                c.addPointAt(c.state, h, f)
            }
        }
    });
    this.addAction("removeWaypoint", function() {
        var a = c.actions.get("removeWaypoint");
        null != a.handler && a.handler.removePoint(a.handler.state, a.index)
    });
    this.addAction("clearWaypoints", function() {
        var b = a.getSelectionCells();
        if (null != b) {
            b = a.addAllEdges(b);
            a.getModel().beginUpdate();
            try {
                for (var c = 0; c < b.length; c++) {
                    var e = b[c];
                    if (a.getModel().isEdge(e)) {
                        var f = a.getCellGeometry(e);
                        null != f && (f = f.clone(), f.points = null, f.x = 0, f.y = 0, f.offset = null, a.getModel().setGeometry(e, f))
                    }
                }
            } finally {
                a.getModel().endUpdate()
            }
        }
    }, null, null, "Alt+Shift+C");
    e = this.addAction("subscript", mxUtils.bind(this, function() {
        a.cellEditor.isContentEditing() &&
            document.execCommand("subscript", !1, null)
    }), null, null, Editor.ctrlKey + "+,");
    e = this.addAction("superscript", mxUtils.bind(this, function() {
        a.cellEditor.isContentEditing() && document.execCommand("superscript", !1, null)
    }), null, null, Editor.ctrlKey + "+.");
    e = this.addAction("indent", mxUtils.bind(this, function() {
        a.cellEditor.isContentEditing() && document.execCommand("indent", !1, null)
    }), null, null, "Shift+Tab");
    this.addAction("image...", function() {
        if (a.isEnabled() && !a.isCellLocked(a.getDefaultParent())) {
            var b = mxResources.get("image") +
                " (" + mxResources.get("url") + "):",
                d = a.getView().getState(a.getSelectionCell()),
                e = "";
            null != d && (e = d.style[mxConstants.STYLE_IMAGE] || e);
            var f = a.cellEditor.saveSelection();
            c.showImageDialog(b, e, function(b, c, d) {
                if (a.cellEditor.isContentEditing()) a.cellEditor.restoreSelection(f), a.insertImage(b, c, d);
                else {
                    var e = a.getSelectionCells();
                    if (null != b && (0 < b.length || 0 < e.length)) {
                        var g = null;
                        a.getModel().beginUpdate();
                        try {
                            if (0 == e.length) {
                                e = [a.insertVertex(a.getDefaultParent(), null, "", 0, 0, c, d, "shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;")];
                                var h = a.getCenterInsertPoint(a.getBoundingBoxFromGeometry(e, !0));
                                e[0].geometry.x = h.x;
                                e[0].geometry.y = h.y;
                                g = e;
                                a.fireEvent(new mxEventObject("cellsInserted", "cells", g))
                            }
                            a.setCellStyles(mxConstants.STYLE_IMAGE, 0 < b.length ? b : null, e);
                            var k = a.getCurrentCellStyle(e[0]);
                            "image" != k[mxConstants.STYLE_SHAPE] && "label" != k[mxConstants.STYLE_SHAPE] ? a.setCellStyles(mxConstants.STYLE_SHAPE, "image", e) : 0 == b.length && a.setCellStyles(mxConstants.STYLE_SHAPE, null, e);
                            if (1 == a.getSelectionCount() && null != c && null != d) {
                                var l = e[0],
                                    m = a.getModel().getGeometry(l);
                                null != m && (m = m.clone(), m.width = c, m.height = d, a.getModel().setGeometry(l, m))
                            }
                        } finally {
                            a.getModel().endUpdate()
                        }
                        null != g && (a.setSelectionCells(g), a.scrollCellToVisible(g[0]))
                    }
                }
            }, a.cellEditor.isContentEditing(), !a.cellEditor.isContentEditing())
        }
    }).isEnabled = k;
    e = this.addAction("layers", mxUtils.bind(this, function() {
        null == this.layersWindow ? (this.layersWindow = new LayersWindow(c, document.body.offsetWidth - 280, 120, 220, 196), this.layersWindow.window.addListener("show", function() {
                c.fireEvent(new mxEventObject("layers"))
            }),
            this.layersWindow.window.addListener("hide", function() {
                c.fireEvent(new mxEventObject("layers"))
            }), this.layersWindow.window.setVisible(!0), c.fireEvent(new mxEventObject("layers")), this.layersWindow.init()) : this.layersWindow.window.setVisible(!this.layersWindow.window.isVisible())
    }), null, null, Editor.ctrlKey + "+Shift+L");
    e.setToggleAction(!0);
    e.setSelectedCallback(mxUtils.bind(this, function() {
        return null != this.layersWindow && this.layersWindow.window.isVisible()
    }));
    e = this.addAction("formatPanel", mxUtils.bind(this,
        function() {
            c.toggleFormatPanel()
        }), null, null, Editor.ctrlKey + "+Shift+P");
    e.setToggleAction(!0);
    e.setSelectedCallback(mxUtils.bind(this, function() {
        return 0 < c.formatWidth
    }));
    e = this.addAction("outline", mxUtils.bind(this, function() {
        null == this.outlineWindow ? (this.outlineWindow = new OutlineWindow(c, document.body.offsetWidth - 260, 100, 180, 180), this.outlineWindow.window.addListener("show", function() {
                c.fireEvent(new mxEventObject("outline"))
            }), this.outlineWindow.window.addListener("hide", function() {
                c.fireEvent(new mxEventObject("outline"))
            }),
            this.outlineWindow.window.setVisible(!0), c.fireEvent(new mxEventObject("outline"))) : this.outlineWindow.window.setVisible(!this.outlineWindow.window.isVisible())
    }), null, null, Editor.ctrlKey + "+Shift+O");
    e.setToggleAction(!0);
    e.setSelectedCallback(mxUtils.bind(this, function() {
        return null != this.outlineWindow && this.outlineWindow.window.isVisible()
    }))
};
Actions.prototype.addAction = function(f, c, l, a, k) {
    if ("..." == f.substring(f.length - 3)) {
        f = f.substring(0, f.length - 3);
        var e = mxResources.get(f) + "..."
    } else e = mxResources.get(f);
    return this.put(f, new Action(e, c, l, a, k))
};
Actions.prototype.put = function(f, c) {
    return this.actions[f] = c
};
Actions.prototype.get = function(f) {
    return this.actions[f]
};

function Action(f, c, l, a, k) {
    mxEventSource.call(this);
    this.label = f;
    this.funct = this.createFunction(c);
    this.enabled = null != l ? l : !0;
    this.iconCls = a;
    this.shortcut = k;
    this.visible = !0
}
mxUtils.extend(Action, mxEventSource);
Action.prototype.createFunction = function(f) {
    return f
};
Action.prototype.setEnabled = function(f) {
    this.enabled != f && (this.enabled = f, this.fireEvent(new mxEventObject("stateChanged")))
};
Action.prototype.isEnabled = function() {
    return this.enabled
};
Action.prototype.setToggleAction = function(f) {
    this.toggleAction = f
};
Action.prototype.setSelectedCallback = function(f) {
    this.selectedCallback = f
};
Action.prototype.isSelected = function() {
    return this.selectedCallback()
};