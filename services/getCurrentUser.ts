import "server-only";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getSession } from "@/lib/session";
import type { LoggedInUser } from "@/types";

export async function getCurrentUser(): Promise<LoggedInUser | null> {
    const session = await getSession();

    if (!session) {
        return null;
    }

    await connectDB();

    const user = await User
        .findById(session.userId)
        .lean();

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