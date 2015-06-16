/* jshint unused:false */
'use strict';

var should = require('should');

var game = require('./game.model');
var gameDefinition = game.definition;
var gameSchema= game.schema;
var Game = game.model;

var gameData = [
	{
		name: 'Dog',
		info: 'Hello, this is dog.',
		active: true
	}, {
		name: 'Bugs Bunny',
		info: 'Famous Bunny.',
		active: true
	}, {
		name: 'Nyan Cat',
		info: 'No comment.',
		active: false
	}
];

// Clear all games
function cleanup(done) {
	Game.remove().exec().then(function () { done();	});
}

describe('Game Model', function () {

	// Clear games before testing
	before(cleanup);

	// Clear games after testing
	after(cleanup);

// Check test conditions for game tests
	it('should start with no games', function (done) {
		Game.find({}, function (err, games) {
			games.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var gameModel = new Game(gameData[0]);

		// Clear games after running this suite
		after(cleanup);

		it('should insert a new game', function (done) {
			gameModel.save(function (err, game) {
				game.should.have.properties(gameModel);
				done(err);
			});
		});

		it('should insert a list of games', function (done) {
			Game.create(gameData, function (err, game) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(gameData.length);
				done(err);
			});
		});


		it('should find a game by _id property', function (done) {
			Game.findById(gameModel._id, function (err, game) {
				game.should.have.properties(gameData[0]);
				done(err);
			});
		});

		it('should update a game', function (done) {
			gameModel.name = 'foo';
			gameModel.save(function (err) { done(err);	});
		});

		it('should remove a game', function (done) {
			gameModel.remove(function (err) { done(err); });
		});
	}); // crud
});
