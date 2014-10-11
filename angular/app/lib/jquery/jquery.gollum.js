(function (e) {
    var t = {debugOn: !1, markupCreated: !1, markup: "", attachEvents: function (i) {
        e("#gollum-dialog-action-ok").click(function (e) {
            t.eventOK(e, i)
        }), e("#gollum-dialog-action-cancel").click(t.eventCancel), e('#gollum-dialog-dialog input[type="text"]').keydown(function (e) {
            13 == e.keyCode && t.eventOK(e, i)
        })
    }, detachEvents: function () {
        e("#gollum-dialog-action-ok").unbind("click"), e("#gollum-dialog-action-cancel").unbind("click")
    }, createFieldMarkup: function (e) {
        for (var i = "<fieldset>", n = 0; e.length > n; n++)if ("object" == typeof e[n]) {
            switch (i += '<div class="field">', e[n].type) {
                case"text":
                    i += t.createFieldText(e[n]);
                    break;
                default:
            }
            i += "</div>"
        }
        return i += "</fieldset>"
    }, createFieldText: function (e) {
        var t = "";
        return e.name && (t += "<label", e.id && (t += ' for="' + e.name + '"'), t += ">" + e.name + "</label>"), t += '<input type="text"', e.id && (t += ' name="' + e.id + '"', "code" == e.type && (t += ' class="code"'), t += ' id="gollum-dialog-dialog-generated-field-' + e.id + '">'), t
    }, createMarkup: function (i, n) {
        return t.markupCreated = !0, e.facebox ? '<div id="gollum-dialog-dialog"><div id="gollum-dialog-dialog-title"><h4>' + i + "</h4></div>" + '<div id="gollum-dialog-dialog-body">' + n + "</div>" + '<div id="gollum-dialog-dialog-buttons">' + '<a href="#" title="Cancel" id="gollum-dialog-action-cancel" ' + 'class="gollum-minibutton">Cancel</a>' + '<a href="#" title="OK" id="gollum-dialog-action-ok" ' + 'class="gollum-minibutton">OK</a>' + "</div>" + "</div>" : '<div id="gollum-dialog-dialog"><div id="gollum-dialog-dialog-inner"><div id="gollum-dialog-dialog-bg"><div id="gollum-dialog-dialog-title"><h4>' + i + "</h4></div>" + '<div id="gollum-dialog-dialog-body">' + n + "</div>" + '<div id="gollum-dialog-dialog-buttons">' + '<a href="#" title="Cancel" id="gollum-dialog-action-cancel" ' + 'class="minibutton">Cancel</a>' + '<a href="#" title="OK" id="gollum-dialog-action-ok" ' + 'class="minibutton">OK</a>' + "</div>" + "</div>" + "</div>" + "</div>"
    }, eventCancel: function (e) {
        e.preventDefault(), i("Cancelled dialog."), t.hide()
    }, eventOK: function (i, n) {
        i.preventDefault();
        var a = [];
        e("#gollum-dialog-dialog-body input").each(function () {
            a[e(this).attr("name")] = e(this).val()
        }), n && "function" == typeof n && n(a), t.hide()
    }, hide: function () {
        e.facebox ? (t.markupCreated = !1, e(document).trigger("close.facebox"), t.detachEvents()) : e.browser.msie ? (e("#gollum-dialog-dialog").hide().removeClass("active"), e("select").css("visibility", "visible")) : e("#gollum-dialog-dialog").animate({opacity: 0}, {duration: 200, complete: function () {
            e("#gollum-dialog-dialog").removeClass("active")
        }})
    }, init: function (n) {
        var a = "", s = "";
        return n && "object" == typeof n ? (n.body && "string" == typeof n.body && (s = "<p>" + n.body + "</p>"), n.fields && "object" == typeof n.fields && (s += t.createFieldMarkup(n.fields)), n.title && "string" == typeof n.title && (a = n.title), t.markupCreated && (e.facebox ? e(document).trigger("close.facebox") : e("#gollum-dialog-dialog").remove()), t.markup = t.createMarkup(a, s), e.facebox ? e(document).bind("reveal.facebox", function () {
            n.OK && "function" == typeof n.OK && (t.attachEvents(n.OK), e(e('#facebox input[type="text"]').get(0)).focus())
        }) : (e("body").append(t.markup), n.OK && "function" == typeof n.OK && t.attachEvents(n.OK)), t.show(), void 0) : (i("Editor Dialog: Cannot init; invalid init object"), void 0)
    }, show: function () {
        t.markupCreated ? (i("Showing dialog"), e.facebox ? e.facebox(t.markup) : e.browser.msie ? (e("#gollum-dialog.dialog").addClass("active"), t.position(), e("select").css("visibility", "hidden")) : (e("#gollum-dialog.dialog").css("display", "none"), e("#gollum-dialog-dialog").animate({opacity: 0}, {duration: 0, complete: function () {
            e("#gollum-dialog-dialog").css("display", "block"), t.position(), e("#gollum-dialog-dialog").animate({opacity: 1}, {duration: 500})
        }}))) : i("Dialog: No markup to show. Please use init first.")
    }, position: function () {
        var t = e("#gollum-dialog-dialog-inner").height();
        e("#gollum-dialog-dialog-inner").css("height", t + "px").css("margin-top", -1 * parseInt(t / 2))
    }};
    e.facebox && e(document).bind("reveal.facebox", function () {
        e("#facebox img.close_image").remove()
    });
    var i = function (e) {
        t.debugOn && "undefined" != typeof console && console.log(e)
    };
    e.GollumDialog = t
})(jQuery);

(function (e) {
    var n, t = {MarkupType: "markdown", EditorMode: "code", NewFile: !1, HasFunctionBar: !0, Debug: !1, NoDefinitionsFor: [], AfterClickFunBar: null}, i = {};
    e.fn.GollumEditor = function (o) {
        if (n = this, i = e.extend(t, o), a("GollumEditor loading"), n.data("AfterClickFunBar", i.AfterClickFunBar), r.baseEditorMarkup() && (r.titleDisplayed() && n.find(".gollum-editor-title-field").addClass("active"), r.editSummaryMarkup() && (e.GollumEditor.Placeholder.add(e(".gollum-editor-edit-summary input")), e('.gollum-editor form[name="gollum-editor"]').submit(function (t) {
            t.preventDefault(), e.GollumEditor.Placeholder.clearAll(), a("submitting"), e(this).unbind("submit"), e(this).submit()
        })), r.collapsibleInputs() && e(".gollum-editor .collapsed a.button, .gollum-editor .expanded a.button").click(function (t) {
            t.preventDefault(), e(this).parent().toggleClass("expanded"), e(this).parent().toggleClass("collapsed")
        }), r.previewButton() && n.find(".gollum-editor .gollum-editor-preview").click(function () {
            var t = e(".gollum-editor form").attr("action"), i = e(e(".gollum-editor form").get(0));
            return i.attr("action", this.href || "/preview"), i.attr("target", "_blank"), i.submit(), i.attr("action", t), i.removeAttr("target"), !1
        }), r.functionBar())) {
            var d = n.find(".gollum-editor-body").attr("data-markup-lang");
            d && (i.MarkupType = d), s.setActiveLanguage(i.MarkupType), r.formatSelector() && l.init(e(".gollum-editor-format-selector select")), r.help() && (e(".gollum-editor-help").hide(), e(".gollum-editor-help").removeClass("jaws"))
        }
    }, e.GollumEditor = function () {
    }, e.GollumEditor.defineLanguage = function (e, t) {
        "object" == typeof t ? s.define(e, t) : a("GollumEditor.defineLanguage: definition for " + e + " is not an object")
    };
    var a = function (e) {
        i.Debug && "undefined" != typeof console && console.log(e)
    }, s = {_ACTIVE_LANG: "", _LOADED_LANGS: [], _LANG: {}, define: function (t, i) {
        if (s._ACTIVE_LANG = t, s._LOADED_LANGS.push(t), "object" == typeof e.GollumEditor.WikiLanguage) {
            var n = {};
            e.extend(n, e.GollumEditor.WikiLanguage, i), s._LANG[t] = n
        } else s._LANG[t] = i
    }, getActiveLanguage: function () {
        return s._ACTIVE_LANG
    }, setActiveLanguage: function (e) {
        s.isLoadedFor(e) ? (s._ACTIVE_LANG = e, o.refresh(n)) : (s._ACTIVE_LANG = null, s.loadFor(e, function (t, i) {
            "success" != i && (a("Failed to load language definition for " + e), s.define(e, {})), r.functionBar() && o.refresh(), s.isValid() && r.formatSelector() && l.updateSelected()
        }))
    }, getDefinitionFor: function (e, t) {
        return t || (t = s._ACTIVE_LANG), s.isLoadedFor(t) && s._LANG[t][e] && "object" == typeof s._LANG[t][e] ? s._LANG[t][e] : null
    }, loadFor: function (t, n) {
        if (i.NoDefinitionsFor.length)for (var a = 0; i.NoDefinitionsFor.length > a; a++)if (t == i.NoDefinitionsFor[a] && "function" == typeof n)return n(null, "error"), void 0;
        var s = "/assets/langs/" + t + ".js";
        e.ajax({url: s, dataType: "script", complete: function (e, t) {
            "function" == typeof n && n(e, t)
        }})
    }, isLoadedFor: function (e) {
        if (0 === s._LOADED_LANGS.length)return!1;
        for (var t = 0; s._LOADED_LANGS.length > t; t++)if (s._LOADED_LANGS[t] == e)return!0;
        return!1
    }, isValid: function () {
        return s._ACTIVE_LANG && "object" == typeof s._LANG[s._ACTIVE_LANG]
    }}, r = {baseEditorMarkup: function () {
        return n.find(".gollum-editor").length && n.find(".gollum-editor-body").length
    }, collapsibleInputs: function () {
        return n.find(".gollum-editor .collapsed, .gollum-editor .expanded").length
    }, formatSelector: function () {
        return n.find(".gollum-editor-format-selector select").length
    }, functionBar: function () {
        return i.HasFunctionBar && n.find(".gollum-editor-function-bar").length
    }, ff4Environment: function () {
        var e = new RegExp(/Firefox\/4.0b/);
        return e.test(navigator.userAgent)
    }, editSummaryMarkup: function () {
        return n.find("input.gollum-editor-message-field").length > 0
    }, help: function () {
        return n.find(".gollum-editor .gollum-editor-help").length && n.find(".gollum-editor .function-help").length
    }, previewButton: function () {
        return n.find(".gollum-editor .gollum-editor-preview").length
    }, titleDisplayed: function () {
        return i.NewFile
    }}, o = {isActive: !1, activate: function () {
        a("Activating function bar"), n.find(".gollum-editor-function-bar a.function-button").each(function () {
            var t = e(this).attr("class").split(" ")[e(this).attr("class").split(" ").length - 1];
            s.getDefinitionFor(t) ? (e(this).click(o.evtFunctionButtonClick), e(this).removeClass("disabled")) : "function-help" != e(this).attr("id") && e(this).addClass("disabled")
        }), n.find(".gollum-editor-function-bar").addClass("active"), o.isActive = !0
    }, deactivate: function () {
        n.find(".gollum-editor-function-bar a.function-button").unbind("click"), n.find(".gollum-editor-function-bar").removeClass("active"), o.isActive = !1
    }, evtFunctionButtonClick: function (t) {
        t.preventDefault();
        var i = e(this).attr("class").split(" ")[e(this).attr("class").split(" ").length - 1], n = s.getDefinitionFor(i);
        "object" == typeof n && o.executeAction(n, t)
    }, executeAction: function (t, i) {
        var n = i || window.event, s = e(n.target).parents(".gollum-editor").find(".gollum-editor-body").val();
        o.getFieldSelectionPosition(e(n.target).parents(".gollum-editor").find(".gollum-editor-body"));
        var l = o.getFieldSelection(e(n.target).parents(".gollum-editor").find(".gollum-editor-body")), c = l, d = !0, u = null;
        if (null == t && (t = {}), t.exec && "function" == typeof t.exec)return t.exec(s, l, e(n.target).parents(".gollum-editor").find(".gollum-editor-body")), void 0;
        var p = /([^\n]+)/gi;
        if (t.search && "object" == typeof t.search && (a("Replacing search Regex"), p = null, p = new RegExp(t.search), a(p)), a('repText is "' + c + '"'), t.replace && "string" == typeof t.replace) {
            a("Running replacement - using " + t.replace);
            var f = t.replace;
            c = c.replace(p, f), c = c.replace(/\$[\d]/g, ""), "" === c && (a("Search string is empty"), u = f.indexOf("$1"), c = f.replace(/\$[\d]/g, ""), -1 == u && (u = Math.floor(f.length / 2)))
        }
        t.append && "string" == typeof t.append && (c == l && (d = !1), c += t.append), c && o.replaceFieldSelection(e(n.target).parents(".gollum-editor").find(".gollum-editor-body"), c, d, u);
        var h = e(n.target).parents(".gollum-editor-wrap").data("AfterClickFunBar");
        e.isFunction(h) && h(e(n.target).parents(".gollum-editor").find(".gollum-editor-body").val())
    }, getFieldSelectionPosition: function (e) {
        if (e.length) {
            var t = 0, i = 0, n = e.get(0);
            if ("number" == typeof n.selectionStart && "number" == typeof n.selectionEnd)t = n.selectionStart, i = n.selectionEnd; else {
                var s = document.selection.createRange(), r = s.duplicate();
                r.moveToElementText(n), r.setEndPoint("EndToEnd", s), t = r.text.length - s.text.length, i = t + s.text.length;
                var c, o = t, l = 0;
                for (a("IE: start position is currently " + o), c = 0; o > c; c++)n.value.charAt(c).match(/\r/) && ++l;
                l && (a("IE start: compensating for " + l + " line breaks"), t -= l, l = 0);
                var d = i;
                for (c = 0; d > c; c++)n.value.charAt(c).match(/\r/) && ++l;
                l && (a("IE end: compensating for " + l + " line breaks"), i -= l)
            }
            return{start: t, end: i}
        }
    }, getFieldSelection: function (e) {
        var i, t = "";
        return e.length ? (i = o.getFieldSelectionPosition(e), t = e.val().substring(i.start, i.end), a("Selected: " + t + " (" + i.start + ", " + i.end + ")"), t) : !1
    }, isShown: function () {
        return n.find(".gollum-editor-function-bar").is(":visible")
    }, refresh: function () {
        r.functionBar() && (a("Refreshing function bar"), s.isValid() ? (n.find(".gollum-editor-function-bar a.function-button").unbind("click"), o.activate(), c && c.setActiveHelp(s.getActiveLanguage())) : (a("Language definition is invalid."), o.isShown() && o.deactivate(), c.isShown() && c.hide()))
    }, replaceFieldSelection: function (e, t, i, n) {
        var a = o.getFieldSelectionPosition(e), s = e.val(), r = !0;
        i === !1 && (r = !1);
        var l = null;
        if (e[0].scrollTop && (l = e[0].scrollTop), e.val(s.substring(0, a.start) + t + s.substring(a.end)), e[0].focus(), r)if (e[0].setSelectionRange)n ? e[0].setSelectionRange(a.start + n, a.start + n) : e[0].setSelectionRange(a.start, a.start + t.length); else if (e[0].createTextRange) {
            var c = e[0].createTextRange();
            c.collapse(!0), n ? (c.moveEnd(a.start + n), c.moveStart(a.start + n)) : (c.moveEnd("character", a.start + t.length), c.moveStart("character", a.start)), c.select()
        }
        l && (e[0].scrollTop = l)
    }}, l = {$_SELECTOR: null, evtChangeFormat: function () {
        var i = e(this).val();
        s.setActiveLanguage(i)
    }, init: function (e) {
        a("Initializing format selector"), l.$_SELECTOR && "object" == typeof l.$_SELECTOR && l.$_SELECTOR.unbind("change"), l.$_SELECTOR = e, l.updateSelected(), l.$_SELECTOR.change(l.evtChangeFormat)
    }, updateSelected: function () {
        var e = s.getActiveLanguage();
        l.$_SELECTOR.val(e)
    }}, c = {_ACTIVE_HELP: "", _LOADED_HELP_LANGS: [], _HELP: {}, define: function (t, i) {
        c.isValidHelpFormat(i) ? (a("help is a valid format"), c._ACTIVE_HELP_LANG = t, c._LOADED_HELP_LANGS.push(t), c._HELP[t] = i, e(".function-help").length && (e(".function-help").hasClass("disabled") && e(".function-help").removeClass("disabled"), e(".function-help").unbind("click"), e(".function-help").click(c.evtHelpButtonClick), c.generateHelpMenuFor(t), e(".gollum-editor-help").length && e(".gollum-editor-help").attr("data-autodisplay") !== void 0 && "true" === e(".gollum-editor-help").attr("data-autodisplay") && c.show())) : e(".function-help").length && e(".function-help").addClass("disabled")
    }, generateHelpMenuFor: function (t) {
        if (!c._HELP[t])return a("Help is not defined for " + t.toString()), !1;
        var i = c._HELP[t];
        n.find(".gollum-editor-help-parent").html(""), n.find(".gollum-editor-help-list").html(""), n.find(".gollum-editor-help-content").html("");
        for (var s = 0; i.length > s && "object" == typeof i[s]; s++) {
            var r = e('<li><a href="#" rel="' + s + '">' + i[s].menuName + "</a></li>");
            e(".gollum-editor-help-parent").append(r), 0 === s && r.children("a").addClass("selected"), r.children("a").click(c.evtParentMenuClick)
        }
        c.generateSubMenu(i[0], 0)
    }, generateSubMenu: function (t, i) {
        n.find(".gollum-editor-help-list").html(""), n.find(".gollum-editor-help-content").html("");
        for (var a = 0; t.content.length > a && "object" == typeof t.content[a]; a++) {
            var s = e('<li><a href="#" rel="' + i + ":" + a + '">' + t.content[a].menuName + "</a></li>");
            n.find(".gollum-editor-help-list").append(s), s.children("a").click(c.evtSubMenuClick)
        }
    }, hide: function () {
        kzi.util.isIE() ? n.find(".gollum-editor-help").css("display", "none") : n.find(".gollum-editor-help").animate({opacity: 0}, 200, function () {
            n.find(".gollum-editor-help").animate({height: "hide"}, 200)
        })
    }, show: function () {
        kzi.util.isIE() ? n.find(".gollum-editor-help").css("display", "block") : n.find(".gollum-editor-help").animate({height: "show"}, 200, function () {
            n.find(".gollum-editor-help").animate({opacity: 1}, 300)
        })
    }, showHelpFor: function (e, t) {
        var i = c._HELP[c._ACTIVE_HELP_LANG][e].content[t].data;
        n.find(".gollum-editor-help-content").html(i)
    }, isLoadedFor: function (e) {
        for (var t = 0; c._LOADED_HELP_LANGS.length > t; t++)if (e == c._LOADED_HELP_LANGS[t])return!0;
        return!1
    }, isShown: function () {
        return n.find(".gollum-editor-help").is(":visible")
    }, isValidHelpFormat: function (e) {
        return"object" == typeof e && e.length && "string" == typeof e[0].menuName && "object" == typeof e[0].content && e[0].content.length
    }, setActiveHelp: function (e) {
        c.isLoadedFor(e) ? (c._ACTIVE_HELP_LANG = e, n.find(".function-help").length && (n.find(".function-help").hasClass("disabled") && n.find(".function-help").removeClass("disabled"), n.find(".function-help").unbind("click"), n.find(".function-help").click(c.evtHelpButtonClick), c.generateHelpMenuFor(e))) : (n.find(".function-help").length && n.find(".function-help").addClass("disabled"), c.isShown() && c.hide())
    }, evtHelpButtonClick: function (t) {
        t.preventDefault();
        var i = e(t.target).parents(".gollum-editor");
        c.isShown() ? (i.find(".gollum-editor-help").length && "undefined" !== i.find(".gollum-editor-help").attr("data-autodisplay") && "true" === i.find(".gollum-editor-help").attr("data-autodisplay") && i.find(".gollum-editor-help").attr("data-autodisplay", ""), c.hide()) : c.show()
    }, evtParentMenuClick: function (t) {
        if (t.preventDefault(), !e(this).hasClass("selected")) {
            var i = e(this).attr("rel"), a = c._HELP[c._ACTIVE_HELP_LANG][i];
            e(".gollum-editor-help-parent li a").removeClass("selected"), e(this).addClass("selected"), c.generateSubMenu(a, i), e(n.find(".gollum-editor-help-list li a").get(0)).click()
        }
    }, evtSubMenuClick: function (t) {
        if (t.preventDefault(), !e(this).hasClass("selected")) {
            var i = e(this).attr("rel").split(":");
            n.find(".gollum-editor-help-list li a").removeClass("selected"), e(this).addClass("selected"), c.showHelpFor(i[0], i[1])
        }
    }};
    e.GollumEditor.defineHelp = c.define, e.GollumEditor.Dialog = e.GollumDialog, e.GollumEditor.replaceSelection = function (t) {
        o.replaceFieldSelection(e(event.target).parents(".gollum-editor").find(".gollum-editor-body"), t)
    }, e.GollumEditor.FunctionBar = o, e.GollumEditor.Placeholder = e.GollumPlaceholder
})(jQuery);

(function (e) {
    var t = {_PLACEHOLDERS: [], _p: function (t) {
        this.fieldObject = t, this.placeholderText = t.val();
        var i = t.val();
        t.addClass("ph"), t.blur(function () {
            "" == e(this).val() && (e(this).val(i), e(this).addClass("ph"))
        }), t.focus(function () {
            e(this).removeClass("ph"), e(this).val() == i ? e(this).val("") : e(this)[0].select()
        })
    }, add: function (e) {
        t._PLACEHOLDERS.push(new t._p(e))
    }, clearAll: function () {
        for (var e = 0; t._PLACEHOLDERS.length > e; e++)t._PLACEHOLDERS[e].fieldObject.val() == t._PLACEHOLDERS[e].placeholderText && t._PLACEHOLDERS[e].fieldObject.val("")
    }, exists: function () {
        return _PLACEHOLDERS.length
    }};
    e.GollumPlaceholder = t
})(jQuery);

(function (e) {
    function t(t) {
        var i;
        return t && t.constructor == Array && 3 == t.length ? t : (i = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(i[1]), parseInt(i[2]), parseInt(i[3])] : (i = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [2.55 * parseFloat(i[1]), 2.55 * parseFloat(i[2]), 2.55 * parseFloat(i[3])] : (i = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)] : (i = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(i[1] + i[1], 16), parseInt(i[2] + i[2], 16), parseInt(i[3] + i[3], 16)] : n[e.trim(t).toLowerCase()]
    }

    function i(i, n) {
        var a;
        do {
            if (a = e.curCSS(i, n), "" != a && "transparent" != a || e.nodeName(i, "body"))break;
            n = "backgroundColor"
        } while (i = i.parentNode);
        return t(a)
    }

    e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (n, a) {
        e.fx.step[a] = function (e) {
            0 == e.state && (e.start = i(e.elem, a), e.end = t(e.end)), e.elem.style[a] = "rgb(" + [Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0]), 255), 0), Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1]), 255), 0), Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2]), 255), 0)].join(",") + ")"
        }
    });
    var n = {aqua: [0, 255, 255], azure: [240, 255, 255], beige: [245, 245, 220], black: [0, 0, 0], blue: [0, 0, 255], brown: [165, 42, 42], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgrey: [169, 169, 169], darkgreen: [0, 100, 0], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkviolet: [148, 0, 211], fuchsia: [255, 0, 255], gold: [255, 215, 0], green: [0, 128, 0], indigo: [75, 0, 130], khaki: [240, 230, 140], lightblue: [173, 216, 230], lightcyan: [224, 255, 255], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightyellow: [255, 255, 224], lime: [0, 255, 0], magenta: [255, 0, 255], maroon: [128, 0, 0], navy: [0, 0, 128], olive: [128, 128, 0], orange: [255, 165, 0], pink: [255, 192, 203], purple: [128, 0, 128], violet: [128, 0, 128], red: [255, 0, 0], silver: [192, 192, 192], white: [255, 255, 255], yellow: [255, 255, 0]}
})(jQuery);

(function (e) {
    var t = {"function-bold": {search: /([^\n]+)([\n\s]*)/g, replace: "**$1**$2"}, "function-italic": {search: /([^\n]+)([\n\s]*)/g, replace: "_$1_$2"}, "function-code": {search: /(^[\n]+)([\n\s]*)/g, replace: "\n```\n$1\n```$2"}, "function-hr": {append: "\n***\n"}, "function-ul": {search: /(.+)([\n]?)/g, replace: "\n* $1$2"}, "function-ol": {search: /(.+)([\n]?)/g, replace: "\n1. $1$2"}, "function-blockquote": {search: /(.+)([\n]?)/g, replace: "\n> $1$2"}, "function-h1": {search: /(.+)([\n]?)/g, replace: "\n# $1$2\n"}, "function-h2": {search: /(.+)([\n]?)/g, replace: "\n## $1$2\n"}, "function-h3": {search: /(.+)([\n]?)/g, replace: "\n### $1$2\n"}, "function-link": {exec: function () {
    }}, "function-image": {exec: function () {
    }}, "function-emoji": {}, "function-preview": {}}, i = [
        {menuName: "Block Elements", content: [
            {menuName: "Paragraphs &amp; Breaks", data: "<p>To create a paragraph, simply create a block of text that is not separated by one or more blank lines. Blocks of text separated by one or more blank lines will be parsed as paragraphs.</p><p>If you want to create a line break, end a line with two or more spaces, then hit Return/Enter.</p>"},
            {menuName: "Headers", data: "<p>Markdown supports two header formats. The wiki editor uses the &ldquo;atx&rsquo;-style headers. Simply prefix your header text with the number of <code>#</code> characters to specify heading depth. For example: <code># Header 1</code>, <code>## Header 2</code> and <code>### Header 3</code> will be progressively smaller headers. You may end your headers with any number of hashes.</p>"},
            {menuName: "Blockquotes", data: "<p>Markdown creates blockquotes email-style by prefixing each line with the <code>&gt;</code>. This looks best if you decide to hard-wrap text and prefix each line with a <code>&gt;</code> character, but Markdown supports just putting <code>&gt;</code> before your paragraph.</p>"},
            {menuName: "Lists", data: "<p>Markdown supports both ordered and unordered lists. To create an ordered list, simply prefix each line with a number (any number will do &mdash; this is why the editor only uses one number.) To create an unordered list, you can prefix each line with <code>*</code>, <code>+</code> or <code>-</code>.</p> List items can contain multiple paragraphs, however each paragraph must be indented by at least 4 spaces or a tab."},
            {menuName: "Code Blocks", data: "<p>Markdown wraps code blocks in pre-formatted tags to preserve indentation in your code blocks. To create a code block, indent the entire block by at least 4 spaces or one tab. Markdown will strip the extra indentation you&rsquo;ve added to the code block.</p>"},
            {menuName: "Horizontal Rules", data: "Horizontal rules are created by placing three or more hyphens, asterisks or underscores on a line by themselves. Spaces are allowed between the hyphens, asterisks or underscores."}
        ]},
        {menuName: "Span Elements", content: [
            {menuName: "Links", data: "<p>Markdown has two types of links: <strong>inline</strong> and <strong>reference</strong>. For both types of links, the text you want to display to the user is placed in square brackets. For example, if you want your link to display the text &ldquo;GitHub&rdquo;, you write <code>[GitHub]</code>.</p><p>To create an inline link, create a set of parentheses immediately after the brackets and write your URL within the parentheses. (e.g., <code>[GitHub](http://github.com/)</code>). Relative paths are allowed in inline links.</p><p>To create a reference link, use two sets of square brackets. <code>[my internal link][internal-ref]</code> will link to the internal reference <code>internal-ref</code>.</p>"},
            {menuName: "Emphasis", data: "<p>Asterisks (<code>*</code>) and underscores (<code>_</code>) are treated as emphasis and are wrapped with an <code>&lt;em&gt;</code> tag, which usually displays as italics in most browsers. Double asterisks (<code>**</code>) or double underscores (<code>__</code>) are treated as bold using the <code>&lt;strong&gt;</code> tag. To create italic or bold text, simply wrap your words in single/double asterisks/underscores. For example, <code>**My double emphasis text**</code> becomes <strong>My double emphasis text</strong>, and <code>*My single emphasis text*</code> becomes <em>My single emphasis text</em>.</p>"},
            {menuName: "Code", data: "<p>To create inline spans of code, simply wrap the code in backticks (<code>`</code>). Markdown will turn <code>`myFunction`</code> into <code>myFunction</code>.</p>"},
            {menuName: "Images", data: "<p>Markdown image syntax looks a lot like the syntax for links; it is essentially the same syntax preceded by an exclamation point (<code>!</code>). For example, if you want to link to an image at <code>http://github.com/unicorn.png</code> with the alternate text <code>My Unicorn</code>, you would write <code>![My Unicorn](http://github.com/unicorn.png)</code>.</p>"}
        ]},
        {menuName: "Miscellaneous", content: [
            {menuName: "Automatic Links", data: '<p>If you want to create a link that displays the actual URL, markdown allows you to quickly wrap the URL in <code>&lt;</code> and <code>&gt;</code> to do so. For example, the link <a href="javascript:void(0);">http://github.com/</a> is easily produced by writing <code>&lt;http://github.com/&gt;</code>.</p>'},
            {menuName: "Escaping", data: "<p>If you want to use a special Markdown character in your document (such as displaying literal asterisks), you can escape the character with the backslash (<code>\\</code>). Markdown will ignore the character directly after a backslash."}
        ]}
    ];
    e.GollumEditor.defineLanguage("markdown", t), e.GollumEditor.defineHelp("markdown", i)
})(jQuery);