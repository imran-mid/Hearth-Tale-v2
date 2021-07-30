import React, { useState } from 'react'
import { makeStyles, Button, Container, Typography, Radio, Paper, useTheme, Grid } from '@material-ui/core'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import { TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  paper: {
    marginTop: 2,
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
  const [tag, setTag] = useState('new')
  const [genreError, setGenreError] = useState(false)



  const handleSubmit = (e) => {
    e.preventDefault()

    setTitleError(false)
    setContentError(false)
    setGenreError(false)

    console.log(location.state)
    /**
     * If there is a story Id, then we are adding a sequel. 
     */
    if (location.state != null) {
      const storyId = location.state.storyId
      const author = "Maggie Smith"

      if (content == '') {
        setContentError(true)
      }
      if (content) {
        fetch('http://localhost:8000/sequels', {
          method: 'POST',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ storyId, content, author })
        }).then(() => history.push('/story'))
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
        fetch('http://localhost:8000/story', {
          method: 'POST',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ title, content, genre })
        }).then(() => history.push('/story'))
      }
    }
  }

  return (
    <div>
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setTitle(e.target.value)}
                className={classes.field}
                label="Tags"
                size="small"
                defaultValue={tag}
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
          onClick={() => console.log("Click Submit")}
          endIcon={<KeyboardArrowRightRoundedIcon />}
        >Submit</Button>
      </form>
    </div>
  )
}