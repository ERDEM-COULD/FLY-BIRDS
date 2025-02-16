const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'TRKYE.aternos.me',
  port: 56944,
  username: 'BOTKAFA',
});

let yetkiUyarisiVerildi = false;

// BOTKAFA'nın hareket etmesi için fonksiyon
const moveAndTurn = () => {
  bot.setControlState('forward', true); // 1 blok ileri git
  setTimeout(() => {
    bot.setControlState('forward', false); // İleri gitmeyi durdur
    bot.look(bot.entity.yaw + Math.PI / 2, bot.entity.pitch, true); // 90 derece sağa dön
  }, 1000); // 1 saniye boyunca ileri git
};

// Hareketin sürekli devam etmesi için bir interval
setInterval(moveAndTurn, 2000); // Her 2 saniyede bir hareket etsin

bot.on('chat', (username, message) => {
  if (!message.startsWith('*')) return; // * ile başlamayan komutları yok say
  const komut = message.slice(1).split(' '); // * işaretini kaldır ve boşlukla ayır

  // Sadece yetkiliye özel komutlar
  if (['tüm varlıkları öldür', 'tüm oyuncuları öldür', 'tüm mobları öldür', 'tüm canavarları öldür'].includes(komut.join(' ')) && username !== 'SIVASLIMEMOS58') {
    bot.chat('Maalesef buna yetkiniz yok!');
    return;
  }

  if (komut.join(' ') === 'tüm varlıkları öldür' && username === 'SIVASLIMEMOS58') {
    bot.chat('/killall all world');
    bot.chat('Tüm varlıklar öldürüldü!');
    return;
  }
  if (komut.join(' ') === 'tüm canavarları öldür' && username === 'SIVASLIMEMOS58') {
    bot.chat('/killall monsters world');
    bot.chat('Tüm canavarlar öldürüldü!');
    return;
  }

  if (komut.join(' ') === 'tüm oyuncuları öldür' && username === 'SIVASLIMEMOS58') {
    bot.chat('/killall entities');
    bot.chat('Tüm oyuncular öldürüldü!');
    return;
  }
  if (komut.join(' ') === 'tüm hayvanları öldür' && username === 'SIVASLIMEMOS58') {
    bot.chat('/killall animals world');
    bot.chat('Tüm hayvanlar öldürüldü!');
    return;
  }
  if (komut.join(' ') === 'tüm mobları öldür' && username === 'SIVASLIMEMOS58') {
    bot.chat('/killall mobs world');
    bot.chat('Tüm moblar öldürüldü!');
    return;
  }

  if (komut.join(' ') === 'rastgele bir yer') {
    const x = Math.floor(Math.random() * 1000);
    const y = 64; // Yeryüzünde 64 seviyesinde
    const z = Math.floor(Math.random() * 1000);
    bot.chat(`/tp ${username} ${x} ${y} ${z}`);
    bot.chat(`${username}, rastgele bir yere ışınlandın!`);
    return;
  }

  if (komut.join(' ') === 'bot evine git') {
    bot.chat(`/tp BOTKAFA 2108 60 285`);
    bot.chat('BOT EVİNE GİDİYOR!');
    return;
  }

  if (komut.join(' ') === 'komutlar') {
    const komutListesi = `
      **HERKESE AÇIK KOMUTLAR**:
      📌 **Işınlanma** : *spawn*
      📌 **Rastgele Bir Yere Işınlan** : *rastgele bir yer*
      
      **VIP KOMUTLAR**:
      📌 **Bot Evine Git** : *bot evine git*
      📌 **Tüm Varlıkları Öldür** : *tüm varlıkları öldür* (Yalnızca SIVASLIMEMOS58)
      📌 **Tüm Canavarları Öldür** : *tüm canavarları öldür* (Yalnızca SIVASLIMEMOS58)
      📌 **Tüm Mobları Öldür** : *tüm mobları öldür* (Yalnızca SIVASLIMEMOS58)
      📌 **Tüm Oyuncuları Öldür** : *tüm oyuncuları öldür* (Yalnızca SIVASLIMEMOS58)
      📌 **Hava Durumu Değiştir** : *yağmur yap*, *havanı aç*, *sabah yap*, *akşam yap*
      📌 **Saat Değiştir** : *öğleden yap*, *zifiri karanlık yap*
    `;
    bot.chat(komutListesi);
    return;
  }

  if (komut.join(' ') === 'spawn') {
    bot.chat(`/tp ${username} 2131 63 272`);
    bot.chat('IŞINLANDINIZ!');
    return;
  }

  // Yeni ışınlanma komutu: <ışınlanacak kişi> <ışınlanılacakkişi> ışınla
  if (komut.length === 3 && komut[2] === 'ışınla') {
    const target = komut[1];
    if (bot.players[target]) {
      bot.chat(`/tp ${target} ${username}`);
      bot.chat(`${target} başarıyla ${username}'ye ışınlandı!`);
    } else {
      bot.chat(`Kullanıcı ${target} bulunamadı.`);
    }
    return;
  }

  // Komutlar
  if (komut.join(' ') === 'bot gel') {
    bot.chat('/tp BOTKAFA SIVASLIMEMOS58');
    bot.chat('BOT GELİYOR!');
  } else if (komut.join(' ') === 'sabah yap') {
    bot.chat('/time set day');
    bot.chat('SABAH YAPILDI!');
  } else if (komut.join(' ') === 'akşam yap') {
    bot.chat('/time set night');
    bot.chat('AKŞAM YAPILDI!');
  } else if (komut.join(' ') === 'havayı aç') {
    bot.chat('/weather clear');
    bot.chat('HAVA AÇILDI!');
  } else if (komut.join(' ') === 'yağmur yap') {
    bot.chat('/weather storm');
    bot.chat('YAĞMUR BAŞLADI!');
  } else if (komut.join(' ') === 'öğle yap') {
    bot.chat('/time set noon');
    bot.chat('ÖĞLEDEN SONRA YAPILDI!');
  } else if (komut.join(' ') === 'zifiri karanlık yap') {
    bot.chat('/time set midnight');
    bot.chat('ZİFİRİ KARANLIK YAPILDI!');
  }

  // BOTKAFA'nın kendini yeniden başlatması
  if (komut.join(' ') === 'kendini yeniden başlat' && username === 'SIVASLIMEMOS58') {
    bot.quit();
    setTimeout(() => {
      bot = mineflayer.createBot({
        host: 'TRKYE.aternos.me',
        port: 56944,
        username: 'BOTKAFA',
      });
    }, 5000); // 5 saniye sonra yeniden bağlanıyor
  }

  // BOTKAFA'nın kendini kapatması
  if (komut.join(' ') === 'kendini kapat' && username === 'SIVASLIMEMOS58') {
    bot.quit();
    bot.chat('Bot kapatılıyor...');
  }
});

// Kasa komutu
bot.on('chat', (username, message) => {
  if (message.toLowerCase() === '*kasa') {
    // Kasa türü seçeneklerini listeleyelim
    bot.chat('Hangi kasa türünü almak istersiniz? Mevcut kasa türleri ve fiyatları:');
    bot.chat('1. KASA DEMİR - Fiyat: 1 BETA kasa anahtarı (İçinde demir set)');
    bot.chat('2. KASA ZÜMRÜT - Fiyat: 2 BETA kasa anahtarı (İçinde zümrüt set)');
    bot.chat('3. KASA ALTIN - Fiyat: 3 BETA kasa anahtarı (İçinde altın set)');
    bot.chat('4. KASA ELMAS - Fiyat: 4 BETA kasa anahtarı (İçinde elmas set)');
    bot.chat('Lütfen almak istediğiniz kasa türünü yazınız (Örneğin: KASA DEMİR)');

    // Kasa türü için bir yanıt bekliyoruz
    bot.once('chat', (response) => {
      const kasaTuru = response.toUpperCase().trim(); // Kullanıcının verdiği kasa türünü alıyoruz

      // Kasa türünü kontrol ediyoruz
      const kasaListesi = ['KASA DEMİR', 'KASA ZÜMRÜT', 'KASA ALTIN', 'KASA ELMAS'];

      if (kasaListesi.includes(kasaTuru)) {
        // Kasa içeriği ve fiyatları
        let anahtarFiyat = 0;
        let kasaIcerik = [];

        if (kasaTuru === 'KASA DEMİR') {
          anahtarFiyat = 1; // 1 BETA kasa anahtarı
          kasaIcerik = [
            {name: 'iron_sword', count: 1},
            {name: 'iron_axe', count: 1},
            {name: 'iron_helmet', count: 1},
          ];
        } else if (kasaTuru === 'KASA ZÜMRÜT') {
          anahtarFiyat = 2; // 2 BETA kasa anahtarı
          kasaIcerik = [
            {name: 'emerald_sword', count: 1},
            {name: 'emerald_axe', count: 1},
            {name: 'emerald_helmet', count: 1},
          ];
        } else if (kasaTuru === 'KASA ALTIN') {
          anahtarFiyat = 3; // 3 BETA kasa anahtarı
          kasaIcerik = [
            {name: 'golden_sword', count: 1},
            {name: 'golden_axe', count: 1},
            {name: 'golden_helmet', count: 1},
          ];
        } else if (kasaTuru === 'KASA ELMAS') {
          anahtarFiyat = 4; // 4 BETA kasa anahtarı
          kasaIcerik = [
            {name: 'diamond_sword', count: 1},
            {name: 'diamond_axe', count: 1},
            {name: 'diamond_helmet', count: 1},
          ];
        }

        bot.chat(`${username}, ${kasaTuru} almak için ${anahtarFiyat} BETA kasa anahtarına ihtiyacınız var.`);
      } else {
        bot.chat('Geçersiz kasa türü! Lütfen geçerli bir kasa türü giriniz.');
      }
    });
  }
});
// BOTKAFA Botu Kodu (Süreli Cezalar Eklendi)

let playerData = {}; // Oyuncu verileri
let activePunishments = {}; // Aktif cezalar
let mutedPlayers = {}; // Susturulan oyuncular
let temporaryBans = {}; // Geçici banlar
let temporaryOps = {}; // Geçici ops

const punishmentTypes = ['hapis', 'envanter_silme', 'blok_kıramama', 'körlük', 'slow', 'teleport', 'tp_istemek', 'ceza_sil', 'susturma', 'ban', 'op'];

// Bot komutları
const commands = {
  'ceza': (sender, args) => {
    const user = args[1];
    const type = args[0];
    const duration = args[2];

    if (!user || !punishmentTypes.includes(type)) {
      return 'Geçerli bir ceza türü ve oyuncu ismi girin.';
    }

    // Süreyi doğrula
    if (isNaN(duration)) {
      return 'Geçerli bir süre girin.';
    }

    if (type === 'blok_kıramama') {
      activePunishments[user] = { type: 'blok_kıramama', time: Date.now() + duration * 60000 }; // dakika cinsinden süre
      return `${user} oyuncusuna ${duration} dakika boyunca blok kıramama cezası verildi.`;
    }

    if (type === 'körlük') {
      activePunishments[user] = { type: 'körlük', time: Date.now() + duration * 60000 };
      return `${user} oyuncusuna ${duration} dakika körlük cezası verildi.`;
    }

    if (type === 'slow') {
      activePunishments[user] = { type: 'slow', time: Date.now() + duration * 60000 };
      return `${user} oyuncusuna ${duration} dakika boyunca slow cezası verildi.`;
    }

    if (type === 'teleport') {
      activePunishments[user] = { type: 'teleport', time: Date.now() + duration * 60000 };
      return `${user} oyuncusuna ${duration} dakika boyunca teleport yasağı verildi.`;
    }

    if (type === 'tp_istemek') {
      activePunishments[user] = { type: 'tp_istemek', time: Date.now() + duration * 60000 };
      return `${user} oyuncusuna ${duration} dakika boyunca TP istemek yasağı verildi.`;
    }

    return 'Geçersiz ceza türü.';
  },

  'ceza_sil': (sender, args) => {
    const user = args[1];
    const type = args[2];

    if (!user || !type || !punishmentTypes.includes(type)) {
      return 'Geçerli bir ceza türü ve oyuncu ismi girin.';
    }

    if (type === 'blok_kıramama' && activePunishments[user]?.type === 'blok_kıramama') {
      delete activePunishments[user]; // Blok kıramama cezasını kaldır
      return `${user} oyuncusunun blok kıramama cezası kaldırıldı.`;
    }

    if (type === 'körlük' && activePunishments[user]?.type === 'körlük') {
      delete activePunishments[user]; // Körlük cezasını kaldır
      return `${user} oyuncusunun körlük cezası kaldırıldı.`;
    }

    if (type === 'slow' && activePunishments[user]?.type === 'slow') {
      delete activePunishments[user]; // Slow cezasını kaldır
      return `${user} oyuncusunun slow cezası kaldırıldı.`;
    }

    if (type === 'teleport' && activePunishments[user]?.type === 'teleport') {
      delete activePunishments[user]; // Teleport cezasını kaldır
      return `${user} oyuncusunun teleport yasağı kaldırıldı.`;
    }

    if (type === 'tp_istemek' && activePunishments[user]?.type === 'tp_istemek') {
      delete activePunishments[user]; // TP istemek yasağını kaldır
      return `${user} oyuncusunun TP istemek yasağı kaldırıldı.`;
    }

    return 'Geçersiz ceza türü veya oyuncu ismi.';
  },

  'ceza_listesi': () => {
    return `
      Ceza Türleri:
      - blok_kıramama <süre> <oyuncu>
      - körlük <süre> <oyuncu>
      - slow <süre> <oyuncu>
      - teleport <süre> <oyuncu>
      - tp_istemek <süre> <oyuncu>
      - ceza_sil <oyuncu> <ceza türü>
    `;
  }
};

// Ceza kontrolü ve süre dolumunu sürekli kontrol etmek için bir fonksiyon
function checkPunishments() {
  for (let user in activePunishments) {
    const punishment = activePunishments[user];
    if (Date.now() > punishment.time) {
      delete activePunishments[user]; // Ceza süresi dolmuşsa ceza kaldırılır
      console.log(`${user} oyuncusunun cezası sona erdi.`);
    }
  }

  setTimeout(checkPunishments, 60000); // Her dakika kontrol et
}

checkPunishments(); // Başlat
