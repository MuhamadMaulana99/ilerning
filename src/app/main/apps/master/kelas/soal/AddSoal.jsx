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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { TextField } from '@mui/material';
import formatTimeYYMMDDHHMMSS from 'src/app/main/API/page/formatTimeYYMMDDHHMMSS';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddSoal = (props) => {
  const dispatch = useDispatch();
  const { dataEdit, header, getUser } = props;
  // console.log(dataEdit, 'edit')
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({
    id_kelas: dataEdit?.row?.id,
    judul_soal: null,
    isi_soal: null,
    deadline_soal: null,
    filePdfWord: null,
    fileGambar: null,
  });

  const body = {
    id_kelas: dataEdit?.row?.id,
    judul_soal: value?.judul_soal,
    isi_soal: value?.isi_soal,
    deadline_soal: formatTimeYYMMDDHHMMSS(value?.deadline_soal),
    filePdfWord: value?.filePdfWord,
    fileGambar: value?.fileGambar,
  };
  // console.log(value, 'val');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    // console.log(event.target.files[0], 'event.target.files[0]')
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('filePdfWord', file);
    setValue({ ...value, filePdfWord: file });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('fileGambar', file);
    setValue({ ...value, fileGambar: file });
  };

  const HandelSubmit = () => {
    const formData = new FormData();
    formData.append('id_kelas', body?.id_kelas);
    formData.append('judul_soal', body?.judul_soal);
    formData.append('isi_soal', body?.isi_soal);
    formData.append('deadline_soal', body?.deadline_soal);
    formData.append('filePdfWord', body?.filePdfWord);
    formData.append('fileGambar', body?.fileGambar);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}tambah-soal`, body, header)
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
            <div className="max-w-lg mx-auto p-6">
              <div className="mb-6">
                <TextField
                  id="standard-basic"
                  label="Judul"
                  variant="standard"
                  value={value?.judul_soal}
                  onChange={(e) => setValue({ ...value, judul_soal: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <TextField
                  multiline
                  fullWidth
                  id="standard-basic"
                  label="Isi Soal"
                  variant="standard"
                  rows={4}
                  value={value?.isi_soal}
                  onChange={(e) => setValue({ ...value, isi_soal: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Pilih Waktu Awal"
                    ampm={false}
                    value={value?.deadline_soal}
                    onChange={(date) => {
                      // console.log(date, 'datess')
                      // console.log(moment(date).format('HH:mm'), 'date');
                      // console.log(customTimeFormat(date), 'date');
                      setValue({ ...value, deadline_soal: date });
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="mb-6">
                <div>
                  <input
                    type="file"
                    id="file-input-pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-input-pdf">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      startIcon={<CloudDownloadIcon />}
                    >
                      Upload File
                    </Button>
                  </label>
                  <p>Selected file: {value.filePdfWord?.name}</p>
                </div>
              </div>
              <div>
                <input
                  type="file"
                  id="file-input-gambar"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-input-gambar">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudDownloadIcon />}
                  >
                    Upload Gambar
                  </Button>
                </label>
                <p>Selected file: {value.fileGambar?.name}</p>
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
