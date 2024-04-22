import { saveAs } from "file-saver";

export const downloadPDF = (base64String, fileName) => {
  const base64WithoutPrefix = base64String.startsWith(
    "data:application/pdf;base64,"
  )
    ? base64String.substring("data:application/pdf;base64,".length)
    : base64String;

  const binaryData = atob(base64WithoutPrefix);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const byteArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryData.length; i++) {
    byteArray[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });

  saveAs(blob, fileName);
};
