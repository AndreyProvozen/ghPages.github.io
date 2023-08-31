import { SVGProps } from 'react';

const BarChart = (props?: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24" fill="green" {...props}>
    <path d="M9 6h2v14H9zm4 2h2v12h-2zm4-4h2v16h-2zM5 12h2v8H5z" />
  </svg>
);

export default BarChart;
