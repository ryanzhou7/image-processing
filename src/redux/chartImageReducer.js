const sourceSet = "CHART_IMAGE_SOURCE_SET";
const imageSet = "CHART_SET";
const chartReset = "CHART_RESET";

export function setChartImageOnload(source) {
  return (dispatch) => {
    const image = new Image();
    image.onload = () => {
      dispatch({ type: sourceSet, payload: image });
    };
    image.src = source;
  };
}

export function setChartImage(image) {
  return {
    type: imageSet,
    payload: image,
  };
}

export function reset() {
  return { type: chartReset, payload: null };
}

const initialState = {
  source: null,
  image: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case sourceSet:
      return {
        ...state,
        source: action.payload,
      };
    case imageSet:
      return {
        ...state,
        image: action.payload,
      };
    case reset:
      return {
        ...state,
        source: null,
        image: null,
      };

    default:
      return state;
  }
}
