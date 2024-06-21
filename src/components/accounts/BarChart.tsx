import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";
import dayjs from "dayjs";

type DataPoint = number[][];

interface AverageBarsResult {
  dates: string[];
  values: number[];
}

interface BarChartProps {
  data: DataPoint;
  tab: string;
}

const BarChart = ({ data, tab }: BarChartProps) => {
  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });

  const getAverageBars = (
    data: DataPoint,
    numberOfBars: number
  ): AverageBarsResult => {
    const result: AverageBarsResult = { dates: [], values: [] };
    const dataSize = data.length;

    if (dataSize === 0) return result;

    // Extract dates and values separately
    const dates = data.map((item) => item[0]);
    const values = data.map((item) => item[1]);

    // Find the minimum and maximum dates
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);

    // Calculate the interval duration
    const intervalDuration = (maxDate - minDate) / (numberOfBars - 1);

    for (let i = 0; i < numberOfBars; i++) {
      let sum = 0;
      let count = 0;
      const intervalStart = minDate + i * intervalDuration;
      const intervalEnd = minDate + (i + 1) * intervalDuration;
      let firstDateInInterval = null;

      for (let j = 0; j < dataSize; j++) {
        if (dates[j] >= intervalStart && dates[j] < intervalEnd) {
          sum += values[j];
          count++;
          if (firstDateInInterval === null) {
            firstDateInInterval = dates[j];
          }
        }
      }

      if (count > 0) {
        result.dates.push(
          dayjs(firstDateInInterval!).format(
            numberOfBars === 12
              ? "MMM YYYY"
              : numberOfBars === 20
              ? "DD MMM"
              : "DD MMM YYYY"
          )
        );
        result.values.push(Math.round(sum / count));
      }
    }

    return result;
  };

  const [displayableData, setDisplayableData] = useState<
    AverageBarsResult | undefined
  >();
  useEffect(() => {
    if (tab === "daily") {
      setDisplayableData(getAverageBars(data, 52));
    } else if (tab === "weekly") {
      setDisplayableData(getAverageBars(data, 20));
    } else if (tab === "monthly") {
      setDisplayableData(getAverageBars(data, 12));
    }
  }, [data, tab]);

  return (
    displayableData && (
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
            categories: displayableData.dates,
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
            data: displayableData.values,
          },
        ]}
        type="bar"
        height={!isSmScreen ? 250 : 350}
      />
    )
  );
};

export default BarChart;
