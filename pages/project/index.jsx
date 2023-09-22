import Navbar from "@/components/module/Navbar";
import ProjectPage from "@/components/template/ProjectPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import User from "@/models/User";

const Project = ({ projectsNames }) => {
    return (
        <>
            <Navbar title="Project" />
            <ProjectPage projectsNames={projectsNames} />
        </>
    );
};

export default Project;

export async function getServerSideProps({ req, res }) {
    await connectDB();

    const session = await getServerSession(req, res, authOptions);
    const user = await User.findOne({ email: session.user.email });

    let projectsNames = [];
    for (let i = 0; i < user.project.length; i++) {
        projectsNames.push({
            id: user.project[i].id,
            name: user.project[i].name,
        });
    }

    return {
        props: { projectsNames },
    };
}
