(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var scope;

    beforeEach(module('app'));
    beforeEach(inject(function($controller) {
        vm = $controller('MainPageController');
    }));

    it('should create "phones" model with 3 phones', function() {
        expect(vm.test).toBe('Hello World!');
    });
  });
})();
