import { InferSchemaType, Schema, Types, model, models } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true },
);

export type Task =
    InferSchemaType<typeof taskSchema> & {
        createdBy: Types.ObjectId
    };
const Task = models.Task || model<Task>("Task", taskSchema);
export default Task;
