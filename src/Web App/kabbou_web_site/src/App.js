import './stylesheet.css';
import NavBar from "./pages/Navbar";
import { Content } from './Components/Navbar/Content';
import React from "react";


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <NavBar />
       <Content />
      </header>
    </div>
  );
}

export default App;
