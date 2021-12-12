import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import "./App.css";
import Create from './pages/create/CreateStory'
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Paper, Button, Grid, Box } from '@material-ui/core'
import MainStory from './pages/MainStory'
import StoryAndSequels from './pages/StoryAndSequels'
import BottomNavBar from './components/BottomNavBar'

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import CreateComic from './pages/create/CreateComic'
import HomePage from './pages/HomePage/HomePage'

const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: '#192124' }, // dark blue grey
    secondary: { main: '#343B3F' }// light blue grey
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightRegular: 500,
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

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

function SignIn() {
  const signInWithGoogle = () => {
    auth.signInAnonymously()
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Button
        id="btn-sign-in"
        variant="outlined"
        size="large"
        className="sign-in"

        onClick={signInWithGoogle}
      >
        Get Started...
      </Button>
      <Typography variant="h6" style={{ paddingTop: "10px" }} align="center">
        Hi! Welcome to Hearth Tale. Click the above button to start
      </Typography>
    </Box>
  )
}

/**
 * Sign in the user using Firebase anonymous authentication
 */
function SignInAnon() {
  auth.signInAnonymously().then(() => {
    // Signed in..
  })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  return (
    <div>
      <Typography variant="h6">
        Loading Application...
      </Typography>
    </div>
  )
}

function App() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ref = React.useRef(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setIsLoggedIn(true);
    } else {
      // call sign in func
      setIsLoggedIn(false);
    }
  });

  // Get Random username
  React.useEffect(() => {
    const abortControl = new AbortController();
    const fetchRandomUser = async () => {
      // Runs after the first render() lifecycle
      const url = "https://randomuser.me/api/";
      const response = await fetch(url);
      await response.json().then((data) => {
        setUsername(data.results[0].login.username);

        if (user) {
          // Update the user profile here
          user.updateProfile({
            displayName: username,
          })
        }
      });

    }

    fetchRandomUser();
    return () => abortControl.abort();
  }, [user]);

  // Note
  /** passing data between func components: https://stackoverflow.com/questions/58201897/how-to-pass-data-between-functional-components-in-react*/

  return (
    !isLoggedIn ? SignInAnon() :
      <ThemeProvider theme={theme}>
        <Box
          ref={ref}
          sx={{
            width: {
              mobile: 100,
              laptop: 100,
            },
          }}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/">
                <MainStory />
              </Route>
              <Route exact path="/test">
                <HomePage />
              </Route>
              <Route exact path="/create/story">
                <Create />
              </Route>
              <Route exact path="/create/comic">
                <CreateComic />
              </Route>
              <Route path="/sequels/:storyId">
                <StoryAndSequels />
              </Route>
              <Route exact path="/sequels">
                <Container>
                  <Paper style={{ background: 'linear-gradient(0deg, rgba(243,137,42,1) 0%, rgba(207,84,91,1) 100%)', marginTop: '100px' }}>
                    <Typography variant="h6" component="h2" color='primary'>Select a story through the main page to read a sequel</Typography>
                  </Paper>
                </Container>
              </Route>
            </Switch>
            <BottomNavBar />
          </Router>
        </Box>
      </ThemeProvider>
  );
}


/***To-do */
function SignOut() {
  return (
    auth.currentUser && (
      <Button
        size="large"
        variant="outlined"
        color="secondary"
        className="sign-out"
        style={{ alignContent: "right" }}
        onClick={() => auth.signOut()}
      >
        Sign Out
      </Button>
    )
  );
}

export default App;