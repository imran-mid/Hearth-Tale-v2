import React, { useState } from 'react'
import { makeStyles, Button, Container, Typography, Radio, Paper, useTheme, Grid, Box } from '@material-ui/core'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import { TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";

/**
 * Store Firebase config information
 */
var firebaseConfig = {
  apiKey: "AIzaSyCXvWalIbI9L4WdG0xmwn-vNFEvJft6IcA",
  authDomain: "hearth-tale-demo-v2.firebaseapp.com",
  projectId: "hearth-tale-demo-v2",
  storageBucket: "hearth-tale-demo-v2.appspot.com",
  messagingSenderId: "577746141304",
  appId: "1:577746141304:web:3faea5999abda59b1d2d8d",
  measurementId: "G-LVK5NDJ012"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const firestoreDb = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  paper: {
    paddingTop: 2,
    backgroundColor: theme.palette.primary.dark,
    height: '5vh',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '2px',
    paddingBottom: '2px'

  }
}));

export default function Create() {
  const classes = useStyles()
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [genre, setGenre] = useState('')
  const [tag, setTag] = useState("new, just-in")
  const [genreError, setGenreError] = useState(false)
  const [user] = useAuthState(auth);
  const [submit, setSubmit] = useState(false);

  const author = user ? (user.displayName ? user.displayName : "Anonymous") : "Anon";

  const handleSubmit = async (e) => {
    let waitAfterSumbit = 800;
    e.preventDefault()

    setTitleError(false)
    setContentError(false)
    setGenreError(false)
    setSubmit(true);

    /**
     * If there is a story Id, then we are adding a sequel. 
     */
    if (location.state != null) {
      const storyId = location.state.storyId
      const dataRef = firestoreDb.collection("sequels");

      if (content == '') {
        setContentError(true)
      }
      if (content) {
        // fetch('http://localhost:8000/sequels', {
        //   method: 'POST',
        //   headers: { "Content-type": "application/json" },
        //   body: JSON.stringify({ storyId, content, author })
        // }).then(() => history.push('/story'))
        await dataRef.add({
          content: content,
          author: author,
          storyId: storyId ? storyId : Math.floor(Math.random() * 5000),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setTimeout(() => history.goBack(), waitAfterSumbit);
        });
      }
    } else {

      if (title == '') {
        setTitleError(true)
      }
      if (content == '') {
        setContentError(true)
      }
      if (genre == '') {
        setGenreError(true);
      }
      if (title && content && genre) {
        const dataRef = firestoreDb.collection("stories");
        // fetch('http://localhost:8000/story', {
        //   method: 'POST',
        //   headers: { "Content-type": "application/json" },
        //   body: JSON.stringify({ title, content, genre })
        // }).then(() => history.push('/story'))
        let url = "https://source.unsplash.com/random/?" + title + "," + genre + "," + tag.toString();
        await dataRef.add({
          title: title,
          author: author,
          genre: genre,
          tags: tag ? tag.split(",") : ["new", "hot-read"],
          content: content,
          photoUrl: url,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setSubmit(true);
          setTimeout(() => history.push('/'), waitAfterSumbit);
        });
      }
    }
  }

  /** Handle Close event of snackbar close button*/
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  return (
    <Box>
      <Snackbar open={submit} autoHideDuration={800} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Submitted!
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          color="textSecondary">
          {location.state == null ? "Create new story" : "Write Sequel for "}{location.state && location.state.storyTitle}
        </Typography>
      </Paper>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {!location.state &&
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label="Title"
            variant="outlined"
            fullWidth
            required
            error={titleError}
          />
        }
        {!location.state &&
          <Grid container spacing={1} direction="row" justifyContent="space-around" alignItems="center">
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setGenre(e.target.value)}
                className={classes.field}
                label="Genre"
                size="small"
                required
                error={genreError}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setTag(e.target.value)}
                className={classes.field}
                label="Tags"
                size="small"
                // defaultValue=
                placeholder={tag}
                margin="dense"
                variant="outlined"
              />
            </Grid>
          </Grid>
        }
        <TextField
          onChange={(e) => setContent(e.target.value)}
          className={classes.field}
          label="Content"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={5}
          error={contentError}
        />

        <Button
          className={classes.btn}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<KeyboardArrowRightRoundedIcon />}
        >Submit</Button>
      </form>
    </Box>
  )
}