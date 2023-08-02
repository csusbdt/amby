import c_img         from "../common/img.js"    ;
import c_toggle      from "../common/toggle.js" ;
import run_volume    from "../volume/page.js"   ;
import music         from "./music.js"          ;

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	music();
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	music();
};

let img = n => new c_img("./bubble/images/" + n + ".png");

const back          = img("back"         );
const volume        = img("volume"       );
const back_border   = img("back_border"  );
const volume_border = img("volume_border");

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
	if (window.stop_audio !== stop_audio) {
		start_audio();
	}
};

const block_on_blue   = _ => { 
	if (window.stop_audio === stop_audio) {
		stop_audio();
		audio.on = false;
	} 
};

const block = new c_obj("block", block_on_yellow, block_on_blue);

const click_page = _ => {
    if (click(back  )) return run_page("home"); 
    if (click(volume)) return run_volume();
	if (click(block )) on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw(block);
    draw(back);
    draw(volume);
    draw(back_border);
    draw(volume_border);
};

const run = _ => {
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
