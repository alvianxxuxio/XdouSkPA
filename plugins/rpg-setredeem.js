const fs = require("fs");
let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
  db.data.redeem = db.data.redeem || '';
  
  if (!text) throw `*• Example:* ${usedPrefix + command} new redeem`;
  
  db.data.redeem = text;
  m.reply('Successfully created the redeem code');
  
  const q = {
    "key": {
      "remoteJid": "status@broadcast",
      "participant": "0@s.whatsapp.net",
      "fromMe": false,
      "id": ""
    },
    "message": {
      "conversation": "Redeem code from owner 👑"
    }
  };
  
  let grup = Object.keys(db.data.chats).filter(v => v.endsWith('@g.us'));
  let cgc = "[ `NEW REDEEM CODE` ]\n\n" + text
		for (let gc of grup) {
                await conn.sendMessage(gc, {
document: fs.readFileSync('./package.json'),
fileName: `ALUXI - MD`,
mimetype: "image/png",
fileLength: 999999999999999,
jpegThumbnail: fs.readFileSync('./media/alxo.png'),
description: 'hello',
caption: cgc,
contextInfo: {
isForwarded: true,
mentionedJid: conn.parseMention(cgc), 
forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363199957492480@newsletter',
                            newsletterName: `ALVIAN UXIO Inc.`,
                            serverMessageId: -1
                        },
                        businessMessageForwardInfo: {
                            businessOwnerJid: conn.decodeJid(conn.user.id)
                        },
externalAdReply: { 
title: `© ALUXI - MD`, 
body: `REDEEM CODE`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
await conn.delay(5000)
            }
};

handler.help = ["set-redeem"].map(a => a + ' *[new redeem]*');
handler.tags = ["owner"];
handler.command = ["set-redeem"]
handler.owner = true;
module.exports = handler