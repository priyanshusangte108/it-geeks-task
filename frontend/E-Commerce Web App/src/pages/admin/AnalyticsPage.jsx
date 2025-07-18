


import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [sales, setSales] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  useEffect(() => {
    axios
      .get("/api/admin/analytics/sales", { headers })
      .then((res) => setSales(res.data.data))
      .catch(console.error)
      .finally(() => setLoadingSales(false));

    axios
      .get("/api/admin/analytics/revenue", { headers })
      .then((res) => setRevenue(res.data.data))
      .catch(console.error)
      .finally(() => setLoadingRevenue(false));
  }, []);

  const salesData = {
    labels: sales.map((d) => d._id),
    datasets: [
      {
        label: "Units Sold",
        data: sales.map((d) => d.qty),
        backgroundColor: "rgba(37, 99, 235, 0.7)", // Tailwind blue-600
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  };

  const revenueData = {
    labels: revenue.map((d) => d._id),
    datasets: [
      {
        label: "Revenue ($)",
        data: revenue.map((d) => d.total),
        borderColor: "rgba(16, 185, 129, 1)", // Tailwind green-500
        backgroundColor: "rgba(16, 185, 129, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14, weight: "600" } },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 13 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 13 } },
        grid: { color: "#e5e7eb" }, // Tailwind gray-200
      },
    },
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sales by Product</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {loadingSales ? (
            <p className="text-center text-gray-500">Loading sales data...</p>
          ) : sales.length === 0 ? (
            <p className="text-center text-gray-400">No sales data available.</p>
          ) : (
            <Bar data={salesData} options={chartOptions} />
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daily Revenue</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {loadingRevenue ? (
            <p className="text-center text-gray-500">Loading revenue data...</p>
          ) : revenue.length === 0 ? (
            <p className="text-center text-gray-400">No revenue data available.</p>
          ) : (
            <Line data={revenueData} options={chartOptions} />
          )}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
