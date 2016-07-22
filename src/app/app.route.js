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
                          templateUrl: 'app/header/header.html',
                          controller: 'HeaderController',
                          controllerAs: 'headerCtrl'
                      },
                      'content': {
                          templateUrl: 'app/mainpage/mainpage.html',
                          controller: 'MainPageController',
                          controllerAs: 'mainpage'
                      },
                      'footer': {
                          templateUrl: 'app/footer/footer.html',
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
