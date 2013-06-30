$(document).ready(function() {		
	var stadiums = Stadiums({form : $("#stadium-search"), latLong: $("#inputLatLong"), distance: $("#inputDistance")});

	var startPosition = [51.505, -0.11398315429687499];
	$("#inputLatLong").val(startPosition);
	$("#inputDistance").val(10);
	
	var map = Map({element: 'map', position: startPosition, distanceElement: $("#inputDistance"), zoom: 11 });

	$("#inputDistance").change(function() {	
		map.updateBoundary();	
		stadiums.update();
	})

	map.onClick(function(e) {
		var latLong = e.latlng;
		$("#inputLatLong").val(latLong.lat + "," + latLong.lng);		
		stadiums.update();
	});

	stadiums.update();
});