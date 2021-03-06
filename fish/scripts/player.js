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
        MyGame.sounds['Teleport'] = loadSound('fish/assets/audio/teleport.mp3');
        MyGame.sounds['Explosion'] = loadSound('fish/assets/audio/explode.wav');
        MyGame.sounds['LevelUp'] = loadSound('fish/assets/audio/Jingle_Achievement_00.mp3');
        MyGame.sounds['AlienHive'] = loadSound('fish/assets/audio/Ambience_AlienHive_00.mp3');
        MyGame.sounds['AlienHive'].loop = true;
        MyGame.sounds['Splash'] = loadSound('fish/assets/audio/Bubbles.wav');
        
        MyGame.sounds['Background'] = loadSound('fish/assets/audio/dream_island.ogg');
        MyGame.sounds['Background'].loop = true;
        MyGame.sounds['Background'].autoplay = true;
        MyGame.sounds['Background'].preload = 'auto';
        
        let isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
        let isFirefox = /firefox/.test(navigator.userAgent.toLowerCase());
    
        
        if(isChrome){
            MyGame.sounds['Teleport'].volume = 5 / 100;
            MyGame.sounds['Explosion'].volume = 15 / 100;
            MyGame.sounds['LevelUp'].volume = 8 / 100;
            MyGame.sounds['AlienHive'].volume = 50 / 100;
            MyGame.sounds['Splash'].volume = 4 / 100;
            changeVolume(0.75);
        }
        else if(isFirefox){
            MyGame.sounds['Teleport'].volume = 40 / 100;
            MyGame.sounds['Explosion'].volume = 40 / 100;
            MyGame.sounds['LevelUp'].volume = 35 / 100;
            MyGame.sounds['AlienHive'].volume = 75 / 100;
            MyGame.sounds['Splash'].volume = 30 / 100;
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
    stopSound('Teleport');
    stopSound('Explosion');
    stopSound('LevelUp');
    stopSound('AlienHive');
    stopSound('Splash');
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

//Plays Laser sound, which requires faster replay time
function laserSound(){
    let isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    let isFirefox = /firefox/.test(navigator.userAgent.toLowerCase());
    
    let sound = new Audio();
    sound.src = 'fish/assets/audio/Laser_09.mp3';
    if(isChrome){
        sound.volume = 3 / 100;
    }
    else if(isFirefox){
        sound.volume = 40 / 100;
    }
    sound.play();
}

//Plays Asteroid Explosion sound, which may require faster replay time
function astExpSound(){
    let isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    let isFirefox = /firefox/.test(navigator.userAgent.toLowerCase());
    let sound = new Audio();
    sound.src = 'fish/assets/audio/explosion04.wav';
    if(isChrome){
        sound.volume = 20 / 100;
    }
    else if(isFirefox){
        sound.volume = 65 / 100;
    }
    sound.play();
}

//------------------------------------------------------------------
//
// Allow the music volume to be changed
//
//------------------------------------------------------------------
function changeVolume(value) {
    MyGame.sounds['Background'].volume = value / 100;
}
