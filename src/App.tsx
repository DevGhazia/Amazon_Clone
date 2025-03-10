import { Routes, Route } from "react-router"
import Login from "./components/Login"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App
