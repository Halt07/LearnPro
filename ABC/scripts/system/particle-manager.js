//------------------------------------------------------------------
//
// This provides the "game" code.
//
//------------------------------------------------------------------
MyGame.systems.ParticleManager = function (systems, renderer, graphics) {
    'use strict';
    let thrusterTime = 0;
    let expTime = 0;
    let scrapTime = 0;
    let hyperTime = 0;

    console.log('game initializing...');

    let particlesBubble  = systems.ParticleSystem({
        center: { x: 300, y: 300 },
        size: { mean: 20, stdev: 5 },
        direction: {x: -(Math.cos(-Math.PI/2)), y: -(Math.sin(-Math.PI/2))},
        speed: { mean: 20, stdev: 10 },
        lifetime: { mean: 15, stdev: 5},
        rotation: 0,
        active: false,
        spin: true,
        hasDirection: true,
    });
    function createBubble(spec){
        particlesBubble.setCenter({ x: spec.x + Random.nextRange(-25,25), y: spec.y });
        particlesBubble.setRotation(0);
        particlesBubble.setDirection({x: 0, y: -1});
        particlesBubble.setActive(true);
        thrusterTime = 0;
    }

    let particlesDebris = systems.ParticleSystem({
        center: { x: 300, y: 300 },
        size: { mean: 25, stdev: 5 },
        direction: Random.nextCircleVector(),
        speed: { mean: 65, stdev: 35 },
        lifetime: { mean: 2, stdev: .25},
        rotation: 0,
        active: false,
        spin: true,
        hasDirection: false,
    });
    function createExplosion(spec){
        particlesDebris.setCenter({ x: spec.x, y: spec.y });
        particlesDebris.setActive(true);
        expTime = 0;
    }

    let particlesScrap = systems.ParticleSystem({
        center: { x: 300, y: 300 },
        size: { mean: 20, stdev: 3 },
        direction: Random.nextCircleVector(),
        speed: { mean: 65, stdev: 35 },
        lifetime: { mean: 1, stdev: .25},
        rotation: 0,
        active: false,
        spin: true,
        hasDirection: false,
    });
    function createShipExplosion(spec){
        particlesScrap.setCenter({ x: spec.x, y: spec.y });
        particlesScrap.setActive(true);
        scrapTime = 0;
    }

    let particlesHyper = systems.ParticleSystem({
        center: { x: 300, y: 300 },
        size: { mean: 20, stdev: 3 },
        direction: Random.nextCircleVector(),
        speed: { mean: 65, stdev: 35 },
        lifetime: { mean: 1, stdev: .25},
        rotation: 0,
        active: false,
        spin: true,
        hasDirection: false,
    });
    function createHyperJump(spec){
        particlesHyper.setCenter({ x: spec.x, y: spec.y });
        particlesHyper.setActive(true);
        hyperTime = 0;
    }

    let bubbleRenderer = renderer.ParticleSystem(particlesBubble, graphics, 
        'assets/bubble.png');
    let debrisRenderer = renderer.ParticleSystem(particlesDebris, graphics, 
        'assets/bubble.png');
    let scrapRenderer = renderer.ParticleSystem(particlesScrap, graphics, 
        'assets/scrap.png');
    let hyperRenderer = renderer.ParticleSystem(particlesHyper, graphics, 
        'assets/bubble.png');

    //------------------------------------------------------------------
    //
    // Update the particles
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        thrusterTime += elapsedTime;
        expTime += elapsedTime;
        scrapTime += elapsedTime;
        hyperTime += elapsedTime;
        particlesBubble.update(elapsedTime);
        particlesDebris.update(elapsedTime);
        particlesScrap.update(elapsedTime);
        particlesHyper.update(elapsedTime);
        if(thrusterTime>40){ // 1/25 second
            particlesBubble.setActive(false);
        }
        if(scrapTime>250){ // 1/4 second
            particlesScrap.setActive(false);
        }
        if(expTime>250){ // 1/4 second
            particlesDebris.setActive(false);
        }
        if(hyperTime>250){ // 1/4 second
            particlesHyper.setActive(false);
        }
    }

    //------------------------------------------------------------------
    //
    // Render the particles
    //
    //------------------------------------------------------------------
    function render() {
        debrisRenderer.render();
        hyperRenderer.render();
        scrapRenderer.render();
        bubbleRenderer.render();
    }

    let api = {
        update: update,
        render: render,
        createBubble: createBubble,
        createShipExplosion: createShipExplosion,
        createExplosion: createExplosion,
        createHyperJump: createHyperJump,
    };

    return api;

};
