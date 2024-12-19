import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Post from "./Components/Post/Post";
import EditPost from "./Components/Post/EditPost";
import Users from "./Components/Users/Users";
import AddUser from "./Components/Users/AddUser";
import UpdateUser from "./Components/Users/UpdateUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user/:id" element={<UpdateUser />} /> 
          <Route path="/edit_post/:id" element={<EditPost />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
