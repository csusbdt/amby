import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
import run_volume    from "../volume/page.js";

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	objs.forEach(row => start(row));
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	objs.forEach(row => stop(row));
};

let img = n => new c_img("./tones/images/" + n + ".png");

const borders       = img("borders");
const back          = img("back");
const volume        = img("volume");
const audio_blue    = img("audio");
const audio_yellow  = audio_blue.clone_yellow();
const border        = img("border", 70, 214, 30);
const blue          = img("blue", 70, 214, 30);
const yellow        = blue.clone_yellow();

const audio = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

const bf  = 90;
const bin = bf * Math.pow(PHI, -7);
const dx  = 75;

function c_obj(col, row) {
	this.col    = col;
	this.row    = row;
	this.tone = new c_tone(bf * phi(row + 2, col), bin, 1);
//	this.tone = new c_tone(bf * p(2, row + 2, col), bin, 1);
	this.on   = false;
}

c_obj.prototype.start = function() {
	if (this.on) this.tone.start();
};

c_obj.prototype.stop = function() {
	this.tone.stop();
};

c_obj.prototype.draw = function() {
	if (this.on) yellow.draw(dx * this.col, dx * this.row);
	else blue.draw(dx * this.col, dx * this.row);
	border.draw(dx * this.col, dx * this.row);	
};

c_obj.prototype.click = function() {
	if (blue.click(dx * this.col, dx * this.row)) {
		if (this.on) {
			this.on = false;
			this.tone.stop();
		} else {
			this.on = true;
			this.tone.start();
		}
		return true;
	} else return false;
};

const objs = [];

for (let row = 0; row < 9; ++row) {
	const phi_tones = [];
	objs.push(phi_tones);
	for (let col = 0; col < row + 2; ++col) {
		phi_tones.push(new c_obj(col, row));
	}
}

const draw_tones = _ => {
	for (let row = 0; row < objs.length; ++row) {
		draw(objs[row]);
	}
};

const click_tones = _ => {
	for (let row = 0; row < objs.length; ++row) {
		if (click(objs[row])) {
			return true;
		}
	}
	return false;
};

let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume)) run_volume();
	if (click(audio) || click_tones()) on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw_tones();
    draw(back);
    draw(volume);
	draw(audio);
    draw(borders);
};

const run = _ => {
    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
		start_external_audio = window.start_audio;
	}
	audio.on = window.stop_audio !== null;
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
