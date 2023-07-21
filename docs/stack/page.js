import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
const group = new c_start_group();

const s1 = new c_seq(dur * 1, [ 
	bf * p(2, 23, 0), 
	bf * p(2, 23, 5), 
	bf * p(2, 23, 12), 
	bf * p(2, 23, 8)
], bin, 1);

const s2 = new c_seq(dur * 16, [ 
	bf * p(2, 15, 27), 
	bf * p(2, 15, 33)
], bin, .6);

const s3 = new c_seq(dur * 8, [ 
	bf * p(2, 19, 29), 
	bf * p(2, 19, 31)
], bin, 1);

const s4 = new c_seq(dur * 4, [ 
	bf * p(2, 23, 10), 
	bf * p(2, 23, 15)
], bin, .7);

const g1 = [ s1, s2 ];
const g2 = [ s1, s2, s3 ];
const g3 = [ s1, s2, s3, s4 ];

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

let img = n => new c_img("./bloby/images/" + n + ".png");

const borders       = img("borders");
const back          = img("back"   );
const volume        = img("volume" );
const audio_blue    = img("audio"  );
const audio_yellow  = audio_blue.clone_yellow();

const audio = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

img = n => new c_img("./stack/images/" + n + ".png");

const one_border = img("one_b_2");
const one_blue   = img("one_2");
const one_yellow = one_blue.clone_yellow();

const two_border = img("two_b_2");
const two_blue   = img("two_2");
const two_yellow = two_blue.clone_yellow();

const three_border = img("three_b_2");
const three_blue   = img("three_2");
const three_yellow = three_blue.clone_yellow();

const BLUE      = 0;
const YELLOW    = 1;

let one     = BLUE;
let two     = null;
let three   = null;

const draw_objs = _ => {
	if (one === BLUE) {
		draw(one_blue); 
		draw(one_border);
	} else {
		draw(one_yellow);
		draw(one_border);
	}
	if (two === BLUE) {
		draw(two_blue); 
		draw(two_border);
	} else if (two === YELLOW) {
		draw(two_yellow);
		draw(two_border);
	}
	if (three === BLUE) {
		draw(three_blue); 
		draw(three_border);
	} else if (three === YELLOW) {
		draw(three_yellow);
		draw(three_border);
	}
};

const click_objs = _ => {
	if (one === BLUE) {
		if (click(one_blue)) {
			one = YELLOW;
			two = BLUE;
			group.set(g1);
			return true;
		}
	} else if (one === YELLOW && two === BLUE) {
		if (click(one_yellow)) {
			one = BLUE;
			two = null;
			group.remove_all();
			return true;
		} else if (click(two_blue)) {
			two = YELLOW;
			three = BLUE;
			group.set(g2);
			return true;
		}			
	} else if (two === YELLOW && three === BLUE) {
		if (click(one_yellow)) {
			one = BLUE;
			two = null;
			three = null;
			group.remove_all();
			return true;
		} else if (click(two_yellow)) {
			two = BLUE;
			three = null;
			group.set(g1);
			return true;
		} else if (click(three_blue)) {
			three = YELLOW;
			group.set(g3);
			return true;
		}
	} else {
		if (click(one_yellow)) {
			one = BLUE;
			two = null;
			three = null;
			group.remove_all();
			return true;
		} else if (click(two_yellow)) {
			two = BLUE;
			three = null;
			group.set(g1);
			return true;
		} else if (click(three_blue)) {
			three = BLUE;
			group.set(g2);
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
	if (click(audio) || click_objs()) on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw_objs();
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
