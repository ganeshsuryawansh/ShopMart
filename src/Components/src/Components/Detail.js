import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { doc, getDoc } from "firebase/firestore";
import ReactStars from "react-stars";
import { Link } from 'react-router-dom';
import Payment from './Payment';
import img from './Static/Cart-empty.gif';
import { collection, getDocs } from "firebase/firestore";
import { addDoc, query, where } from "firebase/firestore";
import DetailSkeleton from './DetailSkeleton';


const Detail = () => {
  let user = sessionStorage.getItem("email");
  const { productid } = useParams();
  sessionStorage.setItem("productid", productid);
  const [data, setData] = useState({
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
  console.log(data);
  console.log("useParams " + productid);

  //fetch product from db
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "Products", productid || Number(productid));
      const _data = await getDoc(_doc);

      if (_data.exists()) {
        setData(_data.data());
        setLoading(false)

      } else {
        console.log('No such document!');
        setLoading(true);
      }
    }
    if (productid) {
      getData();
    }
  }, [productid]); // add productid as a dependency


  //add new product to cart db
  const addProductToCart = async (pid) => {
    try {
      const cartRef = collection(db, 'Cart');
      const q2 = query(cartRef, where('token', '==', pid + "_" + user));

      const querySnapshot = await getDocs(q2);
      if (querySnapshot.empty) {
        // Product is not in the cart for the user, add it
        const docRef = await addDoc(collection(db, "Cart"), {
          productid: pid,
          userid: user,
          token: pid + "_" + user,
          userqt: 1
        });
        console.log("Document added with ID: ", docRef.id);
      } else {
        console.log("Data Exists in Db...");
      }
    } catch (error) {
      console.error("Error in addProductToCart: ", error);
    }
  };

  const AddNewCart = (p) => {
    addProductToCart(p);
  }
  // Use the data in your component
  return (
    <div className='py-32 sm:mx-24'>
      {loading ?
        <DetailSkeleton />
        : <div className='flex justify-center items-center sm:flex-row flex-col px-2 rounded-xl'>
          <div className="flex justify-center items-center ">
            <img className="rounded-lg h-64 w-52 sm:w-full sm:h-full" src={data.image} alt="" />
          </div>
          <div className='sm:pl-32'>
            <h1 className='text-2xl'>{data.name} </h1>
            <h3 className='text-xl'> ₹{data.price}</h3>
            <ReactStars
              count={5}
              value={3.5}
              size={24}
              color2={"#ffd700"} // color of filled stars
              edit={false} // if you want to make the stars read-only
            />
            <h4 className=''>{data.desc}</h4>
            <span className='flex flex-row mt-10'>
              <p className='bg-green-500 w-fit px-2 rounded-lg mr-2'>{data.seller}</p>
              <p className='bg-yellow-500 w-fit px-2 rounded-lg'>Qt: {data.quantity}</p>
            </span>
            <p className='text-blue-500'>Free Delivery</p>
            <span className='flex flex-row'>
              <button onClick={() => { AddNewCart(data.productid) }} className='bg-orange-400 px-4 py-3 mx-1 rounded'><Link to={`/Cart`}>Add To Cart</Link></button>

              {user ? <button className='bg-yellow-500 px-4 py-3 mx-1 rounded'><Link to={`/pay/${data.price}`}>Buy Now</Link></button> : <button className='bg-yellow-500 px-2 mx-1 rounded'><Link to={`/login`}>Buy Now</Link></button>}
            </span>
          </div>

        </div>}
    </div>
  )


}

export default Detail;
