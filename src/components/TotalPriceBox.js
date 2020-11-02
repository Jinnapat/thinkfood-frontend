import { useState } from 'react';
import { AppBar, Box, Chip, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderBox from './OrderBox';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0
    },
    orderBar: {
        top: 'auto',
        bottom: 50
    }
}));

function Calculate(orders) {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        total += order.price * order.quantity;
    }
    return total + " บาท";
}

function TotalPriceBox (props) {
    const classes = useStyles();
    const [show, setShow] = useState(true)

    function toggleShow () {
        setShow(!show)
    }

    return (
        <div>
            <OrderBox cname={classes} orders={props.orders} setOrders={props.setOrders} show={show}/>
            <AppBar className={classes.appBar}>
                <Box p={1}>
                    <Chip label={Calculate(props.orders)} />
                    <Button style={{color: "white", width: 80}} onClick={toggleShow}>รายการ</Button>
                </Box>
            </AppBar>
        </div>
    );
}

export default TotalPriceBox;