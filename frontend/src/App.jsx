import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";

function App() {


  return (

    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          
        </Routes>
    </Router>

  )
}

export default App
