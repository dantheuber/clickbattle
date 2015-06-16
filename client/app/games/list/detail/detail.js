(function () {
	'use strict';

	/**
	 * Introduce the clickbattleApp.game.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('clickbattleApp.game.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configureGameListDetail);

	// inject configGameRoutes dependencies
	configureGameListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'game.detail' state with the detail template
	 * paired with the GameDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'game' is resolved as the game with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureGameListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'game.list.detail',
			parent: 'game.list',
			url: '/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterGameListDetail,
			views: {
				'detail@game.list': {
					templateUrl: 'app\games\list\detail\detail.html',
					controller: 'GameDetailController',
					controllerAs: 'detail',
					resolve: {game: resolveGameFromArray}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onGameListDetailEnter dependencies
	onEnterGameListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the game.list.detail state. Open the component
	 * registered with the component id 'game.detailView'.
	 *
 	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterGameListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('game.detailView').open();
		}
	}

	// inject resolveGameFromArray dependencies
	resolveGameFromArray.$inject = ['games', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the game.detail state
	 *
	 * @params {Array} games - The array of games
	 * @params {Object} $stateParams - The $stateParams to read the game id from
	 * @returns {Object|null} The game whose value of the _id property equals $stateParams._id
	 */
	function resolveGameFromArray(games, $stateParams, _) {
		return _.find(games, {'_id': $stateParams.id});
	}

})();
