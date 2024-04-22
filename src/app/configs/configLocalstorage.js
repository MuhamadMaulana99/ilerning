/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-mutable-exports */
import { showMessage } from 'app/store/fuse/messageSlice';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';

const saveToLocalStorage = (key, data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret').toString();
  localStorage.setItem(key, encryptedData);
};

const getFromLocalStorage = (key) => {
  const dispatch = useDispatch();
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret');
    let decryptedData;
    try {
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      window.location.href = '/sign-in';
      console.log(error);
      const messages = 'Unauthorized!!';
      localStorage.clear();
      dispatch(
        showMessage({
          message: messages,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          variant: 'error',
        })
      );
      return null;
    }
    return decryptedData;
  }
  return null;
};

export default getFromLocalStorage;
