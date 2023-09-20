import Link from "next/link";
// icons
import BoxIcon from "../icons/boxIcon";
import { useContext, useEffect, useState } from "react";
import { stateContext } from "@/contexts/ContextProvide";

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
        <div className="px-4 md:px-8 mt-8 flex flex-col gap-y-8 md:flex-row md:flex-wrap md:gap-x-8 md:justify-between">
            {projectsNameData.map((item) => (
                <Link href={`/project/${item.name}`} key={item.id}>
                    <div className="projectItem bg-white dark:bg-DarkSecond hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors duration-500 hover:duration-300 hover:transition-colors shadow-button shadow-gray-600/30 dark:shadow-gray-800/50 py-4 px-4 rounded-xl flex gap-x-3">
                        <BoxIcon />
                        <p
                            className="text-lg "
                            style={{ textTransform: "capitalize" }}>
                            {item.name}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProjectPage;
