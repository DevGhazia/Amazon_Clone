import { Header } from './Header'
import { Footer } from './Footer'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const HomePageLayout = () => {
  const {displayName} = useSelector((state: RootState)=> state.auth.user);
  return (
    <div className='min-w-[1032px] min-h-screen flex flex-col'>
        <Header username={displayName}/>
        <div className='flex w-full justify-center z-50'>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default HomePageLayout