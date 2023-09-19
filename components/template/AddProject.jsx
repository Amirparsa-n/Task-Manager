import { useContext, useState } from "react";
import AddTaskInput from "../element/AddTaskInput";
import { stateContext } from "@/contexts/ContextProvide";
import RadioButtonAddTask from "../element/RadioButtonAddTask";

// Icons
import CloseIconCircle from "../icons/CloseIconCircle";

const AddProject = () => {
    const { setShowAddProjectModal, setAddProjectInfo } = useContext(stateContext);

    const [message, setMessage] = useState("");
    const [fadeOutAni, setFadeOutAni] = useState("");
    const [projectName, setProjectName] = useState("");

    const addProjectHandler = async (e) => {
        e.preventDefault();
        setMessage("");
        setAddProjectInfo([])
        const res = await fetch("/api/project", {
            method: "POST",
            body: JSON.stringify(projectName),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        setMessage(data);

        if (data.status === "success") {
            setTimeout(() => {
                setFadeOutAni("fadeOut");
                setAddProjectInfo(data);
            }, 1000);
            setTimeout(() => {
                setShowAddProjectModal(false);
            }, 1800);
        }
    };

    return (
        <>
            <div
                className={`Modal md:z-[99999] bottom-20 md:top-0 md:h-screen mt-[53px] md:mt-0 md:bg-black/40 md:backdrop-blur-sm flex items-center justify-center ${fadeOutAni}`}
                id="main-image">
                <div
                    className={`md:m-auto md:max-w-xl w-full  md:rounded-xl border-t-2 border-primary md:border-none transitionSidebar bg-white dark:bg-DarkSecond md:h-fit md:pt-6 px-4 md:px-8 py-6 slideInUp fadeIn `}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-[500] text-primary">
                            Add New Project
                        </h3>
                        <button
                            type="button"
                            onClick={() => setShowAddProjectModal(false)}>
                            <CloseIconCircle />
                        </button>
                    </div>
                    <form action="#" method="POST" className="mt-5">
                        <div className={`flex flex-col gap-y-1`}>
                            <label htmlFor={"nameProject"}>Project name</label>
                            <input
                                type={"text"}
                                name={"nameProject"}
                                id={"nameProject"}
                                className="form-input rounded-lg border-gray-500 bg-transparent"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>

                        <div className="text-center mt-4 min-h-[24px]">
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
                            onClick={addProjectHandler}
                            className="bg-primary py-3 w-full text-white rounded-xl mb-4 md:mb-0 hover:shadow-button hover:transition-shadow duration-500 hover:duration-300">
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .Modal {
                    position: fixed;
                    left: 0;
                    width: 100%;
                    -webkit-transition: 0.5s;
                    overflow: auto;
                    transition: all 0.3s linear;
                }
            `}</style>
        </>
    );
};

export default AddProject;
