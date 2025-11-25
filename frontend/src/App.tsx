import { useState } from 'react'
import Board from './components/board'

function App() {

  return (
    <>
      <div className="h-screen bg-[#d5e681] font-roboto flex justify-center items-center">
        <Board />
      </div>
    </>
  )
}

export default App
