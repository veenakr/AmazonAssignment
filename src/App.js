import React from "react";
import Input from "./Components/Input";
import { userData } from "./Utils/Constants";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Input data={userData} />
    </div>
  );
}

export default App;
