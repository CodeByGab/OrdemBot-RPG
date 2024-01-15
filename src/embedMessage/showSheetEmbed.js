import { EmbedBuilder } from "@discordjs/builders";

function showSheetEmbed(characterSheet) {
    const showSheetEmbed = new EmbedBuilder()
    .setTitle(characterSheet.name)
    .setThumbnail(characterSheet.img)
    .setColor(characterSheet.color)
    .addFields(

        createCharacterStat('Vida', characterSheet.hp),
        createCharacterStat('PE', characterSheet.pe),
        createCharacterStat('Sanidade', characterSheet.sanity),

        { name: `NEX: ${characterSheet.level}%`, value: `Max PE: ${characterSheet.level / 5}`, inline: true},
        
        { name: 'Origem:', value: characterSheet.origin, inline: true },
		{ name: 'Classe:', value: characterSheet.class, inline: true },
		{ name: 'Deslocamento:', value: characterSheet.mobility, inline: true},
		{ name: 'Defesa:', value: calcDef(characterSheet), inline: true},

        { name: 'Atributos:', value: formatAttributes(characterSheet.attributes)},
        { name: 'Ataques:', value: formatWeapons(characterSheet.inventory.weapons), inline: true}
        
        
    )
    .setImage(characterSheet.skills_img);

    return showSheetEmbed;
}

function formatAttributes(attributes){
    return Object.entries(attributes).map(([attributes, value]) => `${attributes}: +${value}`).join(', ');
}

function formatWeapons(weapons){
    return Object.entries(weapons).map(([name, weapons]) => `**${weapons.nome}** / ${weapons.alcance}\ndano: ${weapons.dano} / ${weapons.critico_dado, weapons.critico_multi}`).join('\n')
}

function createCharacterStat(name, stat){
    return {
        name: `${name}:`,
        value: `${stat.current}/${stat.max}`,
        inline: true
    }
}

function calcDef(sheet){
    return `${sheet.inventory.defense.kevlar.def + sheet.skills_text.AGI + 10}`
}

export default showSheetEmbed;