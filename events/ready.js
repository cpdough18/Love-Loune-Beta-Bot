const chalk = require('chalk');
const config = require("../config.json");
const pkg = require("../package.json");
module.exports = client => {
    console.log(chalk.green(`Love Lounge Bot is now online and ready to go! Here is some information:`));
    console.log(chalk.green(`Love Lounge Bot loaded successfully @ ${Date()}`));
    console.log(chalk.green(`Owner: ${config.ownerTag}`));
    console.log(chalk.green(`Logged in as: ${config.name} `));
    console.log(chalk.green(`Prefix: ${config.prefix}`));
    //console.log(`In ${bot.guilds.size} servers | Serving ${bot.users.size} users | A total of ${bot.channels.size} channels.`);
    console.log(chalk.green("|--------------------(Loading commands)------------------------|"));
    client.user.setActivity(`!help | Love Lounge Bot | with that dun dun dun`)
    console.log(chalk.green("DONE!"));
}