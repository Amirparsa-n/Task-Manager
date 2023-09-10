import { useContext, useEffect, useState } from "react";
import Navbar from "../module/Navbar";
import Tasks from "../module/Tasks";
import { stateContext } from "@/contexts/ContextProvide";

const TaskPage = () => {
    const { activeMenu } = useContext(stateContext);

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTodos(data.data);
    };

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
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }, []);

    return (
        <>
            <Navbar title="My Task" />

            <div className="overflow-x-scroll no-scrollbar md:show-scrollbar items md:cursor-all-scroll xl:cursor-default">
                <div
                    className={`px-4 md:px-8 mt-6 md:mt-12 flex justify-between gap-x-5 ${
                        activeMenu && "md:w-[calc(100vw-296px)]"
                    }`}>
                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-todo font-semibold dark:bg-DarkSecond">
                            To Do
                        </div>
                        <div className="">
                            <Tasks data={todos.todo} />
                        </div>
                    </div>

                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-inProgress font-semibold dark:bg-DarkSecond">
                            In Progress
                        </div>
                        <Tasks data={todos["in-progress"]} />
                    </div>

                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-review font-semibold dark:bg-DarkSecond">
                            Review
                        </div>
                        <Tasks data={todos.review} />
                    </div>

                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-done font-semibold dark:bg-DarkSecond">
                            Done
                        </div>
                        <Tasks data={todos.done} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskPage;
