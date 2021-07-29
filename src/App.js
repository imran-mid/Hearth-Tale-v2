import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Paper } from '@material-ui/core'
import MainStory from './pages/MainStory'
import StoryAndSequels from './pages/StoryAndSequels'
import Layout from './components/Layout'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Create />
            </Route>
            <Route exact path="/story">
              <MainStory />
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
    </ThemeProvider>
  );
}

export default App;
