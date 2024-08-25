'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import CreateProjectDialog from '@/components/CreateProjectDialog';
import EditProjectDialog from '@/components/EditProjectDialog';
import ItemSearch from '@/components/ItemSearch';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProjectItems from '@/components/ProjectItems';
import useStore from '@/store';

const ProjectView = () => {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, isLoadingProjects: isLoading, fetchProjects } = useStore();

  useEffect(() => {
    if (!currentUserId) {
      console.error('No user ID found');
      return;
    }

    fetchProjects(currentUserId);
  }, [currentUserId, fetchProjects]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex gap-4">
        <Select onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedProject && <EditProjectDialog projectId={selectedProject} />}
        <CreateProjectDialog />
      </div>

      {selectedProject ? (
        <div className="m-4">
          <ItemSearch projectId={selectedProject} />
          <ProjectItems projectId={selectedProject} />
        </div>
      ) : null}
    </>
  );
};

export default ProjectView;
