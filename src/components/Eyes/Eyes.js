import React, { useRef, useEffect, useState } from "react";
import { Button, Card, OverlayTrigger, Popover } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/eyesImageReducer";
import { useSelector, useDispatch } from "react-redux";
import target from "../../assets/target/circle.png";
import sample from "../../assets/sample/63.jpg";
import Preview from "./Preview";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BAR_HEIGHT, SPACE_BETWEEN_BARS } from "../../constants";

function Eyes(props) {
  // Setup
  const dispatch = useDispatch();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const activeTab = props.activeTab;

  // Redux
  const videoConstraints = useSelector(
    (state) => state.videoReducer.videoConstraints
  );
  const eyesImage = useSelector((state) => state.eyesImage.source);
  const canvasDimensions = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );

  // Ref
  const webcamContainerRef = useRef(null);
  const webcamRef = useRef(null);
  const previewContainerRef = useRef(null);

  // Set a default image for debugging bad images
  useEffect(() => {
    //dispatch(imageReducer.setImageOnload(sample));
  }, []);

  const capture = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setEyesImageOnload(screenshot));
    dispatch(imageReducer.setEyesImage(screenshot));
    window.scrollTo(0, previewContainerRef.current.offsetTop);

    setIsCameraOn(false);
  };

    // Children props setup
    const previewProps = {
      webcamRef,
      webcamContainerRef,
      image: eyesImage,
      canvasDimensions: {
        canvasWidth: canvasDimensions.width,
        canvasHeight: canvasDimensions.height,
      },
      drawDimensions: {
        drawWidth: canvasDimensions.width,
        drawHeight: canvasDimensions.height,
      },
      cameraState: [isCameraOn, setIsCameraOn],
    };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        Please position only the patients eyes between the black bars
      </Popover.Content>
    </Popover>
  );
  return (

    <div className="App mt-2">
      <h2 className="card-title" style={{ display: "inline" }}>
        Capture eyes{" "}
      </h2>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <FontAwesomeIcon icon="question-circle" size="2x" />
      </OverlayTrigger>
      <Card className="mt-4">
        <div className="mx-auto">
          <div className="capture-container mx-auto" ref={webcamContainerRef}>
            {isCameraOn && activeTab && (
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
                  <div className="top mx-auto"
                    style={
                      {
                        width: videoConstraints.width,
                        height: BAR_HEIGHT
                      }}
                  > 
                  </div>
                  <div className="bottom mx-auto"
                    style={
                      {
                        width: videoConstraints.width,
                        marginTop: SPACE_BETWEEN_BARS,
                        height: BAR_HEIGHT
                      }
                    }
                  >
                  </div>
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

      <div className="mt-4" ref={previewContainerRef}>
        <Preview {...previewProps} />
      </div>
      <br />
      <br />
      <br />
    </div>

  );
}

export default withOrientationChange(Eyes);
