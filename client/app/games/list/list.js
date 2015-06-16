(function () {
	'use strict';

	/**
	 * Introduce the clickbattleApp.game.list module
	 * and configure it.
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires clickbattleApp.socket
	 * @requires clickbattleApp.mainMenu,
	 * @requires clickbattleApp.toggleComponent,
	 * @requires clickbattleApp.game.list.detail
	 * @requires clickbattleApp.game.list.edit
	 * @requires clickbattleApp.game.list.items
	 */

	angular
		.module('clickbattleApp.game.list', [
			'ngMaterial',
			'ui.router',
			'clickbattleApp.socket',
			'clickbattleApp.mainMenu',
			'clickbattleApp.toggleComponent',
			'clickbattleApp.game.list.detail',
			'clickbattleApp.game.list.edit',
			'clickbattleApp.game.list.items'
		])
		.config(configGameListRoutes);

	// inject configGameListRoutes dependencies
	configGameListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the game.list state with the list template fpr the
	 * 'main' view paired with the GameListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configGameListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'game.list',
			parent: 'game',
			url: '/list',
			authenticate: true,
			role: 'user',
			resolve: {
				games:  resolveGames
			},
			views: {

				// target the unnamed view in the game state
				'@game': {
					templateUrl: 'app\games\list\list.html',
					controller: 'GameListController',
					controllerAs: 'list'
				},

				// target the content view in the game.list state
				'content@game.list': {
					templateUrl: 'app\games\list\items\items.html',
					controller: 'GameItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('game.main', {
			name: 'Games List',
			state: listState.name
		});
	}

	// inject resolveGames dependencies
	resolveGames.$inject = ['Game'];

	/**
	 * Resolve dependencies for the game.list state
	 *
	 * @params {Game} Game - The service to query games
	 * @returns {Promise} A promise that, when fullfilled, returns an array of games
	 */
	function resolveGames(Game) {
		return Game.query().$promise;
	}

})();
