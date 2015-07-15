
var args = arguments[0] || {};

var props = {
    speed: 250,
    noBounce: false,
    positiveBounce: false,
    bounceRate: 0.1,
    horizontalBounce: true,
    verticalBounce: true
};

/**
 * Android doesn't automatically add child views. 
 */
if (OS_ANDROID){
    _.each(args.children,function(child){
        $.funky.add(child);
    });
}

/**
 * are any of the props set through arguments? If so, apply them!
 */
_.each(props,function(a, name){
    if (args.hasOwnProperty(name)){
        props[name] = args[name];
    };
});

// exposting the add and remove properties
exports.add = $.funky.add;
exports.remove = $.funky.remove;

/**
 * Resize the widget view with properties. 
 * 
 * @param {Integer} The new height of the view  
 * @param {Integer} The new width of the view
 * @param {Integer} The speed of which the animation should happen in milliseconds
 * @param {Boolean} Should the resize enable a bounce effect? The result is 10% bigger or smaller depending on the resize, and after bounce it will return to 100%. With bounce the speed is 2x the speed provided in the 3rd parameter 
 */
exports.resize = function(height, width, sp, nb){
    
    height = height === null ? $.funky.rect.height : height;
    width = width === null ? $.funky.rect.width : width;
    props.noBounce = typeof nb !== undefined ? nb : props.noBounce;
    props.speed = sp || props.speed;
    var bounceHeight = 0;
    var bounceWidth = 0;
    
    if (height !== $.funky.rect.height){
        if (height > $.funky.rect.height){
            bounceHeight = height * (1 + props.bounceRate);
        } else {
            bounceHeight = height * (1 - props.bounceRate);
        }
    } else {
        bounceHeight = height;
    }
    
    if (width !== $.funky.rect.width){
        if (width > $.funky.rect.width){
            bounceWidth = width * (1 + props.bounceRate);
        } else {
            bounceWidth = width * (1 - props.bounceRate);
        }
    } else {
        bounceWidth = width;
    }
    
    if (width === $.funky.rect.width && height === $.funky.rect.height){
        bounceHeight = props.verticalBounce ? height * (props.positiveBounce ? (1 + props.bounceRate) : (1 - props.bounceRate)) : height;
        bounceWidth = props.horizontalBounce ? width * (props.positiveBounce ? (1 + props.bounceRate) : (1 - props.bounceRate)) : width;
    }
    
    var bounce = Ti.UI.createAnimation({
        height: bounceHeight,
        width: bounceWidth,
        duration: props.speed
    });
    
    var normal = Ti.UI.createAnimation({
        height: height,
        width: width,
        duration: props.speed
    });
    
    /**
     * fix heights for iOS, because when the width/height is 0, it will not animate
     */
    if (OS_IOS){
        if ($.funky.rect.width === 0){
            $.funky.width = 1;
        }
        if ($.funky.rect.height === 0){
            $.funky.height = 1;
        }
    }
    
    if (!props.noBounce){
        bounce.addEventListener('complete', function cb(){
            $.funky.animate(normal);
            bounce.removeEventListener('complete', cb);
        });
        $.funky.animate(bounce);
        return;
    }
    $.funky.animate(normal);
};

/**
 * the option to call applyproperties on the view
 */
exports.applyProperties = $.funky.applyProperties;

_.each(args,function(arg, key){
    $.funky[key] = arg;
});

/**
 * Positive bounce is used when the to be resized value is the same as the current value
 * When set to true, the view will increase the size by 10% (default) and then bounce back
 * When set to false (default), the view will decrease the size by 10% (default) and then bounce back
  * @param {Boolean} Will the bounce be positive or negative when the resize size is the same as current size  
*/
exports.setPositiveBounce = function(bool){
    props.positiveBounce = bool;
};

/**
 * How much should the bounce be
 * @param {Float} The bounce, based on difference. Default: 0.1. Value between 0.1 and 1
 */
exports.setBounceRate = function(value){
    props.bounceRate = value;
};

/**
 * Determine the speed of events
 * @param {Integer} How fast should half the animation go? Speed in ms
 */
exports.setSpeed = function(value){
    props.speed = value;
};

/**
 * Disable horizontal bouncing
 * @param {Boolean} Bounce?
 */
exports.setHorizontalBounce = function(value){
    props.horizontalBounce = value;
}

/**
 * Disable vertical bouncing
 * @param {Boolean} Bounce?
 */
exports.setVerticalBounce = function(value){
    props.verticalBounce = value;
}

/**
 * a generic event function to expose events
 * @param {Object} event
 */
function onEvent(event){
    $.trigger(event.type,event);
}
