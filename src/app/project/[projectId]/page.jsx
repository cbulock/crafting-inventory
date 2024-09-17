'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useStore from '@/store';

import ProjectView from '@/components/ProjectView';
import withAuth from '@/components/withAuth';

const ProjectsPage = () => {
  const { setSelectedProject } = useStore();
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      setSelectedProject(projectId);
    }
  }, [projectId]);

  return (
    <main className="m-4 max-w-xl mx-auto">
      <ProjectView id={Number(projectId)} />
    </main>
  );
};

export default withAuth(ProjectsPage);
