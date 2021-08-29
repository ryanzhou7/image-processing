import React, { useRef, useEffect, useState } from "react";
import { Button, Card, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/chartImageReducer";
import { useSelector, useDispatch } from "react-redux";
import Adjuster from "../Adjuster/Adjuster";
import target from "../../assets/target/circle.png";
import sample from "../../assets/sample/63.jpg";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Chart(props) {
  // Setup
  const dispatch = useDispatch();
  
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const activeTab = props.activeTab;

  // Redux
  const videoConstraints = useSelector(
    (state) => state.videoReducer.videoConstraints
  );
  const image = useSelector((state) => state.chartImage.source);
  const canvasDimensions = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );

  // Ref
  const webcamContainerRef = useRef(null);
  const webcamRef = useRef(null);
  const autoAnalyzeContainerRef = useRef(null);

  // Set a default image for debugging
  useEffect(() => {
    //dispatch(imageReducer.setChartImageOnload(sample));
  }, []);

  const capture = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setChartImageOnload(screenshot));
    dispatch(imageReducer.setChartImage(screenshot));
    setIsCameraOn(false);
    setIsLoading(true);
  };

  // Children props setup
  const adjusterProps = {
    webcamContainerRef,
    image,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    drawDimensions: {
      drawWidth: canvasDimensions.width,
      drawHeight: canvasDimensions.height,
    },
    autoAnalyzeContainerRef,
    cameraState: [isCameraOn, setIsCameraOn],
    isLoadingState: [isLoading, setIsLoading]
  };

  const popover = (
    <Popover id="popover-chart">
      <Popover.Content>
        Draw your chart with red sharpie. Align the red target's circle
        concentrically with the chart's smallest circle that still encompasses
        all of the the drawn lines for increased accuracy. Also ensure the
        target cross is aligned with the chart. Camera focus will happen
        automatically. Tap the (?) again to close this popover.
      </Popover.Content>
    </Popover>
  );
  return (
    <div className="App mt-2">
      <h2 className="card-title" style={{ display: "inline" }}>
        Capture chart{" "}
      </h2>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover} >
        <FontAwesomeIcon icon="question-circle" size="2x" />
      </OverlayTrigger>

      {isLoading && 
        (
          <div className="mt-4">
            <Spinner animation="border" variant="primary" />
            <h5>Analyzing...</h5>
        </div>
        )
      }

      {!isLoading &&
        (<Card className="mt-4">
          <div className="mx-auto">
            <div className="capture-container mx-auto" ref={webcamContainerRef}>
              {isCameraOn && activeTab &&(
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    height={videoConstraints.height}
                    screenshotFormat="image/jpeg"
                    width={videoConstraints.width}
                    videoConstraints={videoConstraints}
                  />
                  <div className="overlay">
                    <img
                      className="target"
                      //width -20 leaves some padding on the left and right side
                      style={{ width: videoConstraints.width - 20 }}
                      src={target}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="my-2 z-top mx-auto">
            <Button className="capture-button" onClick={() => capture()}>
              <FontAwesomeIcon icon="camera" size="3x" />
            </Button>
          </div>
        </Card>
        )
      }

      <div className="mt-4" ref={autoAnalyzeContainerRef}>
        <Adjuster {...adjusterProps} />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default withOrientationChange(Chart);
