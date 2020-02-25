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

    function updateText(){
        if (localStorage.LearnProLang == "fr"){
            myColor.updateText('Il y a combien de ' + ((spec.color=="ray" || spec.color=="dolphin") ?  '' : 'poissons ') + TranslateColorFish(spec.color) + '?');
            myScore.updateText('Récord: ' + spec.score);
            myLives.updateText('Cible: ' + spec.target);
        }
        else if (localStorage.LearnProLang == "it"){
            myColor.updateText('Ci sono ' + ((spec.color=="ray" || spec.color=="dolphin") ?  (spec.color=="ray" ?  'quante ' : 'quanti ') : 'quanti pesci ') + TranslateColorFish(spec.color) + '?');
            myScore.updateText('Récord: ' + spec.score);
            myLives.updateText('Cible: ' + spec.target);
        }
        else if (localStorage.LearnProLang == "es"){
            myColor.updateText('Il y a combien des ' + ((spec.color=="ray" || spec.color=="dolphin") ?  '' : 'poissons ') + TranslateColorFish(spec.color) + 's?');
            myScore.updateText('Récord: ' + spec.score);
            myLives.updateText('Cible: ' + spec.target);
        }
        else{
            myColor.updateText((spec.color=="ray" || spec.color=="dolphin") ? 'How many ' + spec.color + 's are there?' : 'How many ' + spec.color + ' fish are there?',);
            myScore.updateText('Score: ' + spec.score);
            myLives.updateText('Target: ' + spec.target);
        }
    }

    function render(){
        MyGame.render.Text.render(myColor);
        MyGame.render.Text.render(myLives);
        MyGame.render.Text.render(myScore);
    }

    function increaseScore(howMuch){
        spec.score += howMuch;
    }

    function changeColor(color){
        spec.color = color;
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
        if (!window.speechSynthesis.speaking)
            myColor.readText(localStorage.LearnProLang);
    }

    let api = {
        updateText: updateText,
        render: render,
        increaseScore: increaseScore,
        changeColor: changeColor,
        setLastLifeIncrease: setLastLifeIncrease,
        resetInfo: resetInfo,
        readPrompt: readPrompt,
        get color() { return spec.color; },
        get score() { return spec.score; },
        get lastLife() { return lastLife; }
    };

    return api;
}
