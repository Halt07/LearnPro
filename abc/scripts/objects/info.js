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
    let quickAnswer = false;

    let images = [];
    let imageReady = [];
    let imageSelect = -1;
    for(let i =0; i<6; i++){
        images.push(new Image());
        images[i].onload = function() {
            imageReady.push(true);
        };
    }

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
        position: { x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.4 }
    });

    let mid = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[1]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[1]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.4, y: MyGame.graphics.canvas.height*0.4 }
    });

    let right = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[2]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[2]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.7, y: MyGame.graphics.canvas.height*0.4 }
    });

    let bleft = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[3]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[3]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.8 }
    });

    let bmid = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[4]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[4]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.4, y: MyGame.graphics.canvas.height*0.8 }
    });

    let bright = MyGame.objects.Text({
        text: MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[5]].animals[Random.nextRange(0,MyGame.objects.AnimalDict[localStorage.LearnProLang][spec.answer[5]].animals.length)],
        font: '50pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.7, y: MyGame.graphics.canvas.height*0.8 }
    });

    let wellDone = MyGame.objects.Text({
        text: 'Good Job!',
        font: '100pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.3, y: MyGame.graphics.canvas.height*0.35 }
    });

    let bigLetter = MyGame.objects.Text({
        text: spec.letter.toUpperCase(),
        font: '200pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: MyGame.graphics.canvas.width*0.47, y: MyGame.graphics.canvas.height*0.3 }
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
        bigLetter.updateText(spec.letter.toUpperCase());
    }

    function drawAnswer(i,x,y,imagename){
        images[i].src = "abc/assets/" + imagename;
        let s = MyGame.graphics.canvas.width*0.2;
        if (i == imageSelect){
            MyGame.graphics.drawCircle({x: x, y: y, radius: s/2 },'rgba(255,255,0,0.4)','rgba(255,255,0,0.2)')
        }
        if(imageReady[i])
            MyGame.graphics.drawTexture(images[i], {x: x, y: y}, 0, {width: s, height: s});
    }

    function render(){
        MyGame.render.Text.render(myLetter);
        // MyGame.render.Text.render(myLives);
        MyGame.render.Text.render(myScore);
        drawAnswer(0,MyGame.graphics.canvas.width*0.2,MyGame.graphics.canvas.height*0.35,'ant.png');
        drawAnswer(1,MyGame.graphics.canvas.width*0.5,MyGame.graphics.canvas.height*0.35,'butterfly.png');
        drawAnswer(2,MyGame.graphics.canvas.width*0.8,MyGame.graphics.canvas.height*0.35,'ant.png');
        drawAnswer(3,MyGame.graphics.canvas.width*0.2,MyGame.graphics.canvas.height*0.75,'dolphin.png');
        drawAnswer(4,MyGame.graphics.canvas.width*0.5,MyGame.graphics.canvas.height*0.75,'ray.png');
        drawAnswer(5,MyGame.graphics.canvas.width*0.8,MyGame.graphics.canvas.height*0.75,'ant.png');
        if(renderAnswers){
            MyGame.render.Text.render(left);
            MyGame.render.Text.render(mid);
            MyGame.render.Text.render(right);
            MyGame.render.Text.render(bleft);
            MyGame.render.Text.render(bmid);
            MyGame.render.Text.render(bright);
        }
        else if(!renderEndMessage){
            MyGame.render.Text.render(bigLetter);
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
        bigLetter.setPosition({ x: MyGame.graphics.canvas.width*0.47, y: MyGame.graphics.canvas.height*0.3 });
        left.setPosition({ x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.4 });
        mid.setPosition({ x: MyGame.graphics.canvas.width*0.35, y: MyGame.graphics.canvas.height*0.4 });
        right.setPosition({ x: MyGame.graphics.canvas.width*0.65, y: MyGame.graphics.canvas.height*0.4 });
        bleft.setPosition({ x: MyGame.graphics.canvas.width*0.05, y: MyGame.graphics.canvas.height*0.8 });
        bmid.setPosition({ x: MyGame.graphics.canvas.width*0.35, y: MyGame.graphics.canvas.height*0.8 });
        bright.setPosition({ x: MyGame.graphics.canvas.width*0.65, y: MyGame.graphics.canvas.height*0.8 });
        wellDone.setPosition({ x: MyGame.graphics.canvas.width*0.3, y: MyGame.graphics.canvas.height*0.35 });
    }

    function showAnswers(){
        renderAnswers = true;

        updateTextPositions();

        if(renderAnswers && !wait){
            wait = true;
            quickAnswer=false;
            left.readText(localStorage.LearnProLang);
            left.colorBlink('rgba(255, 255, 0, 1)',1000);
            imageSelect=0;
            setTimeout(function(){if(!quickAnswer){mid.readText(localStorage.LearnProLang);imageSelect = 1;mid.colorBlink('rgba(255, 255, 0, 1)',1000);}},2000);
            setTimeout(function(){if(!quickAnswer){right.readText(localStorage.LearnProLang);imageSelect = 2;right.colorBlink('rgba(255, 255, 0, 1)',1000);}},4000);
            setTimeout(function(){if(!quickAnswer){bleft.readText(localStorage.LearnProLang);imageSelect = 3;bleft.colorBlink('rgba(255, 255, 0, 1)',1000);}},6000);
            setTimeout(function(){if(!quickAnswer){bmid.readText(localStorage.LearnProLang);imageSelect = 4;bmid.colorBlink('rgba(255, 255, 0, 1)',1000);}},8000);
            setTimeout(function(){if(!quickAnswer){bright.readText(localStorage.LearnProLang);imageSelect = 5;bright.colorBlink('rgba(255, 255, 0, 1)',1000);}quickAnswer=false;},10000);
            setTimeout(function(){if(!quickAnswer){imageSelect = -1;}},12000);
        }
    }

    function AnswerQuickly(){
        quickAnswer=true;
        imageSelect = -1;
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
                if(quickAnswer) setTimeout(readPrompt,5000);
                else readPrompt();},2500);
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
        AnswerQuickly: AnswerQuickly,
        goodJob: goodJob,
        get letter() { return spec.letter; },
        get score() { return spec.score; },
        get lastLife() { return lastLife; }
    };

    return api;
}
