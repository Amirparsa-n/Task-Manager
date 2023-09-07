import { stateContext } from "@/contexts/ContextProvide";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {

    
    const { activeMenu, setActiveMenu } = useContext(stateContext);
    console.log(activeMenu);
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {

        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);

            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
        
    }, []);

    useEffect(() => {
        if (windowWidth <= 1105) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [windowWidth]);

    return (
        <div>
            Navbar
        </div>
    );
};

export default Navbar;