var Map = function(options) {
	var startPosition = options.position;
	var distance = options.distanceElement;
	var map = L.map(options.element).setView(options.position, options.zoom);
	var layer = L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', { maxZoom: 18 });
    layer.addTo(map);

    var currentPositionMarker = markerAt({ "lat" : startPosition[0], "lng" : startPosition[1]});
	var currentDiameter = diameterAt(startPosition, distance.val());

	function markerAt(latLong) {
		return L.marker([latLong.lat, latLong.lng]).addTo(map);
	}

	function diameterAt(latLong, distance) {
		return L.circle(latLong, distance * 1000, {draggable: true}).addTo(map);
	}

	var obj = {
		innerMap: function() {
			return map;
		}, 
		updateBoundary : function() {
			map.removeLayer(currentDiameter);
			currentDiameter = diameterAt(currentPositionMarker.getLatLng(), distance.val());
			map.fitBounds(currentDiameter.getBounds());
		},
		recentre : function(latLong) {
			map.panTo(latLong);
			map.removeLayer(currentPositionMarker);
			currentPositionMarker = markerAt(latLong);

			map.removeLayer(currentDiameter);
			currentDiameter = diameterAt([latLong.lat, latLong.lng], distance.val());
		},
		on: function(action, callback) {
			map.on(action, callback)
		},

	};
	return obj;
}