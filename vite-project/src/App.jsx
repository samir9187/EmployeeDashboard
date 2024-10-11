import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import EmployeeDetail from "./EmployeeDetail";
import "./App.css";

function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const result = await response.json();
        if (result && result.users) {
          setEmployees(result.users);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = () => {
    const filteredEmployee = employees.find(
      (emp) => emp.id.toString() === searchId
    );
    if (filteredEmployee) {
      setEmployees([filteredEmployee]);
    } else {
      alert("Employee not found");
    }
  };

  const handleResetSearch = () => {
    setSearchId("");
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const result = await response.json();
        if (result && result.users) {
          setEmployees(result.users);
        }
      } catch (error) {
        console.error("Error refetching employees:", error);
      }
    };
    fetchEmployees();
  };

  const handleCardClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  const handleDelete = () => {
    const remainingEmployees = employees.filter(
      (emp) => !selectedEmployeeIds.includes(emp.id)
    );
    setEmployees(remainingEmployees);
    setSelectedEmployeeIds([]);
  };

  const handleDeleteSingle = (id) => {
    const remainingEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(remainingEmployees);
  };

  const handleSelectEmployee = (id) => {
    if (selectedEmployeeIds.includes(id)) {
      setSelectedEmployeeIds(
        selectedEmployeeIds.filter((employeeId) => employeeId !== id)
      );
    } else {
      setSelectedEmployeeIds([...selectedEmployeeIds, id]);
    }
  };

  return (
    <div className="App">
      <h1>Employee Dashboard</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Employee By ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <button onClick={handleResetSearch} className="reset-button">
          Reset
        </button>
        <button
          onClick={handleDelete}
          className="delete-button"
          disabled={selectedEmployeeIds.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className="employee-cards">
        {employees.map((employee) => (
          <div
            className="employee-card"
            key={employee.id}
            onClick={() => handleCardClick(employee.id)}
          >
            <input
              type="checkbox"
              checked={selectedEmployeeIds.includes(employee.id)}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={() => handleSelectEmployee(employee.id)}
            />
            <h3>
              {employee.firstName} {employee.lastName}
            </h3>
            <p>
              <strong>Id:</strong> {employee.id}
            </p>
            <p>
              <strong>Age:</strong> {employee.age}
            </p>
            <p className="email">
              <strong>Email:</strong> {employee.email}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(employee.id);
              }}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSingle(employee.id);
              }}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
