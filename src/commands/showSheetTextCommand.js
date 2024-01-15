import { SlashCommandBuilder } from "@discordjs/builders";

const showSheetTextCommand = new SlashCommandBuilder()
    .setName('sheet-text')
    .setDescription('Show your actual character sheet, just in text')

export default showSheetTextCommand;