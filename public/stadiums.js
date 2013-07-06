var Stadiums = function(options) {
	var formElement = options.form;
	var latLongField = options.latLong;
	var distanceField = options.distance;
	var map = options.map;
	var NO_STADIUMS_MESSAGE = "No stadiums found - try changing location or distance";

	function buildTableHeader() {
		var result = "<table class=\"table\"><thead>";
		result += "<tr><th>Team</th><th>Stadium</th><th>Distance (km)</th></tr>";
		result += "</thead><tbody>";	
		return result;
	}

	function add(team) {
		return "<td>" + team + "</td>";
	}

	function addStadium(stadium, lat, lon) {
		return "<td><a target='_blank' href='https://maps.google.co.uk/maps?q=" + lat + "," + lon + "'>" + stadium + "</a></tf>";
	}

	function addRow(val) {
		var result = "<tr>";
		result += add(val.team); 
		result += addStadium(val.stadium, val.lat, val.lon)
		result += add(val.distance);
		result += "</tr>";	
		return result;
	}

	function onSubmitForm(e) {
		e.preventDefault();
		// var lat = latLongField.val().split(",")[0].trim(); 
		// var lon = latLongField.val().split(",")[1].trim(); 
		// var distance = distanceField.val();

		// var result = buildTableHeader();
		// map.clearStadiumMarkers();
		// $.getJSON('/stadiums/' + lat + "/" + lon + "/" + distance, function(data) {
		// 	$.each(data, function(key, val) {
		// 		result += addRow(val);
		// 		map.addStadium(val);
		// 	});

		// 	if(data.length == 0) {
		// 		result += "<td colspan='3'>" + NO_STADIUMS_MESSAGE + "</td>";
		// 	}

		// 	result += "</tbody></table>";			

		// 	$("div.results").html(result)
		// });

		return false;		
	}

	formElement.submit(onSubmitForm);

	var obj = {
		refresh : function() {
			formElement.submit();
		}
	}
	return obj;
}