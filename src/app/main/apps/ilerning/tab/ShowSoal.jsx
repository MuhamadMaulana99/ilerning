/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import {
  Avatar,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import moment from 'moment';
import { useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
// import { PDFViewer } from 'react-pdf-js';

const useStyles = makeStyles((theme) => ({
  emptyDataContainer: {
    maxWidth: 'md',
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
  },
  icon: {
    margin: '0 auto',
    fontSize: '3rem',
    color: '#718096',
    animation: '$fadeInOut 2s linear infinite',
  },
  '@keyframes fadeInOut': {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}));
export function ShowSoal(props) {
  const { header, getUser, data } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  // console.log(data, 'data');
  // console.log(header, 'hhh')

  const [showComment, setShowComment] = useState(false);
  const [getIdSoal, setgetIdSoal] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [value, setValue] = useState({
    jawaban: null,
    file_jawaban: null,
    tanggal_submit: null,
  });

  function onDocumentLoadSuccess({ pages }) {
    setNumPages(pages);
  }

  const body = {
    jawaban: value?.jawaban,
    file_jawaban: value?.file_jawaban,
    tanggal_submit: moment().format('YYYY-MM-DD HH:mm:ss'),
  };
  // console.log(body, 'body')
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file_jawaban', file);
    setValue({ ...value, file_jawaban: file });
  };
  const handleDownload = (i, trigger) => {
    console.log(i)
    if (trigger === 'soal') {
      window.open(`${process.env.REACT_APP_API_URL_API_IMAGE}${i.lokasi_file}`, '_blank');
    } else {
      window.open(`${process.env.REACT_APP_API_URL_API_IMAGE}${i.file_jawaban}`, '_blank');
    }
  };

  const handleClickOpenComment = (index, item) => {
    // console.log(item, 'item')
    setShowComment(showComment === index ? null : index);
    setgetIdSoal(item);
  };

  const HandelSubmit = () => {
    const formData = new FormData();
    formData.append('jawaban', body?.jawaban);
    formData.append('file_jawaban', body?.file_jawaban);
    formData.append('tanggal_submit', body?.tanggal_submit);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}jawab-soal-id/${getIdSoal?.id}`, body, header)
      .then((res) => {
        // setData(res?.data);
        props.getData();
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
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          // window.location.href = '/login';
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
  // console.log(data, 'data');
  return (
    <div>
      {data?.length !== 0 ? (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          {data?.map((item, index) => (
            <Paper key={item?.id} elevation={3} sx={{ p: 3, mb: 2 }}>
              {item?.detail_dosen?.map((items) => (
                <Grid container key={items.email} spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar src="kkk" alt={items?.name} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontWeight="bold">
                      <div>{items?.name}</div>
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      <Typography className="flex">
                        <div>Deadline </div> <div className="font-bold">{item?.deadline_soal}</div>
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
                {item?.judul_soal}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                {item?.isi_soal}
              </Typography>
              {item?.detail_soal?.dataSoal?.map((items, idx) => (
                <div className="flex flex-col items-center" key={idx}>
                  <iframe
                    src={`${process.env.REACT_APP_API_URL_API_IMAGE}${items?.lokasi_file}`}
                    title="PDF Viewer"
                    className="w-full h-60 border-none"
                  />
                  <Button
                    onClick={() => handleDownload(items, 'soal')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Download
                  </Button>
                </div>
              ))}

              <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
                <Grid item className="mb-10">
                  <Button
                    color="secondary"
                    variant="contained"
                    // onClick={() => setShowComment(showComment === index ? null : index)}
                    onClick={() => handleClickOpenComment(index, item)}
                  >
                    Jawaban
                  </Button>
                </Grid>
                {showComment === index && (
                  <div className="w-full">
                    {item?.detail_soal?.dataJawaban?.map((i) => (
                      <ListItem sx={{ width: '100%' }} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={i.name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={i.name}
                          secondary={
                            <div className="w-full">
                              <Typography variant="body2" color="text.primary">
                                {i.jawaban}
                              </Typography>
                              <Typography variant="caption">1 minute ago</Typography>
                            </div>
                          }
                          sx={{ width: '100%' }}
                        />
                        <div className="flex flex-col items-center">
                          <iframe
                            src={`${process.env.REACT_APP_API_URL_API_IMAGE}${i?.file_jawaban}`}
                            title="PDF Viewer"
                            className="w-full h-60 border-none"
                          />
                          <Button
                            onClick={() => handleDownload(i, 'jawaban')}
                            variant="contained"
                            color="primary"
                            className="mt-4"
                          >
                            Download
                          </Button>
                        </div>
                      </ListItem>
                    ))}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar alt="Profile" src="https://randomuser.me/api/portraits/men/2.jpg" />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          size="small"
                          fullWidth
                          variant="outlined"
                          label="Catatan"
                          value={value?.jawaban}
                          onChange={(e) => setValue({ ...value, jawaban: e.target.value })}
                        />
                      </Grid>
                      <Grid item>
                        <Button onClick={HandelSubmit} variant="contained" color="primary">
                          Post
                        </Button>
                      </Grid>
                    </Grid>
                    <div className="m-5 ml-52">
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
                          Upload File
                        </Button>
                      </label>
                      <p>Selected file: {value.fileGambar?.name}</p>
                    </div>
                  </div>
                )}
              </Grid>
            </Paper>
          ))}
        </Container>
      ) : (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className={classes.emptyDataContainer}>
              <h2 className="text-2xl mb-4">Belum Ada Soal</h2>
              <p className="text-gray-500 mb-8">Silahkan Hubungi Dosen.</p>
              <div className={classes.icon}>
                <CircularProgress />
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
