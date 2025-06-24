import amazonLogoWhite from "../assets/amazon_logo_white.png";
import amazonSaleBanner from "../assets/amazon_sale_banner.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOnOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchCategoryList } from "../thunks/productThunks";
import { FetchCartItems } from "../thunks/cartThunks";
import { GitHub } from "@mui/icons-material";
import { signOutUser } from "../thunks/authThunks";

interface HeaderProps{
    username: string | null;
}

export const Header: React.FC<HeaderProps> = ({username}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {categoryList, loading} = useSelector((state: RootState)=>state.product);
    const cartItemsCount = useSelector((state: RootState)=>state.cart.items.length);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!categoryList)
            dispatch(fetchCategoryList());
    },[dispatch, categoryList]);

    useEffect(()=>{
        if(username)
            dispatch(FetchCartItems());
    }, [dispatch, username]);

    return (
        <header className="relative text-nowrap text-white">
            <nav className="flex gap-3 h-[60px] py-2 px-4 bg-darkBlue justify-between">
                {/* Nav-Left */}
                <div className="flex gap-3 min-w-fit">
                    <Link to="/app">
                        <img src={amazonLogoWhite} className="h-full header_hover px-1 object-contain pt-3" alt="amazon logo" />
                    </Link>
                    <div className="header_hover flex items-center w-fit">
                        <LocationOnIcon />
                        <div className="header_link">
                            <span>{`Deliver to ${username}`}</span>
                            <span>Ghaziabad 201002</span>
                        </div>
                    
                    </div> 
                </div>

                {/* NAV-SEARCH */}
                <form 
                    className="flex w-full rounded-md overflow-hidden"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        navigate(`search?q=${query}`);
                    }}>
                    <div>
                        <label htmlFor="searchType" className="hidden">Search the department you want to search in</label>
                        <select name="searchType" id="searchType" className="text-black h-full bg-normalGray p-2 text-xs cursor-pointer">
                            <option value="">All Categories</option>
                            <option value="">Tech</option>
                            <option value="">Men</option>
                            <option value="">Women</option>
                        </select>
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="searchBar" className="hidden">Search on amazon</label>
                        <input 
                            type="text" 
                            id="searchBar" 
                            className="h-full w-full indent-2 text-base text-black"
                            value={query}
                            onChange={(e)=>setQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        className="flex items-center cursor-pointer px-2 bg-orange h-full">
                        <SearchIcon className="" style={{fontSize:"30px"}}/>
                    </button>
                </form>

                {/* NAV-RIGHT */}
                <div className="flex gap-3">
                    <div className="group relative header_link header_hover">
                        <span>{`Hello, ${username? username: "Guest"}`}</span>
                        <span>Account & Lists</span>
                        <div className="hidden absolute p-1 z-[100] bottom-0 right-0 translate-y-full group-hover:block bg-white">
                            <button onClick={()=>dispatch(signOutUser())} className="text-black py-1 px-2">
                                <span className="font-normal">Sign Out</span>
                            </button>
                        </div>
                    </div>
                    <div className="header_link header_hover">
                        <span>Returns</span>
                        <span>& Orders</span>
                    </div>
                    <Link to={'https://github.com/DevGhazia/Amazon_Clone'} target="_blank">
                        <div className="flex gap-1.5 p-1 header_hover">
                            <GitHub fontSize="large"/>
                            <div className="flex flex-col">
                                <span className="text-xs">View</span>
                                <span className="text-sm font-bold">Code</span>
                            </div>
                        </div>
                    </Link>
                    <Link to={'cart'}>
                        <div className="flex items-end p-1 header_hover relative">
                            <ShoppingCartOutlinedIcon className="pb-0.5" fontSize="large"/>
                            <span className="absolute text-red-400 font-bold text-lg -top-0.5 right-7 translate-x-1/2">{cartItemsCount? cartItemsCount: ""}</span>
                            <span className="text-sm font-bold">Cart</span>
                        </div>
                    </Link>
                </div>
            </nav>

            {/* SUB NAV */}
            <div className="flex justify-between bg-mediumBlue h-10 px-4">
                <div className="flex flex-wrap">
                    {categoryList &&
                        Array.from({length: categoryList.length}).map((_, index)=>(
                            <Link to={`${categoryList[index]}?page=1&sortBy=rating&order=desc`} key={index}>
                                <div className="header_sublink h-[39px] p-0.5 flex items-center">
                                    <span>{categoryList[index].charAt(0).toUpperCase() + categoryList[index].slice(1)}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <img src={amazonSaleBanner} className="w-[260px] object-right object-cover ml-1" alt="" />
            </div>
            {loading && <div className="absolute bottom-0 h-1 w-0 translate-y-1/2 z-100 bg-red-600 animate-loader" />}
        </header>
    )
}
