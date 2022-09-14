import "./App.css";
import React from "react";
import DocumentViewer from "./components/DWT";
import { WebTwain } from "dwt/dist/types/WebTwain";
import { Select, Button, Layout, Collapse  } from 'antd';
import { DeviceConfiguration } from "dwt/dist/types/WebTwain.Acquire";

const { Panel } = Collapse;
const { Content, Sider } = Layout;
const { Option } = Select;

function App() {
  const [scanners,setScanners] = React.useState([] as string[]);
  const dwt = React.useRef<WebTwain>();
  const [selectedScanner,setSelectedScanner] = React.useState("");
  React.useEffect(()=>{
    console.log("load page");
  },[]);

  const scan = () => {
    const DWObject = dwt.current;
    if (DWObject) {
      let deviceConfiguration:DeviceConfiguration = {};
      deviceConfiguration.IfShowUI = false;
      deviceConfiguration.SelectSourceByIndex = scanners.indexOf(selectedScanner);
      DWObject.AcquireImage(deviceConfiguration);
    }
  }

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const onWebTWAINReady = (instance:WebTwain) => {
    dwt.current = instance;
    loadScannersList();
  }

  const loadScannersList = () => {
    const DWObject = dwt.current;
    if (DWObject) {
      const names = DWObject.GetSourceNames(false) as string[];
      setScanners(names);
      if (names.length>0) {
        setSelectedScanner(names[0]);
      }
    }
  }

  const onSelectedScannerChange = (value:string) => {
    setSelectedScanner(value);
  }

  return (
    <Layout hasSider>
      <Layout style={{ marginRight: 300 }}>
        <Content className="content">
            <DocumentViewer
              width="100%"
              height="100%"
              onWebTWAINReady={onWebTWAINReady}
            ></DocumentViewer>
        </Content>
      </Layout>
      <Sider 
        width='300px'
        theme='light'
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Collapse className="controls" defaultActiveKey={['1']} onChange={onChange}>
          <Panel header="SCAN" key="1">
            <Select 
              onChange={onSelectedScannerChange}
              value={selectedScanner}
              style={{width:"100%"}}>
              {scanners.map(scanner => 
                <Option 
                  key={scanner} 
                  value={scanner}
                >{scanner}</Option>
              )}
            </Select>
            <Button onClick={scan}>Scan</Button>
          </Panel>
          <Panel header="VIEWER" key="2">
            <p>text</p>
          </Panel>
          <Panel header="SAVE" key="3">
            <p>text</p>
          </Panel>
        </Collapse>
      </Sider>
  </Layout>
  );
}

export default App;
