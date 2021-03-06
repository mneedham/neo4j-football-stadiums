var Map = function(options) {
	var startPosition = options.position;
	var distance = options.distanceElement;
	var map = L.map(options.element).setView(options.position, options.zoom);
	
	var layer = L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', { maxZoom: 18 });
  layer.addTo(map);
  
  	var currentPositionMarker = markerAt({ "lat" : startPosition[0], "lng" : startPosition[1]});
	var currentDiameter = diameterAt(startPosition, distance.val());

	var stadiumMarkers = [];

	function markerAt(options) {
		if(options.icon) {
			return L.marker([options.lat, options.lng], {icon: options.icon}).addTo(map);	
		}
		return L.marker([options.lat, options.lng]).addTo(map);
		
	}

	function diameterAt(latLong, distance) {
		return L.circle(latLong, distance * 1000, {draggable: true}).addTo(map);
	}

	function recentre(latLong) {
			map.panTo(latLong);
			map.removeLayer(currentPositionMarker);
			currentPositionMarker = markerAt(latLong);

			map.removeLayer(currentDiameter);
			currentDiameter = diameterAt([latLong.lat, latLong.lng], distance.val());
	}

	function clearStadiumMarkers() {
		$.each(stadiumMarkers, function(idx, marker) {
			map.removeLayer(marker);
		});
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
		recentre : recentre,
		onClick: function(callback) {			
			map.on('click', function(e) {
				recentre(e.latlng);
				callback(e);	
			});			
		},
		addStadium : function(options) {		
			var stadiumIcon = L.icon({
			    iconUrl: 'leaflet/images/marker-stadium-icon.png',			    
			    iconSize:     [25, 27],
			});

			var stadiumMarker = markerAt({lat: options.lat, lng: options.lon, icon: stadiumIcon});	
			stadiumMarker.bindPopup("<strong>" + options.stadium + "</strong><br />" + options.team);
			stadiumMarkers.push(stadiumMarker);
		},
		clearStadiumMarkers : clearStadiumMarkers,

	};
	return obj;
}