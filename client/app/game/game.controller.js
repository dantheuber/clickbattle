(function () {
	'use strict';

	// register the controller as GameController
	angular
		.module('clickbattleApp')
		.controller('GameController', GameController);

	// add GameController dependencies to inject
	GameController.$inject = [];

	/**
	 * GameController constructor
	 */
	function GameController() {
		var vm = this;

		// view model bindings
		vm.title = 'game';
		vm.doSomething = doSomething;

		// view model implementations
		function doSomething() {
			return [vm.title, 'a sublime controller'].join(' - ');
		}
	}

})();
