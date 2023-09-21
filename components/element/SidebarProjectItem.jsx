import Link from "next/link";
import { useRouter } from "next/router";
import TrashIcon from "../icons/TrashIcon";
import { useState } from "react";

const SidebarProjectItem = ({ title, link, icon, id, deleteProject }) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const router = useRouter();
    const pathname = router.asPath;

    const [deleteMode, setDeleteMode] = useState(false);

    if (deleteMode)
        return (
            <div
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
                className={
                    pathname === link
                        ? "bg-primary rounded-xl"
                        : "bg-gray-100 dark:bg-black/20 transition-colors duration-200 hover:duration-150 hover:transition-colors rounded-xl cursor-pointer"
                }>
                <div className="flex justify-between gap-x-3 px-5 py-3 items-center relative">
                    <p
                        className={
                            pathname === link
                                ? "text-white text-sm"
                                : "textSecondary text-sm "
                        }>
                        Are you sure?
                    </p>

                    <div className="flex gap-x-2">
                        <button
                            type="button"
                            onClick={() => setDeleteMode(false)}
                            className={`text-sm border border-green-500 rounded-lg px-2 py-[1.2px] transition-colors hover:transition-colors ${pathname === link ? 'bg-green-500 text-white hover:bg-transparent hover:text-green-500' : 'text-green-500 hover:bg-green-500 hover:text-white'}`}>
                            No
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteProject(id)}
                            className={`text-sm border border-red-500 rounded-lg px-2 py-[1.2px] transition-colors hover:transition-colors ${pathname === link ? 'bg-red-500 text-white hover:bg-transparent hover:text-red-500' : 'text-red-500 hover:bg-red-500 hover:text-white'}`}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            <div
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
                className={
                    pathname === link
                        ? "bg-primary rounded-xl flex justify-between items-center gap-x-2"
                        : "hover:bg-gray-100 dark:hover:bg-black/20 transition-colors duration-200 hover:duration-150 hover:transition-colors rounded-xl cursor-pointer  flex justify-between items-center gap-x-2"
                }>
                <Link href={link} className="w-10/12">
                    <div className="flex gap-x-3 px-5 py-3 items-center relative">
                        <span>{icon}</span>
                        <p
                            className={
                                pathname === link
                                    ? "text-white line-clamp-1"
                                    : "textSecondary text-base line-clamp-1"
                            }>
                            {title}
                        </p>
                    </div>
                </Link>
                {mouseIsOver && (
                    <button
                        type="button"
                        onClick={() => setDeleteMode(true)}
                        className="pr-4">
                        <TrashIcon />
                    </button>
                )}
            </div>
        </>
    );
};

export default SidebarProjectItem;
