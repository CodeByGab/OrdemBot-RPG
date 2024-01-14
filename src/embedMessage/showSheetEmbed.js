import { EmbedBuilder } from "@discordjs/builders";

function showSheetEmbed(characterSheet) {
    const showSheetEmbed = new EmbedBuilder()
    .setTitle(characterSheet.name)
    .setThumbnail(characterSheet.img)
    .setColor(characterSheet.color)
    .addFields(
        { name: `NEX: ${characterSheet.level}%`, value: `Max PE: ${characterSheet.level / 5}`},
        
        { name: 'Origem:', value: characterSheet.origin, inline: true },
		{ name: 'Classe:', value: characterSheet.class, inline: true },

        { name: 'Attributes:', value: formatAttributes(characterSheet.attributes)},
    )
    .setImage(characterSheet.skills);

    return showSheetEmbed
}

function formatAttributes(attributes){
    return Object.entries(attributes).map(([attributes, value]) => `${attributes}: +${value}`).join('\n');
}

export default showSheetEmbed