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
import Roles from 'src/app/main/API/page/Roles';

function UserHeader(props) {
  const { header, getUser, listDosen, role } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    name: null,
    email: '',
    password: null,
    password_confirmation: null,
    role: null,
  });
  // console.log(value, 'value');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue({
      name: null,
      email: '',
      password: null,
      password_confirmation: null,
      role: null,
    });
  };

  const body = {
    name: value?.name,
    email: value?.email,
    password: value?.password,
    password_confirmation: value.password_confirmation,
    role: value.role,
  };

  // format

  // console.log(body, 'bpdyyy');
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}register`, body, header)
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
        <DialogTitle id="alert-dialog-title">Tambah User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
              <div className="w-full md:w-auto">
                <Autocomplete
                  disablePortal
                  value={value?.name}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setValue({ ...value, name: newValue });
                    } else {
                      setValue({ ...value, name: null });
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
                  value={value?.name}
                  onChange={(e) => setValue({ ...value, name: e.target.value })}
                  id="outlined-basic"
                  label="Nama"
                  variant="outlined"
                  className="w-full mb-4"
                />
              </div>
              <div className="w-full md:w-auto">
                <TextField
                  value={value?.email}
                  onChange={(e) => setValue({ ...value, email: e.target.value })}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="w-full mb-4"
                />
              </div>
              <div className="w-full md:w-auto">
                <TextField
                  value={value?.password}
                  onChange={(e) => setValue({ ...value, password: e.target.value })}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  className="w-full mb-4"
                />
              </div>
              <div className="w-full md:w-auto">
                <TextField
                  value={value?.password_confirmation}
                  onChange={(e) => setValue({ ...value, password_confirmation: e.target.value })}
                  id="outlined-basic"
                  label="Password Confirmation"
                  variant="outlined"
                  className="w-full mb-4"
                />
              </div>
              <div className="w-full md:w-auto">
                <Autocomplete
                  disablePortal
                  value={value?.role}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setValue({ ...value, role: newValue });
                    } else {
                      setValue({ ...value, role: null });
                    }
                  }}
                  id="combo-box-demo"
                  options={Roles}
                  // options={top100Films}
                  sx={{ width: 220 }}
                  renderInput={(params) => <TextField {...params} label="Roles" />}
                />
              </div>
              <div className="w-full md:w-auto cursor-pointer">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    label="Pilih Waktu Awal"
                    ampm={false}
                    value={value?.password_confirmation}
                    onChange={(date) => {
                      // console.log(date, 'datess')
                      // console.log(moment(date).format('HH:mm'), 'date');
                      // console.log(customTimeFormat(date), 'date');
                      setValue({ ...value, password_confirmation: date });
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="w-full md:w-auto cursor-pointer">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    label="Pilih Waktu Akhir"
                    ampm={false}
                    value={value?.role}
                    onChange={(date) => {
                      setValue({ ...value, role: date });
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
        Master User
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
            placeholder="Cari User"
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

export default UserHeader;
