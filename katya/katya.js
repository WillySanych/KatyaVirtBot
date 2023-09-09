//@ts-check
const Props = require('../props');

const TelegramBot = require('node-telegram-bot-api');

/** @type {TelegramBot} */
let bot;

function start() {
    bot = new TelegramBot(Props.token, { polling: true });
    bot.on('message', onMessage);
}

/**
 * 
 * @param {TelegramBot.Message} msg 
 * @param { TelegramBot.Metadata}metadata
 */
function onMessage(msg, metadata) {
    const { id, username } = msg.chat;
    console.debug(msg, metadata);
    console.log(username + " : " + msg.text);
    if (!msg.text) {
        return;
    }
    if (hasKatyaName(msg.text)) {
        bot.sendMessage(id, 'Я Катя!');
    }
    //const chatId = msg.chat.id;
    //bot.sendMessage(chatId, 'Received your message');
}

const KATYA_NAMES = ["КАТЯ", "КАТЕ", "КАТЮ", "КАТЕЙ"]
/**
 * @param {string} txt 
 */
function hasKatyaName(txt) {
    const upperText = txt.toUpperCase();
    for (const name of KATYA_NAMES) {
        if (upperText.indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}

module.exports = {
    start
}