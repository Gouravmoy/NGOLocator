// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
        }
      })

      .state('app.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
          }
        }
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html',
            controller: 'searchCriteriaCtrl'
          }
        }
      })
      .state('app.all', {
        url: '/ngoList/1',
        views: {
          'menuContent': {
            templateUrl: 'templates/allNgoList.html',
            controller: 'ngoAllCtrl'
          }
        }
      })

      .state('app.stateSearch', {
        url: '/ngoList/2',
        views: {
          'menuContent': {
            templateUrl: 'templates/NgoListByState.html',
            controller: 'ngobyStateCtrl'
          }
        }
      })
      .state('app.districtSearch', {
        url: '/ngoList/3',
        views: {
          'menuContent': {
            templateUrl: 'templates/NgoListByDistrict.html',
            controller: 'ngobyDctCtrl'
          }
        }
      })

      .state('app.interestSearch', {
        url: '/ngoList/4',
        views: {
          'menuContent': {
            templateUrl: 'templates/NgoListByInterest.html',
            controller: 'ngobyInstCtrl'
          }
        }
      })

      .state('app.pinSearch', {
        url: '/ngoList/5',
        views: {
          'menuContent': {
            templateUrl: 'templates/NgoListByPin.html',
            controller: 'ngobyPinCtrl'
          }
        }
      })

      .state('app.nameSearch', {
        url: '/ngoList/6',
        views: {
          'menuContent': {
            templateUrl: 'templates/NgoListByName.html',
            controller: 'ngobyNameCtrl'
          }
        }
      })

      .state('app.single', {
        url: '/ngoList/id/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/ngoSingle.html',
            controller: 'ngoSingleCtrl'
          }
        }
      })

    /*.state('app.browse', {
     url: '/browse',
     views: {
     'menuContent': {
     templateUrl: 'templates/browse.html'
     }
     }
     })*/
    /*.state('app.searchTypes', {
     url: '/ngoSearchCriteria',
     views: {
     'menuContent': {
     templateUrl: 'templates/searchCriteria.html',
     controller: 'searchCriteriaCtrl'
     }
     }
     })*/

    /*.state('app.single', {
     url: '/ngoList/:playlistId',
     views: {
     'menuContent': {
     templateUrl: 'templates/allNgoList.html',
     controller: 'ngoAllCtrl'
     }
     }
     })*/

    /*.state('app.', {
     url: '/ngoList/id/:id',
     views: {
     'menuContent': {
     templateUrl: 'templates/ngoSingle.html',
     controller: 'ngoSingleCtrl'
     }
     }
     });*/
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
  });
