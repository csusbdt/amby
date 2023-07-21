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

const n1 = 12;
const s_1 = new c_seq(dur * 1, [ 
	bf * p(2, n1, 0), 
	bf * p(2, n1, 2), 
	bf * p(2, n1, 5), 
	bf * p(2, n1, 5), 
], bin, 1);

const s_2 = new c_seq(dur * 4, [ 
	bf * p(2, n1, 12), 
	bf * p(2, n1, 10) 
], bin, 1);

const s_3 = new c_seq(dur * 16, [ 
	0, 
	bf * p(2, n1, 22), 
	bf * p(2, n1, 18), 
], bin, 1);

const s_4 = new c_seq(dur * 2, [ 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	// bf * p(2, n1, 33), 
	// bf * p(2, n1, 31), 
	bf * p(2, n1, 27), 
	bf * p(2, n1, 20),	
	0, 0, 0, 0, 0, 0, 0, 0, 
	bf * p(2, n1, 27), 
	bf * p(2, n1, 22),
	0, 0, 0, 0, 0, 0, 0, 0	
], bin, 1);


const seqs = [ s_1, s_2, s_3, s_4 ];


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

let img = n => new c_img("./bloby/images/" + n + ".png");

const borders       = img("borders");
const back          = img("back"   );
const volume        = img("volume" );
const audio_blue    = img("audio"  );
const audio_yellow  = audio_blue.clone_yellow();

const audio = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

const one_borders = [];
const one_blues   = [];
const one_yellows = [];

const two_borders = [];
const two_blues   = [];
const two_yellows = [];

const three_borders = [];
const three_blues   = [];
const three_yellows = [];

for (let i = 0; i < 6; ++i) {
	one_borders.push(img("one_"  + i + "_b"));
	one_blues  .push(img("one_"  + i));
	one_yellows.push(one_blues[i].clone_yellow());
}

for (let i = 0; i < 4; ++i) {
	two_borders.push(img("two_"  + i + "_b"));
	two_blues  .push(img("two_"  + i));
	two_yellows.push(two_blues[i].clone_yellow());
}

for (let i = 0; i < 7; ++i) {
	three_borders.push(img("three_"  + i + "_b"));
	three_blues  .push(img("three_"  + i));
	three_yellows.push(three_blues[i].clone_yellow());
}

const speed     = 100;

// const HIDDEN    = 0;
const BLUE      = 0;
const YELLOW    = 1;
// const TO_HIDDEN = 3;
// const TO_BLUE   = 4;
// const TO_YELLOW = 5;

// let one_state   = BLUE;
// let two_state   = HIDDEN;
// let three_state = HIDDEN;

let one     = BLUE;
let two     = null;
let three   = null;

let one_i   = 0;
let two_i   = null;
let three_i = null;

const draw_objs = _ => {
	if (one === BLUE) draw(one_blues[one_i]); else draw(one_yellows[one_i]);
	draw(one_borders[one_i]);

	if (two !== null) {
		if (two === BLUE) draw(two_blues[two_i]); else draw(two_yellows[two_i]);
		draw(two_borders[two_i]);
	}
	
	if (three !== null) {
		if (three === BLUE) draw(three_blues[three_i]); else draw(three_yellows[three_i]);
		draw(three_borders[three_i]);
	}
};

const one_up = _ => {
	if (++one_i === one_blues.length - 1) {
		one = YELLOW;
		two = BLUE;
		two_i = 0;
		on_click = click_page;
	} else setTimeout(one_up, speed);
	on_resize();
};

const one_down = _ => {
	if (--one_i === 0) {
		two = BLUE;
		two_i = 0;
		on_click = click_page;
	} else setTimeout(one_up, speed);
	on_resize();
};


const click_objs = _ => {
	if (one === BLUE && click(one_blues[0])) {
		on_click = null;
		one_up();
		return true;
	}
	return false;
};








/*

function c_obj(n, m, on_yellow = null, on_blue = null) {
	this.on_yellow = on_yellow;
	this.on_blue   = on_blue;
	this.borders   = [];
	this.blues     = [];
	this.yellows   = [];
	for (let i = 0; i < m; ++i) {
		this.borders.push(img(n + "_"  + i + "_b"));
		this.blues  .push(img(n + "_"  + i));
		this.yellows.push(this.blues[i].clone_yellow());
	}	
	this.state   = BLUE;
	this.i       = 0;
	this.id      = null;
}

c_obj.prototype.draw = function() {
	if (this.state === BLUE) {
		this.blues[this.i].draw();
	} else {
		this.yellows[this.i].draw();
	}
	this.borders[this.i].draw();
};

c_obj.prototype.next = function() {
	if (this.state === BLUE) {
		if (++this.i === this.blues.length) {
			this.i     = this.i - 1;
			this.id    = null;
			this.state = YELLOW;
			if (this.on_yellow !== null) this.on_yellow();
		} else {
			this.id = setTimeout(this.next.bind(this), speed);
		}
	} else {
		if (--this.i === -1) {
			this.i     = 0;
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
	if (this.state === BLUE   && 
		this.i === 0          && 
		this.blues[0].click()) 
	{
		if (this.state === BLUE) {
			this.i = 0; 
		} else {
			this.i = this.blues.length - 1;
		}
		this.id = setTimeout(this.next.bind(this), speed);
		return true;
	} else if (this.state === YELLOW                     && 
			   this.i === this.blues.length - 1          && 
			   this.blues[this.blues.length - 1].click()) 
	{
		if (this.state === BLUE) {
			this.i = 0; 
		} else {
			this.i = this.blues.length - 1;
		}
		this.id = setTimeout(this.next.bind(this), speed);
		return true;
	} else return false;
};

const one_on_yellow = _ => { 
	group.add(seqs);
	if (window.stop_audio !== stop_audio) {
		start_audio();
		audio.on = true;
	}
};

const one_on_blue   = _ => { 
	group.remove_all(); 
	if (window.stop_audio === stop_audio) {
		stop_audio();
		audio.on = false;
	} 
};

const two_on_yellow   = _ => { };
const two_on_blue     = _ => { };
const three_on_yellow = _ => { };
const three_on_blue   = _ => { };

const one   = new c_obj("one"  , 6, one_on_yellow  , one_on_blue  );
const two   = new c_obj("two"  , 4, two_on_yellow  , two_on_blue  );
const three = new c_obj("three", 7, three_on_yellow, three_on_blue);

const draw_objs = _ => {
	draw(one);
	if (one.state === YELLOW) {
		draw(two);
	}
	if (two.state === YELLOW) {
		draw(three);
	}
};

const click_objs = _ => {
	if (click(one)) return true;
	if (one.state === YELLOW) {
		if (click(two)) return true;
	}
	if (two.state === YELLOW) {
		if (click(three)) return true;
	}
	return false;
};

*/

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
