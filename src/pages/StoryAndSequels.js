import { Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Chip, useTheme, CardActions, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import useFetch from '../components/useFetch';
import { useLocation } from "react-router-dom";
import SequelCard from '../components/SequelCard';
import CreateIcon from '@material-ui/icons/Create';
import AppBar from '../components/StoryAppBar';
import { makeStyles } from '@material-ui/core/styles';
import useFetchData from '../components/useFetchData';


const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        marginBottom: '5px',
        maxHeight: '65vh',
        overflow: 'scroll'
    },
    media: {
        height: 100,
    },
    chip: {
        color: 'orange',
        margin: theme.spacing(0.5),
    },
}));

export default function StoryAndSequels() {
    const location = useLocation();
    const { storyId } = useParams()
    const story = location.state.story
    const classes = useStyles();
    const history = useHistory();
    const { data: sequels, isLoading, error } = useFetchData("sequels", storyId)

    const handleWriteSequelClick = (e) => {
        console.log("doc id", storyId);
        history.push({
            pathname: '/',
            // search: '2',
            state: { createSequel: true, storyTitle: story.title, storyId: storyId }
        });
        // const { data: sequels, isLoading, error } = fetchData('http://localhost:8000/sequels', location.state.firebase, location.state.firestoreDb)
    }

    return (
        <div style={{ minWidth: '100%' }}>
            <AppBar />
            <Card className={classes.root} >
                <CardActionArea style={{ paddingBottom: 5 }}>
                    <CardMedia
                        className={classes.media}
                        alt={story.title}
                        image={story.photoUrl ? story.photoUrl : "https://source.unsplash.com/random/"}
                        title="Contemplative Reptile"
                    />
                    <CardContent style={{ paddingBottom: 5, paddingTop: 5 }}>
                        <Typography variant="h6" component="h2">
                            {story.title}
                        </Typography>
                        <Typography color="textSecondary"  >
                            Genre:
                            {<Chip label={story.genre} className={classes.chip} size="small" style={{ background: 'linear-gradient(0deg, rgba(243,137,42,1) 0%, rgba(207,84,91,1) 100%)' }} />}
                        </Typography>
                        <Typography color="textSecondary"  >
                            Tags:
                            {<Chip label="Time Travel" className={classes.chip} size="small" />}
                            {<Chip label="Adventure" className={classes.chip} size="small" />}

                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {story.content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ paddingTop: 0, paddingBottom: 2 }}>
                    <Button size="small" variant="outlined" color="default" startIcon={<CreateIcon />} onClick={handleWriteSequelClick}>
                        Write Sequel
                    </Button>
                </CardActions>
            </Card>
            <Container style={{ marginBottom: '65px', overflow: 'scroll', }}> {/** use height of 30vh */}
                {isLoading &&
                    <Container>
                        <Typography variant='h6'>
                            Loading...
                        </Typography>
                    </Container>}
                {error && <div> Error- {error}</div>}
                {sequels.map(sequel => (
                    // <Typography key={sequel.id}>haha</Typography>
                    <SequelCard key={sequel.id} sequel={sequel.data} />

                ))}
            </Container>
        </div>
    )
}