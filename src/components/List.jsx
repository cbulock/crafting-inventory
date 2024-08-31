import PropTypes from 'prop-types';
import { Fragment } from 'react';

const List = ({
  data,
  renderItem,
  noItemsMessage = 'No items found.',
  className = 'flex flex-col gap-4',
}) =>
  data.length === 0 ? (
    <div className="p-4 text-gray-500">{noItemsMessage}</div>
  ) : (
    <div className={className}>
      {data.map((item, index) => (
        <Fragment
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          // className={`p-4 ${index < data.length - 1 ? 'border-b border-gray-200' : ''}`}
        >
          {renderItem(item)}
        </Fragment>
      ))}
    </div>
  );

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  noItemsMessage: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default List;
