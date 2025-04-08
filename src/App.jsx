import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login/Login'
import Home from './pages/Home/Home.jsx'
import Logout from './pages/Auth/Logout/Logout.jsx'
import Signup from "./pages/Auth/Signup/Signup.jsx"

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />


          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />

          <Route path="/logout" element={<Logout />} />

          <Route path = "/signup" element = {<Signup/>} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
