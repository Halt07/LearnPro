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
    Array.prototype.random = function(){return this[Math.floor(Math.random()*this.length)];};
    let promptLetter = 'c';//getRandomLetter();
    let promptNum = Random.nextRange(0,objects.AnimalDict[localStorage.LearnProLang]["a"].animals.length);

    let answers = [promptLetter];
    for(let i=0; i<5; i++){
        let character = getRandomLetter();
        while(answers.indexOf(character) > -1){
            character = getRandomLetter();
        }
        answers.push(character);
    }
    shuffle(answers);
    let promptAnswer = answers.indexOf(promptLetter)
    


    let myInfo = objects.Info({
        target: promptNum,
        answer: answers,
        score: 0,
        letter: promptLetter,
    });

    function getRandomLetter(){
        let possible="abcdefghijklmnopqrstuvwxyz";
        switch(localStorage.LearnProLang){
            case "it":
                possible = possible.replace('j','');
                possible = possible.replace('x','');
                break;
            case "es":
                possible = possible.replace('u','');
            case "fr":
                possible = possible.replace('q','');
                possible = possible.replace('x','');
                break;
        }
        return possible.charAt(Math.floor(Math.random() * possible.length));
    }

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function setUp(){
        manager = systems.ParticleManager(systems, renderer, graphics);
        
        promptLetter = getRandomLetter();
        promptNum = Random.nextRange(0,objects.AnimalDict[localStorage.LearnProLang]["a"].animals.length);
        answers.length=0;
        answers = [promptLetter];
        for(let i=0; i<5; i++){
            let character = getRandomLetter();
            while(answers.indexOf(character) > -1){
                character = getRandomLetter();
            }
            answers.push(character);
        }
        shuffle(answers);
        promptAnswer = answers.indexOf(promptLetter)

        

        myInfo.changeLetter(promptLetter);
        myInfo.changeTarget(promptNum);
        myInfo.changeAnswer(answers);
    }


    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        timer += elapsedTime;
        
        manager.update(elapsedTime);
        
        //TODO: Change End Game State
        if(false){
            myInfo.showAnswers();
            // playSound('LevelUp');
        }
        myInfo.updateText();
        if(myInfo.score > 10000 + myInfo.lastLife){
            myInfo.setLastLifeIncrease(10000);
        }
    }

    function render() {
        graphics.clear();

        manager.render();
        
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
        let range = { l: graphics.canvas.width*0.35, r: graphics.canvas.width*0.65, t: graphics.canvas.height*0.1, b: graphics.canvas.height*0.5};
        switch(promptAnswer){
            case 0: range = { l: graphics.canvas.width*0.1, r: graphics.canvas.width*0.35, t: graphics.canvas.height*0.1, b: graphics.canvas.height*0.5};
                break;
            case 2: range = { l: graphics.canvas.width*0.65, r: graphics.canvas.width*0.9, t: graphics.canvas.height*0.1, b: graphics.canvas.height*0.5};
                break;
            case 3: range = { l: graphics.canvas.width*0.1, r: graphics.canvas.width*0.35, t: graphics.canvas.height*0.5, b: graphics.canvas.height*0.9};
                break;
            case 4: range = { l: graphics.canvas.width*0.35, r: graphics.canvas.width*0.65, t: graphics.canvas.height*0.5, b: graphics.canvas.height*0.9};
                break;
            case 5: range = { l: graphics.canvas.width*0.65, r: graphics.canvas.width*0.9, t: graphics.canvas.height*0.5, b: graphics.canvas.height*0.9};
                break;
        }
        if (range.l < x && x < range.r && range.t < y && y < range.b ){
            myInfo.goodJob();
            myInfo.AnswerQuickly();
            setUp();
        }
    }
    
    graphics.canvas.addEventListener('mousedown', getCursorPosition);
    
    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.systems));
