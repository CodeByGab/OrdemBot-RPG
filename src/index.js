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

    // Verifica se o comando é "r"
    if (prefixCommand === "r") {
        // Pega o que foi escrito após o comando
        const diceString = args.join(" ");
        const rolles = rollDiceServ(diceString);
    }
    
});

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isChatInputCommand ||  interaction.author.bot) return;
    console.log(interaction.content)
    const { commandName, options } = interaction;

    if (commandName === "r") {
        // Obtém o restante da mensagem após o comando
        const diceString = interaction.options.getString("dados") || interaction.content.slice(".r".length).trim();

        // Verifica se o valor do dado existe
        if (diceString) {
            // Chama a função para processar a rolagem do dado
            const rollResult = rollDiceServ(diceString);

            // Responde com o resultado
            interaction.reply(`Você rolou um dado e obteve: **${rollResult.join(', ')}**`);
        } else {
            // Se não for fornecido um valor válido, responde com uma mensagem de erro
            interaction.reply("Por favor, forneça um valor para o dado. Exemplo: `.r 4d20+5`");
        }
    }
    
});

async function main() {
    const commands = [
        rollDiceCommand
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
