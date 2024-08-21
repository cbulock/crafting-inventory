'use client';

import HeaderContent from '@/components/HeaderContent';
import ProjectView from '@/components/ProjectView';
import withAuth from '@/components/withAuth';

const HomePage = () => (
  <div>
    <header>
      <HeaderContent />
    </header>
    <main className="m-4">
      <ProjectView />
    </main>
    <footer className="m-4">Created by Cameron Bulock</footer>
  </div>
);

export default withAuth(HomePage);
