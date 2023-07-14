import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const borders = new c_img("./rings/images/borders.png");
const back    = new c_img("./rings/images/back.png");
const volume  = new c_img("./rings/images/volume.png");
const toggles = [];

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
const group = new c_start_group();

const b1 = 2;
const n1 = 3;
const center_1 = new c_seq(dur * 1, [ 
	bf * p(b1, n1, 0), 
	bf * p(b1, n1, 1) 
], bin);

const center_2 = new c_seq(dur * 4, [
	bf * p(2, 5, 7), 
	bf * p(2, 5, 5), 
	bf * p(2, 5, 3), 
	bf * p(2, 5, 4) 
], bin, .5);

const center = [ center_1, center_2 ];

const b2 = 2;
const n2 = 4;
const inner_1 = new c_seq(dur * 2, [
	bf * 2 * phi(8, 0),
	bf * 2 * phi(8, 3)
], bin, .7);

const inner_ring = [ inner_1 ];



const b3 = 2;
const n3 = 5;
const outer_1 = new c_seq(dur * 4, [
	bf * p(b3, n3, 7), 
	bf * p(b3, n3, 5), 
	bf * p(b3, n3, 3), 
	bf * p(b3, n3, 4) 
], bin, .5);

const outer_ring = [ outer_1 ];






const center_3 = new c_seq(dur * 2 * 5, [
], bin);

// const center_1 = new c_seq(dur * 1, [ 
// 	1 / 1 * bf * (PHI + 0), 
// 	1 / 1 * bf * (PHI + 1)
// ], bin);

// const center_2 = new c_seq(dur * 2, [
// 	2 / 3 * bf * (PHI + 0), 
// 	4 / 3 * bf * (PHI - 1)
// ], bin);

// const center_3 = new c_seq(dur * 4, [
// 	6 / 3 * bf * (PHI - 0), 
// 	7 / 3 * bf * (PHI - 0)
// ], bin);

//const center = [ center_1, center_2, center_3 ];
//const center = [ center_1, center_2 ];

// const ring = new c_seq(dur * 1, [
// 	3 / 4 * bf * (PHI + 2), 
// 	3 / 4 * bf * (PHI + 2), 
// 	5 / 3 * bf * (PHI + 0),
// 	5 / 4 * bf * (PHI + 2)
// ], bin, .7);

// const outer = new c_seq(dur * 12, [
// 	11 / 9 * bf * (PHI - 0),
// 	16 / 9 * bf * (PHI - 0),
// 	21 / 9 * bf * (PHI - 0),
// 	26 / 9 * bf * (PHI - 0),
// 	31 / 9 * bf * (PHI - 0)
// ], bin, .5);

const names = [ "audio", "center", "ring", "outer" ];
names.forEach(n => {
    const blue   = new c_img("./rings/images/" + n + ".png");
    const yellow = blue.clone_yellow();
    toggles[n]   = new c_toggle(blue, yellow);
});

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

toggles.audio.on_true   = start_audio;
toggles.audio.on_false  = stop_audio;
toggles.center.on_true  = _ => group.add(center);
toggles.center.on_false = _ => group.remove(center);
toggles.ring.on_true    = _ => group.add(inner_ring);
toggles.ring.on_false   = _ => group.remove(inner_ring);
toggles.outer.on_true   = _ => group.add(outer_ring);
toggles.outer.on_false  = _ => group.remove(outer_ring);

let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home");
    if (click(volume)) run_volume();
    if (click(toggles)) on_resize();
    start_external_audio = null;
};

const draw_page = _ => {
    draw(bg_green);
    draw(back);
    draw(volume);
    draw(toggles);
    draw(borders);
};

const run = _ => {
    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
		start_external_audio = window.start_audio;
	}
	toggles.audio.on = window.stop_audio !== null;
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
