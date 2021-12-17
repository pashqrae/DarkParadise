const { MessageEmbed, Discord } = require("discord.js");
const { link } = require("fs");
const conf = client.ayarlar
let mongoose = require("mongoose");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (message.member.permissions.has(8) || durum) {

        if (args[0] == "aç") {
            message.channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: true
            }).then(async() => {
                await message.reply("Kanal kilidi başarıyla kilitlendi.")
            })
        }

        if (args[0] == "kapat") {
            message.channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            }).then(async() => {
                await message.reply("Kanalın kilidi başarıyla kapatıldı.")
            })
        }

    } else {
        return message.reply("Yönetici yetkisine sahip olmalısın.")
      }
}
exports.conf = {aliases: ["kilit"]}
exports.help = {name: 'Kilit'}
