import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const EMPLOYEES_PER_PAGE = 10;

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error(error);
        alert("failed to fetch data");
      });
  }, []);

  const indexOfLastEmployee = currentPage * EMPLOYEES_PER_PAGE;
  const indexOfFirstEmployee = indexOfLastEmployee - EMPLOYEES_PER_PAGE;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / EMPLOYEES_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="App">
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

    <div style={{ marginTop: "20px" }}>
      <button onClick={handlePrevious}>Previous</button>
      <p className="page-number"  key={currentPage}>{currentPage}</p> 
      <button onClick={handleNext}>Next</button>
    </div>
    </div>
  );
}

export default App;
