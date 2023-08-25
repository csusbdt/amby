import c_seq from "../common/seq.js";

const ring_bf    = 90;
const ring_bin   = ring_bf * Math.pow(PHI, -8);
const ring_dur   = 1000;

const ring_1 = new c_seq(ring_dur * 1, [ 
	1 / 1 * ring_bf * (PHI + 0), 
	1 / 1 * ring_bf * (PHI + 1)
], ring_bin);

const ring_2 = new c_seq(ring_dur * 2, [
	2 / 3 * ring_bf * (PHI + 0), 
	4 / 3 * ring_bf * (PHI - 1)
], ring_bin);

const ring_3 = new c_seq(ring_dur * 4, [
	6 / 3 * ring_bf * (PHI - 0), 
	7 / 3 * ring_bf * (PHI - 0)
], ring_bin);

const ring_4 = new c_seq(ring_dur * 16, [
	1 / 3 * ring_bf * (PHI + 0), 
	5 / 3 * ring_bf * (PHI + 0),
	7 / 3 * ring_bf * (PHI + 0),
	4 / 3 * ring_bf * (PHI + 0)
], ring_bin, .8);

export default _ => {
	if (ring_1.tone.g === null) {
		start([ ring_1, ring_2, ring_3, ring_4 ]);
	} else {
		stop([ ring_1, ring_2, ring_3, ring_4 ]);
	}
};
