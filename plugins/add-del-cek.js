const { proto } = require("@whiskeysockets/baileys");

function msToDate(ms) {
    let temp = ms;
    let days = Math.floor(temp / (24 * 60 * 60 * 1000));
    let daysms = temp % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = daysms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = hoursms % (60 * 1000);
    let sec = Math.floor((minutesms) / 1000);
    return `${days} hari ${hours} jam ${minutes} menit`;
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
    let who;
    let wsewa = global.db.data.chats[m.chat]?.wsewa || {}; // Gunakan wsewa

    if (args.length === 1) {
        who = m.isGroup ? m.chat : args[0];
    } else if (args.length === 2) {
        who = args[0];
    } else {
        who = m.isGroup ? m.chat : null;
    }

    switch (command) {
        case 'addsewa':
            let jumlahHari = parseInt(args[args.length - 1]);
            if (isNaN(jumlahHari) || jumlahHari <= 0) throw `Masukkan angka yang valid untuk jumlah hari!\n*Misal: ${usedPrefix + command} <link grup> 30* atau ${usedPrefix + command} 30*`;

            let msJumlahHari = 86400000 * jumlahHari;
            let now = new Date().getTime();

            if (!who) throw `Gunakan format yang benar: ${usedPrefix + command} <link grup> <jumlah hari> atau ${usedPrefix + command} <jumlah hari>`;

            if (who.includes('https://chat.whatsapp.com/')) {
                let groupInviteCode = who.split('https://chat.whatsapp.com/')[1];

                try {
                    let groupId = await conn.groupAcceptInvite(groupInviteCode);
                    console.log(`Berhasil join grup dengan ID: ${groupId}`);
                    who = groupId;

                    if (!wsewa[groupId]) wsewa[groupId] = {};

                    if (wsewa[groupId].expired && now < wsewa[groupId].expired) {
                        wsewa[groupId].expired += msJumlahHari;
                    } else {
                        wsewa[groupId].expired = now + msJumlahHari;
                    }

                    global.db.data.chats[m.chat].wsewa = wsewa;
                    conn.reply(m.chat, `Berhasil bergabung ke grup dan menetapkan masa sewa untuk grup ini selama ${jumlahHari} hari.\n\nHitung Mundur: ${msToDate(wsewa[groupId].expired - now)}`, m);
                } catch (err) {
                    console.error(`Gagal join grup: ${err}`);
                    throw `Gagal bergabung ke grup, pastikan link grup valid atau bot sudah diizinkan bergabung!`;
                }
            } else {
                if (!wsewa[who]) wsewa[who] = {};

                if (wsewa[who].expired && now < wsewa[who].expired) {
                    wsewa[who].expired += msJumlahHari;
                } else {
                    wsewa[who].expired = now + msJumlahHari;
                }

                global.db.data.chats[m.chat].wsewa = wsewa;
                conn.reply(m.chat, `Berhasil menetapkan masa sewa untuk Grup ini selama ${jumlahHari} hari.\n\nHitung Mundur: ${msToDate(wsewa[who].expired - now)}`, m);
            }
            break;

        case 'delsewa':
            if (!who) throw `Gunakan format yang benar: ${usedPrefix + command} <link grup>`;
            if (!wsewa[who]) throw `Grup tidak ditemukan di database.`;

            delete wsewa[who];
            global.db.data.chats[m.chat].wsewa = wsewa;
            conn.reply(m.chat, `Berhasil menghapus masa sewa untuk Grup ini`, m);
            break;

        case 'listsewa':
            let sewaList = Object.keys(wsewa).filter(chatId => wsewa[chatId].expired);
            if (sewaList.length === 0) {
                conn.reply(m.chat, `Tidak ada grup yang memiliki masa sewa aktif.`, m);
            } else {
                let listText = 'Grup dengan masa sewa aktif:\n\n';
                for (let chatId of sewaList) {
                    let remainingTime = wsewa[chatId].expired - new Date().getTime();
                    listText += `ID: ${chatId}\nMasa Aktif: ${msToDate(remainingTime)}\n\n`;
                }
                conn.reply(m.chat, listText, m);
            }
            break;

        case 'ceksewa':
            if (!who) throw `Gunakan format yang benar: ${usedPrefix + command} <link grup>`;
            if (!wsewa[who]) throw `Grup tidak ditemukan di database.`;

            let remainingTime = wsewa[who].expired - new Date().getTime();
            if (remainingTime > 0) {
                conn.reply(m.chat, `Masa aktif sewa untuk grup ini adalah ${msToDate(remainingTime)}`, m);
            } else {
                conn.reply(m.chat, `Grup ini tidak memiliki masa sewa aktif.`, m);
            }
            break;

        default:
            throw `Perintah tidak valid: ${command}`;
    }
}

handler.help = ['addsewa <hari>', 'addsewa <link grup> <hari>', 'delsewa', 'delsewa <link grup>', 'listsewa', 'ceksewa', 'ceksewa <link grup>'];
handler.tags = ['owner'];
handler.command = /^(addsewa|delsewa|listsewa|ceksewa)$/i;
handler.rowner = /^(addsewa|delsewa|listsewa)$/i;
handler.group = false;

module.exports = handler;