'use strict'
const http = require('http')
const Bot = require('messenger-bot')
//const auth = require('./credentials.js')

let bot = new Bot({
  token: process.env.token || auth.token,
  verify: 'VERIFY_TOKEN'})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let logText = payload.message.text
  let replyText ="";
  if(logText.toLowerCase() == "hey")
    replyText="How are you?";
  else
    replyText= logText;
  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text: replyText  }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${logText}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000, "0.0.0.0")
console.log('Echo bot server running at port 3000.')

