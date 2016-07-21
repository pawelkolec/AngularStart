(function() {
    'use strict';

    angular
      .module('app')
      .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', RouteConfig]);

      function RouteConfig($stateProvider, $locationProvider, $urlRouterProvider) {

          $stateProvider
              .state('home', {
                  url: "/",
                  views: {
                      'header': {
                          templateUrl: 'header/header.html',
                          controller: 'HeaderController',
                          controllerAs: 'headerCtrl'
                      },
                      'content': {
                          templateUrl: 'mainpage/mainpage.html',
                          controller: 'MainPageController',
                          controllerAs: 'mainpage'
                      },
                      'footer': {
                          templateUrl: 'footer/footer.html',
                          controller: 'FooterController',
                          controllerAs: 'footerCtrl'
                      }
                  }
              });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

          $urlRouterProvider.otherwise('/');
        }

})();
