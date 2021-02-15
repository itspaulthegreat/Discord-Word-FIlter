/* eslint-disable no-console */

//Don't touch from here down unless you know partially what you're doing
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const tokens = require("./token.json");



client.login(tokens.BOT_TOKEN).catch(console.error);
client.on('ready', () => {
  console.log('Now Online, ready to filter!');
});


client.on('message', message => {
  if(config.FILTER_LIST.some(word => message.content.toLowerCase().includes(word))){
    message.delete()
    const embed = new Discord.RichEmbed() //Ver 11.5.1 of Discord.js
  .setTitle("BlackListed Word")
  .setDescription("This is a blacklisted word")
  .setTimestamp()
  ms = message.channel.send(embed).then(msg => {
    msg.delete(10000)
  })
  .catch("error");

  }})
