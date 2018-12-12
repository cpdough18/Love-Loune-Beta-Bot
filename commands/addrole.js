const winston = require('winston')
var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './log.txt' })
    ]
})
exports.run = function (client, message, args, args2, cmd) {
    if (message.guild.member(message.author).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) { //roles.has is false for addroel & removerole
        const Discord = require('discord.js');
        const config = require("../config.json");
        var guild = message.guild;
        const embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setDescription("**Command: **" + `${config.prefix}addrole`)
            .addField("**Usage:**", `${config.prefix}addrole <@username> <Role>`)
            .addField("**Example:**", `${config.prefix}addrole @#0001 Owner`)
            .addField("**Expected Result From Example:**", "#0001 should have role Owner")
        const member = message.guild.member(message.mentions.users.first());
        const role = message.guild.roles.find(role => role.name === args2.join(' '));
        if (member === message.author.id) return message.reply("You cannot add a role to yourself")
        if (!member || !role) return message.channel.send({ embed: embed })
        // async (member, role) => {
            // try {
                // let member1 = await message.guild.member(message.mentions.users.first());
                // let role1 = await message.guild.roles.find("name", args2.join(' '));
                 member.addRole(role)
                 .then((GuildMember) => {
                 message.channel.send(`:white_check_mark: Role ${role} has been added to ${member} `)
                 })
            // }
            .catch ((err) => {
                console.log(err)
                message.channel.send(`:x: Was not able to add Role ${role} to ${member} `)
                message.channel.send("**Error:** " + err.message + " **Code:** " + err.code)
                return;
            });
        // }

        // if (errors != "") {


        // }


    }
    else {
        message.channel.send("You Do Not Have the Permission `MANAGE_ROLES_OR_PERMISSIONS`");
    }
    logger.log('info', `Addrole command used by ${message.author.tag} ${message.author.id} Time: ${Date()} Guild: ${guild}`)
};