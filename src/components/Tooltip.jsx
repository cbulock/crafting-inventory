import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Tooltip = ({ children = null }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" size="icon">
        <CircleHelp className="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>{children}</PopoverContent>
  </Popover>
);

Tooltip.propTypes = {
  children: PropTypes.node,
};

export default Tooltip;
