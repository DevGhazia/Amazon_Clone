import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { fetchProductsByCategory } from "../thunks/productThunks";
import { RootState} from "../store";
import { useEffect } from "react"
import { Link } from "react-router";
// import getCloudinaryUrl from "../utils/cloudinary";

interface ProductCardProps{
    cardTitle?: string;
    category: string;
}

export const ProductsCard = ({cardTitle, category}: ProductCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const productsData = useSelector((state: RootState)=> state.product.categoryProducts[category]);
    const quotes = ["More top picks for you", "You might also like", "Explore more", "More items to consider"];
    
    // -----------FETCHING PRODUCTS BY CATEGORY----------
    useEffect(()=>{
        if(!productsData?.isFetched){
            dispatch(fetchProductsByCategory({category: category, limit: 4}));
        }
    },[category]);

    //-----------NULL CHECK---------------
    if(!productsData) return null;

    return (
        <div className="p-5 w-full max-w-[400px] bg-white">
            <h2 className="mb-5">{cardTitle? cardTitle: quotes[Math.floor(Math.random()*4)]}</h2>
            {productsData.items?  
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {productsData.items.slice(0, 4).map((item)=> (
                        <Link to={`${category}/${item.title.split(" ").join("-").toLowerCase()}/${item.id}`} key={item.id}>
                            <div>
                                {/* <img src={getCloudinaryUrl(item.thumbnail, 150)} loading="lazy" className="w-full h-32 object-cover" alt={item.title}/> */}
                                <img src={item.thumbnail} loading="lazy" className="bg-ultraLightGrayMax w-full h-32 object-contain" alt={item.title}/>
                                <div className="truncate">
                                    <span className="text-[13px]">{item.title}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <Link to={`${category}?page=1&sortBy=rating&order=desc`}>
                        <div className="mt-2">
                            <span className="text-sm text-linkBlue">Explore more</span>
                        </div>
                    </Link>
                </div> :
                <div className="w-full max-w-[400px] bg-white">
                    <div className="grid grid-cols-2 gap-5 animate-pulse">
                        {Array.from({length: 4}).map((_, index)=>(
                            <div key={index}>
                                <div className="bg-ultraLightGrayMax w-full h-36"></div>
                                <div className="h-4 mt-1 bg-ultraLightGray"></div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    ) 
}