import c_img         from "../common/img.js";
import c_tone        from "../common/tone.js";
import c_toggle      from "../common/toggle.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -8);
const dur   = 1000;
const group = new c_start_group();

const s_1 = new c_seq(dur * 1, [ 
	bf * p(2, 16, 0), 
	bf * p(2, 16, 4), 
	bf * p(2, 16, 8), 
	bf * p(2, 16, 8), 
	bf * p(2, 16, -2), 
	bf * p(2, 16, 2), 
	bf * p(2, 16, 6), 
	bf * p(2, 16, 6)
], bin, .6);

const s_2 = new c_seq(dur * 8, [
	0,
	bf * p(2, 16, 25), 
	bf * p(2, 16, 20), 
	bf * p(2, 16, 17), 
	bf * p(2, 16, 14), 
], bin, 1);

const s_3 = new c_seq(dur * 40, [ 
	bf * p(2, 20, 25), 
	bf * p(2, 20, 29)
], bin, .8);

const seqs        = [ s_1, s_2 ];
const little_seqs = [ s_3 ];

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

const back          = img("back"   );
const volume        = img("volume" );
const back_border   = img("back_border"   );
const volume_border = img("volume_border" );

const little_border    = img("little_border");
const little_blue      = img("little_blue");
const little_yellow    = little_blue.clone_yellow();
const little_on_yellow = _ => group.add(little_seqs);
const little_on_blue   = _ => group.remove(little_seqs);
const little = new c_toggle(little_blue, little_yellow, little_border, little_on_yellow, little_on_blue);

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
		this.blue.draw();
		if (this.i !== null) {
			this.yellows[this.i].draw();
			this.borders[this.i].draw();
		}
	} else {
		this.yellow.draw();
		if (this.i !== null) {
			this.blue.draw();
			this.yellows[this.i].draw();
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

const center_on_yellow = _ => { 
	group.add(seqs);
	if (window.stop_audio !== stop_audio) {
		start_audio();
		audio.on = true;
	}
};

const center_on_blue   = _ => { 
	group.remove_all(); 
	little.on = false;
	if (window.stop_audio === stop_audio) {
		stop_audio();
		audio.on = false;
	} 
};

const big = new c_obj("big", center_on_yellow, center_on_blue);

const click_page = _ => {
    if (click(back  )) return run_page("home"); 
    if (click(volume)) return run_volume();
	if (click(big)) return on_resize();
	if (big.state === YELLOW && click(little)) return on_resize();
};

const draw_page = _ => {
	draw(bg_green);
    draw(back);
    draw(volume);

	draw(big);
	if (big.state === YELLOW) draw(little);
	
    draw(back_border);
    draw(volume_border);
};

const run = _ => {
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }

/*

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
	bf * p(2, 16, 0), 
	bf * p(2, 16, 4), 
	bf * p(2, 16, 8), 
	bf * p(2, 16, 8), 
	bf * p(2, 16, -2), 
	bf * p(2, 16, 2), 
	bf * p(2, 16, 6), 
	bf * p(2, 16, 6)
], bin, .6);

const s_2 = new c_seq(dur * 8, [
	0,
	bf * p(2, 16, 25), 
	bf * p(2, 16, 20), 
	bf * p(2, 16, 17), 
	bf * p(2, 16, 14), 
], bin, 1);

const s_3 = new c_seq(dur * 40, [ 
	bf * p(2, 20, 25), 
	bf * p(2, 20, 29)
], bin, .8);

const seqs        = [ s_1, s_2 ];
const little_seqs = [ s_3 ];

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

const little_border    = img("little_border");
const little_blue      = img("little_blue");
const little_yellow    = little_blue.clone_yellow();
const little_on_yellow = _ => group.add(little_seqs);
const little_on_blue   = _ => group.remove(little_seqs);
const little = new c_toggle(little_blue, little_yellow, little_border, little_on_yellow, little_on_blue);

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
		this.blue.draw();
		if (this.i !== null) {
			this.yellows[this.i].draw();
			this.borders[this.i].draw();
		}
	} else {
		this.yellow.draw();
		if (this.i !== null) {
			this.blue.draw();
			this.yellows[this.i].draw();
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

const center_on_yellow = _ => { 
	group.add(seqs);
	if (window.stop_audio !== stop_audio) {
		start_audio();
		audio.on = true;
	}
};

const center_on_blue   = _ => { 
	group.remove_all(); 
	little.on = false;
	if (window.stop_audio === stop_audio) {
		stop_audio();
		audio.on = false;
	} 
};

const big = new c_obj("big", center_on_yellow, center_on_blue);

const draw_objs = _ => {
	draw(big);
	if (big.state === YELLOW) draw(little);
};

const click_objs = _ => {
	if (click(big)) return true;
	if (big.state === YELLOW) {
		if (click(little)) return true;
	}
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


*/
