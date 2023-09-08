import { stateContext } from "@/contexts/ContextProvide";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

// Elements
import Hamburger from "../element/Hamburger";

// Icons
import AddIconNavbar from "../icons/AddIconNavbar";
import ProfileNavbar from "../icons/ProfileNavbar";

const Navbar = ({ title }) => {
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
            <div className="bg-[#F8FAFA] drop-shadow-md flex justify-between items-center py-2 md:py-4 px-4 sm:px-8 z-[100000000]">
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

                <Link href={"/"} className="md:hidden">
                    <Image
                        src={"/assets/images/logo.png"}
                        width={40}
                        height={40}
                        alt="logo"
                        className="w-[36px]"
                    />
                </Link>

                <div className="hidden md:flex gap-x-10">
                    <button className="flex bg-primary text-white py-2 rounded-xl gap-x-3 items-center px-3 hover:shadow-lg hover:shadow-primary/30 transition-shadow duration-300 hover:transition-shadow hover:first-letter:duration-200">
                        Add
                        <AddIconNavbar />
                    </button>

                    <Link href={"/profile"}>
                        <ProfileNavbar />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
