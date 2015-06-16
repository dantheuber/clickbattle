	/**
	 * @ngdoc overview
	 * @name clickbattleApp.admin.user.list.items
	 * @requires ui.router
	 * @requires components/listImage
	 *
	 * @description
	 * The `clickbattleApp.admin.user.list.items` module which provides:
	 *
	 * - {@link clickbattleApp.admin.user.list.items.controller:UserItemsController UserItemsController}
	 */

(function () {
	'use strict';

	angular
		.module('clickbattleApp.admin.user.list.items', [
			'ui.router',
			'clickbattleApp.listImage'
		]);

})();
