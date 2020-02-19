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
        myColor.updateText((spec.color=="ray" || spec.color=="dolphin") ? 'How many ' + spec.color + 's are there?' : 'How many ' + spec.color + ' fish are there?',);
    
        myScore.updateText('Score: ' + spec.score);

        myLives.updateText('Target: ' + spec.target);
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

    let api = {
        updateText: updateText,
        render: render,
        increaseScore: increaseScore,
        changeColor: changeColor,
        setLastLifeIncrease: setLastLifeIncrease,
        resetInfo: resetInfo,
        get color() { return spec.color; },
        get score() { return spec.score; },
        get lastLife() { return lastLife; }
    };

    return api;
}
