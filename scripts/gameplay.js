MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input, systems) {
    'use strict';
    
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let highscores = [];
    let timer = lastTimeStamp;

    if (typeof(Storage) !== "undefined") {
        if (localStorage.one) {
            updateHighScores();
        }
        else {
            localStorage.one = 10000;
            localStorage.two = 9000;
            localStorage.three = 8000;
            localStorage.four = 7000;
            localStorage.five = 6000;
        }
    }
    highscores[0] = parseInt(localStorage.one);
    highscores[1] = parseInt(localStorage.two);
    highscores[2] = parseInt(localStorage.three);
    highscores[3] = parseInt(localStorage.four);
    highscores[4] = parseInt(localStorage.five);

    let myKeyboard = input.Keyboard();
    let manager = systems.ParticleManager(systems, renderer, graphics);
    
    initializeAudio();

    loadBackgroundMusic();


    let fishRender = [];
    fishRender[0] = createFishRenderer("ray");
    fishRender[1] = createFishRenderer("dolphin");

    let Fishies = [];
    Fishies[0] = createFish("ray");
    Fishies[1] = createFish("dolphin");

    let myShip = objects.Ship({
        imageSrc: 'assets/locust.png',
        center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
        size: { width: 50, height: 50 },
        moveRate: 0,    // pixels per millisecond
        manager: manager,
    });

    let myInfo = objects.Info({
        ship: myShip,
        score: 0,
        level: 1,
    });

    function createFish(type){
        switch(type){
            case "ray":
                return objects.Fish({
                    imageSrc: 'assets/scarab.png',
                    center: { x: -100, y: -100 },
                    size: { width: 165, height: 68 },
                    moveRate: 1,    // pixels per millisecond
                    manager: manager
                });
            case "dolphin":
                return objects.Fish({
                    imageSrc: 'assets/flea.png',
                    center: { x: -100, y: -100 },
                    size: { width: 100, height: 66 },
                    moveRate: 2,    // pixels per millisecond
                    manager: manager
                });
            case "red":
                return objects.Fish({
                    imageSrc: 'assets/flea.png',
                    center: { x: -100, y: -100 },
                    size: { width: 60, height: 54 },
                    moveRate: 1.5,    // pixels per millisecond
                    manager: manager
                });
            case "blue":
                return objects.Fish({
                    imageSrc: 'assets/flea.png',
                    center: { x: -100, y: -100 },
                    size: { width: 60, height: 54 },
                    moveRate: 1.5,    // pixels per millisecond
                    manager: manager
                });
            case "yellow":
                return objects.Fish({
                    imageSrc: 'assets/flea.png',
                    center: { x: -100, y: -100 },
                    size: { width: 60, height: 54 },
                    moveRate: 1.5,    // pixels per millisecond
                    manager: manager
                });
            default:
                return objects.Fish({
                    imageSrc: 'assets/flea.png',
                    center: { x: -100, y: -100 },
                    size: { width: 60, height: 54 },
                    moveRate: 1.5,    // pixels per millisecond
                    manager: manager
                });
        }
    }

    function createFishRenderer(type){
        switch(type){
            case "ray":
                return renderer.AnimatedModel({
                    spriteSheet: 'assets/raysprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            case "dolphin":
                return renderer.AnimatedModel({
                    spriteSheet: 'assets/dolphinsprites.png',
                    spriteCount: 5,
                    spriteTime: [150, 150, 150, 150, 150],   // ms per frame
                }, graphics);
            case "red":
                return renderer.AnimatedModel({
                    spriteSheet: 'assets/raysprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            case "blue":
                return renderer.AnimatedModel({
                    spriteSheet: 'assets/raysprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            case "yellow":
                return renderer.AnimatedModel({
                    spriteSheet: 'assets/raysprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            default:
                return renderer.AnimatedModel({
                    spriteSheet: 'assets/raysprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
        }
    }

    function setUp(){
        myKeyboard = input.Keyboard();
        manager = systems.ParticleManager(systems, renderer, graphics);
        
        initializeAudio();

        loadBackgroundMusic();

        Fishies[0] = createFish("ray");
        Fishies[1] = createFish("dolphin");

        myShip = objects.Ship({
            imageSrc: 'assets/locust.png',
            center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
            size: { width: 50, height: 50 },
            moveRate: 0,    // pixels per millisecond
            manager: manager,
        });

        myInfo = objects.Info({
            ship: myShip,
            score: 0,
            level: 1,
        });
    }


    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        timer += elapsedTime;
        
        myShip.update(elapsedTime);
        manager.update(elapsedTime);
        for(let i = 0; i< fishRender.length; i++){
            Fishies[i].update(elapsedTime);
            fishRender[i].update(elapsedTime);
        }
        //TODO: Change End Game State
        if(false){
            myShip.decreaseLives();
            if(myShip.lives==0){
                gameover();
            }
        }
        //TODO: Change LevelUp State
        if(false){
            myInfo.increaseLevel();
            playSound('LevelUp');
        }
        myInfo.updateText();
        if(myInfo.score > 10000 + myInfo.lastLife){
            myShip.increaseLives();
            myInfo.setLastLifeIncrease(10000);
        }
    }

    function render() {
        graphics.clear();

        manager.render();
        
        renderer.Ship.render(myShip);
        
        for(let i = 0; i < fishRender.length; i++){
            fishRender[i].render(Fishies[i]);
        }
        
        myInfo.render();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function gameover(){
        highscores[highscores.length] = myInfo.score;
        highscores.sort(function (x, y) { return y - x; });
        highscores = highscores.slice(0,5);
        localStorage.one = highscores[0];
        localStorage.two = highscores[1];
        localStorage.three = highscores[2];
        localStorage.four = highscores[3];
        localStorage.five = highscores[4];
        updateHighScores();
        stopAllSounds();
        setUp();
        initialize();
        alert('Game Over!');
        cancelNextRequest = true;
        game.showScreen('high-scores');
    }

    function updateHighScores(){
        document.getElementById('1').innerHTML = localStorage.one;
        document.getElementById('2').innerHTML = localStorage.two;
        document.getElementById('3').innerHTML = localStorage.three;
        document.getElementById('4').innerHTML = localStorage.four;
        document.getElementById('5').innerHTML = localStorage.five;
    }

    function initialize() {
        myKeyboard.register('z', myShip.hyperspace);
        myKeyboard.register('w', myShip.accelerate);
        myKeyboard.register('a', myShip.turnLeft);
        myKeyboard.register('d', myShip.turnRight);
        myKeyboard.register('ArrowUp', myShip.accelerate);
        myKeyboard.register('ArrowLeft', myShip.turnLeft);
        myKeyboard.register('ArrowRight', myShip.turnRight);
        myKeyboard.register('Escape', function() {
            if (confirm("Do you want to end this game?")) {
                updateHighScores();
                setUp();
                initialize();
                document.getElementById('id-new-game').innerHTML = "New&nbsp;Game";
            }
            else{
                myKeyboard = input.Keyboard();
                initialize();
                document.getElementById('id-new-game').innerHTML = "Continue&nbsp;Game";
            }
            
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    graphics.canvas.width = window.innerWidth;
    graphics.canvas.height = window.innerHeight;
    window.addEventListener('resize', function(){graphics.canvas.width = window.innerWidth; graphics.canvas.height = window.innerHeight;}, true);
    window.addEventListener('keyup', function(e){
        if(e.key === 'Escape'){
            game.showScreen('main-menu');
        }
    });
    
    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.systems));
