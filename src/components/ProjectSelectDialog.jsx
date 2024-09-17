import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import List from '@/components/List';
import LoadingSpinner from '@/components/LoadingSpinner';
import useStore from '@/store';

const ProjectSelectDialog = () => {
  const { user } = useAuth();
  const {
    projects,
    isLoadingProjects: isLoading,
    fetchProjects,
    selectedProject,
  } = useStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const currentUserId = user?.id;

  useEffect(() => {
    if (open) {
      if (!currentUserId) {
        console.error('No user ID found');
        return;
      }

      fetchProjects(currentUserId);
    }
  }, [open, currentUserId, fetchProjects]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const selectProject = (projectId) => () => {
    setOpen(false);
    router.push(`/project/${projectId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {selectedProject ? 'Switch' : 'Select a Project'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Project</DialogTitle>
          <DialogDescription>Select a project to work on.</DialogDescription>
        </DialogHeader>
        <List
          data={projects}
          renderItem={(project) => (
            <Button variant="ghost" onClick={selectProject(project.id)}>
              {project.name}
            </Button>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSelectDialog;
