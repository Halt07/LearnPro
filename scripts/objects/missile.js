// --------------------------------------------------------------
//
// Creates an AsteroidField object, with functions for managing state.
//
// spec = {
//    imageSrc: ,   // Web server location of the image
//    alive: 0
//    lifeTime: //number seconds
// }
//
// --------------------------------------------------------------
MyGame.objects.Missile = function(spec) {
    'use strict';

    let imageReady = false;
    let image = new Image();

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function update(elapsedTime) {
        move(elapsedTime);
        spec.alive += elapsedTime;
    }

    function move(elapsedTime) {
        spec.center.x += (spec.speed * spec.direction.x);
        spec.center.y += (spec.speed * spec.direction.y);

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

    function render(){
        if (imageReady) {
            MyGame.graphics.drawTexture(image,spec.center, spec.rotation, spec.size);
        }
    }

    function checkCollisions(obj){
        Object.getOwnPropertyNames(asteroids).forEach(value => {
            let ast = asteroids[value];
            let dist = Math.sqrt(Math.pow((obj.center.x - ast.center.x), 2) + Math.pow((obj.center.y - ast.center.y), 2))
            if((obj.size.width/2) + (ast.size.width/2) > dist){
                if(obj instanceof MyGame.objects.Ship){
                    return true
                }
                else if(obj instanceof MyGame.objects.Missile){
                    destroy(value);
                    return true;
                }
                else{
                    return true;
                }
            }
        });
        return false;
    }

    let api = {
        update: update,
        render: render,
        checkCollisions: checkCollisions,
        get alive() { return spec.alive; },
        get lifeTime() { return spec.lifeTime; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get image() { return image;}

    };

    return api;
}
