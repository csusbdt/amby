import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
const start_group = new c_start_group();

const s1 = new c_seq(dur * 1, [ 
	bf * p(2, 23, 0), 
	bf * p(2, 23, 5), 
], bin, 1);

const s2 = new c_seq(dur * 2, [ 
	bf * p(2, 15, 27), 
	bf * p(2, 15, 33)
], bin, .4);

const s3 = new c_seq(dur * 4, [ 
	bf * p(2, 19, 29), 
	bf * p(2, 19, 31)
], bin, 1);

const s4 = new c_seq(dur * 8, [ 
	bf * p(2, 23, 10), 
	bf * p(2, 23, 15)
], bin, 1);

const s5 = new c_seq(dur * 16, [ 
	0, 0,
	bf * p(2, 23, 23), 
	bf * p(2, 23, 28),
	bf * p(2, 23, 23 + 23), 
	bf * p(2, 23, 28 + 23),
], bin, 1);

const g1 = [ s1 ];
const g2 = [ s1, s2 ];
const g3 = [ s1, s2, s3, s4, s5 ];

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	start(start_group);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	stop(start_group);
};

let img = n => new c_img("./bloby/images/" + n + ".png");

const borders0      = img("borders"    );
const back          = img("back"       );
const volume        = img("volume"     );
const audio_blue    = img("audio"      );
const audio_yellow  = audio_blue.clone_yellow();

const audio = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

img = n => new c_img("./bathysphere/images/" + n + ".png");

const BLUE      = 0;
const YELLOW    = 1;

const photo   = img("photo");
const green   = img("green");
const borders = Array(3).fill(null).map((_, i) => img("border_" + i));
const blues   = Array(3).fill(null).map((_, i) => img("blue_"   + i));
const yellows = blues.map(o => o.clone_yellow());
const colors  = Array(3).fill(BLUE);

let state = 0;

const draw_objs = _ => {
	draw(photo);
	draw(green);
	draw(borders[0]);
	if (state === 0) {
		draw(blues[0]); 
		draw(borders[0]);
	} else if (state === 1) {
		draw(blues[1]); 
		draw(borders[1]);
	} else if (state === 2) {
		draw(blues[2]); 
		draw(borders[2]);
	}
};

const click_objs = _ => {
	if (state === 0 && click(blues[0])) {
		state = 1;
		start_group.set(g1);
		return true;
	} else if (state === 1 && click(blues[1])) {
		state = 2;
		start_group.set(g2);
		return true;
	} else if (state === 1 && click(blues[0])) {
		state = 0;
		start_group.remove_all();
		return true;
	} else if (state === 2 && click(blues[2])) {
		state = 3;
		start_group.set(g3);
		return true;
	} else if (state === 2 && click(blues[0])) {
		state = 1;
		start_group.set(g1);
		return true;
	} else if (state === 3 && click(blues[0])) {
		start_group.set(g2);
		state = 2;
		return true;
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
    draw(borders0);
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
