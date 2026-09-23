import { Project } from "@/models/Project"
import { Types } from "mongoose"
type ProjectListProps = {
    projects: (Project & {
        _id: Types.ObjectId
    })[]
}
export function ProjectList({ projects }: ProjectListProps){
    return(
        <div>
            hi
        </div>
    )
}