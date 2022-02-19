const { Client, Intents , MessageEmbed} = require("discord.js");
const akinator = require("discord.js-akinator");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    console.log("Logged in as "+client.user.tag);
    client.user.setPresence({
    activities: [{ name: `akinator start in ${client.guilds.cache.size} servers`, type: 'WATCHING' }],
  });
});

let msg;
client.on("messageCreate", async message => {
msg = message;

    if(command(`start`)) {
       await akinator(message, {
            language: "en",
            childMode: false,
            gameType: "character",
            useButtons: true,
        });
        
    }else if(command("ping")){

      const cnt = new Date().getTime();
      const ping = cnt - message.createdAt;
      const embed = new MessageEmbed()
      .setColor("#FFC0CB")
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle("🏓Pong.")
      .setDescription(`Your ping is ${ping} ms\nLatency is ${client.ws.ping} ms`)
      message.reply({embeds:[embed]})

    }



});




function command(name){
  return msg.content.startsWith(`${process.env['Prefix']}${name}`)
}


client.login(process.env['TOKEN'])