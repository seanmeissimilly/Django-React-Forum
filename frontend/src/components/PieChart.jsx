import { ResponsivePie } from "@nivo/pie";
import PropTypes from "prop-types";

const PieChart = ({ data, options }) => {
  const defaultOptions = {
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    colorScheme: "nivo",
    borderWidth: 1,
    radialLabelsSkipAngle: 10,
    radialLabelsTextXOffset: 6,
    radialLabelsTextColor: "#333333",
    radialLabelsLinkColor: { from: "color" },
    sliceLabelsSkipAngle: 10,
    sliceLabelsTextColor: "#000000",
    activeOuterRadiusOffset: 8,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const calculateSliceLabel = (d) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    const percentage = ((d.value / total) * 100).toFixed(2);
    return `${d.value} (${percentage}%)`;
  };

  return (
    <div style={{ height: "400px" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={mergedOptions.innerRadius}
        padAngle={mergedOptions.padAngle}
        cornerRadius={mergedOptions.cornerRadius}
        colors={{ scheme: mergedOptions.colorScheme }}
        borderWidth={mergedOptions.borderWidth}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={mergedOptions.radialLabelsSkipAngle}
        radialLabelsTextXOffset={mergedOptions.radialLabelsTextXOffset}
        radialLabelsTextColor={mergedOptions.radialLabelsTextColor}
        radialLabelsLinkColor={mergedOptions.radialLabelsLinkColor}
        sliceLabelsSkipAngle={mergedOptions.sliceLabelsSkipAngle}
        sliceLabelsTextColor={mergedOptions.sliceLabelsTextColor}
        sliceLabel={calculateSliceLabel}
        activeOuterRadiusOffset={mergedOptions.activeOuterRadiusOffset}
      />
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  options: PropTypes.object,
};

export default PieChart;
