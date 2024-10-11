
import React, { useEffect, useState } from "react";
import "./App.css";
import Datagraphs from "./Components/Datagraghs/Datagraphs";
import Transactions from "./Components/Transactions/Transactions";
import Statistics from "./Components/Statistics/Statistics";

function App() {
  const [monthTransactions, setMonthTransactions] = useState("March");
  const [search, setSearchTerm] = useState("");
  
  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>

      <div className="filters">
      <label>Filter Transactions by Month: </label>
      <select
        value={monthTransactions}
        onChange={(e) => setMonthTransactions(e.target.value)}
      >
        <option value="">All Months</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <input
        type="text"
        placeholder="Search by Title"
        value={search}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
    </div>

      <Transactions search={search} monthTransactions={monthTransactions}/>
      <Statistics   monthTransactions={monthTransactions}/>
      <Datagraphs   monthTransactions={monthTransactions}/>

    </div>
  );
}

export default App;