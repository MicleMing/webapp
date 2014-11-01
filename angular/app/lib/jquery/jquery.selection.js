$.fn.extend({
    insertAtCursor : function(myValue) {
        var $t = $(this)[0];
        if (document.selection) {
            this.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
        } else if ($t.selectionStart || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var scrollTop = $t.scrollTop;
            $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
        } else {
            this.value += myValue;
            this.focus();
        }
    }
});

$.fn.selection = function(){
    var s,e,range,stored_range;
    if(this[0].selectionStart == undefined){
        var selection=document.selection;
        if (this[0].tagName.toLowerCase() != "textarea") {
            var val = this.val();
            range = selection.createRange().duplicate();
            range.moveEnd("character", val.length);
            s = (range.text == "" ? val.length:val.lastIndexOf(range.text));
            range = selection.createRange().duplicate();
            range.moveStart("character", -val.length);
            e = range.text.length;
        }else {
            range = selection.createRange(),
                stored_range = range.duplicate();
            stored_range.moveToElementText(this[0]);
            stored_range.setEndPoint('EndToEnd', range);
            s = stored_range.text.length - range.text.length;
            e = s + range.text.length;
        }
    }else{
        s=this[0].selectionStart,
            e=this[0].selectionEnd;
    }
    var te=this[0].value.substring(s,e);
    return {start:s,end:e,text:te};
};