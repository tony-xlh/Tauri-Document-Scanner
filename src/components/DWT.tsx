import {useEffect, useRef } from "react";
import Dynamsoft from "dwt";
import { WebTwain } from "dwt/dist/types/WebTwain";

interface props {
  license?:string;
  onWebTWAINReady?: (dwt:WebTwain) => void;
  width?: string;
  height?: string;
}

const DocumentViewer: React.FC<props> = (props: props)  => {
  const containerID = "dwtcontrolContainer";
  const container = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
      const DWObject = Dynamsoft.DWT.GetWebTwain(containerID);
      if (props.width) {
        if (container.current) {
          container.current.style.width = props.width;
        }
        DWObject.Viewer.width = props.width;
      }
      if (props.height) {
        if (container.current) {
          container.current.style.height = props.height;
        }
        DWObject.Viewer.height = props.height;
      }
      if (props.onWebTWAINReady) {
        props.onWebTWAINReady(DWObject);
      }
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
