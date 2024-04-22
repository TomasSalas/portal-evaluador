export const EnviarCorreo = (pdfBase64, ProcesosPendientes) => {
  const { nombreEvaluador, folio } = ProcesosPendientes;
  const datos = {
    fileBase64: pdfBase64,
    nombreEvaluador,
    folio,
  };

  return fetch(
    "https://api-enviarcorreo.azurewebsites.net/api/Email/EnviarCorreo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    }
  )
    .then(async (response) => {
      if (response.ok) {
        return true;
      } else {
        const errorData = await response.json();
        console.error("Error al enviar el correo:", errorData);
        return null; // Otra opción es lanzar un error aquí
      }
    })
    .catch((error) => {
      console.error(
        "Error al realizar la solicitud para enviar el correo:",
        error
      );
      return null; // Otra opción es lanzar un error aquí
    });
};
