/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useThemeMediaQuery } from '@fuse/hooks';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import dataAllMahasiswa from 'src/app/main/API/login/getDataAllMahasiswa';
import { showMessage } from 'app/store/fuse/messageSlice';
import HubungkanTable from './HubungkanTable';
import { AddHubungkan } from './AddHubungkan';

function Hubungkan(props) {
  const { dataEdit, header, getUser } = props;
  const dispatch = useDispatch();
  // const getUser = getFromLocalStorage('user_profils');
  // const header = configToken();
  const listMhs = dataAllMahasiswa();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  // console.log(dataEdit, 'tess');
  // console.log(getUser, 'getUser');
  let api;
  if (getUser?.user?.role === 'DOSEN') {
    api = `get-soal-kelas-dosen`;
  } else {
    api = `get-semua-kelas`;
  }

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .post(
        `${process.env.REACT_APP_API_URL_API_}get-kelas-dosen-mahasiswa`,
        { id_kelas: dataEdit?.row?.id },
        header
      )
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data, 'rrr');
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          // window.location.href = '/sign';
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
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
        console.log(err);
      });
  };
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  return (
    <div>
      <div>
        <AddHubungkan
          getData={getData}
          dataEdit={dataEdit}
          header={header}
          getUser={getUser}
          listMhs={listMhs}
        />
      </div>
      <HubungkanTable
        listMhs={listMhs}
        getData={getData}
        listDosen={[]}
        data={data}
        dataEdit={dataEdit}
        loading={loading}
        header={header}
        getUser={getUser}
      />
    </div>
  );
}

export default Hubungkan;
