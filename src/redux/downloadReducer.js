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
  identifyingData: "314234234",
  additionalComments: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
  checked:{
    [CHECKBOX_VISION]: true,
    [CHECKBOX_DRIVING]: true,
    [CHECKBOX_READING]: true,
    [CHECKBOX_OTHER]: true,
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

    default:
      return state;
  }
}
