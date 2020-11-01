import { useState } from 'react';
import { AppBar, Button, List, ListItemText, Grid, ListItem, Paper, Box } from '@material-ui/core';

function Order_list({order_data}) {
    return (
        <Grid container spacing={2} justify='center'  >
            <Grid item >
                {order_data.menu}
            </Grid>
            <Grid item >
                ราคา: {order_data.price} บาท                        
            </Grid>
            <Grid item >
                ร้าน: {order_data.shop}
            </Grid>
            <Grid item >
                จำนวน: {order_data.quantity} รายการ
            </Grid>
        </Grid>
    );
}

function BoxList({component,payment}) {
    const [data_array,setDataArray] = useState(component);

    function order_array(array) { //this is array for contain Order_list components
        return array.map((object) => {
            return <Order_list order_data={object} />
        })
    }

    const [data_list,setData_list] = useState(order_array(data_array));
    

    return (
        <Box p={2} pt={8}>
            <AppBar>
                <Box p={2}>
                    <b>ThinkFood</b>
                </Box>
            </AppBar>
            <Grid container direction='column' alignItems='center' justify='space-between'>
                <List component="nav" aria-label="main mailbox folders" container direction='column' spacing={5}>
                    {data_list.map((data) => { 
                        return (
                            <Box mb={2}>
                                <Paper item elevation={3}> 
                                    <ListItem button>
                                        <ListItemText primary={data} />
                                    </ListItem>
                                </Paper>
                            </Box>
                        );
                    })}
                </List>
            </Grid>
            <center><a href="/"><Button style={{backgroundColor: "#76ff03", width: 100}} variant="contained">ได้รับ</Button></a></center>
        </Box>
    );
}

export default BoxList;
