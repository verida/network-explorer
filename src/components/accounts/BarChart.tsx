import React from "react";
import Chart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";

const BarChart = () => {
  const labels = ["Dec 2023", "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"];

  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });

  return (
    <Chart
      options={{
        chart: {
          id: "Total Accounts",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: labels,
          labels: {
            style: {
              colors: "#666A7F",
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
        yaxis: {
          labels: {
            formatter: (value) => {
              if (value >= 1000 && !isSmScreen) {
                return value / 1000 + "k";
              }
              return value.toString();
            },

            style: {
              colors: "#666A7F",
              fontWeight: 400,
              fontSize: "10px",
            },
          },
        },
        colors: ["#8566F2"],
        grid: {
          borderColor: "rgba(235, 235, 235, 0.1)",
          strokeDashArray: 0,
        },
        tooltip: {
          theme: "dark",
        },
      }}
      series={[
        {
          name: "Total Accounts",
          data: [1500, 17000, 22000, 23000, 24000],
        },
      ]}
      type="bar"
      height={!isSmScreen ? 250 : 350}
    />
  );
};

export default BarChart;
