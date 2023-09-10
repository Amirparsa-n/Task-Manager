import { useContext, useEffect, useState } from "react";
import Navbar from "../module/Navbar";
import Tasks from "../module/Tasks";
import { stateContext } from "@/contexts/ContextProvide";

const TaskPage = () => {

    const {activeMenu} = useContext(stateContext);

    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async() => {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTodos(data.data);
    }

    return (
        <>
            <Navbar title="My Task" />

            <div className="overflow-x-scroll">

                <div className={`px-4 md:px-8 mt-6 md:mt-12 flex justify-between gap-x-5 ${ activeMenu && 'md:w-[calc(100vw-296px)]'}`}>
                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-todo font-semibold">To Do</div>
                        <div className="">
                            <Tasks data={todos.todo} />
                        </div>
                    </div>

                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-inProgress font-semibold">In Progress</div>
                        <Tasks data={todos["in-progress"]} />
                    </div>

                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-review font-semibold">Review</div>
                        <Tasks data={todos.review} />
                    </div>

                    <div className="w-[280px] flex-shrink-0">
                        <div className="bg-bgSecond py-4 px-5 rounded-xl border-b-[3px] border-done font-semibold">Done</div>
                        <Tasks data={todos.done} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskPage;
