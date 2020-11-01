import { AppBar, Box, TextField, Button, Card, Grid } from '@material-ui/core'

export default function Register () {
    return (
        <Box p={4} pt={10}>
            <AppBar>
                <Box p={1}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Box p={1}><b>ThinkFood</b></Box>
                        </Grid>
                        <Grid item xs={3}>
                            <a href="/"><Button style={{color: "white"}}>Back</Button></a>
                        </Grid>
                    </Grid>
                </Box>
            </AppBar>
            <Card>
                <Box p={2}>
                    <center>
                        <h1>Registation</h1>
                        <form target="" method="post">
                            <Box mb={2}>
                                <TextField label="username"/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="password"/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="re-password"/>
                            </Box>
                            <Box mb={4}>
                                <TextField label="email"/>
                            </Box>
                            <Box mb={4}>
                                Birthday : 
                                <TextField type="date"/>
                            </Box>
                            <Box>
                                <Button variant="contained" color="primary" type="submit">สมัคร</Button>
                            </Box>
                        </form>
                    </center>
                </Box>
            </Card>
        </Box>
    )
}