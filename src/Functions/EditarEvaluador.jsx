export const EditarEvaluador = async (data, token )  => {
  const params = data

  let rut = params.rutEvaluador
  .slice(0, -1) 
  .replace("-", "")  
  .replace(/\./g, "")  
  .replace(/\s/g, ""); 
  let dv =  params.rutEvaluador.slice(-1)

  const param = {
    id: params.id,
    run: parseInt(rut),
    digVerificador: dv,
    nombre: params.nombreEvaluador,
    apellido: params.apellidoEvaluador,
    aniosExperto: params.aniosExperto,
    correo: params.correo,
    telefono: params.telefono,
    ciudad: params.ciudad,
    estado:true
  }

  const reponse = await fetch(`https://portaleval-back.azurewebsites.net/api/Evaluadores/ActualizarPorRun?runEvaluador=${rut}`,
  {
    method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(param),
  })

  const result = await reponse.json();

  if (result.statusCode === 200) {
    return true;
  }else {
    return false;
  }
}