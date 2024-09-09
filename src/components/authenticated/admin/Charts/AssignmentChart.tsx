"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

// Function to generate mock data for the past month
const generateMockData = () => {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  const labels: string[] = [];
  const totalAssignments: number[] = [];
  const ongoingAssignments: number[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(lastMonth);
    date.setDate(date.getDate() + i);
    labels.push(date.toDateString());

    // Generate random data for demonstration
    totalAssignments.push(Math.floor(Math.random() * 10) + 1);
    ongoingAssignments.push(Math.floor(Math.random() * 5) + 1);
  }

  return { labels, totalAssignments, ongoingAssignments };
};

const AssignmentChart: React.FC = () => {
  const { labels, totalAssignments, ongoingAssignments } = generateMockData();

  const data = {
    labels,
    datasets: [
      {
        label: "Total Assignments",
        data: totalAssignments,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Ongoing Assignments",
        data: ongoingAssignments,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Assignments",
        },
      },
    },
  };

  return (
    <div>
      <h2>Assignments Overview - Past Month</h2>
      <Line data={data} options={options} className="" />
    </div>
  );
};

export default AssignmentChart;
