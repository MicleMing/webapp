(function (e) {
    var t = {
        init: function (t) {
            var i = {
                set_width: !1,
                set_height: !1,
                horizontalScroll: !1,
                scrollInertia: 950,
                mouseWheel: !0,
                mouseWheelPixels: "auto",
                autoDraggerLength: !0,
                autoHideScrollbar: !1,
                snapAmount: null,
                snapOffset: 0,
                scrollButtons: {
                    enable: !1,
                    scrollType: "continuous",
                    scrollSpeed: "auto",
                    scrollAmount: 40
                },
                advanced: {
                    updateOnBrowserResize: !0,
                    updateOnContentResize: !1,
                    autoExpandHorizontalScroll: !1,
                    autoScrollOnFocus: !0,
                    normalizeMouseWheelDelta: !1
                },
                contentTouchScroll: !0,
                callbacks: {
                    onScrollStart: function () {},
                    onScroll: function () {},
                    onTotalScroll: function () {},
                    onTotalScrollBack: function () {},
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    whileScrolling: function () {}
                },
                theme: "light"
            }, t = e.extend(!0, i, t);
            return this.each(function () {
                var i = e(this);
                if (t.set_width && i.css("width", t.set_width), t.set_height && i.css("height", t.set_height), e(document).data("mCustomScrollbar-index")) {
                    var n = parseInt(e(document).data("mCustomScrollbar-index"));
                    e(document).data("mCustomScrollbar-index", n + 1)
                } else e(document).data("mCustomScrollbar-index", "1");
                i.wrapInner("<div class='mCustomScrollBox mCS-" + t.theme + "' id='mCSB_" + e(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + e(document).data("mCustomScrollbar-index"));
                var a = i.children(".mCustomScrollBox");
                if (t.horizontalScroll) {
                    a.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
                    var s = a.children(".mCSB_h_wrapper");
                    s.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
                        width: s.children().outerWidth(),
                        position: "relative"
                    }).unwrap()
                } else a.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />");
                var o = a.children(".mCSB_container");
                e.support.touch && o.addClass("mCS_touch"), o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
                var r = a.children(".mCSB_scrollTools"),
                    l = r.children(".mCSB_draggerContainer"),
                    c = l.children(".mCSB_dragger");
                if (t.horizontalScroll ? c.data("minDraggerWidth", c.width()) : c.data("minDraggerHeight", c.height()), t.scrollButtons.enable && (t.horizontalScroll ? r.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>") : r.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")), a.bind("scroll", function () {
                    i.is(".mCS_disabled") || a.scrollTop(0).scrollLeft(0)
                }), i.data({
                    mCS_Init: !0,
                    mCustomScrollbarIndex: e(document).data("mCustomScrollbar-index"),
                    horizontalScroll: t.horizontalScroll,
                    scrollInertia: t.scrollInertia,
                    scrollEasing: "mcsEaseOut",
                    mouseWheel: t.mouseWheel,
                    mouseWheelPixels: t.mouseWheelPixels,
                    autoDraggerLength: t.autoDraggerLength,
                    autoHideScrollbar: t.autoHideScrollbar,
                    snapAmount: t.snapAmount,
                    snapOffset: t.snapOffset,
                    scrollButtons_enable: t.scrollButtons.enable,
                    scrollButtons_scrollType: t.scrollButtons.scrollType,
                    scrollButtons_scrollSpeed: t.scrollButtons.scrollSpeed,
                    scrollButtons_scrollAmount: t.scrollButtons.scrollAmount,
                    autoExpandHorizontalScroll: t.advanced.autoExpandHorizontalScroll,
                    autoScrollOnFocus: t.advanced.autoScrollOnFocus,
                    normalizeMouseWheelDelta: t.advanced.normalizeMouseWheelDelta,
                    contentTouchScroll: t.contentTouchScroll,
                    onScrollStart_Callback: t.callbacks.onScrollStart,
                    onScroll_Callback: t.callbacks.onScroll,
                    onTotalScroll_Callback: t.callbacks.onTotalScroll,
                    onTotalScrollBack_Callback: t.callbacks.onTotalScrollBack,
                    onTotalScroll_Offset: t.callbacks.onTotalScrollOffset,
                    onTotalScrollBack_Offset: t.callbacks.onTotalScrollBackOffset,
                    whileScrolling_Callback: t.callbacks.whileScrolling,
                    bindEvent_scrollbar_drag: !1,
                    bindEvent_content_touch: !1,
                    bindEvent_scrollbar_click: !1,
                    bindEvent_mousewheel: !1,
                    bindEvent_buttonsContinuous_y: !1,
                    bindEvent_buttonsContinuous_x: !1,
                    bindEvent_buttonsPixels_y: !1,
                    bindEvent_buttonsPixels_x: !1,
                    bindEvent_focusin: !1,
                    bindEvent_autoHideScrollbar: !1,
                    mCSB_buttonScrollRight: !1,
                    mCSB_buttonScrollLeft: !1,
                    mCSB_buttonScrollDown: !1,
                    mCSB_buttonScrollUp: !1
                }), t.horizontalScroll) "none" !== i.css("max-width") && (t.advanced.updateOnContentResize || (t.advanced.updateOnContentResize = !0));
                else if (i.data("scrollnoheight")) {
                    var u = e(window).height();
                    a.css("max-height", u - i.data("scrollnoheight"))
                } else {
                    var d = !1,
                        p = parseInt(i.css("max-height"));
                    i.css("max-height").indexOf("%") >= 0 && (d = p, p = i.parent().height() * d / 100), i.css("overflow", "hidden"), a.css("max-height", p)
                } if (i.mCustomScrollbar("update"), t.advanced.updateOnBrowserResize) {
                    var f, m = e(window).width(),
                        h = e(window).height();
                    e(window).bind("resize." + i.data("mCustomScrollbarIndex"), function () {
                        f && clearTimeout(f), f = setTimeout(function () {
                            if (!i.is(".mCS_disabled") && !i.is(".mCS_destroyed")) {
                                var t = e(window).width(),
                                    n = e(window).height();
                                (m !== t || h !== n) && ("none" !== i.css("max-height") && d && a.css("max-height", i.parent().height() * d / 100), i.data("scrollnoheight") && a.css("max-height", n - i.data("scrollnoheight")), i.mCustomScrollbar("update"), m = t, h = n)
                            }
                        }, 150)
                    })
                }
                if (t.advanced.updateOnContentResize) {
                    var _;
                    if (t.horizontalScroll) var g = o.outerWidth(!0);
                    else var g = o.outerHeight(!0);
                    _ = setInterval(function () {
                        if (t.horizontalScroll) {
                            t.advanced.autoExpandHorizontalScroll && o.css({
                                position: "absolute",
                                width: "auto"
                            }).css({
                                width: o.outerWidth()
                            });
                            var e = o.outerWidth(!0)
                        } else var e = o.outerHeight(!0);
                        e != g && (i.mCustomScrollbar("update"), g = e)
                    }, 300)
                }
            })
        },
        update: function () {
            var t = e(this),
                i = t.children(".mCustomScrollBox"),
                n = i.children(".mCSB_container");
            n.removeClass("mCS_no_scrollbar"), t.removeClass("mCS_disabled mCS_destroyed"), i.scrollTop(0).scrollLeft(0);
            var a = i.children(".mCSB_scrollTools"),
                s = a.children(".mCSB_draggerContainer"),
                o = s.children(".mCSB_dragger");
            if (t.data("horizontalScroll")) {
                var r = a.children(".mCSB_buttonLeft"),
                    l = a.children(".mCSB_buttonRight"),
                    c = i.width();
                t.data("autoExpandHorizontalScroll") && n.css({
                    position: "absolute",
                    width: "auto"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: n.outerWidth(),
                    position: "relative"
                }).unwrap();
                var u = n.outerWidth()
            } else var d = a.children(".mCSB_buttonUp"),
                p = a.children(".mCSB_buttonDown"), f = i.height(), m = n.outerHeight();
            if (m > f && !t.data("horizontalScroll")) {
                a.css("display", "block");
                var h = s.height();
                if (t.data("autoDraggerLength")) {
                    var _ = Math.round(f / m * h),
                        g = o.data("minDraggerHeight");
                    if (g >= _) o.css({
                        height: g
                    });
                    else if (_ >= h - 10) {
                        var v = h - 10;
                        o.css({
                            height: v
                        })
                    } else o.css({
                        height: _
                    });
                    o.children(".mCSB_dragger_bar").css({
                        "line-height": o.height() + "px"
                    })
                }
                var b = o.height(),
                    y = (m - f) / (h - b);
                t.data("scrollAmount", y).mCustomScrollbar("scrolling", i, n, s, o, d, p, r, l);
                var w = Math.abs(n.position().top);
                t.mCustomScrollbar("scrollTo", w, {
                    scrollInertia: 0,
                    trigger: "internal"
                })
            } else if (u > c && t.data("horizontalScroll")) {
                a.css("display", "block");
                var k = s.width();
                if (t.data("autoDraggerLength")) {
                    var x = Math.round(c / u * k),
                        j = o.data("minDraggerWidth");
                    if (j >= x) o.css({
                        width: j
                    });
                    else if (x >= k - 10) {
                        var $ = k - 10;
                        o.css({
                            width: $
                        })
                    } else o.css({
                        width: x
                    })
                }
                var C = o.width(),
                    y = (u - c) / (k - C);
                t.data("scrollAmount", y).mCustomScrollbar("scrolling", i, n, s, o, d, p, r, l);
                var w = Math.abs(n.position().left);
                t.mCustomScrollbar("scrollTo", w, {
                    scrollInertia: 0,
                    trigger: "internal"
                })
            } else i.unbind("mousewheel focusin"), t.data("horizontalScroll") ? o.add(n).css("left", 0) : o.add(n).css("top", 0), a.css("display", "none"), n.addClass("mCS_no_scrollbar"), t.data({
                bindEvent_mousewheel: !1,
                bindEvent_focusin: !1
            })
        },
        scrolling: function (t, n, a, s, o, r, l, c) {
            function f(e, t, i, n) {
                u.data("horizontalScroll") ? u.mCustomScrollbar("scrollTo", s.position().left - t + n, {
                    moveDragger: !0,
                    trigger: "internal"
                }) : u.mCustomScrollbar("scrollTo", s.position().top - e + i, {
                    moveDragger: !0,
                    trigger: "internal"
                })
            }

            function w(e) {
                s.data("preventAction") || (s.data("preventAction", !0), u.mCustomScrollbar("scrollTo", e, {
                    trigger: "internal"
                }))
            }

            function C() {
                var e = u.data("scrollButtons_scrollSpeed");
                return "auto" === u.data("scrollButtons_scrollSpeed") && (e = Math.round((u.data("scrollInertia") + 100) / 40)), e
            }
            var u = e(this);
            if (!u.data("bindEvent_scrollbar_drag")) {
                var d, p;
                e.support.msPointer ? (s.bind("MSPointerDown", function (t) {
                    t.preventDefault(), u.data({
                        on_drag: !0
                    }), s.addClass("mCSB_dragger_onDrag");
                    var i = e(this),
                        n = i.offset(),
                        a = t.originalEvent.pageX - n.left,
                        o = t.originalEvent.pageY - n.top;
                    i.width() > a && a > 0 && i.height() > o && o > 0 && (d = o, p = a)
                }), e(document).bind("MSPointerMove." + u.data("mCustomScrollbarIndex"), function (e) {
                    if (e.preventDefault(), u.data("on_drag")) {
                        var t = s,
                            i = t.offset(),
                            n = e.originalEvent.pageX - i.left,
                            a = e.originalEvent.pageY - i.top;
                        f(d, p, a, n)
                    }
                }).bind("MSPointerUp." + u.data("mCustomScrollbarIndex"), function () {
                    u.data({
                        on_drag: !1
                    }), s.removeClass("mCSB_dragger_onDrag")
                })) : (s.bind("mousedown touchstart", function (t) {
                    t.preventDefault(), t.stopImmediatePropagation();
                    var a, o, i = e(this),
                        n = i.offset();
                    if ("touchstart" === t.type) {
                        var r = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
                        a = r.pageX - n.left, o = r.pageY - n.top
                    } else u.data({
                        on_drag: !0
                    }), s.addClass("mCSB_dragger_onDrag"), a = t.pageX - n.left, o = t.pageY - n.top;
                    i.width() > a && a > 0 && i.height() > o && o > 0 && (d = o, p = a)
                }).bind("touchmove", function (t) {
                    t.preventDefault(), t.stopImmediatePropagation();
                    var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                        n = e(this),
                        a = n.offset(),
                        s = i.pageX - a.left,
                        o = i.pageY - a.top;
                    f(d, p, o, s)
                }), e(document).bind("mousemove." + u.data("mCustomScrollbarIndex"), function (e) {
                    if (u.data("on_drag")) {
                        var t = s,
                            i = t.offset(),
                            n = e.pageX - i.left,
                            a = e.pageY - i.top;
                        f(d, p, a, n)
                    }
                }).bind("mouseup." + u.data("mCustomScrollbarIndex"), function () {
                    u.data({
                        on_drag: !1
                    }), s.removeClass("mCSB_dragger_onDrag")
                })), u.data({
                    bindEvent_scrollbar_drag: !0
                })
            }
            if (e.support.touch && u.data("contentTouchScroll") && !u.data("bindEvent_content_touch")) {
                var m, h, _, g, v, b, y;
                n.bind("touchstart", function (t) {
                    t.stopImmediatePropagation(), m = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], h = e(this), _ = h.offset(), v = m.pageX - _.left, g = m.pageY - _.top, b = g, y = v
                }), n.bind("touchmove", function (t) {
                    t.preventDefault(), t.stopImmediatePropagation(), m = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], h = e(this).parent(), _ = h.offset(), v = m.pageX - _.left, g = m.pageY - _.top, u.data("horizontalScroll") ? u.mCustomScrollbar("scrollTo", y - v, {
                        trigger: "internal"
                    }) : u.mCustomScrollbar("scrollTo", b - g, {
                        trigger: "internal"
                    })
                })
            }
            if (u.data("bindEvent_scrollbar_click") || (a.bind("click", function (t) {
                var i = (t.pageY - a.offset().top) * u.data("scrollAmount"),
                    n = e(t.target);
                u.data("horizontalScroll") && (i = (t.pageX - a.offset().left) * u.data("scrollAmount")), (n.hasClass("mCSB_draggerContainer") || n.hasClass("mCSB_draggerRail")) && u.mCustomScrollbar("scrollTo", i, {
                    trigger: "internal",
                    scrollEasing: "draggerRailEase"
                })
            }), u.data({
                bindEvent_scrollbar_click: !0
            })), u.data("mouseWheel") && (u.data("bindEvent_mousewheel") || (t.bind("mousewheel", function (e, t) {
                if (!("TEXTAREA" === e.target.tagName && e.target.scrollHeight > e.target.clientHeight)) {
                    e.preventDefault(), e.stopImmediatePropagation();
                    var i, o = u.data("mouseWheelPixels"),
                        r = Math.abs(n.position().top),
                        l = s.position().top,
                        c = a.height() - s.height();
                    u.data("normalizeMouseWheelDelta") && (t = 0 > t ? -1 : 1), "auto" === o && (o = 100 + Math.round(u.data("scrollAmount") / 2)), u.data("horizontalScroll") && (l = s.position().left, c = a.width() - s.width(), r = Math.abs(n.position().left)), (t > 0 && 0 !== l || 0 > t && l !== c) && (e.preventDefault(), e.stopImmediatePropagation()), i = r - t * o, u.mCustomScrollbar("scrollTo", i, {
                        trigger: "internal"
                    })
                }
            }), u.data({
                bindEvent_mousewheel: !0
            }))), u.data("scrollButtons_enable"))
                if ("pixels" === u.data("scrollButtons_scrollType")) u.data("horizontalScroll") ? (c.add(l).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", k, x), u.data({
                    bindEvent_buttonsContinuous_x: !1
                }), u.data("bindEvent_buttonsPixels_x") || (c.bind("click", function (e) {
                    e.preventDefault(), w(Math.abs(n.position().left) + u.data("scrollButtons_scrollAmount"))
                }), l.bind("click", function (e) {
                    e.preventDefault(), w(Math.abs(n.position().left) - u.data("scrollButtons_scrollAmount"))
                }), u.data({
                    bindEvent_buttonsPixels_x: !0
                }))) : (r.add(o).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", k, x), u.data({
                    bindEvent_buttonsContinuous_y: !1
                }), u.data("bindEvent_buttonsPixels_y") || (r.bind("click", function (e) {
                    e.preventDefault(), w(Math.abs(n.position().top) + u.data("scrollButtons_scrollAmount"))
                }), o.bind("click", function (e) {
                    e.preventDefault(), w(Math.abs(n.position().top) - u.data("scrollButtons_scrollAmount"))
                }), u.data({
                    bindEvent_buttonsPixels_y: !0
                })));
                else if (u.data("horizontalScroll")) {
                    if (c.add(l).unbind("click"), u.data({
                        bindEvent_buttonsPixels_x: !1
                    }), !u.data("bindEvent_buttonsContinuous_x")) {
                        c.bind("mousedown touchstart MSPointerDown", function (e) {
                            e.preventDefault();
                            var t = C();
                            u.data({
                                mCSB_buttonScrollRight: setInterval(function () {
                                    u.mCustomScrollbar("scrollTo", Math.abs(n.position().left) + t, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var k = function (e) {
                            e.preventDefault(), clearInterval(u.data("mCSB_buttonScrollRight"))
                        };
                        c.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", k), l.bind("mousedown touchstart MSPointerDown", function (e) {
                            e.preventDefault();
                            var t = C();
                            u.data({
                                mCSB_buttonScrollLeft: setInterval(function () {
                                    u.mCustomScrollbar("scrollTo", Math.abs(n.position().left) - t, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var x = function (e) {
                            e.preventDefault(), clearInterval(u.data("mCSB_buttonScrollLeft"))
                        };
                        l.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", x), u.data({
                            bindEvent_buttonsContinuous_x: !0
                        })
                    }
                } else if (r.add(o).unbind("click"), u.data({
                    bindEvent_buttonsPixels_y: !1
                }), !u.data("bindEvent_buttonsContinuous_y")) {
                    r.bind("mousedown touchstart MSPointerDown", function (e) {
                        e.preventDefault();
                        var t = C();
                        u.data({
                            mCSB_buttonScrollDown: setInterval(function () {
                                u.mCustomScrollbar("scrollTo", Math.abs(n.position().top) + t, {
                                    trigger: "internal",
                                    scrollEasing: "easeOutCirc"
                                })
                            }, 17)
                        })
                    });
                    var j = function (e) {
                        e.preventDefault(), clearInterval(u.data("mCSB_buttonScrollDown"))
                    };
                    r.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", j), o.bind("mousedown touchstart MSPointerDown", function (e) {
                        e.preventDefault();
                        var t = C();
                        u.data({
                            mCSB_buttonScrollUp: setInterval(function () {
                                u.mCustomScrollbar("scrollTo", Math.abs(n.position().top) - t, {
                                    trigger: "internal",
                                    scrollEasing: "easeOutCirc"
                                })
                            }, 17)
                        })
                    });
                    var $ = function (e) {
                        e.preventDefault(), clearInterval(u.data("mCSB_buttonScrollUp"))
                    };
                    o.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", $), u.data({
                        bindEvent_buttonsContinuous_y: !0
                    })
                }
            u.data("autoScrollOnFocus") && (u.data("bindEvent_focusin") || (t.bind("focusin", function () {
                t.scrollTop(0).scrollLeft(0);
                var i = e(document.activeElement);
                if (i.is("input,textarea,select,button,a[tabindex],area,object")) {
                    var a = n.position().top,
                        s = i.position().top,
                        o = t.height() - i.outerHeight();
                    u.data("horizontalScroll") && (a = n.position().left, s = i.position().left, o = t.width() - i.outerWidth()), (0 > a + s || a + s > o) && u.mCustomScrollbar("scrollTo", s, {
                        trigger: "internal"
                    })
                }
            }), u.data({
                bindEvent_focusin: !0
            }))), u.data("autoHideScrollbar") && (u.data("bindEvent_autoHideScrollbar") || (t.bind("mouseenter", function () {
                t.addClass("mCS-mouse-over"), i.showScrollbar.call(t.children(".mCSB_scrollTools"))
            }).bind("mouseleave touchend", function (e) {
                t.removeClass("mCS-mouse-over"), "mouseleave" === e.type && i.hideScrollbar.call(t.children(".mCSB_scrollTools"))
            }), u.data({
                bindEvent_autoHideScrollbar: !0
            })))
        },
        scrollTo: function (t, n) {
            function b(e) {
                switch (this.mcs = {
                    top: l.position().top,
                    left: l.position().left,
                    draggerTop: d.position().top,
                    draggerLeft: d.position().left,
                    topPct: Math.round(100 * Math.abs(l.position().top) / Math.abs(l.outerHeight() - r.height())),
                    leftPct: Math.round(100 * Math.abs(l.position().left) / Math.abs(l.outerWidth() - r.width()))
                }, e) {
                    case "onScrollStart":
                        a.data("mCS_tweenRunning", !0).data("onScrollStart_Callback").call(a, this.mcs);
                        break;
                    case "whileScrolling":
                        a.data("whileScrolling_Callback").call(a, this.mcs);
                        break;
                    case "onScroll":
                        a.data("onScroll_Callback").call(a, this.mcs);
                        break;
                    case "onTotalScrollBack":
                        a.data("onTotalScrollBack_Callback").call(a, this.mcs);
                        break;
                    case "onTotalScroll":
                        a.data("onTotalScroll_Callback").call(a, this.mcs)
                }
            }
            var o, f, m, h, _, a = e(this),
                s = {
                    moveDragger: !1,
                    trigger: "external",
                    callbacks: !0,
                    scrollInertia: a.data("scrollInertia"),
                    scrollEasing: a.data("scrollEasing")
                }, n = e.extend(s, n),
                r = a.children(".mCustomScrollBox"),
                l = r.children(".mCSB_container"),
                c = r.children(".mCSB_scrollTools"),
                u = c.children(".mCSB_draggerContainer"),
                d = u.children(".mCSB_dragger"),
                p = draggerSpeed = n.scrollInertia;
            if (!l.hasClass("mCS_no_scrollbar") && (a.data({
                mCS_trigger: n.trigger
            }), a.data("mCS_Init") && (n.callbacks = !1), t || 0 === t)) {
                if ("number" == typeof t) n.moveDragger ? (o = t, t = a.data("horizontalScroll") ? d.position().left * a.data("scrollAmount") : d.position().top * a.data("scrollAmount"), draggerSpeed = 0) : o = t / a.data("scrollAmount");
                else if ("string" == typeof t) {
                    var g;
                    g = "top" === t ? 0 : "bottom" !== t || a.data("horizontalScroll") ? "left" === t ? 0 : "right" === t && a.data("horizontalScroll") ? l.outerWidth() - r.width() : "first" === t ? a.find(".mCSB_container").find(":first") : "last" === t ? a.find(".mCSB_container").find(":last") : a.find(t) : l.outerHeight() - r.height(), 1 === g.length ? (t = a.data("horizontalScroll") ? g.position().left : g.position().top, o = t / a.data("scrollAmount")) : o = t = g
                }
                if (a.data("horizontalScroll")) {
                    a.data("onTotalScrollBack_Offset") && (m = -a.data("onTotalScrollBack_Offset")), a.data("onTotalScroll_Offset") && (_ = r.width() - l.outerWidth() + a.data("onTotalScroll_Offset")), 0 > o ? (o = t = 0, clearInterval(a.data("mCSB_buttonScrollLeft")), m || (f = !0)) : o >= u.width() - d.width() ? (o = u.width() - d.width(), t = r.width() - l.outerWidth(), clearInterval(a.data("mCSB_buttonScrollRight")), _ || (h = !0)) : t = -t;
                    var v = a.data("snapAmount");
                    v && (t = Math.round(t / v) * v - a.data("snapOffset")), i.mTweenAxis.call(this, d[0], "left", Math.round(o), draggerSpeed, n.scrollEasing), i.mTweenAxis.call(this, l[0], "left", Math.round(t), p, n.scrollEasing, {
                        onStart: function () {
                            n.callbacks && !a.data("mCS_tweenRunning") && b("onScrollStart"), a.data("autoHideScrollbar") && i.showScrollbar.call(c)
                        },
                        onUpdate: function () {
                            n.callbacks && b("whileScrolling")
                        },
                        onComplete: function () {
                            n.callbacks && (b("onScroll"), (f || m && l.position().left >= m) && b("onTotalScrollBack"), (h || _ && _ >= l.position().left) && b("onTotalScroll")), d.data("preventAction", !1), a.data("mCS_tweenRunning", !1), a.data("autoHideScrollbar") && (r.hasClass("mCS-mouse-over") || i.hideScrollbar.call(c))
                        }
                    })
                } else {
                    a.data("onTotalScrollBack_Offset") && (m = -a.data("onTotalScrollBack_Offset")), a.data("onTotalScroll_Offset") && (_ = r.height() - l.outerHeight() + a.data("onTotalScroll_Offset")), 0 > o ? (o = t = 0, clearInterval(a.data("mCSB_buttonScrollUp")), m || (f = !0)) : o >= u.height() - d.height() ? (o = u.height() - d.height(), t = r.height() - l.outerHeight(), clearInterval(a.data("mCSB_buttonScrollDown")), _ || (h = !0)) : t = -t;
                    var v = a.data("snapAmount");
                    v && (t = Math.round(t / v) * v - a.data("snapOffset")), d.css("top", Math.round(o)), l.css("top", Math.round(t))
                }
                a.data("mCS_Init") && a.data({
                    mCS_Init: !1
                })
            }
        },
        stop: function () {
            var t = e(this),
                n = t.children().children(".mCSB_container"),
                a = t.children().children().children().children(".mCSB_dragger");
            i.mTweenAxisStop.call(this, n[0]), i.mTweenAxisStop.call(this, a[0])
        },
        disable: function (t) {
            var i = e(this),
                n = i.children(".mCustomScrollBox"),
                a = n.children(".mCSB_container"),
                s = n.children(".mCSB_scrollTools"),
                o = s.children().children(".mCSB_dragger");
            n.unbind("mousewheel focusin mouseenter mouseleave touchend"), a.unbind("touchstart touchmove"), t && (i.data("horizontalScroll") ? o.add(a).css("left", 0) : o.add(a).css("top", 0)), s.css("display", "none"), a.addClass("mCS_no_scrollbar"), i.data({
                bindEvent_mousewheel: !1,
                bindEvent_focusin: !1,
                bindEvent_content_touch: !1,
                bindEvent_autoHideScrollbar: !1
            }).addClass("mCS_disabled")
        },
        destroy: function () {
            var t = e(this);
            t.removeClass("mCustomScrollbar _mCS_" + t.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove(), e(document).unbind("mousemove." + t.data("mCustomScrollbarIndex") + " mouseup." + t.data("mCustomScrollbarIndex") + " MSPointerMove." + t.data("mCustomScrollbarIndex") + " MSPointerUp." + t.data("mCustomScrollbarIndex")), e(window).unbind("resize." + t.data("mCustomScrollbarIndex"))
        }
    }, i = {
        showScrollbar: function () {
            this.stop().animate({
                opacity: 1
            }, "fast")
        },
        hideScrollbar: function () {
            this.stop().animate({
                opacity: 0
            }, "fast")
        },
        mTweenAxis: function (e, t, i, n, a, s) {
            function h() {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            }

            function _() {
                d || o.call(), d = h() - c, g(), d >= e._time && (e._time = d > e._time ? d + u - (d - e._time) : d + u - 1, d + 1 > e._time && (e._time = d + 1)), n > e._time ? e._id = _request(_) : l.call()
            }

            function g() {
                n > 0 ? (e.currVal = y(e._time, p, m, n, a), f[t] = Math.round(e.currVal) + "px") : f[t] = i + "px", r.call()
            }

            function v() {
                u = 1e3 / 60, e._time = d + u, _request = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
                    return g(), setTimeout(e, .01)
                }, e._id = _request(_)
            }

            function b() {
                null != e._id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._id) : clearTimeout(e._id), e._id = null)
            }

            function y(e, t, i, n, a) {
                switch (a) {
                    case "linear":
                        return i * e / n + t;
                    case "easeOutQuad":
                        return e /= n, -i * e * (e - 2) + t;
                    case "easeInOutQuad":
                        return e /= n / 2, 1 > e ? i / 2 * e * e + t : (e--, -i / 2 * (e * (e - 2) - 1) + t);
                    case "easeOutCubic":
                        return e /= n, e--, i * (e * e * e + 1) + t;
                    case "easeOutQuart":
                        return e /= n, e--, -i * (e * e * e * e - 1) + t;
                    case "easeOutQuint":
                        return e /= n, e--, i * (e * e * e * e * e + 1) + t;
                    case "easeOutCirc":
                        return e /= n, e--, i * Math.sqrt(1 - e * e) + t;
                    case "easeOutSine":
                        return i * Math.sin(e / n * (Math.PI / 2)) + t;
                    case "easeOutExpo":
                        return i * (-Math.pow(2, -10 * e / n) + 1) + t;
                    case "mcsEaseOut":
                        var s = (e /= n) * e,
                            o = s * e;
                        return t + i * (.499999999999997 * o * s + -2.5 * s * s + 5.5 * o + -6.5 * s + 4 * e);
                    case "draggerRailEase":
                        return e /= n / 2, 1 > e ? i / 2 * e * e * e + t : (e -= 2, i / 2 * (e * e * e + 2) + t)
                }
            }
            var u, s = s || {}, o = s.onStart || function () {}, r = s.onUpdate || function () {}, l = s.onComplete || function () {}, c = h(),
                d = 0,
                p = e.offsetTop,
                f = e.style;
            "left" === t && (p = e.offsetLeft);
            var m = i - p;
            b(), v()
        },
        mTweenAxisStop: function (e) {
            null != e._id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._id) : clearTimeout(e._id), e._id = null)
        },
        rafPolyfill: function () {
            for (var e = ["ms", "moz", "webkit", "o"], t = e.length; --t > -1 && !window.requestAnimationFrame;) window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"]
        }
    };
    i.rafPolyfill.call(), e.support.touch = !! ("ontouchstart" in window), e.support.msPointer = window.navigator.msPointerEnabled;
    var n = "https:" == document.location.protocol ? "https:" : "http:";
    e.event.special.mousewheel || document.write('<script src="' + n + '//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"></script>');
    e.fn.mCustomScrollbar = function (i) {
        return t[i] ? t[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? (e.error("Method " + i + " does not exist"), void 0) : t.init.apply(this, arguments)
    }
})(jQuery);