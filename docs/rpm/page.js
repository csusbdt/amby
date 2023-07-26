import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
const start_group = new c_start_group();

const s1 = new c_seq(dur * 1, [ 
	bf * p(2, 23, 5), 
	bf * p(2, 23, 12), 
	bf * p(2, 23, 8),
	bf * p(2, 23, 0), 
], bin, 1);

const s2 = new c_seq(dur * 16, [ 
	bf * p(2, 15, 27), 
	bf * p(2, 15, 33)
], bin, .6);

const s3 = new c_seq(dur * 8, [ 
	bf * p(2, 19, 29), 
	bf * p(2, 19, 31)
], bin, 1);

const s4 = new c_seq(dur * 4, [ 
	bf * p(2, 7, -2 + 11), 
	bf * p(2, 7,  6 + 11), 
	bf * p(2, 7,  2 + 11), 
], bin, .6);

start_group.set([s1, s2]);

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	start(start_group);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	stop(start_group);
};

let img = n => new c_img("./rpm/images/" + n + ".png");

const photo           = img("photo"          );
const photo_border    = img("photo_border"   );
const photo_blue      = img("photo_blue"     );
const green           = img("green"          );
const back_border     = img("back_border"    );
const back_blue       = img("back_blue"      );
const volume_border   = img("volume_border"  );
const volume_blue     = img("volume_blue"    );
const rpm_border      = img("rpm_border"     );
const rpm_blue        = img("rpm_blue"       );
const altitude_border = img("altitude_border");
const altitude_blue   = img("altitude_blue"  );

const BLUE   = 0;
const YELLOW = 1;

let rpm      = BLUE;
let altitude = BLUE;

let start_external_audio = null;

const click_page = _ => {
    if (click(back_blue)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume_blue)) return run_volume();
	if (window.stop_audio === null) {
		if (click(photo_blue)) {
			start_audio();
		}
	} else {
		if (click(rpm_blue)) {
			if (rpm === BLUE) {
				rpm = null;
				start_group.add(s3);
			} else {
				rpm = BLUE;
				start_group.remove(s3);
			}
		} else if (click(altitude_blue)) {
			if (altitude === BLUE) {
				altitude = null;
				start_group.add(s4);
			} else {
				altitude = BLUE;
				start_group.remove(s4);
			}
		} else {
			stop_audio();
		}
	}
	on_resize();
};

const draw_page = _ => {
	draw(bg_green);
    draw(back_blue);
    draw(volume_blue);
	if (window.stop_audio === null) {
		draw(photo_blue);
		draw(photo_border);
	} else {
		draw(photo);
		draw(green);
		if (rpm === BLUE) {
			draw(rpm_blue); 
			draw(rpm_border);
		}
		if (altitude === BLUE) {
			draw(altitude_blue); 
			draw(altitude_border);
		}
	}		
    draw(back_border);
    draw(volume_border);	
};

const run = _ => {
    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
		start_external_audio = window.start_audio;
	}
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
