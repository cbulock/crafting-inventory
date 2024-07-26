'use client';

import HeaderContent from '@/components/HeaderContent';
import ItemList from '@/components/ItemList';
import withAuth from '@/components/withAuth';
import MyForm from './MyForm';

const HomePage = () => (
  <div>
    <header>
      <HeaderContent />
    </header>
    <main>
      <MyForm />
      <ItemList />
    </main>
    <footer>Created by Cameron Bulock</footer>
  </div>
);

export default withAuth(HomePage);
