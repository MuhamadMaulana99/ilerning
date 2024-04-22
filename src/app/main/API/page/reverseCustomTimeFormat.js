import dayjs from 'dayjs';

function reverseCustomTimeFormat(timeString) {
  const timeArray = timeString.split(':');

  // Pastikan format waktu sesuai dengan yang diharapkan (HH:mm:ss)
  if (timeArray.length !== 3) {
    return 'Invalid Time Format';
  }

  // Mengambil jam, menit, dan detik dari array
  const hours = parseInt(timeArray[0], 10);
  const minutes = parseInt(timeArray[1], 10);
  const seconds = parseInt(timeArray[2], 10);

  // Membuat objek Day.js dari waktu yang diberikan
  const timeObject = dayjs().hour(hours).minute(minutes).second(seconds);

  return timeObject;
}

export default reverseCustomTimeFormat;
// Contoh penggunaan:
// const timeString = '12:34:56';
// const timeObject = reverseCustomTimeFormat(timeString);
// console.log('Waktu dalam format objek:', timeObject);
