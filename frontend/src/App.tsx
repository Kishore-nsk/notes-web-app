import Board from './components/board'
import Login from './components/login'
import { Routes, Route } from "react-router";
import Signup from './components/signup';

function App() {
  return (
    <>
      <div className="h-screen bg-[#d5e681] font-roboto flex justify-center items-center">
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/notes" element={<Board />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
