import { CHECKBOX_VISION, CHECKBOX_DRIVING, CHECKBOX_READING, CHECKBOX_OTHER } from "../constants";

export function setThreshold(threshold) {
  return { type: "SET_THRESHOLD", payload: threshold };
}

export function setChecked(toggled) {
  return { type: "SET_CHECKED", payload: toggled };
}

export function setIdentifyingData(identifyingData) {
  return { type: "SET_IDENTIFYING_DATA", payload: identifyingData };
}

export function setAdditionalComments(additionalComments) {
  return { type: "SET_ADDITIONAL_COMMENTS", payload: additionalComments };
}

export function reset() {
  return { type: "DOWNLOAD_RESET", payload: null };
}

const initialState = {
  threshold: 20,
  identifyingData: "",
  additionalComments: "",
  checked:{
    [CHECKBOX_VISION]: false,
    [CHECKBOX_DRIVING]: false,
    [CHECKBOX_READING]: false,
    [CHECKBOX_OTHER]: false,
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_THRESHOLD":
      return {
        ...state,
        threshold: action.payload,
      };

    case "SET_CHECKED":
      const value = !state.checked[action.payload]
      return {
        ...state,
         checked: {
           ...state.checked,
           [action.payload]: value
         }
      };

    case "SET_ADDITIONAL_COMMENTS":
      return {
        ...state,
        additionalComments: action.payload,
      };      

    case "SET_IDENTIFYING_DATA":
      return {
        ...state,
        identifyingData: action.payload,
      };

    case "DOWNLOAD_RESET":
      const initialState = {
        ...state,
        threshold: 20,
        identifyingData: "",
        additionalComments: "",
        checked:{
          [CHECKBOX_VISION]: false,
          [CHECKBOX_DRIVING]: false,
          [CHECKBOX_READING]: false,
          [CHECKBOX_OTHER]: false,
        }
      };
      return initialState;

    default:
      return state;
  }
}
