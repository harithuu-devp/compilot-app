"use server"
import { revalidatePath } from 'next/cache'
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { getCurrentUser } from '@/services/getCurrentUser';

export async function getProjects() {
    await connectDB()
    return Project.find();
}

export async function createProject(formData: FormData) {
    await connectDB()
    const user = await getCurrentUser();
    const name = (formData.get("name") as string).trim()
    const agency = (formData.get("agency") as string).trim()
    const description = (formData.get("description") as string).trim()
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string
    const status = formData.get("status") as string
    const venue = (formData.get("venue") as string).trim()

    await Project.create({
        name: name,
        agency: agency,
        description: description,
        startDate: startDate,
        endDate: endDate,
        status: status,
        venue: venue,
        createdBy: user?.id
    });
    revalidatePath('/projects')
}