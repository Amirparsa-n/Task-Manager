import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import Joi from "joi";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    if (req.method !== "PATCH") return;

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

    const taskUpdateSchema = Joi.object({
        status: Joi.string()
            .valid("todo", "done", "in-progress", "review")
            .required(),
        id: Joi.string().required(),
        projectName: Joi.string().required(),
    });

    const { error, value } = taskUpdateSchema.validate(req.body);

    if (error) {
        console.log(error);
        const { message } = error.details[0];
        return res.status(422).json({ status: "failed", message });
    }

    const filteredProjects = await User.find(
        {
            "project.name": value.projectName,
        },
        {
            "project.$": 1,
        }
    );
    const [project] = filteredProjects.map((user) => user.project[0]);
    if (!project) {
        return res
            .status(404)
            .json({ status: "failed", message: "Project notFound!" });
    }

    try {
        await User.updateOne(
            { "project.todos._id": value.id },
            {
                $set: {
                    "project.$[outer].todos.$[inner].status": value.status,
                },
            },
            {
                arrayFilters: [
                    { "outer._id": project.id },
                    { "inner._id": value.id },
                ],
            }
        );
        res.status(201).json({ status: "success", message: "Project Task Updated!" });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: "failed",
            message: "Error updating, Try again",
        });
    }
}
