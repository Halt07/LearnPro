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
            localStorage.one = 10;
            localStorage.two = 9;
            localStorage.three = 8;
            localStorage.four = 7;
            localStorage.five = 6;
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
    let colors = ["ray", "dolphin", "red", "yellow", "blue", "green", "rainbow"];
    Array.prototype.random = function(){return this[Math.floor(Math.random()*this.length)];};
    let promptColor = colors.random();
    let promptNum = Random.nextRange(1,11);
    let promptAnswer = Random.nextRange(0,3);

    let Fishies = [];
    for(let i = 0; i < promptNum; i++){
        Fishies[i] = {"fish": createFish(promptColor), "render": createFishRenderer(promptColor), };
    }
    for(let i = 0; i < 15-promptNum; i++){ //grand total of 15 fish to maintain consitancy while testing graphics
        let randFish = colors.random(); 
        while(randFish == promptColor){ randFish = colors.random(); } //Assure no duplicates of the target color
        Fishies[promptNum + i] = {"fish": createFish(randFish), "render": createFishRenderer(randFish), };
    }

    let myShip = objects.Ship({
        imageSrc: 'fish/assets/locust.png',
        center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
        size: { width: 50, height: 50 },
        moveRate: 0,    // pixels per millisecond
        manager: manager,
    });

    let myInfo = objects.Info({
        target: promptNum,
        answer: promptAnswer,
        score: 0,
        color: promptColor,
    });

    function createFish(type){
        let fishcenter = { x: graphics.canvas.width, y: -200 };
        var s;
        switch(type){
            case "ray":
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        s = { width: 122, height: 50 };
                        break;
                    default:
                        s = { width: 165, height: 68 };
                }
                return objects.Fish({
                    imageSrc: 'fish/assets/raysprites.png',
                    center: fishcenter,
                    size: s,
                    moveRate: 1.5,    // pixels per millisecond
                    manager: manager
                });
            case "dolphin":
                switch(Math.floor(Math.random()*3)){
                    case 0:
                        s = { width: 122, height: 80 };
                        break;
                    case 1:
                        s = { width: 100, height: 66 };
                        break;
                    default:
                        s = { width: 145, height: 96 };
                }
                return objects.Fish({
                    imageSrc: 'fish/assets/dolphinsprites.png',
                    center: fishcenter,
                    size: s,
                    moveRate: Math.random()+1.75,    // pixels per millisecond
                    manager: manager
                });
            case "red":
                switch(Math.floor(Math.random()*4)){
                    case 0:
                        s = { width: 80, height: 60 };
                        break;
                    case 1:
                        s = { width: 60, height: 50 };
                        break;
                    case 2:
                        s = { width: 80, height: 32 };
                        break;
                    default:
                        s = { width: 100, height: 60 };
                }
                return objects.Fish({
                    imageSrc: 'fish/assets/redfatfishsprites.png',
                    center: fishcenter,
                    size: s,
                    moveRate: Math.random()+1,    // pixels per millisecond
                    manager: manager
                });
            case "blue":
                switch(Math.floor(Math.random()*4)){
                    case 0:
                        s = { width: 80, height: 60 };
                        break;
                    case 1:
                        s = { width: 60, height: 50 };
                        break;
                    case 3:
                        s = { width: 100, height: 40 };
                        break;
                    default:
                        s = { width: 80, height: 32 };
                }
                return objects.Fish({
                    imageSrc: 'fish/assets/bluefatfishsprites.png',
                    center: fishcenter,
                    size: s,
                    moveRate: Math.random()+1,    // pixels per millisecond
                    manager: manager
                });
            case "yellow":
                switch(Math.floor(Math.random()*5)){
                    case 0:
                        s = { width: 80, height: 60 };
                        break;
                    case 1:
                        s = { width: 60, height: 50 };
                        break;
                    case 2:
                        s = { width: 60, height: 40 };
                        break;
                    case 3:
                        s = { width: 100, height: 40 };
                        break;
                    default:
                        s = { width: 100, height: 60 };
                }
                return objects.Fish({
                    imageSrc: 'fish/assets/yellowfatfishsprites.png',
                    center: fishcenter,
                    size: s,
                    moveRate: Math.random()+1,    // pixels per millisecond
                    manager: manager
                });
            case "green":
                switch(Math.floor(Math.random()*4)){
                    case 0:
                        s = { width: 80, height: 60 };
                        break;
                    case 1:
                        s = { width: 60, height: 50 };
                        break;
                    case 3:
                        s = { width: 100, height: 40 };
                        break;
                    default:
                        s = { width: 80, height: 32 };
                }
                return objects.Fish({
                    imageSrc: 'fish/assets/greenfatfishsprites.png',
                    center: fishcenter,
                    size: s,
                    moveRate: Math.random()+1,    // pixels per millisecond
                    manager: manager
                });
            default:
                switch(Math.floor(Math.random()*5)){
                    case 0:
                        s = { width: 80, height: 60 };
                        break;
                    case 1:
                        s = { width: 60, height: 50 };
                        break;
                    case 2:
                        s = { width: 60, height: 40 };
                        break;
                    case 3:
                        s = { width: 60, height: 40 };
                        break;
                    default:
                        s = { width: 100, height: 60 };
                }
                return objects.Fish({
                    imageSrc: 'fish/assets/multifatfishsprites.png',
                    center: fishcenter,
                    size: s,
                    moveRate: Math.random()+1,    // pixels per millisecond
                    manager: manager
                });
        }
    }

    function createFishRenderer(type){
        switch(type){
            case "ray":
                return renderer.AnimatedModel({
                    spriteSheet: 'fish/assets/raysprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            case "dolphin":
                return renderer.AnimatedModel({
                    spriteSheet: 'fish/assets/dolphinsprites.png',
                    spriteCount: 5,
                    spriteTime: [150, 150, 150, 150, 150],   // ms per frame
                }, graphics);
            case "red":
                return renderer.AnimatedModel({
                    spriteSheet: 'fish/assets/redfatfishsprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            case "blue":
                return renderer.AnimatedModel({
                    spriteSheet: 'fish/assets/bluefatfishsprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            case "yellow":
                return renderer.AnimatedModel({
                    spriteSheet: 'fish/assets/yellowfatfishsprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            case "green":
                return renderer.AnimatedModel({
                    spriteSheet: 'fish/assets/greenfatfishsprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
            default:
                return renderer.AnimatedModel({
                    spriteSheet: 'fish/assets/multifatfishsprites.png',
                    spriteCount: 8,
                    spriteTime: [120, 120, 120, 120, 120, 120, 120, 120],   // ms per frame
                }, graphics);
        }
    }

    function setUp(){
        manager = systems.ParticleManager(systems, renderer, graphics);
        
        // initializeAudio();

        // loadBackgroundMusic();

        promptColor = colors.random();
        promptNum = Math.floor(Math.random()*10)+1;
        promptAnswer = Random.nextRange(0,3);

        Fishies.length=0;
        for(let i = 0; i < promptNum; i++){
            Fishies[i] = {"fish": createFish(promptColor), "render": createFishRenderer(promptColor), };
        }
        for(let i = 0; i < 15-promptNum; i++){ //grand total of 15 fish to maintain consitancy while testing graphics
            let randFish = colors.random(); 
            while(randFish == promptColor){ randFish = colors.random(); } //Assure no duplicates of the target color
            Fishies[promptNum + i] = {"fish": createFish(randFish), "render": createFishRenderer(randFish), };
        }

        // myShip = objects.Ship({
        //     imageSrc: 'fish/assets/locust.png',
        //     center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
        //     size: { width: 50, height: 50 },
        //     moveRate: 0,    // pixels per millisecond
        //     manager: manager,
        // });

        myInfo.changeColor(promptColor);
        myInfo.changeTarget(promptNum);
        myInfo.changeAnswer(promptAnswer);
    }


    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        timer += elapsedTime;
        
        myShip.update(elapsedTime);
        manager.update(elapsedTime);
        for(let i = 0; i< Fishies.length; i++){
            Fishies[i]["fish"].update(elapsedTime);
            Fishies[i]["render"].update(elapsedTime);
        }
        //TODO: Change End Game State
        if(false){
            myShip.decreaseLives();
            if(myShip.lives==0){
                gameover();
            }
        }
        if(!lookForFishies()){
            myInfo.showAnswers();
            // playSound('LevelUp');
        }
        myInfo.updateText();
        if(myInfo.score > 10000 + myInfo.lastLife){
            myShip.increaseLives();
            myInfo.setLastLifeIncrease(10000);
        }
    }

    function lookForFishies(){
        for(var i=0; i<Fishies.length; i++){
            if(Fishies[i].fish.firstlife)
                return true;
        }
        return false;
    }

    function render() {
        graphics.clear();

        manager.render();
        
        renderer.Ship.render(myShip);
        
        for(let i = 0; i < Fishies.length; i++){
            Fishies[i]["render"].render(Fishies[i]["fish"]);
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
        myKeyboard.register(' ',myInfo.readPrompt);
        myKeyboard.register('Escape', function() {
            if (confirm("Do you want to end this game?")) {
                updateHighScores();
                setUp();
                initialize();//
                // Stop the game loop by canceling the request for the next animation frame
                cancelNextRequest = true;
                //
                // Then, return to the main menu
                game.showScreen('main-menu');
            }
            else{
                myKeyboard = input.Keyboard();
                initialize();
            }
            
            
        });
    }

    function findProperVoice(){
        if (window.speechSynthesis){
            var speech = new SpeechSynthesisUtterance();

            speech.text = '';
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            let l = window.speechSynthesis.getVoices();
            if(localStorage.LearnProLang == "fr"){
                speech.voice = l.find(voice => voice.name == "Google français");
            }
            else if(localStorage.LearnProLang == "it"){
                speech.voice = l.find(voice => voice.name == "Google italiano");
            }
            else if(localStorage.LearnProLang == "es"){
                speech.voice = l.find(voice => voice.name == "Google español");
            }
            else if(localStorage.LearnProLang == "en"){
                speech.voice = l.find(voice => voice.name == "Google US English");
            }
        }
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
        
        findProperVoice();
        setTimeout(myInfo.readPrompt,1000);
        playBackground();
    }

    graphics.canvas.width = window.innerWidth;
    graphics.canvas.height = window.innerHeight;
    window.addEventListener('resize', function(){graphics.canvas.width = window.innerWidth; graphics.canvas.height = window.innerHeight;}, true);
    window.addEventListener('keyup', function(e){
        if(e.key === 'Escape'){
            game.showScreen('main-menu');
        }
    });

    function getCursorPosition(event) {
        //Checking for correct answer
        const rect = graphics.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let range = { l: graphics.canvas.width*0.4, r: graphics.canvas.width*0.6};
        switch(promptAnswer){
            case 0: range = { l: graphics.canvas.width*0.2, r: graphics.canvas.width*0.4};
                break;
            case 2: range = { l: graphics.canvas.width*0.6, r: graphics.canvas.width*0.8};
        }
        if (range.l < x && x < range.r){
            myInfo.goodJob();
            setUp();
        }
    }
    
    graphics.canvas.addEventListener('mousedown', getCursorPosition);
    
    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.systems));
