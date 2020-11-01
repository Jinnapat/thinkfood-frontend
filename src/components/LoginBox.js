import React, { useState } from 'react';
import { AppBar, Button, Slide, TextField, Box } from '@material-ui/core';

function LoginBox () {

  return (
    <Box p={2}>
      <form target="" method="post">
          <Box mb={2}>
            <TextField label="username" name="username"/>
          </Box>
          <Box mb={2}>
            <TextField label="password" name="password"/>
          </Box>
          <Box mb={2}>
            <Button type="submit">ล็อกอิน</Button>
            <a href="/register"><Button>สมัคร</Button></a>
          </Box>
      </form>
    </Box>
  )
}
export default LoginBox;