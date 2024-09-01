'use client';

import ProjectView from '@/components/ProjectView';
import withAuth from '@/components/withAuth';

const ProjectsPage = () => (
  <main className="m-4 max-w-xl mx-auto">
    <ProjectView />
  </main>
);

export default withAuth(ProjectsPage);
