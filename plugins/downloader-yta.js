/*
*<>YTDL MP4&MP3<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
RABU, 25 OKTOBER 2024 12:51
*/
const axios = require("axios");
const yts = require("yt-search");
/* 
TERIMAKASIH ATAS 

• DAFFA 
• SYAII
• SHENDY 
• PUTU

*/
const getVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|[^v\r\s]+\/|user\/[^\/\n\s]+|embed\/|videoseries\?list=)|(?:youtu\.)?be(?:\.com)?\/(?:watch\?v=|v\/|u\/\w\/|embed\/|watch\?v%3D|watch\?v-|watch\/|v=)?)((\w|-){11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};

const Ytdl = {
  search: async (query) => {
    try {
      const { videos } = await yts(query);
      return {
        status: true,
        creator: "@Bang_shenn",
        data: videos.map(video => ({
          title: video.title,
          url: `https://youtu.be/${video.videoId}`,
          img: video.image,
          author: {
            name: video.author.name,
            url: video.author.url,
          },
        })),
      };
    } catch (error) {
      return {
        status: false,
        msg: "Data tidak dapat ditemukan!",
        err: error.message,
      };
    }
  },

  mp3: async (url, { mp3 = '192' } = {}) => {
    try {
      const videoId = getVideoId(url);
      const videoData = (await yts(videoId)).videos[0];
      const data = new URLSearchParams({ videoid: videoId, downtype: 'mp3', vquality: mp3 });

      const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      });

      const mp3Link = response.data.url;
      return {
        status: true,
        creator: "@alvianuxio",
        msg: "Success Download Content!",
        title: videoData.title,
        thumbnail: videoData.image,
        url: `https://youtu.be/${videoId}`,
        media: mp3Link,
      };

    } catch (error) {
      return {
        status: false,
        msg: "Gagal saat mengambil data!",
        err: error.message,
      };
    }
  },

  mp4: async (url, { mp4 = '480' } = {}) => {
    try {
      const videoId = getVideoId(url);
      const videoData = (await yts(videoId)).videos[0];
      const data = new URLSearchParams({ videoid: videoId, downtype: 'mp4', vquality: mp4 });

      const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      });

      const mp4Link = response.data.url;
      return {
        status: true,
        creator: "@alvianuxio",
        msg: "Success Download Content!",
        title: videoData.title,
        thumbnail: videoData.image,
        url: `https://youtu.be/${videoId}`,
        media: mp4Link,
      };

    } catch (error) {
      return {
        status: false,
        msg: "Gagal saat mengambil data!",
        err: error.message,
      };
    }
  },
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Contoh penggunaan: ${usedPrefix + command} <link atau judul YouTube>`;

  let result;
  if (command === 'ytmp3') {
    result = await Ytdl.mp3(text);
  } else if (command === 'ytmp4') {
    result = await Ytdl.mp4(text);
  } else {
    result = await Ytdl.search(text);
  }

  if (!result.status) throw result.msg;

  if (command === 'ytmp3') {
    const doc = {
      audio: { url: result.media },
      mimetype: 'audio/mp4',
      fileName: `${result.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: result.url,
          title: result.title,
          sourceUrl: result.url,
          thumbnail: await (await conn.getFile(result.thumbnail)).data
        }
      }
    };
    await conn.sendMessage(m.chat, doc, { quoted: m });
  } else if (command === 'ytmp4') {
    await conn.sendMessage(m.chat, { video: { url: result.media }, caption: result.title }, { quoted: m });
  } else {
    let searchResults = result.data.map((v, i) => `${i + 1}. *${v.title}*\n   Link: ${v.url}`).join('\n\n');
    await conn.sendMessage(m.chat, { text: searchResults }, { quoted: m });
  }
};

handler.help = ['ytmp3', 'ytmp4', 'ytsearch'];
handler.tags = ['downloader'];
handler.command = /^yt(mp3|mp4)|ytv(ideo)|yta(udio)$/i;

module.exports = handler;

/*
*<>YTDL MP4&MP3<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
RABU, 25 OKTOBER 2024 12:51
*/