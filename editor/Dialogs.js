var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, g) {
    b != Array.prototype && b != Object.prototype && (b[c] = g.value)
};
$jscomp.getGlobal = function(b) {
    return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, c, g, n) {
    if (c) {
        g = $jscomp.global;
        b = b.split(".");
        for (n = 0; n < b.length - 1; n++) {
            var f = b[n];
            f in g || (g[f] = {});
            g = g[f]
        }
        b = b[b.length - 1];
        n = g[b];
        c = c(n);
        c != n && null != c && $jscomp.defineProperty(g, b, {
            configurable: !0,
            writable: !0,
            value: c
        })
    }
};
$jscomp.polyfill("Array.prototype.fill", function(b) {
    return b ? b : function(b, g, n) {
        var c = this.length || 0;
        0 > g && (g = Math.max(0, c + g));
        if (null == n || n > c) n = c;
        n = Number(n);
        0 > n && (n = Math.max(0, c + n));
        for (g = Number(g || 0); g < n; g++) this[g] = b;
        return this
    }
}, "es6", "es3");
var OpenDialog = function() {
        var b = document.createElement("iframe");
        b.style.backgroundColor = "transparent";
        b.allowTransparency = "true";
        b.style.borderStyle = "none";
        b.style.borderWidth = "0px";
        b.style.overflow = "hidden";
        b.frameBorder = "0";
        b.setAttribute("width", (Editor.useLocalStorage ? 640 : 320) + "px");
        b.setAttribute("height", (Editor.useLocalStorage ? 480 : 220) + "px");
        b.setAttribute("src", OPEN_FORM);
        this.container = b
    },
    ColorDialog = function(b, c, g, n) {
        function f() {
            var a = k(0 == ColorDialog.recentColors.length ? ["FFFFFF"] : ColorDialog.recentColors,
                11, "FFFFFF", !0);
            a.style.marginBottom = "8px";
            return a
        }

        function k(b, c, g, k) {
            c = null != c ? c : 12;
            var h = document.createElement("table");
            h.style.borderCollapse = "collapse";
            h.setAttribute("cellspacing", "0");
            h.style.marginBottom = "20px";
            h.style.cellSpacing = "0px";
            var l = document.createElement("tbody");
            h.appendChild(l);
            for (var v = b.length / c, n = 0; n < v; n++) {
                for (var z = document.createElement("tr"), A = 0; A < c; A++)(function(a) {
                    var b = document.createElement("td");
                    b.style.border = "1px solid black";
                    b.style.padding = "0px";
                    b.style.width =
                        "16px";
                    b.style.height = "16px";
                    null == a && (a = g);
                    "none" == a ? b.style.background = "url('" + Dialog.prototype.noColorImage + "')" : b.style.backgroundColor = "#" + a;
                    z.appendChild(b);
                    null != a && (b.style.cursor = "pointer", mxEvent.addListener(b, "click", function() {
                        "none" == a ? (d.fromString("ffffff"), e.value = "none") : d.fromString(a)
                    }))
                })(b[n * c + A]);
                l.appendChild(z)
            }
            k && (b = document.createElement("td"), b.setAttribute("title", mxResources.get("reset")), b.style.border = "1px solid black", b.style.padding = "0px", b.style.width = "16px", b.style.height =
                "16px", b.style.backgroundImage = "url('" + Dialog.prototype.closeImage + "')", b.style.backgroundPosition = "center center", b.style.backgroundRepeat = "no-repeat", b.style.cursor = "pointer", z.appendChild(b), mxEvent.addListener(b, "click", function() {
                    ColorDialog.resetRecentColors();
                    h.parentNode.replaceChild(f(), h)
                }));
            a.appendChild(h);
            return h
        }
        this.editorUi = b;
        var e = document.createElement("input");
        e.style.marginBottom = "10px";
        e.style.width = "216px";
        mxClient.IS_IE && (e.style.marginTop = "10px", document.body.appendChild(e));
        this.init = function() {
            mxClient.IS_TOUCH || e.focus()
        };
        var d = new jscolor.color(e);
        d.pickerOnfocus = !1;
        d.showPicker();
        var h = document.createElement("div");
        jscolor.picker.box.style.position = "relative";
        jscolor.picker.box.style.width = "230px";
        jscolor.picker.box.style.height = "100px";
        jscolor.picker.box.style.paddingBottom = "10px";
        h.appendChild(jscolor.picker.box);
        var a = document.createElement("center");
        h.appendChild(e);
        mxUtils.br(h);
        f();
        var l = k(this.presetColors);
        l.style.marginBottom = "8px";
        l = k(this.defaultColors);
        l.style.marginBottom = "16px";
        h.appendChild(a);
        l = document.createElement("div");
        l.style.textAlign = "right";
        l.style.whiteSpace = "nowrap";
        var p = mxUtils.button(mxResources.get("cancel"), function() {
            b.hideDialog();
            null != n && n()
        });
        p.className = "geBtn";
        b.editor.cancelFirst && l.appendChild(p);
        var q = null != g ? g : this.createApplyFunction();
        g = mxUtils.button(mxResources.get("apply"), function() {
            var a = e.value;
            /(^#?[a-zA-Z0-9]*$)/.test(a) ? ("none" != a && "#" != a.charAt(0) && (a = "#" + a), ColorDialog.addRecentColor("none" != a ? a.substring(1) :
                a, 12), q(a), b.hideDialog()) : b.handleError({
                message: mxResources.get("invalidInput")
            })
        });
        g.className = "geBtn gePrimaryBtn";
        l.appendChild(g);
        b.editor.cancelFirst || l.appendChild(p);
        null != c && ("none" == c ? (d.fromString("ffffff"), e.value = "none") : d.fromString(c));
        h.appendChild(l);
        this.picker = d;
        this.colorInput = e;
        mxEvent.addListener(h, "keydown", function(a) {
            27 == a.keyCode && (b.hideDialog(), null != n && n(), mxEvent.consume(a))
        });
        this.container = h
    };
ColorDialog.prototype.presetColors = "E6D0DE CDA2BE B5739D E1D5E7 C3ABD0 A680B8 D4E1F5 A9C4EB 7EA6E0 D5E8D4 9AC7BF 67AB9F D5E8D4 B9E0A5 97D077 FFF2CC FFE599 FFD966 FFF4C3 FFCE9F FFB570 F8CECC F19C99 EA6B66".split(" ");
ColorDialog.prototype.defaultColors = "none FFFFFF E6E6E6 CCCCCC B3B3B3 999999 808080 666666 4D4D4D 333333 1A1A1A 000000 FFCCCC FFE6CC FFFFCC E6FFCC CCFFCC CCFFE6 CCFFFF CCE5FF CCCCFF E5CCFF FFCCFF FFCCE6 FF9999 FFCC99 FFFF99 CCFF99 99FF99 99FFCC 99FFFF 99CCFF 9999FF CC99FF FF99FF FF99CC FF6666 FFB366 FFFF66 B3FF66 66FF66 66FFB3 66FFFF 66B2FF 6666FF B266FF FF66FF FF66B3 FF3333 FF9933 FFFF33 99FF33 33FF33 33FF99 33FFFF 3399FF 3333FF 9933FF FF33FF FF3399 FF0000 FF8000 FFFF00 80FF00 00FF00 00FF80 00FFFF 007FFF 0000FF 7F00FF FF00FF FF0080 CC0000 CC6600 CCCC00 66CC00 00CC00 00CC66 00CCCC 0066CC 0000CC 6600CC CC00CC CC0066 990000 994C00 999900 4D9900 009900 00994D 009999 004C99 000099 4C0099 990099 99004D 660000 663300 666600 336600 006600 006633 006666 003366 000066 330066 660066 660033 330000 331A00 333300 1A3300 003300 00331A 003333 001933 000033 190033 330033 33001A".split(" ");
ColorDialog.prototype.createApplyFunction = function() {
    return mxUtils.bind(this, function(b) {
        var c = this.editorUi.editor.graph;
        c.getModel().beginUpdate();
        try {
            c.setCellStyles(this.currentColorKey, b), this.editorUi.fireEvent(new mxEventObject("styleChanged", "keys", [this.currentColorKey], "values", [b], "cells", c.getSelectionCells()))
        } finally {
            c.getModel().endUpdate()
        }
    })
};
ColorDialog.recentColors = [];
ColorDialog.addRecentColor = function(b, c) {
    null != b && (mxUtils.remove(b, ColorDialog.recentColors), ColorDialog.recentColors.splice(0, 0, b), ColorDialog.recentColors.length >= c && ColorDialog.recentColors.pop())
};
ColorDialog.resetRecentColors = function() {
    ColorDialog.recentColors = []
};
var AboutDialog = function(b) {
        var c = document.createElement("div");
        c.setAttribute("align", "center");
        var g = document.createElement("h3");
        mxUtils.write(g, mxResources.get("about") + " GraphEditor");
        c.appendChild(g);
        g = document.createElement("img");
        g.style.border = "0px";
        g.setAttribute("width", "176");
        g.setAttribute("width", "151");
        g.setAttribute("src", IMAGE_PATH + "/logo.png");
        c.appendChild(g);
        mxUtils.br(c);
        mxUtils.write(c, "Powered by mxGraph " + mxClient.VERSION);
        mxUtils.br(c);
        g = document.createElement("a");
        g.setAttribute("href",
            "http://www.jgraph.com/");
        g.setAttribute("target", "_blank");
        mxUtils.write(g, "www.jgraph.com");
        c.appendChild(g);
        mxUtils.br(c);
        mxUtils.br(c);
        g = mxUtils.button(mxResources.get("close"), function() {
            b.hideDialog()
        });
        g.className = "geBtn gePrimaryBtn";
        c.appendChild(g);
        this.container = c
    },
    TextareaDialog = function(b, c, g, n, f, k, e, d, h, a, l, p, q, v) {
        e = null != e ? e : 300;
        d = null != d ? d : 120;
        a = null != a ? a : !1;
        var w = document.createElement("table"),
            u = document.createElement("tbody");
        var t = document.createElement("tr");
        var m = document.createElement("td");
        m.style.fontSize = "10pt";
        m.style.width = "100px";
        mxUtils.write(m, c);
        t.appendChild(m);
        u.appendChild(t);
        t = document.createElement("tr");
        m = document.createElement("td");
        var r = document.createElement("textarea");
        l && r.setAttribute("wrap", "off");
        r.setAttribute("spellcheck", "false");
        r.setAttribute("autocorrect", "off");
        r.setAttribute("autocomplete", "off");
        r.setAttribute("autocapitalize", "off");
        mxUtils.write(r, g || "");
        r.style.resize = "none";
        r.style.width = e + "px";
        r.style.height = d + "px";
        this.textarea = r;
        this.init = function() {
            r.focus();
            r.scrollTop = 0
        };
        m.appendChild(r);
        t.appendChild(m);
        u.appendChild(t);
        t = document.createElement("tr");
        m = document.createElement("td");
        m.style.paddingTop = "14px";
        m.style.whiteSpace = "nowrap";
        m.setAttribute("align", "right");
        null != q && (c = mxUtils.button(mxResources.get("help"), function() {
            b.editor.graph.openLink(q)
        }), c.className = "geBtn", m.appendChild(c));
        if (null != v)
            for (c = 0; c < v.length; c++)(function(a, b) {
                a = mxUtils.button(a, function(a) {
                    b(a, r)
                });
                a.className = "geBtn";
                m.appendChild(a)
            })(v[c][0], v[c][1]);
        k = mxUtils.button(k ||
            mxResources.get("cancel"),
            function() {
                b.hideDialog();
                null != f && f()
            });
        k.className = "geBtn";
        b.editor.cancelFirst && m.appendChild(k);
        null != h && h(m, r);
        null != n && (h = mxUtils.button(p || mxResources.get("apply"), function() {
            a || b.hideDialog();
            n(r.value)
        }), h.className = "geBtn gePrimaryBtn", m.appendChild(h));
        b.editor.cancelFirst || m.appendChild(k);
        t.appendChild(m);
        u.appendChild(t);
        w.appendChild(u);
        this.container = w
    },
    EditDiagramDialog = function(b) {
        var c = document.createElement("div");
        c.style.textAlign = "right";
        var g = document.createElement("textarea");
        g.setAttribute("wrap", "off");
        g.setAttribute("spellcheck", "false");
        g.setAttribute("autocorrect", "off");
        g.setAttribute("autocomplete", "off");
        g.setAttribute("autocapitalize", "off");
        g.style.overflow = "auto";
        g.style.resize = "none";
        g.style.width = "600px";
        g.style.height = "360px";
        g.style.marginBottom = "16px";
        g.value = mxUtils.getPrettyXml(b.editor.getGraphXml());
        c.appendChild(g);
        this.init = function() {
            g.focus()
        };
        Graph.fileSupport && (g.addEventListener("dragover", function(b) {
                b.stopPropagation();
                b.preventDefault()
            },
            !1), g.addEventListener("drop", function(c) {
            c.stopPropagation();
            c.preventDefault();
            if (0 < c.dataTransfer.files.length) {
                c = c.dataTransfer.files[0];
                var d = new FileReader;
                d.onload = function(b) {
                    g.value = b.target.result
                };
                d.readAsText(c)
            } else g.value = b.extractGraphModelFromEvent(c)
        }, !1));
        var n = mxUtils.button(mxResources.get("cancel"), function() {
            b.hideDialog()
        });
        n.className = "geBtn";
        b.editor.cancelFirst && c.appendChild(n);
        var f = document.createElement("select");
        f.style.width = "180px";
        f.className = "geBtn";
        if (b.editor.graph.isEnabled()) {
            var k =
                document.createElement("option");
            k.setAttribute("value", "replace");
            mxUtils.write(k, mxResources.get("replaceExistingDrawing"));
            f.appendChild(k)
        }
        k = document.createElement("option");
        k.setAttribute("value", "new");
        mxUtils.write(k, mxResources.get("openInNewWindow"));
        EditDiagramDialog.showNewWindowOption && f.appendChild(k);
        b.editor.graph.isEnabled() && (k = document.createElement("option"), k.setAttribute("value", "import"), mxUtils.write(k, mxResources.get("addToExistingDrawing")), f.appendChild(k));
        c.appendChild(f);
        k = mxUtils.button(mxResources.get("ok"), function() {
            var c = Graph.zapGremlins(mxUtils.trim(g.value)),
                d = null;
            if ("new" == f.value) b.hideDialog(), b.editor.editAsNew(c);
            else if ("replace" == f.value) {
                b.editor.graph.model.beginUpdate();
                try {
                    b.editor.setGraphXml(mxUtils.parseXml(c).documentElement), b.hideDialog()
                } catch (p) {
                    d = p
                } finally {
                    b.editor.graph.model.endUpdate()
                }
            } else if ("import" == f.value) {
                b.editor.graph.model.beginUpdate();
                try {
                    var k = mxUtils.parseXml(c),
                        a = new mxGraphModel;
                    (new mxCodec(k)).decode(k.documentElement,
                        a);
                    var l = a.getChildren(a.getChildAt(a.getRoot(), 0));
                    b.editor.graph.setSelectionCells(b.editor.graph.importCells(l));
                    b.hideDialog()
                } catch (p) {
                    d = p
                } finally {
                    b.editor.graph.model.endUpdate()
                }
            }
            null != d && mxUtils.alert(d.message)
        });
        k.className = "geBtn gePrimaryBtn";
        c.appendChild(k);
        b.editor.cancelFirst || c.appendChild(n);
        this.container = c
    };
EditDiagramDialog.showNewWindowOption = !0;
var ExportDialog = function(b) {
    function c() {
        var a = l.value,
            b = a.lastIndexOf(".");
        l.value = 0 < b ? a.substring(0, b + 1) + p.value : a + "." + p.value;
        "xml" === p.value ? (q.setAttribute("disabled", "true"), v.setAttribute("disabled", "true"), w.setAttribute("disabled", "true"), y.setAttribute("disabled", "true")) : (q.removeAttribute("disabled"), v.removeAttribute("disabled"), w.removeAttribute("disabled"), y.removeAttribute("disabled"));
        "png" === p.value || "svg" === p.value || "pdf" === p.value ? r.removeAttribute("disabled") : r.setAttribute("disabled",
            "disabled");
        "png" === p.value || "jpg" === p.value || "pdf" === p.value ? x.removeAttribute("disabled") : x.setAttribute("disabled", "disabled");
        "png" === p.value ? (u.removeAttribute("disabled"), t.removeAttribute("disabled")) : (u.setAttribute("disabled", "disabled"), t.setAttribute("disabled", "disabled"))
    }

    function g() {
        v.style.backgroundColor = v.value * w.value > MAX_AREA || 0 >= v.value ? "red" : "";
        w.style.backgroundColor = v.value * w.value > MAX_AREA || 0 >= w.value ? "red" : ""
    }
    var n = b.editor.graph,
        f = n.getGraphBounds(),
        k = n.view.scale,
        e = Math.ceil(f.width /
            k),
        d = Math.ceil(f.height / k);
    k = document.createElement("table");
    var h = document.createElement("tbody");
    k.setAttribute("cellpadding", mxClient.IS_SF ? "0" : "2");
    f = document.createElement("tr");
    var a = document.createElement("td");
    a.style.fontSize = "10pt";
    a.style.width = "100px";
    mxUtils.write(a, mxResources.get("filename") + ":");
    f.appendChild(a);
    var l = document.createElement("input");
    l.setAttribute("value", b.editor.getOrCreateFilename());
    l.style.width = "180px";
    a = document.createElement("td");
    a.appendChild(l);
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize = "10pt";
    mxUtils.write(a, mxResources.get("format") + ":");
    f.appendChild(a);
    var p = document.createElement("select");
    p.style.width = "180px";
    a = document.createElement("option");
    a.setAttribute("value", "png");
    mxUtils.write(a, mxResources.get("formatPng"));
    p.appendChild(a);
    a = document.createElement("option");
    ExportDialog.showGifOption && (a.setAttribute("value", "gif"), mxUtils.write(a, mxResources.get("formatGif")), p.appendChild(a));
    a = document.createElement("option");
    a.setAttribute("value", "jpg");
    mxUtils.write(a, mxResources.get("formatJpg"));
    p.appendChild(a);
    a = document.createElement("option");
    a.setAttribute("value", "pdf");
    mxUtils.write(a, mxResources.get("formatPdf"));
    p.appendChild(a);
    a = document.createElement("option");
    a.setAttribute("value", "svg");
    mxUtils.write(a, mxResources.get("formatSvg"));
    p.appendChild(a);
    ExportDialog.showXmlOption && (a = document.createElement("option"), a.setAttribute("value", "xml"), mxUtils.write(a, mxResources.get("formatXml")),
        p.appendChild(a));
    a = document.createElement("td");
    a.appendChild(p);
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize = "10pt";
    mxUtils.write(a, mxResources.get("zoom") + " (%):");
    f.appendChild(a);
    var q = document.createElement("input");
    q.setAttribute("type", "number");
    q.setAttribute("value", "100");
    q.style.width = "180px";
    a = document.createElement("td");
    a.appendChild(q);
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize = "10pt";
    mxUtils.write(a, mxResources.get("width") + ":");
    f.appendChild(a);
    var v = document.createElement("input");
    v.setAttribute("value", e);
    v.style.width = "180px";
    a = document.createElement("td");
    a.appendChild(v);
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize = "10pt";
    mxUtils.write(a, mxResources.get("height") + ":");
    f.appendChild(a);
    var w = document.createElement("input");
    w.setAttribute("value", d);
    w.style.width = "180px";
    a = document.createElement("td");
    a.appendChild(w);
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize = "10pt";
    mxUtils.write(a, mxResources.get("dpi") + ":");
    f.appendChild(a);
    var u = document.createElement("select");
    u.style.width = "180px";
    a = document.createElement("option");
    a.setAttribute("value", "100");
    mxUtils.write(a, "100dpi");
    u.appendChild(a);
    a = document.createElement("option");
    a.setAttribute("value", "200");
    mxUtils.write(a, "200dpi");
    u.appendChild(a);
    a = document.createElement("option");
    a.setAttribute("value", "300");
    mxUtils.write(a, "300dpi");
    u.appendChild(a);
    a = document.createElement("option");
    a.setAttribute("value", "400");
    mxUtils.write(a, "400dpi");
    u.appendChild(a);
    a = document.createElement("option");
    a.setAttribute("value", "custom");
    mxUtils.write(a, mxResources.get("custom"));
    u.appendChild(a);
    var t = document.createElement("input");
    t.style.width = "180px";
    t.style.display = "none";
    t.setAttribute("value", "100");
    t.setAttribute("type", "number");
    t.setAttribute("min", "50");
    t.setAttribute("step",
        "50");
    var m = !1;
    mxEvent.addListener(u, "change", function() {
        "custom" == this.value ? (this.style.display = "none", t.style.display = "", t.focus()) : (t.value = this.value, m || (q.value = this.value))
    });
    mxEvent.addListener(t, "change", function() {
        var a = parseInt(t.value);
        isNaN(a) || 0 >= a ? t.style.backgroundColor = "red" : (t.style.backgroundColor = "", m || (q.value = a))
    });
    a = document.createElement("td");
    a.appendChild(u);
    a.appendChild(t);
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize =
        "10pt";
    mxUtils.write(a, mxResources.get("background") + ":");
    f.appendChild(a);
    var r = document.createElement("input");
    r.setAttribute("type", "checkbox");
    r.checked = null == n.background || n.background == mxConstants.NONE;
    a = document.createElement("td");
    a.appendChild(r);
    mxUtils.write(a, mxResources.get("transparent"));
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize = "10pt";
    mxUtils.write(a, mxResources.get("grid") + ":");
    f.appendChild(a);
    var x = document.createElement("input");
    x.setAttribute("type", "checkbox");
    x.checked = !1;
    a = document.createElement("td");
    a.appendChild(x);
    f.appendChild(a);
    h.appendChild(f);
    f = document.createElement("tr");
    a = document.createElement("td");
    a.style.fontSize = "10pt";
    mxUtils.write(a, mxResources.get("borderWidth") + ":");
    f.appendChild(a);
    var y = document.createElement("input");
    y.setAttribute("type", "number");
    y.setAttribute("value", ExportDialog.lastBorderValue);
    y.style.width = "180px";
    a = document.createElement("td");
    a.appendChild(y);
    f.appendChild(a);
    h.appendChild(f);
    k.appendChild(h);
    mxEvent.addListener(p, "change", c);
    c();
    mxEvent.addListener(q, "change", function() {
        m = !0;
        var a = Math.max(0, parseFloat(q.value) || 100) / 100;
        q.value = parseFloat((100 * a).toFixed(2));
        0 < e ? (v.value = Math.floor(e * a), w.value = Math.floor(d * a)) : (q.value = "100", v.value = e, w.value = d);
        g()
    });
    mxEvent.addListener(v, "change", function() {
        var a = parseInt(v.value) / e;
        0 < a ? (q.value = parseFloat((100 * a).toFixed(2)), w.value = Math.floor(d * a)) : (q.value = "100", v.value = e, w.value = d);
        g()
    });
    mxEvent.addListener(w, "change", function() {
        var a =
            parseInt(w.value) / d;
        0 < a ? (q.value = parseFloat((100 * a).toFixed(2)), v.value = Math.floor(e * a)) : (q.value = "100", v.value = e, w.value = d);
        g()
    });
    f = document.createElement("tr");
    a = document.createElement("td");
    a.setAttribute("align", "right");
    a.style.paddingTop = "22px";
    a.colSpan = 2;
    var z = mxUtils.button(mxResources.get("export"), mxUtils.bind(this, function() {
        if (0 >= parseInt(q.value)) mxUtils.alert(mxResources.get("drawingEmpty"));
        else {
            var a = l.value,
                d = p.value,
                c = Math.max(0, parseFloat(q.value) || 100) / 100,
                g = Math.max(0, parseInt(y.value)),
                e = n.background,
                k = Math.max(1, parseInt(t.value));
            if (("svg" == d || "png" == d || "pdf" == d) && r.checked) e = null;
            else if (null == e || e == mxConstants.NONE) e = "#ffffff";
            ExportDialog.lastBorderValue = g;
            ExportDialog.exportFile(b, a, d, e, c, g, k, x.checked)
        }
    }));
    z.className = "geBtn gePrimaryBtn";
    var A = mxUtils.button(mxResources.get("cancel"), function() {
        b.hideDialog()
    });
    A.className = "geBtn";
    b.editor.cancelFirst ? (a.appendChild(A), a.appendChild(z)) : (a.appendChild(z), a.appendChild(A));
    f.appendChild(a);
    h.appendChild(f);
    k.appendChild(h);
    this.container = k
};
ExportDialog.lastBorderValue = 0;
ExportDialog.showGifOption = !0;
ExportDialog.showXmlOption = !0;
ExportDialog.exportFile = function(b, c, g, n, f, k, e, d) {
    d = b.editor.graph;
    if ("xml" == g) ExportDialog.saveLocalFile(b, mxUtils.getXml(b.editor.getGraphXml()), c, g);
    else if ("svg" == g) ExportDialog.saveLocalFile(b, mxUtils.getXml(d.getSvg(n, f, k)), c, g);
    else {
        var h = d.getGraphBounds(),
            a = mxUtils.createXmlDocument(),
            l = a.createElement("output");
        a.appendChild(l);
        a = new mxXmlCanvas2D(l);
        a.translate(Math.floor((k / f - h.x) / d.view.scale), Math.floor((k / f - h.y) / d.view.scale));
        a.scale(f / d.view.scale);
        (new mxImageExport).drawState(d.getView().getState(d.model.root),
            a);
        l = "xml=" + encodeURIComponent(mxUtils.getXml(l));
        a = Math.ceil(h.width * f / d.view.scale + 2 * k);
        f = Math.ceil(h.height * f / d.view.scale + 2 * k);
        l.length <= MAX_REQUEST_SIZE && a * f < MAX_AREA ? (b.hideDialog(), (new mxXmlRequest(EXPORT_URL, "format=" + g + "&filename=" + encodeURIComponent(c) + "&bg=" + (null != n ? n : "none") + "&w=" + a + "&h=" + f + "&" + l + "&dpi=" + e)).simulate(document, "_blank")) : mxUtils.alert(mxResources.get("drawingTooLarge"))
    }
};
ExportDialog.saveLocalFile = function(b, c, g, n) {
    c.length < MAX_REQUEST_SIZE ? (b.hideDialog(), (new mxXmlRequest(SAVE_URL, "xml=" + encodeURIComponent(c) + "&filename=" + encodeURIComponent(g) + "&format=" + n)).simulate(document, "_blank")) : (mxUtils.alert(mxResources.get("drawingTooLarge")), mxUtils.popup(xml))
};
var EditDataDialog = function(b, c) {
    function g() {
        0 < r.value.length ? x.removeAttribute("disabled") : x.setAttribute("disabled", "disabled")
    }
    var n = document.createElement("div"),
        f = b.editor.graph,
        k = f.getModel().getValue(c);
    if (!mxUtils.isNode(k)) {
        var e = mxUtils.createXmlDocument().createElement("object");
        e.setAttribute("label", k || "");
        k = e
    }
    var d = {};
    try {
        var h = mxUtils.getValue(b.editor.graph.getCurrentCellStyle(c), "metaData", null);
        null != h && (d = JSON.parse(h))
    } catch (z) {}
    var a = new mxForm("properties");
    a.table.style.width =
        "100%";
    var l = k.attributes,
        p = [],
        q = [],
        v = 0,
        w = null != EditDataDialog.getDisplayIdForCell ? EditDataDialog.getDisplayIdForCell(b, c) : null,
        u = function(b, d) {
            var c = document.createElement("div");
            c.style.position = "relative";
            c.style.paddingRight = "20px";
            c.style.boxSizing = "border-box";
            c.style.width = "100%";
            var g = document.createElement("a"),
                e = mxUtils.createImage(Dialog.prototype.closeImage);
            e.style.height = "9px";
            e.style.fontSize = "9px";
            e.style.marginBottom = mxClient.IS_IE11 ? "-1px" : "5px";
            g.className = "geButton";
            g.setAttribute("title",
                mxResources.get("delete"));
            g.style.position = "absolute";
            g.style.top = "4px";
            g.style.right = "0px";
            g.style.margin = "0px";
            g.style.width = "9px";
            g.style.height = "9px";
            g.style.cursor = "pointer";
            g.appendChild(e);
            d = function(b) {
                return function() {
                    for (var d = 0, c = 0; c < p.length; c++) {
                        if (p[c] == b) {
                            q[c] = null;
                            a.table.deleteRow(d + (null != w ? 1 : 0));
                            break
                        }
                        null != q[c] && d++
                    }
                }
            }(d);
            mxEvent.addListener(g, "click", d);
            d = b.parentNode;
            c.appendChild(b);
            c.appendChild(g);
            d.appendChild(c)
        };
    e = function(b, c, g) {
        p[b] = c;
        q[b] = a.addTextarea(p[v] + ":", g,
            2);
        q[b].style.width = "100%";
        0 < g.indexOf("\n") && q[b].setAttribute("rows", "2");
        u(q[b], c);
        null != d[c] && 0 == d[c].editable && q[b].setAttribute("disabled", "disabled")
    };
    h = [];
    for (var t = f.getModel().getParent(c) == f.getModel().getRoot(), m = 0; m < l.length; m++) !t && "label" == l[m].nodeName || "placeholders" == l[m].nodeName || h.push({
        name: l[m].nodeName,
        value: l[m].nodeValue
    });
    h.sort(function(a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    });
    null != w && (l = document.createElement("div"), l.style.width = "100%", l.style.fontSize = "11px",
        l.style.textAlign = "center", mxUtils.write(l, w), a.addField(mxResources.get("id") + ":", l));
    for (m = 0; m < h.length; m++) e(v, h[m].name, h[m].value), v++;
    h = document.createElement("div");
    h.style.cssText = "position:absolute;left:30px;right:30px;overflow-y:auto;top:30px;bottom:80px;";
    h.appendChild(a.table);
    e = document.createElement("div");
    e.style.boxSizing = "border-box";
    e.style.paddingRight = "160px";
    e.style.whiteSpace = "nowrap";
    e.style.marginTop = "6px";
    e.style.width = "100%";
    var r = document.createElement("input");
    r.setAttribute("placeholder",
        mxResources.get("enterPropertyName"));
    r.setAttribute("type", "text");
    r.setAttribute("size", mxClient.IS_IE || mxClient.IS_IE11 ? "36" : "40");
    r.style.boxSizing = "border-box";
    r.style.marginLeft = "2px";
    r.style.width = "100%";
    e.appendChild(r);
    h.appendChild(e);
    n.appendChild(h);
    var x = mxUtils.button(mxResources.get("addProperty"), function() {
        var b = r.value;
        if (0 < b.length && "label" != b && "placeholders" != b && 0 > b.indexOf(":")) try {
            var d = mxUtils.indexOf(p, b);
            if (0 <= d && null != q[d]) q[d].focus();
            else {
                k.cloneNode(!1).setAttribute(b,
                    "");
                0 <= d && (p.splice(d, 1), q.splice(d, 1));
                p.push(b);
                var c = a.addTextarea(b + ":", "", 2);
                c.style.width = "100%";
                q.push(c);
                u(c, b);
                c.focus()
            }
            x.setAttribute("disabled", "disabled");
            r.value = ""
        } catch (C) {
            mxUtils.alert(C)
        } else mxUtils.alert(mxResources.get("invalidName"))
    });
    this.init = function() {
        0 < q.length ? q[0].focus() : r.focus()
    };
    x.setAttribute("title", mxResources.get("addProperty"));
    x.setAttribute("disabled", "disabled");
    x.style.textOverflow = "ellipsis";
    x.style.position = "absolute";
    x.style.overflow = "hidden";
    x.style.width =
        "144px";
    x.style.right = "0px";
    x.className = "geBtn";
    e.appendChild(x);
    h = mxUtils.button(mxResources.get("cancel"), function() {
        b.hideDialog.apply(b, arguments)
    });
    h.className = "geBtn";
    e = mxUtils.button(mxResources.get("apply"), function() {
        try {
            b.hideDialog.apply(b, arguments);
            k = k.cloneNode(!0);
            for (var a = !1, d = 0; d < p.length; d++) null == q[d] ? k.removeAttribute(p[d]) : (k.setAttribute(p[d], q[d].value), a = a || "placeholder" == p[d] && "1" == k.getAttribute("placeholders"));
            a && k.removeAttribute("label");
            f.getModel().setValue(c, k)
        } catch (B) {
            mxUtils.alert(B)
        }
    });
    e.className = "geBtn gePrimaryBtn";
    mxEvent.addListener(r, "keyup", g);
    mxEvent.addListener(r, "change", g);
    l = document.createElement("div");
    l.style.cssText = "position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;";
    if (b.editor.graph.getModel().isVertex(c) || b.editor.graph.getModel().isEdge(c)) {
        t = document.createElement("span");
        t.style.marginRight = "10px";
        m = document.createElement("input");
        m.setAttribute("type", "checkbox");
        m.style.marginRight = "6px";
        "1" == k.getAttribute("placeholders") &&
            (m.setAttribute("checked", "checked"), m.defaultChecked = !0);
        mxEvent.addListener(m, "click", function() {
            "1" == k.getAttribute("placeholders") ? k.removeAttribute("placeholders") : k.setAttribute("placeholders", "1")
        });
        t.appendChild(m);
        mxUtils.write(t, mxResources.get("placeholders"));
        if (null != EditDataDialog.placeholderHelpLink) {
            m = document.createElement("a");
            m.setAttribute("href", EditDataDialog.placeholderHelpLink);
            m.setAttribute("title", mxResources.get("help"));
            m.setAttribute("target", "_blank");
            m.style.marginLeft =
                "8px";
            m.style.cursor = "help";
            var y = document.createElement("img");
            mxUtils.setOpacity(y, 50);
            y.style.height = "16px";
            y.style.width = "16px";
            y.setAttribute("border", "0");
            y.setAttribute("valign", "middle");
            y.style.marginTop = mxClient.IS_IE11 ? "0px" : "-4px";
            y.setAttribute("src", Editor.helpImage);
            m.appendChild(y);
            t.appendChild(m)
        }
        l.appendChild(t)
    }
    b.editor.cancelFirst ? (l.appendChild(h), l.appendChild(e)) : (l.appendChild(e), l.appendChild(h));
    n.appendChild(l);
    this.container = n
};
EditDataDialog.getDisplayIdForCell = function(b, c) {
    var g = null;
    null != b.editor.graph.getModel().getParent(c) && (g = c.getId());
    return g
};
EditDataDialog.placeholderHelpLink = null;
var LinkDialog = function(b, c, g, n) {
        var f = document.createElement("div");
        mxUtils.write(f, mxResources.get("editLink") + ":");
        var k = document.createElement("div");
        k.className = "geTitle";
        k.style.backgroundColor = "transparent";
        k.style.borderColor = "transparent";
        k.style.whiteSpace = "nowrap";
        k.style.textOverflow = "clip";
        k.style.cursor = "default";
        k.style.paddingRight = "20px";
        var e = document.createElement("input");
        e.setAttribute("value", c);
        e.setAttribute("placeholder", "http://www.example.com/");
        e.setAttribute("type", "text");
        e.style.marginTop = "6px";
        e.style.width = "400px";
        e.style.backgroundImage = "url('" + Dialog.prototype.clearImage + "')";
        e.style.backgroundRepeat = "no-repeat";
        e.style.backgroundPosition = "100% 50%";
        e.style.paddingRight = "14px";
        c = document.createElement("div");
        c.setAttribute("title", mxResources.get("reset"));
        c.style.position = "relative";
        c.style.left = "-16px";
        c.style.width = "12px";
        c.style.height = "14px";
        c.style.cursor = "pointer";
        c.style.display = "inline-block";
        c.style.top = "3px";
        c.style.background = "url(" + IMAGE_PATH + "/transparent.gif)";
        mxEvent.addListener(c, "click", function() {
            e.value = "";
            e.focus()
        });
        k.appendChild(e);
        k.appendChild(c);
        f.appendChild(k);
        this.init = function() {
            e.focus();
            mxClient.IS_GC || mxClient.IS_FF || 5 <= document.documentMode ? e.select() : document.execCommand("selectAll", !1, null)
        };
        k = document.createElement("div");
        k.style.marginTop = "18px";
        k.style.textAlign = "right";
        mxEvent.addListener(e, "keypress", function(d) {
            13 == d.keyCode && (b.hideDialog(), n(e.value))
        });
        c = mxUtils.button(mxResources.get("cancel"), function() {
            b.hideDialog()
        });
        c.className = "geBtn";
        b.editor.cancelFirst && k.appendChild(c);
        g = mxUtils.button(g, function() {
            b.hideDialog();
            n(e.value)
        });
        g.className = "geBtn gePrimaryBtn";
        k.appendChild(g);
        b.editor.cancelFirst || k.appendChild(c);
        f.appendChild(k);
        this.container = f
    },
    OutlineWindow = function(b, c, g, n, f) {
        function k() {
            a.outline.pageScale = e.pageScale;
            a.outline.pageFormat = e.pageFormat;
            a.outline.pageVisible = e.pageVisible;
            a.outline.background = null == e.background || e.background == mxConstants.NONE ? e.defaultPageBackgroundColor : e.background;
            var b = mxUtils.getCurrentStyle(e.container);
            d.style.backgroundColor = b.backgroundColor;
            null != e.view.backgroundPageShape && null != a.outline.view.backgroundPageShape && (a.outline.view.backgroundPageShape.fill = e.view.backgroundPageShape.fill);
            a.outline.refresh()
        }
        var e = b.editor.graph,
            d = document.createElement("div");
        d.style.position = "absolute";
        d.style.width = "100%";
        d.style.height = "100%";
        d.style.border = "1px solid whiteSmoke";
        d.style.overflow = "hidden";
        this.window = new mxWindow(mxResources.get("outline"), d, c, g,
            n, f, !0, !0);
        this.window.minimumSize = new mxRectangle(0, 0, 80, 80);
        this.window.destroyOnClose = !1;
        this.window.setMaximizable(!1);
        this.window.setResizable(!0);
        this.window.setClosable(!0);
        this.window.setVisible(!0);
        this.window.setLocation = function(a, b) {
            var d = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
            a = Math.max(0, Math.min(a, (window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth) - this.table.clientWidth));
            b = Math.max(0, Math.min(b, d - this.table.clientHeight -
                48));
            this.getX() == a && this.getY() == b || mxWindow.prototype.setLocation.apply(this, arguments)
        };
        var h = mxUtils.bind(this, function() {
            var a = this.window.getX(),
                b = this.window.getY();
            this.window.setLocation(a, b)
        });
        mxEvent.addListener(window, "resize", h);
        var a = b.createOutline(this.window);
        this.destroy = function() {
            mxEvent.removeListener(window, "resize", h);
            this.window.destroy();
            a.destroy()
        };
        this.window.addListener(mxEvent.RESIZE, mxUtils.bind(this, function() {
            a.update(!1);
            a.outline.sizeDidChange()
        }));
        this.window.addListener(mxEvent.SHOW,
            mxUtils.bind(this, function() {
                this.window.fit();
                a.suspended = !1;
                a.outline.refresh();
                a.update()
            }));
        this.window.addListener(mxEvent.HIDE, mxUtils.bind(this, function() {
            a.suspended = !0
        }));
        this.window.addListener(mxEvent.NORMALIZE, mxUtils.bind(this, function() {
            a.suspended = !1;
            a.update()
        }));
        this.window.addListener(mxEvent.MINIMIZE, mxUtils.bind(this, function() {
            a.suspended = !0
        }));
        var l = a.createGraph;
        a.createGraph = function(a) {
            var b = l.apply(this, arguments);
            b.gridEnabled = !1;
            b.pageScale = e.pageScale;
            b.pageFormat = e.pageFormat;
            b.background = null == e.background || e.background == mxConstants.NONE ? e.defaultPageBackgroundColor : e.background;
            b.pageVisible = e.pageVisible;
            var c = mxUtils.getCurrentStyle(e.container);
            d.style.backgroundColor = c.backgroundColor;
            return b
        };
        a.init(d);
        b.editor.addListener("resetGraphView", k);
        b.addListener("pageFormatChanged", k);
        b.addListener("backgroundColorChanged", k);
        b.addListener("backgroundImageChanged", k);
        b.addListener("pageViewChanged", function() {
            k();
            a.update(!0)
        });
        if (a.outline.dialect == mxConstants.DIALECT_SVG) {
            var p =
                b.actions.get("zoomIn"),
                q = b.actions.get("zoomOut");
            mxEvent.addMouseWheelListener(function(b, d) {
                var c = !1;
                for (b = mxEvent.getSource(b); null != b;) {
                    if (a&& a.outline && b == a.outline.view.canvas.ownerSVGElement) {
                        c = !0;
                        break
                    }
                    b = b.parentNode
                }
                c && (d ? p.funct() : q.funct())
            })
        }
    },
    LayersWindow = function(b, c, g, n, f) {
        function k(a) {
            if (d.isEnabled() && null != a) {
                var c = d.convertValueToString(a);
                c = new FilenameDialog(b, c || mxResources.get("background"), mxResources.get("rename"), mxUtils.bind(this, function(b) {
                    null != b && d.cellLabelChanged(a, b)
                }), mxResources.get("enterName"));
                b.showDialog(c.container, 300, 100, !0, !0);
                c.init()
            }
        }

        function e() {
            function a(a, b, c, g) {
                var e = document.createElement("div");
                e.className = "geToolbarContainer";
                e.style.overflow = "hidden";
                e.style.position = "relative";
                e.style.padding = "4px";
                e.style.height = "22px";
                e.style.display = "block";
                e.style.backgroundColor = "white" == Dialog.backdropColor ? "whiteSmoke" : Dialog.backdropColor;
                e.style.borderWidth = "0px 0px 1px 0px";
                e.style.borderColor = "#c3c3c3";
                e.style.borderStyle = "solid";
                e.style.whiteSpace = "nowrap";
                e.setAttribute("title",
                    b);
                var f = document.createElement("div");
                f.style.display = "inline-block";
                f.style.width = "100%";
                f.style.textOverflow = "ellipsis";
                f.style.overflow = "hidden";
                mxEvent.addListener(e, "dragover", function(b) {
                    b.dataTransfer.dropEffect = "move";
                    q = a;
                    b.stopPropagation();
                    b.preventDefault()
                });
                mxEvent.addListener(e, "dragstart", function(a) {
                    p = e;
                    mxClient.IS_FF && a.dataTransfer.setData("Text", "<layer/>")
                });
                mxEvent.addListener(e, "dragend", function(a) {
                    null != p && null != q && d.addCell(c, d.model.root, q);
                    q = p = null;
                    a.stopPropagation();
                    a.preventDefault()
                });
                var h = document.createElement("img");
                h.setAttribute("draggable", "false");
                h.setAttribute("align", "top");
                h.setAttribute("border", "0");
                h.style.padding = "4px";
                h.setAttribute("title", mxResources.get("lockUnlock"));
                var m = d.getCurrentCellStyle(c);
                "1" == mxUtils.getValue(m, "locked", "0") ? h.setAttribute("src", Dialog.prototype.lockedImage) : h.setAttribute("src", Dialog.prototype.unlockedImage);
                d.isEnabled() && (h.style.cursor = "pointer");
                mxEvent.addListener(h, "click", function(a) {
                    if (d.isEnabled()) {
                        var b =
                            null;
                        d.getModel().beginUpdate();
                        try {
                            b = "1" == mxUtils.getValue(m, "locked", "0") ? null : "1", d.setCellStyles("locked", b, [c])
                        } finally {
                            d.getModel().endUpdate()
                        }
                        "1" == b && d.removeSelectionCells(d.getModel().getDescendants(c));
                        mxEvent.consume(a)
                    }
                });
                f.appendChild(h);
                h = document.createElement("input");
                h.setAttribute("type", "checkbox");
                h.setAttribute("title", mxResources.get(d.model.isVisible(c) ? "hide" : "show"));
                h.style.marginLeft = "4px";
                h.style.marginRight = "6px";
                h.style.marginTop = "4px";
                f.appendChild(h);
                d.model.isVisible(c) &&
                    (h.setAttribute("checked", "checked"), h.defaultChecked = !0);
                mxEvent.addListener(h, "click", function(a) {
                    d.model.setVisible(c, !d.model.isVisible(c));
                    mxEvent.consume(a)
                });
                mxUtils.write(f, b);
                e.appendChild(f);
                if (d.isEnabled()) {
                    if (mxClient.IS_TOUCH || mxClient.IS_POINTER || mxClient.IS_IE && 10 > document.documentMode) b = document.createElement("div"), b.style.display = "block", b.style.textAlign = "right", b.style.whiteSpace = "nowrap", b.style.position = "absolute", b.style.right = "6px", b.style.top = "6px", 0 < a && (f = document.createElement("a"),
                        f.setAttribute("title", mxResources.get("toBack")), f.className = "geButton", f.style.cssFloat = "none", f.innerHTML = "&#9660;", f.style.width = "14px", f.style.height = "14px", f.style.fontSize = "14px", f.style.margin = "0px", f.style.marginTop = "-1px", b.appendChild(f), mxEvent.addListener(f, "click", function(b) {
                            d.isEnabled() && d.addCell(c, d.model.root, a - 1);
                            mxEvent.consume(b)
                        })), 0 <= a && a < v - 1 && (f = document.createElement("a"), f.setAttribute("title", mxResources.get("toFront")), f.className = "geButton", f.style.cssFloat = "none", f.innerHTML =
                        "&#9650;", f.style.width = "14px", f.style.height = "14px", f.style.fontSize = "14px", f.style.margin = "0px", f.style.marginTop = "-1px", b.appendChild(f), mxEvent.addListener(f, "click", function(b) {
                            d.isEnabled() && d.addCell(c, d.model.root, a + 1);
                            mxEvent.consume(b)
                        })), e.appendChild(b);
                    mxClient.IS_SVG && (!mxClient.IS_IE || 10 <= document.documentMode) && (e.setAttribute("draggable", "true"), e.style.cursor = "move")
                }
                mxEvent.addListener(e, "dblclick", function(a) {
                    var b = mxEvent.getSource(a).nodeName;
                    "INPUT" != b && "IMG" != b && (k(c), mxEvent.consume(a))
                });
                d.getDefaultParent() == c ? (e.style.background = "white" == Dialog.backdropColor ? "#e6eff8" : "#505759", e.style.fontWeight = d.isEnabled() ? "bold" : "", w = c) : mxEvent.addListener(e, "click", function(a) {
                    d.isEnabled() && (d.setDefaultParent(g), d.view.setCurrentRoot(null))
                });
                l.appendChild(e)
            }
            v = d.model.getChildCount(d.model.root);
            l.innerHTML = "";
            for (var b = v - 1; 0 <= b; b--) mxUtils.bind(this, function(c) {
                a(b, d.convertValueToString(c) || mxResources.get("background"), c, c)
            })(d.model.getChildAt(d.model.root, b));
            var c = d.convertValueToString(w) ||
                mxResources.get("background");
            t.setAttribute("title", mxResources.get("removeIt", [c]));
            x.setAttribute("title", mxResources.get("duplicateIt", [c]));
            r.setAttribute("title", mxResources.get("editData"));
            d.isSelectionEmpty() && (m.className = "geButton mxDisabled")
        }
        var d = b.editor.graph,
            h = document.createElement("div");
        h.style.userSelect = "none";
        h.style.background = "white" == Dialog.backdropColor ? "whiteSmoke" : Dialog.backdropColor;
        h.style.border = "1px solid whiteSmoke";
        h.style.height = "100%";
        h.style.marginBottom = "10px";
        h.style.overflow = "auto";
        var a = EditorUi.compactUi ? "26px" : "30px",
            l = document.createElement("div");
        l.style.backgroundColor = "white" == Dialog.backdropColor ? "#dcdcdc" : Dialog.backdropColor;
        l.style.position = "absolute";
        l.style.overflow = "auto";
        l.style.left = "0px";
        l.style.right = "0px";
        l.style.top = "0px";
        l.style.bottom = parseInt(a) + 7 + "px";
        h.appendChild(l);
        var p = null,
            q = null;
        mxEvent.addListener(h, "dragover", function(a) {
            a.dataTransfer.dropEffect = "move";
            q = 0;
            a.stopPropagation();
            a.preventDefault()
        });
        mxEvent.addListener(h,
            "drop",
            function(a) {
                a.stopPropagation();
                a.preventDefault()
            });
        var v = null,
            w = null,
            u = document.createElement("div");
        u.className = "geToolbarContainer";
        u.style.position = "absolute";
        u.style.bottom = "0px";
        u.style.left = "0px";
        u.style.right = "0px";
        u.style.height = a;
        u.style.overflow = "hidden";
        u.style.padding = EditorUi.compactUi ? "4px 0px 3px 0px" : "1px";
        u.style.backgroundColor = "white" == Dialog.backdropColor ? "whiteSmoke" : Dialog.backdropColor;
        u.style.borderWidth = "1px 0px 0px 0px";
        u.style.borderColor = "#c3c3c3";
        u.style.borderStyle =
            "solid";
        u.style.display = "block";
        u.style.whiteSpace = "nowrap";
        a = document.createElement("a");
        a.className = "geButton";
        var t = a.cloneNode();
        t.innerHTML = '<div class="geSprite geSprite-delete" style="display:inline-block;"></div>';
        mxEvent.addListener(t, "click", function(a) {
            if (d.isEnabled()) {
                d.model.beginUpdate();
                try {
                    var b = d.model.root.getIndex(w);
                    d.removeCells([w], !1);
                    0 == d.model.getChildCount(d.model.root) ? (d.model.add(d.model.root, new mxCell), d.setDefaultParent(null)) : 0 < b && b <= d.model.getChildCount(d.model.root) ?
                        d.setDefaultParent(d.model.getChildAt(d.model.root, b - 1)) : d.setDefaultParent(null)
                } finally {
                    d.model.endUpdate()
                }
            }
            mxEvent.consume(a)
        });
        d.isEnabled() || (t.className = "geButton mxDisabled");
        u.appendChild(t);
        var m = a.cloneNode();
        m.setAttribute("title", mxUtils.trim(mxResources.get("moveSelectionTo", ["..."])));
        m.innerHTML = '<div class="geSprite geSprite-insert" style="display:inline-block;"></div>';
        mxEvent.addListener(m, "click", function(a) {
            if (d.isEnabled() && !d.isSelectionEmpty()) {
                var c = mxUtils.getOffset(m);
                b.showPopupMenu(mxUtils.bind(this,
                    function(a, b) {
                        for (var c = v - 1; 0 <= c; c--) mxUtils.bind(this, function(c) {
                            var e = a.addItem(d.convertValueToString(c) || mxResources.get("background"), null, mxUtils.bind(this, function() {
                                d.moveCells(d.getSelectionCells(), 0, 0, !1, c)
                            }), b);
                            1 == d.getSelectionCount() && d.model.isAncestor(c, d.getSelectionCell()) && a.addCheckmark(e, Editor.checkmarkImage)
                        })(d.model.getChildAt(d.model.root, c))
                    }), c.x, c.y + m.offsetHeight, a)
            }
        });
        u.appendChild(m);
        var r = a.cloneNode();
        r.innerHTML = '<div class="geSprite geSprite-dots" style="display:inline-block;"></div>';
        r.setAttribute("title", mxResources.get("rename"));
        mxEvent.addListener(r, "click", function(a) {
            d.isEnabled() && b.showDataDialog(w);
            mxEvent.consume(a)
        });
        d.isEnabled() || (r.className = "geButton mxDisabled");
        u.appendChild(r);
        var x = a.cloneNode();
        x.innerHTML = '<div class="geSprite geSprite-duplicate" style="display:inline-block;"></div>';
        mxEvent.addListener(x, "click", function(a) {
            if (d.isEnabled()) {
                a = null;
                d.model.beginUpdate();
                try {
                    a = d.cloneCell(w), d.cellLabelChanged(a, mxResources.get("untitledLayer")), a.setVisible(!0),
                        a = d.addCell(a, d.model.root), d.setDefaultParent(a)
                } finally {
                    d.model.endUpdate()
                }
                null == a || d.isCellLocked(a) || d.selectAll(a)
            }
        });
        d.isEnabled() || (x.className = "geButton mxDisabled");
        u.appendChild(x);
        a = a.cloneNode();
        a.innerHTML = '<div class="geSprite geSprite-plus" style="display:inline-block;"></div>';
        a.setAttribute("title", mxResources.get("addLayer"));
        mxEvent.addListener(a, "click", function(a) {
            if (d.isEnabled()) {
                d.model.beginUpdate();
                try {
                    var b = d.addCell(new mxCell(mxResources.get("untitledLayer")), d.model.root);
                    d.setDefaultParent(b)
                } finally {
                    d.model.endUpdate()
                }
            }
            mxEvent.consume(a)
        });
        d.isEnabled() || (a.className = "geButton mxDisabled");
        u.appendChild(a);
        h.appendChild(u);
        e();
        d.model.addListener(mxEvent.CHANGE, e);
        d.addListener("defaultParentChanged", e);
        d.selectionModel.addListener(mxEvent.CHANGE, function() {
            d.isSelectionEmpty() ? m.className = "geButton mxDisabled" : m.className = "geButton"
        });
        this.window = new mxWindow(mxResources.get("layers"), h, c, g, n, f, !0, !0);
        this.window.minimumSize = new mxRectangle(0, 0, 120, 120);
        this.window.destroyOnClose = !1;
        this.window.setMaximizable(!1);
        this.window.setResizable(!0);
        this.window.setClosable(!0);
        this.window.setVisible(!0);
        this.init = function() {
            l.scrollTop = l.scrollHeight - l.clientHeight
        };
        this.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function() {
            this.window.fit()
        }));
        this.refreshLayers = e;
        this.window.setLocation = function(a, b) {
            var c = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
            a = Math.max(0, Math.min(a, (window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth) -
                this.table.clientWidth));
            b = Math.max(0, Math.min(b, c - this.table.clientHeight - 48));
            this.getX() == a && this.getY() == b || mxWindow.prototype.setLocation.apply(this, arguments)
        };
        var y = mxUtils.bind(this, function() {
            var a = this.window.getX(),
                b = this.window.getY();
            this.window.setLocation(a, b)
        });
        mxEvent.addListener(window, "resize", y);
        this.destroy = function() {
            mxEvent.removeListener(window, "resize", y);
            this.window.destroy()
        }
    };