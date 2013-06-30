$(document).ready(function() {		
	var startPosition = [51.505, -0.11398315429687499];
	var startDistance = 10;
	$("#inputLatLong").val(startPosition);
	$("#inputDistance").val(startDistance);
	
	var map = L.map('map').setView(startPosition, 11);
	L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18
    }).addTo(map);

	var currentPositionMarker = markerAt({ "lat" : startPosition[0], "lng" : startPosition[1]});
	var currentDiameter = diameterAt(startPosition, startDistance);

	$("#inputDistance").change(function() {
		map.removeLayer(currentDiameter);
		currentDiameter = diameterAt(currentPositionMarker.getLatLng(), $(this).val());		
	})

	function markerAt(latLong) {
		return L.marker([latLong.lat, latLong.lng]).addTo(map);
	}

	function diameterAt(latLong, distance) {
		return L.circle(latLong, distance * 1000).addTo(map);
	}

	map.on('click', function(e) {
		var latLong = e.latlng;
		$("#inputLatLong").val(latLong.lat + "," + latLong.lng);
		map.panTo(e.latlng);

		map.removeLayer(currentPositionMarker);
		currentPositionMarker = markerAt(e.latlng);

		map.removeLayer(currentDiameter);
		currentDiameter = diameterAt([e.latlng.lat, e.latlng.lng], $("#inputDistance").val());
	});

	$("#stadium-search").submit(function(e) {
		e.preventDefault();
		var lat = $("#inputLatLong").val().split(",")[0].trim(); 
		var lon = $("#inputLatLong").val().split(",")[1].trim(); 
		var distance = $("#inputDistance").val();

		var result = "<table class=\"table\"><thead>";
		result += "<tr><th>Team</th><th>Stadium</th><th>Distance (km)</th></tr>";
		result += "</thead><tbody>";		

		$.getJSON('/stadiums/' + lat + "/" + lon + "/" + distance, function(data) {
			$.each(data, function(key, val) {
				result += "<tr>";
				result += "<td>" + val.team + "</td>";
				result += "<td><a target='_blank' href='https://maps.google.co.uk/maps?q=" + val.lat + "," + val.lon + "'>" + val.stadium + "</a></tf>";
				result += "<td>" + val.distance + "</td>";
				result += "</tr>";				
			});

			if(data.length == 0) {
				result += "<td colspan='3'>No stadiums found - try changing location or distance</td>";
			}

			result += "</tbody></table>";			

			$("div.results").html(result)
		});

		return false;		
	});
});