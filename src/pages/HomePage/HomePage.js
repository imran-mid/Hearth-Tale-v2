import {
    AppBar,
    Box,
    Container,
    makeStyles,
    Tab,
    Typography,
    useTheme,
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import firebase from "firebase/app";
import { default as React, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import StoryPreview from "../../components/main page/StoryPreview";
import useFetchData from "../../components/useFetchData";
import logo from "../../images/logo_new.png";

const useStyles = makeStyles((theme) => ({
    // Over riding the default tab panel padding
    tabPanel: {
        padding: 0,
    },
}));

export default function HomePage() {
    const [value, setValue] = React.useState("1");
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);

    const { data: stories, isLoading, error } = useFetchData("stories", null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        const getUsername = async () => {
            setUsername(user.displayName ? user.displayName : "anon-user");
        };
        getUsername();
        setLoading(false);
    }, []);

    const GetUsername = () => {
        return (
            <div>
                {loading ? (
                    <Typography variant="h6">Loading...</Typography>
                ) : (
                    <Typography variant="subtitle2">{username}</Typography>
                )}
            </div>
        );
    };

    return (
        <Container
            style={{
                background:
                    "linear-gradient(0deg, rgba(243,137,42,1) 0%, rgba(207,84,91,1) 100%)",
                minHeight: "100vh",
            }}
        >
            <AppBar
                position="sticky"
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    minHeight: "10vh",
                    alignItems: "center",
                    background: "transparent",
                    boxShadow: "none",
                }}
            >
                <img src={logo} style={{ width: "200px", borderRadius: "0%" }} />
                <GetUsername />
            </AppBar>
            <Box sx={{ width: "100%", typography: "body" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            centered
                        >
                            <Tab label="Stories" value="1" />
                            <Tab label="Comics" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className={classes.tabPanel}>
                        <StoryPreview />
                    </TabPanel>
                    <TabPanel value="2">Comics</TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
}