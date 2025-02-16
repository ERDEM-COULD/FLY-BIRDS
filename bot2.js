// Minecraft bot modülü
const mineflayer = require('mineflayer');

// Botu başlat
const bot = mineflayer.createBot({
    host: 'TRKYE.aternos.me',
    port: 56944,
    username: 'KASA BOT'
});

// 🛠️ Kasa anahtar eşleşmeleri
const kasaAnahtarMap = {
    'demir': 'beta',
    'altın': 'beta',
    'elmas': 'normal',
    'rastgele beta': 'normal',
    'rastgele normal': 'özel',
    'rastgele özel': 'premium',
    'rastgele premium': 'xpremium'
};

// 🎨 Renk kodları
const renkler = {
    beta: '§6', normal: '§1', özel: '§d', premium: '§a', xpremium: '§c'
};

// 🔑 Anahtar fiyatları
const anahtarFiyatlari = {
    'beta': { demir: 25, altın: 30, elmas: 10 },
    'normal': { demir: 50, altın: 60, elmas: 20 },
    'özel': { demir: 75, altın: 90, elmas: 30 },
    'premium': { demir: 100, altın: 120, elmas: 50 },
    'xpremium': { demir: 150, altın: 180, elmas: 75 }
};

// 📦 Kasa listesi
const kasaTurleri = [
    'DEMİR KASA', 'ALTIN KASA', 'ELMAS KASA',
    'RASTGELE KASA BETA', 'RASTGELE KASA NORMAL',
    'RASTGELE KASA ÖZEL', 'RASTGELE KASA PREMİUM'
];

// 🔍 Envanter kontrol fonksiyonu
function envanterdeMalzeme(envanter, malzeme, miktar) {
    const item = envanter.find(i => i.name.includes(malzeme));
    return item && item.count >= miktar;
}

// 🎁 Kasa listesi komutu
bot.on('chat', (username, message) => {
    if (message === '*kasa') {
        bot.chat('🔒 KASA TÜRLERİ 🔒\n' + kasaTurleri.map(t => `- ${t}`).join('\n'));
    }
});

// 🔑 Anahtar satın alma komutu
bot.on('chat', (username, message) => {
    if (message.startsWith('*anahtar al')) {
        const args = message.split(' ');
        const anahtarTuru = args[2]?.toLowerCase();
        if (!anahtarTuru || !anahtarFiyatlari[anahtarTuru]) {
            return bot.chat('⚠️ Geçersiz anahtar türü! Mevcut anahtarlar: ' + Object.keys(anahtarFiyatlari).join(', '));
        }

        const fiyat = anahtarFiyatlari[anahtarTuru];
        const envanter = bot.inventory.items();

        if (envanterdeMalzeme(envanter, 'iron_ingot', fiyat.demir)) {
            // Demiri al, anahtarı ver
            bot.chat(`✅ ${anahtarTuru} anahtarı oluşturuldu!`);
            bot.inventory.items().push({ name: 'netherite_ingot', displayName: `${renkler[anahtarTuru]}✯ ${anahtarTuru.toUpperCase()} ANAHTARI ✯`, count: 1 });
        } else {
            bot.chat('❌ Paran yetersiz veya envanterde bulunmamaktadır!');
        }
    }
});

// 🧳 Kasa satın alma komutu
bot.on('chat', (username, message) => {
    if (message.startsWith('*kasa al')) {
        const args = message.split(' ');
        const kasaTuru = args.slice(2).join(' ').toLowerCase();

        if (!kasaAnahtarMap[kasaTuru]) {
            return bot.chat('⚠️ Geçersiz kasa türü!');
        }

        const gerekenAnahtar = kasaAnahtarMap[kasaTuru];
        const anahtarIsmi = `${renkler[gerekenAnahtar]}✯ ${gerekenAnahtar.toUpperCase()} ANAHTARI ✯`;
        const envanter = bot.inventory.items();

        // Anahtar kontrolü
        const anahtar = envanter.find(item => item.displayName === anahtarIsmi);
        if (!anahtar) {
            return bot.chat('❌ Yetersiz anahtar! Kasanın açılması için uygun anahtar bulunamadı.');
        }

        // Anahtarı al ve kasayı ver
        anahtar.count -= 1;
        if (anahtar.count <= 0) {
            const index = envanter.indexOf(anahtar);
            envanter.splice(index, 1);
        }

        // Kasayı ver
        const kasaIsmi = `§b🎁 ${kasaTuru.toUpperCase()} 🎁`;
        bot.inventory.items().push({ name: 'chest', displayName: kasaIsmi, count: 1 });
        bot.chat(`🎉 Tebrikler! ${kasaTuru.toUpperCase()} kasasını aldınız.`);
    }
});
