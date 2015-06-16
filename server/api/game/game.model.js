/**
 * An module for defining and initializing the Game model.
 * Exporting the Game model definition, schema and model instance.
 * @module {Object} game:model
 * @property {Object} definition - The [definition object]{@link game:model~GameDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link game:model~GameSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link game:model~Game}
 */
'use strict';

var mongoose = require('mongoose');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The Game model definition
 * @type {Object}
 * @property {String} name - The name of this game
 * @property {String} info - Details about this game
 * @property {Boolean} active - Flag indicating this game is active
 */
var GameDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean
};

/**
 * The Game model schema
 * @type {MongooseSchema}
 */
var GameSchema = new mongoose.Schema(GameDefinition);

/**
 * Attach security related plugins
 */
GameSchema.plugin(createdModifiedPlugin);

GameSchema.plugin(requestContext, {
	propertyName: 'modifiedBy',
	contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
GameSchema
	.path('name')
	.validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Game model
 *  @type {Game}
 */
var Game = mongoose.model('Game', GameSchema);

module.exports = {

	/**
	 * The Game model definition object
	 * @type {Object}
	 * @see game:GameModel~GameDefinition
	 */
	definition: GameDefinition,

	/**
	 * The Game model schema
	 * @type {MongooseSchema}
	 * @see game:model~GameSchema
	 */
	schema: GameSchema,

	/**
	 * The Game model instance
	 * @type {game:model~Game}
	 */
	model: Game

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
	// jshint validthis: true
	var self = this;

	// check for uniqueness of user name
	this.constructor.findOne({name: value}, function (err, game) {
		if (err) {
			throw err;
		}

		if (game) {
			// the searched name is my name or a duplicate
			return respond(self.id === game.id);
		}

		respond(true);
	});
}
