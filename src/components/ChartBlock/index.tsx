import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';

import { getPieChartData, getBarChartData } from '@/utils/getChartData';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const pieOptions = {
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ChartBlock = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-5 container max-w-screen-desktop-small mx-auto px-5 mt-5">
      <div className="col-span-2 bg-lightPink/10 w-full border border-pink p-5 mb-5">
        <p className="text-2xl font-bold mb-5 text-center">{metrics[4].title}</p>
        <Bar options={barOptions} data={getBarChartData(metrics[4].data)} />
      </div>
      {metrics.slice(0, 4).map(({ title, data }, i) => {
        return (
          <div
            className={`row-start-${
              i > 1 ? 3 : 2
            } flex flex-col bg-lightPink/10 w-full border border-pink p-5 rounded-lg drop-shadow-2xl	`}
            key={title}
          >
            <p className="text-2xl font-bold mb-5 text-center">{title}</p>
            {i > 1 ? (
              <Pie data={getPieChartData(data)} style={{ margin: 'auto' }} options={pieOptions} />
            ) : (
              <Doughnut data={getPieChartData(data)} style={{ margin: 'auto' }} options={pieOptions} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChartBlock;
