import ReactApexChart, { Props } from "react-apexcharts";

const TasksChart: React.FC<Props> = ({ tasks }) => {
  const options = {
    chart: {
      height: 350,
      zoom: {
        enabled: true,
      },
      toolbar:false
    },
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    fill: {
      colors: ["#1A73E8", "#B32824"],
      type: "image",
    },
    stroke: {
      colors: ["#E1C655", "black"],
      width: 1,
    },
    dataLabels: {
      enabled: false, // Disable data labels here
    },
    legend:{
      position:'top',
      markers:{
        fillColors:['#E1C655','black']
      }
    },
    grid: {
      show: false,
    },
    xaxis: {
      
      tickAmount: 10, // Adjust tickAmount here (default is 6)
    },
  };

  const series = [
    {
      name: "All Tasks",
      data: [28, 29, 25, 45, 50, 90, 100,99,54,100,99,54],
    },
    {
      name: "My Tasks",
      data: [11, 32, 45, 32, 34, 52, 41 , 99, 66 , 41 , 99, 66],
    },
  ];

  return (
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={350}
      width={600}
    />
  );
};
export default TasksChart;
