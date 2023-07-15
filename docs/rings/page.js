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
], bin, .7);

const center_2 = new c_seq(dur * 4, [
	bf * p(2, 5, 7), 
	bf * p(2, 5, 5), 
	bf * p(2, 5, 3), 
	bf * p(2, 5, 4) 
], bin, 1);

const inner_1 = new c_seq(dur * 2, [
	bf * 2 * phi(8, 0),
	bf * 2 * phi(8, 3)
], bin, 1);

const inner_2 = new c_seq(dur * 8, [
	bf * p(2, 5, 7), 
	bf * p(2, 5, 5), 
	bf * p(2, 5, 3), 
	bf * p(2, 5, 4) 
], bin, 1);

const outer_1 = new c_seq(dur * 1, [
	bf * p(2, 8, 11), 
	bf * p(2, 8, 8 ), 
	bf * p(2, 8, 14), 
	bf * p(2, 8, 8 ),
	bf * p(2, 8, 12), 
	bf * p(2, 8, 8 ), 
	bf * p(2, 8, 11), 
	bf * p(2, 8, 7 ) 
], bin, 1);

const outer_2 = new c_seq(dur * 3, [
	bf * p(PHI, 9, 2), 
	bf * p(PHI, 9, 5), 
	bf * p(PHI, 9, 0), 
	bf * p(PHI, 9, 3) 
], bin, 1);

const outer_3 = new c_seq(dur * 12, [
	bf * p(2, 7, 13), 
	bf * p(2, 7, 17), 
	bf * p(2, 7, 19) 
], bin, 1);

const center     = [ center_1, center_2         ];
const inner_ring = [ inner_1 , inner_2          ];
const outer_ring = [ outer_1 , outer_2, outer_3 ];

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
