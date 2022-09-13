import "./App.css";
import React from "react";
import DocumentViewer from "./components/DWT";

function App() {
  React.useEffect(()=>{
    console.log("load page");
  },[]);

  return (
    <div className="viewContainer">
      <DocumentViewer></DocumentViewer>
    </div>
  );
}

export default App;
