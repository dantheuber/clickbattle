/**
 * Module for the controller definition of the game api.
 * The GameController is handling /api/games requests.
 * @module {game:controller~GameController} game:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = GameController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Game model instance
 * @type {game:model~Game}
 */
var Game = require('./game.model').model;

/**
 * GameController constructor
 * @classdesc Controller that handles /api/games route requests
 * for the game api.
 * Uses the 'gameId' parameter and the 'gameParam' request property
 * to operate with the [main game API Model]{@link game:model~Game} model.
 * @constructor
 * @inherits ParamController
 * @see game:model~Game
 */
function GameController(router) {
	ParamController.call(this, Game,  router);

	// modify select only properties
	// this.select = ['-__v'];

	// omit properties on update
	// this.omit = ['hashedPassword'];

	// property to return (maybe a virtual getter of the model)
	// this.defaultReturn = 'profile';
}

// define properties for the GameController here
GameController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: GameController

};

// inherit from ParamController
GameController.prototype = Object.create(ParamController.prototype);

