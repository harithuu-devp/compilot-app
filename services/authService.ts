import "server-only";

import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { connectDB } from "@/lib/mongodb";
import Session from "@/models/Session";
import User from "@/models/User";
import type { LoggedInUser } from "@/types";

const SESSION_DAYS = 7;

function hashToken(token: string) {
    const secret = process.env.SESSION_SECRET;

    if (!secret) {
        throw new Error("SESSION_SECRET is not configured");
    }

    return createHash("sha256")
        .update(`${secret}:${token}`)
        .digest("hex");
}

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(
    password: string,
    passwordHash: string
) {
    return bcrypt.compare(password, passwordHash);
}

export async function validateCredentials(
    email: string,
    password: string
): Promise<LoggedInUser | null> {
    await connectDB();

    const user = await User.findOne({
        email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
        return null;
    }

    const validPassword = await verifyPassword(
        password,
        user.password
    );

    if (!validPassword) {
        return null;
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    };
}

export async function createSession(userId: string) {
    await connectDB();

    const token = randomBytes(32).toString("base64url");

    const expiresAt = new Date(
        Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
    );

    await Session.create({
        tokenHash: hashToken(token),
        userId,
        expiresAt,
    });

    return token;
}

export async function destroySession(token?: string) {
    if (!token) {
        return;
    }

    await connectDB();

    await Session.deleteOne({
        tokenHash: hashToken(token),
    });
}

export async function getUserFromSession(
    token?: string
): Promise<LoggedInUser | null> {
    if (!token) {
        return null;
    }

    await connectDB();

    const session = await Session.findOne({
        tokenHash: hashToken(token),
        expiresAt: {
            $gt: new Date(),
        },
    });

    if (!session) {
        return null;
    }

    const user = await User.findById(session.userId);

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