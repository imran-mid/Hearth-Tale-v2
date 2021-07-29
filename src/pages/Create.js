import React, { useState } from 'react'
import { makeStyles, Button, Container, Typography, Radio, Paper, useTheme } from '@material-ui/core'
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
  const [genre, setGenre] = useState('thriller')

  const handleSubmit = (e) => {
    e.preventDefault()

    setTitleError(false)
    setContentError(false)

    console.log(location.state)
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
      if (title && content) {
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