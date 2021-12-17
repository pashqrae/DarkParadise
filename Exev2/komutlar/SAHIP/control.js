
const disbut = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (message.member.permissions.has(8) || !client.ayarlar.sahip.some(x => x == message.author.id)) {
    let config = {
        "etkinlik": "897208841320673310",
        "cekilis": "897205781261324338",
    }
    let vericik = await sunucuayar.findOne({});
    let tag = vericik.TAG;
    let tagrol = vericik.TEAM
    let taglısize = message.guild.members.cache.filter(member => member.user.username.toLowerCase().includes(tag) && !member.roles.cache.has(tagrol))
    let et = message.guild.members.cache.filter(member => !member.roles.cache.has(config.cekilis) && !member.roles.cache.has(config.etkinlik)).size;

let btagrol = new disbut.MessageButton().setStyle('green').setLabel('Tag Dağıt!').setID('btagrol')
let ecdagit = new disbut.MessageButton().setStyle('red').setLabel('Etkinlik/Çekiliş Dağıt').setID('ecdagit')

let embed = new MessageEmbed()
.setDescription(`
\`\`\`fix\nSunucu Ayarları\`\`\`
${client.emojis.cache.find(x => x.name === "axze_stat")} **Tagı Olup Rolü Olmayan Kullanıcı Sayısı:** \`${taglısize.size}\`
${client.emojis.cache.find(x => x.name === "axze_stat")} **Etkinlik/Çekiliş Rolü Olmayan Kullanıcı Sayısı: ** \`${et}\`
`)
.setColor("BLACK")
.setFooter(`🌟 Kahve sizi önemsiyor ❤️ ${message.guild.name}`)

message.channel.send(embed, { buttons: [ecdagit,btagrol] })

}
}
client.on('clickButton', async (button) => {
    if (button.id === 'btagrol') {
        let vericik = await sunucuayar.findOne({});
        let tag = vericik.TAG;
        let tagrol = vericik.TEAM
        let kek = button.guild.members.cache.filter(member => member.user.username.toLowerCase().includes(tag) && !member.roles.cache.has(tagrol))
    button.reply.send(`Tagı olup rolü olmayan ${kek.size} kullanıcıya rol verildi.

    Tag Rolü verilen kullanıcılar;
    ${kek.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`)
    button.guild.members.cache.filter(member => member.user.username.toLowerCase().includes(tag) && !member.roles.cache.has(tagrol)).map(x=> x.roles.add(tagrol))                
    }
    if (button.id === 'ecdagit') {
        let çay = {
            "etkinlik": "897208841320673310",
            "cekilis": "897205781261324338",
        }
    let pasta = button.guild.members.cache.filter(member => !member.roles.cache.has(çay.etkinlik) && !member.roles.cache.has(çay.cekilis))
        let emcük = ["897208841320673310","897205781261324338"];
        button.reply.send(`Etkinlik/Çekiliş rolü olmayan ${pasta.size} kullanıcıya etkinlik, çekiliş rolleri verildi !`)
        button.guild.members.cache.filter(member => !member.roles.cache.has(çay.etkinlik) && !member.roles.cache.has(çay.cekilis)).map(x=> x.roles.add(emcük));
    }

  });
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'control'
}