const ProductCardSkeleton = () => {
  return (
    <div className='grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] 
        py-6 h-full w-full'>
        {
            Array.from({length: 8}).map((_, index)=>(
                <div className='flex flex-col border border-ultraLightGrayMax rounded-md overflow-hidden' key={index}>
                    <div className='h-[260px] w-full bg-ultraLightGrayMax animate-pulse'></div>
                    <div className='h-[200px]'></div>
                </div>
            ))
        }
    </div>
)}

export default ProductCardSkeleton