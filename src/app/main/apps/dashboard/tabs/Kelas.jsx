/* eslint-disable import/no-extraneous-dependencies */
import Chart from 'react-apexcharts';

function Kelas() {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['B.inggris', 'Matematik', 'Fisika', 'Biologi', 'IPA', 'IPS'],
    },
  };

  const series = [
    {
      name: 'Total Kelas',
      data: [30, 40, 45, 50, 49, 60],
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="50%" />
        </div>
      </div>
    </div>
  );
}

export default Kelas;
