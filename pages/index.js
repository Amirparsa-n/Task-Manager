import TaskContainer from "@/components/dndTask/TaskContainer";
import Navbar from "@/components/module/Navbar";
import { stateContext } from "@/contexts/ContextProvide";
import { getSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home({ user }) {
    const { addTaskInfo } = useContext(stateContext);
    const [tasks, setTasks] = useState([]);

    const router = useRouter();

    const { theme } = useTheme();

    useEffect(() => {
        fetchTodos();
    }, [addTaskInfo]);

    const fetchTodos = async () => {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        console.log(data.data);
        setTasks(data.data);
    };

    const UpdateStatus = async (id, status) => {
        const res = await fetch("/api/tasks/changeStatus", {
            method: "PATCH",
            body: JSON.stringify({ id, status }),
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
        const res = await fetch("/api/tasks", {
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
        const res = await fetch(`/api/tasks/${id}`, {
            method: "DELETE",
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
            <Navbar title="My Task" />
            <TaskContainer tasks={tasks} setTasks={setTasks} UpdateStatus={UpdateStatus} updateTask={updateTask} deleteTask={deleteTask} />
        </>
    );
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/signup",
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}
