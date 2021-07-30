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

    var storyId = story.id;
    story = story.data;
    const handleClick = (e) => {
        let url = `/sequels/${storyId}`;
        history.push({
            pathname: url,
            // search: '2',
            state: { story: story }
        })
    }
    let tags = Array.from(story.tags);
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
                subheader={story.author}
            />
            <CardMedia
                component="img"
                alt="Random Photo"
                height="160"
                image={story.photoUrl ? story.photoUrl : "https://source.unsplash.com/random/"}
                title="Random Photo"
            />
            <CardContent>
                <Typography color="textSecondary" gutterBottom >
                    Genre:
                    {<Chip label={story.genre} className={classes.chip} size="small" />}
                </Typography>
                <Typography color="textSecondary" gutterBottom >
                    Tags:
                    {tags.map(tag => (
                        <Chip key={tag.id} label={tag} className={classes.chip} size="small" />
                    ))}
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