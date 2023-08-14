import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner'
import { addDoc, query, where } from "firebase/firestore";
import img from './Static/Cart-empty.gif';
import DesktopViewSkeleton from './DesktopViewSkeleton';


const ShoppingSide = () => {
  let user = sessionStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const [allproduct, setProducts] = useState([]);//all product list
  const [category, setCategory] = useState(null);//current category state
  const [brand, setBrandname] = useState([]);// all brand name list
  const [fbrand, setFbrand] = useState(null);//brand name which want to fetch.
  console.log(fbrand);

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  const handleBrand = (event) => {
    setFbrand(event.target.value);
  }

  const handleCate = (event) => {
    setCategory("");
  }

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

  //fetch all data and category wise data.
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let querySnapshot;
        if (category) {
          console.log("second if");
          // If only category is set
          querySnapshot = await getDocs(query(
            collection(db, "Products"),
            where("category", "==", category)
          ));
        } else if (fbrand) {
          console.log("third if");
          // If only brand is set
          querySnapshot = await getDocs(query(
            collection(db, "Products"),
            where("brand", "==", fbrand)
          ));
        } else {
          console.log("else");
          // If neither are set
          querySnapshot = await getDocs(collection(db, "Products"));
        }

        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.log("Error getting documents: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [category, fbrand]); // <-- Update this line



  //fetch category wise brands
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "Brands"), where('category', '==', category)))
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBrandname(productsData);

        setLoading(false);
      } catch (error) {
        console.log("Error getting documents: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [category])



  return (
    <>
      <div className='flex flex-col sm:flex-row h-screen sm:overflow-hidden '>

        {/* sidebar */}
        <div className='bg-gray-200 pt-16 sm:w-1/4 flex flex-row sm:flex-col sm:sticky sm:overflow-auto sm:top-0 sm:h-full'>
          <div className=''>
            <form className='block sm:hidden focus:outline-none px-2'>
              <select value={category} onChange={handleChange}>
                <option value="Shoes">Shoes</option>
                <option value="Watches">Watches</option>
                <option value="Laptops">Laptops</option>
                <option value="CCTV">CCTV</option>
                <option value="phone">Phone</option>
                <option value="Kitchen">Kitchen</option>
                <option value="">Reset All</option>
              </select>
            </form>
          </div>

          <h1 className='text-center text-xl hidden sm:block'>Filters</h1>
          <div className='hidden sm:block overflow-auto'>
            <div className='bg-gray-200 rounded py-10'>
              <button className='bg-yellow-500 px-1 rounded mx-2 my-1' onClick={(p) => { setCategory("Shoes") }}>Shoes</button>
              <button className='bg-yellow-500 px-1 rounded mx-2 my-1' onClick={(p) => { setCategory("Watches") }}>Watches</button>
              <button className='bg-yellow-500 px-1 rounded mx-2 my-1' onClick={(p) => { setCategory("Laptops") }}>Laptops</button>
              <button className='bg-yellow-500 px-1 rounded mx-2 my-1' onClick={(p) => { setCategory("CCTV") }}>CCTV</button>
              <button className='bg-yellow-500 px-1 rounded mx-2 my-1' onClick={(p) => { setCategory("phone") }}>Phone</button>
              <button className='bg-yellow-500 px-1 rounded mx-2 my-1' onClick={(p) => { setCategory("Kitchen") }}>Kitchen</button>
              <button className='bg-yellow-500 px-1 rounded mx-2 mt-2' onClick={(p) => { setCategory(""); setFbrand("") }}>
                Reset
              </button>
            </div>


          </div>

          {brand ? <h1 className='text-center text-xl hidden '>Top Brands</h1> : ""}
          <div className='px-5 hidden '>
            {//brands filter
              brand && brand.map((b) => {
                return <>
                  <button className='bg-gray-300 px-1 rounded mx-2 my-1' value={b.bname} onClick={() => { setFbrand(b.bname); setCategory("") }}>
                    <div className=''>
                      <img src={b.img} className='object-cover w-full h-full' />
                    </div>
                  </button>
                </>
              })
            }

          </div>
          <form className='block sm:hidden focus:outline-none px-2'>
            <select value={fbrand} onChange={handleBrand}>
              {
                brand && brand.map((b) => {
                  return <>
                    <option value={b.bname} onClick={() => { setFbrand(b.bname); setCategory("") }} >{b.bname}</option>
                  </>
                })
              }
              <option value="">Reset All</option>
            </select>
          </form>
        </div>

        {/*main content */}
        <div className='flex flex-wrap sm:pt-16 items-center justify-center sm:px-20 sm:w-3/4 overflow-auto'>
          {loading ? "" : ""}


          {loading ? (
            <>

              {Array(20).fill(null).map((_, idx) => (
                <DesktopViewSkeleton key={idx} />
              ))}
            </>
          ) : ""}
          {loading ? "" : allproduct.map((product) => (
            <div key={product.id} className=''>
              {/** desktop view */}
              <div className="hidden sm:block  mx-2 my-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center">
                <Link to={`/Detail/${product.id}`}>
                  <div className="flex items-center justify-center w-64 h-72">
                    <img className="rounded-t-lg object-cover w-full h-full" src={product.image} alt="" />
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/Detail/${product.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name.slice(0, 15)}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">RS.{product.price}</p>
                  </Link>
                  <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:hover:bg-yellow-700 dark:focus:ring-blue-800">
                    <button onClick={() => { AddNewCart(product.productid) }} className=''>Add To Cart</button>

                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </a>
                </div>
              </div>
              {/** mobile view */}
              <div className="lg:px-64 flex sm:hidden px-2 border-2 border-solid border-gray-200">
                <div className="flex w-100 flex-row justify-between items-center  my-2 rounded Montserrat">
                  <div className="flex flex-col w-2/3 pr-14">
                    <Link to={`/Detail/${product.id}`}>
                      <h5 className="mb-2 text-1xl lg:text-4xl font-bold Montserrat tracking-tight text-gray-900">{product.name}</h5>
                    </Link>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row justify-between">
                        <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center">
                          <button onClick={() => { AddNewCart(product.productid) }} className='bg-yellow-300 rounded px-1'>Add To Cart</button>
                        </a>
                        <p className="pt-3 px-1">RS.{product.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/4 overflow-hidden lg:h-64">
                    <Link to={`/Detail/${product.id}`}>
                      <img className="object-cover w-full h-full" src={product.image} alt="" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          ))}
        </div>

      </div>

    </>
  )
}

export default ShoppingSide;
