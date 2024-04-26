/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { Avatar, CircularProgress, Container, Divider, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/base';
import moment from 'moment';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
// import { makeStyles } from '@material-ui/core/styles';
// import { CircularProgress } from '@material-ui/core';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
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

export function Forum(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { dataForum, header, getUser } = props;
  // console.log(dataForum, 'dataForum');
  const [data, setData] = useState(dataForum);
  const [expanded, setExpanded] = useState([]);
  const [getIdSoal, setgetIdSoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({
    komentar: null,
    id_forum: null,
    tanggal_komentar: null,
  });
  const body = {
    komentar: value?.komentar,
    id_forum: getIdSoal?.id,
    tanggal_komentar: moment().format('YYYY-MM-DD HH:mm:ss'),
  };
  // console.log(body, 'bodyyy');
  const handleExpandClick = (index, item) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
    setgetIdSoal(item);
  };
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
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}komentar-forum`, body, header)
      .then((res) => {
        // setData(res?.data);
        getData();
        setValue({
          komentar: null,
          id_forum: null,
          tanggal_komentar: null,
        });
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
  console.log(data, 'dataaaa');
  return (
    <div>
      {data?.length !== 0 ? (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          {data?.map((item, index) => (
            <div key={item?.id} className="m-10">
              {item?.detail_kelas?.map((i) => (
                <Card sx={{ maxWidth: '100%' }}>
                  <div>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          {item?.detail_forum?.judul_forum?.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={i.nama_kelas}
                      subheader={`${i.hari_kelas}, ${i.created_at}`}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item?.detail_forum?.judul_forum}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={() => handleExpandClick(index, item)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                  </div>
                  <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                    <CardContent>
                      {item?.detail_forum?.komentar?.map((items, idx) => {
                        return (
                          <div style={{ height: '100%', overflowY: 'auto', width: '100%' }}>
                            <CardHeader
                              avatar={<Avatar aria-label="recipe">{items?.name?.charAt(0)}</Avatar>}
                              action={
                                <IconButton aria-label="settings">
                                  <DeleteIcon />
                                </IconButton>
                              }
                              title={items?.name}
                              subheader={items?.tanggal_komentar}
                            />
                            <CardContent>
                              <Typography variant="body2" color="text.secondary">
                                {items?.komentar}
                              </Typography>
                            </CardContent>
                            <Divider />
                          </div>
                        );
                      })}
                      <div>
                        <div className="w-full max-w-xl mx-auto">
                          <TextField
                            id="comment"
                            label="Tambahkan Komentar"
                            multiline
                            rows={4}
                            value={value?.komentar}
                            onChange={(e) => setValue({ ...value, komentar: e.target.value })}
                            fullWidth
                            variant="outlined"
                            className="mb-4"
                          />
                          <Button variant="contained" color="primary" onClick={HandelSubmit}>
                            Kirim
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Collapse>
                </Card>
              ))}
            </div>
          ))}
        </Container>
      ) : (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className={classes.emptyDataContainer}>
              <h2 className="text-2xl mb-4">Belum Ada Forum Diskusi</h2>
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
