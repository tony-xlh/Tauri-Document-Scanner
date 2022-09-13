import {useEffect, useRef } from "react";
import Dynamsoft from "dwt";

function DocumentViewer() {
  const containerID = "dwtcontrolContainer";
  const container = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    console.log("load page");
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
      const DWObject = Dynamsoft.DWT.GetWebTwain(containerID);
      console.log(DWObject);
      if (container.current) {
        container.current.style.height = "100%";
        container.current.style.width = "100%";
      }
      
      DWObject.Viewer.height = "100%";
      DWObject.Viewer.width = "100%";
    });
    Dynamsoft.DWT.ResourcesPath = "/dwt-resources";
    Dynamsoft.DWT.Containers = [{
        WebTwainId: 'dwtObject',
        ContainerId: containerID
    }];
    Dynamsoft.DWT.Load();
  },[]);

  return (
    <div ref={container} id={containerID}></div>
  );
}

export default DocumentViewer;
