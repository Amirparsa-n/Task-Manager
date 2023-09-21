import { useState } from "react";

// icons
import BoxIcon from "../icons/boxIcon";
import TrashIcon from "../icons/TrashIcon";
import Link from "next/link";

const ProjectItem = ({ name, id, deleteProject }) => {
    const [deleteMode, setDeleteMode] = useState(false);

    if (deleteMode)
        return (
            <div className="projectItem bg-white dark:bg-DarkSecond transition-colors duration-500 hover:duration-300 hover:transition-colors shadow-button shadow-gray-600/30 dark:shadow-gray-800/50 py-4 px-4 rounded-xl flex justify-between gap-x-5 items-center">
                <p className="text-base capitalize flex gap-x-1">
                    Delete{" "}
                    <span className="titleNote line-clamp-1">{name}</span> ?
                </p>

                <div className="flex gap-x-2">
                    <button
                        type="button"
                        onClick={() => setDeleteMode(false)}
                        className="text-sm border border-green-500 rounded-lg px-2 text-green-500 py-[3.2px] hover:bg-green-500 hover:text-white transition-colors hover:transition-colors">
                        No
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteProject(id)}
                        className="text-sm border border-red-500 rounded-lg px-2 text-red-500 py-[3.2px] hover:bg-red-500 hover:text-white transition-colors hover:transition-colors">
                        Yes
                    </button>
                </div>
            </div>
        );

    return (
        <div className="projectItem bg-white dark:bg-DarkSecond hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors duration-500 hover:duration-300 hover:transition-colors shadow-button shadow-gray-600/30 dark:shadow-gray-800/50 py-4 px-4 rounded-xl flex justify-between gap-x-3">
            <Link href={`/project/${name}`} className="w-11/12">
                <div className="flex gap-x-3 items-center">
                    <div>
                        <BoxIcon />
                    </div>
                    <p className="text-lg line-clamp-1 titleNote capitalize">
                        {name}
                    </p>
                </div>
            </Link>
            <button type="button" onClick={() => setDeleteMode(true)}>
                <TrashIcon />
            </button>
        </div>
    );
};

export default ProjectItem;
