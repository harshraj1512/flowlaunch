import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./Table.css";

const Table = () => {
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]); 

  // Fetch initial data for the table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todos = await response.json();

        // Mapping
        const enhancedData = todos.map((task) => ({
          taskId: task.id,
          title: task.title,
          description: `Description for Task ${task.id}`, 
          status: "To Do", 
        }));

        setTableData(enhancedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Initialize Tabulator
  useEffect(() => {
    if (tableData.length > 0) {
      const table = new Tabulator(tableRef.current, {
        data: tableData,
        height: "400px",
        layout: "fitColumns",
        columns: [
          { title: "Task ID", field: "taskId", headerHozAlign: "center", hozAlign: "center", width: 90 },
          {
            title: "Title",
            field: "title",
            headerHozAlign: "center",
            editor: "input", // Inline editing
          },
          {
            title: "Description",
            field: "description",
            headerHozAlign: "center",
            width:600,
            editor: "textarea", // editable
          },
          {
            title: "Status",
            field: "status",
            headerHozAlign: "center",
            width: 150,
            editor: "list",
            editorParams: {
              values: ["To Do", "In Progress", "Done"],
              multiselect: false,
            },
          },
          {
            title: "Actions",
            headerHozAlign: "center",
            formatter: "buttonCross", 
            width: 100,
            hozAlign: "center",
            cellClick: (e, cell) => {
              // Remove task 
              const taskIdToDelete = cell.getRow().getData().taskId;
              setTableData((prevData) => prevData.filter((task) => task.taskId !== taskIdToDelete));
            },
          },
        ],
        movableColumns: false,
        dataEdited: (updatedData) => {
          console.log("Updated Table Data:", updatedData);
        },
      });

      return () => table.destroy(); 
    }
  }, [tableData]);


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
