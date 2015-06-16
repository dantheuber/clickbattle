(function () {
	'use strict';

	/**
	 * Introduce the clickbattleApp.game.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires clickbattleApp.mongooseError
	 * @requires clickbattleApp.game.service
	 */

	angular
		.module('clickbattleApp.game.list.edit', [
			'ui.router',
			'ngMaterial',
			'clickbattleApp.mongooseError',
			'clickbattleApp.game.service'
		])
		.config(configureGameListEdit);

	// inject configGameListEdit dependencies
	configureGameListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the game.list.edit state with the edit template
	 * paired with the GameEditController as 'edit' for the
	 * 'detail@game.list' view.
	 * 'game' is resolved as the game with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureGameListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'game.list.edit',
			parent: 'game.list',
			url: '/edit/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterGameListEdit,
			views: {
				'detail@game.list': {
					templateUrl: 'app\games\list\edit\edit.html',
					controller: 'GameEditController',
					controllerAs: 'edit',
					resolve: {game: resolveGameFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onGameListEditEnter dependencies
	onEnterGameListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the game.list.detail state. Open the component
	 * registered with the component id 'game.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterGameListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('game.detailView').open();
		}
	}

	// inject resolveGameDetailRoute dependencies
	resolveGameFromArray.$inject = ['games', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the game.list.edit state. Get the game
	 * from the injected Array of games by using the '_id' property.
	 *
	 * @params {Array} games - The array of games
	 * @params {Object} $stateParams - The $stateParams to read the game id from
	 * @params {Object} _ - The lodash service to find the requested game
	 * @returns {Object|null} The game whose value of the _id property equals $stateParams._id
	 */
	function resolveGameFromArray(games, $stateParams, _) {
		//	return Game.get({id: $stateParams.id}).$promise;
		return _.find(games, {'_id': $stateParams.id});
	}

})();
