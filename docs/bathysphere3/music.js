import c_tone from "../common/tone.js";

const bf   = 90;
const b    = bf * Math.pow(PHI, -8);
const f    = (n, i) => bf * Math.pow(2, i/n);
const dur  = 1;

const a0 = [ f(23,  0), f(23,  5) ];
const a1 = [ f(15, 27), f(15, 33) ]; 
const a2 = [ f(19, 29), f(19, 31) ];
const a3 = [ f(23, 10), f(23, 15) ];
const a4 = [ 0, f(23, 23), f(23, 28), f(23, 46), f(23, 51) ];

const t0 = new c_tone(a0[0], b,  1);
const t1 = new c_tone(a1[0], b, .4);
const t2 = new c_tone(a2[0], b,  1);
const t3 = new c_tone(a3[0], b,  1);
const t4 = new c_tone(a4[0], b,  1);
const tones = [ t0, t1, t2, t3, t4 ];

let id = null;
let i  = 0;
	
const len = 16 * 5;

const loop = _ => {
	i = 0;
	tones.forEach(tone => tone.start());
	for (let i = 0; i < len; ++i) {
		t0.set_f(a0[i % 2], i * dur);
	}
	for (let i = 0; i < len >> 1; ++i) {
		t1.set_f(a1[i % 2], i * 2 * dur);
	}
	for (let i = 0; i < len >> 2; ++i) {
		t2.set_f(a2[i % 2], i * 4 * dur);
	}
	for (let i = 0; i < len >> 3; ++i) {
		t3.set_f(a3[i % 2], i * 8 * dur);
	}
	for (let i = 0; i < len >> 4; ++i) {
		t4.set_f(a4[i % 5], i * 16 * dur);
	}
	id = setTimeout(loop, len * dur * 1000);
};

export default _ => {
	if (id === null) {
		loop();
	} else {
		clearTimeout(id);
		id = null;
		tones.forEach(tone => tone.stop());
	}
};
