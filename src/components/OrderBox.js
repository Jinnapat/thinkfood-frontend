import React, { useState } from 'react';
import { AppBar, Box, Chip, Card, Button, Slide, Grid } from '@material-ui/core';

function OrderBox (props) {
    const [orders, setOrders] = useState(props.orders)

    function handleCancel(e, selectedOrder) {
        const newOrder = []
        for (let i = 0; i < props.orders.length; i++) {
            let order = props.orders[i];
            if (order.name == selectedOrder.name) {
                order.quantity -= 1;
            }
            if (order.quantity > 0) {
                newOrder.push(order);
            }
        }
        props.setOrders(newOrder)
    }

    let i = 0;
    const el = orders.map((order)=>{
        i += 1;
        return (
            <Box mb={2} key={i}>
                <Card>
                    <Box p={2}>
                        <Grid container>
                            <Grid xs={5}>
                                <b>{order.name}</b>
                            </Grid>
                            <Grid xs={2}>
                                <Chip label={"x" + order.quantity}/>
                            </Grid>
                            <Grid xs={3}>
                                <Chip label={order.price + " บาท"}/>
                            </Grid>
                            <Grid xs={2}>
                                <Button onClick={e=>handleCancel(e, order)}>ยกเลิก</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Box>
        );
    });

    return (
        <Slide direction="up" in={props.show}>
            <AppBar className={props.cname.orderBar}>
                <Card>
                    <Box p={3}>
                        {el}
                        <Button>ยืนยัน</Button>
                    </Box>
                </Card>
            </AppBar>
        </Slide>
    );
}

export default OrderBox;