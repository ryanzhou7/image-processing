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

const initialState = {

  threshold: 20,

  identifyingData: "",
  additionalComments: "",
  checked:{
  }
};
initialState.checked[CHECKBOX_VISION] = false;
initialState.checked[CHECKBOX_DRIVING] = false;
initialState.checked[CHECKBOX_READING] = false;
initialState.checked[CHECKBOX_OTHER] = false;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_THRESHOLD":
      return {
        ...state,
        threshold: action.payload,
      };

    case "SET_CHECKED":
      const out = {
        ...state,
      };
      out.checked[action.payload] = !state[action.payload];
      return out;

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

    default:
      return state;
  }
}
