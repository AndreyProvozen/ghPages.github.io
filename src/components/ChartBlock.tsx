import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';

import getBarChartData from '@/utils/getBarChartData';
import getPieChartData from '@/utils/getPieChartData';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const pieOptions = {
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  options: {
    parsing: false,
    normalized: true,
  },
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    options: {
      parsing: false,
      normalized: true,
    },
  },
};

const ChartBlock = ({ metrics }) => (
  <div className="grid grid-cols-2 grid-rows-3 gap-8">
    <div className="col-span-2 bg-gray/20 w-full rounded-lg border border-gray p-5 mb-5 hover:border-pink hover:shadow-lg">
      <p className="text-2xl font-bold mb-5 text-center">{metrics[4].title}</p>
      <Bar options={barOptions} data={getBarChartData(metrics[4].data)} />
    </div>
    {metrics.slice(0, 4).map(({ title, data }, i) => (
      <div
        className={`row-start-${
          i > 1 ? 3 : 2
        } flex flex-col bg-gray/20 w-full border border-gray p-5 rounded-lg hover:border-pink hover:shadow-lg`}
        key={title}
      >
        <p className="text-2xl font-bold mb-5 text-center">{title}</p>
        {i > 1 ? (
          <Pie data={getPieChartData(data)} style={{ margin: 'auto' }} options={pieOptions} />
        ) : (
          <Doughnut data={getPieChartData(data)} style={{ margin: 'auto' }} options={pieOptions} />
        )}
      </div>
    ))}
  </div>
);

export default ChartBlock;
