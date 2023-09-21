import Link from "next/link";
import { stateContext } from "@/contexts/ContextProvide";
import { useContext, useEffect, useState } from "react";
import ProjectItem from "../module/ProjectItem";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";


const ProjectPage = ({ projectsNames }) => {
    const { addProjectInfo } = useContext(stateContext);
    const [projectsNameData, setProjectsNameData] = useState(projectsNames);

    const {theme} = useTheme();
    useEffect(() => {
        fetchProjectsNamesData();
    }, [addProjectInfo]);

    const fetchProjectsNamesData = async () => {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProjectsNameData(data.data);
    };

    const deleteProject = async (id) => {
        const res = await fetch("/api/project", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status === "success") {
            fetchProjectsNamesData();
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
    };

    return (
        <div className="px-4 md:px-8 mt-8 flex flex-col gap-y-8 md:flex-row md:flex-wrap md:gap-x-8 md:justify-between pb-8">
            {projectsNameData.map((item) => (
                <ProjectItem key={item.id} name={item.name} id={item.id} deleteProject={deleteProject} />
            ))}
        </div>
    );
};

export default ProjectPage;
