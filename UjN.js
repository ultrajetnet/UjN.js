var UjN = {
	Events: {},
	Utility: {}	
};

UjN.Events.listeners = [];

Ujn.Events.addEventListener = function(element, event, handler) {

	if (typeof element.addEventListener !== "undefined") {
		element.addEventListener(event, handler);
	} 
	else if (typeof (element.attachEvent) !== "undefined") {
		var newHandler = function (e) {
			e.preventDefault = function () {
				e.returnValue = false;
			};
			e.stopPropagation = function () {
				e.cancelBubble = true;
			};
			handler.call(element, e);
		};
		element.attachEvent('on' + event, newHandler);
		UjN.Events.listeners.push([handler, newHandler]);
	}
};

function removeEventListener(element, event, handler) {
	if (typeof element.removeEventListener !== "undefined") {
		element.removeEventListener(event, handler);
	} 
	else if (typeof element.detachEvent !== "undefined") {
		event = 'on' + event;
		for (var i = 0; i < UjN.Events.listeners.length; i++) {
			if (listeners[i][0] === handler) {
				element.detachEvent(event, listeners[i][1]);
				break;
			}	
		}
	}
};

UjN.Utility.namespace = function(ns) {
	var parts = ns.split("."),
		object = window;
		
	for (var i=0; i < parts.length;i++){
		if (!object[parts[i]]){
			object[parts[i]] = {};
		}
		
		object = object[parts[i]];
	}
	return object;
};

