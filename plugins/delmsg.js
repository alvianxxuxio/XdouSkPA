let handler = async (m, { command, usedPrefix, text }) => {
    if (!text) return m.reply(`*• Example :* ${usedPrefix + command} *[name message]*`);    
    let msgs = global.db.data.msgs;

    if (!(text in msgs)) return m.reply(`Message Not Found : *[ ${text} ]*`);
    if (/\d{5,16}@s\.whatsapp\.net$/.test(text)) {
        return m.reply(`Cannot delete message associated with a phone number or JID : *[ ${text} ]*`);
    }
    delete msgs[text];
    m.reply(`Success Delete Message : *[ ${text} ]*`);
}

handler.help = ['dellist'].map((a) => a + " *[premium & admin only]*");
handler.tags = ['premium'];
handler.command = ['dellist'];
handler.admin = true
handler.premium = false;

module.exports = handler;