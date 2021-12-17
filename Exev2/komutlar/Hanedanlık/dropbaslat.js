let ms = require("ms");
require("moment-duration-format");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (durum) {
        let kanallar = client.channels.cache.filter(x => x.parentID === "830260198605193217" && x.id !== "830260337307418664" && x.type === "voice").map(x => x.id);
        let üyeler = message.guild.roles.cache.get("830259905746305034").members.map(x => x.id);
        let time = args[0];
        let ödül = args[1];
        let kisi = args[2] || 1
        if (!time) return;
        if (!ödül) return;
        client.channels.cache.get("830260198605193217").setName("🟢 ☨ Public Odalar")
        client.channels.cache.get("830260258227093524").send(`
**Drop Başladı** (**Ödül: __${ödül}__**) <@&830259905746305034>

\`\`\`
Süre: ${time.replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")}
Yer: Public Odalar
Kazanan Kişi Sayısı: ${kisi}
\`\`\`

**Public Kanallar'da en fazla aktif olan random ${kisi} yetkilimize ${ödül} ödülleri verilecektir.**

Not: Bot ses kanalında olan üyeleri random bir şekilde göstermektedir bu yüzden ses kanalında olmak zorunludur.
`).then(x => x.react("<a:darkparadisered:827651594522722304>"));

        for (let i = 0; i < üyeler.length; i++) {
            const veri = üyeler[i];
            let rand = kanallar[Math.floor(Math.random() * kanallar.length)];
            message.guild.members.cache.get(veri).user.send(`
**Drop Başladı** (**Ödül: __${ödül}__**)

\`\`\`
Süre: ${time.replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")}
Yer: Public Odalar
Kazanan Kişi Sayısı: ${kisi}
\`\`\`
${await client.channels.cache.get(rand).createInvite({maxAge: 10 * 60 * 1000, maxUses: 10 })}`).catch(() => {});
        }
        let user = [];
        setTimeout(() => {
            let kanallar = client.channels.cache.filter(x => ["830260198605193217"].includes(x.parentID) && x.id !== "830260337307418664").map(x => x.id);
            message.guild.members.cache.filter(mem => mem.roles.cache.some(rol => client.roller.includes(rol.id)) && mem.voice.channel && kanallar.includes(mem.voice.channel.id)).map(y => user.push(y.id))
            let result = "";
            for (let i = 0; i < Number(kisi); i++) result += "<@" + user.random().toString() + "> ";
            client.channels.cache.get("830260198605193217").setName("🔴 ☨ Public Odalar")
            message.channel.send(`Kazananlar: ${result}`)
            client.channels.cache.get("830260258227093524").send(`Kazananlar: ${result}`)
        }, ms(time));
    }
};

exports.conf = {
    aliases: []
}
exports.help = {
    name: 'dropbaslat'
}