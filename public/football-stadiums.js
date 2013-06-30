$(document).ready(function() {
	$("#stadium-search").submit(function(e) {
		e.preventDefault();
		var lat = $("#inputLatLong").val().split(",")[0].trim(); 
		var lon = $("#inputLatLong").val().split(",")[1].trim(); 
		var distance = $("#inputDistance").val();

		$.getJSON('/stadiums/' + lat + "/" + lon + "/" + distance, function(data) {
			var teams = "<div class='span2'><ul><li><strong>Team</strong></li>";
			var stadiums = "<div class='span2'><ul><li><strong>Stadium</strong></li>";
			var distances = "<div class='span2'><ul><li><strong>Distance (km)</strong></li>";

			$.each(data, function(key, val) {
				teams += "<li>" + val.team + "</li>";
				stadiums += "<li><a target='_blank' href='https://maps.google.co.uk/maps?q=" + val.lat + "," + val.lon + "'>" + val.stadium + "</a></li>";
				distances += "<li>" + val.distance + "</li>";
			});

			teams += "</ul></div>";
			stadiums += "</ul></div>";

			var result = "<div class='row'>"
			result += teams;
			result += stadiums;	
			result += distances;
			result += "</div>";			

			$("div.results").html(result)
		});

		return false;		
	});
});