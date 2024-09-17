'use client';

import ProjectView from '@/components/ProjectView';
import withAuth from '@/components/withAuth';

// This page is deprecated, should become just a list view if not selected project
// or just redirect to the selected project page

const ProjectsPage = () => (
  <main className="m-4 max-w-xl mx-auto">
    <ProjectView />
  </main>
);

export default withAuth(ProjectsPage);
