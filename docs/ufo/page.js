import c_img         from "../common/img.js"  ;
import run_volume    from "../volume/page.js" ;
import music         from "./music.js"        ;

function c_obj(images, x, y) {
	if (Array.isArray(images)) {
		this.images = images;
	} else {
		this.images = [ images ];
	}
	this.x = x;
	this.y = y;
}

c_obj.prototype.draw = function(x, y) {
	this.images.forEach(o => o.draw(x + this.x, y + this.y));
};

c_obj.prototype.click = function() {
	return this.images[0].click(this.x, this.y);
};

const obj = (images, x = 0, y = 0) => new c_obj(images, x, y);

let img = n => new c_img("./wheel/images/" + n + ".png");

const back   = obj([ img("back_blue"  ), img("back_border"  ) ]);
const volume = obj([ img("volume_blue"), img("volume_border") ]);

img = n => new c_img("./man/images/" + n + ".png");

const green          = img("green");
const cover_border_0 = img("cover_border_0");

const sun_yellow     = obj([ img("sun_yellow")              , img("sun_border") ], 100);
const sun_white      = obj([ img("sun_yellow").clone_white(), img("sun_border") ], 100);

const beam_6         = img("beam_white");
const beam_2         = obj(beam_6, -460, 10);

const ship_blue      = obj([ img("ship_blue")               , img("ship_border") ]);
const ship_yellow    = obj([ img("ship_blue").clone_yellow(), img("ship_border") ]);
const ship_blue_0    = obj(ship_blue  , -690, 0);
const ship_blue_1    = obj(ship_blue  , -575, 0);
const ship_blue_2    = obj(ship_blue  , -460, 0);
const ship_yellow_2  = obj(ship_yellow, -460, 0);
const ship_yellow_3  = obj(ship_yellow, -306, 0);
// const ship_yellow_3 = obj(ship_yellow, -345, 0);
// const ship_yellow_4 = obj(ship_yellow, -230, 0);
// const ship_yellow_5 = obj(ship_yellow, -115, 0);
const ship_yellow_5  = obj(ship_yellow, -153, 0);
const ship_yellow_6  = obj(ship_yellow,    0, 0);
const ship_blue_6    = obj(ship_blue  ,    0, 0);
const ship_blue_7    = obj(ship_blue  ,  115, 0);
const ship_blue_8    = obj(ship_blue  ,  230, 0);

const house          = obj([ img("house_blue"), img("house_border"), img("door_red"), img("door_border") ]);
const window_yellow  = obj([ img("window_yellow"), img("window_border") ]);
const window_white   = obj([ img("window_yellow").clone_white(), img("window_border") ]);

const man            = obj([ img("man_yellow"), img("man_border") ]);
const man_0          = obj(man,    0,   0);
const man_1          = obj(man, -200,  40);
const man_2          = obj(man, -400,  70);

const scenes = [
	[ sun_yellow, house, window_white ,                man_0  ],
	[ sun_yellow, house, window_white ,                man_1  ],
	[ sun_yellow, house, window_white ,                man_2  ],
	[ sun_yellow, house, window_yellow                        ],
	[ sun_white , house, window_yellow                        ],
	[ sun_white , house, window_yellow, ship_blue_0           ],
	[ sun_white , house, window_yellow, ship_blue_1           ],
	[ sun_white , house, window_yellow, ship_blue_2           ],
	[ sun_white , house, window_white , ship_blue_2  , beam_2 ],
	[ sun_white , house, window_white , ship_yellow_2         ],
	//[ sun_white , house, window_white , ship_yellow_2         ],
	[ sun_white , house, window_white , ship_yellow_3         ],
	//[ sun_white , house, window_white , ship_yellow_4         ],
	[ sun_white , house, window_white , ship_yellow_5         ],
	[ sun_white , house, window_white , ship_yellow_6         ],
	//[ sun_white , house, window_white , ship_yellow_6         ],
	[ sun_white , house, window_white , ship_yellow_6, beam_6 ],
	[ sun_white , house, window_white , ship_blue_6  , man_0  ],
	[ sun_white , house, window_white , ship_blue_7  , man_0  ],
	[ sun_white , house, window_white , ship_blue_8  , man_0  ],
	[ sun_white , house, window_white ,                man_0  ],
	[ sun_white , house, window_white ,                man_0  ],
	[ sun_white , house, window_white ,                man_0  ],
];

let id = null;
let i  = 0;

const loop = _ => {
	if (++i === scenes.length) i = 0;
	if (on_resize === draw_page) on_resize();
	id = setTimeout(loop, 1000);
};

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	music();
	id = setTimeout(loop, 1000);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	music();
	clearTimeout(id);
	id = null;
	i  = 0;
};

const cover = [
	obj([ img("cover_0"), img("cover_border_0") ]),
	obj([ img("cover_1"), img("cover_border_1") ]),
	obj([ img("cover_2"), img("cover_border_2") ]),
	obj([ img("cover_3"), img("cover_border_3") ])
];

let cover_i = 0;

const start = _ => {
	if (++cover_i === cover.length) {
	    on_click  = click_page;
		start_audio();	
	} else {
	    on_click  = null;
		setTimeout(start, 80);
	}
    on_resize();
};

const stop = _ => {
	if (--cover_i === 0) {
	    on_click = click_page;
		stop_audio();	
	} else {
	    on_click = null;
		setTimeout(stop, 80);
	}
    on_resize();
};

const click_page = _ => {
	if (window.stop_audio === null) {
	    if (click(back)) {
			if (window.stop_audio !== null) stop_audio();
			return run_page("home"); 
		}
	    if (click(volume)) return run_volume();
		if (click(cover[0])) {
			on_click = null;
			start();
		}
	} else {
		stop();
	}
	on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw(green);
	draw(scenes[i]);
	if (window.stop_audio === null) {
	    draw(back);
	    draw(volume);
	}
	if (cover_i !== cover.length) {
		draw(cover[cover_i]);
	}
};

const run = _ => {
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
