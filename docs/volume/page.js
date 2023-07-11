import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";

const back     = new c_img("./volume/images/back.png");
const borders  = new c_img("./volume/images/borders.png");
const blues    = [];
const yellows  = [];
const digits   = [];

for (let i = 0; i < 9; ++i) {
    blues.push(new c_img("./volume/images/" + i + ".png"));
    yellows.push(blues[i].clone_yellow());
    digits.push(0);
}

let save_draw      = null;
let save_click     = null;

let v = get('volume', Math.pow(2, -5));
for (let i = 0; i < digits.length; ++i) {
	if (v >= .5) {
		digits[i] = 1;
		v -= .5;
	}
	v *= 2;
}

const set_vol_by_digits = _ => {
	let v = 0;
    if (digits.every(n => n === 1)) {
        v = 1;
    } else {
    	for (let i = 0; i < digits.length; ++i) {
    		if (digits[i] === 1) v += Math.pow(2, -(i + 1));
    	}
    }
	gain.gain.setTargetAtTime(v, audio.currentTime, .05);
	set('volume', v);
};

const click_page = _ => {
    if (click(back)) {
        on_resize  = save_draw;
        on_click   = save_click;
        on_resize();
    } else {
        for (let i = 0; i < digits.length; ++i) {
            if (yellows[i].click()) {
				if (digits[i] === 0) {
					digits[i] = 1;
					//for (let j = i + 1; j < digits.length; ++j) digits[j] = 0;
					set_vol_by_digits();
				} else {
					digits[i] = 0;
					//for (let j = i + 1; j < digits.length; ++j) digits[j] = 1;
					set_vol_by_digits();
				}
		        on_resize();
				return;
            }
        }
    }
};

const draw_page = _ => {
    draw(bg_green);
    draw(back);
    for (let i = 0; i < digits.length; ++i) {
        if (digits[i] === 0) draw(blues[i]);
        else draw(yellows[i]);
    }
    draw(borders);
};

const run = _ => {
    save_draw  = on_resize;
    save_click = on_click;
    on_resize  = draw_page;
    on_click   = click_page;
    on_resize();
};

export default run;
