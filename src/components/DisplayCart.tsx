import { useSelector } from "react-redux"
import { RootState } from "../store"
import CartCart from "./CartCart";

const DisplayCart = () => {
    const items = useSelector((state: RootState)=> state.cart.items);
    const loading = useSelector((state: RootState)=> state.cart.loadingById)
    const subtotal = items.reduce((sum, item) => {return sum + item.price * item.quantity;}, 0);

    return (
        <div className="w-full flex min-h-screen justify-center p-5 gap-5">
            <div className="flex-grow p-4 max-w-[800px] h-fit border border-lightGray rounded-lg">
                <span className="text-[28px] font-medium">Shopping Cart</span>
                <div className="text-sm text-right">Price</div>
                <hr className="border-lightGray border-t mb-2"/>
                {
                    items.length?
                    <div className="flex flex-col gap-2">
                        {items.map((item, index)=>
                            <CartCart item={item} index={index} loading={loading[item.id]?? false}/>
                        )}
                    </div> :
                    <div className="my-10 text-center"><h1>Your Amazon Cart is empty!</h1></div>
                }
                <div className="text-right mt-2 leading-none mb-4">
                    <span className="text-lg">{`Subtotal (${items.length} items): `}</span>
                    <span className="text-lg font-semibold">
                        <span>$</span>
                        {subtotal.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-[300px] h-fit p-4 pb-7 border border-lightGray rounded-lg">
                <span className="text-[28px] mb-2.5 font-medium">Checkout</span>
                <hr className="border-lightGray border-t mb-2"/>
                <div>
                    <span className="text-lg">{`Subtotal (${items.length} items): `}</span>
                    <span className="text-lg font-semibold">
                        <span>$</span>
                        {subtotal.toFixed(2)}
                    </span>
                </div>
                <button 
                    className={`h-10 mt-2 bg-yellow-300 hover:bg-yellow-400 w-full rounded-full 
                        ${!items.length? "disabled:bg-ultraLightGray": null}`}
                    disabled={items.length === 0}
                    >Proceed to Buy
                </button>
            </div>
        </div>
    )
}

export default DisplayCart