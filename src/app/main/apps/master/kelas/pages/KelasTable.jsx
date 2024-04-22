/* eslint-disable no-nested-ternary */
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
  Autocomplete,
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import PostAddIcon from '@mui/icons-material/PostAdd';
import QueueIcon from '@mui/icons-material/Queue';
import reverseCustomTimeFormat from 'src/app/main/API/page/reverseCustomTimeFormat';
import Soal from '../soal/Soal';
import Hubungkan from '../hubungkanKelas/Hubungkan';

const columns = [
  { id: 'no', label: 'NO', minWidth: 170, align: 'left' },
  {
    id: 'namaDosen',
    label: 'Nama Dosen',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'namaKelas',
    label: 'Nama Kelas',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'hariKelas',
    label: 'Hari Kelas',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'jamMulaiKelas',
    label: 'Jam Mulai Kelas',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'jamAkhirKelas',
    label: 'Jam Akhir Kelas',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'soal',
    label: 'Soal',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'Tambah',
    label: 'Tambah Kelas',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'aksi',
    label: 'Aksi',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  no,
  id,
  detail_dosen,
  nama_dosen,
  nama_kelas,
  hari_kelas,
  jam_mulai_kelas,
  jam_akhir_kelas
) {
  return {
    no,
    id,
    detail_dosen,
    nama_dosen,
    nama_kelas,
    hari_kelas,
    jam_mulai_kelas,
    jam_akhir_kelas,
  };
}

export default function KelasTable(props) {
  const { header, getUser, listDosen } = props;
  const dispatch = useDispatch();
  const roles = getUser?.user?.role;
  const [data, setData] = React.useState([]);
  const [dataEdit, setDataEdit] = React.useState({
    id: null,
    nama_kelas: '',
    hari_kelas: null,
    jam_mulai_kelas: null,
    jam_akhir_kelas: null,
    row: null,
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
      item?.detail_dosen,
      item?.nama_dosen,
      item?.nama_kelas,
      item?.hari_kelas,
      item?.jam_mulai_kelas,
      item?.jam_akhir_kelas
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
    setTrigger(isOpen);
    setOpen(true);
    const getDayForBody = nameDay.filter((day) => day.name === row?.hari_kelas);
    const jamAwal = reverseCustomTimeFormat(row?.jam_mulai_kelas);
    const jamAkhir = reverseCustomTimeFormat(row?.jam_mulai_kelas);
    // console.log(jamAwal, 'tes');
    setDataEdit({
      id: row?.detail_dosen,
      nama_kelas: row?.nama_kelas,
      hari_kelas: getDayForBody[0],
      jam_mulai_kelas: jamAwal,
      jam_akhir_kelas: jamAkhir,
      row,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    id_dosen: dataEdit?.id?.id_dosen,
    nama_kelas: dataEdit?.nama_kelas,
    hari_kelas: dataEdit?.hari_kelas,
    jam_mulai_kelas: dataEdit?.jam_mulai_kelas,
    jam_akhir_kelas: dataEdit?.jam_akhir_kelas,
  };

  const HandelEdit = (id) => {
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
  // console.log(getUser?.role?.role, 'getUser')
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Dialog
        open={open}
        maxWidth={trigger === 'soal' || trigger === 'kelas' ? 'lg' : 'xl'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {trigger === 'soal'
            ? 'Tambah Soal'
            : trigger === 'kelas'
            ? 'Hubungkan Kelas'
            : 'Edit Kelas'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {trigger === 'soal' ? (
              <Soal dataEdit={dataEdit} header={header} getUser={getUser} />
            ) : trigger === 'kelas' ? (
              <Hubungkan dataEdit={dataEdit} header={header} getUser={getUser} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
                <div className="w-full md:w-auto">
                  <Autocomplete
                    value={dataEdit?.id}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setDataEdit({ ...dataEdit, id: newValue });
                      } else {
                        setDataEdit({ ...dataEdit, id: null });
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
                    value={dataEdit?.nama_kelas}
                    onChange={(e) => setDataEdit({ ...dataEdit, nama_kelas: e.target.value })}
                    id="outlined-basic"
                    label="Nama Kelas"
                    variant="outlined"
                    className="w-full mb-4"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <Autocomplete
                    disablePortal
                    value={dataEdit?.hari_kelas}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setDataEdit({ ...dataEdit, hari_kelas: newValue });
                      } else {
                        setDataEdit({ ...dataEdit, hari_kelas: null });
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
                      value={dataEdit?.jam_mulai_kelas}
                      onChange={(date) => {
                        console.log(date, 'datess');
                        // console.log(moment(date).format('HH:mm'), 'date');
                        // console.log(customTimeFormat(date), 'date');
                        setDataEdit({ ...dataEdit, jam_mulai_kelas: date });
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="w-full md:w-auto cursor-pointer">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="Pilih Waktu Akhir"
                      ampm={false}
                      value={dataEdit?.jam_akhir_kelas}
                      onChange={(date) => {
                        setDataEdit({ ...dataEdit, jam_akhir_kelas: date });
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            )}
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
                  <TableCell>{row?.detail_dosen?.name}</TableCell>
                  <TableCell>{row?.nama_kelas}</TableCell>
                  <TableCell>{row?.hari_kelas}</TableCell>
                  <TableCell>{row?.jam_mulai_kelas}</TableCell>
                  <TableCell>{row?.jam_akhir_kelas}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <div>
                        <IconButton
                          onClick={() => handleClickOpen(row.id, row, 'soal')}
                          color="info"
                          disabled={roles === 'ADMIN'}
                          className=""
                        >
                          <PostAddIcon />
                        </IconButton>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <div>
                        <IconButton
                          onClick={() => handleClickOpen(row.id, row, 'kelas')}
                          color="info"
                          disabled={roles === 'ADMIN'}
                          className=""
                        >
                          <QueueIcon />
                        </IconButton>
                      </div>
                    </div>
                  </TableCell>
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
