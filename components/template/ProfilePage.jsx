import { useContext, useState } from "react";
import { stateContext } from "@/contexts/ContextProvide";
// icons
import ProfileEditIcon from "../icons/ProfileEditIcon";
import EditProfileInput from "../icons/EditProfileInput";

// components
import ProfileInput from "../module/ProfileInput";

const ProfilePage = () => {
    const { activeMenu } = useContext(stateContext);
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        expertise: "",
        password: "",
    });
    console.log(profileData);

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

    return (
        <div className="profileContainer h-[200px] 3xl:h-[300px] relative flex justify-center ">
            <div className={`mt-20 md:mt-32 3xl:mt-48 mb-40 md:mb-0 h-[800px] md:h-fit flex gap-x-2 md:gap-x-4 lg:gap-x-8 ${activeMenu && 'lg:gap-x-2' } xl:gap-x-8 flex-col gap-y-8 md:flex-row w-full md:w-fit px-4 md:px-0 lg:px-8 ${activeMenu && 'lg:px-0' } xl:px-8`}>
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
                        <p className={`md:text-lg w-44 ${activeMenu ? 'lg:w-44' : 'lg:w-60'} xl:w-60 titleNote text-center`}>your name</p>
                        <p className="text-sm text-gray-500">your Expertise</p>
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
                    <button className="mt-8 float-right bg-primary rounded-lg px-10 py-[10px] text-white hover:shadow-button hover:transition-shadow transition-shadow duration-300 hover:duration-200">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
