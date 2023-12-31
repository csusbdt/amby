import c_img         from "../common/img.js";
//import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
const start_group = new c_start_group();

const s1 = new c_seq(dur * 1, [ 
	bf * p(2, 23, 0), 
	bf * p(2, 23, 5), 
], bin, 1);

const s2 = new c_seq(dur * 2, [ 
	bf * p(2, 15, 27), 
	bf * p(2, 15, 33)
], bin, .4);

const s3 = new c_seq(dur * 4, [ 
	bf * p(2, 19, 29), 
	bf * p(2, 19, 31)
], bin, 1);

const s4 = new c_seq(dur * 8, [ 
	bf * p(2, 23, 10), 
	bf * p(2, 23, 15)
], bin, 1);

const s5 = new c_seq(dur * 16, [ 
	0, 0,
	bf * p(2, 23, 23), 
	bf * p(2, 23, 28),
	bf * p(2, 23, 23 + 23), 
	bf * p(2, 23, 28 + 23),
], bin, 1);

const g1 = [ s1 ];
const g2 = [ s1, s2 ];
const g3 = [ s1, s2, s3 ];
const g4 = [ s1, s2, s3, s4 ];

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

let img = n => new c_img("./bloby/images/" + n + ".png");

const borders       = img("borders"    );
const back          = img("back"       );
const volume        = img("volume"     );

img = n => new c_img("./train/images/" + n + ".png");

const BLUE      = 0;
const YELLOW    = 1;

const photo         = img("photo"   );
const rect_border   = img("rect_b"  );
const rect          = img("rect"    );
const train_border  = img("train_b" );
const train_blue    = img("train"   );
const train_yellow  = train_blue.clone_yellow();
const circle_border = img("circle_b");
const circle_blue   = img("circle"  );
const circle_yellow = circle_blue.clone_yellow();
const arch_border   = img("arch_b"  );
const arch_blue     = img("arch"    );
const arch_yellow   = arch_blue.clone_yellow();

let state = 0;

const draw_objs = _ => {
	draw(photo);
	if (state === 0) {
		draw(rect); 
		draw(rect_border);
	} else if (state === 1) {
		draw(train_blue); 
		draw(train_border);
		draw(arch_blue); 
		draw(arch_border);
	} else if (state === 2) {
		draw(arch_blue); 
		draw(arch_border);
	} else if (state === 3) {
		draw(circle_blue); 
		draw(circle_border);
	}
};

const click_objs = _ => {
	if (state === 0 && click(rect)) {
		state = 1;
		start_audio();
		start_group.set(g1);
		return true;
	} else if (state === 1 && click(train_blue)) {
		state = 2;
		start_group.set(g2);
		return true;
	} else if (state === 2 && click(arch_blue)) {
		state = 3;
		start_group.set(g3);
		return true;
	} else if (state === 3 && click(circle_blue)) {
		state = 4;
		start_group.set(g4);
		return true;
	} else if (state === 4 && click(rect)) {
		state = 0;
		start_group.remove_all();
		stop_audio();
		return true;
	}
	return false;
};

const click_page = _ => {
    if (click(back)) {
		stop_audio();
		return run_page("home");
	}
    if (click(volume)) return run_volume();	
	if (click_objs()) on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw_objs();
    draw(back);
    draw(volume);
    draw(borders);
};

const run = _ => {
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
