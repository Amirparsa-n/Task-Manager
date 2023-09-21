import Image from "next/image";
import { useState } from "react";
import FormAuth from "../module/FormAuth";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";


const SignInPage = () => {

    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [signUpLoading, setSignUpLoading] = useState(false)

    const signInHandler = async (e) => {
        e.preventDefault();
        setSignUpLoading(true);
        setMessage("")

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        setMessage(res);
        if (!res.error) {
            setEmail("");
            setPassword("");
            router.replace('/')
        } else {
            setSignUpLoading(false)
        }
    };

    return (
        <div className="container h-screen w-screen flex items-center justify-center -mt-6 md:mt-0">
            <div className="dark:bg-DarkSecond flex flex-row sm:justify-center items-center md:gap-x-2 lg:gap-x-7 justify-between w-full lg:w-10/12 xl:w-9/12 p-0 rounded-3xl shadow-gray-300/70 dark:shadow-none shadow-simple">
                <div className="md:w-1/2 w-full p-8">
                    <div className="flex items-center gap-x-2">
                        <Image
                            src={"/assets/images/logo.png"}
                            width={60}
                            height={60}
                            className="w-[50px]"
                            alt="logo"
                            priority={true}
                        />
                        <h2 className="font-bold text-xl dark:text-white">
                            Task manager
                        </h2>
                    </div>

                    <div className="mt-16">
                        <p className="text-sm dark:text-gray-400">
                            Start for free
                        </p>
                        <h3 className="text-2xl text-primary font-semibold mt-4 dark:text-white">
                            Login to account
                        </h3>

                        <form className="mt-8 w-full" method="POST">
                            <FormAuth
                                email={email}
                                password={password}
                                setEmail={setEmail}
                                setPassword={setPassword}
                            />

                            {message.error && (
                                <div className="mt-6">
                                    <p className={"text-red-600"}>
                                        {message.error}
                                    </p>
                                </div>
                            )}
                            {message && !message.error && (
                                <div className="mt-6">
                                    <p className={"text-green-600"}>
                                        Login was successful
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={signInHandler}
                                type="submit"
                                disabled={signUpLoading }
                                className="flex justify-center items-center gap-x-2 bg-primary w-full text-lg py-3 mt-[28px] rounded-2xl text-white hover:shadow-button hover:shadow-primary/50 dark:hover:shadow-primary/20 hover:transition-shadow hover:duration-150 duration-200 transition-shadow ">
                                 <span>Sign in</span> {signUpLoading && <span className="loader"></span>}
                            </button>
                        </form>

                        <p className="font-light text-sm mt-8 text-center dark:text-gray-400">
                            Do you have an account?{" "}
                            <Link
                                className="text-primary font-normal"
                                href={"/signup"}>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="md:w-1/2 hidden h-full md:inline-block dark:bg-[#3E7BFA]/70 dark:rounded-e-3xl">
                    <div className="h-full dark:py-[90px] lg:dark:py-[72px] xl:dark:py-[44px] 2xl:dark:py-0">
                        <Image
                            src={"/assets/images/Mobile login-pana.svg"}
                            width={600}
                            height={600}
                            className="w-fit"
                            alt="image SignIn"
                            priority={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
