import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import DotTask from "../icons/DotTask";

function TaskCard({ task, deleteTask, updateTask }) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(true);

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

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-primary  cursor-grab relative"
            />
        );
    }

    if (editMode) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={toggleEditMode}
                className="bg-bgSecond dark:bg-DarkSecond rounded-xl cursor-default"
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}>
                <div className="p-5">
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
                        <DotTask />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            className="bg-bgSecond dark:bg-DarkSecond rounded-xl cursor-default"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}>
            <div className="p-5">
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
                    <DotTask />
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
