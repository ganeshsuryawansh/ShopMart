import React from 'react'

const DesktopViewSkeleton = () => {

    return (
        <div>
            {/***Desktop card Skeleton */}
            <div className="hidden sm:block mx-2 my-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center animate-pulse">
                <div className="flex items-center justify-center w-64 h-72 bg-gray-300 rounded-t-lg"></div> {/* Image skeleton */}
                <div className="p-5">
                    <div className="h-6 bg-gray-300 mb-2 rounded w-3/4"></div> {/* Product title skeleton */}
                    <div className="h-4 bg-gray-300 mb-3 rounded w-1/4"></div> {/* Product price skeleton */}
                    <div className="inline-flex items-center px-3 py-2 mb-2">
                        <div className="bg-yellow-500 h-5 w-20 rounded"></div> {/* Add to cart button skeleton */}
                        <div className="w-3.5 h-3.5 ml-2 bg-gray-300 rounded-full"></div> {/* SVG skeleton */}
                    </div>
                </div>
            </div>

            {/**Mobile Card Skeleton */}


            <div role="status" class="md:hidden block py-2 flex flex-row justify-between px-5 animate-pulse md:space-y-0 md:space-x-8 md:flex ">

                <div class="">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[480px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[440px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[460px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-200 max-w-[360px]"></div>
                </div>
                <div class="flex items-center justify-center mx-2 h-32 w-32 bg-gray-200 rounded sm:w-96 dark:bg-gray-200">
                    <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
                <span class="sr-only">Loading...</span>
            </div>

        </div>

    )
}

export default DesktopViewSkeleton