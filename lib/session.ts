import "server-only";

import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";

import { connectDB } from "@/lib/mongodb";
import Session from "@/models/Session";

const SESSION_COOKIE = "compilot_session";

// const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;
const SESSION_DURATION = 1 * 60 * 1000;

function hashToken(token: string) {
    return createHash("sha256")
        .update(token)
        .digest("hex");
}

export async function createSession(userId: string) {
    await connectDB();

    const token = randomBytes(32).toString("hex");

    const tokenHash = hashToken(token);

    const expiresAt = new Date(
        Date.now() + SESSION_DURATION
    );

    await Session.create({
        user_id: userId,
        token_hash: tokenHash,
        expires_at: expiresAt,
    });

    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });
}

export async function getSession() {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (!token) {
        return null;
    }

    const tokenHash = hashToken(token);

    const session = await Session.findOne({
        token_hash: tokenHash,
        expires_at: {
            $gt: new Date(),
        },
    }).lean();

    if (!session) {
        return null;
    }

    return session;
}

export async function deleteSession() {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (token) {
        const tokenHash = hashToken(token);

        await Session.deleteOne({
            token_hash: tokenHash,
        });
    }

    cookieStore.delete(SESSION_COOKIE);
}