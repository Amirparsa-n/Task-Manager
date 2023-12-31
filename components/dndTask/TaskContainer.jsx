import { useContext, useEffect, useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { stateContext } from "@/contexts/ContextProvide";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

const Cols = [
    {
        id: "todo",
        title: "To Do",
    },
    {
        id: "in-progress",
        title: "In Progress",
    },
    {
        id: "review",
        title: "Review",
    },
    {
        id: "done",
        title: "Done",
    },
];

function TaskContainer({ tasks, setTasks, UpdateStatus, updateTask, deleteTask }) {
    const { activeMenu, addTaskInfo } = useContext(stateContext);
    
    const [columns, setColumns] = useState(Cols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 30,
            },
        })
    );
    const { theme } = useTheme();

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateStatusData, setUpdateStatusData] = useState(null);


    const changeStatus = async (id, status) => {
        setUpdateStatusData({ id, status });
    };


    useEffect(() => {
        if (isUpdate && updateStatusData) {
            UpdateStatus(updateStatusData.id, updateStatusData.status);
        }
    }, [isUpdate]);


    useEffect(() => {
        const slider = document.querySelector(".items");
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            slider.classList.add("active");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener("mouseleave", () => {
            isDown = false;
            slider.classList.remove("active");
        });
        slider.addEventListener("mouseup", () => {
            isDown = false;
            slider.classList.remove("active");
        });
        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }, []);

    if (tasks)
        return (
            <>
                <div
                    className={`overflow-x-scroll no-scrollbar md:show-scrollbar items md:cursor-all-scroll xl:cursor-default px-4 md:px-8 mt-6 md:mt-12 flex justify-between gap-x-5 ${
                        activeMenu && "lg:w-[calc(100vw-296px)]"
                    }`}>
                    <DndContext
                        sensors={sensors}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}>
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(
                                        (task) => task.status === col.id
                                    )}
                                />
                            ))}
                        </SortableContext>

                        {createPortal(
                            <DragOverlay>
                                {activeTask && (
                                    <TaskCard
                                        task={activeTask}
                                        deleteTask={deleteTask}
                                        updateTask={updateTask}
                                    />
                                )}
                            </DragOverlay>,
                            document.body
                        )}
                    </DndContext>
                </div>
                <Toaster />
            </>
        );

    function onDragStart(event) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setIsUpdate(false);
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event) {
        setActiveColumn(null);
        setActiveTask(null);
        setIsUpdate(true);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;


        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeId
            );

            const overColumnIndex = columns.findIndex(
                (col) => col.id === overId
            );
            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // I'm dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t._id === activeId);
                const overIndex = tasks.findIndex((t) => t._id === overId);

                if (tasks[activeIndex].status !== tasks[overIndex].status) {
                    tasks[activeIndex].status = tasks[overIndex].status;
                    changeStatus(
                        tasks[activeIndex]._id,
                        tasks[overIndex].status
                    );
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                changeStatus(tasks[activeIndex]._id, tasks[overIndex].status);
                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";
        // I'm dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t._id === activeId);
                tasks[activeIndex].status = overId;
                console.log("DROPPING TASK OVER COLUMN");
                changeStatus(tasks[activeIndex]._id, tasks[activeIndex].status);
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
}

export default TaskContainer;
