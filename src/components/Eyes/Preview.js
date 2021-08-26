
import React, { useRef, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { BAR_HEIGHT, SPACE_BETWEEN_BARS } from "../../constants";

function Preview(props) {

  // props
  const image = props.image;
  const { drawWidth } = props.drawDimensions;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const { webcamContainerRef } = props;
  const [, setIsCameraOn] = props.cameraState;

  const canvasRef = useRef(null);

  useEffect(() => {

    const { current: canvas } = canvasRef;
    if( canvas == null || image == null){
      return;
    }
    
    const context = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = SPACE_BETWEEN_BARS;
    context.drawImage(image,  
      0, BAR_HEIGHT, // How far to move from the source image top left
      drawWidth, SPACE_BETWEEN_BARS, // how much to take from the source image
      0, 0, // How far to move on the canvas before drawing
      drawWidth, SPACE_BETWEEN_BARS // how much to draw on the canvas
      );

  }, [image]);

  return (
    <>
      {image &&
        (<Card>
          <div className="mx-auto py-4">
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

            <Button
              variant="primary">
              Download
            </Button>

          </div>                
        </Card>)
      }
    </>
  );
}
export default Preview;