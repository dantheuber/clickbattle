(function () {
	'use strict';

	// register the controller as GameController
	angular
		.module('clickbattleApp.game')
		.controller('GameController', GameController);

	// add GameController dependencies to inject
	// GameController.$inject = [];

	/**
	 * GameController constructor. Main controller for the clickbattleApp.game
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function GameController() {
		// var vm = this;
	}

})();
