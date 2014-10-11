(function ($) {
    var t = function (i, n) {
        this.$element = $(i),
            this.$note = $('<div class="alert"></div>'),
            this.options = $.extend(!0, {}, $.fn.notify.defaults, n),
            this._link = null,
            this.options.transition ?
                    "fade" === this.options.transition ?
                        this.$note.addClass("in").addClass(this.options.transition) :
                        this.$note.addClass(this.options.transition) :
                this.$note.addClass("fade").addClass("in"),
            this.options.type ?
                this.$note.addClass("alert-" + this.options.type) :
                this.$note.addClass("alert-success"),
            this.options.message &&
            ("string" == typeof this.options.message ?
                this.$note.html(this.options.message) :
                "object" == typeof this.options.message && (this.options.message.html ?
                    this.$note.html(this.options.message.html) :
                    this.options.message.text &&
                    this.$note.text(this.options.message.text))),
            this.options.closable &&
            (this._link = $('<a class="close pull-right">&times;</a>'),
                $(this._link).on("click", $.proxy(t.onClose, this)), this.$note.prepend(this._link));
        return this;
    };
    t.onClose = function () {
        this.options.onClose(), $(this.$note).remove(), this.options.onClosed()
    }, t.prototype.show = function () {
        this.options.fadeOut.enabled && this.$note.delay(this.options.fadeOut.delay || 3e3).fadeOut("slow", $.proxy(t.onClose, this)), this.$element.append(this.$note), this.$note.alert()
    }, t.prototype.hide = function () {
        this.options.fadeOut.enabled ? this.$note.delay(this.options.fadeOut.delay || 3e3).fadeOut("slow", $.proxy(t.onClose, this)) : t.onClose.call(this)
    }, $.fn.notify = function (e) {
        return new t(this, e)
    }, $.fn.notify.defaults = {
        type: "success",
        closable: !0,
        transition: "fade",
        fadeOut: {
            enabled: !0,
            delay: 3e3
        },
        message: null,
        onClose: function () {
        },
        onClosed: function () {
        }
    }
})(window.jQuery);