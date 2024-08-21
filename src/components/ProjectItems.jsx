'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import EditItemDialog from '@/components/EditItemDialog';
import List from '@/components/List';
import LoadingSpinner from '@/components/LoadingSpinner';
import supabase from '../utils/supabaseClient';

const ProjectItems = () => {
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
        id,
        name,
        items (name),
        quantity
      `,
        )
        .eq('user', currentUserId)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        const itemsForUser = data.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        }));
        setItems(itemsForUser);
      }

      setLoading(false);
    };

    fetchItems();

    // TODO: need to limit these subscriptions to only the current user
    const channel = supabase
      .channel('realtime:public:user_items')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'user_items' },
        () => {
          fetchItems();
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'user_items' },
        () => {
          fetchItems();
        },
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-4">My Items</h3>
      <List
        data={items}
        className="grid grid-cols-[auto_1fr_auto] gap-4"
        renderItem={(item) => (
          <>
            <span className="text-gray-700 font-semibold">{item.quantity}</span>
            <span className="text-gray-700">{item.name}</span>
            <EditItemDialog itemId={item.id} />
          </>
        )}
      />
    </>
  );
};

export default ProjectItems;
