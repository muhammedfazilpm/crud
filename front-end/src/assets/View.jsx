import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
const initialState = {
    heading: "",
    description: "",
    date: "",
    time: "",
    priority: "",
  };

function View() {
   
    const [state , setState ] = useState(initialState)
    const [data , setData] = useState([])
    const {id} = useParams()

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/viewtask/${id}`)
        .then((res)=>{
            setData({...res.data[0]})
        })
    },[id])

  return (

<div className="flex justify-center items-center h-screen">
  <div className="w-full max-w-lg p-4 bg-white rounded shadow-lg">
    <h1 className="text-2xl font-semibold mb-4 text-center">Single Page View</h1>

    <div className="p-2 border border-red-500 hover:border-transparent transition duration-300">
      <label htmlFor="heading" className="text-gray-600">Heading</label>
      <p>{data.heading}</p>
    </div>

    <div className="p-2 border border-red-500 hover:border-transparent transition duration-300">
      <label htmlFor="description" className="text-gray-600">Description</label>
      <p>{data.description}</p>
    </div>

    <div className="p-2 border border-red-500 hover:border-transparent transition duration-300">
      <label htmlFor="date" className="text-gray-600">Date</label>
      <p>{data.date}</p>
    </div>

    <div className="p-2 border border-red-500 hover:border-transparent transition duration-300">
      <label htmlFor="time" className="text-gray-600">Time</label>
      <p>{data.time}</p>
    </div>

    <div className="p-2 border border-red-500 hover:border-transparent transition duration-300">
      <label htmlFor="priority" className="text-gray-600">Priority</label>
      <p>{data.priority}</p>
    </div>

    <div className="p-2">
      <label htmlFor="image" className="text-gray-600">Image</label>
      <img
        src={`http://localhost:5000/uploads/${data.image}`}
        alt=""
        className="max-w-xs mx-auto rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
      />
    </div>
  </div>
</div>




  )
}

export default View