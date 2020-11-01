import { AppBar, Slide, Box } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LoginBox from './LoginBox';

export default function Landing () {
    const trigger = useScrollTrigger({threshold: 10})

    return (
        <center>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar>
                    <Box p={2}>
                        <h1>Hungry?</h1>
                        <p>this app can help you!</p>
                        <LoginBox />
                    </Box>
                </AppBar>
            </Slide>
        </center>
    );
}