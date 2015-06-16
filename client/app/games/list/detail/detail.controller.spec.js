/*jshint -W030 */
'use strict';

describe('Controller: GameDetailController', function () {

	// load the controller's module
	beforeEach(module('clickbattleApp.list.detail'));

	var controller;
	var game;
	var stateSpy;

	// Setup some states to test the navigation functions
	beforeEach(inject(function ($state) {
		stateSpy = sinon.stub($state, 'go');
		game = {_id: '1337id', name: 'admin', active: true};
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		controller = $controller('GameDetailController', {
			user: user
		});
	}));

	it('should exist as an object', function () {
		Should.exist(controller);
		controller.should.be.an.Object;
	});

	it('should have a user property which is the current game', function () {
		Should.exist(controller.user);
		controller.user
			.should.be.an.Object
			.and.eql(user);
	});

	it('should have a method to navigate to the parent state', function () {
		Should.exist(controller.goBack);
		controller.goBack.should.be.a.Function;
		controller.goBack();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^').called.should.be.ok;
	});

	it('should have a method to navigate to the edit state which is passing the correct id parameter', function () {
		Should.exist(controller.edit);
		controller.edit.should.be.a.Function;
		controller.edit();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^.edit', {'id': user._id}).called.should.be.ok;
	});
});
