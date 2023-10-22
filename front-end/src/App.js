import {BrowserRouter , Routes , Route } from "react-router-dom"
import {ToastContainer  } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AddEdit from './assets/AddEdit';
import Home from "./assets/Home"
import View from './assets/View';
import ErrorPage from './assets/ErrorPage';
import "../src/App.css";


function App() {
  return (
    <BrowserRouter>
    <ToastContainer position='top-center'/>

    <Routes>

    <Route exact path='/' element={ <Home/>}/>

      <Route path='/addtask' element={ <AddEdit/> }/>

      <Route path='/updatetask/:id' element={ <AddEdit/> }/>

      <Route path='/viewtask/:id' element={ <View/> }/>
      
      <Route path="*" element={<ErrorPage/>}/>

    </Routes>
   </BrowserRouter>
  );
}

export default App;
