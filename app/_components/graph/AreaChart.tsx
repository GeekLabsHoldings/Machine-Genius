"use client";
import ReactApexChart from "react-apexcharts";

const TasksChart = () => {
  const options: any = {
    chart: {
      zoom: {
        enabled: true,
      },
      toolbar: false,
    },
    fill: {
      type: "gradient",
      colors: ["#31B2E9"],
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0,
      },
    },
    stroke: {
      colors: ["#31B2E9"],
      width: 3,
    },
    dataLabels: {
      enabled: false, // Disable data labels here
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: "This Month",
      data: [28, 39, 25, 45, 50, 40, 50, 49, 54, 50, 70, 54],
    },
  ];

  return (
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={"60%"}
      width={"90%"}
    />
  );
};
export default TasksChart;
