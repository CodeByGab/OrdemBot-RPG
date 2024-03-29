import { config } from "dotenv";
import {
    Client,
    GatewayIntentBits,
    InteractionCollector,
    Routes,
    ActivityType
} from "discord.js";
import { REST } from "discord.js";

import rollDiceCommand from "./commands/rollDiceCommand.js";
import rollDiceServ from "./services/rollDiceServices.js";
import showSheetCommand from "./commands/showSheetCommand.js";
import showSheetTextCommand from "./commands/showSheetTextCommand.js";
import showSheetServ from "./services/showSheetServices.js";

import fighterSheet from "./characterSheetTemp/fighterSheet.json" assert { type: "json" };
import expertSheet from "./characterSheetTemp/expertSheet.json" assert { type: "json"};
import ocultistSheet from "./characterSheetTemp/ocultistSheet.json" assert { type: "json"};

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

// to fast commands
const prefix = '.';

client.on("ready", () => {
    console.log(`${client.user.displayName} has logged in`);

    client.user.setActivity("OrdemBot RPG", { type: ActivityType.Playing });
    
});

client.on("messageCreate", (message) => {

    if (message.author.bot) return;
    const text = message.content.toLowerCase();
    if (text.includes("test")) {
        message.reply("Tested!");
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const prefixCommand = args.shift().toLowerCase();
    const diceString = args.join(" ");
    if (prefixCommand === "r") {
        rollDiceServ(diceString, message);
    }
    
});

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isChatInputCommand) return;
    const { commandName, options, content } = interaction;

    if (commandName === "r") {
        const diceString = options.getString("dados");
        rollDiceServ(diceString, interaction);
    }

    const characterSheet = fighterSheet;

    if (commandName === "sheet") {
        showSheetServ(characterSheet, interaction, false);
    }

    if(commandName === "sheet-text") {
        showSheetServ(characterSheet, interaction, true);
    }
    
});

async function main() {
    const commands = [
        rollDiceCommand,
        showSheetCommand,
        showSheetTextCommand
    ];

    try {
        const commandsLength = commands.length;
        console.log(
            `Started refreshing ${commandsLength} applications (/) commands.`
        );

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
        console.log(
            `Successfully reloaded ${commandsLength} applications (/) commands.`
        );
    } catch (err) {
        console.error(err);
    }
}

main();
