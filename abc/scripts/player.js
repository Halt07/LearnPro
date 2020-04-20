//------------------------------------------------------------------
//
// This function performs the one-time game initialization.
//
//------------------------------------------------------------------
function initializeAudio() {
    'use strict';

        

    function loadSound(source, label) {
        let sound = new Audio();
        sound.src = source;
        return sound;
    }

    function loadAudio() {
        MyGame.sounds = {}
        
        MyGame.sounds['Background'] = loadSound('abc/assets/audio/FlyingHigh.ogg');
        MyGame.sounds['Background'].loop = true;
        MyGame.sounds['Background'].autoplay = true;
        MyGame.sounds['Background'].preload = 'auto';
        
        let isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
        let isFirefox = /firefox/.test(navigator.userAgent.toLowerCase());
    
        
        if(isChrome){
            changeVolume(3);
        }
        else if(isFirefox){
            changeVolume(20);
        }
        loadBackgroundMusic();
    }

    console.log('initializing Audio...');

    loadAudio();
}

function loadBackgroundMusic(){
    MyGame.sounds['Background'].load();
    MyGame.sounds['Background'].currentTime = 0;
}

function playBackground(){
    if(MyGame.sounds['Background'].paused)
        playSound('Background');
}

//------------------------------------------------------------------
//
// Pauses the specified audio
//
//------------------------------------------------------------------
function pauseSound(whichSound) {
    MyGame.sounds[whichSound].pause();

    console.log(whichSound + ' paused');
}

//------------------------------------------------------------------
//
// Stops the specified audio
//
//------------------------------------------------------------------
function stopSound(whichSound) {
    MyGame.sounds[whichSound].pause();
    MyGame.sounds[whichSound].currentTime = 0;

    console.log(whichSound + ' stopped');
}

//------------------------------------------------------------------
//
// Stops all audio except Background music
//
//------------------------------------------------------------------
function stopAllSounds() {
}

//------------------------------------------------------------------
//
// Plays the specified audio
//
//------------------------------------------------------------------
function playSound(whichSound) {
    console.log('playing ' + whichSound);
    // if(MyGame.sounds[whichSound].readystate >= 2)
        MyGame.sounds[whichSound].play();
}


//------------------------------------------------------------------
//
// Allow the music volume to be changed
//
//------------------------------------------------------------------
function changeVolume(value) {
    MyGame.sounds['Background'].volume = value / 100;
}
