import { SlashCommandBuilder } from "discord.js";

const showSheetCommand = new SlashCommandBuilder()
    .setName('sheet')
    .setDescription('Show your actual character sheet')

export default showSheetCommand;