var app = angular.module('musicHistAgainApp', ['firebase','ngRoute', 'Authorize']);

app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'partials/login.html',
				controller: 'authuserCtrl'
			})
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
		"Auth",
		function($scope, $songsArray, Auth ) {
			var ref = new Firebase ("https://musichistang.firebaseio.com/user/songs");
			// adding in the below for login
			var auth = ref.getAuth();
			var user = auth.uid;

			$scope.songs_list = $songsArray(ref);
			// // -------below from Joe ----
			$scope.showSong = function(song) {
				return song.userId === user;
			};
			// ---------^from Joe-------


// ==========
// still having trouble with delete
			// below is for deleting song
			$scope.deleteSong = function(song){
				$scope.songs.$remove($scope.songs.$getRecord(song)).then(function(ref){

				}),
				function(error){
					console.log(error);
				};
			};
// =============



		}
	]
);

app.controller("AddSongCtrl",
	[
		"$scope",
		"$firebaseArray",
		function($scope, $songsArray) {
			var ref = new Firebase ("https://musichistang.firebaseio.com/user/songs");
			$scope.songs= $songsArray(ref);
			$scope.newSong = {};

// ========
			// $scope.auth = Auth;
			// $scope.auth.$onAuth(function(authData) {
			// 	$scope.userData = authData.uid;
			// });
			// =======

			$scope.addSong = function() {
				$scope.songs.$add({
					artist: $scope.newSong.artist,
					title: $scope.newSong.title,
					album: $scope.newSong.album,
					year: $scope.newSong.year,

				// adding the below for learning derivitives
				// it worked!
					rating: $scope.newSong.rating
				// adding the above for learning derivitives

					// userId: $scope.userData


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

			var ref = new Firebase("https://musichistang.firebaseio.com/user/songs");
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




