import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import nameDay from 'src/app/main/API/page/nameDay';
import customTimeFormat from 'src/app/main/API/page/customTimeFormat';

function KelasHeader(props) {
  const { header, getUser, listDosen, role } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    id_dosen: null,
    nama_kelas: '',
    hari_kelas: null,
    jam_mulai_kelas: null,
    jam_akhir_kelas: null,
  });
  // console.log(value, 'value');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue({
      id_dosen: null,
      nama_kelas: '',
      hari_kelas: null,
      jam_mulai_kelas: null,
      jam_akhir_kelas: null,
    });
  };

  const body = {
    id_dosen: value?.id_dosen?.id === undefined ? null : value?.id_dosen?.id,
    nama_kelas: value?.nama_kelas,
    hari_kelas: value?.hari_kelas?.name === undefined ? null : value?.hari_kelas?.name,
    jam_mulai_kelas: customTimeFormat(value.jam_mulai_kelas),
    jam_akhir_kelas: customTimeFormat(value.jam_akhir_kelas),
  };

  // format

  // console.log(body, 'bpdyyy');
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}tambah-kelas`, body, header)
      .then((res) => {
        // setData(res?.data);
        props.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Tambahkan',
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
        // setData([]);
        handleClose();
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

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah Dosen</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
              <div className="w-full md:w-auto">
                <Autocomplete
                  value={value?.id_dosen}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setValue({ ...value, id_dosen: newValue });
                    } else {
                      setValue({ ...value, id_dosen: null });
                    }
                  }}
                  id="combo-box-demo"
                  options={listDosen?.response?.data}
                  // options={top100Films}
                  sx={{ width: 220 }}
                  renderInput={(params) => <TextField {...params} label="Nama Dosen" />}
                />
              </div>
              <div className="w-full md:w-auto">
                <TextField
                  value={value?.nama_kelas}
                  onChange={(e) => setValue({ ...value, nama_kelas: e.target.value })}
                  id="outlined-basic"
                  label="Nama Kelas"
                  variant="outlined"
                  className="w-full mb-4"
                />
              </div>
              <div className="w-full md:w-auto">
                <Autocomplete
                  value={value?.hari_kelas}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setValue({ ...value, hari_kelas: newValue });
                    } else {
                      setValue({ ...value, hari_kelas: null });
                    }
                  }}
                  id="combo-box-demo"
                  options={nameDay}
                  // options={top100Films}
                  sx={{ width: 220 }}
                  renderInput={(params) => <TextField {...params} label="Hari" />}
                />
              </div>
              <div className="w-full md:w-auto cursor-pointer">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    label="Pilih Waktu Awal"
                    ampm={false}
                    value={value?.jam_mulai_kelas}
                    onChange={(date) => {
                      // console.log(date, 'datess')
                      // console.log(moment(date).format('HH:mm'), 'date');
                      // console.log(customTimeFormat(date), 'date');
                      setValue({ ...value, jam_mulai_kelas: date });
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="w-full md:w-auto cursor-pointer">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    label="Pilih Waktu Akhir"
                    ampm={false}
                    value={value?.jam_akhir_kelas}
                    onChange={(date) => {
                      setValue({ ...value, jam_akhir_kelas: date });
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={HandelSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Master Kelas
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
          <Input
            placeholder="Cari Kelas"
            className="flex flex-1"
            disableUnderline
            fullWidth
            // value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            onClick={handleClickOpen}
            variant="contained"
            disabled={role !== 'ADMIN'}
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default KelasHeader;
