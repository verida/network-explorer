import { sampleOverviewData } from "@/lib/sample";
import React from "react";
import Chart from "react-apexcharts";

const StorageChart = () => {
  return (
    <Chart
      options={{
        chart: {
          id: "storage",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          min: new Date("01 Mar 2012").getTime(),
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
            labels: {
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
          data: sampleOverviewData,
        },
      ]}
      type="area"
      height={350}
    />
  );
};

export default StorageChart;
