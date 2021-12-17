let hanedan = require("../../models/hanedanlik");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (durum) {

        let uROLLER = [
            "Autorisé Comité",
            "Hauts Fonctionnaires",
            "Cadres Supérieurs",
            "Cour Suprême",
            "Astaroth of Valeria",
            "King of Valeria",
            "Roi Bael",
            "Leviathan",
            "Behamoth",
        ];
        
        let aROLLER = [
            "Aquarius of Valeria",
            "Asmodeus of Valeria",
            "Lilith of Valeria",
            "Draco of Valeria",
            "Capella of Valeria",
            "Rutilicus of Valeria",
            "Alnilam of Valeria",
            "Horrible of Valeria",
            "Charm of Valeria",
            "Antares of Valeria",
            "Ascella of Valeria",
            "Aurora of Valeria",
            "Celeste of Valeria",
        ];
    
    let ust = message.guild.members.cache.filter(mem => mem.roles.cache.some(rol => uROLLER.includes(rol.name))).map(x => x.id)
    
    let member = message.guild.members.cache.filter(mem => mem.roles.cache.some(rol => aROLLER.includes(rol.name))).map(x => x.id)
    let bolme = member.length % ust.length;
    let per_Us = Math.floor(member.length / ust.length);
    
    
    ust.forEach(async (_client, _index) => {
        let memberID = member.splice(0, (_index == 0 ? per_Us + bolme : per_Us))
      for (var index = 0; index < memberID.length; index++) {
            let data = await hanedan.findOne({userID: memberID[index], guildID: message.guild.id});
            let lider = await hanedan.find({Lider: _client});
            if (lider.length >= 5) return console.log(2);
            if (data) return console.log(1);
            new hanedan({
                userID: memberID[index],
                guildID: message.guild.id,
                Lider: _client,
                channel: {},
                Mesaj: 0,
                Taglı: 0,
                Yetkili: 0,
                Davet: 0,
            }).save()
        };
    });
    }
}
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'tgorevlendir'
}