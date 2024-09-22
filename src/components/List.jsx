import { Fragment } from 'react';
import PropTypes from 'prop-types';

const List = ({
  data,
  renderItem,
  noItemsMessage = 'No items found.',
  className = 'flex flex-col gap-4',
  showBorder = true,
}) =>
  data.length === 0 ? (
    <div className="p-4 text-gray-500">{noItemsMessage}</div>
  ) : (
    <div className={className}>
      {data.map((item, index) =>
        showBorder ? (
          <div
            className={`p-4 ${index < data.length - 1 ? 'border-b border-gray-200' : ''}`}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {renderItem(item)}
          </div>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>{renderItem(item)}</Fragment>
        ),
      )}
    </div>
  );

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  noItemsMessage: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  className: PropTypes.string,
  showBorder: PropTypes.bool,
};

export default List;
