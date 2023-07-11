import c_tone from "./tone.js";

function c_seq(dur, fs, b = 0, v = 1) {
	this.dur  = dur;
	this.fs   = fs;
    this.b    = b;
    this.v    = v;
	this.i    = null;
	this.id   = null;
	this.tone = new c_tone(0, b, v);
}

c_seq.prototype.set_b = function(b) {
    this.b = b;
    this.tone.set_b(b);
};

c_seq.prototype.next = function() {
	if (++this.i === this.fs.length) this.i = 0;
	this.tone.set_f(this.fs[this.i]);
	this.id = setTimeout(c_seq.prototype.next.bind(this), this.dur);
};

c_seq.prototype.start = function() {
    this.i = this.fs.length - 1;
	this.tone.set_f(this.fs[0]);
    this.tone.start();
    this.next();
};

c_seq.prototype.stop = function() {
	if (this.id !== null) {
		clearTimeout(this.id);
		this.id = null;
		this.tone.stop();
	}
};

export default c_seq;
