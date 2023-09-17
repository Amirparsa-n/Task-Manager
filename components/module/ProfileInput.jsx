const ProfileInput = ({ label, type, profileData, setProfileData, name }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <label htmlFor="">{label}</label>
            <input
                type={type}
                id={label}
                name={name}
                className="rounded-lg 2xl:w-80 3xl:w-96 bg-transparent"
                value={profileData[name]}
                onChange={(e) => setProfileData({...profileData, [name]: e.target.value})}
            />
        </div>
    );
};

export default ProfileInput;
