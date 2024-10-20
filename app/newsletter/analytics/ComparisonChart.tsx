'use client'
import ReactApexChart from "react-apexcharts";

const TasksChart = () => {
  const options: any = {
    chart: {
      height: '100%',
      zoom: {
        enabled: true,
      },
      toolbar: false,
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
    legend: {
      position: "top",
      markers: {
        fillColors: ["#E1C655", "black"],
      },
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
      name: "This Month",
      data: [28, 29, 25, 45, 50, 90, 100, 99, 54, 100, 99, 54],
    },
    {
      name: "Last Month",
      data: [11, 32, 45, 32, 34, 52, 41, 99, 66, 41, 99, 66],
    },
  ];

  return (
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={'100%'}
      width={"100%"}
    />
  );
};
export default TasksChart;
