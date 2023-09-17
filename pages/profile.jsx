import Navbar from "@/components/module/Navbar";
import ProfilePage from "@/components/template/ProfilePage";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const profile = ({ profileDataDB }) => {
    return (
        <>
            <Navbar title="Profile" />
            <ProfilePage data={profileDataDB} />
        </>
    );
};

export default profile;

export async function getServerSideProps({ req, res }) {
    try {
        await connectDB();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ status: "failed", message: "Error in connecting to DB" });
    }
    
    const session = await getServerSession(req, res, authOptions);
    const user = await User.findOne({ email: session.user.email });


    // if (!session && user) {
    //     return {
    //         redirect: {destination: `/login`}
    //     }
    // }

    let profileDataDB;
    if (user.firstName) {
        profileDataDB = {
            firstName: user.firstName,
            lastName: user.lastName,
            expertise: user.expertise,
        } 
    } else {
        profileDataDB = null;
    }
    


    return {
        props: {profileDataDB},
    };
}
