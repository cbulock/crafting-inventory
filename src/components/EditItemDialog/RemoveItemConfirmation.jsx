import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import useStore from '@/store';
import supabase from '@/utils/supabaseClient';

const RemoveItemConfirmation = ({
  itemId,
  projectId,
  name = 'this item',
  onClose = () => {},
  onRemove = () => {},
}) => {
  const { user } = useAuth();
  const { refreshData } = useStore();
  const [open, setOpen] = useState(false);

  const removeItem = async () => {
    const currentUserId = user?.id;
    const { error } = await supabase
      .from('user_items')
      .delete()
      .eq('id', itemId)
      .eq('user', currentUserId);

    if (error) {
      toast({
        variant: 'destructive',
        description: `Error removing item: ${error.message}`,
      });
    } else {
      toast({
        description: 'Item removed successfully',
      });
      onClose();
      onRemove();
      setOpen(false);
      refreshData({ userId: currentUserId, projectId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Remove ${name}`}</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {name}?
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <Button
            variant="destructive"
            className="mr-4"
            onClick={() => {
              removeItem();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              onClose();
              setOpen(false);
            }}
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

RemoveItemConfirmation.propTypes = {
  itemId: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
  name: PropTypes.string,
  onClose: PropTypes.func,
  onRemove: PropTypes.func,
};

export default RemoveItemConfirmation;
