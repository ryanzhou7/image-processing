import { jsPDF } from "jspdf";
import { EYES_IMAGE_HEIGHT, CHECKBOX_TITLE, GLOBAL_WIDTH, IDENTIFYING_DATA_LABEL, ADDITIONAL_COMMENTS_LABEL } from "../constants";

function download(data){
  const{
    eyesCanvas,
    chartCanvas,
    identifyingData,
    additionalComments,
    checked,
    loss,
  } = data;

  const doc = new jsPDF();
  let currentY = 10;
  const chartXStart = 55;
  const titleXStart = 75;
  const nextYminor = 5;
  const nextYmajor = 15;
  const nextSectionYspace = 15;
  const afterYspace = 10;
  const nextLineYspace = 5;

  if(chartCanvas){
    
    const chartWidth = 100;
    const chartHeight = 100;

    setTitleFont(doc);
    doc.text("- Analyzed image -", 75, currentY);
    currentY += 10;

    setSubtitleFont(doc);
    doc.text("Loss: " + loss + " %", 75, currentY)
    currentY += nextYminor;

    doc.addImage(chartCanvas, 'jpeg', chartXStart, currentY, chartWidth, chartHeight);
    currentY += chartHeight;
    currentY += nextYmajor;
  }

  if(eyesCanvas){
    
    const scale = 4;
    const eyesHeight = EYES_IMAGE_HEIGHT / scale;
    const eyesWidth = GLOBAL_WIDTH / scale;

    setTitleFont(doc);
    doc.text("- Patient eyes -", 85, currentY);
    currentY += nextYminor;

    doc.addImage(eyesCanvas, 'jpeg', chartXStart, currentY, eyesWidth, eyesHeight);
    currentY += eyesHeight;
    currentY += nextYmajor;
  }

  if(identifyingData){

    setSubtitleFont(doc);
    doc.text(IDENTIFYING_DATA_LABEL, 50, currentY);

    setTextFont(doc);
    doc.text(identifyingData, 110, currentY);
    currentY += nextYmajor;
  }

  if(Object.values(checked).some( v => v )){
    
    let checkedXStart = 50;

    setSubtitleFont(doc);
    doc.text(CHECKBOX_TITLE, checkedXStart, currentY);
    currentY += nextYminor;

    setTextFont(doc);
    checkedXStart += 10;
    for (const [condition, marked] of Object.entries(checked)) {
      if(marked){
        doc.text("- " + condition, checkedXStart, currentY);
        currentY += nextYminor;
      }
    }

    currentY += nextYmajor;
  }

  if(additionalComments){

    setSubtitleFont(doc);
    doc.text(ADDITIONAL_COMMENTS_LABEL, 40, currentY);
    currentY += nextYminor;

    setTextFont(doc);
    const length = doc.context2d.measureText(additionalComments).width;
    if(length > 570){
      
      const lineBreakLength = 80;
      const totalLength = Math.round(additionalComments.length/lineBreakLength);

      let start = 0;
      for(let i=0; i<totalLength; i++){
        
        const line = additionalComments.substring(start, start+lineBreakLength) + "-";
        doc.text(line, 40, currentY);
        currentY += nextYminor;
        start += lineBreakLength;
      }   

    }else{

      doc.text(additionalComments, 40, currentY);
    }
  }

  const date = (new Date()).toDateString();  
  doc.save(date);
}

function setTitleFont(doc){
  doc.setFont("times");
  doc.setFontSize(20);
}

function setSubtitleFont(doc){
  doc.setFont("times");
  doc.setFontSize(16);
}

function setTextFont(doc){
  doc.setFont("times");
  doc.setFontSize(12);
}

export { download };
