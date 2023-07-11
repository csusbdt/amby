import c_img      from "../common/img.js";
import c_toggle   from "../common/toggle.js";
import run_volume from "../volume/page.js";

const borders      = new c_img("./home/images/borders.png");
const volume       = new c_img("./home/images/volume.png");
const rings        = new c_img("./home/images/rings.png");
const blob         = new c_img("./home/images/blob.png");

const audio_blue   = new c_img("./home/images/audio.png");
const audio_yellow = audio_blue.clone_yellow();
const audio        = new c_toggle(audio_blue, audio_yellow, null, _ => window.start_audio(), _ => window.stop_audio());

const click_page = _ => {
    if (click(rings)) return run_page("rings");
    if (click(blob)) return run_page("blob");
    if (click(volume)) run_volume();
    click(audio);
    on_resize();
};

const draw_page = _ => {
    draw(bg_green);
    draw(audio);
    draw(volume);
    draw(rings);
    draw(blob);
    draw(borders);
};

const run = _ => {
    on_resize = draw_page;
    on_click = click_page;
    audio.on = window.stop_audio !== null;
    on_resize();
};

export { run }
