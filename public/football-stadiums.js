var footballStadiumsModule = angular.module('footballStadiumsModule', []);
footballStadiumsModule.factory('stadiumsService', function($rootScope, $http) {
	var service = {};
	service.stadiums = [];

	service.updateStadiums = function(stadiums) {
		this.stadiums = stadiums;
		$rootScope.$broadcast('stadiumsUpdated');
	};

	service.refreshStadiums = function(lat, lon, distance) {
		$http.get('/stadiums/' + lat + "/" + lon + "/" + distance).success(function(data) {			
			service.stadiums = data;
			$rootScope.$broadcast('stadiumsUpdated');				
		});		
	};

	return service;
});

footballStadiumsModule.factory('mapService', function($rootScope) {
	var service = {};
	var map = Map({element: 'map', position: [51.505, -0.11398315429687499], distanceElement: $("#inputDistance"), zoom: 11 });

	map.onClick(function(e) {
		var latLong = e.latlng;
		service.latLong = latLong;
		$rootScope.$broadcast('mapUpdated');
	});

	service.addStadium = map.addStadium;
	service.clearStadiumMarkers = map.clearStadiumMarkers;
	service.updateBoundary = map.updateBoundary;

	return service;
});

function StadiumSearchFormCtrl($scope, $http, stadiumsService, mapService) {	
	$scope.latLong = "51.505, -0.11398315429687499";
	$scope.distance = 10;

	$scope.submit = function() {
    if (this.latLong && this.distance) {
			var lat = this.latLong.split(",")[0].trim(); 
			var lon = this.latLong.split(",")[1].trim();

			mapService.clearStadiumMarkers();
			stadiumsService.refreshStadiums(lat, lon, this.distance);
    }
  };

	$scope.$on('mapUpdated',  function() {		
		$scope.latLong = mapService.latLong.lat + "," + mapService.latLong.lng;
		$scope.submit();
	});  

	$scope.submit();
}

function StadiumSearchPageCtrl($scope, stadiumsService, mapService) {	
	$scope.$on('stadiumsUpdated',  function() {		
		$scope.stadiums = stadiumsService.stadiums;

		$.each($scope.stadiums, function(key,val) {
			mapService.addStadium(val);
		})

		mapService.updateBoundary();	
	});	
}

StadiumSearchPageCtrl.$inject = ['$scope', 'stadiumsService', 'mapService'];
StadiumSearchFormCtrl.$inject = ['$scope', '$http', 'stadiumsService', 'mapService'];