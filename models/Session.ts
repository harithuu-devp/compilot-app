import { InferSchemaType, Schema, Types, model, models } from "mongoose";

const sessionSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        token_hash: {
            type: String,
            required: true,
            unique: true,
            select: false
        },
        expires_at: {
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
        user_id: Types.ObjectId;
    };
sessionSchema.index(
    { expires_at: 1 },
    { expireAfterSeconds: 0 }
);
const Session = models.Session || model<Session>("Session", sessionSchema);

export default Session;