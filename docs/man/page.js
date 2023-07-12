import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

// night group taken from ring center

const night_bf    = 90;
const night_bin   = night_bf * Math.pow(PHI, -7);
const night_dur   = 2000;

const night_1 = new c_seq(night_dur * 1, [ 
	1 / 1 * night_bf * (PHI + 0), 
	1 / 1 * night_bf * (PHI + 1)
], night_bin);

const night_2 = new c_seq(night_dur * 2, [
	2 / 3 * night_bf * (PHI + 0), 
	4 / 3 * night_bf * (PHI - 1)
], night_bin);

const night_3 = new c_seq(night_dur * 4, [
	6 / 3 * night_bf * (PHI - 0), 
	7 / 3 * night_bf * (PHI - 0)
], night_bin);

const night_group = new c_start_group(night_dur, [
	night_1, night_2, night_3
]);


// .... other groups


const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	if (sun.state === DAY) start(night_group);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	stop(night_group);
};

let img = n => new c_img("./man/images/" + n + ".png");

const borders       = img("borders");
const back          = img("back");
const volume        = img("volume");
const audio_blue    = img("audio_blue");
const audio_yellow  = audio_blue.clone_yellow();

const green         = img("green");

const audio   = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

const DAY   = 0;
const NIGHT = 1;

const sun = {
	state : DAY,
	yellow: img("sun_yellow"),
	white : img("sun_yellow").clone_white(),
	border: img("sun_border"),
	draw: function() {
		if (this.state === DAY) draw(this.yellow);
		else draw(this.white);
		draw(this.border);
	},
	click: function() {
		if (click(this.yellow)) {
			if (this.state === DAY) {
				this.state = NIGHT;
				night_group.remove_all();
			} else {
				this.state = DAY;
				night_group.add(night_1, night_2, night_3);
			}
			return true;
		}
		return false;
	}
};

const OFF     = 0;
const TAKING  = 1;
const PUTTING = 2;

const beam = {
	state    : OFF,
	white    : img("beam_white"),
	draw: function() {
		if (this.state !== OFF) {
			if (ship.state === OVER_VALLEY) { 
				draw(this.white);
			} else {
				draw(this.white, -400, 200);
			}
		} 
	}
};

const OVER_VALLEY = 0;
const OVER_HOUSE  = 1;

const ship = {
	state         : OVER_VALLEY,
	blue          : img("ship_blue"),
	yellow        : img("ship_blue").clone_yellow(),
	border        : img("ship_border"),
	draw: function() {
		if (sun.state === DAY) return false;
		if (this.state === OVER_VALLEY) { 
			if (man.state === INSIDE_SHIP) draw(this.yellow);
			else draw(this.blue);
		} 
		else if (this.state === OVER_HOUSE) { 
			if (man.state === INSIDE_SHIP) draw(this.yellow, -400, 200);
			else draw(this.blue, -400, 200);
		}
	},
	click: function() {
		if (sun.state === DAY) return false;
		if (this.state === OVER_VALLEY) {
			if (click(this.blue)) {
				if (beam.state === OFF) {
					if (man.state === IN_VALLEY) {
						beam.state = TAKING;
					} else if (man.state === INSIDE_SHIP) {
						beam.state = PUTTING;
					} else {
						this.state = OVER_HOUSE;
					}
				} else if (beam.state === TAKING) {
					beam.state = OFF;
					man.state  = INSIDE_SHIP;
				} else {
					beam.state = OFF;
					man.state  = IN_VALLEY;
				}
				return true;
			} else return false;
		} else {
			if (click(this.blue, -400, 200)) {
				if (beam.state === OFF) {
					if (man.state === OUTSIDE_HOUSE) {
						beam.state = TAKING;
					} else if (man.state === INSIDE_SHIP) {
						beam.state = PUTTING;
					} else {
						this.state = OVER_VALLEY;
					}
				} else if (beam.state === TAKING) {
					beam.state = OFF;
					man.state  = INSIDE_SHIP;
				} else {
					beam.state = OFF;
					man.state  = OUTSIDE_HOUSE;
				}
				return true;
			} else return false;
		}
	}
};

const house = {
	blue         : img("house_blue"),
	border       : img("house_border"),
	door_border  : img("door_border"),
	door_red     : img("door_red"),
	window_border: img("window_border"),
	window_yellow: img("window_yellow"),
	window_white : img("window_yellow").clone_white(),
	draw: function() {
		draw(this.blue);
		if (man.state === INSIDE_HOUSE) draw(this.window_yellow);
		else draw(this.window_white);
		draw([ this.door_red, this.border, this.window_border, this.door_border ]);
	},
	click: function() {
		if (click(this.blue)) {
			if (man.state === INSIDE_HOUSE) {
				man.state = OUTSIDE_HOUSE;
			} else if (man.state === OUTSIDE_HOUSE) {
				man.state = INSIDE_HOUSE;
			} else if (man.state === IN_VALLEY) {
				man.state = OUTSIDE_HOUSE;
			} else if (man.state === INSIDE_SHIP) {
				if (sun.state === NIGHT) {
					if (ship.state === OVER_VALLEY) {
						ship.state = OVER_HOUSE;
					} else {
						ship.state = OVER_VALLEY;
					}
				}
			}
			return true;
		} else return false;
	}
}

const IN_VALLEY     = 0;
const INSIDE_HOUSE  = 1;
const OUTSIDE_HOUSE = 2;
const INSIDE_SHIP   = 3;

const man = {
	state         : IN_VALLEY,
	yellow        : img("man_yellow"),
	border        : img("man_border"),
	draw: function() {
		if (this.state === IN_VALLEY) { 
			draw(this.yellow); 
			draw(this.border); 
		} else if (this.state === OUTSIDE_HOUSE) { 
			draw(this.yellow, -400, 200); 
			draw(this.border, -400, 200); 
		}
	},
	click: function() {
		if (this.state === IN_VALLEY) { 
			if (click(this.yellow)) {
				this.state = OUTSIDE_HOUSE;
				return true;
			} else return false;
		}
		else if (this.state === OUTSIDE_HOUSE) {
			if (click(this.yellow, -400, 200)) {
				this.state = INSIDE_HOUSE;
				return true;
			} else return false;
		} else return false;
	}
};

let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume)) run_volume();
	click([ audio, sun, man, ship, house ]);
	on_resize();
};

const draw_page = _ => {
	draw(sun.state === DAY ? bg_white : bg_black);
	draw(green);
    draw(back);
    draw(volume);
	draw(audio);
	draw([ house, sun, man, ship, beam ]);
    draw(borders);
};

const run = _ => {
    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
		start_external_audio = window.start_audio;
	}
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
