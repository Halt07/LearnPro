// --------------------------------------------------------------
//
// Renders a Ship object.
//
// spec = {
//    image: ,
//    center: { x: , y: },
//    size: { width: , height: }
// }
//
// --------------------------------------------------------------
MyGame.render.Ship = (function(graphics) {
    'use strict';

    function render(spec) {
        if (spec.imageReady) {
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        }
        // if(spec.hyperTimer){ //Hyperspace ready bar only if the ship has hyperspace capabilities
        //     let w = Math.min((spec.hyperTimer / 10000) * 150, 150)
        //     let color = 'rgba(255,0,0,1)'
        //     if(w === 150){
        //         color = 'rgba(0,255,0,1)'
        //     }
        //     graphics.drawRectangle({x: 5, y: 74, size: {width: w, height: 16}}, color,'rgba(0, 0, 0, 1)');
        // }
    }

    return {
        render: render
    };
}(MyGame.graphics));
