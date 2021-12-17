const disbut = require("discord-buttons");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!client.ayarlar.sahip.some(x => x == message.author.id)) return;

let sevgilimvar = new disbut.MessageButton().setStyle('red').setLabel('💕 Sevgilim Var').setID('sevgilimvar')
let sevgilimyok = new disbut.MessageButton().setStyle('red').setLabel('💔 Sevgilim Yok').setID('sevgilimyok')
message.channel.send(`**✮** Merhaba ilişki durumunu belli eden rolleri almak için buttona tıklaya bilirsin!`
, { buttons: [sevgilimvar,sevgilimyok] })



}
let config = {
    "sevgilimvar": "899421109525561365",
    "sevgilimyok": "899421732534878268",}
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
     
  });
exports.conf = {
    aliases: ["ilişki"]
}
exports.help = {
    name: 'iliski'
}