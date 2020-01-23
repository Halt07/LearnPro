// --------------------------------------------------------------
//
// Creates a Ship object, with functions for managing state.
//
// spec = {
//    imageSrc: ,   // Web server location of the image
//    center: { x: , y: },
//    size: { width: , height: }
// }
//
// --------------------------------------------------------------
MyGame.objects.Ship = function(spec) {
    'use strict';

    let rotation = 0.1;
    let momentum = 0;

    let imageReady = false;
    let image = new Image();

    let lives = 3;

    let hyperSpaceReady = false;
    let hyperTimer = 0;

    let photonTorpedoes = {};
    let torpedoName = 1;
    let activeFire = false;
    let fireTimer = 0;

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function turnLeft(elapsedTime) {
        rotation -= (Math.PI / 900 * elapsedTime);
    }

    function turnRight(elapsedTime) {
        rotation += (Math.PI / 900 * elapsedTime);
    }

    function accelerate(elapsedTime) {
        momentum = (rotation - Math.PI / 2);

        spec.moveRate += (1/10) * Math.cos(momentum);
        if (spec.moveRate > 2){
            spec.moveRate = 2;
        }
        else if (spec.moveRate < -2){
            spec.moveRate = -2;
        }
        spec.manager.createBubble({x: spec.center.x, y: spec.center.y, rotation: rotation});
    }

    function update(elapsedTime) {
        hyperTimer += elapsedTime;
        fireTimer += elapsedTime;
        if (lives > 0){
            move(elapsedTime);
        }
        if(hyperTimer > 10000 && !hyperSpaceReady){ //Hyper jump available every 10 seconds
            hyperSpaceReady = true;
            console.log('Hyperspace Ready')
        }
        if(fireTimer > 333 && activeFire){ //Fire at most thrice per second
            activeFire = false;
        }

        let removeMe = [];
        Object.getOwnPropertyNames(photonTorpedoes).forEach(value => {
            let torpedo = photonTorpedoes[value];
            torpedo.update(elapsedTime);
            if((spec.largeFish.alive && spec.largeFish.checkCollisions(torpedo)) || (spec.smallFish.alive && spec.smallFish.checkCollisions(torpedo))){
                removeMe.push(value);
            }
            if (torpedo.alive > torpedo.lifeTime) {
                removeMe.push(value);
            }
        });
        
        for (let torpedo = 0; torpedo < removeMe.length; torpedo++) {
            delete photonTorpedoes[removeMe[torpedo]];
        }
    }

    function move(elapsedTime) {
        spec.center.x += Math.abs(spec.moveRate) * Math.cos(momentum);
        spec.center.y += Math.abs(spec.moveRate) * Math.sin(momentum);

        if (spec.center.x < 0){
            spec.center.x = MyGame.graphics.canvas.width;
        }
        else if(spec.center.x > MyGame.graphics.canvas.width){
            spec.center.x = 0;
        }
        if (spec.center.y < 0){
            spec.center.y = MyGame.graphics.canvas.height;
        }
        else if(spec.center.y > MyGame.graphics.canvas.height){
            spec.center.y = 0;
        }
    }

    function hyperspace() {
        if(hyperSpaceReady){
            spec.manager.createHyperJump({x: spec.center.x, y: spec.center.y});
            playSound('Teleport');
            //Check for safe spot to respawn
            let randx = Random.nextRange(0, MyGame.graphics.canvas.width);
            let randy = Random.nextRange(0, MyGame.graphics.canvas.height);

            moveTo({x: randx, y: randy});
            spec.moveRate = 0;
            //Reset HyperSpace Timer
            hyperTimer = 0;
            hyperSpaceReady = false;
            spec.manager.createHyperJump({x: spec.center.x, y: spec.center.y});
        
            console.log('Hyperspace Engaged');
        }
    }

    function moveTo(pos) {
        spec.center.x = pos.x;
        spec.center.y = pos.y;
    }

    function decreaseLives(){
        lives--;

        spec.manager.createShipExplosion({x: spec.center.x, y: spec.center.y});
        playSound('Explosion');
        //Check for safe spot to respawn
        let randx = Random.nextRange(0, MyGame.graphics.canvas.width);
        let randy = Random.nextRange(0, MyGame.graphics.canvas.height);

        moveTo({x: randx, y: randy});
        spec.moveRate = 0;
    }
    
    function increaseLives(){
        lives++;
    }

    function firePhotonTorpedoes(){
        if(!activeFire){
            activeFire = true;
            fireTimer = 0;
            laserSound();
            console.log('Firing Photon Torpedoes');

            photonTorpedoes[torpedoName++] = MyGame.objects.Missile({
                imageSrc: 'assets/fire.png',
                center: { x: spec.center.x + (Math.cos(rotation-Math.PI/2) * 30), y: spec.center.y + (Math.sin(rotation-Math.PI/2) * 30) },
                size: { width: 15, height: 60 },
                direction: {x: Math.cos(rotation-Math.PI/2), y: Math.sin(rotation-Math.PI/2) },
                speed: 4, // pixels per second
                rotation: rotation,
                lifeTime: 3000, // 3 seconds
                alive: 0,
            });
        }
    }

    let api = {
        update: update,
        turnLeft: turnLeft,
        turnRight: turnRight,
        accelerate: accelerate,
        hyperspace: hyperspace,
        moveTo: moveTo,
        decreaseLives: decreaseLives,
        increaseLives: increaseLives,
        firePhotonTorpedoes: firePhotonTorpedoes,
        get imageReady() { return imageReady; },
        get rotation() { return rotation; },
        get momentum() { return momentum; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get lives() { return lives; },
        get photonTorpedoes() { return photonTorpedoes; },
        get image() { return image;},
        get hyperTimer() { return hyperTimer;}
    };

    return api;
}
