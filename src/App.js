import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css";
import Create from './pages/Create'
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Paper, Button, Grid, Box } from '@material-ui/core'
import MainStory from './pages/MainStory'
import StoryAndSequels from './pages/StoryAndSequels'
import Layout from './components/Layout'

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect, useState } from 'react'

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
const firestoreDb = firebase.firestore();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
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
        Hi! Welcome to Hearth Tale. Click the above button to sign in with Google
      </Typography>
    </Box>
  )
}
function App() {
  const [user] = useAuthState(auth);

  // const storiesRef = firestore.collection('stories');
  // const query = storiesRef.orderBy('id').limit(5);

  // const [stories] = useCollectionData(query, { idField: 'id' });

  const [stories, setStories] = useState([]);


  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (!firebase) return;
        const storiesRef = firestoreDb.collection("stories").orderBy('createdAt', 'desc').limit(20);

        const docs = await storiesRef.get();
        // const docs = await storiesRef.orderBy('id').limit(5);

        let allStories = [];
        let allSequels = [];

        docs.forEach((doc) => {
          const data = doc.data();
          let fullData = { id: doc.id, data: data };
          allStories.push(fullData);
        });
        setStories(allStories);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!user ?
        <SignIn /> :
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/create">
                <Create />
              </Route>
              <Route exact path="/">
                <MainStory stories={stories} />
              </Route>
              <Route path="/sequels/:storyId">
                <StoryAndSequels />
              </Route>
              <Route exact path="/sequels">
                <Container>
                  <Paper style={{ backgroundColor: 'Highlight', marginTop: '100px' }}>
                    <Typography variant="h6" component="h2" color='primary'>Select a story through the main page to read a sequel</Typography>
                  </Paper>
                </Container>
              </Route>
            </Switch>
          </Layout>
        </Router>
      }
    </ThemeProvider>
  );
}




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
