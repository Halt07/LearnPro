// --------------------------------------------------------------
//
// Creates a Text object, with functions for managing state.
//
// spec = {
//    text: ,
//    font: ,
//    fillStyle: ,
//    strokeStyle: ,
//    position: { x: , y: }
// }
//
// --------------------------------------------------------------
MyGame.objects.Text = function(spec) {
    'use strict';

    let rotation = 0;

    function updateText(text){
        spec.text = text;
    }

    function updateRotation(howMuch) {
        rotation += howMuch;
    }

    function readText(language){
        var speech = new SpeechSynthesisUtterance();

        speech.text = spec.text;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        let l = window.speechSynthesis.getVoices();
        if(language == "fr"){
            speech.voice = l.find(voice => voice.name == "Google français");
        }
        else if(language == "it"){
            speech.voice = l.find(voice => voice.name == "Google italiano");
        }
        else if(language == "es"){
            speech.voice = l.find(voice => voice.name == "Google español");
        }
        else if(language == "en"){
            speech.voice = l.find(voice => voice.name == "Google US English");
        }
        // else{
        //     speech.voice = l.find(voice => voice.default);
        // }

        window.speechSynthesis.speak(speech);
    }

    let api = {
        updateRotation: updateRotation,
        updateText: updateText,
        readText: readText,
        get rotation() { return rotation; },
        get position() { return spec.position; },
        get text() { return spec.text; },
        get font() { return spec.font; },
        get fillStyle() { return spec.fillStyle; },
        get strokeStyle() { return spec.strokeStyle; }
    };

    return api;
}
