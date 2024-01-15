import { EmbedBuilder } from "@discordjs/builders";

function showSheetEmbed(characterSheet, text) {
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

        ...(text ? [{ name: 'Perícias', value: formatSkills(characterSheet.skills_text )}] : []),

        { name: 'Atributos:', value: formatAttributes(characterSheet.attributes)},
        { name: 'Ataques:', value: formatWeapons(characterSheet.inventory.weapons), inline: true}
        
    )
    // .setImage(characterSheet.skills_img);
    setSkills(showSheetEmbed, characterSheet, text)

    return showSheetEmbed;
}


function createCharacterStat(name, stat){
    return {
        name: `${name}:`,
        value: `${stat.current}/${stat.max}`,
        inline: true
    };
}
function setSkills(embed, sheet, text){
    if(!text){
        return embed.setImage(sheet.skills_img);
    }
}

function formatSkills(skills){
    return Object.entries(skills).map(([skills, value]) => `${skills}: ${value}`).join(', ');
}

function formatAttributes(attributes){
    return Object.entries(attributes).map(([attributes, value]) => `${attributes}: +${value}`).join(', ');
}

function formatWeapons(weapons){
    return Object.entries(weapons).map(([name, weapons]) => `**${weapons.nome}** / ${weapons.alcance}\ndano: ${weapons.dano} / ${weapons.critico_dado, weapons.critico_multi}`).join('\n');
}

function calcDef(sheet){
    return `${sheet.inventory.defense.kevlar.def + sheet.skills_text.AGI + 10}`;
}

export default showSheetEmbed;