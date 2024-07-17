import MyForm from './MyForm';
import ItemList from '@/components/ItemList';

const HomePage = () => {
  return (
    <div>
      <h1>Crafting Inventory</h1>
      <MyForm />
      <ItemList />
    </div>
  );
};

export default HomePage;
