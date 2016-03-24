'use strict';

(function() {
    
    angular.module('app.controller', [])
    .controller('ListCtrl', ['$scope', ListCtrl]);

    function ListCtrl($scope) {
		
        $scope.name = "World";
    }
    
})();