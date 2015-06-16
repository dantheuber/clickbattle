/**
 * Module for registering broadcast updates to clients when
 * the Game model changes. Exports the
 * [register function]{@link game:socket~registerGameSockets}
 * to register the model schema events on the socket instance.
 * @module {function} game:socket
 * @requires {@link game:model}
 */
'use strict';

/**
 * The Game model instance
 * @type {game:model~Game}
 */
var Game = require('./game.model').model;

// export the function to register all socket broadcasts
exports.register = registerGameSockets;

/**
 * Register Game model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Game model events on
 */
function registerGameSockets(socket) {
	Game.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Game.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Game save event on a socket object: 'game:save'
 * @param {socket.io} socket - The socket object to emit the Game save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('game:save', doc);
}

/**
 * Emit a Game remove event on a socket object: 'game:remove'
 * @param {socket.io} socket - The socket object to emit the Game remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('game:remove', doc);
}
