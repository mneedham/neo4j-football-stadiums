var Stadiums = function(formElement) {
	var NO_STADIUMS_MESSAGE = "No stadiums found - try changing location or distance";
	formElement.submit(function(e) {
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
				result += "<td colspan='3'>" + NO_STADIUMS_MESSAGE + "</td>";
			}

			result += "</tbody></table>";			

			$("div.results").html(result)
		});

		return false;		
	});

	var obj = {
		update : function() {
			formElement.submit();
		}
	}
	return obj;
}