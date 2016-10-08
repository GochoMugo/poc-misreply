# poc: misreply

> Demonstrating the **flaw of receiving replies using `bot.once()`**
>
> Context: **Building telegram bots using [node-telegram-bot-api][botlib]**

Using `bot.once()` to receive a reply from a user, like coded below,
is flawed.

```js
bot.sendMessage(chatId, messageText).then(function(msg) {
    bot.once("message", function(reply) {
        // ... use the reply ...
    });
});
```

**Why?** The `bot.once()` method registers a new event handler for the
`"message"` event. It will be invoked when a new message is received
by the bot from **any** chat. This means that a message from a  user
in another chat can be used as the reply above.

Find more information here:

* [Issue thread #197][issue-197] (tldr; [comment][comment-197])
* [Issue thread #187][issue-187] (tldr; [comment][comment-187])


[issue-187]:https://github.com/yagop/node-telegram-bot-api/issues/187
[comment-187]:https://github.com/yagop/node-telegram-bot-api/issues/187#issuecomment-252398511
[issue-197]:https://github.com/yagop/node-telegram-bot-api/issues/197
[comment-197]:https://github.com/yagop/node-telegram-bot-api/issues/197#issuecomment-251189417


## demonstration:

This demonstration expects you have created a telegram bot, thus
have a bot token. You should also know your telegram user ID in advance.

First, clone this repo and install the dependencies:

```bash
$ git clone https://github.com/GochoMugo/poc-misreply
$ cd poc-misreply
$ npm install
```

The script uses environment variables `TELEGRAM_TOKEN` and `TELEGRAM_USER`
for bot's telegram token and target user (chat) ID, respectively.
You may also pass them as command-line arguments, in order:

```bash
$ node index.js <TOKEN> <USER>

# or

$ export TELEGRAM_TOKEN=<TOKEN>
$ export TELEGRAM_USER=<USER>
$ node index.js
```

**Note:** replace `<TOKEN>` for your bot token and `<USER>` with your user ID.


## license:

**The MIT License (MIT)**

Copyright (c) 2016 GochoMugo (www.gmugo.in)


[botlib]:https://github.com/yagop/node-telegram-bot-api
