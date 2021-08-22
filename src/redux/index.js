import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import chartImageReducer from "./chartImageReducer";
import innerCanvasInfoReducer from "./innerCanvasInfoReducer";
import outerCanvasInfoReducer from "./outerCanvasInfoReducer";
import combinedCanvasInfoReducer from "./combinedCanvasInfoReducer";
import canvasSettingsReducer from "./canvasSettingsReducer";
import videoReducer from "./videoReducer";
import downloadReducer from "./downloadReducer";
import eyesImageReducer from "./eyesImageReducer";

const rootReducer = combineReducers({
  eyesImage: eyesImageReducer,
  chartImage: chartImageReducer,
  innerCanvasInfo: innerCanvasInfoReducer,
  outerCanvasInfo: outerCanvasInfoReducer,
  combinedCanvasInfo: combinedCanvasInfoReducer,
  canvasSettings: canvasSettingsReducer,
  videoReducer: videoReducer,
  downloadReducer: downloadReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
