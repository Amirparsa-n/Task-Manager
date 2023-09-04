import Image from "next/image";
import { useState } from "react";
import FormAuth from "../module/FormAuth";
import Link from "next/link";

const SignUpPage = () => {

    const [email , setEmail] = useState();
    const [password , setPassword] = useState();

    return (
        <div className="container md:h-screen md:w-screen md:flex md:items-center md:justify-center">
            <div className="flex flex-row sm:justify-center justify-between md:w-2/3 mt-10 md:bg-red-50">
                <div className="md:w-1/2">

                    <div className="flex items-center gap-x-2">
                        <Image src={'/assets/images/logo.png'} width={60} height={60} className="w-[50px]" />
                        <h2 className="font-bold text-xl">Task manager</h2>
                    </div>

                    <div className="mt-16">
                        <p className="text-sm">Start for free</p>
                        <h3 className="text-2xl text-primary font-semibold mt-4">Create an account</h3>

                        <div className="mt-8 w-full">
                            <FormAuth email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
                        </div>

                        <button className="bg-primary w-full text-lg py-3 mt-[28px] rounded-2xl text-white hover:shadow-button hover:shadow-primary/50 hover:transition-shadow hover:duration-150 duration-200 transition-shadow ">Sign up</button>
                    
                        <p className="font-light text-sm mt-8 text-center">Already have an account? <Link className="text-primary font-normal" href={"/signin"}>Sign in</Link></p>
                    </div>
                </div>

                <div className="md:w-1/2 hidden">
                    image
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;