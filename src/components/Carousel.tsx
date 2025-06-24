import { AppDispatch, RootState } from "../store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../thunks/productThunks";
import { Link } from "react-router";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

interface CarouselProps{
    category: string;
}

const Carousel = ({category}: CarouselProps) => {
    const productData = useSelector((state: RootState)=>state.product.categoryProducts[category]);
    const dispatch = useDispatch<AppDispatch>();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(!productData?.isFetched){
            dispatch(fetchProductsByCategory({category: category}));
        }
        console.log(productData);
    },[category]);

    function ScrollSlider(direction: string){
        const sliderWitdth = window.innerWidth - 40;
        if(scrollRef.current){
            scrollRef.current.scrollBy({left: direction === "left"? -sliderWitdth : sliderWitdth, behavior: "smooth"})
        }
    }

    // NULL CHECK
    if(!productData) return null;

    return (
        <div className="px-5 pt-5 pb-2 bg-white">
            <div className="flex gap-5 mb-5 items-end">
                <h2>
                    {`Explore more in ${category}`}
                </h2>
                <Link to={`${category}?page=1&sortBy=rating&order=desc`}>
                    <span className="text-sm text-linkBlue">See more</span>
                </Link>
            </div>
            <div className="group relative">
                {productData.items?
                    <div ref={scrollRef} className="flex pb-2 gap-2 h-full scrollbar-hover overflow-x-auto">
                        <button 
                            className="border-y-2 border-r-2 border-ultraLightGray rounded-r-md absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={()=>ScrollSlider("left")}>
                            <ArrowBackIosOutlined className="text-someWhatDarkGray"/>
                        </button>
                        {productData.items.map((item, index)=>(
                            <Link 
                                to={`${category}/${item.title.split(" ").join("-").toLowerCase()}/${item.id}`} 
                                className="flex-shrink-0"
                                key={index}>
                                <div className="h-full bg-ultraLightGrayMax">
                                    <img className="h-[200px] w-auto" src={item.thumbnail} alt="" />
                                </div>
                            </Link>
                        ))
                        } 
                        <button 
                            className="border-y-2 border-l-2 border-ultraLightGray rounded-l-md absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={()=>ScrollSlider("right")}>
                            <ArrowForwardIosOutlined className="text-someWhatDarkGray"/>
                        </button>
                    </div>  
                    :
                    <div>loading...</div>
                }
            </div>
        </div>
    )
}

export default Carousel;