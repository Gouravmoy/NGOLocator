angular.module('starter.controllers', []).run(function ($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function () {
    $http.get('http://chirp-saswat.azurewebsites.net/auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
})

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http) {

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
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
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
       $location.path('/searchTypes');
       }
       else {
       $ionicLoading.hide();
       $scope.user = {username: '', password: ''};
       $scope.error_message = data.message;
       }
       });*/


      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('searchCriteriaCtrl', function ($scope) {
    $scope.searchTypes = [
      {title: 'Search All NGOs', id: 1},
      {title: 'Search NGOs by State', id: 2},
      {title: 'Search NGOs by District', id: 3},
      {title: 'Search NGOs by Area of Interest', id: 4},
      {title: 'Search NGOs by Pin', id: 5},
      {title: 'Search NGOs by Name', id: 6}
    ];
  })

  .controller('ngoAllCtrl', function ($scope, $http, $ionicLoading) {
    console.log("inside search all ngos");
    $ionicLoading.show({
      template: 'Fetching NGOs Details...'
    })
    $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos').success(function (data) {
      $ionicLoading.hide();
      $scope.ngoList = data;
    });
  })

  .controller('ngoSingleCtrl', function ($scope, $http, $ionicLoading, $stateParams) {

    console.log("inside search single ngos");
    $ionicLoading.show({
      template: 'Fetching NGOs Details...'
    })
    $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos/' + $stateParams.id).success(function (data) {
      $ionicLoading.hide();
      $scope.ngoSingle = data;
    });
  })

  //check
  .controller('ngobyStateCtrl', function ($scope, $http, $ionicLoading) {
    console.log("inside search all ngos");

    $scope.stateDtls = {
      stateSelected: ""
    }
    $ionicLoading.show({
      template: 'Fetching State Details...'
    })

    $http.get('http://services.groupkt.com/state/get/IND/all').success(function (data) {
      $ionicLoading.hide();
      $scope.stateList = data.RestResponse.result;
    });

    var ddlFruits = "Goa";

    //console.log($scope.state);

    $scope.getNgosByState = function () {
      //console.log("Inside get Ngos by state "+$scope.stateSelected);
      console.log("Inside get Ngos by state " + $scope.stateDtls.stateSelected);
      $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos/query/state/' + angular.uppercase($scope.stateDtls.stateSelected)).success(function (data) {
        $ionicLoading.hide();
        $scope.ngoList = data;
      });
    }
  })

  .controller('ngobyDctCtrl', function ($scope, $http, $ionicLoading) {
    console.log("inside search all ngos");

    $scope.stateDtls = {
      stateSelected: "",
      distSelected: ""
    }


    $ionicLoading.show({
      template: 'Fetching State Details...'
    })

    $http.get('http://services.groupkt.com/state/get/IND/all').success(function (data) {
      $ionicLoading.hide();
      $scope.stateList = data.RestResponse.result;
    });

    $scope.getDistByState = function () {
      console.log("state details " + $scope.stateDtls.stateSelected)
      $ionicLoading.show({
        template: 'Fetching Distict Details...'
      })
      $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos/query/state/dist/' + angular.uppercase($scope.stateDtls.stateSelected)).success(function (data) {
        $ionicLoading.hide();
        $scope.distList = data.distList;
      });
    }

    $scope.getNGOsByDist = function () {


      $ionicLoading.show({
        template: 'Fetching Distict Details...'
      })
      $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos/query/state/' + angular.uppercase($scope.stateDtls.stateSelected) + '/dist/' + $scope.stateDtls.distSelected).success(function (data) {
          $ionicLoading.hide();
          $scope.ngoDistList = data;
        }
      )
      ;

    }
  })

  .controller('ngobyInstCtrl', function ($scope, $http, $ionicLoading) {
    /*$scope.pin = '1234';*/


    $scope.instDtls = {
      interest: ""
    }
    $scope.getNgoByInterest = function () {

      $ionicLoading.show({
        template: 'Searching...'
      })
      console.log('Inside Interest Search');
      console.log($scope.instDtls.interest);

      $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos/query/areaOfInst/' + $scope.instDtls.interest).success(function (data) {
        $ionicLoading.hide();
        $scope.ngoInstList = data;
      });
    };
  })

  .controller('ngobyPinCtrl', function ($scope, $http, $ionicLoading) {
    /*$scope.pin = '1234';*/


    $scope.pinDtls = {
      pin: ""
    }
    $scope.getNgoByPin = function () {

      /*$ionicLoading.show({
       template: 'Searching...'
       })*/
      console.log('Inside Pin Search');
      console.log($scope.pinDtls.pin);

      $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos/query/state/pin/' + $scope.pinDtls.pin).success(function (data) {
        $ionicLoading.hide();
        $scope.ngoPinList = data;
      });
    };
  })
  .controller('ngobyNameCtrl', function ($scope, $http, $ionicLoading) {
    $scope.nameDtls = {
      name: ""
    }
    $scope.getNgoByName = function () {
      console.log('Inside Name Search');
      $ionicLoading.show({
        template: 'Fetching NGO Details...'
      })
      $http.get('http://ngolocatorapp.azurewebsites.net/api/ngos/query/name/' + $scope.nameDtls.name).success(function (data) {
        $ionicLoading.hide();
        $scope.ngoNameList = data;
      });
    };
  })

  .controller('loginCtrl', function ($scope, $http, $rootScope, $location, $ionicLoading) {

    $scope.user = {username: '', password: ''};
    $scope.error_message = '';

    $scope.login = function () {

      console.log("inside login");
      $ionicLoading.show({

        template: 'Logging In...'
      })
      console.log($scope.user);
      $http.post('http://ngolocatorapp.azurewebsites.net/auth/login', $scope.user).success(function (data) {

        if (data.state == 'success') {
          /*   $scope.error_message="login successful ";*/
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          $scope.user = {username: '', password: ''};
          $ionicLoading.hide();
          $location.path('/app/search');
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
          $location.path('/app/search');
        }
        else {
          $ionicLoading.hide();
          $scope.user = {name: '', email: '', username: '', password: ''};
          $scope.error_message = data.message;
        }
      });
    };

  });
