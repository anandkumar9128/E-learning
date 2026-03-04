import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const PaymentSuccess = ({user}) => {
    const params=useParams()
  return (
    <div className='flex justify-center items-center h-[75vh] bg-[#f5f5f5]'>
        {user && <div className='bg-white p-[30px] border rounded-[10px] shadow-md text-center w-[300]px '>
            <h2 className='text-[24px] text-[#8a4baf] mb-[15px]'>Payment successful</h2>
            <p className='text-[16px] text-[#333] mb-[20px]'>Your course subscription has activated.</p>
            <p className='text-[16px] text-[#333] mb-[20px]'>Reference ID : {params.id}</p>
            <Link to={`/${user._id}/dashboard`} className='bg-[#8a4baf] mt-[20px] px-[20px] py-[10px] text-white border-none rounded-[4px] cursor-pointer hover:bg-[#5f3575] transition-all duration-300'>Got to Dashboard</Link>
        </div>}
    </div>
  )
}

export default PaymentSuccess