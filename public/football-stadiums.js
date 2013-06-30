$(document).ready(function() {		
	var stadiums = Stadiums({form : $("#stadium-search"), latLong: $("#inputLatLong"), distance: $("#inputDistance")});

	var startPosition = [51.505, -0.11398315429687499];
	var startDistance = 10;
	$("#inputLatLong").val(startPosition);
	$("#inputDistance").val(startDistance);
	
	var map = Map({element: 'map', position: startPosition, distance: startDistance, zoom: 11 });

	$("#inputDistance").change(function() {	
		map.updateBoundary($(this).val());	
		stadiums.update();
	})

	map.on('click', function(e) {
		var latLong = e.latlng;
		$("#inputLatLong").val(latLong.lat + "," + latLong.lng);		
		map.recentre(e.latlng, $("#inputDistance").val());
		stadiums.update();
	});

	stadiums.update();
});