import { stateContext } from "@/contexts/ContextProvide";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react"

// Elements
import Hamburger from "../element/Hamburger";

// Icons
import AddIconNavbar from "../icons/AddIconNavbar";
import ProfileNavbar from "../icons/ProfileNavbar";
import LogoutIcon from "../icons/logoutIcon";

const Navbar = ({ title }) => {
    const {
        activeMenu,
        setActiveMenu,
        setShowAddTaskModal,
        setShowAddNoteModal,
    } = useContext(stateContext);
    const [windowWidth, setWindowWidth] = useState(null);
    const { theme, setTheme } = useTheme();

    const router = useRouter();
    const pathname = router.pathname;

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

    const themeHandler = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <div className="sticky top-0 z-[100]" id="navbar">
            <div className="bg-[#F8FAFA] dark:bg-DarkSecond drop-shadow-md flex justify-between items-center py-2 md:py-4 px-4 sm:px-8 ">
                <div className="flex gap-x-8 items-center">
                    <button
                        className="hidden md:block"
                        type="button"
                        onClick={() =>
                            setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                        }>
                        <Hamburger activeMenu={activeMenu} />
                    </button>
                    <p className="text-lg font-semibold">{title}</p>
                </div>

                <div className="md:hidden">
                    <Link href={"/"}>
                        <Image
                            src={"/assets/images/logo.png"}
                            width={40}
                            height={40}
                            alt="logo"
                            className="w-[36px]"
                        />
                    </Link>

                    <label className="container">
                        <input
                            // checked="checked"
                            type="checkbox"
                            checked={theme === "dark" ? true : false}
                            onChange={themeHandler}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            // height="1em"
                            strokeWidth="1.5"
                            className="sun w-[30px] h-[30px] stroke-textSecondary sm:!right-[80px]"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            />
                        </svg>

                        <svg
                            viewBox="0 0 384 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="moon sm:!right-[80px]">
                            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                        </svg>
                    </label>
                </div>

                <div className="hidden md:flex gap-x-10">
                    {pathname === "/stickynote" && (
                        <button
                            onClick={() => setShowAddNoteModal(true)}
                            className="flex bg-primary text-white py-2 rounded-xl gap-x-3 items-center px-3 hover:shadow-lg hover:shadow-primary/30 transition-shadow duration-300 hover:transition-shadow hover:first-letter:duration-200">
                            Add
                            <AddIconNavbar />
                        </button>
                    )}

                    {pathname === "/" && (
                        <button
                            onClick={() => setShowAddTaskModal(true)}
                            className="flex bg-primary text-white py-2 rounded-xl gap-x-3 items-center px-3 hover:shadow-lg hover:shadow-primary/30 transition-shadow duration-300 hover:transition-shadow hover:first-letter:duration-200">
                            Add
                            <AddIconNavbar />
                        </button>
                    )}

                    {pathname === "/profile" ? (
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="btnLogout border border-primary rounded-xl px-4 py-[6px] text-primary flex gap-x-2 items-center hover:bg-primary hover:text-white transition-colors hover:transition-colors duration-300 hover:duration-200">
                            <span>Logout</span>
                            <LogoutIcon />
                        </button>
                    ) : (
                        <Link href={"/profile"}>
                            <ProfileNavbar />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
