export default async function handler(req, res) {
  // Hanya menerima metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;
    
    // Validasi input dasar
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    // Mengambil variabel rahasia dari Environment
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Konfigurasi Telegram belum diatur di Environment Variables.');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Memformat pesan agar rapi saat dibaca di Telegram
    const telegramText = `🔔 <b>PESAN BARU DARI PORTOFOLIO!</b>\n\n` +
      `👤 <b>Nama:</b> ${name}\n` +
      `📧 <b>Email:</b> ${email}\n\n` +
      `💬 <b>Pesan:</b>\n${message}`;

    // Mengirim ke API Resmi Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramText,
        parse_mode: 'HTML', // Agar bisa pakai bold dan formatting
      }),
    });

    const result = await telegramResponse.json();

    if (!result.ok) {
      console.error('Gagal mengirim ke Telegram:', result);
      return res.status(500).json({ error: 'Gagal mengirim pesan' });
    }

    // Sukses
    return res.status(200).json({ success: true, message: 'Pesan berhasil dikirim ke Telegram' });
    
  } catch (error) {
    console.error('Terjadi kesalahan server:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
