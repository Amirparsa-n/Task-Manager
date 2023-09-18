import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import Joi from "joi";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    try {
        await connectDB();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ status: "failed", message: "Error in connecting to DB" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res
            .status(401)
            .json({ status: "failed", message: "You are note logged in!" });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return res
            .status(404)
            .json({ status: "failed", message: "user not found" });
    }

    const AddProjectSchema = Joi.string().required().max(60);

    if (req.method === "POST") {
        const { error, value } = AddProjectSchema.validate(req.body, {
            abortEarly: true,
        });
        console.log(value);

        if (error) {
            console.log(error);
            const { message } = error.details[0];
            return res.status(422).json({ status: "failed", message });
        }

        const validProjectName = await User.findOne({"project.name": value})
        console.log(validProjectName);
        if (validProjectName) {
            return res.status(422).json({status: 'failed', message: 'There is a project name! Choose another name'});
        }
        
        try {
            user.project.push({name: value});
            user.save();

            res.status(201).json({
                status: "success",
                message: "Project created!",
            });
        } catch (e) {
            res.status(500).json({status: 'failed', message: 'Error creating project'})
        }
    }
}
