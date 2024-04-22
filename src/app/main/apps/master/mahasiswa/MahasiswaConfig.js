import Mahasiswa from './pages/Dosen';

const MahasiswaConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/masterMahasiswa/',
      element: <Mahasiswa />,
    },
  ],
};

export default MahasiswaConfig;
