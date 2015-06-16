(function () {
	'use strict';

	/**
	 * Register the list controller as GameMainController
	 */

	angular
		.module('clickbattleApp.game.main')
		.controller('GameMainController', GameMainController);

	// add GameMainController dependencies to inject
	GameMainController.$inject = ['$state'];

	/**
	 * GameMainController constructor
	 */
	function GameMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the game.list state
		 */
		function showList() {
			$state.go('game.list');
		}
	}

})();
