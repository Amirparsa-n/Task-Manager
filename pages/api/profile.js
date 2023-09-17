import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import Joi from "joi";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { verifyPassword } from "@/utils/auth";

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

    const profileSchema = Joi.object({
        firstName: Joi.string().required().max(80),
        lastName: Joi.string().required().max(80),
        expertise: Joi.string().optional().allow(""),
        password: Joi.string().required().max(200),
    });

    if (req.method === "PATCH") {
        const { error, value } = profileSchema.validate(req.body, {
            abortEarly: true,
        });

        if (error) {
            console.log(error);
            const { message } = error.details[0];
            return res.status(422).json({ status: "failed", message });
        }

        const isValid = await verifyPassword(value.password, user.password);
        if (!isValid) {
            return res
                .status(422)
                .json({ status: "failed", message: `password is incorrect` });
        }

        try {
            await User.updateOne(
                { _id: user._id },
                {
                    firstName: value.firstName,
                    lastName: value.lastName,
                    expertise: value.expertise,
                }
            );
            const data = {
                firstName: value.firstName,
                lastName: value.lastName,
                expertise: value.expertise,
            };
            res.status(201).json({
                status: "success",
                message: "Update profile successfully!",
                data,
            });
        } catch (err) {
            res.status(500).json({
                status: "failed",
                message: "Error updating profile",
            });
        }
    } 
}
