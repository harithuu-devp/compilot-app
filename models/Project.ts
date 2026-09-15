import { InferSchemaType, Model, Schema, Types, model, models } from "mongoose";

export const projectStatuses = [
    "lead", "proposal", "quoted", "awarded", "planning", "preparation", "event", "post_event", "completed", "archived",
] as const;

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        agency: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        venue: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: projectStatuses,
            default: "lead",
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true },
);

export type Project =
    InferSchemaType<typeof projectSchema> & {
        createdBy: Types.ObjectId
    };
const Project = models.Project || model<Project>("Project", projectSchema);
export default Project;
