/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  View,
  Image,
  Text,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import Logo from "../assets/logot.png";
import Calibri from "../assets/Calibri/calibri.ttf";
import CalibriBold from "../assets/Calibri/calibri_bold.ttf";
import Times from "../assets/Times New Roman/times.ttf";
import TimesBold from "../assets/Times New Roman/times-bold.ttf";
import { FormatRut } from "../Functions/FormatRut";

Font.register({
  family: "Calibri",
  fonts: [{ src: Calibri }, { src: CalibriBold, fontWeight: "bold" }],
});

Font.register({
  family: "Times New Roman",
  fonts: [{ src: Times }, { src: TimesBold, fontWeight: "bold" }],
});

const styles = StyleSheet.create({
  alignRight: {
    textAlign: "right",
    marginTop: 30,
    marginRight: 40,
    fontSize: "11px",
  },
  alignLeft: {
    textAlign: "left",
    margin: "0 50px",
    lineHeight: 0.3,
  },
  content: {
    fontFamily: "Times New Roman",
  },
});

const PdfDocument = ({ qrUrl, procesoPendiente, fechaProt1, fechaActual }) => {
  return (
    <Document style={styles.content}>
      <Page>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {Logo && (
              <Image
                style={{
                  width: 100,
                  height: 33,
                  marginTop: 20,
                  marginLeft: 40,
                }}
                src={Logo}
              />
            )}
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            {qrUrl && (
              <Image
                style={{ width: 45, height: 45, marginLeft: 213 }}
                src={qrUrl}
              />
            )}
          </View>
        </View>
        <View style={{ display: "flex", textAlign: "center", marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: "18px" }}>ANEXO</Text>
        </View>
        <View style={{ display: "flex", textAlign: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: "15px" }}>
            CERTIFICADO DE EVALUACIÓN DE COMPETENCIA LABORALES
          </Text>
        </View>
        <View>
          <Text style={styles.alignRight}>{`Los Andes, ${fechaActual}`}</Text>
        </View>
        <View
          style={{
            fontSize: "11px",
            marginLeft: 40,
            marginRight: 40,
            marginTop: 10,
            textAlign: "justify",
            lineHeight: 1.5,
          }}
        >
          <Text>
            {`Yo ${procesoPendiente.nombreEvaluador.toLocaleUpperCase()}, RUT ${FormatRut(
              procesoPendiente.runEvaluador
            )} Evaluador de Competencias Laborales de ChileValora, constato haber realizado la Evaluación de Competencias Laborales en Terreno para Sociedad MG Certificación de Competencias Laborales Ltda. RUT 76.237.325-4, para el proceso de Acreditación de competencias laborales del candidato Sr. ${procesoPendiente.nombreCompleto}, RUT ${FormatRut(
              procesoPendiente.runCandidato
            )}, en el Perfil ${procesoPendiente.descPerfil} en la marca y modelo ${procesoPendiente.modelo} con fecha de evaluación Práctica el día ${fechaProt1}, bajo el Código de Autenticación del informe ${procesoPendiente.folio}.`}
          </Text>
          <Text style={{ marginTop: 10 }}>
            {`El presente anexo se extiende a la empresa ${procesoPendiente.nombreEmpresa}.`}
          </Text>
        </View>
        <View style={{ marginTop: 30, fontSize: "9px", marginLeft: 40 }}>
          <View>
            <Text style={{ fontWeight: "bold" }}>
              Firmado electrónicamente por
            </Text>
          </View>
          <View>
            <Text>Nombre: {procesoPendiente.nombreEvaluador}</Text>
          </View>
          <View>
            <Text>RUN: {FormatRut(procesoPendiente.runEvaluador)}</Text>
          </View>
          <View>
            <Text>Email: {procesoPendiente.email}</Text>
          </View>
          <View>
            <Text>Fecha: {fechaActual}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
