import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    let data = sessionStorage.getItem("email");

    return (
        <div>
            <div className='flex flex-row justify-between bg-gray-100 text-black py-2 px-5 fixed top-0 left-0 right-0'>
                <div>
                    <i>
                        <Link to={"/ShoppingSide"}>
                            <h1 className=' text-2xl'>Shop<span className='text-red-500'>Mart</span></h1>
                        </Link>
                    </i>
                </div>
                <div className='' >
                    <ul className='flex flex-row'>

                        <li className='mx-2'>
                            {
                                data ? "" : <Link to={"/login"}>Login</Link>
                            }
                        </li>
                        <li className='mx-2'>
                            {
                                data ? "" : <Link to={"/Signup"}>Signup</Link>
                            }                        </li>

                        <li className='mx-2'>
                            <Link to={`/Cart/100`}>
                                Cart
                            </Link>
                        </li>
                        <li className='mx-2 '>

                            {data?<Link className='bg-yellow-500 px-3 pb-1 rounded-xl' to={`/profile/${data}`}>
                                {data}
                            </Link>:""}
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Header