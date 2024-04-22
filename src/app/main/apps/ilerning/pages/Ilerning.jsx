/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useThemeMediaQuery } from '@fuse/hooks';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import configToken from 'app/configs/configToken';
import getFromLocalStorage from 'app/configs/configLocalstorage';
import FusePageSimple from '@fuse/core/FusePageSimple';
import IlerningHeader from './IlerningHeader';
import IlerningTable from './IlerningTable';

function Ilerning() {
  const dispatch = useDispatch();
  const getUser = getFromLocalStorage('user_profils');
  const header = configToken();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searched, setSearched] = useState('');
  // const api = `https://652d2c32f9afa8ef4b26e7f0.mockapi.io/tokoBangunan/v1/suplayer/1/tokoBangunan`;
  const api = `http://ner.grit.id:8006/dataBarangs`;
  // const api = `http://localhost:3000/dataBarangs`;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_}get-semua-soal-mahasiswa`, header)
      .then((res) => {
        // const result = res?.data.filter((word) => word.jumlahMasuk > 0);
        // console.log(result, 'result');
        setData(res?.data?.data);
        setLoading(false);
        // console.log(res.data, 'rrr');
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          // window.location.href = '/login';
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
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);
  // console.log(data, 'data');

  return (
    <FusePageSimple
      header={
        <IlerningHeader
          getData={getData}
          data={data}
          searched={searched}
          setSearched={setSearched}
          loading={loading}
          header={header}
          getUser={getUser}
        />
      }
      content={
        <IlerningTable
          getData={getData}
          data={data}
          loading={loading}
          header={header}
          getUser={getUser}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Ilerning;
