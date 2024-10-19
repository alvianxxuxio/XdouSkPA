//© AkiraaBot 2023-2024
// • Credits : wa.me/6281235807940 [ krizz ]
// • Owner: 6281235807940

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

const {
    proto
} = require('@whiskeysockets/baileys')

let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    let M = proto.WebMessageInfo;
    if (!m.quoted) return m.reply(`*• Example :* ${usedPrefix + command} *[reply message]*`)
    if (!text) return m.reply(`*• Example :* ${usedPrefix + command} raja iblis`)
    let msgs = global.db.data.msgs
    if (text in msgs) return m.reply(`Message Already Exists : *[ ${text} ]*`)
    msgs[text] = await M.fromObject(await m.getQuotedObj()).toJSON()
    return m.reply(`Success Added Message : *[ ${text} ]*`)
}
handler.help = ["addlist"].map((a) => a + " *[premium & admin only]*")
handler.tags = ["premium"]
handler.command = ["addlist"]
handler.admin = true
handler.premium = false
module.exports = handler