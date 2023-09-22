import { useContext, useState } from "react";
import { stateContext } from "@/contexts/ContextProvide";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

// icons
import ProfileEditIcon from "../icons/ProfileEditIcon";
import EditProfileInput from "../icons/EditProfileInput";
import LogoutIconMobile from "../icons/logoutIconMobile";

// components
import ProfileInput from "../module/ProfileInput";

const ProfilePage = ({ data }) => {
    const { activeMenu } = useContext(stateContext);
    const { theme } = useTheme();
    const [profileDataDB, setProfileDataDB] = useState(data);
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        expertise: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function readURL(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imagePreview = document.getElementById("imagePreview");
                if (imagePreview) {
                    imagePreview.style.backgroundImage =
                        "url(" + e.target.result + ")";
                    imagePreview.style.display = "none";
                    imagePreview.style.display = "block";
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function handleImageUploadChange(event) {
        readURL(event.target);
    }

    const updateProfile = async () => {
        setErrorMessage("");
        setIsLoading(true);
        const res = await fetch("/api/profile", {
            method: "PATCH",
            body: JSON.stringify(profileData),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status === "failed") {
            setErrorMessage(data.message);
        } else if (data.status === "success") {
            setProfileDataDB(data.data);
            setProfileData({
                firstName: "",
                lastName: "",
                expertise: "",
                password: "",
            });
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
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="profileContainer h-[200px] 3xl:h-[300px] relative flex justify-center">
                <button
                    type="button"
                    onClick={() => signOut()}
                    className="md:hidden btnLogout absolute right-4 top-5 border border-white rounded-xl px-4 py-[6px] text-white flex gap-x-2 items-center hover:bg-primary hover:text-white transition-colors hover:transition-colors duration-300 hover:duration-200">
                    <span>Logout</span>
                    <LogoutIconMobile />
                </button>
                <div
                    className={`mt-20 md:mt-32 3xl:mt-48 mb-40 md:mb-0 h-[820px] md:h-fit flex gap-x-2 md:gap-x-4 lg:gap-x-8 ${
                        activeMenu && "lg:gap-x-2"
                    } xl:gap-x-8 flex-col gap-y-8 md:flex-row w-full md:w-fit px-4 md:px-0 lg:px-8 ${
                        activeMenu && "lg:px-0"
                    } xl:px-8`}>
                    <div className="bg-white dark:bg-DarkSecond shadow-simple rounded-xl p-6 flex gap-x-3 md:flex-col justify-around md:justify-center md:gap-y-4 items-center">
                        <div className="avatar-upload w-[120px] md:w-[160px]">
                            <div className="avatar-edit">
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={handleImageUploadChange}
                                />
                                <label htmlFor="imageUpload">
                                    <EditProfileInput />
                                </label>
                            </div>
                            <div className="avatar-preview w-[100px] h-[100px] md:w-[160px] md:h-[160px]">
                                <div
                                    id="imagePreview"
                                    style={{
                                        backgroundImage:
                                            "url(/assets/images/Avatar.png)",
                                    }}></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-3 items-center">
                            <p
                                className={`md:text-lg w-44 ${
                                    activeMenu ? "lg:w-44" : "lg:w-60"
                                } xl:w-60 titleNote text-center`}>
                                {profileDataDB
                                    ? profileDataDB.firstName +
                                      " " +
                                      profileDataDB.lastName
                                    : "your name"}
                            </p>
                            <p className="text-sm text-gray-500">
                                {profileDataDB && profileDataDB.expertise
                                    ? profileDataDB.expertise
                                    : "your Expertise"}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-DarkSecond shadow-simple rounded-xl p-6">
                        <div className="flex gap-x-2">
                            <ProfileEditIcon />
                            <h2 className="text-lg font-semibold text-primary">
                                Update Profile
                            </h2>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4 md:gap-y-5">
                            <div className="flex gap-x-12 flex-col md:flex-row gap-y-4">
                                <ProfileInput
                                    label={"FirstName"}
                                    type={"text"}
                                    profileData={profileData}
                                    setProfileData={setProfileData}
                                    name={"firstName"}
                                />
                                <ProfileInput
                                    label={"LastName"}
                                    type={"text"}
                                    profileData={profileData}
                                    setProfileData={setProfileData}
                                    name={"lastName"}
                                />
                            </div>
                            <div className="flex gap-x-12 flex-col md:flex-row gap-y-4">
                                <ProfileInput
                                    label={"Expertise"}
                                    type={"text"}
                                    profileData={profileData}
                                    setProfileData={setProfileData}
                                    name={"expertise"}
                                />
                                <ProfileInput
                                    label={"Password"}
                                    type={"password"}
                                    profileData={profileData}
                                    setProfileData={setProfileData}
                                    name={"password"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:mt-8 md:gap-4 md:justify-between">
                            <div className="h-14 md:h-fit flex items-center">
                                {errorMessage && (
                                    <p className="text-red-500 text-sm lg:text-base">
                                        {errorMessage}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={updateProfile}
                                disabled={isLoading}
                                className="w-fit ml-auto bg-primary rounded-lg px-10 py-[10px] text-white hover:shadow-button hover:transition-shadow transition-shadow duration-300 hover:duration-200 flex gap-x-1">
                                <span>Update</span>
                                {isLoading && <span className="loader"></span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default ProfilePage;
