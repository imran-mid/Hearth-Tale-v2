import React, { useEffect, useState } from 'react'
import { Container, Typography, MobileStepper, Button, makeStyles, useTheme, AppBar, Box } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import StoryCard from '../components/storyCard'
// import logo from '../images/logo.png'
import logo from '../images/logo_new.png'
import { borders } from '@material-ui/system';
import useFetch from '../components/useFetch';


const useStyles = makeStyles((theme) => ({
    root: {
        //height: "100%",
        flexGrow: 1,
    },
    cardViewContainer: {
        marginTop: '10%',
        borderRadius: '7%'
    },
    header: {
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));


export default function MainStory(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const { data: storiesOld, isLoading, error } = useFetch('http://localhost:8000/story')

    const stories = props.stories
    const maxSteps = stories.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSwipe = (index) => {
        setActiveStep(index);
    }

    return (
        <Container style={{ background: 'linear-gradient(0deg, rgba(243,137,42,1) 0%, rgba(207,84,91,1) 100%)', height: '100vh' }}>
            <AppBar
                position="sticky"
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    minHeight: "10vh",
                    alignItems: "center",
                    background: "transparent",
                    boxShadow: "none"
                }}
            >
                <img src={logo} style={{ width: "200px", borderRadius: "0%" }} />
            </AppBar>
            {isLoading &&
                <Container>
                    <Typography variant='h6'>
                        Loading Stories...
                    </Typography>
                </Container>}
            {error && <div> Error- {error}</div>}
            <Box borderRadius={30}>
                <SwipeableViews enableMouseEvents index={activeStep} onChangeIndex={handleSwipe} className={classes.cardViewContainer}>
                    {stories.map((story, index) =>
                    (
                        <StoryCard key={story.id} story={story} />
                    )
                    )}

                </SwipeableViews>
                <MobileStepper
                    style={{ background: 'transparent' }}
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Container>
    )
}
