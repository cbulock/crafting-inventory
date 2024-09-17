'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ItemsList from '@/components/ItemsList';
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
      <ItemsList items={lowStockItems} showProject />
    </>
  );
};

export default LowStock;
