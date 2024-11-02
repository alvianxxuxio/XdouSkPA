const yts = require("yt-search");
const axios = require("axios");
const {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");
var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Gunakan contoh ${usedPrefix}${command} Orange 9`;
  await m.reply(wait)

  try {
    let search = await yts(text);
    let vid = search.videos[0];
    if (!vid) throw 'Video tidak ditemukan, coba judul lain';

    let { url, title, thumbnail, timestamp, views, ago } = vid;    
    let cd = `
[ PLAY YOUTUBE ]

Title: ${vid.title}
Duration: ${vid.timestamp}
Views: ${vid.views}
Uploaded: ${vid.ago}
Url: ${vid.url}
    `
let button = [
   ["DOWNLOAD MP4",`.ytv ${vid.url}`]
   ]    
conn.sendButton(m.chat, button, m, {
body: "© ALUXI - MD",
footer: cd,
url: vid.thumbnail, //Isi pake url poto/video
})


    const response = await axios.get(`https://widipe.com/download/ytdl?url=${url}`);
    let res = response.data.result;
    let { mp3 } = res;
    await m.reply("Mengirim audio mohon tunggu...")
    let audioMessage = {
      audio: {
        url: mp3,
      },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: '© ALUXI - MD',
          sourceUrl: '-',
          thumbnailUrl: thumbnail,
          renderLargerThumbnail: true
        }
      }
    };
    
    

    await conn.sendMessage(m.chat, audioMessage, { quoted: m });
  } catch (err) {
    console.error(err); // Log error for debugging purposes
    await m.reply('Terjadi Kesalahan Silahkan Coba Lagi Nanti');
  }
};

handler.help = ['play2'].map((v) => v + ' <query>');
handler.tags = ['downloader','sound'];
handler.command = /^(play2|song2|lagu2|carikanlagu2|cari kan lagu2|songs2|musik2|music2)$/i;

module.exports = handler;