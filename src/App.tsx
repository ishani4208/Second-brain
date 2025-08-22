import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
  import { UserContent } from "./pages/UserContent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/dashboard"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} /> {/* 👈 Fix */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:username" element={<UserContent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App