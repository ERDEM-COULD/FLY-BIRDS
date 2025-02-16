const mineflayer = require('mineflayer');

// Botu oluşturuyoruz
const bot = mineflayer.createBot({
  host: 'TOWN1-al9n.aternos.me', // Bu botun bağlanacağı ana sunucu
  port: 45187, // Sunucu portu
  username: 'SUNUCU AKTARIM BOTU', // Botun kullanıcı adı
  version: '1.20.4' // Minecraft sürümü (dilediğiniz sürümde olabilir)
});

// Botun hazır olduğunda çalışacak fonksiyon
bot.once('spawn', () => {
  console.log('Bot sunucuya bağlandı!');
  
  // Botun sürekli hareket etmesi için fonksiyon
  setInterval(() => {
    bot.setControlState('forward', true); // Botu ileriye hareket ettiriyor
    setTimeout(() => {
      bot.setControlState('forward', false); // Hareketi durduruyor
      bot.setControlState('right', true); // Botu sağa döndürüyor
      setTimeout(() => {
        bot.setControlState('right', false); // Döndürmeyi durduruyor
      }, 200); // Sağ dönüş süresi (200 ms)
    }, 1000); // 1 saniye boyunca ileri gitmesini sağlıyoruz
  }, 1500); // Her 1.5 saniyede bir hareket döngüsünü başlatıyoruz
});

// Oyuncudan gelen komutları dinleyen olay
bot.on('chat', (username, message) => {
  if (message === '*town1') {
    // Komut *town1 yazıldığında botun cevabı
    bot.chat(`@${username} sizi town1 sunucusuna yönlendiriyorum...`);

    // Burada, oyuncuyu başka bir sunucuya yönlendiren komut olacak
    // Sunucuya bağlantı yapılacak komut (BungeeCord üzerinden örnek)
    bot.chat('/server town1-al9n.aternos.me:45187');
  }
});

// Hata kontrolü
bot.on('error', (err) => {
  console.log('Bot hata aldı:', err);
});

// Botun bağlantısı kesildiğinde çalışacak fonksiyon
bot.on('end', () => {
  console.log('Bot sunucudan ayrıldı');
});
