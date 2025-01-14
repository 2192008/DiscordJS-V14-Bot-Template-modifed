const config = require('../../JSON/config.json');
const { log } = require('../../helpers/functions');

module.exports = {
    event: 'interactionCreate',
    run: (client, interaction) => {
        if (config.handler.commands.slash === false && interaction.isChatInputCommand()) return;
        if (config.handler.commands.user === false && interaction.isUserContextMenuCommand()) return;
        if (config.handler.commands.message === false && interaction.isMessageContextMenuCommand()) return;

        const command = client.collection.interactioncommands.get(interaction.commandName);

        if (!command) return;

        try {
            command.run(client, interaction);
        } catch (e) {
            log(e, 'err');
        };
    }
};