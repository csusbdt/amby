import c_img         from "../common/img.js";
import c_tone        from "../common/tone.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf          = 90;
const bin         = bf * Math.pow(PHI, -7);
const dur         = 1000;
const start_group = new c_start_group();

const s1 = new c_seq(dur * 1, [
	bf * p(2, 16, 5),
	bf * p(2, 16, 0),
], bin, .8);

const s2 = new c_seq(dur * 2, [
	bf * p(2, 16, 10),
	bf * p(2, 16, 13),	
], bin, .9);

const s3 = new c_seq(dur * 4, [ 
	bf * p(2, 16, 18),
	bf * p(2, 16, 24),	
], bin, 1);

const s4 = new c_seq(dur * 8, [ 
	bf * p(2, 16, 30),
	bf * p(2, 16, 33),
], bin, .4);

const s5 = new c_seq(dur * 16, [ 
	bf * p(2, 16, 27),
	bf * p(2, 16, 35),	
], bin, .7);

const g0  = [ s1 ];
const g1  = [ s1, s2 ];
const g2  = [ s1, s2, s3 ];
const g3  = [ s1, s2, s3, s4 ];
const g4  = [ s1, s2, s3, s4, s5 ];

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

let img = n => new c_img("./concert/images/" + n + ".png");

const BLUE          = 0;
const YELLOW        = 1;

const photo         = img("photo"        );
const start_border  = img("start_border" );
const back_border   = img("back_border"  );
const volume_border = img("volume_border");
const border_0      = img("border_0"     );
const border_1      = img("border_1"     );
const border_2      = img("border_2"     );
const start_blue    = img("start_blue"   );
const back_blue     = img("back_blue"    );
const volume_blue   = img("volume_blue"  );
const blue_0        = img("blue_0"       );
const blue_1        = img("blue_1"       );
const blue_2        = img("blue_2"       );
const start_yellow  = start_blue.clone_yellow();
const back_yellow   = back_blue.clone_yellow();
const volume_yellow = volume_blue.clone_yellow();
const yellow_0      = blue_0.clone_yellow();
const yellow_1      = blue_1.clone_yellow();
const yellow_2      = blue_2.clone_yellow();

let state = null;

let id = null;

const play_0 = _ => {
	start_group.set(g0);	
	id = setTimeout(play_1, 4 * 1000);
};

const play_1 = _ => {
	start_group.set(g1);
	setTimeout(play_2, 4 * 1000);
};

const play_2 = _ => {
	start_group.set(g2);
	setTimeout(play_3, 8 * 1000);
};

const play_3 = _ => {
	start_group.set(g3);
	setTimeout(play_4, 16 * 1000);
};

const play_4 = _ => {
	start_group.set(g4);
	setTimeout(play_5, 32 * 1000);
};

const play_5 = _ => {
	start_group.set(g3);
	setTimeout(play_6, 16 * 1000);
};

const play_6 = _ => {
	start_group.set(g2);
	setTimeout(play_1, 8 * 1000);
};

let start_external_audio = null;

const click_page = _ => {
    if (click(back_blue)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume_blue)) return run_volume();
	if (state === null) {
//		if (click(start_blue)) {
			state = 0;
		play_0();
			// start_group.set(g3);
			start_audio();
//		}
	} else if (state === 0) {
//		if (click(blue_0)) {
		// 	state = 1;
		// 	start_group.set(g1);
		// } else {
			state = null;
			start_group.remove_all();
			stop_audio();
//		}
	} else if (state === 1) {
		if (click(blue_1)) {
			state = 2;
			start_group.set(g2);
		} else {
			state = 0;
			start_group.set(g0);
		}
	} else if (state === 2) {
		if (click(blue_2)) {
			state = 3;
			start_group.set(g3);
		} else {
			state = 1;
			start_group.set(g1);
		}
	} else if (state === 3) {
		state = null;
		state = 2;
		start_group.set(g2);
	}
	on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	if (state === null) {
		draw(back_blue);
		draw(volume_blue);
		//draw(start_blue);
		draw(back_border);
		draw(volume_border);
		//draw(start_border);
	} else if (state === 0) {
	// 	draw(photo);
	// 	draw(blue_0);
	// 	draw(border_0);
	// } else if (state === 1) {
	// 	draw(photo);
	// 	draw(blue_1);
	// 	draw(border_1);
	// } else if (state === 2) {
	// 	draw(photo);
	// 	draw(blue_2);
	// 	draw(border_2);
	// } else if (state === 3) {
		draw(photo);
	}
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