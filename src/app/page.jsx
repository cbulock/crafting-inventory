'use client';

import LowStock from '@/components/LowStock';
import withAuth from '@/components/withAuth';

const HomePage = () => (
  <main className="m-4 max-w-xl mx-auto">
    <LowStock />
  </main>
);

export default withAuth(HomePage);
