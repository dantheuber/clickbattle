(function () {
	'use strict';

	/**
	 * Introduce the clickbattleApp.game module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires clickbattleApp.game.main
	 * @requires clickbattleApp.game.list
	 * @requires clickbattleApp.game.create
	 */
	angular
		.module('clickbattleApp.game', [
			'ngResource',
			'ui.router',
			'clickbattleApp.game.main',
			'clickbattleApp.game.list',
			'clickbattleApp.game.create'
		])
		.config(configGameRoutes);

	// inject configGameRoutes dependencies
	configGameRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract game state with the game template
	 * paired with the GameController as 'index'.
	 * The injectable 'games' is resolved as a list of all games
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configGameRoutes($urlRouterProvider, $stateProvider) {
		// The game state configuration
		var gameState = {
			name: 'game',
			url: '/games',
			abstract: true,
			templateUrl: 'app\games\game.html',
			controller: 'GameController',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/game', '/game/');
		$stateProvider.state(gameState);
	}

})();
