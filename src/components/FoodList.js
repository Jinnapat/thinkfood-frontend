import React, { useState, useEffect } from 'react';
import { Box, Chip, Button, Card, Container } from '@material-ui/core';


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

    function getQueue(queue) {
        return "รออีก " + queue + " คิว"
    }

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

        // [{
        //     menu_id
        //     menu_name
        //     menu_description
        //     menu_price
        //     menu_shop_id_fk
        // }]
    const el = data.map((val)=> {
        console.log(val);
        return (
            <Box mb={2} key={val.MENU_ID}>
                <Card>
                    <Box pb={1} pl={1} pr={1}>
                        <Box pb={2}>
                            <h2>เมนู {val.MENU_NAME}</h2>
                            <a>ร้าน {val.MENU_SHOP_ID_FK}</a>
                            <Chip label={getQueue(val.queue)} />
                            <Chip label={val.MENU_PRICE + " บาท"} />
                        </Box>
                        <img src="food.jpg" alt="preview" width="100%" />
                        <Button onClick={e=>handleOrder(e, val)} variant="contained">{props.button_word}</Button>
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