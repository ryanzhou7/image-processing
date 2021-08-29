import React, { useRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import * as downloadReducer from "../../redux/downloadReducer";
import * as chartReducer from "../../redux/chartImageReducer";

function Reset(props) {
    
    const dispatch = useDispatch();
    function resetAll(){
        dispatch(downloadReducer.reset());
        dispatch(chartReducer.reset());
    }

    return(
        <>
            <Button
                variant="outline-primary"
                onClick={resetAll}>
                Reset all
            </Button>
      </>
    )
}

export default Reset;