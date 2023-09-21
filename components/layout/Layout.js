import { useEffect, useState } from "react";
import { useContext } from "react";
import { stateContext } from "@/contexts/ContextProvide";
import BottomNavigation from "../module/BottomNavigation";
import { useSession } from "next-auth/react";

// Components
import Sidebar from "../module/Sidebar";
import Navbar from "../module/Navbar";
import { ThemeProvider, useTheme } from "next-themes";
import AddTask from "../template/AddTask";
import AddNote from "../template/AddNote";
import AddProject from "../template/AddProject";
import AddProjectTask from "../template/AddProjectTask";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
    const { activeMenu, showAddTaskModal, showAddNoteModal, showAddProjectModal, showAddTaskProjectModal } = useContext(stateContext);

    const { data: session, status } = useSession();
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (prefersDarkMode) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);
    

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
        <div className="flex flex-row relative">
            <div className="hidden md:block">
                {activeMenu ? (
                    <div
                        className={
                            "w-72 fixed h-screen transitionSidebar z-[1000] drop-shadow-xl bg-[#F8FAFA] dark:bg-DarkSecond"
                        }>
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 h-screen transitionSidebar"></div>
                )}
            </div>

            <div
                className={
                    activeMenu
                        ? "lg:ml-72 w-full transitionSidebar"
                        : "w-full ml-0 transitionSidebar"
                }>
                <div className="">
                    <div className="mb-20 md:mb-0">{children} </div>
                    <BottomNavigation />
                </div>
            </div>

            {showAddTaskModal && <AddTask />}
            {showAddNoteModal && <AddNote />}
            {showAddProjectModal && <AddProject />}
            {showAddTaskProjectModal && <AddProjectTask />}
            <Toaster/>
        </div>
    );
};

export default Layout;
