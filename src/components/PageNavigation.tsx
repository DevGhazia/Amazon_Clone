import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

interface PropsType{
    currPage: number;
    productCount: number;
    limit: number;
    urlHandler: (pageIndex: string)=>void;
    disable: boolean;
}

const PageNavigation = ({currPage, productCount, limit, urlHandler, disable}: PropsType) => {

        const totalPages: number = Math.ceil(productCount/limit);

        return (
        <div className='flex h-12 text-sm border rounded-lg'>

            {/* Previous Button */}
            <button 
                className='px-4 disabled:text-darkGray disabled:pointer-events-none hover:bg-normalGray'
                onClick={()=>urlHandler(String(currPage - 1))}
                disabled={(currPage === 1 || disable)? true: false}>
                <ArrowBackIosNewOutlinedIcon sx={{fontSize: '13px', marginRight: '2px'}} />
                Previous
            </button>

            {/* Pages */}
            {Array.from({length: totalPages}).map((_, index)=>
                <button 
                    key={index} 
                    className={`w-12 border-black ${(index+1 === currPage)? 'border pointer-events-none': null} hover:bg-normalGray`} 
                    value={index + 1}
                    onClick={(e)=>urlHandler(e.currentTarget.value)}
                    >{index + 1}
                </button>
            )}

            {/* Next Button  */}
            <button 
                className='px-4 disabled:text-darkGray disabled:pointer-events-none hover:bg-normalGray '
                onClick={()=>urlHandler(String(currPage + 1))}
                disabled={(totalPages === currPage || disable)? true: false}
                >Next
                <ArrowForwardIosOutlinedIcon sx={{fontSize: '13px', marginLeft: '2px'}} />
            </button>
        </div>
    )
}

export default PageNavigation