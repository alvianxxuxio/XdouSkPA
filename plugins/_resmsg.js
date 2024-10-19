async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return;
    let msgs = global.db.data.msgs;
    const q = {
      "key": {
        "remoteJid": "status@broadcast",
        "participant": "0@s.whatsapp.net",
        "fromMe": false,
        "id": ""
      },
      "message": {
        "conversation": "*ALUXI MD*"
      }
    };

    // Mencari kunci yang sesuai dengan pesan yang diterima
    let foundKey = Object.keys(msgs).find(key => m.text.startsWith(key));
    if (!foundKey) return;
    
    // Memastikan bahwa key bukan dari kontak WhatsApp
    if (/\d{5,16}@s\.whatsapp\.net$/.test(foundKey)) {
        return;
    }

    // Serialisasi ulang pesan
    let _m = JSON.parse(JSON.stringify(msgs[foundKey]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)
        ) {
            return Buffer.from(v.data);
        }
        return v;
    });

    // Memastikan _m.message ada dan valid sebelum pengiriman
    if (!_m.message) {
        console.log('Pesan tidak valid:', _m);
        return;
    }

    // Kirim pesan tanpa forward
    await this.sendMessage(m.chat, { text: _m.message.conversation || _m.message.extendedTextMessage.text }, { quoted: q });
}

module.exports = {
    before,
};