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
    
    // const loss = calculatedLossPercent(
    //     combinedCanvasInfo.outerNumColoredPixels,
    //     combinedCanvasInfo.innerNumColoredPixels
    // );
    const loss = props.loss;

    const eyesCanvas = useSelector((state) => state.eyesImage.canvas);
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
                className="mr-4"
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
