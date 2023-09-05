import mongoose from "mongoose";

async function connectDB() {
    try {
        if (mongoose.connections[0].readyState) return;

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Connection failed: " + err);
    }
}

export default connectDB;
