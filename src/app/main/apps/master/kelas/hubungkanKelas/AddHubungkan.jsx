/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddHubungkan = (props) => {
  const dispatch = useDispatch();
  const { dataEdit, header, getUser, listMhs } = props;
  // console.log(dataEdit, 'dataEdit');

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({
    id_mahasiswa: null,
  });

  const body = {
    id_kelas: dataEdit?.row?.id,
    id_dosen: dataEdit?.row?.detail_dosen?.id_dosen,
    id_mahasiswa: value?.id_mahasiswa?.id,
  };
  // console.log(body, 'body');
  // console.log(value, 'value');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}tambah-mahasiswa-dalam-kelas`, body, header)
      .then((res) => {
        // setData(res?.data);
        props.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: `Mahasiswa ${value?.id_mahasiswa?.name} Berhasil Tambahkan`,
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
  // console.log(listMhs?.response?.data, 'listMhs?.response?.data');

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Tambah
      </Button>
      <Dialog
        open={open}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Tambah Soal</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="max-w-lg mx-auto p-6 ">
              <div className="w-full md:w-auto">
                <Autocomplete
                  // disablePortal
                  value={value?.id_mahasiswa}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setValue({ ...value, id_mahasiswa: newValue });
                    } else {
                      setValue({ ...value, id_mahasiswa: null });
                    }
                  }}
                  id="combo-box-demo"
                  options={listMhs?.response?.data === undefined ? [] : listMhs?.response?.data}
                  // options={top100Films}
                  sx={{ width: 220 }}
                  renderInput={(params) => <TextField {...params} label="Nama Dosen" />}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="contained" onClick={HandelSubmit}>
            Tambah
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
