import React, { useState } from "react";

const NewTask = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Title and Description are required!");

    const newTask = {
      taskId: Date.now(), // ID
      title,
      description,
      status,
    };

    onSubmit(newTask); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
