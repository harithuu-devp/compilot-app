import { InferSchemaType, Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        schema_version: {
            type: Number,
            default: 1
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["admin", "staff"],
            default: "staff",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export type User = InferSchemaType<typeof userSchema>;

const User = models.User || model<User>("User", userSchema);

export default User;