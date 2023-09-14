import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import Joi from "joi";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    if (req.method !== "DELETE") return;

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

    const deleteSchema = Joi.string()
        .pattern(/^[a-fA-F0-9]{24}$/)
        .required();

    const { noteId } = req.query;

    const { error, value } = deleteSchema.validate(noteId);

    if (error) {
        console.log(error);
        const { message } = error.details[0];
        return res.status(422).json({ status: "failed", message });
    }


    const noteItem = user.stickyWall.id(value);
    console.log(noteItem);
    if (!noteItem) {
        return res
            .status(404)
            .json({ status: "failed", message: "StickyNote notFound!" });
    }


    try {
        await User.updateOne(
            {_id : user.id},
            { $pull: { stickyWall: { _id: value } } },
            { new: true },
        );

        res.status(200).json({
            status: "success",
            message: "Delete Task Successfully!",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: "failed",
            message: "Error in Delete task, Try again",
        });
    }
    
}
