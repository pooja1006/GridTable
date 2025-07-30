import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import employees from "../data/employee";
import './Dashborad.css'
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
  const [rowData] = useState(employees);
  const gridRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const [columnDefs] = useState([
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "First Name", field: "firstName", sortable: true, filter: true },
    { headerName: "Last Name", field: "lastName", sortable: true, filter: true },
    { headerName: "Email", field: "email" },
    { headerName: "Department", field: "department", sortable: true },
    { headerName: "Position", field: "position" },
    { headerName: "Salary", field: "salary", sortable: true },
    { headerName: "Hire Date", field: "hireDate" },
    { headerName: "Age", field: "age", sortable: true },
    { headerName: "Location", field: "location" },
    { headerName: "Performance", field: "performanceRating" },
    { headerName: "Projects", field: "projectsCompleted" },
    { headerName: "Active", field: "isActive" },
    {
      headerName: "Skills",
      field: "skills",
      valueFormatter: (params) => params.value.join(", ") 
    },
    { headerName: "Manager", field: "manager" }
  ]);

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && gridRef.current) {
      gridRef.current.api.setGridOption("quickFilterText", searchTerm);
    }
  };

  return (
    <div style={{ width: "95%", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center" }}>Employee Dashboard</h2>

     
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Type search term and press Enter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: "8px",
            width: "50%",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}
        />
      </div>

      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          rowClassRules={{
            "ag-row-even": (params) => params.node.rowIndex % 2 === 0,
            "ag-row-odd": (params) => params.node.rowIndex % 2 !== 0
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
