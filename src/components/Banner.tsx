import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import main_bg_1 from "../assets/dashboard_bg1.jpg"
import main_bg_2 from "../assets/dashboard_bg2.jpg"
import main_bg_3 from "../assets/dashboard_bg3.jpg"
import main_bg_4 from "../assets/dashboard_bg4.jpg"
import { useState, useEffect } from "react";

const Banner = () => {
    const [bannerIndex, setBannerIndex] = useState(0);
    const bannerImages = [main_bg_1, main_bg_2, main_bg_3, main_bg_4];

    useEffect(()=>{
        const bannerTimer = setInterval(() => {
            GoNext(); 
        }, 5000); 
        return ()=> clearInterval(bannerTimer);
    },[bannerIndex]);

    function GoNext(){
        setBannerIndex(bannerIndex === bannerImages.length - 1? 0 : bannerIndex + 1 );
    }

    function GoBack(){
        setBannerIndex(bannerIndex === 0? bannerImages.length - 1 : bannerIndex - 1 );
    }

    return (
        <div className="relative text-black">
            <div className="absolute h-full w-16 left-0 top-0 flex justify-center items-center cursor-pointer z-20">
                <ArrowBackIosOutlined onClick={GoBack} fontSize="large"/>
            </div>
            <div className="max-h-[250px] relative before:content-[''] before:m-0 before:inset-0 before:top-[250px] before:h-[150px] before:absolute before:bg-[linear-gradient(-180deg,_rgba(234,237,237,0),_#E3E6E6)]">
                <img src={bannerImages[bannerIndex]} className="object-cover max-h-[400px] w-full object-top" alt="background image" />
            </div>
            <div className="absolute h-full w-16 right-0 top-0 flex justify-center items-center cursor-pointer z-20">
                <ArrowForwardIosOutlined onClick={GoNext} fontSize="large"/>
            </div>
        </div>
    )
}

export default Banner