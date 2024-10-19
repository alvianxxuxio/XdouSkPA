const fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} *[Instagram url]*`;
  m.reply("*[ PROCESSING.... ]*");
  try {
    let fb = await (
      await fetch("https://skizo.tech/api/ig", {
        method: "POST",
        body: JSON.stringify({
          url: text,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "alvianuxio",
        },
      })
    ).json();
    conn.sendMessage(
      m.chat,
      {
        video: {
          url: fb[0].url,
        },
        caption: "*[ INSTAGRAM DOWNLOADER ]* \n© ALUXI - MD",
      },
      { quoted: m },
    );
  } catch (e) {
    throw "*[ ERROR CAN'T DOWNLOAD INSTAGRAM ]*";
  }
};
handler.help = ["ig", "instagram", "igdl"].map((a) => a + " *[Instagram url]*");
handler.tags = ["downloader"];
handler.command = ["ig", "instagram", "igdl"];
module.exports = handler;