import React from 'react'

const Footer = () => {
  return (
    <footer className='shadow-md p-[20px] text-center bg-[#854baf]'>
        <p className='text-white'>&copy; 2026 E-learning. All rights reserved.
            <br />
            Made with ❤️ by <a href="https://github.com/anandkumar9128/" target='_blank' className='text-white'>Anand</a>
        </p>
        <div className='flex justify-center gap-4 mt-1'>
            <a href="https://instagram.com" target='_blank' rel="noopener noreferrer" className='text-white hover:opacity-80'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://facebook.com" target='_blank' rel="noopener noreferrer" className='text-white hover:opacity-80'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://twitter.com" target='_blank' rel="noopener noreferrer" className='text-white hover:opacity-80'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-8 9-5 2.5 1.7 4 4 4 4z"></path></svg>
            </a>
            <a href="https://github.com/anandkumar9128" target='_blank' rel="noopener noreferrer" className='text-white hover:opacity-80'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6c-1 2.5-5.5 5-7 6m-3.5-7h.01M6 20h.01M2 12a10 10 0 0 1 10-10 10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10z"></path></svg>
            </a>
        </div>

    </footer>
  )
}

export default Footer