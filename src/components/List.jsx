import PropTypes from 'prop-types';

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
        <div
          className={`p-4 ${index < data.length - 1 ? 'border-b border-gray-200' : ''}`}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          {renderItem(item)}
        </div>
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
