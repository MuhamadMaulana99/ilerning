/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-mutable-exports */

import CryptoJS from 'crypto-js';

const getFromLocalStorage = (key) => {
  // const dispatch = useDispatch();
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
      return null;
    }
    return decryptedData;
  }
  return null;
};

const getUser = getFromLocalStorage('user_profils');
const role = getUser?.user?.role;
let navigationConfig = [];
if (role === 'ADMIN') {
  navigationConfig = [
    {
      id: 'master',
      title: 'Master Data',
      type: 'collapse',
      icon: 'check_box',
      children: [
        {
          id: 'dosen',
          title: 'Dosen',
          // translate: 'Stok Barang',
          type: 'item',
          icon: 'heroicons-outline:collection',
          url: '/apps/masterdosen/',
        },
        {
          id: 'kelas',
          title: 'Master Kelas',
          // translate: 'Stok Barang',
          type: 'item',
          icon: 'heroicons-outline:collection',
          url: '/apps/masterkelas/',
        },
        {
          id: 'kelas',
          title: 'Master Mahasiswa',
          // translate: 'Stok Barang',
          type: 'item',
          icon: 'heroicons-outline:collection',
          url: '/apps/masterMahasiswa/',
        },
      ],
    },
    {
      id: 'ilerning',
      title: 'Ilerning',
      // translate: 'Data Barang',
      type: 'item',
      icon: 'heroicons-outline:shopping-cart',
      url: '/apps/ilerning/',
    },
    {
      id: 'barang-masuk',
      title: 'User Management',
      // translate: 'Barang Masuk',
      type: 'item',
      icon: 'move_to_inbox',
      url: '/apps/userMangement/',
    },
    // {
    //   id: 'barang-keluar',
    //   title: 'Barang Keluar',
    //   // translate: 'Barang Keluar',
    //   type: 'item',
    //   icon: 'exit_to_app',
    //   url: '/apps/barangKeluar/',
    // },
    // {
    //   id: 'user',
    //   title: 'User',
    //   // translate: 'User',
    //   type: 'item',
    //   icon: 'heroicons-outline:user-circle',
    //   url: '/apps/userRoles/',
    // },
  ];
} else {
  navigationConfig = [
    {
      id: 'master',
      title: 'Master Data',
      type: 'collapse',
      icon: 'check_box',
      children: [
        {
          id: 'kelas',
          title: 'Master Kelas',
          type: 'item',
          icon: 'heroicons-outline:collection',
          url: '/apps/masterkelas/',
        },
      ],
    },
    {
      id: 'ilerning',
      title: 'Ilerning',
      // translate: 'Data Barang',
      type: 'item',
      icon: 'heroicons-outline:shopping-cart',
      url: '/apps/ilerning/',
    },
    // {
    //   id: 'barang-masuk',
    //   title: 'Barang Masuk',
    //   // translate: 'Barang Masuk',
    //   type: 'item',
    //   icon: 'move_to_inbox',
    //   url: '/apps/barangMasuk/',
    // },
    // {
    //   id: 'barang-keluar',
    //   title: 'Barang Keluar',
    //   // translate: 'Barang Keluar',
    //   type: 'item',
    //   icon: 'exit_to_app',
    //   url: '/apps/barangKeluar/',
    // },
    // {
    //   id: 'user',
    //   title: 'User',
    //   // translate: 'User',
    //   type: 'item',
    //   icon: 'heroicons-outline:user-circle',
    //   url: '/apps/userRoles/',
    // },
  ];
}

export default navigationConfig;
