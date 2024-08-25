import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PropTypes from 'prop-types';

import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import useStore from '@/store';
import supabase from '../utils/supabaseClient';

const CreateProjectDialog = ({ onClose = () => {} }) => {
  const { user } = useAuth();
  const { fetchProjects } = useStore();
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentUserId = user?.id;
    const { error } = await supabase
      .from('user_projects')
      .insert({ name, user: currentUserId });

    if (error) {
      toast({
        variant: 'destructive',
        description: `Error creating project: ${error.message}`,
      });
    } else {
      toast({
        description: 'Project created successfully',
      });
      onClose();
      setOpen(false);
      fetchProjects(currentUserId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            This dialog allows you to create a new project for tracking
            inventory items.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                onClose();
                setOpen(false);
              }}
              className="mr-4"
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

CreateProjectDialog.propTypes = {
  onClose: PropTypes.func,
};

export default CreateProjectDialog;
