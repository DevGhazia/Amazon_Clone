import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store';
import { useSearchParams } from 'react-router';
import { fetchSearchProducts } from '../thunks/productThunks';
import PageNavigation from './PageNavigation';
import SortMenu from './SortMenu';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductCard from './ProductCard';

const SearchProductPage = () => {

    // FETCHING VAIRABLES
    const loading = useSelector((state: RootState)=> state.product.loading);
    const products = useSelector((state: RootState)=> state.product.searchProducts);
    const dispatch = useDispatch<AppDispatch>();

    // SEARCH PARAMS 
    const [searchParams, setSearchParams] = useSearchParams();
    const query: string | null = searchParams.get('q');
    const sortBy: string  = searchParams.get("sortBy") || "rating";
    const orderBy: string  = searchParams.get("order") || "desc";
    const pageNo: string  = searchParams.get('page') || "1";

    const limitOnPage = 8;

    // ---------FETCHING------------
    useEffect(()=>{
        if(!query) 
            return;
        dispatch(fetchSearchProducts({
            query: query,
            limit: limitOnPage, 
            skip: (Number(pageNo)-1) * limitOnPage, 
            sort: sortBy, 
            order: orderBy, 
            page: pageNo,
        }))
    },[dispatch, query, sortBy, orderBy, pageNo]);
    
    function UpdateSortParam(value: string){
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('sortBy', value);
            newParams.set('page', "1");
            return newParams;
        });
    }
    
    function UpdateOrderParam(value: string){
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('order', value);
            newParams.set('page', "1");
            return newParams;
        });
    }

    function UpdatePageNoParam(pageIndex: string): void{
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', pageIndex);
            return newParams;
        });
    } 

    // -------- LOADING CHECK----------
    if(!products){
        return <div className='min-h-screen'></div>;
    }

    const {total, items} = products;

    return (
        <div className='flex flex-col min-h-screen items-center pb-6 gap-6'>
            <div className='flex px-6 gap-6 w-full'>

                <SortMenu
                    sortBy={sortBy}
                    orderBy={orderBy}
                    UpdateSortParam={UpdateSortParam}
                    UpdateOrderParam={UpdateOrderParam}
                    disable={items.length === 0}
                />

                {/* LOADING SKELETON */}
                {loading && <ProductCardSkeleton />}

                {!loading && items.length === 0 && (
                    <div className="w-full mt-6 flex justify-center items-center">
                        <h1>Sorry, no result found!</h1>
                    </div>
                )}
                
                {/* MAPPING OVER ITEMS */}
                {!loading && items.length > 0 && (
                    <div className='grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] 
                        py-6 h-full w-full'>{
                        items.map((item, index) => (
                            <ProductCard 
                            key={index}
                            item={item}
                            />
                        ))
                    }</div>
                )}
            </div>

            <PageNavigation 
                currPage={Number(pageNo)} 
                productCount={total} 
                limit={limitOnPage} 
                urlHandler={UpdatePageNoParam}
                disable={items.length === 0}
            />
            
        </div>
    )
}

export default SearchProductPage