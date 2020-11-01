import { AppBar, Box, TextField, Button, Card, Grid } from '@material-ui/core'
import API from '../api/api'

export default function Register () {
    
    var handleSubmit = (submit) => {
        submit.preventDefault()
        var username = submit.target.username.value;
        var password = submit.target.password.value;
        var re_password = submit.target.re_password.value;
        var email = submit.target.email.value;
        var date = submit.target.date.value;
        API.post('/common/register',{
            username : username,
            password : password,
            email : email,
            date : date,
          })
          .then((res) =>{
              console.log(res);
            if (res.data.token){
              console.log(res);
              sessionStorage.setItem('jwt', res.data.token);
            }
            else{
              console.log(res.data.err)
            }
          })
          .catch((err) => {
            console.log(err);
          })
    }

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
                        <form target="" onSubmit={handleSubmit}>
                            <Box mb={2}>
                                <TextField label="username" name="username"/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="password" name="password"/>
                            </Box>
                            <Box mb={2}>
                                <TextField label="re-password" name="re_password"/>
                            </Box>
                            <Box mb={4}>
                                <TextField label="email" name="email"/>
                            </Box>
                            <Box mb={4}>
                                Birthday : 
                                <TextField type="date" name="date"/>
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