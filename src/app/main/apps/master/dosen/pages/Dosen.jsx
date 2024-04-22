/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import getFromLocalStorage from 'app/configs/configLocalstorage';
import configToken from 'app/configs/configToken';
import DosenHeader from './DosenHeader';
import DosenTable from './DosenTable';

function Dosen() {
  const dispatch = useDispatch();
  const getUser = getFromLocalStorage('user_profils');
  const header = configToken();

  // console.log(header, 'header');
  const [data, setData] = useState([]);
  // console.log(data, 'data')
  const [loading, setLoading] = useState(true);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_}get-semua-dosen`, header)
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
          window.location.href = '/login';
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
    <FusePageCarded
      header={
        <DosenHeader
          getData={getData}
          data={data}
          loading={loading}
          header={header}
          getUser={getUser}
        />
      }
      content={
        <DosenTable
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

export default Dosen;
