const uploadFile = require("../lib/uploadFile.js");
const uploadImage = require("../lib/uploadImage.js");
const fs = require("fs");
const fetch = require("node-fetch");

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'
  await conn.sendMessage(m.chat, {
        react: {
            text: "🕓",
            key: m.key,
        }
    })
    await conn.sendMessage(m.chat, {
        react: {
            text: "🕓",
            key: m.key,
        }
    })
    m.reply(wait)
  let media = await q.download()
  let name = conn.getName(m.sender)
  let isTele = /image\/(png|jpeg|jpg|webp|gif)|video\/mp4\/mp3\/opus/.test(mime)
  let scb = `${await Uploader.catbox(media)}`
  let link = await (isTele ? uploadImage : uploadFile)(media)
  let max = `Generated Succeed\n\nLink 1 : ${link}\nLink 2 : ${await Uploader.catbox(media)}\nShort 1 : ${await shortUrl(link)}\nShort 2 : ${await shortUrl(scb)}\n

${global.wm}`
         conn.sendMessage(m.chat, {
         document: fs.readFileSync('./package.json'),
fileName: `Hi [ ${name} ]`,
mimetype: "application/msword",
fileLength: `${media.length}`,
jpegThumbnail: fs.readFileSync('./media/thum.jpg'),
description: 'hello',
caption: max,
                contextInfo: {
                isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: "ALVIAN UXIO Inc.",
newsletterJid: "120363199957492480@newsletter",
serverMessageId: -1
            },
            businessMessageForwardInfo: {
                businessOwnerJid: conn.user.jid
            },
                    externalAdReply: {
                    showAdAttribution: false,
                        title: "ALUXI - MD",
                        body: "FILE UPLOADER",
                        thumbnailUrl: "https://telegra.ph/file/7ca40b45be5e7e8ab2cd2.jpg",
                        sourceUrl: "",
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            })
            await conn.sendMessage(m.chat, {
        react: {
            text: "✅",
            key: m.key,
        }
    })
}
handler.help = ['tourl <reply image/video>']
handler.tags = ['tools']
handler.command = /^(tourl|upload)$/i
handler.limit = true

module.exports = handler
async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}