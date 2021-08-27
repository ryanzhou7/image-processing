const VERSION = "1.0";
const TITLE_STYLE = "bold 20px Arial";
const SUBTEXT_STYLE = "normal 15px Arial";
const CANVAS_WIDTH = 500;
const TITLE_X = 250;
const SUBTEXT_X = 250;
const CHECKED_Y_PER = 50;

async function download2(originalImage, analyzedCanvas, drawingCanvasRef, info) {

  const { current: drawCanvas } = drawingCanvasRef;
  const ctx = drawCanvas.getContext("2d");

  drawCanvas.height = 1200;
  drawCanvas.width = 500;

  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 500, 1200);

  const TITLE_X = 250;

  ctx.font = TITLE_STYLE;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("- Original image -", TITLE_X, 40);

  // orginal
  ctx.drawImage(originalImage, 50, 50);

  // analyzed
  ctx.fillText("- Analyzed image -", TITLE_X, 500);
  ctx.drawImage(analyzedCanvas, 50, 510);

  // Texts
  ctx.fillText("- Information -", TITLE_X, 975);

  ctx.font = SUBTEXT_STYLE;

  const SUBTEXT_X = 250;
  ctx.fillText("Loss %: " + info.loss, SUBTEXT_X, 1000);
  ctx.fillText("Sensitivity: " + info.threshold, SUBTEXT_X, 1020);

  const now = new Date();
  info.date = now.toDateString();
  ctx.fillText("Analyzed date: " + info.date, SUBTEXT_X, 1080);
  ctx.fillText("Version: " + VERSION, SUBTEXT_X, 1100);

  // Download
  const data = drawCanvas.toDataURL("image/jpg");
  const a = document.createElement("a");
  a.href = data;
  a.download = getDownloadName(info);
  a.click();
}

async function download(data){
  const{
    drawingCanvas,
    chartCanvas,
    identifyingData,
    additionalComments,
    checked,
    eyesImage,    
  } = data;
}

function getCheckedDownloadHeight(checked){
  let count = 0;
  for (const [key, value] of Object.entries(checked)) {
    if( value ){
      count++;
    }
  }
  return count*CHECKED_Y_PER;
}

function shouldDownloadComments(additionalComments){
  return !!additionalComments;
}

function shouldDownloadChart(chartCanvas){
  return !!chartCanvas;
}

function shouldDownloadEyes(eyesImage){
  return !!eyesImage;
}

function shouldDownloadidentifyingData(identifyingData){
  return !!identifyingData;
}

function getCanvasHeight(data){
  const{
    chartCanvas,
    identifyingData,
    additionalComments,
    checked,
    eyesImage,    
  } = data;

  let height = 0;
  if( shouldDownloadChart(chartCanvas) ){
    height += 0;
  }
  if( shouldDownloadEyes(eyesImage) ){
    height += 0;
  }

  if( shouldDownloadidentifyingData(identifyingData) ){
    height += 0;
  }

  height += getCheckedDownloadHeight(checked);

  if( shouldDownloadComments(additionalComments) ){
    height += 0;
  }

  return height;
}

async function downloadWithNotes(
  originalImage,
  analyzedCanvas,
  drawingCanvasRef,
  info
) {
  const { current: drawCanvas } = drawingCanvasRef;
  const ctx = drawCanvas.getContext("2d");

  drawCanvas.height = 1200;
  drawCanvas.width = 500;

  // background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 500, 1200);

  const TITLE_X = 250;

  ctx.font = TITLE_STYLE;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("- Original image -", TITLE_X, 40);

  // orginal
  ctx.drawImage(originalImage, 50, 50);

  // analyzed
  ctx.fillText("- Analyzed image -", TITLE_X, 500);
  ctx.drawImage(analyzedCanvas, 50, 510);

  // Texts
  ctx.fillText("- Information -", TITLE_X, 975);

  ctx.font = SUBTEXT_STYLE;

  const SUBTEXT_X = 250;
  ctx.fillText("Loss %: " + info.loss, SUBTEXT_X, 1000);
  ctx.fillText("Sensitivity: " + info.threshold, SUBTEXT_X, 1020);
  ctx.fillText("Sex: " + getOptionalText(info.sex), SUBTEXT_X, 1040);
  ctx.fillText("Age: " + getOptionalText(info.age), SUBTEXT_X, 1060);

  const now = new Date();
  info.date = now.toDateString();
  ctx.fillText("Analyzed date: " + info.date, SUBTEXT_X, 1080);
  ctx.fillText("Version: " + VERSION, SUBTEXT_X, 1100);

  if (info.note) {
    ctx.font = TITLE_STYLE;
    ctx.fillText("- Note -", TITLE_X, 1150);

    ctx.font = SUBTEXT_STYLE;
    ctx.textAlign = "left";
    ctx.fillText(info.note, 50, 1170);
  }

  // Download
  const data = drawCanvas.toDataURL("image/jpg");
  const a = document.createElement("a");
  a.href = data;
  a.download = getDownloadName(info);
  a.click();
}

function getOptionalText(text) {
  return text ? text : "N/A";
}

function getDownloadName(info) {
  let name = info.date;
  name += info.sex ? "- Sex " + info.sex : "";
  name += info.age ? "- Age " + info.age : "";
  return name;
}

export { download, downloadWithNotes };
