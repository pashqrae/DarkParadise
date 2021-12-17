const {
    MessageEmbed,
    Discord
} = require("discord.js");
let hanedan = require("../../models/hanedanlik");
const sunucuayar = require("../../models/sunucuayar")
let tagdata = require("../../models/taglıUye")
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (durum) {
        let sdata = await sunucuayar.findOne({guildID: message.guild.id});
        
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply(`Lütfen hanedanlığınıza almak istediğiniz kişiyi belirtiniz.`);
        let tdata = await tagdata.findOne({userID: target.id})
        let hanedanDATA = await hanedan.findOne({userID: target.id,guildID: message.guild.id}) || {Members: {}};
        let lider = await hanedan.find({Lider: message.author.id, guildID: message.guild.id});
        if (lider.length > 9) return message.reply("Lütfen takımınıza 9'dan fazla üye almaya çalışmayınız");
        if (hanedanDATA.userID === target.id) return message.reply(`Bu kişi <@${hanedanDATA.Lider}> adlı kişinin takımında bulunuyor lütfen farklı birisini alınız.`);
        let pozisyon = message.guild.roles.cache.get("809111409282646036").position;
        let ustYonetim = message.guild.roles.cache.filter(r => r.position >= pozisyon).map(x => x.id);
        if (target.roles.cache.some(r => ustYonetim.includes(r.id))) return message.reply("Takımına almaya çalıştığın kişi üst yönetim ekibinden lütfen sadece alt ve orta yönetim yetkisindeki kişileri alınız.")
        if (tdata && !target.roles.cache.get(sdata.EnAltYetkiliRol)) {
            await message.channel.send(`Selam ${target}, ${message.author} yöneticisi seni takımına davet ediyor. **Kabul ediyor musun?**`)
            .then(msg => {
                msg.react("✅")
                const reactionFilter = (reaction, user) => {
                    return ['✅'].includes(reaction.emoji.name) && user.id === target.id
                };
                msg.awaitReactions(reactionFilter, {
                    max: 1,
                    time: 1000 * 15,
                    error: ['time']
                }).then(async c => {
                    let cevap = c.first();
                    if (cevap) {
                        new hanedan({
                            userID: target.id, 
                            guildID: message.guild.id,
                            Taglı: 0,
                            Yetkili: 0,
                            Mesaj: 0,
                            Davet: 0,
                            channel: {},
                            Lider: message.author.id
                        }).save()
                        target.roles.add(["839647993648644126","809041964611534867"])
                        msg.delete();
                        message.react("✅").catch();
                        message.channel.send(`Hey! ${message.author} - ${target} adlı kişi takım davetinizi kabul etti!`).then(x => x.delete({timeout: 15000}));
                        client.channels.cache.get("844413885376495646").send(`${message.author} adlı kullanıcı ${target} adlı kullanıcıyı takımına aldı!`)
                    };
                });

            })
        } else return message.reply("Lütfen isminde sunucu tagımız olan, herhangi bir yetkiye sahip olmayan bir kişide deneyiniz!").then(x => x.delete({timeout: 15000}));

    }
}
exports.conf = {
    aliases: ["Tsec", "TSEC"]
}
exports.help = {
    name: 'tsec'
}