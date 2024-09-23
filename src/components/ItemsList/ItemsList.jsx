import PropTypes from 'prop-types';
import clsx from 'clsx';
import List from '@/components/List';
import Item from './Item';

const ItemsList = ({ items, projectId = null, showProject = false }) => {
  const numOfColumns = showProject ? 5 : 4;

  const gridClass = clsx({
    'grid-cols-4': numOfColumns === 4,
    'grid-cols-5': numOfColumns === 5,
  });

  return (
    <List
      showBorder={false}
      data={items}
      className={`grid ${gridClass} grid-template-columns:repeat(${numOfColumns},minmax(0,1fr)) gap-4 items-center`}
      renderItem={(item) => (
        <Item
          item={item}
          projectId={projectId || item?.user_projects?.id}
          showProject={showProject}
        />
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
