(function () {
	'use strict';

	/**
	 * Introduce the clickbattleApp.game.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {clickbattleApp.mongooseError}
	 * @requires {clickbattleApp.remoteUnique}
	 * @requires {clickbattleApp.game.service}
	 */

	angular
		.module('clickbattleApp.game.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'clickbattleApp.mongooseError',
			'clickbattleApp.remoteUnique',
			'clickbattleApp.game.service'
		])
		.config(configureGameCreateRoutes);

	// inject configGame.CreateRoutes dependencies
	configureGameCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'game.list.create' state. The onEnterGameListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app\games\create\create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureGameCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'game.list.create',
			parent: 'game.list',
			url: '/create',
			authenticate: true,
			role: 'user',
			onEnter: onEnterGameListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the game.list.create state.
	 * Open the create dialog
	 */

	onEnterGameListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterGameListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'GameCreateController',
			controllerAs: 'create',
			templateUrl: 'app\games\create\create.html',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('game.list');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();
		}
	}

})();
