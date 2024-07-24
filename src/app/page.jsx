'use client';

import { Layout } from 'antd';
import HeaderContent from '@/components/HeaderContent';
import ItemList from '@/components/ItemList';
import MyForm from './MyForm';

const { Header, Footer, Content } = Layout;

const HomePage = () => (
  <Layout>
    <Header>
      <HeaderContent />
    </Header>
    <Content>
      <MyForm />
      <ItemList />
    </Content>
    <Footer>Created by Cameron Bulock</Footer>
  </Layout>
);

export default HomePage;
