angular.module('starter.controllers', []).run(function ($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function () {
    $http.get('http://chirp-saswat.azurewebsites.net/auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    /*console.log("inside login");
    $ionicLoading.show({

      template: 'Logging In...'
    })

    $http.post('http://ngolocatorapp.azurewebsites.net/auth/login', $scope.user).success(function (data) {

      if (data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $scope.user = {username: '', password: ''};
        $ionicLoading.hide();
        $location.path('/playlists');
      }
      else {
        $ionicLoading.hide();
        $scope.user = {username: '', password: ''};
        $scope.error_message = data.message;
      }
    });*/



    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('loginCtrl', function($scope, $http, $rootScope, $location, $ionicLoading) {

  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function () {

    console.log("inside login");
    $ionicLoading.show({

      template: 'Logging In...'
    })

    $http.post('http://ngolocatorapp.azurewebsites.net/auth/login', $scope.user).success(function (data) {

      if (data.state == 'success') {
     /*   $scope.error_message="login successful ";*/
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $scope.user = {username: '', password: ''};
        $ionicLoading.hide();
        $location.path('/app/playlists');
      }
      else {
        $ionicLoading.hide();
        $scope.user = {username: '', password: ''};
        $scope.error_message = data.message;
      }
    });


  };
})

  .controller('signupCtrl', function ($scope, $http, $rootScope, $location, $ionicLoading) {

    $scope.user = {name: '', email: '', username: '', password: ''};
    $scope.error_message = '';

    $scope.register = function () {
      console.log("Entered to register");
      $ionicLoading.show({
        template: 'Signing In...'
      })
      $http.post('http://ngolocatorapp.azurewebsites.net/auth/signup', $scope.user).success(function (data) {

        if (data.state == 'success') {
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          $scope.user = {username: '', password: ''};
          $ionicLoading.hide();
          $location.path('/app/playlists');
        }
        else {
          $ionicLoading.hide();
          $scope.user = {name: '', email: '', username: '', password: ''};
          $scope.error_message = data.message;
        }
      });
    };

  });
