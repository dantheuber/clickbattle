(function () {
	'use strict';

	/**
	 * Register the edit controller as GameDetailController
 	 */

	angular
		.module('clickbattleApp.game.list.detail')
		.controller('GameDetailController', GameDetailController);

	// add GameDetailController dependencies to inject
	GameDetailController.$inject = ['$state', 'game'];

	/**
	 * GameDetailController constructor
	 */
	function GameDetailController($state, game) {
		var vm = this;

		// the current game to display
		vm.game = game;
		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current game
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.game._id});
		}

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
