import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const group = new c_start_group();

// night group taken from ring center

const ring_bf    = 90;
const ring_bin   = ring_bf * Math.pow(PHI, -7);
const ring_dur   = 1000;

const ring_1 = new c_seq(ring_dur * 1, [ 
	1 / 1 * ring_bf * (PHI + 0), 
	1 / 1 * ring_bf * (PHI + 1)
], ring_bin);

const ring_2 = new c_seq(ring_dur * 2, [
	2 / 3 * ring_bf * (PHI + 0), 
	4 / 3 * ring_bf * (PHI - 1)
], ring_bin);

const ring_3 = new c_seq(ring_dur * 4, [
	6 / 3 * ring_bf * (PHI - 0), 
	7 / 3 * ring_bf * (PHI - 0)
], ring_bin);

const ring_4 = new c_seq(ring_dur * 16, [
	1 / 3 * ring_bf * (PHI + 0), 
	5 / 3 * ring_bf * (PHI + 0),
	7 / 3 * ring_bf * (PHI + 0),
	4 / 3 * ring_bf * (PHI + 0)
], ring_bin, .8);

const p = (b, n, i) => Math.pow(Math.pow(b, 1 / n), i);

const ring_5 = new c_seq(ring_dur * 1 *5, [ 
	p(PHI, 6, 0) * ring_bf,
	p(PHI, 6, 1) * ring_bf,
	p(PHI, 6, 2) * ring_bf,
	p(PHI, 6, 3) * ring_bf,
	p(PHI, 6, 4) * ring_bf,
	p(PHI, 6, 5) * ring_bf,
	p(PHI, 6, 6) * ring_bf
], ring_bin, 1);

const ring_6 = new c_seq(ring_dur * 7 *5, [
	p(PHI, 7, 0) * ring_bf,
	p(PHI, 7, 1) * ring_bf,
	p(PHI, 7, 2) * ring_bf,
	p(PHI, 7, 3) * ring_bf,
	p(PHI, 7, 4) * ring_bf,
	p(PHI, 7, 5) * ring_bf,
	p(PHI, 7, 6) * ring_bf,
	p(PHI, 7, 7) * ring_bf
], ring_bin, 1);

const ring_7 = new c_seq(ring_dur * 9, [
	5 / 4 * ring_bf * (PHI + 0), 
	9 / 4 * ring_bf * (PHI + 0),
	6 / 4 * ring_bf * (PHI + 1), 
	7 / 4 * ring_bf * (PHI + 1),
	6 / 4 * ring_bf * (PHI + 2), 
	4 / 4 * ring_bf * (PHI + 2)
], ring_bin, .5);

const ring_8 = new c_seq(ring_dur * 36, [
	1 / 3 * ring_bf * (PHI + 0), 
	5 / 3 * ring_bf * (PHI + 0),
	7 / 3 * ring_bf * (PHI + 0),
	4 / 3 * ring_bf * (PHI + 0)
], ring_bin, 1);

const ring_ring = new c_seq(ring_dur * 1, [
	3 / 4 * ring_bf * (PHI + 2), 
	3 / 4 * ring_bf * (PHI + 2), 
	5 / 3 * ring_bf * (PHI + 0),
	5 / 4 * ring_bf * (PHI + 2)
], ring_bin, .7);

// const beam_taking  = new c_seq(ring_dur / 3, [ night_bf * PHI        , night_bf * PHI * PHI   ], night_bin, .5);
// const beam_putting = new c_seq(night_dur / 2, [ sp1(night_bf * PHI, 5), sp1(night_bf * PHI, 2) ], night_bin, .5);

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

const day_b_f = day_bf * Math.pow(2 * (PHI - 1), 2);
const day_b = new c_seq(day_dur * 9, [ 
	sp1(day_b_f, 0), sp1(day_b_f, 3), sp1(day_b_f, 3), sp1(day_b_f, 1), sp1(day_b_f, 2) 
], day_bin);

const day_c_f = day_bf * Math.pow(2 * (1 - PHI), 5);
const day_c = new c_seq(day_dur * 6, [ 
	day_c_f, day_c_f * (PHI - 1), day_c_f * (PHI + 1) / 2, day_c_f * PHI
], day_bin);

const day_e_f = day_bf * 2;
const day_e = new c_seq(day_dur * 9, [
	sp1(day_e_f, 0), sp1(day_e_f, 3), sp1(day_e_f, 1), sp1(day_e_f, 2), sp1(day_e_f, 4)
], day_bin);

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	start(group);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	stop(group);
};

const update_groups = _ => {
	if (sun.state === DAY) {
		if (man.state === INSIDE_HOUSE) {
			group.set([ day_center, day_a, day_b, day_c ]);
		} else if (man.state === OUTSIDE_HOUSE) {
			group.set([ day_center, day_c ]);
		} else if (man.state === IN_VALLEY) {
			group.set([ day_center, day_a ]);
		} else if (man.state === INSIDE_SHIP) {
			group.set([ ring_1, ring_2, ring_3, ring_4 ]);
		}
	} else {
		if (beam.state === TAKING) {
			group.set([ day_center, day_e ]);
		} else if (beam.state === PUTTING) {
			group.set([ day_center, day_e, day_accent ]);
		} else if (man.state === INSIDE_HOUSE) {
			group.set([ day_center, day_a, day_b, day_c, day_accent ]);
		} else if (man.state === OUTSIDE_HOUSE) {
			group.set([ day_center, day_c, day_accent ]);
		} else if (man.state === IN_VALLEY) {
			group.set([ day_center, day_a, day_accent ]);
		} else if (man.state === INSIDE_SHIP) {
			group.set([ ring_1, ring_2, ring_3, ring_4 ]);
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
				man.state = INSIDE_HOUSE;
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
