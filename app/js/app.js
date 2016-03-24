'use strict';

(function() {
    
    angular.module('app', ['ui.router', 'app.controller'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', RouteConfig]);
    
    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
		
           
        $stateProvider
			.state('home', {
				url: "/",
				views: {
					'header': {
						templateUrl: 'partials/header.html'
					},
					'content': {
						templateUrl: 'partials/list.html',
						controller: 'ListCtrl'
					}
        		}
			});
		
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
		
		$urlRouterProvider.otherwise("/");
    }

})();