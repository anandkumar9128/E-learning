import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-solid border-[#8a4baf] border-t-transparent'></div>
    </div>
  )
}

export default Loading