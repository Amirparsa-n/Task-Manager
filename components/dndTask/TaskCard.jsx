import { memo, useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import DotTask from "../icons/DotTask";
import EditIcon from "../icons/EditIcon";
import DeleteTaskIcon from "../icons/DeleteTaskIcon";

function TaskCard({ task, deleteTask, updateTask }) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    useEffect(() => {
        if (!editMode) {
            setDescription(task.description);
            setTitle(task.title);
        }
    }, [editMode]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task._id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (editMode) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-bgSecond dark:bg-DarkSecond rounded-xl cursor-default"
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}>
                <div className="p-5">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-x-3">
                            {task.tag && (
                                <div className="bg-[#DADEE3] dark:bg-[#3F4053] text-[#9C9CA5] text-sm px-2 py-1 rounded-lg w-fit">
                                    # {task.tag}
                                </div>
                            )}
                            <div
                                className={`text-sm px-2 py-1 rounded-lg w-fit text-white ${
                                    task.rating === "low" && "bg-green-600"
                                } ${task.rating === "hard" && "bg-red-600"} ${
                                    task.rating === "medium" && "bg-orange-600"
                                }`}>
                                {task.rating}
                            </div>
                        </div>

                        <button onClick={() => setEditMode(false)}>
                            <EditIcon color={"#3E7BFA"} />
                        </button>
                    </div>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-4 font-[500] py-1 bg-transparent w-full rounded-md px-1 border-gray-400"
                    />

                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-gray-400 dark:text-gray-300 leading-[24px] text-sm mt-3 max-h-[100px] overflow-auto description-task py-1 bg-transparent w-full rounded-md px-1 border-gray-400"
                        rows="5"
                    />

                    <button
                        onClick={async () => {
                            await updateTask(task._id, { title, description });
                            setEditMode(false);
                        }}
                        className="flex border-[1.5px] border-primary hover:bg-primary hover:text-white transition-colors hover:transition-colors duration-300 hover:duration-200 w-full justify-center mt-[18px] items-center text-primary rounded-lg py-1">
                        Edit
                    </button>
                </div>
            </div>
        );
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-primary  cursor-grab relative"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-bgSecond dark:bg-DarkSecond rounded-xl cursor-default"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}>
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-3">
                        {task.tag && (
                            <div className="bg-[#DADEE3] dark:bg-[#3F4053] text-[#9C9CA5] text-sm px-2 py-1 rounded-lg w-fit">
                                # {task.tag}
                            </div>
                        )}
                        <div
                            className={`text-sm px-2 py-1 rounded-lg w-fit text-white ${
                                task.rating === "low" && "bg-green-600"
                            } ${task.rating === "hard" && "bg-red-600"} ${
                                task.rating === "medium" && "bg-orange-600"
                            }`}>
                            {task.rating}
                        </div>
                    </div>
                    {mouseIsOver && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="hidden md:block fadeInFast">
                            <EditIcon />
                        </button>
                    )}
                    <button
                        onClick={() => setEditMode(true)}
                        className="md:hidden">
                        <EditIcon />
                    </button>
                </div>

                <h5 className="mt-4 font-[500]">{task.title}</h5>
                {task.description && (
                    <p className="text-gray-400 dark:text-gray-300 leading-[22px] text-sm mt-3 max-h-[66px] overflow-auto description-task">
                        {task.description}
                    </p>
                )}

                <div className="flex justify-between mt-[18px] items-center">
                    <span className="text-sm text-gray-500/50 dark:text-gray-500">
                        {moment(task.date).format("MMM Do")}
                    </span>

                    <div className="flex items-center gap-x-4">
                        {mouseIsOver && (
                            <button
                                type="button"
                                className="fadeInFast hidden md:block"
                                title="Delete Task"
                                onClick={() => deleteTask(task._id)}>
                                <DeleteTaskIcon />
                            </button>
                        )}
                        <button
                            type="button"
                            className="md:hidden"
                            title="Delete Task"
                            onClick={() => deleteTask(task._id)}>
                            <DeleteTaskIcon />
                        </button>

                        <DotTask />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(TaskCard);
