import { useState, memo } from "react";
import { Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ShoppingSide from "./Components/ShoppingSide";
import Addproduct from "./Components/Addproduct";
import Detail from "./Components/Detail";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import OrderPlace from "./Components/OrderPlace";
import Profile from "./Components/Profile";
import Admin from "./Components/Admin";
import Adminpanel from "./Components/Adminpanel";
import AddnewProduct from "./Components/AddnewProduct";


function App() {
  let data = sessionStorage.getItem("email");
  //console.log(data);
  return (
    <div className="" >
      <Routes>
        <Route path="/">
          <Route index element={<ShoppingSide />} />
          <Route path="/ShoppingSide" element={<ShoppingSide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Detail/:productid" element={<Detail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/pay/:price" element={<Payment />} />
          <Route path="/OrderPlace/:productid" element={<OrderPlace />} />
          <Route path="/profile/:userid" element={<Profile />} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/Adminpanel" element={<Adminpanel/>} />
          <Route path="/AddnewProduct" element={<AddnewProduct/>} />
        </Route>
      </Routes>
      <Header />

      <Footer />
    </div>
  );
}

export default memo(App);
