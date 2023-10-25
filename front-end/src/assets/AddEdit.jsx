import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  headers: "",
  description: "",
  date: "",
  time: "",
  priority : "",
  image: null,
};

function AddEdit() {
  const [state, setState] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);

  const setpriority = ["High" , "Medium", "Low"  ];
  const [prioriti, setPriority] = useState("Priority");
  const [menu, setMenu] = useState(false);
  const changeText = (e) => {
    setMenu(false);
    setPriority(e.target.textContent);
};


  const navigate = useNavigate();
  const { id } = useParams();

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imageUrl);
    setState({ ...state, image: selectedFile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { headers, description, date, time, priority, image } = state;

    if (!headers || !description || !date || !time) {
      toast.error("Please fill the form");
      return;
    } else if (!priority || priority === "Priority") { 
      toast.error("Please select the priority");
      return;
    } else if (!image) {
      toast.error("Please select the Image");
      return;
    }

    const formData = new FormData();
    formData.append("headers", headers);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("priority", priority);
    formData.append("image", image);

    if (!id) {
      axios
        .post("http://localhost:5000/api/post", formData)
        .then(() => {
          navigate("/");
          setState(initialState);
          toast.success("Task Added Successfully");
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.response.data);
        });
    } else {
      axios
      .put(`http://localhost:5000/api/updatetask/${id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
          toast.success("Task Updated Successfully");
        } else {
          toast.error("Update was not successful. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data || "An error occurred during the update.");
      });
    
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/get/${id}`).then((res) => {
        setState({ ...res.data[0] });
      });
    }
  }, [id]);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow-lg">
    <h1 className="text-2xl font-semibold mb-4">ADD EDIT</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="headers" className="text-gray-600">headers</label>
        <input
          type="text"
          name="headers"
          placeholder="headers"
          value={state.headers || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="text-gray-600">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={state.description || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="date" className="text-gray-600">Date</label>
        <input
          type="date"
          name="date"
          value={state.date || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="time" className="text-gray-600">Time</label>
        <input
          type="time"
          name="time"
          value={state.time || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>

      <div>
  <label htmlFor="priority" className="text-gray-600">
    Priority
  </label>
  <div className="relative inline-block">
    <select
      name="priority"
      value={prioriti}
      onChange={handleChange}
      className="w-full p-2 border rounded shadow-sm cursor-pointer"
      onClick={() => setMenu(!menu)}
    >
      <option value="Priority">Priority</option>
      {setpriority.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
    {menu && (
      <div className="absolute top-10 left-0 w-full bg-white border rounded mt-2 shadow-md">
        {setpriority.map((item, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-blue-200"
            onClick={changeText}
          >
            {item}
          </div>
        ))}
      </div>
    )}
  </div>
</div>


      <div>
        <label htmlFor="image" className="text-gray-600">Image</label>
        {state.image && typeof state.image === "string" ? (
          <img
            src={`http://localhost:5000/uploads/${state.image}`}
            alt="Selected Image"
            style={{ maxWidth: "100px" }}
          />
        ) : (
          state.image && (
            <img
              src={URL.createObjectURL(state.image)}
              alt="Selected Image"
              style={{ maxWidth: "100px" }}
            />
          )
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFile}
        />
      </div>
      <input
        type="submit"
        value={id ? "Update" : "Save"}
        className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 cursor-pointer"
      />
      <Link to="/" className="text-blue-500 hover:underline">Go Back</Link>
    </form>
  </div>
  
  );
}

export default AddEdit;
