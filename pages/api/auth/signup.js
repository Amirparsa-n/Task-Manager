import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function (req, res) {
    if (req.method !== "POST") return;

    try {
        await connectDB();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "Error to connect DB",
        });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(422)
            .json({ status: "failed", message: "Invalid Data" });
    }

    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!email.match(regex)) {
        return res
            .status(422)
            .json({ status: "failed", message: "Email is not valid" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res
            .status(422)
            .json({ status: "failed", message: "User exist already!" });
    }

    const hashedPassword = await hashPassword(password);
    
    try {
        const createUser = await User.create({
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({
            status: "success",
            message: "User created successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: "failed", message:"User created failed" })
    }

}
