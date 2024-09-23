import Link from 'next/link';
import PropTypes from 'prop-types';
import { CircleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EditItemDialog from '@/components/EditItemDialog';
import UseItemButton from '@/components/UseItemButton';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const getTextColorBasedOnBgColor = (bgColor) => {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds and white for dark backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const Item = ({ item, projectId = null, showProject = false }) => (
  <>
    {showProject && (
      <span>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/project/${item.user_projects.id}`}>
            {item.user_projects.name}
          </Link>
        </Button>
      </span>
    )}
    <div className="flex items-center gap-2">
      <span className="text-gray-700">{item.name}</span>
      {item?.tags?.map((tag) => {
        const textColor = getTextColorBasedOnBgColor(tag.color);
        return (
          <Badge
            key={tag.id}
            style={{ backgroundColor: tag.color, color: textColor }}
          >
            {tag.name}
          </Badge>
        );
      })}
    </div>
    <span
      className={`justify-self-end flex gap-4 font-semibold ${item.is_low_stock ? 'text-red-600' : 'text-gray-700'}`}
    >
      {item.is_low_stock && (
        <Popover>
          <PopoverTrigger>
            <CircleAlert className="text-red-600" />
          </PopoverTrigger>
          <PopoverContent>
            <p>Item is low in stock</p>
          </PopoverContent>
        </Popover>
      )}
      {item.quantity}
    </span>
    <span>
      <UseItemButton
        itemId={item.id}
        projectId={projectId || item?.user_projects?.id}
        currentQuantity={item.quantity}
      />
    </span>

    <EditItemDialog
      className="justify-self-end"
      itemId={item.id}
      projectId={projectId || item?.user_projects?.id}
    />
  </>
);

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    is_low_stock: PropTypes.bool,
    quantity: PropTypes.number.isRequired,
    items: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ),
    user_projects: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
  showProject: PropTypes.bool,
  projectId: PropTypes.number.isRequired,
};

export default Item;
