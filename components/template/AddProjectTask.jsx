import { useContext, useState } from "react";
import AddTaskInput from "../element/AddTaskInput";
import { stateContext } from "@/contexts/ContextProvide";
import RadioButtonAddTask from "../element/RadioButtonAddTask";

// Icons
import CloseIconCircle from "../icons/CloseIconCircle";

const AddProjectTask = () => {
    const { setShowAddTaskProjectModal,showAddTaskProjectModal, setAddTaskProjectInfo } = useContext(stateContext);

    const [message, setMessage] = useState("");
    const [fadeOutAni, setFadeOutAni] = useState("");
    const [taskProjectDate, setTaskProjectData] = useState({
        title: "",
        description: "",
        status: "todo",
        tag: "",
        rating: "low",
        date: "",
    });
    console.log(taskProjectDate);

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

    const addTaskProjectHandler = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/project/${showAddTaskProjectModal}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskProjectDate),
        });
        const data = await res.json();
        setMessage(data);

        if (data.status === "success") {
            setTimeout(() => {
                setFadeOutAni("fadeOut");
                setAddTaskProjectInfo(data)
            }, 1000);
            setTimeout(() => {
                setShowAddTaskProjectModal(false);
            }, 1800);
        }
    };

    return (
        <>
            <div
                className={`Modal md:z-[99999] md:h-screen mt-[53px] md:mt-0 md:bg-black/40 md:backdrop-blur-sm flex items-center justify-center ${fadeOutAni}`}
                id="main-image">
                <div
                    className={`md:m-auto md:max-w-2xl w-full h-[calc(100vh-124px)] md:rounded-xl border-t-2 border-primary md:border-none transitionSidebar bg-white dark:bg-DarkSecond md:h-fit md:pt-6 px-4 md:px-8 py-6 slideInUp fadeIn `}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-[500] text-primary">
                            Add Task to {showAddTaskProjectModal && <span className="capitalize">{showAddTaskProjectModal}</span>}
                        </h3>
                        <button
                            type="button"
                            onClick={() => setShowAddTaskProjectModal("")}>
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
                                    setTodoData={setTaskProjectData}
                                    todoDate={taskProjectDate}
                                />
                            ))}
                        </div>

                        <div className="flex justify-evenly flex-wrap gap-y-4 mt-6">
                            {status.map((statusItem) => (
                                <RadioButtonAddTask
                                    key={statusItem.id}
                                    name={"status"}
                                    value={statusItem.value}
                                    title={statusItem.title}
                                    setTodoData={setTaskProjectData}
                                    todoDate={taskProjectDate}
                                />
                            ))}
                        </div>
                        <hr className="block h-[1px] border-t-1 border-[#DFDFDF]" />
                        <div className="flex justify-evenly flex-wrap gap-y-4">
                            {rating.map((ratingItem) => (
                                <RadioButtonAddTask
                                    key={ratingItem.id}
                                    name={"rating"}
                                    value={ratingItem.value}
                                    title={ratingItem.title}
                                    setTodoData={setTaskProjectData}
                                    todoDate={taskProjectDate}
                                />
                            ))}
                        </div>

                        <div className="text-center mt-4 h-6">
                            {message && (
                                <p
                                    className={
                                        message.status === "failed"
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }>
                                    {message.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            onClick={addTaskProjectHandler}
                            className="bg-primary py-3 text-white rounded-xl mb-4 md:mb-0 hover:shadow-button hover:transition-shadow duration-500 hover:duration-300">
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .Modal {
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

export default AddProjectTask;
