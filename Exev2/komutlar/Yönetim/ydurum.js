const { MessageEmbed } = require("discord.js");
let sunucuayar = require("../../models/sunucuayar");

module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (message.member.permissions.has(8) && durum) {
      let data = await sunucuayar.findOne({})

      let alt_yönetim = [data.EnAltYetkiliRol];
  
      let alt_yönetim_ses = message.guild.members.cache.filter(member => member.roles.cache.some(rol => alt_yönetim.includes(rol.id))).size

      let alt_yönetim_ses_olmayan = message.guild.members.cache.filter(member => member.roles.cache.some(rol => alt_yönetim.includes(rol.id)) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot).map(x => `<@${x.id}>`)

      let alt_yönetim_ses_olan = message.guild.members.cache.filter(member => member.roles.cache.some(rol => alt_yönetim.includes(rol.id)) && member.voice.channel && !member.user.bot).map(x => `<@${x.id}>`)


      let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(client.ayarlar.footer)
      .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
      .setDescription(`Sunucumuz da bulunan toplam yetkili sayısı \`${alt_yönetim_ses}\`
Sunucumuz da aktif olup seste olmayan yetkili sayısı \`${alt_yönetim_ses_olmayan.length}\`
Sunucumuzda ses kanallarında bulunan yetkili sayısı \`${alt_yönetim_ses_olan.length}\``)
message.channel.send(embed)
  
    } else return;
  }
  exports.conf = {
    aliases: ["yetkilidurum"]
  }
  exports.help = {
    name: 'ydurum'
  }