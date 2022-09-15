import {useEffect, useRef } from "react";
import Dynamsoft from "dwt";
import { WebTwain } from "dwt/dist/types/WebTwain";

interface props {
  license?:string;
  onWebTWAINReady?: (dwt:WebTwain) => void;
  onWebTWAINNotFound?: () => void;
  width?: string;
  height?: string;
  viewMode?: {cols:number,rows:number};
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
      if (props.viewMode) {
        DWObject.Viewer.setViewMode(props.viewMode.cols,props.viewMode.rows);
      }
    });
    
    if (props.onWebTWAINNotFound){
      const notfound = () => {
        if (props.onWebTWAINNotFound){
          props.onWebTWAINNotFound();
        }
      }
      let DynamsoftAny:any = Dynamsoft;
      DynamsoftAny.OnWebTwainNotFoundOnWindowsCallback = notfound;
      DynamsoftAny.OnWebTwainNotFoundOnMacCallback = notfound;
      DynamsoftAny.OnWebTwainNotFoundOnLinuxCallback = notfound;
    }
    if (props.license) {
      Dynamsoft.DWT.ProductKey = props.license;
    }
    Dynamsoft.DWT.ResourcesPath = "/dwt-resources";
    Dynamsoft.DWT.Containers = [{
        WebTwainId: 'dwtObject',
        ContainerId: containerID
    }];

    Dynamsoft.DWT.Load();
  },[]);

  useEffect(()=>{
    const DWObject = Dynamsoft.DWT.GetWebTwain(containerID);
    if (DWObject && props.viewMode) {
      DWObject.Viewer.setViewMode(props.viewMode.cols,props.viewMode.rows);
    }
  },[props.viewMode]);

  return (
    <div ref={container} id={containerID}></div>
  );
}

export default DocumentViewer;
