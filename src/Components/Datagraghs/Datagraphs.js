import React, { useEffect, useState } from 'react';
import './Datagraphs.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function Datagraphs({monthTransactions}) {
  const [monthBarChart, setMonthBarChart] = useState("");
  const [barChartData, setBarChartData] = useState({});

  // Fetch Bar Chart Data
  const fetchBarChartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/barChart", {
        params: { month: monthTransactions },
      });
      const barChart = response.data;

      // Update bar chart data state
      setBarChartData({
        labels: barChart.map((item) => item.range), 
        datasets: [
          {
            label: "Number of Items",
            data: barChart.map((item) => item.count), 
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  useEffect(() => {
    fetchBarChartData();
  }, [monthTransactions]);

  return (
    <>
      <div className='mainss'>
        {/* Bar Chart Section */}
        <h2>Price Range Bar Chart</h2>
        <div className="barchart-container">
          <div className="filters">
            <label>Filter Bar Chart by Month: {monthTransactions} </label>
           
          </div>
          {barChartData.labels ? <Bar data={barChartData} /> : <p>Loading...</p>}
        </div>
      </div>
    </>
  );
}

export default Datagraphs;
