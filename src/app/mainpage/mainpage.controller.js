(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainPageController', MainPageController);

	function MainPageController() {
		var vm = this;
        vm.test = 'Hello World!';
	}
})();
