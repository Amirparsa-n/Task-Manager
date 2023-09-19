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

    const projectNameSchema = Joi.string().required();

    const { projectTaskId } = req.query;

    const projectName = projectNameSchema.validate(projectTaskId);

    if (projectName.error) {
        console.log(projectName.error);
        const { message } = projectName.error.details[0];
        return res.status(422).json({ status: "failed", message });
    }

    const filteredProjects = await User.find(
        {
            "project.name": projectName.value,
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

    const taskProjectSchema = Joi.object({
        title: Joi.string().required().max(80),
        description: Joi.string().optional().allow("").max(200),
        status: Joi.string().required(),
        tag: Joi.string().optional().allow("").max(10),
        rating: Joi.string().required(),
        date: Joi.date().required(),
    });

    const editSchema = Joi.object({
        title: Joi.string().required().max(80),
        description: Joi.string().optional().allow("").max(200),
        id: Joi.string().required(),
    });

    if (req.method === "POST") {
        const taskProject = taskProjectSchema.validate(req.body, {
            abortEarly: true,
        });

        if (taskProject.error) {
            console.log(taskProject.error);
            const { message } = taskProject.error.details[0];
            return res.status(422).json({ status: "failed", message });
        }

        try {
            const projectIndex = user.project.findIndex(
                (item) => item.name === project.name
            );

            user.project[projectIndex].todos.push(taskProject.value);
            user.save();

            res.status(201).json({
                status: "success",
                message: "Task project created!",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "failed",
                message: "Error creating task project",
            });
        }
    } else if (req.method === "GET") {
        res.status(200).json({ data: project.todos });
    } else if (req.method === "PATCH") {
        const { error, value } = editSchema.validate(req.body);

        if (error) {
            console.log(error);
            const { message } = error.details[0];
            return res.status(422).json({ status: "failed", message });
        }

        try {
            await User.updateOne(
                { "project.todos._id": value.id },
                {
                    $set: {
                        "project.$[outer].todos.$[inner].title": value.title,
                        "project.$[outer].todos.$[inner].description":
                            value.description,
                    },
                },
                {
                    arrayFilters: [
                        { "outer._id": project.id },
                        { "inner._id": value.id },
                    ],
                }
            );
            res.status(201).json({
                status: "success",
                message: "Edit task successfully!",
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                status: "failed",
                message: "Error in Edit task, Try again",
            });
        }
    }
}
