import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { download } from "../../utils/DownloadHelper";
import { calculatedLossPercent } from "../../utils/AnalysisHelper";

function Download(props) {

    // Redux
    const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
    const chartCanvas = combinedCanvasInfo.canvas;
    const identifyingData = useSelector((state) => state.downloadReducer.identifyingData);
    const additionalComments = useSelector((state) => state.downloadReducer.additionalComments);
    const checked = useSelector((state) => state.downloadReducer.checked);
    
    const chartImage = useSelector((state) => state.chartImage.source);
    const eyesImage = useSelector((state) => state.eyesImage.source);
    const eyesCanvas = useSelector((state) => state.eyesImage.canvas);

    const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
    const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;
    const loss = calculatedLossPercent(
      outerNumColoredPixels,
      innerNumColoredPixels
    );

    const downloadData = {
        
        chartCanvas: nullify(chartImage, chartCanvas),
        eyesCanvas: nullify(eyesImage, eyesCanvas),

        identifyingData,
        additionalComments,
        checked,
        loss
    }
    return(
        <>
            <Button
                variant="primary"
                onClick={() => download(downloadData)}>
                Download
            </Button>
      </>
    )
}

function nullify(checkValue, nonNullReturn){
    return checkValue === null ? null : nonNullReturn;
}

export default Download;
