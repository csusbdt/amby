function c_toggle(off_color, on_color, border = null, on_true = null, on_false = null) {
    this.off_color = off_color;
    this.on_color  = on_color;
    this.border    = border;
    this.on_true   = on_true;
    this.on_false  = on_false;
    this.on        = false;
}

c_toggle.prototype.draw = function() {
    if (this.on) this.on_color.draw(); else this.off_color.draw();
    if (this.border !== null) this.border.draw();
};

c_toggle.prototype.click = function() {
    if (this.off_color.click()) {
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
