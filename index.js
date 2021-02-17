/* eslint-disable no-console */

//Don't touch from here down unless you know partially what you're doing
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
//const tokens = require("./token.json");



client.login(process.env.token).catch(console.error);
client.on('ready', () => {
  console.log('Now Online, ready to filter!');
});


client.on('message', message => {
  if(config.FILTER_LIST.some(word => message.content.toLowerCase().includes(word))){
    const embed = new Discord.MessageEmbed() //Ver 11.5.1 of Discord.js
  .setTitle("BlackListed Word")
  .setDescription("This is a blacklisted word")
  .setTimestamp()
  ms = message.channel.send(embed).then(msg => {
    msg.delete()
  })
  .catch("error");

  }})

  const usersMap = new Map();

client.on('message', message => {

    if (client.channels.get == 809339752419033118) return;
    if (message.author.bot) return;

    if(usersMap.has(message.author.id)){
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        if(difference > 2500){
            clearTimeout(timer);
            userData.message = message;
            userData.msgCount = 1;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, 5000);
            usersMap.set(message.author.id, userData);
        } else{
            let msgCount = userData.msgCount;
            if(parseInt(msgCount) === 5){
                const role = message.guild.roles.cache.get('809009387678859275');
                message.member.roles.add(role);
                message.channel.send('You have been muted for 1 hr');
                setTimeout(() => {
                    message.member.roles.remove(role);
                }, 3600)
            }else{
                msgCount ++;
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else{
        let timeout = setTimeout(()=>{
            usersMap.delete(message.author.id);
        }, 5000)
        usersMap.set(message.author.id, {
            msgCount:1,
            lastMessage: message,
            timer: timeout
        });
    }
})
