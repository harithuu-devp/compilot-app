import { InferSchemaType, Schema, model, models } from "mongoose";

const appSettingSchema = new Schema(
    {
        schema_version: {
            type: Number,
            default: 1
        },

        key: {
            type: String,
            required: true,
            trim: true,
        },

        value: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

export type AppSetting = InferSchemaType<typeof appSettingSchema>;

const AppSetting = models.AppSetting || model<AppSetting>("AppSetting", appSettingSchema);

export default AppSetting;