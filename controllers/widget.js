var args = arguments[0] || {};

/**
 * Android doesn't automatically add child views. 
 */
if (OS_ANDROID){
	_.each(args.children,function(child){
		$.funky.add(child);
	});
}

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
exports.resize = function(height, width, speed, noBounce){
	
	height = height || $.funky.rect.height;
	width = width || $.funky.rect.width;
	noBounce = noBounce || false;
	speed = speed || 250;
	var bounceHeight = 0;
	var bounceWidth = 0;
	
	if (height !== $.funky.rect.height){
		if (height > $.funky.rect.height){
			bounceHeight = height * 1.1;
		} else {
			bounceHeight = height * 0.9;
		}
	} else {
		bounceHeight = height;
	}
	
	if (width !== $.funky.rect.width){
		if (width > $.funky.rect.width){
			bounceWidth = width * 1.1;
		} else {
			bounceWidth = width * 0.9;
		}
	} else {
		bounceWidth = width;
	}
	
	var bounce = Ti.UI.createAnimation({
		height: bounceHeight,
		width: bounceWidth,
		duration: speed
	});
	
	var normal = Ti.UI.createAnimation({
		height: height,
		width: width,
		duration: speed
	});
	
	if (!noBounce){
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
 * a generic event function to expose events
 * @param {Object} event
 */
function onEvent(event){
	$.trigger(event.type,event);
}
