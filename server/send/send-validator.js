//@ts-check
const { RestError } = require("../rest-error");
const { chats } = require('../../data-base/database');

/**
 * @typedef {import("./send-controller").SendRequest} SendRequest
 */

/**
 * @param {any} body 
 * @returns {SendRequest}
 */
function validSendRequest(body) {
    return {
        chatName: validChatName(body['chatName']),
        message: validMessage(body['message']),
        type: validType(body['type']),
    }
}

/**
 * @param {any} chat
 * @returns {string}
 */
function validChatName(chat) {
    if (typeof chat !== 'string') {
        throw new RestError('The "chatName" parameter is missing or is not a string.', 400);
    }
    const upperChart = chat.toUpperCase();
    const availableChats = chats.getNames();
    if (!availableChats.includes(upperChart)) {
        throw new RestError('The value of parameter "chatName" is not supported. Use one of: ' + availableChats, 400);
    }
    return upperChart;
}

/**
 * @param {any} message
 * @returns {string}
 */
function validMessage(message) {
    if (typeof message !== 'string') {
        throw new RestError('The "message" parameter is missing or is not a string.', 400);
    }
    return message;
}

const TYPES = ['TEXT', 'MARKDOWN'];
/**
 * @param {any} type
 * @returns {import("./send-controller").SendType}
 */
function validType(type) {
    if (typeof type === 'undefined') {
        return 'TEXT';
    }
    if (typeof type !== 'string') {
        throw new RestError('The "type" parameter is not a string.', 400);
    }
    if (TYPES.indexOf(type.toUpperCase()) < 0) {
        throw new RestError('The value of parameter "type" is not supported. Use one of: ' + TYPES, 400);
    }
    // @ts-ignore
    return type;
}

module.exports = {
    validSendRequest
}