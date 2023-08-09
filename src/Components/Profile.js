import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, addDoc, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { memo } from "react";
import img from './Static/Cart-empty.gif';

const Profile = () => {
    const { userid } = useParams();
    const [usrdata, setusrData] = useState();//userdata
    const [usrOrd, setUsrOrd] = useState([]);//fetch all orders
    const [cartpid, setCartpid] = useState([]);//fetch user cart product
    const [prd, setPrd] = useState([]);//product data
    const [loading, setLoading] = useState(false);

    console.log(prd);
    //product details
    useEffect(() => {
        if (!cartpid.length) {
            setPrd([]);
            return;
        }

        const fetchProductData = async () => {
            setLoading(true);
            const productPromises = cartpid.map(p => {
                if (p.productid === 100) {
                    console.log("no product");
                    return Promise.resolve(null);
                    setLoading(true);
                }

                const _doc = doc(db, "Products", p.productid || Number(p.productid));
                return getDoc(_doc);
            });

            const productDocs = await Promise.all(productPromises);
            const products = productDocs.map(_data => (_data.exists() ? _data.data() : null));
            setPrd(products);
            setLoading(false);
        };

        fetchProductData();
    }, [cartpid]);


    //get userdata from db
    useEffect(() => {
        setLoading(true);
        const fetchUserData = async () => {
            const userRef = collection(db, 'User');
            const q = query(userRef, where('id', '==', userid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("User not found");
                return;
                setLoading(true);

            }
            // Get data for each user document
            querySnapshot.forEach((doc) => {
                setusrData(doc.data());
                setLoading(false);
            });
        };
        fetchUserData();
    }, [userid]);

    //get user Order data from db
    useEffect(() => {
        const fetchUserData = async () => {
            const userRef = collection(db, 'Payments');
            const q = query(userRef, where('userid', '==', userid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("User not found");
                setLoading(true);

                return;

            }

            // Create an array to hold all the user's orders
            const orders = [];

            // Get data for each user document
            querySnapshot.forEach((doc) => {
                // Push each order to the array
                orders.push(doc.data());
                setLoading(false);

            });

            // Set usrOrd to the array of orders
            setUsrOrd(orders);
        };
        fetchUserData();
    }, [userid]);

    // Helper function to get unique objects in an array
    function getUniqueObjects(array) {
        const stringifiedObjects = new Set(array.map((obj) => JSON.stringify(obj)));
        return Array.from(stringifiedObjects).map((strObj) => JSON.parse(strObj));
    }

    //fetch user data from db
    useEffect(() => {
        const fetchUserData = async () => {
            const userRef = collection(db, 'Cart');
            const q = query(userRef, where('userid', '==', userid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("User not found");
                setLoading(true);
                return;
            }

            // Create an array to hold all the user's orders
            const orders = [];

            // Get data for each user document
            querySnapshot.forEach((doc) => {
                // Push each order to the array
                orders.push(doc.data());
                setLoading(false);

            });

            // Get unique orders
            const uniqueOrders = getUniqueObjects(orders);

            // Set cartpid to the array of unique orders
            setCartpid(uniqueOrders);
        };
        fetchUserData();
    }, [userid]);

    return (
        usrdata && <div className='py-32'>
            {loading ? <div className='flex justify-center items-center h-screen'><img src={img} className='' /> </div> : ""}
            {loading ? <div className='flex justify-center items-center h-screen'><img src={img} className='' /> </div> :
                <div>
                    <h1 className='text-center md:text-left md:px-32 text-3xl '>Hello, <span className='text-red-500'>{usrdata.name}</span> WellCome To <i>Shop<span className='text-red-500'>Mart</span></i></h1>
                    <div className='flex flex-col sm:flex-row lg:px-32'>
                        <div className='bg-gray-100 text-center rounded-xl p-5'>
                            <p>{usrdata.name}</p>
                            <p>{usrdata.address}</p>
                            <p>{usrdata.phone}</p>
                            <p>{usrdata.id}</p>
                        </div>
                        <div className='bg-gray-100 text-center rounded-xl my-2 sm:my-0 sm:p-5 lg:mx-3 overflow-auto'>
                            <h1>My Orders</h1>
                            <table className='border-2 border-black'>
                                <tr>
                                    <th className='border p-2'>Order id</th>
                                    <th className='border p-2'>Payment id</th>
                                    <th className='border p-2'>Product id</th>
                                    <th className='border p-2'>Date</th>
                                    <th className='border p-2'>View Details</th>
                                </tr>
                                {
                                    usrOrd && usrOrd.map((p, i) => {
                                        const date = p.datetime instanceof Date ? p.datetime : new Date(p.datetime);
                                        // Format date as a string
                                        const dateString = date.toLocaleDateString();

                                        return (<tr key={i}>
                                            <td className='border p-2'>{p.token}</td>
                                            <td className='border p-2'>{p.Paymentid}</td>
                                            <td className='border p-2'>{p.productid}</td>
                                            <td className='border p-2'>{dateString}</td>
                                            <td className='border p-2'><Link to={`/OrderPlace/${p.productid}`}>Details</Link></td>
                                        </tr>);
                                    })
                                }
                            </table>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default memo(Profile)