import Link from "next/link";
import { useRouter } from "next/router";

import TaskSidebar from "../icons/TaskSidebar";

const SidebarItem = ({ title, link, icon }) => {

    const router = useRouter();
    const pathname = router.pathname;

    return (
        <>
            <Link href={link}>
                <div
                    className={
                        pathname === link
                            ? "bg-primary rounded-xl"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 hover:duration-150 hover:transition-colors rounded-xl cursor-pointer"
                    }>
                    <div className="flex gap-x-3 px-5 py-3">
                        {/* <TaskSidebar
                            color={pathname === "/" ? "#fff" : "#93949A"}
                        /> */}
                        <span>{icon}</span>
                        <p
                            className={
                                pathname === link
                                    ? "text-white"
                                    : "textSecondary text-base"
                            }>
                            {title}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default SidebarItem;
