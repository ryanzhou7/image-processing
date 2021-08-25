import React, { useState } from "react";
import {  Tabs, Tab } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Chart from "../Chart/Chart"
import Eyes from "../Eyes/Eyes"
import Scribe from "../Scribe/Scribe"

function Main() {
  
  const chart = "Chart";
  const eyes = "Eyes";
  const notes = "Notes";
  
  const [tab, setTab] = useState(notes);

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
      <Tab eventKey={chart} title={chart}>
        <Chart selectedTab={tab} {...chartProps} />
      </Tab>
      <Tab eventKey={eyes} title={eyes}>
        <Eyes selectedTab={tab} {...eyesProps} />
      </Tab>
      <Tab eventKey={notes} title={notes}>
        <Scribe selectedTab={tab}/>
      </Tab>
    </Tabs>
  );
}

export default withOrientationChange(Main);
