import Link from 'next/link';
import PropTypes from 'prop-types';
import { CircleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditItemDialog from '@/components/EditItemDialog';
import List from '@/components/List';
import UseItemButton from '@/components/UseItemButton';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const ItemsList = ({ items, projectId = null, showProject = false }) => {
  const numOfColumns = showProject ? 5 : 4;

  return (
    <List
      showBorder={false}
      data={items}
      className={`grid grid-cols-${numOfColumns} gap-4 items-center`}
      renderItem={(item) => (
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
          <span className="text-gray-700">{item.name}</span>
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
      )}
    />
  );
};

const userProjectsValidator = (props, propName, componentName) => {
  const { items, projectId } = props;
  const hasUserProjectsId = items.some(
    (item) => item.user_projects && item.user_projects.id,
  );
  if (!hasUserProjectsId && !projectId) {
    return new Error(
      `One of 'user_projects.id' in items or 'projectId' is required in '${componentName}'.`,
    );
  }
  return null;
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      is_low_stock: PropTypes.bool,
      quantity: PropTypes.number.isRequired,
      items: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      user_projects: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  showProject: PropTypes.bool,
  projectId: userProjectsValidator,
};

export default ItemsList;
