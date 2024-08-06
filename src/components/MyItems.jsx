'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import List from '@/components/List';
import LoadingSpinner from '@/components/LoadingSpinner';
import supabase from '../utils/supabaseClient';

const MyItems = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const currentUserId = user?.id;

      if (!currentUserId) {
        console.error('No user ID found');
        return;
      }

      const { data, error } = await supabase
        .from('user_items')
        .select(
          `
        item,
        items (name)
      `,
        )
        .eq('user', currentUserId); // Filter records by the current user's ID

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        // Transform data if necessary to fit your component's state structure
        const itemsForUser = data.map((d) => d.items);
        setItems(itemsForUser);
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
      <h3 className="text-xl font-bold mb-4">My Items</h3>
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

export default MyItems;
