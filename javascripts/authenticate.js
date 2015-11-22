
var auth = angular.module('Authorize', ['firebase']);

	app.factory("Auth", ["$firebaseAuth",
	  function($firebaseAuth) {
	    var ref = new Firebase("https://musichistang.firebaseio.com");
	    return $firebaseAuth(ref);
	  }
	]);

	//create a user
	app.controller('authuserCtrl', 
		['$scope', 
		'Auth',
		'$firebaseArray',
		'$location',
		function($scope, Auth, $currentAcct, $location){
			$scope.createUser = function(){
				Auth.$createUser({
					email: $scope.email,
					password: $scope.password
				}).then(function(userData){
					console.log("user created with id:" +userData.uid);
					var ref = new Firebase("https://musichistang.firebaseio.com/songs");
					$scope.user = $currentAcct(ref);
					$scope.newUser = {};
					$scope.user.$add({
						email: $scope.email,
						name: $scope.name
					});

					$location.path("/profile");
				}).catch(function(error){
					console.log("user not created with error:" +error);
				});
			},
			$scope.loginUser = function(){
				Auth.$authWithPassword({
					email: $scope.email,
					password: $scope.password
				}).then(function(userData){
					console.log("user logged in with id:" +userData.uid);
					$location.path("/profile");
				}).catch(function(error){
					console.log("user not logged with error:" +error);
				});
			},

			$scope.logOut = function(){
				Auth.$unauth();
				console.log("user logged out");
				//redirect back to login page
				$location.path("/login");
			}
		}
		]
	);