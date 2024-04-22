import { downloadPDF } from "./generarPDFbase64";

export const verificarBase64 = (base, filename) => {
  const base64PatternStandard =
    /^data:application\/pdf;base64,([A-Za-z0-9+/]+={0,2})$/;
  const base64PatternUrlFriendly =
    /^data:application\/pdf;base64,([A-Za-z0-9-_]+={0,2})$/;

  if (
    base.match(base64PatternStandard) ||
    base.match(base64PatternUrlFriendly)
  ) {
    if (base.startsWith("JVB")) {
      base = "data:application/pdf;base64," + base;
      downloadPDF(base, filename.toLocaleUpperCase());
    } else if (base.startsWith("data:application/pdf;base64")) {
      base = base.substring("data:application/pdf;base64,".length);
      downloadPDF(base, filename.toLocaleUpperCase());
    } else {
      console.log("Not a valid Base64 PDF string. Please check");
    }
  } else if (base.startsWith("JVB")) {
    base = "data:application/pdf;base64," + base;
    downloadPDF(base, filename.toLocaleUpperCase());
  } else {
    console.log("Not a valid Base64 PDF string. Please check");
  }
};
