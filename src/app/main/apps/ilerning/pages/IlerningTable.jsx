/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import FuseLoading from '@fuse/core/FuseLoading';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { ShowSoal } from '../tab/ShowSoal';
import { Forum } from '../tab/Forum';
import Nilai from '../tab/Nilai';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
const ScrollableTabPanel = styled('div')({
  height: '100%',
  overflowY: 'auto',
});
export default function IlerningTable(props) {
  const { header, getUser, data } = props;
  // console.log(header, 'header');
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [dataEdit, setDataEdit] = React.useState({
    kodeBarang: '',
    namaBarang: '',
    hargaBarang: '',
    deskripsi: '',
    jumlahMasuk: '',
    satuan: '',
  });
  const body = {
    kodeBarang: dataEdit?.kodeBarang,
    namaBarang: dataEdit?.namaBarang,
    hargaBarang: dataEdit?.hargaBarang,
    deskripsi: dataEdit?.deskripsi,
    jumlahMasuk: dataEdit?.jumlahMasuk,
    satuan: JSON.stringify(dataEdit?.satuan),
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const HandelEdit = (id) => {
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_API_URL_API_}/dataBarangs/${dataEdit?.id}`, body)
      .then((res) => {
        props?.getData();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Di Edit',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
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
  const HandelDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL_API_}/dataBarangs/${id}`)
      .then((res) => {
        props?.getData();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Di Hapus',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
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
  if (props?.loading) {
    return <FuseLoading />;
  }
  // if (data?.length === 0) {
  //   return (
  //     <div className="m-10 h-full w-full flex justify-center items-center">
  //       <div>
  //         <Alert severity="info">Data Kosong</Alert>
  //       </div>
  //     </div>
  //   );
  // }

  // console.log(dataEdit, 'dataEdit')

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Soal" {...a11yProps(0)} />
          <Tab label="Forum" {...a11yProps(1)} />
          <Tab label="Nilai" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div style={{ height: '1000px', overflowY: 'auto', width: '100%' }}>
            <ShowSoal header={header} getUser={getUser} data={data} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Forum data={data} header={header} getUser={getUser} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Nilai header={header} getUser={getUser} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div style={{ height: '1000px', overflowY: 'auto' }}>
            {Array.from({ length: 100 }, (_, i) => (
              <p key={i}>Item {i + 1}</p>
            ))}
          </div>
        </TabPanel>

        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </Paper>
  );
}
