import React, { useEffect, useState } from 'react'
import { Container, Typography, MobileStepper, Button, makeStyles, useTheme, AppBar, Box } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import StoryCard from '../components/storyCard'
import logo from '../images/logo_new.png'
import { borders } from '@material-ui/system';
import useFetch from '../components/useFetch';
import useFetchData from '../components/useFetchData';

import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";


const useStyles = makeStyles((theme) => ({
    cardBox: {
        /**
         * This is to allow space to view the whole card when in landscape mode.
         * Else, the bottom is hidden behind the navigation bar
         */
        paddingBottom: '15vh',
    },
    cardViewContainer: {
        marginTop: '10%',
        borderRadius: '4%'
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


export default function MainStory() {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);


    const { data: stories, isLoading, error } = useFetchData("stories", null)

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

    React.useEffect(() => {
        const getUsername = async () => {
            setUsername(user.displayName ? user.displayName : "anon-user");
        }
        getUsername();
        setLoading(false);
    }, []);

    const GetUsername = () => {
        return (
            <div>
                {loading ?
                    <Typography variant="h6">Loading...</Typography> :
                    <Typography variant="subtitle2">{username}</Typography>}
            </div>
        )
    }

    return (
        <Container style={{ background: 'linear-gradient(0deg, rgba(243,137,42,1) 0%, rgba(207,84,91,1) 100%)', minHeight: '100vh' }}>
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
                <GetUsername />
            </AppBar>
            {isLoading &&
                <Container>
                    <Typography variant='h6'>
                        Loading Stories...
                    </Typography>
                </Container>}
            {error && <div> Error- {error}</div>}
            <Box className={classes.cardBox}>
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
