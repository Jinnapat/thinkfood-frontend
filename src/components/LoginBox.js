import { Button, TextField, Box } from '@material-ui/core';

function LoginBox () {
  
  return (
    <Box>
      <form target="" method="post">
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