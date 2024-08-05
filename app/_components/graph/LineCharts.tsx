"use client";
import ReactApexChart from "react-apexcharts";

function LineCharts() {
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
      curve: "straight",
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
      data: [
        28, 169, 160, 145, 70, 130, 170, 200, 70, 190, 140, 150, 170, 180, 70,
        190, 160, 149, 174, 190, 180, 10,
      ],
    },
  ];

  return (
    <ReactApexChart
      type="area"
      options={options}
      series={series}
      height={"100%"}
      width={"100%"}
    />
  );
}

export default LineCharts;
