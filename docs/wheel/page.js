import c_img      from "../common/img.js"  ;
import run_volume from "../volume/page.js" ;
import music      from "./music.js"        ;

const back_border   = new c_img("./wheel/images/back_border.png");
const back_blue     = new c_img("./wheel/images/back_blue.png");
const volume_border = new c_img("./wheel/images/volume_border.png");
const volume_blue   = new c_img("./wheel/images/volume_blue.png");
const cover_border  = new c_img("./wheel/images/cover_border.png");
const cover_blue    = new c_img("./wheel/images/cover_blue.png");
const photo         = new c_img("./wheel/images/photo.png");

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

const click_page = _ => {
    if (click(back_blue)) {
		if (window.stop_audio !== null) stop_audio();
		return run_page("home"); 
	}
    if (click(volume_blue)) return run_volume();
	if (click(cover_blue)) {
		if (window.stop_audio === null) {
			start_audio();
		} else {
			stop_audio();
		}
	}
	on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw(photo);
	if (window.stop_audio === null) {
	    draw(back_blue);
	    draw(volume_blue);
	    draw(back_border);
	    draw(volume_border);
		draw(cover_blue);
		draw(cover_border);
	} else {
	    draw(back_blue);
	    draw(volume_blue);
	    draw(back_border);
	    draw(volume_border);
	}
};

const run = _ => {
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
