import { useDispatch } from "react-redux";
import { CartProduct } from "../reducers/cartSlice";
import { Link } from "react-router";
import { AppDispatch } from "../store";
import { DeleteItemFromCart } from "../thunks/cartThunks";
import UpdateQuantityButton from "./UpdateQuantityButton";

const CartCard = ({item, loading}: {item: CartProduct, loading: boolean}) => {

    const {name, price, imageSrc, quantity, id, delivery, brand} = item;
    const dispatch = useDispatch<AppDispatch>();
    const itemPageLink = name.split(" ").join("-").toLowerCase()+"/"+id;
    return (
        <>
            <div className="flex py-2 pl-2 gap-4">
                <Link to={itemPageLink}>
                    <img src={imageSrc} className="max-h-48 bg-ultraLightGrayMax" alt="" />
                </Link>
                <div className="flex-grow flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <Link to={itemPageLink}>
                            <h2>{name}</h2>
                        </Link>
                        <div className="leading-none font-semibold">
                            <span className="align-super text-xs">$</span>
                            <span className="text-[21px] font-semibold">{String(price).slice(0, -3)}</span>
                            <span className="align-super text-xs">{String(price).slice(-2)}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs text-extraDarkGray">In stock</span>
                    </div>
                    <div className="text-sm">
                        <span>FREE Delivery </span>
                        <span className="font-semibold">{delivery.slice(6)}</span>
                    </div>
                    <div className="text-xs">
                        <input type="checkbox" id={String(id)} className=" h-3.5 aspect-square align-text-bottom cursor-pointer"/>
                        <label htmlFor={String(id)}> This will be a gift </label>
                        <button className="text-linkBlue hover:underline">Learn more</button>
                    </div>

                    {brand &&
                        <div className="text-xs">
                            <span className="font-semibold">Brand: </span>
                            <span>{brand}</span>
                        </div>
                    }

                    <div className="flex mt-auto gap-3 items-center">
                        <div className="h-9 flex-grow max-w-[120px]">
                            <UpdateQuantityButton   
                                quantity={quantity} 
                                itemId={id} 
                                loading={loading}
                            />
                        </div>
                        <span className="text-ultraLightGray">|</span>
                        <button 
                            className="text-sm text-linkBlue hover:underline"
                            onClick={()=>dispatch(DeleteItemFromCart({itemId: id}))}
                            >Delete
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-lightGray border-t"/>
        </> 
    )
}

export default CartCard;