import c_img        from "../common/img.js";
import c_tone       from "../common/tone.js";
import run_volume   from "../volume/page.js";

const back_border   = new c_img("./bathysphere/images/back_border.png");
const back_blue     = new c_img("./bathysphere/images/back.png");
const volume_border = new c_img("./bathysphere/images/volume_border.png");
const volume_blue   = new c_img("./bathysphere/images/volume.png");
const photo         = new c_img("./concert/images/photo.png");

const bf            = 90;
const bin           = bf * Math.pow(PHI, -7);
const dur           = 1;

const a0 = [ bf * p(2, 16,  5), bf * p(2, 16,  0) ]; const v0 = .6;
const a1 = [ bf * p(2, 16, 10), bf * p(2, 16, 13) ]; const v1 = .8; 
const a2 = [ bf * p(2, 16, 17), bf * p(2, 16, 24) ]; const v2 =  1;
const a3 = [ bf * p(2, 16, 27), bf * p(2, 16, 30) ]; const v3 = .5;
const a4 = [ bf * p(2, 16, 33), bf * p(2, 16, 36) ]; const v4 = .3;

const t0 = new c_tone(a0[0], bin, v0);
const t1 = new c_tone(a1[0], bin, v1);
const t2 = new c_tone(a2[0], bin, v2);
const t3 = new c_tone(a3[0], bin, v3);
const t4 = new c_tone(a4[0], bin, v4);
const tones = [ t0, t1, t2, t3, t4 ];

let id = null;

const p0 = _ => {
	t0.start();
	for (let i = 0; i < 4; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	id = setTimeout(p1, 4 * dur * 1000);
};

const p1 = _ => {
	t2.stop();
	t1.start();
	for (let i = 0; i < 4; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	for (let i = 0; i < 2; ++i) {
		t1.set_f(a1[i % 2], i * dur * 2);
	}
	id = setTimeout(p2, 4 * dur * 1000);
};

const p2 = _ => {
	t2.start();
	for (let i = 0; i < 8; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	for (let i = 0; i < 4; ++i) {
		t1.set_f(a1[i % 2], i * dur * 2);
	}
	for (let i = 0; i < 2; ++i) {
		t2.set_f(a2[i % 2], i * dur * 4);
	}
	id = setTimeout(p3, 8 * dur * 1000);
};

const p3 = _ => {
	t3.start();
	for (let i = 0; i < 16; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	for (let i = 0; i < 8; ++i) {
		t1.set_f(a1[i % 2], i * dur * 2);
	}
	for (let i = 0; i < 4; ++i) {
		t2.set_f(a2[i % 2], i * dur * 4);
	}
	for (let i = 0; i < 2; ++i) {
		t3.set_f(a3[i % 2], i * dur * 8);
	}
	id = setTimeout(p4, 16 * dur * 1000);
};

const p4 = _ => {
	t4.start();
	for (let i = 0; i < 32; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	for (let i = 0; i < 16; ++i) {
		t1.set_f(a1[i % 2], i * dur * 2);
	}
	for (let i = 0; i < 8; ++i) {
		t2.set_f(a2[i % 2], i * dur * 4);
	}
	for (let i = 0; i < 4; ++i) {
		t3.set_f(a3[i % 2], i * dur * 8);
	}
	for (let i = 0; i < 2; ++i) {
		t4.set_f(a4[i % 2], i * dur * 16);
	}
	id = setTimeout(p5, 32 * dur * 1000);
};

const p5 = _ => {
	t4.stop();
	for (let i = 0; i < 16; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	for (let i = 0; i < 8; ++i) {
		t1.set_f(a1[i % 2], i * dur * 2);
	}
	for (let i = 0; i < 4; ++i) {
		t2.set_f(a2[i % 2], i * dur * 4);
	}
	for (let i = 0; i < 2; ++i) {
		t3.set_f(a3[i % 2], i * dur * 8);
	}
	id = setTimeout(p6, 16 * dur * 1000);
};

const p6 = _ => {
	t3.stop();
	for (let i = 0; i < 8; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	for (let i = 0; i < 4; ++i) {
		t1.set_f(a1[i % 2], i * dur * 2);
	}
	for (let i = 0; i < 2; ++i) {
		t2.set_f(a2[i % 2], i * dur * 4);
	}
	id = setTimeout(p1, 8 * dur * 1000);
};

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	p0();
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	clearTimeout(id);
	id = null;
	stop(tones);
};

const click_page = _ => {
    if (click(back_blue  )) return run_page("home"); 
    if (click(volume_blue)) return run_volume();
	if (window.stop_audio === null) {
		start_audio();
	} else {
		stop_audio();
	}
};

const draw_page = _ => {
	draw(photo);
	draw(back_blue);
	draw(volume_blue);
	draw(back_border);
	draw(volume_border);
};

const run = _ => {
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
