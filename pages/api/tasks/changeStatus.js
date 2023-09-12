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
    });

    const { error, value } = taskUpdateSchema.validate(req.body);

    if (error) {
        console.log(error);
        const { message } = error.details[0];
        return res.status(422).json({ status: "failed", message });
    }

    try {
        await User.updateOne(
            { "todos._id": value.id },
            { $set: { "todos.$.status": value.status } }
        );
        res.status(201).json({ status: "success", message: "Todo Updated!" });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: "failed",
            message: "Error updating, Try again",
        });
    }
}
