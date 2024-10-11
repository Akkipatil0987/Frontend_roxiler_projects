import React, { useEffect, useState } from 'react'
import './Statistics.css'
import axios from 'axios';
function Statistics({monthTransactions}) {
    
    const [statistics, setStatistics] = useState({totalSaleAmount:0,totalSoldItems:0,totalNotSoldItems:0});
    const [monthStatistics, setMonthStatistics] = useState("");
    
  // Fetch Statistics Data
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/statistics",
        {
          params: { month: monthTransactions },
        }
      );
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    
    fetchStatistics();
  }, [
    
    monthTransactions,
   
  ]);

  
  return (
    <>
    <div className='mainss'>
    <h2>Statistics</h2>
      <div className="statistics-container">
        <div className="filters">
          <label>Filter Statistics by Month: {monthTransactions} </label>
         
        </div>
        <div className="statistics">
          <p><b>Total Sale:</b> Rs. {statistics.totalSaleAmount}</p>
          <p><b>Total Sold Items:</b> {statistics.totalSoldItems}</p>
          <p><b>Total Not Sold Items:</b> {statistics.totalNotSoldItems}</p>
        </div>
      </div>

    </div>
    
    </>
  )
}

export default Statistics