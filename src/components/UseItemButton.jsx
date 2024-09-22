import PropTypes from 'prop-types';
import { PackageMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { useAuth } from '@/context/AuthContext';
import useStore from '@/store';
import supabase from '../utils/supabaseClient';

const UseItemButton = ({ itemId, currentQuantity, projectId = null }) => {
  const { user } = useAuth();
  const { refreshData } = useStore();

  const useItem = async (e) => {
    e.preventDefault();
    const currentUserId = user?.id;
    const { error } = await supabase
      .from('user_items')
      .update({ quantity: currentQuantity - 1 })
      .eq('id', itemId)
      .eq('user', currentUserId);

    if (error) {
      toast({
        variant: 'destructive',
        description: `Error removing item: ${error.message}`,
      });
    } else {
      toast({
        description: 'One item removed from inventory',
      });
      refreshData({ userId: currentUserId, projectId });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={useItem}>
      <PackageMinus className="mr-2 h-4 w-4" />
      <p className="pt-1">Use</p>
    </Button>
  );
};

UseItemButton.propTypes = {
  itemId: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number.isRequired,
  projectId: PropTypes.number,
};

export default UseItemButton;
