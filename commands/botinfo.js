function timeCon(time) {
    time = time * 1000
    let days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0
    days = Math.floor(time / 86400000)
    time -= days * 86400000
    hours = Math.floor(time / 3600000)
    time -= hours * 3600000
    minutes = Math.floor(time / 60000)
    time -= minutes * 60000
    seconds = Math.floor(time / 1000)
    time -= seconds * 1000
    days = days > 9 ? days : "" + days
    hours = hours > 9 ? hours : "" + hours
    minutes = minutes > 9 ? minutes : "" + minutes
    seconds = seconds > 9 ? seconds : "" + seconds
    return (parseInt(days) > 0 ? days + " days " : " ") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + " hours ") + minutes + " minutes " + seconds + " seconds."
}
const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
const fs = require('fs');
const dir = './commands'; //check if work or not...
let commandsLength = 0;
fs.readdir(dir, (err, files) => {
  commandsLength=(files.length);
});

exports.run = function (client, message, args, args2, cmd) {
    const Discord = require('discord.js');
    const config = require("../config.json");
    const pkg = require("../package.json");
    const os = require("os")
    var guild = message.guild;
    let totalPeople = 0;
    let botNumber = 0;
    var brokenglass = client.emojis.find(val => val.name === 'brokenGlass')
    client.guilds.map(person => totalPeople += person.memberCount)
    client.guilds.map(botPerson => botNumber += botPerson.members.filter(member => member.user.bot).size)
    const embed = new Discord.RichEmbed()
        .setColor('36393E')
        .setTitle(client.user.username + " V: " + pkg.version + ` Stats`)
        .setDescription(client.user.username + ' has been awake for ' + timeCon(process.uptime()))
        .addField(`:construction_worker: Creator`, config.ownerTag, true)
        .addField('🏠 Guilds', client.guilds.size, true)
        .addField('📄 Channels', client.channels.size, true)
        .addField('🤵 Total Users', (totalPeople - botNumber), true) //repl with -test cmd contents
        .addField(':arrow_left: Prefix', config.prefix, true)
        .addField(':clipboard: # of Commands - Some not accessable to users', commandsLength - 1 + 20, true)
        .addField(`${brokenglass} Shards`, 'N/A')
        // .addField('💾 Last Commit', jsonBody[0].commit.message, true)
        .addField('🐏 RAM Usage', `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`, true)
        .addField('🏓 Ping', `${(client.ping).toFixed(0)} ms`, true)
        .addField(`:control_knobs: Library`, `Discord JS v${Discord.version}`, true)
        .addField(`:computer: Node.js `, `${process.version}`, true)
        .addField(`:white_check_mark: Host OS`, `${os.platform}`, true)

    //    .addField(`:electric_plug: CPU Usage:`,);

    if (args.join(' ') === "nerdy") {
        message.channel.send({ embed: embed })
    }
    else {
        const embednotNerdy = new Discord.RichEmbed()
            .setColor('36393E')
            .setTitle(client.user.username + " V: " + pkg.version)
            .setDescription('Awake for ' + timeCon(process.uptime()))
            .addField(':crown: Developer/Owner', config.ownerTag, true)
            .addField('🏠 Guilds', client.guilds.size, true)
            .addField('📄 Channels', client.channels.size, true)
            .addField('🤵 Total Users', (totalPeople - botNumber), true)
            .addField(':arrow_left: Prefix', config.prefix, true)
            .addField(':clipboard: # of Commands - Some not accessable to users', commandsLength - 1 + 20, true)
            .addField(`${brokenglass} Shards`, 'N/A',true)
            message.channel.send({ embed: embednotNerdy })
        }
    logger.log('info', `Botinfo command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}`)
};
