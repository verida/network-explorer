import React from "react";
import Chart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";

const StorageChart = ({
  utilization,
  capacity,
}: {
  utilization: number[][];
  capacity: number[][];
}) => {
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });

  return (
    <Chart
      options={{
        chart: {
          id: "storage",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          min: utilization[0][0],
          tickAmount: 6,
          labels: {
            style: {
              colors: "#FFFFFF99",
              fontWeight: 400,
              fontSize: "10px",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: [
          {
            min: 0,
            // max: 100,
            labels: {
              formatter: (value) => {
                return value.toFixed(0);
              },
              style: {
                colors: "#FFFFFF99",
                fontWeight: 400,
                fontSize: "10px",
              },
            },
          },
        ],
        grid: {
          borderColor: "rgba(235, 235, 235, 0.1)",
          strokeDashArray: 0,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
          theme: "dark",
        },
        colors: ["#ffffff33", "#8566F2"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.2,
            opacityTo: 0.1,
            stops: [20, 100],
          },
        },
      }}
      series={[
        {
          name: "Capacity",
          data: capacity,
        },
        {
          name: "Utilization",
          data: utilization,
        },
      ]}
      type="area"
      height={!isSmScreen ? 250 : 350}
    />
  );
};

export default StorageChart;
