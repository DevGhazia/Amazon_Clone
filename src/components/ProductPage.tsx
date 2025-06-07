import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { fetchProductDescriptionAndReviews, fetchSingleProduct } from "../thunks/productThunks";
import { StartRating } from "./StartRating";
import { KeyboardArrowDown } from "@mui/icons-material";
import Review from "./Review";
import { useNavigate, useParams } from "react-router";
import { clearProduct } from "../reducers/productSlice";
// import getCloudinaryUrl from "../utils/cloudinary";
import { AddToCart } from "../thunks/cartThunks";

export const ProductPage = () => {
    const {itemId} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { singleProduct, allCategoryDetails } = useSelector((state: RootState)=> state.product)
    const items = useSelector((state: RootState)=> state.cart.items);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [itemCount, setItemCount] = useState<number>(1);
    const reviewRef = useRef<HTMLDivElement>(null);
    const [imgLoading, setImgLoading] = useState(true);
    const navigate = useNavigate();

    // ------------ FETCHING -----------
    useEffect(()=>{
        if(itemId){
            dispatch(fetchSingleProduct(itemId));
        }
        if(!allCategoryDetails){
            dispatch(fetchProductDescriptionAndReviews());
        }
        return ()=>{dispatch(clearProduct())};    
    }, [itemId, dispatch]);
    
    // ---------- NULL CHECK -------------
    if( !singleProduct || !allCategoryDetails){
        return <div className="relative min-h-screen "></div>
    }
    
    // --------- INITIALIZE VARIABLES --------
    const {title, price, images, discountPercentage: discount, rating, description, brand, weight, dimensions, shippingInformation, returnPolicy, warrantyInformation, availabilityStatus, stock, category } = singleProduct;
    const {reviews, features} = allCategoryDetails[category];

    function checkStockAvailability(): boolean{
        return (availabilityStatus === "Out of Stock")? true : false
    }

    function IsItemInCart(): boolean{
        return items.some(item=> item.id === Number(itemId));
    }

    function HandleBuyNowClick(){
        if(!singleProduct) return;
        if(!IsItemInCart())
            dispatch(AddToCart({item: singleProduct, quantity: itemCount}));
        navigate("/app/cart");
    }

    return (
        <div className="px-6 text-sm max-w-[1500px]">
            <div className="flex gap-6 mb-5">

                {/* SIDE IMAGES */}
                <div className="flex py-6 gap-4 sticky h-fit w-full max-w-[550px] max-h-[550px] top-0">
                    <div className="flex flex-col gap-2">
                        {[...Array(images.length)].map((_, index) => (
                            <button key={index} 
                                onMouseEnter={()=>{setCurrentImageIndex(index)}} 
                                className={`w-11 h-11 border-linkBlue rounded-lg cursor-pointer ${(index === currentImageIndex)? "border-[3px]": "border"} hover:border-[3px]`}>
                                {<img 
                                    src={images[index]}
                                    // src={getCloudinaryUrl(images[index], 500)} 
                                    loading="lazy" 
                                    fetchPriority="low" 
                                    className="w-full h-full object-contain" 
                                    alt={`Product image ${index}`}
                                />}
                            </button>
                        ))}
                    </div>
                    <div className="relative border-2 aspect-square w-full rounded-xl">
                        {imgLoading && <div className="absolute inset-0 bg-ultraLightGray animate-pulse" />}
                        {<img 
                            onLoad={()=>{setImgLoading(false)}} 
                            fetchPriority="high" 
                            className={`${imgLoading? "opacity-0" : "opacity-100"} h-full w-full object-contain`} 
                            // src={getCloudinaryUrl(images[currentImageIndex], 500)} 
                            src={images[currentImageIndex]}
                            alt={title} 
                        />}
                    </div>
                </div>
                <div className="flex flex-col py-6">
                    <div className="flex gap-6 max-w-[1500px]">

                    {/* -------- MAIN CARD --------- */}
                        <div>
                            {/* -----------TITLE------------ */}
                            <h1 className="mb-1">{title}</h1>
                            { brand && <div><span className="text-linkBlue">{`Visit the ${brand} store`}</span></div>}
                            <div className="flex items-center mb-1 cursor-pointer" onClick={()=>{reviewRef.current?.scrollIntoView({behavior: "smooth"})}}>
                                <span className="mr-1 mt-0.5 leading-none">{rating}</span>
                                <StartRating rating={rating} size={18}/>
                                <span className="mr-2 ml-2">|</span>
                                <span className="text-linkBlue" >{allCategoryDetails[category]?.reviews.length} reviews</span>
                            </div>
                            
                            <hr className="border-lightGray mb-3"/>
                            
                            {/* ------------PRICE & DETAILS-------------- */}
                            <div className="leading-none">
                                {discount && <span className="text-2xl text-red-600">-{discount}% </span>}
                                <span className="text-[28px] text-green-700 font">
                                    <span className="text-sm align-super">$</span>
                                    {price}
                                </span>
                            </div>
                            <div>
                                {discount &&
                                    <span className="text-xs text-extraDarkGray">List Price: $
                                        <span className="line-through">{(price/ (1 - Number(discount)/100)).toFixed(2)}</span>
                                    </span>
                                }
                            </div>
                            <div className="mt-2"><span>Inclusive of all taxes</span></div>
                            <table className="table-auto border-separate border-spacing-y-1 w-full">
                                <tbody className="">
                                    { brand &&
                                    <tr>
                                        <td className="font-bold">Brand</td>
                                        <td>{brand}</td>
                                    </tr>}
                                    <tr>
                                        <td className="font-bold">Weight</td>
                                        <td>{weight} ounces</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Prodcut Dimensions</td>
                                        <td>{`${dimensions.depth.toFixed(1)}D × ${dimensions.width.toFixed(1)}W × ${dimensions.height.toFixed(1)}H Centimeters`}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold">Warranty</td>
                                        <td>{warrantyInformation}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="border-ultraLightGray mb-3"/>
                            <h3 className="mb-1">About this item</h3>
                            <p>{description}</p>
                            <ul className="list-disc pt-1 pl-3">
                                {features && features.map((des, index)=>(
                                    <li className="py-1" key={index}>{des}</li>
                                ))}
                            </ul>
                            <p className="py-1">Lorem ipsum dolor sit amet, adipiscing elit. Nunc sed iaculis dolor, in consequat tortor. Morbi feugiat, leo ultrices viverra efficitur, tortor orci euismod leo, ac euismod dui turpis id odio. Cras massa nisl, laoreet eget tristique eget, feugiat eget purus. Pellentesque quis efficitur lorem. Vestibulum ornare pharetra nulla. Nullam at felis semper orci pharetra euismod. Fusce at imperdiet augue, at bibendum felis. Phasellus eu nulla nunc. Maecenas nisi odio, tincidunt vitae commodo eu, posuere in lectus. Nulla sed orci gravida, vehicula purus id, elementum metus. Maecenas tincidunt pretium felis, feugiat luctus sapien aliquam a.</p>
                            <p className="py-1">Maecenas finibus ornare lorem et vehicula. Cras cursus mauris eget risus eleifend, vel consequat turpis vehicula. Aenean rhoncus tellus eu quam tincidunt malesuada. Vivamus iaculis lobortis ligula, quis suscipit mi placerat a. Duis tempor orci elit, in ornare eros hendrerit at. Nam a nibh a tortor aliquam blandit. Praesent mauris elit, tincidunt non urna sit amet, vehicula ultrices erat. Suspendisse sem erat, iaculis in nibh sed, pulvinar euismod leo. Curabitur facilisis bibendum nisl, vel sollicitudin velit varius sed. Donec sodales, leo at finibus ullamcorper, ex risus facilisis arcu, non convallis est libero sed purus. Nullam eros sapien, tincidunt id mauris in, vehicula viverra nulla. Morbi rutrum nec arcu eu laoreet. Sed pulvinar leo dui, ac ornare neque interdum in. Mauris quis porta tortor.</p>
                        </div>

                        {/* -------SIDE CARD------ */}
                        <div className="p-4 min-w-[240px] h-min border border-lightGray rounded-lg">
                            <div>
                                <span className="text-[28px] text-green-700 ">
                                    <span className="text-sm align-super">$</span>
                                    {price}
                                </span>
                            </div>
                            <div className="my-2">
                                <span>FREE delivery </span>
                                <span className="font-semibold">{shippingInformation.slice(6)}</span>
                            </div>
                            <div className="pb-2"><span className="text-green-700 text-lg">{availabilityStatus}</span></div>
                            {/* QAUNTITY DROPDOWN */}
                            <div className="relative mb-3">
                                <select 
                                    onChange={(e)=>setItemCount(Number(e.target.value))} 
                                    value={itemCount} 
                                    disabled={checkStockAvailability() || IsItemInCart()}
                                    className="w-full bg-ultraLightGrayMax hover:bg-ultraLightGray text-transparent py-1 border-2 rounded-xl cursor-pointer appearance-none disabled:pointer-events-none">
                                    {[...Array(Math.min(Number(stock), 10))].map((_, index)=>(
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                                <div className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none">Quantity: {itemCount}</div>
                                <div className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none">
                                    <KeyboardArrowDown fontSize="small"/>
                                </div>
                            </div>
                            {/* ADD TO CART BUTTON */}
                            <button className="login_button bg-yellow-300 hover:bg-yellow-400 mb-2 disabled:bg-ultraLightGray" disabled={checkStockAvailability() || IsItemInCart()}>
                                {IsItemInCart()? "Already in Cart": "Add to Cart"}
                            </button>
                            {/* BUY NOW BUTTON */}
                            <button 
                                className="login_button bg-darkOrange hover:bg-darkOrangeHover mb-4 disabled:bg-ultraLightGray" 
                                disabled={checkStockAvailability()}
                                onClick={HandleBuyNowClick}
                                >Buy Now
                            </button>
                            <table className="table-auto border-separate text-xs border-spacing-y-1 w-full">
                                <tbody>
                                    <tr>
                                        <td className="text-extraDarkGray">Ships from</td>
                                        <td className="">Amazon.com</td>
                                    </tr>
                                    <tr>
                                        <td className="text-extraDarkGray">Sold by</td>
                                        <td className="">Amazon.com</td>
                                    </tr>
                                    <tr>
                                        <td className="text-extraDarkGray">Returns</td>
                                        <td className="text-linkBlue">{returnPolicy}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-extraDarkGray">Payment</td>
                                        <td className="text-linkBlue">Secure transaction</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr className="border-ultraLightGray mt-4"/>
                    <div>
                        <h3 className="py-4" ref={reviewRef}>Ratings and Reviews</h3>
                        {reviews.map((review, index)=>(
                            <Review 
                                key={index}
                                userName={review.user}
                                rating={review.rating}
                                date={review.date}
                                comment={review.comment}
                            />
                        ))}
                    </div>
                </div>
            </div>  
        </div>
    )
}
