import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useEffect, useState } from 'react'
import Landing from './components/Landing';
import FoodList from './components/FoodList';
import Profile from './components/Profile';
import TotalPriceBox from './components/TotalPriceBox';
import { AppBar, Box, Button, Grid } from '@material-ui/core';
import Register from './components/Register';
import ShopView from './components/ShopView';
import Waiting from './components/Waiting';
import API from './api/api';

// set this to simulate log in or log out mode
const defaultLogin = true;
const testUser = {
  username: "test", 
  pic: "logo512.png", 
  role: "buyer"
};
// debug zone

const ThisfoodList = [
  {id: 1, price: 50, name: "mama", shop:"CP", img: "food.jpg", queue: 10},
  {id: 2, price: 30, name: "mama1", shop:"CP1", img: "food.jpg", queue: 100},
  {id: 3, price: 40, name: "mama2", shop:"CP2", img: "food.jpg", queue: 20},
  {id: 4, price: 70, name: "mama3", shop:"CP3", img: "food.jpg", queue: 50},
  {id: 5, price: 100, name: "mama4", shop:"CP3", img: "food.jpg", queue: 50}
]

const orderfromback = [
  {id: 1, name: 'ไข่ต้ม', time: '10:30'},
  {id: 2, name: 'มาม่า', time: '10:30'},
  {id: 3, name: 'ไก่ย่าง', time: '10:30'},
  {id: 4, name: 'ปลาเผา', time: '10:30'},
  {id: 5, name: 'เป็ดปักกิ่งแช่น้ำปลา', time: '10:30'},
  {id: 6, name: 'ข้าวต้มปลา', time: '10:30'},
  {id: 7, name: 'ปลาเผา', time: '10:30'},
  {id: 8, name: 'เป็ดปักกิ่งแช่น้ำปลา', time: '10:30'},
  {id: 9, name: 'ข้าวต้มปลา', time: '10:30'}
]

const ordertest = [
  {name: "omelet", shop: "test shop", price: 10, quantity: 20},
  {name: "omelet", shop: "test shop", price: 10, quantity: 20},
  {name: "omelet", shop: "test shop", price: 10, quantity: 20}
]
// end debug zone

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  // true false
  const [loggedIn, setLoggedIn] = useState(defaultLogin);
  
  // [{name: "ชื่ออาหาร", quantity: 50, price: 50}, ...]
  const [orders, setOrders] = useState([]);
  
  // {name: "ชื่อผู้ใช้", email: ..., password: ..., role: "buyer/seller"}
  const [userData,setUserData] = useState(testUser);
  
  // [{name: ..., shop: ..., price: 50}, ...]
  const [foodList, setFoodList] = useState(ThisfoodList);

  // [{name: ..., shop: ..., time: 11.30}]
  // set orders for chef
  const [todo, setTodo] = useState(orderfromback);

  useEffect( async () =>{
    // schema
    // {
    //   menu_id
    //   menu_name
    //   menu_description
    //   menu_price
    //   menu_shop_id_fk
    // }

    var res = await API.get('/common/get_menu');
    console.log("this is the fetched data:", res.data.all_menu);
    setFoodList(res.data.all_menu);

  }, []);
  
  function showLandingZone (loggedIn) {
    if (!loggedIn) {
      return <Landing />
    } else {
      return (
        <AppBar>
          <Box p={1}>
            <Grid container>
              <Grid item xs={9}>
                <Box p={1}><b>ThinkFood</b></Box>
              </Grid>
              <Grid item xs={3}>
                <Button style={{color: "white"}}>Log Out</Button>
              </Grid>
            </Grid>
          </Box>
        </AppBar>
      );
    }
  }
  
  
  function MainPage(props) {
    if (props.loggedIn) {
      if (props.userData.role == "seller") {
        return (
          <ShopView todo={todo} />
        );
      }
    }

    return (
      <div>
        {showLandingZone (loggedIn)}
        <FoodList button_word="สั่งเลย" data={foodList} orders={orders} setOrders={setOrders}/>
        {loggedIn ? <TotalPriceBox orders={orders} setOrders={setOrders}/> : undefined}
      </div>
    );
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile userData={userData}/>
          </Route>
          <Route path="/waiting">
            <Waiting component={ordertest} payment={false}/>
          </Route>
          <Route path="/">
            <MainPage loggedIn={loggedIn} userData={userData}/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
