/* eslint-disable import/no-extraneous-dependencies */
import Chart from 'react-apexcharts';

function Nilai() {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['Andri', 'Maulana', 'Ade', 'Rafly', 'Sonia', 'Rahma'],
    },
  };

  const series = [
    {
      name: 'Nilai Mahasiswa',
      data: [88, 78, 90, 67, 87, 96],
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" width="50%" />
        </div>
      </div>
    </div>
  );
}

export default Nilai;
