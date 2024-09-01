'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import EditItemDialog from '@/components/EditItemDialog';
import List from '@/components/List';
import LoadingSpinner from '@/components/LoadingSpinner';
import useStore from '@/store';

const LowStock = () => {
  const { user } = useAuth();
  const {
    lowStockItems,
    isLoadingLowStock: isLoading,
    fetchLowStock,
  } = useStore();
  const currentUserId = user?.id;

  useEffect(() => {
    fetchLowStock({ userId: currentUserId });
  }, [currentUserId, fetchLowStock]);

  if (isLoading && !lowStockItems.length) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2 className="text-2xl">Low Stock</h2>
      <List
        data={lowStockItems}
        className="flex flex-col gap-4"
        renderItem={(item) => (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-semibold">{item.quantity}</span>
            <span className="text-gray-700">{item.name}</span>
            <span className="text-gray-600 text-sm flex-grow">
              {item.user_projects.name}
            </span>
            <EditItemDialog
              itemId={item.id}
              projectId={item.user_projects.id}
            />
          </div>
        )}
      />
    </>
  );
};

export default LowStock;
