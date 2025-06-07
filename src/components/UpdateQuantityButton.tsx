import { AddOutlined, DeleteOutlined, RemoveOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { DeleteItemFromCart, UpdateQuantityOfItem } from '../thunks/cartThunks';
import { AppDispatch } from '../store';

interface UpdateQuantityButtonProps{
    loading: boolean;
    quantity: number;
    itemId: number;
}

const buttonStyle= "h-full aspect-square rounded-full hover:bg-ultraLightGrayMax active:bg-ultraLightGray disabled:pointer-events-none";

const UpdateQuantityButton = ({loading, quantity, itemId}: UpdateQuantityButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();

    function IncreaseQuantity(){
        dispatch(UpdateQuantityOfItem({quantity: quantity+1, itemId}));
    }

    function DecreaseQuantity(){
        dispatch(UpdateQuantityOfItem({quantity: quantity-1, itemId}));
    }

    function DeleteQuantity(){
        dispatch(DeleteItemFromCart({itemId}));   
    }
    
    return (
        <div className={`flex justify-between h-full items-center border-4 border-yellow-300 rounded-full`}>
            { quantity > 1? 
                <button className={buttonStyle} onClick={DecreaseQuantity} disabled={loading}><RemoveOutlined /></button> : 
                <button className={buttonStyle} onClick={DeleteQuantity} disabled={loading}><DeleteOutlined /></button>}
            <span className='font-semibold'>{quantity}</span>
            <button className={buttonStyle} onClick={IncreaseQuantity} disabled={loading}><AddOutlined /></button>
        </div>
    )
};

export default UpdateQuantityButton