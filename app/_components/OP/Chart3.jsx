// CustomChart.js
import React from "react";
import Chart from "react-apexcharts";

const CustomChart = () => {
  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#ff9999"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    colors: ["#ff6666"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
  };

  const series = [
    {
      name: "Data",
      data: [10, 40, 35, 50, 49, 60, 70],
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height="350" />
    </div>
  );
};

export default CustomChart;
