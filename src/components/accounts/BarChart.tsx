import React, { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

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

  const groupBy = (data: DataPoint, format: string, isWeekly = false) => {
    const grouped: Record<
      string,
      { sum: number; count: number; firstDate?: string }
    > = {};
    data.forEach(([date, value]) => {
      let key = dayjs(date).format(format);
      if (isWeekly) {
        const weekStart = dayjs(date).startOf("isoWeek");
        key = weekStart.format("YYYY-MM-DD");
        if (!grouped[key]) {
          grouped[key] = {
            sum: 0,
            count: 0,
            firstDate: weekStart.format("DD MMM YYYY"),
          };
        }
      } else {
        if (!grouped[key]) {
          grouped[key] = { sum: 0, count: 0 };
        }
      }
      grouped[key].sum += value;
      grouped[key].count += 1;
    });
    return grouped;
  };

  const getAverageBars = useCallback(
    (data: DataPoint, format: string, isWeekly = false): AverageBarsResult => {
      const groupedData = groupBy(data, format, isWeekly);
      const result: AverageBarsResult = { dates: [], values: [] };

      for (const [key, { sum, count, firstDate }] of Object.entries(
        groupedData
      )) {
        result.dates.push(isWeekly ? firstDate! : key);
        result.values.push(Math.round(sum / count));
      }

      return result;
    },
    []
  );

  const [displayableData, setDisplayableData] = useState<
    AverageBarsResult | undefined
  >();

  useEffect(() => {
    if (tab === "daily") {
      setDisplayableData(getAverageBars(data, "YYYY-MM-DD"));
    } else if (tab === "weekly") {
      setDisplayableData(getAverageBars(data, "YYYY-MM-DD", true));
    } else if (tab === "monthly") {
      setDisplayableData(getAverageBars(data, "MMMM-YYYY"));
    }
  }, [data, tab, getAverageBars]);

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
            name: "Total Identities",
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
