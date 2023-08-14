import React from 'react'

const CartSkeleton = () => {
    return (
        <div className="lg:px-96 animate-pulse">
            <div className="rounded-2xl my-2 flex w-100 flex-row justify-between px-2 items-center Montserrat border-2 border-solid border-gray-200 bg-gray-200">
                <div className="flex flex-col w-2/3 pr-14">
                    {/* Placeholder for the product name */}
                    <div className="mb-2 h-5 bg-gray-300 rounded w-3/4"></div>
                    {/* Placeholder for the product description */}
                    <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>

                    {/* Placeholder for the price */}
                    <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>

                    {/* Placeholder for the "Remove From Cart" button */}
                    <div className="h-6 bg-yellow-300 rounded w-2/3"></div>
                </div>

                {/* Placeholder for the product image */}
                <div className="w-1/4 overflow-hidden lg:h-64 bg-gray-300"></div>
            </div>
        </div>
    )
}

export default CartSkeleton