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
                            <Link to={`/Cart`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>

                            </Link>
                        </li>
                        <li className='mx-2 '>

                            {data ? <Link className='hidden sm:block bg-yellow-500 px-3 pb-1 rounded-xl' to={`/profile/${data}`}>
                                {data}
                            </Link> : ""}
                            {data ? <Link className='block sm:hidden ' to={`/profile/${data}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                </svg>
                            </Link> : ""}
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Header