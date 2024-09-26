import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const StockLineChart = ({ oneDayData }) => {
  const [data, setData] = useState([["Time", "Prices", { role: "style" }]]);

  useEffect(() => {
    let dataCopy = [["Time", "Prices", { role: "style" }]];
    if (oneDayData.prices) {
      let hourlyData = {};
      oneDayData.prices.forEach((item) => {
        const date = new Date(item[0]);
        const hour = date.getHours();
        if (!hourlyData[hour]) {
          hourlyData[hour] = [];
        }
        hourlyData[hour].push(item[1]);
      });

      let previousPrice = oneDayData.prices[0][1];
      Object.keys(hourlyData).forEach((hour) => {
        const avgPrice =
          hourlyData[hour].reduce((sum, price) => sum + price, 0) /
          hourlyData[hour].length;
        const color = avgPrice >= previousPrice ? "green" : "red";
        dataCopy.push([`${hour}:00`, avgPrice, color]);
        previousPrice = avgPrice;
      });

      setData(dataCopy);
    }
  }, [oneDayData]);

  const options = {
    title: "Stock Prices",
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Price",
    },
    legend: "none",
    chartArea: { width: "80%", height: "70%" },
    tooltip: { isHtml: true },
    series: {
      0: {
        lineWidth: 2,
      },
    },
  };

  return (
    <Chart
      chartType="LineChart"
      data={data}
      options={options}
      width="100%"
      height="400px"
    />
  );
};

export default StockLineChart;
