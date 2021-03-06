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

    function setPosition(pos){
        spec.position = pos;
    }

    function updateRotation(howMuch) {
        rotation += howMuch;
    }

    function colorBlink(newColor, time){
        let oldStyle = spec.fillStyle;
        spec.fillStyle = newColor;
        setTimeout(function(){spec.fillStyle=oldStyle;},time);
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
            if(speech.voice == undefined)
                speech.voice = l.find(voice => voice.lang == "fr-FR");
        }
        else if(language == "it"){
            speech.voice = l.find(voice => voice.name == "Google italiano");
            if(speech.voice == undefined)
                speech.voice = l.find(voice => voice.lang == "it-IT");
        }
        else if(language == "es"){
            speech.voice = l.find(voice => voice.name == "Google español");
            if(speech.voice == undefined)
                speech.voice = l.find(voice => voice.lang == "es-ES");
        }
        else if(language == "en"){
            speech.voice = l.find(voice => voice.name == "Google US English");
            if(speech.voice == undefined)
                speech.voice = l.find(voice => voice.lang == "en-US");
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
        colorBlink: colorBlink,
        setPosition: setPosition,
        get rotation() { return rotation; },
        get position() { return spec.position; },
        get text() { return spec.text; },
        get font() { return spec.font; },
        get fillStyle() { return spec.fillStyle; },
        get strokeStyle() { return spec.strokeStyle; }
    };

    return api;
}
