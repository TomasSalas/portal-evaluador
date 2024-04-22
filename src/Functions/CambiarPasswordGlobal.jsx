export const CambiarPasswordGlobal = async (data, token )  => {
  
  const reponse = await fetch(`https://portaleval-back.azurewebsites.net/api/Usuario/ActualizarContrasena`,
  {
    method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body : JSON.stringify(data)
  })

  const result = await reponse.json();
  
  if (result.statusCode === 200) {
    return true;
  }else {
    return false;
  }
}