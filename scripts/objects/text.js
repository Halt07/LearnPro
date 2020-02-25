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

    function readText(){
        var speech = new SpeechSynthesisUtterance();

        speech.text = spec.text;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        let l = window.speechSynthesis.getVoices();
        if(localStorage.LearnProLang == "fr"){
            for (let i=0;i<l.length;i++){
                if(l[i].name == "Google français"){
                    speech.voice = l[i];
                }
            }
        }
        else if(localStorage.LearnProLang == "it"){
            for (let i=0;i<l.length;i++){
                if(l[i].name == "Google italiano"){
                    speech.voice = l[i];
                }
            }
        }
        else if(localStorage.LearnProLang == "es"){
            for (let i=0;i<l.length;i++){
                if(l[i].name == "Google español"){
                    speech.voice = l[i];
                }
            }
        }
        else{
            for (let i=0;i<l.length;i++){
                if(l[i].name == "Google US English"){
                    speech.voice = l[i];
                }
            }
        }

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
