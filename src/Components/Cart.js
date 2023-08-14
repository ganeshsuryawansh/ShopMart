import React, { useState, useEffect, memo, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner'
import img from './Static/Cart-empty.gif';
import CartSkeleton from './CartSkeleton';

const Cart = (props) => {
    const navigate = useNavigate();
    let data = sessionStorage.getItem("email");
    const [user, setUser] = useState(data);//user id to fetch individual user products from cart 
    const [userPID, setuserPID] = useState([]);//product assigned by user
    const [cartP, setCartP] = useState([]);//cart product
    const [tPrice, setTprice] = useState(0);//total cart price
    const [loading, setLoading] = useState(false);//react loder animation
    const [dPid, setDPid] = useState(0);//product id for delete product
    const scriptLoaded = useRef(false);
    const [usrdata, setusrData] = useState();
    const amountInSubunits = tPrice * 100; // Assuming price is in INR and needs to be converted to paise

    //console.log("userPID==>", userPID);
    //console.log("cartP==>", cartP);


    if (!data) {
        navigate('/login');
    }

    useEffect(() => {
        setUser(data);
    }, [data])

    //Fetch product id from Cart
    useEffect(() => {
        setLoading(true)
        const getProduct = async () => {
            const querySnapshot = await getDocs(query(
                collection(db, "Cart"),
                where("userid", "==", user)
            ));
            const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setuserPID(productsData);
            setLoading(false)
        };
        getProduct();
    }, [user]);

    //Fetch product from Products
    useEffect(() => {
        // This function fetches the product data from Firestore based on product ID
        const fetchProduct = async (productId) => {
            const querySnapshot = await getDocs(query(collection(db, "Products"), where("productid", "==", productId)));
            console.log(`Querying for product ID: ${productId}`);
            if (querySnapshot.empty) {
                console.warn(`No product found for product ID: ${productId}`);
            }
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };
        // Ensure userPID exists and has data
        if (userPID && userPID.length > 0) {
            // Fetch all products data based on userPID
            Promise.all(userPID.map(p => fetchProduct(p.productid)))
                .then(productsArrays => {
                    // Flatten the array of arrays into a single array
                    const allProducts = [].concat(...productsArrays);
                    setCartP(allProducts);
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                });
        }
    }, [userPID]);

    //total price count
    useEffect(() => {
        const totalPrice = cartP.reduce((total, product) => total + Number(product.price), 0);
        setTprice(totalPrice);
    }, [cartP]);

    //Number(userPID) ? console.log("no data") : console.log("have data");

    //delete product from Cart
    useEffect(() => {
        if (!dPid || dPid === "0") return;  // or some other default invalid value

        const documentRef = doc(db, "Cart", dPid);
        deleteDoc(documentRef)
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }, [dPid]);


    //get perticular document id 
    const getCartDocumentId = async (productId, userId) => {
        const q = query(collection(db, "Cart"), where("productid", "==", productId), where("userid", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming there's only one cart item with this productid for the user
            return querySnapshot.docs[0].id;
        }
        return null;
    };

    //remove from cart
    const handleRemoveFromCart = async (productId, userId) => {
        const docId = await getCartDocumentId(productId, userId);
        if (docId) {
            const documentRef = doc(db, "Cart", docId);
            deleteDoc(documentRef)
                .then(() => {
                    console.log("Document successfully deleted!");

                    // If you're managing the state locally, update it too
                    setCartP(prevCartP => prevCartP.filter(p => p.productid !== productId && p.userid !== userId));
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        } else {
            console.warn(`No cart item found for product ID: ${productId} and user ID: ${userId}`);
        }
    };

    //card desc limeted content
    function truncateDesc(str, length = 100) {
        if (!str) {
            return ''; // or you can return a default string like 'No description available'
        }
        if (str.length <= length) {
            return str;
        }
        const truncated = str.slice(0, length + 1);
        return truncated.slice(0, truncated.lastIndexOf(" ")).trim() + "...";
    }

    //payment api call
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => scriptLoaded.current = true;
        document.body.appendChild(script);
    }, []);

    //add payment details in db
    const addPaymentDetails = async (payid) => {
        try {
            const PayRef = collection(db, 'Cart_Payments');
            const q2 = query(PayRef, where('token', '==', data.productid + "_" + user));
            const querySnapshot = await getDocs(q2);
            if (querySnapshot.empty) {
                // Product is not in the cart for the user, add it
                const docRef = await addDoc(collection(db, "Cart_Payments"), {
                    productid: data.productid,
                    userid: user,
                    token: data.productid + "_" + user,
                    datetime: Date(),
                    Paymentid: payid,
                    price: amountInSubunits
                });
                //alert("Document written with ID: ", docRef.id);
                console.log("data Added in DB....");
            } else {
                console.log("Data Exists in Db...");
            }
        } catch (error) {
            console.error("Error in addpaymentdata: ", error);
        }
    };


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
                    alert(response.razorpay_payment_id)
                    navigate(`/Profile/${user}`)
                    window.location.reload();
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
            });
        };
        fetchUserData();
    }, [user]);
    return (

        <div className=' pt-32' >
            {loading ? "" : <div>
                <h1 className='text-center text-xl my-2'>Buy All Products <span className='text-purple-700'>{user}</span></h1>
                <p className='text-center text-xl my-2'>Total Amount Rs: {tPrice} </p>
                <div className='flex justify-center items-center '>
                    <button className='bg-orange-600 px-10 py-3 rounded text-center flex justify-center text-white' onClick={handlePayment}>Proceed To Payment {tPrice}</button>
                </div>
            </div>}
            {
                loading ? <>
                    {Array(10).fill(null).map((_, idx) => (
                        <CartSkeleton key={idx} />
                    ))}
                </> :
                    cartP.map((product, i) => (

                        <div key={product.id} className="lg:px-96">
                            <div className="rounded-2xl hover:bg-gray-100 my-2 flex w-100 flex-row justify-between px-2 items-center Montserrat border-2 border-solid border-gray-200">
                                <div className="flex flex-col w-2/3 pr-14">
                                    <Link to={`/Detail/${product.id}`}>
                                        <h5 className="mb-2 text-1xl lg:text-2xl font-bold Montserrat tracking-tight text-gray-900">{product.name}</h5>
                                        <p className='hidden sm:block'>{truncateDesc(product.desc)}</p>
                                    </Link>
                                    <div className="flex flex-row justify-between">
                                        <p className="py-1 text-xl text-blue-500">RS.{product.price}</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <button className='bg-yellow-500 rounded p-1' onClick={() => handleRemoveFromCart(product.productid, user)}>Remove From Cart</button>
                                    </div>
                                </div>

                                <div className="w-1/4 overflow-hidden lg:h-64">
                                    <Link to={`/Detail/${product.id}`}>
                                        <img className="object-cover w-full h-full" src={product.image} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default memo(Cart);