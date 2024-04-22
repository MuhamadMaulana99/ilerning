function parseTimeYYMMDDHHMMSS(timeString) {
  const [datePart, timePart] = timeString.split(' '); // Memisahkan tanggal dan waktu
  const [year, month, day] = datePart.split('-').map(Number); // Mendapatkan tahun, bulan, dan tanggal
  const [hours, minutes, seconds] = timePart.split(':').map(Number); // Mendapatkan jam, menit, dan detik

  // Membuat objek Date dari bagian-bagian yang dipisahkan
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

export default parseTimeYYMMDDHHMMSS;
