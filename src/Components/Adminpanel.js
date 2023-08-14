import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, addDoc, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import CountUp from 'react-countup';
import AddnewProduct from './AddnewProduct';
const Adminpanel = () => {
  const navigate = useNavigate();
  const adminLogin = sessionStorage.getItem("AdminId");
  const [Orders, setOrders] = useState([]);
  const [Customer, SetCustomers] = useState([]);
  const [AllPrd, setAllprd] = useState([]);

  console.log(AllPrd);
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

  //all user Orders from payments db
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


  //all Products
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        let querySnapshot = await getDocs(collection(db, "Products"));
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllprd(productsData);
      } catch (error) {
        console.error("Error counting documents: ", error);
      }
    };
    fetchPayments();
  }, []);
  //total sale
  function sale() {
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
      {/**Total order , sales, customers */}
      <div className='flex flex-col sm:flex-row justify-between px-32'>
        <div className='bg-yellow-500 p-10 rounded-xl'>
          Total Orders
          <p className='text-center text-2xl'><CountUp end={Orders.length} />+</p>
        </div>
        <div className='bg-yellow-500 p-10 rounded-xl'>
          Total Sale
          <p className='text-center text-2xl'><CountUp end={sale()} />+</p>
        </div>
        <div className='bg-yellow-500 p-10 rounded-xl'>
          Total Customers
          <p className='text-center text-2xl'><CountUp end={Customer.length} />+</p>
        </div>
      </div>

      {/**ADD new product  */}
      <div>
        <AddnewProduct/>
      </div>
      {/**product details */}
      <div className='py-10'>
        <h1 className='text-center text-xl'>Product Details</h1>
        <table class="w-1/2 mx-auto border-collapse bg-white shadow-lg">
          <thead>
            <tr>
              <th class="p-4 border-b border-gray-200 bg-gray-100">Image</th>
              <th class="p-4 border-b border-gray-200 bg-gray-100">Name</th>
              <th class="p-4 border-b border-gray-200 bg-gray-100">Price</th>
              <th class="p-4 border-b border-gray-200 bg-gray-100">Id</th>
              <th class="p-4 border-b border-gray-200 bg-gray-100">Seller</th>
              <th class="p-4 border-b border-gray-200 bg-gray-100">Action</th>

            </tr>
          </thead>
          <tbody>
            {AllPrd && AllPrd.map((p) => {
              return (<>
                <tr class="hover:bg-gray-50">
                  <td class="text-center border-b border-gray-200"><img className='h-20 w-32' src={p.image} /></td>
                  <td class="text-center border-b border-gray-200">{p.name}</td>
                  <td class="text-center border-b border-gray-200">{p.price}</td>
                  <td class="text-center border-b border-gray-200">{p.productid}</td>
                  <td class="text-center border-b border-gray-200">{p.seller}</td>
                  <td class="text-center border-b border-gray-200"><button className='bg-yellow-500 rounded-xl p-2'>Delete</button></td>

                </tr>
              </>)
            })}
          </tbody>
        </table>
      </div>
      {/** User details */}
      <div className='py-10'>
        <h1 className='text-center text-xl'>User Details</h1>
        <table className='w-1/2 mx-auto border-collapse bg-white shadow-lg'>
          <thead>
            <tr className='hover:bg-gray-50'>
              <th className='p-4 border-b border-gray-200 bg-gray-100'>Name</th>
              <th className='p-4 border-b border-gray-200 bg-gray-100'>ID</th>
              <th className='p-4 border-b border-gray-200 bg-gray-100'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {Customer && Customer.map((c) => {
              return (<>
                <tr className='hover:bg-gray-50'>
                  <td className=' p-4 border-b border-gray-200'>{c.name}</td>
                  <td className=' p-4 border-b border-gray-200'>{c.id}</td>
                  <td className=' p-4 border-b border-gray-200'>{c.phone}</td>
                </tr>
              </>)
            })}

          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Adminpanel;
