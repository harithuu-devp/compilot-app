import "server-only";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import {
    createSession,
    deleteSession,
} from "@/lib/session";

export async function registerUser(
    name: string,
    email: string,
    password: string
) {
    await connectDB();

    const normalizedEmail =
        email.trim().toLowerCase();

    const existingUser =
        await User.findOne({
            email: normalizedEmail,
        });

    if (existingUser) {
        throw new Error(
            "An account with this email already exists"
        );
    }

    const passwordHash =
        await bcrypt.hash(
            password,
            12
        );

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: "staff",
    });

    await createSession(
        user._id.toString()
    );

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

export async function loginUser(
    email: string,
    password: string
) {
    await connectDB();

    const normalizedEmail =
        email.trim().toLowerCase();

    const user =
        await User.findOne({
            email: normalizedEmail,
        });

    if (!user) {
        throw new Error(
            "Invalid email or password"
        );
    }

    const passwordValid =
        await bcrypt.compare(
            password,
            user.passwordHash
        );

    if (!passwordValid) {
        throw new Error(
            "Invalid email or password"
        );
    }

    await createSession(
        user._id.toString()
    );

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

export async function logoutUser() {
    await deleteSession();
}