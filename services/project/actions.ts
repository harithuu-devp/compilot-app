"use server"
import { revalidatePath } from 'next/cache'
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";


export async function getProjects(){
    await connectDB()
    return Project.find();
}