import React from 'react'

const InvoiceNav = () => {
  return (
    <div className='flex justify-between w-full items-center mt-2 px-5'>
        <div className='text-xl font-bold'>Manage Invoices</div>
        <div className='flex gap-2'>
            <div className='border-2 rounded-full w-fit h-fit p-2 '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="gray" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </div>

            <div className='hidden md:flex md:gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="gray" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <div className='flex flex-col'>
                    <p className=' font-bold'>Parth Mandhare</p>
                    <p className='text-xs'>parthmandhare12@gmai.com</p>
                </div>

            </div>

        </div>
    </div>
  )
}

export default InvoiceNav