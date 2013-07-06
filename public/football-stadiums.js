var footballStadiumsModule = angular.module('footballStadiumsModule', []);
footballStadiumsModule.factory('stadiumsService', function($rootScope) {
	var service = {};
	service.stadiums = [];

	service.updateStadiums = function(stadiums) {
		this.stadiums = stadiums;
		this.broadcastStadiums();
	};

	service.broadcastStadiums = function() {
		$rootScope.$broadcast('handleBroadcast');
	};

	return service;
});

function StadiumSearchFormCtrl($scope, $http, stadiumsService) {	
	$scope.latLong = "51.505, -0.11398315429687499";
	$scope.distance = 10;

	$scope.submit = function() {
    if (this.latLong && this.distance) {
			var lat = this.latLong.split(",")[0].trim(); 
			var lon = this.latLong.split(",")[1].trim();

			$http.get('/stadiums/' + lat + "/" + lon + "/" + this.distance).success(function(data) {
				stadiumsService.updateStadiums(data);
  		});
    }
  };
}

function StadiumSearchResultsCtrl($scope, stadiumsService) {	
	$scope.$on('handleBroadcast',  function() {		
		$scope.stadiums = stadiumsService.stadiums;
	});
}

StadiumSearchResultsCtrl.$inject = ['$scope', 'stadiumsService'];
StadiumSearchFormCtrl.$inject = ['$scope', '$http', 'stadiumsService'];

// $(document).ready(function() {		
// 	var startPosition = [51.505, -0.11398315429687499];
// 	$("#inputLatLong").val(startPosition);
// 	$("#inputDistance").val(10);
	
// 	var map = Map({element: 'map', position: startPosition, distanceElement: $("#inputDistance"), zoom: 11 });
	
// 	var stadiums = Stadiums({
// 		form : $("#stadium-search"), 
// 		latLong: $("#inputLatLong"), 
// 		distance: $("#inputDistance"), 
// 		map: map
// 	});

// 	$("#inputDistance").change(function() {	
// 		map.updateBoundary();	
// 		stadiums.refresh();
// 	})

// 	map.onClick(function(e) {
// 		var latLong = e.latlng;
// 		$("#inputLatLong").val(latLong.lat + "," + latLong.lng);		
// 		stadiums.refresh();
// 	});

// 	stadiums.refresh();
// });