import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_beat_group  from "../common/beat_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 2000;
const group = new c_beat_group(dur);

const center_1 = new c_seq(dur * 1, [ 
	1 / 1 * bf * (PHI + 0), 
	1 / 1 * bf * (PHI + 1)
], bin);

const center_2 = new c_seq(dur * 2, [
	2 / 3 * bf * (PHI + 0), 
	4 / 3 * bf * (PHI - 1)
], bin);

const center_3 = new c_seq(dur * 4, [
	6 / 3 * bf * (PHI - 0), 
	7 / 3 * bf * (PHI - 0)
], bin);


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

let img = n => new c_img("./man/images/" + n + ".png");

const borders       = img("borders");
const back          = img("back");
const volume        = img("volume");
const audio_blue    = img("audio_blue");
const audio_yellow  = audio_blue.clone_yellow();



const green         = img("green");

const sun_yellow    = img("sun_yellow");
const sun_white     = sun_yellow.clone_white();

const window_yellow = img("window_yellow");
const window_white  = window_yellow.clone_white();



//const ground_green  = img("ground_green");
//const sky_red       = img("sky");
//const sky = sky_red.clone_green();
//const sun_border    = img("sun_border");
// const ship_blue     = img("ship_blue");
// const ship_yellow   = ship_blue.clone_yellow();
// const ship_border   = img("ship_border");
// const beam_border   = img("beam_border");
// const beam_white    = img("beam_white");
// const man_border    = img("man_border");
// const man_yellow    = img("man_yellow");
// const house_blue    = img("house_blue");
// const house_border  = img("house_border");
// const door_border   = img("door_border");
// const door_red      = img("door_red");
//const window_border = img("window_border");


const audio   = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

const _window = new c_toggle(window_white, window_yellow);

const sun = new c_toggle(sun_yellow, sun_white, null, 
	_ => { 
		_window.on = true; 
		group.add([ center_1, center_2, center_3 ]);
	},
	_ => { 
		_window.on = false; 
		group.remove([ center_1, center_2, center_3 ]);
	}
);





let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume)) run_volume();
	click([ audio, sun ]);
	on_resize();
};

const draw_page = _ => {
	draw(sun.on ? bg_black : bg_white);
	draw(green);
    draw(back);
    draw(volume);
	draw(audio);
	draw([ sun, _window ]);
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


// const sun_off = 0;
// const sun_on  = 1;
//let sun = sun_on;
// const draw_sun = _ => { 
// 	if (sun === sun_off) {
// 		draw(sun_white); 
// 	} else {
// 		draw(sun_yellow); 
// 	}
// 	draw(sun_border);
// };
// const click_sun = _ => {
// 	if (sun_yellow.click()) {
// 		if (sun === sun_off) {
// 			sun = sun_on;
// 			group.remove(s_sun_off);
// 			group.add(s_sun_on);
// 		} else {
// 			sun = sun_off;
// 			group.remove(s_sun_on);
// 			group.add(s_sun_off);
// 		}
// 		return true;
// 	} else return false;
// };











/*
const beam_off     = 0;
const beam_taking  = 1;
const beam_putting = 2;
let beam = beam_off;
const draw_beam  = _ => { 
	if (beam !== beam_off) {
		if (ship === ship_over_valley) {
			draw(beam_white); 
			draw(beam_border);
		} else {
			draw(beam_white, man_outside_house_x, man_outside_house_y); 
			draw(beam_border, man_outside_house_x, man_outside_house_y);
		}
	}
};

const ship_over_valley = 0;
const ship_over_house  = 1;
let ship = ship_over_valley;
const draw_ship = _ => { 
	if (ship === ship_over_valley) {
		if (man === man_in_ship) draw(ship_yellow); 
		else draw(ship_blue); 
		draw(ship_border); 
	} else {
		if (man === man_in_ship) draw(ship_yellow, man_outside_house_x, man_outside_house_y); 
		else draw(ship_blue, man_outside_house_x, man_outside_house_y); 
		draw(ship_border, man_outside_house_x, man_outside_house_y); 
	}
};
const click_ship = _ => {
	if (ship === ship_over_valley) {
		if (click(ship_blue)) {
			if (beam === beam_taking) {
				man = man_in_ship;
				group.remove(s_man_in_valley);
				group.add(s_man_in_ship);
				beam = beam_off;
				group.remove(s_beam_taking);
			} else if (beam === beam_putting) {
				man = man_in_valley;
				group.remove(s_man_in_ship);
				group.add(s_man_in_valley);
				beam = beam_off;
				group.remove(s_beam_putting);
			} else if (man === man_in_ship) {
				beam = beam_putting;
				group.add(s_beam_putting);
			} else if (man === man_in_valley) {
				beam = beam_taking;
				group.add(s_beam_taking);
			} else {
				ship = ship_over_house;
				group.remove(s_ship_over_valley);
				group.add(s_ship_over_house);
			}
			return true;
		} else return false;
	} else {
		if (click(ship_blue, man_outside_house_x, man_outside_house_y)) {
			if (beam === beam_taking) {
				man = man_in_ship;
				group.remove(s_man_outside_house);
				group.add(s_man_in_ship);
				beam = beam_off;
				group.remove(s_beam_taking);
			} else if (beam === beam_putting) {
				man = man_outside_house;
				group.remove(s_man_in_ship);
				group.add(s_man_outside_house);
				beam = beam_off;
				group.remove(s_beam_putting);
			} else if (man === man_outside_house) {
				beam = beam_taking;
				group.add(s_beam_taking);
			} else {
				ship = ship_over_valley;
				group.remove(s_ship_over_house);
				group.add(s_ship_over_valley);
			}
			return true;
		} else return false;
	}
};

const man_in_valley       = 0;
const man_in_ship         = 1;
const man_in_house        = 2;
const man_outside_house   = 3;
const man_outside_house_x = -400;
const man_outside_house_y =  200;
let man = man_in_valley;
const draw_man  = _ => { 
	if (man === man_in_valley && beam === beam_off) {
		draw(man_yellow); 
		draw(man_border);
	} else if (man === man_outside_house && beam === beam_off) {
		draw(man_yellow, man_outside_house_x, man_outside_house_y); 
		draw(man_border, man_outside_house_x, man_outside_house_y);
	}
};
const click_man = _ => {
	if (man === man_in_valley && beam === beam_off) {
		if (click(man_yellow)) {
			man = man_in_house;
			group.remove(s_man_in_valley);
			group.add(s_man_in_house);
			return true;
		} else return false;
	} else if (man === man_outside_house && beam === beam_off) {
		if (click(man_yellow, man_outside_house_x, man_outside_house_y)) {
			man = man_in_valley;
			group.remove(s_man_outside_house);
			group.add(s_man_in_valley);
			return true;
		} else return false;
	} else return false;
};

const draw_window = _ => { 
	if (sun === sun_off) {
		draw(window_yellow); 
	} else {
		draw(window_white); 
	}
	draw(window_border);
};


const draw_door  = _ => { 
	if (man === man_in_house) {
		draw(door_red);
		draw(door_border);
	}
};
const click_door = _ => {
	if (man === man_in_house) {	
		if (door_red.click()) {
			man = man_outside_house;
			group.remove(s_man_in_house);
			group.add(s_man_outside_house);
			return true;
		} else return false;
	} else return false;
};

const draw_house  = _ => { 
	draw(house_blue);
	draw(house_border);
};
const click_house = _ => {
	if (ship === ship_over_valley && beam === beam_off) {
		if (house_blue.click()) {
			ship = ship_over_house;
			group.remove(s_ship_over_valley);
			group.add(s_ship_over_house);
			return true;
		} else return false;
	} else return false;
};

// const dur = 1000;
// const bf  = 90;
// const bin = bf * Math.pow(PHI, -7);

// const s_sun_off           = new c_tone_seq(dur, Array(sp1_max).fill(0).map((_, i) => sp1(bf, i)));
// const s_sun_on            = new c_tone_seq(dur, Array(sp1_max).fill(0).map((_, i) => sp1(bf * PHI, i)));
// const s_beam_taking       = new c_tone_seq(dur / 4, [ bf * PHI, bf * PHI * PHI ]);
// const s_beam_putting      = new c_tone_seq(dur / 2, [ sp1(bf * PHI, 7), sp1(bf * PHI, 9) ]);
// const s_ship_over_valley  = new c_tone_seq(dur, Array(sp2_max).fill(0).map((_, i) => sp2(bf, i)));
// const s_ship_over_house   = new c_tone_seq(dur, Array(sp3_max).fill(0).map((_, i) => sp3(bf, i)));
// const s_man_in_valley     = new c_tone_seq(dur * 2, Array(sp2_max).fill(0).map((_, i) => sp2(bf, i)));
// const s_man_in_ship       = new c_tone_seq(dur * 3, Array(sp3_max).fill(0).map((_, i) => sp3(bf, i)));
// const s_man_in_house      = new c_tone_seq(dur * 2, Array(sp4_max).fill(0).map((_, i) => sp4(bf * PHI, i)));
// const s_man_outside_house = new c_tone_seq(dur * 2, Array(sp1_max).fill(0).map((_, i) => sp1(bf * PHI, i)));

// const group = new c_beat_group(dur);
// group.on = true;
// group.add(s_man_in_valley);
// group.add(s_ship_over_valley);
// group.add(s_sun_on);

*/


/*

const click_page = _ => {
	if (click(back_button)) {
		if (start_external_audio !== null) {
			if (window.stop_audio !== null) window.stop_audio();
			start_external_audio();
		}
		run("./home/index.js");
		return;
	}
	click_audio() || volume.click() || click_ship() 
	click_man()   || click_sun()    || click_door() || click_house();
	start_external_audio = null;
	on_resize();
};

const draw_page = _ => {
	draw(bg_red);
	draw(ground_green);
	draw(ground_border);
	draw_house();
	draw_sun();
	draw_window();
	draw_ship();
	draw_beam();
	draw_man();
	draw_door();
	draw_audio();
	draw(back_button);
	volume.draw_blue();
};

export default _ => {
	if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
		start_external_audio = window.start_audio;
	} else {
		start_external_audio = null;
	}
	set_item('page', "./test/index.js");
	on_resize = draw_page;
	on_click = click_page;
	on_resize();
};

*/
