import React from 'react'
import { Typography, Card, CardMedia, CardHeader, CardActions, CardContent, Chip, Avatar, makeStyles, useTheme, Switch } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import StoryAndSequels from '../pages/StoryAndSequels';
import { Link, Route, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '60vh',
        backgroundColor: theme.palette.secondary.dark,
        textOverflow: "ellipsis"
    },
    chip: {
        color: 'orange',
        margin: theme.spacing(0.5),
    },
    tagField: {
        color: 'indigo'
    },
    avatarBackground: {
        backgroundColor: "orange"
    },
    card: {
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export default function StoryCard({ story }) {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (e) => {
        console.log("Clicked me")
        let url = `/sequels/${story.id}`;
        //history.push(`/sequels/${story.id}`, [story]);
        history.push({
            pathname: url,
            // search: '2',
            state: { story: story }
        })
    }

    return (
        <Card className={classes.root} onClick={handleClick} >
            <CardHeader
                avatar={
                    <Avatar aria-label={story.title} className={classes.avatarBackground} >
                        {story.id}
                    </Avatar>
                }
                title={
                    <Typography
                        variant="h6"
                        component="h2"
                        color="initial">
                        {story.title}
                    </Typography>}
            // subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="160"
                image="https://source.unsplash.com/random"
                title="Random Photo"
            />
            <CardContent>
                <Typography color="textSecondary" gutterBottom >
                    Genre:
                    {<Chip label={story.genre} className={classes.chip} size="small" style={{ background: 'linear-gradient(0deg, rgba(243,137,42,1) 0%, rgba(207,84,91,1) 100%)' }} />}
                </Typography>
                <Typography color="textSecondary" gutterBottom >
                    Tags:
                    {<Chip label="Time Travel" className={classes.chip} size="small" />}
                    {<Chip label="Adventure" className={classes.chip} size="small" />}

                </Typography>
                <Typography
                    variant="body2"
                    color="textPrimary"
                    align="left"
                    paragraph
                    display='block'
                >
                    {story.content}
                </Typography>
            </CardContent>
        </Card>
    )
}