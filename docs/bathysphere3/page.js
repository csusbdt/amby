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

img = n => new c_img("./bathysphere3/images/" + n + ".png");

const button_border   = img("button_border"  );
const button_border_1 = img("button_border_1");
const button_border_2 = img("button_border_2");
const button_blue     = img("button_blue"    );
const button_green_1  = img("button_green_1" );
const button_green_2  = img("button_green_2" );

const couple          = img("couple"     );
const bathysphere     = img("bathysphere");
const car             = img("car"        );
const books           = img("books"      );
const concert         = img("concert"    );
const synthesizer     = img("synthesizer");

const photos = [ 
	bathysphere, 
	synthesizer, 
	books, 
	couple, 
	concert
];

let i  = 0;
let id = null;

const start = _ => {
	i = 0;
	start_audio();
	id = setTimeout(next, 16000);
    on_resize();
};

const next = _ => {
	if (++i === photos.length) i = 0;
	id = setTimeout(next, 16000);
    on_resize();
};

const stop = _ => {
	clearTimeout(id);
	id = null;
	i = 0;
	stop_audio();
    on_resize();
};

const speed = 220;

const anim = _ => {
	if (i === 0) {
		on_click = null;
		i = 1;
		on_resize();
		setTimeout(anim, speed);
	} else if (i === 1) {
		i = 2;
		on_resize();
		setTimeout(anim, speed);
	} else if (i === 2) {
		i = 3;
		on_resize();
		setTimeout(anim, speed);
	} else if (i === 3) {
		i = 0;
		on_click = click_page;
		start();
	}
};

const click_page = _ => {
	if (window.stop_audio !== null) {
		stop_audio();
	} else {
	    if (click(back_blue)) return run_page("home"); 
	    else if (click(volume_blue)) return run_volume();
		else anim();
	}
	on_resize();
};

const draw_page = _ => {
	draw(bg_green     );
	if (window.stop_audio !== null) {
		draw(photos[i]);
	} else if (on_click === null) {
		draw(bathysphere);
		if (i === 0) {
			draw(button_blue);
			draw(button_green_0);
			draw(button_border);
		    draw(back_blue    );
		    draw(volume_blue  );
		    draw(back_border  );
		    draw(volume_border);
		} else if (i === 1) {
			draw(button_border_1);
			draw(button_green_1);
		    draw(back_blue    );
		    draw(volume_blue  );
		    draw(back_border  );
		    draw(volume_border);
		} else if (i === 2) {
			draw(button_border_2);
			draw(button_green_2);
		    draw(back_blue    );
		    draw(volume_blue  );
		    draw(back_border  );
		    draw(volume_border);
		}
	} else {
		draw(button_border);
		draw(button_blue);
	    draw(back_blue    );
	    draw(volume_blue  );
	    draw(back_border  );
	    draw(volume_border);
	}
};

const run = _ => {
	if (window.stop_audio !== null) window.stop_audio();
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
