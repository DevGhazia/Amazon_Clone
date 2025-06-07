import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router"

const ScrollToTheTop = () => {
  const {pathname} = useLocation();
  const [searchParam] = useSearchParams();

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname, searchParam.toString()]);

  return null;
}

export default ScrollToTheTop