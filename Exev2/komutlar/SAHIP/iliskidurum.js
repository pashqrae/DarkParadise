
const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
    
    let config = {
        "sevgilimvar": "899421109525561365",
        "sevgilimyok": "899421732534878268",
    }
    let sevgilimvar = new disbut.MessageButton().setStyle('red').setLabel('💕 Sevgilim Var').setID('sevgilimvar')
    let sevgilimyok = new disbut.MessageButton().setStyle('red').setLabel('💔 Sevgilim Yok').setID('sevgilimyok')

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send(new MessageEmbed().setColor("BLACK").setDescription(`Lütfen bir kullanıcı belirtiniz!`)).then(msg => msg.delete({ timeout: 6000 }));

    if (member.roles.cache.has(config.sevgilimvar)) return message.channel.send(new MessageEmbed()
    .setFooter(`🌟 Kahve sizi önemsiyor ❤️ ${message.guild.name}`)
    .setColor("RED")
    .setDescription(`${member} adlı kullanıcının \n\n${client.emojis.cache.find(x => x.name === "axze_stat")} İlişki Durumu: \`Sevgilisi Var\``)).then(msg => msg.delete({ timeout: 8000 }));
    
    if (member.roles.cache.has(config.sevgilimyok)) return message.channel.send(new MessageEmbed()
    .setFooter(`🌟 Kahve sizi önemsiyor ❤️ ${message.guild.name}`)
    .setColor("PURPLE")
    .setDescription(`${member} adlı kullanıcının \n\n${client.emojis.cache.find(x => x.name === "axze_stat")} İlişki Durumu: \`Sevgilisi Yok\``)).then(msg => msg.delete({ timeout: 8000 }));
    
    let embed = new MessageEmbed().setFooter(`🌟 Kahve sizi önemsiyor ❤️ ${message.guild.name}`).setColor("BLACK").setDescription(`${member} adlı kullanıcı ilişki durumunu belirtmemiş \n\nAşağıdaki butonlardan ilişki durumunu belirte bilir! \n<#897215831786811473> Kanalındanda seçim yapabilirsin!`)

    message.channel.send(embed, { buttons: [sevgilimvar,sevgilimyok] }).then(msg => msg.delete({ timeout: 8000 }));

client.on('clickButton', async (button) => {
    if (button.id === 'sevgilimvar') {
        if (button.clicker.member.roles.cache.get(config.sevgilimvar)) {
            await button.clicker.member.roles.remove(config.sevgilimvar);await button.reply.think(true);await button.reply.edit("Rollerin Düzenlendi.")
        } else {
            await button.clicker.member.roles.add(config.sevgilimvar);await button.reply.think(true);await button.reply.edit("Rol Üzerinden Başarıyla Alındı.")
        }
    }
    if (button.id === 'sevgilimyok') {
        if (button.clicker.member.roles.cache.get(config.sevgilimyok)) {
            await button.clicker.member.roles.remove(config.sevgilimyok);await button.reply.think(true);await button.reply.edit("Rollerin Düzenlendi.")
        } else {
            await button.clicker.member.roles.add(config.sevgilimyok);await button.reply.think(true);await button.reply.edit("Rollerin Düzenlendi.")
        }
    }
  })
    
}
exports.conf = {
    aliases: ["ilişkidurum","ilişkidurumu"]
}
exports.help = {
    name: 'iliskidurum'
}