import { Project } from "@/models/Project";
import { Types } from "mongoose";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { CreateItemCard } from "@/components/ui/CreateItemCard";

type ProjectListProps = {
  projects: (Project & {
    _id: Types.ObjectId;
  })[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="mt-7">
      {projects.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <CreateItemCard
            href="/projects/new"
            title="Create Project"
            description="Fill in new project details"
          />

          {projects.map((project) => (
            <ProjectCard
              key={project._id.toString()}
              project={project}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects yet"
          description="Create your first project to start building your event portfolio."
          action={
            <CreateItemCard
              href="/projects/new"
              title="Create Project"
              description="Fill in new project details"
            />
          }
        />
      )}
    </section>
  );
}