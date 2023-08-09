import React from 'react'

const Footer = () => {
    return (
        <>

            <footer className="bg-gray-100 text-black">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">


                        <a  className="flex items-center mb-4 sm:mb-0">
                            <h1 className='text-black text-2xl'>Shop<span className='text-red-500'>Mart</span> </h1>
                        </a>

                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black">
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 text-black">About</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 text-black">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 hover:underline md:mr-6 text-black">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline text-black">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-black sm:text-center">© 2023 ShopMart. All Rights Reserved.</span>
                </div>
            </footer>



        </>
    )
}

export default Footer