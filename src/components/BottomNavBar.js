import { makeStyles, Paper, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import WbIncandescentRoundedIcon from '@material-ui/icons/WbIncandescentRounded';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import AddContentMenuButton from './add content/addContentMenuButton';


const useStyles = makeStyles((theme) => ({
    root: {
        bottom: 0,
        position: "fixed",
        width: "100%",
    },
    navBar: {
        backgroundColor: theme.palette.secondary.dark,
    }
}));

/**
 * Creates the bottom Navigation Menu bar 
 * @returns a paper component containing a BottomNavigation bar
 */
export default function BottomNavBar() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} className={classes.root}>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                className={classes.navBar}
            >
                <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">Home</Typography>} value="home" icon={<BookRoundedIcon />} component={Link} to="/" />
                <AddContentMenuButton />
                <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">Ideas</Typography>} value="ideas" icon={<WbIncandescentRoundedIcon />} />
            </BottomNavigation>
        </Paper>
    )
}