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
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
// import { PDFViewer } from 'react-pdf-js';
import PDFViewer from 'pdf-viewer-reactjs';

export function Forum(props) {
  const { data } = props;
  // console.log(data, 'data');

  const [showComment, setShowComment] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ pages }) {
    setNumPages(pages);
  }
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {data?.map((item, index) => (
        <Paper key={item?.id} elevation={3} sx={{ p: 3, mb: 2 }}>
          {/* {console.log(, 'ii')} */}
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" fontWeight="bold">
                John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {moment().startOf('hour').fromNow(item?.created_at)} minute ago
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
            {item?.judul_soal}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
            {item?.isi_soal}
          </Typography>
          <iframe
            // src={`${process.env.REACT_APP_API_URL_API_IMAGE}${item?.file[1]?.lokasi_file}`}
            title="description"
          />
          <embed
            type="image/jpg"
            // src={`${process.env.REACT_APP_API_URL_API_IMAGE}${item?.file[1]?.lokasi_file}`}
            width="300"
            height="200"
          />
          <PDFViewer>
            <iframe src="daftarmakanan.pdf" style={{ width: '100%', height: '500px' }} />
          </PDFViewer>
          <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
            <Grid item>
              <Button color="secondary" onClick={() => setShowComment(!showComment)}>
                Comment
              </Button>
            </Grid>
            {showComment ? (
              <div>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Profile" src="https://randomuser.me/api/portraits/men/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="John Doe"
                    secondary={
                      <div>
                        <Typography variant="body2" color="text.primary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum
                          felis sit amet augue volutpat, eget mattis nunc volutpat.
                        </Typography>
                        <Typography variant="caption">1 minute ago</Typography>
                      </div>
                    }
                  />
                </ListItem>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt="Profile" src="https://randomuser.me/api/portraits/men/2.jpg" />
                  </Grid>
                  <Grid item xs>
                    <TextField size="small" fullWidth variant="outlined" label="Add a comment..." />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Post
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              ''
            )}
          </Grid>
        </Paper>
      ))}
    </Container>
  );
}
