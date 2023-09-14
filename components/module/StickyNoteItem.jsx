// icons
import { useEffect, useState } from "react";
import DeleteNoteIcon from "../icons/DeleteNoteIcon";
import EditNoteIcon from "../icons/EditNoteIcon";

const StickyNoteItem = ({
    title,
    text,
    color,
    id,
    updateStickyNote,
    noteEditStatus,
    deleteStickyNote,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    const [titleNote, setTitleNote] = useState(title);
    const [textNote, setTextNote] = useState(text);
    const [clickEdit, setClickEdit] = useState(false);

    useEffect(() => {
        if (!editMode) {
            setTitleNote(title);
            setTextNote(text);
        }
    }, [editMode]);

    // loading mode
    if (!noteEditStatus && !editMode && clickEdit) {
        return (
            <div
                className={`h-72 col-span-12 stickyNoteContainer sm:col-span-6 lg:col-span-4 3xl:col-span-3 rounded-lg ${
                    color === "yellow" && "bg-yellowNote"
                }
            ${color === "green" && "bg-greenNote"} ${
                    color === "pink" && "bg-pinkNote"
                } ${color === "purple" && "bg-purpleNote"} ${
                    color === "blue" && "bg-blueNote"
                }`}>
                <div className="flex justify-center items-center h-full">
                    <span className="loaderEditNote"></span>
                </div>
            </div>
        );
    }

    if (deleteMode)
        return (
            <div
                className={`h-72 col-span-12 stickyNoteContainer sm:col-span-6 lg:col-span-4 3xl:col-span-3 rounded-lg ${
                    color === "yellow" && "bg-yellowNote"
                }
            ${color === "green" && "bg-greenNote"} ${
                    color === "pink" && "bg-pinkNote"
                } ${color === "purple" && "bg-purpleNote"} ${
                    color === "blue" && "bg-blueNote"
                }`}>
                <div className="px-5 py-6 flex flex-col gap-y-4 justify-center items-center h-full">
                    <p className="text-lg text-neutral-800 text-center">Are you sure to remove?</p>
                    <div className="flex gap-x-3">
                        <button onClick={() => setDeleteMode(false)} className="text-white border border-white py-2 px-4 rounded-full hover:bg-slate-200/20 transition-colors">Cancel</button>
                        <button onClick={() => deleteStickyNote(id)} className="text-red-500 border border-red-500 py-2 px-4 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300a">Delete</button>
                    </div>
                </div>
            </div>
        );

    if (editMode)
        return (
            <div
                className={`h-72 col-span-12 stickyNoteContainer sm:col-span-6 lg:col-span-4 3xl:col-span-3 rounded-lg ${
                    color === "yellow" && "bg-yellowNote"
                }
            ${color === "green" && "bg-greenNote"} ${
                    color === "pink" && "bg-pinkNote"
                } ${color === "purple" && "bg-purpleNote"} ${
                    color === "blue" && "bg-blueNote"
                }`}>
                <div className="px-5 py-6 relative">
                    <div className="flex justify-between items-center gap-x-2 mb-2 ">
                        <input
                            type="text"
                            value={titleNote}
                            onChange={(e) => setTitleNote(e.target.value)}
                            className="bg-transparent rounded-lg px-1 py-1 border-neutral-200 w-10/12 font-semibold text-lg md:text-xl text-slate-700 dark:text-slate-50 titleNote"
                        />
                        <div className="flex fadeInFast flex-col gap-y-2 stickyNoteBtn">
                            <button
                                type="button"
                                className=""
                                onClick={() => setDeleteMode(true)}
                                title="Delete Task">
                                <DeleteNoteIcon />
                            </button>
                            <button
                                type="button"
                                className=""
                                title="Edit Task"
                                onClick={() => setEditMode(false)}>
                                <EditNoteIcon />
                            </button>
                        </div>
                    </div>

                    <textarea
                        name="description"
                        value={textNote}
                        onChange={(e) => setTextNote(e.target.value)}
                        className="bg-transparent w-full border-neutral-200 rounded-lg px-1 py-1 text-gray-800 max-h-32 overflow-auto taskContainer"
                        rows="5"
                    />

                    <div className="flex">
                        <button
                            onClick={() => setEditMode(false)}
                            className="flex border-[1.5px] border-e-[0] border-red-500 hover:bg-red-500 hover:text-neutral-200 text-red-500 transition-colors hover:transition-colors duration-300 hover:duration-200 w-full justify-center mt-[18px] items-center rounded-s-lg py-1">
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                updateStickyNote(id, {
                                    title: titleNote,
                                    text: textNote,
                                });
                                setClickEdit(true);
                                setEditMode(false);
                            }}
                            className="flex border-s-[0] border-[1.5px] border-neutral-200 hover:bg-neutral-200 transition-colors hover:transition-colors duration-300 hover:duration-200 w-full justify-center mt-[18px] items-center text-neutral-200 hover:text-neutral-700 rounded-e-lg py-1">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        );

    return (
        <div
            className={`h-72 col-span-12 stickyNoteContainer sm:col-span-6 lg:col-span-4 3xl:col-span-3 rounded-lg ${
                color === "yellow" && "bg-yellowNote"
            }
            ${color === "green" && "bg-greenNote"} ${
                color === "pink" && "bg-pinkNote"
            } ${color === "purple" && "bg-purpleNote"} ${
                color === "blue" && "bg-blueNote"
            }`}>
            <div className="px-5 py-6 relative">
                <div className="flex justify-between gap-x-2 mb-2">
                    <h3 className="font-semibold w-fit text-lg md:text-xl text-slate-700 dark:text-slate-50 titleNote">
                        {title}
                    </h3>
                    <div className="md:hidden flex fadeInFast md:absolute right-5 flex-col gap-y-2 stickyNoteBtn">
                        <button
                            type="button"
                            onClick={() => setDeleteMode(true)}
                            className=""
                            title="Delete Task">
                            <DeleteNoteIcon />
                        </button>
                        <button
                            type="button"
                            className=""
                            title="Edit Task"
                            onClick={() => setEditMode(true)}>
                            <EditNoteIcon />
                        </button>
                    </div>
                </div>
                <p className="text-gray-800 h-48 overflow-auto taskContainer">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default StickyNoteItem;
