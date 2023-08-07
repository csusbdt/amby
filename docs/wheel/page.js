import c_img      from "../common/img.js"  ;
import run_volume from "../volume/page.js" ;
import music      from "./music.js"        ;

const img           = n => new c_img("./wheel/images/" + n + ".png");
const back_border   = img("back_border");
const back_blue     = img("back_blue");
const volume_border = img("volume_border");
const volume_blue   = img("volume_blue");
const photo         = img("photo");
const cover_border  = Array(4).fill(0).map((_,i) => img("cover_border_" + i));
const cover_blue    = Array(4).fill(0).map((_,i) => img("cover_blue_"   + i));

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

let i = cover_blue.length - 1;

const start = _ => {
	if (--i === -1) {
		start_audio();
	    on_click  = click_page;
	} else {
		setTimeout(start, 70);
	}
	on_resize();
};

const stop = _ => {
	if (++i === cover_blue.length - 1) {
		stop_audio();
	    on_click  = click_page;
	} else {
		setTimeout(stop, 70);
	}
	on_resize();
};

const click_page = _ => {
    if (click(back_blue)) {
		if (window.stop_audio !== null) stop_audio();
		return run_page("home"); 
	}
    if (click(volume_blue)) return run_volume();
	if (window.stop_audio === null) {
		if (click(cover_blue[cover_blue.length - 1])) {
			on_click = null;
			start();
		}
	} else {
		if (click(cover_blue[cover_blue.length - 1])) {
			on_click = null;
			stop();
		}
	}
};

const draw_page = _ => {
	draw(bg_green);
	draw(photo);
	if (i !== -1) {
		draw(cover_blue[i]);
		draw(cover_border[i]);
	}
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
