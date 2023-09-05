import SignUpPage from "@/components/template/SignUpPage";
import { getSession } from "next-auth/react";

const SignUp = () => {
    return <SignUpPage />;
};

export default SignUp;

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
