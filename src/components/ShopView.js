import { useState } from 'react';
import { AppBar, Box, Button, Typography, Grid } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FastfoodIcon from '@material-ui/icons/Fastfood';

function Call(props) {
    // รายการออร์เดอร์ที่สั่งจาก backend
    const [orderdata, setOrderdata] = useState(props.todo);
    // รายการอาหารที่เสร็จแล้วจาก backend
    const [cookeddata, setCookdata] = useState([]);
    // รายการอาหารที่ส่งเรียบร้อย
    const [sendedmenu, setSendedmenu] = useState([]);

    function cookedcall(e, val) {
        const newOrders = orderdata.slice();
        const newCooked = cookeddata.slice();
        newOrders.splice(newOrders.indexOf(val), 1);
        newCooked.push(val);
        setOrderdata(newOrders);
        setCookdata(newCooked);
    }

    function sended(val) {
        const newCooked = cookeddata.slice();
        newCooked.splice(newCooked.indexOf(val), 1);
        setCookdata(newCooked);
    }

    function orderedbox(val, key, color, word, handler) {
        const thisStyle = {background: color};
        return (
            <Box mb={1} key={key}>
                <Grid container>
                    <Grid item xs={7}>
                        {val.name}
                    </Grid>
                    <Grid item xs={2}>
                        {val.time}
                    </Grid>
                    <Grid item xs={3}>
                        <Button size='small' variant="contained" onClick={e=>handler(e,val)} style={thisStyle}>{word}</Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    let i = 0;
    const toCookEl = orderdata.map((val) => {
        i += 1;
        return orderedbox(val, i, '#F39C12', 'ทำแล้ว', cookedcall)
    });

    i = 0;
    const toServeEl = cookeddata.map((val) => {
        i += 1;
        return orderedbox(val, i, '#91BF40', 'รับแล้ว', sended)
    });

    return (
        <Box p={2} pt={8}>
            <AppBar>
                <Box p={1}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Box p={1}><b>ThinkFood</b></Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Button>Log out</Button>
                        </Grid>
                    </Grid>
                </Box>
            </AppBar>
            <Typography variant="h5" gutterBottom style={{height:30,font:'Ariel'}}>รายการที่สั่ง<RestaurantMenuIcon fontSize='large'/></Typography>
            <Box p={1} mt={2} mb={2} boxShadow={1} style={{height:200,overflow:'scroll'}}>
                {toCookEl}
            </Box>
            <Typography variant="h5" gutterBottom style={{height:30,font:'Ariel'}}>รายการที่เสร็จแล้ว<FastfoodIcon fontSize='large'/></Typography>
            <Box p={1} mt={2} boxShadow={1} style={{height:200,overflow:'scroll'}}>
                {toServeEl}
            </Box>
        </Box>
    );
}

export default Call;