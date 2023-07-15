import c_img         from "../common/img.js";
import c_toggle      from "../common/toggle.js";
import c_tone        from "../common/tone.js";
import c_start_group from "../common/start_group.js";
import c_seq         from "../common/seq.js";
import run_volume    from "../volume/page.js";

const bf    = 90;
const bin   = bf * Math.pow(PHI, -7);
const dur   = 1000;
const group = new c_start_group();

const start_audio = _ => {
	window.start_audio = null;
	window.stop_audio  = stop_audio;
	start(group);
};

const stop_audio = _ => {
	window.start_audio = start_audio;
	window.stop_audio  = null;
	stop(group);
};

let img = n => new c_img("./bubble/images/" + n + ".png");

const borders       = img("borders");
const back          = img("back");
const volume        = img("volume");
const audio_blue    = img("audio");
const audio_yellow  = audio_blue.clone_yellow();

const audio = new c_toggle(audio_blue, audio_yellow, null, start_audio, stop_audio);

const bubble_border = [];
const bubble_blue   = [];
const bubble_yellow = [];
for (let i = 0; i < 4; ++i) {
	bubble_border.push(img("border_" + i));
	bubble_blue.push(img("blue_" + i));
	bubble_yellow.push(bubble_blue[i].clone_yellow());
}
let bubble_n  = 0;
let bubble_i  = null;
let bubble_id = null;

const draw_bubble = _ => {
	if (bubble_n === 0) {
		draw(bubble_blue[0]);
		if (bubble_i !== null) {
			draw(bubble_yellow[bubble_i]);
			draw(bubble_border[bubble_i]);
		}
	} else {
		if (bubble_i === null) draw(bubble_yellow[0]);
		else {
			draw(bubble_blue[0]);
			draw(bubble_yellow[bubble_i]);
			draw(bubble_border[bubble_i]);
		}
	}
	draw(bubble_border[0]);
};

const next_speed = 100;

const bubble_next = _ => {
	if (bubble_n === 0) {
		if (++bubble_i === bubble_blue.length) {
			bubble_i  = null;
			bubble_id = null;
			bubble_n  = 1;
		} else {
			bubble_id = setTimeout(bubble_next, next_speed);
		}
	} else {
		if (--bubble_i === 0) {
			bubble_i  = null;
			bubble_id = null;
			bubble_n  = 0;
		} else {
			bubble_id = setTimeout(bubble_next, next_speed);
		}
	}
	on_resize();
};

const click_bubble = _ => {
	if (bubble_i === null && click(bubble_blue[0])) {
		bubble_i = bubble_n === 0 ? 1 : bubble_blue.length - 1;
		bubble_id = setTimeout(bubble_next, next_speed);
		return true;
	} else return false;
};




const draw_objs = _ => {
	draw_bubble();
};

const click_objs = _ => {
	return click_bubble();
};




let start_external_audio = null;

const click_page = _ => {
    if (click(back)) return run_page("home"); 
	else start_external_audio = null;
    if (click(volume)) run_volume();
	if (click(audio) || click_objs()) on_resize();
};

const draw_page = _ => {
	draw(bg_green);
	draw_objs();
    draw(back);
    draw(volume);
	draw(audio);
    draw(borders);
};

const run = _ => {
    if (window.stop_audio !== null && window.stop_audio !== stop_audio) {
		window.stop_audio();
		start_external_audio = window.start_audio;
	}
	audio.on = window.stop_audio !== null;
    on_resize = draw_page;
    on_click  = click_page;
    on_resize();
};

export { run }
