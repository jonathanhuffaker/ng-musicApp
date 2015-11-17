var app = angular.module('musicHistAgainApp', ['firebase','ngRoute']);

app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
			.when('/songs/list', {
				templateUrl: 'partials/song-list.html',
				controller: 'SongListCtrl'
			})
			.when('/songs/new', {
				templateUrl: 'partials/song-form.html',
				controller: 'AddSongCtrl'
			})
			.when('/songs/:songId', {
				templateUrl: 'partials/song-detail.html',
				controller: 'SongDetailCtrl'
			})
			.otherwise({ redirectTo: '/songs/list' });
	}]);
	


app.controller("SongListCtrl", 
	[
		"$scope",
		"$firebaseArray",
		function($scope, $songsArray) {
			var ref = new Firebase ("https://musichistang.firebaseio.com/songs");

			$scope.songs_list = $songsArray(ref);
		}
	]
);

app.controller("AddSongCtrl",
	[
		"$scope",
		"$firebaseArray",
		function($scope, $songsArray) {
			var ref = new Firebase ("https://musichistang.firebaseio.com/songs");
			$scope.songs= $songsArray(ref);
			$scope.newSong = {};

			$scope.addSong = function() {
				$scope.songs.$add({
					artist: $scope.newSong.artist,
					title: $scope.newSong.title,
					album: $scope.newSong.album,
					year: $scope.newSong.year
				});
			};
		}
	]
);

app.controller("SongDetailCtrl",
	[
		"$scope",
		"$routeParams",
		"$firebaseArray",
		function($scope, $routeParams, $songsArray) {
			$scope.selectedSong = {};

			$scope.songId = $routeParams.songId;

			var ref = new Firebase("https://musichistang.firebaseio.com/songs");
			$scope.songs = $songsArray(ref);

			$scope.songs.$loaded()
				.then(function() {
					$scope.selectedSong = $scope.songs.$getRecord($scope.songId);
				})
				.catch(function(error) {
					console.log("Error:", error);
				});
		}

	]
);
