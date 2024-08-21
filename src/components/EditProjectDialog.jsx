import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PropTypes from 'prop-types';

import { Pencil } from 'lucide-react';
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
import LoadingSpinner from '@/components/LoadingSpinner';
import useStore from '@/store';
import supabase from '../utils/supabaseClient';

const EditProjectDialog = ({ projectId, onClose = () => {} }) => {
  const { user } = useAuth();
  const { fetchProjects } = useStore();
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchItem = async () => {
        const currentUserId = user?.id;

        setLoading(true);
        const { data, error } = await supabase
          .from('user_projects')
          .select(
            `
            name
            `,
          )
          .eq('id', projectId)
          .eq('user', currentUserId)
          .single();

        if (error) {
          toast({
            variant: 'destructive',
            description: `Error fetching project: ${error.message}`,
          });
        } else {
          setName(data.name);
        }
        setLoading(false);
      };
      fetchItem();
    }
  }, [open, projectId, toast]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentUserId = user?.id;
    const { error } = await supabase
      .from('user_projects')
      .update({ name })
      .eq('id', projectId)
      .eq('user', currentUserId);

    if (error) {
      toast({
        variant: 'destructive',
        description: `Error updating project: ${error.message}`,
      });
    } else {
      toast({
        description: 'Project updated successfully',
      });
      onClose();
      setOpen(false);
      fetchProjects(currentUserId);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Edit ${name}`}</DialogTitle>
          <DialogDescription>
            Use this dialog to edit the name of your project. Make sure to
            provide a meaningful name that reflects the purpose of the project.
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
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditProjectDialog.propTypes = {
  projectId: PropTypes.number.isRequired,
  onClose: PropTypes.func,
};

export default EditProjectDialog;
