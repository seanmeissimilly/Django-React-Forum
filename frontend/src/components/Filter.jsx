import PropTypes from "prop-types";

const Filter = ({
  items,
  typeSelected = [],
  classificationSelected = [],
  search,
  typeKey = 0,
  classificationKey = 0,
}) => {
  let results = [...items];

  if (typeSelected.length !== 0) {
    results = results.filter((item) => {
      return typeSelected.some((selected) => selected.value === item[typeKey]);
    });
  }
  if (classificationSelected.length !== 0) {
    results = results.filter((item) => {
      return classificationSelected.some(
        (selected) => selected.value === item[classificationKey]
      );
    });
  }
  if (search !== "") {
    results = results.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return results;
};

Filter.propTypes = {
  items: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  typeSelected: PropTypes.array,
  classificationSelected: PropTypes.array,
  typeKey: PropTypes.number,
  classificationKey: PropTypes.number,
};

export default Filter;
