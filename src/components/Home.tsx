import { AppDispatch } from "../store";
import { useDispatch } from "react-redux"
import { signOutUser } from "../thunks/authThunks";
import { useState } from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import main_bg_1 from "../assets/dashboard_bg1.jpg"
import main_bg_2 from "../assets/dashboard_bg2.jpg"
import main_bg_3 from "../assets/dashboard_bg3.jpg"
import main_bg_4 from "../assets/dashboard_bg4.jpg"
import { ProductsCard } from "./ProductsCard";

const bannerImages = [main_bg_1, main_bg_2, main_bg_3, main_bg_4];

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [bannerIndex, setBannerIndex] = useState(0);

    // useEffect(()=>{
    //     const bannerTimer = setInterval(() => {
    //         handleNextBanner(); 
    //     }, 5000); 
    //     return ()=> clearInterval(bannerTimer);
    // },[bannerIndex]);

    function handleNextBanner(){
        setBannerIndex((prev: number)=> (prev === bannerImages.length - 1)? 0 : prev + 1);
    }

    function handlePrviousBanner(){
        setBannerIndex((prev: number)=> (prev === 0)? bannerImages.length - 1 : prev - 1);
    }

    return (
        <div className="w-full flex justify-center bg-ultraLightGray">
            <section className=" bg-ultraLightGray min-h-screen max-w-[1500px]">
                <div className="relative text-black">
                    <div className="absolute h-full w-16 left-0 top-0 flex justify-center items-center cursor-pointer">
                        <ArrowBackIosOutlinedIcon onClick={handlePrviousBanner} fontSize="large"/>
                    </div>

                    <div className="max-h-[250px] relative before:content-[''] before:m-0 before:inset-0 before:top-[250px] before:h-[150px] before:absolute before:bg-[linear-gradient(-180deg,_rgba(234,237,237,0),_#E3E6E6)]">
                        <img src={bannerImages[bannerIndex]} className="object-cover max-h-[400px] w-full object-top" alt="background image" />
                    </div>
                    <div className="absolute h-full w-16 right-0 top-0 flex justify-center items-center cursor-pointer z-20">
                        <ArrowForwardIosOutlinedIcon onClick={handleNextBanner} fontSize="large"/>
                    </div>
                </div>
                <section className="relative">
                    <div className="grid grid-cols-3 gap-5 p-5 [@media(min-width:1300px)]:grid-cols-4">
                        <ProductsCard cardTitle="Pick where you left off" category="womens-bags"/>
                        <ProductsCard cardTitle="Keep shopping for" category="home-decoration"/>
                        <ProductsCard cardTitle="Continue shopping deals" category="mens-watches"/>
                        <ProductsCard cardTitle="More items to consider" category="sunglasses"/>
                        <ProductsCard cardTitle="Explore more" category="laptops"/>
                        <ProductsCard cardTitle="You might also like" category="sports-accessories"/>
                        <ProductsCard cardTitle="More items to consider" category="womens-shoes"/>
                    </div>
                </section>
            <button onClick={()=>{dispatch(signOutUser())}}>LogOut</button>
            </section>
        </div>
    )
}

export default Home