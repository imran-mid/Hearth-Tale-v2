import { makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import WhatshotRoundedIcon from '@material-ui/icons/WhatshotRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import WbIncandescentRoundedIcon from '@material-ui/icons/WbIncandescentRounded';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    topLevelContainer: {
        // height: '100vh'
    },
    navBar: {
        top: 'auto',
        bottom: 0,
        position: "fixed",
        width: "100%",
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export default function Layout({ children }) {
    const classes = useStyles();

    const [value, setValue] = React.useState('view');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.topLevelContainer}>
            <Toolbar className={classes.navBar}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    className={classes.navBar}
                    position="sticky"
                    color="secondary">
                    <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">View Story</Typography>} value="view" icon={<BookRoundedIcon />} component={Link}
                        to="/" />
                    <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">Read</Typography>} value="read" icon={<WhatshotRoundedIcon />} component={Link}
                        to="/sequels" />
                    <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">Write Story </Typography>} value="write" icon={<CreateRoundedIcon />} component={Link}
                        to="/create" />
                    <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">Ideas</Typography>} value="ideas" icon={<WbIncandescentRoundedIcon />} />
                </BottomNavigation>
            </Toolbar>
            {/* <div > */}
            {children}
            {/* </div> */}
        </div>
    )
}