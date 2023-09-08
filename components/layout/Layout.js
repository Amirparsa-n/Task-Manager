import { useEffect, useState } from "react";
import { useContext } from "react";
import { stateContext } from "@/contexts/ContextProvide";
import BottomNavigation from "../module/BottomNavigation";
import { useSession } from "next-auth/react";

// Components
import Sidebar from "../module/Sidebar";
import Navbar from "../module/Navbar";
import { ThemeProvider } from "next-themes";

import { useTheme } from "next-themes";

const Layout = ({ children }) => {
    const { activeMenu, setActiveMenu } = useContext(stateContext);
    const { theme } = useTheme();
    console.log(theme);

    let sidebarClass;
        if (theme === "light") {
            sidebarClass =
                "w-72 fixed h-screen transitionSidebar z-[1000] drop-shadow-xl bg-[#F8FAFA]";
        } else if (theme === "dark") {
            sidebarClass =
                "w-72 fixed h-screen transitionSidebar z-[1000] drop-shadow-xl bg-DarkSecond";
        }

    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <span className="loaderLayout"></span>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return <div>{children}</div>;
    }

    return (
        <div className="flex flex-row ">
            {activeMenu ? (
                <div className={sidebarClass}>
                    <Sidebar />
                </div>
            ) : (
                <div className="w-0 h-screen transitionSidebar"></div>
            )}

            <div
                className={
                    activeMenu
                        ? "lg:ml-72 w-full transitionSidebar"
                        : "w-full ml-0 transitionSidebar"
                }>
                <div className="">
                    <div>{children}</div>
                    <BottomNavigation />
                </div>
            </div>
        </div>
    );
};

export default Layout;
