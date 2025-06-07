import { Link } from "react-router";
import { Product } from "../reducers/productSlice"
import { StartRating } from "./StartRating";
import UpdateQuantityButton from "./UpdateQuantityButton";
import { AddToCart } from "../thunks/cartThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

type ProductCardProps = {
    item: Product;
  }

const ProductCard = ({item}: ProductCardProps) => {    
        
    const {id, title, price, discountPercentage: discount, rating, shippingInformation: deliveryBy, availabilityStatus, discountPercentage, thumbnail} = item;

    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState)=> state.cart.loadingById[id]?? false);
    const quantity = useSelector((state: RootState)=> state.cart.items.find(item=> item.id === id))?.quantity ?? 0;
    
    const inStock: boolean = (availabilityStatus === "Out of Stock")? false: true;

    return (
        <div className='h-full flex flex-col border border-ultraLightGrayMax rounded-md'>

            {/* -----THUMBNAIL----- */}
            <Link to={`${title.split(" ").join("-").toLowerCase()}/${id}`}>
                <div className='w-full bg-ultraLightGrayMax aspect-square'>
                    <img src={thumbnail} className='w-full bg-ultraLightGrayMax' alt={title} />
                </div>
            </Link>

        
            <div className="flex flex-col justify-between flex-1 p-3">
                <div>
                    {/* ------TITLE------ */}
                    <Link to={`${title.split(" ").join("-").toLowerCase()}/${id}`}>
                        <span className="text-[20px] font-medium">{title}</span>
                    </Link>
                    {/* -----RATING------ */}
                    <div className='flex items-center mb-3'>
                        <span className='mr-1 text-xs mt-0.5'>{rating}</span>
                    <StartRating rating={rating} size={15}/>
                    </div>
                    {/* ------PRICE----- */}
                    <div>
                        <span className="text-[28px] leading-none font">
                            <span className="text-sm align-super">$</span>
                            {price}
                        </span>
                    </div>
                    {discountPercentage &&
                        <div className="flex">
                            <span className="text-xs text-extraDarkGray mr-1">List Price: <span className="line-through text-sm">{`$${(item.price/ (1 - Number(discount)/100)).toFixed(2)}`}</span>
                            </span>
                            <span className="text-sm">{`(${Number(discount).toFixed(0)}% off)`}</span>
                        </div>
                    }
                    <div className="text-sm mb-5">
                        <span>FREE delivery </span>
                        <span className="font-semibold">{deliveryBy.slice(6)}</span>
                    </div>
                </div>

                {/* -----ADD TO CART BUTTON---- */}
                <div className="h-10 mx-2">
                    {
                        quantity? 
                        <UpdateQuantityButton 
                            loading={loading}
                            quantity={quantity} 
                            itemId={id}
                        />
                        :
                        <button 
                            className={`bg-yellow-300 w-full h-full rounded-full hover:bg-yellow-400 disabled:pointer-events-none 
                                ${inStock? "disabled:bg-yellow-500" : "disabled:bg-ultraLightGray" }`}
                            onClick={()=>{dispatch(AddToCart({item, quantity: 1}))}}
                            disabled={!inStock || loading}
                            >{inStock? "Add to Cart": "Out of Stock"}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductCard