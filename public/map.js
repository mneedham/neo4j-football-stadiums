var Map = function(options) {
	var map = L.map(options.element).setView(options.position, options.zoom);
	var layer = L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', { maxZoom: 18 });
    layer.addTo(map);

	var obj = {
		init: function() {
			console.log("map me up");
		},
		innerMap: function() {
			return map;
		}

	};
	return obj;
}