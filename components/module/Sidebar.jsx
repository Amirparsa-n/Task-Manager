import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { useTheme } from "next-themes";

// components
import SidebarItem from "../element/SidebarItem";

// context
import { stateContext } from "@/contexts/ContextProvide";

// Icons
import NoteSidebar from "../icons/NoteSidebar";
import TaskSidebar from "../icons/TaskSidebar";
import ProfileSidebar from "../icons/ProfileSidebar";
import AddProjectSidebar from "../icons/AddProjectSidebar";
import ProjectSidebar from "../icons/ProjectSidebar";
import Sun from "../icons/Sun";
import Moon from "../icons/Moon";
import CloseIcon from "../icons/closeIcon";

const Sidebar = () => {
    const { setActiveMenu, setShowAddProjectModal } = useContext(stateContext);
    const router = useRouter();
    const pathname = router.pathname;

    const { theme, setTheme } = useTheme();

    const themeHandler = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const sidebarItem = [
        {
            id: 1,
            title: "Task",
            link: "/",
            icon: <TaskSidebar color={pathname === "/" ? "#fff" : "#93949A"} />,
        },
        {
            id: 2,
            title: "Sticky note",
            link: "/stickynote",
            icon: (
                <NoteSidebar
                    color={pathname === "/stickynote" ? "#fff" : "#93949A"}
                />
            ),
        },
        {
            id: 3,
            title: "Profile",
            link: "/profile",
            icon: (
                <ProfileSidebar
                    color={pathname === "/profile" ? "#fff" : "#93949A"}
                />
            ),
        },
    ];

    return (
        <div className="h-screen hidden md:block px-6 pt-5 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                    <Image
                        src={"/assets/images/logo.png"}
                        width={60}
                        height={60}
                        className="w-[40px]"
                        alt="logo"
                        priority={true}
                    />
                    <h2 className="font-bold text-lg dark:text-white">
                        Task manager
                    </h2>
                </div>

                <button
                    type="button"
                    className="lg:hidden"
                    onClick={() => setActiveMenu(false)}>
                    <CloseIcon />
                </button>
            </div>

            <div className="mt-14 flex flex-col gap-y-5">
                {sidebarItem.map((item) => (
                    <SidebarItem
                        key={item.id}
                        title={item.title}
                        link={item.link}
                        icon={item.icon}
                    />
                ))}
            </div>

            <div>
                <hr className="block h-[1px] border-t-1 border-[#DFDFDF] my-7" />
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <p className="text-[#A8A9AC]">Project</p>
                    <button type="button" onClick={() => setShowAddProjectModal(true)}>
                        <AddProjectSidebar />
                    </button>
                </div>

                <div className="mt-5 flex flex-col gap-y-[18px]">
                    <SidebarItem
                        title={"develop task"}
                        link={"/dev"}
                        icon={
                            <ProjectSidebar
                                color={pathname === "/dev" ? "#fff" : "#93949A"}
                            />
                        }
                    />
                    <SidebarItem
                        title={"develop task"}
                        link={"/dev"}
                        icon={
                            <ProjectSidebar
                                color={pathname === "/dev" ? "#fff" : "#93949A"}
                            />
                        }
                    />
                </div>
            </div>

            <div
                className="absolute w-full bottom-2 left-0"
                id="darkModHandler">
                <input
                    type="checkbox"
                    id="switch"
                    // defaultChecked={theme}
                    checked={theme === "dark" ? true : false}
                    onChange={themeHandler}
                />
                <div className="app">
                    <div className="body">
                        <label htmlFor="switch">
                            <div className="toggle"></div>
                            <div className="names">
                                <p className="light flex gap-x-2 items-center">
                                    Light <Sun />
                                </p>
                                <p className="dark flex gap-x-2 items-center">
                                    Dark <Moon />
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
