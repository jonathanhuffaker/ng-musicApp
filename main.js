var app = angular.module('musicHistAgainApp', []);

app.controller("navCtrl", function($scope){
	$scope.viewMusic = "View Music";
	$scope.addMusic = "Add Music";
	$scope.profile = "Profile";
})

app.controller("leftFormCtrl", function($scope){
	$scope.songLength = "slider Here";
	$scope.artist = "Artist";
	$scope.album =  "Album";
	$scope.genre = "Genre";


})

// app.controller("songListCtrl", function($scope){
	// $scope.viewMusic = "";
	// $scope.songName = [
 //  {name: "Song Name 1"},
 //  {name: "Song Name 2"},
 //  {name: "Song Name 3"},
 //  {name: "Song Name 4"}
 //  ];

 //  $scope.artistName = [

 //  ];

 	// 	$scope.songs = "";
		// $.ajax({
		// 	url:"/songs.json"})
		// 	.done(function(songList){
		// 		$scope.songs = songList;
		// 		$scope.songs(songList)
		// 		console.log(songList.songs);
		// 	});
		// });


app.controller("songListCtrl", function($scope, $http) {
  $scope.songs = null;
  $http.get('songs.json')
  .success(function(data, status, headers, config) {
      console.log("data", data);
    return $scope.songs = data;
  })
  .error(function(data, status, headers, config) {
    console.log("data", data);
    console.log("status", status);
    console.log("headers", headers);
    console.log("config", config);
  });




})
