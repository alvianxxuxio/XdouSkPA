let handler = async (m, { conn, text }) => {
  global.menu = text;
  if (text === "doc") {
    m.reply("Suksess Set menu menjadi Document ✅");
  } else if (text === "simple") {
    m.reply("Suksess Set menu menjadi simple ✅");
  } else if (text === "gif") {
    m.reply("sukses set menu menjadi gif ✅");
  } else if (text === "payment") {
    m.reply("sukses set menu menjadi payment ✅");
  } else if (text === "edit") {
    m.reply("sukses set menu menjadi pesan edit  ✅");
 } else if (text === "button") {
    m.reply("sukses set menu menjadi pesan button  ✅");
  } else
    m.reply(
      "Menu berhasil di reset \n\n===========================\n*• List tampilan menu*\n• doc : menampilkan menu dengan documentMessage\n• simple : menampilkan menu dengan simpleMenu\n• gif : menampilkan menu dengan Gif\n• payment :  menampilkan menu dengan RequestPaymentMessage\n• button : menampilkan menu button\n=========================\n\n*Example:* .setmenu button",
    );
};
handler.help = ["setmenu"].map((a) => a + " *[ubah tampilan menu]*");
handler.tags = ["owner"];
handler.command = ["setmenu"];
handler.owner = true;
module.exports = handler;