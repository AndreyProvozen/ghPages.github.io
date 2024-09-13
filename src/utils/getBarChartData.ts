import getRandomColor from './getRandomColor';

interface DatasetsProps {
  data: number[];
  backgroundColor: string;
}

interface ChartData {
  labels: string[];
  datasets: DatasetsProps[];
}

/**
 * Generates bar chart data based on a provided list of label-value pairs.
 * The colors for the chart's bars are generated using the getRandomColor function.
 *
 * @example
 * ```typescript
 * const data = getBarChartData({ "Label A": 10, "Label B": 20 });
 * ```
 *
 * @param {Record<string, number>} list - The list of label-value pairs for the bar chart.
 * @returns {Object} - An object containing labels and dataset with data and background colors.
 */

const getBarChartData = (list: Record<string, number>): ChartData => {
  const { colorWithOpacity } = getRandomColor(0.4);

  const sortedList = Object.entries(list).sort((a, b) => b[1] - a[1]);

  const barData = {
    labels: sortedList.map(([label]) => label),
    datasets: [{ data: sortedList.map(([, value]) => value), backgroundColor: colorWithOpacity }],
  };

  return barData;
};

export default getBarChartData;
