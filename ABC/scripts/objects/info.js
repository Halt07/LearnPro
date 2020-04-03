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

    let myLetter = MyGame.objects.Text({
        text: "Which Animal begins with the letter " + spec.letter.toUpperCase() + "?",
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

    let left = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[0]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[0]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.25 }
    });

    let mid = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[1]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[1]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.4, y: MyGame.graphics.canvas.height*0.25 }
    });

    let right = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[2]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[2]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.7, y: MyGame.graphics.canvas.height*0.25 }
    });

    let bleft = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[3]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[3]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.55 }
    });

    let bmid = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[4]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[4]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.4, y: MyGame.graphics.canvas.height*0.55 }
    });

    let bright = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[5]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[5]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.7, y: MyGame.graphics.canvas.height*0.55 }
    });

    let wellDone = MyGame.objects.Text({
        text: 'Good Job!',
        font: '100pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.3, y: MyGame.graphics.canvas.height*0.35 }
    });

    function updateText(){
        if (localStorage.LearnProLang == "fr"){
            myLetter.updateText('Quel Animal commence par la lettre ' + spec.letter.toUpperCase() + '?');
            myScore.updateText('Récord: ' + spec.score);
            myLives.updateText('Cible: ' + spec.target);
            wellDone.updateText('Bien Fait!');
        }
        else if (localStorage.LearnProLang == "it"){
            myLetter.updateText('Quale Animale inizia con la lettera ' + spec.letter.toUpperCase() + '?');
            myScore.updateText('Record: ' + spec.score);
            myLives.updateText('Bersaglio: ' + spec.target);
            wellDone.updateText('Ben Fatto!');
        }
        else if (localStorage.LearnProLang == "es"){
            myLetter.updateText('¿Qué Animal comienza con la letra '  + spec.letter.toUpperCase() + '?');
            myScore.updateText('Récord: ' + spec.score);
            myLives.updateText('Cible: ' + spec.target);
            wellDone.updateText('Bien Hecho!');
        }
        else{
            myLetter.updateText("Which Animal begins with the letter " + spec.letter.toUpperCase() + "?");
            myScore.updateText('Score: ' + spec.score);
            myLives.updateText('Target: ' + spec.target);
            wellDone.updateText('Good Job!');
        }
    }

    function render(){
        MyGame.render.Text.render(myLetter);
        // MyGame.render.Text.render(myLives);
        MyGame.render.Text.render(myScore);
        if(renderAnswers){
            MyGame.render.Text.render(left);
            MyGame.render.Text.render(mid);
            MyGame.render.Text.render(right);
            MyGame.render.Text.render(bleft);
            MyGame.render.Text.render(bmid);
            MyGame.render.Text.render(bright);
        }
        if(renderEndMessage){
            MyGame.render.Text.render(wellDone);
        }
    }

    function increaseScore(howMuch){
        spec.score += howMuch;
    }

    function changeLetter(letter){
        spec.letter = letter;
    }
    function changeTarget(tar){
        spec.target = tar;
    }
    function changeAnswer(ans){
        spec.answer = ans;
    }

    function resetInfo(){
        spec.score = 0;
        spec.letter = 1;
        lastLife = 0;
    }

    function setLastLifeIncrease(howMuch){
        lastLife += howMuch;
    }

    function readPrompt(){
        if (!window.speechSynthesis.speaking){
            myLetter.readText(localStorage.LearnProLang);
            // if(!renderAnswers){
                setTimeout(function(){wait = false;showAnswers();},4000);
            // }
        }
    }

    function updateTextPositions(){
        left.setPosition({ x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.25 });
        mid.setPosition({ x: MyGame.graphics.canvas.width*0.35, y: MyGame.graphics.canvas.height*0.25 });
        right.setPosition({ x: MyGame.graphics.canvas.width*0.65, y: MyGame.graphics.canvas.height*0.25 });
        bleft.setPosition({ x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.55 });
        bmid.setPosition({ x: MyGame.graphics.canvas.width*0.35, y: MyGame.graphics.canvas.height*0.55 });
        bright.setPosition({ x: MyGame.graphics.canvas.width*0.65, y: MyGame.graphics.canvas.height*0.55 });
        wellDone.setPosition({ x: MyGame.graphics.canvas.width*0.3, y: MyGame.graphics.canvas.height*0.35 });
    }

    function showAnswers(){
        renderAnswers = true;

        updateTextPositions();

        if(renderAnswers && !wait){
            wait = true;
            left.readText(localStorage.LearnProLang);
            left.colorBlink('rgba(255, 255, 0, 1)',1000);
            setTimeout(function(){mid.readText(localStorage.LearnProLang);mid.colorBlink('rgba(255, 255, 0, 1)',1000);},2000);
            setTimeout(function(){right.readText(localStorage.LearnProLang);right.colorBlink('rgba(255, 255, 0, 1)',1000);},4000);
            setTimeout(function(){bleft.readText(localStorage.LearnProLang);bleft.colorBlink('rgba(255, 255, 0, 1)',1000);},6000);
            setTimeout(function(){bmid.readText(localStorage.LearnProLang);bmid.colorBlink('rgba(255, 255, 0, 1)',1000);},8000);
            setTimeout(function(){bright.readText(localStorage.LearnProLang);bright.colorBlink('rgba(255, 255, 0, 1)',1000);},10000);
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
                
                left.updateText(MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[0]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[0]].animals.length)]);
                mid.updateText(MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[1]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[1]].animals.length)]);
                right.updateText(MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[2]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[2]].animals.length)]);
                bleft.updateText(MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[3]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[3]].animals.length)]);
                bmid.updateText(MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[4]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[4]].animals.length)]);
                bright.updateText(MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[5]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[5]].animals.length)]);
                readPrompt();},2500);
        }
    }

    let api = {
        updateText: updateText,
        render: render,
        increaseScore: increaseScore,
        changeLetter: changeLetter,
        changeTarget: changeTarget,
        changeAnswer: changeAnswer,
        setLastLifeIncrease: setLastLifeIncrease,
        resetInfo: resetInfo,
        readPrompt: readPrompt,
        showAnswers: showAnswers,
        goodJob: goodJob,
        get letter() { return spec.letter; },
        get score() { return spec.score; },
        get lastLife() { return lastLife; }
    };

    return api;
}
