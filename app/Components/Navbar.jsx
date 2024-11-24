"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [show, setShow] = useState(true);
    
    const router = useRouter()

    
  return (
    <>
        {
            show ? <aside className="w-64 h-screen bg-gray-100 hidden md:flex md:flex-col">
            <div className="p-4 flex justify-between mr-2">
              <p className='text-3xl font-bold'>finifi</p>
              <button onClick={() => {setShow(false)}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
             </svg>
              </button>


            </div>
            <nav className="mt-4">
              <ul>
                <li className="py-2 px-4 hover:bg-gray-200  cursor-pointer" onClick={() => router.push('/dashboard')}>Dashboard</li>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => router.push('/invoices')}>Invoices</li>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => router.push('/layout')}>Vendors</li>
                <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => router.push('/settings')}>Settings</li>
              </ul>
            </nav>
          </aside>  : <>
          <div id="ifNot" className="hidden md:flex h-screen justify-center items-center bg-gray-200 px-5" onClick={() => { setShow(true) }}>
            <button className="text-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
            </button>
          </div>
          </>
        }
    </>
  )
}

export default Navbar