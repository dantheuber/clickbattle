/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var gameModel = require('./game.model');

// Clear all games
function cleanup(done) {
	gameModel.model.remove().exec().then(function () { done();	});
}

describe('/api/games', function () {

	var game;

	// reset game before each test
	beforeEach(function () {
		game = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear games before each test
	beforeEach(cleanup);

	// Clear games after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('/api/games')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.instanceof(Array);
					done();
				});
		});

		it('should respond with an error for a malformed game id parameter', function (done) {
			request(app)
				.get('/api/games/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing game id', function (done) {
			request(app)
				.get('/api/games/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a game for its id', function (done) {
			gameModel.model(game).save(function (err, doc) {
				request(app)
					.get('/api/games/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(game);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new game and respond with 201 and the created game', function (done) {
			request(app)
				.post('/api/games')
				.set('Accept', 'application/json')
				.send(game)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(game);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('/api/games')
				.set('Accept', 'application/json')
				.send(game)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing game id', function (done) {
			request(app)
				.put('/api/games/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a game and respond with the updated game', function (done) {
			request(app)
				.post('/api/games')
				.set('Accept', 'application/json')
				.send(game)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					game.name = 'Cat';
					// check if id is stripped on update
					game._id = 'malformed id string';
					request(app)
						.put('/api/games/' + res.body._id)
						.set('Accept', 'application/json')
						.send(game)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', game.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('/api/games')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing game id', function (done) {
			request(app)
				.delete('/api/games/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a game and respond with 204', function (done) {
			request(app)
				.post('/api/games')
				.set('Accept', 'application/json')
				.send(game)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('/api/games/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
