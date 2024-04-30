import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

function DashboardHeader(props) {
  const { header, getUser } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  };
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}tambah-dosen`, value, header)
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
                  label="Confirm Password"
                  variant="outlined"
                  className="w-full mb-4"
                />
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
        Dashboard
      </Typography>
    </div>
  );
}

export default DashboardHeader;
