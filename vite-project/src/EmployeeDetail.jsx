import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EmployeeDetail.css";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const result = await response.json();
        setEmployee(result);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading employee details...</div>;
  }

  return (
    <div className="employee-detail-container">
      <div className="employee-card">
        <h2>
          Employee Detail for {employee.firstName} {employee.lastName}
        </h2>
        <p>
          <strong>Id:</strong> {employee.id}
        </p>
        <p>
          <strong>First Name:</strong> {employee.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {employee.lastName}
        </p>
        <p>
          <strong>Maiden Name:</strong> {employee.maidenName || "Not available"}
        </p>
        <p>
          <strong>Gender:</strong> {employee.gender}
        </p>
        <p>
          <strong>BirthDate:</strong> {employee.birthDate}
        </p>
        <p>
          <strong>Age:</strong> {employee.age}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Height:</strong> {employee.height}
        </p>
        <p>
          <strong>Blood Group:</strong> {employee.bloodGroup}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p>
          <strong>IP Address:</strong> {employee.ip}
        </p>
        <p>
          <strong>Address:</strong> {employee.address.city},{" "}
          {employee.address.state}, {employee.address.country}
        </p>
      </div>
    </div>
  );
}

export default EmployeeDetail;
