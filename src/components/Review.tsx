import { AccountCircleTwoTone } from '@mui/icons-material';
import { StartRating } from './StartRating'

interface PropType{
    userName: string;
    rating: number;
    date: string;
    comment: string;
}

const Review = ({userName, rating, date, comment}: PropType) => {
  return (
    <div className='mb-6'>
        <div className="flex items-center mb-1">
            <AccountCircleTwoTone fontSize='large'/>
            <div className='ml-2'><span>{userName}</span></div>
        </div>
        <div className='mb-0.5'>
            <StartRating rating={rating} size={20}/>
        </div>
        <div className='mb-1'><span className='text-extraDarkGray'>{`Reviewed on ${date}`}</span></div>
        <p>{comment}</p>
    </div>
  )
}

export default Review