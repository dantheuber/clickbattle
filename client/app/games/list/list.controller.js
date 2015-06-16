(function () {
	'use strict';

	/**
	 * Register the list controller as GameListController
	 */
	angular
		.module('clickbattleApp.game.list')
		.controller('GameListController', GameListController);

	// add GameListController dependencies to inject
	GameListController.$inject = ['$scope', 'socket', '$state', 'games', 'ToggleComponent'];

	/**
	 * GameListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} games - The list of games resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function GameListController($scope, socket, $state, games, ToggleComponent) {
		var vm = this;

		// the array of games
		vm.games = games;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('game', vm.games);
			$scope.$on('$destroy', unsyncGameUpdates);

			function unsyncGameUpdates() {
				socket.unsyncUpdates('game');
			}
		}

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('game.detailView').toggle();
		}
	}

})();
