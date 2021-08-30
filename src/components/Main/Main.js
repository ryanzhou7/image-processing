import React, { useState } from "react";
import { Button, Tabs, Tab, Form, Nav } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Chart from "../Chart/Chart"
import Eyes from "../Eyes/Eyes"
import Scribe from "../Scribe/Scribe"

function Main() {
  
  const chart = "Chart";
  const eyes = "Eyes";
  const notes = "Notes";
  
  const [tab, setTab] = useState(chart);
  const [showFullTerms, setShowFullTerms] = useState(false);

  const chartProps = {
    activeTab: (tab === chart),
  };

  const eyesProps = {
    activeTab: (tab === eyes),
  };

  return (
    <>
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
    
      {!showFullTerms &&(
        <Form.Text className="text-muted mx-4 justify-content-center">
          By accessing this site you signify that you have read, understood, and agree to be bound by the 
          <Nav.Link className={"d-inline p-1"} href="#" onClick={ () => setShowFullTerms(true)}>full terms and conditions.</Nav.Link>          
      </Form.Text>)}

      {showFullTerms &&(
        <Form.Text className="text-muted mx-4 justify-content-center">
          This app provides only information, is not medical 
          or treatment advice and may not be treated as such by the user. 
          As such, this app may not be relied upon for the purposes of 
          medical diagnosis or as a recommendation for medical care or 
          treatment. The information on this App is not a substitute for 
          professional medical advice, diagnosis or treatment. 
          All content, including text, graphics, images and information, 
          contained on or available through this App is for general 
          information purposes only. You are strongly encouraged to confirm any 
          information obtained from or through this App with your physician 
          or another professional healthcare provider and to review all 
          information regarding any medical condition or treatment with 
          your physician or other a professional healthcare provider.
          YOU MUST NEVER RELY ON ANY INFORMATION OBTAINED USING THIS APP FOR ANY 
          DIAGNOSIS OR RECOMMENDATION FOR MEDICAL TREATMENT. 
          YOU MUST NEVER RELY ON THE INFORMATION RECEIVED FROM THIS APP 
          AS ALTERNATIVE TO MEDICAL ADVICE FROM YOUR PHYSICIAN OR OTHER 
          PROFESSIONAL HEALTHCARE PROVIDER. YOU MUST NEVER DISREGARD 
          PROFESSIONAL MEDICAL ADVICE OR DELAY SEEKING MEDICAL TREATMENT 
          AS RESULT OF ANY INFORMATION YOU HAVE SEEN ON OR ACCESSED THROUGH 
          THIS APP. IF YOU HAVE ANY SPECIFIC QUESTIONS ABOUT ANY MEDICAL 
          MATTER YOU SHOULD CONSULT YOUR PHYSICIAN OR OTHER PROFESSIONAL 
          HEALTHCARE PROVIDER. IF YOU THINK YOU MAY BE SUFFERING FROM ANY 
          MEDICAL CONDITION YOU SHOULD SEEK IMMEDIATE MEDICAL ATTENTION.
          The information provided by this App is provided “as is” without 
          any representations or warranties, express or implied. 
          This app makes no representations or warranties in relation to 
          the medical or other information in this App. 
          This app does not warrant that the information provided by this App 
          will be constantly available, or available at all or the information 
          provided by this App is complete, true, accurate, up-to-date, 
          or non-misleading. THIS APP IS NOT RESPONSIBLE OR LIABLE FOR ANY ADVICE, 
          COURSE OF TREATMENT, DIAGNOSIS OR ANY OTHER INFORMATION, SERVICES OR 
          PRODUCTS THAT YOU OBTAIN THROUGH THE USE OF THIS APP. By using the 
          app you have acknowledged that: YOU HAVE READ THE UNDERSTAND THIS MEDICAL DISCLAIMER. 
          YOU AGREE WITH THIS MEDICAL DISCLAIMER. YOU AGREE TO BE LEGALLY BOUND 
          BY THIS MEDICAL DISCLAIMER, WHICH SHALL TAKE EFFECT IMMEDIATELY. IF YOU 
          DO NOT AGREE TO BE LEGALLY BOUND BY THIS MEDICAL DISCLAIMER, 
          YOU MAY NOT ACCESS OR USE THE APP.
        </Form.Text>)}
    </>
  );
}

export default withOrientationChange(Main);
