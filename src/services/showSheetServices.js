import showSheetEmbed from "../embedMessage/showSheetEmbed.js";

function showSheetServ(character, mess, isThistext) {
    const characterSheetEmbed = showSheetEmbed(character, isThistext);
    mess.reply({
        embeds: [characterSheetEmbed]
    });
}

export default showSheetServ;