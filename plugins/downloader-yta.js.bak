const fetch = require("node-fetch");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `*• Example:* ${usedPrefix + command} *[url]*`;
  if (!args[0].match(/youtu/gi)) throw `Verify that the YouTube link is valid`;

  let v = args[0];
  
  await m.reply('Please wait');

  try {
    let ytv = await fetch(`https://rest.cifumo.biz.id/api/downloader/ytdl?url=${encodeURIComponent(v)}`);
    let skyzy = await ytv.json();

    if (!skyzy.status || !skyzy.data || !skyzy.data.video) {
      throw new Error("Unable to retrieve video.");
    }

    const { title, metadata, video } = skyzy.data;
    const { duration, thumbnail, views, description, channel } = metadata;
    let caption = `*[ YOUTUBE - VIDEO ]*\n\n` +
                  `*• Title :* ${title || "Unknown"}\n` +
                  `*• Author :* ${channel || "Unknown"}\n` +
                  `*• Duration :* ${duration || "Unknown"}\n` +
                  `*• Views :* ${views || "Unknown"}\n` +
                  `*• Description :* ${description || "No description available"}`;

    await conn.sendMessage(m.chat, {
      audio: { url: video },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      caption: caption,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    throw `Unable to process your request`;
  }
};

handler.help = ["ytmp3", "yta", "ytaudio"];
handler.tags = ["downloader"];
handler.command = ["ytmp3", "yta", "ytaudio"];

module.exports = handler;