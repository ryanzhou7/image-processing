import React, { useState, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import * as downloadReducer from "../../redux/downloadReducer";
import { useSelector, useDispatch, connect } from "react-redux";
import Download from "../Download/Download";
import { CHECKBOX_TITLE, IDENTIFYING_DATA_LABEL, ADDITIONAL_COMMENTS_LABEL } from "../../constants";
import {
  Card,
  FormControl,
} from "react-bootstrap";
import "./index.css";

function Scribe() {
  const dispatch = useDispatch();

  // redux
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
    dispatch(downloadReducer.setChecked(data));
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Form.Group 
            as={Row}
            className="mb-3">
            <Form.Label column sm="3">{IDENTIFYING_DATA_LABEL}</Form.Label>
            <Col sm="10">
              <Form.Control
                style={{maxWidth: 300}}
                value={identifyingData}
                onChange={(e) => setIdentifyingData(e.target.value)}/>
            </Col>
          </Form.Group>

          <Form.Label className="mr-2">{CHECKBOX_TITLE}</Form.Label>
          <Form>
            <div className="mb-3">
              {Object.keys(checked).map((key, index) =>            
                 <Form.Check 
                  type={"checkbox"}
                  key={key}
                  id={key}
                  checked={checked[key]}   
                  onChange={ (e) => toggleChecked(e.target.id) }
                  label={key}/>
              )}
            </div>
          </Form>
      
          <Form.Group           
            className="mb-3">
            <Form.Label>{ADDITIONAL_COMMENTS_LABEL}</Form.Label>
              <FormControl
                style={{maxWidth: 600}}
                id="notes"
                as="textarea" rows={4}
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
              />            
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
}


export default Scribe
