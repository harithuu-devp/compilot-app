import { InferSchemaType, Schema, Types, model, models } from "mongoose";

const sessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        tokenHash: {
            type: String,
            required: true,
            unique: true,
            select: false,
        },

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export type Session =
    InferSchemaType<typeof sessionSchema> & {
        userId: Types.ObjectId;
    };

sessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 },
);

const Session =
    models.Session || model<Session>("Session", sessionSchema);

export default Session;