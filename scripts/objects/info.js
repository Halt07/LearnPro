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

    let myLevel = MyGame.objects.Text({
        text: 'Level ' + spec.level,
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
        text: 'Lives: ' + spec.ship.lives,
        font: '16pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 5, y: 34 }
    });

    function updateText(){
        myLevel.updateText('Level ' + spec.level);
    
        myScore.updateText('Score: ' + spec.score);
    
        myLives.updateText('Lives: ' + spec.ship.lives);
    }

    function render(){
        MyGame.render.Text.render(myLevel);
        MyGame.render.Text.render(myLives);
        MyGame.render.Text.render(myScore);
    }

    function increaseScore(howMuch){
        spec.score += howMuch;
    }

    function increaseLevel(){
        spec.level++;
    }

    function resetInfo(){
        spec.score = 0;
        spec.level = 1;
        lastLife = 0;
    }

    function setLastLifeIncrease(howMuch){
        lastLife += howMuch;
    }

    let api = {
        updateText: updateText,
        render: render,
        increaseScore: increaseScore,
        increaseLevel: increaseLevel,
        setLastLifeIncrease: setLastLifeIncrease,
        resetInfo: resetInfo,
        get level() { return spec.level; },
        get score() { return spec.score; },
        get lastLife() { return lastLife; }
    };

    return api;
}
