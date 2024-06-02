// ChartComponent.jsx
import React from "react";
import Chart from "react-apexcharts";

const ChartComponent = () => {
  const options = {
    chart: {
      type: "area",
      stacked: true,
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },

    series: [
      {
        name: "PST USA",
        data: [
          550000, 580000, 520000, 530000, 500000, 570000, 620000, 610000,
          570000, 590000, 620000, 650000,
        ],
      },
      {
        name: "Street Politics",
        data: [
          250000, 300000, 260000, 280000, 320000, 340000, 360000, 380000,
          350000, 370000, 390000, 410000,
        ],
      },
    ],

    colors: ["#31B2E9", "#E1C655"],

    xaxis: {
      type: "datetime",
      categories: [
        "2023-01-01",
        "2023-02-01",
        "2023-03-01",
        "2023-04-01",
        "2023-05-01",
        "2023-06-01",
        "2023-07-01",
        "2023-08-01",
        "2023-09-01",
        "2023-10-01",
        "2023-11-01",
        "2023-12-01",
      ],
    },

    yaxis: {
      labels: {
        formatter: function (val) {
          return val / 1000 + "K";
        },
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 90, 100],
      },
    },

    markers: {
      size: 0,
    },

    stroke: {
      curve: "smooth",
    },

    legend: {
      show: false,
    },
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="area" />
    </div>
  );
};

export default ChartComponent;
