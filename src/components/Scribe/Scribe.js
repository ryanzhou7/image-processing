import React, { useState, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import * as CanvasHelper from "../../utils/CanvasHelper";
import * as AdjustUtils from "../Adjuster/utils";
import * as downloadReducer from "../../redux/downloadReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  FormControl,
  Button,
} from "react-bootstrap";
import "./index.css";

function Scribe(props) {
  const dispatch = useDispatch();

  // redux
  const threshold = useSelector((state) => state.downloadReducer.threshold);
  const identifyingData = useSelector((state) => state.downloadReducer.identifyingData);
  const additionalComments = useSelector((state) => state.downloadReducer.additionalComments);
  const checked = useSelector((state) => state.downloadReducer.checked);

  function setIdentifyingData(data){
    dispatch(downloadReducer.setIdentifyingData(data));
  }

  function setAdditionalComments(data){
    dispatch(downloadReducer.setAdditionalComments(data));
  }

  function toggleChecked(data){
    checked[data] = !checked[data];
    dispatch(downloadReducer.setChecked(data));
  }

  const canvasRef = useRef(null);

  const imageSource = useSelector((state) => state.chartImage.source);
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;
  return (
    <>
      <Card>
        <Card.Body>
          <Form.Group 
            as={Row}
            className="mb-3">
            <Form.Label column sm="3">Identifying data:</Form.Label>
            <Col sm="10">
              <Form.Control
                style={{maxWidth: 300}}
                value={identifyingData}
                onChange={(e) => setIdentifyingData(e.target.value)}/>
            </Col>
          </Form.Group>

          <Form.Label className="mr-2">Patient complains of the following:</Form.Label>
          <Form>
            <div key={`default-checkbox`} className="mb-3">
              {Object.keys(checked).map((key, index) =>            
                <Form.Check 
                  type={"checkbox"}
                  id={key}
                  onChange={ (e) => toggleChecked(e.target.id) }
                  label={key}/>
              )}
            </div>
          </Form>
      
          <Form.Group           
            className="mb-3">
            <Form.Label>Additional comments:</Form.Label>
              <FormControl
                style={{maxWidth: 600}}
                id="notes"
                as="textarea" rows={4}
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
              />            
          </Form.Group>

          <div className="mt-4">
            <Button
              variant="primary"
              onClick={() =>
                CanvasHelper.download(
                  imageSource,
                  combinedCanvasInfo.canvas,
                  canvasRef,
                  {    
                    threshold,
                  }
                )
              }
              size="lg"
            >
              Download
            </Button>
          </div>
        </Card.Body>
      </Card>
      <canvas style={{ display: "none" }} ref={canvasRef} />
    </>
  );
}

export default Scribe;
