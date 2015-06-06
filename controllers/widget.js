var args = arguments[0] || {};
exports.resize = function(height, width, speed){
	
	height = height || $.funky.rect.height;
	width = width || $.funky.rect.width;
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
	
	bounce.addEventListener('complete', function cb(){
		$.funky.animate(normal);
		bounce.removeEventListener('complete', cb);
	});
	$.funky.animate(bounce);

};

exports.applyProperties = $.funky.applyProperties;

_.each(args,function(arg, key){
	$.funky[key] = arg;
});

function onEvent(event){
	$.trigger(event.type,event);
}
