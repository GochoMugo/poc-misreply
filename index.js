/**
 * POC for flaw in receiving reply using 'bot.once()'
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo (www.gmugo.in)
 */
console.log("POC for flaw in receiving reply using 'bot.once()'\n");


// npm-installed modules
const TelegramBot = require("node-telegram-bot-api");


// module variables
let bot, token, userId;


// we require a Telegram token for the bot
token = process.argv[2] || process.env.TELEGRAM_TOKEN;
if (!token) {
    console.error("Error: Missing Token");
    process.exit(1);
}


// we require a ID of a user to send message
userId = parseInt(process.argv[3] || process.env.TELEGRAM_USER, 10);
if (!userId) {
    console.error("Error: Missing User ID");
    process.exit(1);
}


// create the bot
bot = new TelegramBot(token, { polling: true });


let expectedChatId = userId;
let message = "Send me a message from another chat";
bot.sendMessage(userId, message).then(function() {
    console.log("> Message sent. Waiting for reply from chat '%d'", expectedChatId);
    bot.once("message", function(msg) {
        const actualChatId = msg.chat.id;
        console.log("> Received message from chat '%d'", actualChatId);
        console.log("> message text: %s", msg.text);
        if (expectedChatId === actualChatId) {
            console.log("> Try sending message from another chat");
            process.exit(1);
        }
        console.log("> !! Got a reply from ANOTHER chat");
        process.exit(0);
    });
}).catch(function(error) {
    console.error(error);
    process.exit(1);
});
