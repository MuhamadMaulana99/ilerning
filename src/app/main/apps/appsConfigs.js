import IlerningConfig from './ilerning/IlerningConfig';
import DosenConfig from './master/dosen/DosenConfig';
import KelasConfig from './master/kelas/KelasConfig';
import MahasiswaConfig from './master/mahasiswa/MahasiswaConfig';
import UserManagementConfig from './userManagement/UserManagementConfig';

const appsConfigs = [
  UserManagementConfig,
  DosenConfig,
  KelasConfig,
  IlerningConfig,
  MahasiswaConfig,
];

export default appsConfigs;
