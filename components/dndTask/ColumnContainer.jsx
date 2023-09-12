import { SortableContext, useSortable } from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";

function ColumnContainer({
    column,
    tasks,
    deleteTask,
    updateTask,
}) {

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task._id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className="w-[280px] 3xl:w-[320px] flex-shrink-0" ref={setNodeRef} style={style}>
            <div
                className={`bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] font-semibold dark:bg-DarkSecond ${
                    column.id === "todo" && "border-todo"
                } ${column.id === "in-progress" && "border-inProgress"} ${
                    column.id === "review" && "border-review"
                } ${column.id === "done" && "border-done"} `}>
                {column.title}
            </div>

            {/* Column task container */}
            <div className="h-[calc(100vh-219px)] md:h-[calc(100vh-183px)] overflow-auto taskContainer">
                <div className="mt-6 flex flex-col gap-y-5 ">
                    <SortableContext items={tasksIds}>
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        ))}
                    </SortableContext>
                </div>
            </div>
        </div>
    );
}

export default ColumnContainer;
