import React, { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner'
import img from './Static/Cart-empty.gif';


const Cart = (props) => {
    const navigate = useNavigate();
    let data = sessionStorage.getItem("email");
    const { no } = useParams();//get url data
    const [user, setUser] = useState(data);//user id to fetch individual user products from cart 
    const [userPID, setuserPID] = useState([]);//product assigned by user
    const [cartP, setCartP] = useState([]);//cart product
    const [tPrice, setTprice] = useState(0);//total cart price
    const [loading, setLoading] = useState(false);//react loder animation
    const [userPIDLoading, setUserPIDLoading] = useState(true); // New loading state

    //data?" ":navigate("/login")

    if (!data) {
        navigate('/login');
    }

    useEffect(() => {
        setUser(data);
    }, [data])

    //add new product to cart db
    useEffect(() => {
        const addProductToCart = async () => {
            try {
                const cartRef = collection(db, 'Cart');
                const q2 = query(cartRef, where('token', '==', no + "_" + user));

                const querySnapshot = await getDocs(q2);
                if (querySnapshot.empty) {
                    // Product is not in the cart for the user, add it
                    const docRef = await addDoc(collection(db, "Cart"), {
                        productid: no,
                        userid: user,
                        token: no + "_" + user,
                        userqt: 1
                    });
                    console.log("Document written with ID: ", docRef.id);
                } else {
                    console.log("Data Exists in Db...");
                }
            } catch (error) {
                console.error("Error in addProductToCart: ", error);
            }
        };

        addProductToCart();
    }, [no, user]);

    //function for add unique values in array these values are {product id in db }
    function addToCart(newValue) {
        setuserPID(prevCartData => {
            // Check if newValue already exists in the cartdata array
            if (!prevCartData.includes(newValue)) {
                // If it doesn't exist, return a new array that includes the new value
                return [...prevCartData, newValue];
            } else {
                // If it exists, return the old array (no change)
                return prevCartData;
            }
        });
    }

    //add unique procucts 
    function addProductToCart(product) {
        setCartP((prevCartP) => {
            // Check if the product already exists in the cart
            const productExists = prevCartP.find((p) => p.id === product.id);

            // If it doesn't exist, add the product to the cart
            if (!productExists) {
                return [...prevCartP, product];
            } else {
                // If it exists, return the previous state (no change)
                return prevCartP;
            }
        });
    }
    //fetch all product id using userid from Cart collection.
    useEffect(() => {
        const fetchProductIDs = async () => {
            try {
                setLoading(true);
                const cartRef = collection(db, 'Cart');
                const q = query(cartRef, where('userid', '==', user));

                const querySnapshot = await getDocs(q);
                const newProductIDs = []; // New array to hold the fetched product IDs
                querySnapshot.forEach((doc) => {
                    // Push product IDs directly to the new array
                    addToCart(newProductIDs.push(doc.data().productid));
                });
                addProductToCart(newProductIDs); // Update userPID once all IDs have been fetched
            } catch (error) {
                console.error("Error fetching product IDs: ", error);
            } finally {
                setUserPIDLoading(false); // Set loading to false regardless of whether the fetch succeeded
            }
        };
        fetchProductIDs();
    }, [user, no]);

    //fetch products in db
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            if (!userPID.length) return; // exit if there are no product IDs

            const promises = userPID.map((p) => {
                const productRef = collection(db, 'Products');
                const q = query(productRef, where('productid', '==', Number(p)));
                return getDocs(q);  // Return the promise here
            });


            // Wait for all the promises to resolve
            const snapshots = await Promise.all(promises);

            // Extract the data from the snapshots
            const productData = snapshots.flatMap(snapshot =>
                snapshot.docs.map(doc => doc.data())
            );

            setCartP(productData);
            setLoading(false);
        };
        fetchProducts();
    }, [userPID]);


    //total price count
    useEffect(() => {
        const totalPrice = cartP.reduce((total, product) => total + Number(product.price), 0);
        setTprice(totalPrice);
    }, [cartP]);

    Number(userPID) ? console.log("no data") : console.log("have data");
    return (

        <div className=' pt-32' >
            {loading ? "" : <div>
                <h1 className='text-center text-xl my-2'>Buy All Products <span className='text-purple-700'>{user}</span></h1>
                <p className='text-center text-xl my-2'>Total Amount Rs: {tPrice} </p>
            </div>}
            {
                loading ? <div className='flex justify-center items-center h-screen'><img src={img} className='' /></div> :
                    cartP.map((product, i) => (
                        <div className="lg:px-96">
                            <div className="flex w-100 flex-row justify-between px-2 items-center Montserrat border-2 border-solid border-gray-200">
                                <div className="flex flex-col w-2/3 pr-14">
                                    <h5 className="mb-2 text-1xl lg:text-2xl font-bold Montserrat tracking-tight text-gray-900">{product.name}</h5>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex items-center justify-center text-xl hidden">
                                            Qt:   &nbsp;
                                            <button className='bg-yellow-500 rounded px-2 py-1'
                                            >&#43;</button>
                                            <div className='col'>{product.userqt}</div>
                                            <button className='bg-yellow-500 rounded px-2 py-1'
                                            >&#45;</button>
                                        </div>
                                        <p className="py-1">RS.{product.price}</p>
                                    </div>
                                </div>
                                <div className="w-1/4 overflow-hidden lg:h-64">
                                    <img className="object-cover w-full h-full" src={product.image} alt="" />
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default memo(Cart);