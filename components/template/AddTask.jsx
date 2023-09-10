import { useContext, useState } from "react";
import AddTaskInput from "../element/AddTaskInput";
import { stateContext } from "@/contexts/ContextProvide";
import RadioButton from "../element/RadioButton";

// Icons
import CloseIconCircle from "../icons/CloseIconCircle";

const AddTask = () => {
    const { setShowAddTaskModal } = useContext(stateContext);

    const [message, setMessage] = useState("")
    const [fadeOutAni, setFadeOutAni] = useState("")
    const [todoDate, setTodoData] = useState({
        title: "",
        description: "",
        status: "todo",
        tag: "",
        rating: "low",
        date: "",
    });

    const forms = [
        { id: 0, label: "Title *", name: "title", type: "text" },
        { id: 1, label: "Description", name: "description", type: "text" },
        { id: 2, label: "Tag", name: "tag", type: "text" },
        { id: 3, label: "Date *", name: "date", type: "date" },
    ];

    const status = [
        { id: 0, value: "todo", title: "Todo" },
        { id: 2, value: "in-progress", title: "In Progress" },
        { id: 3, value: "review", title: "Review" },
        { id: 4, value: "done", title: "Done" },
    ];

    const rating = [
        { id: 0, value: "low", title: "Low" },
        { id: 2, value: "medium", title: "Medium" },
        { id: 3, value: "hard", title: "Hard" },
    ];

    const addTaskHandler = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(todoDate),
            headers: {'Content-Type': 'application/json'},
        })
        const data = await res.json();
        setMessage(data)

        if (data.status === 'success') {
            setTimeout(() => {
                setFadeOutAni("fadeOut");
            }, 1000)
            setTimeout(() => {
                setShowAddTaskModal(false);
            }, 1800)
        }
    }

    return (
        <>
            <div
                className={`Modal md:z-[99999] h-[81%] md:h-full mt-[53px] md:pt-[57px] md:mt-0 md:bg-black/40 md:backdrop-blur-sm ${fadeOutAni}`}
                id="main-image">
                <div className={`md:m-auto md:max-w-2xl md:rounded-xl border-t-2 border-primary md:border-none transitionSidebar bg-white h-[40rem] md:h-fit md:pt-6 px-4 md:px-8 py-6 slideInUp fadeIn `}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-[500] text-primary">
                            Add Task
                        </h3>
                        <button
                            type="button"
                            onClick={() => setShowAddTaskModal(false)}>
                            <CloseIconCircle />
                        </button>
                    </div>
                    <form
                        action="#"
                        method="POST"
                        className="flex flex-col gap-y-4 mt-5">
                        <div className="flex flex-col md:flex-row md:flex-wrap w-full md:gap-x-6 gap-y-4">
                            {forms.map((form) => (
                                <AddTaskInput
                                    key={form.id}
                                    label={form.label}
                                    name={form.name}
                                    type={form.type}
                                    setTodoData={setTodoData}
                                    todoDate={todoDate}
                                />
                            ))}
                        </div>

                        <div className="flex justify-evenly flex-wrap gap-y-4 mt-6">
                            {status.map((statusItem) => (
                                <RadioButton
                                    key={statusItem.id}
                                    name={"status"}
                                    value={statusItem.value}
                                    title={statusItem.title}
                                    setTodoData={setTodoData}
                                    todoDate={todoDate}
                                />
                            ))}
                        </div>
                        <hr className="block h-[1px] border-t-1 border-[#DFDFDF]" />
                        <div className="flex justify-evenly flex-wrap gap-y-4">
                            {rating.map((ratingItem) => (
                                <RadioButton
                                    key={ratingItem.id}
                                    name={"rating"}
                                    value={ratingItem.value}
                                    title={ratingItem.title}
                                    setTodoData={setTodoData}
                                    todoDate={todoDate}
                                />
                            ))}
                        </div>

                        <div className="text-center mt-4 h-6">
                            {message && (
                                <p className={message.status === 'failed' ? 'text-red-600' : 'text-green-600'}>{message.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            onClick={addTaskHandler}
                            className="bg-primary py-3 text-white rounded-xl mb-4 md:mb-0 hover:shadow-button">
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .Modal {
                    display: block;
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100%;
                    -webkit-transition: 0.5s;
                    overflow: auto;
                    transition: all 0.3s linear;
                }
            `}</style>
        </>
    );
};

export default AddTask;
