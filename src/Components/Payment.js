import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, addDoc, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import img from './Static/Cart-empty.gif';
import { memo } from "react";


const Payment = () => {
    const navigate = useNavigate();
    let user = sessionStorage.getItem("email");//user id to fetch user data
    let productid = sessionStorage.getItem("productid");//product id to fetch product data
    console.log("productid== ", productid);
    const { price } = useParams();
    const amountInSubunits = price * 100; // Assuming price is in INR and needs to be converted to paise
    const scriptLoaded = useRef(false);
    const [usrdata, setusrData] = useState();
    const [payment, setPayment] = useState(false);
    const [lock, setLock] = useState(false);//if lock user already paid for these product not able to pay again 
    const [data, setData] = useState({// product data
        image: "",
        name: "",
        desc: "",
        category: "",
        price: 0,
        productid: 0,
        quantity: 0,
        seller: ""
    });
    const [loading, setLoading] = useState(false);

    //payment api call
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => scriptLoaded.current = true;
        document.body.appendChild(script);
    }, []);

    //pay or not
    useEffect(() => {
        try {
            const PayRef = collection(db, 'Payments');
            const q2 = query(PayRef, where('token', '==', data.productid + "_" + user));
            const querySnapshot = getDocs(q2);
            if (querySnapshot.empty) {
                setLock(false);
            } else {
                setLock(true);
                console.log("Data Exists in Db...");
                //alert("You Already Paid For these Product")
            }
        } catch (error) {
            console.error("Error in addpaymentdata: ", error);
        }
    }, [user, lock])

    //add payment details in db
    const addPaymentDetails = async (payid) => {
        try {
            const PayRef = collection(db, 'Payments');
            const q2 = query(PayRef, where('token', '==', data.productid + "_" + user));
            const querySnapshot = await getDocs(q2);
            if (querySnapshot.empty) {
                setLock(false);
                // Product is not in the cart for the user, add it
                const docRef = await addDoc(collection(db, "Payments"), {
                    productid: data.productid,
                    userid: user,
                    token: data.productid + "_" + user,
                    datetime: Date(),
                    Paymentid: payid,
                    price: price
                });
                //alert("Document written with ID: ", docRef.id);
                console.log("data Added in DB....");
            } else {
                setLock(true)
                console.log("Data Exists in Db...");
                alert("You Already Paid For these Product")
            }
        } catch (error) {
            console.error("Error in addpaymentdata: ", error);
        }
    };
    const payAlert = () => {
        alert("You Already Paid for these Product...")
    }

    //make payment
    const handlePayment = () => {
        if (!scriptLoaded.current) {
            return alert('Payment gateway script is still loading, please wait a moment and try again.');
        }
        const options = {
            "key": "rzp_test_patmvnydyLHSDt",
            "amount": amountInSubunits, // amount in smallest currency unit
            "currency": "INR",
            "name": "ShopMart",
            "description": data.name,
            //"image": "https://example.com/your_logo.jpg",
            "handler": function (response) {

                if (response.razorpay_payment_id) {
                    addPaymentDetails(response.razorpay_payment_id);
                    setPayment(true);
                    navigate(`/Profile/${user}`)
                    //window.location.reload();
                }
            },
            "prefill": {
                "name": usrdata.name,
                "email": user,
                "contact": usrdata.phone
            },
            "theme": {
                "color": "#F37254"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    //get userdata from db
    useEffect(() => {
        setLoading(true);
        const fetchUserData = async () => {
            const userRef = collection(db, 'User');
            const q = query(userRef, where('id', '==', user));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("User not found");
                return;
            }
            // Get data for each user document
            querySnapshot.forEach((doc) => {
                setusrData(doc.data());
                //console.log(`User ID: ${doc.id}`);
                //console.log(`User data: `, doc.data());
                //console.log(data);
            });
        };
        fetchUserData();
    }, [user]);

    //fetch product data from db
    useEffect(() => {
        setLoading(true);
        async function getData() {
            const _doc = doc(db, "Products", productid || Number(productid));
            const _data = await getDoc(_doc);

            if (_data.exists()) {
                setData(_data.data());
                setLoading(false);
            } else {
                console.log('No such document!');
                setLoading(true);
            }
        }

        if (productid) {
            getData();
        }
    }, [productid]); // add productid as a dependency


    return (
        <div className='py-32'>
            {loading ? <div className='flex justify-center items-center h-screen'><img src={img} className='' /> </div> : <div className='sm:mx-24'>
                <h1 className='text-center text-4xl'>Payment Details.</h1>
                <div className='flex justify-center items-center sm:flex-row flex-col px-2 rounded-xl'>
                    <div className="flex justify-center items-center md:w-full lg:w-96 sm:w-80 h-96">
                        <img className="rounded-lg h-64 w-52 sm:w-full sm:h-full" src={data.image} alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <div className='lg:ml-32 sm:px-10 py-5 rounded-xl text-center'>
                            <h1 className='text-xl'>{data.name} </h1>
                            <h3 className='text-xl'> ₹{data.price}</h3>
                            <p className='text-green-800'>Free Delivery</p>
                            <span className='flex flex-row'>
                            </span>
                        </div>
                        {usrdata && <div className='lg:ml-32 sm:px-10 py-5 rounded-xl text-center my-2'>
                            <p>{usrdata.name}</p>
                            <p>{usrdata.address}</p>
                            <p>{usrdata.phone}</p>
                            <p>{usrdata.id}</p>
                        </div>}
                        <div className='flex justify-center items-center '>
                          <button className='bg-orange-600 sm:ml-32 px-10 py-3 rounded text-center flex justify-center' onClick={handlePayment}>Proceed To Payment</button>
                        </div>
                    </div>

                </div>
            </div>}
        </div>
    );
}

export default memo(Payment);
