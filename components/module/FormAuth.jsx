import { useState } from "react";
import EyeShowIcon from "../icons/EyeShowIcon";
import EyeHideIcon from "../icons/EyeHideIcon";

const FormAuth = ({ email, password, setEmail, setPassword }) => {
    const [passwordType, setPasswordType] = useState("password");

    return (
        <>
            <div>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl border-gray-500 py-3 w-full dark:bg-transparent dark:border-gray-400"
                />
            </div>
            <div className="mt-5 relative w-full">
                <input
                    type={passwordType}
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className=" rounded-2xl border-gray-500 py-3 pr-[52px] w-full dark:bg-transparent dark:border-gray-400"
                />
                {passwordType === 'password' ? (
                    <button
                        type="button"
                        onClick={() => setPasswordType("text")}
                        className="absolute right-5 top-[14px]">
                        <EyeShowIcon />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setPasswordType("password")}
                        className="absolute right-5 top-[12px]">
                        <EyeHideIcon />
                    </button>
                )}
            </div>
        </>
    );
};

export default FormAuth;
