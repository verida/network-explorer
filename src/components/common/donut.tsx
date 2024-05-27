import React from "react";
import Chart from "react-apexcharts";

const DonutChart = () => {
  return (
    <Chart
      options={{
        chart: {
          id: "network-security",
          toolbar: {
            show: false,
          },
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        colors: ["#8566F2", "#FFFFFF33"],
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: "75%",
              labels: {
                show: true,
                total: {
                  show: true,
                  label: "31%",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "28px",
                  showAlways: true,
                },
                value: { show: true, formatter: () => "Used" },
              },
            },
          },
        },
      }}
      series={[31, 69]}
      type="donut"
      height={200}
      width={200}
    />
  );
};

export default DonutChart;
