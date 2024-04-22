function customTimeFormat(dateObj) {
  // Pastikan objek adalah objek Day.js atau objek yang sesuai dengan struktur yang Anda berikan
  if (!dateObj || typeof dateObj !== 'object') {
    return 'Invalid Date Object';
  }

  // Mendapatkan jam, menit, dan detik dari objek
  let hours = dateObj.$H;
  let minutes = dateObj.$m;
  let seconds = dateObj.$s;

  // Menambahkan nol di depan angka jika nilainya kurang dari 10
  hours = (hours < 10 ? '0' : '') + hours;
  minutes = (minutes < 10 ? '0' : '') + minutes;
  seconds = (seconds < 10 ? '0' : '') + seconds;

  // Mengembalikan string format waktu sesuai dengan format yang diinginkan (HH:mm:ss)
  return `${hours}:${minutes}:${seconds}`;
}
export default customTimeFormat;
