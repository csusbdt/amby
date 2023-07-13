import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

// night group taken from ring center

const night_bf    = 90;
const night_bin   = night_bf * Math.pow(PHI, -7);
const night_dur   = 1000;

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

const night_4 = new c_seq(night_dur * 16, [
	1 / 3 * night_bf * (PHI + 0), 
	5 / 3 * night_bf * (PHI + 0),
	7 / 3 * night_bf * (PHI + 0),
	4 / 3 * night_bf * (PHI + 0)
], night_bin, .8);


const p = (b, n, i) => Math.pow(Math.pow(b, 1 / n), i);

const night_5 = new c_seq(night_dur * 1 *5, [ 
	p(PHI, 6, 0) * night_bf,
	p(PHI, 6, 1) * night_bf,
	p(PHI, 6, 2) * night_bf,
	p(PHI, 6, 3) * night_bf,
	p(PHI, 6, 4) * night_bf,
	p(PHI, 6, 5) * night_bf,
	p(PHI, 6, 6) * night_bf
], night_bin, 1);

const night_6 = new c_seq(night_dur * 7 *5, [
	p(PHI, 7, 0) * night_bf,
	p(PHI, 7, 1) * night_bf,
	p(PHI, 7, 2) * night_bf,
	p(PHI, 7, 3) * night_bf,
	p(PHI, 7, 4) * night_bf,
	p(PHI, 7, 5) * night_bf,
	p(PHI, 7, 6) * night_bf,
	p(PHI, 7, 7) * night_bf
], night_bin, 1);

const night_7 = new c_seq(night_dur * 9, [
	5 / 4 * night_bf * (PHI + 0), 
	9 / 4 * night_bf * (PHI + 0),
	6 / 4 * night_bf * (PHI + 1), 
	7 / 4 * night_bf * (PHI + 1),
	6 / 4 * night_bf * (PHI + 2), 
	4 / 4 * night_bf * (PHI + 2)
], night_bin, .5);

const night_8 = new c_seq(night_dur * 36, [
	1 / 3 * night_bf * (PHI + 0), 
	5 / 3 * night_bf * (PHI + 0),
	7 / 3 * night_bf * (PHI + 0),
	4 / 3 * night_bf * (PHI + 0)
], night_bin, 1);




const night_ring = new c_seq(night_dur * 1, [
	3 / 4 * night_bf * (PHI + 2), 
	3 / 4 * night_bf * (PHI + 2), 
	5 / 3 * night_bf * (PHI + 0),
	5 / 4 * night_bf * (PHI + 2)
], night_bin, .7);

const beam_taking  = new c_seq(night_dur / 3, [ night_bf * PHI        , night_bf * PHI * PHI   ], night_bin, .5);
const beam_putting = new c_seq(night_dur / 2, [ sp1(night_bf * PHI, 5), sp1(night_bf * PHI, 2) ], night_bin, .5);

const night_group = new c_start_group(night_dur);

// day group

const day_bf    = 90;
const day_bin   = day_bf * Math.pow(PHI, -7);
const day_dur   = 1000;

const day_center = new c_seq(day_dur, [ 
	sp1(day_bf, 0), sp1(day_bf, 3), sp1(day_bf, 3), sp1(day_bf, 1), sp1(day_bf, 2) 
], day_bin);

const day_accent = new c_seq(day_dur * 2, [ 
	day_bf * 2, sp1(day_bf * 2 * PHI, 3), day_bf * 2, sp1(day_bf * 2, 0) 
], day_bin, .6);

const day_a_f = day_bf * Math.pow(2 * (PHI - 1), 3);
const day_a = new c_seq(day_dur * 3, [ 
	sp1(day_a_f, 0), sp1(day_a_f, 3), sp1(day_a_f, 3), sp1(day_a_f, 1), sp1(day_a_f, 2) 
], day_bin);

const day_e_f = day_bf * 2;
const day_e = new c_seq(day_dur * 9, [
	sp1(day_e_f, 0), sp1(day_e_f, 3), sp1(day_e_f, 1), sp1(day_e_f, 2), sp1(day_e_f, 4)
]);

const day_group = new c_start_group(day_dur);

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	start([ day_group, night_group ]);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	stop([ day_group, night_group ]);
};

const update_groups = _ => {
	if (sun.state === DAY) {
		night_group.set([]);
		if (man.state === INSIDE_HOUSE) {
			day_group.set([ day_center, day_a, day_accent ]);
		} else if (man.state === OUTSIDE_HOUSE) {
			day_group.set([ day_center, day_a ]);
		} else if (man.state === IN_VALLEY) {
			day_group.set([ day_center ]);
		} else if (man.state === INSIDE_SHIP) {
			day_group.set([ day_center, day_e, day_accent ]);
		}
	} else {
		day_group.set([]);
		if (beam.state === TAKING) {
//			night_group.set([ beam_taking ]);
			night_group.set([ night_5 ]);
		} else if (beam.state === PUTTING) {
//			night_group.set([ beam_putting ]);
			night_group.set([ night_5, night_6 ]);
		} else if (man.state === INSIDE_HOUSE) {
			night_group.set([ night_5, night_6, night_7, night_8 ]);
		} else if (man.state === OUTSIDE_HOUSE) {
			night_group.set([ night_5, night_6, night_7 ]);
		} else if (man.state === IN_VALLEY) {
			night_group.set([ night_5, night_6 ]);
		} else if (man.state === INSIDE_SHIP) {
//			if (ship.state === OVER_VALLEY) {
//				night_group.set([ night_1, night_2, night_3 ]);
//			} else {
				night_group.set([ night_1, night_2, night_3, night_4 ]);
//			}
		}
	}
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
		if (beam.state !== OFF) return false;
		if (click(this.yellow)) {
			if (this.state === DAY) {
				this.state = NIGHT;
			} else {
				this.state = DAY;
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
		if (beam.state !== OFF) return false;
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
		if (beam.state !== OFF) return false;
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

let click_set = [ sun, man, ship, house ];

let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume)) run_volume();
	if (click(audio)) on_resize();
	if (click(click_set)) {
		update_groups();
		on_resize();
	}
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
	audio.on = window.stop_audio !== null;
	on_resize = draw_page;
    on_click  = click_page;
    on_resize();
	update_groups();
};

export { run }
