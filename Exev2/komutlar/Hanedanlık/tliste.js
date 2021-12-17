const {
    MessageEmbed,
    Discord
} = require("discord.js");
let hanedan = require("../../models/hanedanlik");
let stat = require("../../models/stats");
const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;

if (durum) {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let hanedanDATA = await hanedan.find({
        Lider: target.id,
        guildID: message.guild.id
    });
    let stats = await stat.findOne({
        uyeid: target.id,
        sunucuid: message.guild.id
    }) || {
        HanedanPuan: 0
    };
    let topla = 0;


    for (let i = 0; i < hanedanDATA.length; i++) {
        const x = hanedanDATA[i];
        let kayıt = yetkiliStat(x.channel, ["839646806560473098"], []);
        let str = yetkiliStat(x.channel, ["839634146746040371"], []);
        let public = yetkiliStat(x.channel, ["839632482898673675"], ["839658667594219570"]);
        let dc = yetkiliStat(x.channel, ["839658703299936356"], []);

        let ek = yetkiliStat(x.channel, ["839633037037797377"], []);
        let ek2 = yetkiliStat(x.channel, ["831241672646066226"], []);
        let ek3 = yetkiliStat(x.channel, ["809041970210144293"], []);
        let ek4 = yetkiliStat(x.channel, ["809041965243957283"], []);
        let ek5 = yetkiliStat(x.channel, ["839633630980341800"], []);

        
        let game = parseInt(dc+ek+ek2+ek3+ek4+ek5);
        let pubpuan = parseInt(public/(1000 * 60) * 10);
        let kayıtpuan = parseInt(kayıt/(1000 * 60) * 10);
        let strpuan = parseInt(str/(1000 * 60) * 10);
        let davetpuan = x.Davet * 50;
        let taglıpuan = x.Taglı * 200;
        let mesajpuan = x.Mesaj * 4;
        let gamepuan = parseInt(game/(1000 * 60) * 7);
        topla += pubpuan+kayıtpuan+strpuan+davetpuan+taglıpuan+mesajpuan+gamepuan;
    }

    var embed = new MessageEmbed()
    .setColor(1056085)
    .setAuthor(client.users.cache.get(target.id).username, message.guild.members.cache.get(target.id).user.displayAvatarURL()) // YYYYMMDD
    .setDescription(`
Merhaba, ${target} (<@&${target.roles.highest.id}>) takımına hoş geldin! 
Aşağıda yer almakta olan kullanıcılar senin takımına puan kazandırıyor.

Şuan da toplam **${topla}** puan kazanıyorsun <:yildiz_xd:841290941955571732> Sıralama Puanın: **${stats.HanedanPuan}**
`)

    

        let arr = [];
    for(var i = 0; i < hanedanDATA.length; i++) {
let x = hanedanDATA[i];

let kayıt = yetkiliStat(x.channel, ["839646806560473098"], []);
let str = yetkiliStat(x.channel, ["839634146746040371"], []);
let public = yetkiliStat(x.channel, ["839632482898673675"], ["839658667594219570"]);
let dc = yetkiliStat(x.channel, ["839658703299936356"], []);

let ek = yetkiliStat(x.channel, ["839633037037797377"], []);
let ek2 = yetkiliStat(x.channel, ["831241672646066226"], []);
let ek3 = yetkiliStat(x.channel, ["809041970210144293"], []);
let ek4 = yetkiliStat(x.channel, ["809041965243957283"], []);
let ek5 = yetkiliStat(x.channel, ["839633630980341800"], []);

let game = parseInt(dc+ek+ek2+ek3+ek4+ek5);
let pubpuan = parseInt(public/(1000 * 60) * 10);
let kayıtpuan = parseInt(kayıt/(1000 * 60) * 10);
let strpuan = parseInt(str/(1000 * 60) * 10);
let davetpuan = x.Davet * 50;
let taglıpuan = x.Taglı * 200;
let mesajpuan = x.Mesaj * 4;
let gamepuan = parseInt(game/(1000 * 60) * 7);

embed.addField("─────────────────────",`\n<@${x.userID}> adlı kişi sana toplam **${parseInt(pubpuan+kayıtpuan+strpuan+gamepuan+davetpuan+taglıpuan+mesajpuan)}** puan kazandırdı.

${client.emojis.cache.find(x => x.name === "yildiz")} Public: \`${moment.duration(parseInt(public)).format("H [saat] m [dakika]")}\`
${client.emojis.cache.find(x => x.name === "yildiz")} Kayıt: \`${moment.duration(parseInt(kayıt)).format("H [saat] m [dakika]")}\`
${client.emojis.cache.find(x => x.name === "yildiz")} Streamer: \`${moment.duration(parseInt(str)).format("H [saat] m [dakika]")}\`
${client.emojis.cache.find(x => x.name === "yildiz")} Diğer: \`${moment.duration(parseInt(game)).format("H [saat] m [dakika]")}\`
${client.emojis.cache.find(x => x.name === "yildiz")} Davet: \`${x.Davet} Davet\`
${client.emojis.cache.find(x => x.name === "yildiz")} Taglı: \`${x.Taglı} Taglı\`
${client.emojis.cache.find(x => x.name === "yildiz")} Mesaj: \`${x.Mesaj} Mesaj\``)
    };




    message.channel.send(embed)

    function yetkiliStat(data, parentArray, yasaklıArray) {
        let obje = 0;
        if (data) {
            parentArray.forEach(parentID => {
                let ekle = 0;
                message.guild.channels.cache.filter(channel => channel.parentID == parentID).forEach(channel => {
                    if (!yasaklıArray.includes(channel.id)) ekle += (data ? (data[channel.id] || 0) : {});
                })
                obje = ekle
            })
            return obje
        } else return obje
    }
}
}
exports.conf = {
    aliases: ["Tliste", "TListe"]
}
exports.help = {
    name: 'tliste'
}