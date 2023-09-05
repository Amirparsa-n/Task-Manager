import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    profileUrl: String,
    firstName: String,
    lastName: String,
    expertise: String,

    stickyWall: [{ title: String, text: String }],

    todos: [
        {
            title: String,
            text: String,
            status: String,
            tag: String,
            rating: String,
            date: Date,
        },
    ],

    project: [
        {
            name: String,
            todos: [
                {
                    title: String,
                    text: String,
                    status: String,
                    tag: String,
                    rating: String,
                    date: Date,
                },
            ],
        },
    ],

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const User = models.User || model("User", userSchema);

export default User;
