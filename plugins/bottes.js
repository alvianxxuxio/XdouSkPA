const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const fs = require("fs");
const fetch = require("node-fetch");
const os = require("os");
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
const usedMemory = totalMemory - freeMemory;
const {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");
let handler = async (m, { conn, text, usedPrefix, command }) => {
let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m?.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363199957492480@newsletter',
                            newsletterName: `ALVIAN UXIO Inc.`,
                            serverMessageId: -1
                        },
                        businessMessageForwardInfo: {
                            businessOwnerJid: conn.decodeJid(conn.user.id)
                        },
                        externalAdReply: {
                            title: 'ALUXI - MD',
                            body: "Made by ALVIAN UXIO Inc.",
                            thumbnailUrl: "https://telegra.ph/file/6cb4600ac90181f9149a9.jpg",
                            sourceUrl: '',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: "\n\n`ALUXI ONLINE`\n\n ALUXI SEDANG ONLINE KAK"
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `© ALVIAN UXIO Inc.`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: ``,
                        thumbnailUrl: "",
                        gifPlayback: true,
                        subtitle: "ALVIAN UXIO Inc.",
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({
                            document: fs.readFileSync('./package.json'),
                            mimetype: "image/png",
                            fileLength: 99999999999999,
                            jpegThumbnail: fs.readFileSync("./media/alxo.png"),
                            fileName: "SEDANG ONLINE",
                        }, {
                            upload: conn.waUploadToServer
                        }))
                    }),
                    gifPlayback: true,
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Tampilkan menu\",\"id\":\".menu\"}"
              },
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"WhatsApp Channel\",\"url\":\"https://whatsapp.com/channel/0029VaAQKcJEquiQVH2RM10U\",\"merchant_url\":\"https://www.google.com\"}"
              }
                        ]
                    })
                })
            }
        }
    }, {
        quoted: fkontak
    });

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
}
handler.help = ["bot"]
handler.tags = ["main"]
handler.command = ["bot", "tes"]
module.exports = handler