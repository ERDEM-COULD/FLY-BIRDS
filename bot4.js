const mineflayer = require('mineflayer');

// Minecraft sunucusuna bağlanma bilgileri
const bot = mineflayer.createBot({
  host: 'TRKYE.aternos.me',  // Sunucu adresi
  port: 56944,               // Sunucu portu
  username: 'bot_username',  // Bot kullanıcı adı
  version: '1.18.2'          // Minecraft sürümü
});

// PvP isteği ve şikayet için kayıt
let pvpRequests = {};

// PvP isteği gönderme
bot.on('chat', (username, message) => {
  if (message.startsWith('*PvP isteği')) {
    const args = message.split(' ').slice(2);
    const requester = username;
    const target = args.join(' ');

    if (target === requester) {
      bot.chat('Kendine PvP isteği atamazsın!');
      return;
    }

    // PvP isteği atan oyuncuya mesaj gönder
    bot.chat(`${target} sana PvP isteği attı. Kabul etmek için *pvp accept, reddetmek için *pvp decline yaz.`);
    
    // PvP isteğini kaydet
    pvpRequests[target] = {
      requester: requester,
      status: 'pending'
    };
  }

  if (message === '*şikayet') {
    bot.chat('Lütfen şikayetlerinizi merdem58171.3@gmail.com adresine iletin.');
  }

  if (message === '*pvp accept') {
    const target = username;
    if (!pvpRequests[target] || pvpRequests[target].status !== 'pending') {
      bot.chat('Bir PvP isteği almadınız.');
      return;
    }

    const requester = pvpRequests[target].requester;
    const pvpCoordinates = { x: 100, y: 64, z: 100 };  // PvP için örnek koordinatlar

    // PvP kabul edildiğinde oyuncuları ışınla
    bot.chat(`PvP başlıyor! ${requester} ve ${target}, ${pvpCoordinates.x}, ${pvpCoordinates.y}, ${pvpCoordinates.z} koordinatlarına ışınlanıyor!`);

    bot.teleport(new mineflayer.vec3(pvpCoordinates.x, pvpCoordinates.y, pvpCoordinates.z));
    bot.chat('Oyun başladı! PvP mücadelesi başlamak üzere...');
    pvpRequests[target].status = 'started';
  }

  if (message === '*pvp decline') {
    const target = username;
    if (!pvpRequests[target] || pvpRequests[target].status !== 'pending') {
      bot.chat('Bir PvP isteği almadınız.');
      return;
    }

    const requester = pvpRequests[target].requester;
    bot.chat(`${requester} tarafından gönderilen PvP isteği reddedildi.`);
    pvpRequests[target].status = 'declined';
  }
});

// Botun Minecraft sunucusuna bağlanması
bot.on('spawn', () => {
  console.log('Bot Minecraft sunucusuna başarıyla bağlandı!');
});

// Botu sunucudan atılmaması için 1 blok ileri gidip 90 derece döndürme
bot.on('physicTick', () => {
  bot.setControlState('forward', true);  // 1 blok ileri git
  bot.look(Math.random() * 360, Math.random() * 360, true);  // 90 derece döndür
});
