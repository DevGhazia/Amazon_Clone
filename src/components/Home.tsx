import { useEffect, useState } from "react";
import { ProductsCard } from "./ProductsCard";
import Carousel from "./Carousel";
import Banner from "./Banner";

const cardTitles = ["Pick where you left off", "Keep shopping for", "Continue shopping deals", "More items to consider"];

const Home = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(()=>{
        window.addEventListener("resize", HandleResize);
        return ()=>window.removeEventListener("resize", HandleResize);
    }, []);

    const HandleResize=()=>setWidth(window.innerWidth);  

    return (
        <div className="w-full flex justify-center bg-ultraLightGray">
            <section className=" bg-ultraLightGray min-h-screen max-w-[1500px]">
                <Banner />
                <section className="flex flex-col gap-5 relative p-5">
                    <div className="flex gap-5">
                        {["womens-bags", "home-decoration", "mens-watches", "sunglasses"].slice(0, width < 1300 ? 3:4 ).map((cardCategory, index)=> (
                            <ProductsCard cardTitle={cardTitles[index]} category={cardCategory} key={index}/>
                        ))}
                    </div>
                    <Carousel category="groceries"/>
                    <div className="flex gap-5">
                        {["mobile-accessories", "laptops", "sports-accessories", "womens-shoes"].slice(0, width < 1300 ? 3:4 ).map((cardCategory, index)=> (
                            <ProductsCard category={cardCategory} key={index}/>
                        ))}
                    </div>
                    <Carousel category="kitchen-accessories"/>
                    <div className="flex gap-5">
                        {["beauty", "furniture", "fragrances", "motorcycle"].slice(0, width < 1300 ? 3:4 ).map((cardCategory, index)=> (
                            <ProductsCard category={cardCategory} key={index}/>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Home