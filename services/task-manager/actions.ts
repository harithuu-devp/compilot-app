"use server"
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function createTask(formData: FormData){
    await connectDB()
    const title = (formData.get("title") as string).trim()
    const description = (formData.get("description") as string).trim()

    await Task.create({
        title: title,
        description: description
    });
}