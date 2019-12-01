import React from "react";
import InputComponent from "./Components/Input";
import { userData } from "./Constants";
import "./App.css";

function App() {
  return (
    <div className="App">
      <InputComponent data={userData} />
    </div>
  );
}

export default App;
