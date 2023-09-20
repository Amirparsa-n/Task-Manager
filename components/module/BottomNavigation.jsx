import { useContext, useEffect } from "react";
import AddBottomNav from "../icons/AddBottomNav";
import NoteBottomNav from "../icons/NoteBottomNav";
import ProfileBottomNav from "../icons/ProfileBottomNav";
import ProjectBottomNav from "../icons/ProjectBottomNav";
import SelectShapeBottomNav from "../icons/SelectShapeBottomNav";
import TaskBottomNav from "../icons/TaskBottomNav";

import Link from "next/link";

// context
import { useRouter } from "next/router";
import { stateContext } from "@/contexts/ContextProvide";

const BottomNavigation = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const query = router.query;

    const {
        setShowAddTaskModal,
        setShowAddNoteModal,
        setShowAddProjectModal,
        setShowAddTaskProjectModal,
        showAddTaskProjectModal
    } = useContext(stateContext);

    useEffect(() => {
        setShowAddTaskModal(false);
        setShowAddNoteModal(false);
        setShowAddProjectModal(false);
        setShowAddTaskProjectModal(false);
    }, [pathname]);

    return (
        <div className="md:hidden z-40 bg-[#F8FAFA] dark:bg-DarkSecond fixed bottom-0 w-full h-[80px] rounded-t-xl shadow-[0_4px_15px_2px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between px-4 sm:px-8 mt-3">
                <Link href={"/profile"}>
                    <div className="flex flex-col items-center">
                        <ProfileBottomNav />
                        <span className="text-[12px] mt-2 dark:text-gray-300">
                            Profile
                        </span>
                        {pathname === "/profile" && (
                            <div className="absolute bottom-0 with-shadow">
                                <SelectShapeBottomNav />
                            </div>
                        )}
                    </div>
                </Link>

                <Link href={"/project"}>
                    <div className="flex flex-col items-center">
                        <ProjectBottomNav />
                        <span className="text-[12px] mt-2 dark:text-gray-300">
                            Project
                        </span>
                        {pathname === "/project" || query.projectId  && (
                            <div className="absolute bottom-0 with-shadow">
                                <SelectShapeBottomNav />
                            </div>
                        )}
                    </div>
                </Link>

                {pathname === "/stickynote" && (
                    <button
                        type="button"
                        onClick={() => setShowAddNoteModal((prev) => !prev)}
                        className="flex flex-col items-center justify-center ">
                        <AddBottomNav />
                    </button>
                )}

                {pathname === "/" && (
                    <button
                        type="button"
                        onClick={() => setShowAddTaskModal((prev) => !prev)}
                        className="flex flex-col items-center justify-center ">
                        <AddBottomNav />
                    </button>
                )}

                {pathname === "/project" && (
                    <button
                        type="button"
                        onClick={() => setShowAddProjectModal((prev) => !prev)}
                        className="flex flex-col items-center justify-center ">
                        <AddBottomNav />
                    </button>
                )}

                {query.projectId && (
                    <>
                        <button
                            type="button"
                            onClick={() =>
                                setShowAddTaskProjectModal(query.projectId)
                            }
                            className={`flex flex-col items-center justify-center ${showAddTaskProjectModal && 'hidden'}`}>
                            <AddBottomNav />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setShowAddTaskProjectModal(false)
                            }
                            className={`flex flex-col items-center justify-center ${!showAddTaskProjectModal && 'hidden'}`}>
                            <AddBottomNav />
                        </button>
                    </>
                )}
                <Link href={"/stickynote"}>
                    <div className="flex flex-col items-center">
                        <NoteBottomNav />
                        <span className="text-[12px] mt-2 dark:text-gray-300">
                            Note
                        </span>
                        {pathname === "/stickynote" && (
                            <div className="absolute bottom-0 with-shadow">
                                <SelectShapeBottomNav />
                            </div>
                        )}
                    </div>
                </Link>

                <Link href={"/"}>
                    <div className="flex flex-col items-center">
                        <TaskBottomNav />
                        <span className="text-[12px] mt-2 dark:text-gray-300">
                            Task
                        </span>
                        {pathname === "/" && (
                            <div className="absolute bottom-0 with-shadow">
                                <SelectShapeBottomNav />
                            </div>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BottomNavigation;
