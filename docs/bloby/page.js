import c_img         from "../common/img.js";
//import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
//import c_start_group from "../common/start_group.js";
//import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
//const group = new c_start_group();

// const n1 = 12;
// const s_1 = new c_seq(dur * 1, [ 
// 	bf * p(2, n1, 0), 
// 	bf * p(2, n1, 2), 
// 	bf * p(2, n1, 5), 
// 	bf * p(2, n1, 5), 
// ], bin, 1);

// const s_2 = new c_seq(dur * 4, [ 
// 	bf * p(2, n1, 12), 
// 	bf * p(2, n1, 10) 
// ], bin, 1);

// const s_3 = new c_seq(dur * 16, [ 
// 	0, 
// 	bf * p(2, n1, 22), 
// 	bf * p(2, n1, 18), 
// ], bin, 1);

// const s_4 = new c_seq(dur * 2, [ 
// 	0, 0, 0, 0, 0, 0, 0, 0, 
// 	0, 0, 0, 0, 0, 0, 0, 0, 
// 	0, 0, 0, 0, 0, 0, 0, 0, 
// 	0, 0, 0, 0, 0, 0, 0, 0, 
// 	// bf * p(2, n1, 33), 
// 	// bf * p(2, n1, 31), 
// 	bf * p(2, n1, 27), 
// 	bf * p(2, n1, 20),	
// 	0, 0, 0, 0, 0, 0, 0, 0, 
// 	bf * p(2, n1, 27), 
// 	bf * p(2, n1, 22),
// 	0, 0, 0, 0, 0, 0, 0, 0	
// ], bin, 1);


// const seqs = [ s_1, s_2, s_3, s_4 ];


const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
//	start(group);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
//	stop(group);
};

let img = n => new c_img("./bloby/images/" + n + ".png");

const back_border   = img("back_border"  );
const back_blue     = img("back_blue"    );
const volume_border = img("volume_border");
const volume_blue   = img("volume_blue"  );

const back_x   = 140;
const back_y   =   0;
const volume_x =   0;
const volume_y = -50;

const blues   = [];
const borders = [];

for (let i = 0; i < 6; ++i) {
	blues.push(img("blue_"  + i));
	borders.push(img("border_"  + i));
}

let i = 0;
let j = 0;

const click_page = _ => {
    if (click(back_blue  , back_x  , back_y  )) return run_page("home"); 
    if (click(volume_blue, volume_x, volume_y)) return run_volume();

	if (j === 0) {
		if (++i === 6) {
			i = 4;
			j = 1;
		}
	} else {
		if (--i === -1) {
			i = 1;
			j = 0;
		}
	}
	on_resize();
};

const draw_page = _ => {
	draw(bg_green);

	blues[i].draw();
	borders[i].draw();
	
    draw(back_blue    , back_x  , back_y  );
    draw(back_border  , back_x  , back_y  );
    draw(volume_blue  , volume_x, volume_y);
    draw(volume_border, volume_x, volume_y);
};

const run = _ => {
    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
	}
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
