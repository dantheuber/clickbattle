/**
 * @ngdoc controller
 * @name clickbattleApp.controller:AppController
 * @description
 * This is the application wide controller of the clickbattleApp application
 */

(function () {
	'use strict';

	// register the controller as AppController
	angular
		.module('clickbattleApp')
		.controller('AppController', AppController);

	/**
	 * @ngdoc function
	 * @name clickbattleApp.provider:AppController
	 * @description
	 * Provider of the {@link clickbattleApp.controller:AppController AppController}
	 *
	 * @param {Auth} Auth - The authentication service used for logging out
	 * @param {$location} $mdSidenav - The sidenav service used to communicate with the sidenav components
	 */

	AppController.$inject = ['Auth', '$mdSidenav'];

	function AppController(Auth, $mdSidenav) {
		var vm = this;

		vm.sidenavId = 'mainMenu';

		/**
		 * @ngdoc function
		 * @name logout
		 * @methodOf clickbattleApp.controller:AppController
		 * @description
		 * Logout the current user
		 */
		vm.logout = Auth.logout;

		/**
		 * @ngdoc function
		 * @name isLoggedIn
		 * @methodOf clickbattleApp.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#isLoggedIn isLoggedIn} of the Auth service
		 */
		vm.isLoggedIn = Auth.isLoggedIn;

		/**
		 * @ngdoc function
		 * @name closeMainMenu
		 * @methodOf clickbattleApp.controller:AppController
		 * @description
		 * Close the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.closeMainMenu = closeMainMenu;

		/**
		 * @ngdoc function
		 * @name openMainMenu
		 * @methodOf clickbattleApp.controller:AppController
		 * @description
		 * Open the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.openMainMenu = openMainMenu;

		/**
		 * @ngdoc function
		 * @name currentUser
		 * @methodOf clickbattleApp.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#getCurrentUser getCurrentUser} of the Auth service
		 */
		vm.currentUser = Auth.getCurrentUser();

		/**
		 * Close the main menu sidenav component
		 */
		function closeMainMenu() {
			return $mdSidenav(vm.sidenavId).close();
		}

		/**
		 * Open the main menu sidenav component
		 */
		function openMainMenu() {
			return $mdSidenav(vm.sidenavId).open();
		}
	}
})();
