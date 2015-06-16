(function () {
	'use strict';

	/**
	 * Introduce the clickbattleApp.game.service module.
	 * Register the game resource as Game, register the
	 * service as GameService.
	 *
	 * @requires {clickbattleApp.resource}
	 */
	angular
		.module('clickbattleApp.game.service', ['clickbattleApp.resource'])
		.factory('Game', Game)
		.service('GameService', GameService);

	// add Game dependencies to inject
	Game.$inject = ['Resource'];

	/**
	 * Game resource constructor
	 */
	function Game($resource) {
		// factory members
		var apiURL = '/api/games';
		// public API
		return $resource(apiURL + '/:id/:controller');
	}

	// add GameService dependencies to inject
	GameService.$inject = ['Game'];

	/**
	 * GameService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} Game The resource provided by clickbattleApp.game.resource
	 * @returns {Object} The service definition for the GameService service
	 */
	function GameService(Game) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new game
		 *
		 * @param  {Object}   game - gameData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(game, callback) {
			var cb = callback || angular.noop;

			return Game.create(game,
				function (game) {
					return cb(game);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a game
		 *
		 * @param  {Object}   game - gameData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(game, callback) {
			var cb = callback || angular.noop;

			return Game.remove({id: game._id},
				function (game) {
					return cb(game);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new game
		 *
		 * @param  {Object}   game - gameData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(game, callback) {
			var cb = callback || angular.noop;

			return Game.update(game,
				function (game) {
					return cb(game);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
