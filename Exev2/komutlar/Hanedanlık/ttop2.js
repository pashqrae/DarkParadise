const {
    MessageEmbed,
    Discord
} = require("discord.js");
let hanedan = require("../../models/hanedanlik");
let stat = require("../../models/stats");
require("moment-duration-format");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;

    let roller = [
        "809041964799885337",
        "839791732341866506",
        "809041964799885339",
        "814597695179587645",
        "839666149868568596",
        "809041964775374893",
        "818119053288669204",
        "809041964611534867",
      ]
    if (durum) {
        let loading = await message.channel.send(`Veriler yükleniyor lütfen bekleyiniz...`);
        let stats = await stat.find({
            guildID: message.guild.id
        }).select("userID HanedanPuan");
        let göster = stats.filter(mem => message.guild.members.cache.get(mem.userID) && message.guild.members.cache.get(mem.userID).roles.cache.some(rol => roller.includes(rol.id))).sort((a, b) => b.HanedanPuan - a.HanedanPuan).map((veri, index) => `${index + 1 === 1 ? ":first_place:" : index + 1 === 2 ? ":second_place:" : index + 1 === 3 ? ":third_place:" : `<a:yildiz:843119455042797589>`} **${message.guild.members.cache.get(veri.userID).user.tag}**: \`${veri.HanedanPuan} Puan\``).splice(0, 25).join("\n");

        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .setFooter(client.ayarlar.footer)
            .setDescription(`
**${message.guild.name}** adlı sunucunun üst yönetim puan kazandırma listesi

${göster}
`)
        loading.delete();
        message.channel.send(embed);
    }


};

exports.conf = {
    aliases: ["takim-top2"]
}
exports.help = {
    name: 'ttop2'
}