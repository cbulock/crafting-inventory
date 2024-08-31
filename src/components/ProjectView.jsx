'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

import CreateProjectDialog from '@/components/CreateProjectDialog';
import EditProjectDialog from '@/components/EditProjectDialog';
import ItemSearch from '@/components/ItemSearch';
import ProjectItems from '@/components/ProjectItems';
import ProjectSelectDialog from '@/components/ProjectSelectDialog';
import useStore from '@/store';

const ProjectView = () => {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const { fetchProjects, projects, selectedProject } = useStore();

  const projectName = projects.find(
    (project) => project.id === selectedProject,
  )?.name;

  useEffect(() => {
    if (!currentUserId) {
      console.error('No user ID found');
      return;
    }

    fetchProjects(currentUserId);
  }, [currentUserId, fetchProjects]);

  return (
    <>
      <div className="flex items-center gap-4">
        {selectedProject && (
          <h2 className="text-3xl font-semibold">{projectName}</h2>
        )}
        {selectedProject && <EditProjectDialog projectId={selectedProject} />}
        <CreateProjectDialog />
        <ProjectSelectDialog />
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
