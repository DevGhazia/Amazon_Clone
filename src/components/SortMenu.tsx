interface SortMenuTypes{
    sortBy: string;
    orderBy: string;
    UpdateSortParam: (sort: string)=>void;
    UpdateOrderParam: (order: string)=>void;
    disable: boolean
}

export default function SortMenu({UpdateSortParam, UpdateOrderParam, sortBy, orderBy, disable}: SortMenuTypes){

    const sortTypes = {
        "Price": "price",
        "Rating": "rating",
        "Discount": "discountPercentage",
        "Title": "title",
    }
    
    return (
        <div className='min-w-[320px] sticky top-0 pt-6 h-fit'>
            <div className='p-4 border border-lightGray rounded-lg'>
                <h2 className='mb-4'>Sort Products</h2>
                <div className='mb-4'>
                    <label htmlFor="sortType" className='block mb-1.5'>Sort by</label>
                    <select 
                        className='w-full border border-lightGray rounded-lg p-2.5 cursor-pointer' 
                        value={sortBy}
                        onChange={(e)=>UpdateSortParam(e.target.value)}
                        disabled={disable}
                        id="sortType">
                        {Object.entries(sortTypes).map(([key, value])=>(
                            <option key={key} value={value}>{key}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div className='block mb-1.5'>Order</div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="order" className='flex gap-3 items-center'>
                            <input 
                                type="radio" 
                                id='order'
                                name='order'
                                value="asc"
                                checked={orderBy === "asc"}
                                disabled={disable}
                                onChange={(e)=>UpdateOrderParam(e.target.value)}
                                className='cursor-pointer scale-150 ml-0.5'
                                />
                            Ascending    
                        </label>
                        <label htmlFor="orderType2" className='flex gap-3 items-center'>
                            <input 
                                type="radio" 
                                id="orderType2"
                                name='order'
                                value="desc"
                                disabled={disable}
                                checked={orderBy === "desc"}
                                onChange={(e)=>UpdateOrderParam(e.target.value)}
                                className='cursor-pointer scale-150 ml-0.5'
                                />
                            Descending
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}