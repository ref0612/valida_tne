// Archivo para manejar los encabezados ofuscados
function getHeaders() {
  const clientName = atob('VVJCQU5fQlVT'); // Decodifica 'URBAN_BUS'
  const clientKey = atob('OTA4NDA4NTYxNDE4NzgxODgwNzU5NDM3MTczNjEzNDU='); // Decodifica la clave

  return {
    'Content-Type': 'application/json',
    'x-client-name': clientName,
    'x-client-key': clientKey,
    'User-Agent': 'PostmanRuntime/7.45.0'
  };
}

console.log('headers.js cargado correctamente');
console.log('Confirmación: headers.js está siendo cargado.');
