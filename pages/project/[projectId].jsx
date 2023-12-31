import TaskContainer from "@/components/dndTask/TaskContainer";
import SpinnerPage from "@/components/element/SpinnerPage";
import Navbar from "@/components/module/Navbar";
import { stateContext } from "@/contexts/ContextProvide";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProjectItem = ({ projectName }) => {
    const { addTaskInfo, addTaskProjectInfo } = useContext(stateContext);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState("");
    console.log(tasks);
    const router = useRouter();

    const { theme } = useTheme();

    useEffect(() => {
        fetchTodos();
    }, [addTaskInfo, router.asPath, addTaskProjectInfo]);

    const fetchTodos = async () => {
        setIsLoading("")
        const res = await fetch(`/api/project/${projectName}`);
        const data = await res.json();
        setTasks(data.data);
        setIsLoading(data.status)
    };

    const UpdateStatus = async (id, status) => {
        const res = await fetch("/api/project/changeStatus", {
            method: "PATCH",
            body: JSON.stringify({ id, status, projectName }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status === "failed") {
            if (theme === "light") {
                toast.error(data.message);
            } else {
                toast.error(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
            setTimeout(() => {
                router.reload();
            }, 600);
        }
        console.log(data);
    };

    async function updateTask(id, { title, description }) {
        const res = await fetch(`/api/project/${projectName}`, {
            method: "PATCH",
            body: JSON.stringify({ id, title, description }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status === "success") {
            fetchTodos();
            if (theme === "light") {
                toast.success(data.message);
            } else {
                toast.success(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        } else if (data.status === "failed") {
            if (theme === "light") {
                toast.error(data.message);
            } else {
                toast.error(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        }
    }

    async function deleteTask(id) {
        const res = await fetch("/api/project/deleteTask", {
            method: "DELETE",
            body: JSON.stringify({ id, projectName }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        fetchTodos();
        if (data.status === "success") {
            if (theme === "light") {
                toast.success(data.message);
            } else {
                toast.success(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        } else if (data.status === "failed") {
            if (theme === "light") {
                toast.error(data.message);
            } else {
                toast.error(data.message, {
                    style: {
                        background: "#2e2e2e",
                        color: "#fff",
                    },
                });
            }
        }
        console.log(data);
    }

    return (
        <>
            <Navbar title={projectName} />
            {isLoading ? (
                <TaskContainer
                    tasks={tasks}
                    setTasks={setTasks}
                    UpdateStatus={UpdateStatus}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            ) : (
                <SpinnerPage />
            )}
        </>
    );
};

export default ProjectItem;

export async function getServerSideProps(context) {
    const { projectId } = context.params;

    await connectDB();

    const filteredProjects = await User.find(
        {
            "project.name": projectId,
        },
        {
            "project.$": 1,
        }
    );
    const [project] = filteredProjects.map((user) => user.project[0]);

    if (!project) {
        return {
            notFound: true,
        };
    }

    return {
        props: { projectName: projectId },
    };
}
