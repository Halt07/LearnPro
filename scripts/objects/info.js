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
MyGame.objects.Info = function(spec) {
    'use strict';

    let lastLife = 0;
    let renderAnswers = false;
    let wait = false;
    let renderEndMessage = false;

    let myColor = MyGame.objects.Text({
        text: (spec.color=="ray" || spec.color=="dolphin") ? 'How many ' + spec.color + 's are there?' : 'How many ' + spec.color + ' fish are there?',
        font: '24pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 5, y: 5 }
    });

    let myScore = MyGame.objects.Text({
        text: 'Score: ' + spec.score,
        font: '16pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 5, y: 54 }
    });

    let myLives = MyGame.objects.Text({
        text: 'Target: ' + spec.target,
        font: '16pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 5, y: 34 }
    });

    let answers = [1,2,3,4,5,6,7,8,9,10]

    let left = MyGame.objects.Text({
        text: '' + spec.answer==0 ? spec.target : answers[(spec.target+Math.floor(Math.random()*9))%10],
        font: '80pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: window.innerWidth*0.25, y: window.innerHeight*0.35 }
    });

    let mid = MyGame.objects.Text({
        text: '' + spec.answer==1 ? spec.target : answers[(spec.target+Math.floor(Math.random()*9))%10],
        font: '80pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: window.innerWidth*0.45, y: window.innerHeight*0.35 }
    });

    let right = MyGame.objects.Text({
        text: '' + spec.answer==2 ? spec.target : answers[(spec.target+Math.floor(Math.random()*9))%10],
        font: '80pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: window.innerWidth*0.65, y: window.innerHeight*0.35 }
    });

    let wellDone = MyGame.objects.Text({
        text: 'Good Job!',
        font: '100pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: window.innerWidth*0.3, y: window.innerHeight*0.35 }
    });

    function updateText(){
        if (localStorage.LearnProLang == "fr"){
            myColor.updateText('Il y a combien de ' + ((spec.color=="ray" || spec.color=="dolphin") ?  '' : 'poissons ') + TranslateColorFish(spec.color) + '?');
            myScore.updateText('Récord: ' + spec.score);
            myLives.updateText('Cible: ' + spec.target);
            wellDone.updateText('Bien Fait!');
        }
        else if (localStorage.LearnProLang == "it"){
            myColor.updateText('Ci sono ' + ((spec.color=="ray" || spec.color=="dolphin") ?  (spec.color=="ray" ?  'quante ' : 'quanti ') : 'quanti pesci ') + TranslateColorFish(spec.color) + '?');
            myScore.updateText('Record: ' + spec.score);
            myLives.updateText('Bersaglio: ' + spec.target);
            wellDone.updateText('Bene Fatto!');
        }
        else if (localStorage.LearnProLang == "es"){
            myColor.updateText('Il y a combien des ' + ((spec.color=="ray" || spec.color=="dolphin") ?  '' : 'poissons ') + TranslateColorFish(spec.color) + 's?');
            myScore.updateText('Récord: ' + spec.score);
            myLives.updateText('Cible: ' + spec.target);
            wellDone.updateText('Bien Fait!');
        }
        else{
            myColor.updateText((spec.color=="ray" || spec.color=="dolphin") ? 'How many ' + spec.color + 's are there?' : 'How many ' + spec.color + ' fish are there?',);
            myScore.updateText('Score: ' + spec.score);
            myLives.updateText('Target: ' + spec.target);
            wellDone.updateText('Good Job!');
        }
    }

    function render(){
        MyGame.render.Text.render(myColor);
        MyGame.render.Text.render(myLives);
        MyGame.render.Text.render(myScore);
        if(renderAnswers){
            MyGame.render.Text.render(left);
            MyGame.render.Text.render(mid);
            MyGame.render.Text.render(right);
        }
        if(renderEndMessage){
            MyGame.render.Text.render(wellDone);
        }
    }

    function increaseScore(howMuch){
        spec.score += howMuch;
    }

    function changeColor(color){
        spec.color = color;
    }
    function changeTarget(tar){
        spec.target = tar;
    }
    function changeAnswer(ans){
        spec.answer = ans;
    }

    function resetInfo(){
        spec.score = 0;
        spec.color = 1;
        lastLife = 0;
    }

    function setLastLifeIncrease(howMuch){
        lastLife += howMuch;
    }

    function readPrompt(){
        if (!window.speechSynthesis.speaking){
            myColor.readText(localStorage.LearnProLang);
            if(renderAnswers){
                setTimeout(function(){wait = false;showAnswers();},4000);
            }
        }
    }

    function showAnswers(){
        renderAnswers = true;
        
        if(renderAnswers && !wait){
            wait = true;
            left.readText(localStorage.LearnProLang);
            left.colorBlink('rgba(255, 255, 0, 1)',1000);
            setTimeout(function(){mid.readText(localStorage.LearnProLang);mid.colorBlink('rgba(255, 255, 0, 1)',1000);},2000);
            setTimeout(function(){right.readText(localStorage.LearnProLang);right.colorBlink('rgba(255, 255, 0, 1)',1000);},4000);
        }
    }

    function goodJob(){
        if(renderAnswers){
            renderAnswers = false;
            wait = false;
            renderEndMessage = true;
            wellDone.readText(localStorage.LearnProLang);
            increaseScore(1);
            setTimeout(function(){renderEndMessage=false;
                left.updateText('' + spec.answer==0 ? spec.target : answers[(spec.target+Math.floor(Math.random()*9))%10]);
                mid.updateText('' + spec.answer==1 ? spec.target : answers[(spec.target+Math.floor(Math.random()*9))%10]);
                right.updateText('' + spec.answer==2 ? spec.target : answers[(spec.target+Math.floor(Math.random()*9))%10]);
                readPrompt();},2500);
        }
    }

    let api = {
        updateText: updateText,
        render: render,
        increaseScore: increaseScore,
        changeColor: changeColor,
        changeTarget: changeTarget,
        changeAnswer: changeAnswer,
        setLastLifeIncrease: setLastLifeIncrease,
        resetInfo: resetInfo,
        readPrompt: readPrompt,
        showAnswers: showAnswers,
        goodJob: goodJob,
        get color() { return spec.color; },
        get score() { return spec.score; },
        get lastLife() { return lastLife; }
    };

    return api;
}
