'use client';

import HeaderContent from '@/components/HeaderContent';
import ItemSearch from '@/components/ItemSearch';
import ProjectItems from '@/components/ProjectItems';
import withAuth from '@/components/withAuth';

const HomePage = () => (
  <div>
    <header>
      <HeaderContent />
    </header>
    <main className="m-4">
      <ItemSearch />
      <ProjectItems />
    </main>
    <footer className="m-4">Created by Cameron Bulock</footer>
  </div>
);

export default withAuth(HomePage);
