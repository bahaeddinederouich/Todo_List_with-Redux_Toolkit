// import { useState } from 'react'
// import TaskView from '../features/tasks/TaskView'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListView from "../features/List/ListView";
import "./App.css";
import FinalView from "../features/List/FinalView";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <TaskView/> */}
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/finalview" element={<FinalView />} />
          {/* <ListView /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
