let handler = async (m, {conn}) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let { warn } = db.data.users[who]
await conn.reply(m.chat, `@${who.split('@')[0]} ${warn ? `mempunyai warn: ${warn}` : 'tidak mempunyai warn'}`, m, {contextInfo: {
mentionedJid: [who]
}})
}
handler.help = handler.command = ['cekwarn']
handler.tags = ['group']
handler.group = true
module.exports = handler