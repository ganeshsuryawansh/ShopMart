import React, { useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db } from '../Firebase';

const Addproduct = () => {

    const [prd, setprd] = useState([
        {
          image: "https://rukminim2.flixcart.com/image/416/416/l2p23rk0/mobile/x/b/y/-original-imagdznhnzmzfbwx.jpeg?q=70",
          name: "vivo T1 44W (Midnight Galaxy, 128 GB)  (4 GB RAM)",
          desc: "Enjoy gaming thrills and capture your memorable moments with the Vivo T1 smartphone. This mobile phone is driven by a Snapdragon 680 processor so that you can get speeded up performance on this phone. Also, it comes with a 50 MP high-definition camera so that you can click sharp details even in low light conditions. And, thanks to the Funtouch OS 12, you can enjoy a smooth user experience.",
          category: "phone",
          price: 14499,
          productid:2,
          quantity:100,
          seller:"vivo india"
        },
        {
          image: 'https://rukminim2.flixcart.com/image/416/416/kyeqjrk0/mobile/y/u/t/-original-imagan9qzdf2hbgy.jpeg?q=70',
          name: 'REDMI Note 10S (Deep Sea Blue, 64 GB)  (6 GB RAM)',
          desc: 'Unleash the gaming enthusiasm in you with the powerful Redmi Note 10s smartphone. This mobile phone features a 16.33 cm (6.42) Super AMOLED display to ensure a smooth viewing and gaming experience. Also, it is driven by an efficient Helio G95 processor and HyperEngine Game Technology that lets you enjoy stellar performance and seamless gaming.',
          category: 'phone',
          price: 14990,
          productid:3,
          quantity:100,
          seller:"Redmi india"
        },
        {
          image: 'https://rukminim1.flixcart.com/image/300/300/l51d30w0/shoe/z/w/c/10-mrj1914-10-aadi-white-black-red-original-imagft9k9hydnfjp.jpeg?q=70',
          name: 'TRQ White Shoes',
          category: 'Shoes',
          seller: 'AMZ Seller Ghz',
          price: 1999,
          productid:4,
          quantity:100,
        },
        {
          image: 'https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg',
          name: 'LOREM Watch Black',
          category: 'Watches',
          seller: 'Watch Ltd Siyana',
          price: 2599,
          productid:5,
          quantity:100,
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq39iB_cO6uhZ59vubrqVuYTJQH-4Qa0hU9g&usqp=CAU',
          name: 'AMZ Laptop 8GB RAM',
          category: 'Laptops',
          seller: 'Delhi Laptops',
          price: 50000,
          productid:6,
          quantity:100,
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfvoDzLqrT7GwU3z7Ccp0Cl9rV0ZnU9DcmEg&usqp=CAU',
          name: 'Security Camera',
          category: 'CCTV',
          seller: 'Camron LTD',
          price: 4000,
          productid:7,
          quantity:100,
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG9e8Axt-h9q8EIybKfjGzbkIWJAr50_BX7Q&usqp=CAU',
          name: 'Watch Pink',
          category: 'Watches',
          seller: 'Watch Ltd',
          price: 2000,
          productid:8,
          quantity:100,
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xzgtOpMxdpfgBOg3OKsEqYRkNBbuprJj4w&usqp=CAU',
          name: 'Cup red Color',
          category: 'Cup',
          seller: 'ABS Ltd',
          price: 100,
          productid:9,
          quantity:100,
        },
        {
          image: '#',
          name: '#',
          category: '#',
          seller: '#',
          price: 15000,
          productid:10,
          quantity:100,
        },
      ])
    try {

        var docRef ;

        for(let i=1;i<prd.length;i++){
            docRef= addDoc(collection(db, "Products"), prd[i]);
        }

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return (
        <div>

        </div>
    )
}

export default Addproduct