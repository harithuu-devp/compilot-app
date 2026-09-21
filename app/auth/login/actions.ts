"use server";

import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import { loginUser } from "@/services/authService";

export async function login(formData: FormData) {
    const user = await loginUser(formData);
    if(user){
        redirect("/dashboard");
    }else{
        console.log("Invalid credentials");
    }
    

    
}