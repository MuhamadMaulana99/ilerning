/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from 'react';
import axios from 'axios';
import getFromLocalStorage from 'app/configs/configLocalstorage';
import configToken from 'app/configs/configToken';
import { useEffect, useState } from 'react';

const getDataAllForum = () => {
  const header = configToken();
  const getUser = getFromLocalStorage('user_profils');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_API_}get-semua-forum`,
        header
      );
      setData(response.data?.data);
    } catch (error) {
      setData([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { response: data, loading };
};

export default getDataAllForum;
