import React, { useRef, useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
import * as downloadReducer from "../../redux/downloadReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";
import * as CanvasHelper from "../../utils/CanvasHelper";
import Scribe from "../Scribe/Scribe";
import * as DomHelper from "../../utils/DomHelper";

function Adjuster(props) {
  const dispatch = useDispatch();

  // redux
  const combinedCanvas = useSelector(
    (state) => state.combinedCanvasInfo.canvas
  );
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
  const imageSource = useSelector((state) => state.chartImage.source);
  const threshold = useSelector((state) => state.downloadReducer.threshold);

  const setThreshold = (t) => {
    dispatch(downloadReducer.setThreshold(t));
  };
  const note = useSelector((state) => state.downloadReducer.note);

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;

  // Props
  const { webcamContainerRef } = props;
  const [, setIsCameraOn] = props.cameraState;
  const [ isLoading, setIsLoading ] = props.isLoadingState;
  const { autoAnalyzeContainerRef } = props;

  let loss = utils.calculatedLossPercent(
    outerNumColoredPixels,
    innerNumColoredPixels
  );

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
  function changeThresholdBy(value) {
    setThreshold(Math.max(0, threshold + value));
  }
  
  useEffect(() => {
    async function f() {
      const threshold = await utils.getCorrectThreshold(fullAnalysis);
      setThreshold(threshold);
    }

    if(imageSource && isLoading) {
      f();
    }
  }, [imageSource, isLoading]);

  useEffect(() => {
    if (imageSource) {
      fullAnalysis(threshold);
    }
    if(isLoading){

      window.scrollTo(0, autoAnalyzeContainerRef.current.offsetTop);
      setIsLoading(false);
    }
  }, [threshold]);

  async function fullAnalysis(currThreshold) {
    const { topPixelsCount, bottomPixelsCount } = await utils.fullAnalysis(
      imageSource,
      combinedCanvasInfo,
      currThreshold
    );

    dispatch(
      combinedCanvasInfoReducer.setNumColoredOuterPixels(topPixelsCount)
    );
    dispatch(
      combinedCanvasInfoReducer.setNumColoredInnerPixels(bottomPixelsCount)
    );
  
    return (100 * (topPixelsCount - bottomPixelsCount)) / topPixelsCount;
  }

  return (
    <>
      <Card style={{ display: isLoading ? "none" : "" }}>
        {imageSource && <h2 className="card-title">Results</h2>}
        <div>
          <Canvas {...canvasProps} />
          {imageSource && (
            <div
              className={`d-flex justify-content-around align-items-center mb-4`}
            >
              <div>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setIsCameraOn(true);
                    window.scrollTo(0, webcamContainerRef.current.offsetTop);
                  }}
                >
                  Retake picture
                </Button>

                <div>
                  <h3 className="mt-4">Loss: {loss}%</h3>

                  <div className="mt-4">
                    <Button
                      variant="primary"
                      onClick={() =>
                        CanvasHelper.download(
                          imageSource,
                          combinedCanvasInfo.canvas,
                          canvasRef,
                          {
                            note,
                            loss,
                            threshold,
                          }
                        )
                      }
                      size="lg"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              <Card>
                <Card.Body>
                  <Card.Title>Sensitivity: {threshold}</Card.Title>
                  <div className="container">
                    <div className="row justify-content-around mb-3">
                      <Button
                        onClick={(e) => {
                          changeThresholdBy(-1);
                        }}
                      >
                        <FontAwesomeIcon icon="minus" size="1x" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          changeThresholdBy(1);
                        }}
                      >
                        <FontAwesomeIcon icon="plus" size="1x" />
                      </Button>
                    </div>
                    <div className="row justify-content-between">
                      <Button
                        className="mr-1"
                        onClick={(e) => {
                          changeThresholdBy(-3);
                        }}
                      >
                        <FontAwesomeIcon icon="minus" size="1x" />
                        {"  "}
                        <FontAwesomeIcon icon="minus" size="1x" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          changeThresholdBy(3);
                        }}
                      >
                        <FontAwesomeIcon icon="plus" size="1x" />
                        {"  "}
                        <FontAwesomeIcon icon="plus" size="1x" />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </Card>

      <canvas style={{ display: "none" }} ref={canvasRef} />
      {/* {imageSource && (
        <div className="mt-4">
          <canvas style={{ display: "none" }} ref={canvasRef} />
          <Scribe />
        </div>
      )} */}
    </>
  );
}

export default Adjuster;
