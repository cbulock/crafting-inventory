import PropTypes from 'prop-types';

const List = ({ data, renderItem }) => (
  <div className="space-y-4">
    {data.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index} className="p-4 border border-gray-200">
        {renderItem(item)}
      </div>
    ))}
  </div>
);

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default List;
