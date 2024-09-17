'use client';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ItemsList from '@/components/ItemsList';
import LoadingSpinner from '@/components/LoadingSpinner';
import useStore from '@/store';

const ProjectItems = ({ projectId }) => {
  const { user } = useAuth();
  const { items, isLoadingItems: isLoading, fetchItems } = useStore();
  const currentUserId = user?.id;

  if (!projectId) {
    return null;
  }

  useEffect(() => {
    fetchItems({ userId: currentUserId, projectId });
  }, [currentUserId, fetchItems, projectId]);

  if (isLoading && !items.length) {
    return <LoadingSpinner />;
  }

  return <ItemsList items={items} projectId={projectId} />;
};

ProjectItems.propTypes = {
  projectId: PropTypes.number,
};

export default ProjectItems;
