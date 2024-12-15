import React, { useEffect, useRef, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./Table.css";
import NewTask from "./NewTask";
import { LayoutList } from "lucide-react";
import toast from "react-hot-toast";

const Table = () => {
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]); // initial
  const [filteredData, setFilteredData] = useState([]); // filtered data
  const [showPopup, setShowPopup] = useState(false); // form popup
  const [statusFilter, setStatusFilter] = useState("All"); // Status filter
  const [search, setSearch] = useState(""); // search
  const [loading, setLoading] = useState(true); //loading

  // Fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=20"
        );
        const todos = await response.json();
        console.log(todos);
        // Mapping
        const enhancedData = todos.map((task) => ({
          taskId: task.id,
          title: task.title,
          description: `Description for Task ${task.id}`,
          status: task.completed ? "Done" : "To Do",
        }));

        setTableData(enhancedData);
        setFilteredData(enhancedData);
        toast.success("Table Data Success")
      } catch (error) {
        toast.error("Error fetching data:", error);
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  // Initialize Tabulator
  useEffect(() => {
    if (filteredData.length > 0) {
      const table = new Tabulator(tableRef.current, {
        data: filteredData,
        height: "400px",
        layout: "fitColumns",
        columns: [
          {
            title: "Task ID",
            field: "taskId",
            headerHozAlign: "center",
            hozAlign: "center",
            width: 90,
          },
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
            width: 600,
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
              setFilteredData((prevData) => {
                const updated = prevData.filter((task) => task.taskId !== taskIdToDelete);
                toast.success("Data deleted successfully");
                return updated;
              });
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
  }, [filteredData]);

  // Add a new task
  const addNewTask = (newTask) => {
    setFilteredData((prevData) => [...prevData, newTask]);
    setShowPopup(false);
    toast.success("updated")
  };

  // Handle filter
  const handleFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);

    // Filter table other cases vs all
    if (selectedStatus === "All") {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter(
        (task) => task.status === selectedStatus
      );
      setFilteredData(filtered);
    }
  };

  //Handle Search
  const handleSearch = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setSearch(searchWord);

    // Filter table 
    if (search === "") {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((task) =>
        task.title.toLowerCase().includes(search)
      );
      setFilteredData(filtered);
    }
  };

  // Counts
  const getStatusCount = (status) => {
    return tableData.filter((task) => task.status === status).length;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-white shadow rounded-lg">
      {/*  Header */}
      <div className="flex justify-between items-center w-full mb-5">
        <div>
        <input
            type="search"
            placeholder="Search by title"
            value={search}
            onChange={handleSearch}
            className="p-2 border border-stone-300 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex space-x-4">
            <button className="flex gap-2 text-center items-center bg-white text-black text-sm font-normal px-3 py-2 rounded-[100px] border border-stone-300">
              <span>
                <LayoutList size={18} />
              </span>
              TO DO
              <span className="px-1 py-0.5 rounded-[100px] bg-neutral-200 text-black text-xs font-medium">
              {getStatusCount("To Do")}
              </span>
            </button>
            <button className="flex gap-2 text-center items-center bg-white text-black text-sm font-normal px-3 py-2 rounded-[100px] border border-stone-300">
              <span>
                <LayoutList size={18} />
              </span>
              In Progress
              <span className="px-1 py-0.5 rounded-[100px] bg-neutral-200 text-black text-xs font-medium">
                {getStatusCount("In Progress")}
              </span>
            </button>
            <button className="flex gap-2 text-center items-center bg-white text-black text-sm font-normal px-3 py-2 rounded-[100px] border border-stone-300">
              <span>
                <LayoutList size={18} />
              </span>
              Done
              <span className="px-1 py-0.5 rounded-[100px] bg-neutral-200 text-black text-xs font-medium">
                {getStatusCount("Done")}
              </span>
            </button>
          </div>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="p-2 border border-stone-300 bg-white text-black text-xs font-normal rounded-[100px] ml-2"
          >
            <option value="All" className="bg-white rounded-2xl">
              All
            </option>
            <option value="To Do" className="bg-white rounded-2xl">
              To Do
            </option>
            <option value="In Progress" className="bg-white rounded-2xl">
              In Progress
            </option>
            <option value="Done" className="bg-white rounded-2xl">
              Done
            </option>
          </select>
          <button
            onClick={() => setShowPopup(true)}
            className="px-2 py-1 rounded-lg bg-blue-600 text-white"
          >
            New Task
          </button>
        </div>
      </div>
      {/* main Container */}
      {loading ? (
        <div className="flex justify-center items-center h-[90%]">
        <div className="animate-spin w-8 h-8 border-4 border-t-sky-500 border-gray-200 rounded-full"></div>
      </div>
      ) : (
        <div
        ref={tableRef}
        className="w-full overflow-hidden table-container"
        style={{ maxHeight: "400px" }}
      ></div>
      )}
      

      {showPopup && (
        <NewTask
          onClose={() => setShowPopup(false)}
          onSubmit={addNewTask}
          existing={tableData}
        />
      )}
    </div>
  );
};

export default Table;
