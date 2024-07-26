'use client';

import { useEffect, useState } from 'react';
import List from '@/components/List';
import LoadingSpinner from '@/components/LoadingSpinner';
import supabase from '../utils/supabaseClient';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('items').select('name');

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }

      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Item List</h3>
      <List
        bordered
        data={items}
        renderItem={(item) => (
          <span className="text-gray-700">{item.name}</span>
        )}
      />
    </>
  );
};

export default ItemList;
