import { Star, StarBorder, StarHalf } from '@mui/icons-material';

export const StartRating = ({rating, size=10} : {rating: number, size: number})  => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar? 1 : 0);

    return (
        <div className='flex items-center text-darkOrange'>
            {[...Array(fullStars)].map((_,index)=>(
                <Star key={index} style={{fontSize: `${size}px`}} className='-m-[1.5px]'/>
            ))}
            {halfStar && <StarHalf style={{fontSize: `${size}px`}} className='-m-[1.5px]'/>}
            {[...Array(emptyStars)].map((_, index)=>(
                <StarBorder key={index} style={{fontSize: `${size}px`}} className='-m-[1.5px]'/>
            ))}
        </div>
    )
}
