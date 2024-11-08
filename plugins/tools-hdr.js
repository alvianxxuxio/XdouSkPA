/*════════════════════════════════════
  ├ Weem Gweh Jier
  ├ WhatsApp: wa.me/62857021072505
  ├ Jangan Perjual Belikan Esce Ini!  
═════════════════════════════════════
*/
let FormData = require("form-data");
let Jimp = require("jimp");

async function processing(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"];
    Methods.includes(method) ? (method = method) : (method = Methods[0]);
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data));
          });
        res.on("error", (e) => {
          reject();
        });
      },
    );
  });
}
let handler = async (m, { conn, usedPrefix, command }) => {
  switch (command) {
    case "enhancer":
    case "unblur":
    case "enhance":
      {
        conn.enhancer = conn.enhancer ? conn.enhancer : {};
        if (m.sender in conn.enhancer)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime)
          throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`;
        else conn.enhancer[m.sender] = true;
        m.reply(wait);
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", done, m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply(eror);
          }
          delete conn.enhancer[m.sender];
        }
      }
      break;
    case "colorize":
    case "colorizer":
      {
        conn.recolor = conn.recolor ? conn.recolor : {};
        if (m.sender in conn.recolor)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime)
          throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`;
        else conn.recolor[m.sender] = true;
        m.reply(wait);
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", done, m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply(eror);
          }
          delete conn.recolor[m.chat];
        }
      }
      break;
    case "hd":
    case "hdr":
    case "hd2":
    case "hd3":
    case "hade":
    case "hdr2":
    case "hdr3":
    case "remini":
      {
        conn.hdr = conn.hdr ? conn.hdr : {};
        if (m.sender in conn.hdr)
          throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime)
          throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`;
        else conn.hdr[m.sender] = true;
        m.reply(wait);
        let img = await q.download?.();
        let error;
        try {
          const This = await processing(img, "enhance");
          conn.sendFile(m.chat, This, "", done, m);
        } catch (er) {
          error = true;
        } finally {
          if (error) {
            m.reply(eror);
          }
          delete conn.hdr[m.sender];
        }
      }
      break;
  }
};
handler.help = [
  "unblur",
  "enchaner",
  "enhance",
  "hdr",
  "colorize",
  "hd",
  "remini",
  "hd2",
  "hdr2",
  "hd3",
  "hdr3",
  "hade",
]
handler.tags = ["tools"];
handler.premium = false;
handler.command = [
  "unblur",
  "enchaner",
  "enhance",
  "hdr",
  "colorize",
  "hd",
  "remini",
  "hd2",
  "hdr2",
  "hd3",
  "hdr3",
  "hade",
];
module.exports = handler;