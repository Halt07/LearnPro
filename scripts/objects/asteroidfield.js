// --------------------------------------------------------------
//
// Creates an AsteroidField object, with functions for managing state.
//
// spec = {
//    imageSrc: ,   // Web server location of the image
//    manager: ,  //particle manager
// }
//
// --------------------------------------------------------------
MyGame.objects.AsteroidField = function(spec) {
    'use strict';

    let nextName = 1;
    let imageReady = false;
    let image = new Image();
    let asteroids = {};
    let info = undefined;

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function updateRotation(a) {
        if(a.size.width === 100){
            a.rotation -= a.speed / 50 / (a.size.width);
        }
        else if(a.size.width === 75){
            a.rotation -= a.speed / 50 / a.size.width;
        }
        else{
            a.rotation -= a.speed / 50 / a.size.width;
        }
    }

    function setInfo(inf){
        info = inf;
    }

    function refreshField(num){
        nextName = 1;
        for(let i = 0; i < num; i++){
            asteroids[nextName++] = create({x: MyGame.graphics.canvas.width, y: MyGame.graphics.canvas.height},100);
        }
    }

    refreshField(1); //Begin with 1 Asteroid in the field(level 1)

    function create(center, size) {
        let a = {
            center: { x: center.x, y: center.y },
            size: { width: size, height: size },
            direction: Random.nextCircleVector(),
            speed: Random.nextGaussian(20, 4), // pixels per second
            rotation: 0,
        };
        return a;
    }

    function destroy(index){
        spec.manager.createExplosion({x: asteroids[index].center.x, y: asteroids[index].center.y});
        astExpSound();
        if(asteroids[index].size.width === 100){//Large Asteroid breaks into 3 Medium
            for( let i = 0; i < 3; i++){
                asteroids[nextName++] = create({x: asteroids[index].center.x, y: asteroids[index].center.y },75);
            }
            info.increaseScore(500);
        }
        else if(asteroids[index].size.width === 75){//Medium Asteroid breaks into 4 Small
            for( let i = 0; i < 4; i++){
                asteroids[nextName++] = create({x: asteroids[index].center.x, y: asteroids[index].center.y },50);
            }
            info.increaseScore(800);
        }
        else{
            info.increaseScore(1000);
        }
        //Original Asteroid hit is destroyed
        delete asteroids[index];
    }

    function update(elapsedTime) {
        Object.getOwnPropertyNames(asteroids).forEach(value => {
            let ast = asteroids[value];

            move(elapsedTime, ast);

            updateRotation(ast)
        });
    }

    function move(elapsedTime, a) {
        a.center.x += (a.speed * a.direction.x)/(a.size.width/2);
        a.center.y += (a.speed * a.direction.y)/(a.size.width/2);

        if (a.center.x < 0){
            a.center.x = MyGame.graphics.canvas.width;
        }
        else if(a.center.x > MyGame.graphics.canvas.width){
            a.center.x = 0;
        }
        if (a.center.y < 0){
            a.center.y = MyGame.graphics.canvas.height;
        }
        else if(a.center.y > MyGame.graphics.canvas.height){
            a.center.y = 0;
        }
    }

    function render(){
        if (imageReady) {
            Object.getOwnPropertyNames(asteroids).forEach(value => {
                let ast = asteroids[value];
                MyGame.graphics.drawTexture(image,ast.center, ast.rotation, ast.size);
            });
        }
    }

    function checkCollisions(obj){
        let collision = false;
        Object.getOwnPropertyNames(asteroids).forEach(value => {
            let ast = asteroids[value];
            let dist = Math.sqrt(Math.pow((obj.center.x - ast.center.x), 2) + Math.pow((obj.center.y - ast.center.y), 2))
            if((obj.size.width/2) + (ast.size.width/2) > dist){
                collision = true;
                if(obj.image.src.includes('assets/fire.png')){ // missile
                    destroy(value);
                    return collision;
                }
                else{
                    return collision;
                }
            }
        });
        return collision;
    }

    let api = {
        update: update,
        render: render,
        setInfo: setInfo,
        refreshField: refreshField,
        checkCollisions: checkCollisions,
        get asteroids() { return asteroids; }
    };

    return api;
}
