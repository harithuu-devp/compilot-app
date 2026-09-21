"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Label, TextArea } from "@heroui/react"
import { createTask } from "@/services/task-manager/actions"

export default function CreateTaskForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.currentTarget)
    await createTask(formData)
    formRef.current?.reset()
    setPending(false)
    router.push("/task-manager/tasks")
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="task-title" isRequired>Title</Label>
        <Input
          id="task-title"
          name="title"
          required
          placeholder="Enter task title"
          fullWidth
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="task-description">Description</Label>
        <TextArea
          id="task-description"
          name="description"
          rows={3}
          placeholder="Optional description"
          fullWidth
        />
      </div>

      <Button type="submit" variant="primary" fullWidth isPending={pending}>
        Create Task
      </Button>
    </form>
  )
}