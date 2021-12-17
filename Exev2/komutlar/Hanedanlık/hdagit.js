const {
    MessageEmbed,
    Discord
} = require("discord.js");
let hanedan = require("../../models/hanedanlik");
let stat = require("../../models/stats");
let moment = require("moment");
require("moment-duration-format");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
if (durum) {
    
    let hanedanDATA = await hanedan.find({
        guildID: message.guild.id
    });
    let veri = {};

    for (let v of hanedanDATA) {
        let sveri = await stat.findOne({
            userID: v.userID,
            guildID: message.guild.id
        }) || {
            aSes: {},
            uSes: {}
        };

        let kayıt = yetkiliStat(v.channel, ["839646806560473098"], []);
        let str = yetkiliStat(v.channel, ["839634146746040371"], []);
        let public = yetkiliStat(v.channel, ["839632482898673675"], ["839658667594219570"]);
        let dc = yetkiliStat(v.channel, ["839658703299936356"], []);

        let ek = yetkiliStat(v.channel, ["839633037037797377"], []);
        let ek2 = yetkiliStat(v.channel, ["831241672646066226"], []);
        let ek3 = yetkiliStat(v.channel, ["809041970210144293"], []);
        let ek4 = yetkiliStat(v.channel, ["809041965243957283"], []);
        let ek5 = yetkiliStat(v.channel, ["839633630980341800"], []);

        let game = parseInt(dc + ek + ek2 + ek3 + ek4 + ek5);
        let pubpuan = parseInt(public / (1000 * 60) * 10);
        let kayıtpuan = parseInt(kayıt / (1000 * 60) * 10);
        let strpuan = parseInt(str / (1000 * 60) * 10);
        let davetpuan = v.Davet * 50;
        let taglıpuan = v.Taglı * 200;
        let mesajpuan = v.Mesaj * 4;
        let gamepuan = parseInt(game / (1000 * 60) * 7);


        if (!veri[v.Lider]) veri[v.Lider] = {
            Puan: 0,
            UserID: 0,
            uyeler: []
        };
        veri[v.Lider].UserID += 1;
        veri[v.Lider].uyeler.push(v.userID);
        veri[v.Lider].Puan += pubpuan + kayıtpuan + strpuan + davetpuan + taglıpuan + mesajpuan + gamepuan;
    };
    let text = []
    for (var i = 0; i < Object.keys(veri).length; i++) {
        let x = Object.keys(veri)[i]
        let hdata = await hanedan.find({
            Lider: x,
            guildID: message.guild.id
        })
        for (var i2 = 0; i2 < hdata.length; i2++) {
            let x2 = hdata[i2]
            let kayıt = yetkiliStat(x2.channel, ["839646806560473098"], []);
            let str = yetkiliStat(x2.channel, ["839634146746040371"], []);
            let public = yetkiliStat(x2.channel, ["839632482898673675"], ["839658667594219570"]);
            let dc = yetkiliStat(x2.channel, ["839658703299936356"], []);

            let ek = yetkiliStat(x2.channel, ["839633037037797377"], []);
            let ek2 = yetkiliStat(x2.channel, ["831241672646066226"], []);
            let ek3 = yetkiliStat(x2.channel, ["809041970210144293"], []);
            let ek4 = yetkiliStat(x2.channel, ["809041965243957283"], []);
            let ek5 = yetkiliStat(x2.channel, ["839633630980341800"], []);

            let game = parseInt(dc + ek + ek2 + ek3 + ek4 + ek5);
            let pubpuan = parseInt(public / (1000 * 60) * 10);
            let kayıtpuan = parseInt(kayıt / (1000 * 60) * 10);
            let strpuan = parseInt(str / (1000 * 60) * 10);
            let davetpuan = x2.Davet * 50;
            let taglıpuan = x2.Taglı * 200;
            let mesajpuan = x2.Mesaj * 4;
            let gamepuan = parseInt(game / (1000 * 60) * 7);

            text.push(`${message.guild.members.cache.get(x2.userID) ? message.guild.members.cache.get(x2.userID).displayName : x2.userID} (${x2.userID}) adlı kişi ${message.guild.members.cache.get(x2.Lider) ? message.guild.members.cache.get(x2.Lider).displayName : x2.Lider} (${x2.Lider}) adlı kişiye toplam ${parseInt(pubpuan+kayıtpuan+strpuan+gamepuan+davetpuan+taglıpuan+mesajpuan)} puan kazandırdı.
─────────────────────
Public:${moment.duration(parseInt(public)).format("H [saat] m [dakika]")} (${pubpuan} Puan)
Kayıt:${moment.duration(parseInt(kayıt)).format("H [saat] m [dakika]")} (${kayıtpuan} Puan)
Streamer:${moment.duration(parseInt(str)).format("H [saat] m [dakika]")} (${strpuan} Puan)
Diğer: ${moment.duration(parseInt(game)).format("H [saat] m [dakika]")} (${gamepuan} Puan)
Davet: ${x2.Davet} Kişi (${davetpuan} Puan)
Taglı: ${x2.Taglı} Kişi (${taglıpuan} Puan)
Mesaj: ${x2.Mesaj} Mesaj (${mesajpuan} Puan)
─────────────────────
`)
        }
    };
    Object.keys(veri).map(async dat => {
        await stat.updateOne({
            userID: dat,
            guildID: message.guild.id
        }, {
            $inc: {
                HanedanPuan: veri[dat].Puan
            }
        }, {
            upsert: true
        }).exec()
        await hanedan.updateMany({
            Lider: dat,
            guildID: message.guild.id
        }, {
            channel: {},
            Mesaj: 0,
            Taglı: 0,
            Yetkili: 0,
            Davet: 0,
        }, {
            multi: true
        }).exec()
    })

    let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag, message.author.avatarURL({
            dynamic: true
        }))
        .setTimestamp()
        .setFooter(client.ayarlar.footer)
        .setDescription(`Başarılı bir şekilde ${Object.keys(veri).length} kullanıcının puanları eklendi!`)

    message.channel.send(embed)
    console.log(text)
    client.channels.cache.get("844170816500269076").send({ files: [{ attachment: Buffer.from(text.map(x => x).join("\n")), name: `${moment(Date.now()).locale("tr").format("LLL")}_Tarihi_Yedek.txt` }] });

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
    aliases: []
}
exports.help = {
    name: 'tdagit'
}