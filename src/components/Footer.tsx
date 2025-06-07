import { Link } from 'react-router'

export const Footer = () => {
  return (
    <footer className='text-white'>
        <div className=''>
            <button 
                className='w-full bg-mediumBlue hover:bg-lightBlue' 
                onClick={()=>{window.scrollTo({top: 0, behavior:'smooth'})}}
            >
                <span className='block p-4 text-center cursor-pointer text-sm'>Back to top</span>
            </button>
            <div className="bg-darkBlue py-8">
                <div className="flex justify-between max-w-[360px] mx-auto mb-3">
                    <Link to="" className="footer_link"><span>Conditions of Use</span></Link>
                    <Link to="" className="footer_link"><span>Privacy Notice</span></Link>
                    <Link to="" className="footer_link"><span>Internet-Based Ads</span></Link>
                </div>
                <p className="text-xs text-center">© 1996-2025, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
    </footer>
  )
}
