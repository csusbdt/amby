import c_img         from "../common/img.js";
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

//const g1 = [ s1, s2 ];
//const g2 = [ s1, s2, s3 ];
const g3 = [ s1, s2, s3, s4, s5 ];

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
//	start(start_group);
	start(g3);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
//	stop(start_group);
	stop(g3);
};

let img = n => new c_img("./bathysphere/images/" + n + ".png");

const back_border   = img("back_border"  );
const back          = img("back"         );
const volume_border = img("volume_border");
const volume        = img("volume"       );

// const BLUE      = 0;
// const YELLOW    = 1;

const photo   = img("photo");
const green   = img("green");
// const borders = Array(3).fill(null).map((_, i) => img("border_" + i));
// const blues   = Array(3).fill(null).map((_, i) => img("blue_"   + i));
// const yellows = blues.map(o => o.clone_yellow());
// const colors  = Array(3).fill(BLUE);
const cover_border = img("border_0");
const cover_blue   = img("blue_0");

//let state = 0;

// const draw_objs = _ => {
// 	draw(photo);
// 	draw(green);
// 	draw(borders[0]);
// 	if (state === 0) {
// 		draw(blues[0]); 
// 		draw(borders[0]);
// 	} else if (state === 1) {
// 		draw(blues[1]); 
// 		draw(borders[1]);
// 	} else if (state === 2) {
// 		draw(blues[2]); 
// 		draw(borders[2]);
// 	}
// };

// const click_objs = _ => {
// 	if (state === 0 && click(blues[0])) {
// 		state = 1;
// 		start_group.set(g1);
// 		start_audio();
// 		return true;
// 	} else if (state === 1 && click(blues[1])) {
// 		state = 2;
// 		start_group.set(g2);
// 		return true;
// 	} else if (state === 1 && click(blues[0])) {
// 		state = 0;
// 		start_group.remove_all();
// 		stop_audio();
// 		return true;
// 	} else if (state === 2 && click(blues[2])) {
// 		state = 3;
// 		start_group.set(g3);
// 		return true;
// 	} else if (state === 2 && click(blues[0])) {
// 		state = 1;
// 		start_group.set(g1);
// 		return true;
// 	} else if (state === 3 && click(blues[0])) {
// 		start_group.set(g2);
// 		state = 2;
// 		return true;
// 	}
// 	return false;
// };

let start_external_audio = null;

const click_page = _ => {
    if (click(back)) {
		stop_audio();
		return run_page("home"); 
	}
    if (click(volume)) return run_volume();
	if (click(cover_blue)) {
		if (window.stop_audio === null) {
			start_audio();
		} else {
			stop_audio();
		}
	}
	
// 	if (window.stop_audio === null) {
// 	    if (click(back)) return run_page("home"); 
// //		else start_external_audio = null;
// 		start_audio();
// 	} else {
// 		stop_audio();
// 	}
	on_resize();
//	if (click_objs()) on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	if (window.stop_audio === null) {
	    draw(back);
	    draw(volume);
	    draw(back_border);
	    draw(volume_border);
		draw(cover_blue);
		draw(cover_border);
	} else {
		draw(photo);
		draw(green);
		draw(cover_border);
	    draw(back);
	    draw(volume);
	    draw(back_border);
	    draw(volume_border);
	}
};

const run = _ => {
	if (window.stop_audio !== null) window.stop_audio();
 //    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
	// 	window.stop_audio();
	// 	start_external_audio = window.start_audio;
	// }
//	if (state !== 0) start_audio();
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
