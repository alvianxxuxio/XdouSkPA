/*
SCRIPT AKIRAA BOT BY BANG SYAII 
* ig: Akira_art12
*WhatsApp: wa.me/6283842839555
*,Jangan Perjual belikan script ini jika ada yang menjual tanpa izin mohon laporkan ke saya dan jangan harap ada update Script ini kedepannya !!!
*/

const { sticker1, sticker5 } = require('../lib/sticker')
const fetch = require ('node-fetch')
let handler = async (m, { conn }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) {
            let img = await q.download()
            if (!img) throw `reply sticker with command s`
            stiker = await sticker5(img, false, packname, author)
        } else if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) throw `reply image with command s`
            stiker = await sticker5(img, false, packname, author)
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('maksimal 10 detik!')
            let img = await q.download()
            if (!img) throw `reply video with command s`
            stiker = await sticker5(img, false, packname, author)
        } else if (m.quoted.text) {
            if (isUrl(m.quoted.text)) stiker = await sticker(false, m.quoted.text, packname, author)
            else throw 'URL is not valid! end with jpg/gif/png'
        }
    } catch (e) {
        throw e
    }
    finally {
        if (stiker) {
let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
            await conn.sendFile(m.chat, stiker, '', '', m, null, {
  fileLength: '450000000000000000',
  contextInfo: {
    externalAdReply: {
      showAdAttribution: true,
      mediaUrl: sig,
      mediaType: 1,
      description: wm,
      title: namebot,
      body: botdate,
      thumbnail: await (await fetch (pp)).buffer(),
      sourceUrl: sig
    }
  }
})
        }
        else {

            throw 0
        }
    }
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(stiker|s|sticker)$/i
handler.limit = 10
module.exports = handler

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}