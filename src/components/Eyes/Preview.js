
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { BAR_HEIGHT, EYES_IMAGE_HEIGHT } from "../../constants";
import Download from "../Download/Download";
import * as imageReducer from "../../redux/eyesImageReducer";
import { useSelector } from "react-redux";
import { calculatedLossPercent } from "../../utils/AnalysisHelper";

function Preview(props) {
  
  const dispatch = useDispatch();
  
  // props
  const image = props.image;
  const { drawWidth } = props.drawDimensions;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const { webcamContainerRef } = props;
  const [, setIsCameraOn] = props.cameraState;

  const canvasRef = useRef(null);

  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
  let loss = calculatedLossPercent(
    combinedCanvasInfo.outerNumColoredPixels,
    combinedCanvasInfo.innerNumColoredPixels
  );

  useEffect(() => {

    const { current: canvas } = canvasRef;
    if( canvas == null || image == null){
      return;
    }
    
    dispatch(imageReducer.setEyesCanvas(canvas));

    const context = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = EYES_IMAGE_HEIGHT;
    context.drawImage(image,  
      0, BAR_HEIGHT, // How far to move from the source image top left
      drawWidth, EYES_IMAGE_HEIGHT, // how much to take from the source image
      0, 0, // How far to move on the canvas before drawing
      drawWidth, EYES_IMAGE_HEIGHT // how much to draw on the canvas
      );

  }, [image]);

  return (
    <>
      <Card style={{display: image == null ? "none" : ""}}>
        <h2 className="card-title">Results</h2>
        <div className="mx-auto p3-4">
          <canvas ref={canvasRef} />
        </div>

        <div className={`d-flex align-items-center mx-auto mb-4`}>
          <Button
            variant="outline-primary"
            className={"mr-2"}
            onClick={() => {
              setIsCameraOn(true);
              window.scrollTo(0, webcamContainerRef.current.offsetTop);
            }}
          >
            Retake picture
          </Button>
        </div>                
      </Card>    
    </>
  );
}
export default Preview;