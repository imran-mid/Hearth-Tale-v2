import {
    Box,
    Button,
    Container,
    MobileStepper,
    Typography,
    makeStyles,
    useTheme,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import firebase from "firebase/app";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SwipeableViews from "react-swipeable-views";
import StoryCard from "../storyCard";
import useFetchData from "../useFetchData";

const useStyles = makeStyles((theme) => ({
    cardBox: {
        /**
         * This is to allow space to view the whole card when in landscape mode.
         * Else, the bottom is hidden behind the navigation bar
         */
        paddingBottom: "15vh",
    },
    cardViewContainer: {
        marginTop: "10%",
        borderRadius: "4%",
    },
    header: {
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: "hidden",
        display: "block",
        width: "100%",
    },
}));

export default function StoryPreview() {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const { data: stories, isLoading, error } = useFetchData("stories", null);

    const maxSteps = stories.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSwipe = (index) => {
        setActiveStep(index);
    };

    return (
        <div>
            {isLoading && (
                <Container>
                    <Typography variant="h6">Loading Stories...</Typography>
                </Container>
            )}
            {error && <div> Error- {error}</div>}
            <Box className={classes.cardBox}>
                <SwipeableViews
                    enableMouseEvents
                    index={activeStep}
                    onChangeIndex={handleSwipe}
                    className={classes.cardViewContainer}
                >
                    {stories.map((story, index) => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </SwipeableViews>
                <MobileStepper
                    style={{ background: "transparent" }}
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </div>
    );
}
