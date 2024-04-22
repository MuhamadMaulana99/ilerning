function formatTimeYYMMDDHHMMSS(dateObj) {
  // Pastikan objek adalah objek Day.js atau objek yang sesuai dengan struktur yang Anda berikan
  if (!dateObj || typeof dateObj !== 'object') {
    return 'Invalid Date Object';
  }

  // Mendapatkan tanggal, bulan, tahun, jam, menit, dan detik dari objek
  const year = dateObj.$y;
  const month = (dateObj.$M + 1).toString().padStart(2, '0'); // Perhatikan +1 karena bulan dimulai dari 0
  const day = dateObj.$D.toString().padStart(2, '0');
  const hours = dateObj.$H.toString().padStart(2, '0');
  const minutes = dateObj.$m.toString().padStart(2, '0');
  const seconds = dateObj.$s.toString().padStart(2, '0');

  // Mengembalikan string format waktu sesuai dengan format yang diinginkan (YYYY-MM-DD HH:mm:ss)
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default formatTimeYYMMDDHHMMSS;
