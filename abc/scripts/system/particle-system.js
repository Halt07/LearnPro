MyGame.systems.ParticleSystem = function (spec) {
    let nextName = 1;
    let particles = {};

    
    function setActive(actif){
        spec.active = actif;
    }

    function setCenter(centre){
        spec.center.x = centre.x;
        spec.center.y = centre.y;
    }

    function setRotation(rot){
        spec.rotation = rot;
    }

    function setDirection(dir){
        spec.direction = dir;
    }

    function create() {
        let dir = undefined;
        if(spec.hasDirection){
            dir = spec.direction
        }
        else{
            dir = Random.nextCircleVector();
        }
        let size = Random.nextGaussian(spec.size.mean, spec.size.stdev);
        let sp = Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.stdev));
        if (sp === 0){
            sp = spec.speed.mean;
        }
        let p = {
            center: { x: spec.center.x, y: spec.center.y },
            size: { width: size, height: size },
            direction: dir,
            speed: sp, // pixels per second
            rotation: spec.rotation,
            lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev), // seconds
            alive: 0
        };

        return p;
    }

    function update(elapsedTime) {
        let removeMe = [];

        elapsedTime = elapsedTime / 1000;
        if(spec.active){
            for (let particle = 0; particle < 2; particle++) {
                particles[nextName++] = create();
            }
        }
        Object.getOwnPropertyNames(particles).forEach(value => {
            let particle = particles[value];

            particle.alive += elapsedTime;
            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y += (elapsedTime * particle.speed * particle.direction.y);
            if(spec.spin){
                particle.rotation += particle.speed / 500;
            }

            if (particle.alive > particle.lifetime) {
                removeMe.push(value);
            }
        });

        for (let particle = 0; particle < removeMe.length; particle++) {
            delete particles[removeMe[particle]];
        }
    }

    let api = {
        update: update,
        setActive: setActive,
        setCenter: setCenter,
        setRotation: setRotation,
        setDirection: setDirection,
        get particles() { return particles; },
        get active() { return spec.active; },
        get rotation() { return spec.rotation; }
    };

    return api;
};
