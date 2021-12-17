const {
    MessageEmbed,
    Discord
} = require("discord.js");
let hanedan = require("../../models/hanedanlik");
require("moment-duration-format");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
if (durum) {
    
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (rol) {
        let loading = await message.channel.send("Veriler yükleniyor lütfen bekleyiniz...");
        let hanedanDATA = await hanedan.find({ guildID: message.guild.id });
        let veri = {};
        for (let v of hanedanDATA) {
            let kayıt = yetkiliStat(v.channel, ["839646806560473098"], []);
            let str = yetkiliStat(v.channel, ["839634146746040371"], []);
            let public = yetkiliStat(v.channel, ["839632482898673675"], ["839658667594219570"]);
            let dc = yetkiliStat(v.channel, ["839658703299936356"], []);
    
            let ek = yetkiliStat(v.channel, ["839633037037797377"], []);
            let ek2 = yetkiliStat(v.channel, ["831241672646066226"], []);
            let ek3 = yetkiliStat(v.channel, ["809041970210144293"], []);
            let ek4 = yetkiliStat(v.channel, ["809041965243957283"], []);
            let ek5 = yetkiliStat(v.channel, ["839633630980341800"], []);
            
            let game = parseInt(dc+ek+ek2+ek3+ek4+ek5);
            let pubpuan = parseInt(public/(1000 * 60) * 10);
            let kayıtpuan = parseInt(kayıt/(1000 * 60) * 10);
            let strpuan = parseInt(str/(1000 * 60) * 10);
            let davetpuan = v.Davet * 50;
            let taglıpuan = v.Taglı * 200;
            let mesajpuan = v.Mesaj * 4;
            let gamepuan = parseInt(game/(1000 * 60) * 15);

            if (!veri[v.Lider]) veri[v.Lider] = { Puan: 0, UserID: 0 };
            veri[v.Lider].UserID += 1;
            veri[v.Lider].Puan += pubpuan+kayıtpuan+strpuan+davetpuan+taglıpuan+mesajpuan+gamepuan;
        };
        
        let göster = Object.keys(veri).sort((a, b) => veri[b].Puan - veri[a].Puan).filter(us => rol.members.some(member => member.id === us)).map((data, index) => `${index + 1 === 1 ? ":first_place:" : index + 1 === 2 ? ":second_place:" : index + 1 === 3 ? ":third_place:" : `**${index + 1}.**`} <@${data}>: **${veri[data].UserID} yetkili** ile \`${parseInt(veri[data].Puan)} Puan\` toplamış.`).slice(0, 25).join("\n");
                    
        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(client.ayarlar.footer)
            .setDescription(`
**${message.guild.name}** adlı sunucunun ${rol} rolündeki üyelerin puan kazandırma listesi

${göster}

Top 25 Günlük Puan Kazandırma Oranları **Her Gece 00:00'da sıfırlanıyor**
`)
        loading.delete();
        message.channel.send(embed)
    } else {
        let loading = await message.channel.send("Veriler yükleniyor lütfen bekleyiniz...");
        let hanedanDATA = await hanedan.find({ guildID: message.guild.id });
let veri = {};
for (let v of hanedanDATA) {
    let kayıt = yetkiliStat(v.channel, ["839646806560473098"], []);
    let str = yetkiliStat(v.channel, ["839634146746040371"], []);
    let public = yetkiliStat(v.channel, ["839632482898673675"], ["839658667594219570"]);
    let dc = yetkiliStat(v.channel, ["839658703299936356"], []);

    let ek = yetkiliStat(v.channel, ["839633037037797377"], []);
    let ek2 = yetkiliStat(v.channel, ["831241672646066226"], []);
    let ek3 = yetkiliStat(v.channel, ["809041970210144293"], []);
    let ek4 = yetkiliStat(v.channel, ["809041965243957283"], []);
    let ek5 = yetkiliStat(v.channel, ["839633630980341800"], []);
    
    let game = parseInt(dc+ek+ek2+ek3+ek4+ek5);
    let pubpuan = parseInt(public/(1000 * 60) * 10);
    let kayıtpuan = parseInt(kayıt/(1000 * 60) * 10);
    let strpuan = parseInt(str/(1000 * 60) * 10);
    let davetpuan = v.Davet * 50;
    let taglıpuan = v.Taglı * 200;
    let mesajpuan = v.Mesaj * 4;
    let gamepuan = parseInt(game/(1000 * 60) * 15);

if (!veri[v.Lider]) veri[v.Lider] = { Puan: 0, UserID: 0 };
veri[v.Lider].UserID += 1;
veri[v.Lider].Puan += pubpuan+kayıtpuan+strpuan+davetpuan+taglıpuan+mesajpuan+gamepuan;
};

        let göster = Object.keys(veri).sort((a, b) => veri[b].Puan - veri[a].Puan).map((data, index) => `${index + 1 === 1 ? ":first_place:" : index + 1 === 2 ? ":second_place:" : index + 1 === 3 ? ":third_place:" : `**${index + 1}.**`} <@${data}>: **${veri[data].UserID} yetkili** ile \`${parseInt(veri[data].Puan)} Puan\` toplamış.`).slice(0, 20).join("\n");
        
        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(client.ayarlar.footer)
            .setDescription(`
**${message.guild.name}** adlı sunucunun üst yönetim puan kazandırma listesi

${göster}

Toplam **${Object.keys(veri).length}** adet yetkili'ye takım dağıtıldı
`)
        loading.delete();
        message.channel.send(embed)
    }
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
    aliases: ["takim-top"]
}
exports.help = {
    name: 'ttop'
}