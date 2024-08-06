import PropTypes from 'prop-types';

const List = ({ data, renderItem, noItemsMessage = 'No items found.' }) => (
  <div>
    {data.length === 0 ? (
      <div className="p-4 text-gray-500">{noItemsMessage}</div>
    ) : (
      data.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`p-4 ${index < data.length - 1 ? 'border-b border-gray-200' : ''}`}
        >
          {renderItem(item)}
        </div>
      ))
    )}
  </div>
);

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  noItemsMessage: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
};

export default List;
