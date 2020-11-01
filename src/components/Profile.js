import { Box, TextField, Button } from '@material-ui/core'

function Profile (props) {
    
    return (
        <Box p={4}>
            <a href="/editprofile"><Button>Back</Button></a>
            <img src={props.userData.pic} alt="preview" width="100%"/>
            <form target="" method="post">
                <TextField label="username" value={props.userData.username}/>
                <TextField label="password" value={props.userData.password}/>
                <TextField label="email" value={props.userData.email}/>
                <TextField type="date" value={props.userData.bday}/>
                <Button type="submit">บันทึก</Button>
            </form>
        </Box>
    );
}
export default Profile;