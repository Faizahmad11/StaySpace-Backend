import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ye line page ko har dafa top (0,0) per le jaye gi
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi path change hoga, ye chalega

  return null;
};

export default ScrollToTop;