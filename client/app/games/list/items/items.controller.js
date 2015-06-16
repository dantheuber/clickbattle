(function () {
	'use strict';

	/**
	 * Register the list controller as GameItemsController
	 */

	angular
		.module('clickbattleApp.game.list.items')
		.controller('GameItemsController', GameItemsController);

	// add GameItemsController dependencies to inject
	GameItemsController.$inject = ['$state'];

	/**
	 * GameItemsController constructor
	 */
	function GameItemsController($state) {
		var vm = this;

		// the selected item id
		var curGameId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} game - The object to check for selection
		 */
		function isSelected(game) {
			return curGameId === game._id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} game - The game to edit
		 */
		function showInDetails(game) {
			curGameId = game._id;
			$state.go('game.list.detail', {'id': curGameId});
		}
	}

})();
