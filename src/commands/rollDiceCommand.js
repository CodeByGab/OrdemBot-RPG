import { SlashCommandBuilder } from "@discordjs/builders";

const rollDiceCommand = new SlashCommandBuilder()
    .setName('r')
    .setDescription('Rolar dados')
    .addStringOption(option => 
        option.setName('dados')
            .setDescription('O valor do dado')
            .setRequired(true)
    );

export default rollDiceCommand;