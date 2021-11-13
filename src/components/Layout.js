import { makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { createRef } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import WbIncandescentRoundedIcon from '@material-ui/icons/WbIncandescentRounded';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import AddContentMenuButton from './add content/addContentMenuButton';


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

export default function Layout({ children }) { // for some reason I don't know what this parameter does for now. TODO- find out. Removing it breaks stuff. FML
    const classes = useStyles();

    const [value, setValue] = React.useState('view');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Toolbar className={classes.navBar}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    className={classes.navBar}
                    position="sticky"
                    color="secondary">
                    <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">View Story</Typography>} value="view" icon={<BookRoundedIcon />} component={Link}
                        to="/" />
                    <AddContentMenuButton />
                    <BottomNavigationAction label={<Typography variant="caption" color='textSecondary' display="block">Ideas</Typography>} value="ideas" icon={<WbIncandescentRoundedIcon />} />
                </BottomNavigation>
            </Toolbar>
            {/* <div > */}
            {children}
            {/* </div> */}
        </div>
    )
}