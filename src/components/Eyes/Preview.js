
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

  const image = props.image;
  const { drawWidth, drawHeight } = props.drawDimensions;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const canvasRef = useRef(null);

  useEffect(() => {

    const { current: canvas } = canvasRef;
    if( canvas == null || image == null){
      return;
    }
    
    const context = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.drawImage(image,  
      0, BAR_HEIGHT, // How far to move from the source image top left
      drawWidth, SPACE_BETWEEN_BARS, // how much to take from the source image
      0, 0, // How far to move on the canvas before drawing
      drawWidth, SPACE_BETWEEN_BARS // how much to draw on the canvas
      );

  }, [image]);

  return (
    <>
      <Card>
        <div className="mx-auto">
          <canvas ref={canvasRef} />
        </div>
      </Card>
    </>
  );
}
export default Preview;