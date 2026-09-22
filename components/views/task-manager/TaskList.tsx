// "use client";
import { Task } from "@/models/Task"
import { Types } from "mongoose"
type TaskListProps = {
    tasks: (Task & {
        _id: Types.ObjectId
    })[]
}
export function TaskList({ tasks }: TaskListProps) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id.toString()}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}