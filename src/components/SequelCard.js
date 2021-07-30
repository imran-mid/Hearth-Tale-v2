import { Container, Typography, Grid, Paper, Avatar, makeStyles, useTheme, Accordion, AccordionSummary, AccordionDetails, Chip } from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deepOrange } from '@material-ui/core/colors';

const UseStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light
    },
    smallAvatar: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },

}));

export default function SequelCard({ sequel }) {

    const classes = UseStyles();

    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
            // id={sequel.id}
            >
                <Grid container>
                    <Grid item >
                        <Avatar alt="Remy Sharp" className={classes.avatar}>
                            {sequel.author.substring(0, 1)}
                        </Avatar>
                    </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={1} direction='column'>
                    {/* <Grid item xs zeroMinWidth> */}
                    <Typography noWrap variant='body1'>{sequel.content.substring(0, 30)}...</Typography>
                    <Typography gutterBottom variant="body2">
                        By:
                        <Chip label={sequel.author} size="small" className={classes.chip} />
                    </Typography>
                    {/* </Grid> */}

                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {sequel.content}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}