import c_img      from "../common/img.js";
import run_volume from "../volume/page.js";
import music      from "./music.js"        ;

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

let img = n => new c_img("./bathysphere2/images/" + n + ".png");

const back_border   = img("back_border"  );
const back_blue     = img("back_blue"    );
const volume_border = img("volume_border");
const volume_blue   = img("volume_blue"  );

const photo         = img("photo"        );
const cover_green   = img("cover_green"  );

const anim_border = [];
const anim_blue   = [];
for (let i = 0; i < 4; ++i) {
	anim_border.push(img("cover_border_" + i));
	anim_blue.push(img("cover_blue_" + i));
}

let i = 0;

const start = _ => {
	if (++i === 4) {
		start_audio();
		on_click = click_page;
	}
	else {
		setTimeout(start, 80);
		on_click = null;
	}
    on_resize();
};

const stop = _ => {
	if (--i === 0) {
		stop_audio();
		on_click = click_page;
	}
	else {
		setTimeout(stop, 80);
		on_click = null;
	}
    on_resize();
};

const click_page = _ => {
    if (click(back_blue)) {
		if (window.stop_audio !== null) stop_audio();
		return run_page("home"); 
	}
    if (click(volume_blue)) return run_volume();
	if (click(anim_blue[0])) {
		if (i === 0) {
			start();
		} else {
			stop();
		}
	}
};

const draw_page = _ => {
	draw(bg_green     );
	draw(photo        );
	draw(cover_green  );
	draw(anim_border[0]);
	if (i !== 4) {
		draw(anim_blue[i]);
		draw(anim_border[i]);
	}
    draw(back_blue    );
    draw(volume_blue  );
    draw(back_border  );
    draw(volume_border);
};

const run = _ => {
	if (window.stop_audio !== null) window.stop_audio();
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
