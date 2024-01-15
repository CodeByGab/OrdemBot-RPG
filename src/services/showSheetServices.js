import showSheetEmbed from "../embedMessage/showSheetEmbed.js";

function showSheetServ(character, mess) {
    const characterSheetEmbed = showSheetEmbed(character);
    mess.reply({
        embeds: [characterSheetEmbed]
    });
}

export default showSheetServ;