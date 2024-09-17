'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/context/AuthContext';

import CreateProjectDialog from '@/components/CreateProjectDialog';
import EditProjectDialog from '@/components/EditProjectDialog';
import ItemSearch from '@/components/ItemSearch';
import ProjectItems from '@/components/ProjectItems';
import ProjectSelectDialog from '@/components/ProjectSelectDialog';
import useStore from '@/store';

const ProjectView = ({ id }) => {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const [projectName, setProjectName] = useState('');
  const { fetchProjects, projects } = useStore();

  useEffect(() => {
    if (!currentUserId) {
      console.error('No user ID found');
      return;
    }

    fetchProjects(currentUserId);
  }, [currentUserId, fetchProjects, id]);

  useEffect(() => {
    setProjectName(projects.find((project) => project.id === id)?.name);
  }, [projects, id]);

  return (
    <>
      <div className="flex items-center gap-4">
        {id && <h2 className="text-3xl font-semibold">{projectName}</h2>}
        {id && <EditProjectDialog projectId={id} />}
        <CreateProjectDialog />
        <ProjectSelectDialog />
      </div>

      {id ? (
        <div className="m-4">
          <ItemSearch projectId={id} />
          <ProjectItems projectId={id} />
        </div>
      ) : null}
    </>
  );
};
ProjectView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProjectView;
