function c_toggle(off_color, on_color, border = null, on_true = null, on_false = null) {
    this.off_color = Array.isArray(off_color) ? off_color : [ off_color ];
    this.on_color  = Array.isArray(on_color ) ? on_color  : [ on_color  ];
    if (border !== null) this.border  = Array.isArray(border) ? border : [ border ];
    else this.border = null;
    this.on_true   = on_true;
    this.on_false  = on_false;
    this.on        = false;
}

c_toggle.prototype.draw = function() {
    if (this.on) draw(this.on_color); 
    else draw(this.off_color);
    if (this.border !== null) draw(this.border);
};

c_toggle.prototype.click = function() {
    if (click(this.off_color)) {
        if (this.on) {
            this.on = false;
            if (this.on_false !== null) this.on_false();
        } else {
            this.on = true;
            if (this.on_true !== null) this.on_true();
        }
        return true;
    }
    return false;
};

export default c_toggle;
