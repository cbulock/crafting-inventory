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
import Tooltip from '@/components/Tooltip';
import useStore from '@/store';
import supabase from '../utils/supabaseClient';

const EditItemDialog = ({ itemId, projectId, onClose = () => {} }) => {
  const { user } = useAuth();
  const { fetchItems } = useStore();
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [lowThreshold, setLowThreshold] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchItem = async () => {
        const currentUserId = user?.id;

        setLoading(true);
        const { data, error } = await supabase
          .from('user_items')
          .select(
            `
          name,
          quantity,
          low_threshold
        `,
          )
          .eq('id', itemId)
          .eq('user', currentUserId)
          .single();

        if (error) {
          toast({
            variant: 'destructive',
            description: `Error fetching item: ${error.message}`,
          });
        } else {
          setName(data.name);
          setQuantity(data.quantity);
          setLowThreshold(data.low_threshold);
        }
        setLoading(false);
      };
      fetchItem();
    }
  }, [open, itemId, toast]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentUserId = user?.id;
    const { error } = await supabase
      .from('user_items')
      .update({ name, quantity, low_threshold: lowThreshold })
      .eq('id', itemId)
      .eq('user', currentUserId);

    if (error) {
      toast({
        variant: 'destructive',
        description: `Error updating item: ${error.message}`,
      });
    } else {
      toast({
        description: 'Item updated successfully',
      });
      onClose();
      setOpen(false);
      fetchItems({ userId: currentUserId, projectId });
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
            Update the details of this item.
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lowThreshold" className="text-right">
              <Tooltip>
                <p>
                  The point at which the inventory is considered low and needs
                  to be restocked.
                </p>
              </Tooltip>
              Low Stock Threshold
            </Label>
            <Input
              id="lowThreshold"
              type="number"
              value={lowThreshold}
              onChange={(e) => setLowThreshold(Number(e.target.value))}
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

EditItemDialog.propTypes = {
  itemId: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
  onClose: PropTypes.func,
};

export default EditItemDialog;
