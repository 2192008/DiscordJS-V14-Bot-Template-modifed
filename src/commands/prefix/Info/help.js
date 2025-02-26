const { EmbedBuilder } = require('discord.js');
const config = require('../../../JSON/config.json');
const GuildSchema = require('../../../modals/GuildSchema');

module.exports = {
    structure: {
        name: 'help',
        description: 'View all the possible commands!',
        aliases: ['h']
    },
    run: async (client, message, args) => {

        const prefix = (await GuildSchema.findOne({ guild: message.guildId }))?.prefix || config.handler.prefix;

        const mapIntCmds = client.applicationcommandsArray.map((v) => `\`/${v.name}\`: ${v.description}`);
        const mapPreCmds = client.collection.prefixcommands.map((v) => `\`${prefix}${v.structure.name}\` (${v.structure.aliases.length > 0 ? v.structure.aliases.map((a) => `**${a}**`).join(', ') : 'None'}): ${v.structure.description || '[No description was provided]'}`);

        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Help command')
                    .addFields(
                        { name: 'Slash commands', value: `${mapIntCmds.join('\n')}` },
                        { name: 'Prefix commands', value: `${mapPreCmds.join('\n')}` }
                    )
            ]
        });

    }
};
