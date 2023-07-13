import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const borders = new c_img("./rings/images/borders.png");
const back    = new c_img("./rings/images/back.png");
const volume  = new c_img("./rings/images/volume.png");
const toggles = [];

const bf            = 90;
const bin           = bf * Math.pow(PHI, -7);
const dur           = 2000;
const start_group   = new c_start_group(dur);

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

const ring = new c_seq(dur * 1, [
	3 / 4 * bf * (PHI + 2), 
	3 / 4 * bf * (PHI + 2), 
	5 / 3 * bf * (PHI + 0),
	5 / 4 * bf * (PHI + 2)
], bin, .7);

const outer = new c_seq(dur * 15, [
	11 / 9 * bf * (PHI - 0),
	16 / 9 * bf * (PHI - 0),
	21 / 9 * bf * (PHI - 0),
	26 / 9 * bf * (PHI - 0),
	31 / 9 * bf * (PHI - 0)
], bin, .5);

const names = [ "audio", "center", "ring", "outer" ];
names.forEach(n => {
    const blue   = new c_img("./rings/images/" + n + ".png");
    const yellow = blue.clone_yellow();
    toggles[n]   = new c_toggle(blue, yellow);
});

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

toggles.audio.on_true   = start_audio;
toggles.audio.on_false  = stop_audio;
toggles.center.on_true  = _ => start_group.add(center_1, center_2, center_3);
toggles.center.on_false = _ => start_group.remove(center_1, center_2, center_3);
toggles.ring.on_true    = _ => start_group.add(ring);
toggles.ring.on_false   = _ => start_group.remove(ring);
toggles.outer.on_true   = _ => start_group.add(outer);
toggles.outer.on_false  = _ => start_group.remove(outer);

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
