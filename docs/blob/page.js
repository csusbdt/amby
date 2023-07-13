import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const borders = new c_img("./blob/images/borders.png");
const back    = new c_img("./blob/images/back.png");
const volume  = new c_img("./blob/images/volume.png");
const toggles = [];

const bf            = 90;
const bin           = bf * Math.pow(PHI, -7);
const dur           = 1000;
const start_group   = new c_start_group(dur);

const center = new c_seq(dur, [ 
	sp1(bf, 0), sp1(bf, 3), sp1(bf, 3), sp1(bf, 1), sp1(bf, 2) 
]);

const accent = new c_seq(dur * 2, [ 
	bf * 2, sp1(bf * 2 * PHI, 3), bf * 2, sp1(bf * 2, 0) 
], 0, .6);

const a_f = bf * Math.pow(2 * (PHI - 1), 3);
const a = new c_seq(dur * 3, [ 
	sp1(a_f, 0), sp1(a_f, 3), sp1(a_f, 3), sp1(a_f, 1), sp1(a_f, 2) 
]);

const b_f = bf * Math.pow(2 * (PHI - 1), 2);
const b = new c_seq(dur * 9, [ 
	sp1(b_f, 0), sp1(b_f, 3), sp1(b_f, 3), sp1(b_f, 1), sp1(b_f, 2) 
]);

const c_f = bf * Math.pow(2 * (1 - PHI), 5);
const c = new c_seq(dur * 6, [ 
	c_f, c_f * (PHI - 1), c_f * (PHI + 1) / 2, c_f * PHI
]);

const d_f = sp1(bf * PHI, 3);
const d = new c_seq(dur * 9, [
	sp1(d_f, 0), sp1(d_f, 3), sp1(d_f, 3), sp1(d_f, 1), sp1(d_f, 2)
]);

const e_f = bf * 2;
const e = new c_seq(dur * 9, [
	sp1(e_f, 0), sp1(e_f, 3), sp1(e_f, 1), sp1(e_f, 2), sp1(e_f, 4)
]);

const seqs = [center, accent, a, b, c, d, e];

const names = [ "audio", "center", "dot", "accent", "a", "b", "c", "d", "e" ];
names.forEach(n => {
    const blue   = new c_img("./blob/images/" + n + ".png");
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
toggles.dot.on_true     = _ => seqs.forEach(seq => seq.set_b(bin));
toggles.dot.on_false    = _ => seqs.forEach(seq => seq.set_b(0));
toggles.center.on_true  = _ => start_group.add(center);
toggles.center.on_false = _ => start_group.remove(center);
toggles.accent.on_true  = _ => start_group.add(accent);
toggles.accent.on_false = _ => start_group.remove(accent);
toggles.a.on_true       = _ => start_group.add(a);
toggles.a.on_false      = _ => start_group.remove(a);
toggles.b.on_true       = _ => start_group.add(b);
toggles.b.on_false      = _ => start_group.remove(b);
toggles.c.on_true       = _ => start_group.add(c);
toggles.c.on_false      = _ => start_group.remove(c);
toggles.d.on_true       = _ => start_group.add(d);
toggles.d.on_false      = _ => start_group.remove(d);
toggles.e.on_true       = _ => start_group.add(e);
toggles.e.on_false      = _ => start_group.remove(e);

let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home");
	else start_external_audio = null;
    if (click(volume)) run_volume();
    if (click(toggles)) on_resize();
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
