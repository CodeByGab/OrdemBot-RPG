import { EmbedBuilder } from "@discordjs/builders";

function showSheetEmbed(characterSheet) {
    const showSheetEmbed = new EmbedBuilder()
    .setTitle(characterSheet.name)
    .setThumbnail(characterSheet.img)
    .setColor(characterSheet.color)
    .addFields(

        { name: `Vida:`, value: `${characterSheet.hp.current}/${characterSheet.hp.max}`, inline:true},
        { name: `PE:`, value: `${characterSheet.mana.current}/${characterSheet.mana.max}`, inline:true},
        { name: `Sanidade:`, value: `${characterSheet.sanity.current}/${characterSheet.sanity.max}`, inline:true},

        { name: `NEX: ${characterSheet.level}%`, value: `Max PE: ${characterSheet.level / 5}`, inline: true},
        
        { name: 'Origem:', value: characterSheet.origin, inline: true },
		{ name: 'Classe:', value: characterSheet.class, inline: true },
		{ name: 'Deslocamento:', value: characterSheet.mobility, inline: true},
		{ name: 'Defesa:', value: `${characterSheet.inventory.defense.kevlar.def + 10}`, inline: true},

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
    return Object.entries(weapons).map(([name, weapons]) => `**${weapons.nome}**/${weapons.alcance}\ndano: ${weapons.dano}/${weapons.critico_dado, weapons.critico_multi}`).join('\n')
}

export default showSheetEmbed