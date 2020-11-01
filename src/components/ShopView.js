import { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FastfoodIcon from '@material-ui/icons/Fastfood';

var orderfromback = ['ไข่ต้ม','มาม่า','ไก่ย่าง','ปลาเผา','เป็ดปักกิ่งแช่น้ำปลา','ข้าวต้มปลา','ปลาเผา','มาม่าผัด','ไข่ดาว','แมวผัดเผ็ด','แกงกะหรี่เต่า','ปลาหมึกผัดวุ้นเส้น','แกงเป็ด']

function Call() {
    // รายการออร์เดอร์ที่สั่งจาก backend
    const [orderdata] = useState([]);
    // รายการอาหารที่เสร็จแล้วจาก backend
    const [cookeddata] = useState([]);
    // รายการอาหารที่ส่งเรียบร้อย
    const [sendedmenu] = useState([]);
    const [ordernum,setOrdernum] = useState(0);
    const [cookednum,setCookednum] = useState(0);
    const [sendednum,setSendednum] = useState(0);
    const [count,setCount] = useState(0);

    function calledorder() {
        if (orderfromback.length-1>=ordernum){
            setOrdernum(ordernum+1);
            orderdata.push(orderfromback[ordernum]);
        }
    }

    function cookedcall() {
        setCookednum(cookednum+1);
        orderdata.splice(0,1);
        cookeddata.push(orderfromback[cookednum]);
    }

    function sended() {
        setSendednum(sendednum+1);
        cookeddata.splice(0,1);
        sendedmenu.push(orderfromback[sendednum]);
    }

    function orderedbox({a,count}) {
        return (
            <p>
                <Box boxShadow={1} width="80%" height="50%">{a}</Box>
                <Button size='small' variant="contained" onClick={cookedcall} style={{background:'#F39C12'}}>ปรุงเสร็จแล้ว</Button>
            </p>
        );
    }
    function cookedbox({a,count}) {
        return (
            <p>
                <Box boxShadow={1} width="80%" height="50%">{a}</Box>
                <Button size='small' variant="contained" onClick={sended} style={{background:'#91BF40'}}>เสิร์ฟอาหารแล้ว</Button>
            </p>
        );
    }

    var ordernumber = 'Ordered Number: ' + Math.floor(ordernum)
    var cooknumber = 'Cooked Number: ' + Math.floor(cookednum)
    var sendnumber = 'Sended Number: ' + Math.floor(sendednum)
    return (
        <div>
            <p>{ordernumber}</p>
            <p>{cooknumber}</p>
            <p>{sendnumber}</p>
            <Button variant="contained" onClick={calledorder}>รับออร์เดอร์</Button>
            <Typography variant="h4" gutterBottom style={{height:30,font:'Ariel'}}>รายการออร์เดอร์ที่สั่ง<RestaurantMenuIcon fontSize='large'/></Typography>
            <Box boxShadow={1} style={{height:300,width:500,overflow:'auto'}}>
                <p>{orderdata.map(a => orderedbox({a,count}))}</p>
            </Box>
            <Typography variant="h4" gutterBottom style={{height:30,font:'Ariel'}}>รายการอาหารที่ปรุงเสร็จแล้ว<FastfoodIcon fontSize='large'/></Typography>
            <Box boxShadow={1} style={{height:300,width:500,overflow:'auto'}}>
                <p>{cookeddata.map(a => cookedbox({a,count}))}</p>
            </Box>
        </div>
    );
}

export default Call;