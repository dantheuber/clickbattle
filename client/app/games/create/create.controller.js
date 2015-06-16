/**
 * @ngdoc controller
 * @name clickbattleApp.game.create.controller:GameCreateController
 * @description
 * Controller of the game create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as GameCreateController
	 */

	angular
		.module('clickbattleApp.game.create')
		.controller('GameCreateController', GameCreateController);

	/**
	 * @ngdoc function
	 * @name clickbattleApp.game.create.provider:GameCreateController
	 * @description
	 * Provider of the {@link clickbattleApp.game.create.controller:GameCreateController GameCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Game The Game resource
	 * @param {Service} GameService The Game service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link clickbattleApp.game.create.controller:GameCreateController GameCreateController}
	 */

	GameCreateController.$inject = ['$mdDialog', 'Game', 'GameService', 'Toast'];

	function GameCreateController($mdDialog, Game, GameService, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name game
		 * @propertyOf clickbattleApp.game.create.controller:GameCreateController
		 * @description
		 * The new game data
		 *
		 * @returns {Object} The game data
		 */
		vm.game = new Game();

		// view model bindings (documented below)
		vm.create = createGame;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name createGame
		 * @methodOf clickbattleApp.game.create.controller:GameCreateController
		 * @description
		 * Create a new game by using the GameService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createGame(form) {
			// refuse to work with invalid data
			if (vm.game._id || (form && !form.$valid)) {
				return;
			}

			GameService.create(vm.game)
				.then(createGameSuccess)
				.catch(createGameCatch);

			function createGameSuccess(newGame) {
				Toast.show({
					type: 'success',
					text: 'Game ' + newGame.name + ' has been created',
					link: {state: 'game.list.detail', params: {id: newGame._id}}
				});
				vm.close();
			}

			function createGameCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new Game'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf clickbattleApp.game.create.controller:GameCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf clickbattleApp.game.create.controller:GameCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
