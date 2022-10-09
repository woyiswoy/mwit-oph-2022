import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Navbaragram({ search, setSearch }) {
  const router = useRouter()
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    localStorage.setItem('search', event.target.value)
  }
  return (
    <div className='flex fixed justify-center border-b border-gray-300 bg-slate-100/60 backdrop-blur-md'>
      <div className='grid grid-cols-2 md:grid-cols-3 py-2 px-3 w-full max-w-xl'>
        <span className='text-lg font-bold md:col-span-2'>MWITagram</span>
        <div className='justify-self-end relative block border border-gray-400 bg-gray-100 rounded-md w-full'>
          <div className=' absolute pointer-events-none'>
            <span className='sr-only'>Search</span>
            <span className='flex items-center pl-2 py-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </span>
          </div>
          <input
            className='placeholder:italic placeholder:text-slate-400 font-IBMPlexLoop block bg-white w-full border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm'
            placeholder='Search for anything...'
            type='text'
            name='search'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  )
}
