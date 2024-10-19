const { Youtube } = require('@neoxr/youtube-scraper');
const yt = new Youtube({
    fileAsUrl: false
});

let handler = async (m, { conn, args, text, delay, usedPrefix, command }) => {
    if (!text) return m.reply("Example: .play someone");
    await yete(m, text, conn, delay); // Pass m, conn, and delay to yete function
};
handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = ["play"];
module.exports = handler;

async function yete(m, text, conn, delay) { // Add m, conn, and delay as parameters
    try {
        m.reply('Please wait...');
        let result = await yt.play(text);
        if (!result || !result.status) {
            return m.reply('Sorry, no results found.');
        }
        let res = `${result.title}
* *Channel :* ${result.channel}
* *Duration :* ${result.duration}
* *Extension :* ${result.data.extension}
* *File Size :* ${result.data.size}
* *Published :* ${result.publish}
* *Quality :* ${result.data.quality}
* *Views :* ${result.views}`;

  m.reply(res);
        await conn.sendMessage(m.chat, {
            audio: result.data.url,
            mimetype: "audio/mp4",
        }, {
            quoted: m
        });
    } catch (e) {
        throw e.message;
    }
}