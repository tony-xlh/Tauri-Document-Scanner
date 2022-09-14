import "./App.css";
import React from "react";
import DocumentViewer from "./components/DWT";
import { WebTwain } from "dwt/dist/types/WebTwain";

function App() {
  const dwt = React.useRef<WebTwain>();
  React.useEffect(()=>{
    console.log("load page");
  },[]);

  const scan = () => {
    const DWObject = dwt.current;
    if (DWObject) {
      DWObject.AcquireImage();
    }
  }

  return (
    <div>
      <div className="viewContainer">
        <DocumentViewer
          width="100%"
          height="100%"
          onWebTWAINReady={(instance)=>{dwt.current = instance}}
        ></DocumentViewer>
      </div>
      <button onClick={scan}>Scan</button>
    </div>
    
  );
}

export default App;
