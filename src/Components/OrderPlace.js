import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { collection, addDoc, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import { useParams } from 'react-router-dom';
import img from './Static/Cart-empty.gif';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {  memo } from "react";

const OrderPlace = () => {
  let data = sessionStorage.getItem("email");
  const { productid } = useParams();
  const [paydata, setpayData] = useState([]);
  const [loading, setLoading] = useState(false);

  //get user Order data from db
  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      setLoading(true);
      const userRef = collection(db, 'Payments');
      const q = query(userRef, where('token', '==', productid + "_" + data));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("User not found");
        return;
      }
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });
      setpayData(orders);
      console.log(orders);
      setLoading(false);
    };
    fetchUserData();
  }, [data]);


  // function to open WhatsApp with pre-filled message
  const openWhatsApp = (message) => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
  }

  return (
    <div className='py-32 flex justify-center items-center h-screen'>


      {loading ? <div className='flex justify-center items-center h-screen'><img src={img} className='' /> </div> : <div className='bg-gray-100 rounded-xl p-10'>
        {paydata.map((item, index) => {
          const message = `User ID: ${item.userid}\nTransaction ID: ${item.Paymentid}\nDate: ${item.datetime}\nToken: ${item.token}\nProduct ID: ${item.productid}\nPrice: ${item.price}`;

          return (
            <div key={index}>
              <table className='table-auto w-full text-left whitespace-no-wrap'>
                <thead>
                  <tr>
                    <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl' colSpan="2">Payment Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='px-4 py-3'>User ID:</td>
                    <td className='px-4 py-3'>{item.userid}</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>Transaction ID:</td>
                    <td className='px-4 py-3'>{item.Paymentid}</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>Date:</td>
                    <td className='px-4 py-3'> {item.datetime}</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>Token:</td>
                    <td className='px-4 py-3'> {item.token}</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>Product ID:</td>
                    <td className='px-4 py-3'>{item.productid}</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>Price:</td>
                    <td className='px-4 py-3'>{item.price}</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-3'>Share</td>
                    <td className='px-4 py-3'> <button className="" onClick={() => openWhatsApp(message)}>
                      <WhatsAppIcon style={{ color: 'green' }} />
                    </button></td>
                  </tr>
                </tbody>
              </table>

            </div>
          )
        })}
        <hr className='2' />
        <h1 className='text-xl text-center'>Delivery Expected At 3 Days.. </h1>
        <p className='text-center'>
          <Link className='px-3 pb-1 text-blue-500 rounded-xl text-2xl' to={`/profile/${data}`}>Go to Dashbord</Link>
        </p>

      </div>}

    </div>
  )
}

export default memo(OrderPlace)