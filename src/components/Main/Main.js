import React, { useRef, useEffect, useState } from "react";
import {  Tabs, Tab } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "../Chart/Chart"
//import Eyes from "../Eyes/Eyes"
//import Scribe from "../Scribe/Scribe"

// For the analysis

function Main() {
  
  const chart = "Chart";
  const eyes = "Eyes";
  const notes = "Notes";
  const [tab, setTab] = useState(chart);
  return (
    // <Tabs
    //   id="controlled-tab-example"
    //   activeKey={tab}
    //   onSelect={(k) => setTab(k)}
    //   className="mb-3 justify-content-center"
    // >
    //   <Tab eventKey={chart} title={"Chart"}>
        
    //       {/* <Chart selectedTab={tab}/> */}
        
    //   </Tab>
    //   <Tab eventKey={eyes} title={"Eyes"}>
    //     {tab === eyes &&(
    //       <Eyes selectedTab={tab}/>)
    //     }
    //   </Tab>
    //   <Tab eventKey={notes} title={"Notes"}>
    //     {tab === notes &&
    //       <Scribe selectedTab={tab}/>
    //     }
    //   </Tab>
    // </Tabs>

    <Chart/>

  );
}

export default withOrientationChange(Main);
