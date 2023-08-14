import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase';

const AddnewProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [desc, setDes] = useState("");
    const [brand, setBrand] = useState("");
    const [cate, setCate] = useState("");
    const [Seller, setSeller] = useState("");
    const [pid, setPid] = useState(0);
    const [qt, setQt] = useState(0);
    const [price, setPrice] = useState(0);

    const Handelesubmit = async (e) => {
        e.preventDefault();
        try {

            const userRef = collection(db, 'Products');
            const q3 = query(userRef, where('productid', '==', Number(pid)));
            const checkid = await getDocs(q3);

            if (checkid.empty && pid !== 0) {
                console.log("Data not found");
                const docRef = await addDoc(collection(db, "Products"), {
                    productid: Number(pid),
                    name: name,
                    image: img,
                    category: cate,
                    brand: brand,
                    desc: desc,
                    seller: Seller,
                    price: price,
                    quantity: qt,
                    date: Date()
                })
                if (docRef.id) {
                    navigate("/Adminpanel")
                }
                console.log("Document written with ID: ", docRef.id);
            }
            else {
                console.log("Data found");
                alert("Fiil The Form Data....");
            }


            if (pid === 0) {

            } else {

            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className=' py-64'>
            {
                <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <h1 className='text-black text-2xl'>Shop<span className='text-red-500'>Mart</span></h1>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Add New Product
                                </h1>
                                <form className="space-y-4 md:space-y-6">
                                    <div>
                                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type='name' onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div>
                                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                                        <input type='text' onChange={(e) => setImg(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div>
                                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input type='text' onChange={(e) => setDes(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /><br />
                                    </div>
                                    <div>
                                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                        <input type='text' onChange={(e) => setBrand(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /><br />
                                    </div>
                                    <div>
                                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <input type='text' onChange={(e) => setCate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /><br />
                                    </div>
                                    <div>
                                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seller</label>
                                        <input type='text' onChange={(e) => setSeller(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /><br />
                                    </div>
                                    <div>
                                        <label for="Number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product id</label>
                                        <input type='Number' onChange={(e) => setPid(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /><br />
                                    </div>
                                    <div>
                                        <label for="Number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                        <input type='Number' onChange={(e) => setQt(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /><br />
                                    </div>
                                    <div>
                                        <label for="Number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <input type='Number' onChange={(e) => setPrice(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /><br />
                                    </div>

                                    <button onClick={Handelesubmit} className="w-full text-black bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Product</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }



        </div>
    )
}

export default AddnewProduct