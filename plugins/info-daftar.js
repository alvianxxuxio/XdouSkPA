const { createHash } = require("crypto");
const fs = require("fs");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = db.data.users[m.sender];
  if (user.registered) throw "*[ YOU ALREADY REGISTERED ]*";
  if (!text) throw `*• Example :* ${usedPrefix + command} *[name.age]*`;
  try {
    const pp = await conn
      .profilePictureUrl(m.sender, "image")
      .catch((e) => "https://telegra.ph/file/241b747767455c4bcfc7b.jpg");
    let [name, age] = text.split(".");

    if (isNaN(age)) throw `*[ ! ] Input Number for age*`;
    if (name.length < 5)
      throw `*[ ! ] The minimum number of words for a name is 5*`;
    if (age < 5) throw `*[ ! ] You are too young*`;
    if (age > 50) throw `*[ ! ] You're too old*`;
    let id = createHash("md5").update(m.sender).digest("hex");
    user.registered = true;
    user.age = age;
    user.name = name;
    user.sn = "Aluxi-" + id;
    let key = await conn.sendMessage(
      m.chat,
      {
        image: {
          url: pp,
        },
        caption: "*[ PROCESS VERIFY.... ]*",
      },
      { quoted: m },
    );
    await conn.sendMessage(m.chat, {
document: fs.readFileSync('./package.json'),
fileName: `ALUXI - MD`,
mimetype: "image/png",
fileLength: 999999999999999,
jpegThumbnail: fs.readFileSync('./media/alxo.png'),
description: 'hello',
caption: `*[ VERIFY  SUCCESS ]*
*• Name:* ${user.name} *[ @${m.sender.split("@")[0]} ]*
*• Age:* ${user.age} y/o
*• ID:* Akuxi-${id}

*✅ Thank you for registering yourself with this bot, we will store all your data properly in our database without losing anything*`,
contextInfo: {
isForwarded: true,
mentionedJid: [m?.sender], 
forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363199957492480@newsletter',
                            newsletterName: `ALVIAN UXIO Inc.`,
                            serverMessageId: -1
                        },
                        businessMessageForwardInfo: {
                            businessOwnerJid: conn.decodeJid(conn.user.id)
                        },
externalAdReply: { 
title: `REGISTER SUCCESS`, 
body: `ALUXI - MD`,
thumbnailUrl: global.thumb,
sourceUrl: `-`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:fkontak})
  } catch (e) {
    throw e;
  }
};
handler.help = ["daftar", "register", "reg", "verify"].map(
  (a) => a + " *[name.age]*",
);
handler.tags = ["info"];
handler.command = ["daftar", "register", "reg", "verify"];
module.exports = handler;