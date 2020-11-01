import { Box, TextField, Button } from '@material-ui/core'

export default function Register () {
    return (
        <Box p={4}>
            <a href="/"><Button>Back</Button></a>
            <form target="" method="post">
                <TextField label="username"/>
                <TextField label="password"/>
                <TextField label="email"/>
                <TextField type="date"/>
                <Button type="submit">สมัคร</Button>
            </form>
        </Box>
    )
}