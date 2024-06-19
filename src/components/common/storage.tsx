import { sampleOverviewData } from "@/lib/sample";
import React from "react";
import Chart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";

const StorageChart = ({ data }: { data: number[][] }) => {

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
          }
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          min: data[0][0],
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
        colors: ["#8566F2", "#F2C94C"],
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
          name: "storage data",
          data,
        },
      ]}
      type="area"
      height={!isSmScreen ? 250 : 350}
    />
  );
};

export default StorageChart;
