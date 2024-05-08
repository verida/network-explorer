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

                name: { show: false },
                total: {
                  show: true,
                  showAlways: true,
                  formatter: function (w) {
                    return "30%";
                  },
                },
              },
            },
          },
        },
      }}
      series={[31, 69]}
      type="donut"
    />
  );
};

export default DonutChart;
