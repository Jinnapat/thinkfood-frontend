import { AppBar, Slide, Box, Container } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LoginBox from './LoginBox';

export default function Landing () {
    const trigger = useScrollTrigger({threshold: 10})

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
                <Box p={4}>
                    <h1>Hungry?</h1>
                    <p>this app can help you!</p>
                    <LoginBox />
                </Box>
            </AppBar>
        </Slide>
    );
}