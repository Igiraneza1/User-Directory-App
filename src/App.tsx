import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/Profile";
import AddUser from "./components/AddUser";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
