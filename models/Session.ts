import { InferSchemaType, Schema, Types, model, models } from "mongoose";

const sessionSchema = new Schema(
    {
        tokenHash: {
            type: String,
            required: true,
            unique: true,
            select: false
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 }
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

const Session = models.Session || model<Session>("Session", sessionSchema);

export default Session;