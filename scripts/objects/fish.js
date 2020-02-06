// --------------------------------------------------------------
//
// Creates a Fish object, with functions for managing state.
//
// spec = {
//    imageSrc: ,   // Web server location of the image
//    center: { x: , y: },
//    size: { width: , height: }
// }
//
// --------------------------------------------------------------
MyGame.objects.Fish = function(spec) {
    'use strict';

    let momentum = 1;

    let maxspeed = 1;
    if (spec.size.width === 75){
        maxspeed = 0.5;
    }
    
    let alive = false;
    let respawnTimer = 0;

    let imageReady = false;
    let image = new Image();

    let lives = 5;

    let info = undefined;

    let accTimer = 0;

    let activeBubble = Random.nextRange(750,1500);
    let bubbleTimer = 0;
    let rotation = 0;

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function setInfo(inf){
        info = inf;
    }

    function update(elapsedTime) {
        if(alive){        
            bubbleTimer += elapsedTime;
            accTimer += elapsedTime;

            if(bubbleTimer > activeBubble){ //Bubble at most once per 1.5 seconds
                activeBubble = Random.nextRange(1500,3000);
                bubbleTimer = 0;
                // console.log("blub");
                spec.manager.createBubble({x: spec.center.x - 24, y: spec.center.y});
            }
            move(elapsedTime);
            
        }
        else{
            respawnTimer += elapsedTime;
            if(respawnTimer > Random.nextRange(7000,15000)){ //Respawn somewhere between 7 and 15 seconds
                respawn();
            }
        }
    }

    function move(elapsedTime) {
        spec.center.x -= Math.abs(spec.moveRate) * momentum;

        if (spec.center.x < 0){
            spec.center.x = MyGame.graphics.canvas.width;
        }
        else if(spec.center.x > MyGame.graphics.canvas.width){
            spec.center.x = 0;
        }
    }

    function respawn(){
        if(spec.size.width === 75){
            playSound('AlienHive');
        }
        else{
        }
        respawnTimer = 0;
        lives = 5;
        alive = true;
        spec.center.x = Random.nextRange(0,MyGame.graphics.canvas.width);
        spec.center.y = Random.nextRange(0,MyGame.graphics.canvas.height);
    };

    function decreaseLives(){
        lives--;
        if(lives < 1){
            alive = false;
            spec.manager.createShipExplosion({x: spec.center.x, y: spec.center.y});
            
            if (spec.size.width === 75){
                stopSound('AlienHive');
                info.increaseScore(1000);
            }
            else{
                info.increaseScore(1500);
            }
            spec.center.x = -100;
            spec.center.y = -100;
        }
    }

    let api = {
        update: update,
        decreaseLives: decreaseLives,
        setInfo: setInfo,
        get imageReady() { return imageReady; },
        get momentum() { return momentum; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image() { return image; },
        get alive() { return alive; },
        get lives() { return lives; },
        get rotation() {return rotation; },
    };

    playSound('Splash');
    return api;
}
