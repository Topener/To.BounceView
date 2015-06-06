var args = arguments[0] || {};
exports.resize = function(height){
	
	if ($.funky.rect.height < height){
		var bigger = Ti.UI.createAnimation({
			height: (height * 1.1),
			duration: 250
		});
		var normal = Ti.UI.createAnimation({
			height: height,
			duration: 250
		});
		bigger.addEventListener('complete', function cb(){
			$.funky.animate(normal);
			bigger.removeEventListener('complete', cb);
		});
		$.funky.animate(bigger);
	} else {
		var smaller = Ti.UI.createAnimation({
			height: (height * 0.9),
			duration: 250
		});
		var normal = Ti.UI.createAnimation({
			height: height,
			duration: 250
		});
		smaller.addEventListener('complete', function cb(){
			$.funky.animate(normal);
			smaller.removeEventListener('complete', cb);
		});
		$.funky.animate(smaller);
	}
};

exports.applyProperties = $.funky.applyProperties;

_.each(args,function(arg, key){
	$.funky[key] = arg;
});

function onEvent(event){
	$.trigger(event.type,event);
}
