import "server-only";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

await connectDB();

export async function getCurrentUser() {
    const user = await User.findOne();

    if (!user) {
        return null;
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    };
}