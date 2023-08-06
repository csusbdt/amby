import c_tone from "../common/tone.js";

const bf     = 90;
const b      = bf * Math.pow(PHI, -8);
const f      = (n, i) => bf * Math.pow(2, i/n);
const dur    = 1;

const a0 = [ f(16,  5), f(16,  0) ];
const a1 = [ f(16, 10), f(16, 13) ]; 
const a2 = [ f(16, 17), f(16, 24) ];
const a3 = [ f(16, 27), f(16, 30) ];
const a4 = [ f(16, 33), f(16, 36) ];

const t0 = new c_tone(a0[0], b, .6);
const t1 = new c_tone(a1[0], b, .8);
const t2 = new c_tone(a2[0], b,  1);
const t3 = new c_tone(a3[0], b, .5);
const t4 = new c_tone(a4[0], b, .3);
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

export default _ => {
	if (id === null) {
		p0();
	} else {
		clearTimeout(id);
		id = null;
		tones.forEach(tone => tone.stop());
	}
};
