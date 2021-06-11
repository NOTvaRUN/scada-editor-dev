function Toolbar(a, b) {
    this.editorUi = a;
    this.container = b;
    this.staticElements = [];
    this.init();
    this.gestureHandler = mxUtils.bind(this, function(a) {
        null != this.editorUi.currentMenu && mxEvent.getSource(a) != this.editorUi.currentMenu.div && this.hideMenu()
    });
    mxEvent.addGestureListeners(document, this.gestureHandler)
}
Toolbar.prototype.dropdownImage = mxClient.IS_SVG ? "data:image/gif;base64,R0lGODlhDQANAIABAHt7e////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREM1NkJFMjE0NEMxMUU1ODk1Q0M5MjQ0MTA4QjNDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREM1NkJFMzE0NEMxMUU1ODk1Q0M5MjQ0MTA4QjNDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQzOUMzMjZCMTQ0QjExRTU4OTVDQzkyNDQxMDhCM0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQzOUMzMjZDMTQ0QjExRTU4OTVDQzkyNDQxMDhCM0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7" : IMAGE_PATH +
    "/dropdown.gif";
Toolbar.prototype.dropdownImageHtml = '<img border="0" style="position:absolute;right:4px;top:' + (EditorUi.compactUi ? 6 : 8) + 'px;" src="' + Toolbar.prototype.dropdownImage + '" valign="middle"/>';
Toolbar.prototype.selectedBackground = "#d0d0d0";
Toolbar.prototype.unselectedBackground = "none";
Toolbar.prototype.staticElements = null;
Toolbar.prototype.init = function() {
    var a = screen.width;
    a -= 740 < screen.height ? 56 : 0;
    if (700 <= a) {
        var b = this.addMenu("", mxResources.get("view") + " (" + mxResources.get("panTooltip") + ")", !0, "viewPanels", null, !0);
        this.addDropDownArrow(b, "geSprite-formatpanel", 38, 50, -4, -3, 36, -8);
        this.addSeparator()
    }
    var c = this.addMenu("", mxResources.get("zoom") + " (Alt+Mousewheel)", !0, "viewZoom", null, !0);
    c.showDisabled = !0;
    c.style.whiteSpace = "nowrap";
    c.style.position = "relative";
    c.style.overflow = "hidden";
    c.style.width = EditorUi.compactUi ?
        "50px" : "36px";
    420 <= a && (this.addSeparator(), b = this.addItems(["zoomIn", "zoomOut"]), b[0].setAttribute("title", mxResources.get("zoomIn") + " (" + this.editorUi.actions.get("zoomIn").shortcut + ")"), b[1].setAttribute("title", mxResources.get("zoomOut") + " (" + this.editorUi.actions.get("zoomOut").shortcut + ")"));
    this.updateZoom = mxUtils.bind(this, function() {
        c.innerHTML = Math.round(100 * this.editorUi.editor.graph.view.scale) + "%" + this.dropdownImageHtml;
        EditorUi.compactUi && (c.getElementsByTagName("img")[0].style.right =
            "1px", c.getElementsByTagName("img")[0].style.top = "5px")
    });
    this.editorUi.editor.graph.view.addListener(mxEvent.EVENT_SCALE, this.updateZoom);
    this.editorUi.editor.addListener("resetGraphView", this.updateZoom);
    b = this.addItems(["-", "undo", "redo"]);
    b[1].setAttribute("title", mxResources.get("undo") + " (" + this.editorUi.actions.get("undo").shortcut + ")");
    b[2].setAttribute("title", mxResources.get("redo") + " (" + this.editorUi.actions.get("redo").shortcut + ")");
    320 <= a && (b = this.addItems(["-", "delete"]), b[1].setAttribute("title",
        mxResources.get("delete") + " (" + this.editorUi.actions.get("delete").shortcut + ")"));
    550 <= a && this.addItems(["-", "toFront", "toBack"]);
    740 <= a && (this.addItems(["-", "fillColor"]), 780 <= a && (this.addItems(["strokeColor"]), 820 <= a && this.addItems(["shadow"])));
    400 <= a && (this.addSeparator(), 440 <= a && (this.edgeShapeMenu = this.addMenuFunction("", mxResources.get("connection"), !1, mxUtils.bind(this, function(a) {
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_SHAPE, "width"], [null, null], "geIcon geSprite geSprite-connection",
            null, !0).setAttribute("title", mxResources.get("line"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_SHAPE, "width"], ["link", null], "geIcon geSprite geSprite-linkedge", null, !0).setAttribute("title", mxResources.get("link"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_SHAPE, "width"], ["flexArrow", null], "geIcon geSprite geSprite-arrow", null, !0).setAttribute("title", mxResources.get("arrow"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_SHAPE, "width"], ["arrow",
            null
        ], "geIcon geSprite geSprite-simplearrow", null, !0).setAttribute("title", mxResources.get("simpleArrow"))
    })), this.addDropDownArrow(this.edgeShapeMenu, "geSprite-connection", 44, 50, 0, 0, 22, -4)), this.edgeStyleMenu = this.addMenuFunction("geSprite-orthogonal", mxResources.get("waypoints"), !1, mxUtils.bind(this, function(a) {
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null], "geIcon geSprite geSprite-straight", null, !0).setAttribute("title",
            mxResources.get("straight"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["orthogonalEdgeStyle", null, null], "geIcon geSprite geSprite-orthogonal", null, !0).setAttribute("title", mxResources.get("orthogonal"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["elbowEdgeStyle", null, null, null], "geIcon geSprite geSprite-horizontalelbow",
            null, !0).setAttribute("title", mxResources.get("simple"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["elbowEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalelbow", null, !0).setAttribute("title", mxResources.get("simple"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle",
            null, null, null
        ], "geIcon geSprite geSprite-horizontalisometric", null, !0).setAttribute("title", mxResources.get("isometric"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalisometric", null, !0).setAttribute("title", mxResources.get("isometric"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED,
            mxConstants.STYLE_NOEDGESTYLE
        ], ["orthogonalEdgeStyle", "1", null], "geIcon geSprite geSprite-curved", null, !0).setAttribute("title", mxResources.get("curved"));
        this.editorUi.menus.edgeStyleChange(a, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["entityRelationEdgeStyle", null, null], "geIcon geSprite geSprite-entity", null, !0).setAttribute("title", mxResources.get("entityRelation"))
    })), this.addDropDownArrow(this.edgeStyleMenu, "geSprite-orthogonal", 44, 50, 0, 0, 22, -4));
    this.addSeparator();
    a = this.addMenu("", mxResources.get("insert") + " (" + mxResources.get("doubleClickTooltip") + ")", !0, "insert", null, !0);
    this.addDropDownArrow(a, "geSprite-plus", 38, 48, -4, -3, 36, -8);
    this.addTableDropDown()
};
Toolbar.prototype.addTableDropDown = function() {
    this.addSeparator();
    var a = this.addMenuFunction("geIcon geSprite geSprite-table", mxResources.get("table"), !1, mxUtils.bind(this, function(a) {
        var b = this.editorUi.editor.graph,
            c = b.getSelectionCell();
        if (b.isTableCell(c) || b.isTableRow(c) || b.isTable(c)) {
            var d = a.addItem("", null, mxUtils.bind(this, function() {
                try {
                    b.insertTableColumn(c, !0)
                } catch (f) {
                    this.editorUi.handleError(f)
                }
            }), null, "geIcon geSprite geSprite-insertcolumnbefore");
            d.setAttribute("title", mxResources.get("insertColumnBefore"));
            d = a.addItem("", null, mxUtils.bind(this, function() {
                try {
                    b.insertTableColumn(c, !1)
                } catch (f) {
                    this.editorUi.handleError(f)
                }
            }), null, "geIcon geSprite geSprite-insertcolumnafter");
            d.setAttribute("title", mxResources.get("insertColumnAfter"));
            d = a.addItem("Delete column", null, mxUtils.bind(this, function() {
                if (null != c) try {
                    b.deleteTableColumn(c)
                } catch (f) {
                    this.editorUi.handleError(f)
                }
            }), null, "geIcon geSprite geSprite-deletecolumn");
            d.setAttribute("title", mxResources.get("deleteColumn"));
            d = a.addItem("", null, mxUtils.bind(this,
                function() {
                    try {
                        b.insertTableRow(c, !0)
                    } catch (f) {
                        this.editorUi.handleError(f)
                    }
                }), null, "geIcon geSprite geSprite-insertrowbefore");
            d.setAttribute("title", mxResources.get("insertRowBefore"));
            d = a.addItem("", null, mxUtils.bind(this, function() {
                try {
                    b.insertTableRow(c, !1)
                } catch (f) {
                    this.editorUi.handleError(f)
                }
            }), null, "geIcon geSprite geSprite-insertrowafter");
            d.setAttribute("title", mxResources.get("insertRowAfter"));
            d = a.addItem("", null, mxUtils.bind(this, function() {
                    try {
                        b.deleteTableRow(c)
                    } catch (f) {
                        this.editorUi.handleError(f)
                    }
                }),
                null, "geIcon geSprite geSprite-deleterow");
            d.setAttribute("title", mxResources.get("deleteRow"))
        } else this.editorUi.menus.addInsertTableCellItem(a)
    }));
    a.style.position = "relative";
    a.style.whiteSpace = "nowrap";
    a.style.overflow = "hidden";
    a.innerHTML = '<div class="geSprite geSprite-table" style="margin-left:-2px;"></div>' + this.dropdownImageHtml;
    a.style.width = "30px";
    EditorUi.compactUi && (a.getElementsByTagName("img")[0].style.left = "22px", a.getElementsByTagName("img")[0].style.top = "5px");
    var b = this.editorUi.menus.get("insert");
    null != b && "function" === typeof a.setEnabled && b.addListener("stateChanged", function() {
        a.setEnabled(b.enabled)
    });
    return a
};
Toolbar.prototype.addDropDownArrow = function(a, b, c, h, g, d, f, e) {
    g = EditorUi.compactUi ? g : e;
    a.style.whiteSpace = "nowrap";
    a.style.overflow = "hidden";
    a.style.position = "relative";
    a.innerHTML = '<div class="geSprite ' + b + '" style="margin-left:' + g + "px;margin-top:" + d + 'px;"></div>' + this.dropdownImageHtml;
    a.style.width = h - (null != f ? f : 32) + "px";
    EditorUi.compactUi && (a.getElementsByTagName("img")[0].style.left = "24px", a.getElementsByTagName("img")[0].style.top = "5px", a.style.width = c - 10 + "px")
};
Toolbar.prototype.setFontName = function(a) {
    null != this.fontMenu && (this.fontMenu.innerHTML = '<div style="width:60px;overflow:hidden;display:inline-block;">' + mxUtils.htmlEntities(a) + "</div>" + this.dropdownImageHtml)
};
Toolbar.prototype.setFontSize = function(a) {
    null != this.sizeMenu && (this.sizeMenu.innerHTML = '<div style="width:24px;overflow:hidden;display:inline-block;">' + mxUtils.htmlEntities(a) + "</div>" + this.dropdownImageHtml)
};
Toolbar.prototype.createTextToolbar = function() {
    var a = this.editorUi.editor.graph,
        b = this.addMenu("", mxResources.get("style"), !0, "formatBlock");
    b.style.position = "relative";
    b.style.whiteSpace = "nowrap";
    b.style.overflow = "hidden";
    b.innerHTML = mxResources.get("style") + this.dropdownImageHtml;
    EditorUi.compactUi && (b.style.paddingRight = "18px", b.getElementsByTagName("img")[0].style.right = "1px", b.getElementsByTagName("img")[0].style.top = "5px");
    this.addSeparator();
    this.fontMenu = this.addMenu("", mxResources.get("fontFamily"),
        !0, "fontFamily");
    this.fontMenu.style.position = "relative";
    this.fontMenu.style.whiteSpace = "nowrap";
    this.fontMenu.style.overflow = "hidden";
    this.fontMenu.style.width = "60px";
    this.setFontName(Menus.prototype.defaultFont);
    EditorUi.compactUi && (this.fontMenu.style.paddingRight = "18px", this.fontMenu.getElementsByTagName("img")[0].style.right = "1px", this.fontMenu.getElementsByTagName("img")[0].style.top = "5px");
    this.addSeparator();
    this.sizeMenu = this.addMenu(Menus.prototype.defaultFontSize, mxResources.get("fontSize"),
        !0, "fontSize");
    this.sizeMenu.style.position = "relative";
    this.sizeMenu.style.whiteSpace = "nowrap";
    this.sizeMenu.style.overflow = "hidden";
    this.sizeMenu.style.width = "24px";
    this.setFontSize(Menus.prototype.defaultFontSize);
    EditorUi.compactUi && (this.sizeMenu.style.paddingRight = "18px", this.sizeMenu.getElementsByTagName("img")[0].style.right = "1px", this.sizeMenu.getElementsByTagName("img")[0].style.top = "5px");
    b = this.addItems("- undo redo - bold italic underline".split(" "));
    b[1].setAttribute("title", mxResources.get("undo") +
        " (" + this.editorUi.actions.get("undo").shortcut + ")");
    b[2].setAttribute("title", mxResources.get("redo") + " (" + this.editorUi.actions.get("redo").shortcut + ")");
    b[4].setAttribute("title", mxResources.get("bold") + " (" + this.editorUi.actions.get("bold").shortcut + ")");
    b[5].setAttribute("title", mxResources.get("italic") + " (" + this.editorUi.actions.get("italic").shortcut + ")");
    b[6].setAttribute("title", mxResources.get("underline") + " (" + this.editorUi.actions.get("underline").shortcut + ")");
    b = this.addMenuFunction("",
        mxResources.get("align"), !1, mxUtils.bind(this, function(b) {
            c = b.addItem("", null, mxUtils.bind(this, function(b) {
                a.cellEditor.alignText(mxConstants.ALIGN_LEFT, b)
            }), null, "geIcon geSprite geSprite-left");
            c.setAttribute("title", mxResources.get("left"));
            c = b.addItem("", null, mxUtils.bind(this, function(b) {
                a.cellEditor.alignText(mxConstants.ALIGN_CENTER, b)
            }), null, "geIcon geSprite geSprite-center");
            c.setAttribute("title", mxResources.get("center"));
            c = b.addItem("", null, mxUtils.bind(this, function(b) {
                a.cellEditor.alignText(mxConstants.ALIGN_RIGHT,
                    b)
            }), null, "geIcon geSprite geSprite-right");
            c.setAttribute("title", mxResources.get("right"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                document.execCommand("justifyfull", !1, null)
            }), null, "geIcon geSprite geSprite-justifyfull");
            c.setAttribute("title", mxResources.get("justifyfull"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                document.execCommand("insertorderedlist", !1, null)
            }), null, "geIcon geSprite geSprite-orderedlist");
            c.setAttribute("title", mxResources.get("numberedList"));
            c = b.addItem("",
                null, mxUtils.bind(this, function() {
                    document.execCommand("insertunorderedlist", !1, null)
                }), null, "geIcon geSprite geSprite-unorderedlist");
            c.setAttribute("title", mxResources.get("bulletedList"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                document.execCommand("outdent", !1, null)
            }), null, "geIcon geSprite geSprite-outdent");
            c.setAttribute("title", mxResources.get("decreaseIndent"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                document.execCommand("indent", !1, null)
            }), null, "geIcon geSprite geSprite-indent");
            c.setAttribute("title", mxResources.get("increaseIndent"))
        }));
    b.style.position = "relative";
    b.style.whiteSpace = "nowrap";
    b.style.overflow = "hidden";
    b.innerHTML = '<div class="geSprite geSprite-left" style="margin-left:-2px;"></div>' + this.dropdownImageHtml;
    b.style.width = "30px";
    EditorUi.compactUi && (b.getElementsByTagName("img")[0].style.left = "22px", b.getElementsByTagName("img")[0].style.top = "5px");
    b = this.addMenuFunction("", mxResources.get("format"), !1, mxUtils.bind(this, function(a) {
        c = a.addItem("", null, this.editorUi.actions.get("subscript").funct,
            null, "geIcon geSprite geSprite-subscript");
        c.setAttribute("title", mxResources.get("subscript") + " (" + Editor.ctrlKey + "+,)");
        c = a.addItem("", null, this.editorUi.actions.get("superscript").funct, null, "geIcon geSprite geSprite-superscript");
        c.setAttribute("title", mxResources.get("superscript") + " (" + Editor.ctrlKey + "+.)");
        c = a.addItem("", null, this.editorUi.actions.get("fontColor").funct, null, "geIcon geSprite geSprite-fontcolor");
        c.setAttribute("title", mxResources.get("fontColor"));
        c = a.addItem("", null, this.editorUi.actions.get("backgroundColor").funct,
            null, "geIcon geSprite geSprite-fontbackground");
        c.setAttribute("title", mxResources.get("backgroundColor"));
        c = a.addItem("", null, mxUtils.bind(this, function() {
            document.execCommand("removeformat", !1, null)
        }), null, "geIcon geSprite geSprite-removeformat");
        c.setAttribute("title", mxResources.get("removeFormat"))
    }));
    b.style.position = "relative";
    b.style.whiteSpace = "nowrap";
    b.style.overflow = "hidden";
    b.innerHTML = '<div class="geSprite geSprite-dots" style="margin-left:-2px;"></div>' + this.dropdownImageHtml;
    b.style.width =
        "30px";
    EditorUi.compactUi && (b.getElementsByTagName("img")[0].style.left = "22px", b.getElementsByTagName("img")[0].style.top = "5px");
    this.addSeparator();
    this.addButton("geIcon geSprite geSprite-code", mxResources.get("html"), function() {
        a.cellEditor.toggleViewMode();
        0 < a.cellEditor.textarea.innerHTML.length && ("&nbsp;" != a.cellEditor.textarea.innerHTML || !a.cellEditor.clearOnChange) && window.setTimeout(function() {
            document.execCommand("selectAll", !1, null)
        })
    });
    this.addSeparator();
    b = this.addMenuFunction("", mxResources.get("insert"),
        !0, mxUtils.bind(this, function(a) {
            a.addItem(mxResources.get("insertLink"), null, mxUtils.bind(this, function() {
                this.editorUi.actions.get("link").funct()
            }));
            a.addItem(mxResources.get("insertImage"), null, mxUtils.bind(this, function() {
                this.editorUi.actions.get("image").funct()
            }));
            a.addItem(mxResources.get("insertHorizontalRule"), null, mxUtils.bind(this, function() {
                document.execCommand("inserthorizontalrule", !1, null)
            }))
        }));
    b.style.whiteSpace = "nowrap";
    b.style.overflow = "hidden";
    b.style.position = "relative";
    b.innerHTML =
        '<div class="geSprite geSprite-plus" style="margin-left:-4px;margin-top:-3px;"></div>' + this.dropdownImageHtml;
    b.style.width = "16px";
    EditorUi.compactUi && (b.getElementsByTagName("img")[0].style.left = "24px", b.getElementsByTagName("img")[0].style.top = "5px", b.style.width = "30px");
    this.addSeparator();
    var c = this.addMenuFunction("geIcon geSprite geSprite-table", mxResources.get("table"), !1, mxUtils.bind(this, function(b) {
        var c = a.getSelectedElement(),
            d = a.getParentByNames(c, ["TD", "TH"], a.cellEditor.text2),
            f = a.getParentByName(c,
                "TR", a.cellEditor.text2);
        if (null == f) this.editorUi.menus.addInsertTableItem(b);
        else {
            var e = a.getParentByName(f, "TABLE", a.cellEditor.text2);
            c = b.addItem("", null, mxUtils.bind(this, function() {
                try {
                    a.selectNode(a.insertColumn(e, null != d ? d.cellIndex : 0))
                } catch (k) {
                    this.editorUi.handleError(k)
                }
            }), null, "geIcon geSprite geSprite-insertcolumnbefore");
            c.setAttribute("title", mxResources.get("insertColumnBefore"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                try {
                    a.selectNode(a.insertColumn(e, null != d ? d.cellIndex +
                        1 : -1))
                } catch (k) {
                    this.editorUi.handleError(k)
                }
            }), null, "geIcon geSprite geSprite-insertcolumnafter");
            c.setAttribute("title", mxResources.get("insertColumnAfter"));
            c = b.addItem("Delete column", null, mxUtils.bind(this, function() {
                if (null != d) try {
                    a.deleteColumn(e, d.cellIndex)
                } catch (k) {
                    this.editorUi.handleError(k)
                }
            }), null, "geIcon geSprite geSprite-deletecolumn");
            c.setAttribute("title", mxResources.get("deleteColumn"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                    try {
                        a.selectNode(a.insertRow(e, f.sectionRowIndex))
                    } catch (k) {
                        this.editorUi.handleError(k)
                    }
                }),
                null, "geIcon geSprite geSprite-insertrowbefore");
            c.setAttribute("title", mxResources.get("insertRowBefore"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                try {
                    a.selectNode(a.insertRow(e, f.sectionRowIndex + 1))
                } catch (k) {
                    this.editorUi.handleError(k)
                }
            }), null, "geIcon geSprite geSprite-insertrowafter");
            c.setAttribute("title", mxResources.get("insertRowAfter"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                try {
                    a.deleteRow(e, f.sectionRowIndex)
                } catch (k) {
                    this.editorUi.handleError(k)
                }
            }), null, "geIcon geSprite geSprite-deleterow");
            c.setAttribute("title", mxResources.get("deleteRow"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                var a = e.style.borderColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(a, b, c, d) {
                    return "#" + ("0" + Number(b).toString(16)).substr(-2) + ("0" + Number(c).toString(16)).substr(-2) + ("0" + Number(d).toString(16)).substr(-2)
                });
                this.editorUi.pickColor(a, function(a) {
                    null == a || a == mxConstants.NONE ? (e.removeAttribute("border"), e.style.border = "", e.style.borderCollapse = "") : (e.setAttribute("border",
                        "1"), e.style.border = "1px solid " + a, e.style.borderCollapse = "collapse")
                })
            }), null, "geIcon geSprite geSprite-strokecolor");
            c.setAttribute("title", mxResources.get("borderColor"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                var a = e.style.backgroundColor.replace(/\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, function(a, b, c, d) {
                    return "#" + ("0" + Number(b).toString(16)).substr(-2) + ("0" + Number(c).toString(16)).substr(-2) + ("0" + Number(d).toString(16)).substr(-2)
                });
                this.editorUi.pickColor(a, function(a) {
                    e.style.backgroundColor =
                        null == a || a == mxConstants.NONE ? "" : a
                })
            }), null, "geIcon geSprite geSprite-fillcolor");
            c.setAttribute("title", mxResources.get("backgroundColor"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                    var a = e.getAttribute("cellPadding") || 0;
                    a = new FilenameDialog(this.editorUi, a, mxResources.get("apply"), mxUtils.bind(this, function(a) {
                        null != a && 0 < a.length ? e.setAttribute("cellPadding", a) : e.removeAttribute("cellPadding")
                    }), mxResources.get("spacing"));
                    this.editorUi.showDialog(a.container, 300, 80, !0, !0);
                    a.init()
                }), null,
                "geIcon geSprite geSprite-fit");
            c.setAttribute("title", mxResources.get("spacing"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                e.setAttribute("align", "left")
            }), null, "geIcon geSprite geSprite-left");
            c.setAttribute("title", mxResources.get("left"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                e.setAttribute("align", "center")
            }), null, "geIcon geSprite geSprite-center");
            c.setAttribute("title", mxResources.get("center"));
            c = b.addItem("", null, mxUtils.bind(this, function() {
                    e.setAttribute("align", "right")
                }),
                null, "geIcon geSprite geSprite-right");
            c.setAttribute("title", mxResources.get("right"))
        }
    }));
    c.style.position = "relative";
    c.style.whiteSpace = "nowrap";
    c.style.overflow = "hidden";
    c.innerHTML = '<div class="geSprite geSprite-table" style="margin-left:-2px;"></div>' + this.dropdownImageHtml;
    c.style.width = "30px";
    EditorUi.compactUi && (c.getElementsByTagName("img")[0].style.left = "22px", c.getElementsByTagName("img")[0].style.top = "5px")
};
Toolbar.prototype.hideMenu = function() {
    this.editorUi.hideCurrentMenu()
};
Toolbar.prototype.addMenu = function(a, b, c, h, g, d, f) {
    var e = this.editorUi.menus.get(h),
        k = this.addMenuFunction(a, b, c, function() {
            e.funct.apply(e, arguments)
        }, g, d);
    f || "function" !== typeof k.setEnabled || e.addListener("stateChanged", function() {
        k.setEnabled(e.enabled)
    });
    return k
};
Toolbar.prototype.addMenuFunction = function(a, b, c, h, g, d) {
    return this.addMenuFunctionInContainer(null != g ? g : this.container, a, b, c, h, d)
};
Toolbar.prototype.addMenuFunctionInContainer = function(a, b, c, h, g, d) {
    b = h ? this.createLabel(b) : this.createButton(b);
    this.initElement(b, c);
    this.addMenuHandler(b, h, g, d);
    a.appendChild(b);
    return b
};
Toolbar.prototype.addSeparator = function(a) {
    a = null != a ? a : this.container;
    var b = document.createElement("div");
    b.className = "geSeparator";
    a.appendChild(b);
    return b
};
Toolbar.prototype.addItems = function(a, b, c) {
    for (var h = [], g = 0; g < a.length; g++) {
        var d = a[g];
        "-" == d ? h.push(this.addSeparator(b)) : h.push(this.addItem("geSprite-" + d.toLowerCase(), d, b, c))
    }
    return h
};
Toolbar.prototype.addItem = function(a, b, c, h) {
    var g = this.editorUi.actions.get(b),
        d = null;
    null != g && (b = g.label, null != g.shortcut && (b += " (" + g.shortcut + ")"), d = this.addButton(a, b, g.funct, c), h || "function" !== typeof d.setEnabled || (d.setEnabled(g.enabled), g.addListener("stateChanged", function() {
        d.setEnabled(g.enabled)
    })));
    return d
};
Toolbar.prototype.addButton = function(a, b, c, h) {
    a = this.createButton(a);
    h = null != h ? h : this.container;
    this.initElement(a, b);
    this.addClickHandler(a, c);
    h.appendChild(a);
    return a
};
Toolbar.prototype.initElement = function(a, b) {
    null != b && a.setAttribute("title", b);
    this.addEnabledState(a)
};
Toolbar.prototype.addEnabledState = function(a) {
    var b = a.className;
    a.setEnabled = function(c) {
        a.enabled = c;
        a.className = c ? b : b + " mxDisabled"
    };
    a.setEnabled(!0)
};
Toolbar.prototype.addClickHandler = function(a, b) {
    null != b && (mxEvent.addListener(a, "click", function(c) {
        a.enabled && b(c);
        mxEvent.consume(c)
    }), mxEvent.addListener(a, mxClient.IS_POINTER ? "pointerdown" : "mousedown", mxUtils.bind(this, function(a) {
        a.preventDefault()
    })))
};
Toolbar.prototype.createButton = function(a) {
    var b = document.createElement("a");
    b.className = "geButton";
    var c = document.createElement("div");
    null != a && (c.className = "geSprite " + a);
    b.appendChild(c);
    return b
};
Toolbar.prototype.createLabel = function(a, b) {
    b = document.createElement("a");
    b.className = "geLabel";
    mxUtils.write(b, a);
    return b
};
Toolbar.prototype.addMenuHandler = function(a, b, c, h) {
    if (null != c) {
        var g = this.editorUi.editor.graph,
            d = null,
            f = !0;
        mxEvent.addListener(a, "click", mxUtils.bind(this, function(e) {
            if (f && (null == a.enabled || a.enabled)) {
                g.popupMenuHandler.hideMenu();
                d = new mxPopupMenu(c);
                d.div.className += " geToolbarMenu";
                d.showDisabled = h;
                d.labels = b;
                d.autoExpand = !0;
                var k = mxUtils.getOffset(a);
                d.popup(k.x, k.y + a.offsetHeight, null, e);
                this.editorUi.setCurrentMenu(d, a);
                !b && d.div.scrollHeight > d.div.clientHeight && (d.div.style.width = "40px");
                d.hideMenu = mxUtils.bind(this, function() {
                    mxPopupMenu.prototype.hideMenu.apply(d, arguments);
                    this.editorUi.resetCurrentMenu();
                    d.destroy()
                });
                d.addListener(mxEvent.EVENT_HIDE, mxUtils.bind(this, function() {
                    this.currentElt = null
                }))
            }
            f = !0;
            mxEvent.consume(e)
        }));
        mxEvent.addListener(a, mxClient.IS_POINTER ? "pointerdown" : "mousedown", mxUtils.bind(this, function(b) {
            f = this.currentElt != a;
            b.preventDefault()
        }))
    }
};
Toolbar.prototype.destroy = function() {
    null != this.gestureHandler && (mxEvent.removeGestureListeners(document, this.gestureHandler), this.gestureHandler = null)
};