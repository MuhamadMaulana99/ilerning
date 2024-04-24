/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useThemeMediaQuery } from '@fuse/hooks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import configToken from 'app/configs/configToken';
import getFromLocalStorage from 'app/configs/configLocalstorage';
import FusePageSimple from '@fuse/core/FusePageSimple';
import getDataAllForum from 'src/app/main/API/login/getDataAllForum';
import getDataAllSoal from 'src/app/main/API/login/getDataAllSoal';
import IlerningHeader from './IlerningHeader';
import IlerningTable from './IlerningTable';

function Ilerning() {
  const dispatch = useDispatch();
  const getUser = getFromLocalStorage('user_profils');
  const header = configToken();
  const dataForum = getDataAllForum();
  const dataSoal = getDataAllSoal();

  const [searched, setSearched] = useState('');

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  // console.log(dataSoal?.response, 'dataSoal?.response');

  return (
    <FusePageSimple
      header={
        <IlerningHeader
          getData={getDataAllSoal}
          getDataAllForum={getDataAllForum}
          data={dataSoal?.response === null ? [] : dataSoal?.response}
          dataForum={dataForum?.response === null ? [] : dataForum?.response}
          searched={searched}
          setSearched={setSearched}
          loading={dataSoal?.loading}
          header={header}
          getUser={getUser}
        />
      }
      content={
        <IlerningTable
          getData={getDataAllSoal}
          getDataAllForum={getDataAllForum}
          data={dataSoal?.response === null ? [] : dataSoal?.response}
          dataForum={dataForum?.response === null ? [] : dataForum?.response}
          loading={dataSoal?.loading}
          header={header}
          getUser={getUser}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Ilerning;
