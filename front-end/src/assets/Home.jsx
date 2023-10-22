import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);

  const filterTasks = (tasks, priority) => {
    if (priority === "All") {
      return tasks;
    }
    return tasks.filter((task) => task.priority === priority);
  };

  const filterOptions = ["All", "High", "Medium", "Low"];

  const [filter, setFilter] = useState("All");

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredTasks = filterTasks(data, filter);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`http://localhost:5000/api/delete/${id}`)
        toast.success("Task deleted successfully!");
        loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
  <div className="items-start justify-between md:flex">
    <div className="max-w-lg">
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
        Tasks
      </h3>
    </div>

    <div className="flex space-x-4 mb-4">
  {filterOptions.map((option) => (
    <button
      key={option}
      onClick={() => handleFilterChange(option)}
      className={`py-2 px-4 text-white rounded-lg ${
        filter === option
          ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'
          : 'bg-gray-400 hover:bg-gray-300 active:bg-gray-500'
      }`}
    >
      {option}
    </button>
  ))}
</div>

    <div className="mt-3 md:mt-0">
      <Link
        to="/addtask"
        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
      >
        Add Task
      </Link>
    </div>
  </div>
  <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
    <table className="w-full table-auto text-sm text-left">
      <thead className="bg-gray-50 text-gray-600 font-medium border-b">
        <tr>
          <th className="py-3 px-6">Heading</th>
          <th className="py-3 px-6">Description</th>
          <th className="py-3 px-6">Date</th>
          <th className="py-3 px-6">Time</th>
          <th className="py-3 px-6">Priority</th>
          <th className="py-3 px-6">Image</th>
          <th className="py-3 px-6">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 divide-y">
        {filteredTasks.map((item, idx) => (
          <tr key={idx}>
            <td className="px-6 py-4 whitespace-nowrap">{item.heading}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.priority}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <img
                src={`http://localhost:5000/uploads/` + item.image}
                className="w-10 h-10 rounded-full"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap space-x-2">
              <Link
                to={`/updatetask/${item.id}`}
                className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
              >
                Edit
              </Link>
              <Link
                to={`/viewtask/${item.id}`}
                className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover-bg-gray-50 rounded-lg"
              >
                View
              </Link>
              <button
                onClick={() => deleteTask(item.id)}
                className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default Home;
