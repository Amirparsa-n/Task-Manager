import { Children, useEffect, useState } from "react";
import { useContext } from "react";
import Sidebar from "../module/Sidebar";
import { stateContext } from "@/contexts/ContextProvide";
import BottomNavigation from "../module/BottomNavigation";

const Layout = ({ children }) => {
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
        <div className="flex flex-row ">
            {activeMenu ? (
                <div className="w-72 fixed h-screen transitionSidebar z-[1000] bg-red-400">
                    <Sidebar />
                </div>
            ) : (
                <div className="w-0 h-screen transitionSidebar"></div>
            )}

            <div
                className={
                    activeMenu
                        ? "md:ml-72 w-full transitionSidebar"
                        : "w-full ml-0 transitionSidebar"
                }>
                <div className="bg-indigo-400 w-full">Navbar</div>

                <div className="">
                    <div>
                        {children}
                    </div>
                    <BottomNavigation />
                </div>
            </div>
        </div>
    );
};

export default Layout;
