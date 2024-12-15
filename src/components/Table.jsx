import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./Table.css";

const Table = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();

        // Initialize Tabulator
        new Tabulator(tableRef.current, {
          data, // Load fetched data
          height: "400px", 
          layout: "fitColumns", 
          responsiveLayout: "collapse", 
          columns: [
            { title: "User ID", field: "userId", headerHozAlign: "center" },
            { title: "ID", field: "id", headerHozAlign: "center" },
            { title: "Title", field: "title", headerHozAlign: "center" },
            {
              title: "Completed",
              field: "completed",
              headerHozAlign: "center",
              formatter: "tickCross", 
            },
          ],
          movableColumns: false, 
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-white shadow rounded-lg">
      {/*  Header */}
      <h2 className="text-lg font-bold mb-4 text-center">Todos Table</h2>

      {/* main Container */}
      <div
        ref={tableRef}
        className="w-full overflow-hidden table-container"
        style={{ maxHeight: "400px" }}
      ></div>
    </div>
  );
};

export default Table;
