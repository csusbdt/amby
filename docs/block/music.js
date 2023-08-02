import c_tone from "../common/tone.js";

const bf     = 90;
const b      = bf * Math.pow(PHI, -8);
const f      = (n, i) => bf * Math.pow(2, i/n);
const dur    = 1;

const a0 = [ f(16, 12), f(16, 15), f(16, 8), f(16, 11) ];
const a1 = [ f(16,  2), f(16, -2) ]; 
const a2 = [ 0, f(16, 22), f(16, 18) ];

const t0    = new c_tone(a0[0], b,  1);
const t1    = new c_tone(a1[0], b, .7);
const t2    = new c_tone(a2[0], b, .8);
const tones = [ t0, t1, t2 ];

let id = null;
let i  = 0;
	
const len = 16 * 3;

const loop = _ => {
	i = 0;
	tones.forEach(tone => tone.start());
	for (let i = 0; i < len; ++i) {
		t0.set_f(a0[i % 4], i * dur);
	}
	for (let i = 0; i < len >> 3; ++i) {
		t1.set_f(a1[i % 2], i * 8 * dur);
	}
	for (let i = 0; i < len >> 4; ++i) {
		t2.set_f(a2[i % 3], i * 4 * dur);
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
