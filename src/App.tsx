import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './pages/UserProfile';
import AddUser from './pages/AddUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
