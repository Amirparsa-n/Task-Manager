import SignInPage from "@/components/template/SignInPage";
import { getSession } from "next-auth/react";

const SignIn = () => {
    return <SignInPage />;
};

export default SignIn;

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
