/**
 * Modified example menu item gotten from: https://v4.mui.com/components/menus/#simple-menu
 */
import React from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AddOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

/**
 * Function to add comic or story to app
 * @returns a BottomNavigationAction containing a menu item to add content to the app
 * @description uses example from https://v4.mui.com/components/menus/#simple-menu
 */
export default function AddContentMenuButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState("add");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <BottomNavigationAction
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        onChange={handleChange}
        label={
          <Typography variant="caption" color="textSecondary" display="block">
            View Story
          </Typography>
        }
        value="add"
        icon={<AddOutlined fontSize="large" />}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper ref={anchorRef.current}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/create/story"
                  >
                    Add Story
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/create/comic"
                  >
                    Add Comic
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
