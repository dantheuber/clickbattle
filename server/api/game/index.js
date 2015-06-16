/**
 * Module for handling game requests.
 * Initializing the [GameController]{@link game:controller~GameController}
 * and configuring the express router to handle the game api
 * for /api/games routes. All Routes are registered after the
 * [request parameters]{@link game:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the game api routes
 * @module {express.Router} game
 * @requires {@link module:middleware}
 * @requires {@link game:controller~GameController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var GameController = require('./game.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the game api routes
module.exports = router;

/**
 * The api controller
 * @type {game:controller~GameController}
 */
var controller = new GameController(router);

// register game route parameters, uncomment if needed
// var registerGameParameters = require('./game.params');
// registerGameParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the user role
var isAuthenticated = auth.hasRole('user');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register game routes
router.route('/')
	.get(controller.index)
	.post(controller.create);

router.route('/' + controller.paramString)
	.get(controller.show)
	.delete(controller.destroy)
	.put(controller.update)
	.patch(controller.update);
