const sourceSet = "CHART_IMAGE_SOURCE_SET";
const imageSet = "CHART_SET";
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
    default:
      return state;
  }
}
