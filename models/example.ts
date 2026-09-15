import mongoose, { Document, Model, Schema } from "mongoose";

interface IComment {
    user: string;
    content: string;
    votes: number;
}

export interface IBlog extends Document {
    title: string;
    slug: string;
    published: boolean;
    author: string;
    content: string;
    tags: string[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        user: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        votes: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: false,
    }
);

const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        published: {
            type: Boolean,
            default: false,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        comments: {
            type: [commentSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Blog: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;