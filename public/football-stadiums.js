$(document).ready(function() {
	$("#stadium-search").submit(function(e) {
		e.preventDefault();
		var lat = $("#inputLat").val(); 
		var lon = $("#inputLong").val();
		var distance = $("#inputDistance").val();

		$.getJSON('/stadiums/' + lat + "/" + lon + "/" + distance, function(data) {
			var teams = "<div class='span2'><ul><li><strong>Team</strong></li>";
			var stadiums = "<div class='span2'><ul><li><strong>Stadium</strong></li>";
			var distances = "<div class='span2'><ul><li><strong>Distance (km)</strong></li>";

			$.each(data, function(key, val) {
				teams += "<li>" + val.team + "</li>";
				stadiums += "<li>" + val.stadium + "</li>";
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