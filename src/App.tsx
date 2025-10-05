// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
// import Profile from "./pages/Profile"
// import Messages from "./pages/Messages"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* <Route path="messages" element={<Messages />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
