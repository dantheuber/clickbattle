/**
 * @ngdoc controller
 * @name clickbattleAppgame.list.edit.controller:GameEditController
 * @description
 * Controller of the game edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as GameEditController
	 */

	angular
		.module('clickbattleApp.game.list.edit')
		.controller('GameEditController', GameEditController);

	/**
	 * @ngdoc function
	 * @name clickbattleAppgame.list.edit.provider:GameEditController
	 * @description
	 * Provider of the {@link clickbattleAppgame.list.edit.controller:GameEditController GameEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} GameService The GameService to use
	 * @param {Resource} game The game data to use
	 */

	GameEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'GameService', 'game'];

	function GameEditController($state, $stateParams, $mdDialog, Toast, GameService, game) {
		var vm = this;

		// defaults
		vm.game = angular.copy(game, vm.game);
		vm.displayName = game.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current game
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.game._id});
		}

		/**
		 * Open the game list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a game by using the GameService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.game._id || form && !form.$valid) {
				return;
			}

			GameService.update(vm.game)
				.then(updateGameSuccess)
				.catch(updateGameCatch);

			function updateGameSuccess(updatedGame) {
				// update the display name after successful save
				vm.displayName = updatedGame.name;
				Toast.show({text: 'Game ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateGameCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating Game ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the game if she wants to delete the current selected game.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete game ' + vm.displayName + '?')
				.content('Do you really want to delete game ' + vm.displayName + '?')
				.ariaLabel('Delete game')
				.ok('Delete game')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a game by using the GameService remove method
			 * @api private
			 */
			function performRemove() {
				GameService.remove(vm.game)
					.then(deleteGameSuccess)
					.catch(deleteGameCatch);

				function deleteGameSuccess() {
					Toast.show({type: 'success', text: 'Game ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteGameCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting game ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}
	}
})();
