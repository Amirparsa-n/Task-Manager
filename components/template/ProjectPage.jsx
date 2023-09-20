import Link from "next/link";
import { stateContext } from "@/contexts/ContextProvide";
import { useContext, useEffect, useState } from "react";
import ProjectItem from "../module/ProjectItem";


const ProjectPage = ({ projectsNames }) => {
    const { addProjectInfo } = useContext(stateContext);
    const [projectsNameData, setProjectsNameData] = useState(projectsNames);

    useEffect(() => {
        fetchProjectsNamesData();
    }, [addProjectInfo]);

    const fetchProjectsNamesData = async () => {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProjectsNameData(data.data);
    };

    return (
        <div className="px-4 md:px-8 mt-8 flex flex-col gap-y-8 md:flex-row md:flex-wrap md:gap-x-8 md:justify-between pb-8">
            {projectsNameData.map((item) => (
                <ProjectItem key={item.id} name={item.name} id={item.id} />
            ))}
        </div>
    );
};

export default ProjectPage;
