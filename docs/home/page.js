import c_img      from "../common/img.js";
import c_toggle   from "../common/toggle.js";
import run_volume from "../volume/page.js";

const borders      = new c_img("./home/images/borders.png");
const volume       = new c_img("./home/images/volume.png");
const rings        = new c_img("./home/images/rings.png");
const blob         = new c_img("./home/images/blob.png");
const ufo          = new c_img("./home/images/ufo.png");
const tones        = new c_img("./home/images/tones.png");
const circle       = new c_img("./home/images/circle.png");
const block        = new c_img("./home/images/block.png");
const stack        = new c_img("./home/images/stack.png");

const audio_blue   = new c_img("./home/images/audio.png");
const audio_yellow = audio_blue.clone_yellow();
const audio        = new c_toggle(audio_blue, audio_yellow, null, _ => window.start_audio(), _ => window.stop_audio());

const click_page = _ => {
    if (click(rings)) return run_page("rings");
    if (click(blob)) return run_page("blob");
    if (click(ufo)) return run_page("ufo");
    if (click(tones)) return run_page("bubble");
    if (click(circle)) return run_page("bloby");
    if (click(block)) return run_page("block");
    if (click(stack)) return run_page("stack");
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
    draw(ufo);
    draw(tones);
    draw(circle);
    draw(block);
    draw(stack);
    draw(borders);
};

const run = _ => {
    on_resize = draw_page;
    on_click = click_page;
    audio.on = window.stop_audio !== null;
    on_resize();
};

export { run }
