import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as CanvasHelper from "../../utils/CanvasHelper";
import { Button } from "react-bootstrap";


function Download(props) {

    const drawingCanvas = useRef(null);

    const chartCanvas = useSelector((state) => state.combinedCanvasInfo).canvas;

    const identifyingData = useSelector((state) => state.downloadReducer.identifyingData);
    const additionalComments = useSelector((state) => state.downloadReducer.additionalComments);
    const checked = useSelector((state) => state.downloadReducer.checked);

    const eyesImage = useSelector((state) => state.eyesImage.source);

    return(
        <>
            <Button
                variant="primary"
                onClick={() =>
                    CanvasHelper.download(        
                )
                }>
                Download
            </Button>
            <canvas style={{ display: "none" }} ref={drawingCanvas} />
      </>
    )
}

export default Download;
