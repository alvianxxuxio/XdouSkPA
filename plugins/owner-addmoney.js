let handler = async (m, { conn, text }) => {
  if (!text) throw "*• Example :* .delexp *[@user amount]*";
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) throw "*• Example :* .delexp *[@user amount]*";
  let txt = text.replace("@" + who.split`@`[0], "").trim();
  if (isNaN(txt)) throw "*• Example :* .delexp *[@user amount]*";
  let poin = parseInt(txt);
  let money = poin;
  let users = global.db.data.users;
  if (users[m.sender].owner == true) {
      users[who].money += poin;

      conn.reply(
        m.chat,
        `Congratulations @${who.split`@`[0]}. You get +${points} Money!`,
        m,
        {
          contextInfo: {
            mentionedJid: [who],
          },
        },
      );
    
  } else {
      users[who].money += poin;

      conn.reply(
        m.chat,
        `Selamat @${who.split`@`[0]}. Kamu mendapatkan +${poin} Money!`,
        m,
        {
          contextInfo: {
            mentionedJid: [who],
          },
        },
      );
    
  }
};

handler.help = ["addmoney *[@user, amount]*"];
handler.tags = ["owner"];
handler.command = ["addmoney"];
handler.rowner = true;

module.exports = handler;