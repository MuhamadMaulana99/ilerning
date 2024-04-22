/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import nameDay from 'src/app/main/API/page/nameDay';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import reverseCustomTimeFormat from 'src/app/main/API/page/reverseCustomTimeFormat';
import formatTimeYYMMDDHHMMSS from 'src/app/main/API/page/formatTimeYYMMDDHHMMSS';
import parseTimeYYMMDDHHMMSS from 'src/app/main/API/page/parseTimeYYMMDDHHMMSS';

const columns = [
  { id: 'no', label: 'NO', minWidth: 50, align: 'left' },
  {
    id: 'judulSoal',
    label: 'Judul Soal',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'isiSoal',
    label: 'Isi  Soal',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'hariKelas',
    label: 'Deadline',
    minWidth: 170,
    align: 'left',
  },
  // {
  //   id: 'filePdfWord',
  //   label: 'File/Word',
  //   minWidth: 170,
  //   align: 'left',
  // },
  // {
  //   id: 'fileGambar',
  //   label: 'File Gambar',
  //   minWidth: 170,
  //   align: 'left',
  // },
  {
    id: 'aksi',
    label: 'Aksi',
    minWidth: 100,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(no, id, id_dosen, id_kelas, judul_soal, isi_soal, deadline_soal, file) {
  return {
    no,
    id,
    id_dosen,
    id_kelas,
    judul_soal,
    isi_soal,
    deadline_soal,
    file,
  };
}

export default function SoalTable(props) {
  const { header, getUser, listDosen } = props;
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [dataEdit, setDataEdit] = React.useState({
    id_kelas: null,
    judul_soal: '',
    isi_soal: '',
    deadline_soal: null,
    filePdfWord: null,
    fileGambar: null,
  });
  const [open, setOpen] = React.useState(false);
  const [trigger, setTrigger] = React.useState('');
  const [, setOpenForm] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = props?.data?.map((item, index) =>
    createData(
      index + 1,
      item?.id,
      item?.id_dosen,
      item?.id_kelas,
      item?.judul_soal,
      item?.isi_soal,
      item?.deadline_soal,
      item?.file
    )
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // handle open
  const handleClickOpen = (id, row, isOpen) => {
    console.log(row, 'row');
    setTrigger(isOpen);
    setOpen(true);
    const getDayForBody = nameDay.filter((day) => day.name === row?.isi_soal);
    const jamAwal = reverseCustomTimeFormat(row?.deadline_soal);
    const jamAkhir = reverseCustomTimeFormat(row?.deadline_soal);
    // console.log(jamAwal, 'tes');
    setDataEdit({
      id_kelas: row?.id_kelas,
      judul_soal: row?.judul_soal,
      isi_soal: row?.isi_soal,
      deadline_soal: parseTimeYYMMDDHHMMSS(row?.deadline_soal),
      filePdfWord: row?.file[0]?.lokasi_file,
      fileGambar: row?.file[1]?.lokasi_file,
    });
  };
  console.log(dataEdit, 'data edit');
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    id_kelas: dataEdit?.row?.id,
    judul_soal: dataEdit?.judul_soal,
    isi_soal: dataEdit?.isi_soal,
    deadline_soal: formatTimeYYMMDDHHMMSS(dataEdit?.deadline_soal),
    filePdfWord: dataEdit?.filePdfWord,
    fileGambar: dataEdit?.fileGambar,
  };
  const handleFileChange = (event) => {
    // console.log(event.target.files[0], 'event.target.files[0]')
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('filePdfWord', file);
    setDataEdit({ ...dataEdit, filePdfWord: file });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('fileGambar', file);
    setDataEdit({ ...dataEdit, fileGambar: file });
  };

  // console.log(body, 'body');

  const HandelEdit = (id) => {
    const formData = new FormData();
    formData.append('id_kelas', body?.id_kelas);
    formData.append('judul_soal', body?.judul_soal);
    formData.append('isi_soal', body?.isi_soal);
    formData.append('deadline_soal', body?.deadline_soal);
    formData.append('filePdfWord', body?.filePdfWord);
    formData.append('fileGambar', body?.fileGambar);
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_API_URL_API_}edit-kelas/${dataEdit?.id}`, body, header)
      .then((res) => {
        props?.getData();
        handleClose();
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
  const HandelDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL_API_}hapus-kelas/${id}`, header)
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
  if (props?.loading) {
    return <FuseLoading />;
  }
  if (rows?.length === 0) {
    return (
      <div className="m-10 h-full w-full flex justify-center items-center">
        <div>
          <Alert severity="info">Data Kosong</Alert>
        </div>
      </div>
    );
  }
  const defaultValue = new Date('2024-04-05T02:10:00');
  // console.log(defaultValue, 'defaultValue');
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {trigger === 'soal' ? 'Tambah Soal' : 'Edit Kelas'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="max-w-lg mx-auto p-6">
              <div className="mb-6">
                <TextField
                  id="standard-basic"
                  label="Judul"
                  variant="standard"
                  value={dataEdit?.judul_soal}
                  onChange={(e) => setDataEdit({ ...dataEdit, judul_soal: e.target.value })}
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
                  value={dataEdit?.isi_soal}
                  onChange={(e) => setDataEdit({ ...dataEdit, isi_soal: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Pilih Waktu Awal"
                    ampm={false}
                    // value={new Date()}
                    // value={dataEdit?.deadline_soal}
                    onChange={(date) => {
                      // console.log(date, 'datess')
                      // console.log(moment(date).format('HH:mm'), 'date');
                      // console.log(customTimeFormat(date), 'date');
                      setDataEdit({ ...dataEdit, deadline_soal: date });
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
                  <p>Selected file: {dataEdit?.filePdfWord}</p>
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
                <p>Selected file: {dataEdit.fileGambar}</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={HandelEdit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              // console.log(row, 'oo');
              return (
                <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.judul_soal}</TableCell>
                  <TableCell>{row?.isi_soal}</TableCell>
                  <TableCell>{row?.deadline_soal}</TableCell>
                  {/* <TableCell>{row?.file[0]?.lokasi_file}</TableCell>
                  <TableCell>{row?.file[1]?.lokasi_file}</TableCell> */}
                  <TableCell>
                    <div className="flex justify-center">
                      <div>
                        <IconButton
                          onClick={() => handleClickOpen(row.id, row, 'edit')}
                          color="info"
                          className=""
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          onClick={(e) => HandelDelete(row.id)}
                          color="error"
                          className=""
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
