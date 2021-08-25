
import React, { useRef, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
import * as downloadReducer from "../../redux/downloadReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Canvas from "../Canvas/Canvas";
import * as CanvasHelper from "../../utils/CanvasHelper";
import Scribe from "../Scribe/Scribe";
import * as DomHelper from "../../utils/DomHelper";
import { BAR_HEIGHT, SPACE_BETWEEN_BARS } from "../../constants";

function Preview(props) {

  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
  // Props
  const { webcamContainerRef } = props;
  const [, setIsCameraOn] = props.cameraState;

      // Child props
  const canvasProps = {
    ...props,
    canvasContext: [
      combinedCanvasInfo.context,
      combinedCanvasInfoReducer.setContext,
    ],
    setCanvas: combinedCanvasInfoReducer.setCanvas,
  };

  const canvasRef = useRef(null);
  const imageSource = useSelector((state) => state.chartImage.source);  
  return (
      <>
        <Card>
        </Card>
  
        <canvas style={{ display: "none" }} ref={canvasRef} />
      </>
  );
}
export default Preview;