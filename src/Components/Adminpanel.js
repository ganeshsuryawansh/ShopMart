import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, addDoc, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import CountUp from 'react-countup';

const Adminpanel = () => {
  const navigate = useNavigate();
  const adminLogin = sessionStorage.getItem("AdminId");
  const [Orders, setOrders] = useState([]);
  const [Customer, SetCustomers] = useState([]);

  //console.log(Customer);
  //console.log(Orders);
  //without Admin Login Do not Entry to Admin Pannel
  useEffect(() => {
    const adminLogin = sessionStorage.getItem("AdminId");
    if (adminLogin === null) {
      console.log("not login");
      navigate('/Admin');
    } else {
      console.log("Admin login Successfully");
    }
  }, [navigate]);

  //all user Orders
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        let querySnapshot = await getDocs(collection(db, "Payments"));
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(productsData);
      } catch (error) {
        console.error("Error counting documents: ", error);
      }
    };

    fetchPayments();
  }, []);

  
  //all Customers
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        let querySnapshot = await getDocs(collection(db, "User"));
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        SetCustomers(productsData);
      } catch (error) {
        console.error("Error counting documents: ", error);
      }
    };
    fetchPayments();
  }, []);
  //total sale
  function sale(){
    var Sale = 0;
    Orders && Orders.map((p) => {
      if (p.price === undefined) {
      } else {
        Sale = Sale + Number(p.price);
      }
    })
    return Sale;
  }
  


  return (
    <div className='py-32'>
      <div className='bg-gray-300 flex flex-col sm:flex-row '>
        <div className=' bg-gray-200 sm:w-1/4 flex sm:flex-row flex-col sm:sticky sm:top-0 h-full px-10'>

        </div>
        <div className='flex flex-wrap sm:w-3/4 overflow-auto justify-between px-10'>
          <div className='bg-yellow-500 p-10 rounded-xl'>
            Total Orders
            <p className='text-center text-2xl'><CountUp end={Orders.length} />+</p>
          </div>
          <div className='bg-yellow-500 p-10 rounded-xl'>
            Total Sale
            <p className='text-center text-2xl'><CountUp end={sale()}/>+</p>
          </div>
          <div className='bg-yellow-500 p-10 rounded-xl'>
            Total Customers
            <p className='text-center text-2xl'><CountUp end={Customer.length}/>+</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Adminpanel;
