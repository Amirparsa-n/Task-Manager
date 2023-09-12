import TaskContainer from "@/components/dndTask/TaskContainer";
import Navbar from "@/components/module/Navbar";
import { getSession } from "next-auth/react";

export default function Home({ user }) {
    return (
        <>
            <Navbar title="My Task" />
            <TaskContainer />
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
