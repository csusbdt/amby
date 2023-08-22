import c_img      from "../common/img.js";
import c_toggle   from "../common/toggle.js";
import run_volume from "../volume/page.js";

const borders      = new c_img("./home/images/borders.png");
const volume       = new c_img("./home/images/volume.png" );
const rings        = new c_img("./home/images/rings.png"  );
const blob         = new c_img("./home/images/blob.png"   );
const ufo          = new c_img("./home/images/ufo.png"    );
const tones        = new c_img("./home/images/tones.png"  );
const block        = new c_img("./home/images/block.png"  );
const rpm          = new c_img("./home/images/stack.png"  );
const bathysphere  = new c_img("./home/images/circle.png" );
const bathysphere1 = new c_img("./home/images/circle1.png");
const bathysphere1_border = new c_img("./home/images/circle1_border.png");
const bathysphere2 = new c_img("./home/images/circle2.png");
const bathysphere2_border = new c_img("./home/images/circle2_border.png");
const train        = new c_img("./home/images/man.png"    );
const concert      = new c_img("./home/images/concert.png");

const audio_blue   = new c_img("./home/images/audio.png");
const audio_yellow = audio_blue.clone_yellow();
const audio        = new c_toggle(
    audio_blue, audio_yellow, null, 
    _ => window.start_audio(), _ => window.stop_audio()
);

const click_page = _ => {
    if (click(rings      )) return goto_page("rings"      );
    if (click(blob       )) return goto_page("blob"       );
    if (click(ufo        )) return goto_page("ufo"        );
    if (click(tones      )) return goto_page("bubble"     );
    if (click(block      )) return goto_page("block"      );
    if (click(rpm        )) return goto_page("bloby"      );
    if (click(bathysphere)) return goto_page("bathysphere");
    if (click(bathysphere1) || click(bathysphere1_border)) return goto_page("bathysphere3");
    if (click(bathysphere2) || click(bathysphere2_border)) return goto_page("bathysphere2");
    if (click(train      )) return location = "./scripts/";
    if (click(concert    )) return goto_page("wheel"      );
    if (click(volume     )) return run_volume();
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
    draw(block);
    draw(rpm);
    draw(bathysphere);
    draw(bathysphere1);
    draw(bathysphere1_border);
    draw(bathysphere2);
    draw(bathysphere2_border);
    draw(train);
    draw(concert);
    draw(borders);
};

const run = _ => {
    on_resize = draw_page;
    on_click = click_page;
    audio.on = window.stop_audio !== null;
    on_resize();
};

export { run }
