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

let img = n => new c_img("./bathysphere/images/" + n + ".png");

const back_border   = img("back_border"  );
const back_blue     = img("back_blue"    );
const volume_border = img("volume_border");
const volume_blue   = img("volume_blue"  );

const photo         = img("photo"        );
const cover_green   = img("cover_green"  );
const cover_border  = img("cover_border" );
const cover_blue    = img("cover_blue"   );

let start_external_audio = null;

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
	draw(bg_green     );
	draw(photo        );
	draw(cover_green  );
	if (window.stop_audio === null) draw(cover_blue);
	draw(cover_border );
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
