import getRandomColor from './getRandomColor';

const getPieChartData = list => {
  const pieData = {
    labels: [],
    datasets: [
      {
        label: 'Clicked',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };

  Object.entries(list).forEach(([label, value]) => {
    const { color, colorWithOpacity } = getRandomColor(0.4);

    pieData.labels.push(label);
    pieData.datasets[0].data.push(value);
    pieData.datasets[0].backgroundColor.push(colorWithOpacity);
    pieData.datasets[0].borderColor.push(color);
  });

  return pieData;
};

const getBarChartData = list => {
  const { colorWithOpacity } = getRandomColor(0.4);

  const barData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: colorWithOpacity,
      },
    ],
  };
  const sortedList = Object.entries(list).sort((a, b) => b[1] - a[1]);

  sortedList.forEach(([label, value]) => {
    barData.labels.push(label);
    barData.datasets[0].data.push(value);
  });

  return barData;
};

export { getPieChartData, getBarChartData };
