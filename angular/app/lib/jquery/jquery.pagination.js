/**
 * This jQuery plugin displays pagination links inside the selected elements.
 * 
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 2.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
 
 (function (e) {
    e.PaginationCalculator = function (e, t) {
        this.maxentries = e, this.opts = t
    }, e.extend(e.PaginationCalculator.prototype, {
        numPages: function () {
            return Math.ceil(this.maxentries / this.opts.items_per_page)
        },
        getInterval: function (e) {
            var t = Math.floor(this.opts.num_display_entries / 2),
                i = this.numPages(),
                n = i - this.opts.num_display_entries,
                a = e > t ? Math.max(Math.min(e - t, n), 0) : 0,
                s = e > t ? Math.min(e + t + this.opts.num_display_entries % 2, i) : Math.min(this.opts.num_display_entries, i);
            return {
                start: a,
                end: s
            }
        }
    }), e.PaginationRenderers = {}, e.PaginationRenderers.defaultRenderer = function (t, i) {
        this.maxentries = t, this.opts = i, this.pc = new e.PaginationCalculator(t, i)
    }, e.extend(e.PaginationRenderers.defaultRenderer.prototype, {
        createLink: function (t, i, n) {
            var a, s = this.pc.numPages();
            return t = 0 > t ? 0 : s > t ? t : s - 1, n = e.extend({
                text: t + 1,
                classes: ""
            }, n || {}), a = t == i ? isNaN(n.text) ? e("<li class='disabled'><a>" + n.text + "</a></li>") : e("<li class='active'><a>" + n.text + "</a></li>") : e("<li><a href='" + this.opts.link_to.replace(/__id__/, t) + "'>" + n.text + "</a></li>"), n.classes && a.addClass(n.classes), a.data("page_id", t), a
        },
        appendRange: function (e, t, i, n, a) {
            var s;
            for (s = i; n > s; s++) this.createLink(s, t, a).appendTo(e)
        },
        getLinks: function (t, i) {
            t = parseInt(t);
            var n, a, s = this.pc.getInterval(t),
                o = this.pc.numPages(),
                r = e("<ul class='pagination'></ul>");
            return this.opts.items_per_page >= this.maxentries ? r : (this.opts.prev_text && (t > 0 || this.opts.prev_show_always) && r.append(this.createLink(t - 1, t, {
                text: this.opts.prev_text,
                classes: "prev"
            })), s.start > 0 && this.opts.num_edge_entries > 0 && (a = Math.min(this.opts.num_edge_entries, s.start), this.appendRange(r, t, 0, a, {
                classes: "sp"
            }), s.start > this.opts.num_edge_entries && this.opts.ellipse_text && e("<li><a>" + this.opts.ellipse_text + "</a></li>").appendTo(r)), this.appendRange(r, t, s.start, s.end), o > s.end && this.opts.num_edge_entries > 0 && (o - this.opts.num_edge_entries > s.end && this.opts.ellipse_text && e("<li><a>" + this.opts.ellipse_text + "</a></li>").appendTo(r), n = Math.max(o - this.opts.num_edge_entries, s.end), this.appendRange(r, t, n, o, {
                classes: "ep"
            })), this.opts.next_text && (o - 1 > t || this.opts.next_show_always) && r.append(this.createLink(t + 1, t, {
                text: this.opts.next_text,
                classes: "next"
            })), e("li:not(.disabled, .active) a", r).click(i), r)
        }
    }), e.fn.pagination = function (t, i) {
        function r(t) {
            var n = e(t.target).parent().data("page_id"),
                a = l(n);
            return a || t.stopPropagation(), a
        }

        function l(e) {
            n.data("current_page", e), s = a.getLinks(e, r), n.empty(), s.appendTo(n);
            var t = i.callback(e, n);
            return t
        }
        i = e.extend({
            items_per_page: 10,
            num_display_entries: 11,
            current_page: 0,
            num_edge_entries: 0,
            link_to: "javascript:;",
            prev_text: "Prev",
            next_text: "Next",
            ellipse_text: "...",
            prev_show_always: !0,
            next_show_always: !0,
            renderer: "defaultRenderer",
            load_first_page: !1,
            callback: function () {
                return !1
            }
        }, i || {});
        var a, s, o, n = this;
        if (o = i.current_page, n.data("current_page", o), t = !t || 0 > t ? 1 : t, i.items_per_page = !i.items_per_page || 0 > i.items_per_page ? 1 : i.items_per_page, !e.PaginationRenderers[i.renderer]) throw new ReferenceError("Pagination renderer '" + i.renderer + "' was not found in jQuery.PaginationRenderers object.");
        a = new e.PaginationRenderers[i.renderer](t, i);
        var c = new e.PaginationCalculator(t, i),
            u = c.numPages();
        n.bind("setPage", {
            numPages: u
        }, function (e, t) {
            return t >= 0 && e.data.numPages > t ? (l(t), !1) : void 0
        }), n.bind("prevPage", function () {
            var i = e(this).data("current_page");
            return i > 0 && l(i - 1), !1
        }), n.bind("nextPage", {
            numPages: u
        }, function (t) {
            var i = e(this).data("current_page");
            return t.data.numPages - 1 > i && l(i + 1), !1
        }), n.bind("currentPage", function () {
            var i = e(this).data("current_page");
            return l(i), !1
        }), s = a.getLinks(o, r), n.empty(), s.appendTo(n), i.load_first_page && i.callback(o, n)
    }
})(jQuery);

