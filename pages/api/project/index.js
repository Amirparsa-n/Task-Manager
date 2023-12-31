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

    const AddProjectSchema = Joi.string().max(60).required();
    const deleteSchema = Joi.object({
        id: Joi.string().pattern(/^[a-fA-F0-9]{24}$/).required(),
    })

    if (req.method === "POST") {
        const { error, value } = AddProjectSchema.validate(req.body, {
            abortEarly: true,
        });

        if (error) {
            console.log(error);
            const { message } = error.details[0];
            return res.status(422).json({ status: "failed", message });
        }

        if (value.match(/\s/)) {
            return res.status(422).json({
                status: "failed",
                message: "Space is not allowed. Use '-' or '-'",
            });
        }

        const validUrl = validateURLPath(value);
        if (!validUrl) {
            return res.status(422).json({
                status: "failed",
                message:
                    "Do not use these characters: '<', '>', '#', '%', '{', '}', '|', '', '^', '~', '[', ' ]', '`', ';', '/', '?', ':', '@', '=', '&'",
            });
        }

        const validProjectName = await User.findOne({ "project.name": value });
        console.log(validProjectName);
        if (validProjectName) {
            return res.status(422).json({
                status: "failed",
                message: "There is a project name! Choose another name",
            });
        }

        try {
            user.project.push({ name: value });
            user.save();

            res.status(201).json({
                status: "success",
                message: "Project created!",
            });
        } catch (e) {
            res.status(500).json({
                status: "failed",
                message: "Error creating project",
            });
        }
    } else if (req.method === "GET") {
        let projectsNames = [];
        for (let i = 0; i < user.project.length; i++) {
            projectsNames.push({
                id: user.project[i].id,
                name: user.project[i].name,
            });
        }
        res.status(200).json({ status: "success", data: projectsNames });
    } else if (req.method === "DELETE") {

        const { error, value } = deleteSchema.validate(req.body, {
            abortEarly: true,
        });

        if (error) {
            console.log(error);
            const { message } = error.details[0];
            return res.status(422).json({ status: "failed", message });
        }
        const validProjectName = await User.findOne(
            { project: { $elemMatch: { _id: value.id } } },
            { "project.$": 1 }
        );
        if (!validProjectName) {
            return res
                .status(422)
                .json({ status: "failed", message: "Project not found" });
        }

        try {
            await User.findOneAndUpdate(
                { "project._id": value.id },
                { $pull: { project: { _id: value.id } } },
                { new: true }
            );
            res.status(202).json({ status: "success", message: "Delete project successfully!" });    
        } catch (e) {
            console.log(e);
            res.status(500).json({ status: "failed", message: "Error Delete project" });    
        }
    }
}

function validateURLPath(inputPath) {
    const forbiddenChars = [
        "<",
        ">",
        '"',
        "#",
        "%",
        "{",
        "}",
        "|",
        "\\",
        "^",
        "~",
        "[",
        "]",
        "`",
        ";",
        "/",
        "?",
        ":",
        "@",
        "=",
        "&",
    ];

    for (const char of inputPath) {
        if (forbiddenChars.includes(char)) {
            return false;
        }
    }
    return true;
}
