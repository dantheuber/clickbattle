(function () {
	'use strict';

	/**
	 * Introduce the clickbattleApp.game.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires clickbattleApp.mainMenu
	 */

	angular
		.module('clickbattleApp.game.main', [
			'ui.router',
			'clickbattleApp.mainMenu'
		])
		.config(configGameMainRoutes);

	// inject configGameMainRoutes dependencies
	configGameMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the game.main state with the list template for the
	 * 'main' view paired with the GameMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configGameMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'game.main',
			parent: 'game',
			url: '/',
			authenticate: true,
			role: 'user',
			views: {
				'@game': {
					templateUrl: 'app\games\main\main.html',
					controller: 'GameMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Games',
			state: mainState.name,
			role: 'user'
		});
	}

})();
