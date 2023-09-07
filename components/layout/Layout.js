import { useEffect, useState } from "react";
import { useContext } from "react";
import { stateContext } from "@/contexts/ContextProvide";
import BottomNavigation from "../module/BottomNavigation";
import { useSession } from "next-auth/react";

// Components
import Sidebar from "../module/Sidebar";
import Navbar from "../module/Navbar";

const Layout = ({ children }) => {
    const { activeMenu, setActiveMenu } = useContext(stateContext);

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
                <div className="w-72 fixed h-screen transitionSidebar z-[1000] bg-[#F8FAFA] drop-shadow-xl">
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
                {/* <div className="bg-indigo-400 w-full">
                    <Navbar />
                </div> */}

                <div className="">
                    <div>{children}</div>
                    <BottomNavigation />
                </div>
            </div>
        </div>
    );
};

export default Layout;
