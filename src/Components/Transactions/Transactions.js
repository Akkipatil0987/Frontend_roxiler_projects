import React, { useEffect, useState } from 'react'
import './Transactions.css'
import axios from 'axios';
function Transactions({search,monthTransactions}) {

  const [transactions, setTransactions] = useState([]);
  // const [monthTransactions, setMonthTransactions] = useState("March");
  // const [search, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Fetch Transactions
const fetchTransactions = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/products/transactions",
      {
        params: { page, perPage, month: monthTransactions, search },
      }
    );
    setTransactions(response.data.transactions || []);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};


  useEffect(() => {
      fetchTransactions();
     
    }, [
      page,
      perPage,
      monthTransactions,
      search,
    ]);
return (
  <>
  <div className='mainss'>
  <h2>Transactions</h2>
    {/* <div className="filters">
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
    </div> */}
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <>
            {transactions && transactions.length > 0 ? (
              transactions.map((data) => (
                <tr key={data?.id}>
                  <td>{data?.id}</td>
                  <td>{data?.title}</td>
                  <td>{data?.description}</td>
                  <td>{data?.price}</td>
                  <td>{data?.category}</td>
                  <td>{data?.sold ? "Sold" : "Not Sold"}</td>
                  <td>
                    <img
                      src={data?.image}
                      alt={data?.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Record not found</td>{" "}
              </tr>
            )}
          </>
        </tbody>
      </table>
    </div>

      {/* Pagination */}
      <div className="pagination pgns">
      <span>Page {page}</span>
      <div>
      <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <span>Per Page {perPage}</span>
    </div>
  </div>
  </>
)
}

export default Transactions