/**
 * @ngdoc controller
 * @name clickbattleApp.main.controller:MainController
 * @description
 * Controls mainly nothing currently
 */

(function () {
	'use strict';

	// register the controller as MainController
	angular
		.module('clickbattleApp.main')
		.controller('MainController', MainController);

	/**
	 * @ngdoc function
	 * @name clickbattleApp.main.provider:MainController
	 * @description
	 * Provider of the {@link clickbattleApp.main.controller:MainController MainController}
	 *
	 * @param {Service} $scope The scope service to use
	 * @param {Service} $http The http service to use
	 */

	// MainController.$inject = [];

	function MainController() {
		var vm = this;
	}

})();
