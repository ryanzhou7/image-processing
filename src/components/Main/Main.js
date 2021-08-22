import React, { useRef, useEffect, useState } from "react";
import {  Tabs, Tab } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Chart from "../Chart/Chart"
import Eyes from "../Eyes/Eyes"
import Scribe from "../Scribe/Scribe"

// For the analysis

function Main() {
  
  const chart = "Chart";
  const eyes = "Eyes";
  const notes = "Notes";
  
  const [tab, setTab] = useState(chart);

  const chartProps = {
    activeTab: (tab === chart),
  };

  const eyesProps = {
    activeTab: (tab === eyes),
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={tab}
      onSelect={(k) => setTab(k)}
      className="mb-3 justify-content-center"
    >
      <Tab eventKey={chart} title={"Chart"}>
        <Chart selectedTab={tab} {...chartProps} />
      </Tab>
      <Tab eventKey={eyes} title={"Eyes"}>
        <Eyes selectedTab={tab} {...eyesProps} />
      </Tab>
      <Tab eventKey={notes} title={"Notes"}>
        <Scribe selectedTab={tab}/>
      </Tab>
    </Tabs>
  );
}

export default withOrientationChange(Main);
