import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
const group = new c_start_group();

const s_1 = new c_seq(dur * 1, [ 
	bf * p(2, 16, 12), 
	bf * p(2, 16, 15), 
	bf * p(2, 16, 8), 
	bf * p(2, 16, 11) 
], bin, 1);

const s_2 = new c_seq(dur * 8, [ 
	bf * p(2, 16, 2),
	bf * p(2, 16, -2)
], bin, .7);

const s_3 = new c_seq(dur * 16, [ 
	0, 
	bf * p(2, 16, 22), 
	bf * p(2, 16, 18), 
], bin, .8);

const seqs = [ s_1, s_2, s_3 ];

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

let img = n => new c_img("./bubble/images/" + n + ".png");

const borders       = img("borders");
const back          = img("back"   );
const volume        = img("volume" );
const audio_blue    = img("audio"  );
const audio_yellow  = audio_blue.clone_yellow();

const audio = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

img = n => new c_img("./block/images/" + n + ".png");

const speed  = 100;
const BLUE   = 0;
const YELLOW = 1;

function c_obj(n, on_yellow = null, on_blue = null) {
	this.on_yellow = on_yellow;
	this.on_blue   = on_blue;
	this.border    = img(n + "_border");
	this.blue      = img(n + "_blue"  );
	this.yellow    = img(n + "_blue").clone_yellow();
	this.borders   = [];
	this.blues     = [];
	this.yellows   = [];
	for (let i = 0; i < 3; ++i) {
		this.borders.push(img(n + "_border_" + i));
		this.blues  .push(img(n + "_blue_"   + i));
		this.yellows.push(this.blues[i].clone_yellow());
	}	
	this.state   = BLUE;
	this.i       = null;
	this.id      = null;
}

c_obj.prototype.draw = function() {
	if (this.state === BLUE) {
		if (this.i === null) {
			this.blue.draw();
		} else {
			this.yellow.draw();
			this.blues[this.i].draw();
			this.borders[this.i].draw();
		}
	} else {
		this.yellow.draw();
		if (this.i !== null) {
			this.blues[this.i].draw();
			this.borders[this.i].draw();
		}
	}
	this.border.draw();
};

c_obj.prototype.next = function() {
	if (this.state === BLUE) {
		if (++this.i === this.blues.length) {
			this.i     = null;
			this.id    = null;
			this.state = YELLOW;
			if (this.on_yellow !== null) this.on_yellow();
		} else {
			this.id = setTimeout(this.next.bind(this), speed);
		}
	} else {
		if (--this.i === -1) {
			this.i     = null;
			this.id    = null;
			this.state = BLUE;
			if (this.on_blue !== null) this.on_blue();
		} else {
			this.id = setTimeout(this.next.bind(this), speed);
		}
	}
	on_resize();
};

c_obj.prototype.click = function() {
	if (this.i === null && this.blue.click()) {
		if (this.state === BLUE) {
			this.i = 0; 
		} else {
			this.i = this.blues.length - 1;
		}
		this.id = setTimeout(this.next.bind(this), speed);
		return true;
	} else return false;
};

const block_on_yellow = _ => { 
	group.add(seqs);
	if (window.stop_audio !== stop_audio) {
		start_audio();
		audio.on = true;
	}
};

const block_on_blue   = _ => { 
	group.remove_all(); 
	if (window.stop_audio === stop_audio) {
		stop_audio();
		audio.on = false;
	} 
};

const block = new c_obj("block", block_on_yellow, block_on_blue);

const draw_objs = _ => {
	draw(block);
};

const click_objs = _ => {
	if (click(block)) return true;
	return false;
};

let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume)) run_volume();
	if (click(audio) || click_objs()) on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw_objs();
    draw(back);
    draw(volume);
	draw(audio);
    draw(borders);
};

const run = _ => {
    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
		start_external_audio = window.start_audio;
	}
	audio.on = window.stop_audio !== null;
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
