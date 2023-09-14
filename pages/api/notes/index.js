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

    const noteSchema = Joi.object({
        title: Joi.string().required().max(80),
        text: Joi.string().optional().allow("").max(400),
        color: Joi.string().valid('yellow', 'green', 'pink', 'purple', 'blue').required(),
    });

    if (req.method === "POST") {
        const { error, value } = noteSchema.validate(req.body, {
            abortEarly: true,
        });

        if (error) {
            console.log(error);
            const { message } = error.details[0];
            return res.status(422).json({ status: "failed", message });
        }

        user.stickyWall.push(value);
        user.save();
        res.status(201).json({ status: "success", message: "Todo created!" });
    } else if (req.method === 'GET') {
        res.status(200).json({ status: "success", data: user.stickyWall });
    }
}
