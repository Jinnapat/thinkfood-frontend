import { useState, useEffect } from 'react';
import { Box, Chip, Button, Card, Grid } from '@material-ui/core';


export default function FoodList (props) {
    const [data, setData] = useState(props.data);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setData(data.map((val) => {
                let temp = val;
                let amount = 1 - Math.round(Math.random() * 3);
                temp.queue += amount;
                temp.queue = temp.queue <= 0? 0 : temp.queue;
                return temp;
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function handleOrder(e, menu) {
        let added = false;
        let newOrder = [];
        for (let i = 0; i < props.orders.length; i++) {
            let order = props.orders[i];
            newOrder.push(order)
            if (order.name == menu.name) {
                newOrder[i].quantity += 1;
                added = true;
            }
        }
        if (!added) {
            newOrder.push({name: menu.name, quantity: 1, price: menu.price})
        }
        props.setOrders(newOrder);
    }

    function handleClick(e, val) {
        console.log(props.handler)
        if (props.handler) {
            props.handler()
        } else {
            handleOrder(e, val)
        }
    }
        // [{
        //     menu_id
        //     menu_name
        //     menu_description
        //     menu_price
        //     menu_shop_id_fk
        // }]
    const el = data.map((val)=> {
        return (
            <Box mb={2} key={val.MENU_ID}>
                <Card>
                    <Box pb={1} pl={1} pr={1}>
                        <Box pb={2}>
                            <h2>เมนู {val.MENU_NAME}</h2>
                            <Grid container>
                                <Grid item xs={5}>ร้าน {val.MENU_SHOP_ID_FK}</Grid>
                                <Grid item xs={4}><Chip label={"รอ " + val.queue + " คิว"} /></Grid>
                                <Grid item xs={3}><Chip label={val.MENU_PRICE + " บาท"} /></Grid>
                            </Grid>
                        </Box>
                        <img src={val.img?val.img:"food.jpg"} alt="preview" width="100%" />
                        <Button onClick={e=>handleClick(e, val)} variant="contained">{props.button_word}</Button>
                    </Box>
                </Card>
            </Box>
        );
    })
    return (
        <Box mt={8} mb={8} pl={2} pr={2}>
            {el}
        </Box>
    );
}