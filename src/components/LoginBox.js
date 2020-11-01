import { Button, TextField, Box } from '@material-ui/core';
import API from '../api/api'

function LoginBox () {

  var handleSubmit = (submit) =>{
    var username = submit.target.username.value;
    var password = submit.target.password.value;
    API.post('/common/login',{
      username : username,
      password : password,
    })
    .then((res) =>{
      if (!res.data.err){
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
    <Box p={2}>
      <form target="" onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField label="username" name="username" required />
          </Box>
          <Box mb={2}>
            <TextField label="password" name="password" type="password" required/>
          </Box>
          <Box mb={2}>
            <Button type="submit" style={{color: "white"}}>ล็อกอิน</Button>
            <a href="/register" ><Button style={{color: "white"}}>สมัคร</Button></a>
          </Box>
      </form>
    </Box>
  )
}
export default LoginBox;