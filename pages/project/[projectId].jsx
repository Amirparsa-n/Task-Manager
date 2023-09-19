import Navbar from "@/components/module/Navbar";
// import User from "@/models/User";
import { useRouter } from "next/router";

const ProjectItem = () => {

    const router = useRouter();
    const { projectId } = router.query;

    return (
        <>
            <Navbar title={projectId} />
        </>
    );
};

export default ProjectItem;

export async function getServerSideProps(context) {
    const { projectId } = context.params;
    console.log(projectId);


    // const result = await User.findOne({"project.name": projectId})
    // console.log(result);

    return {
        props: {}
    }
}

