const { default: getFromLocalStorage } = require('./configLocalstorage');

const configToken = () => {
  const getUser = getFromLocalStorage('user_profils');
  const token = getUser?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Panggil fungsi getAccessToken() untuk mendapatkan token
      'Content-Type': 'multipart/form-data',
    },
  };
  return config;
};

export default configToken;
